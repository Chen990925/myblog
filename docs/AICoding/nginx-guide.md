---
group: 微服务治理专题
title: Nginx 配置与实战（项目版）
order: 43
---

# Nginx 学习与配置教程（项目版·浓缩一篇）

> 定位：本项目目前**没有 Nginx**（外部访问直接打到 api-gateway 9877）。本文按"项目最可能用到的场景"浓缩成一篇：反向代理网关、多实例负载均衡、WebSocket 长连接、大文件下载、限流与真实 IP，最后给一份可直接改的配置模板。

## 一、为什么这个项目需要 Nginx（解决什么）

| 需求 | 现状 | Nginx 的作用 |
|---|---|---|
| 统一入口 + HTTPS | 客户端直连网关 9877 | 443 终止 SSL、统一域名，内网明文转发 |
| 多实例负载均衡 | 网关/服务多实例（10 个 JVM 共置） | upstream 分发 + 健康检查 + 故障摘除 |
| WebSocket 长连接 | 消息中心/行情推送（WsClient、hq-client 9850） | 代理 Upgrade 头、长连接超时 |
| 大文件下载/报表导出 | 日志下载、文件报表服务 | 调大 `client_max_body_size`、关缓冲直接透传 |
| 限流/防刷 | 网关未做限流（短板） | `limit_req` 按 IP/接口限流，快速拦截 |
| 真实客户端 IP | 网关 `RequestFilter` 解析 `x-forwarded-for` | 透传 `X-Real-IP`/`X-Forwarded-For`，否则网关拿到的是 Nginx IP |

**一句话**：Nginx 放在最外层做"接入层"（SSL/负载/限流/静态），业务治理仍由 Spring Cloud Gateway 负责（路由/鉴权）。

## 二、核心概念与指令（够用版）

```
upstream   后端服务池（负载均衡目标：ip:port 列表 + 策略）
server     虚拟主机（listen 端口 + server_name 域名）
location   路径匹配（= 精确 / ~ 正则 / 前缀）
proxy_pass 转发目标
```

**常用指令速查**：
| 指令 | 作用 | 项目取值建议 |
|---|---|---|
| `proxy_pass` | 转发地址 | `http://oms_gateway`（指向 upstream） |
| `proxy_set_header` | 透传头部 | Host/X-Real-IP/X-Forwarded-For |
| `proxy_connect_timeout` | 连接上游超时 | 3s |
| `proxy_read_timeout` | 读上游超时 | 60s（**与 Feign readTimeout 600s 不一致要统一考虑**） |
| `proxy_send_timeout` | 发上游超时 | 60s |
| `client_max_body_size` | 请求体上限 | 20m（项目上传限制 20MB） |
| `proxy_buffering` | 响应缓冲 | 大文件下载 `off` |
| `limit_req_zone` / `limit_req` | 限流（漏桶） | 按 IP `rate=50r/s burst=100` |
| `keepalive` | 上游长连接 | upstream 内 `keepalive 64` |

**负载均衡策略**：默认轮询（round-robin）；`least_conn`（最少连接，适合长请求）；`ip_hash`（会话保持）；`weight=3`（权重，按机器配置）。

## 三、项目配置模板（可直接改）

```nginx
# ============ 限流区（按客户端 IP） ============
limit_req_zone $binary_remote_addr zone=perip:10m rate=50r/s;

# ============ 网关后端（多实例） ============
upstream oms_gateway {
    least_conn;
    server 172.19.6.60:9877 weight=1 max_fails=3 fail_timeout=10s;
    server 172.19.6.61:9877 weight=1 max_fails=3 fail_timeout=10s;
    keepalive 64;                 # 与上游保持长连接，降低握手开销
}

# ============ WebSocket 推送（消息中心/行情） ============
upstream oms_ws {
    ip_hash;                      # 长连接需要固定后端（会话保持）
    server 172.19.6.60:8081;
    server 172.19.6.61:8081;
}

server {
    listen 443 ssl;
    server_name oms.example.com;

    ssl_certificate     /etc/nginx/certs/oms.crt;
    ssl_certificate_key /etc/nginx/certs/oms.key;
    ssl_protocols       TLSv1.2 TLSv1.3;

    client_max_body_size 20m;     # 上传（项目限制 20MB）

    # ---- 1) 业务接口 → 网关（Spring Cloud Gateway） ----
    location / {
        limit_req zone=perip burst=100 nodelay;

        proxy_pass http://oms_gateway;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;   # 网关靠它取真实 IP
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 3s;
        proxy_read_timeout    60s;      # 与 Feign/Nginx 超时策略统一
        proxy_send_timeout    60s;
        proxy_next_upstream error timeout http_502 http_504;   # 上游失败自动切下一台
    }

    # ---- 2) WebSocket 长连接 ----
    location /ws/ {
        proxy_pass http://oms_ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade    $http_upgrade;      # 关键：透传协议升级
        proxy_set_header Connection "upgrade";
        proxy_set_header Host       $host;
        proxy_read_timeout 3600s;                       # 长连接不能 60s 断
        proxy_send_timeout 3600s;
    }

    # ---- 3) 大文件下载（日志/报表导出） ----
    location ~ ^/(log/download|report/export) {
        proxy_pass http://oms_gateway;
        proxy_buffering off;          # 不缓冲，边收边发，降内存占用
        proxy_read_timeout 600s;      # 大文件慢，超时给足
        proxy_set_header Host $host;
    }

    # ---- 4) 健康检查（不记日志、不限流） ----
    location = /health {
        access_log off;
        proxy_pass http://oms_gateway;
    }
}

# HTTP 强制跳 HTTPS
server {
    listen 80;
    server_name oms.example.com;
    return 301 https://$host$request_uri;
}
```

## 四、项目落地注意点（踩坑清单）

1. **真实 IP**：不加 `X-Forwarded-For`/`X-Real-IP`，网关 `RequestFilter` 拿到的就是 Nginx IP，审计/风控 IP 全错
2. **超时链要统一**：Nginx `proxy_read_timeout` 与 Feign `readTimeout`（项目当前 600s）要协调——**Nginx 先超时会返回 504，把问题挡在接入层**，这是好事；但两边差太多会出现"Nginx 已断开、后端还在跑"
3. **WebSocket 必须配 Upgrade**：漏了 `Upgrade`/`Connection` 头会 400/连接立即断；长连接还要放大 `proxy_read_timeout`（心跳间隔 40s 项目配置，3600s 足够）
4. **文件下载关 buffering**：报表/日志动辄几十 MB，默认缓冲会写满 Nginx 临时盘；`proxy_buffering off` + 大 `client_max_body_size`
5. **长连接 keepalive**：`proxy_http_version 1.1` + upstream `keepalive 64`，否则每个请求都建连（网关层 QPS 高时明显）
6. **别用 Nginx 做业务路由**：项目路由/鉴权在 Gateway（func_id 路由表、sso-login），Nginx 只做接入层，避免两处分流规则打架
7. **限流位置**：网关未做限流（短板），Nginx `limit_req` 是按 IP 的第一道粗限流；精细化（按 func_id/租户）留给网关或 Sentinel
8. **日志**：`access_log` 记录 `$request_time`/`$upstream_response_time`，用于区分"慢在接入层还是后端"

## 五、面试话术（1 分钟版）

> "项目目前没用 Nginx，客户端直连 Spring Cloud Gateway 9877。如果引入，我按接入层定位来配：SSL 终止放在 Nginx、网关保持内网明文；多实例网关用 upstream + least_conn + max_fails 做负载和故障摘除；WebSocket（消息/行情推送）单独配 location，透传 Upgrade 头并把 proxy_read_timeout 放大到小时级；文件下载/报表导出关 proxy_buffering 且放大超时；限流用 limit_req 按 IP 做第一道粗限流（网关暂未实现限流）；同时透传 X-Forwarded-For，否则网关取不到真实客户端 IP。注意超时链要和 Feign 的 600s 协调统一。"

## 六、高频追问

- **Nginx 和 Gateway 什么关系？** → Nginx 接入层（SSL/负载/限流/静态），Gateway 业务网关（路由/鉴权/过滤器），不重复。
- **为什么 WebSocket 要 ip_hash？** → 长连接必须固定到同一后端实例（除非做了共享会话/广播）。
- **`proxy_buffering on/off` 怎么选？** → 一般响应 on（解放后端）；大文件下载 off（省内存、边收边发）。
- **Nginx 挂了怎么办？** → 前置 VIP/Keepalived 或云 LB 多实例；反正是无状态接入层可水平扩。
- **和 Feign 超时冲突怎么处理？** → 接入层超时略大于后端 P99、小于网关超时；Nginx 先超时返回 504 保护后端。
- **limit_req 的 burst/nodelay？** → burst 允许突发排队数，nodelay 让突发立即处理（不排队），超过才拒。

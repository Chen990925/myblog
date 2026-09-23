---
group: 微服务治理专题
title: Nginx 生产实战常用手册
order: 44
---

# Nginx 生产实战常用手册

> 与前一篇的关系：`Nginx配置与实战（项目版）.md` 讲**本项目怎么配**（网关代理/负载/WebSocket 模板）；本篇讲**生产上天天会用到什么**——命令、调优参数、日志分析、故障排障。两篇配合看。

## 一、常用命令速查（运维日常，最高频）

```bash
nginx -t                      # 检查配置语法（改配置后必做，先测再 reload）
nginx -T                      # 打印最终生效的完整配置（含 include，排查"改了没生效"）
nginx -s reload               # 平滑重载配置（不中断连接）
nginx -s quit                 # 优雅停止（处理完现有请求）
nginx -s stop                 # 强制停止
nginx -s reopen               # 重新打开日志文件（日志切割后必用）
nginx -V                      # 查看编译参数/版本/模块（确认装了哪些模块）
ps -ef | grep nginx           # 看 master/worker 进程
```

**日志切割（生产必做，否则磁盘打满）**：
```bash
mv access.log access-$(date +%F).log && nginx -s reopen   # 切割后必须 reopen
# 或配 logrotate（daily rotate 7 + postrotate 调 reopen）
```

**平滑升级**（不中断业务换二进制）：`kill -USR2 <master_pid>` → 新 master 起来后 `kill -WINCH <old_master_pid>` → 观察无误 `kill -QUIT <old_master_pid>`。

## 二、配置结构与匹配优先级（排障基础）

```
main（全局）→ events（连接模型）→ http → server（虚拟主机）→ location（路径）
```

**location 匹配优先级（背熟，配错就"改了不生效"）**：
```
= 精确匹配  >  ^~ 前缀（命中即停，不走正则）  >  正则 ~ / ~*（按顺序）  >  普通前缀（最长匹配）
```

- 同一 server 多个 location 冲突时按上面顺序裁决
- include 的加载顺序会影响同名指令（后加载覆盖，除非指令本身支持多条）

## 三、生产必配片段（可直接抄）

```nginx
# 1. 全局性能（worker 数 = CPU 核数，本项目 8 核）
worker_processes auto;                 # 8 核 → 8 worker
worker_rlimit_nofile 65535;            # 文件描述符（连接数受它限制）
events {
    worker_connections 10240;          # 单 worker 最大连接
    multi_accept on;
    use epoll;                         # Linux 下多路复用，Nginx 快的核心
}
http {
    sendfile on; tcp_nopush on; tcp_nodelay on;
    keepalive_timeout 65;
    client_max_body_size 20m;          # 项目上传限制 20MB

    # 2. 日志格式（带 upstream 耗时，排障必备）
    log_format main '$remote_addr - $request_time $upstream_response_time '
                    '"$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
    access_log logs/access.log main;
    error_log  logs/error.log warn;

    # 3. gzip 压缩（文本接口省带宽，注意不要压图片/已压缩内容）
    gzip on; gzip_min_length 1k; gzip_comp_level 5;
    gzip_types text/plain application/json application/javascript text/css;

    # 4. 限流（两个维度：请求速率 + 并发连接）
    limit_req_zone  $binary_remote_addr zone=perip:10m rate=50r/s;
    limit_conn_zone $binary_remote_addr zone=perconn:10m;
}
```

**限流用法**：`limit_req zone=perip burst=100 nodelay;`（突发允许 100，超出立即拒） / `limit_conn perconn 50;`（单 IP 最多 50 并发）。

**安全头（生产建议）**：
```nginx
add_header X-Frame-Options SAMEORIGIN always;
add_header X-Content-Type-Options nosniff always;
server_tokens off;                     # 隐藏版本号
```

## 四、日志分析（生产定位问题的第一现场）

```bash
# TOP 10 访问 IP
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# 状态码分布（快速看 5xx 是否突增）
awk '{print $9}' access.log | sort | uniq -c | sort -rn

# 慢请求 TOP（$request_time 是第 2 个字段，按需调整列号）
awk '{if ($2 > 1) print $2, $7, $8}' access.log | sort -rn | head -20

# 某接口的 5xx 明细
awk '$9 >= 500 && $0 ~ /\/trade\//' access.log | tail -20

# 每分钟请求量（看流量脉搏）
awk '{print substr($4, 2, 17)}' access.log | uniq -c | tail -30
```

**关键认知**：`$request_time`（Nginx 视角总耗时）vs `$upstream_response_time`（后端耗时）——**两者的差值说明时间花在 Nginx/网络还是后端**，这是排障的关键分野。

## 五、生产故障排障手册（最高频，面试也能讲）

| 现象 | 含义 | 排查方向 |
|---|---|---|
| **502 Bad Gateway** | 连不上后端/后端返回非法响应 | 后端进程活着吗（端口通不通）→ upstream 地址对不对 → 后端是否 OOM/重启（呼应 JVM 排查） |
| **504 Gateway Timeout** | 后端响应超过 `proxy_read_timeout` | 后端慢（慢 SQL/线程池满）→ 调大超时或优化后端；**先看 upstream_response_time** |
| **499** | **客户端主动断开**（Nginx 特有） | 多半是后端太慢，前端等不及断开 → 优化后端，别只调超时 |
| **413** | 请求体超过 `client_max_body_size` | 调大该值（项目上传 20MB） |
| **no live upstreams** | upstream 全部被标记失败 | `max_fails`/`fail_timeout` 触发 → 后端是否全挂，或探测过激 |
| **worker_connections exceeded** | 单 worker 连接数超限 | 调大 `worker_connections` + `worker_rlimit_nofile` + 系统 `ulimit -n` |
| **upstream timed out** | 连/读/发上游超时 | 分 `connect/read/send` 三个超时定位 |
| 改了配置不生效 | location 优先级/include 顺序/未 reload | `nginx -T` 看最终配置 + 确认 reload 成功 |

**排障顺序（通用）**：
```
① error.log 看具体错误码（upstream timed out / connection refused）
② nginx -T 确认配置真的生效
③ 测试后端连通：curl -v http://后端IP:端口/health
④ 看后端自身：进程/线程池/GC/慢 SQL（跨层排查）
⑤ 对比 access.log 的 request_time vs upstream_response_time 定位耗时归属
```

## 六、与项目场景的结合

| 项目场景 | Nginx 相关点 |
|---|---|
| 网关 9877 代理 | `proxy_read_timeout` 与 Feign `readTimeout`（600s）协调，Nginx 先超时返回 504 保护后端 |
| WebSocket 推送（消息中心） | 透传 `Upgrade`/`Connection`，`proxy_read_timeout` 放小时级（心跳 40s） |
| 文件下载/报表 | `proxy_buffering off` + 大超时 + `client_max_body_size` 20m |
| 真实客户端 IP | 透传 `X-Real-IP`/`X-Forwarded-For`，否则网关 `RequestFilter` 拿到 Nginx IP |
| 8 核机器 | `worker_processes auto`（8）+ `use epoll` + `worker_connections 10240` |
| 限流（网关未实现） | `limit_req`（按 IP 速率）+ `limit_conn`（按 IP 并发）做第一道粗限流 |

## 七、面试话术（1 分钟版）

> "Nginx 生产上我关注四件事：一是命令规范——改配置先 `nginx -t` 再 `-s reload`，日志切割后必须 `-s reopen`，排查配置问题用 `-T` 看最终生效配置；二是调优——8 核 `worker_processes auto`、`use epoll`、连接数与 `worker_rlimit_nofile`/`ulimit` 三层一起调；三是日志——`$request_time` 和 `$upstream_response_time` 的差值能区分耗时在后端还是 Nginx，配合 awk 做 TOP IP/状态码/慢请求统计；四是排障——502 查后端连通、504 查后端慢、499 是客户端等不及断开（本质还是后端慢）。Nginx 之所以扛并发，核心是 master-worker 模型 + epoll 异步非阻塞 + 少量进程处理海量连接。"

## 八、高频追问

- **Nginx 为什么快？** → master-worker 多进程 + epoll 多路复用 + 异步非阻塞 + 内存池 + sendfile 零拷贝。
- **reload 为什么不中断连接？** → 新 worker 用新配置起来，旧 worker 处理完存量请求再退出（平滑切换）。
- **worker 数设多少？** → CPU 核数（`auto`）；CPU 密集可略多，但一般 = 核数最优。
- **502 和 504 区别？** → 502 是连不上/无效响应（连接层）；504 是连上了但响应超时（等待层）。
- **499 怎么处理？** → 是客户端断开，根因通常是后端慢；优化后端，而不是简单调大超时。
- **Nginx 和 Gateway 分工？** → Nginx 接入层（SSL/负载/限流/静态/日志），Gateway 业务网关（路由/鉴权/过滤器）。
- **怎么防日志打满磁盘？** → logrotate 或 cron 切割 + `nginx -s reopen` + 保留 N 天 + 磁盘告警。

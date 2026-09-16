---
group: 微服务治理专题
title: API 网关
order: 38
---

# 微服务 3：API 网关（Spring Cloud Gateway）

## 一、三大核心概念

```
Route（路由）= ID + 目标 URI + Predicate 数组 + Filter 数组
Predicate（断言）：匹配条件（Path/Header/Query/Method/Host/时间...）
Filter（过滤器）：请求处理前后增强（改请求/响应、鉴权、限流、日志）
```

## 二、项目双路由设计（工程观）

1. **自动路由**：`spring.cloud.gateway.discovery.locator.enabled=true` + `lower-case-service-id=true` → 按服务名自动生成路由（`/oms-trade/**` → `lb://oms-trade`）
2. **配置化路由表**：`oms.access` 配置（`func_id` 内部功能号 + `serve_name` + `path` + `desc`）→ 对接 IR（统一接入）的功能号映射，外部系统按 func_id 调用

**为什么两套并存**："内部前端走自动路由（服务名即路径）；外部三方系统走功能号路由表（IR 功能号→服务路径映射），兼顾开发效率与外部协议规范。"

## 三、过滤器（项目实例）

- `RequestFilter implements GlobalFilter, Ordered`：日志打印请求 URI + **多级代理真实 IP 解析**
  ```
  x-forwarded-for → Proxy-Client-IP → WL-Proxy-Client-IP → remoteAddress
  多个 IP 按逗号分隔取第一个（客户端真实 IP）
  ```
- `getOrder()` 返回 `LOWEST_PRECEDENCE`：日志过滤器放最后
- 内置过滤器：`default-filters: RemoveRequestHeader=Expect`（移除 Expect 头解决请求无法返回——**生产踩过的坑**）

## 四、响应式模型（对比题）

- Gateway 基于 **WebFlux + Reactor + Netty**：非阻塞、事件循环、少量线程处理高并发
- Zuul 1.x：Servlet 阻塞模型（每请求一线程）→ 高并发线程耗尽
- 项目落点：网关堆 256m（JVM 板块）——响应式模型下小堆可行，但也解释了"小堆 + 16m region 的 G1 配置不合理"

## 五、网关职责

路由转发 / 鉴权（项目在 sso-login：Token 校验）/ 限流（**未实现**）/ 日志 / 跨域 / 灰度（按 header 路由）

## 六、面试话术（1 分钟版）

> "网关我们两套路由：discovery locator 按服务名自动路由给内部用，配置化功能号路由表（oms.access）对接外部 IR 系统；过滤器用 GlobalFilter 做日志和真实 IP 解析（多级代理取 x-forwarded-for 第一个），另外修过 Expect 头的坑（RemoveRequestHeader）。Gateway 是 WebFlux+Netty 响应式，比 Zuul 1.x 阻塞模型省线程，所以网关 256m 堆够用。目前网关没做限流，可以引入 Sentinel 或 Redis 令牌桶按 func_id/租户限流。"

## 七、高频追问

- Gateway 和 Zuul 区别？→ Gateway 异步非阻塞（WebFlux+Netty）、Zuul 1.x 同步阻塞；Gateway 性能更好、生态延续
- 断言和过滤器的执行顺序？→ 断言匹配 → 过滤器 pre（按 Order）→ 转发 → 过滤器 post（逆序）
- 全局过滤器和 GatewayFilter 区别？→ GlobalFilter 对所有路由生效；GatewayFilter 绑定特定路由
- 网关怎么做鉴权？→ GlobalFilter 里校验 Token（项目在 sso-login 模块），失败直接返回 401
- 网关限流怎么做？→ Sentinel 网关流控 / Redis 令牌桶（RedisRateLimiter 内置）

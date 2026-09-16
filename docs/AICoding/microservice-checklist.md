---
group: 微服务治理专题
title: 微服务治理准备点清单
order: 35
---

# 微服务治理准备点清单（目录 / 索引版）

> 这是**总纲**：每个板块只留核心要点 + 指向详细文件。复习/面试前先看这份，细节翻对应文件。

## 0. 项目微服务治理能力全景（浏览结论）

| 组件 | 项目实现 | 证据 |
|---|---|---|
| 注册中心 | Nacos discovery（enabled/group/namespace 可配置），另支持 ZK | bootstrap-prod.yml、zookeeper.enabled |
| 配置中心 | Nacos config（默认关闭按环境开启，file-extension yaml） | bootstrap.yml |
| API 网关 | Spring Cloud Gateway：discovery locator 自动路由（lower-case-service-id）+ **配置化路由表 oms.access**（func_id/serve_name/path/desc） | RouteConfigProperties、gateway application.yml |
| 网关过滤器 | `RequestFilter`（GlobalFilter：请求日志 + 多级代理真实 IP 解析） | RequestFilter.java |
| 服务调用 | **109 个 @FeignClient**（value="oms-order" + contextId 区分多客户端）+ XquantResponse 统一返回 | micros/feignclient/** |
| Feign 超时 | connectTimeout=10000、**readTimeout=600000（600s！）** | application.yml |
| 容错/限流 | **未实现**（无 Sentinel/Hystrix/Resilience4j）⚠️ 校准项 | pom 无依赖 |
| 服务间异步 | RocketMQ（REQ/PUSH topic 成对） | MessagePublishManage |

**⚠️ 重要校准**：项目 pom 无 Sentinel 依赖，yml 里的 `sentinel:` 是 **Redis 哨兵**（spring.redis.sentinel），代码无 @SentinelResource/BlockHandler/Fallback → **没有熔断降级实现**。之前 JVM 笔记"接入 Sentinel 熔断降级"的说法不成立，面试要诚实校准。

## 1. 微服务架构与服务拆分/通信方式

- 10 个服务：gateway / main / orderservice / tradeservice / tradegatewayfrontend / unify-access×4 / scheduler / user-center
- 拆分：按业务能力（指令→审批→交易→报盘）+ 公共能力下沉（common：缓存/额度引擎/费率/数据同步）
- 通信两种并存：**同步 Feign**（109 客户端，要立刻拿结果）+ **异步 MQ**（解耦削峰）
- 通信的坑：链路过长延迟叠加、Feign 超时过松、无熔断
- **详见 `微服务1-架构与服务拆分.md`**

## 2. Nacos 注册发现 + 配置中心

- 注册：注册/心跳 5s/不健康 15s/剔除 30s；推拉结合；临时（AP）vs 持久（CP）实例
- 对比：Nacos（注册配置一体、AP/CP 可选）vs Eureka（停更）vs ZK（CP 无配置中心）
- 多环境隔离：**namespace 隔离环境、group 隔离业务/客户**
- 配置中心：bootstrap 阶段拉取 + `@RefreshScope` 动态刷新 + 优先级；**频繁刷新触发 Bean 重建**（呼应 JVM 案例 5）
- **详见 `微服务2-Nacos注册发现与配置中心.md`**

## 3. API 网关（Spring Cloud Gateway）

- 三大概念：Route / Predicate（断言）/ Filter（过滤器）
- **项目双路由**：discovery locator 自动路由（内部）+ oms.access 功能号路由表（外部 IR 对接）
- 过滤器：`RequestFilter`（日志 + 多级代理真实 IP：x-forwarded-for→Proxy-Client-IP→WL-Proxy-Client-IP→remoteAddress）；内置 `RemoveRequestHeader=Expect`（踩坑修复）
- 响应式模型（WebFlux+Netty，省线程）vs Zuul 1.x 阻塞
- 职责：路由/鉴权（sso-login）/限流（未实现）/日志/跨域/灰度
- **详见 `微服务3-API网关.md`**

## 4. Feign + 负载均衡

- 原理：@EnableFeignClients 扫描 → JDK 动态代理 → 注解解析 RequestTemplate → 编码 → LoadBalancer → 解码
- **contextId**：同一服务多客户端时区分 Bean（项目 109 个客户端大量重复 value="oms-order"）
- **readTimeout=600s 问题**：外部依赖变慢线程被长占 → 雪崩（JVM 案例 4 的技术根因，话术要修正）
- 重试必须配幂等；LoadBalancer 策略（轮询/随机/权重）
- **详见 `微服务4-Feign与负载均衡.md`**

## 5. 容错治理（熔断/降级/隔离）——含诚实校准

- 三手段：熔断（快速失败）/ 降级（兜底）/ 隔离（线程池/信号量）
- Sentinel：资源/规则（流控/熔断/热点/系统）、滑动窗口统计、Closed→Open→Half-Open 状态机
- **项目未实现** → 诚实话术 + 改进方案（收紧超时 + Sentinel 熔断 + 信号量隔离 + 回报链路已 MQ 异步化）
- 限流算法：计数器/滑动窗口/漏桶/令牌桶（网关层可做 Redis 令牌桶）
- **详见 `微服务5-容错治理.md`**

## 6. 生产问题排查（微服务场景）

- 服务摘除：Nacos 控制台看实例健康（GC 停顿导致心跳超时——呼应 JVM）
- 超时雪崩：jstack 栈底 Feign/HttpClient + 查超时配置 + 下游 RT
- 配置变更故障：对时间点、控制刷新频率、慎用 @RefreshScope
- 工具：Nacos 控制台 / Feign 日志（BASIC）/ **无链路追踪（短板，建议 SkyWalking）**
- **详见 `微服务6-生产问题排查.md`**

## 7. 学习顺序（推荐）

1. 架构拆分 + 通信方式（垫场）
2. Nacos 注册发现 + 配置中心（多环境隔离）
3. API 网关（双路由 + 过滤器 + 响应式）
4. Feign + 负载均衡（含 readTimeout 600s 亮点）
5. 容错治理（原理 + 诚实校准）
6. 生产问题排查（串联）

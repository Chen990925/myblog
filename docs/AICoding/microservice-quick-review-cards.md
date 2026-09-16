---
group: 微服务治理专题
title: 微服务治理速记卡
order: 42
---

# 微服务治理速记卡（临场回忆 / 快速准备版）

> 用法：面试前 10 分钟扫一遍；被问到微服务话题先定位板块，按"引导句"展开。细节翻对应笔记。

## 1. 项目治理全景（背得出）

**Nacos（注册+配置，支持 ZK）；Gateway 双路由（自动路由 + oms.access 功能号路由表）；109 个 Feign 客户端（contextId 区分）；Feign connectTimeout 10s / readTimeout 600s；无 Sentinel 熔断（校准项）；MQ 异步解耦**。

## 2. 架构与通信

- 引导句：**"按业务能力拆分 + 公共能力下沉；同步 Feign、异步 MQ"**
- 10 个服务：网关/公共/指令/交易/报盘前置/接入×4/调度/用户中心
- 选择逻辑：要立刻拿结果用 Feign；削峰解耦用 MQ

## 3. Nacos 注册发现 + 配置中心

- 注册：心跳 5s、不健康 15s、剔除 30s；推拉结合
- 对比：Nacos（注册配置一体、AP/CP 可选）> Eureka（停更）> ZK（CP 无配置中心）
- 隔离：**namespace 隔离环境、group 隔离业务/客户**
- 配置：bootstrap 拉取 + @RefreshScope；频繁刷新建 Bean（呼应 JVM 案例 5）

## 4. API 网关

- 引导句：**"Route/Predicate/Filter；双路由 + GlobalFilter"**
- 双路由：discovery locator 自动路由（内部）+ oms.access 功能号路由表（外部 IR）
- RequestFilter：日志 + 多级代理真实 IP（x-forwarded-for 第一个）
- RemoveRequestHeader=Expect（踩坑修复）
- 响应式（WebFlux+Netty）省线程 → 网关 256m 堆够用
- 限流未实现（可 Sentinel / Redis 令牌桶）

## 5. Feign + 负载均衡

- 原理：动态代理 + 注解解析 RequestTemplate + 编解码 + LoadBalancer
- **contextId**：同服务多客户端避免 Bean 名冲突（109 个客户端的刚需）
- **readTimeout=600s 问题**：外部慢 → 线程长占 → 雪崩（JVM 案例 4 根因，话术修正）
- 改进：分级 3s/10s + 按下游配置 + 熔断 + 隔离
- 重试必须配幂等

## 6. 容错治理（含校准）

- 引导句：**"熔断快速失败、降级兜底、隔离防占满"**
- Sentinel：资源/规则、滑动窗口、Closed→Open→Half-Open
- **诚实话术**："只有超时（还配了 600s），没做熔断降级——已知短板，改进方案：收紧超时 + Sentinel 熔断 + 信号量隔离 + MQ 异步化（已做）"
- 隔离：线程池（强依赖）vs 信号量（快速失败）

## 7. 生产排查

- 三看：注册中心实例健康（Nacos 控制台）/ 跨服务调用链（Feign 日志，**无链路追踪是短板**）/ 超时与线程（jstack + Feign 配置）
- 雪崩根因：慢依赖占满线程 → 方案"限时 + 限流 + 限并发"
- 配置变更故障：对时间点 + 控制刷新频率
- GC 停顿会导致心跳超时被剔除（呼应 JVM）

## 8. 高频追问口袋（一句答）

- Nacos vs Eureka vs ZK？→ 注册配置一体 AP/CP 可选 / 停更 / CP 无配置中心
- namespace vs group？→ 环境 vs 业务分组
- Gateway vs Zuul？→ WebFlux 非阻塞 vs Servlet 阻塞
- contextId 干嘛的？→ 同服务多 Feign 接口防 Bean 冲突
- 熔断 vs 降级？→ 断开调用 vs 提供兜底（通常先后发生）
- 线程池 vs 信号量隔离？→ 强依赖耗时用线程池；快速失败高频用信号量

## 9. 简历一句话

**Nacos 注册配置（namespace/group 隔离 + 双注册中心）+ Gateway 双路由与全局过滤器 + 109 个 Feign 客户端维护；定位 Feign readTimeout 600s 雪崩风险并提出"超时分级 + Sentinel 熔断 + 信号量隔离 + MQ 异步化"改进方案** —— 主打案例：Feign 超时雪崩分析 / 容错能力缺口评估与改进。

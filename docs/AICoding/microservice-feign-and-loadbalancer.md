---
group: 微服务治理专题
title: Feign 与负载均衡
order: 39
---

# 微服务 4：Feign + 负载均衡

## 一、声明式调用原理（必考）

```
@EnableFeignClients 扫描 @FeignClient 接口
 → 为每个接口创建 JDK 动态代理（FeignInvocationHandler）
 → 调用方法：解析注解生成 RequestTemplate（URL/Method/Header/Body）
 → 编码器序列化参数 → LoadBalancer 选实例 → 发送 HTTP
 → 解码器反序列化响应 → 返回
```

- 项目写法：`@FeignClient(value = "oms-order", contextId = "approveProcessFeignClient")` + `@PostMapping` + `XquantResponse<T>` 统一包装
- **`contextId`（项目重点）**：同一目标服务的多个 Feign 接口，Bean 名默认取 `value` 会冲突 → 用 contextId 区分（109 个客户端大量重复 `value="oms-order"`，全靠 contextId）

## 二、超时配置（项目最大问题点）

```yaml
feign:
  client:
    config:
      default:
        connectTimeout: 10000      # 连接 10s
        readTimeout: 600000        # 读取 600s = 10 分钟 ← 问题！
```

**readTimeout 600s 的危害**：
- 外部依赖（CFETS/下游）变慢时，Feign 调用线程阻塞最多 10 分钟
- Tomcat 线程池（max 1000）被逐步占满 → 服务不可用 → 调用方也超时（雪崩）
- **这是 JVM 案例 4（CFETS 变慢导致全链路雪崩）的技术根因**——之前讲"超时 60s"不准确，实际配置 600s，话术要修正

**改进方案**：
1. 分级收紧：连接 3s / 读 10s
2. 按下游分别配置：`config.oms-trade.readTimeout`
3. 配合熔断（失败快速返回）+ 信号量隔离

## 三、重试（配合幂等）

- Feign 默认 `Retryer.NEVER_RETRY`；开启后失败自动重发
- **重试必须配幂等**：重复下单/重复扣减是事故 → 唯一约束/Redis 去重/状态机（呼应 MQ 幂等）
- 话术："GET 幂等可重试；POST 下单类必须配幂等键才能重试"

## 四、负载均衡

- Ribbon（停更）→ **Spring Cloud LoadBalancer**（官方推荐）
- 策略：轮询（默认）/ 随机 / 权重（Nacos 支持）/ 同机房优先
- 项目落点：网关 `lb://服务名` + Feign 内部走 LoadBalancer

## 五、服务调用治理链（串联）

```
超时（分级）→ 重试（配幂等）→ 熔断（快速失败）→ 隔离（线程池/信号量）→ 降级（兜底）
```
项目现状：只有超时（配置过松）、无重试策略、无熔断、无隔离 → 改进空间明确

## 六、面试话术（1 分钟版）

> "Feign 是声明式调用：@FeignClient 接口 + 动态代理 + 注解解析生成请求模板，配合 LoadBalancer 选实例。项目 109 个客户端，用 contextId 区分同一服务的多个接口（避免 Bean 名冲突）。我们最大的问题是 readTimeout 配了 600s（10 分钟）——外部依赖变慢会把线程占死（遇到过 CFETS 变慢导致连锁超时），改进是分级收紧到 3s/10s + 引入熔断隔离 + 重试配幂等。"

## 七、高频追问

- Feign 和 RestTemplate 区别？→ Feign 声明式（接口+注解，像本地调用）、RestTemplate 编程式（手写 URL 和参数）
- contextId 不配会怎样？→ 同服务多个 Feign 接口 Bean 名冲突（都叫 value），启动报错
- Feign 怎么实现负载均衡？→ 集成 Spring Cloud LoadBalancer，`lb://服务名` 解析 + 选实例
- Feign 重试的坑？→ 非幂等接口重试会重复提交；默认不重试，开启要配幂等
- 超时怎么定？→ 连接 1~3s、读取按下游 P99 × 2~3（秒级），别配 None 或巨大值

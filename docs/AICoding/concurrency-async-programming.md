---
group: 并发编程专题
title: 异步编程
order: 7
summary: 异步编程四层递进（Future→CompletableFuture→@Async→MQ），详解 CompletableFuture 编排 API、@Async 三大坑、生产者/消费者模式与 RocketMQ 异步解耦，分析异步的六大代价。
keywords: [CompletableFuture, @Async, RocketMQ, 异步编程, 生产者消费者]
---

# 并发编程 5：异步编程（结合项目）

## 一、异步编程四件套

```
Future（同步等待）  →  CompletableFuture（编排/回调）  →  @Async（方法级）  →  MQ（跨服务解耦）
```

> 异步编程四层递进示意图。

- Future：get() 阻塞，只能等一个结果，无法编排
- CompletableFuture：异步结果 + 回调编排 + 组合（JUC 重点）
- @Async：Spring 方法级异步，底层还是线程池
- MQ（RocketMQ）：跨服务/跨进程异步，削峰解耦（项目回报/清算链路）

面试主线：从"同步阻塞"到"异步编排"到"跨服务解耦"，每层解决什么问题、代价是什么。

## 二、CompletableFuture 核心 API

### 创建
```java
CompletableFuture.supplyAsync(() -> queryData(), executor);  // 有返回值，指定线程池！
CompletableFuture.runAsync(() -> doSomething(), executor);   // 无返回值
// ⚠️ 不传 executor 默认 ForkJoinPool.commonPool（并行度=CPU核数-1，8核=7）——大量使用必须传自定义池
```

### 回调（不阻塞主线程）
```java
future.thenApply(r -> transform(r))        // 同步转换
      .thenAccept(r -> consume(r))         // 消费结果
      .thenRun(() -> log("done"))          // 无参执行
      .exceptionally(e -> defaultValue)    // 异常兜底（项目大量用！）
      .whenComplete((r, e) -> {...})       // 无论成败执行
```

### 组合
```java
cf1.thenCombine(cf2, (r1, r2) -> merge(r1, r2))   // 两个异步结果合并
CompletableFuture.allOf(cf1, cf2, cf3).join()      // 全部完成（并行扇出）
CompletableFuture.anyOf(cf1, cf2).join()           // 任一完成
```

### 项目落点（直接引用）
- `InstServiceImpl`：`CompletableFuture.runAsync(() -> instMessageSendManager.notifyForOrdInst(...)).exceptionally(e -> {...})` —— 指令操作后异步发通知，主链路不等消息推送；exceptionally 兜底防异步异常吞掉
- `AsyncUpdateOrderManager`：`@Async(EXECUTOR_DEAL_PROCESS)` 返回 `CompletableFuture<Void>`，调用方用 allOf 等批量成交处理完成；`messagePushExecutor.execute(...)` 异步推送客户端消息

### 三个面试硬点
1. **ForkJoinPool.commonPool 的坑**：并行度 7，大量 CompletableFuture 不传池 → 互相挤占 + 阻塞任务（IO 等待）把池占死 → IO 型异步必须传自定义 Executor（项目 @Async 指定 EXECUTOR_DEAL_PROCESS）
2. **异常处理**：不 get()/join() 不回调则异常被吞（静默失败）→ exceptionally/whenComplete 兜底（项目每处 runAsync 都挂 exceptionally，好实践）
3. **命名规范**：异步方法名带 Async（AsyncUpdateOrderManager），避免调用方误以为同步

## 三、@Async 深入（Spring 异步）

- `@Async(beanName)` 指定线程池（项目 `@Async(ThreadPoolConst.EXECUTOR_DEAL_PROCESS)`）
- 不指定默认：Spring Boot 的 SimpleAsyncTaskExecutor（每次新建线程、无复用）→ 必须配 ThreadPoolTaskConfig（项目 @EnableAsync + 多套命名池）
- **三个坑**：
  1. 同类内调用失效：this.method() 不走代理，@Async 不生效 → 必须通过注入的 Bean 调用
  2. 异常不抛给调用方：void 方法异常只在日志；返回 CompletableFuture 才能传回（项目 processAuction 返回 CompletableFuture<Void>）
  3. 事务不共享：异步线程不参与调用方事务
- 话术："@Async 本质是 Spring 代理 + 线程池：必须走代理才生效、要返回 CompletableFuture 才能拿异常、事务不跨线程"

## 四、生产者/消费者模式（条件单 V2，项目核心异步架构）

```
生产者（低频扫描）           队列（解耦+削峰）          消费者（异步处理）
producerScheduler            DelayQueue              consumerLoop 常驻线程
1s 扫 H2 发现新单      →     按 chaseTimeInterval  →   poll+drainTo 批量取出
延迟到期才出队                 → 执行线程池 20/50/500
```

> 生产者/消费者架构图。

- 为什么用队列：① 解耦（生产速率 ≠ 消费速率）② 削峰（脉冲摊平）③ 流量控制（限量：队列 ≤1000、每轮 ≤200）④ 延迟调度（DelayQueue 到期才出队）
- 注意：DelayQueue 无界，靠 MAX_TOTAL_QUEUE_SIZE 业务限流兜底——无界队列必须配套业务层限流
- 对比：同步调用简单直接但耦合、无法削峰；队列多一跳但解耦+削峰+可重试
- 与 MQ 区别：进程内队列不跨服务不落盘；跨服务用 RocketMQ（项目回报链路）

## 五、RocketMQ 异步（跨服务解耦）

- asyncSend + SendCallback（项目 `MessagePublishManage.sendPlaceOrderAuctionMessage`）：发送不阻塞主链路
- 为什么下单链路用 MQ 发给报盘前置：① 报盘前置吞吐低 → MQ 削峰 ② 解耦（不依赖前置可用性）③ 失败可重试
- 消费端注意（呼应 JVM 案例 6）：幂等（重复投递）、失败重试有限次 + DLQ、消费 lag 监控
- MQ vs CompletableFuture：进程内编排用 CompletableFuture；跨服务/需可靠投递/削峰用 MQ——异步可靠性层级：内存线程池 < 进程内队列 < MQ（落盘）< 事务消息

## 六、异步的代价（面试必问"异步有什么问题"）

1. 上下文丢失：异步线程没有调用线程 ThreadLocal → TTL 解决
2. 事务边界：异步任务不参与调用方事务 → 异步内自开事务，或先落库再异步通知
3. 异常处理：异步异常不抛给调用方 → exceptionally/回调 + 日志 + 告警
4. 可观测性变差：链路跨线程 → 传 traceId（TTL）+ 日志打点 + MQ trace
5. 顺序问题：并发处理同一实体可能乱序 → 串行池（asset-process core=1）或按 key 哈希固定线程
6. 背压/堆积：消费跟不上生产 → 队列堆积延迟变大 → 限流 + 监控 lag（条件单"消费者反噬"）

## 七、面试话术（1 分钟版）

> "异步分三层：进程内编排用 CompletableFuture——supplyAsync 必须传自定义 Executor（commonPool 并行度只有核数-1，IO 任务会占死），异常用 exceptionally 兜底，指令服务操作后异步发通知就是 runAsync+exceptionally；方法级异步用 @Async——指定线程池、同类调用会失效、要返回 CompletableFuture 才能拿异常；跨服务用 RocketMQ asyncSend——下单链路发给报盘前置就是 MQ 削峰解耦，消费端幂等+有限重试+DLQ。生产者和消费者之间用有界队列削峰控流，条件单拆单就是 DelayQueue 生产者/消费者架构。异步的代价要认清：上下文丢失（TTL 解决）、事务不共享、异常要兜底、链路要打 trace。"

## 八、高频追问

- CompletableFuture 默认线程池？→ ForkJoinPool.commonPool，并行度=CPU核数-1；IO 任务必须自定义池
- get/join 区别？→ get 检查异常（受检），join 不检查（unchecked CompletionException）
- allOf 和 thenCombine？→ allOf 全部完成（返回 Void 需手动取各结果），thenCombine 两结果合并
- @Async 为什么不生效？→ 同类自调用不走代理；或没配 @EnableAsync
- 异步任务事务怎么办？→ 异步内自开事务；先落库再异步
- MQ 消费重复怎么办？→ 幂等（唯一键/Redis 去重）+ 最大重试 + DLQ
- 怎么保证异步顺序？→ 串行池 / 按 key 哈希固定线程 / MQ 单队列单消费者

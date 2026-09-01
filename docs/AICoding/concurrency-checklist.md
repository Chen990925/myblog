---
group: 并发编程专题
title: 并发编程准备点清单
order: 2
summary: 并发编程面试准备总纲，汇总项目并发素材（线程池、锁、容器、TTL）与七大板块核心要点，附优先级建议与文件索引。
keywords: [并发编程, 面试清单, 线程池, 锁分桶, CompletableFuture]
---

# 并发编程准备点清单（目录 / 索引版）

> 这是**总纲**：每个板块只留核心要点 + 指向详细文件。复习/面试前先看这份，细节翻对应文件。
> 详细文件见 `总览.md` 的文件索引。

## 0. 项目并发素材速览（浏览结论）

- **线程池**：`ThreadPoolTaskConfig`（tradeservice：`EXECUTOR_DEAL_PROCESS` + CallerRunsPolicy；orderservice：AbortPolicy）、`MonitorPoolTaskConfig`（CallerRunsPolicy）、`AsyncTaskManager`(1/10)、`FutureAvailQueryManager`(10/100)、条件单三套（`ConditionOrderProcessManager` 20/200、V1 5/20、V2 20/50 + CallerRuns）、yml 里 `data-import`/`monitor` 线程池 core=8/max=200/queue=200
- **CompletableFuture/@Async**：orderservice 指令服务（`InstBankServiceImpl`、`InstServiceImpl`、`PlaceInstManager`、`UpdateInstManager` 等）+ tradeservice `AsyncUpdateOrderManager.processAuction`（`@Async(EXECUTOR_DEAL_PROCESS)` 成交处理）、`DealProcessManager`
- **锁**：`common/avail-engine` 分桶锁（`AvailLockManager` + `MemoryLock` + `BatchMemoryLock` + `DefaultAvailLockFactory` + `Lock`/`AvailLockFactory` 接口）；乐观锁 `updateStatusForTrigger`（preStatus 条件更新）
- **并发容器**：`ConcurrentHashMap`（锁分桶、`runningStrategy` 防重入 putIfAbsent）、`ConcurrentHashMap.newKeySet`（queuedKeys）、`DelayQueue`（条件单 V2 定时拆单）
- **异步**：RocketMQ `asyncSend`（`MessagePublishManage`）、`@Async` 成交处理
- **TTL**：pom 已引入 transmittable-thread-local 2.12.6（异步线程池上下文透传）
- **生产案例衔接**：条件单拆单并发优化（主打案例，见 JVM 专题 `conditional-order-split-optimization.md`）

## 1. JUC 核心原理（面试必问底层）

- synchronized 锁升级：无锁→偏向→轻量→重量；volatile 可见性+有序性不保证原子性
- CAS + ABA（AtomicStampedReference）；AQS = state + CLH 队列 + 模板方法
- ReentrantLock vs synchronized（可中断/超时/公平/多条件）
- 项目落点：avail-engine ReentrantLock 分桶；updateStatusForTrigger 乐观锁（CAS 思想）
- **详见 `并发编程1-JUC核心原理.md`**

## 2. 线程池（项目素材最密集）

- 七大参数 + 执行流程：core 满先入队、队满扩容、超 max 拒绝
- 拒绝策略按任务可丢性选：成交 CallerRuns / 可重试 Discard / 风控 Abort
- 线程数预估：吞吐反推 峰值QPS × 单任务耗时（条件单 667×200ms≈133 线程）
- 项目对比：deal-process 8/200/200 CallerRuns、orderservice Abort、条件单 V2 20/50/500 CallerRuns
- **详见 `并发编程2-线程池.md`**

## 3. 锁的应用 + 并发容器（项目实战）

- 锁选型四象限：悲观/乐观 × 本地/分布式
- avail-engine 分桶锁：ConcurrentHashMap 懒加载 + putIfAbsent 原子创建、锁粒度、BatchMemoryLock 锁顺序
- 乐观锁：updateStatusForTrigger（preStatus 条件更新，updateCount>0 判断）
- 分布式锁：Redis SETNX 三坑（过期/释放校验/续期）；Lua 原子扣减
- ConcurrentHashMap（CAS+synchronized 锁桶头）、DelayQueue（到期才出队零空跑）
- **详见 `并发编程3-锁的应用与并发容器.md`**

## 4. ThreadLocal / TTL

- 原理：线程私有 ThreadLocalMap，key 弱引用；泄漏是 value 泄漏（finally remove）
- 线程池三大坑：脏数据串号 / value 泄漏 / 上下文丢失
- TTL（transmittable-thread-local 2.12.6）：TtlRunnable capture/replay/restore
- **详见 `并发编程4-ThreadLocal与TTL.md`**

## 5. 异步编程（项目大量使用）

- CompletableFuture：supplyAsync 必须传自定义 Executor（commonPool 并行度=核数-1）、exceptionally 兜底
- @Async：指定线程池、同类调用失效、返回 CompletableFuture 拿异常
- 生产者/消费者（条件单 V2 DelayQueue）+ RocketMQ asyncSend
- 异步代价：上下文丢失（TTL）、事务不共享、异常兜底、顺序、背压
- **详见 `并发编程5-异步编程.md`**

## 6. 并发问题排查（衔接 JVM 排查）

- 并发问题特征：偶发、概率性、单线程正确
- 五步法：收集现场 → 定性 → 复现 → 定位 → 修复验证
- 死锁：jstack 连打两次搜 deadlock；竞态：check-then-act / 读改写 / 可见性三类模式
- **详见 `并发编程6-并发问题排查.md`**

## 7. 优先级建议

1. 先啃透：JUC 核心原理 + 线程池（面试必考 + 项目素材最密集）
2. 再补：锁的应用 + 并发容器（结合 avail-engine/条件单）
3. 然后：ThreadLocal/TTL + 异步编程 + 并发排查
4. 主打案例：条件单拆单并发优化（真实亲历，见 JVM 专题）

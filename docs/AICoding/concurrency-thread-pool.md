---
group: 并发编程专题
title: 线程池
order: 4
---

# 并发编程 2：线程池（结合项目）

## 一、七大参数与执行流程（必背）

```java
ThreadPoolExecutor(int corePoolSize,      // 核心线程数：常驻
                   int maximumPoolSize,   // 最大线程数：核心+临时
                   long keepAliveTime,    // 临时线程空闲存活时间
                   TimeUnit unit,
                   BlockingQueue<Runnable> workQueue,  // 任务队列
                   ThreadFactory threadFactory,        // 线程工厂（命名！）
                   RejectedExecutionHandler handler)   // 拒绝策略
```

**执行流程**：
```
提交任务
 ├─ 线程数 < corePoolSize → 新建核心线程执行
 ├─ 线程数 ≥ corePoolSize → 入队（workQueue）
 ├─ 队列满 → 线程数 < maxPoolSize → 新建临时线程执行
 └─ 队列满 且 线程数 ≥ maxPoolSize → 走拒绝策略
```

> 流程图仅作示意，非实际代码。

**关键认知**：
- **先入队后扩线程**：core 满后任务先排队，队满才扩到 max
- 临时线程空闲 keepAliveTime 回收；allowCoreThreadTimeOut(true) 可回收核心线程
- **线程工厂必须命名**（项目用 Guava ThreadFactoryBuilder setNameFormat）：不命名 jstack 全是 pool-1-thread-N 无法定位——生产经验话术

## 二、四种拒绝策略（含项目对比）

| 策略 | 行为 | 风险 | 适用 |
|---|---|---|---|
| AbortPolicy | 抛 RejectedExecutionException | 任务丢失 | 快速失败暴露问题 |
| CallerRunsPolicy | 提交线程自己执行 | 调用方被拖慢 | 不想丢任务 |
| DiscardPolicy | 静默丢弃 | 静默丢任务 | 允许丢的 |
| DiscardOldestPolicy | 丢队头最老任务 | 老任务丢失 | 追求最新数据 |

**项目对比（直接讲）**：
- tradeservice 成交处理（EXECUTOR_DEAL_PROCESS）：CallerRuns —— 成交不能丢，宁可降速
- orderservice 默认异步：自定义 handler（log.error 丢弃）—— 静默丢弃是隐患
- orderservice riskTrail/riskTrailLog：Abort —— 风控留痕严格暴露
- 条件单 V2：CallerRuns —— 高峰期反噬消费者线程（案例已分析，更优解=延时重新入队）
- 条件单 V1：丢弃 —— 扫描周期 100ms 可重试，丢了下一轮补（可重试任务用丢弃的合理场景）

话术："拒绝策略取决于任务可丢性：成交不能丢用 CallerRuns；可重试扫描用 Discard；风控留痕用 Abort。"

## 三、项目线程池全景（对比表）

| 线程池 | core/max/queue | 拒绝策略 | 用途 |
|---|---|---|---|
| tradeservice EXECUTOR_DEAL_PROCESS | 8/200/200（yml） | CallerRuns | 成交处理（@Async） |
| tradeservice message-push | 4/200/200 | CallerRuns | 消息推送 |
| tradeservice asset-process | 1/1/200 | CallerRuns | 资产处理（串行！） |
| orderservice 默认 taskExecutor | 8/200/**(5!)** | 丢弃+日志 | 异步方法 |
| orderservice riskTrail | 8/200/**(5!)** | Abort | 风控留痕 |
| MonitorPoolTaskConfig | yml | CallerRuns | 监控任务 |
| AsyncTaskManager | 1/10/1000 | 默认 | 异步小任务 |
| FutureAvailQueryManager | 10/100 | - | 期货额度查询 |
| 条件单 V2 | 20/50/500 | CallerRuns | 拆单执行 |
| yml data-import / monitor | 8/200/200 | - | 数据导入/监控 |
| scheduled-pool-core-size | 8 | - | 定时任务 |

**设计思想**：
1. 线程池隔离：成交/推送/资产/风控/行情/定时独立池 → 一个池打满不影响其他链路
2. 按链路重要级配拒绝策略：核心交易 CallerRuns、风控 Abort、可重试 Discard
3. 串行池（asset-process core=1/max=1）：保顺序/串行业务用单线程池
4. 命名规范：所有池有前缀，jstack 可定位

## 四、线程数预估（面试硬货，呼应条件单案例）

- CPU 密集：`CPU 核数 + 1`（8 核 → 9）
- IO 密集：`CPU 核数 × (1 + 等待时间/计算时间)` 或 核数×2~4
- **吞吐反推**：`所需线程数 = 峰值 QPS × 单任务耗时`
  - 条件单案例：667 笔/s × 200ms ≈ 133 线程 > max 50 → 积压
  - 优化后：200 笔/s × 50ms = 10 线程 → 够用
- 话术："线程数不是拍脑袋：先定目标吞吐（QPS×时延），再算单任务耗时，相乘即所需并发，再按任务类型（CPU/IO 密集）修正"

## 五、常见坑（主动讲，加分）

1. **Executors 快捷方法的坑**：
   - newFixedThreadPool：LinkedBlockingQueue 无界 → 任务无限堆积内存撑爆
   - newCachedThreadPool：SynchronousQueue + 无限 max → 线程数失控
   - newScheduledThreadPool：核心池固定 + 无界队列（条件单 V2 producerScheduler 用它，只放 3 个定时任务，风险可控）
   - 结论：手动 new ThreadPoolExecutor 设满七大参数（项目 yml 配置化，正确做法）
2. **ThreadPoolTaskExecutor（Spring 封装）的坑**：setQueueCapacity / setKeepAliveSeconds 值与意图相反（orderservice 代码里 queueCapacity=5、keepAlive=200s，与注释相反）→ 队列容量只有 5，任务一多就拒绝；keepAlive 200s 临时线程迟迟不回收。⚠️ 讲之前先确认是否有意为之
3. **ForkJoinPool.commonPool**：CompletableFuture 默认用它，并行度 = CPU 核数 - 1（8 核 = 7）→ 大量 CompletableFuture 不传自定义 Executor 互相挤占（第 6 块细讲）
4. **线程池用完不 shutdown**：Spring 管理的 Bean 没事；静态自建线程池要 @PreDestroy shutdown（条件单 V2 shutdownAll 是对的）

## 六、@Async 与线程池

- `@Async(ThreadPoolConst.EXECUTOR_DEAL_PROCESS)` 指定线程池 Bean（项目成交处理）
- 不指定默认 SimpleAsyncTaskExecutor（每任务新建线程无复用）→ 必须配 ThreadPoolTaskConfig（项目 @EnableAsync + taskExecutor Bean）
- @Async 的坑：同类内调用不生效（代理失效）；异常要自己 catch；事务与异步线程不共享

## 七、线程池监控（生产经验）

- 四个水位：activeCount、queue.size、taskCount、拒绝次数（拒绝策略打点）
- jstack：`"stock-cond-v2-exec-3" ... WAITING (parking)` 线程名定位到池
- 条件单 V2 生产者日志打印 queue.size/queuedKeys.size（排队可观测，好实践）
- 告警：队列水位 > 80%、拒绝次数 > 0

## 八、面试话术（1 分钟版）

> "线程池按'参数-流程-策略-预估'讲：七大参数里关键是 core/max/queue 配合，流程是 core 满先入队、队满扩容、超 max 拒绝；拒绝策略按任务可丢性选——成交用 CallerRuns、可重试扫描用 Discard、风控用 Abort；线程数按吞吐反推（QPS×耗时），条件单 667 笔/s × 200ms 需 ~133 线程，优化后 50ms 只需 10 线程。生产上每个池命名、yml 配置化、监控队列水位和拒绝次数，jstack 直接定位线程池。"

## 九、高频追问

- core=0 会怎样？→ 任务直接入队，无双核常驻，空闲全回收
- 队列有界无界？→ 有界 + 合理容量，无界内存撑爆
- 线程数设多少？→ CPU 密集 N+1、IO 密集 N×(1+等待/计算)、吞吐反推 QPS×耗时，再压测修正
- CallerRuns 副作用？→ 提交线程被占用，可能阻塞主链路（条件单消费者反噬）
- 优雅关闭？→ shutdown → awaitTermination → shutdownNow
- 单任务耗时很长？→ 超时 + 拒绝策略 + 监控，别无限等

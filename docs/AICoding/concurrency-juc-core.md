---
group: 并发编程专题
title: JUC 核心原理
order: 3
---

# 并发编程 1：JUC 核心原理（结合项目）

## 一、synchronized 与锁升级

- **本质**：JVM 层互斥锁，基于 monitor，`monitorenter`/`monitorexit` 指令
- **锁升级路径（JDK1.6 后）**：无锁 → 偏向锁 → 轻量级锁 → 重量级锁（只升不降，偏向锁可批量撤销）
  - 偏向锁：单线程访问，Mark Word 记录线程 ID，重入无需 CAS
  - 轻量级锁：第二个线程竞争，CAS 替换 Mark Word → 自旋等待，不进内核态
  - 重量级锁：自旋超阈值/竞争激烈，依赖 OS mutex，用户态→内核态切换代价大
- **易错点**：锁的是对象（Mark Word）；可重入（计数器）；异常自动释放（区别于 Lock 必须 finally unlock）
- 项目落点：下单链路大量 synchronized 保护短临界区；长临界区/超时控制用 ReentrantLock

## 二、volatile

- 可见性：写刷主内存、读从主内存（内存屏障）
- 有序性：禁止指令重排（读写前后插屏障）
- **不保证原子性**：count++ 是读-改-写三步 → 用 AtomicInteger 或锁
- 经典场景：状态标志位（`volatile boolean running`）；DCL 单例（防半初始化对象重排）
- **项目落点（直接引用）**：`StockConditionOrderProcessManagerV2` 的 `volatile boolean running`（消费者循环开关）、`volatile ScheduledFuture<?>`、`volatile String cachedDate`（日内缓存）

## 三、CAS 与 ABA

- CAS：`compareAndSet(expected, update)`，CPU 原子指令（lock cmpxchg），无锁编程基础
- **ABA**：A→B→A 无法察觉 → `AtomicStampedReference`（版本号）
- 自旋 CAS 开销：竞争激烈时大量自旋空转（呼应额度锁/条件单案例的"自旋"）
- **CAS 三个层次（面试话术）**：
  1. 原子类：AtomicInteger / AtomicLong / AtomicReference
  2. JUC 容器内部：ConcurrentHashMap.putIfAbsent、AQS state
  3. 数据库乐观锁：`update ... where preStatus = ?`，updateCount > 0 判断成功
- **项目落点（三处）**：
  1. `AvailLockManager`：`ConcurrentHashMap.putIfAbsent(lockKey, lock)` 解决 check-then-act 竞态（先查后插会重复创建）
  2. `MemoryLock`：`AtomicReference<Date> lastActiveTime`（CAS 更新活跃时间，供清理线程判断锁过期）
  3. `updateStatusForTrigger`：DB 乐观锁（preSchemeStatus 条件 UPDATE），并发触发只有一个线程抢到状态流转

## 四、AQS（AbstractQueuedSynchronizer）

- 一句话：**state 状态变量 + CLH 双向等待队列 + 模板方法**
- 获取锁失败 → Node 入队阻塞（LockSupport.park）；释放 → 唤醒队首（unpark）
- state：volatile int，CAS 修改。ReentrantLock 记重入次数 / Semaphore 记许可证 / CountDownLatch 记倒数
- 独占（ReentrantLock） vs 共享（Semaphore/CountDownLatch/ReadWriteLock）
- CLH 队列：FIFO，公平锁基础
- 模板方法：tryAcquire/tryRelease 子类实现；公平/非公平就差 `hasQueuedPredecessors()`（非公平抢锁前不查队列，可插队，吞吐高可能饿死队首）
- 话术："AQS 维护 volatile state + FIFO 等待队列，获取失败入队阻塞、释放唤醒队首；ReentrantLock/Semaphore/CountDownLatch 都是子类"

## 五、ReentrantLock vs synchronized（对比表）

| 维度 | synchronized | ReentrantLock |
|---|---|---|
| 实现 | JVM 指令（monitor） | AQS（Java 代码） |
| 锁升级 | 偏向→轻量→重量 | 无（CAS + 队列） |
| 可中断 | ✗ | ✓ lockInterruptibly() |
| 超时 | ✗ | ✓ tryLock(time, unit) |
| 公平锁 | ✗ | ✓ new ReentrantLock(true) |
| 多条件 | ✗ | ✓ newCondition() |
| 释放 | 异常自动释放 | 必须 finally unlock |

- **项目落点**：avail-engine 用 `ReentrantLock.tryLock(time, unit)`——额度冻结不能无限等锁，超时直接失败/降级；synchronized 做不到超时控制

## 六、项目真实代码加分讲解点（基于源码）

1. **MemoryLock（额度锁包装）**：
   - 内部 ReentrantLock + `AtomicReference<Date> lastActiveTime`
   - tryLock 更新 lastActiveTime → 配合定时清理线程解决"锁 Map 只增不减"泄漏（过期锁从 AvailLockManager 移除）——回答"无界容器膨胀怎么办"
   - unlock 有 `isHeldByCurrentThread()` 判断 → 避免非持有线程误 unlock 抛 IllegalMonitorStateException
2. **BatchMemoryLock（批量锁）**：
   - 持有 `List<Lock>` 逐个 tryLock/unlock → 一单多券（组合）额度批量冻结
   - 主动暴露风险点："逐个 tryLock 第 N 个失败时前 N-1 个已获取锁未回滚释放，会短期持有锁；严格写法应 catch 后回滚释放前序锁"（主动思考加分）
3. **锁粒度设计**：按 StockLockKey（客户+证券）/ CashLockKey（客户+资金）分桶——锁粒度 = 冲突概率 × 并行度 的权衡

## 七、面试话术（1 分钟版）

> "并发编程我的根基是 AQS + CAS 这条线：synchronized 靠锁升级优化无竞争场景；volatile 用内存屏障保证可见性和有序性但不保证原子性；CAS 是无锁基础，配合 AtomicReference 和 ConcurrentHashMap 的 putIfAbsent 解决原子创建；AQS 用 state + CLH 队列统一了 ReentrantLock/Semaphore/CountDownLatch 的语义。项目里：额度引擎用 ReentrantLock 分桶加锁 + tryLock 超时（不能无限等锁），用 AtomicReference 记录锁最后活跃时间配合清理防泄漏；条件单状态流转用数据库乐观锁（preStatus 条件更新）——这就是 CAS 思想在业务层的落地。"

## 八、高频追问准备

- 锁升级能降级吗？→ 偏向锁可批量撤销，重量级不可降回轻量级
- volatile 的 happens-before？→ 写 volatile 之前的操作对读 volatile 之后的线程可见（写/读屏障）
- CAS 的缺点？→ ABA、自旋 CPU 开销、只能保证单个变量原子
- 为什么 JDK8 ConcurrentHashMap 弃分段锁？→ 段数量固定 16 扩容锁全表；JDK8 改 CAS + synchronized 锁桶头，粒度更细
- 公平锁性能为什么差？→ 每次检查队列 + 可能被唤醒，上下文切换多

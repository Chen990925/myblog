---
group: 并发编程专题
title: 并发编程速记卡
order: 9
---

# 并发编程速记卡（临场回忆 / 快速准备版）

> 用法：面试前 10 分钟扫一遍；被问到并发话题先定位板块，按"引导句"展开。细节翻对应笔记。

## 1. JUC 核心原理

- 引导句：**"并发根基是 AQS + CAS 这条线"**
- synchronized 锁升级：无锁→偏向→轻量→重量（只升不降）；锁的是对象（Mark Word）
- volatile：可见性+有序性（内存屏障），**不保证原子性**（count++ 丢更新）
- CAS：compareAndSet 原子指令；ABA 用 AtomicStampedReference；自旋是双刃剑
- AQS：**state + CLH 队列 + 模板方法**；ReentrantLock/Semaphore/CountDownLatch 都是子类
- ReentrantLock 强在：可中断 / tryLock 超时 / 公平锁 / newCondition 多条件
- 项目：avail-engine ReentrantLock 分桶 + tryLock 超时；updateStatusForTrigger = DB 乐观锁（CAS 落地）

## 2. 线程池

- 引导句：**"参数-流程-策略-预估"**
- 流程：core 满先入队 → 队满扩容 → 超 max 拒绝（不是先扩线程！）
- 拒绝策略按可丢性：成交 CallerRuns / 可重试 Discard / 风控 Abort
- 线程数 = 峰值 QPS × 单任务耗时（条件单 667×200ms≈133 线程，优化后 50ms 只需 10）
- 坑：Executors 快捷方法（无界队列/无限线程）；线程必须命名（jstack 可定位）；@Async 同类调用失效
- 项目：deal-process 8/200/200 CallerRuns、orderservice Abort、条件单 V2 20/50/500

## 3. 锁与并发容器

- 引导句：**"悲观/乐观 × 本地/分布式 四象限"**
- 分桶锁：ConcurrentHashMap 懒加载 + putIfAbsent 原子创建；粒度 = 冲突率 × 并行度
- BatchMemoryLock：多把锁组合，**固定锁顺序防死锁**；tryLock 失败要回滚前序锁
- 乐观锁：`update ... where preStatus=?`，updateCount>0 即成功
- Redis 分布式锁三坑：过期时间 / 释放 Lua 校验 value / 续期
- ConcurrentHashMap：CAS+synchronized 锁桶头；putIfAbsent 原子防重入（runningStrategy）
- DelayQueue：到期才出队零空跑（条件单定时拆单）

## 4. ThreadLocal / TTL

- 引导句：**"finally remove + 线程池会串号"**
- 原理：线程私有 ThreadLocalMap，key 弱引用 → **泄漏是 value 泄漏**（线程常驻 + 不 remove）
- 线程池三坑：脏数据串号（金融大忌）/ value 泄漏 / 上下文丢失
- TTL：TtlRunnable capture/replay/restore；线程池复用后每次提交重新快照（InheritableThreadLocal 做不到）
- 项目：OmsContextHolder 用户上下文，异步链路靠 TTL 2.12.6 透传

## 5. 异步编程

- 引导句：**"进程内 CompletableFuture，方法级 @Async，跨服务 MQ"**
- CompletableFuture：supplyAsync **必须传自定义 Executor**（commonPool 并行度=核数-1）；exceptionally 兜底异常
- @Async：指定线程池、同类调用失效、返回 CompletableFuture 才能拿异常、事务不共享
- 生产者/消费者：DelayQueue 解耦削峰控流（条件单 V2）；无界队列要业务限流
- RocketMQ：asyncSend 不阻塞；消费幂等 + 有限重试 + DLQ
- 异步代价：上下文（TTL）/ 事务 / 异常 / trace / 顺序 / 背压

## 6. 并发问题排查

- 引导句：**"先复现、再取证、后定位；并发问题特征 = 偶发 + 单线程正确"**
- 五步：收集现场 → 定性 → 复现 → 定位 → 修复验证
- 死锁：jstack 连打两次搜 "deadlock" → 循环依赖链 → 固定锁顺序 + tryLock 超时
- 竞态三类模式：check-then-act（putIfAbsent/DB 条件更新）/ 读改写非原子（原子累加）/ 可见性缺失（volatile）
- 线程池耗尽：jstack 大量 WAITING + 栈底（Feign/DB/MQ）→ 超时熔断隔离 或 容量量化
- 取证：日志埋点打印线程名+中间值（两条相同日志=竞态实锤）；压测复现

## 7. 高频追问口袋（一句答）

- volatile 能替代 synchronized？→ 不能，缺原子性；单写多读可
- 公平锁为什么慢？→ 每次检查队列 + 唤醒，上下文切换多
- ThreadLocal 为什么不 remove 泄漏？→ key 弱引用被回收，value 强引用链 + 线程常驻
- @Async 为什么不生效？→ 同类自调用不走代理
- 异步任务事务？→ 异步内自开事务 / 先落库再异步
- MQ 重复消费？→ 幂等（唯一键/Redis 去重）+ 重试上限 + DLQ

## 8. 项目并发全景一句话

**线程池隔离 + 拒绝策略分级（成交 CallerRuns/风控 Abort）+ 分桶锁（putIfAbsent 原子创建 + tryLock 超时）+ 乐观锁状态流转 + DelayQueue 定时拆单（生产者/消费者）+ CompletableFuture 异步编排 + RocketMQ 解耦 + TTL 上下文透传** —— 主打案例：条件单 2000 笔同时触发优化（削峰/简化校验/聚合批量/拒绝策略改造）。

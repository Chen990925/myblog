---
group: 并发编程专题
title: 锁的应用与并发容器
order: 5
summary: 锁选型四象限（悲观/乐观 × 本地/分布式）、avail-engine 分桶锁四层结构深度解析、乐观锁状态流转、Redis 分布式锁，以及 ConcurrentHashMap、DelayQueue 等并发容器实战。
keywords: [锁选型, 分桶锁, ConcurrentHashMap, DelayQueue, 分布式锁, 乐观锁]
---

# 并发编程 3：锁的应用 + 并发容器（结合项目）

## 一、锁的选型框架

```
               悲观锁                    乐观锁
               ─────                     ─────
JVM 内         synchronized /           AtomicInteger / CAS /
               ReentrantLock            ConcurrentHashMap.putIfAbsent
               （avail-engine 分桶锁）   （runningStrategy 防重入）
跨实例         Redis SETNX /            Redis Lua 校验+更新 /
（分布式）       ZK 分布式锁              DB 乐观锁（updateStatusForTrigger）
```

> 锁选型四象限示意图。

- 悲观锁：先假设冲突先拿锁（写多读少、临界区长）
- 乐观锁：提交时校验版本（读多写少、状态流转、失败重试成本低）
- 本地 vs 分布式：本地锁零开销单实例够用；跨实例必须分布式

## 二、avail-engine 分桶锁深度解析

### 结构全景（四层）
```
AvailLockManager（锁桶管理）
  ├─ ConcurrentHashMap<StockLockKey, Lock> stockLockHolder   // 按 客户+证券 分桶
  └─ ConcurrentHashMap<CashLockKey, Lock>  cashLockHolder    // 按 客户+资金 分桶
        ├─ MemoryLock      （单把锁：ReentrantLock + AtomicReference<Date> lastActiveTime）
        └─ BatchMemoryLock （多把锁组合：List<Lock>，逐把 tryLock/unlock）
DefaultAvailLockFactory.build(TradeInput)  // 按业务类型组装锁组合
  └─ LockKeyConverter 生成 key（含 interCode/positionType/marketNo 等维度）
```

### 关键设计点
1. **锁粒度 = 冲突概率 × 并行度**：不同客户/证券额度互不相关 → 分桶互不阻塞；key 维度与"额度按客户×证券×资金汇总"业务对齐；粒度越细并行越高但 Map 越大
2. **懒加载 + 原子创建（check-then-act 标准解法）**：
```java
Lock lock = stockLockHolder.get(lockKey);
if (lock != null) return lock;
lock = new MemoryLock(new ReentrantLock());
Lock pre = stockLockHolder.putIfAbsent(lockKey, lock);  // 原子：返回旧值
return pre != null ? pre : lock;                        // 拿已存在的，避免双锁
```
   先查后插会重复创建两把锁 → putIfAbsent 保证全局一把 → CAS 思想在容器层的落地
3. **DefaultAvailLockFactory.build 按业务组装**：质押转出=标准券+债券两把锁、正回购=标准券+资金两把锁 → BatchMemoryLock；**锁顺序固定（先证券后资金）→ 防 ABBA 死锁**
4. **MemoryLock.unlock 防御**：`isHeldByCurrentThread() && isLocked()` 才 unlock → 防非持有线程误调用抛 IllegalMonitorStateException
5. **BatchMemoryLock 风险点（主动讲）**：逐把 tryLock 第 N 把失败时前 N-1 把已获取未回滚就 return false → 应 catch 后回滚释放前序锁

### 真实改进点（面试加分）
- `MemoryLock.lastActiveTime`（tryLock 时更新）意图配合定时清理线程，从 AvailLockManager 移除长期不用的锁，解决"ConcurrentHashMap 只增不减"锁泄漏
- **但全项目没有消费 lastActiveTime 的清理逻辑** → 可讲："发现额度锁 Map 只增不减有泄漏风险，lastActiveTime 已预留，我补定时清理任务：超 N 分钟无访问且无持有者的锁从 Map 移除"

## 三、乐观锁（CAS 思想在业务层落地）

**updateStatusForTrigger（条件单状态流转）**：
```java
update.setPreSchemeStatus(NOT_TRIGGER);  // 期望旧状态
update.setTgtSchemeStatus(TRIGGER);      // 目标状态
int updateCount = dao.updateConditionOrder(update);  // update ... where preStatus=?
if (updateCount > 0) return true;   // 抢到状态流转
return false;                       // 别人已流转，本次放弃
```
- 原理：DB 行级锁 + 条件更新保证原子性，updateCount>0 即 CAS 成功
- 为什么用乐观锁：条件单触发是"一次状态流转"，多触发源（定时扫描/手动/外部回报）并发只有第一个成功，失败放弃或下一轮再试——读多写少、失败重试成本低
- 对比悲观锁：synchronized/分布式锁包"查→改"每次抢锁，2000 笔并发锁竞争激烈；乐观锁直接撞条件无锁等待
- 同模式：updateAfterPlaceOrder（`SET entrusted_qty = entrusted_qty + ?` 原子累加）、updateConditionOrder

## 四、分布式锁（跨实例才需要）

- **Redis SETNX**（条件单 V1 用过 RedisUtil.tryLock）：
  - 正确姿势：`SET key value NX EX 30`（原子+过期防死锁）+ 释放 Lua 校验 value（防误删别人锁）+ 续期看门狗
  - 常见错误：无过期时间（宕机永锁）、setnx 与 expire 分两步（中间宕机）、直接 DEL（删别人锁）
- **Redis + Lua 原子扣减**（额度扣减优化方向）：校验额度→扣减→流水合进一个 Lua 脚本天然原子，跨实例可用；对比本地分桶锁："单实例本地锁零开销；多实例改 Redis Lua"
- **ZK 分布式锁**（临时顺序节点）：可靠但性能差，低频强一致场景
- 话术："本地锁优先（零开销），跨实例才分布式锁；优先 Redis，注意过期、释放校验、续期三坑"

## 五、并发容器

### 1. ConcurrentHashMap（JDK8 重写）
- 结构：数组+链表/红黑树；**CAS 定位桶 + synchronized 锁桶头**（替代 JDK7 分段锁）；读操作无锁（volatile）
- size() 用 LongAdder 思想（baseCount + CounterCell）避免热点
- **putIfAbsent 原子性** → 项目三处：
  1. AvailLockManager 懒加载锁
  2. 条件单 runningStrategy.putIfAbsent(key, TRUE) 防重入
  3. 失败处理 finally removeFromPool（V1 包装任务 finally remove，对的）
- 追问：为什么弃分段锁？→ 段固定 16 扩容锁全表；JDK8 锁桶头粒度细 + 红黑树优化哈希冲突
- 陷阱：size() 近似值；computeIfAbsent 的函数可能多次执行（JDK8 bug 历史）→ 用 putIfAbsent 更可控

### 2. DelayQueue（条件单 V2 定时拆单核心）
- 原理：无界阻塞队列，元素实现 Delayed（getDelay 剩余延迟），take() 阻塞到队首到期
- 实现：内部 PriorityQueue（按延迟排序）+ available 条件变量 + leader-follower（单线程 await 队首避免惊群）
- 项目用法：DelayOrder 实现 Delayed（triggerTimeMillis），消费者 poll(500ms)+drainTo(200) 批量取到期
- **对比 ScheduledExecutorService**：
  - DelayQueue 适合"任务集合动态、每笔独立节奏"（2000 笔条件单各 3s 周期到期自消费）——零空跑
  - ScheduledExecutorService 适合"固定频率周期任务"（生产者 1s 扫描）
  - 条件单 V2 两者都用：producer=scheduleAtFixedRate，consumer=DelayQueue
- 话术："条件单拆单用 DelayQueue 按 chaseTimeInterval 调度，到期才出队，2000 笔各管各节奏零空跑；用 scheduleAtFixedRate 得为每笔建定时任务，管理成本高"

### 3. 其他容器一句话
- `ConcurrentHashMap.newKeySet()`：并发 Set（queuedKeys 去重）
- `CopyOnWriteArrayList`：读多写少写时复制
- `BlockingQueue`：LinkedBlockingQueue（有界/无界）、ArrayBlockingQueue（有界定长）、SynchronousQueue（无缓冲直传）、PriorityBlockingQueue
- 选型：线程池任务队列用有界 LinkedBlockingQueue；需公平定长用 ArrayBlockingQueue

## 六、死锁与排查（衔接 JVM 排查）

- 死锁四条件：互斥 / 持有并等待 / 不可剥夺 / 循环等待
- 代码预防：固定锁顺序（先证券后资金）；tryLock 带超时；减少持锁范围
- 排查：`jstack` 搜 "Found one Java-level deadlock" → 循环依赖链
- 活锁：互相让锁 → 随机退避

## 七、面试话术（1 分钟版）

> "锁的选型我按悲观/乐观、本地/分布式四象限：额度扣减是典型悲观锁——按客户+证券分桶（ConcurrentHashMap 懒加载 + putIfAbsent 原子创建），每把锁 tryLock 带超时，多标的用 BatchMemoryLock 固定锁顺序防死锁；条件单状态流转是典型乐观锁——update ... where preStatus=?，updateCount>0 判断抢到，2000 笔并发只有一笔流转成功，失败下一轮再试。分布式锁单实例不上，跨实例才用 Redis，注意过期时间和释放校验。并发容器：ConcurrentHashMap 用 CAS+synchronized 锁桶头，putIfAbsent 解决原子创建；DelayQueue 做条件单定时拆单，到期才出队零空跑。"

## 八、高频追问

- 乐观锁失败率高？→ 重试+退避；冲突率高改悲观锁
- 分桶数怎么定？→ 按业务维度（客户×证券），粒度=冲突率×并行度；动态 key 防无限增长
- Redis 释放为什么不直接 DEL？→ 可能删掉别人刚续期/新获取的锁，Lua 校验 value
- DelayQueue vs 定时任务？→ 前者动态任务集合按到期自取，后者固定周期调度
- ConcurrentHashMap size 精确吗？→ 近似值，精确统计用迭代
- 怎么发现死锁？→ jstack 搜 deadlock；预防靠锁顺序 + tryLock 超时

---
group: 并发编程专题
title: 并发问题排查
order: 8
---

# 并发编程 6：并发问题排查流程（结合项目）

## 零、核心认知：并发问题和其他 Bug 的本质区别

> 并发问题的特征：**偶发、概率性、依赖时序**——"单线程跑永远对，并发跑偶尔错"。排查第一原则不是"读代码找错"，而是**先复现、再取证、后定位**。没有现场证据的并发分析都是猜测。

## 一、并发问题的全景分类（先给问题"归类定性"）

| 类别 | 特征 | 典型证据 |
|---|---|---|
| 死锁 | 线程互相等锁，全卡死 | jstack "Found one Java-level deadlock" |
| 竞态（race） | 数据偶发错乱，看代码"没问题" | 概率性错误、压测必现 |
| 可见性/重排 | 共享变量读到旧值、标志位不退出 | 线程一直跑但逻辑不对 |
| 线程池问题 | 接口变慢、拒绝、堆积 | jstack 大量 WAITING、队列水位高 |
| 线程不安全对象 | 数据损坏、偶发异常 | SimpleDateFormat/HashMap/ArrayList |
| 顺序错乱 | 状态回退、被旧数据覆盖 | 异步并发处理同一实体 |
| 内存泄漏（并发相关） | 老年代涨、OOM | ThreadLocal 未 remove、无界 Map |

**第一步永远是定性**：看到现象先归到某一类，不同类的取证工具完全不同（死锁看 jstack、竞态看数据/日志、线程池看监控）。

## 二、通用排查五步法（面试主线）

```
① 收集现场（证据优先，别先改代码）
② 分类定性（上面七类之一）
③ 复现（压测/并发测试/日志埋点）
④ 定位根因（代码审查 + 证据链）
⑤ 修复 + 并发验证 + 生产观察
```

**① 收集现场（黄金法则：先保留现场再处理）**：
- `jstack <pid>` 连打 3 次（间隔 5s）——线程状态分布，死锁/阻塞/等待各有特征
- `jstat -gcutil` + 监控：排除 GC 因素
- 业务日志 + 时间戳：错误发生的时间窗口和上下文
- 线程池监控：activeCount / queue.size / 拒绝次数
- 进程要重启 → 先 dump（heap + thread），否则现场丢失

**② 定性**：现象 → 七类之一（逐场景取证）

**③ 复现**：多线程压测（JMeter / CountDownLatch 并发触发）；jcstress（JMM 验证）；日志埋点（可疑读改写处打印中间状态）；复现不了 = 加观测继续等

**④ 定位**：代码审查重点找三类模式（见场景二）

**⑤ 修复验证**：并发测试跑 N 轮 + 压测对比 + 生产灰度观察

## 三、场景一：日志突然发现死锁（最常见、最好取证）

**现象**：某接口突然全部卡住/超时。

**取证（三步）**：
```bash
jstack <pid> > t1.txt
sleep 5
jstack <pid> > t2.txt   # 连打两次对比，确认线程状态没变（真死锁 vs 临时阻塞）
```
- t1 搜 **"Found one Java-level deadlock"** → 直接给出循环依赖链：
  ```
  "Thread-A" waiting to lock 0x... (持有 B)
  "Thread-B" waiting to lock 0x... (持有 A)
  ```
- 对比两次快照：同一批线程栈纹丝不动 = 确认死锁（而非偶发慢）

**分析**：死锁四条件（互斥/持有并等待/不可剥夺/循环等待）——代码层面最容易踩"循环等待（锁顺序不一致）"和"持有并等待"；多把锁交叉获取：A 拿锁1等锁2、B 拿锁2等锁1

**项目真实相关点（直接讲）**：
- `BatchMemoryLock`：一把交易同时锁"标准券+债券"或"标准券+资金"多把锁——不同业务类型加锁顺序不一致（有的先证券后资金、有的先资金后证券）→ 两个交易互相等 → 死锁。**解法：全局固定加锁顺序（先证券后资金）**，`DefaultAvailLockFactory` 就是这个顺序
- 本地锁 + DB 锁交叉：先拿内存额度锁、事务里再拿 DB 行锁，另一个线程反过来也会死锁——锁的获取顺序要全局一致

**修复手段**：
1. 固定锁顺序（根治循环等待）
2. tryLock 带超时：拿不到就失败/重试，不死等（MemoryLock 已有 tryLock(time)——"额度锁都带超时，超时直接失败，天然防死锁"）
3. 减少持锁范围：锁内只做必要操作，DB IO 移出锁外

## 四、场景二：数据异常但看代码没问题（竞态——最隐蔽）

难点：单线程逻辑完全正确，错误是"两个线程同时执行"造成的。**先复现，别急着改代码**。

### 先找三类代码模式（并发审查清单）

**① check-then-act（先查后改）——最高频**：
```java
// 反例：两个线程同时进来都通过检查 → 重复执行
if (map.containsKey(key)) {
    doSomething();                    // 中间被另一线程改了
}
// 正例：原子化
map.putIfAbsent(key, TRUE);          // 原子 check+act
// 或 DB 条件更新
UPDATE ... WHERE pre_status = ? AND updateCount > 0
```
- 项目例子：`runningStrategy.putIfAbsent(key, TRUE)` 防"扫描线程重复提交同一笔"；`updateStatusForTrigger` 用 DB 乐观锁防状态重复流转
- 排查方法：grep `if (get...)` + 后续 set/put/update，检查并发窗口；加日志看重复执行痕迹

**② 读-改-写非原子**：
```java
count++  →  read; add; write 三步，两个线程同时执行丢更新
```
- 修复：AtomicInteger / synchronized / DB 原子累加（项目 `SET entrusted_qty = entrusted_qty + ?` 就是原子累加，不走读改写）

**③ 可见性缺失**：
```java
boolean flag = false;
线程A: flag = true;      // 线程B 可能一直读到 false（非 volatile）
```
- 修复：volatile / AtomicBoolean / 锁
- 排查：jstack 看"读线程一直在跑却没退出" → 审查共享变量修饰符

### 复现与取证方法（按顺序）
1. 并发压测：CountDownLatch 同时放行 N 个线程触发同一逻辑（条件单 2000 笔同时触发就是天然复现场景）
2. 日志埋点：可疑处打印线程名 + 中间值——"Thread-12: 检查通过, entrustedQty=100" / "Thread-7: 检查通过, entrustedQty=100" 两条相同日志 = 竞态实锤
3. 数据特征分析：错的数值是否有规律（总是少 N、总是某字段被覆盖）→ 反推竞态窗口
4. jcstress：JMM 级别验证（可见性/重排），生产用不上、代码审查用得上

### 面试话术
> "数据异常但代码看起来没问题，我的思路是：先假设竞态——并发问题特征是偶发且单线程正确。第一步复现：并发压测或日志埋点，重点找 check-then-act、读改写非原子、可见性缺失三类模式。我们条件单触发用 putIfAbsent 原子占位、状态流转用 DB 乐观锁（update ... where preStatus=? 且 updateCount>0 判断），就是防并发重复执行的标准做法——两条相同日志出现就是竞态实锤。"

## 五、场景三：线程池耗尽 / 堆积（衔接 JVM 案例）

**现象**：接口超时、拒绝策略触发、队列堆积、下游全慢。

**取证**：
```
jstack 连打 3 次：大量线程 WAITING (parking) + 栈底是 Feign/RocketMQ/DB 等待 → 线程池被外部依赖拖死
线程池监控：activeCount=max、queue.size 持续涨、拒绝次数 > 0
```

**定位**：谁把线程占满？→ 看栈底（外部 HTTP / DB 慢 SQL / 锁等待 / 死循环）→ 对应根因：
- 外部依赖慢 → 超时 + 熔断 + 信号量隔离（CFETS 雪崩案例）
- 任务耗时增长 → 慢 SQL / 大对象处理
- 容量不足 → 按吞吐量化线程数（线程池板块公式）
- 拒绝策略反噬 → CallerRuns 拖死提交线程（条件单消费者反噬）

## 六、场景四：其他常见并发问题（一句话排查法）

| 问题 | 排查一句话 | 修复 |
|---|---|---|
| SimpleDateFormat 并发 parse 异常/错数据 | grep static SimpleDateFormat | ThreadLocal / DateTimeFormatter |
| HashMap 并发 put（JDK7 死循环/JDK8 丢数据） | 堆转储看 HashMap 结构损坏；审查 static HashMap | ConcurrentHashMap |
| ArrayList 并发 add/remove | 偶发 IndexOutOfBounds/ConcurrentModificationException | CopyOnWriteArrayList / 同步 |
| 异步顺序错乱（状态回退） | 时间戳日志：后处理完的旧数据覆盖新数据 | 串行池 / 按 key 哈希固定线程 / 版本号校验 |
| ThreadLocal 泄漏（内存涨） | jmap -histo 看对象滞留 + 审查 remove | finally remove / TTL |

## 七、面试话术（1 分钟版，配合五步法）

> "并发问题排查我按五步走：**收集现场 → 定性 → 复现 → 定位 → 修复验证**。死锁最简单——jstack 连打两次搜 deadlock，直接拿到循环依赖链，修复靠固定锁顺序 + tryLock 超时，我们额度锁 BatchMemoryLock 多锁组合就是固定先证券后资金。最隐蔽的是竞态——数据异常但代码没问题，特征就是偶发，先并发压测复现、再日志埋点找中间状态，审查重点就三类：check-then-act（用 putIfAbsent/DB 条件更新原子化）、读改写非原子（用原子累加）、可见性缺失（加 volatile）。线程池问题看 jstack 栈底 + 队列水位，判断是外部依赖慢还是容量不足。修复后必须并发回归测试 + 生产观察，因为并发问题最容易'修了这处又冒出那处'。"

## 八、高频追问

- 死锁和活锁区别？→ 死锁全卡死互不相让；活锁都在让（tryLock 失败重试又同时让给对方），CPU 忙但没进展 → 随机退避
- 怎么确认是竞态不是逻辑 bug？→ 单线程/低并发不出现、并发越高越频繁、压测必现——三个特征
- 日志埋点会不会改变时序？→ 会（Heisenbug），埋点只能辅助，最终以并发测试为准
- 并发问题怎么自动化验证？→ 并发单测（CountDownLatch 并发触发断言结果）、压测对比、jcstress（JMM）
- 线上并发问题处理顺序？→ 先止血（熔断/降级/限流/重启保留现场）→ 取证（dump）→ 分析 → 修复 → 验证
- 项目里最典型的并发问题？→ 条件单 2000 笔同时触发（脉冲+竞态）、额度锁竞争（自旋）、ThreadLocal 上下文（TTL 解决）

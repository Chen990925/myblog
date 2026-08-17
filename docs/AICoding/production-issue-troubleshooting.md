---
group: JVM调优专题
title: 生产问题排查方法论与案例串讲
order: 5
---

# 生产问题排查方法论与真实案例串讲（面试版）

## 一、排查方法论：现象分支决策树（比背工具列表有用）

面试官问"线上出问题怎么查"，按现象分支回答，不要按工具顺序背：

```
现象 → 定方向（CPU/内存/超时/重启 四选一）
├─ CPU 高（GC 正常）
│   top -Hp 找最忙线程 → printf '%x' nid → jstack 搜 nid → 定位代码行
│   常见：死循环、自旋、无退避重试、大对象拷贝
├─ 内存涨 / GC 频繁 / OOM
│   jstat -gcutil 看 O 区趋势 + FGC 频率
│   ├─ O 区涨 + FGC 频繁 → jmap -histo:live 看存活大对象 → jmap -dump + MAT Dominator Tree
│   │   常见：静态缓存只写不清理、缓存 key 不收敛、ThreadLocal 未 remove
│   └─ M 区涨 → jcmd GC.class_histogram → 类加载器泄漏（动态代理/路由刷新）
├─ 接口慢 / 卡死 / 超时
│   jstack 连打 3 次（间隔 5s）看线程状态分布
│   ├─ 大量 BLOCKED → 锁竞争/死锁（搜 "deadlock"）
│   └─ 大量 WAITING → 线程池耗尽（等外部 HTTP/MQ/DB）/ 队列堆积
└─ 周期性重启 / 进程被杀
    看 OOM 日志 + heapdump（-XX:+HeapDumpOnOutOfMemoryError 自动落盘）→ 分析堆转储
```

加分点：`PrintGCApplicationStoppedTime` —— "GC 停顿 ≠ 应用停顿，我会先看应用实际停顿时间确认 GC 是不是真瓶颈，避免瞎调参数"。

## 二、把案例讲成"亲历"的三个原则

1. **只讲代码里有的东西**：项目里存在的类、配置、路径讲出来天然可信；编的、对不上的必须改或删
2. **每个案例准备"追问三连"**：根因怎么定位？为什么这么改？改完怎么验证？答不上来就是编的
3. **没经历过的降级讲法**：别说"我遇到过"，说"这个方向我研究过，方法论是……"——诚实加分，编造被追问必翻车

## 案例 A：可用额度引擎锁竞争 → 分桶锁优化（笔记案例 3 修正版）

> ⚠️ 原笔记"案例 3"写的是全局 synchronized 大粒度锁，但代码里 `AvailLockManager` 已是分桶锁。**不要讲全局锁**，讲下面这个版本。

- **背景**：`common/avail-engine` 是下单前置校验/扣减的高并发热点；开盘高峰 CPU 报警、下单延迟上升，GC 指标正常 → 第一怀疑锁竞争或自旋
- **排查**：`top -Hp` 找最忙线程 → nid 转十六进制 → `jstack` 定位：大量线程在 ReentrantLock 入口；连打 3 次统计大量 BLOCKED + RUNNABLE 自旋
- **根因**（基于真实代码 `AvailLockManager`）：
  - 已是 `ConcurrentHashMap<StockLockKey/CashLockKey, Lock>` + `ReentrantLock` 分桶（设计正确），问题在细节：
  - ① 失败重试是无退避 while 循环，锁竞争激烈时在 tryLock 上自旋空转，CPU 烧在自旋上
  - ② ConcurrentHashMap 只增不减，putIfAbsent 懒加载的锁对象永不释放（锁泄漏，map 膨胀，呼应"无界容器"）
  - ③ 若某些场景回退粗粒度锁或锁顺序不一致，放大竞争
- **解决 + 效果**：
  ```
  tryLock 带超时 + 指数退避 + 上限，避免自旋空转
  锁 key 用完标记释放，防止 ConcurrentHashMap 无限膨胀
  必要时 Redis + Lua 原子扣减（校验+扣减一步，跨实例可用）
  → 开盘高峰 CPU 占用下降 xx%，下单 P99 从 xx ms 降到 xx ms
  ```
- **追问三连**：
  - 为什么 ConcurrentHashMap 而不是 synchronized？→ 分桶降粒度，不同客户/券不互阻；并发读 + putIfAbsent 原子创建
  - 锁泄漏怎么发现？→ jmap -histo 看 ReentrantLock 对象数只增不减 / map size 监控
  - 为什么不用分布式锁？→ 本地锁零网络开销、延迟最低，单实例够用；跨实例才需 Redis 分布式锁

## 案例 B：静态缓存内存泄漏 → Full GC 频繁（最贴合项目代码）

- **背景**：`common/common-cache` 几十个静态缓存 DAO（Bond/Stock/AccountRight…），配置 `cron-job-cache-data-refresh: 0 0 6 * * ?` 凌晨全量刷新 + data-sync 每 5 分钟对账。运行一段时间后老年代持续上涨、FGC 频繁、高峰指令提交变慢
- **排查**：`jstat -gcutil` 看 O 区趋势与 FGC → `jmap -histo:live` 缓存实体占大头 → dump + MAT Dominator Tree 定位静态 Map 持有全量缓存
- **根因关键分歧点（面试必问）**：
  - 全量刷新是**新建 Map 替换引用** → 旧 Map 可回收，问题不大
  - 往**同一个 Map** put 全量且不清理旧 key（增量膨胀）、或 key 含无限增长维度（客户×日期×券）→ 静态引用，Full GC 也回收不掉
  - 线程池 + ThreadLocal（项目有 transmittable-thread-local）未 remove → 线程长期持有大对象
- **解决 + 效果**：
  ```
  全量刷新改"新 Map 原子替换"（volatile 引用），旧 Map 一次性可回收
  缓存加容量上限 + TTL，或大缓存改存 Redis
  ThreadLocal 一律 try { ... } finally { remove(); }
  → FGC 从每 x 分钟一次降到接近 0，高峰交易响应恢复稳定
  ```
- **追问三连**：为什么用静态引用？（读多写少零反序列化最快，代价是 GC 不可回收，要控生命周期）怎么防不一致？（5 分钟对账 + 变更主动失效）换 Redis 一致性？（删 key + 重查，容忍最终一致）

## 案例 C：外部 CFETS 接口变慢 → 线程池耗尽雪崩（最讲全链路）

- **背景**：`trade/tradegatewayfrontend` CFETS 插件 + Feign 同步对接外汇交易中心；外部系统变慢 → tradeservice Tomcat 线程（max 1000）占满 → /health 超时 → 网关大量 504 → Feign 连锁拖慢 orderservice → 一个外部依赖拖垮全链路
- **排查**：`jstack` 几百线程全 WAITING、栈底 Feign 同步调用；结合监控 CFETS P99 200ms→30s+，超时 60s 无熔断
- **根因**：超时过长 + 无熔断降级；关键链路同步调用未隔离；网关连接被占满，雪崩向上游蔓延
- **解决 + 效果**：
  ```
  超时收紧（连接 3s / 读 10s 分级）+ Sentinel 熔断降级（失败率超阈值快速失败）
  CFETS 调用信号量隔离，防止占满整个线程池
  回报链路改 RocketMQ 异步化，不依赖外部同步返回
  健康检查独立路径，保证监控能拉起
  → 故障从全链路瘫痪收敛为单点快速失败
  ```
- **追问三连**：信号量 vs 线程池隔离？（信号量只限并发不占线程，适合快速失败；线程池隔离独立池互不挤占）回报为何异步化？（不依赖外部同步返回，MQ 解耦）熔断阈值？（失败率 50% + 滑动窗口，半开探测恢复）

## 三、剩下案例怎么处理（诚实降级表）

| 案例 | 建议 |
|---|---|
| 1 定时任务内存泄漏（orderservice 监控任务） | 项目有 `InstBankMonitorTask` 类，可讲；未亲历则降级为"方法论 + 这类任务通用风险" |
| 5 网关 Metaspace 溢出（Nacos 动态路由） | api-gateway 确实用 Nacos 路由，可讲机制；但"动态生成 RoutePredicate 类导致 Metaspace 涨"**难经得起追问**（路由刷新一般复用 Bean），建议只讲"Metaspace 监控 + 类加载统计"方法论 |
| 6 RocketMQ 堆积（消费慢 SQL/重试） | 项目有 MQ 回报链路，可讲；把"无限重试"改成项目实际重试配置，别编 |

兜底话术："这个具体场景我没直接遇到过，但排查思路是……（讲方法论 + 工具）。线上我主要处理过 xxx（回到有把握的案例）。"

## 四、串讲练习（1~2 分钟模板，挑 1 个案例练熟）

> "背景：开盘高峰，可用额度引擎 CPU 报警 100%，下单变慢但 GC 正常。排查：top -Hp 找到最忙线程，jstack 定位到大量线程在额度锁上自旋——重试是无退避的 while 循环。根因：锁竞争 + 自旋空转，锁对象还只增不减。解决：tryLock 带超时加指数退避、锁对象复用清理，必要时 Redis Lua 原子扣减。效果：CPU 高峰下降 xx%，下单 P99 从 xx 降到 xx。"

结构固定：**背景（一句话现象）→ 排查（工具+数据）→ 根因（一句话讲透）→ 解决+效果（方案+数字）**，把 3 个案例各练一遍，挑最有把握的做"主打案例"。

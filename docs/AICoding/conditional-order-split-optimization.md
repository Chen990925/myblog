---
group: JVM调优专题
title: 生产案例：条件单拆单并发优化
order: 6
---

# 生产案例：条件单拆单并发优化（StockConditionOrderProcessManager）

## 1. 案例背景

**业务场景**：现货条件单（轻量策略拆单 SPLIT_ORDER）。条件单触发后按 `chaseTimeInterval`（如 3s）定时拆单，每次下一笔 `offsetQty`（如 100 股）委托，直到委托完 `ordQty`（如 10W 股）。

**问题现象**：2000 笔条件单同时触发时（每笔 10W 数量、每 3s 下一笔 100 委托），整个系统（tradeservice）极其卡慢，一度影响其他服务；经同事优化（下单与下单前校验拆分为生产者/消费者）后有大幅提升且不再影响其他服务；但数量一大、并发一多，tradeservice 内部依然很卡。

**代码定位**：
- V1：`trade/tradeservice/.../future/condition/service/impl/StockConditionOrderProcessManager.java`（作者 chenjunlin）
- V2（当前）：`.../impl/StockConditionOrderProcessManagerV2.java`（DelayQueue + 生产者/消费者）
- 拆单策略 V1/V2：`.../internal/strategy/StockSplitOrderStrategy.java` / `StockSplitOrderStrategyV2.java`
- 调度入口：`.../schedule/stock/StockSplitOrderAutoTriggerTask.java`（调度中心控制 startProcess/stopProcess）
- 下单链路：`.../core/auction/ConditionOrderHelper.placeStockTradeOrder` → `AuctionPlaceOrderManager.placeOrder` → `AuctionPlaceOrderExecutor.execute`

## 2. 现有架构梳理

### V1（初版）：100ms 全量扫描 + 线程池执行
- `scheduler.scheduleAtFixedRate` 每 100ms 全量扫描 H2 缓存 `listValidAlgoSchemeFuture`，逐笔判断触发条件
- 命中即提交到静态线程池 `ThreadPoolExecutor(5, 20, 60s, LinkedBlockingQueue(100))`，**拒绝策略 = 丢弃任务**（避免扫描线程执行业务导致全系统扫描停滞）
- `ConcurrentHashMap<AlgoSchemeFutureKey, Boolean> runningStrategy` 防重入
- 策略内部：`lastExecutionMap` 时间节流 + `RedisUtil.tryLock` Redis 锁防并发
- **问题**：100ms 全量扫描空跑多；2000 笔同时触发时 20 线程 + 100 队列瞬间打满、大量丢弃；每笔任务里 Redis 锁、H2 重复查询放大开销；扫描线程与执行线程耦合

### V2（当前）：DelayQueue + 生产者/消费者
- **生产者**：`producerScheduler` 每 1000ms 扫描 H2 发现新增订单，`queuedKeys` 去重后以 `delay=0` 入队（每策略一个 DelayQueue）；限量：队列总量 ≤1000、每轮 ≤200
- **DelayQueue**：按 `chaseTimeInterval` 到期，到期才被消费（零空跑）；`tryRequeue` 在执行完后按剩余量重新入队（延迟 = chaseTimeInterval 秒）
- **消费者**：每策略 1 个常驻线程 `consumerLoop`：`poll(500ms)` 等第一笔 → `drainTo(200)` 批量取出 → 逐笔 `executeOrder`
- **执行线程池**：`ThreadPoolExecutor(20, 50, 60s, LinkedBlockingQueue(500))` + **CallerRunsPolicy**（不丢任务）
- **去重**：`runningStrategy`（正在执行）+ `queuedKeys`（已在队列）
- 策略 V2：移除 Redis 锁 + lastExecutionMap 节流 + 冗余 H2 查询（Manager 已查好、runningStrategy 保证单线程）
- 日内缓存：交易日/businessDate 缓存，避免每轮重复查询
- **收益**：不再影响其他服务（独立线程池 + 队列隔离）；零空跑；不丢任务

### 单笔拆单每轮（每 3s）的执行链路开销
```
executeOrder：
  1. algoSchemeFutureCache.selectByPrimaryKey        # H2 缓存查询（每轮必查）
  2. 有效性/委托量/交易时间检查
  3. runningStrategy.add(key) 原子占位
StockSplitOrderStrategyV2.run：
  4. isTrigger 时间窗口检查
  5. updateStatusForTrigger                          # 乐观锁更新状态 + notify
placeOrder：
  6. getHqItem 行情获取（exchangeMarketCacheClient）
  7. 价格计算（最新价/盘口价 + 档位偏移 + 极限价）
  8. localIdService.generateId(ALGO_SCHEME_DETAILS)  # 子单 ID
  9. insertAlgoSchemeDetailsWithSerialId             # DB 写：子单
  10. placeStockTradeOrder → AuctionPlaceOrderExecutor.execute：
      a. checkTraderRight 交易员权限
      b. checkAndFillParameter：20+ 项校验（产品/投资单元/组合/证券/债券/数量单位/
         价格范围/涨跌停/交易时间/数据权限/现金账户…）  # ← 全量人工下单级校验
      c. checkAvail 可用检查
      d. splitTrade 拆单
      e. saveTradeOrder 逐笔：
         frozenAvail（额度冻结 + 锁）→ 事务内（委托入库 + 冻结流水 + 关联表）
      f. riskForTradeManager.processRisk 风控试算
      g. approvalForTradeManager.processOrderApproval 审批流
      h. updateOrderStatus 状态更新
      i. sendPlaceOrderAuctionMessage（RocketMQ asyncSend 异步，不阻塞）
      j. sendRemindMessage 提醒
  11. updateConditionOrderAfterPlace：
      updateAfterPlaceOrder（DB 写：子单）+ updateConditionOrder（DB 写：母单 entrustedQty）
      + updateForConditionOrder（DB 写：指令证券，机构交易时）
tryRequeue：
  12. selectByPrimaryKey 再查一次 H2，按剩余量决定 3s 后重新入队
```

**单笔每轮的开销汇总**：H2 查询 ×2、行情 ×1、本地 ID ×2、DB 写 ×4~5（子单 insert/update、母单 update、委托 insert、冻结流水 insert；机构交易再加指令证券/关联表）、20+ 项校验 + 风控 + 审批、MQ 异步 ×2。

## 3. 瓶颈分析（按影响排序）

### 3.1 瞬时脉冲（根因）
- 2000 笔"同时触发"：生产者发现时全部以 `delay=0` 入队，**首轮触发时刻完全对齐**
- 消费者 `drainTo(200)` 连续 10 轮全量取出，2000 个任务瞬间涌入执行线程池
- 结果：50 线程打满 + 500 队列打满 → CallerRunsPolicy 让消费者线程自己执行任务 → **消费者被阻塞 → DelayQueue 无人消费 → 整体延迟放大**

### 3.2 单笔全链路重校验（最大单笔开销）
- `AuctionPlaceOrderExecutor.execute` 是"人工下单"级全链路：20+ 项校验 + 额度冻结 + 风控 + 审批流
- 条件单拆单子单每 3s 把这一整套跑一遍。母单触发时已做过产品/权限/证券等校验，子单重复校验收益低、成本高
- 量化：单笔 200ms 时，667 笔/s 需要约 **133 个并发线程** > max 50 → 必然积压

### 3.3 每轮 2 次 H2 查询 + 多次 DB 写
- `executeOrder` + `tryRequeue` 各查一次 H2（2000 笔 × 2 = 4000 次/3s）
- 每笔 4~5 次 DB 写（2000 笔 × 5 ≈ 1 万次/3s），主库写压力大
- 行情每笔获取（同股票同价格区间可共享）

### 3.4 线程池容量与拒绝策略
- max 50 未按峰值量化；CallerRunsPolicy 在打满时反噬消费者线程
- 消费者只有 3 个线程（每策略 1 个），drainTo 后逐笔 submit 也是串行提交路径

## 4. 优化思路（按落地优先级分梯队）

### 第一梯队：削峰（治本，改动最小）
1. **首轮触发加随机抖动（jitter）**：新增订单入队时 `delay = random(0, chaseTimeInterval)`，把 2000 笔同时触发摊到 3s 窗口内，峰值从 667 笔/s 降到 ~200 笔/s。这是对"同时触发"最直接的解法
2. **消费者令牌桶限速**：控制每秒最多提交执行 N 笔（如 300），超限的任务延时重新入队，平滑脉冲
3. **分桶消费**：按 `companyId % N` 或股票分桶拆多个 DelayQueue/消费者，天然削峰 + 并行

### 第二梯队：减负（治标，收益最大）
4. **拆单子单走简化校验通道（skipFullCheck）**：给 `AuctionPlaceOrderExecutor` 增加"条件单拆单"模式，跳过母单已校验过的不变量（产品/投资单元/组合/数据权限/证券/债券等），只保留 `checkAvail`（额度）+ 价格数量有效性 + 风控。单笔耗时可从 200ms 级降到 50ms 级
5. **同向聚合批量委托**：同一 (companyId, interCode, stockCode, entrustDir, ordPrice) 的子单聚合为一次 `PlaceOrderRequest`（items 已支持批量，`convertForInput` 遍历 items）。2000 笔同股同向时，委托单数量降 2~3 个数量级；注意子单/母单记账与成交回报归属需配套处理
6. **合并 H2 查询**：`tryRequeue` 复用 `executeOrder` 已查的实体（将最新状态从执行器内返回），每轮从 2 次查询降到 1 次
7. **行情本地化**：`getHqItem` 增加短 TTL 内存缓存（同股票 1~3s 内共享），2000 笔同股时行情查询降为 1 次

### 第三梯队：异步化 / 写入优化
8. 消息发布已异步（RocketMQ asyncSend），确认 `sendRemindMessage` 也改异步或批量
9. 母单 `entrustedQty` 更新改为回报驱动或延迟批量落库，不在下单路径同步更新
10. 子单插入改 JDBC 批量（同一轮多笔合并 insert）

### 第四梯队：容量与保护
11. **线程池按峰值量化**：`max = 峰值笔数/秒 × 单笔耗时`。简化校验 + 削峰后（200 笔/s × 50ms = 10 线程）现有 50 max 足够；未优化前需 133+
12. **拒绝策略改"延时重新入队"**：提交失败时 `queue.offer(new DelayOrder(..., 500ms))` 重试，而不是 CallerRunsPolicy 阻塞消费者
13. **下游吞吐确认**：tradegatewayfrontend/交易所网关能否承受 667 笔/s，不能则全局限速（令牌桶），避免把卡顿传导到下游

## 5. 量化预期（话术用）

| 指标 | 优化前 | 优化后（预期） |
|---|---|---|
| 触发峰值 | 2000 笔瞬时涌入 | jitter 摊平到 3s（~200 笔/s） |
| 单笔下单耗时 | 200ms 级（全量校验） | 50ms 级（简化校验） |
| 线程池需求 | ~133 线程（>max 50） | ~10~30 线程 |
| H2 查询/轮/笔 | 2 次 | 1 次 |
| DB 写/轮/笔 | 4~5 次 | 聚合后可降 |
| 消费者阻塞 | CallerRuns 拖死消费者 | 拒绝重试，不阻塞 |

## 6. 面试话术（STAR）

> **背景**：2000 笔条件单同时触发拆单（每 3s 一笔），系统卡慢、一度影响其他服务。
> **排查**：先看线程池与队列水位：`jstack` 发现执行线程池满、消费者线程被 CallerRunsPolicy 反噬；看 GC 正常，排除 GC 因素；分析链路发现每笔走的是人工下单级全链路校验 + 多轮 H2 查询 + 4~5 次 DB 写。
> **根因**：① 首轮触发时刻对齐产生瞬时脉冲（2000 笔同时入队）；② 单笔全链路校验过重（母单已校验的项子单重复校验）；③ 线程池容量未按峰值量化。
> **解决**：① 首轮入队加随机 jitter 削峰 + 消费者令牌桶限速；② 拆单子单走简化校验通道（只保留额度/价格/风控）；③ 同向聚合批量委托 + 合并 H2 查询 + 行情短 TTL 缓存；④ 拒绝策略改为延时重试，避免阻塞消费者。
> **效果**：触发峰值从 2000 笔瞬时降到 ~200 笔/s 平滑下发，单笔耗时从 200ms 降到 50ms 级，线程池需求从 133 降到 ~10~30，高峰期不再卡慢，且与主链路隔离互不影响。

## 7. 追问准备

- "为什么 V2 后不影响其他服务还卡？" → 隔离解决的是"雪崩扩散"，没解决"自身吞吐上限"：2000 笔 × 全量校验 × 5 次 DB 写超过了线程池 50 的容量，任务在队列里积压，消费延迟变大
- "jitter 会不会破坏每 3s 一笔的业务节奏？" → 只对**首轮触发**加抖动，后续仍按 chaseTimeInterval 严格到期；首轮错开 0~3s 不影响"每 3s 一笔"的语义
- "简化校验会不会有风险？" → 只跳过母单已校验的静态不变量（产品/权限/证券），额度校验（checkAvail/冻结）和风控保留；母单状态、价格有效性也保留校验
- "聚合委托后成交回报怎么归属？" → 委托层聚合、明细层仍逐笔记录（algoSchemeDetails），回报按聚合委托落回后再按份额拆分到各母单（需与回报链路配合）
- "怎么验证优化有效？" → 压测 2000 笔同时触发，观察：触发到全部委托完的耗时、消费延迟分布（P99）、线程池活跃数、队列水位、DB 写 TPS

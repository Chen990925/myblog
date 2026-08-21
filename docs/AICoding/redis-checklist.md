---
group: Redis 缓存专题
title: Redis 缓存准备点清单
order: 11
---

# Redis 缓存准备点清单（目录 / 索引版）

> 这是**总纲**：每个板块只留核心要点 + 指向详细文件。复习/面试前先看这份，细节翻对应文件。

## 0. 项目 Redis 缓存使用全景（哪里用、做什么）

| 场景 | 模块 | 实现 | 作用 |
|---|---|---|---|
| 成交回报去重 | trade | `AsyncUpdateOrderManager`：`RedisUtil.tryLock(lockValue, UUID, 20, 30)` 按 ordId/instId 加分布式锁 | 防多线程/多实例并发处理同一笔成交 |
| 成交/回报状态同步 | trade | `DealProcessManager`、`DealBankMatchServiceImpl` 等（DEAL_MATCH/DEAL_REPORT key） | 成交匹配去重、状态同步 |
| 接口幂等 | common | `IdempotencyInterceptor`：`setIfAbsent(idempotencyKey, 1, timeout)` | 写接口防重复提交 |
| 报价状态同步 | trade 银行间 | `BankQuoteSyncServiceImpl`（QUOTE_STATUS_SYNC 锁）+ 各 Bond*QuoteServiceImpl | 跨服务报价状态共享 |
| 系统参数缓存 | main | `SysparmRedisManager`：全量加载到 Redis Hash（SYSTEM_PARAM_KEY/VALUE_KEY），delete+全量重建刷新 | 业务查 Redis 不查库 |
| 分布式锁 | 通用 | `RedisUtil.tryLock`（SETNX + 自旋超时） | 成交处理/报价同步/条件单触发 |
| 数据增量标记 | common/data-sync | `XOMS_MD_INCREMENT_*` 记录各表增量导入时间 | 断点续传 |
| 登录会话 | sso-login | `KEY_LOGIN` | 用户 token/会话 |

**数据结构对照**：String（锁/幂等/增量标记）、Hash（系统参数字段级读写）、List（RedisUtil 提供少用）、ZSet（延迟队列可做）。

**真实代码问题点（面试加分）**：
1. `RedisUtil.unLock` 直接 `del(key)` **未校验 value** → 持锁超时后误删别人锁（互斥失效）
2. `tryLock` 无看门狗续期 + 自旋空转
3. `SysparmRedisManager` delete+重建有**删建窗口**（读 miss 打 DB）；大 Hash 的 `del`/`hgetall` 阻塞单线程

## 1. Redis 数据结构 + 缓存三大问题

- 五种结构：String（SDS）/Hash（ziplist→hashtable）/List（quicklist）/Set/ZSet（skiplist+hashtable）
- 单线程模型：命令原子、慢命令阻塞（keys* 禁、大 key hgetall/del 慎）
- 穿透：查不存在 → 缓存空值 + 布隆过滤器 + 参数校验
- 击穿：单热点 key 过期瞬间 → 互斥锁重建 / 逻辑过期 / 不过期+定时刷新（项目 Sysparm 模式）
- 雪崩：大量 key 同时过期 → TTL 随机抖动 + 多级缓存 + 高可用 + 限流
- **详见 `Redis1-数据结构与缓存三大问题.md`**

## 2. 缓存一致性

- Cache Aside（旁路缓存）：读 miss 查 DB 回填；写**先 DB 后删缓存**
- 为什么先 DB 后删：先删缓存会有"删了还没更新 DB"窗口，读回填旧值脏窗口大
- 删缓存失败兜底：重试队列 / 延迟双删 / Canal 订阅 binlog
- 项目 Sysparm delete+重建：删建窗口 → rename 原子切换 / 双 key 交替；大 Hash del → unlink
- 强一致不可能（CAP），缓存只给最终一致
- **详见 `Redis2-缓存一致性.md`**

## 3. Redis 分布式锁（项目素材最真实）

- 选型：单实例本地锁（avail-engine）零开销；多实例 Redis 锁；强一致 ZK
- 三要素：`SET key value NX EX` 原子加锁 / 过期时间防死锁 / **Lua 校验 value 释放**
- 项目 RedisUtil 分析：加锁+超时 OK；**锁误删（无 value 校验）/无续期/自旋空转** 三问题
- Redisson：看门狗续期 + Lua 释放 + 可重入
- RedLock 与 CAP：Redis 锁是 AP，业务幂等兜底
- **详见 `Redis3-分布式锁.md`**

## 4. 持久化 + 高可用

- RDB：fork+COW 全量快照，恢复快、丢数据多；AOF：命令日志 everysec 丢 1 秒、恢复慢；生产 RDB+AOF 混合
- 高可用三层：主从（读写分离、异步复制）/ 哨兵（sdown→odown→leader 选举自动 failover）/ Cluster（16384 slot 分片 + MOVED + 分片主从）
- 数据丢失：异步复制丢写、脑裂（min-replicas 缓解）
- **详见 `Redis4-持久化与高可用.md`**

## 5. 性能与调优

- 淘汰策略：allkeys-lru/lfu（缓存）、volatile-lru（保关键）、避免 noeviction 写失败
- BigKey：阻塞/删除阻塞/带宽/倾斜 → unlink/拆分/压缩
- 热 Key：本地缓存多级/副本分片/--hotkeys 监控
- 慢查询：slowlog 定位，keys→scan
- 连接池：Lettuce（Spring 默认多路复用）/Jedis；序列化（JDK 默认有坑→String/JSON）
- **详见 `Redis5-性能与调优.md`**

## 6. 学习顺序（推荐）

1. 数据结构 + 三大问题（面试必考，套 Sysparm 缓存）
2. 缓存一致性（Cache Aside/延迟双删/项目 delete+重建优化）
3. Redis 分布式锁（项目素材最真实：RedisUtil 锁误删 = 现成"发现-分析-方案"案例）
4. 持久化 + 高可用（理论概念）
5. 性能与调优（BigKey/热Key/慢查询）
6. 案例串讲（成交去重锁/幂等/系统参数缓存/报价同步 → STAR）

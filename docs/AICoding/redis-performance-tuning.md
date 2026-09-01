---
group: Redis 缓存专题
title: 性能与调优
order: 16
summary: Redis 性能调优实战：淘汰策略选择、BigKey/热Key 治理、慢查询分析、连接池配置与容量监控。
keywords: [Redis调优, BigKey, 热Key, 淘汰策略, 慢查询, 连接池]
---

# Redis 5：性能与调优

## 一、内存淘汰策略（8 种）

**触发**：内存达 maxmemory 按 maxmemory-policy 淘汰。

| 维度 | 策略 | 行为 |
|---|---|---|
| 不淘汰 | noeviction | 拒绝写请求报错（默认） |
| LRU | allkeys-lru / volatile-lru | 淘汰最久未使用（全部 / 仅 TTL 的 key） |
| LFU | allkeys-lfu / volatile-lfu | 淘汰最不经常使用 |
| 随机 | allkeys-random / volatile-random | 随机淘汰 |
| 过期 | volatile-ttl | 淘汰剩余 TTL 最短 |

**选型**：纯缓存 → allkeys-lru/lfu（热数据稳定用 lfu）；保关键 key → volatile-*；**避免 noeviction**（内存满写失败是事故）。
话术："内存淘汰按数据性质选：纯缓存 allkeys-lru；热数据稳定 lfu；需保证某些 key 不丢 volatile-lru。生产监控内存水位，出现淘汰说明容量设计不够。"

**项目落点**：系统参数 Hash 若被 allkeys-lru 淘汰会 miss 打 DB → 关键配置类缓存要保护（volatile 之外加大内存/不过期+主动刷新——Sysparm 本来就是不过期+主动刷新，天然不因过期消失，但可能被 LRU 淘汰）。

## 二、BigKey

**定义**：单 key value 很大（Hash 上万字段 / String 几十 MB / List 几十万元素）。

**危害**：① 阻塞单线程（hgetall/lrange/get 大 key）；② `del` O(N) 阻塞（用 **unlink** 4.0+ 异步删）；③ 网络带宽；④ 集群数据倾斜（单分片热点）

**排查**：`redis-cli --bigkeys`、`debug object key`、`memory usage key`

**治理**：拆分（key:01/key:02）/ 压缩后存 / 换结构（存 ID 引用，数据在 DB）/ 删除用 unlink

**项目落点**：系统参数 Hash 若参数上万，hgetall 全量取 + del 全量删都是阻塞风险 → 按类型拆分 + unlink + rename 原子切换。

## 三、热 Key

**定义**：某 key 超高频率访问（秒杀/热点票），集中打一个节点。

**危害**：单节点 CPU/带宽打满；集群数据倾斜；击穿放大器（热点 key 过期瞬间全打 DB）

**方案**：① **本地缓存多级**（Caffeine + Redis 兜底）；② **热 key 复制**（key:0~key:N 分散读，写同步或接受短暂不一致）；③ 读写分离 + 限流；④ 监控 `redis-cli --hotkeys`（需开 LFU）、客户端采集、QPS 监控

**项目落点**：行情若走 Redis（热点股票）→ 本地缓存+短 TTL；成交/报价状态 key 按业务主键天然分散不会热。

## 四、慢查询

- `slowlog-log-slower-than`（默认 10000μs=10ms）记录超时命令
- `slowlog get/len/reset`
- 典型慢命令：keys *（O(N)）→ **scan 分批**；大 key 全量 hgetall/lrange/smembers；sort 大集合；del 大 key → unlink
- 排查闭环：slowlog → 定位慢命令 → 判断大 key 还是命令本身 O(N) → 拆分/换结构/scan → 观察下降

## 五、连接池与序列化

- 连接池必要：避免每次命令建连（TCP 开销）
- **Lettuce**（Spring Boot 默认）：Netty 单连接多路复用，线程安全；blocking 命令独占连接有争议
- **Jedis**：直连简单非线程安全（连接池）
- 项目：Spring Data Redis（RedisTemplate 底层 Lettuce），RedisUtil 封装序列化与连接管理
- 连接池参数：maxTotal/maxIdle/minIdle/maxWait（与线程池同理：按峰值 QPS × 单命令耗时反推）
- **序列化**：RedisTemplate 默认 JDK 序列化（体积大+安全风险）→ 生产用 String/JSON（项目 fastjson）；key 前缀可读性（oms:redis_lock: 说明用了 String 序列化）

## 六、监控与容量规划（衔接 JVM 板块）

- 指标：used_memory/碎片率 mem_fragmentation_ratio、命中率 hit/miss、连接数、命令耗时、慢查询、淘汰 key 数
- 容量：数据量 × 单条大小 × 冗余；预留 20~30%（缓冲区/AOF）
- 与 JVM 衔接：32G 机器上 Redis 估 2G（内存预算核算里中间件预算一部分）

## 七、面试话术（1 分钟版）

> "Redis 调优四个维度：内存淘汰——缓存场景 allkeys-lru/lfu，避免 noeviction 写失败；BigKey——大 Hash/List 的 hgetall/del 阻塞单线程，用 unlink 异步删、拆分 key、压缩 value；热 Key——本地缓存多级、key 复制分片、--hotkeys 监控；慢查询——slowlog 定位 O(N) 命令，keys 换 scan、全量换分批。系统参数 Hash 参数量大时 hgetall/del 都是阻塞风险，review 时建议按类型拆分 + unlink + rename 原子切换。"

## 八、高频追问

- LRU vs LFU？→ LRU 看最近访问时间（偶发访问误判），LFU 看频率（访问模式稳定场景）
- 大 key 的 del 为什么阻塞？→ O(N) 逐元素释放，单线程期间其他命令等；unlink 异步后台释放
- keys * 为什么禁？→ O(N) 阻塞；scan 游标分批
- 热 key 怎么发现？→ --hotkeys（需 LFU）、客户端采集、QPS 监控
- 内存碎片？→ 碎片率 >1.5 用 memory purge / 重启 / activedefrag（4.0+）
- 连接池设多大？→ 峰值 QPS × 单命令耗时反推（与线程池同思路）

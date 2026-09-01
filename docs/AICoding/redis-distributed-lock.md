---
group: Redis 缓存专题
title: Redis 分布式锁
order: 14
summary: Redis 分布式锁三要素（互斥/防死锁/可重入）、项目 RedisUtil 锁误删问题分析、Redisson 看门狗续期、RedLock 与 CAP 取舍。
keywords: [分布式锁, SETNX, Redisson, 看门狗, Lua, 锁误删]
---

# Redis 3：分布式锁（结合项目，素材最真实）

## 一、为什么需要分布式锁

并发板块的单机锁（synchronized/ReentrantLock/分桶锁）管不住**多实例**：两个 JVM 各有一把锁 → 需要共享的锁 → Redis。

**选型对比**：
| 方案 | 可靠性 | 性能 | 适用 |
|---|---|---|---|
| Redis SETNX | 中（看实现） | 高 | 高频、接受短暂异常 |
| ZK 临时顺序节点 | 高（强一致） | 低 | 低频、强一致 |
| DB 行锁/乐观锁 | 高 | 低 | 已有 DB、低频 |
| 本地锁（单实例） | - | 最高 | 单实例部署 |

**项目落点**：成交处理（AsyncUpdateOrderManager）、报价同步（BankQuoteSyncServiceImpl）、条件单 V1（CONDITION_LOCK）用 RedisUtil.tryLock；额度扣减用本地分桶锁（单实例）——"单实例本地锁零开销，多实例才上 Redis 锁"。

## 二、正确实现三要素

```
① 加锁：SET key value NX EX 30        # NX=不存在才设置（原子）；EX=过期（防死锁）
② 业务：...                            # 临界区
③ 释放：Lua 校验 value 再 DEL          # 防误删别人锁
```

1. **原子加锁**：`SET key value NX EX 30` 一步；setnx+expire 分两步 = 中间宕机锁永不释放（经典错误）
2. **过期时间**：持锁方宕机锁自动释放；要大于业务最大执行时间
3. **Lua 校验释放**：
```lua
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```
- 为什么校验：A 持锁业务超时锁过期 → B 拿到锁 → A 直接 del 删掉 B 的锁 → B、C 同时进临界区（互斥失效）
- value 用唯一标识（UUID），释放时 Lua 原子"比对+删除"

## 三、项目真实代码分析：RedisUtil.tryLock

```java
public static boolean tryLock(String key, Object value, long timeOut, long expireTime) {
    long startTime = DateUtil.getTimestamp();
    do {
        boolean ret = redisTemplate.opsForValue().setIfAbsent(key, value, expireTime, TimeUnit.SECONDS);
        if (ret) return true;
    } while (DateUtil.getTimestamp() - startTime < timeOut);   // 自旋等待
    return false;
}
public static void unLock(String key) {
    del(key);    // ⚠️ 直接删除，没有校验 value！
}
```

**好的地方**：✅ setIfAbsent(key,value,expire) = SET NX EX 一步原子；✅ 有过期时间防死锁；✅ 有超时自旋不无限等

**真实问题点（面试讲这个有含金量）**：
1. **锁误删（最严重）**：unLock 直接 del 没校验 value。A 持锁超时过期 → B 拿到锁 → A unLock 删掉 B 的锁 → C 又拿到 → B、C 同时进临界区，**成交可能被重复处理**。修复：Lua 比对 value 再删（value 传的 UUID 就是为此预留，只是没生效）
2. **无续期（锁提前过期）**：业务执行超过 expireTime 锁已过期但业务还在跑。修复：看门狗（Redisson 每 1/3 过期时间续一次）
3. **自旋空转**：do-while 每轮立即重试，高竞争大量空转请求打 Redis。修复：退避（50~200ms 随机）或阻塞等待（Redisson 发布订阅+信号量）

**话术**："我们 RedisUtil 三个可改进点：释放没校验 value（持锁超时后误删别人锁，互斥失效）——改 Lua 比对删除；没有看门狗续期（业务超锁就提前失效）；自旋空转（高竞争退避/阻塞）。这是 Redis 分布式锁的经典问题，我 review 代码时梳理过。"

## 四、Redisson（生产级，解决上面所有问题）

- `RLock lock = redissonClient.getLock(key); lock.tryLock(waitTime, leaseTime, unit);`
- **看门狗续期**：leaseTime=-1 时启用，每 10s 检查，锁快过期自动续到 30s（业务没结束锁不释放）
- **释放**：内部 Lua 校验 value 删除
- **可重入**：同一线程可重入（hash 结构+计数）
- 对比自研：Redisson 可靠（续期/校验/可重入）；自研简单（适合锁时间短、业务可控）

## 五、RedLock 与 CAP（了解即可）

- 主从模式下主节点宕机锁可能丢失（异步复制）→ RedLock 在 N 个独立节点取多数派锁（N/2+1）
- 争议：网络分区+时钟漂移下仍可能失效（Martin Kleppmann 批评）；主流：可用性极高才 RedLock，一般单点+锁时间短够用；真强一致用 ZK
- 话术："Redis 锁是 AP 选择，锁可能因主从切换丢失；接受'锁丢失后少量重复执行'（配合幂等兜底）才用 Redis 锁，强一致用 ZK。"

## 六、分布式锁四个使用原则

1. 锁 key 粒度：按业务主键（ordId/instId），不全局一把锁（项目成交锁按 ordId，正确）
2. 过期时间 > 业务 P99 耗时 × 3~5
3. 持锁内不做远程/慢操作（持锁时间越短越好）
4. **配幂等兜底**：锁 + 乐观锁双层防御（项目成交处理有 updateStatusForTrigger 乐观锁 + Redis 锁）——**可讲**

## 七、面试话术（1 分钟版）

> "分布式锁解决多实例互斥：单实例本地锁零开销，多实例才上 Redis 锁。正确实现三要素：SET key value NX EX 原子加锁（防死锁）、过期时间大于业务耗时、释放 Lua 校验 value 防误删。我们成交处理按 ordId 加 Redis 锁防同一笔成交并发处理，配合乐观锁状态流转双层防御；我 review 时发现 RedisUtil 释放锁没校验 value（持锁超时后可能误删别人锁），建议改 Lua 比对删除+看门狗续期。Redis 锁是 AP 选择，锁丢失靠业务幂等兜底，强一致用 ZK。"

## 八、高频追问

- setnx 和 SET NX EX 区别？→ setnx 设过期要再 expire（两步非原子宕机死锁）；SET key value NX EX 30 一步原子
- 锁过期时间怎么定？→ 业务 P99 × 3~5；或看门狗动态续期
- 为什么释放要 Lua？→ 比对+删除要原子（两命令之间可能被插入）
- 主从切换锁会丢？→ 会（异步复制），RedLock 部分解决；业务幂等兜底
- 分布式锁和乐观锁能一起用？→ 能，锁防并发进入、乐观锁防状态重复流转（双层防御）
- 项目哪里用了？→ 成交处理按 ordId、报价同步、条件单触发

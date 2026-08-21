---
group: Redis 缓存专题
title: Redis 速记卡
order: 17
---

# Redis 速记卡（临场回忆 / 快速准备版）

> 用法：面试前 10 分钟扫一遍；被问到 Redis 话题先定位板块，按"引导句"展开。细节翻对应笔记。

## 1. 项目使用全景（背得出 5 个场景）

**成交去重锁（按 ordId）+ 接口幂等（setIfAbsent）+ 报价状态同步 + 系统参数 Hash 缓存 + 数据增量标记**；工具 `RedisUtil`（封装 RedisTemplate）。

## 2. 数据结构

- 引导句：**"String 锁/计数，Hash 字段级读写，List 队列，Set 去重，ZSet 排序"**
- 底层：String=SDS、Hash=ziplist→hashtable、List=quicklist、ZSet=skiplist+hashtable
- 单线程执行命令 → 命令原子、慢命令阻塞（keys* 禁、大 key hgetall/del 慎）

## 3. 三大问题（必考）

- 穿透 = 查不存在 → 缓存空值 / 布隆过滤器 / 参数校验
- 击穿 = 单热点 key 过期瞬间 → 互斥锁重建 / 逻辑过期 / **不过期+定时刷新（项目 Sysparm）**
- 雪崩 = 大量 key 同时过期 → TTL 随机抖动 / 多级缓存 / 高可用 / 限流

## 4. 缓存一致性

- 引导句：**"Cache Aside：读 miss 回填，写先 DB 后删缓存"**
- 为什么先 DB 后删：先删有"删了没更新 DB"窗口，读回填旧值脏窗口大
- 删失败兜底：重试队列 / 延迟双删（等 500ms~1s 再删一次）/ Canal binlog
- 项目 Sysparm：delete+全量重建 → 窗口改 rename 原子切换、大 Hash del 改 unlink
- 强一致不可能（CAP），缓存只给最终一致

## 5. 分布式锁（项目素材最真实）

- 引导句：**"SET NX EX 原子加锁 + 过期防死锁 + Lua 校验 value 释放"**
- 项目 RedisUtil 三问题：**释放没校验 value（锁误删）/ 无看门狗续期 / 自旋空转**
- Redisson：看门狗续期 + Lua 释放 + 可重入
- Redis 锁是 AP，锁丢失靠幂等兜底；强一致用 ZK
- 项目：成交处理按 ordId + 乐观锁双层防御

## 6. 持久化 + 高可用

- RDB：fork+COW 快照，恢复快丢数据多；AOF：everysec 丢 1 秒恢复慢；生产 RDB+AOF 混合
- 高可用三层：主从（读写分离）/ 哨兵（sdown→odown→leader 选举自动 failover）/ Cluster（16384 slot + MOVED + 分片主从）
- 数据丢失：异步复制丢写、脑裂（min-replicas 缓解）

## 7. 性能调优

- 淘汰：allkeys-lru/lfu（缓存）、volatile-*（保关键）、避免 noeviction
- BigKey：del/hgetall 阻塞 → unlink / 拆分 / 压缩
- 热 Key：本地缓存多级 / 副本分片 / --hotkeys
- 慢查询：slowlog，keys→scan
- 序列化：JDK 默认有坑 → String/JSON（项目 fastjson）

## 8. 高频追问口袋（一句答）

- setnx vs SET NX EX？→ 后者一步原子（设过期不分离，防宕机死锁）
- 为什么释放锁要 Lua？→ 比对+删除要原子
- 主从切换锁会丢？→ 会（异步复制），幂等兜底
- 延迟双删延迟多久？→ 大于读回填耗时（500ms~1s）
- 为什么删缓存不更新缓存？→ 并发写覆盖问题，删了让读自然回填
- 布隆过滤器误判？→ 只会把不存在的判为存在，不会漏
- keys * 为什么禁？→ O(N) 阻塞，用 scan

## 9. 简历一句话

**Redis 用于成交去重（按 ordId 分布式锁 + 乐观锁双层防御）、接口幂等、系统参数缓存（Hash 全量预热 + 变更刷新），分析并修复分布式锁释放校验缺陷（Lua 比对 + 看门狗续期），优化缓存删建窗口与大 Key 阻塞** —— 主打案例：成交去重锁 / 系统参数缓存优化。

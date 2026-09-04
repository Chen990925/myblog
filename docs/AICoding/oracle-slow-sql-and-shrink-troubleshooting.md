---
group: Oracle 数据库专题
title: 实战：慢 SQL 与缩表排查
order: 24
---

# 数据库 5：实战——线上突然超级慢 SQL + 缩表（HWM）排查

## 一、场景还原（面试讲法）

> "某交易日盘中，交易查询列表接口突然从毫秒级变成十几秒，客户反馈页面转圈。同时 DBA 反馈：ttra_stockdeal 表前几天刚清理了几百万条历史数据，表数据量明显变小（缩表了），但查询反而更慢了。"

## 二、排查流程（STAR 结构，背熟）

### ① 定范围：单条慢 vs 全库慢（30 秒）
- 全库慢 → 先看锁等待/资源（enq: TX、buffer busy、IO 打满）
- 单条慢 → 直接抓这条 SQL 的执行计划（本案例是单条慢）

### ② 抓执行计划（关键动作）
```sql
select sql_id, elapsed_time/1e6, buffer_gets, disk_reads, sql_text
from v$sqlarea where sql_text like '%ttra_stockdeal%' order by elapsed_time desc;

select * from table(dbms_xplan.display_cursor('sql_id', null, 'ALLSTATS LAST'));
```
**执行计划看到**：
```
| Id | Operation            | Name           | Rows | A-Rows |
|  1 |  TABLE ACCESS FULL   | TTRA_STOCKDEAL | 5000 | 2000000|
```
- A-Rows（实际 200 万）≫ Rows（估算 5000）→ 计划选了全表扫
- 为什么全表扫？两种可能：① 统计信息过期（CBO 以为表小）② HWM 问题（扫的块数还是几百万行的量）

### ③ 关键判断：对比"之前 vs 现在"（分叉点，面试亮点）

**验证统计信息**：
```sql
select table_name, num_rows, blocks, last_analyzed from user_tables where table_name='TTRA_STOCKDEAL';
select count(*) from ttra_stockdeal;   -- 实际行数
```
- num_rows（统计行数）还是几百万、实际只有几十万 → **统计信息过期实锤**（CBO 选错计划）

**验证 HWM（缩表核心）**：
```sql
select blocks, empty_blocks from dba_segments where segment_name='TTRA_STOCKDEAL';
```
- **段块数不降**（还是几百万行时的块量）= HWM 高 → 全表扫照样扫旧水位

**分叉结论（两个问题叠加）**：
| 现象 | 根因 | 证据 |
|---|---|---|
| 计划从索引扫变全表扫 | 统计信息过期 | A-Rows ≫ Rows、last_analyzed 久 |
| 全表扫块数不降 | HWM 未降 | dba_segments.blocks 还是旧值 |

### ④ 解决（三步，按顺序）
```sql
-- 第 1 步：收集统计信息（先做，可能直接恢复计划）
EXEC DBMS_STATS.GATHER_TABLE_STATS(ownname=>'OMS', tabname=>'TTRA_STOCKDEAL', cascade=>TRUE);

-- 第 2 步：还在全表扫/块数多 → 收缩段降 HWM（选低峰）
ALTER TABLE ttra_stockdeal ENABLE ROW MOVEMENT;
ALTER TABLE ttra_stockdeal SHRINK SPACE;

-- 第 3 步：收缩后重新收集统计信息
EXEC DBMS_STATS.GATHER_TABLE_STATS(ownname=>'OMS', tabname=>'TTRA_STOCKDEAL', cascade=>TRUE);
```
- 为什么不 TRUNCATE：业务表要保留数据、TRUNCATE 锁表不可回滚；只有可重建的历史表才用

### ⑤ 效果验证与预防
- 计划恢复 INDEX RANGE SCAN；耗时回到毫秒级
- 预防：清理作业规范化为"**清理→收缩→收统计信息**"三步；监控 last_analyzed 新鲜度；大表建分区（清理用 DROP 分区）

## 三、STAR 话术（1~2 分钟版，直接背）

> **背景**：盘中交易查询突然从毫秒级变十几秒，客户反馈页面卡死；DBA 反馈该表前几天下班清理了几百万条历史数据，表缩了但查询更慢。
> **排查**：确认单条慢不是全库慢，v$sqlarea 找 TOP SQL 抓真实执行计划——TABLE ACCESS FULL，A-Rows 200 万 vs 估算 5000，统计信息明显过期；再看 dba_segments.blocks 段块数还是几百万行时的量——高水位线没降。两个问题叠加：统计信息过期让 CBO 选全表扫，HWM 没降让全表扫扫旧水位。
> **根因**：① DELETE 大量数据后没收集统计信息，CBO 估算失真；② DELETE 不降高水位线，段没收缩，全表扫描扫全量块。
> **解决**：先 GATHER_TABLE_STATS，再 ENABLE ROW MOVEMENT + SHRINK SPACE 在线收缩降 HWM，收缩后再收一次；清理作业规范为"清理→收缩→收统计信息"三步。
> **效果**：执行计划恢复索引扫描，查询从十几秒回到毫秒级；后续大清理后未复发。

## 四、追问准备

- 统计信息过期为何从索引扫变全表扫？→ CBO 按估算行数算成本：统计行数少 → 以为表小 → 全表扫成本低
- SHRINK vs MOVE？→ SHRINK 在线（需 ROW MOVEMENT 自动维护索引）；MOVE 重建段（索引失效需重建、锁表）
- SHRINK 风险？→ 收缩改行物理位置（ROWID 变，依赖 ROWID 的应用出错，所以先 ENABLE ROW MOVEMENT）；期间 DML 可能冲突（选低峰）；分区表按分区收缩
- 为什么不 TRUNCATE？→ 业务表要保留数据；TRUNCATE 锁表不可回滚；可重建的历史表才用
- 怎么预防？→ 清理作业三步规范；监控 last_analyzed；大表建分区（DROP 分区清理）
- 收完统计信息还全表扫？→ 索引失效/被 drop；分布不均用直方图；`/*+ INDEX(t idx) */` 验证
- 怎么区分 HWM vs 统计信息？→ 段块数不降=HWM；num_rows vs count(*) 差异=统计信息

## 五、同类变体（一句话各讲）

1. 锁等待变体：接口突然超时，v$session 大量 enq: TX row lock contention → 找 blocking session（大事务未提交）→ 确认后 kill 或等提交
2. 索引碎片变体：批量 UPDATE 后查询变慢 → ALTER INDEX idx REBUILD
3. 绑定变量缺失变体：高峰 CPU 高、shared pool 压力大 → v$sqlarea 同结构 SQL 文本爆炸 → 改绑定变量

## 六、项目落点

- ttra_stockdeal/ttra_cashdeal（成交/资金流水）大表：清历史数据 → 收统计信息 + SHRINK
- ttra_cashdealtotal（MERGE 累加）量大后：检查 on 条件索引 + 统计信息
- 建议数据清理作业补充"清理→收缩→收统计信息"三步（现有 clear-log.sh 只管日志）

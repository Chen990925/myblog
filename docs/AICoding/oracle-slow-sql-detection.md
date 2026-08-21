---
group: Oracle 数据库专题
title: 慢 SQL 定位
order: 21
---

# 数据库 2：慢 SQL 定位

## 一、三步框架

```
① 发现：怎么知道有慢 SQL？（监控/日志/AWR）
② 定位：慢在哪条 SQL、哪个环节？（v$sql / AWR Top SQL）
③ 分析：为什么慢？（执行计划 → 找资源消耗点）
```

**核心认知**：慢 SQL 分析的本质 = 拿到执行计划，看每一步"访问了多少行、消耗多少逻辑读/物理读"。

## 二、① 发现慢 SQL（三条途径）

1. **Druid 慢 SQL 监控**：`spring.datasource.druid.filter.stat.slow-sql-millis=1000`——超时 SQL 记日志，Druid 监控页看列表/耗时分布
   - 项目落点："Druid 开慢 SQL 监控，超 1s 自动记录，线上第一现场就是监控日志"
2. **Oracle 动态性能视图**：
```sql
select sql_id, elapsed_time/1e6, executions, buffer_gets, disk_reads, sql_text
from v$sqlarea order by elapsed_time desc fetch first 20 rows only;  -- 累计 TOP SQL
-- 实时执行中的慢 SQL
select sql_id, elapsed_time/1e6, sql_text from v$session s join v$sqlarea q
on s.sql_id = q.sql_id where s.status='ACTIVE' and s.type != 'BACKGROUND';
```
   - 字段：elapsed_time 总耗时、buffer_gets 逻辑读、disk_reads 物理读、executions 次数
   - 平均单次耗时 = elapsed_time / executions；逻辑读高=处理行数多（计划问题）、物理读高=冷数据
3. **AWR 报告**：`@?/rdbms/admin/awrrpt.sql` 生成；重点看：Top 10 Foreground Events（等待事件）、SQL ordered by Elapsed/Physical Reads/Executions、Segment Statistics

话术："慢 SQL 分析用 AWR：先看等待事件判断瓶颈类型（索引读/全表扫/锁等待），再看 Top SQL，最后抓执行计划。"

## 三、② 抓执行计划

```sql
explain plan for <sql>;                            -- 预执行分析（估算）
select * from table(dbms_xplan.display);
select * from table(dbms_xplan.display_cursor('sql_id', null, 'ALLSTATS LAST'));  -- 真实计划（实际行数，最有价值）
-- 或 set autotrace traceonly explain
```

**关键操作符**：TABLE ACCESS FULL（全表扫）/ INDEX RANGE SCAN / INDEX UNIQUE SCAN / INDEX FULL SCAN / INDEX SKIP SCAN / TABLE ACCESS BY INDEX ROWID（回表）/ SORT / NESTED LOOP / HASH JOIN

**读计划三步**：① 从右往左、从上往下找 Rows/Cost 最大的步骤；② 看访问方式（FULL 大表=缺索引、回表多=覆盖索引）；③ 看 **Rows vs Actual Rows**（真实计划）——差异大 = 统计信息过期（CBO 选错计划 = 线上突然变慢头号根因）

## 四、③ 常见根因分类

| 根因 | 特征 | 解法 |
|---|---|---|
| 缺索引/索引失效 | 大表 FULL | 加索引/修 SQL |
| 统计信息过期 | 估算≠实际行数 | GATHER_TABLE_STATS |
| 深分页 | ROWNUM 大 offset | 键集分页/游标 |
| 绑定变量缺失 | 硬解析多 | 用 ? 占位 |
| 锁等待 | 等待事件 enq: TX | 查 v$lock 找阻塞 |
| HWM 高 | DELETE 多没收缩 | SHRINK |
| 大结果集排序 | SORT 大 rows | 索引排序/减返回行 |

## 五、项目落点

- 交易流水表（ttra_*）查询维度 客户 company_id + 业务日期 business_date + 证券 inter_code → 组合索引 `(company_id, business_date, inter_code)`
- 分页列表 ROWNUM 深分页慢；MERGE 的 on 条件等值列要有索引
- Druid 慢 SQL 监控 + AWR 双通道发现

## 六、面试话术（1 分钟版）

> "慢 SQL 定位三步：发现——Druid 慢 SQL 监控 + v$sqlarea 按 elapsed_time 排序 + AWR 看 Top SQL 和等待事件；定位——EXPLAIN PLAN 或 display_cursor 拿执行计划；分析——从右往左找 Rows/Cost 最大步骤，看访问方式（全表扫=缺索引、回表多=覆盖索引），重点对比估算和实际行数——差异大说明统计信息过期，CBO 选错计划，这是线上 SQL 突然变慢的头号原因。"

## 七、高频追问

- 逻辑读 vs 物理读？→ 逻辑读=从 buffer cache 读；物理读=从磁盘；逻辑读高=处理行数多（计划问题）、物理读高=冷数据
- 统计信息过期为何突然变慢？→ CBO 估算失真选全表扫/错误连接顺序
- AWR vs v$sqlarea？→ AWR 固定区间汇总报告（历史对比）；v$sqlarea 共享池实时累计
- EXPLAIN PLAN vs 真实计划？→ 前者估算不执行；display_cursor 真实执行含实际行数，线上用真实的
- 怎么确认是这条 SQL？→ 单独执行看耗时；v$session 实时看；结合应用日志时间戳

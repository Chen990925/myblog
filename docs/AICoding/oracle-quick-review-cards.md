---
group: Oracle 数据库专题
title: Oracle 数据库速记卡
order: 25
---

# 数据库（Oracle）速记卡（临场回忆 / 快速准备版）

> 用法：面试前 10 分钟扫一遍；被问到数据库话题先定位板块，按"引导句"展开。细节翻对应笔记。

## 1. 项目 Oracle 现状（背得出 4 个特性）

**Oracle thin + Druid（PSCache 开）+ MERGE INTO 汇总 + ROWNUM 嵌套分页 + 序列 LocalIdService 批量取号**；表 ttra_*（交易流水大表）/ tusr_* / tbas_*。

## 2. Oracle 基础

- 引导句：**"MVCC 读不阻塞写 + ROWNUM 先于排序 + PSCache 软解析"**
- ROWNUM 两坑：先于 ORDER BY 分配（先排序再套子查询）；深分页扫到 endRow（键集分页优化）
- MERGE INTO = 原子 upsert（避免先查后写竞态）；累加表达式并发不丢
- 绑定变量（#{}）才能命中 PSCache；${} 拼接 = 硬解析 + 注入

## 3. 慢 SQL 定位

- 引导句：**"发现（Druid/AWR/v$sqlarea）→ 定位（执行计划）→ 分析（Rows vs A-Rows）"**
- 读计划：FULL=缺索引、回表多=覆盖索引、**A-Rows ≫ Rows = 统计信息过期**（突然变慢头号根因）
- 等待事件：db file sequential read=索引读 / scattered read=全表扫 / enq: TX=行锁

## 4. 索引优化

- 引导句：**"B+ 树树高 3~4 层 + 叶子链表 + 失效七清单 + 组合索引三原则"**
- 失效七种：函数 / 隐式转换 / like 前导 / or 非索引列 / != not in / 最左前缀 / null
- 组合索引：等值优先、选择性高优先、范围放最后；覆盖索引免回表
- 索引是读快写慢的权衡（写放大、碎片 rebuild）

## 5. Oracle 特有（缩表核心）

- 引导句：**"DELETE 不降 HWM——数据少了全表扫还扫旧水位"**
- 降 HWM：SHRINK SPACE（先 ENABLE ROW MOVEMENT，在线）/ TRUNCATE（全删重置）/ MOVE（重建段+索引失效）
- 分区表：RANGE 按日期 + 分区裁剪 + DROP 分区清理
- 统计信息：GATHER_TABLE_STATS；过期 → CBO 选错计划
- 绑定变量：避免硬解析；MyBatis #{} vs ${}

## 6. 实战（主打案例，STAR 四句）

- 引导句：**"定范围 → 抓计划 → 对比（统计信息 vs HWM）→ 解决（收统计信息→SHRINK→再收）"**
- 场景：表清理几百万行（缩表）后查询从毫秒变十几秒
- 根因叠加：统计信息过期（CBO 选全表扫）+ HWM 未降（全表扫扫旧水位）
- 证据：A-Rows ≫ Rows（统计信息）；dba_segments.blocks 不降（HWM）
- 预防：清理作业"清理→收缩→收统计信息"三步；大表分区

## 7. 高频追问口袋（一句答）

- 逻辑读 vs 物理读？→ buffer cache 命中 vs 磁盘；逻辑读高=处理行多、物理读高=冷数据
- 为什么统计信息过期变慢？→ CBO 估算失真选错计划
- SHRINK vs TRUNCATE？→ SHRINK 在线保留数据；TRUNCATE 全删重置不可回滚
- 为什么 B+ 树？→ 树高 3~4 层 IO 稳定 + 叶子链表范围查询
- 索引一定能加速？→ 不一定：小表/低选择性列/写多表
- ORA-01555？→ 快照过旧（UNDO 被覆盖），避免长事务
- 怎么区分 HWM vs 统计信息？→ 段块数不降=HWM；num_rows vs count(*) 差异=统计信息

## 8. 简历一句话

**Oracle 交易系统 SQL 优化与问题排查：Druid 慢 SQL 监控 + AWR 定位 TOP SQL，组合索引/覆盖索引设计，主导线上慢 SQL 与表缩容排查（统计信息过期 + HWM 未下降双根因），GATHER_TABLE_STATS + SHRINK SPACE 将查询从十几秒降至毫秒级** —— 主打案例：慢 SQL + 缩表（HWM）排查。

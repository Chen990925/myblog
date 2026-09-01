---
group: Oracle 数据库专题
title: Oracle 数据库准备点清单
order: 19
summary: Oracle 数据库面试准备总纲，汇总 Oracle 与 MySQL 差异、慢 SQL 定位、索引优化、HWM/分区/统计信息、实战排查等板块核心要点与文件索引。
keywords: [Oracle, 面试清单, 慢SQL, 索引, HWM]
---

# 数据库（Oracle）准备点清单（目录 / 索引版）

> 这是**总纲**：每个板块只留核心要点 + 指向详细文件。复习/面试前先看这份，细节翻对应文件。

## 0. 项目 Oracle 现状速览

- **数据源**：Oracle thin 连接（`jdbc:oracle:thin:@ip:1521/服务名`）+ Druid（max-active=200、**PSCache 开启**，注释明确"PSCache 对 Oracle 游标提升巨大"）
- **典型 SQL 特性**（508 个 mapper 中 131 个含 Oracle 特性）：
  - **MERGE INTO**（upsert）大量用于额度/资产/账户权限汇总（ttra_*/tusr_*/tbas_*）
  - **ROWNUM 嵌套分页**：`select t.* from (select rownum r, ... where rownum <= endRow) t where r >= startRow`
  - **序列 NEXTVAL**：LocalIdService 批量取号生成 ordId/serialId
- **表命名**：ttra_（交易流水，大表高发区）、tusr_（用户）、tbas_（基础）

## 1. Oracle 基础与项目 SQL 特性

- vs MySQL 三个不同：MVCC 读不阻塞写 / 实例数据库体系（SGA/PGA/shared pool）/ ROWNUM
- ROWNUM 两坑：先于 ORDER BY 分配（先排序再套子查询）；深分页扫到 endRow（键集分页/游标优化）
- MERGE INTO：原子 upsert 避免先查后写竞态；累加用表达式保证并发不丢
- 序列：非事务会跳号；批量取号缓存减少 DB 往返
- PSCache：重复 SQL 走软解析复用游标；绑定变量（MyBatis #{}）才能命中
- **详见 `数据库1-Oracle基础与项目SQL特性.md`**

## 2. 慢 SQL 定位

- 三步：发现（Druid 慢 SQL 监控 / v$sqlarea 按 elapsed_time / AWR Top SQL+等待事件）→ 定位（EXPLAIN PLAN / display_cursor 真实计划）→ 分析（找 Rows/Cost 最大步骤）
- 读计划：TABLE ACCESS FULL（大表=缺索引）、BY INDEX ROWID 回表多（覆盖索引）、**A-Rows vs Rows 差异大 = 统计信息过期**
- 七类根因：缺索引/统计信息过期/深分页/绑定变量缺失/锁等待/HWM 高/大排序
- **详见 `数据库2-慢SQL定位.md`**

## 3. 索引优化

- B+ 树：矮胖多叉（树高 3~4 层 IO）、叶子链表范围查询、非叶子只存键
- 访问方式：INDEX UNIQUE/RANGE/FULL/SKIP SCAN、TABLE ACCESS BY INDEX ROWID（回表）、FULL
- **七种失效**：函数/隐式转换/like 前导/or 非索引列/!= not in/最左前缀/null
- 组合索引：等值优先、选择性高优先、范围放最后；覆盖索引免回表
- 索引是读快写慢的权衡（写放大/碎片 rebuild/统计信息）
- **详见 `数据库3-索引优化.md`**

## 4. Oracle 特有优化点

- **HWM 高水位**：DELETE 不降 HWM → 数据少了全表扫还扫旧水位（缩表变慢本质）；SHRINK SPACE 在线收缩（先 ENABLE ROW MOVEMENT）/ TRUNCATE / MOVE
- 分区表：RANGE（日期）分区裁剪、历史分区 DROP 快速清理；查询要带分区键
- 统计信息：CBO 靠它选计划，过期 = 线上 SQL 突然变慢头号根因；GATHER_TABLE_STATS
- 绑定变量：避免硬解析；MyBatis #{} vs ${}
- **详见 `数据库4-Oracle特有优化点.md`**

## 5. 实战：线上突然超级慢 SQL + 缩表（HWM）排查

- 四步：定范围（单条 vs 全库）→ 抓执行计划（A-Rows vs Rows）→ 对比（num_rows vs count(*)、dba_segments.blocks）→ 解决
- 根因叠加：统计信息过期（CBO 选全表扫）+ HWM 未降（全表扫扫旧水位）
- 解决三步：GATHER_TABLE_STATS → ENABLE ROW MOVEMENT + SHRINK SPACE → 再收统计信息
- 预防：清理作业"清理→收缩→收统计信息"三步规范、大表分区
- **详见 `数据库5-实战慢SQL与缩表排查.md`**

## 6. 学习顺序

1. Oracle 基础 + 项目 SQL 特性（ROWNUM/MERGE/序列/PSCache）
2. 慢 SQL 定位（Druid/AWR/执行计划）
3. 索引优化（B+树/失效清单/组合索引/覆盖索引）
4. Oracle 特有优化点（HWM/分区/统计信息/绑定变量）
5. 实战：超级慢 SQL + 缩表排查（压轴，STAR）
6. 连接池与事务（Druid/锁/隔离级别，补充）

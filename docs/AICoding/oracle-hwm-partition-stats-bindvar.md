---
group: Oracle 数据库专题
title: Oracle 特有优化点
order: 23
---

# 数据库 4：Oracle 特有优化点（HWM/分区/统计信息/绑定变量）

## 一、高水位线（HWM）—— 缩表问题核心

**定义**：表段按块存储，HWM = 段中已格式化过的最高块位置；**全表扫描只扫到 HWM**。

**关键认知**：
- insert 时 HWM 上移；**DELETE 不降 HWM**（删的行只标记为空，块还在 HWM 下）
- 表 DELETE 大量数据后（数据少了），全表扫描依然扫到原 HWM → **"缩表反而慢"的本质**

**四个命令对比（必考）**：
| 命令 | 降 HWM | 数据 | 索引 | 在线 |
|---|---|---|---|---|
| DELETE | ✗ | 删行 | 不重建 | 在线 |
| TRUNCATE | ✅ 重置 0 | 全删不可回滚 | 保留 | 锁表 |
| MOVE | ✅ 重建 | 保留 | **需重建** | 锁表 |
| SHRINK SPACE | ✅ 在线收缩 | 保留 | 自动维护 | **在线**（需 ROW MOVEMENT） |

**SHRINK 正确姿势**：
```sql
ALTER TABLE t ENABLE ROW MOVEMENT;   -- ① 必须先开行移动（收缩改行物理位置）
ALTER TABLE t SHRINK SPACE;          -- ② 降 HWM 回收空间；可选 CASCADE（连索引）
-- 选业务低峰执行；收缩后重新收集统计信息
```

话术："Oracle 的 DELETE 不降高水位线：删大量数据后段还是那么大，全表扫照样扫到旧 HWM——这就是'表缩了但 SQL 反而慢'。解决：SHRINK SPACE 在线收缩（先 ENABLE ROW MOVEMENT），或可重建场景 TRUNCATE；收缩后收统计信息。"

## 二、分区表（大表治理，交易流水天然适合）

- 按**业务日期 RANGE 分区**（最常见）：查询只扫对应分区（**分区裁剪 partition pruning**）
```sql
CREATE TABLE ttra_stockdeal (...) PARTITION BY RANGE (business_date) (
    PARTITION p202501 VALUES LESS THAN (TO_DATE('2025-02-01','YYYY-MM-DD')), ...);
```
- 类型：RANGE（日期）/ LIST（枚举）/ HASH（均匀分布）/ 复合（RANGE+HASH）
- 收益：分区裁剪、**历史分区 DROP/TRUNCATE 快速清理**（比 DELETE 快几个量级）、本地索引
- 注意：查询**不带分区键无法裁剪**；分区数量别太多

## 三、统计信息（线上 SQL 突然变慢头号根因）

- CBO 靠统计信息估算行数/选择性选执行计划；**过期 → 估算失真 → 选错计划**
```sql
EXEC DBMS_STATS.GATHER_TABLE_STATS(ownname=>'OMS', tabname=>'TTRA_STOCKDEAL', cascade=>TRUE);
```
- 何时收：数据量变 10~20% / 批量变更后 / 收缩分区后 / 定时作业
- 证据：执行计划 Rows（估算）vs A-Rows（实际）差异大

## 四、绑定变量（避免硬解析）

- SQL 文本不同 → 硬解析（语法/权限 + 生成计划 + shared pool 锁）→ 高并发 shared pool 竞争、游标暴涨
```sql
-- 反例：拼接文本 → 每次硬解析
-- 正例：绑定变量 → SQL 文本固定 → 软解析复用游标
select * from t where id = :id;
```
- 副作用：绑定变量 peek 不到具体值，数据分布不均可能选不到最优计划（bind peeking/自适应游标/直方图缓解）
- **MyBatis：#{} 生成绑定变量、${} 拼接（SQL 注入 + 硬解析双重问题）**

## 五、其他（一句话）

- UNDO 一致性读：长事务 UNDO 膨胀（ORA-01555 snapshot too old）
- PGA 排序区：大排序落盘临时表空间变慢——避免大结果集排序
- 并行执行 `/*+ PARALLEL(t 4) */`：大表扫提速，抢资源慎用
- 物化视图：预计算汇总（实时性差）

## 六、面试话术（1 分钟版）

> "Oracle 特有优化四点：高水位线——DELETE 不降 HWM，数据少了全表扫还扫旧水位（缩表变慢本质），用 SHRINK SPACE 在线收缩（先 ENABLE ROW MOVEMENT）或 TRUNCATE，收缩后收统计信息；分区表——交易流水按日期 RANGE 分区，分区裁剪避免全表扫、历史分区快速清理；统计信息——CBO 靠它选计划，过期致线上 SQL 突然变慢，GATHER_TABLE_STATS；绑定变量——SQL 文本固定走软解析复用游标，MyBatis 用 #{} 不用 ${}。"

## 七、高频追问

- SHRINK vs TRUNCATE？→ SHRINK 在线保留数据降 HWM；TRUNCATE 全删重置 HWM 不可回滚；MOVE 重建段但索引失效需重建
- 分区裁剪不生效？→ 查询没带分区键；分区键被函数包裹；本地索引配错
- 统计信息多久收？→ 数据量变 10~20% 或批量变更后；或定时
- 绑定变量 peeking 坑？→ 分布不均 peek 到某值选错计划；直方图/自适应游标缓解
- ORA-01555？→ 快照过旧：一致性读所需 UNDO 被覆盖；避免长事务、调 UNDO 保留时间

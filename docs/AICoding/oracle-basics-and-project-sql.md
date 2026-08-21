---
group: Oracle 数据库专题
title: Oracle 基础与项目 SQL 特性
order: 20
---

# 数据库 1：Oracle 基础与项目 SQL 特性（结合项目）

## 一、Oracle vs MySQL 三个本质不同

1. **锁与并发**：Oracle 写不阻塞读（MVCC + UNDO 快照读，读到的是一致性快照）；行锁写时获取不升级
2. **体系结构**：实例（SGA+后台进程）与数据库（数据文件）分离；SGA（shared pool/buffer cache/redo buffer）、PGA（会话私有）；shared pool 是硬解析舞台
3. **分页**：无 LIMIT，用 **ROWNUM 伪列**——**先于 ORDER BY 生效**（经典坑）

## 二、ROWNUM 分页（项目核心，两个坑）

**项目写法（BondDAO 等）**：
```sql
select t.* from (
    select rownum r, inter_code from tbas_bond bo
    where rownum <= #{endRow} order by ...
) t where r >= #{startRow}
```

- **坑 1**：ROWNUM 先于 ORDER BY 分配 → 必须先排序再套 rownum 子查询（`select rownum r, a.* from (select ... order by) a where rownum <= endRow`）
- **坑 2**：深分页要扫到 endRow → 大表翻页越来越慢 → 优化：**键集分页**（`where id > lastId order by id limit N`，走索引定位）或游标分页

话术："Oracle 分页用 ROWNUM，坑有两个：先于 ORDER BY 分配（必须先排序再套子查询）；深分页扫到 endRow（大表用键集分页优化）。"

## 三、MERGE INTO（原子 upsert，项目大量用于汇总）

```sql
merge into ttra_cashdealtotal a
using (select :companyId, :date, :amount from dual) s
on (a.company_id = s.company_id and a.business_date = s.business_date)
when matched then update set a.total_amount = a.total_amount + s.amount
when not matched then insert (...) values (...)
```

- 原子 upsert：一条语句避免"先 select 判断再 insert/update"的 check-then-act 竞态（并发两会话都查不到 → 重复 insert）
- 累加安全：`set total = total + :amt` 是 DB 行锁下的原子表达式，并发不丢
- 性能：on 条件列要走索引（等值列有唯一/主键索引），否则全表扫匹配

话术："额度汇总表用 MERGE INTO 做原子 upsert，多笔并发累加不丢，避免先查后写竞态。"

## 四、序列 NEXTVAL（ID 生成）

- `SELECT seq.NEXTVAL FROM dual`；Oracle 无自增列（12c 才有 IDENTITY）
- 项目 `LocalIdService.generateId(companyId, SequenceEnum.X, count)`：**批量取号 + 本地缓存**减少 DB 往返
- 序列**非事务**：回滚不回退（跳号）；重启可能跳号（cache 丢失）

## 五、PSCache（PreparedStatement 缓存，项目已开启）

- 配置：Druid `pool-prepared-statements=true` + `max-pool-prepared-statement-per-connection-size=100`（注释明确"PSCache 对 Oracle 游标提升巨大"）
- 原理：Oracle 游标对应一条已解析 SQL；软解析（复用游标）vs 硬解析（重新解析 + shared pool 锁）
- 配合**绑定变量**（MyBatis #{} 生成 ? 占位）SQL 文本固定才能命中 PSCache；`${}` 拼接 = 硬解析 + SQL 注入双重问题

话术："Druid 开 PSCache（每连接 100 个），重复 SQL 走软解析复用游标避免硬解析；业务代码坚持绑定变量。"

## 六、SGA/PGA 一句话

```
实例（SGA+进程）＋数据库（数据文件）
SGA：shared pool（SQL/计划/字典）、buffer cache（数据）、redo log buffer
PGA：会话私有（排序/哈希）
```
- 面试点：buffer cache 命中（逻辑读 vs 物理读）；shared pool 硬解析压力

## 七、面试话术（1 分钟版）

> "项目用 Oracle + Druid（开 PSCache）。三个特性强相关：ROWNUM 分页——先于 ORDER BY 分配，必须嵌套先排序再截断，深分页用键集分页；MERGE INTO 原子 upsert——额度汇总存在则累加、不存在则插入，避免先查后写竞态，累加表达式保证并发不丢；序列 NEXTVAL 生成 ID——LocalIdService 批量取号本地缓存减少 DB 往返。PSCache 让重复 SQL 软解析复用游标，所以坚持绑定变量（#{}）不拼 SQL 文本。"

## 八、高频追问

- ROWNUM vs MySQL LIMIT？→ ROWNUM 伪列先于排序分配；LIMIT 排序后截断；12c 有 FETCH FIRST
- MERGE 有坑？→ on 条件列走索引；并发 insert 新 key 仍可能冲突；比 ON DUPLICATE KEY 更标准
- 序列会回退？→ 不会，非事务；重启可能跳号
- 硬解析为什么慢？→ 检查语法/权限/生成计划 + 拿 shared pool 锁；高并发竞争是瓶颈
- 绑定变量和 PSCache 关系？→ PSCache 缓存同文本 SQL 的游标；绑定变量让文本固定才能命中

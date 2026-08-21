---
group: Oracle 数据库专题
title: 索引优化
order: 22
---

# 数据库 3：索引优化

## 一、B+ 树原理（一句话 + 三个为什么）

一句话：B+ 树是多叉平衡查找树，**叶子节点存数据（索引列值 + ROWID）且按序链表串联**，非叶子只存索引键。

三个为什么：
1. 为什么不用二叉树/哈希：B+ 树矮胖扇出大，**树高 3~4 层**覆盖千万行，IO 次数=树高稳定 O(logN)；哈希只能等值不能范围
2. 为什么叶子链表：范围查询（>、between、order by）顺序扫链表
3. 为什么非叶子只存键：节点存更多键 → 树更矮 → IO 更少（Oracle 块 8KB）

| 结构 | 等值 | 范围 | IO | 场景 |
|---|---|---|---|---|
| 哈希 | O(1) | ✗ | - | 等值 |
| B+ 树 | O(logN) | ✅ | 树高 3~4 | 主流 |
| 跳表 | O(logN) | ✅ | - | Redis ZSet |

## 二、索引类型（Oracle）

- B-tree（默认）、唯一索引（主键自动）、组合索引（最左前缀）、函数索引（`lower(col)`）、位图索引（低基数 OLAP，OLTP 慎用 DML 锁）、反向键索引（序列键防右热点）、分区索引

## 三、执行计划访问方式

| 操作 | 含义 | 出现 |
|---|---|---|
| INDEX UNIQUE SCAN | 唯一索引等值 | 主键/唯一键 |
| INDEX RANGE SCAN | 范围 | 等值/范围/排序 |
| INDEX FULL SCAN | 扫整个索引 | 覆盖查询/排序 |
| INDEX SKIP SCAN | 跳扫 | 组合索引前导列不在 where |
| TABLE ACCESS BY INDEX ROWID | 回表 | 索引列不覆盖查询列 |
| TABLE ACCESS FULL | 全表扫 | 无索引/失效/小表 |

## 四、索引失效七种情况（背熟清单）

1. 对索引列用函数：`TRUNC(create_time)` → 函数索引或改范围条件
2. 隐式类型转换：`varchar_col = 123` → Oracle 对列隐式转换 → 保证类型一致
3. LIKE 前导通配：`like '%xxx'`（`xxx%` 可以）
4. OR 连接非索引列 → union all / 两边建索引
5. `!=`、`<>`、`NOT IN`、`NOT EXISTS` 一般不走索引
6. 组合索引不满足最左前缀：`(a,b,c)` 索引 `where b=?` 用不到
7. Oracle 特殊：`col is null` 不走普通 B-tree（索引不存 NULL）→ 函数索引 nvl(col,0)

话术："索引失效按清单过：函数、隐式转换、like 前导、or 非索引列、!=/not in、最左前缀、null——看到计划从 RANGE SCAN 变 FULL 就按清单排查。"

## 五、组合索引设计（项目实战）

- 项目场景：`where company_id = ? and business_date = ? and inter_code = ?`
- 三原则：**等值条件放前面**；**选择性高的放前面**（区分度大尽早缩小范围，但等值优先于选择性）；**范围条件放最后**（范围后的列无法利用排序/过滤）
- **覆盖索引**：查询列全在索引里（`(company_id, business_date, inter_code, ord_id)`）→ 免回表
- 避免冗余索引：`(a,b)` 覆盖 `(a)` 的查询，别重复建

话术："组合索引三原则：等值优先、选择性高优先、范围放最后；高频查询列加进索引做覆盖索引免回表。项目查'客户+日期+证券'建 `(company_id, business_date, inter_code)`。"

## 六、回表与覆盖索引

```
走索引：INDEX RANGE SCAN → ROWID → 回表查数据行（每行一次随机读）
覆盖索引：查询列全在索引里 → 免回表
```
- 回表代价：万行回表 = 万次随机 IO（db file sequential read）
- `select *` 永远无法覆盖；高频查询收窄返回列并放进索引

## 七、索引维护成本（工程观）

- **写放大**：DML 同步维护索引（多索引 = 多写放大）——不滥用
- 索引碎片：频繁 DML → `ALTER INDEX idx REBUILD`
- 统计信息：建索引要 GATHER_INDEX_STATS，CBO 才用

## 八、面试话术（1 分钟版）

> "索引优化框架：B+ 树——矮胖多叉、叶子链表范围、IO=树高 3~4；执行计划——RANGE/UNIQUE SCAN 正常、FULL 大表问题、回表多要覆盖索引；失效七种按清单排查；组合索引等值优先/选择性高优先/范围放后；项目'客户+日期+证券'组合索引 + 覆盖列设计。索引是读快写慢的权衡，不滥用。"

## 九、高频追问

- B+ 树 vs 红黑树？→ 红黑树树高 log2N（千万行 ~24 层=24 次 IO）；B+ 树 3~4 层 + 叶子链表范围
- 组合索引何时失效？→ 不满足最左前缀；中间范围列后面的列用不上
- 索引一定能加速？→ 不一定：小表全表扫更快（CBO 判断）；低选择性列（性别）走索引不如全表扫；写多表索引是负担
- 索引碎片？→ analyze index validate structure 看 del_lf_rows；定期 rebuild
- 唯一 vs 主键？→ 主键=非空+唯一；唯一索引可空（Oracle 允许多 NULL）
- 为什么 select * 不好？→ 无法覆盖必回表 + 传输大

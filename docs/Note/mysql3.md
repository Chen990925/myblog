---
group: Mysql专题
title: Mysql索引优化(一)
order: 3
---

# Mysql索引优化(一)

> 核心思想就是：尽量利用一两个复杂的多字段联合索引，抗下你 80% 以上的查询，然后用一两个辅助索引尽量抗下剩余的一些非典型查询，保证这种大数据量表的查询尽可能多的都能充分利用索引

**示例表**

创建联合索引： KEY `idx_name_age_position` (`name`,`age`,`position`) USING BTREE 

```sql
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL DEFAULT '' COMMENT '姓名',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄',
  `position` varchar(20) NOT NULL DEFAULT '' COMMENT '职位',
  `hire_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职时间',
  PRIMARY KEY (`id`),
  KEY `idx_name_age_position` (`name`,`age`,`position`) USING BTREE 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='员工记录表';
 
INSERT INTO employees(name,age,position,hire_time) VALUES('LiLei',22,'manager',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('HanMeimei', 23,'dev',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('Lucy',23,'dev',NOW());
 
-- 插入一些示例数据
drop procedure if exists insert_emp; 
delimiter ;;
create procedure insert_emp()        
begin
  declare i int;                    
  set i=1;                          
  while(i<=100000)do                 
    insert into employees(name,age,position) values(CONCAT('cjl',i),i,'dev');  
    set i=i+1;                       
  end while;
end;;
delimiter ;
call insert_emp();
```



## 一. 一些索引使用场景

### **1、联合索引第一个字段用范围不会走索引**

```sql
EXPLAIN SELECT * FROM employees WHERE name > 'LiLei' AND age = 22 AND position ='manager';
```

![image-20240428164612617](../../public/images/image-20240428164612617.png)

联合索引第一个字段就用范围查找不会走索引，mysql 内部可能觉得第一个字段就用范围，结果集应该很大，回表效率不高，还不如就全表扫描



### **2、强制走索引**

使用`force index(idx_name_age_position)`强制使用索引

```sql
EXPLAIN SELECT * FROM employees force index(idx_name_age_position) WHERE name > 'LiLei' AND age = 22 AND position ='manager';
```

![image-20240428164708861](../../public/images/image-20240428164708861.png)

虽然使用了强制走索引让联合索引第一个字段范围查找也走索引，扫描的行 rows 看上去也少了点，但是**最终查找效率不一定比全表扫描高，因为回表效率不高**

```sql
-- 关闭查询缓存
set global query_cache_size=0;  
set global query_cache_type=0;
-- 执行时间0.333s
SELECT * FROM employees WHERE name > 'LiLei';
-- 执行时间0.444s
SELECT * FROM employees force index(idx_name_age_position) WHERE name > 'LiLei';
```



### **3、覆盖索引优化**

使用覆盖索引就可以避免全表扫描

```sql
EXPLAIN SELECT name,age,position FROM employees WHERE name > 'LiLei' AND age = 22 AND position ='manager';
```



### 4、in 和 or 在表数据量比较大的情况会走索引，在表记录不多的情况下会选择全表扫描

```sql
EXPLAIN SELECT * FROM employees WHERE name in ('LiLei','HanMeimei','Lucy') AND age = 22 AND position ='manager';
```

![image-20240428164910439](../../public/images/image-20240428164910439.png)

```sql
EXPLAIN SELECT * FROM employees WHERE (name = 'LiLei' or name = 'HanMeimei') AND age = 22 AND position ='manager';
```

![image-20240428165042075](../../public/images/image-20240428165042075.png)



### **5、like KK% 一般情况都会走索引**

```sql
EXPLAIN SELECT * FROM employees WHERE name like 'LiLei%' AND age = 22 AND position ='manager';
```

![image-20240428165155749](../../public/images/image-20240428165155749.png)

ike KK% 其实就是用到了**索引下推优化**

**什么是索引下推**

对于辅助的联合索引 (name,age,position)，正常情况按照最左前缀原则，`SELECT \* FROM employees WHERE name like 'LiLei%' AND age = 22 AND position ='manager'`  这种情况只会走 name 字段索引，因为根据 name 字段过滤完，得到的索引行里的 age 和 position 是无序的，无法很好的利用索引。

在 MySQL5.6 之前的版本，这个查询只能在联合索引里匹配到名字是 'LiLei' 开头的索引，然后拿这些索引对应的主键**逐个回表**，到主键索引上找出相应的记录，再比对 age 和 position 这两个字段的值是否符合。

MySQL 5.6 引入了索引下推优化，**可以在索引遍历过程中，对索引中包含的所有字段先做判断，过滤掉不符合条件的记录之后再回表，可以有效的减少回表次数**。使用了索引下推优化后，上面那个查询在联合索引里匹配到名字是 **'LiLei' 开头**的索引之后，同时还会在索引里过滤 **age** 和 **position** 这两个字段，拿着过滤完剩下的索引对应的主键 id 再回表查整行数据。

索引下推会减少回表次数，对于 innodb 引擎的表索引下推只能用于二级索引，innodb 的主键索引（聚簇索引）树叶子节点上保存的是全行数据，所以这个时候索引下推并不会起到减少查询全行数据的效果。 

> **为什么范围查找 Mysql 没有用索引下推优化？**
>
> 估计应该是 Mysql 认为范围查找过滤的结果集过大，like KK% 在绝大多数情况来看，过滤后的结果集比较小，所以这里 Mysql 选择给 like KK% 用了索引下推优化，当然这也不是绝对的，有时 like KK% 也不一定就会走索引下推。
>
> 
>
> 索引下推就是为了减少回表。是否使用索引和结果集大小有关联



## 二. Mysql 会如何选择合适的索引

```sql
mysql> EXPLAIN select * from employees where name > 'a';
```

![image-20240428170212410](../../public/images/image-20240428170212410.png)

如果用 name 索引需要遍历 name 字段联合索引树，然后还需要根据遍历出来的主键值去主键索引树里再去查出最终数据，**回表成本比全表扫描还高**，可以用覆盖索引优化，这样只需要遍历 name 字段的联合索引树就能拿到所有结果，如下：

```sql
mysql> EXPLAIN select name,age,position from employees where name > 'a' ;
```

![image-20240428170631946](../../public/images/image-20240428170631946.png)

```sql
mysql> EXPLAIN select * from employees where name > 'zzz' ;
```

![image-20240428170651768](../../public/images/image-20240428170651768.png)

对于上面这两种 name>'a' 和 name>'zzz' 的执行结果，mysql 最终是否选择走索引或者一张表涉及多个索引，mysql 最终如何选择索引，我们可以用 **trace 工具**来一查究竟，开启 trace 工具会影响 mysql 性能，所以只能临时分析 sql 使用，用完之后立即关闭

### **trace 工具用法：**

```sql
mysql> set session optimizer_trace="enabled=on",end_markers_in_json=on;  --开启trace

mysql> select * from employees where name > 'a' order by position;
mysql> SELECT * FROM information_schema.OPTIMIZER_TRACE;  --使用：在查询语句下加上这一条
 
查看trace字段：
{
  "steps": [
    {
      "join_preparation": {    --第一阶段：SQL准备阶段，格式化sql
        "select#": 1,
        "steps": [
          {
            "expanded_query": "/* select#1 */ select `employees`.`id` AS `id`,`employees`.`name` AS `name`,`employees`.`age` AS `age`,`employees`.`position` AS `position`,`employees`.`hire_time` AS `hire_time` from `employees` where (`employees`.`name` > 'a') order by `employees`.`position`"
          }
        ] /* steps */
      } /* join_preparation */
    },
    {
      "join_optimization": {    --第二阶段：SQL优化阶段
        "select#": 1,
        "steps": [
          {
            "condition_processing": {    --条件处理
              "condition": "WHERE",
              "original_condition": "(`employees`.`name` > 'a')",
              "steps": [
                {
                  "transformation": "equality_propagation",
                  "resulting_condition": "(`employees`.`name` > 'a')"
                },
                {
                  "transformation": "constant_propagation",
                  "resulting_condition": "(`employees`.`name` > 'a')"
                },
                {
                  "transformation": "trivial_condition_removal",
                  "resulting_condition": "(`employees`.`name` > 'a')"
                }
              ] /* steps */
            } /* condition_processing */
          },
          {
            "substitute_generated_columns": {
            } /* substitute_generated_columns */
          },
          {
            "table_dependencies": [    --表依赖详情
              {
                "table": "`employees`",
                "row_may_be_null": false,
                "map_bit": 0,
                "depends_on_map_bits": [
                ] /* depends_on_map_bits */
              }
            ] /* table_dependencies */
          },
          {
            "ref_optimizer_key_uses": [
            ] /* ref_optimizer_key_uses */
          },
          {
            "rows_estimation": [    --预估表的访问成本
              {
                "table": "`employees`",
                "range_analysis": {
                  "table_scan": {     --全表扫描情况
                    "rows": 10123,    --扫描行数
                    "cost": 2054.7    --查询成本
                  } /* table_scan */,
                  "potential_range_indexes": [    --查询可能使用的索引
                    {
                      "index": "PRIMARY",    --主键索引
                      "usable": false,
                      "cause": "not_applicable"
                    },
                    {
                      "index": "idx_name_age_position",    --辅助索引
                      "usable": true,
                      "key_parts": [
                        "name",
                        "age",
                        "position",
                        "id"
                      ] /* key_parts */
                    }
                  ] /* potential_range_indexes */,
                  "setup_range_conditions": [
                  ] /* setup_range_conditions */,
                  "group_index_range": {
                    "chosen": false,
                    "cause": "not_group_by_or_distinct"
                  } /* group_index_range */,
                  "analyzing_range_alternatives": {    --分析各个索引使用成本
                    "range_scan_alternatives": [
                      {
                        "index": "idx_name_age_position",
                        "ranges": [
                          "a < name"      --索引使用范围
                        ] /* ranges */,
                        "index_dives_for_eq_ranges": true,
                        "rowid_ordered": false,    --使用该索引获取的记录是否按照主键排序
                        "using_mrr": false,
                        "index_only": false,       --是否使用覆盖索引
                        "rows": 5061,              --索引扫描行数
                        "cost": 6074.2,            --索引使用成本
                        "chosen": false,           --是否选择该索引
                        "cause": "cost"
                      }
                    ] /* range_scan_alternatives */,
                    "analyzing_roworder_intersect": {
                      "usable": false,
                      "cause": "too_few_roworder_scans"
                    } /* analyzing_roworder_intersect */
                  } /* analyzing_range_alternatives */
                } /* range_analysis */
              }
            ] /* rows_estimation */
          },
          {
            "considered_execution_plans": [
              {
                "plan_prefix": [
                ] /* plan_prefix */,
                "table": "`employees`",
                "best_access_path": {    --最优访问路径
                  "considered_access_paths": [   --最终选择的访问路径
                    {
                      "rows_to_scan": 10123,
                      "access_type": "scan",     --访问类型：为scan，全表扫描
                      "resulting_rows": 10123,
                      "cost": 2052.6,
                      "chosen": true,            --确定选择
                      "use_tmp_table": true
                    }
                  ] /* considered_access_paths */
                } /* best_access_path */,
                "condition_filtering_pct": 100,
                "rows_for_plan": 10123,
                "cost_for_plan": 2052.6,
                "sort_cost": 10123,
                "new_cost_for_plan": 12176,
                "chosen": true
              }
            ] /* considered_execution_plans */
          },
          {
            "attaching_conditions_to_tables": {
              "original_condition": "(`employees`.`name` > 'a')",
              "attached_conditions_computation": [
              ] /* attached_conditions_computation */,
              "attached_conditions_summary": [
                {
                  "table": "`employees`",
                  "attached": "(`employees`.`name` > 'a')"
                }
              ] /* attached_conditions_summary */
            } /* attaching_conditions_to_tables */
          },
          {
            "clause_processing": {
              "clause": "ORDER BY",
              "original_clause": "`employees`.`position`",
              "items": [
                {
                  "item": "`employees`.`position`"
                }
              ] /* items */,
              "resulting_clause_is_simple": true,
              "resulting_clause": "`employees`.`position`"
            } /* clause_processing */
          },
          {
            "reconsidering_access_paths_for_index_ordering": {
              "clause": "ORDER BY",
              "steps": [
              ] /* steps */,
              "index_order_summary": {
                "table": "`employees`",
                "index_provides_order": false,
                "order_direction": "undefined",
                "index": "unknown",
                "plan_changed": false
              } /* index_order_summary */
            } /* reconsidering_access_paths_for_index_ordering */
          },
          {
            "refine_plan": [
              {
                "table": "`employees`"
              }
            ] /* refine_plan */
          }
        ] /* steps */
      } /* join_optimization */
    },
    {
      "join_execution": {    --第三阶段：SQL执行阶段
        "select#": 1,
        "steps": [
        ] /* steps */
      } /* join_execution */
    }
  ] /* steps */
}

//再次执行 
mysql> select * from employees where name > 'zzz' order by position;
mysql> SELECT * FROM information_schema.OPTIMIZER_TRACE;
 
 
mysql> set session optimizer_trace="enabled=off";    --关闭trace
```

查看trace字段可知索引扫描的成本低于全表扫描，所以mysql最终选择索引扫描

结论：全表扫描的成本低于索引扫描，所以mysql最终选择全表扫描



## 三. 常见 sql 深入优化

### **Order by 与 Group by 优化**

- Case1：

<img src="../../public/images/image-20240428184307158.png" alt="image-20240428184307158" style="zoom:33%;" />

​	**分析：**

​	利用最左前缀法则：中间字段不能断，因此查询用到了 name 索引，从 key_len=74 也能看出，age 索引列用在排序过程中，因为 Extra 字段里没有 using filesort



- Case 2：

  <img src="../../public/images/image-20240428191501767.png" alt="image-20240428191501767" style="zoom: 33%;" />

  分析：

  从 explain 的执行结果来看：key_len=74，查询使用了 name 索引，由于用了 position 进行排序，跳过了 age，出现了 Using filesort

  **优化**

<img src="../../public/images/image-20240428191646819.png" alt="image-20240428191646819" style="zoom:33%;" />

​		分析：

​		查找只用到索引 name，age 和 position 用于排序，无 Using filesort。



- Case 3

  <img src="../../public/images/image-20240428191757981.png" alt="image-20240428191757981" style="zoom:33%;" />

  **分析：**

  和 Case 3 中 explain 的执行结果一样，但是出现了 Using filesort，因为索引的创建顺序为 name,age,position，但是排序的时候 age 和 position 颠倒位置了。



- Case 4

  <img src="../../public/images/image-20240428191840941.png" alt="image-20240428191840941" style="zoom:33%;" />

  分析：

  与 Case 3 对比，在 Extra 中并未出现 Using filesort，因为 age 为常量，在排序中被优化，所以索引未颠倒，不会出现 Using filesort。



- Case 5

  <img src="../../public/images/image-20240428191916104.png" alt="image-20240428191916104" style="zoom:33%;" />

  分析：

  虽然排序的字段列与索引顺序一样，且 order by 默认升序，这里 position desc 变成了降序，**导致与索引的排序方式不同**，从而产生 Using filesort。Mysql8 以上版本有降序索引可以支持该种查询方式。



- Case 6：

  <img src="../../public/images/image-20240428192025211.png" alt="image-20240428192025211" style="zoom: 67%;" />

  分析：

  对于排序来说，多个相等条件也是范围查询

  

- Case 7

  <img src="../../public/images/image-20240428192129996.png" alt="image-20240428192129996" style="zoom:33%;" />

  可以用覆盖索引优化

  <img src="../../public/images/image-20240428192155822.png" alt="image-20240428192155822" style="zoom:33%;" />



### **优化总结：**

1. MySQL 支持两种方式的排序 filesort 和 index，Using index 是指 MySQL 扫描索引本身完成排序。**index 效率高，filesort 效率低**

2. order by 满足两种情况会使用 Using index。
   - order by 语句**使用索引最左前列**
   - 使用 where 子句与 order by 子句**条件列组合满足索引最左前列**。

3. **尽量在索引列上完成排序**，遵循索引建立（索引创建的顺序）时的最左前缀法则。

4. **如果 order by 的条件不在索引列上，就会产生 Using filesort**

5. **能用覆盖索引尽量用覆盖索引**

6. group by 与 order by 很类似，**其实质是先排序后分组**，遵照索引创建顺序的最左前缀法则。对于 group by 的优化如果不需要排序的可以加上 **order by null 禁止排序**

   > 注意，where 高于 having，能写在 where 中的限定条件就不要去 having 限定了。



### **Using filesort 文件排序原理详解**

**filesort 文件排序方式**

- 单路排序：是一次性取出满足条件行的所有字段，然后在 sort buffer 中进行排序；用 trace 工具可以看到 sort_mode 信息里显示 <sort_key, additional_fields> 或者 < sort_key, packed_additional_fields >

-  双路排序（又叫**回表**排序模式）：是首先根据相应的条件取出相应的**排序字段**和**可以直接定位行数据的行 ID**，然后在 sort buffer 中进行排序，排序完后需要再次取回其它需要的字段；用 trace 工具可以看到 sort_mode 信息里显示 <sort_key, rowid>

  > 单路：拿到所有的数据进行排序 use filesort `case5`；双路：只拿到ID和排序字段排序然后**回表** 

**MySQL 通过比较系统变量 max_length_for_sort_data (默认 1024 字节) 的大小和需要查询的字段总大小来判断使用哪种排序模式。**`查询成本`

- 如果 字段的总长度小于 max_length_for_sort_data ，那么使用 单路排序模式

- 如果 字段的总长度大于 max_length_for_sort_data ，那么使用 双路排序模式



- **单路排序**的详细过程：
  1. 从索引 name 找到第一个满足 name = 'cjl' 条件的主键 id
  2.  根据主键 id 取出整行，**取出所有字段的值，存入 sort_buffer 中**
  3. 从索引 name 找到下一个满足 name = ‘cjl’ 条件的主键 id
  4. 重复步骤 2、3 直到不满足 name = 'cjl'
  5. 对 sort_buffer 中的数据按照字段 position 进行排序
  6. 返回结果给客户端



- **双路排序**的详细过程：
  1. 从索引 name 找到第一个满足 name = cjl  的主键 id
  2.  根据主键 id 取出整行，**把排序字段 position 和主键 id 这两个字段放到 sort buffer 中**
  3. 从索引 name 取下一个满足 name = cjl  记录的主键 id
  4.  重复 3、4 直到不满足 name = cjl 
  5. 对 sort_buffer 中的字段 position 和主键 id 按照字段 position 进行排序
  6. 遍历排序好的 id 和字段 position，按照 id 的值**回到原表**中取出 所有字段的值返回给客户端

其实对比两个排序模式，单路排序会把所有需要查询的字段都放到 sort buffer 中，而双路排序只会把主键和需要排序的字段放到 sort buffer 中进行排序，然后再通过主键回到原表查询需要的字段。

如果 MySQL **排序内存** **sort_buffer**  配置的比较小并且没有条件继续增加了，可以适当把 max_length_for_sort_data 配置小点，让优化器选择使用**双路排序**算法，可以在 sort_buffer 中一次排序更多的行，只是需要再根据主键回到原表取数据。

如果 MySQL 排序内存有条件可以配置比较大，可以适当增大 max_length_for_sort_data 的值，让优化器优先选择全字段排序 (**单路排序**)，把需要的字段放到 sort_buffer 中，这样排序后就会直接从内存里返回查询结果了。

所以，MySQL 通过 **max_length_for_sort_data** 这个参数来控制排序，在不同场景使用不同的排序模式，从而提升排序效率。

> 如果全部使用 sort_buffer 内存排序一般情况下效率会高于磁盘文件排序，但不能因为这个就随便增大 sort_buffer (默认 1M)，mysql 很多参数设置都是做过优化的，不要轻易调整。
>
> 只要了解单双路排序即可



## **四. 索引设计原则**

### **1、代码先行，索引后上**

一般是怎么给数据表建立索引的，是建完表马上就建立索引吗？

这其实是不对的，一般应该**等到主体业务功能开发完毕，把涉及到该表相关 sql 都要拿出来分析之后再建立索引**。

### **2、联合索引尽量覆盖条件**

比如可以设计一个或者两三个联合索引 (**尽量少建单值索引**)，让每一个联合索引都尽量去包含 sql 语句里的 where、order by、group by 的字段，还要确保这些联合索引的字段顺序尽量满足 sql 查询的最左前缀原则。

### **3、不要在小基数字段上建立索引**

索引基数是指这个字段在表里总共有多少个不同的值，比如一张表总共 100 万行记录，其中有个性别字段，其值不是男就是女，那么该字段的基数就是 2。

如果对这种小基数字段建立索引的话，还不如全表扫描了，因为你的索引树里就包含男和女两种值，根本**没法进行快速的二分查找**，那用索引就没有太大的意义了。

一般建立索引，尽量使用那些基数比较大的字段，就是值比较多的字段，那么才能发挥出 B + 树快速二分查找的优势来。

### **4、长字符串我们可以采用前缀索引**

尽量对字段类型较小的列设计索引，比如说什么 tinyint 之类的，因为字段类型较小的话，**占用磁盘空间也会比较小**，此时你在搜索的时候性能也会比较好一点。

当然，这个所谓的字段类型小一点的列，也不是绝对的，很多时候你就是要针对 varchar (255) 这种字段建立索引，哪怕多占用一些磁盘空间也是有必要的。

对于这种 varchar (255) 的大字段可能会比较占用磁盘空间，可以稍微优化下，比如针对这个字段的前 20 个字符建立索引，就是说，对这个字段里的每个值的前 20 个字符放在索引树里，类似于 KEY index (name (20),age,position)。

此时你在 where 条件里搜索的时候，如果是根据 name 字段来搜索，那么此时就会先到索引树里根据 name 字段的前 20 个字符去搜索，定位到之后前 20 个字符的前缀匹配的部分数据之后，再回到聚簇索引提取出来完整的 name 字段值进行比对。

但是假如你要是 order by name，那么此时你的 name 因为在索引树里仅仅包含了前 20 个字符，所以这个排序是没法用上索引的， group by 也是同理。所以这里大家要对前缀索引有一个了解。

### **5、where 与 order by 冲突时优先 where**

在 where 和 order by 出现索引设计冲突时，到底是针对 where 去设计索引，还是针对 order by 设计索引？到底是让 where 去用上索引，还是让 order by 用上索引？

一般这种时候往往都是让 where 条件去使用索引来快速筛选出来一部分指定的数据，接着再进行排序。

因为大多数情况基于索引进行 where 筛选往往可以最快速度筛选出你要的少部分数据，然后做排序的成本可能会小很多。

### **6、基于慢 sql 查询做优化**

可以根据监控后台的一些慢 sql，针对这些慢 sql 查询做特定的索引优化。



## **五. 索引设计实战**

​	以社交场景 APP 来举例，我们一般会去搜索一些好友，这里面就涉及到对用户信息的筛选，就是对用户 user 表搜索了。这个表一般来说数据量会比较大，我们先不考虑分库分表的情况，比如，我们一般会**筛选地区 (省市)，性别，年龄，身高，爱好**之类的，有的 APP 可能用户还有评分，比如用户的**受欢迎程度评分**，我们可能还会根据评分来排序等等。

​	对于后台程序来说除了过滤用户的各种条件，还需要分页之类的处理，可能会生成类似 sql 语句执行：

`select xx from user where xx=xx and xx=xx order by xx limit xx,xx`

​	**对于这种情况如何合理设计索引？**

- 比如用户可能经常会根据省市优先筛选同城的用户，还有根据性别去筛选，那我们是否**应该设计一个联合索引  (province,city,sex)** 了？这些字段好像基数都不大，其实是应该的，因为这些字段查询太频繁了。

- 假设又有用户根据年龄范围去筛选了，比如 `where  province=xx and city=xx and age>=xx and age<=xx`，我们尝试着把 age 字段加入联合索引 (province,city,sex,age)

  > 注意，一般这种范围查找的条件都要放在最后

  联合索引范围之后条件的是不能用索引的，但是对于当前这种情况依然用不到 age 这个索引字段，因为用户没有筛选 sex 字段，那怎么优化了？其实可以这么来优化下 sql 的写法：

  `where  province=xx and city=xx and sex in ('female','male') and age>=xx and age<=xx`



- 对于爱好之类的字段也可以类似 sex 字段处理，所以可以把爱好字段也加入索引 `province,city,sex,hobby,age`

- 假设可能还有一个筛选条件，比如要筛选最近一周登录过的用户，一般大家肯定希望跟活跃用户交友了，这样能尽快收到反馈，对应后台 sql 可能是这样：

  `where  province=xx and city=xx and sex in ('female','male') and age>=xx and age<=xx and latest_login_time>= xx`

  **那我们是否能把 latest_login_time 字段也加入索引了？**比如  (province,city,sex,hobby,age,latest_login_time) ，

  显然是不行的，那怎么来优化这种情况了？

  **其实我们可以试着再设计一个字段 is_login_in_latest_7_days**，用户如果一周内有登录值就为 1，否则为 0，那么我们就可以把索引设计成 (province,city,sex,hobby,is_login_in_latest_7_days,age)  来满足上面那种场景了



一般来说，通过这么一个多字段的索引是能够过滤掉绝大部分数据的，就保留小部分数据下来基于磁盘文件进行 order by 语句的排序，最后基于 limit 进行分页，那么一般性能还是比较高的。

- 不过有时可能用户会这么来查询，就查下受欢迎度较高的女性，比如 `sql：where  sex = 'female'  order by score limit xx,xx`，那么上面那个索引是很难用上的，不能把太多的字段以及太多的值都用 in 语句拼接到 sql 里的，那怎么办？

  其实我们可以再设计一个辅助的联合索引，比如 (sex,score)，这样就能满足查询要求了。



以上就是给大家讲的一些索引设计的思路了，**核心思想就是：尽量利用一两个复杂的多字段联合索引，抗下你 80% 以上的查询，然后用一两个辅助索引尽量抗下剩余的一些非典型查询**，保证这种大数据量表的查询尽可能多的都能充分利用索引，这样就能保证你的查询速度和性能了！


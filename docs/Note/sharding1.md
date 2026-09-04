---
group: 分库分表
title: 数据库分库分表实战
order: 1
---

# 数据库分库分表实战

## 何时需要分库分表

分库分表是**最后的手段**，在考虑之前应先尝试：

1. **SQL 优化**：索引优化、查询改写
2. **读写分离**：主从复制，读走从库
3. **缓存**：Redis 缓存热点数据
4. **ES 搜索**：复杂查询迁移到 Elasticsearch

### 分表 vs 分库的时机

| 场景 | 方案 | 说明 |
|------|------|------|
| 单表超过 500 万行 | 分表 | 单表太大导致查询变慢 |
| 单库 TPS 超过 5000 | 分库 | 单库连接数和 CPU 成为瓶颈 |
| 磁盘空间不足 | 分库 | 数据分散到多个物理节点 |
| 业务隔离需求 | 垂直分库 | 不同业务使用不同数据库 |

> **经验法则**：MySQL 单表建议不超过 500 万行（具体取决于表结构和查询模式）

## 垂直拆分

### 垂直分库：按业务拆分

```
拆分前：一个库包含所有业务表
┌─────────────────────────┐
│       myapp_db          │
│  user / order / product │
│  log / payment / ...    │
└─────────────────────────┘

拆分后：按业务域拆分
┌──────────┐ ┌──────────┐ ┌──────────┐
│ user_db  │ │order_db  │ │product_db│
│ user     │ │ order    │ │ product  │
│ address  │ │ order_item│ │ category │
│ account  │ │ payment  │ │ sku      │
└──────────┘ └──────────┘ └──────────┘
```

### 垂直分表：大字段拆分

将表中不常用查询的大字段拆分到扩展表：

```sql
-- 拆分前：text 字段导致每次查询都加载大量数据
CREATE TABLE article (
    id BIGINT PRIMARY KEY,
    title VARCHAR(200),
    summary VARCHAR(500),
    content TEXT,           -- 大字段，但查询列表时不需要
    created_at DATETIME
);

-- 拆分后
CREATE TABLE article (
    id BIGINT PRIMARY KEY,
    title VARCHAR(200),
    summary VARCHAR(500),
    created_at DATETIME
);

CREATE TABLE article_content (
    article_id BIGINT PRIMARY KEY,
    content TEXT
);
```

## 水平拆分

### 水平分表：同一张表按行拆分

```
order 表（2000万行）
    │
    ├── order_0（1-500万）
    ├── order_1（501-1000万）
    ├── order_2（1001-1500万）
    └── order_3（1501-2000万）
```

### 水平分库：多个数据库实例

```
用户表按 user_id 哈希
    │
    ├── db_0 → user_0, user_1（user_id % 4 ∈ {0}）
    ├── db_1 → user_2, user_3（user_id % 4 ∈ {1}）
    ├── db_2 → user_4, user_5（user_id % 4 ∈ {2}）
    └── db_3 → user_6, user_7（user_id % 4 ∈ {3}）
```

## ShardingSphere-JDBC 实战

ShardingSphere 是 Apache 顶级项目，提供 ShardingSphere-JDBC（轻量级客户端）和 ShardingSphere-Proxy（独立代理）两种接入方式。

### 引入依赖

```xml
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>shardingsphere-jdbc-core</artifactId>
    <version>5.4.1</version>
</dependency>
```

### Spring Boot 配置（YAML）

```yaml
spring:
  shardingsphere:
    datasource:
      names: ds0,ds1
      ds0:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://host1:3306/myapp_0
        username: root
        password: root123
      ds1:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://host2:3306/myapp_1
        username: root
        password: root123

    rules:
      sharding:
        tables:
          # t_order 表的分片规则
          t_order:
            actual-data-nodes: ds$->{0..1}.t_order_$->{0..3}
            database-strategy:
              standard:
                sharding-column: user_id
                sharding-algorithm-name: db-hash
            table-strategy:
              standard:
                sharding-column: order_id
                sharding-algorithm-name: table-hash
            key-generate-strategy:
              column: order_id
              key-generator-name: snowflake

        sharding-algorithms:
          db-hash:
            type: HASH_MOD
            props:
              sharding-count: "2"
          table-hash:
            type: HASH_MOD
            props:
              sharding-count: "4"

        key-generators:
          snowflake:
            type: SNOWFLAKE
```

## 分片策略

### 常用分片算法

| 策略 | 原理 | 优点 | 缺点 |
|------|------|------|------|
| **哈希取模** | `shard = key % N` | 数据分布均匀 | 扩容困难（需数据迁移） |
| **范围分片** | 按 ID 范围划分 | 扩容方便（新范围指向新分片） | 数据可能不均匀 |
| **时间分片** | 按月/天分表 | 历史数据归档方便 | 热点集中在最新分片 |
| **一致性哈希** | 虚拟环 + 虚拟节点 | 扩缩容影响最小 | 实现复杂 |

### 哈希取模的扩容问题

```
扩容前：4 个分片
shard = user_id % 4

扩容后：8 个分片
shard = user_id % 8
→ 75% 的数据需要迁移！
```

**解决方案 - 双倍扩容法：**
- 4 → 8 → 16 → 32，每次翻倍
- 扩容后只迁移一半数据（原来在 shard N 的数据，一半留在 N，一半去 N+原分片数）
- 使用数据迁移工具（如 ShardingSphere 的 Data Pipeline）

## 全局 ID 生成

分库分表后，数据库自增 ID 不再全局唯一，需要分布式 ID 生成方案。

### 雪花算法（Snowflake）

```
0 | 000000000000000000000000000000000000000000 | 0000000000 | 000000000000
  │             41位时间戳（毫秒级）               │  10位机器ID │  12位序列号
  │             可用约 69 年                       │  最多 1024  │  每毫秒 4096
```

```java
public class SnowflakeIdGenerator {
    private final long workerId;      // 机器ID（0-1023）
    private final long datacenterId;  // 数据中心ID
    private long sequence = 0L;       // 序列号
    private long lastTimestamp = -1L; // 上次生成ID的时间戳

    // 位偏移
    private static final long WORKER_ID_BITS = 5L;
    private static final long DATACENTER_ID_BITS = 5L;
    private static final long SEQUENCE_BITS = 12L;
    private static final long TIMESTAMP_LEFT_SHIFT =
        SEQUENCE_BITS + WORKER_ID_BITS + DATACENTER_ID_BITS;

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();

        if (timestamp == lastTimestamp) {
            // 同一毫秒内，序列号递增
            sequence = (sequence + 1) & 0xFFF;
            if (sequence == 0) {
                // 当前毫秒序列号用尽，等待下一毫秒
                timestamp = waitNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = timestamp;

        return ((timestamp - 1288834974657L) << TIMESTAMP_LEFT_SHIFT)
            | (datacenterId << (SEQUENCE_BITS + WORKER_ID_BITS))
            | (workerId << SEQUENCE_BITS)
            | sequence;
    }
}
```

**优点：** 趋势递增、性能高、不依赖数据库
**缺点：** 依赖系统时钟（时钟回拨会导致 ID 冲突）

### 美团 Leaf

Leaf 是美团开源的分布式 ID 生成方案，同时支持号段模式和雪花模式：

- **号段模式**：每次从数据库批量获取一段 ID（如 1000-2000），用完再取。通过双 Buffer 机制预加载，保证高可用
- **雪花模式**：基于 Snowflake 改进，解决了时钟回拨问题

## 跨分片查询

分库分表后最头疼的问题之一。

### 常见问题

```sql
-- 问题 1：没有带分片键的查询
SELECT * FROM t_order WHERE user_name = '张三';
-- 无法确定数据在哪个分片，需要全分片扫描（广播查询）

-- 问题 2：排序和分页
SELECT * FROM t_order ORDER BY create_time LIMIT 10 OFFSET 20;
-- 每个分片都要查到 OFFSET+LIMIT=30 条，然后归并排序，取前 10 条
-- 分片越多，性能越差

-- 问题 3：聚合查询
SELECT COUNT(*), SUM(amount) FROM t_order WHERE status = 1;
-- 需要查询所有分片再合并结果

-- 问题 4：JOIN 查询
SELECT o.*, u.name FROM t_order o JOIN t_user u ON o.user_id = u.id;
-- 如果两张表不在同一个分片/数据库，无法直接 JOIN
```

### 解决方案

| 问题 | 方案 |
|------|------|
| 非分片键查询 | 建立二级索引表（映射表），或用 ES 查询 |
| 排序分页 | 禁止深度分页；使用游标分页（WHERE id > lastId） |
| 聚合统计 | 异步预计算（定时任务汇总）；数据仓库 |
| 跨库 JOIN | 数据冗余（宽表）；应用层组装；CQRS 模式 |

### 基因法：让关联数据落在同一分片

```
用户ID: 12345
订单分片: user_id % 8 = 1

订单ID生成时，嵌入用户ID的分片基因：
order_id = snowflake_id | (user_id % 8)
                     高位  低位（3位 = 分片基因）

这样通过 order_id 也能确定分片，且关联查询在同一分片内完成。
```

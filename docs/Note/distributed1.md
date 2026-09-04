---
group: 分布式专题
title: 分布式系统核心理论
order: 1
---

# 分布式系统核心理论

## CAP 定理

CAP 定理（又称 Brewer 定理）指出，一个分布式系统不可能同时满足以下三个特性：

| 特性 | 含义 |
|------|------|
| **C - Consistency（一致性）** | 所有节点在同一时刻看到相同的数据 |
| **A - Availability（可用性）** | 每个请求都能在合理时间内收到非错误响应 |
| **P - Partition Tolerance（分区容错性）** | 网络分区（节点间通信中断）发生时，系统仍能继续运行 |

**在分布式系统中，P 是必须保证的**（网络分区不可避免），所以实际上只能在 C 和 A 之间做取舍：

- **CP 系统**：保证一致性和分区容错，牺牲可用性。例：Zookeeper、HBase、Redis Cluster
- **AP 系统**：保证可用性和分区容错，牺牲强一致性。例：Cassandra、DynamoDB、Eureka

> 注意：CAP 中的 C 指的是**强一致性**（线性一致性）。选择 AP 的系统通常会提供**最终一致性**。

## BASE 理论

BASE 是对 CAP 中 AP 方案的工程化延伸，是大型互联网系统的实践指导：

| 要素 | 含义 |
|------|------|
| **BA - Basically Available（基本可用）** | 允许损失部分可用性（响应时间变长、降级页面），但不允许系统整体不可用 |
| **S - Soft State（软状态）** | 允许数据在某一时刻是不一致的，存在中间状态 |
| **E - Eventually Consistent（最终一致性）** | 经过一段时间后，数据最终会达到一致状态 |

**实际工程中的权衡：** 大多数互联网系统选择 BASE 而非强一致性，因为：
- 用户体验上，可用性 > 强一致性
- 强一致性的代价是性能下降和可用性降低
- 最终一致性对大多数业务场景已经足够

## 一致性算法概述

### Paxos

Paxos 是最早被证明正确的分布式一致性算法，但理解复杂，工程实现困难。核心角色：

- **Proposer**：提出提案
- **Acceptor**：接受或拒绝提案
- **Learner**：学习已达成一致的提案

两阶段提交：
1. **Prepare 阶段**：Proposer 发送 Prepare 请求，Acceptor 承诺不再接受编号更小的提案
2. **Accept 阶段**：Proposer 发送 Accept 请求，Acceptor 投票决定是否接受

### Raft

Raft 是 Paxos 的等价替代，设计目标是**易于理解和实现**。etcd、Consul 等系统采用 Raft。

核心机制：

```
┌───────────────────────────────────────────────────┐
│                Raft 集群（3节点）                   │
│                                                   │
│  Leader（领导者）                                   │
│    ├─ 处理所有写请求                               │
│    ├─ 心跳维持权威                                 │
│    └─ 日志复制给 Follower                          │
│                                                   │
│  Follower 1 ──── 接收并应用 Leader 的日志          │
│  Follower 2 ──── 接收并应用 Leader 的日志          │
│                                                   │
│  选举机制：                                        │
│    Follower 超时未收到心跳 → 成为 Candidate        │
│    Candidate 发起投票 → 获得多数票 → 成为 Leader   │
└───────────────────────────────────────────────────┘
```

**Raft 三大核心问题：**

1. **Leader 选举**：超时机制 + 随机化防止投票分裂
2. **日志复制**：Leader 将日志复制到多数节点后才提交
3. **安全性**：只有拥有最新日志的节点才能成为 Leader

### Paxos vs Raft

| 对比 | Paxos | Raft |
|------|-------|------|
| 可理解性 | 较难 | 较易 |
| 日志管理 | 允许空洞 | 严格顺序，无空洞 |
| Leader 选举 | 未明确说明 | 明确的选举机制 |
| 工程实现 | 复杂 | 相对简单 |

## 分布式事务

当业务操作跨越多个微服务（多个数据库）时，本地事务无法保证跨服务的数据一致性，需要分布式事务方案。

### 2PC（两阶段提交）

```
    事务协调者（Transaction Manager）
        │
        ├─ 阶段一：Prepare（投票）
        │   ├─ 向参与者 A 发送 Prepare → A 执行本地事务但不提交，返回 OK/NO
        │   ├─ 向参与者 B 发送 Prepare → B 执行本地事务但不提交，返回 OK/NO
        │   └─ 向参与者 C 发送 Prepare → C 执行本地事务但不提交，返回 OK/NO
        │
        ├─ 全部 OK？
        │   ├─ YES → 阶段二：Commit
        │   │   ├─ 通知 A 提交
        │   │   ├─ 通知 B 提交
        │   │   └─ 通知 C 提交
        │   │
        │   └─ NO → 阶段二：Rollback
        │       ├─ 通知 A 回滚
        │       ├─ 通知 B 回滚
        │       └─ 通知 C 回滚
```

**问题：**
- 同步阻塞：所有参与者在 Prepare 后持有锁等待
- 单点故障：协调者宕机导致参与者无限等待
- 数据不一致：Commit 阶段部分节点成功、部分失败

### TCC（Try-Confirm-Cancel）

TCC 是业务层面的两阶段提交，需要开发者自己实现三个接口：

```java
public interface OrderTccService {

    // Try：资源预留和业务检查
    // 冻结库存、预扣余额（但不真正操作）
    void tryCreateOrder(OrderDTO dto);

    // Confirm：真正执行业务（Try 成功后调用）
    // 扣减冻结库存、扣除预扣余额
    void confirmCreateOrder(String orderId);

    // Cancel：释放预留资源（Try 失败后调用）
    // 释放冻结库存、退回预扣余额
    void cancelCreateOrder(String orderId);
}
```

**优缺点：**
- 优点：无全局锁，性能较好；业务粒度控制
- 缺点：侵入性强，每个服务都要实现三个接口；需要处理 Confirm/Cancel 的幂等和重试

### Saga

Saga 将长事务拆分为多个本地事务，每个本地事务都有对应的补偿操作。

```
T1（创建订单）→ T2（扣减库存）→ T3（扣减余额）→ T4（发送通知）
                                                    │
                                            T3 失败？
                                                    │
                                          C2（补偿库存）→ C1（补偿订单）
```

**两种执行方式：**

1. **编排式（Choreography）**：每个事务完成后发布事件，下一个事务监听事件并执行
2. **协调式（Orchestration）**：中央协调器按顺序调用各事务

**对比：**

| 方案 | 编排式 | 协调式 |
|------|--------|--------|
| 耦合度 | 低 | 高（协调器知道所有流程） |
| 可观测性 | 差（难以追踪） | 好（集中控制） |
| 复杂度 | 事件爆炸 | 协调器逻辑复杂 |
| 适用场景 | 简单流程 | 复杂业务流程 |

### 本地消息表

利用本地数据库 + 消息队列实现最终一致性：

```java
@Transactional
public void createOrder(OrderDTO dto) {
    // 1. 创建订单（本地事务）
    orderDao.insert(dto);

    // 2. 在同一事务中写入消息表
    messageDao.insert(new Message(
        "order_created",
        JSON.toJSONString(dto),
        MessageStatus.PENDING  // 待发送
    ));
}

// 定时任务扫描消息表，发送到 MQ
@Scheduled(fixedDelay = 5000)
public void sendMessage() {
    List<Message> messages = messageDao.findByStatus(PENDING);
    for (Message msg : messages) {
        mqProducer.send(msg.getTopic(), msg.getContent());
        messageDao.updateStatus(msg.getId(), MessageStatus.SENT);
    }
}
```

### 方案对比总结

| 方案 | 一致性 | 性能 | 侵入性 | 复杂度 | 适用场景 |
|------|--------|------|--------|--------|----------|
| **2PC** | 强一致 | 低 | 低 | 低 | 传统银行系统 |
| **TCC** | 最终一致 | 高 | 高 | 高 | 金融交易、资金操作 |
| **Saga** | 最终一致 | 高 | 中 | 中 | 长业务流程 |
| **本地消息表** | 最终一致 | 中 | 中 | 低 | 通用异步场景 |
| **最大努力通知** | 最终一致 | 高 | 低 | 低 | 跨系统通知（短信、邮件） |

## Seata 框架

Seata 是阿里巴巴开源的分布式事务框架，支持 AT、TCC、Saga、XA 四种模式。

### AT 模式原理（最常用）

AT 模式基于两阶段提交，但做了优化：**第一阶段直接提交本地事务，第二阶段仅在需要回滚时执行补偿 SQL**。

```
阶段一（执行 + 自动提交）：
  1. 解析 SQL 语义
  2. 查询更新前的数据（beforeImage）
  3. 执行业务 SQL
  4. 查询更新后的数据（afterImage）
  5. 生成 undo_log（回滚日志）
  6. 将业务 SQL 和 undo_log 在同一个本地事务中提交

阶段二-提交：
  异步删除 undo_log（因为本地事务已提交）

阶段二-回滚：
  1. 根据 undo_log 中的 afterImage 校验数据是否被其他事务修改（脏写检查）
  2. 根据 beforeImage 生成反向补偿 SQL
  3. 执行补偿 SQL
  4. 删除 undo_log
```

**优点：**
- 对业务代码无侵入（只需加 `@GlobalTransactional` 注解）
- 一阶段直接提交，不持有全局锁，性能较好

**缺点：**
- 依赖数据库的本地事务支持
- 不支持跨语言
- 不适合高并发热点数据（全局锁竞争）

```java
@GlobalTransactional  // Seata 全局事务注解
public void purchase(String userId, String commodityCode, int count) {
    // 扣减库存（远程调用库存服务）
    storageClient.deduct(commodityCode, count);

    // 扣减余额（远程调用账户服务）
    accountClient.debit(userId, count * 10);

    // 创建订单（本地操作）
    orderDao.insert(new Order(userId, commodityCode, count));
}
```

## 幂等性设计

在分布式系统中，网络重试是常态（超时重试、消息重复消费等），接口必须保证**幂等性**：相同请求执行多次和执行一次的效果相同。

### 常见幂等方案

| 方案 | 实现方式 | 适用场景 |
|------|----------|----------|
| **唯一索引** | 数据库唯一约束防重 | 创建类操作 |
| **Token 机制** | 请求前获取 Token，服务端校验并删除 | 表单防重复提交 |
| **乐观锁** | 版本号/时间戳校验 | 更新类操作 |
| **状态机** | 业务状态流转只允许正向 | 订单状态变更 |
| **去重表** | 请求ID写入去重表，重复请求被拒绝 | MQ 消息消费 |

### Token 机制示例

```java
// 1. 提交前获取 Token
@GetMapping("/token")
public String getToken() {
    String token = UUID.randomUUID().toString();
    redis.set("idempotent:" + token, "1", 300);  // 5分钟过期
    return token;
}

// 2. 提交时携带 Token
@PostMapping("/order")
public Result createOrder(@RequestHeader("Idempotent-Token") String token,
                          @RequestBody OrderDTO dto) {
    // 原子操作：SETNX（设置成功返回 true，说明首次请求）
    Boolean acquired = redis.opsForValue()
        .setIfAbsent("idempotent:" + token, "processed");

    if (Boolean.FALSE.equals(acquired)) {
        // Token 已使用，返回上次结果（而非报错）
        return getPreviousResult(token);
    }

    try {
        // 执行业务逻辑
        return orderService.createOrder(dto);
    } catch (Exception e) {
        // 业务失败，删除 Token 允许重试
        redis.delete("idempotent:" + token);
        throw e;
    }
}
```

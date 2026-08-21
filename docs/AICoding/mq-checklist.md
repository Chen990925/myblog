---
group: RocketMQ 专题
title: RocketMQ 准备点清单
order: 27
---

# RocketMQ 准备点清单（目录 / 索引版）

> 这是**总纲**：每个板块只留核心要点 + 指向详细文件。复习/面试前先看这份，细节翻对应文件。

## 0. 项目 MQ 使用全景（哪里用、做什么）

| 场景 | 实现 | 作用 |
|---|---|---|
| 下单/撤单/批量/条件单请求 | `MessagePublishManage` 全 **asyncSend + SendCallback**（PLACE_ORDER_REQ/CANCEL_ORDER_REQ/BULK_PLACE_ORDER_REQ 等） | tradeservice → 报盘前置，异步削峰解耦 |
| 成交/报价推送 | CFETS_DEAL_PUSH、ORDER_PUSH、CSTP_BANK_DEAL_PUSH 等 PUSH topic | 回报推回客户端 |
| CFETS 报价请求/推送 | `oms-trade-0101~0125` 成对（REQ/PUSH） | 银行间报价链路 |
| 消费端 | 大量 `*MessageListener`：`@RocketMQMessageListener(topic, consumerGroup="default-${rocketmq.tag}", selectorExpression="${rocketmq.tag}")` + `RocketMQListener<T>` | 默认自动 ACK；CFETS 报价/对手方同步/消息提醒 |
| AOP | `RocketMQTagAspect` | 统一处理 tag |
| 链路 | orderservice（指令）→ tradeservice（交易）→ tradegatewayfrontend（报盘前置） | 跨服务 MQ 解耦 |

**Topic 体系**：oms-trade-00xx 成对（REQ 请求 + PUSH 推送）、按业务段编号、Tag 二级过滤。

## 1. MQ 基础与项目用途

- 三大价值：异步（解耦时序）/ 削峰（缓冲流量）/ 解耦（隔离依赖）；代价：丢/重/乱/积四新问题
- 核心概念：Producer/Topic/MessageQueue/Broker/NameServer + Tag/Group
- 选型：交易场景要可靠+顺序+事务 → RocketMQ（非 Kafka）
- 项目落点：前置吞吐低 → MQ 削峰 + 前置挂不影响主服务
- **详见 `MQ1-MQ基础与项目用途.md`**

## 2. 生产端可靠发送（生产端确认 ①）

- 三种发送：同步 syncSend（等确认）/ 异步 asyncSend（回调确认，项目用）/ 单向 sendOneWay（不确认）
- **SendResult 四种状态：只有 SEND_OK 才算可靠**（FLUSH_DISK_TIMEOUT/FLUSH_SLAVE_TIMEOUT/SLAVE_NOT_AVAILABLE 是半成功）
- 发送失败重试默认 2 次；仍失败 → **本地补偿表**（业务事务写消息表 + 定时重发，最终一致）
- **事务消息**：半消息 + 本地事务 + Broker 回查（check）——MQ 原生版补偿方案
- 项目现状：asyncSend onException 只记日志无补偿 → 改进：本地消息表/事务消息
- **详见 `MQ2-生产端可靠发送.md`**

## 3. Broker 存储与持久化（Broker 持久化 ②）

- 存储三件套：**commitlog（顺序写，吞吐根基）+ consumequeue（队列 offset 索引）+ index（key 索引）**
- 刷盘：同步（落盘才返回，可靠）/ 异步（内存即返回，高吞吐）
- 主从复制：同步（主从都成功）/ 异步（主成功即返回）
- 可靠性矩阵：同步刷盘+同步复制 = 最高（金融关键消息）
- 消息不丢全链路：生产重试/补偿 + Broker 同步刷盘复制 + 消费 ACK
- **详见 `MQ3-Broker存储与持久化.md`**

## 4. 消费端手动 ACK 三层兜底（消费 ACK ③，重点）

- 自动 ACK（项目现状）：Spring RocketMQListener<T>，onMessage 正常返回即确认、抛异常自动重投
- **三层兜底**：
  1. ACK 重试：失败重投，间隔递增 1s→2h 共 16 次
  2. 死信队列 DLQ：16 次仍失败进 %DLQ%组名，人工排查
  3. 业务幂等：重试/重投都可能重复执行 → 唯一约束/Redis 去重/状态机（项目成交：Redis 锁+乐观锁双层）
- 顺序消费：同 key 路由同队列（MessageQueueSelector）+ MessageListenerOrderly
- **详见 `MQ4-消费端ACK三层兜底.md`**

## 5. 生产问题排查（排查 ④）

- 定性四类：丢 / 重 / 乱 / 积
- 堆积：consumerProgress lag + jstack 消费线程（慢 SQL/外部依赖/线程不足/坏消息）+ 扩容/优化/DLQ
- 重复消费：幂等兜底让重复无害；msgId 相同=消费重投，不同=生产重发
- 丢失：四段对证据（生产日志→queryMsgById→刷盘配置→消费 offset）
- 乱序：按 key 路由队列 + 顺序消费 + 状态机
- 工具：mqadmin（consumerProgress/queryMsgById/queryMsgByKey）+ 控制台 + lag 告警
- **详见 `MQ5-生产问题排查.md`**

## 6. 学习顺序（推荐）

1. MQ 基础 + 项目用途（异步削峰解耦/topic 体系）
2. 生产端可靠发送（发送确认/重试/本地补偿/事务消息）
3. Broker 存储与持久化（commitlog/刷盘/主从复制）
4. 消费端手动 ACK 三层兜底（重试/DLQ/幂等/顺序）
5. 生产问题排查（堆积/重复/丢失/乱序/延迟）
6. 案例串讲（回报链路堆积——呼应 JVM 案例 6）

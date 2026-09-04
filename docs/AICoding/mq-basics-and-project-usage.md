---
group: RocketMQ 专题
title: MQ 基础与项目用途
order: 28
---

# MQ 1：MQ 基础与项目用途

## 一、为什么用 MQ（三大价值 + 代价）

```
异步（解耦时序）  削峰（缓冲流量）  解耦（隔离依赖）
```

1. 异步：主链路不等耗时的下游操作（发消息即返回）
2. 削峰：突发写入先堆队列，下游按自己吞吐消费（开盘高峰下单暴增）
3. 解耦：生产者不依赖消费者可用性（下游挂了不影响上游生产）

**代价**：链路多一跳 → 消息**丢失/重复/乱序/堆积**四个新问题 → 需要可靠性设计

**项目落点**：交易链路 `orderservice（指令）→ tradeservice（交易）→ tradegatewayfrontend（报盘前置）`，前置吞吐低 → MQ 削峰 + 解耦（前置挂不影响主服务下单）。

## 二、核心概念

```
Producer → Topic → MessageQueue → Consumer
              │
           Broker（存储）
              │
         NameServer（注册中心）
```

- Topic：一类消息的逻辑名（项目 oms-trade-0001 = 现货下单）
- MessageQueue：Topic 下多个队列（并行度 = 队列数；顺序消息要求同 key 同队列）
- Broker：存储节点（commitlog 落盘）
- NameServer：轻量注册中心，无状态无协调，客户端轮询
- Tag：Topic 内二级过滤（项目 selectorExpression="${rocketmq.tag}"）
- Group：消费者组（同组竞争消费、组间广播）

话术："Producer 发消息到 Topic，Topic 下分多个 MessageQueue（并行度来源），Broker 存储，NameServer 路由；Tag 做二级过滤。"

## 三、选型（为什么 RocketMQ）

| 维度 | RocketMQ | Kafka | RabbitMQ |
|---|---|---|---|
| 定位 | 电商/金融交易 | 日志/流处理 | 通用企业级 |
| 可靠性 | 高（同步刷盘/事务消息） | 中 | 高 |
| 顺序消息 | ✅ 队列级 | ✅ 分区级 | ⚠️ |
| 事务消息 | ✅ 半消息机制 | ✅ 2.5+ | ⚠️ |

落点："交易系统选 RocketMQ：金融场景要可靠（同步刷盘+重试+DLQ）、要顺序（同一订单消息有序）、事务消息支持本地事务与消息最终一致。"

## 四、项目 Topic 体系设计（工程观）

```
oms-trade-0001 PLACE_ORDER_REQ      下单请求（REQ）
oms-trade-0002 CANCEL_ORDER_REQ     撤单请求
oms-trade-0003 ORDER_PUSH           下单推送（PUSH 回客户端）
oms-trade-0100 CFETS_DEAL_PUSH      CFETS 成交推送
oms-trade-0101/0102 CFETS_BOND_DLG_REQ/PUSH  CFETS 对话报价请求/推送
```

设计规律：① REQ/PUSH 成对（请求走服务间、推送回客户端）② 按业务段编号（00xx 现货、01xx CFETS）③ Tag 二级过滤（一个 topic 多 tag，消费端按 tag 订阅）。

## 五、项目生产端写法：asyncSend + SendCallback

```java
rocketMQTemplate.asyncSend(MessageTopics.PLACE_ORDER_REQ, message, new SendCallback() {
    public void onSuccess(SendResult sendResult) { log.info("success {}", message); }
    public void onException(Throwable e) { log.error("fail {}", message, e); }  // ⚠️ 只记日志无补偿
});
```

- ✅ asyncSend 不阻塞下单主链路（异步化正确）
- ⚠️ onException 只记日志没有补偿 → 改进：本地补偿表/事务消息（MQ2 详讲）

## 六、面试话术（1 分钟版）

> "项目用 RocketMQ 做交易链路异步解耦：orderservice 指令 → tradeservice 交易 → 报盘前置，前置吞吐低，MQ 削峰 + 隔离（前置挂不影响主服务）。核心概念 Producer/Topic/MessageQueue/Broker/NameServer，Tag 二级过滤。选型：交易场景要可靠+顺序+事务，选 RocketMQ 不是 Kafka。topic 设计 REQ/PUSH 成对 + 业务编号；生产端全 asyncSend + SendCallback——异步不阻塞，但 onException 只记日志没补偿，是待完善点。"

## 七、高频追问

- Topic 和 Tag 区别？→ Topic 一级分类、Tag 二级子类型；Tag 过滤在消费端
- 为什么用 MQ 不用 HTTP？→ 异步+削峰+解耦；HTTP 同步耦合无缓冲；但 MQ 引入可靠性问题
- NameServer 挂了？→ 客户端有路由缓存，已建立的连接继续；新客户端拿不到路由失败；NameServer 无状态可多实例
- 一个 Topic 几个队列？→ 权衡并行度与顺序性/管理成本；交易一般 8~32
- 消费组和广播？→ 同组竞争消费；广播每条消息所有消费者都收

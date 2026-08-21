---
group: RocketMQ 专题
title: 消费端 ACK 三层兜底
order: 31
---

# MQ 4：消费端手动 ACK 三层兜底

## 一、自动 ACK vs 手动 ACK

**本质**：消费者处理完要告诉 Broker 成功（ACK），Broker 才推进 offset；不 ACK/失败 → 重新投递。

```java
// 自动 ACK（Spring 封装，项目现状）：正常返回=成功；抛异常=自动重投
@RocketMQMessageListener(topic = "...", consumerGroup = "default-${rocketmq.tag}")
public class XxxListener implements RocketMQListener<T> {
    public void onMessage(T msg) { /* 业务处理，正常返回即 ACK */ }
}

// 手动 ACK：自己控制消费结果
public class XxxListener implements RocketMQListener<MessageExt> {
    public void onMessage(MessageExt msg) {
        try { /* 业务处理，成功返回 */ }
        catch (Exception e) { throw new RuntimeException(e); }  // = RECONSUME_LATER 重投
    }
}
```

项目落点："消费端用 Spring RocketMQListener<T> 自动 ACK：onMessage 正常返回即确认、抛异常自动重试。注意先处理业务再正常返回，业务失败要抛异常。"

## 二、三层兜底（背熟）

### 第一层：ACK 重试
- 消费失败 → 重投，间隔递增：`1s,5s,10s,30s,1m,2m,3m,4m,5m,6m,7m,8m,9m,10m,20m,30m,1h,2h`（共 16 次，2h 封顶）
- 解决瞬时异常（网络抖动/DB 慢）
- ⚠️ 重投是"重新投递"，消费逻辑必须幂等

### 第二层：死信队列（DLQ）
- 重试 16 次仍失败 → 进 `%DLQ%消费组名`（如 %DLQ%default-oms）
- DLQ 不自动消费 → 人工介入（查日志找根因 → 修复 → 手动重投/补数据）
- 作用：防止坏消息无限重试卡死整个消费组

### 第三层：业务幂等（最根本）
- 必须幂等的原因：① 消费重试重投 ② 生产端重试重发 ③ ACK 丢失重投
- 方案：**DB 唯一约束**（订单号唯一索引）/ **Redis 去重**（setnx）/ **状态机**（前置状态校验——项目 updateStatusForTrigger 乐观锁）
- 项目落点："成交处理用 Redis 锁 + DB 乐观锁双层防御，天然幂等，重复消费不重复处理。"

话术："消费端三层兜底：ACK 重试（1s→2h 递增 16 次）、死信队列（16 次失败进 %DLQ% 人工排查）、业务幂等（唯一约束/Redis 去重/状态机）。我们成交处理 Redis 锁+乐观锁双层幂等。"

## 三、顺序消费

- 问题：默认并发消费，同一订单多条消息可能乱序
- 方案：
  1. 顺序 Topic（MessageListenerOrderly）：同一队列串行消费（牺牲并行度）
  2. **同 key 路由同队列**：`MessageQueueSelector` 按 orderId hash 到固定队列——同一订单进同一队列，其他订单仍并行
- 项目落点："同一订单的指令链（下单→改单→撤单）要有序：发消息按 orderId 选队列+顺序消费；我们目前独立 topic + Redis 锁 + 状态机保证不冲突（权衡）。"

## 四、消费端调优参数

- 消费线程：consumeThreadMin/Max（默认 20/64）——按消费逻辑耗时定
- 批量消费：consumeMessageBatchMaxSize（一次拉 N 条）——吞吐高，但批量内一条失败整批重投（放大重复）
- 消费超时：处理超时触发重投（默认 15 分钟）

## 五、面试话术（1 分钟版）

> "消费端可靠性三层：第一层 ACK 重试——消费失败自动重投（1s 到 2h 递增 16 次）；第二层死信队列——16 次仍失败进 %DLQ% 人工排查；第三层业务幂等——重试/重投都可能重复执行，消费逻辑必须幂等（唯一约束/Redis 去重/状态机）。我们成交处理就是 Redis 锁+乐观锁双层幂等。顺序要求高的消息按 key 路由同队列+顺序消费。"

## 六、高频追问

- 自动 ACK 抛异常和手动 ACK 区别？→ 自动异常转重投；手动自己控制，可部分成功部分失败
- 为什么 16 次后进 DLQ？→ 防坏消息无限循环卡死消费组；DLQ 人工兜底
- 幂等和去重区别？→ 幂等=重复执行结果一致（业务设计）；去重=只执行一次（技术拦截）——都要
- 顺序 vs 并发消费？→ 业务有序性要求高的用顺序（同 key 同队列）；否则并发（吞吐高）
- 消费 lag 怎么看？→ mqadmin consumerProgress / 控制台；lag = 生产 offset - 消费 offset

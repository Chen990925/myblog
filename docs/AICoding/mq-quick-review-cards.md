---
group: RocketMQ 专题
title: RocketMQ 速记卡
order: 33
---

# RocketMQ 速记卡（临场回忆 / 快速准备版）

> 用法：面试前 10 分钟扫一遍；被问到 MQ 话题先定位板块，按"引导句"展开。细节翻对应笔记。

## 1. 项目使用全景（背得出）

**生产端全 asyncSend + SendCallback（下单/撤单/条件单请求）→ 报盘前置；topic 成对 REQ/PUSH（oms-trade-0001 下单、0100 CFETS 成交）；消费端 @RocketMQMessageListener + `RocketMQListener<T>` 自动 ACK**。

## 2. MQ 基础

- 引导句：**"异步、削峰、解耦；代价是丢/重/乱/积"**
- 四件套：Producer/Topic/MessageQueue/Broker + NameServer 路由 + Tag 二级过滤
- 选型：交易场景要可靠+顺序+事务 → RocketMQ（不是 Kafka）
- 链路：orderservice 指令 → tradeservice 交易 → 报盘前置（MQ 削峰解耦）

## 3. 生产端可靠发送（生产确认 ①）

- 三种：同步（等确认）/ 异步（回调，项目用）/ 单向（不确认）
- **SendResult 四状态，只有 SEND_OK 可靠**（FLUSH_DISK_TIMEOUT 等是半成功）
- 失败重试 2 次 → 仍失败：**本地补偿表**（业务事务写消息表 + 定时重发）
- **事务消息**：半消息 + 本地事务 + Broker 回查（check）
- 项目现状：onException 只记日志无补偿（可讲改进）

## 4. Broker 存储（Broker 持久化 ②）

- **commitlog（顺序写，吞吐根基）+ consumequeue（队列 offset 索引）+ index**
- 刷盘：同步（落盘才返回）/ 异步（内存即返回）
- 复制：同步（主从都成功）/ 异步（主成功即返回）
- 最高配置：**同步刷盘 + 同步复制**（金融关键消息）

## 5. 消费端三层兜底（消费 ACK ③，重点）

- 自动 ACK（项目现状）：onMessage 正常返回即确认、抛异常重投
- 三层：
  1. **ACK 重试**：1s→2h 递增 16 次
  2. **死信队列 DLQ**：16 次失败进 %DLQ%，人工排查
  3. **业务幂等**：唯一约束 / Redis 去重 / 状态机（项目成交：Redis 锁+乐观锁）
- 顺序消费：按 key 路由同队列（MessageQueueSelector）+ 顺序消费

## 6. 生产排查（排查 ④）

- 定性四类：**丢 / 重 / 乱 / 积**
- 堆积：consumerProgress lag → jstack 消费线程（慢 SQL/外部依赖/线程不足）
- 重复：幂等兜底；msgId 相同=消费重投、不同=生产重发
- 丢失：四段对证据（生产日志 → queryMsgById → 刷盘配置 → 消费 offset）
- 乱序：key 路由队列 + 顺序消费 + 状态机
- 工具：mqadmin（consumerProgress/queryMsgById）+ 控制台 + lag 告警

## 7. 高频追问口袋（一句答）

- Topic vs Tag？→ 一级分类 vs 二级子类型
- 为什么 MQ 不用 HTTP？→ 异步+削峰+解耦；代价是可靠性问题
- 本地表 vs 事务消息？→ 应用层实现 vs MQ 原生；事务消息靠回查
- 为什么 16 次后进 DLQ？→ 防坏消息卡死消费组
- 重复消费怎么确认来源？→ 看 msgId 是否相同
- 堆积怎么定位？→ lag + jstack 栈底（SQL/Feign/线程）

## 8. 简历一句话

**交易链路 MQ 异步化（REQ/PUSH 成对 topic + Tag 过滤 + asyncSend 不阻塞）；消费端 ACK 重试 + DLQ + 幂等三层兜底；定位回报堆积（慢 SQL 根因）并建立 lag 告警** —— 主打案例：回报链路堆积排查 / 生产端补偿缺失改进。

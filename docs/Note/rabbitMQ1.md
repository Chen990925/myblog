---
group: rabbitMQ
title: RabbitMQ入门
order: 1
---

# RabbitMQ入门

## **MQ相关概念**

### **MQ的基本概念**

MQ全称 Message Queue（消息队列），是在消息的传输过程中保存消息的容器。多用于分布式系统之间进行通信。

### MQ 的优势

- 应用解耦

  **消息队列允许系统中的不同模块之间通过消息进行通信，而不是直接调用彼此的接口**。这样可以降低模块之间的耦合度，`**提高系统的灵活性和可维护性**`

- 异步提速

  **消息队列支持异步通信模式，发送方无需等待接收方的响应即可继续处理其他任务**。这种异步通信方式可以提高系统的响应速度和吞吐量，`**提升用户体验和吞吐量**。`

- 削峰填谷

  **消息队列可以作为缓冲器，暂时存储大量的请求消息，从而平滑处理系统的流量峰值。**这种削峰填谷的能力可以保护系统不受突发流量的影响，`**提高系统的稳定性和可靠性**`

### MQ 的劣势

- 系统可用性降低

  系统引入的外部依赖越多，系统稳定性越差。一旦 MQ 宕机，就会对业务造成影响。需要各种机制保证MQ的高可用

- 系统复杂度提高

  MQ 的加入大大增加了系统的复杂度，以前系统间是同步的远程调用，现在是通过 MQ 进行异步调用。需要保证消息不被丢失等情况

### 常见的 MQ 产品

<img src="../../public/images/image-20240430195708950.png" alt="image-20240430195708950" style="zoom:33%;" />



## RabbitMQ 

基于AMQP，即 Advanced Message Queuing Protocol（高级消息队列协议），是一个网络协议，是应用层协议的一个开放标准，为面向消息的中间件设计。

基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同的开发语言等条件的限制。2006年，AMQP 规范发布。类比HTTP。

<img src="../../public/images/image-20240430195826903.png" alt="image-20240430195826903" style="zoom: 33%;" />

**RabbitMQ 基础架构如下图：**

<img src="../../public/images/image-20240430195859880.png" alt="image-20240430195859880" style="zoom: 50%;" />

### RabbitMQ 中的相关概念

- **Broker：**接收和分发消息的应用，RabbitMQ Server就是 Message Broker

- **Virtual host：**出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似于网络中的 namespace 概念。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出多个vhost，每个用户在自己的 vhost 创建 exchange／queue 等

- Connection：publisher／consumer 和 broker 之间的 TCP 连接

- **Channel：**如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP Connection的开销将是巨大的，效率也较低。

  Channel 是在 connection 内部建立的逻辑连接，如果应用程序支持多线程，通常每个thread创建单独的 channel 进行通讯，AMQP method 包含了channel id 帮助客户端和message broker 识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的 Connection 极大减少了操作系统建立 TCP connection 的开销

- **Exchange：**message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发消息到queue 中去。
- **Queue：**消息最终被送到这里等待 consumer 取走
- **Binding：**exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key。Binding 信息被保存到 exchange 中的查询表中，用于 message 的分发依据



**RabbitMQ 提供了 6 种工作模式：**

- **简单模式**

  一个生产者、一个消费者，不需要设置交换机（使用默认的交换机）

- **work queues**

  一个生产者、多个消费者（竞争关系），不需要设置交换机（使用默认的交换机）

- **Publish/Subscribe 发布与订阅模式**

  需要设置类型为 fanout 的交换机，并且交换机和队列进行绑定，当发送消息到交换机后，交换机会将消息发送到绑定的队列。

- **Routing 路由模式**

  需要设置类型为 direct 的交换机，交换机和队列进行绑定，并且指定 routing key，当发送消息到交换机后，交换机会根据 routing key 将消息发送到对应的队列。

- **Topics 主题模式**

  需要设置类型为 topic 的交换机，交换机和队列进行绑定，并且指定通配符方式的 routing key，当发送消息到交换机后，交换机会根据 routing key 将消息发送到对应的队列。

- RPC 远程调用模式（远程调用，不太算 MQ）。

官网对应模式介绍：https://www.rabbitmq.com/getstarted.html

<img src="../../public/images/image-20240430212911360.png" alt="image-20240430212911360" style="zoom: 67%;" />



### 简单模式

<img src="../../public/images/image-20240501013022820.png" alt="image-20240501013022820" style="zoom:50%;" />

- P：生产者，也就是要发送消息的程序
- C：消费者：消息的接收者，会一直等待消息到来
- queue：消息队列，图中红色部分。类似一个邮箱，可以缓存消息；生产者向其中投递消息，消费者从其中取出消息

只有一个生产者和一个消费者



### Work queues 工作队列模式

<img src="../../public/images/image-20240501013134700.png" alt="image-20240501013134700" style="zoom:50%;" />

- Work Queues：与入门程序的简单模式相比，**多了一个或一些消费端，多个消费端共同消费同一个队列中的消息**。

- 应用场景：**对于任务过重或任务较多情况使用工作队列可以提高任务处理的速度**。

在一个队列中如果有多个消费者，那么消费者之间对于同一个消息的关系是竞争的关系

**Work Queues 对于任务过重或任务较多情况使用工作队列可以提高任务处理的速度。**

> 例如：短信服务部署多个，只需要有一个节点成功发送即可。



### Pub/Sub 订阅模式

<img src="../../public/images/image-20240501013400935.png" alt="image-20240501013400935" style="zoom:50%;" />

在订阅模型中，多了一个 Exchange 角色，而且过程略有变化：

- P：生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发给X（交换机）

- C：消费者，消息的接收者，会一直等待消息到来

- Queue：消息队列，接收消息、缓存消息

- **Exchange：交换机（X）**一方面，**接收生产者发送的消息**。另一方面，**知道如何处理消息**：

  例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型

  Exchange有常见以下3种类型：

  - **Fanout：**广播，将消息交给所有绑定到交换机的队列
  - **Direct：**定向，把消息交给符合指定routing key 的队列
  - **Topic：**通配符，把消息交给符合routing pattern（路由模式） 的队列

  > Exchange（交换机）只负责转发消息，不具备存储消息的能力，因此如果没有任何队列与 Exchange 绑定，或者没有符合路由规则的队列，那么消息会丢失！

**应用场景：**发布订阅模式因为所有消费者获得相同的消息，所以特别适合`数据提供商与应用商`

例如：中国气象局提供“天气预报”送入交换机，网易、新浪、百度、搜狐等门户接入通过队列绑定到该交换机，自动获取气象局推送的气象数据,

**总结：**

1. 交换机需要与队列进行绑定，绑定之后；一个消息可以被多个消费者都收到
2. **发布订阅模式与工作队列模式的区别：**
   - **工作队列模式不用定义交换机**，而发布/订阅模式需要定义交换机
   - **发布/订阅模式的生产方是面向交换机发送消息**，工作队列模式的生产方是面向队列发送消息(底层使用默认交换机)
   - **发布/订阅模式需要设置队列和交换机的绑定**，工作队列模式不需要设置，实际上工作队列模式会将队列绑 定到默认的交换机 



### Routing 路由模式

Routing 模式要求队列在绑定交换机时要指定 routing key，消息会转发到符合 routing key 的队列。

<img src="../../public/images/image-20240501013855419.png" alt="image-20240501013855419" style="zoom:50%;" />

- P：生产者，向 Exchange 发送消息，发送消息时，会指定一个routing key
- X：Exchange（交换机），接收生产者的消息，然后把消息递交给与 routing key 完全匹配的队列
- C1：消费者，其所在队列指定了需要 routing key 为 error 的消息
- C2：消费者，其所在队列指定了需要 routing key 为 info、error、warning 的消息

**模式说明**

- 队列与交换机的绑定，不能是任意绑定了，而是要**指定一个 RoutingKey**（路由key）
- 消息的发送方在向 Exchange 发送消息时，也必须**指定消息的 RoutingKey**
- Exchange 不再把消息交给每一个绑定的队列，**而是根据消息的 Routing Key 进行判断**，只有队列的Routingkey 与消息的 Routing key 完全一致，才会接收到消息



### Topics 通配符模式

Topic 主题模式可以实现 Pub/Sub 发布与订阅模式和 Routing 路由模式的功能，只是 Topic 在配置routing key 的时候可以使用通配符，显得更加灵活。

<img src="../../public/images/image-20240501014125173.png" alt="image-20240501014125173" style="zoom:50%;" />

- Q1：绑定的是 #.orange.# ，因此凡是以 .orange. 开头结尾的 routing key 都会被匹配到
- Q2：绑定的是 #.#.news ，因此凡是以 ..news 格式的 routing key 都会被匹配

**模式说明**

- Topic 类型与 Direct 相比，都是可以根据 RoutingKey 把消息路由到不同的队列。只不过 **Topic 类型Exchange 可以让队列在绑定 Routing key 的时候使用通配符**！
- Routingkey 一般都是有一个或多个单词组成，多个单词之间以”.”分割，例如： item.insert 
- **通配符规则：# 匹配一个或多个词，* 匹配不多不少恰好1个词**，例如：item.# 能够匹配 item.insert.abc 或者 item.insert，item.* 只能匹配 item.insert




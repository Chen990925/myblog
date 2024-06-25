---
group: 面试内容复盘
title: 海康威视 面试复盘
order: 1
---

# 海康威视 面试复盘

## 最熟悉的项目的项目架构

用户层面：前端大屏+小程序+第三方应用接入+城乡超市

网关层面：使用Spring Cloud的Gateway做API请求的路径匹配和跨域处理等

应用层面：

- 使用Nacos进行配置管理和服务注册与发现
- 使用jwt对其他系统访问做授权
- OpenFeign实现服务间调用

数据层面：

- 使用MySQL作为持久化存储
- 使用MyBatis进行数据库操作
- 使用Redis作为缓存层和session存储，加速数据访问



## 项目中遇到的难点



## nacos的发现注册流程

**原理**： 服务注册与发现的原理基于服务的动态注册和查找。Nacos作为服务注册中心，负责管理和维护所有服务的实例信息。每个服务在启动时会向Nacos注册自己，并定期发送心跳来保持其注册状态。其他服务可以通过Nacos获取注册在其上的服务实例信息，实现服务调用。

**服务注册**：

- 在Spring Boot应用启动时，Spring Cloud Nacos Discovery会自动将服务实例信息（如服务名、IP地址、端口等）注册到Nacos。
- 这通过在启动类中添加`@EnableDiscoveryClient`注解来实现。

**服务心跳**：

- 注册成功后，服务实例会定期向Nacos发送心跳包，以表明其仍然在线。
- 如果Nacos在一段时间内没有收到某个服务实例的心跳，会将该实例标记为不可用，并从注册表中删除。

**服务发现**：

- 服务调用方在需要调用某个服务时，会向Nacos请求该服务的实例列表。
- Nacos返回所有可用的服务实例，调用方可以根据负载均衡策略选择一个实例进行调用。

**配置管理原理**： 配置管理的原理基于集中配置和动态刷新。Nacos作为配置中心，负责管理所有服务的配置信息。每个服务启动时，会从Nacos拉取其配置，并在配置发生变化时动态刷新。

1. **配置存储**：
   - 配置文件存储在Nacos中，以Data ID和Group为标识。每个配置文件对应一个服务的配置信息。
2. **配置拉取**：
   - 服务启动时，会从Nacos拉取其对应的配置文件，并应用这些配置。
   - 这通过在Spring Boot项目中配置`spring.cloud.nacos.config`来实现。
3. **配置动态刷新**：
   - 配置发生变化时，Nacos会通知所有相关服务更新配置。
   - Spring Cloud Nacos Config会自动刷新应用中的配置，使得配置变更可以即时生效。



## 服务划分的策略

按**业务功能/技术，非功能性需求/团队组织/数据一致性需求/变更频率**拆分



## QPS/流量提升，怎么应对

前端：热门且不常变动的页面静态化，减少服务器压力

网关：实现限流熔断机制，对高并发请求进行限流。

应用层：拆分多个服务，水平扩展，负载均衡提升处理能力。

数据层：使用缓存，减少数据库访问频率，提前预热缓存

​				分库分表，读写分离

​				使用消息队列做削峰异步

​				设置全链路监控报警机制





## 项目的Sentinel的降级熔断策略是什么

**根据时间动态调整降级熔断策略**

 **流量控制**：设置QPS阈值：高峰期每秒50次，非高峰期200次，流量控制设置为预热模式动态调整

**降级策略**：高峰期当调用时间超过500ms熔断，熔断的窗口时间是5s；非高峰期异常比例达到30%熔断，窗口时间10s



## 应用多节点发布时，定时任务竞争怎么处理的

**使用Quartz作为分布式定时任务调度框架**

使用流程：

1. 添加 Quartz 依赖

2. 初始化 Quartz 数据库，执行自带的脚本

3. 在yml中配置Quartz，数据库配置信息，如数据库、数据表的前缀之类

4. 创建了 QuartzJob 定时任务类，使用 @PersistJobDataAfterExecution 注解持久化任务信息，@DisallowConcurrentExecution 禁止并发执行，避免同一个任务被多次并发执行
5. 配置 Schedule 线程池、配置 Quartz 数据库、创建 Schedule 调度器实例等初始化配置
6. 创建 定时任务启动类定义trigger以便在系统启动时触发所有定时任务



## mysql索引使用的注意点

1. 避免**全表**扫描
2. 避免**!=和null**判断导致索引失效
3. 避免使用**in 和 exsits** ，使用的话**小表驱动大表**
4. 在区分度高的字段加索引，长字符串加索引可以使用它的前缀
5. 联合索引尽量覆盖常用查询条件



## 在项目中你是怎么优化sql的

**发现问题**：通过慢查询日志发现超过阈值的sql和组内测试，用户反馈找到对应sql语句

**分析问题**：查看**执行计划**：使用`EXPLAIN`查看SQL查询的执行计划，分析每个步骤的执行情况和成本。检查确保查询是否使用了索引，索引是否合理，检查SQL语句的写法是否合理，是否可以优化

**解决问题**：根据分析结果，采取相应的优化措施：重构SQL语句，修改索引，或者优化表结构和数据，在代码中对sql进行延迟关联，使用缓存

**验证优化效果**



## mysql提高效率除了索引还能做的优化

- **优化表结构，修改mysql配置参数**

- **分库分表**：将评论数据按一定规则（如用户 ID、内容 ID）分散到多个数据库实例和表中，减少单个数据库的压力。
- **读写分离**：使用主从复制，将写操作发送到主库，读操作发送到从库，提高读写性能。
- **NoSQL 数据库**：对于高并发读写的场景，考虑使用 NoSQL 数据库（如 Redis、MongoDB）。



## mysql主从数据同步的流程

1. 主服务器（Master）将数据变更记录在二进制日志文件中（binlog）。
2. 从服务器（Slave）连接到主服务器，并请求复制指定位置之后的日志内容。
3. 主服务器创建一个 I/O 线程，处理来自从服务器的请求，并将日志内容发送给从服务器。
4. 从服务器创建一个 I/O 线程，接收来自主服务器的日志内容，并将其保存到本地中继日志（relay log）。
5. 从服务器创建一个 SQL 线程，读取中继日志，并执行对应的数据变更操作，将变更应用到自己的数据库中。



## 分库分表实现

**1.分库分表策略**

**1.1 水平拆分（Sharding）**

水平拆分是指将同一个表的数据按照某种规则（如用户ID、订单ID）拆分到多个数据库或表中。

- **分库**：将数据分布到多个数据库中。
- **分表**：将数据分布到同一个数据库中的多个表中。

**1.2 垂直拆分（Vertical Partitioning）**

垂直拆分是指将一个表中的列分拆到多个表中，适用于字段很多且访问频率差异大的情况。

**使用分库分表中间件（如 ShardingSphere**、MyCat）可以简化分库分表的实现



## redis在项目中的使用场景

**1. 缓存**

**缓存热点数据**

- **场景**：缓存频繁访问的数据，减少数据库查询次数，提高系统响应速度。
- **示例**：电商网站的商品详情页、用户信息等。

**2. 分布式锁**

**确保分布式系统中的互斥访问**

- **场景**：在分布式环境下，通过分布式锁来确保同一时间只有一个实例在执行某个关键代码段。
- **示例**：分布式任务调度、库存扣减等。

**3.消息队列**

**实现异步处理和解耦**

- **场景**：使用 Redis 的发布/订阅功能或列表数据结构实现消息队列。
- **示例**：异步任务处理、日志收集等。

**4. 会话管理**

**存储用户会话信息**

- **场景**：在分布式系统中，使用 Redis 存储会话信息，实现集中式管理。
- **示例**：用户登录状态、购物车等。

**5. 限流**

**实现接口限流保护**

- **场景**：通过 Redis 实现简单的计数器限流。
- **示例**：防止接口被频繁调用，保护后端服务。

```java
@Autowired
private RedisTemplate<String, Object> redisTemplate;

public boolean isAllowed(String userId) {
    String key = "rate:limit:" + userId;
    Long count = redisTemplate.opsForValue().increment(key, 1);
    if (count == 1) {
        redisTemplate.expire(key, 1, TimeUnit.MINUTES);  // 设置一分钟的过期时间
    }
    return count <= 10;  // 假设每分钟限流10次
}
```

**6.数据分析**

**实时统计和分析**

- **场景**：**利用 Redis 的数据结构**进行实时统计和分析。
- **示例**：计数器、排行榜、实时分析等。





## 怎么保证数据库和缓存强一致性，不使用延迟双删

通过**canal 中间件**监听binlog日志来更新缓存保证删除缓存一定成功

加锁：（性能太低）：

假设数据库和缓存都有某个热门数据，现在A线程去更新的时候，我先将这个缓存中的热门数据锁住，然后更新数据库，最后删除缓存，释放锁。

这样B线程在请求锁时就会被阻塞



## redis使用的备份策略，为什么不使用AOF？

默认使用的RDB,且对使用没有影响

AOF比较占空间，磁盘空间消耗较大

恢复速度较慢

数据持久化要求也不高



## 缓存击穿，穿透，雪崩的应对策略

**缓存穿透** 

**问题：大量并发查询不存在的 KEY，在缓存和数据库中都不存在，同时给缓存和数据库带来压力**。

 原因：一般而言，缓存穿透有 2 种可能性：

- 业务数据被误删，导致缓存和数据库中都没有数据；

- 恶意进行 ddos 攻击。 

**分析：**为什么会多次透传呢？不存在一直为空，**需要注意让缓存能够区分KEY不存在和查询到一个空值。** 

**解决办法：**

- 缓存空值的 KEY，这样第一次不存在也会被加载会记录，下次拿到有这个略（异步线程 负责维护缓存的数据，定期或根据条件触发更新），这样就不会触发更新

- 布隆过滤：在缓存之前在加一层 BloomFilter ，在查询的时候先去 BloomFilter 去查询 key 是否存在，如果不存在就直接返回，存在再走查缓存 -> 查 DB



**缓存击穿** （热门数据）

**问题：某个 KEY 失效的时候，正好有大量并发请求访问这个KEY。** 

**分析：跟穿透其实很像，属于比较偶然的。**

**解决办法：**

- **KEY 的更新操作添加全局互斥锁**。在缓存失效的时候（判断拿出来的值为空），不是立即去 load db，而是先获取锁，当操作返回成功时，再进行 load db 的操作并回设缓存；否则，就重试整个 get 缓存的方法

- **软过期：也就是逻辑过期**，不使用 redis 提供的过期时间，而是**在存储的数据中也存储过期时间信息**。查询时由业务程序判断是否过期，如果数据即将过期时，将缓存的时效延长。**同时程序可以派遣一个线程去数据库中获取最新的数据**，其他线程这时看到延长了的过期时间，就会继续使用旧数据，等派遣的线程获取最新数据后再更新缓存。



## 消息服务器都宕机怎么保证发出的消息都会被处理

以rocketMQ为例

首先要使用高可用的消息队列集群，提高可用性

**1.如果集群都宕机了，使用rocketMQ的事务消息，**

- 通过半消息可以先对broker状态进行嗅探再决定是否发送消息

- 如果写入半消息后消息服务挂掉，利用rocketMQ的消息回查机制，只要正确实现了`TransactionListener` 接口中的 消息回查方法，等待MQ恢复后就会进行回查保证事务一致性

  > 注意，执行本地事务之前事务状态为待定，等待MQ恢复后就会进行回查

**2.使用rocketMQ的消息重试机制**

**3.本地消息表模式**：将消息持久化，然后再发送。消费者接收到之后对持久化后的消息进行更改



## 使用了rocketMQ的事务消息，怎么能也保证下游事务的一致性

假设有两个服务：

- **A 服务**：负责处理订单，并发送事务消息。
- **B 服务**：负责处理库存扣减，消费事务消息。

现在A服务发送事务消息到Broker，但是B服务扣减库存失败了，怎么进行A服务订单状态的回滚

**当 B 服务扣减库存失败时，B 服务需要通知 A 服务回滚订单状态**

- B消费完消息，如果扣减库存失败则通过服务间调用A服务方法对该订单进行回滚

- 或者TCC模式，在A下订单时就服务间调用B服务进行库存预留



## 消息重复消费，消息丢失的解决

- 每个消息附带一个**唯一标识符（如消息ID或业务ID）**。消费者在处理消息时，先检查这个唯一标识符是否已经处理过，如果处理过则直接忽略，否则进行处理并记录处理结果。

- 如果消息队列支持去重表（如 Kafka 的幂等性生产者），可以利用消息队列的去重功能来确保幂等性
- 数据库来设置唯一约束，比如设置订单为主键。插入失败则说明处理过，和第一条类似



## Kakfa消息从生产者到消费者的全流程



## ES分词器，解析器有没有自己写过



# 科维斯 面试复盘

## 分布式事务的处理

A服务是员工签到情况，B服务是员工的班组签到情况，当二者都更新成功后通过消息队列通知C活体检测服务将该员工加入到之后的检测对象中，A和B存在分布式事务的关系，我该如何设计这个系统？

**AB :Tcc模式**

A服务：

```java
@Service
public class CheckInService {
    //员工服务
    @Autowired
    private EmployeeRepository employeeRepository;
    //班组服务
    @Autowired
    private GroupCheckInService groupCheckInService;

    @Transactional
    public void checkIn(String employeeId) {
        // Try阶段：预留资源
        boolean trySuccess = employeeRepository.tryUpdateCheckInStatus(employeeId);
        if (!trySuccess) {
            throw new RuntimeException("Failed to reserve resources for check-in");
        }
        try {
            // 调用B服务的Try方法
            groupCheckInService.tryUpdateGroupCheckIn(employeeId);
            // Confirm阶段：确认操作
            employeeRepository.confirmUpdateCheckInStatus(employeeId);
            groupCheckInService.confirmUpdateGroupCheckIn(employeeId);
            //发送消息到活体检测服务
            ...
        } catch (Exception e) {
            // Cancel阶段：取消操作
            employeeRepository.cancelUpdateCheckInStatus(employeeId);
            groupCheckInService.cancelUpdateGroupCheckIn(employeeId);
            throw e;
        }
    }
}

```

**B服务实现**

```java
@Service
public class GroupCheckInService {

    @Autowired
    private GroupRepository groupRepository;

    public void tryUpdateGroupCheckIn(String employeeId) {
        // 预留资源或检查资源
        boolean trySuccess = groupRepository.tryUpdateGroupCheckInStatus(employeeId);
        if (!trySuccess) {
            throw new RuntimeException("Failed to reserve resources for group check-in");
        }
    }

    public void confirmUpdateGroupCheckIn(String employeeId) {
        // 确认操作
        groupRepository.confirmUpdateGroupCheckInStatus(employeeId);
    }

    public void cancelUpdateGroupCheckIn(String employeeId) {
        // 取消操作
        groupRepository.cancelUpdateGroupCheckInStatus(employeeId);
    }
}

```

**仓库方法**

在每个服务的仓库中，实现Try、Confirm 和 Cancel方法。

**EmployeeRepository.java**

```java
public interface EmployeeRepository {
    boolean tryUpdateCheckInStatus(String employeeId);
    void confirmUpdateCheckInStatus(String employeeId);
    void cancelUpdateCheckInStatus(String employeeId);
}
```

**GroupRepository.java**

```java
public interface GroupRepository {
    boolean tryUpdateGroupCheckInStatus(String employeeId);
    void confirmUpdateGroupCheckInStatus(String employeeId);
    void cancelUpdateGroupCheckInStatus(String employeeId);
}
```



## 线程池参数实际是怎么设置参数的

系统主要瓶颈就是文件读写、数据库访问、网络请求，为IO密集型,

复杂的数学运算、数据处理、加密解密为CPU密集型

假设我们的场景是excel导入，混合了两种模式。那么：

**核心线程数**：等于CPU核数=4

**最大线程数**：考虑到有大量 I/O 操作，最大线程数设置的16来提高吞吐量

**任务队列**：初始设置5000；没改过

**线程空闲时间**：10s

**拒绝策略**：降低任务丢失的风险，由提交任务的线程来执行任务



## 有没有解决过不是业务方面类的问题

**性能优化**：解决系统性能瓶颈，提高系统的响应速度和吞吐量。

**故障排查**：解决系统出现的异常或错误，确保系统的稳定运行。

**系统升级和维护**：例如，升级依赖库，迁移到新框架，确保系统的安全性和最新特性。

**自动化工具开发**：开发一些自动化脚本或工具，提升开发和运维效率。

**代码重构**：优化代码结构，提升代码的可读性和可维护性。



## AOP的场景和对AOP的理解

AOP（面向切面编程）是一种**编程范式**，它旨在通过分离**横切关注点来**提高模块化。

AOP的核心概念是将**横切关注点与业务逻辑分离**，使用“切面”（Aspect）来集中管理这些关注点，从而简化代码和提高可维护性。

**AOP的使用场景**

1. **日志记录**：
   - 自动记录方法的调用、参数、返回值和执行时间等信息。
   - 避免在每个方法中显式编写日志代码，提高代码整洁度。
2. **安全检查**：
   - 在方法执行前进行权限验证，确保用户有权限执行该操作。
   - 集中管理安全逻辑，避免分散在各个方法中。
3. **事务管理**：
   - 在方法执行前开启事务，执行后提交事务，发生异常时回滚事务。
   - 通过AOP统一管理事务，减少显式事务管理代码。


---
group: HR面试
title: 个人面试题摘录1
order: 1
---


# 个人面试题摘录1

## 1.项目上用过消息队列吗？用过哪些？当初选型基于什么考虑的呢？

面试官心理分析 

● 第一，你知不知道你们系统里为什么要用消息队列这个东西？ 不少候选人，说自己项目里用了 Redis、MQ，但是其实他并不知道自己为什么要用这个东西。其实说白了，就是为了用而用，或者是别人设计的架构，他从头到尾都没思考过。 没有对自己的架构问过为什么的人，一定是平时没有思考的人，面试官对这类候选人印象通常很不好。因为面试官担心你进了团队之后只会木头木脑的干呆活儿，不会自己思考。 

● 第二，你既然用了消息队列这个东西，你知不知道用了有什么好处 & 坏处？ 你要是没考虑过这个，那你盲目弄个 MQ 进系统里，后面出了问题你是不是就自己溜了给公司留坑？你要是没考虑过引入一个技术可能存在的弊端和风险，面试官把这类候选人招进来了，基本可能就是挖坑型选手。就怕你干 1 年挖一堆坑，自己跳槽了，给公司留下无穷后患。 

● 第三，既然你用了 MQ，可能是某一种 MQ，那么你当时做没做过调研？ 你别傻乎乎的自己拍脑袋看个人喜好就瞎用了一个 MQ，比如 Kafka，甚至都从没调研过业界流行的 MQ 到底有哪几种。每一个 MQ 的优点和缺点是什么。每一个 MQ 没有绝对的好坏，但是就是看用在哪个场景可以扬长避短，利用其优势，规避其劣势。 如果是一个不考虑技术选型的候选人招进了团队，leader 交给他一个任务，去设计个什么系统，他在里面用一些技术，可能都没考虑过选型，最后选的技术可能并不一定合适，一样是留坑。 

**为什么使用消息队列** 

其实就是问问你消息队列都**有哪些使用场景**，然后你**项目里具体是什么场景**，说说你在**这个场景里用消息队列是什么**？

面试官问你这个问题，期望的一个回答是说，你们公司有个什么业务场景，这个业务场景有个什么技术挑战，如果不用 MQ 可能会很麻烦，但是你现在用了 MQ 之后带给了你很多的好处。

先说一下消息队列常见的使用场景吧，其实场景有很多，但是比较核心的有 3 个：**解耦、异步、削峰**

## 2.消息队列有什么优缺点 

优点上面已经说了，就是在特殊场景下有其对应的好处，解耦、异步、削峰。

缺点有以下几个：

- 系统可用性降低 

系统引入的外部依赖越多，越容易挂掉。本来你就是 A 系统调用 BCD 三个系统的接口就好了，ABCD 四个系统还好好的，没啥问题，你偏加个 MQ 进来，万一 MQ 挂了咋整？MQ 一挂，整套系统崩溃，你不就完了？如何保证消息队列的高可用？

- 系统复杂度提高 

硬生生加个 MQ 进来，你怎么保证消息没有重复消费？怎么处理消息丢失的情况？怎么保证消息传递的顺序性？头大头大，问题一大堆，痛苦不已。

- 一致性问题 

A 系统处理完了直接返回成功了，人都以为你这个请求就成功了；但是问题是，要是 BCD 三个系统那里，BD 两个系统写库成功了，结果 C 系统写库失败了，咋整？你这数据就不一致了。

所以消息队列实际是一种非常复杂的架构，你引入它有很多好处，但是也得针对它带来的坏处做各种额外的技术方案和架构来规避掉，做好之后，你会发现，妈呀，系统复杂度提升了一个数量级，也许是复杂了 10 倍。但是关键时刻，用，还是得用的







## 3.CompletableFuture和 Java Stream API `简历内容`

这段代码使用 `CompletableFuture` 和 Java Stream API 对一个列表 `list` 进行并行处理。具体来说，它分批处理列表中的元素，将处理结果汇总成一个新的列表，并行操作由一个自定义的 `executorService` 执行。以下是对这段代码的详细解释：

### 代码分解

1. **CompletableFuture.supplyAsync**

   ```java
   return CompletableFuture.supplyAsync(
   ```

   该方法异步执行传递的 `Supplier`，并返回一个 `CompletableFuture` 对象，使用 `executorService` 线程池执行任务。

2. **IntStream.range(0, list.size()).boxed()**

   ```
   () -> IntStream.range(0, list.size()).boxed()
   ```

   创建一个从 0 到 `list.size()` 的整数流，并将其装箱为 `Integer` 对象。

3. **分组**

   ```
   .collect(Collectors.groupingBy(i -> i / pageSize
                   , Collectors.mapping(list::get
                           , Collectors.mapping(t2ttFun, Collectors.toList())
                   )
           )
   ```

   将整数流按 `pageSize` 分组，每 `pageSize` 个元素为一组。对于每个元素，首先使用 `list::get` 获取列表中的元素，再使用 `t2ttFun` 转换元素，并收集到一个新的列表中。

4. **处理分组后的结果**

   ```java
   .values().stream()
   .map(v -> CompletableFuture.supplyAsync(() -> tt2rFun.apply(v), executorService))
   ```

   对每个分组结果（一个列表）进行处理，将每个分组提交给 `CompletableFuture`，异步执行 `tt2rFun` 函数，将分组结果转换为另一种类型。

5. **收集并合并结果**

   ```java
   .collect(Collectors.collectingAndThen(
           //收集CompletableFuture
           Collectors.toList()
           , fList -> fList.stream().map(CompletableFuture::join).flatMap(List::stream).collect(Collectors.toList())
   ))
   ```

   将 `CompletableFuture` 对象收集到列表中，并等待所有异步任务完成。使用 `join` 方法获取每个 `CompletableFuture` 的结果，并将这些结果合并成一个列表。

6. **传递自定义的 `executorService`**

   ```java
   , executorService);
   ```

   指定 `executorService` 线程池执行异步任务。

### 解释流程

1. **数据分割和转换**：
   - 将列表 `list` 的索引按 `pageSize` 分组。
   - 对每组索引，通过 `list::get` 获取对应的元素，并使用 `t2ttFun` 进行转换，生成新的列表。
2. **并行处理**：
   - 对每个分组后的列表，使用 `tt2rFun` 进行处理，返回 `CompletableFuture`。
   - 这些异步任务由 `executorService` 线程池执行。
3. **结果合并**：
   - 收集所有 `CompletableFuture`，等待它们完成。
   - 获取每个 `CompletableFuture` 的结果，合并所有结果，最终得到一个完整的列表。

### 示例代码

```java
List<ResultType> result = CompletableFuture.supplyAsync(
    () -> IntStream.range(0, list.size()).boxed()
        .collect(Collectors.groupingBy(i -> i / pageSize, 
                Collectors.mapping(list::get, 
                    Collectors.mapping(t2ttFun, Collectors.toList())
                )
            )
        ).values().stream()
        .map(v -> CompletableFuture.supplyAsync(() -> tt2rFun.apply(v), executorService))
        .collect(Collectors.collectingAndThen(
            Collectors.toList(), 
            fList -> fList.stream().map(CompletableFuture::join).flatMap(List::stream).collect(Collectors.toList())
        ))
    , executorService).join();
```

在这个示例中：

- `list`：要处理的输入列表。
- `pageSize`：每批处理的大小。
- `t2ttFun`：将 `list` 中的元素转换为中间类型的函数。
- `tt2rFun`：处理分组后的中间类型列表的函数。
- `executorService`：执行异步任务的线程池。
- `ResultType`：最终处理结果的类型。

此代码设计目的是高效地并行处理大量数据，利用多核CPU并行处理能力来提升性能。



## 4.如果一个表里有索引A,有联合索引B和C,如果一个查询同时使用了ABC三个字段，mysql会怎么使用索引？

在 MySQL 中，当一个查询使用多个字段作为条件时，MySQL 优化器会选择最有效的索引来执行查询。如何使用索引取决于查询的具体条件和索引的定义方式。我们来看一下 MySQL 如何使用索引的规则以及在你提到的情形下的可能行为。

### 索引类型和查询条件

假设表 `table` 有以下索引：

1. 单列索引 `A`。
2. 联合索引 `(B, C)`。

### 查询条件

假设查询条件是：

```sql
SELECT * FROM table WHERE A = ? AND B = ? AND C = ?;
```

### MySQL 使用索引的规则

1. **单列索引**：如果查询条件只使用了一个列，MySQL 会使用相应的单列索引。

2. 联合索引

   ：联合索引可以加速对联合字段的查询，但联合索引的使用遵循"最左前缀"的原则。即联合索引 

   ```
   (B, C)
   ```

    可以用于以下情况：

   - 只使用 `B` 作为查询条件。
   - 使用 `B` 和 `C` 作为查询条件。

### 查询优化器的选择

对于查询 `SELECT * FROM table WHERE A = ? AND B = ? AND C = ?;`，MySQL 优化器会根据索引的选择规则来选择最优的索引方案。具体而言：

1. **使用联合索引 `(B, C)`**：
   - 如果 `B` 和 `C` 是选择性较高的字段，联合索引 `(B, C)` 可能会被选择用于过滤记录。虽然查询条件包含 `A`，但如果 `(B, C)` 索引的过滤效果更好，MySQL 优化器可能会优先选择它。
   - 在这种情况下，查询条件 `A = ?` 可能会在索引过滤之后进行进一步的行过滤。
2. **使用单列索引 `A`**：
   - 如果 `A` 是选择性非常高的字段（即 `A` 的值可以显著减少候选记录的数量），MySQL 可能会选择先使用 `A` 索引来过滤记录，然后再通过 `B` 和 `C` 条件进一步过滤。
   - 但是，单列索引 `A` 只能用于查询 `A` 的条件，不会加速 `B` 和 `C` 的条件过滤。

### MySQL 可能的执行计划

要查看 MySQL 实际选择的索引和执行计划，可以使用 `EXPLAIN` 语句：

```sql
EXPLAIN SELECT * FROM table WHERE A = ? AND B = ? AND C = ?;
```

`EXPLAIN` 语句会输出查询的执行计划，其中包含 MySQL 选择的索引信息。

### 综合考虑

- **联合索引 `(B, C)`** 会在 `B` 和 `C` 都被使用时提供良好的性能，尤其是在 `B` 和 `C` 组合具有高选择性时。
- **单列索引 `A`** 在 `A` 具有高选择性时会被选择，但对于联合查询条件的性能提升有限。

### 最佳实践

1. **使用 `EXPLAIN` 检查执行计划**：通过 `EXPLAIN` 语句了解查询的执行计划，确定优化器选择的索引。
2. **优化索引设计**：根据查询的实际使用情况，可能需要重新设计索引。例如，可以创建一个联合索引 `(A, B, C)` 来覆盖所有查询条件。
3. **测试和调整**：实际查询性能依赖于数据分布和查询条件。通过实际测试和性能分析来调整索引策略。

### 结论

对于 `SELECT * FROM table WHERE A = ? AND B = ? AND C = ?;` 查询，MySQL 会根据索引的选择规则和数据的选择性，可能会选择联合索引 `(B, C)` 或单列索引 `A`。使用 `EXPLAIN` 语句可以帮助确认 MySQL 优化器的实际选择，并根据查询性能调整索引策略。



## 5. springboot从项目启动到完成的流程和细节

### 1. 启动类

Spring Boot 项目的入口通常是一个包含 `main` 方法的启动类，通常标注了 `@SpringBootApplication` 注解，例如：

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 2. `SpringApplication` 类

当执行 `SpringApplication.run` 方法时，以下步骤依次发生：

#### 2.1 加载 SpringApplication

- 创建一个 `SpringApplication` 实例。
- 推断当前应用类型（如是 `REACTIVE`、`SERVLET` 或 `NONE`）。
- 初始化 `ApplicationContextInitializer`。
- 设置 `Banner`，用于启动时打印的 Spring Boot 标识。

#### 2.2 配置启动上下文

- 准备运行环境，加载 `ApplicationContext`。
- 设置启动监听器，处理生命周期事件。
- 推断并设置主类，通常是包含 `main` 方法的类。

### 3. 环境准备

Spring Boot 环境配置过程包括以下步骤：

#### 3.1 加载属性源

- 从各种属性源加载配置文件，如 `application.properties`、`application.yml`、环境变量、命令行参数等。
- 设置默认的属性源。

#### 3.2 准备上下文环境

- 创建并配置 `Environment` 对象，包括 `StandardServletEnvironment` 或 `StandardReactiveEnvironment`。
- 触发 `Environment` 事件，允许监听器对环境进行自定义。

### 4. 创建并刷新 ApplicationContext

#### 4.1 创建 ApplicationContext

- 根据应用类型（Servlet、Reactive 等）创建相应的 `ApplicationContext`，如 `AnnotationConfigServletWebServerApplicationContext` 或 `AnnotationConfigReactiveWebServerApplicationContext`。

#### 4.2 注册 Bean

- 扫描并注册 Spring Beans，处理 `@ComponentScan`、`@Import` 等注解。
- 注册配置类，处理 `@Configuration` 注解。

#### 4.3 初始化 BeanFactory

- 注册 Bean 工厂后处理器，如 `BeanFactoryPostProcessor`。
- 处理 `@Bean` 方法，实例化并初始化单例 Bean。

#### 4.4 加载自动配置

- 通过 `spring.factories` 文件加载自动配置类，处理 `@EnableAutoConfiguration` 注解。
- 根据条件注解（如 `@ConditionalOnClass`、`@ConditionalOnMissingBean`）决定是否加载某些配置。

### 5. 启动内嵌服务器

#### 5.1 创建内嵌服务器

- 根据应用类型创建内嵌的 Web 服务器（如 Tomcat、Jetty）。
- 配置服务器属性，如端口、上下文路径等。

#### 5.2 启动服务器

- 调用 `WebServer` 的 `start` 方法启动服务器。
- 将 `DispatcherServlet` 注册到服务器中，并配置其属性。

### 6. 完成启动

#### 6.1 触发事件

- 触发 `ApplicationStartedEvent` 和 `ApplicationReadyEvent` 事件，通知所有监听器。
- 此时应用已经完全启动，准备处理请求。

#### 6.2 启动完成

- `SpringApplication.run` 方法返回 `ApplicationContext` 实例，表示启动完成。





## ThreadLocal

它是解决并发编程中遇到问题的途径，他为使用该变量的线程独立提供一个变量副本，各个线程可以独立修改自己的副本而不会相互影响，避免了多个线程对临界资源争夺而产生的死锁等问题

核心原理是提供一个独立的变量副本，实现各个线程之间的数据隔离。通过在每个线程内部维护一个名为ThreadLocalMap映射来实现的，key为ThreadLocal对象，value为变量副本。为了避免内存泄漏，这个map使用的是弱引用为键，这样在GC时就会被回收。但是如果是使用线程池的情况，Thread对ThreadLoaclMap的强引用一直存在，如果不对Map中的弱引用手动remove，可能会导致内存泄漏。



## mysql的redo,undo和binlog作用

1. **Redo Log (重做日志): `宕机恢复`**
   - **作用**：保证事务的持久性（Durability），即使在数据库崩溃的情况下，也能保证已提交的事务不会丢失。
   - **工作原理**：Redo log记录了每个事务对数据库进行的修改操作，例如更新、插入和删除操作。它确保在数据库重启后，可以重新执行这些操作来恢复数据库到事务提交后的状态。
2. **Undo Log (撤销日志): `MVCC`**
   - **作用**：用于事务的回滚操作和MVCC（多版本并发控制）的实现。
   - **工作原理**：Undo log记录了事务对数据库所做的每个修改操作的逆操作，即它包含了事务执行前的数据版本。这样，在事务回滚时，可以利用Undo log中的信息将数据库恢复到事务开始前的状态。
3. **Binlog (二进制日志): `主从复制`**
   - **作用**：用于复制、恢复和数据备份。
   - **工作原理**：Binlog记录了所有对数据库进行的修改操作，包括数据修改语句（如INSERT、UPDATE、DELETE）以及数据定义语句（如CREATE、ALTER、DROP）。这些记录可以被用于数据库的主从复制，即将数据从一个MySQL服务器复制到另一个MySQL服务器，以及用于数据恢复和备份操作。

综上所述，redo log保证事务的持久性，undo log支持事务的回滚和MVCC，而binlog用于数据库复制、恢复和备份。这些日志文件是MySQL数据库中非常重要的组成部分，确保了数据库的可靠性、一致性和恢复能力。



## 一条sql语句的执行流程

#### 1. 客户端/服务器通信

客户端通过连接 MySQL 服务器（通常是 TCP/IP 或 Unix 套接字连接），发送 SQL 请求。服务器会处理这个连接，并将请求传递到 SQL 解析器。

#### 2. SQL 解析器

- **解析**：解析器将 SQL 语句分解成标记（tokens），并将其转换成解析树。

  ```sql
  SELECT * FROM users WHERE id = 1;
  ```

  解析器会检查 SQL 语句的语法是否正确。如果有语法错误，则会返回错误消息。

- **预处理**：预处理器会进一步检查解析树的语义，包括：

  - 表和列是否存在。
  - 用户是否有权限执行该操作。
  - 解析别名和函数。

#### 3. 优化器

优化器的任务是生成最优的执行计划。优化器会考虑以下因素：

- **索引选择**：选择合适的索引来加速查询。
- **表连接顺序**：选择最优的表连接顺序。
- **操作转换**：将某些操作转换成更高效的等价操作。

优化器会生成多种可能的执行计划，并选择成本最低的计划。

#### 4. 执行引擎

执行引擎会按照优化器生成的执行计划执行操作：

- **扫描表**：读取表中的数据行。
- **应用索引**：使用索引加速数据检索。
- **连接表**：根据连接条件将表的数据合并。
- **聚合和排序**：根据查询的需求进行聚合和排序。

执行引擎会与存储引擎交互，将具体的存储操作委托给存储引擎。存储引擎负责管理数据的物理存储和检索。





## 项目底层架构

我们项目采用了基于微服务的架构，使用Spring Boot和Spring Cloud来构建和管理微服务。

前端使用了React，后端使用Spring Boot和Mybatis与MySQL进行数据交互。为了提升性能和处理高并发，我们使用了Redis作为缓存数据库，RabbitMQ作为消息队列进行异步处理。Spring Cloud Gateway用作API网关，SLF4J和LogBACK进行日志收集和系统监控。我们使用Jenkins进行持续集成，代码托管在GitLab。项目管理和团队协作使用DIngding，确保高效的开发流程和团队沟通。







## 用户文件上传经常卡死怎么排查解决问题

### 1. 网络问题排查

#### 1.1 检查网络带宽

- 确保服务器所在的网络带宽足够支持高并发的文件上传请求。
- 使用网络监控工具（如Wireshark）监控上传过程中的网络流量，查看是否存在网络拥堵或带宽限制。

#### 1.2 优化客户端上传策略

- 使用分片上传（chunked upload）技术，将大文件分成小块上传，可以减少上传失败的几率。
- 使用断点续传技术，确保上传过程中断后可以继续上传。

### 2. 服务器性能排查

#### 2.1 服务器资源监控

- 使用监控工具（如Prometheus + Grafana）监控服务器的CPU、内存、磁盘IO、网络IO等资源使用情况。
- 检查服务器是否存在资源瓶颈，如CPU或内存不足，磁盘IO性能差等。

#### 2.2 负载均衡

- 使用负载均衡器（如Nginx、HAProxy）将上传请求分散到多台服务器，减轻单台服务器的压力。
- 确保负载均衡器配置正确，能够高效分发请求。

### 3. 应用层优化

#### 3.1 文件上传处理

- 确保文件上传处理的代码逻辑高效，不存在性能瓶颈。使用异步处理方式，避免长时间的同步阻塞。
- 使用多线程或多进程方式处理文件上传，提升并发处理能力。

#### 3.2 文件存储优化

- 如果使用文件系统存储上传文件，确保文件系统性能高效，支持高并发读写操作。
- 如果使用云存储服务（如Amazon S3），确保配置和网络连接正常，使用官方SDK进行上传操作。

### 4. 数据库性能优化

- 如果上传文件时需要写入数据库记录，确保数据库性能高效，索引配置合理，查询和插入操作性能高。
- 使用数据库连接池，确保高并发情况下数据库连接充足，不会出现连接耗尽的问题。

### 6. 实时监控和日志记录

- 配置详细的日志记录，记录每次文件上传的请求、处理时间和结果，便于排查问题。
- 使用监控工具实时监控文件上传服务的性能指标，及时发现和解决问题。

### 7. 用户体验优化

- 在前端显示上传进度条，告知用户上传进度，提升用户体验。
- 设置合理的上传文件大小限制和超时时间，避免长时间上传造成的卡死问题。



## Spring 两大特性 (IOC 和 AOP)，循环依赖怎么解决，AOP 实现原理，Spring 使用的哪种动态代理，CGLib 具体实现方式 

### Spring 两大特性：IOC 和 AOP

#### IOC（Inversion of Control，控制反转）

- **IOC 容器**：在 Spring 中，IOC 容器负责管理对象的生命周期及其依赖关系。通过配置文件或注解，开发者可以声明对象及其依赖关系，然后由 IOC 容器来自动注入依赖对象。
- **依赖注入**：IOC 的核心是依赖注入（Dependency Injection，DI），它将对象的创建和依赖关系的管理交给容器。在构造对象时，容器会自动注入它所依赖的其他对象，常见的注入方式包括构造函数注入、Setter 方法注入和字段注入。

#### AOP（Aspect-Oriented Programming，面向切面编程）

- **AOP 基本概念**：AOP 允许将横切关注点（如日志记录、事务管理等）从业务逻辑中分离出来。AOP 的核心概念包括切面（Aspect）、连接点（Join Point）、切入点（Pointcut）、通知（Advice）和织入（Weaving）。
- **AOP 应用**：通过 AOP，可以在不修改业务代码的情况下，添加如日志、性能监控、安全检查等功能，增强了代码的可维护性和可重用性。

### 循环依赖的解决

循环依赖是指两个或多个 Bean 互相依赖，导致依赖注入时出现死循环。Spring 容器通过以下方式解决循环依赖：

1. **构造器循环依赖**：构造器循环依赖无法解决，因为在实例化 Bean 时会无限循环。

2. Setter 方法或字段注入的循环依赖

   ：Spring 容器通过三级缓存解决。

   - **一级缓存**（singletonObjects）：存放完全初始化好的单例 Bean。
   - **二级缓存**（earlySingletonObjects）：存放早期曝光的 Bean，解决 Bean 之间的循环依赖。
   - **三级缓存**（singletonFactories）：存放 ObjectFactory，用于解决循环依赖时创建代理对象。

当 A Bean 依赖 B Bean，B Bean 依赖 A Bean 时，Spring 会在创建 A Bean 时，通过三级缓存提前暴露 A 的 ObjectFactory，允许 B 在创建时注入 A 的引用，避免循环依赖问题。

### AOP 实现原理

Spring AOP 主要通过动态代理实现，可以分为以下两种方式：

1. **JDK 动态代理**：基于接口的代理。如果目标对象实现了接口，Spring AOP 会使用 JDK 动态代理创建代理对象。
   - 通过 `java.lang.reflect.Proxy` 类和 `InvocationHandler` 接口实现。
   - 代理对象实现了目标对象的接口，调用方法时通过 `InvocationHandler` 进行拦截处理。
2. **CGLib 动态代理**：基于继承的代理。如果目标对象没有实现接口，Spring AOP 会使用 CGLib 创建代理对象。
   - CGLib 使用字节码增强技术生成目标类的子类。
   - 代理对象是目标对象的子类，方法调用时通过方法拦截器进行拦截处理。

### Spring 使用的动态代理

- Spring 会根据目标对象是否实现接口，选择合适的动态代理方式。
  - 如果目标对象实现了接口，默认使用 JDK 动态代理。
  - 如果目标对象没有实现接口，默认使用 CGLib 动态代理。

### CGLib 具体实现方式

CGLib（Code Generation Library）是一个强大的高性能代码生成库，Spring 使用 CGLib 实现动态代理的主要步骤如下：

1. **创建 Enhancer**：CGLib 的核心类 `Enhancer` 用于生成代理对象。
2. **设置父类**：通过 `setSuperclass` 方法指定目标类（代理对象的父类）。
3. **设置回调**：通过 `setCallback` 方法指定回调方法（MethodInterceptor），用于拦截方法调用。
4. **生成代理对象**：通过 `create` 方法生成代理对象。

以下是一个简单的 CGLib 动态代理示例：

```java
import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

public class CglibProxyExample {
    public static void main(String[] args) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(TargetClass.class);
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
                System.out.println("Before method: " + method.getName());
                Object result = proxy.invokeSuper(obj, args);
                System.out.println("After method: " + method.getName());
                return result;
            }
        });

        TargetClass proxy = (TargetClass) enhancer.create();
        proxy.targetMethod();
    }
}

class TargetClass {
    public void targetMethod() {
        System.out.println("Executing target method.");
    }
}
```

在这个示例中，`TargetClass` 是目标类，`Enhancer` 用于生成 `TargetClass` 的代理对象，`MethodInterceptor` 拦截方法调用并添加额外的逻辑。





## 实现多线程

### 1. 继承 `Thread` 类

通过继承 `Thread` 类，并重写其 `run` 方法来实现多线程。

```java
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
        }
    }

    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start();
        t2.start();
    }
}
```

### 2. 实现 `Runnable` 接口

通过实现 `Runnable` 接口，并将其实例传递给 `Thread` 对象来实现多线程。

```java
class MyRunnable implements Runnable {
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
        }
    }

    public static void main(String[] args) {
        Thread t1 = new Thread(new MyRunnable());
        Thread t2 = new Thread(new MyRunnable());
        t1.start();
        t2.start();
    }
}
```

### 3. 实现 `Callable` 接口并使用 `FutureTask`

`Callable` 接口类似于 `Runnable`，但可以返回一个结果，并且可以抛出异常。通过 `FutureTask` 类可以包装 `Callable` 对象，然后传递给 `Thread` 对象。

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

class MyCallable implements Callable<Integer> {
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += i;
        }
        return sum;
    }

    public static void main(String[] args) {
        MyCallable callable = new MyCallable();
        FutureTask<Integer> futureTask = new FutureTask<>(callable);
        Thread t1 = new Thread(futureTask);
        t1.start();

        try {
            System.out.println("Sum: " + futureTask.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

### 4. 使用线程池

通过 `ExecutorService` 提供的线程池来管理和执行线程。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class MyRunnable implements Runnable {
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
        }
    }

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        executorService.submit(new MyRunnable());
        executorService.submit(new MyRunnable());
        executorService.shutdown();
    }
}
```

### 5. 使用 `ForkJoinPool`

适用于需要分治法的任务，如大规模的并行计算。通过继承 `RecursiveTask` 或 `RecursiveAction` 实现。

```java
import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;

class MyRecursiveTask extends RecursiveTask<Integer> {
    private final int threshold = 10;
    private int[] array;
    private int start, end;

    MyRecursiveTask(int[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Integer compute() {
        if (end - start < threshold) {
            int sum = 0;
            for (int i = start; i < end; i++) {
                sum += array[i];
            }
            return sum;
        } else {
            int mid = (start + end) / 2;
            MyRecursiveTask leftTask = new MyRecursiveTask(array, start, mid);
            MyRecursiveTask rightTask = new MyRecursiveTask(array, mid, end);
            leftTask.fork();
            return rightTask.compute() + leftTask.join();
        }
    }

    public static void main(String[] args) {
        int[] array = new int[100];
        for (int i = 0; i < array.length; i++) {
            array[i] = i;
        }
        ForkJoinPool forkJoinPool = new ForkJoinPool();
        MyRecursiveTask task = new MyRecursiveTask(array, 0, array.length);
        int result = forkJoinPool.invoke(task);
        System.out.println("Sum: " + result);
    }
}
```

### 6. 使用 `CompletableFuture`

`CompletableFuture` 提供了强大的异步编程能力。

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) {
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
            int sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += i;
            }
            return sum;
        });

        try {
            System.out.println("Sum: " + future.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

以上是 Java 中实现多线程的主要方式。每种方式都有其适用场景和优缺点，选择合适的方式可以提高程序的性能和可维护性。




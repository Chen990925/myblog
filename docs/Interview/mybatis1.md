---
group: mybatis面试题
title: mybatis面试题1
order: 1
---

# mybatis面试题

## 1.Mybatis 都有哪些 Executor 执行器？它们之间的区别是什么？

> **Statement**是一种执行静态SQL语句的接口。它是与特定数据库的连接相关联的对象，用于向数据库发送SQL语句并执行相应的查询、更新或删除操作

MyBatis 中的 Executor（执行器）是用于执行 SQL 语句并返回结果的组件。MyBatis 提供了三种不同类型的 Executor，它们之间的区别主要体现在 SQL 语句的执行方式和结果的处理方式上：

1. **SimpleExecutor**（简单执行器）：
   - SimpleExecutor 是 MyBatis 默认的执行器。
   - 每执行一次 update 或 query 操作，就会开启一个新的 Statement 对象，执行完毕后立即关闭 Statement。
   - 不会对 Statement 对象进行复用，每次执行 SQL 都会创建新的 Statement。
   - 适用于简单的小型应用，或者对性能要求不高的场景。
2. **ReuseExecutor**（可重用执行器）：
   - ReuseExecutor 在执行 SQL 语句时会重用 Statement 对象，即当多次执行相同 SQL 语句时，会复用之前已经创建的 Statement 对象。
   - 对于相同的 SQL 语句，只会创建一个 Statement 对象，并缓存起来供后续重复使用。
   - 适用于执行频率较高、相同 SQL 语句的场景，可以减少 Statement 对象的创建和销毁开销，提高性能。
3. **BatchExecutor**（批处理执行器）：
   - BatchExecutor 用于执行批处理 SQL 操作，即一次性执行多个 SQL 语句，通常用于批量插入、更新或删除数据。
   - 在 BatchExecutor 中，会将多个 SQL 语句收集起来，一次性提交到数据库执行，然后返回执行结果。
   - 适用于需要批量处理大量数据的场景，可以减少与数据库的交互次数，提高数据处理的效率。



## 2.ORM 是什么？

ORM（Object-Relational Mapping，**对象关系映射**）是一种**编程技术**，用于在**面向对象编程语言**和**关系型数据库**之间建立映射关系，从而将数据库中的数据映射为面向对象编程语言中的对象，使得开发者可以通过**面向对象的方式来操作数据库，而不必关心底层数据库的细节**



## 3.为什么说 Mybatis 是半自动 ORM 映射工具？它与全自动的区别在哪里？

MyBatis 被称为半自动 ORM 映射工具，主要是因为它在进行对象和数据库表之间的映射时，**需要开发者手动编写 SQL 映射文件或者使用注解来配置对象和数据库表之间的映射关系**。这与全自动的 ORM 框架相比有所区别。

下面是 MyBatis 与全自动 ORM 框架之间的区别：

> 要自己写映射文件，但是灵活性高

1. **映射方式**：
   - MyBatis：开发者需要手动编写 SQL 映射文件（或者使用注解），指定对象和数据库表之间的映射关系，包括 SQL 查询语句、参数映射、结果映射等。
   - 全自动 ORM 框架：通常采用约定优于配置的方式，根据对象的命名规则和数据库表的命名规则自动生成映射关系，开发者无需手动编写映射文件，减少了开发者的工作量。
2. **灵活性**：
   - MyBatis：由于需要手动编写 SQL 映射文件，开发者可以灵活地控制 SQL 查询语句的编写和执行，可以优化 SQL 查询语句，提高查询性能。
   - 全自动 ORM 框架：自动生成的 SQL 查询语句可能不够灵活，无法满足复杂查询的需求，开发者可能需要手动编写 SQL 语句进行优化。



## 4.Mybatis 之 Mapper 接口的实现原理 

MyBatis 中的 Mapper 接口是定义了与数据库交互的方法，它通常与映射文件（Mapper XML 文件）一起使用，用于描述 SQL 语句和参数映射关系。

**Mapper 接口的实现原理主要涉及到动态代理和反射机制。**

1. **动态代理**：MyBatis 使用 **JDK 动态代理技术**，根据 Mapper 接口的定义，在运行时动态生成一个代理对象。这个代理对象实现了 Mapper 接口中定义的方法，并将方法调用转发到相应的 SQL 语句执行器（Executor）中。
2. **映射文件（Mapper XML 文件）**：Mapper 接口通常与映射文件一起使用，映射文件中定义了 SQL 语句和参数映射关系。在 Mapper 接口中的方法名称和映射文件中的 `<select>`、`<insert>`、`<update>`、`<delete>` 等标签的 id 属性相对应，通过这种方式建立了方法和 SQL 语句的对应关系。
3. **方法调用**：当调用 Mapper 接口中的方法时，实际上是调用了代理对象中相应的方法。代理对象根据方法名称找到对应的 SQL 语句，并根据方法参数动态生成 SQL 语句，然后调用 SQL 语句执行器执行 SQL 语句。
4. **参数映射**：在 Mapper 接口的方法参数中，可以使用 `@Param` 注解来指定方法参数的名称，然后在映射文件中使用 `${paramName}` 的方式来引用方法参数。MyBatis 会根据参数映射关系将方法参数映射到 SQL 语句中。
5. **结果映射**：在映射文件中可以使用 `<resultMap>` 标签来定义结果映射关系，将查询结果映射为 Java 对象。MyBatis 会根据结果映射关系将查询结果转换为 Java 对象，并返回给调用者。


---
group: Mybatis
title: MyBatis 的配置文件详解
order: 2
---

# MyBatis 的配置文件详解

## 日志

### **日志演变：**

**jdk1.4** 之前没有任何的日志框架，直接System.out.println("")

**日志演变过程**

- 将日志**按照级别输入，按照包或者类来输入**
- 将日志**输入到文件中**，**按照日期或者文件大小来进行归档**，记录日志同时发送邮件给开发人员
- **自定义格式，让日志更美观**
- **性能**



### **市面上的日志框架**

**log4j**  

**Log4j 是一个用于记录日志的 Java 库，它提供了灵活的日志记录框架，使得开发者可以在应用程序中记录各种级别的日志信息**。Log4j 的设计旨在提供高性能、灵活性和可靠性，使得它成为了 Java 开发中最流行的日志记录库之一

> 基于 log4j 开发出来的 logback  

 **slf4j** 

是一个为 Java 应用程序提供日志抽象的简单门面，它允许开发者在代码中使用统一的 API 来记录日志，而无需关心具体的日志实现。**SLF4J 不是一个具体的日志实现，而是为各种日志框架（如 Log4j、Logback、java.util.logging 等）提供了一个统一的接口**，使得开发者可以灵活地选择和切换日志框架而无需修改代码。

 **Logback** 

**Logback 是一个灵活而强大的 Java 日志框架，它是 SLF4J 日志门面的默认实现。**Logback 旨在成为 Log4j 的后继者，提供了更高的性能和更丰富的功能



JUL、JCL、Jboss-logging、logback、log4j、log4j2、slf4j....

| 日志门面 （日志的抽象层）                                    | 日志实现                                          |
| ------------------------------------------------------------ | ------------------------------------------------- |
| JCL（Jakarta Commons Logging） SLF4j（Simple Logging Facade for Java） **jboss-logging** | Log4j JUL（java.util.logging） Log4j2 **Logback** |

左边选一个门面（抽象层）、右边来选一个实现；

日志门面：  SLF4J； 官方文档：http://www.slf4j.org/﻿

日志实现：Logback； 中文文档：http://www.logback.cn/

 

### 怎么在 mybatis 中实现

```xml
<dependency>
	<groupId>org.slf4j</groupId>
	<artifactId>slf4j-api</artifactId>
	<version>1.7.30</version>
</dependency>
<dependency>
	<groupId>ch.qos.logback</groupId>
	<artifactId>logback-classic</artifactId>
	<version>1.2.3</version>
</dependency>
```

 **添加 logback 配置文件**

```xml
<configuration>
    <!--appender 追加器   日志以哪种方式进行输出
            name 取个名字
            class 不同实现类会输出到不同地方
                ch.qos.logback.core.ConsoleAppender 输出到控制台
    -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <!-- 格式 -->
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{100} - %msg%n</pattern>
        </encoder>
    </appender>
<!--cn.tulingxueyuan.mapper-->
<!--控制跟细粒度的日志级别  根据包\根据类-->
    <logger name="cn.tulingxueyuan.mapper" level="debug"></logger>
    org.apache.ibatis.transaction
    <!--控制所有的日志级别-->
    <root level="error">
        <!-- 将当前日志级别输出到哪个追加器上面 -->
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

**测试**

```java
Logger LOGGER= LoggerFactory.getLogger(this.getClass());
/**
 * 日志级别
 * TRACE < DEBUG < INFO < WARN < ERROR。
 * 1        2       3      4       5
 */
@Test
public  void test02(){
    LOGGER.trace("跟踪级别");
    LOGGER.debug("调试级别");
    LOGGER.info("信息级别");
    LOGGER.warn("警告级别");
    LOGGER.error("异常级别");
}
```



## **全局配置文件详解**

在 mybatis 的项目中，我们发现了有一个 `mybatis-config.xml `的配置文件，**这个配置文件是 mybatis 的全局配置文件**，用来进行相关的全局配置，在任何操作下都生效的配置。

**官方说明：**

MyBatis 的配置文件包含了会深深影响 MyBatis 行为的设置和属性信息。 配置文档的顶层结构如下：

- configuration（配置）

- ﻿[properties（属性）](https://mybatis.org/mybatis-3/zh/configuration.html#properties)﻿

- ﻿[settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)﻿

- ﻿[typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)﻿

- ﻿[typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)﻿

- ﻿[objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)﻿

- ﻿[plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)﻿

- ﻿[environments（环境配置）](https://mybatis.org/mybatis-3/zh/configuration.html#environments)﻿

  - environment（环境变量）

    - transactionManager（事务管理器）

    - dataSource（数据源）

- ﻿[databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider)﻿

- ﻿[mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

**举例**

mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--引入外部配置文件，类似于Spring中的property-placeholder
    resource:从类路径引入
    url:从磁盘路径或者网络路径引入
    -->
    <properties resource="db.properties"></properties>
    <!--用来控制mybatis运行时的行为，是mybatis中的重要配置-->
    <settings>
        <!--设置列名映射的时候是否是驼峰标识-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    <!--typeAliases表示为我们引用的实体类起别名，默认情况下我们需要写类的完全限定名
    如果在此处做了配置，那么可以直接写类的名称,在type中配置上类的完全限定名，在使用的时候可以忽略大小写
    还可以通过alias属性来表示类的别名
    -->
    <typeAliases>
<!--        <typeAlias type="cn.tulingxueyuan.bean.Emp" alias="Emp"></typeAlias>-->
        <!--如果需要引用多个类，那么给每一个类起别名肯定会很麻烦，因此可以指定对应的包名，那么默认用的是类名-->
        <package name="cn.tulingxueyuan.bean"/>
    </typeAliases>
    <!--
    在实际的开发过程中，我们可能分为开发环境，生产环境，测试环境等等，每个环境的配置可以是不一样的
    environment就用来表示不同环境的细节配置，每一个环境中都需要一个事务管理器以及数据源的配置
    我们在后续的项目开发中几乎都是使用spring中配置的数据源和事务管理器来配置，此处不需要研究
    -->
    <!--default:用来选择需要的环境-->
    <environments default="development">
        <!--id:表示不同环境的名称-->
        <environment id="development">
            <transactionManager type="JDBC"/>
            <!--配置数据库连接-->
            <dataSource type="POOLED">
                <!--使用${}来引入外部变量-->
                <property name="driver" value="${driverClassname}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <!--
    在不同的数据库中，可能sql语句的写法是不一样的，为了增强移植性，可以提供不同数据库的操作实现
    在编写不同的sql语句的时候，可以指定databaseId属性来标识当前sql语句可以运行在哪个数据库中
    -->
    <databaseIdProvider type="DB_VENDOR">
        <property name="MySQL" value="mysql"/>
        <property name="SQL Server" value="sqlserver"/>
        <property name="Oracle" value="orcl"/>
    </databaseIdProvider>
    
    <!--将sql的映射文件适用mappers进行映射-->
    <mappers>
        <!--
        指定具体的不同的配置文件
        class:直接引入接口的全类名，可以将xml文件放在dao的同级目录下，并且设置相同的文件名称，同时可以使用注解的方式来进行相关的配置
        url:可以从磁盘或者网络路径查找sql映射文件
        resource:在类路径下寻找sql映射文件
        -->
<!--        <mapper resource="EmpDao.xml"/>
        <mapper resource="UserDao.xml"/>
        <mapper class="cn.tulingxueyuan.dao.EmpDaoAnnotation"></mapper>-->
        <!--
        当包含多个配置文件或者配置类的时候，可以使用批量注册的功能，也就是引入对应的包，而不是具体的配置文件或者类
        但是需要注意的是，
        1、如果使用的配置文件的形式，必须要将配置文件跟dao类放在一起，这样才能找到对应的配置文件.
            如果是maven的项目的话，还需要添加以下配置，原因是maven在编译的文件的时候只会编译java文件
                <build>
                    <resources>
                        <resource>
                            <directory>src/main/java</directory>
                        <includes>
                            <include>**/*.xml</include>
                        </includes>
                    </resource>
                    </resources>
                </build>
 
        2、将配置文件在resources资源路径下创建跟dao相同的包名
        -->
        <package name="cn.tulingxueyuan.dao"/>
    </mappers>
</configuration>
```



## Mybatis SQL 映射文件详解

MyBatis 的真正强大在于它的**语句映射**，这是它的魔力所在

由于它的异常强大，映射器的 XML 文件就显得相对简单。如果拿它跟具有相同功能的 JDBC 代码进行对比，你会立即发现省掉了将近 95% 的代码。MyBatis 致力于减少使用成本，让用户能更专注于 SQL 代码

SQL 映射文件只有很少的几个顶级元素（按照应被定义的顺序列出）：

- cache – 该命名空间的缓存配置

- cache-ref – 引用其它命名空间的缓存配置

- **resultMap – 描述如何从数据库结果集中加载对象，是最复杂也是最强大的元素。**

- `parameterMap – 老式风格的参数映射。此元素已被废弃，并可能在将来被移除！请使用行内参数映射。文档中不会介绍此元素。`

- **sql – 可被其它语句引用的可重用语句块。**

- insert – 映射插入语句。

- update – 映射更新语句。

- delete – 映射删除语句。

- select – 映射查询语句。

在每个顶级元素标签中可以添加很多个属性，下面我们开始详细了解下具体的配置。

### **insert、update、delete **

| 属性                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| **id**               | 在命名空间中唯一的标识符，可以被用来引用这条语句。           |
| **parameterType**    | **将会传入这条语句的参数的类全限定名或别名**。这个属性是可选的，因为 MyBatis 可以通过类型处理器（TypeHandler）推断出具体传入语句的参数，默认值为未设置（unset）。 |
| `parameterMap`       | `用于引用外部 parameterMap 的属性，目前已被废弃。请使用行内参数映射和 parameterType 属性。` |
| flushCache           | 将其设置为 true 后，只要语句被调用，都会导致本地缓存和二级缓存被清空，默认值：（对 insert、update 和 delete 语句）true。 |
| timeout              | 这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。默认值为未设置（unset）（依赖数据库驱动）。 |
| statementType        | 可选 STATEMENT，PREPARED 或 CALLABLE。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。 |
| **useGeneratedKeys** | （仅适用于 insert 和 update）这会令 MyBatis 使用 JDBC 的 getGeneratedKeys 方法来取出由数据库内部生成的主键（比如：像 MySQL 和 SQL Server 这样的关系型数据库管理系统的自动递增字段），默认值：false。 |
| keyProperty          | （仅适用于 insert 和 update）指定能够唯一识别对象的属性，MyBatis 会使用 getGeneratedKeys 的返回值或 insert 语句的 selectKey 子元素设置它的值，默认值：未设置（unset）。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| keyColumn            | （仅适用于 insert 和 update）设置生成键值在表中的列名，在某些数据库（像 PostgreSQL）中，当主键列不是表中的第一列的时候，是必须设置的。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| databaseId           | 如果配置了数据库厂商标识（databaseIdProvider），MyBatis 会加载所有不带 databaseId 或匹配当前 databaseId 的语句；如果带和不带的语句都有，则不带的会被忽略。 |

```xml
<!--如果数据库支持自增可以使用这样的方式-->
   <insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
      insert into user(user_name) values(#{userName})
   </insert>
   <!--如果数据库不支持自增的话，那么可以使用如下的方式进行赋值查询-->
   <insert id="insertUser2" >
       <selectKey order="BEFORE" keyProperty="id" resultType="integer">
          select max(id)+1 from user
       </selectKey>
      insert into user(id,user_name) values(#{id},#{userName})
   </insert>
```
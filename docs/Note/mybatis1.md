---
group: Mybatis
title: Mybatis 的介绍和基本使用
order: 1
---

# Mybatis 的介绍和基本使用

## **数据库操作框架的历程**

### JDBC

​		JDBC (Java Data Base Connection,java 数据库连接) 是一种**用于执行 SQL 语句的 Java API**, 可以为多种关系数据库提供统一访问，它由一组用 Java 语言编写的类和接口组成.JDBC 提供了一种基准，据此可以构建更高级的工具和接口，使数据库开发人员能够编写数据库应用程序

- 优点：**运行期：快捷、高效**

- 缺点：编辑期：**代码量大、繁琐异常处理、**不支持数据库跨平台

**jdbc 核心 api：**

- DriverManager  连接数据库
- Connection  连接数据库的抽象
- Statment  执行 SQL
- ResultSet  数据结果集



### **DBUtils**

​		DBUtils 是 Java 编程中的数据库操作实用工具，小巧简单实用。

​		DBUtils 封装了对 JDBC 的操作，简化了 JDBC 操作，可以少写代码。

​		DBUtils 三个核心功能介绍

​			1、QueryRunner 中提供对 sql 语句操作的 API

​			2、ResultSetHandler 接口，用于定义 select 操作后，怎样封装结果集

​			3、DBUtils 类，它就是一个工具类，定义了关闭资源与事务处理的方法



### **Hibernate**（ORM）

ORM   对象关系映射：object：java 对象， relational ：关系型数据，  mapping ： 映射

**Hibernate 将 Java 类映射到数据库表中，从 Java 数据类型中映射到 SQL 数据类型中，并把开发人员从 95% 的公共数据持续性编程工作中解放出来。**

Hibernate 是传统 Java 对象和数据库服务器之间的桥梁，用来处理基于 O/R 映射机制和模式的那些对象。

**Hibernate 优势**

- Hibernate **使用 XML 文件来处理映射 Java 类别到数据库表格中，并且不用编写任何代码**。

- 为在数据库中直接储存和检索 Java 对象提供简单的 APIs。

- 如果在数据库中或任何其它表格中出现变化，那么仅需要改变 XML 文件属性。

- 抽象不熟悉的 SQL 类型，并为我们提供工作中所熟悉的 Java 对象。

- Hibernate 不需要应用程序服务器来操作。

- 操控你数据库中对象复杂的关联。

- 最小化与访问数据库的智能提取策略。

- 提供简单的数据询问。

**Hibernate 劣势**

- hibernate 的完全封装导致无法使用数据的一些功能。

- Hibernate 的缓存问题。

- **Hibernate 对于代码的耦合度太高。**

- Hibernate 寻找 bug 困难。

- Hibernate 批量数据操作需要大量的内存空间而且执行过程中需要的对象太多



### **JDBCTemplate**

JdbcTemplate 针对数据查询提供了多个重载的模板方法，你可以根据需要选用不同的模板方法。如果你的查询很简单，仅仅是传入相应 SQL 或者相关参数，然后取得一个单一的结果，那么你可以选择如下一组便利的模板方法。

优点：运行期：高效、内嵌 Spring 框架中、支持基于 AOP 的声明式事务 		

缺点：**必须于 Spring 框架结合在一起使用、不支持数据库跨平台、默认没有缓存**



## 什么是 Mybatis？

MyBatis 是一款优秀的持久层框架 / 半自动的 ORM，它支持**自定义 SQL、存储过程以及高级映射**

> 持久层框架是用于简化数据持久化（通常是指将数据保存到数据库中）的开发过程的工具或框架

MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作(`操作简单`)。MyBatis 可以通过**简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO**（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

**优点：**

- 与 JDBC 相比，减少了 50% 的代码量`减少代码量`
- 最简单的持久化框架，简单易学`简单`
- SQL 代码从程序代码中彻底分离出来，可以重用`解耦`
- 提供 XML 标签，支持编写**动态 SQL**`动态sql`
- **提供映射标签，支持对象与数据库的 ORM 字段关系映射**`orm映射`
- **支持缓存、连接池、数据库移植....**

**缺点：**

- SQL 语句编写工作量大，熟练度要高
- 数据库**移植性比较差**，如果需要切换数据库的话，SQL 语句会有很大的差异



## 快速搭建 Mybatis 项目

1.导入相关的依赖

```xml
    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.4</version>
        </dependency> 
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>  
    </dependencies>
```

驱动请按照数据库版本进行对应 https://dev.mysql.com/doc/relnotes/connector-j/5.1/en/

2.创建对应的数据表

3.创建与表对应的实体类对象

**Emp.java**

```java
public class Emp {
    private Integer id;
    private String username;
 
    public Integer getId() {
        return id;
    }
 
    public void setId(Integer id) {
        this.id = id;
    }
 
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    @Override
    public String toString() {
        return "Emp{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }
}
```

**4.创建对应的 Mapper 接口**

```java
public interface EmpMapper {
    // 根据id查询Emp实体
    @Select("select * from emp where id=#{id}")
    Emp selectEmp(Integer id);
 
    // 插入
    Integer insertEmp(Emp emp);
 
    // 更新
    Integer updateEmp(Emp emp);
 
    // 删除
    Integer deleteEmp(Integer id);
}
```

**5.编写配置文件 `mybatis-config.xml`**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!--<mapper resource="EmpMapper.xml"/>-->
        <mapper class="cn.xxx.mapper.EmpMapper"></mapper>
    </mappers>
</configuration>
```

**6.EmpMapper.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.xxx.mapper.EmpMapper">
 
    <!--根据id查询Emp实体-->
    <select id="selectEmp" resultType="cn.xxx.pojo.Emp">
        select * from Emp where id = #{id}
    </select>
 
    <insert id="insertEmp">
        INSERT INTO
        `mybatis`.`emp` ( `username`)
        VALUES (#{username});
    </insert>
 
    <update id="updateEmp">
        UPDATE EMP
        SET username=#{username}
        WHERE id=#{id}
    </update>
 
    <delete id="deleteEmp">
        DELETE FROM emp
        WHERE id=#{id}
    </delete>

</mapper>
```

**7.编写测试类**

基于StatementId，接口绑定，注解的方式执行

```java
public class MybatisTest {
 
    SqlSessionFactory sqlSessionFactory;
    
    @Before
    public void before(){
        // 从 XML 中构建 SqlSessionFactory
        String resource = "mybatis.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
    }
 
    /**
     * 基于StatementId的方式去执行SQL
     * <mapper resource="EmpMapper.xml"/>
     * @throws IOException
     */
    @Test
    public void test01() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            Emp emp = (Emp) session.selectOne("cn.xxx.pojo.EmpMapper.selectEmp", 1);
            System.out.println(emp);
        }
    }
 
    /**
     * 基于接口绑定的方式
     *  1.新建数据访问层的接口：  POJOMapper
     *  2.添加mapper中对应的操作的方法
     *      1.方法名要和mapper中对应的操作的节点的id要一致
     *      2.返回类型要和mapper中对应的操作的节点的resultType要一致
     *      3.mapper中对应的操作的节点的参数必须要在方法的参数中声明
     *  3.Mapper.xml 中的namespace必须要和接口的完整限定名要一致
     *  4.修改mybatis全局配置文件中的mappers,采用接口绑定的方式:
     *        <mapper class="cn.xxx.mapper.EmpMapper"></mapper>
     *  5.一定要将mapper.xml和接口放在同一级目录中，只需要在resources新建和接口同样结构的文件夹就行了，生成就会合并在一起
     */
    @Test
    public void test02(){
        try (SqlSession session = sqlSessionFactory.openSession()) {
            EmpMapper mapper = session.getMapper(EmpMapper.class);
            Emp emp = mapper.selectEmp(1);
            System.out.println(emp);
        }
    }
 
    /**
     * 基于注解的方式
     * 1.在接口方法上面写上对应的注解
     *	@Select("select * from emp where id=#{id}")
     * 注意：
     * 注解可以和xml共用， 但是不能同时存在方法对应的xml的id
     */
    @Test
    public void test03(){
        try (SqlSession session = sqlSessionFactory.openSession()) {
            EmpMapper mapper = session.getMapper(EmpMapper.class);
            Emp emp = mapper.selectEmp(1);
            System.out.println(emp);
        }
    }
}
```



## **增删改查的基本操作**

**EmpDao.java**

```java
public interface EmpDao {
 
    public Emp findEmpByEmpno(Integer empno);
 
    public int updateEmp(Emp emp);
 
    public int deleteEmp(Integer empno);
 
    public int insertEmp(Emp emp);
 
}
```

**EmpDao.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--namespace:编写接口的全类名，就是告诉要实现该配置文件是哪个接口的具体实现-->
<mapper namespace="cn.tulingxueyuan.dao.EmpDao">
    <!--
    select:表示这个操作是一个查询操作
    id表示的是要匹配的方法的名称
    resultType:表示返回值的类型，查询操作必须要包含返回值的类型
    #{属性名}：表示要传递的参数的名称
    -->
    <select id="findEmpByEmpno" resultType="cn.tulingxueyuan.bean.Emp">
        select * from emp where empno = #{empno}
    </select>
    <!--增删改查操作不需要返回值，增删改返回的是影响的行数，mybatis会自动做判断-->
    <insert id="insertEmp">
        insert into emp(empno,ename) values(#{empno},#{ename})
    </insert>
    <update id="updateEmp">
        update emp set ename=#{ename} where empno = #{empno}
    </update>
    <delete id="deleteEmp">
        delete from emp where empno = #{empno}
    </delete>
</mapper>
```

MyTest.java

```java
package cn.tulingxueyuan.test;
 
import cn.tulingxueyuan.bean.Emp;
import cn.tulingxueyuan.dao.EmpDao;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Before;
import org.junit.Test;
 
import java.io.IOException;
import java.io.InputStream;
 
public class MyTest {
    SqlSessionFactory sqlSessionFactory = null;
    @Before
    public void init(){
        // 根据全局配置文件创建出SqlSessionFactory
        // SqlSessionFactory:负责创建SqlSession对象的工厂
        // SqlSession:表示跟数据库建议的一次会话
        String resource = "mybatis-config.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory= new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Test
    public void test01() {
 
        // 获取数据库的会话
        SqlSession sqlSession = sqlSessionFactory.openSession();
        Emp empByEmpno = null;
        try {
            // 获取要调用的接口类
            EmpDao mapper = sqlSession.getMapper(EmpDao.class);
            // 调用方法开始执行
            empByEmpno = mapper.findEmpByEmpno(7369);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        System.out.println(empByEmpno);
    }
 
    @Test
    public void test02(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        EmpDao mapper = sqlSession.getMapper(EmpDao.class);
        int zhangsan = mapper.insertEmp(new Emp(1111, "zhangsan"));
        System.out.println(zhangsan);
        sqlSession.commit();
        sqlSession.close();
    }
 
    @Test
    public void test03(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        EmpDao mapper = sqlSession.getMapper(EmpDao.class);
        int zhangsan = mapper.updateEmp(new Emp(1111, "lisi"));
        System.out.println(zhangsan);
        sqlSession.commit();
        sqlSession.close();
    }
 
    @Test
    public void test04(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        EmpDao mapper = sqlSession.getMapper(EmpDao.class);
        int zhangsan = mapper.deleteEmp(1111);
        System.out.println(zhangsan);
        sqlSession.commit();
        sqlSession.close();
    }
}
```

**EmpDaoAnnotation.java**

```java
package cn.tulingxueyuan.dao;
 
import cn.tulingxueyuan.bean.Emp;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
 
public interface EmpDaoAnnotation {
 
    @Select("select * from emp where id= #{id}")
    public Emp findEmpByEmpno(Integer empno);
 
    @Update("update emp set ename=#{ename} where id= #{id}")
    public int updateEmp(Emp emp);
 
    @Delete("delete from emp where id= #{id}")
    public int deleteEmp(Integer empno);
 
    @Insert("insert into emp(id,user_name) values(#{id},#{username})")
    public int insertEmp(Emp emp);
 
}
```
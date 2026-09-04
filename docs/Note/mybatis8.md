---
group: Mybatis
title: 基于XML的详细使用—缓存
order: 7
---

# 基于XML的详细使用—缓存

## **介绍**

MyBatis 内置了一个强大的事务性查询缓存机制，它可以非常方便地配置和定制。 为了使它更加强大而且易于配置，我们对 MyBatis 3 中的缓存实现进行了许多改进。

**默认情况下，只启用了本地的会话缓存，它仅仅对一个会话中的数据进行缓存**

**要启用全局的二级缓存，只需要在你的 SQL 映射文件中添加一行：**

```xml
<cache/>
```

当添加上该标签之后，会有如下效果：

- **映射语句文件中的所有 select 语句的结果将会被缓存。**

- **映射语句文件中的所有 insert、update 和 delete 语句会刷新缓存。**

- 缓存会使用最近最少使用算法（**LRU**, Least Recently Used）算法来清除不需要的缓存。

- **缓存不会定时进行刷新（也就是说，没有刷新间隔）。**

- 缓存会保存列表或对象（无论查询方法返回哪种）的 1024 个引用。

- **缓存会被视为读 / 写缓存，这意味着获取到的对象并不是共享的，可以安全地被调用者修改，而不干扰其他调用者或线程所做的潜在修改。** `读写分离，安全`

在进行配置的时候还会分为一级缓存和二级缓存：

- 一级缓存：`线程级别的缓存`，是本地缓存，sqlSession 级别的缓存

- 二级缓存：`全局范围的缓存`，不止局限于当前会话



## **一级缓存的使用**

一级缓存是 sqlsession 级别的缓存，默认是存在的。

在下面的案例中，大家发现我发送了两个相同的请求，但是 sql 语句仅仅执行了一次，那么就意味着第一次查询的时候已经将结果进行了缓存。

```java
@Test
public void test01() {
    SqlSession sqlSession = sqlSessionFactory.openSession();
    try {
        EmpDao mapper = sqlSession.getMapper(EmpDao.class);
        List<Emp> list = mapper.selectAllEmp();
        for (Emp emp : list) {
            System.out.println(emp);
        }
        System.out.println("--------------------------------");
        List<Emp> list2 = mapper.selectAllEmp();
        for (Emp emp : list2) {
            System.out.println(emp);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        sqlSession.close();
    }
}
```

在大部分的情况下一级缓存是可以的，但是有几种特殊的情况会造成**一级缓存失效：**

1. 一级缓存是 sqlSession 级别的缓存，如果在应用程序中只有开启了多个 sqlsession，那么会造成缓存失效

   ```java
   @Test
   public void test02(){
       SqlSession sqlSession = sqlSessionFactory.openSession();
       EmpDao mapper = sqlSession.getMapper(EmpDao.class);
       List<Emp> list = mapper.selectAllEmp();
       for (Emp emp : list) {
           System.out.println(emp);
       }
       System.out.println("================================");
       SqlSession sqlSession2 = sqlSessionFactory.openSession();
       EmpDao mapper2 = sqlSession2.getMapper(EmpDao.class);
       List<Emp> list2 = mapper2.selectAllEmp();
       for (Emp emp : list2) {
           System.out.println(emp);
       }
       sqlSession.close();
       sqlSession2.close();
   }
   ```

2. 在编写查询的 sql 语句的时候，一定要注意传递的参数，**如果参数不一致，那么也不会缓存结果**
3. **如果在发送过程中发生了数据的修改，那么结果就不会缓存**
4. 在两次查询期间，**手动去清空缓存，也会让缓存失效**

### **特性**

一级缓存特

 * 默认就开启了，也可以关闭一级缓存 localCacheScope=STATEMENT
 * 作用域：是基于sqlSession（默认），一次数据库操作会话。
 * 缓存默认实现类PerpetualCache ,使用map进行存储的
 * 查询完就会进行存储
 * 先从二级缓存中获取，再从一级缓存中获取

失效情况：

 * 不同的sqlSession会使一级缓存失效
 * 同一个SqlSession，但是查询语句不一样
 * 同一个SqlSession，查询语句一样，期间执行增删改操作
 * 同一个SqlSession，查询语句一样，执行手动清除缓存



## 二级缓存

二级缓存是全局作用域缓存，默认是不开启的，需要手动进行配置。

Mybatis 提供二级缓存的接口以及实现，缓存实现的时候要求实体类实现 Serializable 接口，二级缓存在 sqlSession 关闭或提交之后才会生效。

### 缓存的使用

步骤：

- 全局配置文件中添加如下配置：

  ```xml
  <setting name="cacheEnabled" value="true"/>
  ```

- 需要在使用二级缓存的映射文件出使用` <cache/> `标签标注

- 实体类必须要实现 Serializable 接口

  ```java
  @Test
     public void test04(){
         SqlSession sqlSession = sqlSessionFactory.openSession();
         SqlSession sqlSession2 = sqlSessionFactory.openSession();
         EmpDao mapper = sqlSession.getMapper(EmpDao.class);
         EmpDao mapper2 = sqlSession2.getMapper(EmpDao.class);
         Emp empByEmpno = mapper.findEmpByEmpno(1111);
         System.out.println(empByEmpno);
         sqlSession.close();
  
         Emp empByEmpno1 = mapper2.findEmpByEmpno(1111);
         System.out.println(empByEmpno1);
         sqlSession2.close();
    }
  ```

### 缓存的属性

- eviction: 表示缓存回收策略，默认是 LRU

  - LRU：最近最少使用的，移除最长时间不被使用的对象
  - FIFO：先进先出，按照对象进入缓存的顺序来移除
  - SOFT：软引用，移除基于垃圾回收器状态和软引用规则的对象
  - WEAK：弱引用，更积极地移除基于垃圾收集器状态和弱引用规则的对象

- flushInternal: 刷新间隔，单位毫秒

  默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新

- size：引用数目，正整数

  代表缓存最多可以存储多少个对象，太大容易导致内存溢出

- readonly：只读，true/false
  - true：只读缓存，会给所有调用这返回缓存对象的相同实例，因此这些对象不能被修改。
  - false：读写缓存，会返回缓存对象的拷贝（序列化实现），这种方式比较安全，默认值

```java
@Test
public void test05(){
    SqlSession sqlSession = sqlSessionFactory.openSession();
    EmpDao mapper = sqlSession.getMapper(EmpDao.class);
    Emp empByEmpno = mapper.findEmpByEmpno(1111);
    System.out.println(empByEmpno);
    sqlSession.close();

    SqlSession sqlSession2 = sqlSessionFactory.openSession();
    EmpDao mapper2 = sqlSession2.getMapper(EmpDao.class);
    Emp empByEmpno2 = mapper2.findEmpByEmpno(1111);
    System.out.println(empByEmpno2);
    Emp empByEmpno3 = mapper2.findEmpByEmpno(1111);
    System.out.println(empByEmpno3);
    sqlSession2.close();
}
```

缓存查询的顺序是先查询二级缓存再查询一级缓存



### 二级缓存的作用范围：

如果设置了全局的二级缓存配置，那么在使用的时候需要注意，在每一个单独的 select 语句中，可以设置将查询缓存关闭，以完成特殊的设置

1. **在 setting 中设置，是配置二级缓存开启，一级缓存默认一直开启**

   ```xml
   <setting name="cacheEnabled" value="true"/>
   ```

2. **select 标签的 `useCache` 属性：**

   在每一个 select 的查询中可以设置当前查询是否要使用二级缓存，只对二级缓存有效

3. **sql 标签的` flushCache` 属性**

   增删改操作默认值为 true，sql 执行之后会清空一级缓存和二级缓存，而查询操作默认是 false

4. **`sqlSession.clearCache()`**

   只是用来清除一级缓存

**二级缓存：特性：**

 * 默认开启了，没有实现
 * 作用域：基于全局范围，应用级别。
 * 缓存默认实现类PerpetualCache ,使用map进行存储的但是二级缓存根据不同的mapper命名空间多包了一层map
 * 事务提交的时候（sqlSession关闭)
 * 先从二级缓存中获取，再从一级缓存中获取

实现：

 * 开启二级缓存`<setting name="cacheEnabled" value="true"/>`
 * 在需要使用到二级缓存的映射文件中加入`<cache></cache>`,基于Mapper映射文件来实现缓存的，基于Mapper映射文件的命名空间来存储的
 * 在需要使用到二级缓存的javaBean中实现序列化接口`implements Serializable`
 * 配置成功就会出现缓存命中率 同一个sqlId: 从缓存中拿出的次数/查询总次数

失效：

 * 同一个命名空间进行了增删改的操作，会导致二级缓存失效
 * 但是如果不想失效：可以将SQL的flushCache 这是为false,但是要慎重设置，因为会造成数据脏读问题，除非你能保证查询的数据永远不会执行增删改
 * 让查询不缓存数据到二级缓存中useCache="false"
 * 如果希望其他mapper映射文件的命名空间执行了增删改清空另外的命名空间就可以设置：`<cache-ref namespace="cn.tulingxueyuan.mapper.DeptMapper"/>`



## 整合第三方缓存`略`
---
nav:
  title: 个人计划
  order: 6
title: 2024年计划
---

## 整体规划

- 维护个人笔记库
- 新技术的学习
- 技能树的构架

## 维护个人笔记库

自己零散学习的内容其实不在少数，但是基本都是蜻蜓点水式的。今年打算改变下，将工作中和学习中的过程产物记录下来，一是便于自己回顾，二是以这种方式记录更能深入去了解某项技术。经常逛掘金，可以看到里面有好多人都保持着维护个人笔记库的习惯，有些文章我还看不懂（惭愧），故打算重拾个人笔记库。

## 新技术的学习

了解下互联网最前沿的新技术，虽然单一语言能做的比较少，但调调API还是可以的.....

## 技能树的构建

最重要的：打好计算机基础的知识，计算机网络,操作系统，组成原理，java基础（平时看到新鲜的就记录下）

学习更多的技术框架，了解更多的设计模式, RESTful API服务实现和设计，学习更多的开发安全知识

了解大型项目架构设计，熟悉常见场景下的性能优化方法

使用docker和k8s在各类云平台 (AWS,阿里云等国内云平台,Azure,Google云) 实现项目部署和管理

了解大数据相关技术栈

熟练搭建CI/CD流水线

*AI和机器学习 


### 刷算法

一提到刷算法，大家都觉得要跳槽，也深刻说明了算法在开发工作中用到的概率之低。但是现在算法面试似乎已经是市场共识了，你得有才有 offer。

idea破解：https://www.bilibili.com/read/cv27050575/
win安装mysql https://blog.csdn.net/weixin_44512005/article/details/135777754


# 简历内容总结 `集中式复习`

## 自我介绍：

面试官您好，首先非常感谢贵公司能给我这个面试机会。

我叫陈俊霖，2022年毕业，从事 java 开发工程师已经 3 年了。这几年开发，在之前公司主要涉及的项目包括为达华安保公司开发的考勤排班项目，为杭州政府开发的智汇通信息管理项目和一些小型的项目开发。在开发中主要涉及的框架包括 SpringBoot,SpringCloud,mybatis,mysql,redis 和一些中间件等，能熟练掌握框架间的整合技术

有时候为了项目需求高效开发或者自己技术的进步，也研究学习过一些主流的技术栈：例如网络编程框架（ netty），分布式框架 （zookeeper） 等。前端的技术以前也学习过，比如 前端三件套，Vue 等

平时也喜欢上一些技术网站参与文章发表和交流，国内的包括比如稀土掘金，CSDN，国外的 github，也会用这些网站包括当前流行的 AI 技术来解决开发中遇到的难题。

在闲暇时间我会将我的笔记进行分类上传，比如将一些关于技术方面摘录总结的文章和资料自己写一个小 demo 放在自己的网站上，再把自己学习过程中的心得和难题难题给记下来，在一些技术交流群里一起分享交流。

无论工作还是学习，我觉得一个人闷头苦学进步是有限的，只有交流合作才能带来更多的进步和价值



## 具有良好的编码规范和面向对象编程思想

**1. 代码格式与注释**

保持代码的整洁和可读性，使用合适的注释解释复杂逻辑

**2. 使用设计模式**

运用设计模式解决常见问题，提高代码的可维护性和可扩展性。

**3. java三大特性的运用，封装继承多态**

继承实现代码复用，通过多态实现接口的灵活调用，封装保护对象的内部状态



## 常用的设计模式

### **工厂模式：**

Circle,Square继承自Shape,在ShapeFactory可以根据名称动态获取Circle或者Square

```java
public class ShapeFactory {

    // 静态方法，直接返回指定类型的 Shape 对象
    public static Shape getShape (String shapeType) {
        if (shapeType == null) {
            return null;
        }
        if (shapeType.equalsIgnoreCase ("CIRCLE")) {
            return new Circle ();
        } else if (shapeType.equalsIgnoreCase ("SQUARE")) {
            return new Square ();
        }
        return null;
    }
}
```



### **抽象工厂模式**

工厂的工厂。例如：

Circle,Square继承自Shape，在ShapeFactory可以根据名称动态获取Circle或者Square

Green,red继承自color，在colorFactory可以根据名称动态获取Green或者red

```java
// FactoryProducer.java
public class FactoryProducer {
    public static AbstractFactory getFactory(String choice) {
        if (choice.equalsIgnoreCase("SHAPE")) {
            return new ShapeFactory();
        } else if (choice.equalsIgnoreCase("COLOR")) {
            return new ColorFactory();
        }
        return null;
    }
}
```



### **单例模式**（Runtime类）

- **饿汉/懒汉 模式**

  ```java
  public class EagerSingleton {
      
      // 私有化构造函数，防止外部创建实例
      private EagerSingleton () {}
      
      // 在类加载时就创建实例
      private static final EagerSingleton instance = new EagerSingleton ();
  
      // 提供全局访问点
      public static EagerSingleton getInstance () {
          return instance;
      }
      
      -----或者------
          
      // 延迟加载实例
      private static LazySingleton instance;
  
      // 提供全局访问点，线程不安全
      public static LazySingleton getInstance() {
          if (instance == null) {
              instance = new LazySingleton();
          }
          return instance;
      }
  }
  ```

- **双重检查锁定单例模式**

  ```java
  public class DoubleCheckedLockingSingleton {
      // 使用 volatile 确保变量的可见性和有序性
      private static volatile DoubleCheckedLockingSingleton instance;
  
      // 私有化构造函数，防止外部创建实例
      private DoubleCheckedLockingSingleton () {}
  
      // 提供全局访问点，线程安全且高效
  	// 已经创建的话就直接获取了不需要给方法上锁
      public static DoubleCheckedLockingSingleton getInstance () {
          if (instance == null) {
              synchronized (DoubleCheckedLockingSingleton.class) {
                  if (instance == null) {
                      instance = new DoubleCheckedLockingSingleton ();
                  }
              }
          }
          return instance;
      }
  }
  ```



### **适配器模式**

它允许将一个类的接口转换成客户端期望的另一个接口，使得原本由于接口不兼容而不能一起工作的类可以协同工作

Mp4Player 和Vlcplayer都继承AdvancedMediaPlayer ，可以播放自己种类的音乐

```java
// 播放器接口
public interface MediaPlayer {
    void play(String audioType, String fileName);
}

// 高级媒体播放器接口
public interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}
```

**适配器：**有一个`MediaAdapter`实现了MediaPlayer接口，并且内部维护一个AdvancedMediaPlayer ，它的构造方法就是根据文件类型新建对应的AdvancedMediaPlayer （Mp4Player 和Vlcplayer），并且调用对应的playVlc或者playMp4方法

**使用适配器：**AudioPlayer继承MediaPlayer，内部维护一个适配器，对于是自己类型的文件类型MP3，则直接调用自己 的方法，不然调用适配器的方法

```java
public class AudioPlayer implements MediaPlayer {
    MediaAdapter mediaAdapter;

    @Override
    public void play (String audioType, String fileName) {
        // 内置支持 mp3 播放
        if (audioType.equalsIgnoreCase ("mp3")) {
            System.out.println ("Playing mp3 file. Name:" + fileName);
        }
        //mediaAdapter 提供对 vlc 和 mp4 文件的支持
        // 相当于这个 AudioPlayer 类里有一个对 MediaAdapter 的引用
        else if (audioType.equalsIgnoreCase ("vlc") || audioType.equalsIgnoreCase ("mp4")) {
            mediaAdapter = new MediaAdapter (audioType);
            mediaAdapter.play (audioType, fileName);
        } else {
            System.out.println ("Invalid media." + audioType + "format not supported");
        }
    }
}
```



### **桥接模式**

Circle,Square继承自Shape，在ShapeFactory可以根据名称动态获取Circle或者Square

Green,red继承自color，在colorFactory可以根据名称动态获取Green或者red

与上面不同的是Shape内部维护了一个color，在构造方法中进行设置



### **装饰器模式**

在不改变对象结构的情况下动态地给对象添加功能

假设有一个SimpleCoffee类实现了Coffee接口，内部有一个费用double

为了在SimpleCoffee上添加功能，我们定义一个**装饰器抽象类** `CoffeeDecorator`，实现 `Coffee` 接口，并包含一个 `SimpleCoffee` 对象的引用

```java
public abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    @Override
    public double cost() {
        return decoratedCoffee.cost();
    }
}
```

接着定义具体装饰器类，MilkDecorator扩展 `CoffeeDecorator` 类。

```java
// 牛奶装饰器类
public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public double cost() {
        return super.cost() + 1.5; // 增加牛奶的费用
    }
}
```



### **代理模式**

CGlib和JDK动态代理

JDK实现：**JDK 动态代理只能代理实现了接口的类。**

```java
//定义接口和实现类
public interface Subject {
    void doSomething();
}

public class RealSubject implements Subject {
    @Override
    public void doSomething() {
        System.out.println("Doing something...");
    }
}
```

**创建 InvocationHandler**：实现 `InvocationHandler` 接口，重写 `invoke` 方法。在这里可以插入自定义的逻辑，比如日志记录、权限检查等。

```java
public class MyInvocationHandler implements InvocationHandler {
    private Object target;

    public MyInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 前置通知
        System.out.println("Before method call");
        Object result = method.invoke(target, args);
        // 后置通知
        System.out.println("After method call");
        return result;
    }
}
```

**生成代理对象**：通过调用 `Proxy.newProxyInstance` 方法，传入类加载器、接口数组以及 InvocationHandler 实例，来动态生成代理对象。

```java
Subject subject = (Subject) Proxy.newProxyInstance(
        RealSubject.class.getClassLoader(),
        new Class[]{Subject.class},
        new MyInvocationHandler(new RealSubject())
);

subject.doSomething();
```



**CGlib**

它通过在**运行时动态生成被代理类的子类，来拦截对父类方法的调用**。

```java
//直接定义一个类，而非接口及其实现。
public class RealSubject {
    public void doSomething() {
        System.out.println("Doing something...");
    }
}
```

**创建 MethodInterceptor**：实现 `MethodInterceptor` 接口，重写 `intercept` 方法，在该方法中添加自定义逻辑。

`MethodInterceptor环绕通知 `, `Interceptor拦截器`

```java
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(RealSubject.class);
enhancer.setCallback(new MethodInterceptor() {
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        // 前置通知
        System.out.println("Before method call");
        Object result = proxy.invokeSuper(obj, args);
        // 后置通知
        System.out.println("After method call");
        return result;
    }
});
```



### 观察者模式

**当一个对象的状态发生变化时，其所有依赖对象都会收到通知并自动更新**。这种模式通常被用于实现**分布式事件处理系统**。

```java
//主题接口
public interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}
```

具体主题类

```java
public class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int state;

    public int getState () {
        return state;
    }

    public void setState (int state) {
        this.state = state;
        notifyObservers ();
    }

    @Override
    public void registerObserver (Observer observer) {
        observers.add (observer);
    }

    @Override
    public void removeObserver (Observer observer) {
        observers.remove (observer);
    }
	
    // 发生变化时通知自己的观察者
    @Override
    public void notifyObservers () {
        for (Observer observer : observers) {
            observer.update (state);
        }
    }
}
```

**具体观察者类**

```java
public interface Observer {
    void update(int state);
}

public class ConcreteObserver implements Observer {
    private int state;

    @Override
    public void update(int state) {
        this.state = state;
        System.out.println("Observer updated with state: " + state);
    }
}
```



## 网络协议

### 无连接传输：UDP

是不可靠、不保序的传输。UDP 是 **尽力而为** 的服务，报文段可能丢失，或乱序

**无连接**

- UDP 发送端和接收端之间没有握手
- 每个 UDP 报文段都被独立地处理

**UDP 被用于:**

- 流媒体（丢失不敏感，速率敏感、应用可控制传输速率）
- DNS

 **为什么要有 UDP?**

- 不建立连接 `建立连接会增加延时`
- 简单：在发送端和接收端没有连接状态
- 报文段的头部很小 `开销小`
- 无拥塞控制和流量控制：这样 UDP 可以尽可能快的发送报文段

### 面向连接传输：TCP

- 数据是可靠的、按顺序的字节流，但**没有报文边界**，靠应用进程自己维护
- **管道化（流水线）**：TCP 靠此进行**拥塞控制和流量控制**
- TCP 有**发送和接收缓存**，以此实现超时重发，和同步传输接收速率
- **面向连接**：在数据交换之前，**通过握手（交换控制报文） 初始化发送方、接收方的状态变量**

**连接管理**

2 次握手建立连接会导致：由于**丢失**造成的重传老数据被当成新数据接受，或者只维护了一半的连接

**3 次握手解决：半连接和接收老数据问题**

**四次挥手**：服务端可能还有数据没有发送完毕。客户发出连接释放通知，服务端确认收到后，客户端就进入半关闭状态（只收消息不发消息），服务端把未发完的数据发送完毕后，发送连接释放通知，客户端确认后就关闭连接





# 项目部分

## 通过工厂模式实现消息模板的编写

**步骤1：定义消息模板接口**

首先，定义一个消息模板接口，所有具体的消息模板都将实现这个接口。

```java
public interface MessageTemplate {
    String getMessage();
}
```

**步骤2：实现具体的消息模板**

接下来，创建具体的消息模板类，实现 `MessageTemplate` 接口。

```java
public class WelcomeMessageTemplate implements MessageTemplate {
    @Override
    public String getMessage() {
        return "Welcome to our service!";
    }
}

public class FarewellMessageTemplate implements MessageTemplate {
    @Override
    public String getMessage() {
        return "Thank you for using our service. Goodbye!";
    }
}
```

**步骤3：创建工厂类**

创建一个工厂类，通过工厂类的方法来实例化具体的消息模板对象。

```java
public class MessageTemplateFactory {
    public static MessageTemplate createMessageTemplate(String type) {
        switch (type.toLowerCase()) {
            case "welcome":
                return new WelcomeMessageTemplate();
            case "farewell":
                return new FarewellMessageTemplate();
            default:
                throw new IllegalArgumentException("Unknown message template type");
        }
    }
}
```



##  对网关添加 Sentinel 进行限流并添加降级熔断策略

在应用一侧引入 sentinel 的依赖，配置好 sentinel 的地址以及与 sentinel 的通信端口，即可将应用托管给 sentinel 进行监控。

**yml配置：**

```yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: 127.0.0.1:8080
        port: 8719
```

### **流控规则**

在 sentinel 的流控规则中可以进行流控的规则设置。

**资源名**：URL，要求必须全局唯一

**阈值类型**：限制线程数？限制每秒访问数？

**单机阈值**：每台机器的访问阈值

**流控模式**、流控效果：设置响应的方式。



**流控模式**

- 直接模式

  超过阈值后会直接给出一个处理方式：此处设置的是 “快速失败”，直接抛出一个响应。

- 关联模式

  当自己所关联的资源到达阈值以后，限流自己。即当与 A 关联的资源 B 达到阈值以后，限流 A。防止连坐效应造成关联业务宕机。

- 预热

  即不直接让系统去面对极限流量，而是当流量在达到所设定阈值的一个百分比时，系统拒绝所有流量，用一段时间来热身，热身完毕后再去面对极限流量。

- 排队等待

### 降级

- 慢比列调用

  当一秒内有 5 个以上的请求进来，降级规则被唤醒，当进来的所有请求中有超过 30% 的请求响应时间超过 1000ms，触发服务熔断，打开断路器，熔断时长 20 秒，此期间内对还想进来的请求快速返回一个响应，20 秒以后，向服务发送探测信号，尝试闭合断路器

- 异常比例

  1 秒内超过 3 个请求进来，唤醒降级规则，进来的请求里有**超过 30% 的请求产生异常**，触发熔断，断路器打开，熔断时长 10 秒，此期间内对还想进来的请求返回一个快速响应，10 秒以后重新探测，尝试闭合断路器。

- 异常数

  1 分钟内超过 3 个请求进来，触发降级策略，所有请求中异常数如果超过阈值则触发熔断。



## redis 实现分布式编号

### 使用 Redis 的原子性自增操作

Redis 提供了 `INCR` 和 `INCRBY` 命令，可以保证自增操作的原子性。先使用 Redis 的自增操作批量生成分布式编号。



## CompletableFuture和 Java Stream API 

**并行处理大批量数据转换的场景**

```java
List<ResultType> result = CompletableFuture.supplyAsync(
    //创建一个包含从 0 到 list.size() - 1 的整数流，并将其装箱成 Integer 对象。之后才能对每个数字对应的索引元素获取
    () -> IntStream.range(0, list.size()).boxed()
    //按照分页进行分组，每组包含 pageSize 个元素。
    //计算每个元素所属的分页组
        .collect(Collectors.groupingBy(i -> i / pageSize, 
                // 将索引转换为列表中的元素get(i)
                Collectors.mapping(list::get, 
                    // 将列表中的元素通过 t2ttFun 函数进行转换。
                    Collectors.mapping(t2ttFun, Collectors.toList())
                )
            )
        //获取所有分页组的值（即每个分页的元素列表）并将其转为流
        ).values().stream()
    	//对每个分页组 v，异步地应用 tt2rFun 函数进行处理，返回一个 CompletableFuture 对象
        .map(v -> CompletableFuture.supplyAsync(() -> tt2rFun.apply(v), executorService))
    	//将所有 CompletableFuture 对象收集到一个列表 fList 中。
        .collect(Collectors.collectingAndThen(
            Collectors.toList(), 
            fList -> 
            //等待所有 CompletableFuture 完成，并获取它们的结果
            fList.stream().map(CompletableFuture::join).
            //返回的结果列表展平为一个单一的流，将最终的流收集为一个列表
            flatMap(List::stream).collect(Collectors.toList())
        ))
    , executorService).join();
```



我有一个 `List<Item>` 的项目明细列表，我需要将每个 `Item` 转换为 我们自己项目框架的一个ProcessedItem，并最终得到一个 `List<ProcessedItem>`。`t2ttFun` 表示从 `Item` 到 `ProcessedItem` 的转换函数，`tt2rFun` 表示对一组 `ProcessedItem` 进行进一步处理的函数。

使用CompletableFuture的supplyAsync方法，首先创建一个0到list.size的整数流，并将整数流按pageSize分组。将**每个分组**使用CompletableFuture的supplyAsync方法交由线程池中的线程来**异步执行**，将item转换成ProcessedItem收集并合并最后处理业务数据



## 通过覆盖索引和延迟关联等方式解决部分数据深分页问题

覆盖索引是指查询所需要的字段都在索引中，不需要再回表查询。通过覆盖索引，可以减少 IO 操作，提高查询性能。

延迟关联是指**先通过索引获取分页所需的主键**，然后再通过**主键查询完整的记录**。这样可以避免深度分页时跳过大量数据的问题。

**步骤1：获取主键列表**

首先，获取所需分页的数据的主键列表，这里假设每页显示10条数据。

```sql
SELECT id
FROM articles
ORDER BY created_at DESC
LIMIT 100000, 10;
```

**步骤2：通过主键列表获取完整数据**

然后，通过获取的主键列表查询完整的数据。

```sql
SELECT id, title, content, created_at
FROM articles
WHERE id IN (/* 上一步获取的 id 列表 */)
ORDER BY created_at DESC;
```



## 用户文件上传经常卡死

- **先从网络层面检查带宽延迟等方面**

  使用命令工具（iftop `iftop -i 网卡名称`）对服务器下的带宽进行了检测，发现卡死情况下仍然有大量带宽的富余，且也能正常ping通ip地址没有延迟说明服务器没有问题

  用户电脑的网络肯定也没有问题

- **服务器性能与负载**

  磁盘，很够用，CPU和内存也没有爆

- **检查负载均衡情况**

  访问 Nacos 控制台，看服务列表。通过具体的服务，查看实例列表，也确认实例数量和健康状态都很正常

- **查看nginx和应用的yml配置也没有对文件大小进行限制**

- 重启应用也无效，之后发现日志提示数据库连接池用完导致整个应用的卡死，经过推测和上传代码推测应该是大文件的上传导致的上时间连接占用和事务提交。而一旦有上传失败可能会导致连接泄漏没有被正常关闭，导致需要经常重启mysql服务

- 一开始查到的解决方法是更换Hikari数据源，但是害怕有未知风险，领导估计也不同意。之后考虑到将对数据库同步的操作可以放到异步的代码块@Async中减少同步带来的问题，并且加上了@Transitinal注解，将数据库操作与上传操作隔离开来，上线后发现仍会有类似情况出现，发现会有五六个G的视频文件被无脑抛上来，最后在服务配置上加上了文件大小上传限制避免过大的文件上时间占用资源。


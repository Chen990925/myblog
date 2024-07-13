# 简历内容总结 `集中式复习`



## 自我介绍：

面试官您好，首先非常感谢贵公司能给我这个面试机会。

我叫陈俊霖，2022年毕业，从事 java 开发工程师已经 3 年了。这几年开发，在之前公司主要涉及的项目包括为达华安保公司开发的考勤排班项目，为杭州政府开发的智汇通信息管理项目和一些小型的项目开发。在开发中主要涉及的框架包括 SpringBoot,SpringCloud,mybatis,mysql,redis 和一些中间件等，能熟练掌握框架间的整合技术

有时候为了项目需求高效开发或者自己技术的进步，也研究学习过一些主流的技术栈：例如网络编程框架（ netty），分布式框架 （zookeeper） 等。前端的技术以前也学习过，比如 前端三件套，Vue 等

平时也喜欢上一些技术网站参与文章发表和交流，国内的包括比如稀土掘金，国外的 github，stackoverflow.也会用这些网站包括当前流行的 AI 技术来解决开发中遇到的难题。

在闲暇时间我会将我的笔记进行分类上传，比如将一些关于技术方面摘录总结的文章和资料自己写一个小 demo 放在自己的网站上，再把自己学习过程中的心得和难题难题给记下来，在一些技术交流群里一起分享交流。

无论工作还是学习，我觉得一个人闷头苦学进步是有限的，只有交流合作才能带来更多的进步和价值



## 具有良好的编码规范和面向对象编程思想

**1. 代码格式与注释**

保持代码的整洁和可读性，使用合适的注释解释复杂逻辑

**2. 使用设计模式**

运用设计模式解决常见问题，提高代码的可维护性和可扩展性。

**3. java三大特性的运用，封装继承多态**

继承实现代码复用，通过多态实现接口的灵活调用，封装保护对象的内部状态



## 熟悉 JVM 工作原理和 GC 机制，对内存区域、垃圾回收机制、类加载过程等都有一定的理

### 堆外内存是什么

Java 虚拟机管理堆之外的内存，称为非堆内存，即堆外内存。有时出于性能或其他需求的考虑，开发者可能希望在堆之外分配和管理内存，这就是堆外内存的用途

**使用堆外内存的原因**

1. **减少垃圾回收的开销**：堆外内存不受JVM垃圾回收器的管理，可以避免频繁的GC带来的性能开销。
2. **管理大型数据结构**：对于需要处理大量数据（如缓存、大型数组）的应用程序，堆外内存可以提供更大的内存空间，而不受JVM堆大小的限制。
3. **共享内存**：堆外内存可以在多个进程之间共享，有助于实现高效的跨进程通信。

**使用堆外内存的方法**

**Java NIO中的`ByteBuffer`**：Java NIO（New I/O）库提供了`ByteBuffer`类，其中可以通过`ByteBuffer.allocateDirect`方法分配堆外内存。

```java
ByteBuffer buffer = ByteBuffer.allocateDirect(1024);
```

**注意事项**

- **手动管理内存**：堆外内存的分配和释放需要手动管理，可能会导致内存泄漏。
- **安全性**：直接操作内存可能会引发安全问题，如缓冲区溢出。





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

```
MethodInterceptor环绕通知 `, `Interceptor拦截器
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

### 策略模式



### 模板方法模式





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



## token,session,cookie的异同

https://blog.csdn.net/weixin_42672802/article/details/132511713

**session** **和 cookie 区别：**

・   数据存放位置不同：Session 数据是存在服务器中的，cookie 数据存放在浏览器当中。

・   安全程度不同：cookie 放在服务器中不是很安全，session 放在服务器中，相对安全。

・   性能使用程度不同：session 放在服务器上，访问增多会占用服务器的性能；考虑到减轻服务器性能方面，应使用 cookie。

・   数据存储大小不同：单个 cookie 保存的数据不能超过 4K，session 存储在服务端，根据服务器大小来定。

**token** **和 session 区别：**

・   token 是开发定义的，session 是 [http 协议](https://so.csdn.net/so/search?q=http协议&spm=1001.2101.3001.7020)规定的；

・   token 不一定存储，session 存在服务器中；

・   token 可以跨域，session 不可以跨域，它是与域名绑定的。



## 熟悉 Java 集合框架，包括 List、Map、Set 等常用集合类型，了解其内部实现和适用场景

### Map：

 是 Java 集合框架中的一个常用类，用于存储键值对。它是基于哈希表实现的，提供了快速的查找、插入、删除操作

**基本结构**

**哈希表**：`HashMap` 使用一个数组（称为“桶”）和链表或红黑树的结合来存储数据。每个桶对应一个哈希值，存储该哈希值的键值对。

数组 + 链表/红黑树：

当哈希冲突较少时，使用链表存储冲突的键值对。

当链表长度超过一定阈值（默认为 8）时，链表会转换为红黑树，以提高查找和插入性能。

**工作原理**

**计算哈希值**：

- 使用键的 `hashCode()` 方法计算哈希值，然后通过取模运算确定键值对存储的位置（桶索引）。

**存储键值对**：

- 将键值对存储在对应的桶中，如果桶中已有数据，则以链表或红黑树的形式存储。

**查找键值对**：

- 通过计算哈希值找到对应的桶，然后在桶内通过 `equals()` 方法匹配键，找到对应的值。

**特点**

- **允许 null 值**：`HashMap` 允许存储一个 null 键和多个 null 值。
- **非线程安全**：`HashMap` 不是线程安全的，多线程环境下需要使用 `Collections.synchronizedMap` 或 `ConcurrentHashMap`。
- **性能**：`HashMap` 提供 O(1) 时间复杂度的查找、插入和删除操作，但在最坏情况下（所有键值对都落在同一个桶中）性能会下降到 O(n)。

**细节优化**

- **扩容**：当负载因子（默认是 0.75）达到阈值时，`HashMap` 会进行扩容，创建一个更大的数组，并重新分配所有键值对的位置。
- **性能优化**：Java 8 引入红黑树以替代链表，优化了在大量哈希冲突情况下的性能。

**典型应用场景**

- **缓存**：用于存储频繁访问的数据，提高读取速度。
- **计数器**：用于统计元素出现的次数。
- **查找表**：快速查找某个键对应的值。



### List

`List` 是一个接口，它定义了一种有序的集合

ArrayList:`ArrayList` 是基于动态数组实现的，它的原理主要体现在以下几个方面：

**动态数组**：

- 初始容量：`ArrayList` 有一个默认的初始容量（通常为 10）。
- 扩容机制：当数组满时，`ArrayList` 会创建一个更大的数组（通常是当前容量的 1.5 倍），然后将旧数组中的元素复制到新数组中。

**访问速度**：

- 通过索引访问元素的时间复杂度为 O(1)，因为可以直接通过索引访问数组中的元素。
- 插入和删除操作（尤其是在中间位置）可能需要移动数组中的元素，时间复杂度为 O(n)。

**线程不安全**：

- `ArrayList` 不是线程安全的，适用于单线程环境。在多线程环境下可以使用 



**LinkedList**：`LinkedList` 是基于双向链表实现的，它的原理主要体现在以下几个方面：

**双向链表**：

- 每个元素（节点）包含指向前一个和后一个元素的指针。
- 可以在常数时间内在链表的头部或尾部进行插入和删除操作。

**访问速度**：

- 通过索引访问元素的时间复杂度为 O(n)，因为需要从头开始遍历链表找到指定位置。
- 插入和删除操作的时间复杂度为 O(1)，只需调整相邻节点的指针。

**线程不安全**：

- `LinkedList` 不是线程安全的，适用于单线程环境。



### Set:

它内部基于 `HashMap` 实现，具有以下结构和特点：

**内部实现**：

- `HashSet` 依赖于 `HashMap`，其中元素存储在 `HashMap` 的键（Key）部分，而值（Value）部分是一个固定的常量对象。
- 每个元素在插入时，通过其 `hashCode` 方法计算哈希值，然后放置在相应的哈希桶（bucket）中。

**无序集合**：

- 元素在 `HashSet` 中是无序的，插入顺序和遍历顺序可能不同。
- 元素的顺序由其哈希值决定，因此即使多次插入相同的元素，顺序也可能不同。

**唯一性**：`HashSet` 确保每个元素的唯一性。插入元素时，会先检查是否已经存在相同的元素（通过 `equals` 方法判断），如果存在则不插入。

**性能**：`HashSet` 提供常数时间的基本操作（增、删、查），平均情况下，增、删、查的时间复杂度为 O(1)。



### HashMap1.7和1.8区别

**性能**：JDK 1.8 的 HashMap 在处理大量哈希冲突时性能更优，因为使用红黑树代替链表来存储冲突的元素。

**插入顺序**：JDK 1.8 采用尾插法，避免了头插法可能导致的链表反转问题，便于迭代。

**扩容优化**：重新计算哈希值的效率更高。



## 熟悉 Java 并发编程，深入理解 volatile、synchronized 锁升级、CAS、线程池等，并在项目中有实际应用

### volatile

`volatile` 是 Java 中的一个轻量级同步机制，用于保证变量的可见性。一个 `volatile` 变量有以下特性：

**可见性**：

- 当一个线程修改 `volatile` 变量时，其他线程可以立即看到这个修改。
- 防止了线程从缓存中读取旧值，保证了变量的最新值总是从主存中读取。

**禁止指令重排序**：

- `volatile` 变量禁止指令重排序优化。确保在访问 `volatile` 变量之前的所有写操作都不会被编译器和 CPU 重排序到访问 `volatile` 变量之后。



### `synchronized` 关键字

`synchronized` 是 Java 中的一种锁机制，用于控制对某个对象或代码块的访问。它保证了同一时刻只有一个线程可以执行被同步的方法或代码块，从而实现了原子性和可见性。

**方法同步**：

- `synchronized` 可以用于方法，锁定的是当前对象（实例方法）或类对象（静态方法）。

**代码块同步**：

- `synchronized` 可以用于代码块，锁定的是指定的对象。

**锁升级过程**

**初始状态**：对象头中的锁标志位为 01（无锁状态）。

**偏向锁**：当第一个线程访问同步块时，JVM 会将对象头的锁标志位设置为 01，并记录线程 ID。如果没有竞争，线程会一直持有偏向锁。

**轻量级锁**：当另一个线程尝试获取偏向锁时，JVM 会撤销偏向锁，并将其升级为轻量级锁，锁标志位变为 00。

**重量级锁**：如果轻量级锁的竞争依然存在，且自旋次数超过一定阈值，则轻量级锁会膨胀为重量级锁，锁标志位变为 10。



### CAS 机制

CAS（Compare-And-Swap）是一种用于实现同步的原子操作。它包含三个操作数：内存位置（V）、预期旧值（A）和新值（B）。CAS 操作在更新某个变量时，只有当变量的当前值等于预期旧值时，才会将其更新为新值，否则不做任何操作。

1. **原子性**：
   - CAS 操作是原子的，硬件支持这个操作，使得它在多线程环境中非常高效。
2. **实现乐观锁**：
   - CAS 是一种乐观锁机制，假设没有其他线程会对变量进行修改，因此无需使用传统的锁机制，避免了线程阻塞和上下文切换





## redisson分布式锁的底层实现

**加锁机制核心**：LUA脚本实现原子性（ SETNX（SET if Not eXists））

当锁超时时间为 -1 时，而且获取锁成功时，会启动看门狗定时任务自动续锁

**看门狗机制**：后台定时任务线程，获取锁成功之后，会将持有锁的线程放入到一个 **RedissonBaseLock.EXPIRATION_RENEWAL_MAP** 里面，然后每隔 10 秒 （internalLockLeaseTime / 3） 检查一下，如果客户端 1 还持有锁 key（判断客户端是否还持有 key，其实就是遍历 **EXPIRATION_RENEWAL_MAP** 里面线程 id 然后根据线程 id 去 Redis 中查，如果存在就会延长 key 的时间），那么就会不断的延长锁 key 的生存时间。

> 加锁后放到map，启动看门狗线程，定时检查map：存在则续期expire，没有则关闭线程

**锁释放机制**：删除redis数据，删除map中内容，取消看门狗



# 项目部分

## 分布式定时任务

### 执行失败补救

- 人工干预和手动修复
- 任务重试机制，线程等待

### 定时任务重复执行了

- **任务锁机制**：执行前获取某个锁
- **任务状态标记**：执行过的任务修改状态



## 以实际项目使用rocketMQ

业务逻辑：

员工打卡第一次发送消息到broker，之后发送到消费者服务器进行处理。以第一次打卡内的MessageId，存储员工工号和时间信息来做幂等处理，消费掉后对班组打卡信息进行异步修改

保证高可用：

设置了消息重试次数，和设置Sentinel设置限流降级策略，我认为简单过于简单粗暴了，因为也会有服务器宕机导致消息丢失的风险

可以使用rocketMQ的事务消息来保证消息最终都会被消费。



## 通过注解和 AOP 来实现接口的鉴权管理

`@JudgmentEmployExist(isUser = true)`，给这个接口加参数，

比如`@JudgmentEmployExist(isUser = true)`代表有用户登录时可以访问接口，

`@JudgmentEmployExist(isUser = true，type={"monitor"})`代表有用户登录时且用户为班长时可以访问接口，`@JudgmentEmployExist(isUser = true，type={"monitor"，"administrators"})`代表有用户登录时且用户为班长或者管理员时可以访问接口

**首先，修改`JudgmentEmployExist`注解，添加`type`参数。**

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface JudgmentEmployExist {
    boolean isUser() default false;
    String[] type() default {};
}
```

**修改切面类**

**在`EmployAspect`类中，根据注解的`type`参数进行相应的权限检查。**

```java
@Aspect
@Component
@Lazy(false)
public class EmployAspect {

    private static final Logger logger = LoggerFactory.getLogger(EmployAspect.class);

    public EmployAspect() {
    }

    @Pointcut("@annotation(com.zghzbckj.base.annotation.JudgmentEmployExist)")
    private void cutMethod() {
    }

    @Around("cutMethod()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        JudgmentEmployExist annotation = this.getDeclaredAnnotation(joinPoint);
        if (annotation != null) {
            if (annotation.isUser()) {
                OurwaySysEmploys employs = UserInfoContext.getUser();
                if (TextUtils.isEmpty(employs)) {
                    logger.warn("Current user does not exist");
                    return ResponseMessage.sendError(ResponseMessage.FAIL, "当前用户不存在");
                }

                // 获取用户角色
                List<String> userRoles = employs.getRoles(); // 假设getRoles()返回用户角色列表
                List<String> requiredRoles = Arrays.asList(annotation.type());

                // 检查用户角色是否符合要求
                if (!requiredRoles.isEmpty() && requiredRoles.stream().noneMatch(userRoles::contains)) {
                    logger.warn("User does not have the required role(s): " + requiredRoles);
                    return ResponseMessage.sendError(ResponseMessage.FAIL, "用户权限不足");
                }
            }
        }

        try {
            return joinPoint.proceed();
        } catch (Throwable throwable) {
            logger.error("Error executing method: " + joinPoint.getSignature().getName(), throwable);
            throw throwable;
        }
    }

    private JudgmentEmployExist getDeclaredAnnotation(ProceedingJoinPoint joinPoint) throws NoSuchMethodException {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        return method.getDeclaredAnnotation(JudgmentEmployExist.class);
    }
}
```



## 项目中线程池具体使用

**1.核心线程数（corePoolSize）：**核心线程数是线程池在空闲时始终保持的线程数，即使这些线程没有任务可执行。通常设置为系统中CPU核心数的适当倍数，以确保线程资源的充分利用。

> 服务器是4核，核心线程数设置为8

**2.最大线程数（maximumPoolSize）**：线程池能够容纳的最大线程数。在任务数量激增时，线程池会创建新线程直到达到最大线程数。应合理设置以防止过多的线程争抢CPU资源。

> 考虑到有大量 I/O 操作，最大线程数设置的24来提高吞吐量

**3.线程空闲时间（keepAliveTime）**：非核心线程的空闲时间。当线程池中的线程数超过核心线程数时，如果这些线程空闲时间超过`keepAliveTime`，则会被终止和回收。可以通过设置空闲时间来控制线程的生命周期。

> 10s

**4.任务队列（workQueue）**：用于保存等待执行的任务的队列。常用的队列类型有：

- `LinkedBlockingQueue`：基于链表的有界队列，适用于多数情况。
- `ArrayBlockingQueue`：基于数组的有界队列，性能较好但需要指定容量。
- `SynchronousQueue`：不存储任务，每次插入操作必须等待相应的删除操作，适用于任务量大且每个任务执行时间短的场景。
- `PriorityBlockingQueue`：基于优先级的无界队列，任务会按优先级排序。

> 初始设置 3000；没改过

**6.线程工厂（ThreadFactory）**：用于创建新线程。可以通过实现自定义的`ThreadFactory`来设置线程名称、优先级等属性，以便更好地管理和调试。

**7.拒绝策略（RejectedExecutionHandler）**：当线程池和队列都满时，采取的拒绝策略。常用的拒绝策略有：

- `AbortPolicy`：默认策略，抛出`RejectedExecutionException`。
- `CallerRunsPolicy`：由调用线程处理该任务。
- `DiscardPolicy`：直接丢弃任务，不予处理。
- `DiscardOldestPolicy`：丢弃队列中最旧的任务，然后重新尝试执行任务。

> 在任务被拒绝时由调用线程处理，这样可以减少任务丢失的风险

**注意事项**

1. **监控线程池状态**：定期监控线程池的状态（如任务完成数、活跃线程数、队列大小等），及时调整参数。

2. **任务超时机制**：为每个请求B服务的任务设置超时机制，防止某个任务长期占用线程。

   > `CompletableFuture`提供了`orTimeout`方法，可以设置任务的超时时间。

3. **异常处理**：确保每个任务内部处理异常，防止因异常导致线程提前终止。

   > `exceptionally`使用来抛出异常

4. **资源释放**：在适当的时候调用`executor.shutdown()`，确保所有任务完成后线程池正确关闭，释放资源。

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



## 使用策略和模板方法设计模式对自定义easyExcel的合并单元格策略MergeStrategy并导出方法进行优化重构

将**计算分组**，**设置单元格样式**和**写入excel文件**的重复代码使用模板方法抽象一个类中并且调用一个方法就能实现。

```java
public abstract class OrderProcessor {
    public final void processOrder(Order order) {
        计算分组(order);
        设置单元格样式(order);
        导出excel文件(order);
    }

    protected abstract void 计算分组(Order order);
    protected abstract void 设置单元格样式(Order order);
    protected abstract void 导出excel文件(Order order);
}
```

在使用的时候根据需要合并的单元格列数来自动选择方法

```java
public class NoDiscountStrategy implements DiscountStrategy {
    @Override
    public void applyDiscount(Order order) {
        // 合并第一列
    }
}

public class SeasonalDiscountStrategy implements DiscountStrategy {
    @Override
    public void applyDiscount(Order order) {
         // 合并第二列
    }
}

public class MemberDiscountStrategy implements DiscountStrategy {
    @Override
    public void applyDiscount(Order order) {
        // 合并第三列
    }
}
```

策略引入处理

```java
public class StrategyBasedOrderProcessor extends OrderProcessor {
    private final DiscountStrategy discountStrategy;

    public StrategyBasedOrderProcessor(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    @Override
    protected void validateOrder(Order order) {
        // 计算分组(order);
    }

    @Override
    protected void applyDiscount(Order order) {
        discountStrategy.applyDiscount(order);
    }

    @Override
    protected void processPayment(Order order) {
        // 设置单元格样式(order);
    }

    @Override
    protected void sendNotification(Order order) {
        // 导出excel文件(order);
    }
}
```

使用

```java
//新建一个模板方法实现的类（OrderProcessor）,再根据传入的seasonalDiscount来选择合并前两列，
OrderProcessor strategyOrderProcessor = new StrategyBasedOrderProcessor(seasonalDiscount);
//根据参数进行方法执行
strategyOrderProcessor.processOrder(regularOrder);
```







# 分界线

---



## 1.为什么SpringBoot的jar可以直接运行?

1. SpringBoot提供了一个插件spring-boot-maven-plugin用于把程序打包成一个可执行的jar包。
2. Spring Boot应用打包之后，生成一个Fat jar(jiar包中包含iar)，包含了应用依赖的jar包和Spring Boot loader相关的类。
3. java -iar会去找iar中的**manifest**文件，在那里面找到真正的启动类(Main-Class)
4. Fat iar的启动Main函数是Jaraunchet;它负责创建一个LaunchedURLClassLoader来加载boot-ib下面的iar，并以一个新线程启动应用的Main函数。





## 2.什么是分布式事务？

分布式事务是一种涉及多个独立资源（如数据库、消息队列、微服务等）协调一致的事务处理机制

事务需要跨越多个服务或数据源

分布式事务是指跨越多个独立的数据源或服务的事务操作，需要确保这些操作要么全部成功，要么全部失败，以保持数据的一致性。分布式事务常见于微服务架构、分布式系统和跨多个数据库的应用场景中。

### 分布式事务的实现方式

1. **两阶段提交协议（2PC）**

- **准备阶段**：协调者向所有参与者发送准备请求，所有参与者预备提交并锁定资源。
- **提交阶段**：如果所有参与者都准备好了，协调者发送提交请求；否则发送回滚请求。

2. **三阶段提交协议（3PC）**

- **CanCommit 阶段**：协调者询问参与者是否可以提交。
- **PreCommit 阶段**：如果所有参与者响应可以提交，协调者发送预提交请求。
- **DoCommit 阶段**：协调者发送正式提交请求。

3. **基于消息队列的事务（如 TCC）**

- **Try**：预留资源。
- **Confirm**：确认操作。
- **Cancel**：取消操作。

4. **Saga 模式**

将长事务拆分为一系列短事务，通过补偿操作来撤销已完成的步骤，以保证最终一致性。

**适用场景**

- **跨多个数据库**：需要在多个数据库上执行事务操作。
- **微服务架构**：多个独立服务需要共同完成一个事务。
- **分布式系统**：分布在不同节点上的操作需要保证一致性。

**优点和挑战**

- **优点**：保证数据一致性、提高系统可靠性。
- **挑战**：实现复杂、性能开销大、可能出现部分失败情况。





## 3.Spring事务

**声明式事务**

声明式事务是通过配置文件或注解的方式声明事务管理，而无需在代码中显式地编写事务管理逻辑。主要使用注解（如 `@Transactional`）或 XML 配置来声明。

- **简单事务处理**：在应用层或服务层中需要事务管理，但不需要复杂的事务控制逻辑。
- **保持代码简洁**：希望业务逻辑与事务管理解耦，避免在代码中夹杂大量的事务处理代码。



**编程式事务**

编程式事务是通过显式地在代码中使用事务管理 API 来管理事务。例如，使用 `PlatformTransactionManager` 和 `TransactionTemplate` 进行编程控制。

- **复杂事务处理**：需要在事务中执行复杂的逻辑控制，如条件提交、回滚等。
- **动态事务管理**：根据运行时条件动态控制事务的行为。



## 4.声明式事务失效场景

声明式事务（@Transactional）在以下场景中可能会失效：

1. **方法不是public**：`@Transactional` 仅对 `public` 方法有效，如果方法是 `private`, `protected`, 或 `default`，事务将不起作用。
2. **同类内部方法调用**：如果在同一个类中调用 `@Transactional` 标注的方法，Spring AOP 代理不会生效。
3. **非 Spring 管理的对象调用**：如果事务方法由非 Spring 管理的对象调用，事务将不会生效。**配置错误**：事务管理器或数据源配置错误会导致事务失效。
4. **嵌套事务**：默认情况下，嵌套事务不支持嵌套方法回滚，需配置 `PROPAGATION_NESTED`。




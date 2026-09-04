---
group: Zookeeper专题
title: zookeeper客户端使用
order: 2
---

# zookeeper客户端使用

## **项目构建**

zookeeper 官方的客户端没有和服务端代码分离，他们为同一个 jar 文件，所以我们直接引入 zookeeper 的 maven 即可

> 这里版本请保持与服务端版本一致，不然会有很多兼容性的问题！

```xml
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.8</version>
</dependency>
```

### **创建客户端实例：**

为了便于测试，直接在初始化方法中创建 zookeeper 实例

```java
@Slf4j
public class ZookeeperClientTest {
    private static final String ZK_ADDRESS="192.168.109.200:2181";
    private static final int SESSION_TIMEOUT = 5000;
    private static ZooKeeper zooKeeper;
    //表示ZooKeeper中的一个节点路径
    private static final String ZK_NODE="/zk-node";
 
    @Before
    public void init() throws IOException, InterruptedException {
        //ZooKeeper中建立连接是异步的,所以使用CountDownLatch进行同步
        final CountDownLatch countDownLatch=new CountDownLatch(1);
        //建了一个ZooKeeper客户端实例，连接到指定的ZooKeeper服务器地址，并指定了会话超时时间SESSION_TIMEOUT。同时，通过Lambda表达式定义了一个Watcher，用于监听连接状态变化
        zooKeeper=new ZooKeeper(ZK_ADDRESS, SESSION_TIMEOUT, event -> {
            //检查Watcher监听的事件状态是否为已连接（SyncConnected）
            if (event.getState()== Watcher.Event.KeeperState.SyncConnected &&
                //同时检查事件类型是否为None，表示连接建立完成
                    event.getType()== Watcher.Event.EventType.None){
                countDownLatch.countDown();
                log.info("连接成功！");
            }
        });
        log.info("连接中....");
        //等待直到连接成功，即直到 countDownLatch 中的计数为0
        countDownLatch.await();
    }
}
```

### 创建 Zookeeper 实例的方法和参数

```java
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, ZKClientConfig)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly, HostProvider)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly, HostProvider, ZKClientConfig)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly, ZKClientConfig)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, long, byte[])
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, long, byte[], boolean, HostProvider)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, long, byte[], boolean, HostProvider, ZKClientConfig)
ZooKeeper(String connectString, int  sessionTimeout, Watcher watcher, long, byte[], boolean)
```

| 参数名称                   | 含义                                                         |
| -------------------------- | ------------------------------------------------------------ |
| connectString              | ZooKeeper 服务器列表，由英文逗号分开的 host:port 字符串组成，每一个都代表一台 ZooKeeper 机器，如，host1:port1,host2:port2,host3:port3。另外，也可以在 connectString 中设置客户端连接上 ZooKeeper后的根目录，方法是在 host:port 字符串之后添加上这个根目录，例如，host1:port1,host2:port2,host3:port3/zk-base, 这样就指定了该客户端连接上 ZooKeeper 服务器之后，所有对 ZooKeeper的操作，都会基于这个根目录。例如，客户端对 /sub-node 的操作，最终创建 /zk-node/sub-node, 这个目录也叫 Chroot，即客户端隔离命名空间。 |
| sessionTimeout             | 会话的超时时间，是一个以 “毫秒” 为单位的整型值。在 ZooKeeper 中有会话的概念，在一个会话周期内，ZooKeeper 客户端和服务器之间会通过心跳检测机制来维持会话的有效性，一旦在 sessionTimeout 时间内没有进行有效的心跳检测，会话就会失效。 |
| watcher                    | ZooKeeper 允许客户端在构造方法中传入一个接口 watcher (org.apache. zookeeper.Watcher) 的实现类对象来作为默认的 Watcher 事件通知处理器。当然，该参数可以设置为 null 以表明不需要设置默认的 Watcher 处理器。 |
| canBeReadOnly              | 这是一个 boolean 类型的参数，用于标识当前会话是否支持 “read-only (只读)” 模式。默认情况下，在 ZooKeeper 集群中，一个机器如果和集群中过半及以上机器失去了网络连接，那么这个机器将不再处理客户端请求（包括读写请求)。但是在某些使用场景下，当 ZooKeeper 服务器发生此类故障的时候，我们还是希望 ZooKeeper 服务器能够提供读服务（当然写服务肯定无法提供）——这就是 ZooKeeper 的 “read-only” 模式。 |
| sessionId 和 sessionPasswd | 分别代表会话 ID 和会话秘钥。这两个参数能够唯一确定一个会话，同时客户端使用这两个参数可以实现客户端会话复用，从而达到恢复会话的效果。具体使用方法是，第一次连接上 ZooKeeper 服务器时，通过调用 ZooKeeper 对象实例的以下两个接口，即可获得当前会话的 ID 和秘钥:long getSessionId();byte[]getSessionPasswd( );荻取到这两个参数值之后，就可以在下次创建 ZooKeeper 对象实例的时候传入构造方法了 |

###  同步创建节点：

```java
@Test
public void createTest() throws KeeperException, InterruptedException {
//ZK_NODE: 这是要创建的节点的路径。在这里，它是一个字符串常量，表示要创建的节点的路径。
//"data".getBytes(): 这是节点的初始数据。在这里，它是一个包含字符串"data"的字节数组。当节点创建时，它会与节点关联，其他客户端可以读取该数据。
//ZooDefs.Ids.OPEN_ACL_UNSAFE: 这是访问控制列表（ACL），用于控制对节点的访问权限。ZooDefs.Ids.OPEN_ACL_UNSAFE 是 //ZooKeeper 提供的一个预定义的 ACL，它允许任何人都能对节点进行任何操作（包括读、写、删除等），因此被称为"不安全"。在生产环境中，你通常会使用更安全的 ACL。
//CreateMode.PERSISTENT: 这是节点的创建模式。在这里，它指定要创建的节点是持久节点，即该节点创建后将一直存在，直到显式删除。
    String path = zooKeeper.create(ZK_NODE, "data".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    log.info("created path: {}",path);
}
```

 

### 异步创建节点：

**异步方式创建节点**：与之前的同步方式不同，这个方法是异步的。也就是说，当调用 `zooKeeper.create()` 方法时，它会立即返回，而不会等待节点创建完成。

**通过将回调函数传入 `zooKeeper.create()` 方法，可以使节点创建操作变成异步的，不会阻塞当前线程的执行**

在 `zooKeeper.create()` 方法的最后一个参数位置上，传入了一个回调函数 `(rc, path, ctx, name) -> log.info("rc {},path {},ctx {},name {}", rc, path, ctx, name)`。这个回调函数会在节点创建操作完成后被调用，用于处理创建结果。参数 `rc` 表示操作结果码，`path` 表示创建的节点路径，`ctx` 表示上下文信息（在这里是字符串"context"`)，`name` 表示创建的节点的实际路径。在这个回调函数中，使用了日志记录器来输出操作结果

```java
@Test
public void createAsycTest() throws InterruptedException {
     zooKeeper.create(ZK_NODE, "data".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE,
             CreateMode.PERSISTENT,
             (rc, path, ctx, name) -> log.info("rc  {},path {},ctx {},name {}",rc,path,ctx,name),"context");
    //为了保持程序运行，使用了 TimeUnit.SECONDS.sleep(Integer.MAX_VALUE)，这使得程序会一直等待直到被手动终止
    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
```

> `TimeUnit.SECONDS.sleep(Integer.MAX_VALUE)` 调用可以保持程序运行的原因在于 `sleep()` 方法会让当前线程休眠指定的时间。在这里，传入了 `Integer.MAX_VALUE`，即 2^31 - 1 秒的时间，这几乎是 68 年。这段时间对于程序来说是足够长的，几乎相当于永远。因此，程序将会一直休眠，保持运行状态，直到被手动终止或发生了某种异常

### 修改节点数据

首先，通过调用 `zooKeeper.getData()` 方法**获取指定节点的数据**。`zooKeeper.getData(ZK_NODE, false, stat)` 中的参数包括：

- `ZK_NODE`：表示要获取数据的节点路径。
- `false`：表示不需要监听节点的变化。
- `stat`：用于存储节点的元数据信息，如数据版本号等

**更新节点数据**：接下来，使用 `zooKeeper.setData()` 方法来更新节点的数据。`zooKeeper.setData(ZK_NODE, "changed!".getBytes(), stat.getVersion())` 中的参数包括：

- `ZK_NODE`：表示要更新数据的节点路径。
- `"changed!".getBytes()`：表示要更新的新数据，这里将字符串"changed!"转换为字节数组作为新的节点数据。
- `stat.getVersion()`：**表示要更新的节点的版本号，确保在更新时节点的版本号与当前一致，以免发生数据冲突。**

```java
@Test
public void setTest() throws KeeperException, InterruptedException {
    Stat stat = new Stat();
    byte[] data = zooKeeper.getData(ZK_NODE, false, stat);
    log.info("修改前: {}",new String(data));
    zooKeeper.setData(ZK_NODE, "changed!".getBytes(), stat.getVersion());
     byte[] dataAfter = zooKeeper.getData(ZK_NODE, false, stat);
    log.info("修改后: {}",new String(dataAfter));
}
```



## Curator

Curator 是一套由 netflix 公司开源的，Java 语言编程的 ZooKeeper 客户端框架，Curator 项目是现在 ZooKeeper 客户端中使用最多，对 ZooKeeper 版本支持最好的第三方客户端，并推荐使用，**Curator 把我们平时常用的很多 ZooKeeper 服务开发功能做了封装**，例如 Leader 选举、分布式计数器、分布式锁。这就减少了技术人员在使用 ZooKeeper 时的大部分底层细节开发工作。

在会话重新连接、Watch 反复注册、多种异常处理等使用场景中，用原生的 ZooKeeper 处理比较复杂。而在使用 Curator 时，由于其对这些功能都**做了高度的封装，使用起来更加简单，不但减少了开发时间，而且增强了程序的可靠性**。

**使用**

以 Maven 工程为例，首先要引入 Curator 框架相关的开发包，这里为了方便测试引入了 junit ，lombok，由于 Zookeeper 本身以来了 log4j 日志框架，所以这里可以创建对应的 log4j 配置文件后直接使用。

 如下面的代码所示，我们通过将 Curator 相关的引用包配置到 Maven 工程的 pom 文件中，将 Curaotr 框架引用到工程项目里，在配置文件中分别引用了两个 Curator 相关的包，第一个是 curator-framework 包，该包是对 ZooKeeper 底层 API 的一些封装。另一个是 curator-recipes 包，该包封装了一些 ZooKeeper 服务的高级特性，如：Cache 事件监听、选举、分布式锁、分布式 Barrier。

```xml
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.8</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.8</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
```

 

### **会话创建**

要进行客户端服务器交互，第一步就要创建会话

Curator 提供了多种方式创建会话，比如用静态工厂方式创建： 

- **RetryPolicy**: `RetryPolicy` 定义了在连接到 ZooKeeper 服务器时发生错误时的重试策略。在这里，使用了 `ExponentialBackoffRetry`，这是一种指数退避重试策略。构造函数的参数含义如下：

  - `baseSleepTimeMs`：初始休眠时间（毫秒），即第一次重试失败后等待的时间。

  - `maxRetries`：最大重试次数，即最多尝试连接的次数（包括第一次尝试）。

  - `maxSleepMs`：最大休眠时间（毫秒），即每次重试等待的最长时间。在这里未指定，使用默认值

  这个设置表示，如果连接失败，Curator 将会进行最多 3 次重试，每次重试等待时间为初始 1000 毫秒的指数增长

- **CuratorFramework**: `CuratorFramework` 是 Apache Curator 提供的一个用于与 ZooKeeper 交互的高级客户端。通过 `CuratorFrameworkFactory.newClient()` 方法创建一个新的客户端实例。参数包括：

  - `zookeeperConnectionString`：ZooKeeper 服务器的连接字符串，用于指定要连接的 ZooKeeper 服务器的地址和端口。
  - `retryPolicy`：前面创建的重试策略对象，用于定义连接失败时的重试行为。

- **start()**: 最后，调用 `start()` 方法启动 Curator 客户端。一旦客户端启动，它将尝试连接到指定的 ZooKeeper 服务器，并在需要时执行重试策

```java
// 重试策略 
RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3)
//String zookeeperConnectionString = "localhost:2181";
CuratorFramework client = CuratorFrameworkFactory.newClient(zookeeperConnectionString, retryPolicy);
client.start();
```

或者使用 fluent`流式` 风格创建

```java
RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
CuratorFramework client = CuratorFrameworkFactory.builder()
                .connectString("192.168.128.129:2181")
                .sessionTimeoutMs(5000)  // 会话超时时间
                .connectionTimeoutMs(5000) // 连接超时时间
                .retryPolicy(retryPolicy)
                .namespace("base") // 包含隔离名称
                .build();
client.start();
```

这段代码的编码风格采用了流式方式，最核心的类是 **CuratorFramework** 类

**该类的作用是定义一个 ZooKeeper 客户端对象**，并在之后的上下文中使用。

在定义 CuratorFramework 对象实例的时候，我们使用了 CuratorFrameworkFactory 工厂方法，并指定了 connectionString 服务器地址列表、retryPolicy 重试策略 、sessionTimeoutMs 会话超时时间、connectionTimeoutMs 会话创建超时时间。分别对这几个参数进行讲解：

- connectionString：服务器地址列表，在指定服务器地址列表的时候可以是一个地址，也可以是多个地址。如果是多个地址，那么每个服务器地址列表用逗号分隔，如  host1:port1,host2:port2,host3；port3 。 

- retryPolicy：重试策略，当客户端异常退出或者与服务端失去连接的时候，可以通过设置客户端重新连接 ZooKeeper 服务端。

  而 Curator 提供了 一次重试、多次重试等不同种类的实现方式。

  在 Curator 内部，可以通过判断服务器返回的 keeperException 的状态代码来判断是否进行重试处理，如果返回的是 OK 表示一切操作都没有问题，而 SYSTEMERROR 表示系统或服务端错误。

  | **策略名称**                | **描述**                             |
  | --------------------------- | ------------------------------------ |
  | **ExponentialBackoffRetry** | 重试一组次数，重试之间的睡眠时间增加 |
  | RetryNTimes                 | 重试最大次数                         |
  | RetryOneTime                | 只重试一次                           |
  | RetryUntilElapsed           | 在给定的时间结束之前重试             |

- 超时时间：Curator 客户端创建过程中，有两个超时时间的设置。

  - 一个是 sessionTimeoutMs 会话超时时间，用来设置该条会话在 ZooKeeper 服务端的失效时间。
  - 另一个是 connectionTimeoutMs 客户端创建会话的超时时间，用来限制客户端发起一个会话连接到接收 ZooKeeper 服务端应答的时间。

  sessionTimeoutMs 作用在服务端，而 connectionTimeoutMs 作用在客户端。



### **创建节点**

创建节点的方式如下面的代码所示，回顾我们之前课程中讲到的内容，描述一个节点要包括节点的类型，即临时节点还是持久节点、节点的数据信息、节点是否是有序节点等属性和性质。

> 1. **EPHEMERAL（临时节点）**：创建一个临时节点。当客户端会话结束或客户端与 ZooKeeper 服务器断开连接时，这个节点会被自动删除。
> 2. **EPHEMERAL_SEQUENTIAL（临时顺序节点）**：与临时节点类似，但节点的名称会附加一个单调递增的数字后缀，以保证节点名称的唯一性。
> 3. **PERSISTENT_SEQUENTIAL（持久顺序节点）**：与持久节点类似，但节点的名称会附加一个单调递增的数字后缀，以保证节点名称的唯一性。
>
> 这些模式可以通过 `CreateMode` 枚举来指定，例如：
>
> - `CreateMode.EPHEMERAL`
> - `CreateMode.EPHEMERAL_SEQUENTIAL`
> - `CreateMode.PERSISTENT_SEQUENTIAL`

```java
 @Test
public void testCreate() throws Exception {
    String path = curatorFramework.create().forPath("/curator-node");
    curatorFramework.create().withMode(CreateMode.PERSISTENT).forPath("/curator-node","some-data".getBytes())
    log.info("curator create node :{}  successfully.",path);
}
```

在 Curator 中，可以使用 create 函数创建数据节点，**并通过 withMode 函数指定节点类型**（持久化节点，临时节点，顺序节点，临时顺序节点，持久化顺序节点等），默认是持久化节点，**之后调用 forPath 函数来指定节点的路径和数据信息**。

**一次性创建带层级结构的节点**

`creatingParentsIfNeeded()`:  如果指定路径中的父节点不存在，会自动创建父节点

```java
@Test
public void testCreateWithParent() throws Exception {
    String pathWithParent="/node-parent/sub-node-1";
    String path = curatorFramework.create().creatingParentsIfNeeded().forPath(pathWithParent);
    log.info("curator create node :{}  successfully.",path);
}
```



### **获取数据**

**getData().forPath()**

```java
@Test
public void testGetData() throws Exception {
    byte[] bytes = curatorFramework.getData().forPath("/curator-node");
    log.info("get data from  node :{}  successfully.",new String(bytes));
}
```



### **更新节点**

我们通过客户端实例的 **setData ()** 方法更新 ZooKeeper 服务上的数据节点，在 setData 方法的后边，**通过 forPath 函数来指定更新的数据节点路径以及要更新的数据**。

`setData ().forPath(节点路径，数据)`

```java
@Test
public void testSetData() throws Exception {
    curatorFramework.setData().forPath("/curator-node","changed!".getBytes());
    byte[] bytes = curatorFramework.getData().forPath("/curator-node");
    log.info("get data from  node /curator-node :{}  successfully.",new String(bytes));
}
```



### **删除节点**

```java
@Test
public void testDelete() throws Exception {
    String pathWithParent="/node-parent";
    curatorFramework.delete().guaranteed().deletingChildrenIfNeeded().forPath(pathWithParent);
}
```

- **guaranteed：该函数的功能如字面意思一样，主要起到一个保障删除成功的作用**，其底层工作方式是：只要该客户端的会话有效，就会在后台持续发起删除请求，直到该数据节点在 ZooKeeper 服务端被删除。

- deletingChildrenIfNeeded：指定了该函数后，系统在删除该数据节点的时候**会以递归的方式直接删除其子节点**，以及子节点的子节点。



### **异步接口**

Curator 引入了 **BackgroundCallback** 接口，用来处理服务器端返回来的信息

**这个处理过程是在异步线程中调用，默认在 EventThread 中调用，也可以自定义线程池**。

```java
public interface BackgroundCallback
{
    /**
     * Called when the async background operation completes
     *
     * @param client the client
     * @param event operation result details
     * @throws Exception errors
     */
    public void processResult(CuratorFramework client, CuratorEvent event) throws Exception;
}
```

如上接口，主要参数为 client 客户端， 和 服务端事件 event 

inBackground 异步处理默认在 EventThread 中执行

Lambda 表达式 `(item1, item2) -> { log.info(" background: {}", item2); }` 接收两个参数，分别是 `CuratorFramework` 和 `CuratorEvent` 对象。在这里，我们只关心获取到的节点数据，因此只打印了 `item2`，即 `CuratorEvent` 对象中的节点数据

```java
@Test
public void test() throws Exception {
    curatorFramework.getData().inBackground((item1, item2) -> {
        log.info(" background: {}", item2);
    }).forPath(ZK_NODE);
    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
```

 **指定线程池**

```java
@Test
public void test() throws Exception {
    ExecutorService executorService = Executors.newSingleThreadExecutor();
    
    curatorFramework.getData().inBackground((item1, item2) -> {
        log.info(" background: {}", item2);
    },executorService).forPath(ZK_NODE);
 
    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
```

### **Curator 监听器：**

1. **CuratorListener 接口**：这是一个监听器接口，用于处理 Curator 事件。
2. **eventReceived 方法**：这是接口中唯一的方法。它接收两个参数：
   - `client`：类型为 `CuratorFramework`，表示触发事件的 Curator 客户端。
   - `event`：类型为 `CuratorEvent`，表示触发的事件对象

```java
public interface CuratorListener
{
    public void  eventReceived(CuratorFramework client, CuratorEvent event) throws Exception;
}
```

**针对 background 通知和错误通知。使用此监听器之后，调用 inBackground 方法会异步获得监听**

 

你可以实现 `CuratorListener` 接口来监视节点的创建、删除、更新等事件，并在每个事件发生时执行相应的操作。

一个简单的例子，演示了如何使用 `CuratorListener` 监听节点的创建事件，并在节点创建时输出日志信息：

```java
javaCopy codeimport org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorEvent;
import org.apache.curator.framework.api.CuratorListener;

public class MyCuratorListener implements CuratorListener {
    @Override
    public void eventReceived(CuratorFramework client, CuratorEvent event) throws Exception {
        // 判断事件类型是否为节点创建事件
        if (event.getType() == CuratorEventType.CREATE) {
            // 输出日志信息
            System.out.println("Node created: " + event.getPath());
        }
    }
}
```

在这个例子中，我们实现了 `CuratorListener` 接口，并重写了其中的 `eventReceived` 方法。在该方法中，我们首先判断了事件的类型是否为节点创建事件（`CuratorEventType.CREATE`），如果是的话，就输出了相应的日志信息，包括创建的节点路径。

要使用这个监听器，你需要将它注册到 Curator 客户端中，示例如下：

```java
javaCopy codeCuratorFramework client = CuratorFrameworkFactory.newClient(zookeeperConnectionString, retryPolicy);
client.getCuratorListenable().addListener(new MyCuratorListener());
client.start();
```

通过调用 `getCuratorListenable()` 方法获取 Curator 客户端的可监听对象，然后使用 `addListener()` 方法注册你的监听器。这样，当 Curator 客户端发出节点创建事件时，监听器的 `eventReceived()` 方法将被调用，并执行相应的逻辑。



### **Curator** **Caches:**

Curator 引入了 Cache 来实现对 Zookeeper 服务端事件监听

Cache 事件监听可以理解为一个本地缓存视图与远程 Zookeeper 视图的对比过程。Cache 提供了反复注册的功能。

Cache 分为两类注册类型：节点监听和子节点监听。

- **node cache:**

NodeCache 对某一个节点进行监听

```java
public NodeCache(CuratorFramework client,String path)
Parameters:
client - the client
path - path to cache
```

可以通过注册监听器来实现，对当前节点数据变化的处理

```java
public void addListener(NodeCacheListener listener){
	Add a change listener
}
     
Parameters:
listener - the listener
```

**使用**

- `NodeCache nodeCache = new NodeCache(curatorFramework, NODE_CACHE);`创建了一个 `NodeCache` 对象来监视指定节点的变化

  `NodeCache` 的构造函数需要两个参数：`CuratorFramework` 对象和要监视的节点路径。在这里传入了我们之前创建的 `curatorFramework` 对象和指定的节点路径 `NODE_CACHE`。

- 通过 `nodeCache.getListenable().addListener()` 方法添加了一个 `NodeCacheListener` 对象，用于监听节点的变化。在 `NodeCacheListener` 的 `nodeChanged()` 方法中，我们定义了节点变化时执行的操作

  在这个监听器中，当节点发生变化时，首先会打印节点路径，然后调用 `printNodeData()` 方法打印节点的数据。

- 通过 `nodeCache.start()` 方法启动了 `NodeCache`，使其开始监视指定的节点

这样，当节点发生变化时，`NodeCacheListener` 中的 `nodeChanged()` 方法将被调用，从而执行相应的操作。

```java
@Slf4j
public class NodeCacheTest extends AbstractCuratorTest{
    public static final String NODE_CACHE="/node-cache";
    @Test
    public void testNodeCacheTest() throws Exception {
        //首先通过 createIfNeed(NODE_CACHE) 方法创建了指定的节点
        createIfNeed(NODE_CACHE);
        NodeCache nodeCache = new NodeCache(curatorFramework, NODE_CACHE);
        nodeCache.getListenable().addListener(new NodeCacheListener() {
            @Override
            public void nodeChanged() throws Exception {
                log.info("{} path nodeChanged: ",NODE_CACHE);
                printNodeData();
            }
        });
        nodeCache.start();
    }
 
    public void printNodeData() throws Exception {
        byte[] bytes = curatorFramework.getData().forPath(NODE_CACHE);
        log.info("data: {}",new String(bytes));
    }
}
```



- **path cache:**  

PathChildrenCache 会对子节点进行监听，但是不会对二级子节点进行监听，

```java
public PathChildrenCache(CuratorFramework client,String path,boolean cacheData)
Parameters:
client - the client
path - path to watch
cacheData - if true, node contents are cached in addition to the stat
```

可以通过注册监听器来实现，对当前节点的子节点数据变化的处理

```java
public void addListener(PathChildrenCacheListener listener)
     Add a change listener
Parameters:
listener - the listener
```

 

```java
@Slf4j
public class PathCacheTest extends AbstractCuratorTest{
 
    public static final String PATH="/path-cache";
 
    @Test
    public void testPathCache() throws Exception {
 
        createIfNeed(PATH);
        PathChildrenCache pathChildrenCache = new PathChildrenCache(curatorFramework, PATH, true);
        pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
            @Override
            public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) throws Exception {
                log.info("event:  {}",event);
            }
        });
 
        // 如果设置为true则在首次启动时就会缓存节点内容到Cache中
        pathChildrenCache.start(true);
    }
}
```



- **tree cache:**

TreeCache 使用一个内部类 TreeNode 来维护这个一个树结构。并将这个树结构与 ZK 节点进行了映射。所以 TreeCache 可以监听当前节点下所有节点的事件。

```
public TreeCache(CuratorFramework client,
                         String path,
                         boolean cacheData)
Parameters:
client - the client
path - path to watch
cacheData - if true, node contents are cached in addition to the stat
```

可以通过注册监听器来实现，对当前节点的子节点，及递归子节点数据变化的处理

```java
public void addListener(TreeCacheListener listener)
     Add a change listener
Parameters:
listener - the listener
```

```java
@Slf4j
public class TreeCacheTest extends AbstractCuratorTest{
 
    public static final String TREE_CACHE="/tree-path";
 
    @Test
    public void testTreeCache() throws Exception {
        createIfNeed(TREE_CACHE);
        TreeCache treeCache = new TreeCache(curatorFramework, TREE_CACHE);
        treeCache.getListenable().addListener(new TreeCacheListener() {
            @Override
            public void childEvent(CuratorFramework client, TreeCacheEvent event) throws Exception {
                log.info(" tree cache: {}",event);
            }
        });
        treeCache.start();
    }
}
```
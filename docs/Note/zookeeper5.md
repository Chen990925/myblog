---
group: Zookeeper专题
title: Zookeeper的选举和注册中心
order: 5
---

# Zookeeper的选举和注册中心

## Leader 选举在分布式场景中的应用

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
```

**Leader选举代码**

```java
public class LeaderSelectorDemo {
    private static  final  String CONNECT_STR="192.168.1.104:2181";
    private static RetryPolicy retryPolicy=new ExponentialBackoffRetry( 5*1000, 10 );
    //定义了一个静态的 CuratorFramework 对象，用于与 ZooKeeper 服务器建立连接
    private  static  CuratorFramework curatorFramework;
     private static CountDownLatch countDownLatch = new CountDownLatch(1);
     
    public static void main(String[] args) throws InterruptedException {
        //从系统属性中获取应用名称。这里假设从VM参数中传入
        String appName = System.getProperty("appName");
		//使用连接字符串和重试策略创建 CuratorFramework 实例，然后启动客户端。将创建的实例赋值给静态的 curatorFramework 字段，以便后续使用
        CuratorFramework curatorFramework = CuratorFrameworkFactory.newClient(CONNECT_STR, retryPolicy);
        LeaderSelectorDemo.curatorFramework = curatorFramework;
        curatorFramework.start();
		//定义了一个 LeaderSelectorListener 对象，并重写了其中的 takeLeadership 方法。
        //在该方法中，输出了当前实例成为领导者的信息，并模拟了领导者的工作（这里简单地休眠了15秒）
        LeaderSelectorListener listener = new LeaderSelectorListenerAdapter()
        {
            public void takeLeadership(CuratorFramework client) throws Exception
            {
                System.out.println(" I' m leader now . i'm , "+appName);
                TimeUnit.SECONDS.sleep(15);
            }
        };
		//创建了 LeaderSelector 实例，并传入了 CuratorFramework 实例、节点路径和 LeaderSelectorListener 对象。
        LeaderSelector selector = new LeaderSelector(curatorFramework, "/cachePreHeat_leader", listener);
        //调用 autoRequeue() 方法表示在放弃领导权后，自动重新排队竞选领导者。
        selector.autoRequeue(); 
        //最后调用 start() 方法启动 LeaderSelector
        selector.start();
        countDownLatch.await();
    }
}
```

其底层源码也会使用分布式锁的原理



## Spring Cloud Zookeeper 注册中心

什么是注册中心？

让众多的服务都在 Zookeeper 中进行注册，把自己的一些服务信息，比如 IP，端口，还有一些更加具体的服务信息，都写到 zookeeper 节点上， 这样**有需要的服务就可以直接从 zookeeper 上面去拿**，怎么拿呢？ 

这时我们可以定义统一的名称，比如， User-Service。

那所有的用户服务在启动的时候，都在 User-Service 这个节点下面创建一个子节点（临时节点），这个子节点保持唯一就好，代表了每个服务实例的唯一标识

有依赖用户服务 的，比如 Order-Service 就可以通过 User-Service 这个父节点，就能获取所有的 User-Service 子 节点，并且获取所有的子节点信息（IP，端口等信息）。拿到子节点的数据后 Order-Service 可 以对其进行缓存，然后实现一个客户端的负载均衡

同时还可以对这个 User-Service 目录进行 监听， 这样有新的节点加入，或者退出，Order-Service 都能收到通知，这样 Order-Service 重 新获取所有子节点，且进行数据更新。

这个用户服务的子节点的类型为临时节点。Zookeeper 中临时节点生命周期是和 SESSION 绑定的，如果 SESSION 超时了，对应的节点会被删除，被删除时，Zookeeper 会通知对该节点父节点进行监听的客户端，这样对应的客户 端又可以刷新本地缓存了。当有新服务加入时，同样也会通知对应的客户端，刷新本地缓存，要达到这个目标需要客户端重复的注册对父节点的监听。

这样就实现了服务的自动注册和自动退出。

**代码操作：**

Spring Cloud 生态也提供了 Zookeeper 注册中心的实现，这个项目叫 Spring Cloud Zookeeper

- user-center : 用户服务
- product-center: 产品服务

目标：用户调用产品服务，且实现客户端的负载均衡，产品服务自动加入集群，自动退出服务。

### 创建用户服务

**1.引入关键依赖：**

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
        <exclusions>
            <exclusion>
                <groupId>org.junit.vintage</groupId>
                <artifactId>junit-vintage-engine</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

**2.配置文件**

```properties
spring.application.name=user-center
#zookeeper 连接地址
spring.cloud.zookeeper.connect-string=192.168.1.104:2181
```

**3.启动类，配置了负载均衡器 @LoadBalanced，可以轮询调用多实例**

1. **@LoadBalanced 注解**：
   - `@LoadBalanced` 注解用于标识该 `RestTemplate` 对象需要开启客户端负载均衡功能。
   - 当 `RestTemplate` 发起 HTTP 请求时，被标注了 `@LoadBalanced` 注解的 `RestTemplate` 会使用 Ribbon（Spring Cloud 中的负载均衡组件）来进行客户端负载均衡。
2. **作用**：
   - 通过定义一个 `RestTemplate` bean，可以方便地在 Spring 应用程序中发送 HTTP 请求。
   - 标注了 `@LoadBalanced` 注解的 `RestTemplate` 对象可以实现客户端负载均衡，当发起 HTTP 请求时，会根据负载均衡策略选择目标服务的实例进行请求，从而提高系统的可用性和性能。

```java
@SpringBootApplication
public class UserCenterApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserCenterApplication.class, args);
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
         return restTemplate;
    }
}
```

**4.Controller 类**

```java
@RestController
public class TestController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private LoadBalancerClient loadBalancerClient;
	
    /**
    * 在方法中，调用了 restTemplate.getForObject() 方法发送一个 HTTP GET 请求到 "http://product-center/getInfo" 路径，并将响应结果作为 String 类型返回
    */
    @GetMapping("/test")
    public String test() {
        return this.restTemplate.getForObject("http://product-center/getInfo", String.class);
    }

    /**
    * 这是另一个处理 HTTP GET 请求的方法，映射到路径 /lb。
	* 在方法中，首先通过 loadBalancerClient.choose() 方法选择了名为 "product-center" 的服务实例。
	* 然后从选择的服务实例中获取了服务的ID和端口，并将其以字符串形式返回
    */
    @GetMapping("/lb")
    public String getLb(){
        ServiceInstance choose = loadBalancerClient.choose("product-center");
        String serviceId = choose.getServiceId();
        int port = choose.getPort();
        return serviceId + " : "+port;
    }
}
```

### 创建产品服务

**配置**

```properties
spring.application.name=product-center
#zookeeper 连接地址
spring.cloud.zookeeper.connect-string=192.168.1.104:2181
#将本服务注册到zookeeper
spring.cloud.zookeeper.discovery.register=true
spring.cloud.zookeeper.session-timeout=30000
```

**controller**

```java
@SpringBootApplication
@RestController
public class ProductCenterApplication {

	@Value("${server.port}")
	private String port;

	@Value( "${spring.application.name}" )
	private String name;

	@GetMapping("/getInfo")
	public String getServerPortAndName(){
		return  this.name +" : "+ this.port;
	}
    
	public static void main(String[] args) {
		SpringApplication.run(ProductCenterApplication.class, args);
	}
}
```

**监听并处理 `HeartbeatEvent` 事件**

```java
@Component
@Slf4j
public class HeartbeatEventListener implements ApplicationListener<HeartbeatEvent> {

    @Override
    public void onApplicationEvent(HeartbeatEvent event) {
      	Object value = event.getValue();
        //通过 event.getValue() 方法获取事件携带的值，然后通过 event.getSource() 方法获取事件的源对象
        ZookeeperServiceWatch source = (ZookeeperServiceWatch)event.getSource();
        log.info(" event:source: {} ,event:value{}",source.getCache().getCurrentChildren("/services"),value.toString());
    }
}
```

**服务注册**

```java
@Component
public class ApplicationRunner1 implements ApplicationRunner{

    @Autowired
    private ZookeeperServiceRegistry serviceRegistry;

    //创建了一个 ZookeeperRegistration 对象，并通过 ServiceInstanceRegistration.builder() 创建了一个构建器对象
    //设置了注册的服务实例的属性，包括地址、端口、服务名称等。最后，调用了 serviceRegistry.register(registration) 方法来将服务实例注册到 ZooKeeper 服务注册中心
    @Override
    public void run(ApplicationArguments args) throws Exception {
        ZookeeperRegistration registration = ServiceInstanceRegistration.builder()
                .defaultUriSpec()
                .address("anyUrl")
                .port(10)
                .name("/a/b/c/d/anotherservice")
                .build();
        this.serviceRegistry.register(registration);
    }
}
```

> 实现一个简单的服务注册中心可以遵循以下步骤：
>
> 1. 服务提供者启动时，创建一个临时节点，并将自己的服务信息（如 IP 地址、端口号等）写入该节点。
> 2. 服务消费者启动时，向注册中心查询需要调用的服务列表，并注册 Watch 监听相应的 ZNode。
> 3. 当有新的服务提供者启动或停止时，注册中心会触发相应的 Watch 事件，通知服务消费者更新服务列表。
> 4. 服务消费者根据最新的服务列表选择合适的服务实例进行调用。


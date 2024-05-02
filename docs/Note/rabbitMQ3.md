---
group: rabbitMQ
title: rabbitMQ整合框架
order: 3
---

# rabbitMQ整合框架

## 整合Spring

### **添加 RabbitMQ 依赖：**

确保在 `pom.xml` 文件中添加 RabbitMQ 依赖：

```xml
<dependency>
    <groupId>org.springframework.amqp</groupId>
    <artifactId>spring-rabbit</artifactId>
    <version>2.3.12.RELEASE</version>
</dependency>
```

### **配置 RabbitMQ 连接：**

在 Spring 的 XML 配置文件中，定义 RabbitMQ 连接工厂和 RabbitTemplate：

```xml
<bean id="connectionFactory" class="org.springframework.amqp.rabbit.connection.CachingConnectionFactory">
    <property name="host" value="localhost"/>
    <property name="username" value="guest"/>
    <property name="password" value="guest"/>
    <property name="port" value="5672"/>
</bean>

<bean id="rabbitTemplate" class="org.springframework.amqp.rabbit.core.RabbitTemplate">
    <property name="connectionFactory" ref="connectionFactory"/>
</bean>
```

### **定义发送者和接收者：**

在 XML 配置文件中，定义发送者和接收者的 bean：

```xml
<bean id="producer" class="com.example.Producer">
    <property name="rabbitTemplate" ref="rabbitTemplate"/>
</bean>

<bean id="consumer" class="com.example.Consumer"/>
```

**Producer**

```java
public class Producer {
    private RabbitTemplate rabbitTemplate;

    public void setRabbitTemplate(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void send(String message) {
        rabbitTemplate.convertAndSend("exchange", "routingKey", message);
        System.out.println(" [x] Sent '" + message + "'");
    }
}
```

**Consumer**

```java
public class Consumer {

    public void receive(String message) {
        System.out.println(" [x] Received '" + message + "'");
    }
}
```

### **定义队列和交换机：**

在 XML 配置文件中，定义队列和交换机：

```xml
<rabbit:queue name="queue"/>
<rabbit:direct-exchange name="exchange">
    <rabbit:bindings>
        <rabbit:binding queue="queue" key="routingKey"/>
    </rabbit:bindings>
</rabbit:direct-exchange>
```

### **定义监听器容器：**

在 XML 配置文件中，定义 RabbitMQ 的消息监听器容器：

```xml
<bean id="listenerContainer" class="org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer">
    <property name="connectionFactory" ref="connectionFactory"/>
    <property name="queues" ref="queue"/>
    <property name="messageListener" ref="consumer"/>
</bean>
```

### **定义监听器适配器：**

在 XML 配置文件中，定义 RabbitMQ 的消息监听器适配器：

```xml
<bean id="messageListenerAdapter" class="org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter">
    <property name="delegate" ref="consumer"/>
    <property name="defaultListenerMethod" value="receive"/>
</bean>
```



## 整合SpringBoot

### **添加 Maven 依赖：**

确保在 `pom.xml` 文件中添加以下 Maven 依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

### **配置 RabbitMQ 连接：**

在 `application.properties` 或 `application.yml` 文件中配置 RabbitMQ 连接信息：

```properties
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

### **定义发送者（Producer）：**

```java
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {

    @Autowired
    private AmqpTemplate amqpTemplate;

    //convertAndSend()用于向 RabbitMQ 发送消息。它接受三个参数：交换机名称、路由键和消息体
    public void send(String message) {
        amqpTemplate.convertAndSend("exchange", "routingKey", message);
    }
}
```

### **定义接收者（Consumer）：**

```java
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    //用于声明一个方法作为 RabbitMQ 的消息监听器。当有消息到达指定队列时，该方法会自动调用，并将消息作为方法的参数进行处理。@RabbitListener 注解可以添加到类的方法上，用于指定监听的队列名称或者绑定到指定的队列
    @RabbitListener(queues = "queue")
    public void receive(String message) {
        System.out.println(message);
    }
}
```

### **配置交换机和队列：**

在任何 `@Configuration` 类中定义 `Queue` 和 `Exchange`：

```java
    public static final String EXCHANGE_NAME="boot_topic_exchange";
    public static final String QUEUE_NAME="boot_queue";

    //交换机
    @Bean("bootExchange")
    public Exchange bootExchange(){
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME).durable(true).build();
    }
    //2.Queue队列
    @Bean("bootQueue")
    public Queue bootQueue(){
        return QueueBuilder.durable(QUEUE_NAME).build();
    }
    //3.队列和交换就绑定关系 Binding
    /*
    1.知道哪个队列
    2.知道哪个交换机
    3.routing key
     */
    @Bean
    public Binding bindingQueueExchange(@Qualifier("bootQueue")Queue queue,@Qualifier("bootExchange")Exchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with("boot.#").noargs();
    }
```

### **在应用中使用发送者和接收者：**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RabbitMQApplication implements CommandLineRunner {

    @Autowired
    private Producer producer;

    public static void main(String[] args) {
        SpringApplication.run(RabbitMQApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        producer.send("Hello, RabbitMQ!");
    }
}
```
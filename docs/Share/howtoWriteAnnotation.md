---
group: spring相关
title: 如何实现自定义注解
order: 1
---

# 如何实现自定义注解

摘自稀土掘金https://juejin.cn/post/7322740699433500735

在 Java 中，自定义注解使用 @interface 关键字来定义，它可以实现如：日志记录、性能监控、权限校验等功能。

## 1. 实现自定义注解

下面我们先使用 AOP 的方式来实现一个打印日志的自定义注解，它的实现步骤如下：

1. 添加 Spring AOP 依赖。
2. 创建自定义注解。
3. 编写 AOP 拦截（自定义注解）的逻辑代码。
4. 使用自定义注解。

具体实现如下。

### ① 添加 Spring AOP 依赖

在 pom.xml 中添加如下依赖：

```xml
<dependencies>
  <!-- Spring AOP dependency -->
  <dependency>
    <groupIdorg.springframework.boot</groupId>
      <artifactIdspring-boot-starter-aop</artifactId>
      </dependency>
</dependencies>
```

### ② 创建自定义注解

创建一个新的 Java 注解类，通过 @interface 关键字来定义，并可以添加元注解以及属性。

```java
import java.lang.annotation.*;
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomLogAnnotation {
    String value() default "";
    boolean enable() default true;
}
```

在上面的例子中，我们定义了一个名为 **CustomLogAnnotation** 的注解，它有两个属性：value 和 enable，分别设置了默认值default。

> - @Target (ElementType.METHOD) 指定了该注解只能应用于方法级别。
> - @Retention (RetentionPolicy.RUNTIME) 表示这个注解在运行时是可见的，这样 AOP 代理才能在运行时读取到这个注解。

### ③ 编写 AOP 拦截（自定义注解）的逻辑代码

```java
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CustomLogAspect {
    
    @Around("@annotation(customLog)")
    public Object logAround(ProceedingJoinPoint joinPoint, CustomLogAnnotation customLog) throws Throwable {
        if (customLog.enable()) {
            // 方法执行前的处理
            System.out.println("Before method execution: " + joinPoint.getSignature().getName());
            long start = System.currentTimeMillis();
            // 执行目标方法
            Object result = joinPoint.proceed();
            // 方法执行后的处理
            long elapsedTime = System.currentTimeMillis() - start;
            System.out.println("After method execution (" + elapsedTime + "ms): " + customLog.value());
            return result;
        } else {
            return joinPoint.proceed();
        }
    }
}
```

### ④ 使用自定义注解

```java
@RestController
public class MyController {
    @CustomLogAnnotation(value = "This is a test method", enable = true)
    @GetMapping("/test")
    public String testMethod() {
        // 业务逻辑代码
        return "Hello from the annotated method!";
    }
}
```



## 2. 实际工作中的自定义注解

实际工作中我们通常会使用自定义注解来实现如权限验证，或者是幂等性判断等功能。



## 3. 如何实现自定义幂等性注解？

下面我们使用拦截器 + Redis 的方式来实现一下自定义幂等性注解，它的实现步骤如下：

1. 创建自定义幂等性注解。
2. 创建拦截器，实现幂等性逻辑判断。
3. 配置拦截规则。
4. 使用自定义幂等性注解。

具体实现如下。

### ① 创建自定义幂等性注解

```java
@Retention(RetentionPolicy.RUNTIME) // 程序运行时有效
@Target(ElementType.METHOD) // 方法注解
public @interface Idempotent {
    /**
     * 请求标识符的参数名称，默认为"requestId"
     */
    String requestId() default "requestId";
    /**
     * 幂等有效时长（单位：秒）
     */
    int expireTime() default 60;
}
```

### ② 创建拦截器

```java
@Component
public class IdempotentInterceptor extends HandlerInterceptorAdapter {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Method method = ((HandlerMethod) handler).getMethod();
        Idempotent idempotent = method.getAnnotation(Idempotent.class);
        if (idempotent != null) {
            // 获取请求中的唯一标识符
            String requestId = obtainRequestId(request, idempotent.requestId());
            // 判断该请求是否已经处理过
            if (redisTemplate.opsForValue().get(idempotentKey(requestId)) != null) {
                // 已经处理过，返回幂等响应
                response.getWriter().write("重复请求");
                return false;
            } else {
                // 将请求标识符存入Redis，并设置过期时间
                redisTemplate.opsForValue().set(idempotentKey(requestId), "processed", idempotent.expireTime(), TimeUnit.SECONDS);
                return true; // 继续执行业务逻辑
            }
        }
        return super.preHandle(request, response, handler);
    }

    private String idempotentKey(String requestId) {
        return "idempotent:" + requestId;
    }

    private String obtainRequestId(HttpServletRequest request, String paramName) {
        // 实现从请求中获取唯一标识符的方法
        return request.getParameter(paramName);
    }
}
```

### ③ 配置拦截器

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private IdempotentInterceptor idempotentInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(idempotentInterceptor)
        	.addPathPatterns("/**"); // 拦截所有接口
    }
}
```

### ④ 使用自定义注解

最后，在需要进行幂等控制的 Controller 方法上使用 @Idempotent 注解：

```
@RestController
public class TestController {
    @PostMapping("/order")
    @Idempotent(requestId = "orderId") // 假设orderId是从客户端传来的唯一标识订单请求的参数
    public String placeOrder(@RequestParam("orderId") String orderId, ...) {
        // 业务处理逻辑
    }
}
```

这样，当有相同的请求 ID 在指定的有效期内再次发起请求时，会被拦截器识别并阻止其重复执行业务逻辑。



自定义注解被广泛应用于日常开发中，像日志记录、性能监控、权限判断和幂等性判断等功能的实现，使用自定义注解来实现是非常方便的。在 Spring Boot 中，使用 @interface 关键字来定义自定义注解，之后再使用 AOP 或拦截器的方式实现自定义注解，之后就可以方便的使用自定义注解了。
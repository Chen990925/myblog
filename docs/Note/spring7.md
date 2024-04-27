---
group: spring
title: java的动态代理
order: 7
---

# Java的动态代理

​	Java 动态代理主要依赖于 `java.lang.reflect.Proxy` 类和 `java.lang.reflect.InvocationHandler` 接口来实现。

​	其基本思想是，在运行时**动态创建**一个实现了**一组接口的代理类的实例**，然后将对该实例的**所有方法调用转发给一个处理器**（即实现了 InvocationHandler 接口的类的实例）。

​	Java 动态代理是 Java 高级编程中的一项强大功能，它允许开发者在运行时创建代理实例来控制对其他对象的访问。这种技术广泛应用于 AOP（面向切面编程）、RPC（远程过程调用）框架、事务管理等领域。本文旨在深入探讨 Java 动态代理的实现机制，并比较 JDK Proxy 和 CGLib 两种实现方式的异同。

​	**1. 动态代理的常用实现方式是反射**：

​	反射机制是指程序在运行期间可以访问、检测和修改其本身状态或行为的一种能力，使用反射我们可以调用任意一个类对象，以及类对象中包含的属性及方法。

**2.动态代理可以通过 CGLib 来实现**

    CGLib 是基于 **ASM（一个 Java 字节码操作框架）**而非反射实现的。

​	

简单来说，动态代理是一种**行为方式**，而反射或 ASM 只是它的一种**实现手段**而已。



## 1、使用 JDK Proxy 实现动态代理

**JDK 动态代理只能代理实现了接口的类。**

1. **定义接口**：首先定义一个或多个接口，以及它们的实现类。

```java
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

2. **创建 InvocationHandler**：实现 `InvocationHandler` 接口，重写 `invoke` 方法。在这里可以插入自定义的逻辑，比如日志记录、权限检查等。

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

3. **生成代理对象**：通过调用 `Proxy.newProxyInstance` 方法，传入类加载器、接口数组以及 InvocationHandler 实例，来动态生成代理对象。

```java
Subject subject = (Subject) Proxy.newProxyInstance(
        RealSubject.class.getClassLoader(),
        new Class[]{Subject.class},
        new MyInvocationHandler(new RealSubject())
);

subject.doSomething();
```



## 2、使用 CGLib 实现动态代理

与 JDK Proxy 不同，**CGLib 能够代理未实现接口的类**。它通过在**运行时动态生成被代理类的子类，来拦截对父类方法的调用**。

1. **定义类**：直接定义一个类，而非接口及其实现。

   ```java
   public class RealSubject {
       public void doSomething() {
           System.out.println("Doing something...");
       }
   }
   ```

2. **创建 MethodInterceptor**：实现 `MethodInterceptor` 接口，重写 `intercept` 方法，在该方法中添加自定义逻辑。

   `MethodInterceptor环绕通知 `  , `Interceptor拦截器`

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

3. **生成代理对象**：通过使用 CGLib 提供的 `Enhancer` 类，设置父类和回调，从而创建代理对象。

   ```java
   RealSubject subject = (RealSubject) enhancer.create();
   subject.doSomething();
   ```



## 3、JDK Proxy 与 CGLib 的区别

尽管 JDK Proxy 和 CGLib 都可用于实现 Java 动态代理，但它们之间存在一些关键差异：

1. **代理对象类型**：JDK Proxy 只能代理**实现了接口的类**；而 CGLib 可以**直接代理普通类**。
2. **性能**：CGLib 在运行时生成代理类的子类，通常认为其性能略优于 JDK Proxy。但在大多数场景下，这种性能差异不大。
3. **使用场景**：如果目标对象已经实现了接口，使用 JDK Proxy 是一个简单直接的选择。如果需要代理没有实现接口的类，则必须使用 CGLib。
4. **依赖**：JDK Proxy 无需额外依赖，因为它是 Java 核心库的一部分；**而 CGLib 需要添加 CGLib 库作为项目依赖**。
5. Java 对 JDK Proxy 提供了稳定的支持，并且会持续的升级和更新 JDK Proxy，例如 Java 8 版本中的 JDK Proxy 性能相比于之前版本提升了很多
6. JDK Proxy 是通过**拦截器加反射**的方式实现的
7. JDK Proxy 实现和调用起来比较简单；
8. CGLib 是第三方提供的工具，**基于 ASM 实现的，性能比较高**
9. CGLib 无需通过接口来实现，它是**通过实现子类的方式**来完成调用的。



## 4.使用

### Spring 中的动态代理

动态代理的常见使用场景有 RPC 框架的封装、AOP（面向切面编程）的实现、JDBC 的连接等。

Spring 框架中同时使用了两种动态代理 JDK Proxy 和 CGLib，**当 Bean 实现了接口时，Spring 就会使用 JDK Proxy，在没有实现接口时就会使用 CGLib**

我们也可以在配置中指定强制使用 CGLib，只需要在 Spring 配置中添加 <aop:aspectj-autoproxy proxy-target-class="true"/> 即可。






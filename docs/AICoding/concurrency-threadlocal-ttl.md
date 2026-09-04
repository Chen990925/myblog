---
group: 并发编程专题
title: ThreadLocal 与 TTL
order: 6
---

# 并发编程 4：ThreadLocal / TTL（结合项目）

## 一、ThreadLocal 原理

- 一句话：不是全局 Map，而是**每个线程自己有一个 ThreadLocalMap**，key 是 ThreadLocal 对象（弱引用），value 是线程私有值
- 为什么线程私有：ThreadLocalMap 挂在 Thread 上，天然线程隔离、无锁
- set/get：以当前 ThreadLocal 为 key 写/读自己的 ThreadLocalMap
- 初始值：withInitial(Supplier) / 重写 initialValue()

**项目落点（直接引用）**：
- `RequestHandleInterceptor`：`ThreadLocal<Map<String,Object>> LOCAL_CACHE` —— 一次请求内临时缓存，请求结束清理
- `DataSourceUtil`：`ThreadLocal<String> CONTEXT_HOLDER` —— 动态数据源切换（读写分离）
- `OmsContextHolder`（框架）：登录用户上下文（companyId/userId/account）——拦截器 set、业务 get

## 二、内存泄漏（最高频考点）

- 根因：key 弱引用被 GC 回收 → Entry 变 (null, value) → **value 仍被强引用** → 线程常驻（线程池）则永久泄漏
- **不是 key 泄漏，是 value 泄漏**
- 两必要条件：① 线程长期存活（线程池）② set 后没 remove
- get/set 会顺带清理部分 null key（expungeStaleEntry），但不保证

**标准写法（背）**：
```java
try {
    threadLocal.set(value);
    // ... 业务
} finally {
    threadLocal.remove();   // 必须 remove，不是 set(null)！
}
```

## 三、线程池场景三大坑

1. **脏数据污染**：线程复用 + 不清理 → 下一次任务 get 到别人的数据（A 用户上下文被 B 读到 → 串号/越权，金融大忌）
2. **value 泄漏**：线程常驻 + 不 remove → 大对象滞留老年代（呼应 JVM 案例 B）
3. **上下文丢失**：任务提交线程池后新线程没有父线程 ThreadLocal → 用户/链路 traceId 丢失（项目 @Async 成交处理、条件单线程池、MQ 消费都要透传 → TTL 场景）

话术："ThreadLocal 在 Web 请求线程（Tomcat 线程池）必须 finally remove：防脏数据串号 + 防 value 泄漏。项目用户上下文走 OmsContextHolder，异步线程池靠 TTL 传递。"

## 四、transmittable-thread-local（TTL，项目 2.12.6）

- 解决问题：ThreadLocal 线程池任务 get 不到；InheritableThreadLocal 只在创建线程时传一次、复用后不更新（残留旧值）
- 原理：
  - `TransmittableThreadLocal`（继承 InheritableThreadLocal）：标记可传递变量
  - `TtlRunnable`/`TtlCallable`：装饰器，run() 里 capture（快照父线程值）→ replay（回放子线程）→ restore（执行后恢复）
  - `TtlExecutors.getTtlExecutorService(...)`：包装线程池自动套 TtlRunnable
  - Agent 模式：`-javaagent:transmittable-thread-local.jar` 无侵入（生产推荐）

使用姿势：
```java
executorService.execute(TtlRunnable.get(runnable));           // 装饰器
ExecutorService ttlPool = TtlExecutors.getTtlExecutorService(pool);  // 包装池
java -javaagent:transmittable-thread-local.jar -jar app.jar  // Agent 无侵入
```

- 项目落点：pom 已引 TTL 2.12.6——异步链路（@Async 成交处理、条件单线程池、MQ 消费）透传 OmsContextHolder 用户上下文和链路信息

## 五、面试话术（1 分钟版）

> "ThreadLocal 是每个线程私有的 ThreadLocalMap，key 是弱引用 ThreadLocal，天然线程隔离无锁。两个必考问题：一是内存泄漏——key 弱引用被回收但 value 强引用链还在，线程池线程常驻就永久泄漏，必须在 finally remove；二是线程池复用——不清理会串号（A 用户上下文被 B 读到，金融大忌），跨线程传递用 TTL（提交任务快照父线程上下文、执行前回放、执行后恢复），我们项目引入 transmittable-thread-local 2.12.6 解决异步成交处理和线程池任务的用户上下文透传。"

## 六、高频追问

- 为什么 key 用弱引用？→ 避免 ThreadLocal 对象本身泄漏；代价是 value 需 remove 兜底
- set(null) 和 remove 区别？→ set(null) 留 null Entry 占位，remove 删 Entry；推荐 remove
- InheritableThreadLocal 为什么不够？→ 只在创建线程时复制一次，复用后不更新残留旧值
- TTL 实现？→ TtlRunnable 装饰器 capture/replay/restore，或 JavaAgent
- FastThreadLocal（Netty）？→ 数组下标代替哈希减少冲突，高并发短生命周期（加分项）
- 项目哪里会踩坑？→ Tomcat 线程池 + OmsContextHolder：请求结束必须 remove（框架拦截器做）；自建线程池用 TTL

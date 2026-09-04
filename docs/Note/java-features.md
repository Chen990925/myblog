---
group: Java基础
title: Java 8-21 核心新特性速查
order: 1
---

# Java 8-21 核心新特性速查

## Java 8（2014）- 里程碑版本

### Lambda 表达式

```java
// 匿名内部类 → Lambda
// 之前
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.compareTo(b);
    }
});

// 之后
names.sort((a, b) -> a.compareTo(b));
// 或方法引用
names.sort(String::compareTo);
```

### Stream API

```java
List<Order> orders = ...;

// 链式处理
Map<String, List<Order>> grouped = orders.stream()
    .filter(o -> o.getStatus() == OrderStatus.PAID)   // 过滤
    .sorted(Comparator.comparing(Order::getAmount).reversed()) // 排序
    .collect(Collectors.groupingBy(Order::getUserId)); // 分组

// 常用操作
double total = orders.stream()
    .mapToDouble(Order::getAmount)
    .sum();

Optional<Order> maxOrder = orders.stream()
    .max(Comparator.comparing(Order::getAmount));

// 并行流（大数据量场景，注意线程安全）
long count = orders.parallelStream()
    .filter(o -> o.getAmount() > 100)
    .count();
```

### Optional

```java
// 避免 NullPointerException
Optional<User> user = userRepository.findById(id);

// 推荐写法
String name = user
    .map(User::getName)
    .orElse("未知用户");

// 链式调用
user.ifPresent(u -> {
    log.info("找到用户: {}", u.getName());
    sendNotification(u);
});

// 避免这样用（和 null 判断没区别）
if (user.isPresent()) {
    return user.get();  // 不推荐
}
```

### 其他 Java 8 特性

```java
// 接口默认方法
public interface MyInterface {
    default void defaultMethod() {
        System.out.println("默认实现");
    }
}

// 新日期 API（线程安全，替代 Date/Calendar）
LocalDate date = LocalDate.of(2024, 3, 15);
LocalDateTime dateTime = LocalDateTime.now();
Duration duration = Duration.between(start, end);
Period period = Period.between(startDate, endDate);

// CompletableFuture（异步编程）
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchFromDB(id))
    .thenApply(data -> transform(data))
    .exceptionally(ex -> "default");
```

## Java 10（2018）

### 局部变量类型推断（var）

```java
// 编译器自动推断类型
var list = new ArrayList<String>();     // ArrayList<String>
var map = new HashMap<String, Integer>(); // HashMap<String, Integer>
var stream = list.stream();             // Stream<String>

// 增强 for 循环
for (var entry : map.entrySet()) {
    var key = entry.getKey();
    var value = entry.getValue();
}

// 注意：var 只能用于局部变量，不能用于字段、方法参数、返回类型
```

## Java 14（2020）

### Switch 表达式

```java
// 传统 switch（容易忘写 break）
String dayType;
switch (day) {
    case MONDAY: case TUESDAY: case WEDNESDAY:
    case THURSDAY: case FRIDAY:
        dayType = "工作日"; break;
    case SATURDAY: case SUNDAY:
        dayType = "周末"; break;
    default:
        dayType = "未知";
}

// 新 Switch 表达式（支持返回值，无需 break）
String dayType = switch (day) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> "工作日";
    case SATURDAY, SUNDAY -> "周末";
    default -> "未知";
};

// 需要多行逻辑时使用 yield
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY -> 7;
    default -> {
        int len = day.toString().length();
        yield len;  // yield 返回值
    }
};
```

### Record（预览，Java 16 正式）

### NullPointerException 增强提示

```java
// Java 14 之前
// Exception: java.lang.NullPointerException

// Java 14 之后
// Exception: Cannot invoke "User.getName()" because "user" is null
```

## Java 16（2021）

### Record 类（正式）

Record 是不可变数据的紧凑载体，自动生成构造器、getter、equals、hashCode、toString。

```java
// 传统 POJO 需要大量模板代码
public class UserDTO {
    private final String name;
    private final int age;
    // 构造器 + getter + equals + hashCode + toString...
}

// Record 一行搞定
public record UserDTO(String name, int age) {}

// 使用
var user = new UserDTO("张三", 25);
System.out.println(user.name());   // "张三"
System.out.println(user.age());    // 25
System.out.println(user);          // UserDTO[name=张三, age=25]

// Record 可以添加紧凑构造器进行校验
public record UserDTO(String name, int age) {
    public UserDTO {
        if (age < 0) throw new IllegalArgumentException("age must >= 0");
        name = name.strip();  // 可以修改字段值
    }
}
```

### Pattern Matching for instanceof（正式）

```java
// 之前
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// 之后
if (obj instanceof String s) {
    System.out.println(s.length());  // 直接使用 s，无需强转
}

// 可以结合逻辑表达式
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}
```

## Java 17（2021）- LTS 长期支持版

### Sealed Classes（密封类）

限制哪些类可以继承/实现某个类/接口。

```java
// 只允许 Circle、Rectangle、Triangle 继承 Shape
public sealed class Shape
    permits Circle, Rectangle, Triangle {}

public final class Circle extends Shape {}        // final：不可再继承
public sealed class Rectangle extends Shape       // sealed：继续限制
    permits Square {}
public non-sealed class Triangle extends Shape {} // non-sealed：开放继承

// 配合 Pattern Matching 使用（Java 21）
double area = switch (shape) {
    case Circle c -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.width() * r.height();
    case Triangle t -> 0.5 * t.base() * t.height();
    // 不需要 default！编译器知道所有子类
};
```

### 增强的 Switch Pattern Matching（预览）

```java
// 结合 sealed class 和 record
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double width, double height) implements Shape {}

// 穷举匹配，不需要 default
double area = switch (shape) {
    case Circle c -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.width() * r.height();
};
```

## Java 21（2023）- LTS 长期支持版

### Virtual Threads（虚拟线程，正式）

虚拟线程是轻量级线程，由 JVM 调度而非操作系统，可以用极低的开销创建百万级并发。

```java
// 创建虚拟线程
Thread.startVirtualThread(() -> {
    System.out.println("Hello from virtual thread!");
});

// 使用 ExecutorService
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // 每个任务一个虚拟线程，轻松处理 10 万并发
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
}

// 替代传统线程池
// 之前：newFixedThreadPool(200) → 200 个平台线程
// 之后：newVirtualThreadPerTaskExecutor() → 按需创建虚拟线程

// Spring Boot 3.2+ 一行配置启用虚拟线程
// application.yml
spring:
  threads:
    virtual:
      enabled: true
```

**虚拟线程 vs 平台线程：**

| 对比 | 平台线程 | 虚拟线程 |
|------|----------|----------|
| 创建成本 | 约 1MB 栈空间 | 约几 KB |
| 调度方式 | OS 内核调度 | JVM 调度 |
| 适用场景 | CPU 密集型 | IO 密集型（数据库/HTTP/RPC） |
| 阻塞代价 | 高（占用 OS 线程） | 低（自动 unmount） |
| 数量上限 | 数百~数千 | 百万级 |

**注意：** 虚拟线程不适合 CPU 密集型任务，适合 IO 密集型场景（Web 请求、数据库查询、RPC 调用）。

### Sequenced Collections（有序集合接口）

```java
// 新增 SequencedCollection、SequencedSet、SequencedMap 接口
// 统一了"有顺序的集合"的 API

SequencedCollection<String> list = new ArrayList<>(List.of("A", "B", "C"));

list.getFirst();   // "A"
list.getLast();    // "C"
list.addFirst("Z"); // 添加到头部
list.addLast("D");  // 添加到尾部
list.reversed();   // ["C", "B", "A"] 反转视图

// SequencedMap
SequencedMap<String, Integer> map = new LinkedHashMap<>();
map.firstEntry();   // 第一个键值对
map.lastEntry();    // 最后一个键值对
map.reversed();     // 反转视图
```

### Pattern Matching for switch（正式）

```java
// 完整的模式匹配 switch
static String format(Object obj) {
    return switch (obj) {
        case Integer i -> "整数: " + i;
        case String s -> "字符串: " + s;
        case Long l -> "长整数: " + l;
        case double[] arr -> "数组长度: " + arr.length;
        case null -> "null值";          // 支持 null 匹配
        default -> "未知类型: " + obj;
    };
}

// 带守卫条件的 when
switch (shape) {
    case Circle c when c.radius() > 10 -> "大圆";
    case Circle c -> "小圆";
    case Rectangle r when r.width() == r.height() -> "正方形";
    case Rectangle r -> "矩形";
}
```

### Record Patterns（记录模式）

```java
record Point(int x, int y) {}
record Line(Point start, Point end) {}

// 解构 Record
if (obj instanceof Point(int x, int y)) {
    System.out.println(x + y);
}

// 嵌套解构
if (obj instanceof Line(Point(var x1, var y1), Point(var x2, var y2))) {
    double length = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

// 在 switch 中使用
String description = switch (shape) {
    case Circle(var r) when r > 100 -> "超大圆";
    case Circle(var r) -> "半径: " + r;
    case Rectangle(var w, var h) -> w + "x" + h;
};
```

## 版本选择建议

| 版本 | 类型 | 建议 |
|------|------|------|
| Java 8 | LTS | 存量系统维护 |
| Java 11 | LTS | 逐步淘汰 |
| Java 17 | LTS | **当前主流生产版本** |
| Java 21 | LTS | **新项目推荐**（虚拟线程是杀手级特性） |

---
group: 开发工具
title: Stream流使用
order: 3
---


# Stream流使用大全

## Stream 的创建

`Stream` 可以通过集合数组创建。

1、通过 `java.util.Collection.stream()` 方法用集合创建流

```java
List<String> list = Arrays.asList("a", "b", "c");  
// 创建一个顺序流  
Stream<String> stream = list.stream();  
// 创建一个并行流  
Stream<String> parallelStream = list.parallelStream();  
```

2、使用 `java.util.Arrays.stream(T[] array)` 方法用数组创建流

```java
int[] array={1,3,5,6,8};  
IntStream stream = Arrays.stream(array); 
```

3、使用 `Stream` 的静态方法：`of()、iterate()、generate()`

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);  
Stream<Integer> stream2 = Stream.iterate(0, (x) -> x + 3).limit(4);  
stream2.forEach(System.out::println); // 0 2 4 6 8 10  
stream2.forEach（System.out：:p rintln）;// 0 2 4 6 8 10 
Stream<Double> stream3 = Stream.generate(Math::random).limit(3);  
stream3.forEach(System.out::println);
```



## Stream 的使用

在使用 stream 之前，先理解一个概念：`Optional` 。

> `Optional` 类是一个可以为 `null` 的容器对象。如果值存在则 `isPresent()` 方法会返回 `true`，调用 `get()` 方法会返回该对象。

### 3.1 遍历 / 匹配（foreach/find/match）

`Stream` 也是支持类似集合的遍历和匹配元素的，只是 `Stream` 中的元素是以 `Optional` 类型存在的。`Stream` 的遍历、匹配非常简单。

```java
public class StreamTest {  
 public static void main(String[] args) {  
        List<Integer> list = Arrays.asList(7, 6, 9, 3, 8, 2, 1);  
  
        // 遍历输出符合条件的元素  
        list.stream().filter(x -> x > 6).forEach(System.out::println);  
        // 匹配第一个  
        Optional<Integer> findFirst = list.stream().filter(x -> x > 6).findFirst();  
        // 匹配任意（适用于并行流）  
        Optional<Integer> findAny = list.parallelStream().filter(x -> x > 6).findAny();  
        // 是否包含符合特定条件的元素  
        boolean anyMatch = list.stream().anyMatch(x -> x < 6);  
        System.out.println("匹配第一个值：" + findFirst.get());  
        System.out.println("匹配任意一个值：" + findAny.get());  
        System.out.println("是否存在大于6的值：" + anyMatch);  
    }  
}  
```

### 3.2 筛选（filter）

筛选，是按照一定的规则校验流中的元素，将符合条件的元素提取到新的流中的操作。

筛选出 `Integer` 集合中大于 7 的元素，并打印出来

```java
public class StreamTest {  
  public static void main(String[] args) {  
  		List<Integer> list = Arrays.asList(6, 7, 3, 8, 1, 2, 9);  
  		Stream<Integer> stream = list.stream();  
  		stream.filter(x -> x > 7).forEach(System.out::println);  
 	}  
} 
```

### 3.3 聚合（max/min/count)

`max`、`min`、`count` 这些字眼你一定不陌生，没错，在 mysql 中我们常用它们进行数据统计。Java stream 中也引入了这些概念和用法，极大地方便了我们对集合、数组的数据统计工作。

获取 `String` 集合中最长的元素。

```java
public class StreamTest {  
     public static void main(String[] args) {  
  		List<String> list = Arrays.asList("adnm", "admmt", "pot", "xbangd", "weoujgsd");  
  		Optional<String> max = list.stream().max(Comparator.comparing(String::length));  
  		System.out.println("最长的字符串：" + max.get());  
 	}  
}  
```

### 3.4 映射 (map/flatMap)

映射，可以将一个流的元素按照一定的映射规则映射到另一个流中。分为 `map` 和 `flatMap`：

- `map`：接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。
- `flatMap`：接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。

英文字符串数组的元素全部改为大写。整数数组每个元素 + 3。

```java
public class StreamTest {  
 	public static void main(String[] args) {  
  		String[] strArr = { "abcd", "bcdd", "defde", "fTr" };  
  		List<String> strList = Arrays.stream(strArr).map(String::toUpperCase).collect(Collectors.toList()); 
 		List<Integer> intList = Arrays.asList(1, 3, 5, 7, 9, 11);  
  		List<Integer> intListNew = intList.stream().map(x -> x + 3).collect(Collectors.toList());  
  		System.out.println("每个元素大写：" + strList);  
  		System.out.println("每个元素+3：" + intListNew);  
 	}  
}  
```



### 3.5 收集 (collect)

`collect`，收集，可以说是内容最繁多、功能最丰富的部分了。从字面上去理解，就是把一个流收集起来，最终可以是收集成一个值也可以收集成一个新的集合。

#### 3.5.1 归集 (toList/toSet/toMap)

因为流不存储数据，那么在流中的数据完成处理后，需要将流中的数据重新归集到新的集合里。`toList`、`toSet` 和 `toMap` 比较常用，另外还有 `toCollection`、`toConcurrentMap` 等复杂一些的用法。

下面用一个案例演示 `toList`、`toSet` 和 `toMap`：

```java
 public class StreamTest {  
 public static void main(String[] args) {  
  List<Integer> list = Arrays.asList(1, 6, 3, 4, 6, 7, 9, 6, 20);  
  List<Integer> listNew = list.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());  
  Set<Integer> set = list.stream().filter(x -> x % 2 == 0).collect(Collectors.toSet());  
  
  List<Person> personList = new ArrayList<Person>();  
  personList.add(new Person("Tom", 8900, 23, "male", "New York"));  
  .....
    
  Map<?, Person> map = personList.stream().filter(p -> p.getSalary() > 8000)  
    .collect(Collectors.toMap(Person::getName, p -> p));  
 }  
}  
```




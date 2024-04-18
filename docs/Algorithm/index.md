---
nav:
  title: 算法笔记
  order: 4
title: 算法题常见方法
---

# 算法题中需要了解的常用类型方法

## String

1. length (): 返回字符串的长度。
2. **charAt (int index): 返回指定索引处的字符。**
3. isEmpty (): 检查字符串是否为空。
4. toLowerCase () & toUpperCase (): 将字符串转换为小写或大写。
5. equals (Object obj) & equalsIgnoreCase (String anotherString): 比较字符串是否相等，后者忽略大小写。
6. concat (String str): 连接两个字符串。
7. compareTo (String anotherString): 比较两个字符串的字典顺序。
8. **substring (int beginIndex) & substring (int beginIndex, int endIndex): 截取字符串的一部分。**
9. indexOf (String str) & lastIndexOf (String str): 查找字符串中第一次和最后一次出现某子串的位置。
10. startsWith (String prefix) & endsWith (String suffix): 检查字符串是否以指定的前缀或后缀开始 / 结束。
11. replace (char oldChar, char newChar): 替换字符串中的某个字符。
12. replaceAll (String regex, String replacement): 使用正则表达式替换字符串中的部分内容。
13. **toCharArray () & getBytes (): 将字符串转换为字符数组或字节数组。**
14. contains (String other): 检查字符串是否包含另一个字符串。
15. **spilt(String str):按指定字符分割字符串为一个String数组**



## Scanner

1. 创建 Scanner 对象，打开输入流，使计算机能获取到用户输入的数据

   **Scanner scan=new Scanner(System.in);**

2. **next () 和 nextXxx () 方法**

   **next () 方法：**获取用户输入的字符串

   **nextXxx () 方法：**获取用户对应类型的输入数据

   | 数据类型   | nextXxx () 方法   |
   | ---------- | ----------------- |
   | int        | nextInt();        |
   | short      | nextShort();      |
   | long       | nextLong();       |
   | byte       | nextByte();       |
   | float      | nextFloat();      |
   | double     | nextDouble();     |
   | boolean    | nextBoolean();    |
   | char       | nextChar();       |
   | BigDecimal | nextBigDecimal(); |
   | BigInteger | nextBigInteger(); |

**next () 方法与 nextLine () 方法的区别: （同为获取字符串的方法）**

- next () 方法：

​           （1）获取到有效字符之后的空格，做为结束符

​           （2）获取到有效字符之前的空格，自动舍去

​           （3）**无法得到带有空格的字符串**

-  nextLine () 方法：

​           （1）获取在按下 Enter 键之前的所有内容

​           （2）**可以获得空白**



**hasNext () 和 hasNextXxx () 方法**

 **hasNext () 方法：**判断用户是否有输入的字符串。有输入，返回 true 值；无输入，返回 false 值

**hasNextXxx () 方法：**判断用户是否有输入某种类型的数据。与 hasNext () 方法原理一致



## Map

1. V put(K Key ,V Value )

2. V get(Object key)

3. **V getOrDefault(Object key, V defaultValue)**：返回 key 对应的 value，key 不存在，返回默认值

4. V remove(Object key)

5. Set keySet()  ：返回所有 key 的不重复集合，返回的是一个 set

   ```java
   Set<String>set = map1.keySet();
   ```

6. Collection values()：返回所有 value 的可重复集合

   ```java
   Collection<Integer> values = map1.values();
   ```

7. **Set<Map.Entry<K, V>> entrySet()：返回所有的 key-value 映射关系**

   ```java
   	Set<Map.Entry<String, Integer>> entrySet = map1.entrySet();
    for (Map.Entry<String, Integer> entry : entrySet) {}
   ```

8. boolean containsKey(Object key)

9. boolean containsValue(Object value)

​	

## StringBuilder/StringBuffer 

1.  public StringBuffer append(String s)
2. **public StringBuffer reverse()：将此字符序列用其反转形式取代。**
3. public delete(int start, int end)：移除此序列的子字符串中的字符。
4.  public insert(int offset, int i)：将 `int` 参数的字符串表示形式插入此序列中。
5. insert(int offset, String str)：将 `str` 参数的字符串插入此序列中。
6. replace(int start, int end, String str)：使用给定 `String` 中的字符替换此序列的子字符串中的字符。

> 它也拥有String自带的方法，如length()，indexOf()等

## Java中常用的几种map

1. HashMap：基于哈希表实现，提供了快速的插入、删除和查找操作。**HashMap不保证元素的顺序**。
2. TreeMap：基于红黑树实现，**按键的自然顺序或自定义比较器的顺序对元素进行排序**。
3. LinkedHashMap：基于哈希表和双向链表实现，**在迭代时保留元素的插入顺序或访问顺序**。
4. ConcurrentHashMap：线程安全的HashMap实现，通过分段锁提供高效的并发访问。




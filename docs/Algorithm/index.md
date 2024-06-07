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

> 在获取不到scanner的输入内容时可能因为换行收到了空白，可以再次调用nextLine()获取一次

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


## Character

Character 类是字符数据类型 char 的包装类。Character 类的对象包含类型为 char 的单个字段，这样能把基本数据类型当对象来处理

| **void** Character(char value)             | 构造一个新分配的 Character 对象，用以表示指定的 char 值      |
| ------------------------------------------ | ------------------------------------------------------------ |
| char charValue()                           | 返回此 Character 对象的值，此对象表示基本 char 值            |
| int compareTo(Character anotherCharacter)  | 根据数字比较两个 Character 对象                              |
| boolean equals(Character anotherCharacter) | 将此对象与指定对象比较，当且仅当参数不是 null，而 是一个与此对象 包含相同 char 值的 Character 对象时， 结果才是 true |
| **boolean isDigit(char ch)**               | 确定指定字符是否为数字，如果通过 Character. getType (ch) 提供的字 符的常规类别类型为 DECIMAL_DIGIT_NUMBER，则字符为数字 |
| **boolean isLetter(int codePoint)**        | 确定指定字符（Unicode 代码点）是否为字母                     |
| **boolean isLetterOrDigit(int codePoint)** | 确定指定字符（Unicode 代码点）是否为字母或数字               |
| boolean isLowerCase(char ch)               | 确定指定字符是否为小写字母                                   |
| boolean isUpperCase(char ch)               | 确定指定字符是否为大写字母                                   |
| char toLowerCase(char ch)                  | 使用来自 UnicodeData 文件的大小写映射信息将字符参数转换为小写 |
| char toUpperCase(char ch)                  | 使用来自 UnicodeData 文件的大小写映射信息将字符参数转换为大写 |
| boolean isWhitespace(char ch)              | 判断是否为空格                                               |



## Collections

- [sort](https://m.baidu.com/s?word=sort&sa=re_dqa_zy)(Collection)。对集合进行排序。
- [reverse](https://m.baidu.com/s?word=reverse&sa=re_dqa_zy)(List)。反转集合中元素的顺序。
- [shuffle](https://m.baidu.com/s?word=shuffle&sa=re_dqa_zy)(List)。对集合进行随机排序。
- fill (List, Object)。用指定对象替换集合中的所有元素。
- [copy](https://m.baidu.com/s?word=copy&sa=re_dqa_zy)(List m, List n)。将集合 n 中的元素复制到 m 中，并覆盖相应索引的元素。
- [min](https://m.baidu.com/s?word=min&sa=re_dqa_zy)(Collection) 和 min (Collection, Comparator)。返回集合中的最小元素，后者允许通过 Comparator 指定比较方式。
- [max](https://m.baidu.com/s?word=max&sa=re_dqa_zy)(Collection) 和 max (Collection, Comparator)。返回集合中的最大元素，后者允许通过 Comparator 指定比较方式。
- [indexOfSubList](https://m.baidu.com/s?word=indexOfSubList&sa=re_dqa_zy)(List, List)。查找子列表在另一个列表中首次出现的索引。
- lastIndexOfSubList (List, List)。查找子列表在另一个列表中最后一次出现的索引。
- [rotate](https://m.baidu.com/s?word=rotate&sa=re_dqa_zy)(List, int)。将集合中的元素向右移动指定数量的位置，负数表示向左移动。
- [swap](https://m.baidu.com/s?word=swap&sa=re_dqa_zy)(List, int, int)。交换集合中指定索引位置的两个元素。
- binarySearch (Collection, Object)。使用二分搜索法查找指定元素在集合中的索引，要求集合已排序。
- replaceAll(List, Object, Object)。替换集合中指定的元素为另一个元素，并返回是否成功替换。


## Math

1. 数学运算方法：

\- `abs (double a)`：返回指定数字的绝对值。

\- `max (double a, double b)`：返回两个数中较大的那个数。

\- `min (double a, double b)`：返回两个数中较小的那个数。

\- **`pow (double a, double b)`：返回指定数字的指定次幂。**

\- **`sqrt (double a)`：返回指定数字的平方根。**

2. 取整方法：

\- `ceil (double a)`：返回大于等于参数的最小整数。

\- `floor (double a)`：返回小于等于参数的最大整数。

\- **`round (double a)`：将参数四舍五入为最接近的整数。**




---
group: 大厂算法题
title: 华为算法题笔记3
order: 3
---

# **华为算法题笔记3**

## 3.排序（5题）

### (1) HJ8.合并表记录

描述:数据表记录包含表索引index和数值value（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照index值升序进行输出。

输入描述：先输入键值对的个数n（1 <= n <= 500）,接下来n行每行输入成对的index和value值，以空格隔开

输出描述：输出合并后的键值对（多行）

> 这里可以使用有序的TreeMap

输入：

```
4
0 1
0 2
1 2
3 4
```

输出：

```
0 3
1 2
3 4
```

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    Map<Integer, Integer> map = new HashMap<>();
    int n = scanner.nextInt();
    // Scanner 在读取输入时，可能会读取到空白符（例如换行符 \n），导致 Integer.parseInt() 解析空字符串时抛出异常。
	//为了解决这个问题，您可以尝试在读取输入之前调用 scanner.nextLine() 一次来消耗掉可能的空白符。这样可以确保在调用 nextInt() 之前，输入缓冲区中不包含任何空白符，避免 nextInt() 方法读取到不合法的输入。
    scanner.nextLine();
    for (int i = 0; i < n; i++) {
        if(scanner.hasNext()) {
            String entry = scanner.nextLine();
            String[] s = entry.split(" ");
            Integer s0 = Integer.parseInt(s[0]);
            Integer s1 = Integer.parseInt(s[1]);
            if (!map.containsKey(s0)) {
                map.put(s0, s1);
            } else {
                map.put(s0, map.get(s0) + s1);
            }
        }
    }
    Set<Integer> set = map.keySet();
    List<Integer> collect = set.stream().sorted().collect(Collectors.toList());
    for (Integer node : collect) {
        System.out.println(node + " " + map.get(node));
    }
}
```

### (2) *HJ14.字符串排序

输入描述：输入第一行为一个正整数n(1≤n≤1000),下面n行为n个字符串(字符串长度≤100),字符串中只含有大小写字母。

输出描述：数据输出n行，输出结果为按照字典序排列的字符串。

输入：

```
9
cap
to
cat
card
two
too
up
boat
boot
```

输出：

```
boat
boot
cap
card
cat
to
too
two
up
```

```java
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<String> list = new ArrayList<>();
        int n = scanner.nextInt();
        scanner.nextLine();
        for (int i = 0; i < n; i++) {
            if (scanner.hasNext()) {
                String s = scanner.nextLine();
                list.add(s);
            }
        }
        Collections.sort(list);
        for (String node : list) {
            System.out.println(node);
        }
    }
```

### (3) HJ27.查找兄弟单词

描述

定义一个单词的“兄弟单词”为：交换该单词字母顺序（注：可以交换任意次），而不添加、删除、修改原有的字母就能生成的单词。

兄弟单词要求和原来的单词不同。例如： ab 和 ba 是兄弟单词。 ab 和 ab 则不是兄弟单词。

现在给定你 n 个单词，另外再给你一个单词 x ，让你寻找 x 的兄弟单词里，按字典序排列后的第 k 个单词是什么？

注意：字典中可能有重复单词。

输入描述：输入只有一行。 先输入字典中单词的个数n，再输入n个单词作为字典单词。 然后输入一个单词x 最后后输入一个整数k

输出描述：第一行输出查找到x的兄弟单词的个数m 第二行输出查找到的按照字典顺序排序后的第k个兄弟单词，没有符合第k个的话则不用输出。

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String str = scanner.nextLine();
    List<String> list = new ArrayList<>();
    String[] arr = str.split(" ");
    int targetNum = Integer.parseInt(arr[0]);
    for (int i = 0; i < targetNum; i++) {
        list.add(arr[i + 1]);
    }
    String s1 = arr[arr.length - 2];
    int index = Integer.parseInt(arr[arr.length - 1]);
    Iterator<String> iterator = list.iterator();
    while (iterator.hasNext()) {
        String s2 = iterator.next();
        if (!checkBrother(s1, s2)) {
            iterator.remove();
        }
    }
    System.out.println(list.size());
    Collections.sort(list);
    if (index <= list.size()) {
        System.out.println(list.get(index - 1));
    }

}

public static boolean checkBrother(String s1, String s2) {
    //s1，输入单词，s2目标比较单词
    if (s1.length() != s2.length()) {
        return false;
    }
    if (s1.equals(s2)) {
        return false;
    }
    for (String s : s1.split("")) {
        s2 = s2.replaceFirst(s, "");
    }
    if (!s2.isEmpty()) {
        return false;
    }
    return true;
}
```

### (4) *NC37.合并区间

给出一组区间，请合并所有重叠的区间。请保证合并后的区间按区间起点升序排列。

示例1

输入：[[10,30],[20,60],[80,100],[150,180]]

返回值：[[10,60],[80,100],[150,180]]

示例2

输入：[[0,10],[10,20]]

返回值：[[0,20]]

> ***知识点：贪心思想***
>
> ***贪心思想属于动态规划思想中的一种，其基本原理是找出整体当中给的每个局部子结构的最优解，并且最终将所有的这些局部最优解结合起来形成整体上的一个最优解***
>
> 局部最优方法----->全局最优，类似递归的逆过程
>
> ***具体做法：***
>
> - ***step 1：既然要求重叠后的区间按照起点位置升序排列，我们就将所有区间按照起点位置先进行排序。使用sort函数进行排序，重载比较方式为比较interval结构的start变量。***
> - ***step 2：排序后的第一个区间一定是起点值最小的区间，我们将其计入返回数组res，然后遍历后续区间。***
> - ***step 3：后续遍历过程中，如果遇到起点值小于res中最后一个区间的末尾值的情况，那一定是重叠，取二者最大末尾值更新res中最后一个区间即可。***
> - **step 4：如果遇到起点值大于res中最后一个区间的末尾值的情况，那一定没有重叠，后续也不会有这个末尾的重叠区间了，因为后面的起点只会更大，因此可以将它加入res。**

```java
public ArrayList<Interval> merge(ArrayList<Interval> intervals) {
    ArrayList<Interval> res = new ArrayList<>();
    if (intervals.isEmpty()) return res;
    //重载比较，按照区间首排序
    intervals.sort(new Comparator<Interval>() {
        public int compare(Interval o1, Interval o2) {
            if (o1.start != o2.start)
                return o1.start - o2.start;
            else
                return o1.end - o2.end;
        }
    });
    //放入第一个区间
    res.add(intervals.get(0));
    //记录要返回res内的元素个数
    int count = 0;
    for(int i = 1; i < intervals.size(); i++){
        Interval o1 = intervals.get(i);
        Interval origin = res.get(count);
        //提前已经排好序了，当o1的start大于origin说明不重叠
        if(o1.start > origin.end){
            res.add(o1);
            //元素个数有两个，同时代表了下一个要比较的对象res.get(count)
            count++;
        }else {
            //重叠了，删除res中原有那个，计算一个新的放进去
            res.remove(count);
            Interval s = new Interval(origin.start, o1.end);
            if(o1.end < origin.end)
                s.end = origin.end;
            res.add(s);
        }
    }
    return res;
}
```

### (5) *HJ68.成绩排序

> List<Map.Entry<String, Integer>> entryList = new ArrayList<>(map.entrySet());
>
> 可以把一个map的键值对转化为list
>
> 此题可以允许名字重复，我的题解里不允许
>
> 可以用**hashmap存储录入顺序和名字，数组存储录入顺序和分数**解题
>
> 垃圾题目没说清楚要求浪费时间

描述

给定一些同学的信息（名字，成绩）序列，请你将他们的信息按照成绩从高到低或从低到高的排列,相同成绩都按先录入排列在前的规则处理。

输入：

```
3
0
fang 90
yang 50
ning 70
```

输出：

```
fang 90
ning 70
yang 50
```

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    //用n接收数字的个数
    int n = scanner.nextInt();
    int rule = scanner.nextInt();
    LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
    scanner.nextLine();
    for (int i = 0; i < n; i++) {
        if (scanner.hasNext()) {
            String entry = scanner.nextLine();
            String[] s = entry.split(" ");
            String s0 = s[0];
            Integer s1 = Integer.parseInt(s[1]);
            if(!map.containsKey(s0)){
                map.put(s0, s1);
            }
        }
    }
    List<Map.Entry<String, Integer>> entryList = new ArrayList<>(map.entrySet());
    if (rule == 1) {
        entryList.sort(new Comparator<Map.Entry<String, Integer>>() {
            @Override
            public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
                int valueCompare = o1.getValue().compareTo(o2.getValue());
                // 如果值相同，则按插入顺序排序
                if (valueCompare == 0) {
                    return Integer.compare(indexOfEntry(map, o1), indexOfEntry(map, o2));
                }
                return valueCompare;
            }
        });
    } else if (rule == 0) {
        entryList.sort(new Comparator<Map.Entry<String, Integer>>() {
            @Override
            public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
                int valueCompare = o2.getValue().compareTo(o1.getValue());
                // 如果值相同，则按插入顺序排序
                if (valueCompare == 0) {
                    return Integer.compare(indexOfEntry(map, o1), indexOfEntry(map, o2));
                }
                return valueCompare;
            }
        });
    }
    for (Map.Entry<String, Integer> entry : entryList) {
        System.out.println(entry.getKey() + " " + entry.getValue());
    }
}

//获取entry在Map中的顺序
private static <K, V> int indexOfEntry(Map<K, V> map, Map.Entry<K, V> entry) {
    List<K> keys = new ArrayList<>(map.keySet());
    return keys.indexOf(entry.getKey());
}
```

## **4.**栈（2题）

### (1) NC52.括号序列

给出一个仅包含字符'(',')','{','}','['和']',的字符串，判断给出的字符串是否是合法的括号序列括号必须以正确的顺序关闭，"()"和"()[]{}"都是合法的括号序列，但"(]"和"([)]"不合法。

**示例1**

输入："["

返回值：false

**示例2**

输入："[]"

返回值：true

```java
    public boolean isValid (String s) {
        char[] charArray = s.toCharArray();
        List<Character> list = new ArrayList<>();
        for (char sv : charArray) {
            if (sv == '[' || sv == '(' || sv == '{') {
                list.add(sv);
            } else if (list.isEmpty()) {
                return false;
            } else if (sv == ']') {
                if (list.get(list.size() - 1) != '[') {
                    return false;
                }
                list.remove(list.size() - 1);
            }else if (sv == ')') {
                if (list.get(list.size() - 1) != '(') {
                    return false;
                }
                list.remove(list.size() - 1);
            }else if (sv == '}') {
                if (list.get(list.size() - 1) != '{') {
                    return false;
                }
                list.remove(list.size() - 1);
            }
        }
        if(list.isEmpty()){
            return true;
        }else {
            return false;
        }

    }
```

### (2) *leetcode 1614.括号的最大嵌套深度

如果字符串满足以下条件之一，则可以称之为 **有效括号字符串**（**valid parentheses string**，可以简写为 **VPS**）：

- 字符串是一个空字符串 `""`，或者是一个不为 `"("` 或 `")"` 的单字符。
- 字符串可以写为 `AB`（`A` 与 `B` 字符串连接），其中 `A` 和 `B` 都是 **有效括号字符串** 。
- 字符串可以写为 `(A)`，其中 `A` 是一个 **有效括号字符串** 。

类似地，可以定义任何有效括号字符串 `S` 的 **嵌套深度** `depth(S)`：

- `depth("") = 0`
- `depth(C) = 0`，其中 `C` 是单个字符的字符串，且该字符不是 `"("` 或者 `")"`
- `depth(A + B) = max(depth(A), depth(B))`，其中 `A` 和 `B` 都是 **有效括号字符串**
- `depth("(" + A + ")") = 1 + depth(A)`，其中 `A` 是一个 **有效括号字符串**

例如：`""`、`"()()"`、`"()(()())"` 都是 **有效括号字符串**（嵌套深度分别为 0、1、2），而 `")("` 、`"(()"` 都不是 **有效括号字符串** 。

给你一个 **有效括号字符串** `s`，返回该字符串的 `s` **嵌套深度** 。

**示例 1：**

```
输入：s = "(1+(2*3)+((8)/4))+1"
输出：3
解释：数字 8 在嵌套的 3 层括号中。
```

**示例 2：**

```
输入：s = "(1)+((2))+(((3)))"
输出：3
```

> 对于括号计算类题目，我们往往可以用栈来思考。
>
> 遍历字符串 sss，如果遇到了一个左括号，那么就将其入栈；如果遇到了一个右括号，那么就弹出栈顶的左括号，与该右括号匹配。这一过程中的栈的大小的最大值，即为 sss 的嵌套深度。
>
> 代码实现时，由于我们只需要考虑栈的大小，我们可以用一个变量 size\textit{size}size 表示栈的大小，当遇到左括号时就将其加一，遇到右括号时就将其减一，从而表示栈中元素的变化。这一过程中 size\textit{size}size 的最大值即为 sss 的嵌套深度。

```java
class Solution {
    public int maxDepth(String s) {
        int ans = 0, size = 0;
        for (int i = 0; i < s.length(); ++i) {
            char ch = s.charAt(i);
            if (ch == '(') {
                ++size;
                ans = Math.max(ans, size);
            } else if (ch == ')') {
                --size;
            }
        }
        return ans;
    }
}
```

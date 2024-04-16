---
group: 大厂算法题
title: 华为算法题笔记1
order: 1
---


# 华为算法题笔记

## 1. 入门题（5题）

### **（1）输入处理（重要）：HJ5.进制转换**

写出一个程序，接受一个十六进制的数，输出该数值的十进制表示。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        if (str.startsWith("0x")) {
            str=str.substring(2);
        }
        //直接通过parseInt(String,进制数)转化为10进制
        System.out.println(Integer.parseInt(str,16));
    }
}
```

思考：怎么和其他进制转化呢？10->16

设x=100,先依次比较16 0次方，1次方...当小于时如100<196,就从16 1一次方开始取余然后拼接。

### **(2) 排列组合： NC61.两数之和**

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

```java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; i++) {
            //寻找有没有相减的之后的目标元素
            if (map.containsKey(target - nums[i])) {
                return new int[]{map.get(target - nums[i]), i};
            }
            //将元素用[下标]->[元素值]的方式存入map中
            map.put(nums[i], i);
        }
        return new int[0];
    }
}
```

利用了hashmap查找复杂度为O(1)的特点，遍历数组，将元素用[下标]->[元素值]的方式存入map中。

对于每一个循环的元素都到hashmap里寻找有没有相减的之后的目标元素，若有则直接返回。

### (3) 快速排序：HJ3.明明的随机数

明明生成了*N*个1到500之间的随机整数。请你删去其中重复的数字，即相同的数字只保留一个，把其余相同的数去掉，然后再把这些数从小到大排序，按照排好的顺序输出。

输入：

```
3
2
2
1
```

输出：

```
1
2
```

```
输入解释：
第一个数字是3，也即这个小样例的N=3，说明用计算机生成了3个1到500之间的随机整数，接下来每行一个随机数字，共3行，也即这3个随机数字为：
2
2
1
所以样例的输出为：
1
2       
```

```java
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        //用n接收数字的个数
        int n = scanner.nextInt();
        int[] arr = new int[n];
        //将之后的n个数字放入arr
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }
        //善用Arrays.sort正向排序
        Arrays.sort(arr);
        //先输出头
        System.out.println(arr[0]);
        //若第i个元素与前一个元素不一样，才输出
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != arr[i - 1]) {
                System.out.println(arr[i]);
            }
        }

    }
}
```

### **(4) 哈希表： HJ10.字符个数统计**

编写一个函数，计算字符串中含有的不同字符的个数。字符在 ASCII 码范围内( 0~127 ，包括 0 和 127 )，换行表示结束符，不算在字符里。不在范围内的不作统计。多个相同的字符只计算一次

例如，对于字符串 abaca 而言，有 a、b、c 三种不同的字符，因此输出 3 。

```java
import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        HashSet set = new HashSet();
        for (int i = 0; i < str.length(); i++) {
            String s = str.substring(i, i + 1);
            set.add(s);
        }
        System.out.println(set.size());

    }
}
```

**HashSet 是一种不包含重复元素的集合数据结构，谨记**

**HashMap 是不包含重复键值的kv集合数据结构，请善用数据结构事半功倍**



### (5) 递归： NC68.跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

```
输入：
2
返回值：
2

说明：
青蛙要跳上两级台阶有两种跳法，分别是：先跳一级，再跳一级或者直接跳两级。因此答案为2
```

```java
import java.util.*;

public class Solution {
    public int jumpFloor (int number) {
        if (number == 2) {
            return 2;
        }
        if (number == 1) {
            return 1;
        }
        return jumpFloor(number - 2) + jumpFloor(number - 1);
    }
}
```

将3拆成2和1,1只有一种跳法，2有两种，所以加起来有三种

用递归将大问题拆成小问题再汇总，就是递归


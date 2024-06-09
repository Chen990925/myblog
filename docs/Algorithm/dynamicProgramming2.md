---
group: 动态规划
title: 动态规划模板
order: 2
---

# 动态规划模板

## 一、DP 问题

DP 即为动态规划问题，

可以使用动态规划的问题一般都有一些特点可以遵循。如题目的问法一般是三种方式：

1. 求最大值 / 最小值

2. 求可不可行

3. 求方案总数

如果碰到一个问题，是问这三个问题之一的，就有 90% 概率是使用动态规划来求解。

**重点说明的是，如果一个问题是让求出所有的方案和结果，则肯定不是使用动态规划**



DP 分析过程：

`状态表示：dp[i][j]：解释dp[i][j]的含义和属性min/max`

`状态计算：分析（最后一个状态的划分）`

## 二、背包问题

  `  f [i][j] `表示从前 i 个物品中选且体积不超过 j 的最大价值，以最后一个物品选多少个进行分类

###   1、01 背包

有 N 件物品和一个容量是 V 的背包。**每件物品只能使用一次**。

第 i 件物品的体积是 v[i]，价值是 w[i]。

求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。输出最大价值。

**输入格式**

第一行两个整数，N，V，用空格隔开，分别表示物品数量和背包容积。

接下来有 N 行，每行两个整数 v[i],w[i]，用空格隔开，分别表示第 i 件物品的体积和价值。

```java
public class KnapsackProblem {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取物品数量和背包容量
        int N = scanner.nextInt();
        int V = scanner.nextInt();
        
        // 定义物品的体积和价值数组
        int[] volumes = new int[N];
        int[] values = new int[N];
        
        for (int i = 0; i < N; i++) {
            volumes[i] = scanner.nextInt();
            values[i] = scanner.nextInt();
        }
        
        // 定义dp数组，dp[j]表示容量为j的背包的最大价值
        int[] dp = new int[V + 1];
        
        // 遍历每一个物品
        for (int i = 0; i < N; i++) {
            // 这里要逆序遍历背包容量，因为每个物品只能用一次
            for (int j = V; j >= volumes[i]; j--) {
                dp[j] = Math.max(dp[j], dp[j - volumes[i]] + values[i]);
            }
        }
        
        // 输出最大价值
        System.out.println(dp[V]);
    }
}
```

**动态规划概念**

动态规划是一种通过将问题分解为更小的子问题来解决问题的方法。对于 0/1 背包问题，我们需要决定是否将每个物品放入背包，以最大化背包内物品的总价值。

**状态定义**

我们定义 `dp[j]` 表示当背包容量为 `j` 时可以获得的最大价值。

**状态转移方程**

对于每个物品 `i`，我们有两个选择：

1. 不放入这个物品，则 `dp[j]` 保持不变。
2. 放入这个物品，则 `dp[j]` 由 `dp[j - volumes[i]] + values[i]` 更新（前提是 `j >= volumes[i]`）。

所以状态转移方程为： `dp[j]=max⁡(dp[j],dp[j−volumes[i]]+values[i])`

**逆序遍历**

逆序遍历的目的是确保每个物品只使用一次。假如我们正序遍历，当前物品的状态可能会影响同一轮次对同一物品的状态更新，导致一个物品被多次使用。



**具体过程解析**

假设有如下输入：

```
3 5
2 3
3 4
4 5
```

这表示有 3 个物品，背包容量为 5，各物品的体积和价值如下：

- 物品 1：体积 2，价值 3
- 物品 2：体积 3，价值 4
- 物品 3：体积 4，价值 5

我们初始化 `dp` 数组为 `[0, 0, 0, 0, 0, 0]`，表示容量从 0 到 5 的最大价值都为 0。

**第一次迭代（处理第一个物品）**

- 物品 1：体积 2，价值 3

我们逆序遍历背包容量 `j` 从 5 到 2：

1. `j=5`：`dp[5] = max(dp[5], dp[5-2] + 3) = max(0, 0 + 3) = 3`
2. `j=4`：`dp[4] = max(dp[4], dp[4-2] + 3) = max(0, 0 + 3) = 3`
3. `j=3`：`dp[3] = max(dp[3], dp[3-2] + 3) = max(0, 0 + 3) = 3`
4. `j=2`：`dp[2] = max(dp[2], dp[2-2] + 3) = max(0, 0 + 3) = 3`

更新后的 `dp` 数组为 `[0, 0, 3, 3, 3, 3]`。

**第二次迭代（处理第二个物品）**

- 物品 2：体积 3，价值 4

逆序遍历背包容量 `j` 从 5 到 3：

1. `j=5`：`dp[5] = max(dp[5], dp[5-3] + 4) = max(3, 3 + 4) = 7`
2. `j=4`：`dp[4] = max(dp[4], dp[4-3] + 4) = max(3, 0 + 4) = 4`
3. `j=3`：`dp[3] = max(dp[3], dp[3-3] + 4) = max(3, 0 + 4) = 4`

更新后的 `dp` 数组为 `[0, 0, 3, 4, 4, 7]`。

**第三次迭代（处理第三个物品）**

- 物品 3：体积 4，价值 5

逆序遍历背包容量 `j` 从 5 到 4：

1. `j=5`：`dp[5] = max(dp[5], dp[5-4] + 5) = max(7, 0 + 5) = 7`
2. `j=4`：`dp[4] = max(dp[4], dp[4-4] + 5) = max(4, 0 + 5) = 5`

更新后的 `dp` 数组为 `[0, 0, 3, 4, 5, 7]`。

**最终结果**

最终，`dp[V]` 表示背包容量为 `V` 时的最大价值。对于本例，`dp[5] = 7`，即在容量为 5 的背包中可以获得的最大价值为 7。



### 2、完全背包

有 N 种物品和一个容量是 V 的背包，**每种物品都有无限件可用**。

第 i 种物品的体积是 v[i]，价值是 w[i]。

求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。输出最大价值。

**解析**

**动态规划思想**

我们定义一个一维数组 `dp[j]` 来表示容量为 `j` 的背包可以获得的最大价值。和 0/1 背包问题不同的是，在完全背包问题中，我们可以对每种物品进行多次选择。因此，在状态转移方程中，我们不需要逆序遍历。

**状态转移方程**

对于每种物品 `i`，我们有： `dp[j]=max⁡(dp[j],dp[j−v[i]]+w[i])` 这意味着，对于每个容量 `j`，我们要么不选择物品 `i`，要么选择物品 `i`（并且可以再次选择）。

**初始化**

初始状态时，`dp[0]` 为 0，因为背包容量为 0 时，价值也为 0。

**动态规划实现步骤**

1. 初始化 `dp` 数组。
2. 对于每种物品，正序遍历背包容量。
3. 对于每个容量 `j`，更新 `dp[j]`。

```java
import java.util.Scanner;

public class CompleteKnapsack {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取物品数量和背包容量
        int N = scanner.nextInt();  // 物品数量
        int V = scanner.nextInt();  // 背包容量

        // 定义物品的体积和价值数组
        int[] volumes = new int[N];
        int[] values = new int[N];

        for (int i = 0; i < N; i++) {
            volumes[i] = scanner.nextInt();
            values[i] = scanner.nextInt();
        }

        // 定义dp数组，dp[j]表示容量为j的背包的最大价值
        int[] dp = new int[V + 1];

        // 遍历每一个物品
        for (int i = 0; i < N; i++) {
            // 正序遍历背包容量
            for (int j = volumes[i]; j <= V; j++) {
                dp[j] = Math.max(dp[j], dp[j - volumes[i]] + values[i]);
            }
        }

        // 输出最大价值
        System.out.println(dp[V]);

        scanner.close();
    }
}
```





### 3、多重背包

有 N 种物品和一个容量是 V 的背包。

**第 i 种物品最多有 s[i] 件**，每件体积是 v[i]，价值是 w[i]。

求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。输出最大价值。

多重背包问题是 0/1 背包和完全背包问题的结合体。每种物品有一个限制数量，不能无限次使用。解决这个问题的思路有几种，其中一种是将多重背包问题转换成 0/1 背包问题来解决，这种方法相对简单易懂。

**转换思路**

我们可以将每种物品按照它的数量展开成若干个单独的 0/1 背包物品。具体来说，如果一种物品最多可以使用 `s[i]` 件，每件物品的体积为 `v[i]`，价值为 `w[i]`，我们可以将其展开成最多 `s[i]` 个单独的物品，每个物品的体积为 `v[i]`，价值为 `w[i]`。

**动态规划实现**

我们仍然使用动态规划的方法来解决这个问题。具体步骤如下：

1. 初始化一个 `dp` 数组，`dp[j]` 表示背包容量为 `j` 时的最大价值。
2. 遍历每种物品，针对每种物品使用 `s[i]` 次，将其转换为多个 0/1 背包问题来处理。
3. 更新 `dp` 数组，使其表示在加入当前物品后各个容量的最大价值。

```java
public class MultiKnapsack {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取物品数量和背包容量
        int N = scanner.nextInt();  // 物品数量
        int V = scanner.nextInt();  // 背包容量

        // 定义物品的体积、价值和最大数量数组
        int[] volumes = new int[N];
        int[] values = new int[N];
        int[] quantities = new int[N];

        for (int i = 0; i < N; i++) {
            volumes[i] = scanner.nextInt();
            values[i] = scanner.nextInt();
            quantities[i] = scanner.nextInt();
        }

        // 定义dp数组，dp[j]表示容量为j的背包的最大价值
        int[] dp = new int[V + 1];

        // 遍历每一个物品
        for (int i = 0; i < N; i++) {
            // 对于每一个物品，处理其最多数量
            for (int k = 1; k <= quantities[i]; k++) {
                // 0/1背包问题中的逆序遍历
                for (int j = V; j >= volumes[i]; j--) {
                    dp[j] = Math.max(dp[j], dp[j - volumes[i]] + values[i]);
                }
            }
        }

        // 输出最大价值
        System.out.println(dp[V]);
    }
}
```



## 三、线性 dp 问题

### 最长上升子序列

> 给定一个长度为 N 的数列，求数值严格单调递增的子序列的长度最长是多少。
>
> 输入样例：
>
> ```
> 7
> 3 1 2 1 8 5 6
> ```
>
> 输出样例：
>
> ```
> 4
> ```

```java
public class LongestIncreasingSubsequence {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int n = scanner.nextInt();
        int[] nums = new int[n];
        
        for (int i = 0; i < n; i++) {
            nums[i] = scanner.nextInt();
        }
        
        System.out.println(lengthOfLIS(nums));
        
        scanner.close();
    }
    
    public static int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        
        int n = nums.length;
        int[] dp = new int[n];
        int maxLength = 1;
        
        for (int i = 0; i < n; i++) {
            dp[i] = 1; // 每个元素自身可以构成一个长度为1的上升子序列
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLength = Math.max(maxLength, dp[i]);
        }
        
        return maxLength;
    }
}
```

步骤

1. **定义状态**：
   - `dp[i]` 表示以第 `i` 个元素结尾的最长上升子序列的长度。
2. **状态转移方程**：
   - 对于每个元素 `i`，检查它之前的所有元素 `j` (0 ≤ j < i)。
   - 如果 `nums[j] < nums[i]`，表示可以把 `nums[i]` 加到以 `nums[j]` 结尾的上升子序列后面，那么 `dp[i]` 可以更新为 `dp[j] + 1`，表示长度增加1。
   - 具体地，`dp[i] = max(dp[i], dp[j] + 1)`。
3. **初始状态**：
   - 每个元素自身可以构成一个长度为1的上升子序列，所以 `dp[i] = 1`。
4. **最终结果**：
   - `LIS` 的长度就是 `dp` 数组中的最大值，即 `max(dp[i])`。
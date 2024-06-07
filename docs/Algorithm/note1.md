---
group: 日常刷题
title: 日常刷题1
order: 1
---

# 算法题1

## 迷宫问题

输入描述：

输入两个整数，分别表示二维数组的行数，列数。再输入相应的数组，其中的 1 表示墙壁，0 表示可以走的路。数据保证有唯一解，不考虑有多解的情况，即迷宫只有一条通道。

输出描述：

左上角到右下角的最短路径，格式如样例所示。

输入：

```
5 5
0 1 0 0 0
0 1 1 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
```

复制

输出：

```
(0,0)
(1,0)
(2,0)
(2,1)
(2,2)
(2,3)
(2,4)
(3,4)
(4,4)
```

```java
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // 注意 hasNext 和 hasNextLine 的区别
        while (in.hasNextInt()) { // 注意 while 处理多个 case
            int n = in.nextInt();
            int m = in.nextInt();
            // 构造迷宫
            int[][] map = new int[n][m];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    map[i][j] = in.nextInt();
                }
            }
            // 路径存储的数组
            List<Pos> path = new ArrayList<>();
            // DFS 搜索路径
            dfs(map, 0, 0, path);
            // 输出
            for (Pos p : path) {
                System.out.println("(" + p.x + "," + p.y + ")");
            }
        }
    }

    public static boolean dfs(int[][] map,int x,int y,List<Pos> path){
        //添加路径并标记已经走过
        path.add(new Pos(x, y));
        map[x][y] = 1;
        // 已经到边界了，结束
        if (x == map.length - 1 && y == map[0].length - 1) {
            return true;
        }
        // 向下能走时
        if (x + 1 < map.length && map[x + 1][y] == 0) {
            if (dfs(map, x + 1, y, path)) {
                return true;
            }
        }
        // 向右能走时
        if (y + 1 < map[0].length && map[x][y + 1] == 0) {
            if (dfs(map, x, y + 1, path)) {
                return true;
            }
        }
        // 向上能走时
        if (x - 1 > -1 && map[x - 1][y] == 0) {
            if (dfs(map, x - 1, y, path)) {
                return true;
            }
        }
        // 向左能走时
        if (y - 1 > -1 && map[x][y - 1] == 0) {
            if (dfs(map, x, y - 1, path)) {
                return true;
            }
        }
        // 回溯
        path.remove(path.size() - 1);
        map[x][y] = 0;
        return false;
    }

    // 简单的位置类
    public static class Pos {
        int x;
        int y;
        public Pos(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

//模板
//    public static int dfs(int step){
//        if(当前状态=目标状态){
//            return ...;
//        }
//        for(查找新状态){
//            标记状态;
//            dfs(下一状态);
//            撤销状态标记，也就是回溯;
//        }
//    }
```



## 质数因子

**描述**

功能：输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如 180 的质因子为 2 2 3 3 5 ）

数据范围： 1≤𝑛≤2×109+14 1≤*n*≤2×109+14 

**输入描述：**

输入一个整数

**输出描述：**

按照从小到大的顺序输出它的所有质数的因子，以空格隔开。

示例 1

输入：

```
180
```

复制

输出：

```
2 2 3 3 5
```

```java
public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    // 注意 hasNext 和 hasNextLine 的区别
    while (in.hasNextInt()) { // 注意 while 处理多个 case
        long number = Long.parseLong(in.next());
        while (number % 2 == 0) {
            System.out.print(2 + " ");
            number /= 2;
        }
        // 从3开始，尝试奇数
        for (int i = 3; i <= Math.sqrt(number); i += 2) {
            while (number % i == 0) {
                System.out.print(i + " ");
                number /= i;
            }
        }
        // 处理剩余的number
        if (number > 2) {
            System.out.print(number + " ");
        }
    }
}
//代码解释
//处理2：通过一个while循环处理2的因子，将所有能整除的2记录下来，并将number不断除以2，直到不能整除为止。
//处理奇数：从3开始，每次增加2，检查奇数是否能整除number，将能整除的奇数记录下来，并将number不断除以该奇数，直到不能整除为止。
//处理剩余的number：如果number大于2，说明它是一个质数，将其记录下来。
//输出结果：返回所有质因子的列表。
```





## 最长递增子序列

**动态规划算法思想**

1. **初始化**：创建一个数组 `dp`，其中 `dp[i]` 表示以 `nums[i]` 结尾的最长递增子序列的长度，初始化为1，因为每个元素本身可以作为长度为1的子序列。
2. 状态转移：
   - 对于每个 `nums[i]`，遍历其之前的所有元素 `nums[j]`（`j` 从 `0` 到 `i-1`）。
   - 如果 `nums[i]` 大于 `nums[j]`，则 `nums[i]` 可以接在 `nums[j]` 之后形成一个更长的递增子序列。这时更新 `dp[i]`：`dp[i] = max(dp[i], dp[j] + 1)`。
3. **结果**：整个数组遍历完成后，`dp` 数组中的最大值即为最长递增子序列的长度。

```java
import java.util.Scanner;
import java.util.*;

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // 注意 hasNext 和 hasNextLine 的区别
        int n=in.nextInt();
        int[] arr=new int[n];
        for (int i = 0; i < n; i++) {
            arr[i]=in.nextInt();
        }
        int[] dp = new int[n]; // 动态规划数组，dp[i]表示以nums[i]结尾的最长递增子序列的长度
        int maxLength = 1; // 最长递增子序列的长度至少为1
        // 初始化每个位置的最长递增子序列长度为1
        Arrays.fill(dp, 1);
        // 动态规划计算最长递增子序列长度
        for (int i = 1; i < n; i++) { // 从第二个元素开始
            for (int j = 0; j < i; j++) { // 遍历i之前的所有元素
                if (arr[i] > arr[j]) { // 如果nums[i]可以接在nums[j]后面
                    dp[i] = Math.max(dp[i], dp[j] + 1); // 更新dp[i]的值
                }
            }
            maxLength = Math.max(maxLength, dp[i]); // 更新最长递增子序列的长度
        }
        System.out.println(maxLength);
    }
}
```



## 凑零钱问题

**问题描述**：给定不同面值的硬币和一个总金额，计算可以凑成该总金额的最少硬币数。如果不能凑成，返回 -1。

```java
public static void main(String[] args) {
    int[] coins = {1, 3, 4}; // 硬币的面值数组
    int amount = 6; // 目标金额
    int result = coinChange(coins, amount); // 调用函数计算最少硬币数
    System.out.println("Minimum coins required: " + result); // 打印结果
}

/**
 * 计算凑成目标金额所需的最少硬币数
 *
 * @param coins 硬币的面值数组
 * @param amount 目标金额
 * @return 最少硬币数，如果无法凑成返回 -1
 */
public static int coinChange(int[] coins, int amount) {
    // 特殊情况处理：如果目标金额为0，返回0
    if (amount == 0) return 0;

    // dp数组，其中dp[i]表示凑成金额i所需的最少硬币数
    int[] dp = new int[amount + 1];
    // 初始化dp数组，初始值为一个大于amount的值（因为最少硬币数不会超过amount）
    Arrays.fill(dp, amount + 1);
    dp[0] = 0; // 凑成金额0所需的硬币数为0

    // 遍历所有金额，从1到amount
    for (int i = 1; i <= amount; i++) {
        // 遍历每个硬币面值
        for (int coin : coins) {
            // 如果当前金额i大于等于硬币面值
            if (i - coin >= 0) {
                // 更新dp[i]，取当前dp[i]和dp[i - coin] + 1的最小值
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    // 如果dp[amount]大于amount，说明无法凑成目标金额，返回-1；否则返回dp[amount]
    return dp[amount] > amount ? -1 : dp[amount];
}
```




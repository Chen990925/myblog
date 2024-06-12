---
group: 逻辑分析
title: 逻辑分析1
order: 1
---

# 逻辑分析

## 数字涂色

一、题目描述 

疫情过后，希望小学终于又重新开学了，三年二班开学第一天的任务是将后面的黑板报重新制作。 黑板上已经写上了 N 个正整数，同学们需要给这每个数分别上一种颜色。 为了让黑板报既美观又有学习意义，老师要求同种颜色的所有数都可以被这种颜色中最小的那个数整除。 现在请你帮帮小朋友们，算算最少需要多少种颜色才能给这 N 个数进行上色。

 二、输入描述 

第一行有一个正整数 N，其中。 第二行有 N 个 int 型数 (保证输入数据在 [1,100] 范围中)，表示黑板上各个正整数的值。 

7 58 14 20 67 41 4 63 

三、输出描述 输出只有一个整数，为最少需要的颜色种数。

 6

```java
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 输入数字的个数
        int N = scanner.nextInt();
        int[] nums = new int[N];
        
        // 输入黑板上的各个数字
        for (int i = 0; i < N; i++) {
            nums[i] = scanner.nextInt();
        }
        
        // 对数字进行排序
        Arrays.sort(nums);
        
        // 记录数字是否已上色，初始化为false
        boolean[] colored = new boolean[N];
        // 记录最少需要的颜色种数
        int colorCount = 0;
        
        // 遍历每一个数字
        for (int i = 0; i < N; i++) {
            if (!colored[i]) {
                // 如果当前数字未上色，则需要新增一种颜色
                colorCount++;
                int base = nums[i];
                // 将可以被当前数字整除的数字标记为已上色
                for (int j = i; j < N; j++) {
                    if (nums[j] % base == 0) {
                        colored[j] = true;
                    }
                }
            }
        }
        
        // 输出最少需要的颜色种数
        System.out.println(colorCount);
    }
}

```



## 机智的外卖员 `寻路问题`

**一、题目描述**

外卖员每天在大厦中送外卖，大厦共有 L 层（0<L<=10^5），当他处于第 N 层楼时，可以每分钟通过步行梯向上达到 N+1 层，或向下达到 N-1 层，或者乘坐电梯达到 2*N 层。给定他所处位置 N，以及外卖配送的目的楼层 M，计算他送达的最短时间。

**二、输入描述**

当前所处楼层 N 和外卖配送的目的楼层 M。

**三、输出描述**

送达的最短时间

**要计算外卖员从楼层 NNN 到楼层 MMM 的最短时间，可以使用广度优先搜索（BFS）算法。BFS 在寻找最短路径问题上非常有效，特别是在这种状态转换的场景下（从当前楼层向上、向下、或通过电梯到达2倍楼层）**

```java
public class DeliveryTime {
    // 静态内部类用于表示每一步的状态，包括当前楼层和到达这个楼层的时间
    static class State {
        int floor;
        int time;

        State(int floor, int time) {
            this.floor = floor;
            this.time = time;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 输入当前楼层N和目标楼层M
        int N = scanner.nextInt();
        int M = scanner.nextInt();

        // 调用求解函数，输出最短时间
        System.out.println(minTime(N, M));
    }

    public static int minTime(int start, int target) {
        // 如果起始楼层等于目标楼层，直接返回0
        if (start == target) {
            return 0;
        }

        // 初始化队列用于BFS
        Queue<State> queue = new LinkedList<>();
        // 记录访问过的楼层，防止重复访问
        boolean[] visited = new boolean[100001];
        // 将起始楼层加入队列
        queue.add(new State(start, 0));
        visited[start] = true;

        while (!queue.isEmpty()) {
            State current = queue.poll();
            int currentFloor = current.floor;
            int currentTime = current.time;

            // 生成可能的下一步状态
            int[] nextFloors = {currentFloor + 1, currentFloor - 1, currentFloor * 2};

            for (int nextFloor : nextFloors) {
                // 如果下一步状态是目标楼层，返回所需时间
                if (nextFloor == target) {
                    return currentTime + 1;
                }

                // 如果下一步状态是有效楼层且没有访问过，将其加入队列
                if (nextFloor >= 0 && nextFloor <= 100000 && !visited[nextFloor]) {
                    queue.add(new State(nextFloor, currentTime + 1));
                    visited[nextFloor] = true;
                }
            }
        }
        // 由于问题保证了一定有解，这里不会被执行到
        return -1;
    }
}
```



## 最大社交距离



1. **题目描述**

   疫情期间需要大家保证一定的社交距离，公司组织开交流会议，座位一排共 N 个座位，编号分别为 [0,N-1]，要求员工一个接着一个进入会议室，并且可以在任何时候离开会议室

   满足:

   - 每当一个员工进入时，需要坐到最大社交距离(最大化自己和其他人的距离的座位)
   - 如果有多个这样的座位，则坐到索引最小的那个座位

2. **输入描述**

   - 会议室座位总数 seatNum (1<=seatNum<= 500)
   - 员工的进出顺序 seatOrLeave 数组，元素值为 1，表示进场;元素值为负数，表示出场(特殊:位置0的员工不会离开)
   - 例如 -4 表示坐在位置 4的员工离开(保证有员工坐在该座位上)

3. **输出描述**

   最后进来员工，他会坐在第几个位置，如果位置已满，则输出-1。
   **输入**
   10
   [1，1，1， 1，-4，1]
   **输出**

   5

```java
public class SocialDistancingSeats {

    public static void main(String[] args) {
        // 示例输入
        int seatNum = 10;
        int[] seatOrLeave = {1, 1, 1, 1, -4, 1};

        // 输出最后一个进来员工坐的座位
        System.out.println(findLastSeat(seatNum, seatOrLeave));
    }

    public static int findLastSeat(int seatNum, int[] seatOrLeave) {
        TreeSet<Integer> occupied = new TreeSet<>();
        occupied.add(0); // 假设位置0的员工不会离开
        
        int lastSeat = -1;

        for (int action : seatOrLeave) {
            if (action == 1) {
                if (occupied.size() == seatNum) {
                    return -1; // 位置已满
                }
                int seat = findMaxDistanceSeat(seatNum, occupied);
                occupied.add(seat);
                lastSeat = seat;
            } else {
                int leaveSeat = -action;
                occupied.remove(leaveSeat);
            }
        }
        return lastSeat;
    }

    private static int findMaxDistanceSeat(int seatNum, TreeSet<Integer> occupied) {
        // 初始最大距离和座位
        int maxDistance = -1;
        int seatToSit = -1;

        // 迭代所有可能的空座位（通过检查两个人之间的距离）
        int prev = -1;
        for (int curr : occupied) {
            if (prev == -1) {
                // 检查从第一个座位到第一个已占座位之间的距离
                if (curr > 0 && curr > maxDistance) {
                    maxDistance = curr;
                    seatToSit = 0;
                }
            } else {
                // 检查两个已占座位之间的中点
                int distance = (curr - prev) / 2;
                int midSeat = prev + distance;
                if (distance > maxDistance) {
                    maxDistance = distance;
                    seatToSit = midSeat;
                }
            }
            prev = curr;
        }

        // 检查最后一个已占座位到最后一个座位之间的距离
        if (prev != -1 && seatNum - 1 - prev > maxDistance) {
            seatToSit = seatNum - 1;
        }

        return seatToSit;
    }
}
```



## 报文回路

**一、题目描述**

IGMP 协议中响应报文和查询报文，是维系组播通路的两个重要报文，在一条已经建立的组播通路中两个相邻的 host 和 router，router 会给 host 发送查询报文，host 收到查询报文后，给 router 回复一个响应报文，以维持之间的关系，一旦关系断裂，那么这条组播通路就异常了。

现通过某种手段，抓取到了 host 和 router 两者通讯的所有响应报文和查询报文，请分析该组播通路是否正常。

**二、输入描述** 

第一行抓到的报文数量 C（C <= 100），后续 C 行依次输入设备节点 D1 和 D2，表示从 D1 到 D2 发送了单向的报文，D1 和 D2 用空格隔开。

**三、输出描述**

组播通路是否正常，正常输出 true，异常输出 false。

```java
public class IGMPPathChecker {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 输入抓到的报文数量
        int C = Integer.parseInt(scanner.nextLine());
        if (C <= 0 || C > 100) {
            System.out.println("false");
            return;
        }

        // 使用一个集合来记录所有的报文对
        Set<String> reportSet = new HashSet<>();
        for (int i = 0; i < C; i++) {
            String report = scanner.nextLine();
            reportSet.add(report);
        }

        // 使用一个集合来记录处理的查询报文对
        Set<String> processedQueries = new HashSet<>();

        // 遍历报文集合，寻找成对的查询和响应报文
        for (String report : reportSet) {
            String[] nodes = report.split(" ");
            String D1 = nodes[0];
            String D2 = nodes[1];

            // 构建响应报文对
            String responseReport = D2 + " " + D1;

            // 检查是否存在对应的响应报文
            if (reportSet.contains(responseReport)) {
                // 成对的查询和响应报文，加入已处理集合
                processedQueries.add(report);
                processedQueries.add(responseReport);
            } else {
                // 如果查询报文没有对应的响应报文，输出 "false"
                System.out.println("false");
                return;
            }
        }

        // 检查所有的报文是否都已经成对处理
        if (processedQueries.size() == reportSet.size()) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}
```



## 购买水果最便宜的方案

**1、题目描述**

有 m 个水果超市在 1-n 个小时的不同时间段提供不同价格的打折水果，如果某餐厅每个小时都要新采购一种水果给餐厅使用的话， 请选出 n 个小时内，采购水果的最便宜的花费总和。 （假设 m 个超市打折时间段可以覆盖 n 小时）

**2、输入描述**

N — 总小时数 n
m — 水果超市个数 m
X [0] x [1] x [2]— 第 2-m + 1 行：每行长度为 3 的数组，代表各超市在 x [0]-x [1] 小时（包含 [x1]）提供价格为 x2 的水果。
范围提示: 1 <= n < 2^10 （1024）

**3、输出描述**

采购水果的最便宜的花费总和。
用例：

```bash
输入
4
6
2 3 10
2 4 20
1 3 15
1 4 25
3 4 8
1 4 16

输出
41
ps：第1小时选15元的水果，第2小时10元水果，第3选8元水果，第4 小时选8元水果，共15+10+8+8=41
```

```java
import java.util.*;

public class CheapestFruitPurchase {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取 n 和 m
        int n = scanner.nextInt();
        int m = scanner.nextInt();
        
        // 初始化价格数组，将每小时的价格设为一个很大的值
        int[] prices = new int[n + 1];
        Arrays.fill(prices, Integer.MAX_VALUE);
        
        // 读取每个超市的打折时间段和价格，并更新价格数组
        for (int i = 0; i < m; i++) {
            int start = scanner.nextInt();
            int end = scanner.nextInt();
            int price = scanner.nextInt();
            
            for (int j = start; j <= end; j++) {
                prices[j] = Math.min(prices[j], price);
            }
        }
        
        // 计算总花费
        int totalCost = 0;
        for (int i = 1; i <= n; i++) {
            totalCost += prices[i];
        }
        
        // 输出结果
        System.out.println(totalCost);
    }
}
```



## 运输时间

**一、题目描述与示例题目**

描述 M (1<= M <= 20)辆车需要在一条不能超车的单行道到达终点，起点到终点的距离为N (1<= N <= 400)

速度快的车追上前车后，只能以前车的速度继续行驶，求最后一车辆到达目的地花费的时间。

注：每辆车固定间隔 1 小时出发，比如第一辆车 0 时出发，第二辆车 1 时出发，依次类推

**输入描述**

第一行两个数字：M N 分别代表车辆数和到终点的距离，以空格分隔。

接下来 M 行，每行 1 个数字 S，代表每辆车的速度。0 < S < 30

**输出描述**

输出：最后一辆车到达目的地花费的时间。

示例输入 2 11

3

2

输出 5.5

**说明** 2辆车，距离`11`，`0`时出发的车速度快，`1`时出发的车慢，达到目的地花费5.5

```java
import java.util.*;

public class CarRaceSimulation {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取M和N
        int M = scanner.nextInt();
        int N = scanner.nextInt();
        
        // 读取每辆车的速度
        double[] speeds = new double[M];
        for (int i = 0; i < M; i++) {
            speeds[i] = scanner.nextDouble();
        }
        
        // 计算每辆车到达终点的时间
        double[] arrivalTimes = new double[M];
        arrivalTimes[0] = N / speeds[0];  // 第一辆车的到达时间
        
        for (int i = 1; i < M; i++) {
            // 当前车出发的时间
            double startTime = i;
            // 当前车如果不被阻挡的到达时间
            double freeArrivalTime = N / speeds[i] + startTime;
            // 前车的到达时间
            double previousArrivalTime = arrivalTimes[i - 1];
            
            // 如果不被阻挡，当前车的到达时间
            // 如果被阻挡，当前车的到达时间要和前车一致
            arrivalTimes[i] = Math.max(freeArrivalTime, previousArrivalTime);
        }
        
        // 最后一辆车的到达时间
        System.out.printf("%.1f\n", arrivalTimes[M - 1]);
    }
}
```

 `arrivalTimes[i] = Math.max(freeArrivalTime, previousArrivalTime);`

不用具体考虑是否超车的情况，只要计算出哪个耗费时间最多即可，你再快也得和前面的慢车同时到达



## **乘坐保密电梯**

有一座保密大楼，你从 0 楼到达指定楼层 m, 必须这样的规则乘坐电梯 Q:

给定一个数字序列，每次根据序列中的数字 n, 上升 n 层或者下降 n 层，前后两次的方向必须相反，规定首次的方向向上，自行组织序列的顺序按规定操作到达指定楼层。求解到达楼层的序列组合，如果不能到达楼层，给出小于该楼层的最近序列组合。

输入描述

第一行：期望的楼层，取值范围 [1,50]; 序列总个数，取值范围 [1,23]

第二行：序列，每个值取值范围 [1,50]

输出描述

能够达到楼层或者小于该楼层最近的序列

备注

・操作电梯时不限定楼层范围。

・必须对序列中的每个项进行操作，不能只使用一部分。

用例

```python3
输入
5 3
1 2 6
输出
6 2 1
说明
1 2 6,6 2 1均为可行解，按先处理大值的原则结果为621
```

```java
import java.util.*;

public class ElevatorSequence {
    private static List<Integer> bestSequence = new ArrayList<>();
    private static int closestFloor = -1;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取目标楼层和数字序列的数量
        int targetFloor = scanner.nextInt();
        int numCount = scanner.nextInt();
        int[] sequence = new int[numCount];
        
        // 读取数字序列
        for (int i = 0; i < numCount; i++) {
            sequence[i] = scanner.nextInt();
        }
        
        // 找到最佳序列
        List<Integer> result = findBestSequence(targetFloor, sequence);
        
        // 输出结果
        if (result.isEmpty()) {
            System.out.println(-1);
        } else {
            result.forEach(e -> System.out.print(e + " "));
        }
    }

    /**
     * 找到能到达目标楼层或最接近目标楼层的最佳序列
     *
     * @param targetFloor 目标楼层
     * @param sequence    数字序列
     * @return 最佳序列
     */
    private static List<Integer> findBestSequence(int targetFloor, int[] sequence) {
        backtrack(0, 0, sequence, new ArrayList<>(), targetFloor);
        return bestSequence;
    }

    /**
     * 回溯方法，尝试不同的序列组合
     *
     * @param currentFloor    当前楼层
     * @param index           当前处理到的序列索引
     * @param sequence        数字序列
     * @param currentSequence 当前的序列组合
     * @param targetFloor     目标楼层
     */
    private static void backtrack(int currentFloor, int index, int[] sequence, List<Integer> currentSequence, int targetFloor) {
        // 如果处理完所有数字
        if (index == sequence.length) {
            // 如果达到目标楼层，记录当前序列
            if (currentFloor == targetFloor) {
                bestSequence = new ArrayList<>(currentSequence);
            } 
            // 如果未达到目标楼层，但比当前记录的最近楼层更接近目标楼层，更新记录
            else if (currentFloor > closestFloor && currentFloor < targetFloor) {
                closestFloor = currentFloor;
                bestSequence = new ArrayList<>(currentSequence);
            }
            return;
        }

        // 处理第一个数字，只能向上移动
        if (index == 0) {
            currentSequence.add(sequence[index]);
            backtrack(currentFloor + sequence[index], index + 1, sequence, currentSequence, targetFloor);
            currentSequence.remove(currentSequence.size() - 1);
        } else {
            // 处理后续数字，方向与前一次相反
            if (index % 2 == 1) { // 奇数索引，上一次向上，这次向下
                currentSequence.add(sequence[index]);
                backtrack(currentFloor - sequence[index], index + 1, sequence, currentSequence, targetFloor);
                currentSequence.remove(currentSequence.size() - 1);
            } else { // 偶数索引，上一次向下，这次向上
                currentSequence.add(sequence[index]);
                backtrack(currentFloor + sequence[index], index + 1, sequence, currentSequence, targetFloor);
                currentSequence.remove(currentSequence.size() - 1);
            }
        }
    }
}
```

### dfs通用模板

```
int check(参数)
{
    if(满足条件)
        return 1;
    return 0;
}
bool pd(参数){
    相应操作
}
void dfs(int step)
{
        判断边界pd()
        {
            不在边界内，即回溯
        }
        尝试每一种可能
        {
               满足check条件
 
               标记
 
               继续下一步dfs(step+1)
 
               恢复初始状态（回溯的时候要用到）
        }
}
```



## 异常的打卡记录

**一、题目描述**

考勤记录是分析和考核职工工作时间利用情况的原始依据，也是计算职工工资的原始依据。

为了正确地计算职工工资和监督工资基金使用情况，公司决定对员工的收集打卡记录进行异常排查。

如果出现以下两种情况，则认为打卡异常：

1. 实际设备号与注册设备号不一样；
2. 同一个员工的两个打卡记录的时间小于 60 分钟并且打卡距离超过 5km。

给定打卡记录的字符串数组 clockRecord（每个打卡记录组成为：工号，时间（分钟），打卡距离（km），实际设备号，注册设备号），返回其中异常的打卡记录（按输入顺序输出）。

**二、输入描述**

第一行输入为 N，表示打卡记录数；

之后的 N 行为打卡记录，每一行为一条打卡记录。

**三、输出描述**

按顺序输出异常的打卡记录，分号隔开。

**四、解题思路**

1. 读取输入的打卡记录数 num；
2. 创建一个空的异常打卡记录列表 errorList 用于存储异常打卡记录；
3. 创建一个映射表 map，key 为工号，value 为该工号的打卡记录集合；
4. 循环 num 次，读取每一条打卡记录：



## 求字符串中所有整数的最小和

**题目描述**

> 输入字符串 s 输出 s 中包含所有整数的最小和
>
> 说明：
>
> 1. 字符串 s 只包含 a-z,A-Z,+,-
>
> 2. 合法的整数包括
>
>    1）正整数，一个或者多个 0-9 组成，如：0,2,3,002,102
>
>    2）负整数，负号 - 开头，数字部分由一个或者多个 0-9 组成，如 - 2,-012,-23,-00023

**输入描述**

> 包含数字的字符串

**输出描述**

> 所有整数的最小和

**示例 1**

```
输入
bb1234aa
输出
10
1234
```

**示例 2**

```
输入
bb12-34aa
输出
-31
1234
```

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MinSumOfIntegers {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine();
        System.out.println(findMinSum(s));
    }

    public static int findMinSum(String s) {
        List<Integer> integers = new ArrayList<>();
        StringBuilder numStr = new StringBuilder();
        boolean isNegative = false;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            // 检查字符是否为数字或负号
            if (c == '-') {
                // 如果当前负号前面已经有数字，先将前面的数字加入列表
                if (numStr.length() > 0) {
                    integers.add(Integer.parseInt(numStr.toString()));
                    numStr.setLength(0);  // 清空 StringBuilder
                }
                isNegative = true;
            } else if (Character.isDigit(c)) {
                // 如果当前字符是数字，则添加到 StringBuilder
                if (isNegative) {
                    numStr.append('-');
                    isNegative = false;
                }
                numStr.append(c);
            } else {
                // 如果当前字符不是数字或负号，则结束当前数字的读取
                if (numStr.length() > 0) {
                    integers.add(Integer.parseInt(numStr.toString()));
                    numStr.setLength(0);  // 清空 StringBuilder
                }
                isNegative = false;
            }
        }

        // 检查最后一个数字是否需要添加到列表中
        if (numStr.length() > 0) {
            integers.add(Integer.parseInt(numStr.toString()));
        }

        // 计算所有整数的和
        int sum = 0;
        for (int num : integers) {
            sum += num;
        }
        
        return sum;
    }
}
```




---
group: 大厂算法题
title: 真题1
order: 6
---

# 2024年真题

# map 与 list

## 数组去重和排序

**一、题目描述**

给定一个乱序的数组，[删除所有](https://so.csdn.net/so/search?q=删除所有&spm=1001.2101.3001.7020)的重复元素，使得每个元素只出现一次，并且按照出现的次数从高到低进行排序，相同出现次数按照第一次出现顺序进行先后排序。

**二、输入描述**

一个数组。

**三、输出描述**

去[重排序](https://so.csdn.net/so/search?q=重排序&spm=1001.2101.3001.7020)后的数组。

```java
public class RemoveDuplicatesAndSort {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        
        // 解析输入数组
        String[] elements = input.split(" ");
        int[] nums = new int[elements.length];
        for (int i = 0; i < elements.length; i++) {
            nums[i] = Integer.parseInt(elements[i]);
        }

        // 调用处理函数
        int[] result = removeDuplicatesAndSort(nums);

        // 输出结果
        for (int num : result) {
            System.out.print(num + " ");
        }
    }

    public static int[] removeDuplicatesAndSort(int[] nums) {
        // 使用LinkedHashMap以保持插入顺序
        Map<Integer, Integer> frequencyMap = new LinkedHashMap<>();
        
        // 统计每个元素的出现次数
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // 创建一个列表，包含Map的所有条目
        List<Map.Entry<Integer, Integer>> entryList = new ArrayList<>(frequencyMap.entrySet());

        // 按照频率从高到低排序，频率相同的按第一次出现顺序排序
        entryList.sort((entry1, entry2) -> {
            if (entry2.getValue().equals(entry1.getValue())) {
                // 频率相同，按第一次出现顺序排序
                return 0;
            }
            // 按照频率从高到低排序
            return entry2.getValue() - entry1.getValue();
        });

        // 构建结果数组
        int[] result = new int[entryList.size()];
        for (int i = 0; i < entryList.size(); i++) {
            result[i] = entryList.get(i).getKey();
        }

        return result;
    }
}
```



## 垃圾信息拦截

| 题目说明 | 大众对垃圾短信深恶痛绝，希望能对垃圾短信发送者进行识别，为此，很多软件增加 了垃圾短信识别机制。经分析，发现正常用户的短信通常具备交互性，而垃圾短信往 往都是大量单向的短信，按照如下规则进行垃圾短信识别： 本题中，发送者 A 符合以下条件之一的，则认为 A 是垃圾短信发送者： **·** A 发送短信的接收者中，没有发过短信给 A 的人数 L > 5； **·** A 发送的短信数 - A 接收的短信数 M > 10； **·** 如果存在 X，A 发送给 X 的短信数 - A 接收到 X 的短信数 N > 5。 |
| -------- | ------------------------------------------------------------ |
| 输入描述 | 第一行为条目数目，接下来几行是具体的条目，每个条目，是一对 ID，第一个数字是发送者 ID，后面的数字是接收者 ID，中间空格隔开，所有的 ID 都为无符号整型，ID 最大值为 100； 同一个条目中，两个 ID 不会相同（即不会自己给自己发消息）； 最后一行为指定的 ID。 |
| 输出描述 | 输出该 ID 是否为垃圾短信发送者（是输出 true，否则输出 false），并且按序列输出 L、M 的值（由于 N 值不唯一，不需要输出）； 输出均为宇符串。 |

| **示例**   |                                                              |
| ---------- | ------------------------------------------------------------ |
| **示例 1** |                                                              |
| 输入       | 15 1 2 1 3 1 4 1 5 1 6 1 7 1 8 1 9 1 10 1 11 1 12 1 13 1 14 14 1 1 15 1 |
| 输出       | true 13 13                                                   |

```java
import java.util.*;

public class SpamMessageIdentifier {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int entries = Integer.parseInt(scanner.nextLine());
        List<int[]> logs = new ArrayList<>();
        
        // 读取短信记录
        for (int i = 0; i < entries; i++) {
            String[] parts = scanner.nextLine().split(" ");
            int sender = Integer.parseInt(parts[0]);
            int receiver = Integer.parseInt(parts[1]);
            logs.add(new int[]{sender, receiver});
        }
        
        int targetID = Integer.parseInt(scanner.nextLine());
        
        // 统计发送和接收短信的次数
        Map<Integer, Set<Integer>> senders = new HashMap<>();
        Map<Integer, Integer> sentCount = new HashMap<>();
        Map<Integer, Integer> receivedCount = new HashMap<>();
        Map<String, Integer> sendReceiveCount = new HashMap<>();
        
        for (int[] log : logs) {
            int sender = log[0];
            int receiver = log[1];
            
            senders.computeIfAbsent(sender, k -> new HashSet<>()).add(receiver);
            sentCount.put(sender, sentCount.getOrDefault(sender, 0) + 1);
            receivedCount.put(receiver, receivedCount.getOrDefault(receiver, 0) + 1);
            String key = sender + "," + receiver;
            sendReceiveCount.put(key, sendReceiveCount.getOrDefault(key, 0) + 1);
        }
        
        // 计算L值
        int L = 0;
        if (senders.containsKey(targetID)) {
            for (int receiver : senders.get(targetID)) {
                if (!senders.getOrDefault(receiver, Collections.emptySet()).contains(targetID)) {
                    L++;
                }
            }
        }
        
        // 计算M值
        int M = sentCount.getOrDefault(targetID, 0) - receivedCount.getOrDefault(targetID, 0);
        
        // 判断是否为垃圾短信发送者
        boolean isSpamSender = L > 5 || M > 10;
        if (senders.containsKey(targetID)) {
            for (int receiver : senders.get(targetID)) {
                int N = sendReceiveCount.getOrDefault(targetID + "," + receiver, 0) 
                      - sendReceiveCount.getOrDefault(receiver + "," + targetID, 0);
                if (N > 5) {
                    isSpamSender = true;
                    break;
                }
            }
        }
        
        // 输出结果
        System.out.println(isSpamSender + " " + L + " " + M);
    }
}
```





# 链表

## 特异性双端队列 - 链表

**一、题目描述**

给定一个队列，但是这个队列比较特殊，可以从头部添加数据，也可以从尾部添加数据，但是只能从头部[删除数据](https://so.csdn.net/so/search?q=删除数据&spm=1001.2101.3001.7020)。

输入一个数字 n，会依次添加数字 1~n（也就是添加 n 次）。

但是在添加数据的过程中，也会删除数据，要求删除必须按照 1~n 按照顺序进行删除，所以在删除时，可以根据需要调整队列中数字的顺序以满足删除条件。

**二、输入描述**

第一行一个数据 N，表示数据的范围。

接下来的 2N 行是添加和删除语句。

其中：

1. head add x 表示从头部添加元素 x；
2. tail add 表示从尾部添加元素；
3. remove 表示删除元素。

**三、输出描述**

输出一个数字，表示最小的调整顺序次数。

```java
public class SpecialDeque {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        scanner.nextLine(); // consume the newline
        
        Deque<Integer> deque = new ArrayDeque<>();
        int[] pos = new int[n + 1];
        int removeCount = 0;
        int adjustCount = 0;

        for (int i = 0; i < 2 * n; i++) {
            String command = scanner.nextLine();
            if (command.startsWith("head add")) {
                int x = Integer.parseInt(command.split(" ")[2]);
                deque.addFirst(x);
            } else if (command.startsWith("tail add")) {
                int x = Integer.parseInt(command.split(" ")[2]);
                deque.addLast(x);
            } else if (command.equals("remove")) {
                removeCount++;
                if (deque.peekFirst() != removeCount) {
                    adjustCount++;
                    while (deque.peekFirst() != removeCount) {
                        deque.addLast(deque.removeFirst());
                    }
                }
                deque.removeFirst();
            }
        }
        
        System.out.println(adjustCount);
        scanner.close();
    }
}
```



# 滑动窗口

滑动窗口是一种高效的技术，**可以在线性时间内找到满足特定条件的子数组**。

##  数组连续和 

**一、题目描述**

给定一个含有 N 个正整数的数组，求出有多少连续区间（包括单个正整数），它们的和大于等于 x。

**二、输入描述**

第一行为两个整数 N,x。(0<N≤100000, 0≤x≤10000000)

第二行有 N 个正整数 （每个正整数小于等于 100）。

**三、输出描述**

输出一个整数，表示所求的个数

注意：此题对效率有要求，暴力解法通过率不高

```java
public class SubarrayCount {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int N = scanner.nextInt();
        int x = scanner.nextInt();
        int[] array = new int[N];
        
        for (int i = 0; i < N; i++) {
            array[i] = scanner.nextInt();
        }
        
        scanner.close();
        
        int left = 0, right = 0;
        int current_sum = 0;
        int count = 0;
        
        while (right < N) {
            current_sum += array[right];
            
            while (current_sum >= x) {
                count += N - right;
                current_sum -= array[left];
                left++;
            }
            
            right++;
        }
        
        System.out.println(count);
    }
}
```

##  最左侧冗余覆盖子串

**一、题目描述**

给定两个[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020) s1 和 s2 和正整数 k，其中 s1 长度为 n1，s2 长度为 n2， 在 s2 中选一个子串，满足:

1. 该子串长度为 n1+k；
2. 该子串中包含 s1 中全部字母；
3. 该子串每个字母出现次数不小于 s1 中对应的字母， 我们称 s2 以长度 k 冗余覆盖 s1， 给定 s1，s2，k, 求最左侧的 s2 以长度 k 冗余覆盖 s1 的子串的首个元素的下标， 如果没有返回 - 1。

**二、输入描述**

输入为三行：

1. 第一行为 s1
2. 第二行为 s1
3. 第三行为 k

s1 和 s2 都只包含小写字母。

**三、输出描述**

最左侧的 s2 以长度 k 冗余覆盖 s1 的子串的首个元素下标，若不存在，则返回 - 1。

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s1 = scanner.nextLine();
        String s2 = scanner.nextLine();
        int k = scanner.nextInt();
        scanner.close();
        
        int result = findLeftmostSubstring(s1, s2, k);
        System.out.println(result);
    }

    private static int findLeftmostSubstring(String s1, String s2, int k) {
        int n1 = s1.length();
        int n2 = s2.length();
        int targetLength = n1 + k;

        if (targetLength > n2) {
            return -1;
        }

        int[] required = new int[26];
        for (char c : s1.toCharArray()) {
            required[c - 'a']++;
        }

        int[] current = new int[26];
        int left = 0;

        for (int right = 0; right < n2; right++) {
            current[s2.charAt(right) - 'a']++;

            if (right - left + 1 > targetLength) {
                current[s2.charAt(left) - 'a']--;
                left++;
            }

            if (right - left + 1 == targetLength) {
                if (isValid(required, current)) {
                    return left;
                }
            }
        }

        return -1;
    }

    private static boolean isValid(int[] required, int[] current) {
        for (int i = 0; i < 26; i++) {
            if (current[i] < required[i]) {
                return false;
            }
        }
        return true;
    }
}
```



# 矩阵

## 服务器广播 - 并查集

**题目描述**

> 服务器连接方式包括直接相连，间接连接，A 和 B 直接连接，B 和 C 直接连接，则 A 和 c 间接连接，直接连接和间接连接都可以发送广播，给出一个 N * N 数组，代表 N 个服务器，`matrix [i][j] == 1`，则代表 i 和 j 直接连接；不等于 1 时，代表 i 和 j 不直接连接，`matrix [i][j] == 1`，即自己和自己直接连接，`matrix [i][j] == matrix [j][i]`
>
> 计算初始需要给几台服务器广播，才可以使每个服务器都收到广播

------

**输入输出**

> 输入
> 输入为 N 行，每行有 N 个数字，为 0 或 1，空格分隔，
> 构成 N * N

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int N = scanner.nextInt();
        int[][] matrix = new int[N][N];
        
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                matrix[i][j] = scanner.nextInt();
            }
        }
        
        System.out.println(countBroadcastServers(matrix));
    }

    public static int countBroadcastServers(int[][] matrix) {
        int N = matrix.length;
        boolean[] visited = new boolean[N];
        int count = 0;

        for (int i = 0; i < N; i++) {
            if (!visited[i]) {
                dfs(matrix, visited, i);
                count++;
            }
        }

        return count;
    }

    private static void dfs(int[][] matrix, boolean[] visited, int node) {
        visited[node] = true;
        for (int i = 0; i < matrix.length; i++) {
            if (matrix[node][i] == 1 && !visited[i]) {
                dfs(matrix, visited, i);
            }
        }
    }
}
```

**代码解释**

1. **输入读取**：
   - 使用 `Scanner` 读取输入的 N 和邻接矩阵。
2. **主函数 `countBroadcastServers`**：
   - 初始化一个 `visited` 数组来记录每个服务器是否已经被访问。
   - 遍历每个服务器，如果它没有被访问过，则调用 `dfs` 函数进行深度优先搜索，并将连通分量计数器加一。
3. **深度优先搜索函数 `dfs`**：
   - 标记当前服务器为已访问。
   - 遍历所有服务器，如果当前服务器与其他服务器直接连接且该服务器未被访问，则递归调用 `dfs` 进行深度优先搜索。



## 疫情扩散时间计算(腐烂的橘子)

在给定的 `m x n` 网格 `grid` 中，每个单元格可以有以下三个值之一：

- 值 `0` 代表空单元格；
- 值 `1` 代表新鲜橘子；
- 值 `2` 代表腐烂的橘子。

每分钟，腐烂的橘子 **周围 4 个方向上相邻** 的新鲜橘子都会腐烂。

返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 `-1` 。

**示例 1：**

```
输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
输出：4
```

**示例 2：**

```
输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
```

**示例 3：**

```
输入：grid = [[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
```

```java
import java.util.LinkedList;
import java.util.Queue;

public class RottingOranges {
    public int orangesRotting(int[][] grid) {
        int m = grid.length; // 获取网格的行数
        int n = grid[0].length; // 获取网格的列数
        int freshCount = 0; // 记录新鲜橘子的数量
        Queue<int[]> queue = new LinkedList<>(); // 创建一个队列用于BFS

        // 初始化队列和新鲜橘子数量
        for (int i = 0; i < m; i++) { // 遍历每一行
            for (int j = 0; j < n; j++) { // 遍历每一列
                if (grid[i][j] == 2) { // 如果当前橘子是腐烂的
                    queue.offer(new int[]{i, j}); // 将其坐标加入队列
                } else if (grid[i][j] == 1) { // 如果当前橘子是新鲜的
                    freshCount++; // 新鲜橘子数量加一
                }
            }
        }

        // 如果没有新鲜橘子，直接返回0
        if (freshCount == 0) {
            return 0; // 返回0表示无需时间腐烂橘子
        }

        // 四个方向的数组，表示上下左右四个方向
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        int minutes = 0; // 记录腐烂过程经过的时间

        // 开始BFS
        while (!queue.isEmpty()) { // 当队列不为空时循环
            int size = queue.size(); // 当前层的大小
            boolean rotted = false; // 标记是否有橘子腐烂

            for (int i = 0; i < size; i++) { // 遍历当前层的所有节点
                int[] current = queue.poll(); // 取出队首元素
                int x = current[0], y = current[1]; // 获取当前橘子的坐标

                for (int[] direction : directions) { // 遍历四个方向
                    int nx = x + direction[0]; // 新位置的行坐标
                    int ny = y + direction[1]; // 新位置的列坐标

                    // 检查新位置是否在网格内且是否是新鲜橘子
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] == 1) {
                        grid[nx][ny] = 2; // 将新鲜橘子腐烂
                        queue.offer(new int[]{nx, ny}); // 将新位置加入队列
                        freshCount--; // 新鲜橘子数量减一
                        rotted = true; // 标记有橘子腐烂
                    }
                }
            }

            if (rotted) { // 如果有橘子腐烂
                minutes++; // 时间加一
            }
        }

        // 如果还有剩余的新鲜橘子，返回-1，否则返回腐烂所有橘子所需的时间
        return freshCount == 0 ? minutes : -1;
    }

    public static void main(String[] args) {
        RottingOranges solution = new RottingOranges();
        int[][] grid1 = {{2, 1, 1}, {1, 1, 0}, {0, 1, 1}};
        int[][] grid2 = {{2, 1, 1}, {0, 1, 1}, {1, 0, 1}};
        int[][] grid3 = {{0, 2}};

        // 输出每个示例的结果
        System.out.println(solution.orangesRotting(grid1)); // 输出: 4
        System.out.println(solution.orangesRotting(grid2)); // 输出: -1
        System.out.println(solution.orangesRotting(grid3)); // 输出: 0
    }
}
```



# 二分查找

## 猴子吃桃

一、题目描述

孙悟空喜欢吃蟠桃，一天他乘守卫蟠桃园的天兵天将离开了而偷偷的来到王母娘娘的蟠桃园偷吃蟠桃。

已知蟠桃园有 N 棵蟠桃树，第 i 棵蟠桃树上有 N [i]（大于 0）个蟠桃，天兵天将将在 H（不小于蟠桃树棵数）小时后回来。

孙悟空可以决定他吃蟠桃的速度 K（单位：个 / 小时），每个小时他会选择一颗蟠桃树，从中吃掉 K 个蟠桃，如果这棵树上的蟠桃数小于 K，他将吃掉这棵树上所有蟠桃，然后这一小时内不再吃其余蟠桃树上的蟠桃。

孙悟空喜欢慢慢吃，但仍想在天兵天将回来前将所有蟠桃吃完。

求孙悟空可以在 H 小时内吃掉所有蟠桃的最小速度 K（K 为整数）。

二、输入描述

从标准输入中[读取一行](https://so.csdn.net/so/search?q=读取一行&spm=1001.2101.3001.7020)数字，前面数字表示每棵数上蟠桃个数，最后的数字表示天兵天将将离开的时间。

三、输出描述

吃掉所有蟠桃的 最小速度 K（K 为整数）或 输入异常时输出 -1。

1、输入

3 11 6 7 8

2、输出

4

3、说明

天兵天将 8 个小时后回来，孙悟空吃掉所有蟠桃的最小速度 4。

1. 第 1 小时全部吃完第一棵树，吃 3 个，
2. 第 2 小时吃 4 个，第二棵树剩 7 个，
3. 第 3 小时吃 4 个，第二棵树剩 3 个，
4. 第 4 小时吃 3 个，第二棵树吃完，
5. 第 5 小时吃 4 个，第三棵树剩 2 个，
6. 第 6 小时吃 2 个，第三棵树吃完，
7. 第 7 小时吃 4 个，第 4 棵树剩 3 个，
8. 第 8 小时吃 3 个，第 4 棵树吃完。

```java
public class Test09 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        // 天兵天将将离开的时间H
        int H = arr[arr.length - 1];

        // 获取每棵数上蟠桃个数
        arr = Arrays.copyOf(arr, arr.length - 1);
        // 从少到多排序
        Arrays.sort(arr);

        //将吃桃速度定为最小树上的桃子和最多树上的桃子的一半
        int left = 1;
        int right = arr[arr.length - 1];
        while (left < right) {
            int mid = (left + right) / 2;
            // 吃完了，还能慢一点
            if (dfs(arr, H, mid)) {
                right = mid;
            } else {// 没吃完，吃快一点
                left = mid + 1;
            }
        }
        System.out.println(left);
        System.out.println("执行次数：" + num);
    }

    // 记录回溯次数，优化回溯算法
    static int num = 0;
    // 上一次吃完所有桃子的速度
    static int preSpeed = 0;

    private static boolean dfs(int[] arr, int H, int K) {
        int times = 0;
        for (int i = 0; i < arr.length; i++) {
            num++;
            // 以速度K吃完每颗桃树的时间
            times += arr[i] / K;
            if (arr[i] % K != 0) {
                times++;
            }
        }
        return times <= H;
    }
}
```



## 机器人搬砖 - 二分查找

和上题类似

**题目描述**

机器人搬砖，一共有 N 堆砖存放在 N 个不同的仓库中，第 i 堆砖中有 bricks [i] 块砖头，要求在 8 小时内搬完。

机器人每小时能搬砖的数量取决于有多少能量格，机器人一个小时中只能在一个仓库中搬砖，机器人的能量格只在这一个小时有效，为使得机器人损耗最小化，应尽量减小每次补充的能量格数。

为了保障在 8 小时内能完成搬砖任务，请计算每小时给机器人充能的最小能量格数。

- 无需考虑机器人补充能力格的耗时；
- 无需考虑机器人搬砖的耗时；
- 机器人每小时补充能量格只在这一个小时中有效；

**输入描述**

第一行为一行数字，空格分隔

**输出描述**

机器人每小时最少需要充的能量格，若无法完成任务，输出 -1

```java
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String str=sc.nextLine();
    String[] strArr=str.split(" ");
    int[] arr=new int[strArr.length];
    for (int i = 0; i < strArr.length; i++) {
        arr[i]=Integer.parseInt(strArr[i]);
    }
    // 从少到多排序
    Arrays.sort(arr);
    int left = 1;
    int right = arr[arr.length - 1];
    while (left < right) {
        int mid = (left + right) / 2;
        if (dfs(arr, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    System.out.println(left);
}

private static boolean dfs(int[] arr, int K) {
    int times = 0;
    for (int j : arr) {
        // 以速度K搬完一个仓库的砖的时间
        times += j / K;
        if (j % K != 0) {
            times++;
        }
    }
    return times <= 8;
}
```



# 回溯

## 全排列`注意和组合的区别`

**一、题目描述**

给定一个只包含大写[英文字母](https://so.csdn.net/so/search?q=英文字母&spm=1001.2101.3001.7020)的字符串 S，要求你给出对 S 重新排列的所有不相同的排列数。

如：S 为 ABA，则不同的排列有 ABA、AAB、BAA 三种。

**二、输入描述**

输入一个长度不超过 10 的字符串 S，确保都是大写的。

**三、输出描述**

输出 S 重新排列的所有不相同的排列数（包含自己本身）。

```java
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String str = sc.nextLine();
    char[] charArr = str.toCharArray();
    String[] strArray = new String[charArr.length];
    for (int i = 0; i < charArr.length; i++) {
        strArray[i] = String.valueOf(charArr[i]);
    }
    //存储排列的set
    Set<String> path = new HashSet<>();
    StringBuilder builder = new StringBuilder();
    boolean[] used = new boolean[str.length()]; // 用于标记每个字符是否被使用过
    dfs1(path, strArray, builder, str.length(), used);
    path.forEach(System.out::println);
}

private static void dfs1(Set<String> path, String[] arr, StringBuilder builder, int length, boolean[] used) {
    // 递归终止条件是：path 的长度等于 k
    if (builder.toString().length() == length) {
        path.add(builder.toString());
        return;
    }
    for (int i = 0; i < length; i++) {
        if (used[i]) {
            continue;
        }
        // 标记当前字符为已使用
        used[i] = true;
        builder.append(arr[i]);
        dfs1(path, arr, builder, length, used);
        builder.deleteCharAt(builder.length() - 1);
        used[i] = false;
    }
}
```



## 单词搜索，找到它

题目描述

> 找到它是个小游戏，你需要在一个矩阵中找到给定的单词。假设给定单词 HELLOWORLD，在矩阵中只要能找到 H->E->L->L->O->W->O->R->L->D 连成的单词，就算通过。
>
> 注意区分英文字母大小写，并且你只能上下左右行走，不能走回头路。

输入描述

> 输入第一行包含两个整数 n、m (0<n,m<21) 分别表示 n 行 m 列的矩阵，第二行是长度不超过 100 的单词 W（在整个矩阵中给定单词 W 只会出现一次），从第 3 行到第 n+2 行是只包含大小写英文字母的长度为 m 的字符串矩阵。

输出描述

> 如果能在矩阵中连成给定的单词，则输出给定单词首字母在矩阵中的位置（第几行 第几列），否则输出 “NO”。

输入

5 5
HELLOWORLD
CPUCY
EKLQH
CHELL
LROWO
DGRBC

输出

3 2

```java
import java.util.Scanner;

public class WordSearch {
    // 定义方向数组，用于表示上、下、左、右四个方向的移动
    private static final int[] rowDirection = {-1, 1, 0, 0};
    private static final int[] colDirection = {0, 0, -1, 1};

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 读取矩阵的行数和列数
        int n = sc.nextInt();
        int m = sc.nextInt();
        // 读取目标单词
        String word = sc.next();
        // 初始化矩阵
        char[][] board = new char[n][m];
        
        // 读取矩阵中的字符
        for (int i = 0; i < n; i++) {
            board[i] = sc.next().toCharArray();
        }
        
        // 查找目标单词在矩阵中的起始位置
        int[] result = findWord(board, word);
        if (result[0] != -1) {
            // 如果找到目标单词，输出起始位置（行和列从1开始计数）
            System.out.println((result[0] + 1) + " " + (result[1] + 1));
        } else {
            // 如果没有找到目标单词，输出 "NO"
            System.out.println("NO");
        }
        
        sc.close();
    }

    // 在矩阵中查找目标单词的方法
    private static int[] findWord(char[][] board, String word) {
        int n = board.length;
        int m = board[0].length;
        
        // 遍历矩阵中的每个位置
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // 如果当前字符是目标单词的第一个字符，并且通过DFS查找到整个单词
                if (board[i][j] == word.charAt(0) && dfs(board, word, 0, i, j, new boolean[n][m])) {
                    // 返回起始位置
                    return new int[]{i, j};
                }
            }
        }
        
        // 如果没有找到目标单词，返回 -1, -1
        return new int[]{-1, -1};
    }

    // 深度优先搜索方法，用于查找单词
    private static boolean dfs(char[][] board, String word, int index, int row, int col, boolean[][] visited) {
        // 如果已经找到整个单词，返回 true
        if (index == word.length()) {
            return true;
        }
        
        // 如果当前坐标越界，字符不匹配，或者已经访问过，返回 false
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] != word.charAt(index) || visited[row][col]) {
            return false;
        }
        
        // 标记当前坐标为已访问
        visited[row][col] = true;
        // 遍历四个方向
        for (int d = 0; d < 4; d++) {
            int newRow = row + rowDirection[d];
            int newCol = col + colDirection[d];
            // 递归查找下一个字符
            if (dfs(board, word, index + 1, newRow, newCol, visited)) {
                return true;
            }
        }
        // 回溯，撤销标记
        visited[row][col] = false;
        return false;
    }
}

```

## 新员工考试

小聪入职新公司，参加线上的新员工必考试共 25 题，依次是 10 个判断题 (每题 2 分）、10 个单选题 (每题 4 分) 和 5 个多选题 (每题 8 分), 总分 100 分。

考题只能顺序作答，答对题目获得相应的分数，答错题目获得 0 分，考试系统不提示作答是否正确，答题过程中如果累积有 3 题答错，直接中考试并计算考试分数。

小聪考试结果是 N 分（0<=N<=100)，请根据小聪的分数，算出所有可能的答题情况的个数。

```java
    public static int judgeNum = 10;  // 判断题总数
    public static int chooseNum = 10; // 单选题总数
    public static int chooseMore = 5; // 多选题总数
    public static int sum = 25;       // 总题数

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 读取目标分数
        int target = sc.nextInt();
        List<Grade> result = new ArrayList<>();
        int[] arr = new int[]{0, 0, 0}; // 用来记录答对的题目数量，依次是判断题、单选题和多选题
        dfs(result, 0, target, arr, 0, 0);
        System.out.println(result.size());
    }

    /**
     * 深度优先搜索，用来计算所有可能的答题情况的个数
     *
     * @param gradeList 存储所有可能的答题情况
     * @param begin 当前题目索引
     * @param target 目标分数
     * @param arr 记录当前答对的题目数量
     * @param correct 当前答对的题目数量
     * @param wrong 当前答错的题目数量
     */
    public static void dfs(List<Grade> gradeList, int begin, int target, int[] arr, int correct, int wrong) {
        // 计算当前总分数
        int currentScore = 2 * arr[0] + 4 * arr[1] + 8 * arr[2];

        // 如果总分数达到目标分数，且错误数不超过2，则记录一种可能情况
        if (currentScore == target && wrong <= 2) {
            gradeList.add(new Grade(arr[0], arr[1], arr[2]));
            return;
        }

        // 如果错误数达到3，或者总分超过目标分数，或者所有题目都已作答，则返回
        if (wrong >= 3 || currentScore > target || begin >= sum) {
            return;
        }

        // 处理当前题目
        if (begin < judgeNum) {
            // 当前是判断题
            arr[0]++;
            dfs(gradeList, begin + 1, target, arr, correct + 1, wrong);
            arr[0]--;
            dfs(gradeList, begin + 1, target, arr, correct, wrong + 1);
        } else if (begin < judgeNum + chooseNum) {
            // 当前是单选题
            arr[1]++;
            dfs(gradeList, begin + 1, target, arr, correct + 1, wrong);
            arr[1]--;
            dfs(gradeList, begin + 1, target, arr, correct, wrong + 1);
        } else {
            // 当前是多选题
            arr[2]++;
            dfs(gradeList, begin + 1, target, arr, correct + 1, wrong);
            arr[2]--;
            dfs(gradeList, begin + 1, target, arr, correct, wrong + 1);
        }
    }
}

// 用于记录答对的题目数量
class Grade {
    int judgeCorrect;  // 答对的判断题数量
    int chooseCorrect; // 答对的单选题数量
    int chooseMoreCorrect; // 答对的多选题数量

    public Grade(int judgeCorrect, int chooseCorrect, int chooseMoreCorrect) {
        this.judgeCorrect = judgeCorrect;
        this.chooseCorrect = chooseCorrect;
        this.chooseMoreCorrect = chooseMoreCorrect;
    }
}
```



## 考古问题-全排列

一、题目描述

考古问题，假设以前的石碑被打碎成了很多块，每块上面都有一个或若干个字符，请你写个程序来把之前石碑上文字可能的组合全部写出来，按升序进行排列。

二、输入描述

若干个字符。

三、输出描述

把之前石碑上文字可能的组合全部写出来，按升序进行排列。

1、输入

3
a b c

2、输出

ab

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // 读取输入
    int n = scanner.nextInt();
    String[] chars = new String[n];

    for (int i = 0; i < n; i++) {
        chars[i] = scanner.next();
    }
    //存储排列的set
    Set<String> path = new TreeSet<>();
    StringBuilder builder = new StringBuilder();
    boolean[] used = new boolean[n]; // 用于标记每个字符是否被使用过
    dfs(path, chars, builder, n, used);
    path.forEach(System.out::println);
}


public static void dfs(Set<String> path, String[] arr, StringBuilder builder, int length, boolean[] used){
    if (builder.toString().length() == length) {
        path.add(builder.toString());
        return;
    }
    for (int i = 0; i < length; i++) {
        if(used[i]){
            continue;
        }
        used[i]=true;
        builder.append(arr[i]);
        dfs(path, arr, builder, length, used);
        builder.deleteCharAt(builder.length() - 1);
        used[i] = false;
    }
}
```



## 字符串拼接

**一、题目描述**

给定 M 个字符 (a-z) ，从中取出任意字符 (每个字符只能用一次) 拼接成长度为 N 的字符串，要求相同的字符不能相邻。

计算出给定的字符列表能拼接出多少种满足条件的字符串，输入非法或者无法拼接出满足条件的字符串则返回 0 。

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // 读取输入
    int m = scanner.nextInt();
    int n = scanner.nextInt();
    String[] chars = new String[m];
    for (int i = 0; i < chars.length; i++) {
        chars[i] = scanner.next();
    }
    //存储排列的set
    Set<String> path = new HashSet<>();
    StringBuilder builder = new StringBuilder();
    boolean[] used = new boolean[m]; // 用于标记每个字符是否被使用过
    dfs(path, chars, builder, n, used);
    path.forEach(System.out::println);
}


public static void dfs(Set<String> path, String[] chars, StringBuilder builder, int n, boolean[] used) {
    if (builder.toString().length() == n) {
        path.add(builder.toString());
        return;
    }
    for (int i = 0; i < n; i++) {
        if (used[i]) {
            continue;
        }
        if (builder.length()!=0&&builder.substring(builder.length()-1).equals(chars[i])) {
            continue;
        }
        used[i]=true;
        builder.append(chars[i]);
        dfs(path, chars, builder, n, used);
        builder.deleteCharAt(builder.length() - 1);
        used[i] = false;
    }
}
```



# 字符串处理

## 查找舆情热词

**题目描述：**

输入正整数 topN 和文章数 M，正整数 topN 表示要找出来的出现频率最高的 topN 个字符串，M 篇文章中每篇文章会有两个字符串，一个是标题字符串，一个是正文字符串，字符串间有空格，每个单词被空格隔开。

我们的目的就是把这 M 篇文章连标题带正文拆成一个个单词，然后统计这一堆单词出现频率最高的 topN 个。

**统计规则：**
标题中出现的词语频率系数为 3，正文中出现的词语频率系数为 1，返回的答案应该按照词语出现从高到低排序，当词语出现次数频率相同时，在标题中出现频率次数高的排在前面，如果仍然相同，则按照词语在标题中出现的先后顺序进行排序，如果仍相同，则按照词语在正文中出现的先后顺序进行排序，先出现的排在前面。

**输入**

输入：第一行输入为正整数 topN 和文章数 M。然后由于每篇文章有标题和正文两行，因此后面有 2*M 行数据。从第二行起，按顺序处理每篇文章的标题串和正文串。

**输出**

出现频率 topN 高的单词，每个单词用 `‘ ’` 隔开。

```java
import java.util.*;

public class TopNWords {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 读取输入的topN和文章数M
        int topN = scanner.nextInt();
        int M = scanner.nextInt();
        scanner.nextLine();  // consume the remaining newline

        // 用于存储单词及其相关统计数据的Map
        Map<String, WordData> wordMap = new HashMap<>();
        
        // 处理每篇文章
        for (int i = 0; i < M; i++) {
            String title = scanner.nextLine(); // 读取标题
            String body = scanner.nextLine();  // 读取正文

            // 处理标题字符串
            processString(title, wordMap, true);
            // 处理正文字符串
            processString(body, wordMap, false);
        }

        // 将Map中的数据转为List以便排序
        List<WordData> wordList = new ArrayList<>(wordMap.values());
        
        // 按照指定规则排序
        wordList.sort((a, b) -> {
            if (b.totalFrequency != a.totalFrequency) {
                return b.totalFrequency - a.totalFrequency; // 按总频率降序
            } else if (b.titleFrequency != a.titleFrequency) {
                return b.titleFrequency - a.titleFrequency; // 按标题频率降序
            } else if (a.firstTitleIndex != b.firstTitleIndex) {
                return a.firstTitleIndex - b.firstTitleIndex; // 按标题中首次出现位置升序
            } else {
                return a.firstBodyIndex - b.firstBodyIndex; // 按正文中首次出现位置升序
            }
        });

        // 输出前topN个单词
        for (int i = 0; i < Math.min(topN, wordList.size()); i++) {
            if (i > 0) {
                System.out.print(" ");
            }
            System.out.print(wordList.get(i).word);
        }
    }

    // 处理字符串并更新wordMap中的数据
    private static void processString(String text, Map<String, WordData> wordMap, boolean isTitle) {
        String[] words = text.split("\\s+"); // 将字符串按空格拆分成单词数组
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            // 获取或创建WordData对象
            WordData wordData = wordMap.getOrDefault(word, new WordData(word));
            
            if (isTitle) {
                wordData.titleFrequency++; // 更新标题中的频率
                wordData.totalFrequency += 3; // 标题中的词频权重为3
                if (wordData.firstTitleIndex == -1) {
                    wordData.firstTitleIndex = i; // 记录首次在标题中出现的位置
                }
            } else {
                wordData.bodyFrequency++; // 更新正文中的频率
                wordData.totalFrequency++; // 正文中的词频权重为1
                if (wordData.firstBodyIndex == -1) {
                    wordData.firstBodyIndex = i; // 记录首次在正文中出现的位置
                }
            }
            // 将更新后的WordData对象放入Map中
            wordMap.put(word, wordData);
        }
    }

    // 用于存储每个单词相关统计数据的类
    static class WordData {
        String word; // 单词本身
        int totalFrequency; // 总频率
        int titleFrequency; // 在标题中的频率
        int bodyFrequency; // 在正文中的频率
        int firstTitleIndex; // 在标题中首次出现的位置
        int firstBodyIndex; // 在正文中首次出现的位置

        WordData(String word) {
            this.word = word;
            this.totalFrequency = 0;
            this.titleFrequency = 0;
            this.bodyFrequency = 0;
            this.firstTitleIndex = -1;
            this.firstBodyIndex = -1;
        }
    }
}
```



## 字符串统计

一、题目描述 

给定两个字符集合，一个是全量字符集，一个是已占用字符集，已占用字符集中的字符不能再使用，要求输出剩余可用字符集。

 二、

输入描述 输入一个字符串 一定包含 @，@前为全量字符集 @后的为已占用字符集。 已占用字符集中的字符，一定是全量字符集中的字符，字符集中的字符跟字符之间使用英文逗号隔开。 每个字符都表示为字符加数字的形式，用英文冒号分隔

```java
import java.util.*;

public class AvailableCharacters {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();

        // 解析输入，分割全量字符集和已占用字符集
        String[] parts = input.split("@");
        String fullSetString = parts[0];
        String occupiedSetString = parts[1];

        // 将全量字符集解析成集合
        Set<String> fullSet = new HashSet<>(Arrays.asList(fullSetString.split(",")));
        
        // 将已占用字符集解析成集合
        Set<String> occupiedSet = new HashSet<>(Arrays.asList(occupiedSetString.split(",")));

        // 从全量字符集中移除已占用的字符
        fullSet.removeAll(occupiedSet);

        // 将剩余的可用字符集按逗号分隔的形式输出
        List<String> availableList = new ArrayList<>(fullSet);
        Collections.sort(availableList); // 这里我们选择排序以保证输出的顺序
        System.out.println(String.join(",", availableList));
    }
}
```



# 基础dp

## 玩牌高手

**一、题目描述**

给定一个长度为 n 的整型数组，表示一个选手在 n 轮内可选择的牌面分数。选手基于规则选牌，

请计算所有轮结束后其可以获得的最高总分数。

选择规则如下：

1. 在每轮里选手可以选择获取该轮牌面，则其总分数加上该轮牌面分数，为其新的总分数；
2. 选手也可不选择本轮牌面直接跳到下一轮，此时将当前总分数还原为 3 轮前的总分数，若当前轮次小于等于 3（即在第 1、2、3 轮选择跳过轮次），则总分数置为 0；
3. 选手的初始总分数为 0，且必须依次参加每一轮。

**二、输入描述**

第一行为一个小写逗号分割的[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)，表示 n 轮的牌面分数，1<= n <=20。

分数值为整数，-100 <= 分数值 <= 100。

不考虑格式问题。

**三、输出描述**

所有轮结束后选手获得的最高总分数。

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    // 读取输入
    int n = scanner.nextInt();
    int[] arr = new int[n];
    for (int i = 0; i < arr.length; i++) {
        arr[i] = scanner.nextInt();
    }
    int[] grade = new int[n];
    grade[0] = Math.max(arr[0], 0);
    for (int i = 1; i < n; i++) {
        //如果是前三轮
        if (i < 3) {
            grade[i] = Math.max(grade[i-1] + arr[i], 0);
        } else {
            grade[i] = Math.max(grade[i-1] + arr[i], grade[i - 3]);
        }
    }
    System.out.println(grade[grade.length - 1]);
}
```

## 数列描述

**一、题目描述**

有一个数列 a [N] (N=60)，从 a [0] 开始，每一项都是一个数字。数列中 a [n+1] 都是 a [n] 的描述。其中 a [0]=1

规则如下：

a[0]:1

a [1]:11 (含义：其前一项 a [0]=1 是 1 个 1，即 “11”。表示 a [0] 从左到右，连续出现了 1 次 “1”）

a [2]:21 (含义：其前一项 a [1]=11，从左到右：是由两个 1 组成，即 “21”。表示 a [1] 从左到右，连续出现了两次 “1”)

a [3]:1211 (含义：其前一项 a [2]=21，从左到右：是由一个 2 和一个 1 组成，即 “1211”。表示 a [2] 从左到右，连续出现了 1 次 “2”，然后又连续出现了 1 次 “1”)

a [4]:111221 (含义：其前一项 a [3]=1211，从左到右：是由一个 1、一个 2、两个 1 组成，即 “111221”。表示 a [3] 从左到右，连续出现了 1 次 “1”，连续出现了 1 次 “2”，连续出现了两次 “1”)

请输出这个数列的第 n 项结果（a [n]，0≤n≤59）。

**二、输入描述**

数列的第 n 项 (0≤n≤59)

5

**三、输出描述**

数列的内容

312211

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int n = scanner.nextInt();

    // 初始化第0项
    String current = "1";

    // 生成从第1项到第n项
    for (int i = 1; i <= n; i++) {
        current = generateNext(current);
    }

    // 输出第n项
    System.out.println(current);
}

// 生成下一项的方法
private static String generateNext(String s) {
    StringBuilder result = new StringBuilder();
    int count = 1;
    char currentChar = s.charAt(0);

    for (int i = 1; i < s.length(); i++) {
        if (s.charAt(i) == currentChar) {
            count++;
        } else {
            result.append(count).append(currentChar);
            currentChar = s.charAt(i);
            count = 1;
        }
    }

    // 添加最后一组
    result.append(count).append(currentChar);

    return result.toString();
}
```


---
group: 贪心算法
title: 经典贪心算法例题
order: 1
---

# 贪心算法 `局部最优解达到整体最优解`

求解最优化的问题常常会有一系列的步骤，而每个步骤往往会面临着选择。贪心算法在每一步都做出最优解，寄希望于**通过局部最优解来获得全局最优解**。

贪心算法往往是这种自顶向下的设计，先做出一个选择，然后再求解下一个问题，而不是自底向上解出许多子问题，然后再做出选择。

在做贪心选择时，我们直接做出当前问题中看起来最优的解 s，而不是考虑到子问题的解，这也是贪心算法和动态规划的不同之处，在动态规划中，我们往往每一个步骤都做一个选择，这个选择往往依赖于子问题的解。而在贪心算法中，我们总是做出当时看来最佳的选择，然后再求解剩下唯一的子问题。贪心算法做出选择时可能会依赖于之前的选择或者子问题的解，但是绝对不依赖于将来的选择或者子问题的解。也就是，**动态规划问题是自底向上的，而贪心算法问题是自顶向下的**。

贪心算法一般按如下步骤进行：

- 建立数学模型来描述问题
- 把求解的问题分成若干个子问题
- 对每个子问题求解，得到子问题的局部最优解
- 把子问题的解局部最优解合成原来解问题的一个解

事实上，并不是所有问题都能用贪心算法进行求解。**贪心算法得到的解并不一点是最佳的**，因为贪心算法总是从局部出发，并没从整体考虑，贪心算法只能确定某些问题的可行性范围。利用贪心法求解的问题应具备如下两个特征：

- **贪心选择性质** ：一个问题的整体最优解可通过一系列局部的最优解的选择达到，并且**每次的选择可以依赖以前作出的选择，但不依赖于后面要作出的选择**。这就是贪心选择性质。对于一个具体问题，要确定它是否具有贪心选择性质，必须证明每一步所作的贪心选择最终导致问题的整体最优解。
- **最优子结构性质：** 当一个问题的最优解包含其子问题的最优解时，称此问题具有最优子结构性质。问题的最优子结构性质是该问题可用贪心法求解的关键所在。在实际应用中，至于什么问题具有什么样的贪心选择性质是不确定的，需要具体问题具体分析。

要确定一个问题是否适合用贪心算法求解，必须证明每一步所作的贪心选择最终导致问题的整体最优解。证明的大致过程为：首先考察问题的一个整体最优解，并证明可修改这个最优解，使其以贪心选择开始，做了贪心选择后，原问题简化为规模更小的类似子问题。然后用数学归纳法证明通过每一步做贪心选择，最终可得到问题的整体最优解。



## [455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 `i`，都有一个胃口值 `g[i]`，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 `j`，都有一个尺寸 `s[j]` 。如果 `s[j] >= g[i]`，我们可以将这个饼干 `j` 分配给孩子 `i` ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

**示例 1:**

```
输入: g = [1,2,3], s = [1,1]
输出: 1
解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

**示例 2:**

```
输入: g = [1,2], s = [1,2,3]
输出: 2
解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

这里的局部最优就是**大饼干喂给胃口大的**，充分利用饼干尺寸喂饱一个，**全局最优就是喂饱尽可能多的小孩**。

```java
public int findContentChildren(int[] g, int[] s) {
    Arrays.sort(g);
    Arrays.sort(s);
    int childNum = 0;
    int i = 0;
    int j = 0;
    while (i < s.length && j < g.length) {
        if (s[i] >= g[j]) {
            childNum++;
            i++;
            j++;
        } else {
            i++;
        }
    }
    return childNum;
}
```



## [376. 摆动序列](https://leetcode.cn/problems/wiggle-subsequence/)

如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为 **摆动序列 。**第一个差（如果存在的话）可能是正数或负数。仅有一个元素或者含两个不等元素的序列也视作摆动序列。

- 例如， `[1, 7, 4, 9, 2, 5]` 是一个 **摆动序列** ，因为差值 `(6, -3, 5, -7, 3)` 是正负交替出现的。
- 相反，`[1, 4, 7, 2, 5]` 和 `[1, 7, 4, 5, 5]` 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。

**子序列** 可以通过从原始序列中删除一些（也可以不删除）元素来获得，剩下的元素保持其原始顺序。

给你一个整数数组 `nums` ，返回 `nums` 中作为 **摆动序列** 的 **最长子序列的长度** 。

**示例 1：**

```
输入：nums = [1,7,4,9,2,5]
输出：6
解释：整个序列均为摆动序列，各元素之间的差值为 (6, -3, 5, -7, 3) 。
```

**示例 2：**

```
输入：nums = [1,17,5,10,13,15,10,5,16,8]
输出：7
解释：这个序列包含几个长度为 7 摆动序列。
其中一个是 [1, 17, 10, 13, 10, 16, 8] ，各元素之间的差值为 (16, -7, 3, -3, 6, -8) 。
```

**示例 3：**

```
输入：nums = [1,2,3,4,5,6,7,8,9]
输出：2
```

```java
class Solution {
    public int wiggleMaxLength(int[] nums) {
        int n = nums.length;
        if (n < 2) {
            return n;
        }
        int prediff = nums[1] - nums[0];
        int max = prediff != 0 ? 2 : 1;
        for (int i = 2; i < nums.length; i++) {
            int diff = nums[i] - nums[i - 1];
            if ((diff < 0 && prediff >= 0) || (diff > 0 && prediff <= 0)) {
                max++;
                prediff = diff;
                //遇到平坡不记录坡度
            }
        }
        return max;
    }
}
```

假设数组为1,17,5,10,13,15,10,5,16,8，那么循环到nums[3]是10，此时最大长度为4，后面的13大于10
那么就只计算13后面的了，这个10相当于一个过渡元素被删除了。因为13后的数要做到摆动序列必须要比13要小

**局部最优：删除单调坡度上的节点（不包括单调坡度两端的节点），那么这个坡度就可以有两个局部峰值**。

**整体最优：整个序列有最多的局部峰值，从而达到最长摆动序列**。



## [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)

给你一个非负整数数组 `nums` ，你最初位于数组的 **第一个下标** 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 `true` ；否则，返回 `false` 。

**示例 1：**

```
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
```

**示例 2：**

```
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
```

```java
class Solution {
    public boolean canJump(int[] nums) {
        int length = nums.length;
        int max = nums[0];
        if (max >= length - 1) {
            return true;
        }
        for (int i = 1; i < length; i++) {
            if (i <= max) {
                if (nums[i] + i > max) {
                    max = nums[i] + i;
                }
            }
            if (max >= length - 1) {
                return true;
            }
        }
        return false;
    }
}
```

只要能到达的最大距离大于等于最后一个下标的距离即可

一边循环一边增加最大距离。只要当前下标还在最大距离内就增加max

如果在循环中发现了`最大距离大于等于最后一个下标的距离`，那么直接返回true

循环结束返回false


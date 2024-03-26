---
group: 数组
title: 704 二分查找
order: 1
---

## 题干

给定一个 n 个元素*有序*的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

分析：`有序序列`、`不重复元素` ———— 是使用二分法的重要前提。两种区间写法，左闭右闭和左闭右开。

### 解一（左闭右闭）

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function (nums, target) {
  const numsLength = nums.length;
  if (!numsLength) return -1;
  let left = 0;
  let right = numsLength - 1;
  // 闭区间相等有意义
  while (left <= right) {
    const middle = Math.floor((right + left) / 2);
    if (nums[middle] > target) {
      // 如果中间值大于目标值 说明下一次的区间应该是[left,middle - 1]
      right = middle - 1;
    } else if (nums[middle] < target) {
      // 中间值小于目标值 说明下一次区间应该是[middle + 1,right]
      left = middle + 1;
    } else {
      return middle;
    }
  }
  return -1;
};
```

### 解二（左闭右开）

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function (nums, target) {
  const numsLength = nums.length;
  if (!numsLength) return -1;
  let left = 0;
  let right = numsLength;
  // 左闭右开 不能相等
  while (left < right) {
    const middle = Math.floor((right + left) / 2);
    // 中间值大于目标值 说明下一次区间是[left,middle)
    if (nums[middle] > target) {
      right = middle;
    } else if (nums[middle] < target) {
      // 中间值小于目标值 说明下一次区间是[middle + 1,right)
      left = middle + 1;
    } else {
      return middle;
    }
  }
  return -1;
};
```

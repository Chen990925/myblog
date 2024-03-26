---
group: JavaScript
title: EventLoop、任务队列
order: 2
---

# EventLoop、任务队列

## 前言

JS 是一门**单线程**的语言，单线程就意味着它同一时间只能执行一个任务。如果某一任务执行时间过久，会阻塞住浏览器的渲染进程。故 JS 中出现了**同步任务**与**异步任务**，区别在于执行顺序不同。

- 同步任务：主线程上的任务，按照顺序从上到下执行。
- 异步任务：不进入主线程的任务，有自己的**任务队列**。异步函数一般通过回调来实现，异步函数会在其他线程完成，生成一个回调函数。通知主进程，当主进程的任务都执行完毕后，就会执行最先通知他的异步任务。

## EventLoop（事件循环）

事件循环是一种事件执行的规则。

## 任务队列

最近看 w3c 文档时，发现宏任务和微任务的概念已经被移除。取而代之的任务队列的概念。任务队列是分类别的，不同类别是有不同的优先级。
在目前 chrome 的实现中，至少包含了下面队列：

- 微任务队列（最高）：Promise.then/catch、async/await
- 交互事件（高）：点击事件、网络请求、DOM 渲染、文件操作....
- 延时队列（中）：setTimeout、setInterval

将除了微任务队列外的队列的优先级交给浏览器来决定。

那么事件循环的机制是如何的？

- 首先执行 script 脚本
- 执行同步代码
- 遇到异步任务，就根据类别放到对应的队列中。
- 同步代码执行完毕后，执行优先级高的异步任务。
- 异步任务执行完毕后，清空任务队列。
- 等待下一个任务...

## 代码题

### 题一

```js
console.log(1);
async function async1() {
  await async2();
  console.log(2);
  await async3();
  console.log(3);
}
async function async2() {
  console.log(4);
}
async function async3() {
  console.log(5);
}
async1();
console.log(6);
```

输出结果是 1、4、6、2、5、3

需要注意的是，await 右边的代码会立即执行，后面的代码才是异步任务。

### 题二

```js
async function async1() {
  console.log('async1 start');
  await new Promise((resolve) => {
    console.log('promise1');
  });
  console.log('async1 success');
  return 'async1 end';
}
console.log('srcipt start');
async1().then((res) => console.log(res));
console.log('srcipt end');
```

输出结果：script start、async1 start、promise1、script end
Promise 状态一直是 pending，所以 await 后面的代码不会执行。

### 题目三

```js
async function async1() {
  await async2();
  console.log('async1');
  return 'async1 success';
}
async function async2() {
  return new Promise((resolve, reject) => {
    console.log('async2');
    reject('error');
  });
}
async1().then((res) => console.log(res));
```

输出结果：async1、Uncaught (in promise) error。
async2 状态为拒绝，就会暂停后面代码的执行。

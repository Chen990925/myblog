---
group: JavaScript
title: 异步编程
order: 7
---

## 异步编程的实现方法有哪些？

- 回调函数
- Promise 的链式调用
- async

## 对 promise 的理解

是用来实现异步编程的方法，是一个对象。可以解决地狱回调的问题。

有三种状态：

- pending 待定
- resloved 已完成
- rejected 已拒绝

状态只能经过一次更改。

缺点：

- 一经创建就立马会执行
- 无法得知内部代码执行到哪个阶段了

## Promise 的 API

- then：接受俩个参数，分别对应 resloved 和 rejected 时调用的回调函数。
- catch：接受一个参数，是 rejected 时调用的回调函数。
- finally：接受一个参数，无论完成或者拒绝，都调用该回调函数。
- all：接受一个元素为 promise 对象的数组，如果状态都是 resloved 就返回 resloved，反之则是 rejected。
- race：也是接收数组，哪个最快结束 pending 状态，那结果就是这个 promise 的状态。

## 对 async/await 的理解

async/await 可以对 then 链进行简化，async 是异步，await 是等待。可以简单记住俩者的用途，在异步方法内部使用 await 等待一个异步方法执行完成。

默认使用 async 标记的 function 返回的是一个 Promise 对象，如果在方法里返回的是一个常量，就会用 Promise.resolved（常量）返回出来。
没有明确 return，就会返回 Promise.resolved(undefined)。

在没有使用 await 的获取 async 标记函数的结果下，该函数会立即执行并返回一个 Promise 对象。

## await 在等待什么？

如果 await 后面是一个简单的常量，那么该常量就是我们需要的返回值。
如果是一个 async 函数，那么等的就是它的返回值，且会阻塞 await 这行后面的代码。

## async/await 对比 Promise 的优势

- 代码读起来更同步，避免了繁琐的链式调用
- Promise 传递值很麻烦，async/await 几乎是同步的写法。
- 错误处理友好，可以使用 try/catch，Promise 的错误捕捉很冗余。

## 手写 Promise、Promise.then

### 实现 Promise

Promise 的使用实例：

```js
const p = new Promise((resolve, reject) => {
  resolve(1);
});
```

一个 Promise 需要具备的：

- Promise 有三种状态，通过 resolve 和 reject 切换，状态变更只有有一次。且 resolve、reject 可以设置 Promise 的 value（此 value 就是在链式调用中可以传递的值）。
- 在 Promise 状态为 pending 时，promise 的链式调用都会先存在一个数组里，待状态变更了就依次执行。
- Promise 的参数是一个立即执行的函数，函数参数接受改变 Promise 状态的俩个函数。

代码实现：

```js
class MyPromise {
  // 声明promise的三个状态
  static PENDING = '待定';
  static FULFILLED = '成功';
  static REJECTED = '失败';

  constructor(executor) {
    // promise的初始状态
    this.status = MyPromise2.PENDING;
    // promise可以传递的值
    this.result = null;
    // 储存pending时的then任务
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(result) {
    if (this.status === MyPromise2.PENDING) {
      this.status = MyPromise2.FULFILLED;
      this.result = result;
      this.resolveCallbacks.forEach((i) => i());
    }
  }
  reject(result) {
    if (this.status === MyPromise2.PENDING) {
      this.status = MyPromise2.REJECTED;
      this.result = result;
      this.rejectCallbacks.forEach((i) => i());
    }
  }
}
```

### 实现 Promise 的 then

Promise 的 then 实现：

- then 是异步，需要使用 setTimeout 变成异步。
- then 接受俩个参数，一个是成功状态执行的，一个是失败状态执行的。
- then 可以进行链式调用

```js
then(onFulfilled, onRejected) {
    // 判断是不是函数 不是就要处理成函数 防止报错
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };
    // 为了支持链式调用，返回一个promise
    let promise2 = new MyPromise2((resolve, reject) => {
      if (this.status === MyPromise2.FULFILLED) {
        try {
          setTimeout(() => {
            let x = onFulfilled(this.result);
          });
        } catch (error) {
          reject(error);
        }
      }
      if (this.status === MyPromise2.REJECTED) {
        try {
          setTimeout(() => {
            let x = onRejected(this.result);
          });
        } catch (error) {
          reject(error);
        }
      }
      if (this.status === MyPromise2.PENDING) {
        this.resolveCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onFulfilled(this.result);
            });
          } catch (error) {
            reject(error);
          }
        });
        this.rejectCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onRejected(this.result);
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2
  }
```

基本实现了 then 中的功能，但是我们需要处理成功回调和失败回调的返回值,定义一个 resolvePromise(promise2, x, resolve, reject)函数处理。
函数需要处理 x 的四种情况：

- 返回值是 promise 本身：

```js
//这会造成循环调用
p.then(() => {
  return p;
});
```

- 返回值是规范的 promise：

```js
p.then(() => {
  let promise3 = new Promise((resolve) => {
    resolve(666);
  });
  return promise3;
});
```

- 返回值是 thenable 的对象或者函数：

```js
p.then((res) => {
  const obj = {
    then: function (resolve, reject) {
      resolve('1');
    },
  };
  return obj;
}).then((res) => {
  console.log(res);
});
```

- 返回值就是一个值：

```js
p.then(() => {
  return 1;
});
```

最终实现代码

```js
function resolvePromise(promise2, x, resolve, reject) {
  // 第一种情况 返回值和调用的promise是一个
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 第二种情况： 是规范的promise
  if (x instanceof MyPromise) {
    x.then((y) => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  } else if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    // 返回值是thenable的promise
    // 需要判断是不是函数或者对象 且函数和对象里是不是有then方法。
    try {
      let then = x.then;
      if (typeof then === 'function') {
        //设置一个变量，来控制只调用一个状态的回调
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            },
          );
        } catch (error) {
          if (called) return;
          called = true;
          reject(error);
        }
      }
    } catch (error) {
      reject(error);
    }
  } else {
    resolve(x);
  }
}
```

---
group:
  title: 手写函数
  order: 9
title: 手写函数
---

## 防抖

> 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

```js
// 防抖函数
// 一定时间连续触发的事件只在最后执行一次
function debounce(fn, delay) {
  //设置一个定时器
  let timer = null;
  //返回一个方法 包裹住所要延迟的函数
  return function () {
    //如果定时器存在 就清理定时器
    if (timer) clearTimeout(timer);
    const _this = this;
    const arg = [...arguments];
    timer = setTimeout(() => {
      fn.call(_this, arg);
    }, delay);
  };
}
```

## 节流

> 在规定的时间内 只执行一次

```js
function throttle(fn, delay) {
  let timer;
  return function () {
    if (timer) return;
    const _this = this;
    const arg = [...arguments];
    timer = setTimeout(() => {
      fn.call(_this, arg);
      timer = null;
    }, delay);
  };
}
```

## call

- 调用方式：funciton.call(a,...?args)
  - 调用者是不是函数
  - a 是不是有传入
  - 最后的返回是一个更改了 this 指向的 function

```js
Function.prototype.myCall = function (context) {
  // 判断调用者是不是函数
  if (typeof this !== 'function') {
    console.error('this not a function type');
  }
  // 获取传递的参数
  let args = [...arguments].slice(1);
  let result = null;

  context = context || window;
  context.fn = this;
  result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## apply

和 call 一样，区别在于参数是数组形式

```js
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    console.error('this not a function type');
  }
  let args = arguments[1];
  let result = null;
  context = context || window;
  context.fn = this;
  result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## bind

要分为构造函数调用和普通函数调用

```js

Function.prototype.myBind = function (context) {
  let fn = this;
  if (typeof this !== "function") {
    console.error("this not a function type");
  }
  let args = arguments[1];
  return function Fn() {
    fn.apply(this instanceof Fn ? this : context, args.concat(...args));
  };
```

## 函数柯里化

```js
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}
```

## 深拷贝

```js
function clone(obj) {
  if (typeof obj === 'object') {
    let cloneObj = {};
    for (const key in obj) {
      cloneObj[key] = clone(obj[key]);
    }
    return cloneObj;
  } else {
    return obj;
  }
}
```

## 手写一个获取参数类型的函数

```js
function getType(param) {
  // null、object、array 都会返回object
  if (typeof param !== 'object') {
    return typeof param;
  } else {
    let res = Object.prototype.toString.call(obj).split(' ')[1];
    return res.substring(0, res.length - 1).toLowerCase();
  }
}
```

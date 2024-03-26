---
group: JavaScript
title: 数据类型
order: 2
---

## JavaScript 有哪些数据类型，他们的区别是？

JavaScript 有`8`种数据类型:`string`,`number`,`boolean`,`null`,`undefined`,`symbol`,`bigint`,`object`。
这些数据类型可以分为`原始数据类型`和`引用数据类型`。

俩种数据类型的区别在于储存位置不同：栈和堆。

- 原始数据类型储存在`栈`中，因为原始数据类型占据的空间小、大小固定，属于频繁使用的数据类型。
- 引用数据类型储存在`堆`中，因为引用数据类型占据的空间大，大小不固定。引用数据类型在栈中储存了指向堆中该实体的起始地址。

在数据结构中，堆和栈是俩个不同的数据结构。

- 堆是优先队列。
- 栈是先进后出。

在操作系统中。

- 堆是手动分配内存，可手动释放内存，不释放由程序结束后堆垃圾回收机制来释放。
- 栈是自动分配内存，释放内存。

## 数据类型检测的方法有哪些？

- **typeof**
  null,数组,对象都会被判断成 object
- **instanceof**
  `instanceof`只能正确判断引用数据类型。
  因为`instanceof`是判断**该实例的构造函数的 prototype 属性是否存在于原型链中**。而基本数据类型是通过**原始值**创建的，而不是**构造函数**。
  （在实例通过构造函数函数创建时，该 实例的 _proto_ = 构造函数的 prototype，故用`实例` instanceof `实例原型` 的方式。）
- **constructor**
  会通过实例，沿着原型链查找`constructor`属性。
- **Object.prototype.toString.call()**

## 判断数组的方法有哪些？

- **instanceof**
- **Object.prototype.toString.call()**
- **实例._proto_ === Array.prototype**
- **Array.isArray(实例)**
- **Array.prototype.isPrototypeOf(实例)**
  判断实例的原型链上是否有 Array.prototype

## null 和 undefined 的区别？

- null 表示空值。一般作为可能需要赋值的变量的初始值。
- undefined 表示未定义。一般是声明变量未赋值时返回。

## instanceof 操作符的实现原理及实现

```js
function myInstanceof(left, right) {
  let proto = left._proto_;

  while (true) {
    if (!proto) return false;
    if (proto === right.prototype) return true;
    proto = proto._proto_;
  }
}
```

## isNaN 和 Number.isNaN()有什么区别？

两者都可用来判断变量是否为 NaN，是 NaN 返回 true。

- isNaN 传入非数字类型也会返回 true。
- Number.isNaN()比较准确，只有传入 NaN 才会返回 true。

## 其他类型的值到字符串的转换规则

- number、boolean、null、undefined、symbol、bigint 都直接转换成对应的字符串。
- 普通对象调用的是实例原型上的 toString()方法，会返回`[object object]`。数组会返回其元素组成的字符串。

## 其他类型的值到数字类型的转换规则

- boolean: true 为 1，false 为 0
- null：0
- undefined：NaN
- symbol：不能转
- string：数字字符串可以转成数字类型。空字符串：0，非数字字符串：NaN
- object：先转成对应的基本数据类型，再按照上述规则转换。（普通对象：NaN,[]:0）

## Object.js()、==、=== 区别

- `==`:两边类型不同时，会做类型转换后再进行比较。
- `===`:类型不同时，不做类型转换比较。
- `Object.js()`:大部份情况和===一样，只是-0 和+0 不相等，NaN 和 NaN 相等。

## 什么是 Javascript 的包装类型

js 的基本数据类型上是没有属性和方法的。为了方便操作它的值，在调用基本数据类型的属性和方法的时候，会将它的值隐性的变成对象。

## Javascript 是如何进行隐式类型转换的

隐式转换可以归结为一个函数：

```js
// 非 Date对象
function objToNumber = value => Number(value.valueOf().toString())
```

隐式转换发生在 +、-、\*、/、>、<、== 这些运算符之间。

- **+**：一方有字符串，则俩边都会转换成字符串。如果俩方都没有字符串，就转换成数字。
- **-、\*、/、==**：转成数字类型。
- **>、<**：俩边都是字符串就比较字母表顺序。其他情况转换成数字类型。
-

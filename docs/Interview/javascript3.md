---
group: JavaScript
title: 原型与原型链
order: 4
---

## 对原型和原型链的理解

```js
//构造函数
function People {
...
}
//实例
const people1 = new People()
const people2 = new People()
//设置实例原型的属性
People.prototype.name = 'hello'
```

![1](../../public/images/prototype.png)

在 js 中是使用构造函数来新建对象的，每个构造函数内部都有一个属性 prototype 指向实例原型，该实例原型上包含了可以由该构造函数所有实例共享的属性和方法。
同时使用过构造函数新建的对象，内部 _proto_ 属性会指向实例原型。

## 原型链的终点是什么？

原型链的终点是 Object.prototype._proto_ === null
所以原型链的终点是 null。

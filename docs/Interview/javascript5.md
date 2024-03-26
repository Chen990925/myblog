---
group: JavaScript
title: this/call/apply/bind
order: 6
---

## 对 this 对象的理解

this 是执行上下文的一个属性，它指向最后一次调用这个方法的对象。

## apply、call 和 bind 调用模式

三者都是用来更改函数执行时的上下文。

- apply():参数是以数组的形式
- call():和 apply()的区别在于参数就一个。
- bind():无参数，只是生成一个改变 this 后的新函数。

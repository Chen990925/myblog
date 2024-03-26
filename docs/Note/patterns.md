---
group:
  title: 设计模式
  order: 8
title: 代理模式（Proxy）
---

Proxy 意味着代理，代理意味着其他人的替身。与其直接和那个人交谈，不如直接和代理人交谈。同样的情况也发生在 JavaScript 中: 我们不直接与目标对象交互，而是与 Proxy 对象交互。

在 JavaScript 中，可以轻松建立一个 Proxy 实例：

```js
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
};

const personProxy = new Proxy(person, {});
```

personProxy 就是 person 的代理，它接受俩个参数：

- 被代理对象
- 用来定制代理要做的行为

常见的代理行为：get（获取属性） 和 set（修改属性）

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  },
});
personProxy.name; // The value of name is ohn Doe
personProxy.age = 43; //Changed age from 42 to 43
```

同时我们也可以通过 Reflect 来操作目标对象，例如：

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
  },
});
```

代理是增加对对象行为控制的强大方法。代理可以有各种用例: 它可以帮助进行验证、格式化、通知或调试。

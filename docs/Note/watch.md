---
group: 设计模式
title: 观察者模式
---

## 观察者模式

观察者模式主要由俩部分组成：**观察者**和**被观察者**。

- 被观察者：可添加观察者、删除观察者、通知观察者。

```js
class Subject {
  constructor() {
    this.observerList = [];
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  removeObserver(observer) {
    const index = this.observerList.findIndex((o) => o.name === observer.name);
    this.observerList.splice(index, 1);
  }

  notifyObservers(message) {
    const observers = this.observerList;
    observers.forEach((observer) => observer.notified(message));
  }
}
```

- 观察者：可以在创建时决定是否加入被观察者的观察者队列（主动加入），也可以由被观察者将其加入观察者队列（被动加入）。

```js
class Observer {
  constructor(name, subject) {
    this.name = name;
    if (subject) {
      subject.addObserver(this);
    }
  }

  notified(message) {
    console.log(this.name, 'got message', message);
  }
}
```

## 和发布订阅的区别

发布订阅内部的实现是基于观察者模式的，它将被观察者的添加、删除、通知观察者的功能解耦出来，使得被观察者只要注意自身的内容。

发布订阅：

- 发布者
- 消息中心
- 订阅者

---
group: JavaScript
title: JS中的指向问题
order: 3
---

# JS 中的 this

this 有四个调用模式：

- 函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
  - 普通函数：它的 this 根据调用者的作用域来决定，谁调用指向谁堆作用域。
  - 箭头函数：它的 this 是外部第一个普通函数的 this。它本身不具备 this。
- 方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- 构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
- apply 、 call 和 bind 调用模式

以下是各种情况：

```js
let obj = {
  fn: function () {
    this.a = 1;
    console.log(this);
  },
  fn2: () => {},
};
// 函数调用模式 普通函数 this = window
const functionThis = obj.fn;
functionThis();
// 函数调用模式 箭头函数 this = window
obj.fn2();
// 方法调用模式 this = obj
obj.fn();
// 构造器调用模式 this = obj2
let obj2 = new obj.fn();
// apply call bind
let obj3 = { a: 1 };
obj.fn.call(obj3); // this = obj3
obj.fn.apply(obj3); // this = obj3
let fn3 = obj.fn.bind(obj3);
fn3(); //this = obj3
```

## 题目

### 题一

```js
function foo() {
  console.log(this.a);
}

function doFoo() {
  foo();
}

var obj = {
  a: 1,
  doFoo: doFoo,
};

var a = 2;
obj.doFoo();
```

输出 2。
foo()是在 doFoo 中独立调用的，故 this 指向全局。

### 题二

```js
var a = 10;
var obj = {
  a: 20,
  say: () => {
    console.log(this.a);
  },
};
obj.say();

var anotherObj = { a: 30 };
obj.say.apply(anotherObj);
```

输出：10 10
say 是箭头函数，没有自己的 this，故会指向外部第一个函数的 this，也没有，那就是 window。
故第一个为 10，apply 修改不了箭头函数 this，因为他没有，故第二个也是 10。

### 题三

```js
function a() {
  console.log(this);
}
a.call(null);
```

非严格模式下，会将 null、undefinded 变为 window。严格模式下是啥就是啥。

### 题四

```js
var obj = {
  name: 'cuggz',
  fun: function () {
    console.log(this.name);
  },
};
obj.fun();
new obj.fun();
```

输出：cuggz 、undefined

### 题五

```js
var obj = {
  say: function () {
    var f1 = () => {
      console.log('1111', this);
    };
    f1();
  },
  pro: {
    getPro: () => {
      console.log(this);
    },
  },
};
var o = obj.say;
o();
obj.say();
obj.pro.getPro();
```

输出：”1111“ window、”1111“ obj、window

### 题六

```js
var myObject = {
  foo: 'bar',
  func: function () {
    var self = this;
    console.log(this.foo);
    console.log(self.foo);
    (function () {
      console.log(this.foo);
      console.log(self.foo);
    })();
  },
};
myObject.func();
```

输出：bar、bar、undefined、bar
func（）函数的调用者是 myobject 对象，故 func 的 this 指向 myobject，第一第二个输出都是 bar。
立即执行函数是独立调用，指向 window，window 中没有定义 foo，故第三个输出 undefined。

### 题七

```js
window.number = 2;
var obj = {
  number: 3,
  db1: (function () {
    console.log(this);
    this.number *= 4;
    return function () {
      console.log(this);
      this.number *= 5;
    };
  })(),
};
var db1 = obj.db1;
db1();
obj.db1();
console.log(obj.number);
console.log(window.number);
```

db1 在定义的时候就执行了，是独立调用。故 this.name 是 2。第一个 log window。返回一个函数
db1()的时候执行返回的函数，第二个 log 也是 window。返回一个数字 40。
obj.db1()时候，返回的函数 this 是 obj，故 obj.number 变成了 15。
所以输出是 window、window、15、40。

### 题八

```js
var length = 10;
function fn() {
  console.log(this.length);
}

var obj = {
  length: 5,
  method: function (fn) {
    fn();
    arguments[0]();
  },
};

obj.method(fn, 1);
```

输出：10 2
fn（）独立调用，this 是 window。
arguments[0]（） = arguments.fn()
故输出 2

### 题九

```js
var a = 1;
function printA() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: printA,
  bar: function () {
    printA();
  },
};

obj.foo();
obj.bar();
var foo = obj.foo;
foo();
```

输出：2、1、1

### 题十

```js
var x = 3;
var y = 4;
var obj = {
  x: 1,
  y: 6,
  getX: function () {
    var x = 5;
    return (function () {
      return this.x;
    })();
  },
  getY: function () {
    var y = 7;
    return this.y;
  },
};
console.log(obj.getX());
console.log(obj.getY());
```

输出：3、6

### 题十一

```js
var a = 10;
var obt = {
  a: 20,
  fn: function () {
    var a = 30;
    console.log(this.a);
  },
};
obt.fn();
obt.fn.call();
obt.fn();
```

输出：20、10、20
.call 指向改变是临时的。

### 题十二

```js
function a(xx) {
  this.x = xx;
  return this;
}
var x = a(5);
var y = a(6);

console.log(x.x);
console.log(y.x);
```

输出：undefined、6
a 函数是独立调用，返回的 this 是 window。故即使 a 里面设置了 window.x = 5，也会被 var x 覆盖了。

### 题十三

```js
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo,
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a);

obj1.foo.call(obj2, 3);
console.log(obj2.a);

var bar = new obj1.foo(4);
console.log(obj1.a);
console.log(bar.a);
```

输出：2、3、2、4

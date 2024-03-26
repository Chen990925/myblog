---
group: JavaScript
title: ES6
order: 3
---

## var、let、const 的差异？

|       | 定义 | 作用域 | 暂时性死区 | 重复声明 | 全局 |
| :---- | :--: | :----: | :--------: | :------: | :--: |
| const | 常量 |  局部  |     是     |    否    |  否  |
| let   | 变量 |  局部  |     是     |    否    |  否  |
| var   | 变量 |  全局  |     否     |    是    |  是  |

`暂时性死区`：处于暂时性死区的变量，都只能先声明后访问。var 声明的变量存在变量提升。
`全局`：这里的全局指的是全局变量中的全局对象，挂载在`window`和`globalThis`上。

## new 操作符的实现步骤及代码实现

- 创建一个空对象。
- 将构造函数的 prototype 赋值给空对象的 _proto_
- 将构造函数的 this 指向该对象
- 执行初始化空对象的代码操作
- 返回该对象

```js
function createNew(constuctor, ...arg) {
  // 创建一个空对象
  let obj = {};
  // 让实例的_proto_指向实例原型
  obj._proto_ = constuctor.prototyoe;
  // 构造函数的this指向实例，并执行初始化操作
  let result = constuctor.apply(obj, arg);
  if (typeof result === 'object' && result !== null) {
    return result;
  }
  return obj;
}

function Person(name) {
  this.name = name;
}
let jo = createNew(Person, 'josasd');
console.log(jo.name); //josasd
```

## 箭头函数和普通函数的区别

- 没有自己的 this 和 prototype，this 也不能被改变，所以也不能作为构造函数。
- 没有 arguments

## map 和 object 的区别

- 键的类型：map 可以是任何类型，object 只能是字符串。
- 键的顺序：map 是有序的，object 是无序的。
- 获取键值对的方式：map 可以直接通过 size 属性获得，object 需要手动计算。
- 迭代：map 可以直接被迭代。

## map 和 weekMap 的区别

weekMap 的键只能是对象，且对该对象是弱引用，不计入垃圾回收机制。不需要的时候会自动释放空间。

## JSON 的理解

JSON 是一种基于文本的轻量的数据交换格式。
提供了俩种方法互相转换 JSON.stringfy 和 JSON.parse

## js 脚本延迟加载的方式有哪些？

- defer：和文档的解析属于同步，文档解析完成后开始加载脚本。
- async：属于异步，会立即下载脚本，执行会延迟。
- 使用 settimeout

## javascript 类数组的定义 以及如何转成数组

一个有 length 属性和若干索引属性的对象就可以称为类数组。

- Array.prototype.slice.call(arraylike)
- Array.prototype.splice.call(arraylike,0)
- Array.prototype.concat.apply([],arraylike)
- [...arraylike]
- Array.from(arraylike)

## 数组有哪些原生方法

- 添加/删除元素
  - 首部添加/删除
    - unshift(...item)
    - shift()
  - 尾部添加/删除
    - push(...item)
    - pop()
  - splice(start,count,...item?)：从 start 下标开始删除 count 个元素，并在 start 处插入...item 个元素。
  - slice(start,end):复制[start,end)下标的元素。
  - concat(...item):从尾部拼接...item 元素
- 搜索元素
  - indexOf/lastIndexOf(item,pos):从第 pos 个索引的元素开始搜索 item，true：索引，false：-1
  - includes(value):有该元素返回 true，无 false。
  - find/findIndex/filter(function):根据 function 过滤元素，返回满足 function 返回为 true 的第一个值/第一个值的索引/所有值。
- 遍历元素
- forEach(item,index,arr)
- 转换数组
- map
- sort
- reverse
- split/join
- reduce

## 常见的位运算符有哪些

- &
- ｜
- ^：相同为 0，不同为 1
- ~：取反
- > >
- <<

## 什么是 DOM 和 BOM？

DOM：文档对象模型，提供了操作网页的方法和 api，例如添加元素、删除元素等。
BOM：浏览器对象模型，提供了操作浏览器的方法和 api，例如历史记录的前进后退、滚动条、右键菜单等。

DOM 也是 BOM 子对象 window 的 document 属性。

## encodeURL、encodeURLComponent 的区别

编码范围不一样，如果需要对整个 url 进行编码，就使用 encodeURL，/ ： 这些都不会被编码。
如果只是对参数编码，就使用 encodeURLComponent，编码的范围更大。

## for...in 和 for...of 的区别？

for...in：用来遍历对象，获取的是对象的键名。（但是会遍历到对象的原型链上的可枚举属性，不推荐使用）
for...of：用来遍历可迭代的数据结构，比如数组，类数组对象，字符串，set、map 等。获取的是键值。

## forEach 和 map 的区别？

forEach 和 map 对数据操作都会改变原数组。前者没有返回值，后者会返回一个新数组。

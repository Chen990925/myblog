---
group: JavaScript
title: 函数式编程
order: 1
---
# 函数式编程
三大特征：**拥抱纯函数，隔离副作用、函数是“一等公民”、避免对状态的改变（不可变值）**
## 拥抱纯函数，隔离副作用
### 函数式 vs 命令式
命令式编程关注的是步骤，需要一步一步告诉计算机应该怎么做。
函数式编程关注的是结果，不关心怎么做，而是得到什么。
所以函数式编程需要我们关心俩个问题：
- **我想要怎么样的输出？**
- **我应该提供什么样的输入？**

用一个coding的例子来说明：
**我们有一个员工信息数据库。现在为了对年龄大于等于 24 岁的员工做生涯指导，需要拉出一张满足条件的员工信息清单，要求清单中每一条信息中间用逗号分隔，并按照年龄升序展示。**
对于**命令式编程**，分三步走：
- 进行年龄升序排序
- 筛选出年龄>=24的员工列表
- 将列表中的员工信息用逗号分隔

```js
const peopleList = [
  {
    name: 'John Lee',
    age: 24,
    career: 'engineer'
  },
  {
    name: 'Bob Chen',
    age: 22,
    career: 'engineer'
  }
]
const len = peopleList.length

// 对员工列表按照年龄【排序】
for(let i=0;i<len;i++) {
  // 内层循环用于完成每一轮遍历过程中的重复比较+交换
  for(let j=0;j<len-1;j++) {
    // 若相邻元素前面的数比后面的大
    if(peopleList[j].age > peopleList[j+1].age) {
      // 交换两者
      [peopleList[j], peopleList[j+1]] = [peopleList[j+1], peopleList[j]]
    }
  }
}

let logText = ''
for(let i=0; i<len; i++) {
  const person = peopleList[i]
  // 【筛选】出年龄符合条件的
  if( person.age >= 24 ) {
    // 从数组中【提取】目标信息到 logText
    const perLogText = `${person.name}'s age is ${person.age}`
    if(i!==len-1) {
      logText += `${perLogText},`
    } else {
      logText += perLogText
    }
  }
}

console.log(logText)
```
在命令式编程的代码中，我们逐个告诉计算机怎么做排序，筛选，信息提取。

对于**函数式编程**：
```js
// 定义筛选逻辑
const ageBiggerThan24 = (person)=> person.age >= 24

// 定义排序逻辑
const smallAgeFirst = (a, b) => {
  return a.age - b.age
}

// 定义信息提取逻辑
const generateLogText = (person)=>{
  const perLogText = `${person.name}'s age is ${person.age}`
  return perLogText
}

const logText = peopleList.filter(ageBiggerThan24)
                      .sort(smallAgeFirst)
                      .map(generateLogText)
                      .join(',')

console.log(logText)
```
这段代码在**可读性、可扩展性、可维护性**上都优于命令式编程。
对于每一个执行函数，我们都可以通过命名了解它执行了哪部分逻辑，且都是可以复用的。而命令式编程，我们如果要复用逻辑，只有复制粘贴。

看起来是不是就只是调用了数组方法？但是这些方法都是函数式编程的核心思想：**以输入和输出为思考出发点和结束点，将复杂的问题分解成可复用的函数，再用管道的方式将它们连接起来。**

### 纯函数：函数式编程核心
>输入只能够以参数形式传入，输出只能够以返回值形式传递，除了入参和返回值之外，不以任何其它形式和外界进行数据交换的函数。

纯函数有俩个特征：
- 对于相同的输入，永远返回相同的输出。
- 在执行过程中无语义上可观察到**副作用**。
:::info{title=Tips}
何为副作用：简单理解成函数执行过程中对外部环境的影响，比如修改全局变量，修改入参对象，修改文件等。
:::


**来看三个案例**：
- 加法函数
```js
let a = 10;
let b = 20;
function add() {
  return a + b;
}
add(); // 30
```
`add()`算纯函数么，显然不算。它未做到相同的输入返回相同的输出————相同输入是**入参**。
所以应该改成：
```js
function add(a, b) {
  return a + b;
}
add(10, 20); // 30
```
这样就做到了相同的输入输出相同的输出。

- 姓名拼接函数
```js
let name = 'John';
function addLastName(name) {
  console.log(name)
  return name + ' Lee';
}
addLastName(); // 'John Lee'
```
`addLastName()`也不算做纯函数，`console.log(name)`在控制台上打印了一行文字，这改变了外部环境————控制台。
删除即是纯函数。

-网络请求
```js
function getData(url) {
  const response = await fetch(url)
  const { data } = response   
  return data
}
```
`getData()`也不算做纯函数，它对外部环境发起了网络请求，请求有可能失败，且对于相同的请求response也不一定相同。

## 函数是一等公民
>当一门编程语言的函数可以被当作变量一样用时(即函数是一等公民)，则称这门语言拥有**头等函数**。例如，在这门语言中，函数可以被当作参数传递给其他函数，可以作为另一个函数的返回值，还可以被赋值给一个变量。 ——MDN Web Docs

所以函数是一等公民的含义可以归纳为，**可以被当作参数传递给其他函数、可以作为另一个函数的返回值、可以被赋值给一个变量**。
看着是不是很熟悉？这不是纯纯的**对象数据类型**么。是的没错，JS函数的本质是**可执行的对象**。
```js
// 被赋值给一个变量
let log = ()=>{
    console.log('hello world')
}
log =()=>{
    console.log("xxxx")
}
```
```js
// 作为参数传递给其他函数
function showData(err, data){
    if(err) {
      throw err
    }
    // 输出文件内容
    console.log(data);
}
fs.readFile(filePath, 'utf8', showData)
```
```js
// 当作另外一个函数的返回值
function baseAdd(a) {
  return (b) => {
    return a + b
  };
};

const addWithOne = baseAdd(1)

// .... (也许在许多行业务逻辑执行完毕后）

const result = addWithOne(2)
//显然，add 函数想要做一个加法，但是在只能够确认其中一个加数（a）的时候，它并不急于立刻做这个加法。
//先把这个已经确定的加数（a）以【闭包中的自由变量】的形式存起来，然后返回一个待执行的加法函数。等什么时候第二个加数也确定了，就可以立刻执行这段逻辑。
```

## 避免对状态的改变（不可变值）
对于纯函数来说，它更喜欢不可变数据。函数式编程，它不在意过程，对于它来说过程就像一个黑盒，如何保证相同的输入得到相同的输出，就是将变化控制在黑盒内部。
JS数据类型分为基本数据类型和引用数据类型。
>基本数据类型：String、Number、Boolean、Null、Undefined、Symbol
>引用数据类型：Object、Array、Function

基本数据类型是不可变数据，而引用数据类型是可变数据，我们需要对它进行一些处理，变成不可变数据。
### 拷贝

可以通过[深、浅拷贝](../interview/java-script)将引用数据类型变成不可变数据。
缺点：当数据规模大、数据拷贝行为频繁时，拷贝将会给我们的应用性能带来巨大的挑战。
### 持久化数据结构
> Immutable.js  Immer.js实现持久化数据

git commit相信大家都用过，在运行这个指令时，git会对整个项目进行一个快照。会保存当前版本所有文件的索引，对于那些没有发生变化的文件，git 保存他们原有的索引；对于那些已经发生变化的文件，git 会保存变化后的文件的索引。
**变化的文件将拥有新的存储空间+新的索引，不变的文件将永远呆在原地。**
这是 git 应对变化的艺术，也是持久化数据结构的核心思想。





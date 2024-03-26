---
group: TypeScript
title: 分布式条件类型
order: 5
---

# 分布式条件类型

> 分布式条件类型（Distributive Conditional Type），也称条件类型的分布式特性，只不过是条件类型在满足一定情况下会执行的逻辑而已。

例子：

```ts
type Condition<T> = T extends 1 | 2 | 3 ? T : never;

// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;
```

如果在不了解分布式条件类型的情况下，会认为 Res1 的类型是不符合预期的，执行结果应该是 T or never。Res1 和 Res2 唯一的区别就在于要进行判断的参数是否通过泛型 T 传入。
先讲结论：**对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上**。什么意思呢？就是将通过将这个联合类型拆开来，每个分支分别进行一次条件类型判断，再将最后的结果合并起来。用代码解释就是：

```TS
type Condition<T> = T extends 1 | 2 | 3 ? T : never;
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;
// 他会进行 1 extends 1 ｜ 2 ｜ 3、2 extends 1 ｜ 2 ｜ 3.....、5 extends 1 ｜ 2 ｜ 3
```

## 如何禁用分布式条件类型

这样子对于`裸类型`也可以解释了，就是 T 没被包裹。包裹是什么意思？直接上代码：

```ts
type Condition<T> = [T] extends [1 | 2 | 3] ? T : never;
// never
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;
```

将 T 和判断条件都用数组包裹，将联合类型之间的比较，变成数组之间的比较。这样就可以禁用掉分布式条件类型了。

## never 中的类似情况

当想要判断一个类型是不是 never 时，也可以用相同的写法：

```ts
type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes2 = IsNever<'linbudu'>; // false
```

注意这里不是因为分布式条件类型的缘故，对于 never，它如果作为泛型传入，无论判断条件是什么，都会返回 never（直接使用就进行正常判断）。

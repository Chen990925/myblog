---
group: TypeScript
title: 类型体操（11～20）
order: 2
---

## 第十一题

> 实现一个 IsEqual 工具类型，用于比较两个类型是否相等。

```ts
type IsEqual1<T, K> = [T] extends [K]
  ? [K] extends [T]
    ? true
    : false
  : false;
```

此处使用[]包裹泛型是因为要处理泛型是联合类型或者 never 的情况。

- 泛型是联合类型时：触发条件类型的分布式特性，将联合类型的每一项拆开和条件判断兼容性，而不是整体。
- 泛型是 never 时：会直接跳过比较过程，返回 never 类型。

## 第十二题

> 实现一个 Head 工具类型，用于获取数组类型的第一个类型。具体的使用示例如下所示

```ts
type Head<T extends Array<any>> = T extends [infer A, ...infer B] ? A : never;

type Head<T extends Array<any>> = T['length'] extends 0 ? never : T[0];
```

## 第十三题

> 实现一个 Tail 工具类型，用于获取数组类型除了第一个类型外，剩余的类型。具体的使用示例如下所示：

```ts
type Tail<T extends Array<any>> = T extends [infer A, ...infer B] ? B : never;
```

## 第十四题

> 实现一个 Unshift 工具类型，用于把指定类型 E 作为第一个元素添加到 T 数组类型中

```ts
type Unshift<T extends any[], E> = [E, ...T];
```

## 第十五题

> 实现一个 Shift 工具类型，用于移除 T 数组类型中的第一个类型

```ts
type Shift<T extends any[]> = T extends [infer A, ...infer B] ? B : never;
```

## 第十六题

> 实现一个 Push 工具类型，用于把指定类型 E 作为第最后一个元素添加到 T 数组类型中

```ts
type Push<T extends any[], V> = T extends [...infer A] ? [...A, V] : never;
```

## 第十七题

> 实现一个 Includes 工具类型，用于判断指定的类型 E 是否包含在 T 数组类型中。

```ts
// 此种解法未能兼顾到never和联合类型
type Includes<T extends Array<any>, E> = E extends T[number] ? true : false;

// 解二
type IsEqual1<T, K> = [T] extends [K]
  ? [K] extends [T]
    ? true
    : false
  : false;

type Includes<T extends Array<any>, E> = T extends [infer A, ...infer B]
  ? IsEqual<A, E> extends true
    ? true
    : Includes<B, E>
  : false;
```

## 第十八题

> 实现一个 UnionToIntersection 工具类型，用于把联合类型转换为交叉类型。具体的使用示例如下所示：

解：
利用函数类型的参数类型的逆变。

```ts
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer V) => void
  ? V
  : never;

// 测试用例
type U0 = UnionToIntersection<string | number>; // never
type U1 = UnionToIntersection<{ name: string } | { age: number }>; // { name: string; } & { age: number; }
```

## 第十九题

> 实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性。具体的使用示例如下所示：

```ts
type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};

type OptionalKeys<T> = NonNullable<
  {
    [K in keyof T]: undefined extends T[K] ? K : never;
  }[keyof T]
>;
type PersonOptionalKeys = OptionalKeys<Person>; // "from" | "speak"
```

## 第二十题

> 实现一个 Curry 工具类型，用来实现函数类型的柯里化处理。具体的使用示例如下所示：

```ts
type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>,
> = P extends [infer A, ...arg: infer B]
  ? B extends []
    ? (arg: A) => R
    : (arg: A) => Curry<(...arg: B) => R>
  : () => R;

type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date
```

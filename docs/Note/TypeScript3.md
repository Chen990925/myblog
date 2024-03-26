---
group: TypeScript
title: 类型体操（21～30）
order: 3
---

## 第二十一题

> 实现一个 Merge 工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的 Keys 将会覆盖第一种类型（FirstType）的 Keys。具体的使用示例如下所示：

解一：

```ts
type Merge<T, U> = {
  //@ts-ignore
  [K in keyof (T & U)]: K extends keyof U ? U[K] : T[K];
};
```

解二：
omit

```ts
type Merge<T, U> = Omit<T, keyof U> & U;
```

## 第二十二题

> 实现一个 RequireAtLeastOne 工具类型，它将创建至少含有一个给定 Keys 的类型，其余的 Keys 保持原样。具体的使用示例如下所示：

```ts
type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = KeysType extends keyof ObjectType
  ? ObjectType & Required<Pick<ObjectType, KeysType>>
  : never;
```

## 第二十三题

> 实现一个 RemoveIndexSignature 工具类型，用于移除已有类型中的索引签名。具体的使用示例如下所示：

解：
在对象结构中，键的类型只能是 string、number、symbol。
但是在 keyof T 后生成的是每项是字面量类型的联合类型。

```ts
type Foo = {
  [key: string]: any;
  [key: number]: any;
  name: string;
  bar(): void;
};

type RemoveIndexSignature<T> = {
  [k in keyof T as string extends k
    ? never
    : number extends k
    ? never
    : symbol extends k
    ? never
    : k]: T[k];
};
type FooWithOnlyBar = RemoveIndexSignature<Foo>; //{ name:string;bar: () => void; }
```

## 第二十四题

> 实现一个 Mutable 工具类型，用于移除对象类型上所有属性或部分属性的 readonly 修饰符。具体的使用示例如下所示

```ts
type Mutable<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
  -readonly [K in Keys]: T[K];
};
```

## 第二十五题

> 实现一个 IsUnion 工具类型，判断指定的类型是否为联合类型。具体的使用示例如下所示：

```ts
type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? true
    : false
  : never;
```

## 第二十六题

> 实现一个 IsNever 工具类型，判断指定的类型是否为 never 类型。具体的使用示例如下所示：

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

## 第二十七题

> 实现一个 Reverse 工具类型，用于对元组类型中元素的位置颠倒，并返回该数组。元组的第一个元素会变成最后一个，最后一个元素变成第一个。

```ts
type Reverse<T extends Array<any>, R extends Array<any> = []> = T extends [
  infer A,
  ...infer B,
]
  ? Reverse<B, [A, ...R]>
  : R;
```

## 第二十八题

> 实现一个 Split 工具类型，根据给定的分隔符（Delimiter）对包含分隔符的字符串进行切割。可用于定义 String.prototype.split 方法的返回值类型。具体的使用示例如下所示：

```ts
type Item = 'semlinker,lolo,kakuqo';

type Split<
  S extends string,
  Delimiter extends string,
> = S extends `${infer A}${Delimiter}${infer B}`
  ? [A, ...Split<B, Delimiter>]
  : [S];

type ElementType = Split<Item, ','>; // ["semlinker", "lolo", "kakuqo"]
```

## 第二十九题

> 实现一个 ToPath 工具类型，用于把属性访问（. 或 []）路径转换为元组的形式。具体的使用示例如下所示：

```ts
type CC<T> = T extends `${infer A}[${infer B}]` ? [A, B] : [T];
type ToPath<S extends string> = S extends `${infer A}.${infer B}`
  ? [...ToPath<A>, ...ToPath<B>]
  : CC<S>;
```

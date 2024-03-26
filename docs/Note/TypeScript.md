---
group: TypeScript
title: 类型体操（1～10）
order: 1
---

## 第一题

```ts
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    id: u.id,
    kind: 'customer',
  };
}
```

> 以上代码为什么会提示错误，应该如何解决上述问题？

答：T 只是约束于 User，但是不一定是 User 结构,所以`makeCustomer`的返回对象的类型与 T 并不一致。

第一种做法：将多余的返回值用拓展运算符。

```ts
function makeCustomer<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: 'customer',
  };
}
```

第二种做法：将返回值类型限制为 User 类型

```ts
function makeCustomer<T extends User>(u: T): Pick<T, keyof User> {
  return {
    id: u.id,
    kind: 'customer',
  };
}
```

## 第二题

```ts
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b'); // Ok
```

> 本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

解一：函数重载

```ts
function f(a: string, b: string): string;
function f(a: number, b: number): number;
function f(a: string | number, b: string | number): string | number {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + (b as number); // error as b can be number | string
  }
}
```

解二：类型守卫

```ts
type paramsType = string[] | number[];
function isStringArray(params: paramsType): params is string[] {
  return typeof params[0] === 'string';
}
function f(a: paramsType) {
  if (isStringArray(a)) {
    return a[0] + ':' + a[1]; // no error but b can be number!
  } else {
    return a[0] + a[1]; // error as b can be number | string
  }
}
```

## 第三题

> 定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的。定义一个 SetRequired 工具类型，利用它可以把指定的 keys 对应的属性变成必填的。

解

```ts
type Flatten<T extends object> = { [K in keyof T]: T[K] };

type SetOptional<T extends object, K extends keyof T> = Flatten<
  Partial<Pick<T, K>> & Omit<T, K>
>;
type setRequired<T extends object, K extends keyof T> = Flatten<
  Required<Pick<T, K>> & Omit<T, K>
>;
```

## 第四题

> 定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下：

```ts
interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}
```

解一：
先定义一个`ConditionalKey`满足要求的类型的 key 以联合类型返回。
后利用内置工具类`Pick`挑选需要的键值对。

```ts
type ConditionalKey<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

type ConditionalPick<T, U> = Pick<T, ConditionalKey<T, U>>;
```

解二：
类型断言 as

```ts
type ConditionalPick<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};
```

## 第五题

> 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数。具体的使用示例如下所示：

```ts
type Fn = (a: number, b: string) => number
type AppendArgument<F, A> = // 你的实现代码

type FinalFn = AppendArgument<Fn, boolean>
// (x: boolean, a: number, b: string) => number
```

解一：
利用`Parameters`来获取函数的参数类型，利用`ReturnType`获取函数的返回类型

```ts
type AppendArgument<F extends (...args: any) => any, A> = (
  x: A,
  ...args: Parameters<F>
) => ReturnType<F>;
```

解二：
基于`infer`（`Parameters`和`ReturnType`工具类型也是基于 infer 实现）

```ts
type AppendArgument<F, A> = F extends (...args: infer Args) => infer Return
  ? (x: A, ...args: Args) => Return
  : never;
```

## 第六题

> 定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：

```ts
type NaiveFlat<T extends any[]> = // 你的实现代码

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"
```

> 继续实现 DeepFlat 工具类型，以支持多维数组类型：

```ts
type DeepFlat<T extends any[]> = unknown; // 你的实现代码

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>;
// DeepTestResult: "a" | "b" | "c" | "d" | "e"
```

解：
俩个工具类型可以归为一个，利用递归。

```ts
type Flatten<T extends any[]> = {
  [K in keyof T]: T[K] extends any[] ? Flatten<T[K]> : T[K];
}[number];
```

**[number]是索引类型访问操作，可以将是 number 类型的 key 以联合类型返回**

## 第七题

> 使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值：

```ts
type EmptyObject = {};

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
const shouldFail: EmptyObject = {
  // 将出现编译错误
  prop: 'TS',
};
```

> 在通过 EmptyObject 类型的测试用例检测后，我们来更改以下 takeSomeTypeOnly 函数的类型定义，让它的参数只允许严格 SomeType 类型的值。具体的使用示例如下所示：

```ts
type SomeType = {
  prop: string;
};

// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly(x: SomeType) {
  return x;
}

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x); // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y); // 将出现编译错误
```

解
第一小问：
在类型别名`EmptyObject`上，我们定义的是`{}`,这就意味着是`{}`的子类，那就可以被合法赋予。
**extends {} 、 {} extends** 中的`{}`分别代表的是空对象和字面量类型。
由于 ts 的比较是基于结构化类型系统，空对象是一切类型的基类。

```ts
type EmptyObject = {
  [P in string | number | symbol]: never;
};
```

第二小问：
将多余的参数设置为`never`

```ts
type Exclusive<T1, T2 extends T1> = {
  [K in keyof T2]: K extends keyof T1 ? T2[K] : never;
};

function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
  return x;
}
```

## 第八题

> 定义 NonEmptyArray 工具类型，用于确保数据非空数组。

解一：

```ts
type NonEmptyArray<T> = [T, ...T[]];

const a: NonEmptyArray<string> = []; // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS']; // 非空数据，正常使用
```

解二：
`[]`本身就是`{}`的子类型。

```ts
type NonEmptyArray<T> = [] & { 0: T };
```

## 第九题

> 定义一个 JoinStrArray 工具类型，用于根据指定的 Separator 分隔符，对字符串数组类型进行拼接。

解：

```ts
type JoinStrArray<
  Arr extends string[],
  Separator extends string,
  Result extends string = '',
> = Arr extends []
  ? ''
  : Arr extends [string]
  ? `${Arr[0]}`
  : Arr extends [string, ...infer Rest]
  ? // @ts-expect-error
    `${Arr[0]}${Separator}${JoinStrArray<Rest, Separator>}`
  : string;
```

注意边界处理，递归到空数组、只有一项的数组需要特殊处理。

## 第十题

> 实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理。具体的使用示例如下所示：

```ts
type Trim<V extends string> = // 你的实现代码
  // 测试用例
  Trim<' semlinker '>;
//=> 'semlinker'
```

解：

```ts
type TrimRight<V extends string> = V extends ` ${infer A}` ? TrimRight<A> : V;
type TrimLeft<V extends string> = V extends `${infer A} ` ? TrimLeft<A> : V;
type Trim<V extends string> = TrimLeft<TrimRight<V>>;
```

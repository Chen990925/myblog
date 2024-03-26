---
group: TypeScript
title: 内置工具类型的实现
order: 4
---

## `Record<T, U>`

用于构建一个对象类型，它的所有 key（键）都是 K 类型，它的所有 value（值）都是 T 类型
实现代码：

```ts
type Record<T extends keyof any, U> = {
  [P in T]: U;
};
```

## `Partial<T>`

将构造函数 T 的属性全变为可选：
实现代码：

```ts
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

## `Required<T>`

将构造函数 T 所有属性设为必选：
实现代码：

```ts
type Required<T> = {
  [K in keyof T]-?: T[K];
};
```

## `Exclude<T, U>`

用于构造一个类型，它是从 T 联合类型里面排除了所有可以赋给 U 的类型

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;
// type T0 = "b" | "c"

type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;
// type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
// type T2 = string | number
```

实现代码：

```ts
type Exclude<T, U> = T extends U ? never : T;
```

## `Extract<T, U>`

> 从类型 T 中提取所有可以赋值给 U 的类型

```ts
type T1 = Extract<'a' | 'b' | 'c', 'b' | 'c'>;
//等价于
type T1 = 'b' | 'c';

type T2 = Extract<number | string | (() => void), 'b' | 'c' | Function>;
//等价于
type T2 = () => void;
```

实现代码：

```ts
type Extract<T, U> = T extends U ? T : never;
```

## `Pick<T，K>`

> 从 T 中提取出 K 构成新类型

```ts
interface Todo {
  title: string;
  description?: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

//等价于
type TodoPreview = {
  title: string;
  completed: boolean;
};

//使用场景
const todoPreview: TodoPreview = {
  title: 'test',
  completed: false,
};
```

实现代码：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## `Omit<T, K>`

> 从类型 T 中剔除所有能赋值给 K 的属性

```ts
interface Todo {
  title: string;
  description?: string;
  completed?: boolean;
}
type T1 = Omit<Todo, 'title'>;
//等价于
type T1 = {
  description?: string;
  completed?: boolean;
};
```

实现代码：

```ts
type Omit<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? never : T[P];
};
```

## `ReturnType<T>`

> 由函数类型 T 的返回值类型构造一个类型

```ts
type T1 = ReturnType<() => string>;
//等价于
type T1 = string;
```

实现代码：

```ts
type ReturnType<T extends (arg: any) => any> = T extends (arg: any) => infer R
  ? R
  : never;
```

## `NonNullable<T>`

> 删除 null 和 undefined 的属性

```ts
type NonNullable<T> = T & {};
```

## `Parameters<T>`

提取 T 的参数
实现代码：

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

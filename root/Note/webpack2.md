---
group: webpack模块
order: 2
title: 搭建JS工程环境
---

# 如何利用Webpack集成Babel+TS+ESLint的JS工程环境？

## Babel

>Babel 是一个开源 JavaScript 转编译器，它能将高版本 —— 如 ES6 代码等价转译为向后兼容，能直接在旧版 JavaScript 引擎运行的低版本代码

ES6版本补充了Javascript的新特性，例如箭头函数、代理与反射等。JS本身的语言版本更新也让浏览器和Node等JS引擎存在**兼容性问题**。

借助 Babel 我们既可以始终使用最新版本 ECMAScript 语法编写 Web 应用，又能确保产物在各种环境下正常运行。

在webpack场景中，集成babel-loader也很容易。

- 安装依赖

```bash
  npm/yarn/pnpm i -D @babel/core @babel/preset-env babel-loader
```

- 添加模块处理规则

```js
  module.exports = {
    /* ... */
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
          		test: /\.js$/,
          		use: [
            		{
              		loader: 'babel-loader',
              		options: {
                		presets: ['@babel/preset-env'],
              		},
            			},
         			 ],
       		 },
      	],
   	 },
  };
```

上述中，`module`属性用于声明模块处理规则，`module.rules`子属性则用于定义针对什么类型的文件使用哪些Loader处理器：

- `test: /\.js$/`:用于声明该规则的过滤条件，只有路径名命中该正则的文件才会应用这条规则。
- `use`：用于声明这条规则的 Loader 处理器序列，所有命中该规则的文件都会被传入 Loader 序列做转译处理。
- `Presets`：设置babel的预设规则集。

## Typescript

通常使用ts-loader构建。

- 安装依赖

```js
npm/yarn/pnpm i -D typescript ts-loader
```

- 配置webpack

```js
const path = require('path');

module.exports = {
  /* xxx */
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
};
```

使用 `resolve.extensions` 声明自动解析 `.ts` 后缀文件，这意味着代码如 `import "./a.ts"` 可以忽略后缀声明，简化为 `import "./a"` 文件。

接下来创建tsconfig.json配置文件，关于typescript的配置可在此处配置。

也可以选择使用 [`@babel/preset-typescript`](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-typescript) 规则集，借助 `babel-loader` 完成 JavaScript 与 TypeScript 的转码工作——但是并没有做类似`ts-loader`的类型检查工作。

## ESLint

JavaScript 被设计成一种**高度灵活的动态、弱类型脚本语言**，这使得语言本身的**上手成本极低**，开发者只需要经过短暂学习就可以开始构建简单应用。但与其它编译语言相比，JavaScript **很难在编译过程发现语法、类型**，或其它可能影响稳定性的错误，特别在多人协作的复杂项目下，语言本身的弱约束可能会开发效率与质量产生不小的影响，**ESLint 的出现正是为了解决这一问题**。 

相当于使用一个规则集去规范代码书写。

- 安装依赖

```js
# 安装 eslint 
npm/yarn/pnpm add -D eslint eslint-webpack-plugin

# 简单起见，这里直接使用 standard 规范
npm/yarn/pnpm add -D eslint-config-standard
```

- 在项目根目录下添加`.eslintrc` 配置文件

```js
{
  "extends": "standard"
}
  ```

- 添加 `webpack.config.js` 配置文件，补充 `eslint-webpack-plugin` 配置

```js
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // 添加 eslint-webpack-plugin 插件实例
  plugins: [new ESLintPlugin()]
}
```

## 统一集成

上述分别对Babel、TS、ESLint在webpack中应用，接下来就是统一集成入webapck。

- 安装依赖

```bash
## 安装webpack
		-D webpack webpack-cli

# babel 依赖
    @babel/core @babel/cli @babel/preset-env babel-loader \
# TypeScript 依赖
    typescript @typescript-eslint/parser @typescript-		   eslint/eslint-plugin @babel/preset-typescript
# ESLint 依赖
    eslint eslint-webpack-plugin
```

- 创建webpack.config.js配置文件并输入：

```js
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-typescript'] }
        }
      }
    ]
  },
  plugins: [new ESLintPlugin({ extensions: ['.js', '.ts'] })]
}
```

- 创建 `.eslintrc` 文件并输入：

```js
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended"]
}
```

  ESLint需要配置typescipet语法的规则集。

就此，我们已经搭建好了Webpack集成Babel+TS+ESLint的JS工程环境。

- Babel 提供的语言转译能力，能在确保产物兼容性的同时，让我们大胆使用各种新的 ECMAScript 语言特性；
- TypeScript 提供的类型检查能力，能有效提升应用代码的健壮性；
- ESLint 提供的风格检查能力，能确保多人协作时的代码一致性。


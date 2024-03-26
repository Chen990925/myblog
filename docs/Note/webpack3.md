---
group: webpack模块
order: 4
title: 配置结构规则
---
# 配置结构规则
大多数情况下，配置入口/出口都是以单文件配置：
    
```js
module.exports ={
    entry:"./index.js",
    //其他配置
}
```
但是如果我们的项目需要**打包成不同模块方案**的产物呢？
Webpack 还支持以数组、函数方式配置运行参数。
## 使用数组配置
>数组方式主要用于应对“同一份代码打包出多种产物”的场景

```js

// webpack.config.js
module.exports = [
  {
    output: {
      filename: './dist-amd.js',
      libraryTarget: 'amd',
    },
    name: 'amd',
    entry: './app.js',
    mode: 'production',
  },
  {
    output: {
      filename: './dist-commonjs.js',
      libraryTarget: 'commonjs',
    },
    name: 'commonjs',
    entry: './app.js',
    mode: 'production',
  },
];
```
使用数组配置，Webpack会在启动时创建多个Compilation实例，**并行构建**，**实例间互不通信**————这意味着相同的module在Compilation A中完成解析构建后，在Compilation B中仍然需要重新解析构建。
>使用配置数组时，还可以通过 --config-name 参数指定需要构建的配置对象，例如上例配置中若执行 npx webpack --config-name='amd'，则仅使用数组中 name='amd' 的项做构建。

为了简化写法、减少重复工作，我们可以将**公共配置单独抽离出来**。将公共配置抽取为 baseConfig 对象，之后配合 webpack-merge 创建不同目标数组项。
    
```js
const { merge } = require("webpack-merge");

const baseConfig = {
  output: {
    path: "./dist"
  },
  name: "amd",
  entry: "./app.js",
  mode: "production",
};

module.exports = [
  merge(baseConfig, {
    output: {
      filename: "[name]-amd.js",
      libraryTarget: "amd",
    },
  }),
  merge(baseConfig, {
    output: {
      filename: "./[name]-commonjs.js",
      libraryTarget: "commonjs",
    },
  }),
];
```
## 使用函数配置
配置函数方式要求在配置文件中导出一个函数，并在函数中返回 Webpack 配置对象，或配置数组，或 Promise 对象，如：
        
```js
    module.exports = function(env, argv) {
  // ...
  return {
    entry: './src/index.js',
    // 其它配置...
  }
}
```
- env：通过 --env 传递的命令行参数，适用于自定义参数
- argv：命令行 Flags 参数，支持 entry/output-path/mode/merge 等
```js
// npx webpack --env app.type=miniapp --mode=production
module.exports = function (env, argv) {
  return {
    mode: argv.mode ? "production" : "development",
    devtool: argv.mode ? "source-map" : "eval",
    output: {
      path: path.join(__dirname, `./dist/${env.app.type}`,
      filename: '[name].js'
    },
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: argv.mode === "production", 
        },
      }),
    ],
  };
};
```
我们可以为不同的环境输入不同的命令行参数，从而实现环境隔离。但是这种方式有俩个缺点：
- 需要在配置函数内做许多逻辑判断，复杂场景下可能可读性会很低，维护成本高。
- 强依赖命令行指令，有可能需要写很长的指令，应用体验差。

## 环境治理策略
在现代前端工程化实践中，通常需要将一个项目部署在不同的环境中(如开发环境、测试环境、生产环境)，以满足参与项目各方的需求。对不同环境，有着不同的打包侧重逻辑。
- 开发环境：需要使用 webpack-dev-server 实现 Hot Module Replacement(热更新)。
- 测试环境：需要带上完整的 Soucemap 内容，以帮助更好地定位问题。
- 生产环境：需要对产物进行压缩、混淆、分离等优化，以提升加载速度。

为了实现环境隔离，我们可以使用 webpack-merge 将公共配置与环境配置分离，再通过 --env 参数传递环境标识。
```
.
└── config
  ├── webpack.common.js
  ├── webpack.development.js
  ├── webpack.testing.js
  └── webpack.production.js
```
之后配合 --config 选项指定配置目标，如：
```bash
npx webpack --config webpack.development.js
```
通过`webpack-merge`合并公共配置和环境配置：
```js
// webpack.common.js
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [new HTMLWebpackPlugin()],
};
```
```js   
// webpack.development.js
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common");

// 使用 webpack-merge 合并配置对象
module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: { hot: true },
});
```
<!-- ## 核心配置项详解 -->

### entry
>只讲解对象配置

```js
module.exports ={
  entry:{
    import:'./src/index.js',
    dependOn:'shared',
    // runtime: ...
  }
}
```
- import:入口文件路径
- dependOn:声明该入口的前置依赖Bundle
- runtime:设置该入口的 Runtime Chunk
- filename:效果与 output.filename 类同，用于声明该模块构建产物路径；
- library：声明该入口的 output.library 配置，一般在构建 NPM Library 时使用；
- publicPath：效果与 output.publicPath 相同，用于声明该入口文件的发布 URL；
- chunkLoading：效果与 output.chunkLoading 相同，用于声明异步模块加载的技术方案，支持 false/jsonp/require/import 等值；
- asyncChunks：效果与 output.asyncChunks 相同，用于声明是否支持异步模块加载，默认值为 true。

其中runtime的作用是**管理运行时代码**。
为支持产物代码在各种环境中正常运行，Webpack 会在产物文件中注入一系列运行时代码，用以支撑起整个应用框架。运行时代码的多寡取决于我们用到多少特性。
运行时代码量，极端情况下甚至有可能超过业务代码总量！为此，必要时我们可以尝试使用 runtime 配置将运行时抽离为独立 Bundle。
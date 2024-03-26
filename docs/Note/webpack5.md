---
group: webpack模块
order: 6
title: 构建性能策略
---

# 构建性能策略

## 持久化缓存

在[构建效率分析工具](./webpack4.md)一文中，提到了 Webpack 在大型项目中的性能表现不佳，
这是因为 Webpack 需要执行非常密集的 IO 与 CPU 操作，计算成本高，再加上 Webpack 以及大多数组件都使用 JavaScript 编写，无法充分利用多核 CPU 能力。

那么有什么方法可以提升构建过程的时间效率?————**持久化缓存**。

通过牺牲空间换取时间，将构建过程中的中间产物缓存到磁盘中，下次构建时直接读取缓存，从而提升构建效率。
在 Webpack5 中设置 cache.type = 'filesystem' 即可开启：

```js
// webpack.config.js
module.exports = {
  //...
  cache: {
    type: 'filesystem',
  },
  //...
};
```

还有一些常用的配置项：

- `cache.buildDependencies`：配置缓存依赖，当依赖的文件内容发生变化时，缓存失效。
- `cache.cacheDirectory`:缓存文件路径，默认为 node_modules/.cache/webpack。

## 并行处理

## 减少编译范围

每次构建编译时，webpack 会编译项目中所有的文件。使得构建阶段耗时较长，尤其是在大型项目中。
我们可以通过减少编译范围来提升构建效率。

### 懒加载

vite 中是全局开启懒加载的，用户访问页面，相应页面的资源才会被编译。
而 webpack 中需要手动配置，通过 `import()`和`require()` 实现懒加载。

```js
// lazyCompilation.js
module.exports = (base) => {
  Object.assign(base, {
    experiments: {
      lazyCompilation: true,
    },
  });
  return base;
};
```

### 约束 Loader 执行范围

通过 `exclude`配置项来排除不需要处理的文件————`node_modules`。

```js
// exclude.js
module.exports = (base) => {
  base.module.rules.map((v) => {
    v.exclude = /node_modules/;
  });
  return base;
};
```

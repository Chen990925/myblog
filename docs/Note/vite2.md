---
group: vite
order: 3
title: Vite的常见配置及插件
---

自己在 Vite 中常用的配置以及插件

## css（后处理器和预处理器）

- css.preprocessorOptions：定义全局变量并且在 vite 配置中引入，这样就能在.tsx 和.scss 文件中使用。（less 也同理）

```js
    // src/assets/styles/variables.scss
    $color: orange;
    $size: 16px;

    // vite.config.js
    import { defineConfig } from 'vite'

    export default defineConfig({
     css: {
       preprocessorOptions: {
       scss: {
         additionalData: `@import '/src/assets/styles/variables.scss';` // 引入全局变量文件
         }
     }
    }
    })
```

- css.postcss:预处理器，浏览器样式兼容问题、浏览器适配等，都可以通过 PostCSS 来解决。

## resolve

- resolve.alias：简写路径

```js
  // vite.config.js
  import { defineConfig } from 'vite';
  import path from 'path';

  export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 路径别名
      },
    },
  });
  //然后你就可以这样写
  src -> @
  assets -> @assets
  components -> @components
  router -> @router
  stores -> @stores
  views -> @views
```

- resolve.extensions：简写文件拓展名字

```js
resolve: {
  extensions: ['.js', '.ts', '.json']; // 导入时想要省略的扩展名列表
}
```

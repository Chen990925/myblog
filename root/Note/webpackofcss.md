---
group: webpack模块
order: 3
title: 搭建CSS工程环境
---

#  如何借助预处理器、PostCSS等构建现代CSS工程环境？

>前文介绍了如何搭建JS工程环境，利用Babel保证产物兼容性，利用Typescript提供类型检查，利用ESLint规范代码风格。那么在对于CSS文件，我们该如何在webpack中处理？

## Webpack如何处理CSS资源

webpack并不认得CSS语法，我们需要通过Loader、Plugin来处理CSS文件。

在webpack中处理CSS文件，通常需要用到：

- [`css-loader`](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Floaders%2Fcss-loader%2F)：该 Loader 会将 CSS 等价翻译为形如 `module.exports = "${css}"` 的JavaScript 代码，使得 Webpack 能够如同处理 JS 代码一样解析 CSS 内容与资源依赖；
- [`style-loader`](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Floaders%2Fstyle-loader%2F)：该 Loader 将在产物中注入一系列 runtime 代码，这些代码会将 CSS 内容注入到页面的 `<style>` 标签，使得样式生效；
- [`mini-css-extract-plugin`](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fmini-css-extract-plugin)：该插件会将 CSS 代码抽离到单独的 `.css` 文件，并将文件通过 `<link>` 标签方式插入到页面中。

需要注意的是`style-loader`和`mini-css-extract-plugin`分别是应用于**开发环境**和**生产环境**。

安装依赖与配置都与搭建JS工程环境的步骤相似。

**style-loader并不会对代码内容做任何修改**，只是将css-loader处理后的JS字符串插入到页面的style标签中。

在配置时候需要注意，style-loader的处理需要在css-loader之后：

```js
use: ["style-loader", "css-loader"]
```

经过俩个loader的处理，样式代码最终会写入输出文件中，并在运行时插入到style标签中。但是这种将JS、CSS代码合并进同一个产物文件的方式会存在**几个问题**：

- JS、CSS资源无法并行加载，从而降低页面性能。
- 资源缓存粒度变大，JS、CSS任意一种变更都会致缓存失效。

所以生产环境会使用`mini-css-extract-plugin`，将CSS代码抽离到单独的`.css`文件中。

打包后我们通常可以看到html文件中有指向JS、CSS资源的标签：

```html
<script defer src="main.js"></script>
<link href="main.css" rel="stylesheet">
```

## 使用预处理器

>为了提高JavaScript的编写效率、规范以及优雅，我们可以集成很多工具。同样的对于CSS我们也可以利用工具来让我们更高效优雅的编写页面样式。

原生的CSS并没有提供循环、函数、嵌套等特性，对于目前日渐复杂的Web应用开发需求，显得有点力不从心。于是社区在原生CSS的基础上扩展出了**使用便捷、功能强大的预处理器**，类如less、sass等。

webpack中使用预处理器的方法也是*loader插入*。

同样需要注意预处理器是要在css-loader之前使用。

## 使用post-css

>PostCSS 是一种 JavaScript 工具，可将你的 CSS 代码转换为抽象语法树 (AST)，然后提供 API（应用程序编程接口）用于使用 JavaScript 插件对其进行分析和修改。

PostCSS可以看做是CSS的babel插件，它只是一个将特殊的***PostCSS**插件语法转换为 Vanilla CSS 的转译器。

其实很多人都用过PostCSS，类如 **Autoprefixer 插件**、**Vite**、**Next.Js**、以及[**CSS框架TailwindCSS**](https://tailwindcss.com/docs/installation)。

在webpack中也是loader插入，配置方法和其他一样。也可以在根目录下新建**postcss.config.js**文件，在里面配置。

PostCSS是关于插件的。[插件](https://www.postcss.parts)生态十分丰富。

在项目中可以根据项目的需求，来与预处理器结合使用。




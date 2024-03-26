---
group: TypeScript
title: TSconfig常用配置详解
order: 6
---

# TSconfig 常用配置详解

## 构建相关

### 构建解析相关

- files、include 与 exclude

  - files：使用 files 我们可以描述本次包含的所有文件，但不能使用 src 或者 src/\* 这种方式，每个值都需要是完整的文件路径，小型项目中使用。
  - include

  ```js
    {
        "include": ["src/**/*", "generated/*.ts", "internal/*"]
    }
  ```

  `src/**/*`表示包括在 src 下的所有合法文件，无视目录层级。 `internal/*` 则只会匹配 internal 下的文件，不会匹配 internal/utils/ 下的文件。
  这里的合法文件指的是，只会匹配 以.ts / .tsx / .d.ts / .js / .jsx 为拓展名的文件。

  - exclude：剔除已经被 include 包含的文件。

- baseUrl
  这一配置可以定义文件进行解析的根目录，它通常会是一个相对路径，然后配合 tsconfig.json 所在的路径来确定根目录的位置。

  ```text
  project
  ├── out.ts
  ├── src
  ├──── core.ts
  └── tsconfig.json

  ```

  如果你设置成"baseUrl": "./"，根目录就会被确定为 project。
  在 out.ts 中使用导入语句，就可以直接使用基于根目录的绝对路径导入文件。

  ```ts
  import 'src/core'; // TS 会自动解析到对应的文件，即 "./src/core.ts"
  ```

- types
  TypeScript 会加载 node_modules/@types/ 下的所有声明文件，包括嵌套的 ../../node_modules/@types 路径，这么做可以让你更方便地使用第三方库的类型。但如果你希望只加载实际使用的类型定义包，就可以通过 types 配置。
- paths
  配合 baseUrl 简化导入路径

### 构建产物相关

- outDir 与 outFile： outDir 配置的值将包括所有的构建产物，通常情况下会按照原本的目录结构存放。而 outFile 类似于 Rollup 或 ESBuild 中的 bundle 选项，它会将所有的产物（其中非模块的文件）打包为单个文件，但仅能在 module 选项为 None / System / AMD 时使用。

## 检查相关

### 检查类

- strict：strict 其实是一组规则的开关，开启 strict 会默认将这些规则全部启用，包括：

alwaysStrict、useUnknownInCatchVariables
noFallthroughCasesInSwitch、noImplicitAny、noImplicitThis
strictNullChecks、strictBindCallApply、strictFunctionTypes、strictPropertyInitialization

应当根据根据工作需求扩展。

---
group: vite
order: 3
title: Vite的性能优化
---

# Vite 的性能优化

## 性能分析工具及标准

工具：

- Network
- Lighthouse
- bundle

标准：

- FCP（First Contentful Paint）：白屏时间（第一个文本绘制时间）
- Speed Index：首屏时间
- TTI（Time To Interactive）: 第一次可交互的时
- lighthouse score：Chrome 浏览器审查工具性能评分

tips：优化应当根据实际情况来进行。不应该一股脑的全加上去。

## 优化策略

### 传输优化

- 拆包策略：浏览器重复请求相同资源时，会优先使用缓存资源。利用这点，将不经常更新的代码单独打包。减轻服务器请求压力。
- cdn 加速：将部分依赖模块（非自己服务器上的资源）利用 vite-plugin-cdn-import 插件配置下，让用户从最近的服务器请求资源，提升网络请求的响应速度。
- 路由懒加载：这个不属于 vite 内容。

### 体积优化

- 图片压缩
- 按需导入
- treeshaking：这个 vite 已经默认开启了

其实优化策略都是大差不差，使用 webpack 优化也是如此。

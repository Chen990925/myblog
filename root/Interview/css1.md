---
group: CSS
title: CSS
order: 1
---

## CSS 的选择器及优先级

选择器中，优先级分为四个等级：

- 第一优先级：
  - id 选择器（#id）
- 第二优先级：
  - 类选择器（.classname）
  - 伪类选择器（.classname:hover）
  - 属性选择器（input["text"]）
- 第三优先级：
  - 伪元素选择器(.classname::after)
  - 标签选择器(div)
- 第四优先级：
  - 相邻兄弟选择器（+）
  - 子选择器（ ）
  - 后代选择器（>）
  - 通配符选择器（\*）

注意的是，用！important 标注的样式，优先级最高；其次内联样式优先级高于选择器；相同优先级的选择器，谁在后面谁优先级最高。

## css 中可继承的有哪些属性？

文本类型属性，字体类型属性，列表布局属性，元素可见性属性，光标属性。

## display 的常见属性？

- none：不可见，同时从文档流中移除。
- block：块类型。默认是父元素的宽，可设置宽高，独占一行。
- inline：行内类型。宽高取决于内容，不可设置宽高，同行显示。
- inline-block：行内块类型。宽高取决于内容，可设置宽高，同行显示。
- inherit：从父元素那继承 display 的属性值。

## 将元素隐藏的几种方式

- display：none：文档流中移除该元素。
- visibility: hidden
- opacity: 0
- transform: scale(0,0)

## 伪类和伪元素的区别

- 伪类选择器：设置元素的特定状态
- 伪元素选择器：设置元素的特定部分

## 什么是 BFC？

BFC 是块格式化上下文，就是设置一个容器，让容器中的元素不影响到外部元素。

## 如何创建 BFC？

- 浮动：float
- 绝对定位 absolute/fixed
- display：flex inline-block...
- overflow 除了 visable 以外的属性

## BFC 有什么特点？

- 俩个块元素的 margin 会重叠
- 不会和浮动元素重叠
- 计算容器高度时，会将浮动元素的高度也计算进去

## BFC 可以解决什么问题？

- 俩个块元素 margin 重叠，只要将一个块元素放在 BFC 中就行
- 利用第二个特性，可以快速实现俩栏布局
- 清除元素内部浮动

## 元素水平垂直居中的方法？

- postion+tranform
- position+margin
- flex

## 如何实现字体 12px 以及边框 0.5px？

字体 12px：

- tranform：scale(0.5)
- svg 标签

边框 0.5px：

- 伪类

## 移动端适配

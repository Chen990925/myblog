---
group: 基础学习
title: css基本使用
order: 1
---


# css使用

https://blog.csdn.net/2401_83916283/article/details/137133729

## 全局元素单位

1. **rem** (root em): 这个单位相对于文档根元素（通常是`<html>`标签）的字体大小。这使得`rem`成为一个全局的相对单位，不随局部字体大小的变化而变化。

2. **ex**: 这个单位相对于当前元素“x”高度的大小。通常，“x”高度指的是小写字母“x”的高度，它在不同的字体中可能会有所不同。

3. **ch**: 这个单位相对于当前字体的“0”字符的宽度，可以用来测量基于文本的容器宽度。

4. **vw** 和 **vh**: 分别代表视口宽度和视口高度的百分比。`1vw`等于视口宽度的1%，`1vh`等于视口高度的1%。这些单位对于响应式设计非常有用。

5. **vmin** 和 **vmax**: 这些单位分别基于视口的较小和较大尺寸。`1vmin`等于视口宽度和高度中较小值的1%，而`1vmax`等于视口宽度和高度中较大值的1%。

6. **%** (percent): 这个单位表示相对于另一个值的百分比。它可以应用于长度、频率、角度等，具体取决于上下文

   

## 字体

color：字体颜色

> 注意设置盒子背景是background-color

font-size ：字体大小

font-weigh：normal：普通，bond：加粗

text-decoration：underline：下划线，line-through：删除线

font-style：italic：倾斜字体

text-indent：缩进，一般单位em表示

> 如果`em`单位用在**字体大小的定义**上，那么1em等于其父元素的字体大小。例如，如果一个父元素的字体大小是16px，那么在子元素中定义`font-size: 2em;`将使子元素的字体大小变为32px
>
> 当`em`单位应用于**其他属性**（如宽度、高度、边距、内边距等）时，它的值仍然是相对于当前元素的字体大小。这意味着如果当前元素的字体大小改变，以`em`为单位的属性也会相应地改变。

 line-height：行高：line-height属性的单位可以是px为单位的数值：line-height：30px;

line-height属性的单位可以是 没有单位是数值，表示字号的倍数，这是最推荐的写法：line-height：1.5;

line-height属性也可以是百分数，表示字号的倍数

> 单行文本垂直居中：设置行高行高等于盒子的高度，设置单行文本垂直居中对齐
>
> 同时设置text-align：center，即可实现文本水平居中





## 复合选择

### 后代选择

`元素1 元素2 {样式说明}`

上述语法表示选择元素 1 里面的所有元素 2 (后代元素)。

### 子元素选择器

子元素选择器（子选择器）只能选择作为某元素的最近一级子元素（简单理解就是选亲儿子元素）

比如以下例子

```html
<div class="parent">
  <p>Child 1</p>
  <p>Child 2</p>
  <div>
    <p>Grandchild</p>
  </div>
  <p>Child 3</p>
</div>
```

 "Child 1", "Child 2", 和 "Child 3" 这三个段落标签都将被选中



### 并集选择器

并集选择器可以选择多组标签, 同时为他们定义相同的样式，通常用于集体声明

`元素1 , 元素2 {样式说明}`

上述语法表示选择元素1 和 元素2。



### 交集选择器

选择同时带有两个或多个标签/类/ID的元素

```html
div.example {
  /* styles go here */
}
//此处同时选择了div标签且带有example类的元素
```



### 伪类选择器

（1）:hover 伪类选择器：当鼠标悬停在元素上时触发。常用于添加交互效果。

（2）:active 伪类选择器：当元素被激活（例如，用户点击它）时触发。常用于添加点击效果。

（3）:focus 伪类选择器：当元素获得焦点（例如，用户点击或通过 Tab 键导航到它）时触发。常用于添加表单元素的样式。

（4）:first-child 伪类选择器：选择元素的第一个子元素。常用于添加列表项的样式。

（5）:last-child 伪类选择器：选择元素的最后一个子元素。常用于添加列表项的样式。

（6）:nth-child() 伪类选择器：选择元素的第 n 个子元素。可以使用表达式来选择不同的子元素。例如，:nth-child(2n) 选择偶数子元素，:nth-child(3n+1) 选择第 1、4、7、10 个子元素。

（7）:nth-of-type() 伪类选择器：选择同一类型的元素中的第 n 个元素。例如，p:nth-of-type(2n) 选择偶数的p元素。



## 伪元素

虚拟动态创建的元素

伪元素用双冒号表示，::before，::before





## 盒子模型

所有的HTML标签都可以看成矩形盒子，由width，height，padding、border构成，称为盒子模型

### width

盒子总宽度 = width+ 左右padding + 左右 broder

- width属性表示盒子内容的宽度
- width属性的单位通常是px，移动端开发也会涉及到百分数、rem等单位
- 当块级元素（div 、h系列、li等）没有设置width属性时，**它将自动撑满**，但这并不意味着width可以继承



### height

- height属性表示盒子内容的高度
- height属性的单位通常是px，移动端开发也会涉及到百分数、rem等单位
- 盒子的height属性如果不设置的话，它将自动被内容撑开，如果没有内容，默认是0



### padding

- padding 属性是盒子的内边距，即盒子边框内壁到文字的距离
- padding 属性如果用四个数值以空格隔开进行设置，分别表示**上、右、下、左**的 padding
- padding 属性如果用数值以空格隔开进行设置，分别表示 **上、左右、下**的 padding
- padding 属性如果要用二个数值以空格隔开进行设置，分别表示**上下、左右**的 padding



### margin 

margin 的塌陷问题：**竖直方向的 margin 有塌陷的现象：小的 margin 会塌陷到大的 margin 中，从而 margin 不叠加，只以大值为准**

> **一些元素（比如 body、ul、p 等) 都有默认的 margin，在开始制作网页的时候，要将他们清除**



### 盒子的水平居中

将盒子的左右两边的 margin 都设置为 0，盒子将水平居中，即`margin:0 auto`

文本居中是 text-align：center; 和盒子水平居中是两个概念

盒子的垂直居中 我们需要使用绝对定位来实现

> auto的意思是两边距离自动分配
>
> 对于margin和padding：auto会自动分配相等的距离
>
> 对于height和width，对于块级元素，会自动填充父元素，对于内联元素则根据内容决定
>
> 对于 `<img>` 元素，`width` 或 `height` 设置为 `auto` 时，图片会保持原始的宽高比进行缩放，以适应指定的宽度或高度



### 盒模型的计算

box-sizing 属性： 添加**box-sizing：border-box**后盒模型计算就不会再外扩而是内缩，实际设计的宽高是多少就是多少，不会因为设置了padding而导致实际占用空间增大





## 行内元素和块级元素

比较：块级元素不能并排显示，能设置宽高，不设置自动撑满

​			行内元素能并排显示，不能设置宽高，width自动收缩

### 行内元素和块级元素的相互转换

- 使用 display：block；可以将元素转换为块级元素
- 使用 display：inline；可以将元素转换为行内元素，将元素转换为行内元素的不多见
- 使用 display：inline-block；可以将元素转换为行内块元素



## 元素的隐藏

- 使用 display：none；可以将元素隐藏，元素将彻底放弃位置，如同没有写它的标签一样
- 使用 visibility：hidden；也可以将元素隐藏，但是元素不放弃自己的位置



## 浮动与定位

- 浮动的本质：用来实现**并排**的效果
- 浮动使用的要点：要浮动，并排的盒子都实现浮动
- **父盒子要有足够的宽度，否则子盒子会掉下去**



### 浮动的元素一定能设置宽高

**浮动的元素不再区分块级元素、行内元素、已经脱离了标准文档，一律能够设置宽度和高度，即使他是 a 标签或 span 标签**



### 使用浮动的注意事项

- 垂直显示的盒子，不要设置浮动、只有并排显示的盒子才要设置浮动
- “大盒子带着小盒子跑”，一个大盒子中、又是一个小天地，内部可以继续使用浮动



## BFC 规范

**BFC 规范（Box-Formatting Context 块级格式化上下文）是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然**

当一个盒子不设置 height，当内容子元素都浮动时，无法撑起自身，导致这个盒子没有形成 BFC

**解决办法**

父盒子设置`position:absolute`



### 清除浮动

overflow:hidden



## 相对定位

位置描述词：left:向左移动，right：向右移动，top:向上移动...

相对定位：盒子可以相对自己原来的位置进行位置调整，称为相对定位

相对定位的元素，**会在老家留坑**，**本质上任然是在原来的位置**，只不过渲染在新的地方而已，渲染的图形可以比喻成**影子**，不会对页面元素产生任何影响。

### 用途

- 相对定位用来微调元素位置
- 相对定位的元素，可以当做绝对定位的参考盒子



## 绝对定位

位置描述词：left到左边的距离，right：到右边的距离....

盒子可以在浏览器中以坐标进行位置精准描述，拥有自己的绝对位置

绝对定位的元素脱离标准文档流，**将释放自己的位置，对其他元素不会产生任何干扰，而是对他们进行压盖**



### 参考盒子

- 绝对定位的盒子并不是永远以浏览器作为基点

- 绝对定位的盒子会以**自己祖先元素**中，离自己**最近的**拥有**定位属性的盒子**，当做基准点，这个盒子通常是相对定位的，所以这个性质也叫做**子绝父相**

  > 所以父元素设置position:relative

子绝父相实现元素水平垂直居中举例：

```html
.parent {
  position: relative;
  width: 300px; /* 示例宽度 */
  height: 300px; /* 示例高度 */
  background-color: #f0f0f0; /* 背景颜色，便于观察 */
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate (-50%, -50%);
  background-color: #00ff00; /* 背景颜色，便于观察 */
  padding: 10px; /* 示例内边距 */
}
```



## 固定定位

固定定位：不管页面如何滚动、他都永远固定在那里

固定定位脱离标准文档流

`position:fixed`

---
group: vue2
title: vue2文档学习二
order: 2
---


# Vue2文档学习

## *计算属性和侦听器

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

**在这个地方，模板不再是简单的声明式逻辑。**

必须看一段时间才能意识到，这里是想要显示变量 `message` 的翻转字符串。当想要在模板中的多处包含此翻转字符串时，就会更加难以处理。

所以，**对于任何复杂逻辑**，都应当使用**计算属性**。



### 例子

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

js内容

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    // 选择的属性reversedMessage是通过 函数返回回来的
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```


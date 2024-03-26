---
group: React
title: React渲染优化
order: 5
---

## 渲染控制

### render 阶段的理解

经常可以看到减少 render，但是究竟减少的是什么？render 阶段究竟做了什么？
render 阶段并没有真实的渲染 DOM，它根据一次更新中产生新的状态值，会产生一个保存了新状态值的 React element 对象。
再将 React element 对象转换成新 Fiber 树，对比新旧 Fiber 树，生成一个副作用列表给 commit 阶段。

### 如何控制 render？

- 从父组件隔断子组件的渲染：useMemo、Memo

  - useMemo：缓存子组件

    ```js
    export default function Index() {
      const [numberA, setNumberA] = React.useState(0);
      const [numberB, setNumberB] = React.useState(0);
      return (
        <div>
          {useMemo(
            () => (
              <Children number={numberA} />
            ),
            [numberA],
          )}
          <button onClick={() => setNumberA(numberA + 1)}>改变 numberA</button>
          <button onClick={() => setNumberB(numberB + 1)}>改变 numberB</button>
        </div>
      );
    }
    ```

  - Memo:接受两个参数，第一个参数 Component 原始组件本身，第二个参数 compare 是一个函数，可以根据一次更新中 props 是否相同决定原始组件是否重新渲染。如果没有那么第二个参数，那么以浅比较 props 为 diff 规则。如果相等，当前 fiber 完成工作，停止向下调和节点，所以被包裹的组件即将不更新。

- 从自身控制：shouldComponentUpdate 生命周期（一般不推荐用）

## 渲染调优

### 懒加载（Suspense + React.lazy）

基本使用：

```js
const LazyComponent = React.lazy(() => import('./test.js'));

export default function Index() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

当我们使用 React.lazy() 时，React 会自动将返回的组件包装在一个 lazy 组件中。因此，我们需要使用 Suspense 组件来渲染这个 lazy 组件。Suspense 组件允许我们在组件加载完成之前显示一个 loading 界面。
tips：实际开发中，更建议使用 react-router 提供的懒加载功能。

### 渲染错误边界

React 组件渲染过程如果有一个环节出现问题，就会导致整个组件渲染失败，那么整个组件的 UI 层都会显示不出来，这样造成的危害是巨大的，如果越靠近 APP 应用的根组件，渲染过程中出现问题造成的影响就越大，有可能直接造成白屏的情况。
推荐使用 react-error-boundary 插件。

### diff key

这个可以看 diff key 那章的笔记。

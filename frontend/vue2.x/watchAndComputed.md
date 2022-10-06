## watch属性
> watch一般用于监听依赖改变并更新订阅的依赖
* UserWatch $watch
* computedWatch 具有缓存数据的作用没，通过监听是否有子依赖订阅（dirty标识）来优化运行时的估值
```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)
```
* syscWatch 同步更新数据,一般用于作用于全局Apiwatch选项，监听数组改变
* renderWatch通知更新视图

## computed属性
* 计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值

## computed对比method 方法
> computed不用多次执行，内部回自动缓存响应式数据、而method每次依赖数据改变都需要执行函数，才能获取想要结果

## computed与watch的区别
* 当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch
* 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
## Vue Component创建生成过程
1. 调用Vue.extend去拓展组件
```js
// extend实现
Vue.extend = (extendOptions) => {
  const Super = this
  const SuperId = Super.cid
  // 缓存组件
  const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
  if (cachedCtors[SuperId]) {
    return cachedCtors[SuperId]
  }
  // 当前组件的选项
  const Sub = function VueComponent (options) {
    this._init(options)
  }
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  Sub.options = mergeOptions(
  Super.options,
  extendOptions
)
}
```

2. 构造父子函数、安装组件钩子函数最后返回组件的Vnode结点


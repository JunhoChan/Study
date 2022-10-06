# Vue源码解析
> Vue是一款数据驱动视图展示。通过设置响应式对象数据(Object.defineProperty | Proxy)去收集改变依赖，
并通知对应的依赖进行更新，更新的过程对比虚拟dom(VirtualDom JS对象)，找到需要更新的DOM节点更新视图，只要开发维护好数据就能更新视图不用直接操作Dom节点去更新.

<br />
<br />

## New Vue的过程
* 初始化组件内部配置，绑定父子节点属性
```js
// 将选项配置绑定到当前组件上下文
```   
* 初始化生命周期
```js
 // 绑定上下级函数关系 $children $root $parent 遇到抽象函数找到上一级
 // 初始化生命周期标识量
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
```
* 初始化事件
```js
// 拿到上一级的事件
const listeners = vm.$options._parentListeners
if (listeners) {
  updateComponentListeners(vm, listeners)
}
```
* 初始化渲染
```js
// 获取父节点Vnode，并再父级上下文获取插槽数据
```
* 调用beforeCreate生命周期函数
* 初始化响应式数据 prop -> methods -> data -> computed -> watch
* 调用created生命钩子
* 挂载节点 Vm.$mount(el)

## Vue实例挂载的实现
* 首先查找$el如果没有或者挂载到body直接报错
* 将模板编译成render函数(如果是字符串转为模板， 如果是html直接获取节点的inerHTML)
* 调用生命周期函数BeforeMount
* 将render函数编译成对应的Vnode
* 更新Vnode节点
```js
// 更新节点的时候，通过hydrating标识当前是否首次渲染
vm._update(vm._render(), hydrating)

<br />

```
* 监听当前上下文VM,更新真实Dom.如果数据改变调用updateComponent回调
```js
new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)

```
* 调用mounted钩子函数:(父created -> 子 created -> 子Mounted -> 父 Mounted -> 子 updated -> 父 Update -> before 子 0> before -> 父 detroy 子 -> detroy 父)

<br/><br/>


## render函数处理 
> render函数将实例渲染成一个虚拟Vnode
```js
// 处理父Vnode节点，这样可以让当前实例访问父插槽数据
if (_parentVnode) {
    vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject
  }
// 注意这里调用类createElement 方法转换为Vnode
 vnode = render.call(vm._renderProxy, vm.$createElement)
```

## Vnode说明
> Vnode是用JSObject来说明真实Dom节点的情况，是对真实Dom对一种抽象式封装，具体数据类似[参考](https://blog.csdn.net/kisty_yao/article/details/87615744)

<br/>

## createElement的作用
* 用于创建node过程，主要是对每个节点的children属性进行处理，形成一个标准的Vnode Tree也就是Dom Tree

<br />

## update的作用
> 对比先后vnode的区别，针对性地对不同对Vnode转化为真实dom节点
* 首先新旧标志位置更换
* 通过patch后获取真实节点
* patch执行过程
1. 所有的模块注入生命钩子函数 
2. 更新过程 
 > 1. 如果有旧节点没有新节点直接调用销毁钩子
 > 2. 如果没有旧节点直接创建DOM元素
 > 3. 如果没有旧节点的真实元素并且新旧节点相同Fiff算法Vnode的区别（一般进行root对比），并将有区别的Vnode存进insertedVnodeQueue数组
 > 4. 创建当前元素点,首先创建子元素dom节点，在将当前dom节点绑定到父级
```js
createChildren(vnode, children, insertedVnodeQueue)
if (isDef(data)) {
  invokeCreateHooks(vnode, insertedVnodeQueue)
}
insert(parentElm, vnode.elm, refElm)
// 注意这里是vnode的child先存，在存父节点Vnode
```
* 疑问一、如果多组件创建、Patch做了什么工作
 ```
 1. 子组件VNode通过 new Vue(option) 一个实例child
 2. 进行初始化进入Vm.$mount(vm.$option.el)
  
 ```
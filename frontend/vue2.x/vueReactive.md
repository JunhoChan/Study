## Vue2响应式原理
> Vue2主要是通过使用Object.definedProperty对数据进行检测，下面是该Api配置描述：
* enumerable 对象是枚举属性
* configuration 是否对象可以被改变
* value 对象值
* writable 是否可读取
* get/set 数据被依赖或者注入触发
>> 使用方式 Object.defineProperty(obj, "key",configuration));

## data响应式注意
> Object.prototype响应式数据一般作用于对象，但是对于数组的改变是监听不了的。所以Vue2是重写Array.prototype上的方法(pop、push、unshift、shift、concat、splice)
```js
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  // 一般都是对象属性进行响应式数据设置
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  // 监听数组每一项
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])// 递归处理
    }
  }
}
```

## Vue进行依赖收集和更新过程
```js
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 创建依赖
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  // 如果有子对象数据再一次进行监听
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 获取当前值
      const value = getter ? getter.call(obj) : val
      // 依赖添加
      if (Dep.target) {
        dep.depend()
        // 子项依赖
        if (childOb) {
          childOb.dep.depend()
          // 数组依赖处理
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```

## 依赖收集的作用
> 对watch数据改变并进行规划，注意调用依赖notify 执行 update()方法
```js
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {// 同步更新， 这里主要是调用updateCompoennt -> render -> vnode -> path
    this.run();
  } else {
    queueWatcher(this);// 执行异步watch数据队列，并运行watch.run清空当前执行队列
  }
};
```

## watch收集依赖、当触发watchs事件时调用watch回调
* watch有几种选项: 
```js
this.deep = !!options.deep // 深度监听
this.user = !!options.user // 用户自定义监听 $watch
this.computed = !!options.computed // computed  watch (有缓存，通过_dirty进行标示)
this.sync = !!options.sync // 异步监听
this.before = options.before // 之前监听
// 对于computed的watch单独处理
if (this.computed) {
  this.value = undefined
  this.dep = new Dep()
} else {
  // 调用get同时更新数据跟视图
  this.value = this.get() // 主要调用来 this.getter
}

// get之后下面对函数
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

## Vue对数据更新到Dom更新是一个异步过程，所以这里利用到jS运行任务的机制
* 将所有同步任务推送到执行Stack、在去执行任务队列里面到任务ƒ
* 任务又分为2类宏任务、微任务
1. 宏任务 setTimeout、setImdediate、、MessageChannel
2. 微任务: promise、async、generate、process.nextTick、 MutationObsever
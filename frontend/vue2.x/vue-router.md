## vue-router个人理解

* 路由初始化时会在install中全局混入mixins同时注册全局组件router-view、router-link以及将router跟route属性都挂载到Vue原型中
```js
Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this // this 只想Vue
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
  
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
```

### 路由的模式一般有hash、history、abstract(非浏览器环境下使用)

* hash模式
```js
window.addEventListener('hashchange', event)
// replace
window.location.replace(......)
// push 
window.location.hash = 'xxxx:/xx/#'
```


* history模式
```js
window.addEventListener('popstate', event)
// replace
window.location.replace(window.location.path + '...')
// push
```
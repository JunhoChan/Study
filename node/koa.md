## Koa
```js
const koa = require('koa')
const Router = require('koa-router')

const app = new koa()
const router = Router()

const callback = async(ctx, next) => {
  console.log("middleware start")
  await next()
  console.log("middleware end")
}
app.use(callback)
router.get('/api/test', async(ctx, next) => {
  console.log("request it")
  ctx.body = "test" // ctx.send()
})
app.use(router.routes())
app.listen(3000)
console.log("server lisntening at port 3000")
```

## koa中间件处理利用闭包以及递归处理中间件
```js
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

## koa跟express不同
|  | Koa | express |
| :-----| ----: | :----: |
| init| const app = new koa() | const app = express() |
| 路由初始化 | const router = Router() | const router = express.Router() |
| 路由中间件挂载 | app.use(router.routes) | app.use('/', router) |

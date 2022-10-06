/**
 * 实现bind apply call
 */

 Function.prototype.myCall = (ctx, ...rest) => {
  ctx = [null, undefined].includes(ctx) ? window : Object(ctx)// 绑定到
  const symbolFlag = Symbol(new Date().getTime())
  ctx[symbolFlag] = this
  const result = ctx[symbolFlag](...rest)
  delete ctx[symbolFlag]
  return result
}

Function.prototype.myApply = (ctx, rest) => {
  ctx = [undefined, null].includes(ctx) ? window : Object(ctx)
  const symbolType = Symbol(new Date().getTime())
  ctx[symbolType] = this
  const result = ctx[symbolType](...rest)
  delete ctx[symbolType]
  return result
}

Function.prototype.myBind = function (context, ...args) {
  const fn = this
  args = args ? args : []
  return function newFn(...newFnArgs) {
      if (this instanceof newFn) {
          return new fn(...args, ...newFnArgs)
      }
      return fn.apply(context, [...args,...newFnArgs])
  }
}
/**
 * 实现bind apply call
 */

 Function.prototype.myCall = (ctx) => {
   ctx = ctx || window
   const params = [...arguments].slice(1)
   ctx.fn = this
   return ctx.fn(...params)
 }

 Function.prototype.myApply = (ctx) => {
   ctx = ctx || window
   const params = [...arguments].slice(1)
   ctx.fn = this
   return ctx.fn(params)
 }

 Function.prototype.myBind = (ctx) => {
  const fn = this
   return () => fn.apply(ctx, arguments)
 }
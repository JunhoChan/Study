// const b = function () {
// }
// b.prototype.test = function () {
//   console.log(666)
// }

// function newTest(c) {
//   // new 发生了什么
//   const newObj = Object.create(c.prototype)
//   b.call(newObj)// 改变上下文环境
//   return newObj
// }
// 寄生式继承

// const a = newTest(b)
// console.log(a)
// a.test()
// __proto__ 一般是存储原型指向对象的地址
// 原型对象 prototype
// function foo() {}
// // 函数的原型对象是没有在原型链中
// foo.prototype.y = 10;
// foo.prototype.test = function () { console.log(222) }
// console.log(foo.y);
// foo.test()

const obj = {}
// 检查可枚举数据类型
console.log(obj.hasOwnProperty('__proto__')) // 但是obj.__proto__已经指向内部的Object.prototype,所以在浏览器打印是有的
console.log(obj.hasOwnProperty('prototype'))
console.log(obj.__proto__)

const funA = function () {}
console.log(funA.hasOwnProperty('prototype'))

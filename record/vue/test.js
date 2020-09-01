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

// const obj = {}
// // 检查可枚举数据类型
// console.log(obj.hasOwnProperty('__proto__')) // 但是obj.__proto__已经指向内部的Object.prototype,所以在浏览器打印是有的
// console.log(obj.hasOwnProperty('prototype'))
// console.log(obj.__proto__)

// const funA = function () {}
// console.log(funA.hasOwnProperty('prototype'))


// 柯里化函数返回预编译的函数
// function a(s) {
//   return function(y) {
//     return s + y; 
//   }
// }

// console.log(a(1)(2))

// add(1, 2, 3)(4)       
// add(1)(2)(3)(4)(5) 

function add() {
  const params = Array.prototype.slice.call(arguments) || []
  const _add = function () {
    params.push([...arguments])
    return _add
  }
  // 利用toString隐士转换
  _add.toString = function () {
    return params.reduce((pre, value) => {
      return pre * 1 + value * 1
    }, 0)
  }
  return _add
}

console.log(add(2,3)(2)(1).toString())
## 作用域
* 作用域在 JavaScript 中, 作用域为可访问变量，对象，函数的集合。
* 作用域一般作用于函数以及顶层变量中 内 -> 外(函数变量对象 ——》 全局变量对象)
* 全局执行环境、块级执行环境、函数执行环境、变量对象、环境栈、作用域链、摧毁执行环境

## 闭包
* 一个函数中包含另一个子函数，子函数内部使用外部函数的变量，使变量一直存储在环境中，不会被垃圾回收机制处理
* 应用场景： 防抖与节流
```js
type fnType = (ev?: Event) => void
const debounce = (delay: number, fn: fnType)=> {
  let timer
  return () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // timer = setTimeout(fn, delay)
    timer = setTimeout((ev: Event) => {
      fn.call(this, ev)
    }, delay) 
  }
}

// 节流
const throttle = (delay: number, fn: fnType) => {
  let isRun = false
  return () => {
    if (!isRun) {
      isRun = true
      setTimeout((ev: Event) => {
        fn.call(this, ev)
        isRun = false
      }, delay)
    }
  }
}
```

## 作用域及闭包综合使用
```js
const test = () => {
  let a = 2
  console.log(2) // 2
}
console.log(a) // Uncaught ReferenceError:

var a = [];
// var a = 10 // 遍历完成后
for (var i = 0; i < 10; i++) {
a[i] = function () {
  // 产生闭包，向作用域联上级取值，由于var i 是全局声明有效的，所以函数里面的i为10
  console.log(i);
};
}
a[6](); // 10


// var 变量提升
console.log(foo); // 输出undefined
var foo = 2;

// 暂时性死区 使用let命令声明变量之前，该变量都是不可用的。
var tmp = 111
tmp = 'test' // ReferenceError 暂时性死区
let tep

// const声明一个只读的常量。一旦声明，常量的值就不能改变
const name = "junho"
```

## 原型及原型链
* 每个函数都有一个prototype属性，这个属性指向函数的原型对象。
* Person(构造函数) -> prototype -> Person.prototype
```js
function Person() {}
var person = new Person();
person.__proto__ === Person.prototype // true
Person === Person.prototype.constructor
Object.getPrototypeOf(person) === Person.prototype
// 若没有找到属性就继续往上一级Person.prototype.__proto__找，当找到Object还没有找到对应的原型属性就为null
Object.prototype.__proto__ === null
```
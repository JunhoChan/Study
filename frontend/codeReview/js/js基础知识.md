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
  // 产生闭包，向作用域联上级取值，由于var z是全局声明有效的，所以函数里面的i为10
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

```js
// 创建Object对象
const obj = Object.create(null)
obj.__protp__ = xxx.prototype
xxx.call(obj)
return obj
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

## ajax创建
```js
try {
  let xmr = window.XMLHttpRequest ? new XMLHttpRequest() : new ObjectXActive('microsoft.XMLHTTP')
  if (!xml) {
    throw new Error('您的浏览器不兼容Ajax')
  }
  xml.open(MEthod, URL, false)
  xml.onReadyStateChange = () => {
    if (xml.readyState === 200 && xml.status === 4) {
      console.log(xml.responseText)
    } else {
      throw new Error(xml.responseText)
    }
  }
  xml.send(null) // 传body
} catch (e) {
  console.error(e.message)
}
```

## 图片转换成Base64
```js
const canvas = document.createElement('canvas')
canvas.width = 100
canvas.height = 100
ctx.drawImage(img, 0, 0, img.width, img.height)
var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase(); 
var dataURL = canvas.toDataURL("image/"+ext); 
return dataURL; 

document.getElementById('img').setAttribute( 'src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0 DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==' );<br>如下：<br><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0 DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==">

```

## 函数柯里化
```js
const mulAdd = function() {
  const _args = Array.prototype.slice.call(arguments)
  const _ADD = function() {
    const _add = function() {
      _args.push(...arguments)
      return _add
    }
    _add.toString = function() {
      return _args.reduce((a, b) => {
        return a + b
      }, 0)
    }
    return _add
  }
  return _ADD(..._args)
}
```

## 防抖
```js
const debounce = (callback, delay) => {
  let timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      callback && callback()
    }, delay)
  }
}
```

## 节流
```js
const throttle = (callback, delay) => {
  let isRuning = false
  return () => {
    if (!isRuning) {
      setTimeout(() => {
        callback && callback()
        isRuning = true
      }, delay)
    }
  }
}
```

## 实现ca
```js

```

function convertToTitle(n: number): string {
    let result: string = '';

    while (n > 0) {
        const offset: number = (n - 1) % 26;
        result = getUpperCase(offset) + result;
        n = Math.floor((n - 1) / 26);
    }

    return result;
};

function getUpperCase(num: number): string {
    return String.fromCharCode(num + 65);
}

作者：skypesky
链接：https://leetcode-cn.com/problems/excel-sheet-column-title/solution/168-excelbiao-lie-ming-cheng-by-skypesky-b6w2/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
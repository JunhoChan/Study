/**
 * @description es6类写法及继承方式的不用
 */

 class father {
   constructor (name) {
    //  console.log(arguments)
     this.name = name
   }
   getName() {
     console.log('my name is ' + this.name)
   }
 }

/**
 * ES6的继承
 */

 class son extends father {
   constructor (name) {
     super();
     this.name = name
     console.log(this)
   }
 }

 /**
  * ES5继承
  */

 const son = function () {}
 son.prototype = Object.create(father.prototype)
 son.prototype.constructor = son
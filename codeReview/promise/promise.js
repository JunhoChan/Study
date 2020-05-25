/***
 * @description 手动重写一个Promise
 * @param {Function} executor 执行器函数
 */


 // 说明 promise 状态一般有 pending resolved rejected
 // 内部函数有 resolve/reject

 function jPromise(executor) {
   const _this = this; // 缓存当前指向
   _this.status = 'pending'; // 默认转换状态
   _this.successValue = undefined; // 正确回调时出现的值
   _this.errorValue = undefined; // 错误回调时的值

   _this.onResolvedCallbacks = []; // 存储成功的回调函数
   _this.onRejectedCallbacks = []; // 存储失败的回调函数

  // 处理正确回调值的函数
   function resolve(value) {
     // 只有状态为pending 才能转换为 resolved 或 rejected
    if (_this.status === 'pending') {
      _this.status = 'resolved';
      _this.successValue = value;
      _this.onResolvedCallbacks.forEach(function(fn){ // 当成功的函数被调用时，之前缓存的回调函数会被一一调用
        fn();
      });
    }
   }
   // 处理错误回调值的函数
   function reject(value) {
     if (_this.status === 'pending') {
       _this.status = 'rejected';
       _this.errorValue = value;
       console.log(_this.onRejectedCallbacks);
       _this.onRejectedCallbacks.forEach(function(fn){// 当失败的函数被调用时，之前缓存的回调函数会被一一调用
        fn();
      });
     }
   }

   try {
    executor(resolve, reject);
   } catch (e) {
     reject(e);
   }
 }

 jPromise.prototype.then = function(onFulfilled, onRejected) {
  const _this = this; // 缓存当前指向

  /**
   * @description 重新创建新的Promise并返回该Promise
   * @param {String}} status 
   * @param {*} value 
   * @param {*} errorValue 
   */
  function newJPromise(status, value, errorValue) {
    return new jPromise((resolve, reject) => {
      let x;
      switch(status) {
        case 'resolved': 
          _this.onResolvedCallbacks.push(function(){
            x = onFulfilled(value);
            resolve(x);
          });
          break;
        case 'rejected':
          console.log('测试');
          _this.onRejectedCallbacks.push(function(){
            x = onRejected(errorValue);
            reject(x);
          });
          break;
        default: 
          // 每次Promise的状态是pending时将回调函数存储进对应位置
          // 这样做的目的是为了先将Promise实例时先将异步任务队列的数据缓存起来
          // 等待执行对应的resolve/reject时在执行对应数据
          _this.onResolvedCallbacks.push(function(){ // 这里用一个函数包起来，是为了后面加入新的逻辑进去
            onFulfilled(value)
          });
          _this.onRejectedCallbacks.push(function(){
            onRjected(errorValue)
          });
          break;
      }
    });
  }

  switch (_this.status) {
    case 'resolved':
      return newJPromise(_this.status, _this.successValue);
    case 'rejected':
      return newJPromise(_this.status, '',_this.errorValue);
    default:
      return newJPromise(_this.status,  _this.successValue, _this.errorValue);
  }
 }

 module.exports = jPromise;

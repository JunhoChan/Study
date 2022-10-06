/***
 * @description 手动重写一个Promise
 * @param {Function} executor 执行器函数
 */


 // 说明 promise 状态一般有 pending fulfilled rejected
 // 内部函数有 resolve/reject resolve将 pending 转化为fulfilled reject => rejected

 class junhoPromise {
   constructor(executor) {
     this.value = undefined;
     this.reason = undefined; 
     this.state = 'pending';
     
     // 存储异步任务
    this.resolveCallbacks = []
    this.rejectedCallbaks = []

     const resolve = (value) => {
       if (this.state = 'pending') {
         this.state = 'fulfilled'
         this.value = value
         this.resolveCallbacks.forEach(fn => fn())
       }
     }

     const reject = (value) => {
       if (this.state = 'pending') {
        this.state = 'rejected'
        this.reason = value
        this.rejectedCallbaks.forEach(fn => fn())
       }
     }
     
     try {
      executor(resolve, reject);
     } catch(e) {
       console.log(e)
     }
   }

   then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
    const newPromise = new junhoPromise((resolve, reject) => {
      if (this.state === 'fulfilld') {
        this.resolveCallbacks.push(() => {
          try {
            const result = onFulfilled(this.value)
            resolvePromise(newPromise, result, resolve, reject)
           } catch (err) {
             reject(err)
           }
        });
       } else if (this.state === 'rejected') {
        this.rejectedCallbaks.push(() => {
          try {
           const result = onRejected(this.reason)
           resolvePromise(newPromise, result, resolve, reject)
          } catch (err) {
            reject(err)
          }
        });
       } else {
         // 此时为pending状态
         this.resolveCallbacks.push(() => {
            try {
              const result = onFulfilled(this.value)
              resolvePromise(newPromise, result, resolve, reject)
             } catch (err) {
               reject(err)
             }
          });
         this.rejectedCallbaks.push(() => {
           try {
            const result = onRejected(this.reason)
            resolvePromise(newPromise, result, resolve, reject)
           } catch (err) {
             reject(err)
           }
         });
       }
     });
     return newPromise;
   }
 }
 
 // 将函数转换为符合Promise规范
 // 防止重复调用
 // 传入如果是promise继续解析
 // 有传入对象里面携带then时会处理操作并防止重复调用
 function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error('拒绝循环引用数据');
  }
  if (x instanceof junhoPromise) {
    if (x.state === 'pending') {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x && (typeof x === 'function' || typeof x === 'object')) {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

// 语法糖简化操作
junhoPromise.defer = junhoPromise.deferred = function () {
  let obj = {}
  new junhoPromise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  })
  return obj;
}

junhoPromise.resolve = function(value) {
  return new junhoPromise((resolve, reject) => {
    resolve(value)
  })
}

// 拓展方法
junhoPromise.reject = function(reason) {
  return new junhoPromise((resolve, reject) => {
    reject(reason)
  })
}

junhoPromise.catch = function(onReject) {
  return this.then(null, onReject)
}

junhoPromise.finally = function(callback) {
  return this.then(res => {
    junhoPromise.resolve(callback()).then(() => {
      return value;
    });
  },
    (err) => {
      return junhoPromise.resolve(callback()).then(() => {
          throw err;
    });
  });
}

// 待补充race跟all

 module.exports = junhoPromise;
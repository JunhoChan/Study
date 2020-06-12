let junhoPromise = require('./promise');

// const resolveTest = new JPromise(function(resolve, reject){
//   resolve('test success')
// })

const rejectTest = new junhoPromise(function(resolve, reject) {
  setTimeout(() => {
    reject('test fail');
  }, 1000);
})

console.log(typeof rejectTest === 'function', typeof rejectTest === 'object');
console.log(rejectTest);

const rejectThen = rejectTest.then(res => {
  console.log(6666);
}, reject => {
  console.log(222);
});
console.log(rejectThen);
// resolveTest.then(function(data){
//   console.log('成功', data)
// },function(err){
//   console.log('失败', err)
// }).then(res => {
//  console.log(res);
// });

// rejectTest.then(data => {
//   console.log('成功', data);
// }, err => {
//   console.log('失败', err);
// })
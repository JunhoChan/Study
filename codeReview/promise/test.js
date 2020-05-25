let JPromise = require('./promise');

// const resolveTest = new JPromise(function(resolve, reject){
//   resolve('test success')
// })

const rejectTest = new JPromise(function(resolve, reject){
  reject('test fail')
})

// resolveTest.then(function(data){
//   console.log('成功', data)
// },function(err){
//   console.log('失败', err)
// }).then(res => {
//  console.log(res);
// });

rejectTest.then(data => {
  console.log('成功', data);
}, err => {
  console.log('失败', err);
})
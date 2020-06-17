const obj = {
  name: 'app',
  age: '18',
  a: {
      b: 1,
      c: 2,
  },
}
const p = new Proxy(obj, {
  get(target, propKey, receiver) {
      return Reflect.get(target, propKey, receiver);
  },
  set(target, propKey, value, receiver) {
      Reflect.set(target, propKey, value, receiver);
  }
});
p.age = '20';
console.log(p)

let obj2 = {
  name:"chen"
}

let result= Reflect.set(obj2, 'name', 'shi')
console.log(result) //true
console.log(Reflect.set(obj2, 'name'))
console.log(Reflect.get(obj2, 'name'))

console.log(Reflect.set(obj2, 'name', 'junho'))
console.log(Reflect.get(obj2, 'name'))

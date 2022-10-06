const a = new Set([{a: 1}, {a: 1}])
console.log(Array.from(a))

const b = {a: 1}
const c = b
console.log(new Set([b, c]))

const d = new Map()
d.set('a', 2)
d.set('b', 3)
console.log(d)
console.log(d.get('a'))

// Proxy是拦截对象，对对象进行一个"拦截"
const p1 = new Proxy({}, {
  get(target, propKey, value) {
      return 'Hello, you are handsome';
  }
});

console.log(p1.s);

const p2 = new Proxy({}, {
  get(target, propKey, value) {
      if (propKey === 'name') throw new Error(`you can't modify it`);
      return value
  },
  set(target, propKey, value) {
    console.log(target, propKey, value)
    target[propKey] = value
  }
});

p2.a = 1;
console.log(p2)
// console.log(p2.name)

Reflect.set(target, propKey, value, receiver);
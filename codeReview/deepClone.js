function deepClone(value) {
  const complexDataTypes = ['object', 'function'];
  if (complexDataTypes.includes(typeof value)) {
    let cacheData = undefined;
    switch(Object.prototype.toString.call(value).replace(/(^\[object )|(]$)/g, '')) {
      case 'Date': cacheData = new Date(value.valueOf()); break;
      case 'RegExp': cacheData = new RegExp(value.valueOf()); break;
      case 'Array':
        cacheData = []
        value.forEach((val, index) => {
          cacheData[index] = deepClone(val)
        });
        break;
      case 'Object':
        cacheData = {}
        for(let i in value) {
          cacheData[i] = deepClone(value[i])
        }
        break;
      default: 
        cacheData = value;
        break;
    }
    return cacheData;
  } else {
    return value;
  }
}

deepClone(new Date())
console.log(deepClone(new RegExp()))
const a = deepClone([2, {3: 2, cc: new RegExp()}, [2, 4, 5, new Date('2020-06-12T07:51:38.123Z')]])
console.log(a)

const b = deepClone(222)
console.log(b)

const c = deepClone(new Date('2020-06-12T07:51:38.123Z'))
console.log(c)

const num = deepClone(new Number(1))
console.log(num)
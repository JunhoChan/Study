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

// deepClone(new Date())
// console.log(deepClone(new RegExp()))
// const a = deepClone([2, {3: 2, cc: new RegExp()}, [2, 4, 5, new Date('2020-06-12T07:51:38.123Z')]])
// console.log(a)

// const b = deepClone(222)
// console.log(b)

// const c = deepClone(new Date('2020-06-12T07:51:38.123Z'))
// console.log(c)

// const num = deepClone(new Number(1))
// console.log(num)


// const _toString = Object.prototype.toString
// function getType(obj) {
//   return _toString.call(obj).slice(8, -1)
// }

const handleBFSQuaee = (result, mapObject) => {
  const mapArr = Object.keys(mapObject) // {1: [], 2: {}} {"c"}
  console.log(mapObject)
  if (!mapArr.length) return result
  if (Array.isArray(result)) {
    mapArr.forEach(item => {
      result[item] = BFSClone(mapObject[item])
    })
  } else if (typeof result === "object") {
    mapArr.forEach(item => {
      result[item] = BFSClone(mapObject[item])
    })
  }
  return result
}

/**
 * BFS广度优先遍历 eval(`(${obj.toString()})`)
 */
function BFSClone(value) {
  // const complexs = ["Array", "Object"]
  if (typeof value === "object") {
    const mapObject = {}
    let result = null
    if (Array.isArray(value)) {
      if (!result) result = []
      value.forEach((item, index) => {
        if (typeof item !== "object") result[index] = item
        mapObject[index] = item
      })
      handleBFSQuaee(result, mapObject)
    } else {
      if (!result) result = {}
      Object.keys(value).forEach(key => {
        if (typeof value[key] !== "object") result[key] = value[key]
        mapObject[key] = value[key]
      })
      handleBFSQuaee(result, mapObject)
    }
    return result
  }
  
  return value
}
console.log("123")
let testData = [1, 3, 4, 5, 1, [2, 3], { b: 2 }]
let testData2 = BFSClone(testData)
let testData3 = {b: 2, c: 3, d: [2, 3]}
let testData4 = BFSClone(testData3)
console.log("结果: ")
console.log(testData2)
console.log(testData === testData2)
console.log(testData[5] === testData2[5])
console.log(testData4)
console.log(testData3 === testData4)
console.log(testData3.d === testData4.d)

/**
 * 常见数组操作方法
 */
 
 // 多为数组扁平化
 let arr1 = [[1, 2], [[1, 4, 6], [2, 4, 7], [2, [2, [6]]]]]
 const arr2 = arr1.flat(Infinity)
//  console.log(arr2.every(i => i ===1))
 Array.prototype.flatten = (n = 1) => {
    const arr = this
    let count = 0;
    if (n === Infinity) {
      while (arr.some(i => Array.isArray(i))) {
        arr = [].concat(...arr)
      } 
    } else {
      while (arr.some(i => Array.isArray(i))) {
        arr = [].concat(...arr)
        count++
        if (count === n) break;
      } 
    }
    return arr
 }
 console.log(arr1.flatten(1))
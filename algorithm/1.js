var twoSum = function(nums, target) {
  const storeArray = []
  if (!Array.isArray(nums)) return storeArray
  for (let i = 0; i < nums.length; i++) {
      const diffNum = target - nums[i]
      const matchIndex = nums.lastIndexOf(diffNum)
      if (matchIndex >= 0 && matchIndex !== i) {
          storeArray.push(i)
          storeArray.push(matchIndex)
          break
      }
  }
  return storeArray
}

console.log(twoSum([0,4,3,0], 0))
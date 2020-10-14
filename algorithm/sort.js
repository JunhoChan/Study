/**
 * 冒泡排序
 */
const bundleSort = function (nums) {
  if (!Array.isArray(nums) || nums.length <= 1) return nums;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        nums[i] = nums[j] + nums[i];
        nums[j] = nums[i] - nums[j];
        nums[i] = nums[i] - nums[j];
      }
    }
  }
  return nums;
}


/**
 * 选择排序
 */
const selectSort = function (nums) {
  if (!Array.isArray(nums) || nums.length <= 1) return nums;
  for (let i = 0; i < nums.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) minIndex = j;
    }
    nums[i] = nums[i] + nums[minIndex]
    nums[minIndex] = nums[i] - nums[minIndex]
    nums[i] = nums[i] - nums[minIndex]
  }
  return nums;
}

/**
 * @description 插入排序
 */
const insertSort = function (nums) {
  if (!Array.isArray(nums) || nums.length <= 1) return nums;
  // 默认第一个数据已经排序好了
  for (let i = 1; i < nums.length; i++) {
    const temp = nums[i];
    let j = i;
    while(j > 0 && nums[j - 1] >= temp) {
      nums[j] = nums[j - 1];
      j--;
    }
    nums[j] = temp;
  }
  return nums;
}
console.log(insertSort([1,2,1]))

/**
 * 快速排序
 */
const quickSort = function (nums, start, end) {
  if (!Array.isArray(nums) || nums.length <= 1) return nums;
  if (start >= end) return nums;
  const index = getIndex(nums, start, end);
  
  quickSort(nums, start, index - 1);
  quickSort(nums, index + 1, end);
}

/**
 * 获取最快下标开始的位置
 */
const getIndex = function (nums, low, high) {
   if (low >= high) return;
   const temp = nums[low];
   while(low < high) {
     while(low < high && nums[high] >= temp) {
       high--;
     }
     nums[low] = nums[high];
     while(low < high && nums[low] <= temp) {
       low++;
     }
     nums[high] = nums[low];
   }
   nums[low] = temp;
   return low;
}

const testArr = [2,3,1,4,1,2]
quickSort(testArr, 0, 5)
console.log(testArr)


/**
 * @description 归并排序 将数据细分为2 在合一整理
 */
const mergeSort = function(nums) {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const leftArray = nums.slice(0, mid);
  const rightArray = nums.slice(mid, nums.length);
  return merge(mergeSort(leftArray), mergeSort(rightArray));// 细度拆分
}

const merge = function (leftArray, rightArray) {
  const result = [];
  let r1 = 0;
  let l1 = 0;
  while(l1 < leftArray.length && r1 < rightArray.length) {
    if (leftArray[l1] > rightArray[r1]) {
      result.push(rightArray[r1]);
      r1++;
    } else {
      result.push(leftArray[l1]);
      l1++;
    }
  }
  
  // 将剩下没有排序的数据全部放入result
  while(r1 < rightArray.length) {
    result.push(rightArray[r1]);
    r1++;
  }
  while(l1 < leftArray.length) {
    result.push(leftArray[l1]);
    l1++;
  }
  return result;
}

const newResult = mergeSort(testArr);
console.log(newResult);


/**
 * 堆排序
 */
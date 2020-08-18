/**
 * @description 冒泡排序
 */
 const bunbleSort = function(nums) {
   for (let i = 0; i < nums.length; i++) {
     for (let j = i + 1; j < nums.length; j++) {
       if (nums[i] > nums[j]) {
         nums[j] = nums[i] + nums[j]
         nums[i] = nums[j] - nums[i]
         nums[j] = nums[j] - nums[i]
       }
     }
   }
   return nums;
 }

 console.log(bunbleSort([1,3,2,3,4,5]));

 /**
  * @description 快速排序
  * @param {Array} nums
  */
 const quickSort = function(nums) {
   if (!Array.isArray(nums) || nums.length < 2) return nums;
   let left = 0;
   let right = nums.length - 1;
   const temp = nums[0];
   while(left < right) {
     while(left < right && temp < nums[right]) {
       right--;
     }
     nums[right] = temp;
     while(left < right && temp > nums[right]) {
       left++;
     }
     nums[left] = nums[right];
   }
 }
//  console.log(quickSort([]))

/**
 * @description 无重复字符的最长子串
 * @param {String} s
 */
function lengthOfLongestSubstring(s) {
 let length = 0;
 let str = ''; // 存储不重复的字符串
 if (!s) return length;
 for (let item of s) {
   const sameStrIndex = str.indexOf(item);
   if (sameStrIndex > -1) {
     str = str.substr(sameStrIndex + 1) + item
   } else {
     str += item
   }
   length = length > str.length ? length : str.length;
 }
 console.log(length)
 return length
}

lengthOfLongestSubstring('junhoChan')

/**
 * @description  给定两个大小为 m 和 n 的正序 两个正序数组的中位数
 * @param {Array} nums1
 * @param {Array} nums2
 */
var findMedianSortedArrays = function(nums1, nums2) {
  if (Array.isArray(nums1) && Array.isArray(nums2)) {
    const collection = nums1.concat(nums2).sort((a, b) => a - b);
    const middleIndex = Number.parseInt(collection.length / 2);
    if (collection.length % 2 === 0) {
      return (collection[middleIndex] + collection[middleIndex - 1]) / 2;
    } else {
      return collection[middleIndex];
    }
  }
  return 0;
};

const a = findMedianSortedArrays([1, 3], [2]);
const b = findMedianSortedArrays([1, 2], [3, 4]);
console.log('中位数' + a + ',' + b);
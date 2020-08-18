/**
 * @description 最长回文子串 解法
 * @param {String} s
 */
const longestPalindrome1 = function(s) {
  if (!s || s.length < 2) return s;
  let result = '';
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length;j++) {
      const str = s.substr(i, j - i + 1);
      const reverseStr = str.split('').reverse().join('');
      if (reverseStr === str && str.length > result.length) {
        result = str;
      }
    }
  }
  return result;
};

console.log(longestPalindrome1('babad'));

/**
 * @description 中心拓展法
 * @param {String} s 匹配的字符串
 */
const longestPalindrome = function (s) {
  if (!s || s.length < 2)  return s;
  let result = '';
  // 获取最长的回文串
  function getLongPalidrome(str, left, right) {
    while (left >= 0 && right < s.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return str.substr(left + 1, right - (left + 1));
  }
  for (let i = 0; i < s.length; i++) {
    const str1 =  getLongPalidrome(s, i, i);// 获取奇偶中心
    const str2 = getLongPalidrome(s, i, i + 1);
    result = result.length > str1.length ? result : str1;
    result = result.length > str2.length ? result : str2;
  }
  return result;
}

console.log(longestPalindrome('at'))


/**
 * @description 动态规划解法
 * @param {String} s
 */

var longestPalindrome3 = function(s) {
  const len = s.length;
  const dp = Array.from(new Array(len),() => new Array(len).fill(false))
  let res = ''
  // 第一层倒着循环，才能保证 dp[i+1][j-1] 已经存在
  for(let i = len - 1; i >= 0; i--) {
      for(let j = i;j < len; j++) {
          // 判断i 和 j下标的字符串相等时
          //如果间隔小于等于2，则代表length为 3以内的子字符串，则一定是回文子串
          //如果间隔 大于2时，则需要判断 dp[i+1][j-1] 是否为回文子串
          dp[i][j] = s.charAt(i) === s.charAt(j) && (j - i <= 2 || dp[i+1][j-1])
          // 判断符合回文的最大子字符串
          if(dp[i][j] && j - i >= res.length){
              res = s.slice(i,j+1)
          }
      }
  }
  // console.log(dp)
  return res;
};

longestPalindrome3('babad')

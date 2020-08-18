
// 这题借鉴的
var addTwoNumbers = function(l1, l2) {
  let c = 0
 let r = new ListNode()// 结果
 let p = r
 let p1 = l1, p2 = l2
 while(p1||p2||c) {
     c += ((p1&&p1.val)||0)+((p2&&p2.val)||0) // 
     let node = new ListNode(c%10)
     p.next = node
     c = parseInt(c/10)
     p1 && (p1 = p1.next)
     p2 && (p2 = p2.next)
     p = p.next
 }
 return r.next
};

addTwoNumbers([2,4,3] , [5,6,4])

## http缓存
```js
// 浏览器缓存主要是 HTTP 协议定义的缓存机制。HTML meta 标签
<META HTTP-EQUIV="Pragma" CONTENT="no-store">
```

* 浏览器缓存分为强缓存和协商缓存(浏览器首先根据http头信息判断缓存方式)
1. 强缓存：首先查看本地缓存若没有失效直接加载、失效就请求发送到服务器获取最新资源进行缓存
  1.1 首先根据cache-control: max-age = N
  1.2 Exprires 与 date比较
  1.3 last-modified跟Date比较
2. 协商缓存: 首先请求服务端查看本地资源是否有效，无效则更新本地资源进行加载、有效则浏览器直接获取本地资源
  2.1 根据Last-Modify跟IF-Modify-Since或
  2.2 Etag/if-none-match
如果名字缓存返回304

### cache-control重要属性
1. max-age 设置缓存时间
2. public 表明响应可以被任何对象（发送请求的客户端、代理服务器等等）缓存。
3. private 表明响应只能被单个用户（可能是操作系统用户、浏览器用户）缓存，是非共享的，不能被代理服务器缓存。
4. no-cache 强制所有缓存了该响应的用户，在使用已缓存的数据前，发送带验证器的请求到服务器。不是字面意思上的不缓存。
5. no-store 禁止缓存，每次请求都要向服务器重新获取数据。
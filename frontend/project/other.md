# 唤醒APP方案
1. Onelink唤端方案（对接客户端）[参考链接](https://dev.appsflyer.com/hc/docs/unified-deep-linking-udl-1)
2. scheme唤醒
3. action操作

# 离线资源
> 有一个困扰 web 用户多年的难题——丢失网络连接。即使是世界上最好的 web app，如果下载不了它，也是非常糟糕的体验。如今虽然已经有很多种技术去尝试着解决这一问题。而随着离线页面的出现，一些问题已经得到了解决。但是，最重要的问题是，仍然没有一个好的统筹机制对资源缓存和自定义的网络请求进行控制。(__AppCache__)

serivce workers使用 JavaScript 更加精细地控制 AppCache 的静默行为 [more](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)
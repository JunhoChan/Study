## Node时间循环
* nodejs是单线程的事件循环机制代码例子
```js
const peningTimers =[];
const pendingOSTasks=[];
cosnt pendingOperations=[];

1、初始化
myfile.runContent()

function shouldContinue(){ //是否继续
  1、检查setTimeOut、setInterval、setImmediate
  2、检查是否有监听端口等操作系统级别的任务
  3、检查是否有文件、网络等长期的操作
return peningTimers.length || pendingOSTasks.length || pendingOperations.length;
}

2、事件循环
while(shouldContinue()){
//1.观察peningTimers.length，是否调查setTimeOut、setInterval等函数
//2、观察pendingOSTasks.length   pendingOperations.length，并调用相关回调函数
//3.暂停、一直等到上面的某一个事件完成
//4、调用setImmediate等函数
//5、处理close事件
}

3、退出
```

## nodeJs多线程与单线程
* nodejs主线程触发事件的处理是单线程
* node多线程处理依赖libuv库的执行,llibuv默认开启4个线程size

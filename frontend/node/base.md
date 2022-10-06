## Node事件循环
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
while(shouldContinue()) {
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

* node多线程的作用: 减少用户等待的时间、避免服务堵塞，请求进入等待状态
```js
// cluster多线程处理
// 使用nodejs内置的cluster module可以让多个node实例同时运行，管理多个node实例。
```

## node多节点部署
* 可伸缩性的策略: 可克隆，分解（decomposing），拆分 
* 集群（cluster）模块可以被用来在多核 CPU 环境负载均衡
* 实现的方案: 
  1. 主进程监听一个端口，子进程不监听端口，主进程通过负载均衡技术分发请求到子进程
  ```
    集群（cluster）模块可以被用来在多核 CPU 环境负载均衡。基于子进程的 fork 方法并且主要允许我们根据 CPU 核数衍生很多次主应用进程。然后主进程将接管并且通过主进程与所有的子进程的交流实现负载均衡。
  ```
  例子： 
  ```js
  const http = require('http');
  const cluster = require('cluster');
  const instances = 2; // 启动进程数量

  if (cluster.isMaster) {
    for (let i = 0; i < instances; i++) { // 使用 cluster.fork 创建子进程
      cluster.fork();
    }
  } else {
    // 创建 http 服务，简单返回
    const server = http.createServer((req, res) => {
      res.write(`hello world, start with cluster ${process.pid}`);
      res.end();
    });

    // 启动服务
    server.listen(8000, () => {
      console.log('server start http://127.0.0.1:8000');
    });
    console.log(`Worker ${process.pid} started`);
  }
  ```
  | 疑问: 为什么子进程监听相同端口没有什么问题?<br>
    worker 进程：创建 server 实例。然后通过 send 方法，向 master 进程发送消息，让 master 进程也创建 server 实例，并在该端口上监听请求。当请求进来时，master 进程将请求转发给 worker 进程的 server 实例。(利用Socket)

 2. 主进程和子进程分别监听不同端口，通过主进程分发请求到子进程(主进程进行代理)

## node优雅关闭
```js
const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ ping: true }));

const server = app.listen(3000, () => console.log('Running…'));

setInterval(() => server.getConnections(
    (err, connections) => console.log(`${connections} connections currently open`)
), 1000);

// 优雅杀死的信号 SIGKILL rude
// kill 不加参数杀死进程 SIGKILL kill -9 xxx
process.on('SIGTERM', shutDown);
// ctrl + c 杀死进程
process.on('SIGINT', shutDown);

let connections = [];

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

```

## 内存泄漏
1. 对每个进程分配的运行内存，在32位系统中约为700MB，而在64位系统中约为1.4GB。
2. 创建对象、对象引用、Node.js程序本身等都需要内存空间，密集型运算，内存不能及时释放
3. 
解决方案： 
 a

## node性能监控
* CPU使用率
* 内存使用量
* 垃圾收集
* 面向用户的延迟
* 系统健康和停机时间


## 各种服务发布的区别
https://blog.csdn.net/QiuHaoqian/article/details/121733254


## 平滑

## node性能压测
> 

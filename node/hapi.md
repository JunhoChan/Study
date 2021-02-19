## hapi 启动例
```js
'use strict';
 
 const Hapi=require('hapi');
 
 // 创建一个服务监听8000端口
 const server=Hapi.server({
 host:'localhost',
 port:8000
    });
 
 // 添加路由
 server.route({
 method:'GET',
 path:'/hello',
 handler:function(request,h) {
 
 return'hello world';
        }
    });
 
 // 启动服务
 const start = async function() {
 try {
 await server.start();
       }
 catch (err) {
 console.log(err);
 process.exit(1);
        }
 
 console.log('Server running at:', server.info.uri);
    };
 start();

```

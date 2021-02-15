## express 挂载中间间的方式
* app.use
* app.use
* app.[HTTP Method]
* app.all
* app.param
* router.all
* router.use
* router.param
* router.[HTTP Method]

## 中间件初始化流程
```js
// layer实例是 handler跟path的映射
_router -> stack -> layer -> route -> stack -> layer
```

## router.use
```js
var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: false,
    end: false
  }, fn);
// 注意这个route字段设置为undefined
layer.route = undefined;
this.stack.push(layer);  
```

* 注意express next() 函数没有对于await 或者promise有任何处理，所以中间件存在异步函数的时候，因为整个next的设计原因，并不会等待异步函数



## 在线代码编辑
> 代码在线编辑预览工具，类型于`codepen`。

### 开发前的问题
1. 如何解决布局拖拽问题
2. 怎么支持多种语言的转换以及编译
3. 怎样能实时编译内容
4. iframe报错，父窗口如何拦截
5. 代码中的转义如何处理

### 如何解决布局拖拽问题
* 利用数组[30%,30%,30%], 每次先检测第一个容器的大小，后在递推后续容器大小
* 注意区分垂直｜水平方向容器
* 编辑器使用<b>codemirror</b>

### 怎样能实时预览以及编译
#### 如何预览
1. 利用iframe srcdoc属性（不支持IE）
```html
<iframe class="iframe" :srcdoc="srcdoc"></iframe>
```

2. 重写iframe内容
```js
iframeElement.contentWindow.document.write(srcdoc)
```
#### 如何实时编译
eventbus 通信 =》 改写内容


### iframe报错，如何进行拦截报错到父容器中
1. 拦截所有的console对象的报错，利用proxy属性重新改写属性
```js
['error', 'warn', 'log'].forEach((type) => {
  Object.definedProperty(console, type, {
    values: (...args) => {
      window.parent.postMessage({
        type: 'console',
        method,
        data: args
      })
    }
  })
})

```

### 代码中如何编译运行时代码
1.  引入对应处理语言的cdn 编译js, 代码中需要区别语言类型（react、vue3等）
2. 定义好所有类型cdn资源、然后都一一处理
3. 动态加入link、script标签的cdn资源(如何更优雅处理?)

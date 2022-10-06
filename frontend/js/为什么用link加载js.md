## 为什么用link加载js资源

```html
<!-- 非堵塞加载, 提前加载 -->
<link as=style href=/css/app.f60416c7.css rel=preload>
<!-- 非堵塞加载, 提前加载 -->
<link as=script href=/js/app.69189fdd.js rel=preload>
<!-- 等起其他资源加载后，在加载 -->
<script defer src='///' >
<!-- 异步加载 -->
<script async src="...">
```

## preload跟prefetch
* preload提前加载
* prefetch等资源空闲再加载

## link应用场景
1. link记载应用媒体
2. 字体提前加载
3. 动态加载，但不执行
4. 基于标记语言的异步加载
5. 响应式加载
```html
<link rel="preload" as="image" href="map.png" media="(max-width: 600px)">
```
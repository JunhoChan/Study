# webGL基础知识

## CPU 与 GPU 的区别
CPU 和 GPU 都属于处理单元，但是结构不同。形象来说，CPU 有点像大型的传输管道，等待处理的任务只能依次通过，所以 CPU 处理任务的速度取决于处理单个任务的时间。又由于 CPU 内部结构异常复杂，能够处理大量的数据和逻辑判断，所以处理一些大型任务是足够的。但是处理图像却不在行，因为处理图像的逻辑通常不复杂，但是由于一幅图像是有成千上万的像素点构成，每个像素的处理都是一个任务，如果由 CPU 处理，那简直就是大材小用。因此就需要用到 GPU。GPU 由大量的小型处理单元构成，处理能力没 CPU 强大，但胜在数量多，并且能够并行处理。

## 如何处理图形
在渲染过程中需要 CPU 和 GPU 之间的通力合作。CPU 如同进货的卡车不断地将要处理的数据丢给 GPU，GPU 工厂调动一个个如工人一般的计算单元对这些数据进行简单的处理，最后组装出产品——图像。

## 什么是WEbGL
WebGL 是一种 3D 绘图标准，它的本质是 JavaScript 操作 OpenGL 接口，所以 WebGL 是在 OpenGL 的基础上做了一层封装，底层本质还是 OpenGL。利用 WebGL 可以根据你的代码绘制出点、线和三角形。任何复杂的场景都可以组合使用点、线和三角形实现。WebGL 运行在 GPU 中，因此需要使用能够在 GPU 上运行的程序。这样的程序需要成对提供，每对方法中都包含一个顶点着色器和一个片断着色器，并且使用 GLSL 语言（GL 着色语言）编写。每对组合起来称作一个 program（着色程序）（点 -> 线 -> 面）
Number.EPSILON

## 参考链接
* [webGL Api](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)
* [基础知识](https://mp.weixin.qq.com/s?__biz=MjM5ODAxNTM2NA==&mid=2659671344&idx=1&sn=c5374abeed6a4108dac45698e91e4dd9&chksm=bda2c5db8ad54ccd53266326d90c8191eff83dd15b5200658d5951b83fc3a058e1c3a0783cea&scene=21#wechat_redirect)
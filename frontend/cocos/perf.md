# 常见问题

## 监控指标
- Drawcall
  drawcall是对底层图形绘制接口的调用命令GPU进行图形渲染。CPU向GPU发送渲染命令，GPU接受并进行相应的渲染命令。
  drawcall是衡量游戏性能的一个重要指标，它影响绘制的主要原因是每次渲染时都需要调用drawcall，而每个drawcall都需要做很多准备工作，包括检测渲染状态、提交渲染数据、提交渲染状态等。GPU的渲染能力是很强大的，渲染300个和渲染3000个三角网格通常没什么区别，因此渲染速度的快慢往往取决于CPU提交命令的速度。
  
- FPS
      Frames per second：每秒钟填充图像的帧数。也可以理解为帧率，即每秒钟刷新页面的次数。游戏的fps一般是60，一般值越高代表页面越流畅细腻，但性能消耗会越高。

- 内存占用
- GPU占用
- CPU占用
- 电池温度(耗电速度)


## 优化方案

一、降低Drawcall策略
大量提交drawcall会造成CPU性能瓶颈，那么一个比较明显的优化想法就是把多个小的drawcall合并成一个大的drawcall，这就是批出来的思想，在这里被称为批渲染batch，实际操作中可以使用一下方式进行drawcall优化：
1. 将所有文本/精灵节点放置到同一个父节点下，并进行文本合批
2. 勿使用系统文字，容易打断合批
3. 利用AutoAtlas,减少多图渲染
4. 对于超出可视区域的文案/图集，都隐藏对应内容
5. 合理使用fontCache bitmap以及Char(会有乱码现象)，对文字进行合批处理

二、内存占用
1. 尽量少使用空间复杂度高的Set
2. 节点资源尽量不要存储在内存中，使用时再通过node.getChildByUuid(uuid)实时获取。
3. 合理利用缓存资源，如NodePool
4. 合理销毁无效资源节点及预制体

三、电池温度(耗电速度)
1. 优化减少Drawcall
2. 在不影响体验的情况下，合理降低FPS帧率
3. 场景资源按需加载，不可视范围可先透明化

四、其它优化

引擎裁剪
发布包中，cocos2d-js-min.js 这个文件是一定会被加载的，我们可以在模块设置中，去掉勾选没用到的引擎功能，从而减小打包体积
在模块设置的界面中，可以看到默认是全部打包的，上方提示 “未勾选的模块在 构建发布 的时候不会打包进入引擎文件，请不要将正在使用的功能模块去除，否则构建后的工程可能无法正常工作”
默认全量打包出来的引擎文件大小约 1.92M ，在去除掉 3D 以及 videoPlayer、webview 相关内容后，体积缩小了 10% ，可见在经过精细化调整后，可以减去一些体积

渲染顺序
渲染顺序会影响到 drawcall 的合并，对于 opaque 类型的物体，一般引擎都会进行排序，使相同材质的物体在同一批次渲染。但对于 transparent 类型的物体，为了保证显示，会严格按照在场景中从后往前的顺序进行渲染（和 cocos creator 中 node 的 zorder 有关）
如果相同材质 UI 之间存在其他材质的 UI，则批次合并会被打断
图 1 中， img1 和 img2 使用的材质来自同一图集，此时在渲染过程中会被合并为一个 drawcall
图 2 中，img1 和 img2 之间被插入了一个 label，批次合并被打断，于是产生了两个 drawcall

图 1
[图片]
图 2
[图片]
渲染顺序也可以通过 node 的 [zIndex](<https://docs.cocos.com/creator/api/zh/classes/Node.html#zindex>) 属性进行调整，在图 2 所示的情况下，我们可以通过以下代码调整渲染顺序，达到合并 drawcall 的目的：
onLoad() {
    this.sprite1.node.zIndex = 1;
    this.sprite2.node.zIndex = 1;
}
默认的 zIndex 为 0，拥有更高 zIndex 的节点将被排在后面，靠后渲染，如果两个节点的 zIndex 一致，先添加的节点会稳定排在另一个节点之前
需要注意的是，系统字体渲染时无法合并批次，尽量使用自定义打包的图集字体

包体大小压缩
打包出来的游戏文件可以通过压缩一个压缩提供给客户端内嵌或者在线加载，使用时再解压打开即可。
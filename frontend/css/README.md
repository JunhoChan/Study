# 常见Css方式

### position: sticky
> 吸顶布局

### direction: rtl;
> 文本布局方向(国际化翻译使用)

### 逻辑属性（Logical Properties）margin-inline-start: 20px;
> 根据排版方向的改变而改变
* [链接](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts)

### 后面背景玻璃态
backdrop-filter: blur(6px);

### aspect-ratio
> 指定图片的纵横比

### content-visibility: auto(提升渲染速度)
> 可视区域内渲染出来

### shape-outside: circle....
> 不规则文字环绕图形

### object-fit
> 元素自适应外部容器

### clip-path
> 剪裁元素形状

### mix-blend-mode: difference;
> 混合模式两张不同颜色的图片叠加时，中间重合的部分内容展示

### scroll-snap-type: x mandatory;
> CSS 滚动捕捉可以让用户完成滚动之后将视口锁定到某个元素的位置, 父元素scroll-snap-type( -webkit-overflow-scrolling: touch;)、子元素scroll-snap-align: start;

### pointer-events:none
> 针对鼠标事件, pointer-events: fill;

### 滚动时间线
```css
@scroll-timeline scroll-in-document-timeline {
  source: auto;
  orientation: vertical;
  scroll-offsets: 0%, 100%;
}
```

### 伪元素跟伪类区别
* 伪类是元素处于某种状态的补充, 比如: :hover :visiable :checked等[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)
* 伪元素是对于元素内容一种拓展[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)
```css
:first-line
:before
:after
```

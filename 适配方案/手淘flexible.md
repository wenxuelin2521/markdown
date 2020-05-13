# 手淘 h5 页面的终端适配方案（flexible）

- 视窗（视口）viewport
- 物理像素（设备像素）physical pixel
- 设备独立像素 density-independent pixel(dip)
- css 像素
- 屏幕密度：设备表面上存在的像素数量，通常以每英寸有多少像素来计算
- 设备像素比 device pixel ratio(dpr)：设备像素比 = 物理像素 / 设备独立像素
- css 单位 rem：rem 相对于根元素`html`的 font-size 来做计算

```html
<meta
  name="viewport"
  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
/>
<!-- 
    meta标签，有很多种，这里说的是viewport的meta标签，
    主要作用是告诉浏览器如何规范的渲染web页面
    属性设置：
    name="viewport"：设置视口属性，移动端一般都会设置上去，桌面端没有必要
    content 内容
        width=device-width ：设置页面宽度根设备一样宽
        user-scalable=no ：设置用户是否可以缩放，一般是禁止的
        initial-scale=1.0 ： 初始的缩放值，这个设置好了，后面两个可以不写
        maximun-scale=1.0 ： 最大缩放值
        minimun-scale=1.0 ： 最小缩放值

 -->
```

# lib-flexible

`lib-flexible`是一个 h5 适配方案的一个库
使用方法：

- 下载 lib-flexible(github 上可以找到)
- 在页面`head`标签中引入头部引入 js 文件，在所有资源加载之前执行这个 JS

```html
<script src="./flexible/build/flexible_css.debug.js"></script>
<script src="./flexible/build/flexible.debug.js"></script>
```

- JS执行之后，会给`html`标签添加一个`data-dpr`属性和`font-size`样式

- 把视觉稿中的px转换成rem
  + CSSREM插件
  + less\sass\postcss这样的处理器
  + PostCSS(px2rem)工具

- 文本字号不建议使用`rem`





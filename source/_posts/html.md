---
title: html
mathjax: true
date: 2022-08-31 15:57:22
tags: [前端,HTML]
categories:
description:
---

## src和href的区别

src和href都是**用来引用外部的资源**，它们的区别如下：

+ **src：** 表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src会将其指向的资源下载并应⽤到⽂档内，如请求js脚本。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该**资源加载**、**编译**、**执⾏完毕**，所以⼀般js脚本会放在页面底部。
+ **href：** 表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。 常用在a、link等标签上

## script标签中defer和async的区别

如果没有defer或async属性，浏览器会**立即加载并执行**相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载

**defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析**，其区别如下：

+ **执行顺序：** 多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行

+ **脚本是否并行执行：\**async属性，表示\**后续文档的加载和执行与js脚本的加载和执行是并行进行的**，即异步执行；defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本需要等到文档所有**元素解析完成之后才执行**，DOMContentLoaded事件触发执行之前


## img的srcset属性的作用

响应式页面中根据屏幕密度设置不同的照片时就会用到这个属性

```html
<img src="image-128.png" srcset="image-256.png 2x" />
```

使用上面的代码，就能实现在屏幕密度为1x的情况下加载image-128.png, 屏幕密度为2x时加载image-256.png。

按照上面的实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有1x,2x,3x,4x四种，如果每一个图片都设置4张图片，加载就会很慢。所以就有了新的srcset标准。代码如下：

```html
<img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px" />
```

## 行内元素、块级元素

行内元素有：`a` `b` `span` `img` `input` `select` `strong`

块级元素：`div` `ul` `ol` `li` `dl` `dt` `dd` `h1` `p`

## BFC

[BFC](https://juejin.cn/post/6950082193632788493)

`BFC` 全称：`Block Formatting Context`， 名为 **块级格式化上下文**

`W3C`官方解释为：`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局

触发条件：

+ 根元素或其它包含它的元素
+ 浮动 `float: left/right/inherit`
+ 绝对定位元素 `position: absolute/fixed`
+ `display: inline-block`、 `table-cell` `table-caption`、`flex/inline-flex`
+ 溢出元素 `overflow: hidden/scroll/auto/inherit`

布局规则：

+ 内部的Box会在垂直方向，一个接一个地放置。

+ Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

+ 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

+ BFC的区域不会与float box重叠。

+ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

+ 计算BFC的高度时，浮动元素也参与计算

### SVG

> SVG：SVG全称可缩放矢量图形Scalable Vector Graphics）是基于可扩展标记语言**XML**描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形

特点：

+ 不依赖分辨率
+ 支持时间处理器
+ 最适合有大型渲染区域的应用程序(比如谷歌地图)
+ 复杂度高会减慢渲染速度(任何过度使用DOM的应用都不快)
+ 不适合游戏应用

### Canvas

> Canvas：Canvas是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制

特点：

+ 依赖分辨率
+ 不支持事件处理器
+ 弱的文本渲染能力
+ 能够以.png或.jpg格式保存结果图像
+ 最适合图像密集型的游戏，其中的许多对象会频繁重绘

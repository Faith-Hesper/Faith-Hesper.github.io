---
title: CSS
mathjax: true
date: 2022-08-29 10:48:25
tags: [css,前端]
categories:
description: css
---

## CSS

### 盒模型

标准盒模型

+ content
+ padding
+ border
+ margin

> 标准盒模型的宽高为content的宽高

IE盒模型

> IE盒模型的宽高为content+padding+border的宽高

### BFC

> BFC: 块级格式化上下文。

BFC布局规则

+ BFC **内部的**子元素，在垂直方向，**边距会发生重叠**，即会相加
+ BFC在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然
+ **BFC区域不与旁边的`float box`区域重叠**。（可以用来清除浮动带来的影响）
+ 计算BFC的高度时，浮动的子元素也参与计算

BFC形成

+ overflow: 不为visible，可以让属性是 hidden、auto。【最常用】
+ 浮动中：float的属性值不为none。意思是，只要设置了浮动，当前元素就创建了BFC
+ 定位中：只要posiiton的值不是 static或者是relative即可，可以是`absolute`或`fixed`，也就生成了一个BFC
+ display为inline-block, table-cell, table-caption, flex, inline-flex

### 标准文档流

1. 空白折叠现象

   无论多少个空格、换行、tab，都会折叠为一个空格。

2. 高矮不齐，底边对齐

3. 自动换行，一行写不满，换行写

#### 行内元素和块级元素

**行内元素：**

+ **只占据内容的一部分**
+ 与其他行内元素并排
+ 不能设置宽、高。默认的宽度，就是文字的宽度。

```css
display:inline;
```

**块级元素：**

+ **占据一整行**

+ 霸占一行，不能与其他任何元素并列
+ 能接受宽、高。如果不设置宽度，那么宽度将默认变为父亲的100%。

```css
display:block;
```

css中一共有三种手段，使一个元素脱离标准文档流：

+ （1）浮动
+ （2）绝对定位
+ （3）固定定位

### CSS的继承性和层叠性

#### 继承性

> 继承性：有一些属性，当给自己设置的时候，自己的后代都继承上了

具有继承性的属性：

+ 字体系列：`font`、`font-family`、`font-weight`、`font-size`、`font-style`
+ 文本系列：
  + 内联元素：`color`、`line-height`、`word-spacing`、`letter-spacing`、`text-transform`
  + 块级元素：`text-indent`、`text-align`
+ 元素可见性：`visibility`
+ 表格布局属性：`border-collapse`、`border-spacing`、`empty-cells`、`table-layout`、`caption-side`
+ 列表布局属性：`list-style`

#### 层叠性

> **层叠性：就是css处理冲突的能力**

权重：`!important`>`行内样式`>`ID选择器`>`类选择器`>`标签选择器`>`通配符(*)`>`继承`>`浏览器默认属性`

权重计算表格

| 选择器               | 选择器权重 |
| -------------------- | ---------- |
| 继承或*              | 0,0,0,0    |
| 标签选择器           | 0,0,0,1    |
| 类选择器、伪类选择器 | 0,0,1,0    |
| ID选择器             | 0,1,0,0    |
| 行内样式(style)      | 1,0,0,0    |
| !important           | ∞无穷大    |

优先级注意点

1. 权重是由四组数字组成，但是**不会进位**
2. 可以理解为`类选择`永远大于`标签选择器`，`id选择器`永远大于`类选择器`
3. **就近原则**，优先级相同则取书写顺序靠后的那个

### px、em、rem的区别

`px`：固定像素

`em`：相对于其父元素`font-size`来设置字体大小

`rem`：相对于根元素的`font-size`大小

使用场景：

+ 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用px即可
+ 对于需要适配各种移动设备，实现[响应式布局](#reactive-layout)，使用rem，例如需要适配iPhone和iPad等分辨率差别比较挺大的设备

### display的属性值及其作用

| 属性值       | 作用                                                     |
| ------------ | -------------------------------------------------------- |
| none         | 元素不显示，并且会从文档流中移除                         |
| block        | 块级型。默认宽度为父元素宽度，可设置宽高，换行显示       |
| inline       | 行内元素类型。默认宽高为内容宽度，不可设置宽高，同行显示 |
| inline-block | 默认宽度为内容宽度，可以设置宽高，同行显示               |
| table        | 此元素会作为块级表格来显示                               |
| inherit      | 规定应该从父元素继承display属性的值                      |
| list-item    | 像块类型元素一样显示，并添加样式列表标记                 |



### 定位属性

> 默认文档流中，在一个父容器里放置多个块级的子元素，那么，这些子元素会默认从上往下排列。

position属性值：

| 属性值   | 概述                                                         |
| -------- | ------------------------------------------------------------ |
| absolute | 绝对定位，相对于static定位以外的一个父元素进行定位。元素的位置通过left、top、right、bottom属性进行规定 |
| relative | 相对定位，相对于其原来的位置进行定位。元素的位置通过left、top、right、bottom属性进行规定 |
| fixed    | 固定定位，指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，⽐如回到顶部的按钮⼀般都是⽤此定位⽅式 |
| static   | 默认值，没有定位，元素出现在正常的文档流中，会忽略 top, bottom, left, right 或者 z-index 声明，块级元素从上往下纵向排布，⾏级元素从左向右排列 |
| inherit  | 规定从父元素继承position属性的值                             |

脱离文档流的属性：`absolute`、`fixed`

#### 相对定位

相对定位：让元素相对于自己原来的位置，进行位置调整

```css
.div{
    position: relative;
    left: 50px;
    top: 50px;
    width: 200px;
    height: 200px;
    border: 1px solid red;
}
```

![image-20220609202453294](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220609214047.png)

相对定位：不脱离文档流。不脱标，老家留坑，**别人不会把它的位置挤走**。

用途：

1. 微调元素
2. 做绝对定位的参考，子绝父相

#### 绝对定位

绝对定位：定义横纵坐标。原点在父容器的左上角或左下角。

**绝对定位的盒子脱离了标准文档流。**

所以，所有的标准文档流的性质，绝对定位之后都不遵守了。

绝对定位之后，标签就不区分所谓的行内元素、块级元素了，不需要`display:block`就可以设置宽、高了。

1. 子绝父相

子元素为绝对定位，父元素为相对定位。通常用于实现压盖效果。

要听最近的已经定位的祖先元素的，不一定是父亲，可能是爷爷。

不一定是相对定位，任何定位，都可以作为儿子的参考点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		.box{
			margin: 100px;
			width: 308px;
			height: 307px;
			border: 1px solid #FF7E00;
			position: relative;  /*子绝父相*/

		}
		.box .image img{
			width: 308px;
			height: 196px;
		}
		.box .dtc{
			display: block;  /*转为块级元素，才能设置span的宽高*/
			width: 52px;
			height: 28px;
			background-image: url(http://img.smyhvae.com/20180116_1115.png);
			background-position: -108px 0px; /*这里用到了精灵图*/
			position: absolute;  /*采用绝对定位的方式，将精灵图盖在最上层*/
			top: -9px;
			left: 13px;
		}
		.box h4{
			background-color: black;
			color: white;
			width:308px;
			height: 40px;
			line-height: 40px;
			position: absolute;
			top: 156px;
		}
	</style>
</head>
<body>
	<div class="box">
		<span class="dtc"></span>
		<div class="image">
			<img src="http://img.smyhvae.com/20180116_1116.jpg" alt="">
		</div>
		<h4>广东深圳宝安区建安一路海雅缤纷城4楼</h4>
	</div>
</body>
</html>
```

![image-20220609204650705](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220609214102.png)

#### 固定定位

固定定位：就是相对浏览器窗口进行定位。无论页面如何滚动，这个盒子显示的位置不变。

**用途1**：网页右下角的“返回到顶部”

```css
.backtop{
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: gray;
    text-align: center;
    line-height:30px;
    color:white;
    text-decoration: none;   /*去掉超链接的下划线*/
}
```

**用途2：**顶部导航条

#### 粘性定位

粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;**，它会固定在目标位置。元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同

### flex布局

1. **flex 布局的子元素不会脱离文档流**，很好地遵从了“流的特性”。

但你如果用 float 来做布局，float 属性的元素会脱离文档流，而且会涉及到各种 BFC、清除浮动的问题。浮动相关的问题，比较麻烦，所以也成了面试必问的经典题目。但有了 flex 布局之后，这些问题都不存在的。

2. **flex 是一种现代的布局方式，是 W3C 第一次提供真正用于布局的 CSS 规范**。 flex 非常提供了丰富的属性，非常灵活，让布局的实现更佳多样化，且方便易用。

flex 唯一的缺点就在于，它不支持低版本的 IE 浏览器。

+ **弹性盒子**：指的是使用 `display:flex` 或 `display:inline-flex` 声明的**父容器**。
+ **子元素/弹性元素**：指的是父容器里面的子元素们（父容器被声明为 flex 盒子的情况下）。
+ 主轴：flex容器的主轴，默认是水平方向，从左向右。
+ 侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向，从上往下。

#### flex

flex：定义子项目分配剩余空间

```css
.div{
    flex: 1;
}
```

#### flex-wrap

`flex-wrap`：控制子元素溢出时的换行处理。

flex-wrap: wrap 换行

#### flex-direction

设置主轴排列方向 默认从左到右排列

| 属性值         | 描述                             |
| :------------- | :------------------------------- |
| row            | 从左到右水平排列子元素（默认值） |
| column         | 从上到下垂直排列子元素           |
| row-reverse    | 从右向左排列子元素               |
| column-reverse | 从下到上垂直排列子元素           |

#### justify-content

`justify-content`：控制子元素在主轴上的排列方式。 默认为水平方向

+ `flex-start` 从主轴的起点对齐（默认值）
+ `flex-end` 从主轴的终点对齐
+ `center` 居中对齐
+ `space-around` 在父盒子里平分
+ `space-between` 两端对齐 平分

#### align-items

`align-items`：设置子元素在**侧轴上的对齐方式**。 默认为垂直方向 **单行情况**

+ `flex-start` 从侧轴开始的方向对齐 
+ `flex-end` 从侧轴结束的方向对齐 
+ `baseline` 基线 默认同flex-start 
+ `center` 中间对齐 
+ `stretch` 拉伸

#### aligin-content

`aligin-content`：设置子元素在**侧轴上的对齐方式**。 默认为垂直方向 **只适用于多行**

+ `flex-start` 从侧轴开始的方向对齐 
+ `flex-end` 从侧轴结束的方向对齐 
+ `baseline` 基线 默认同flex-start 
+ `center` 中间对齐 
+ `stretch` 拉伸

#### flex

 `flex`属性：设置子盒子的权重

### 水平垂直居中

#### 行内元素

父容器设置

```css
.father{
    /*水平居中*/
    text-align:center;
    /*垂直居中*/
    line-height:center;
}
```

#### 块级元素

1.绝对定位 + margin（需要指定子元素的宽高，不推荐）

```css
.father{
    position: relative;
    background: pink;
}
.son {
    position: absolute;
    width: 200px;
    height: 100px;
    background: red;
    top: 50%;
    left: 50%;
    margin-top: -50px; /*高的一半*/
    margin-left: -100px; /*宽的一半*/
}
```

2. 绝对定位 + translate（无需指定子元素的宽高，推荐）

```css
.father{
    position: relative;
    background: pink;
}
.son {
    position: absolute;
    background: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

这种写法，在没有指定子元素宽高的情况下，也能让其在父容器中垂直居中。因为 translate() 函数中使用百分比值时，是以这个元素自身的宽度和高度为基准进行换算和移动的（**动态计算宽高**）.

3. flex布局（待改进）

```css
.father{
    display: flex;
    justify-content: center;
    align-items: center;
    background: pink;
}
.son {
    background: red;
}
```

父容器里的所有子元素们都垂直居中了

4. flex 布局 + margin: auto（推荐）

```css
.father{
    display: flex;
    background: pink;
}
.son {
    margin: auto;
    background: red;
}
```

当我们给父容器使用 Flex 布局 时，子元素的`margin: auto`不仅能让其在水平方向上居中，**垂直方向上也是居中的**。

### 常规布局

#### 单栏布局

实现：`max-width: 400px;`

```html
<div class="header"></div>
<div class="content"></div>
<div class="footer"></div>

.header {
    max-width: 180px;
    margin: 10px auto;
    height: 30px;
    background: lawngreen;
}
.content {
    max-width: 180px;
    height: 180px;
    margin: 20px auto;
    background: indianred;
}
.footer {
    margin: 10px auto;
    height: 30px;
    max-width: 180px;
    background: blue;
}
```



#### 两栏布局 (一栏固定 + 一栏自适应布局)

1. 利用浮动，左边元素设置左浮动、固定宽度，右边元素设置`margin-left`为固定宽度，`width: auto;`

```css
.container{
	height: 200px;
}
.left{
    float: left;
    width: 200px;
    height: 100%;
}
.right{
    margin-left: 200px;
    height: 100%;
}
```

2. 同样利用浮动，左边元素设置左浮动、固定宽度，右边元素设置`overflow: hidden`为固定宽度

```css
.right{
    overflow: hidden;
    height: 100%;
}
```

3. 利用`flex`布局，左边元素固定宽度，右边的元素设置 `flex: 1`

```css
.container{
    display: flex;
	height: 200px;
}
.right{
    flex: 1;
}
```

#### 圣杯布局和双飞翼布局 (三栏布局)

特点：两侧内容固定，中间内容随着宽度自适应

实现：

+ `float`布局
+ 两侧使用`margin`负值，以便和中间内容横向重叠
+ 防止中间内容两侧覆盖，圣杯布局用`padding`，双飞翼布局用`margin`

##### 圣杯布局

```html
<div class="container">
  <div class="center">我是中间</div>
  <div class="left">我是左边</div>
  <div class="right">我是右边</div>
</div>

.container{
	padding-left: 200px;
  	padding-right: 200px;
  	overflow: auto;
}
.center{ 
	float: left;
	width: 100%;
}
.left{
	float: left;
	width: 200px;
	position: relative;
	left: -200px;
	margin-left: -100%;
}
.right{ 
	float: left;
	width: 200px;
	position: relative;
	margin-right: -200px;
}
```

##### 双飞翼布局

```html
<div class="container">
    <div class="center">
      <div class="inner">双飞翼布局</div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
 </div>

.center{
	width: 100%;
}
.inner{
	margin: 0 200px;
}
```

### 响应式布局

[响应式布局](https://juejin.cn/post/6844903814332432397)

### element-ui

1. 表头、单元格样式设置

```html
<el-table
  max-height="500"
  :cell-style="{ textAlign: 'center' }"
  :header-cell-style="{
    textAlign: 'center',
    background: '#E4EEF6',
    height: '21px',
  }"
  @row-click="enterpriseDetail"
  
  :data="tableInfo"
>
```


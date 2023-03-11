---
title: vue
date: 2022-02-28 17:18:13
tags: [前端,vue]
categories: vue
description:
---

## 基本命令

### vue CLI

```bash
# 创建项目
npm create project
# 本地运行
npm run serve
# 打包
npm build
```

webpack

```bash
# 初始化包文件
npm init
```

## vue2基础语法

### 指令

1. v-if

	```vue
	<template>
	<div>
		<div v-if="Math.random() > 0.5">
	  	Now you see me
		</div>
		<div v-else>
	 	 Now you don't
		</div>
	</div>
	</template>

2. v-for

	```vue
	<template>
	    <div>
	        <div v-for="(item, index) in items"></div>
	        <div v-for="(val, key) in object"></div>
			<div v-for="(val, name, index) in object"></div>
	    </div>
	</template>

2. v-on

   用于绑定和监听事件，

   + 缩写: @
   + 修饰符
     + `.stop` - 调用 `event.stopPropagation()`。
     + `.prevent` - 调用 `event.preventDefault()`。
     + `.capture` - 添加事件侦听器时使用 capture 模式。
     + `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
     + `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
     + `.native` - 监听组件根元素的原生事件。
     + `.once` - 只触发一次回调。
     + `.left` - (2.2.0) 只当点击鼠标左键时触发。
     + `.right` - (2.2.0) 只当点击鼠标右键时触发。
     + `.middle` - (2.2.0) 只当点击鼠标中键时触发。
     + `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

   ```vue
   <!-- 内联语句 $event为事件原型-->
   <button v-on:click="doThat('hello', $event)"></button>
   <!-- 动态事件缩写 (2.6.0+) -->
   <button @[event]="doThis"></button>
   <!-- 停止冒泡 -->
   <button @click.stop="doThis"></button>
   <!-- 阻止默认行为 -->
   <button @click.prevent="doThis"></button>
   ```

3. v-bind

   动态绑定属性值

   + 缩写为 :

   ```vue
   <!-- class 绑定 -->
   <div :class="{ red: isRed }"></div>
   <div :class="[classA, classB]"></div>
   <div :class="[classA, { classB: isB, classC: isC }]">
   
   <!-- style 绑定 -->
   <div :style="{ fontSize: size + 'px' }"></div>
   <div :style="[styleObjectA, styleObjectB]"></div>
   
   <!-- 绑定一个全是 attribute 的对象 -->
   <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
   ```

4. v-model

   表单数据双向绑定

   + **限制**：

     + `<input>`
     + `<select>`
     + `<textarea>`
     + components

     **修饰符**：

     + [`.lazy`](https://cn.vuejs.org/v2/guide/forms.html#lazy) - 取代 `input` 监听 `change` 事件
     + [`.number`](https://cn.vuejs.org/v2/guide/forms.html#number) - 输入字符串转为有效
     + [`.trim`](https://cn.vuejs.org/v2/guide/forms.html#trim) - 输入首尾空格过滤

   ```html
   <div id="example-4">
     <input type="radio" id="one" value="One" v-model="picked">
     <label for="one">One</label>
     <br>
     <input type="radio" id="two" value="Two" v-model="picked">
     <label for="two">Two</label>
     <br>
     <span>Picked: {{ picked }}</span>
   </div>
   ```

   ```js
   new Vue({
     el: '#example-4',
     data: {
       picked: ''
     }
   })
   ```

5. v-slot

  组件A中有如下代码

  ```vue
  <template>
  	<div>
          <p>
              xxxxx
      	</p>
          <Cov>
              这里的代码将插入到组件Cov中的<slot></slot>位置
      	</Cov>
      </div>
  </template>
  ```

  组件Cov中有如下代码🐎

  ```vue
  <template>
  	<div>
          <p>
              xxxxx
      	</p>
          <slot></slot>
      </div>
  </template>
  ```

6. 综合实例

   ```vue
   <template>
   <div>
   <tr v-for="(item, index) in riskArea"  :key="index" style="text-align: left;">
        <td style="background-color:#00bec9;"><div class="bt" @click="listClick(item.cities,index,$event)"> <img src="../../assets/img/index.png" style="width: 0.8rem; margin-right: 5px">{{ item | cityName}}</div></td>
        <td>{{ item.yesterdayLocalConfirmedCount | data_announced}}</td>
        <td>{{ item.currentConfirmedCount }}</td>
        <td>{{ item.currentDangerCount }}</td>
        <td @click="detail(item.provinceShortName,item.statisticsData)"><a  :href='"#/province/"+item.provinceShortName'>详情</a></td>
   </tr>
   </div>
   </template>
   ```

   ### 组件注册

   ### Prop

   ### 插槽

   ### 过滤器

   ### 生命周期函数

   ### 路由

   ## 配置

   ```js
   // vue.config.js 配置
   module.exports = {
       publicPath: './', //基本路径
       outputDir: "dist", // 输出目录
       assetsDir: 'static',	//放置生成的静态资源 (js、css、img、fonts) 的目录
       indexPath: "index.html",
       productionSourceMap: false, //生产环境是否生成 sourceMap 文件
       // 代理
       devServer: {
           proxy: {
               // 以/interface代替/interface.sina.cn,将所有https://interface.sina.cn请求重写为https:/interface
               '/interface': {
                   target: 'https://interface.sina.cn', // 将/interface 代理为https://interface.sina.cn/
                   ws: true,
                   changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                   secure: true,
                   pathRewrite: {
                       // 路径重写，
                       '^/interface': 'https://interface.sina.cn', // 替换target中的请求地址，也就是说以后你在请求https://interface.sina.cn/xxx 只需填/interface/
                   },
               }
           },
       }
   }
   
   ```

   ## Vue3
   
   1. reactive 将对象转换为响应式对象
   2. ref 将数据转换为响应式数据
   3. torefs 把响应式对象转换为普通对象，普通对象的每个property都是一个ref 
   4. provide 父组件 inject 子组件

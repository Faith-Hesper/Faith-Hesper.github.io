---
title: npm
mathjax: true
date: 2022-07-03 14:44:36
tags: npm
categories:
description: npm相关知识点
---

### 查看包安装版本

```bash
npm list # 查看已安装的 npm 的包
npm list -g # 查看全局安装的包
npm list cowsay # 查看特点的包
npm view cowsay version # 查看包的版本
```
### 安装包

```bash
npm install cowsay
npm i cowsay # 简化命令
npm install -g cowsay # 全局安装
npm install -S cowsay # 
npm install -D cowsay # 
npm install cowsay@1.2.0 # 安装特点版本的包
npm view cowsay versions # 查看已发布的包的所有版本
```
### 卸载包
```bash
npm uninsatll cowsay 
npm uninstall -g cowsay
npm uninstall -S cowsay # 移除依赖包 --save-dev
npm uninstall -D cowsay # 移除开发时的依赖 devDependencies
```
### 包版本控制

包的版本由3个数字控制：`x.y.z`
+ 第一个数字是主版本
+ 第二个数字是次版本
+ 第三个数字是补丁版本
版本控制符号
+ `^` 更新该版本下的次、补丁版本，如果写入的是 ^0.13.0，则当运行 npm update 时，可以更新到 0.13.1、0.13.2 等，但不能更新到 0.14.0 或更高版本。 如果写入的是 ^1.13.0，则当运行 npm update 时，可以更新到 1.13.1、1.14.0 等，但不能更新到 2.0.0 或更高版本
+ `~` 更新该版本下的补丁版本，如果写入的是 〜0.13.0，则当运行 npm update 时，会更新到补丁版本：即 0.13.1 可以，但 0.14.0 不可以
+ `>` 接受高于指定版本的任何版本
+ `>=` 接受高于对于指定版本的任何版本
+ `-` 接受一定范围的版本
+ `||` 组合集合
+ `latest` 使用可用最新版本

### 启动vscode

```js
code .
```


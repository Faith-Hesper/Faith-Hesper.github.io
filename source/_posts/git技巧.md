---
title: git技巧
date: 2021-09-09 08:39:09
tags: git
categories: 工具
description: git
---

## Git

### git配置

在git文件中

```bash
git config --global user.email "your email"
git config --global user.name "your name"
# 生成密钥
ssh-keygen -t rsa -C "githubemail"ssh -T git@github.com 测试连接github
git config --list 查看git配置
```

找到`C:\Users\win\.ssh`中的id_rsa.pub文件，全部复制，然后将公钥，复制github、gitee里的ssh公钥中

<img src="https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627213117.png" alt="sshgitee" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627213235.png" alt="sshgithub" style="zoom:50%;" />

验证配置是否成功

```bash
ssh -T git@github.com # 测试连接github
ssh -T git@gitee.com
git config --list 查看git配置
```

初始化并推送仓库

```bash
git init
git add README.md	# git add . 添加所有文件
git commit -m "init commit"
git remote add origin https://gitee.com/xxx/xxx.git # 添加远程仓库并设置别名为 origin
git push -u origin master # 推送到 origin master分支
```

拷贝库到本地

```bash
git init
git clone https://gitee.com/xxx/xxx.git
```

远程仓库设置

```bash
git remote -v # 查看所有远程仓库
git remote show [remote] # 显示某个远程仓库的信息
git remote add [shortname] [url] # 添加远程仓库并设置别名为 origin
git remote rm name  # 删除远程仓库
git remote rename old_name new_name  # 修改仓库名
```

### git 命令

- mkdir filename 创建文件夹 Linux 命令
- cd filename
- git init 初始化存储库
- git add 提交到暂存区
  - git add . 添加所有文件
  - git add document1.txt document2.txt
  - git add \*.txt 添加所有.txt 格式文件
- git status
- git commit -m "commits" || git commit 提交修改信息
- git commit -a -m "commits" || git commit -am "commits" 创建空提交
- git push
- git ls-files 列出文件信息
- git rm document1.txt 删除文件
- git mv document1.txt document2.txt 移动文件
- .gitignore 忽略指定文件(暂存区没该文件之前起作用)
- git rm --cached document1.txt 移除暂存区文件
- git diff --staged 查看暂存区信息
- git log commits 历史
- git restore
- git restore --staged document1.txt 撤销 git add :smile: document1.txt


---

### git 配置

- git config --global core.editor "code --

  wait" 设置默认编辑器为 vscode

- git config --global -e 使用 vscode 编辑全局配置文件

- git version

- git config --global user.name "XXXX"

- git config --global user.email  "XXXXXXXXXX"

- git config --list

- ssh-keygen -t rsa  -C "用户邮箱" 配置git密钥 

- ssh git@github.com 验证git是否授权成功

- git config --global https.proxy 'http://127.0.0.1:8001'   

- git config --global http.proxy 'http://127.0.0.1:8001'

- git config --global socks.proxy "127.0.0.1:1080"

```bash
git config --global user.email "your email"
git config --global user.name "your name"
ssh-keygen -t rsa -C "githubemail"
ssh -T git@github.com # 测试连接
ssh -T git@gitee.com
git config --list # 查看git配置
git config user.name # 查看用户名
git config user.email # 查看邮箱
```

配置环境变量

在系统环境变量`path`中添加 E:\Git\bin E:\Git\cmd

找到id_rsa.pub文件的公钥复制ssh公钥到GitHub

---

### git 初始化

#### 新建仓库

- git init
- git add README.md
- git commit -m "first commit"
- git branch -M main
- git remote add origin https://github.com/Faith-Hesper/fe.git
- git push -u origin main

#### 推送到仓库

+ git remote add origin https://github.com/Faith-Hesper/Postgraduate.git
+ git branch -M main
+ git push -u origin main

git push 时出现`git config --global http.postBuffer 524288000`说明文件太大

```bash
$ git config --global http.postBuffer 524288000
```

### 拷贝库到本地

```bash
git init
git clone https://gitee.com/xxx/xxx.git
```

### remote相关

```bash
git remote -v # 查看所有远程仓库
git remote show [remote] # 显示 仓库详细信息
git remote rm name  # 删除远程仓库
git remote rename old_name new_name  # 修改仓库名
```

### 合并分支

```bash
git checkout master # 切换分支
git pull origin master # 拉取最新代码
git merge dev # 把dev分支的代码合并到master上
git status # 查看状态
git push origin master # 提交代码
```




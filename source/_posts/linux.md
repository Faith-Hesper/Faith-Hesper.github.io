---
title: linux
mathjax: true
date: 2022-07-03 14:57:56
tags: linux
categories:
description:
---

[TOC]

# linux环境部署

## Redis

### 依赖安装 

Redis由C语言编写，需要gcc编译器，先排查是否安装gcc

```bash
gcc --version
```

出现如下所示类似文字说明系统已有gcc
![gcc](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204755.PNG)
无则安装

```bash
yum install gcc
```

### 安装Redis

1. 选择redis安装文件夹

```bash
cd /home/redis
```

2. 下载Redis压缩包

```bash
wget http://download.redis.io/releases/redis-6.0.3.tar.gz
```

经过漫长的等待后下载完成
![](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204746.PNG)

3. 解压重命名

```bash
# 解压
tar -vxzf redis-6.0.3.tar.gz
# 重命名
mv redis-6.0.3 redis
```

4. 编译安装

```bash
cd redis
# 编译安装
make
# make install PREFIX=/home/redis 指定安装目录
# 在 /usr/local/bin 中生成一个安装目录
cd src  && make install
```

出现如下错误表示gcc版本过低
![](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204739.PNG)
升级gcc版本

```bash
yum -y install centos-release-scl
yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
#临时修改gcc版本
# scl enable devtoolset-9 bash
#永久修改gcc版本
echo "source /opt/rh/devtoolset-9/enable" >>/etc/profile
```

然后重新执行make命令
![make](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204733.PNG)

### 配置Redis

1. 复制配置文件

```bash
cp /home/redis/redis.conf /usr/local/redis/bin/redis.conf
```

2. 调整配置文件
   1. 以后台方式启动
      修改daemonize no 为daemonize yes
   2. 更改默认端口号
      port默认为 6379
   3. 设置访问权限
      bind ip 服务器ip
        bind 127.0.0.1 服务器ip
   4. 关闭保护模式
      protected-mode 设置为 yes
   5. 配置访问密码
      requirepass 设置为默认 foobared

```bash
vim /usr/local/redis/bin/redis.conf
# i 插入
# :wq 保存退出
```

![protected-mode](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204150.PNG)
![daemonize](./src/assets/daemonize.PNG)
![requirepass](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204318.PNG)
![bind](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204334.PNG)

3. 启动 redis

```bash
# 切换到redis.conf目录
cd /usr/local/redis/bin
./redis-server ./redis.conf
```

4. 查看redis是否启动

```bash
# 
redis-cli
ps -ef|grep redis
```

5. 注册服务

```bash
[Unit]
Description=redis-server
After=network.target
 
[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis.conf
PrivateTmp=true
 
[Install]
WantedBy=multi-user.target
```

6. 开机启动

```bash
systemctl daemon-reload
systemctl enable redis.service
```

## 部署tomcat

### 安装jdk

[官网jdk下载地址](https://www.oracle.com/java/technologies/downloads/#java8)
查看服务器版本信息

```bash
uname -a
```

![uname](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204548.PNG)

1. 下载压缩包
   要根据系统选择对应版本压缩包，这里下载`x64 Compressed Archive`版本
   ![jdk](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204552.PNG)
2. 用ftp或者宝塔等工具将压缩包上传至服务器
```sh
cd /home/jdk
```
3. 解压

```bash
tar -zxvf jdk-18.0.1.1.tar.gz
```

4. 重命名文件夹

```bash
mv /home/jdk/jdk-18.0.1.1/* /home/jdk/
```

### jdk配置

编辑环境变量配置文件

```bash
vim /etc/profile
```

配置jdk的环境变量

```bash
# 按i开始编辑
export JAVA_HOME="/home/jdk"
export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib/tools.jar:$CLASSPATH
```

配置好后输入 `:wq`保存退出

```bash
# 配置立即生效
source /etc/profile
```

检查jdk是否安装成功

```bash
java -version
```

![java-version](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204614.PNG)
如果出现 -bash java not found，可能是jdk版本问题或者环境变量没有配对

### 安装tomcat

[tomcat9官网下载地址](https://tomcat.apache.org/download-90.cgi)

1. 下载tomcat
   ![tomcat](https://cdn.jsdelivr.net/gh/faith-hesper/Note/img/20220627204618.PNG)
2. 上传至服务器
```sh
cd /home/tomcat
```
3. 解压

```bash
tar -zxvf apache-tomcat-9.0.64.tar.gz
```

4. 重命名文件夹

```bash
mv /home/tomcat/apache-tomcat-9.0.64/* /home/tomcat/
```
5. 环境变量
```bash
vim /etc/profile
export CATALINA_BASE="/home/tomcat"
export CATALINA_HOME="/home/tomcat"
source /etc/profile
```

6. 启动tomcat

```bash
cd /home/tomcat/bin
./startup.sh
```

出现无权限，是文件夹权限设置问题

```bash
chmod 777 startup.sh
```

### 项目配置

1. 上传项目到webapps文件夹 (ftp)
2. 更改默认主页
   删除tomcat webapps里的默认文件，在conf 目录中 `vim server.xml`，修改tomcat端口号为8090、关闭`shutdown`端口号为809，在<Host>标签内添加如下代码，修改完后重启tomcat

```xml
<Context path="" docBase="jxfzjc" reloadable="true" debug="0" />
```

或者在context.xml文件中修改配置，在改配置文件下的修改不用重启tomcat

3. 开放端口号

```sh
firewall-cmd --zone=public --remove-port=8090/tcp --permanent
```

4. redis配置
   在项目的web-inf文件夹里的classes文件中找到`redis.properties`文件修改里面的参数
   ns-onemap-manager database为 12 ns-onemap database为 11 landwork-appserver database为 13

```properties
#redis
redis.host=127.0.0.1
redis.port=6379
# redis配置的密码
redis.pass=foobared
#0~15总共16个数据库
redis.database=11
redis.timeout=3000
```

5. 重启tomcat

```sh
cd /home/tomcat/bin
./shutdown.sh
./startup.sh
```

### 防火墙常用命令

```bash
# 查看firewall服务状态
systemctl status firewalld

# 开启、重启、关闭 firewall.service服务
# 开启
service firewalld start

# 重启
service firewalld restart

# 关闭
service firewalld stop

# 查看防火墙规则
firewall-cmd --list-all    # 查看全部信息
firewall-cmd --list-ports  # 查看端口信息

# 开启端口
firewall-cmd --zone=public --add-port=80/tcp --permanent    # 开启防火墙端口80
firewall-cmd --zone=public --remove-port=8080/tcp --permanent  #  关闭防火墙端口8080 
systemctl restart firewalld.service    # 重启防火墙命令

命令含义：
--zone               # 作用域
--add-port=80/tcp    # 添加端口，格式为：端口号/通讯协议
--permanent          # 永久生效，没有此参数重启后失效
```

## 常用命令

### 文件管理

1. 显示目录信息

```bash
ls # 显示所有文件及目录
ls -a # 显示所有文件及目录(包括隐藏文件)
ll # 输出文件的长格式(包含文件读写权限等信息)
```

2. 创建目录文件

```bash
mkdir dir # 创建一个 dir 文件夹
mkdir -m 700 dir # 创建文件夹并设置权限为 700
```

3. 复制文件或目录

```bash
cp file1.cfg file2.cfg # 复制文件 file1 并定义新文件名为 file2
cp -r doc1 doc2 # 复制目录
cp -a file1.cfg file2.cfg # 复制文件时保留原有权限及用户归属信息
cp -f ks.cfg /etc # 将文件复制到/etc目录,并覆盖已有文件，不进行询问
```

4. 移动或重命名

```bash
mv file1.txt /home/office # 移动文件
mv doc1/ /home/doc2/ # 移动目录
mv file1.txt file2.txt # 重命名文件
mv doc1/ doc2/ # 重命名目录
```

5. 删除文件或目录

```bash
rm file.txt # 删除文件 (默认会进行二次确认)
rm -f file.txt # 强制删除文件
rm -rf doc # 强制删除目录及其子文件或目录  !!!牢底坐穿命令
rm -f *.txt # 删除以.txt为后缀的所有文件 (正则)
```

6. 显示当前目录路径

```bash
pwd
```

### 文档编辑

1. 查看文件

```bash
cat file.txt # 查看文件内容
cat -n file.txt # 查看文件并显示行号
cat > file.txt << EOF # 持续写入文件，直到碰到EOF符后结束并保存 
```

2. 输出字符串或变量值

```bash
echo string # 在终端显示 string 类似于 cy语言的 print
echo $PATH # 输出环境变量中的path值
```

3. 文本搜索

```bash
grep root /etc/passwd # 搜索passwd文件中石油保护 root 关键字的内容
grep ^root /etc/passwd # 搜索以root开头的内容 (正则)
```

4. 查看文件尾部内容

```bash
tail file.txt # 查看文件尾部的后10行内容
tail -n 5 file.txt # 查看后5行内容
```

文件权限
r: 读 4
w: 写 2
x: 执行 1
-：没有任何权限 0
Linux分为三种用户，分别是 拥有者(owner) 用户组(group) 其他用户(other) 

```bash
chmod 777 file.txt # 所有用户都有读写执行权限
ll # 查看文件的权限设置
# ps 查看进程相 
# ps -ef 显示所有进程信息
# grep 文本搜索
# 查找所有与 Java 相关的进程
ps -ef|grep java
netstat -nalp|grep 8090
lsof -i:8091
netstat -tln | grep 8090
```

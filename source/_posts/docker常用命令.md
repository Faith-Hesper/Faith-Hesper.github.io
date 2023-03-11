---
title: docker常用命令
date: 2022-01-04 15:48:29
tags: [docker]
categories:
description:
---

## Docker常用命令

1. 搜索及拉取docker镜像

```shell
$ docker search [NAME]              # 搜索docker镜像（搜索结果里OFFICIAL为OK的是官方镜像）
$ docker pull [NAME]                # 拉取指定docker镜像（NAME是搜索出来的指定镜像名）
```

2. 查看docker容器实例和镜像
```bash
$ docker ps -a                      # 查看所有docker容器实例
$ docker ps                         # 查看所有正在运行的docker容器实例
$ docker images                     # 查看所有docker镜像
$ docker images [REPOSITORY]        # 查看指定docker镜像（REPOSITORY为镜像名）
```
3. 开启停止docker容器实例和镜像
```bash
$ docker start [ID/NAMES]             # 开启指定docker容器实例
$ docker stop [ID/NAMES]              # 停止指定docker容器实例
$ docker restart [ID/NAMES]           # 重启指定docker容器实例
$ docker start `docker ps -a -q`      # 批量启动所有的docker容器实例
$ docker stop `docker ps -a -q`       # 批量停止所有的docker容器实例
$ docker restart `docker ps -a -q`    # 批量重启所有的docker容器实例
```
4. 强制删除docker容器实例和镜像
```bash
$ docker rm -f [ID/NAMES]             # 强制删除指定docker容器实例（删除前需先停止实例）
$ docker rmi -f [ID/NAMES]            # 强制删除指定docker镜像（删除前需先停止实例）
$ docker rm -f `docker ps -a -q`      # 批量强制删除所有的docker容器实例（删除前需先停止实例）
$ docker rmi -f `docker images -q`    # 批量强制删除所有的docker镜像（删除前需先停止实例）
```
5. 进入/退出docker容器内部
```bash
$ docker exec -it [CONTAINER ID/NAMES] /bin/bash   # 进入指定docker容器内部
$ ps -ef                                           # 查看容器内进程
$ exit                                             # 从docker容器内部退出
```
注：如果遇到OCI runtime exec failed: exec failed问题，则使用如下命令进入
```bash
$ docker exec -it [CONTAINER ID/NAMES] /bin/sh
```
6. 查看docker运行日志
```bash
$ docker logs -f [CONTAINER ID/NAMES] --tail 100    # 查看指定条数的docker运行日志
$ docker logs --since 30m [CONTAINER ID/NAMES]      # 查看指定分钟内的docker运行日志   
```
7. docker容器内部的文件上传和下载
```bash
$ docker cp /root/test.txt [CONTAINER ID/NAMES]:/root       # 上传文件
$ docker cp [CONTAINER ID/NAMES]:/root/test.txt /root       # 下载文件
```
8. docker空间清理
```bash
$ docker system df                 # 类似于Linux上的df命令，用于查看Docker的磁盘使用情况
$ docker system prune              # 可用于清理磁盘，删除关闭的容器、无用的数据卷和网络，以及无tag的镜像)
```
9. 在docker容器外执行容器内的命令

有时候我们想执行某个容器的某条命令，但又不想进入容器内，可通过如下命令示例实现：
```bash
$ docker exec -it [CONTAINER ID/NAMES] /bin/bash -c 'cd /code && python test.py'
```
注：如果遇到the input device is not a TTY问题，去掉t即可，即：
```bash
$ docker exec -i [CONTAINER ID/NAMES] /bin/bash -c 'cd /code && python test.py'
```
10. docker的跨容器调用

需求情景：爬虫项目和定时任务项目分别在两个容器中部署的，想要在定时任务项目里编写脚本调用爬虫项目中的具体执行文件。

我们可以通过挂载docker.sock和docker命令行客户端实现用docker exec来间接调用。只需要在docker run的时候挂载如下路径即可：

```bash
-v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker
```

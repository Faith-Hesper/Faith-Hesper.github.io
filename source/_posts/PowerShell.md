---
title: PowerShell
date: 2021-08-22 09:16:18
tags: PowerShell
categories: PowerShell
description: PowerShell基本用法
---

## 筛选



### 列出所有包含的项 (-Recurse)

 ### 按名称筛选项 (-Name)

 ###  强制列出隐藏的项 (-Force)

 ### 使用通配符匹配项名称

 + (*) 匹配零个或多个出现的任何字符
 + ? 完全匹配一个字符
 + []一组要匹配的字符

### 排除项 (-Exclude)

```powershell
Get-ChildItem -Path C:\Windows\*.dll -Recurse -Exclude [a-y]*.dll
```

## 计算机信息

### 关闭重启计算机

```powershell
Stop-Computer
Stop-Computer
Restart-Computer -Force
```

### Get-CimInstance

```powershell
# 返回所有桌面的信息，无论它们是否正在使用中
Get-CimInstance -ClassName Win32_Desktop
# 列出 BIOS 信息
Get-CimInstance -ClassName Win32_BIOS
# 列出计算机制造商和型号
Get-CimInstance -ClassName Win32_ComputerSystem
Get-CimInstance -ClassName Win32_ComputerSystem -property model
# 限制只返回model属性
Get-CimInstance -ClassName Win32_ComputerSystem -property model | select-object -property model
# model                                 # -----       
# TUF Gaming FX505DT_FX95DT
```

```powershell
# 列出操作系统版本信息
Get-CimInstance -ClassName Win32_OperatingSystem |
  Select-Object -Property BuildNumber,BuildType,OSType,ServicePackMajorVersion,ServicePackMinorVersion
Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object -Property Build*,OSType,ServicePack*
# 本地用户和所有者
Get-CimInstance -ClassName Win32_OperatingSystem | Select-Object -Property *user*
# 获取可用磁盘空间
Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DriveType=3"
Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DriveType=3" |
  Measure-Object -Property FreeSpace,Size -Sum |
    Select-Object -Property Property,Sum
```

```powershell
# 获取登录到计算机的用户
Get-CimInstance -ClassName Win32_ComputerSystem -Property UserName
# 获取计算机的本地时间
Get-CimInstance -ClassName Win32_LocalTime
#
Get-CimInstance -ClassName Win32_Service | Select-Object -Property Status,Name,DisplayName
# 使用具有 AutoSize 和 Wrap 参数的 Format-Table，用于优化列宽并允许较长名称换行而不是被截断
Get-CimInstance -ClassName Win32_Service | Format-Table -Property Status,Name,DisplayName -AutoSize -Wrap
```



## 进程与服务

### 获取进程

```powershell
# id 获取
get-process -id 0
# name 获取
Get-Process -Name ex*
# 多个name 参数
Get-Process -Name exp*,power*
# 管理员身份启动
Start-Process PowerShell -Verb RunAs
```

### 停止进程

```powershell
Stop-Process -Name Idle
# 强制停止
Stop-Process -Name t*,e* -Confirm
```

### 服务

```powershell
# 获取服务
Get-Service -Name se*
# 按显示服务名称查找
Get-Service -DisplayName se*
Stop-Service -Name spooler
Start-Service -Name spooler
# 暂停服务
Suspend-Service -Name spooler
```

## 格式化输出

```powershell
Get-Command -Verb Format | Format-WideGet-Process -Name iexplore | Format-ListGet-Service -Name win* | Format-Table
```

## 文件


```powershell
# 获取当前路径
Get-Location
# 设置路径 
Set-Location -Path C:\Windows
# 获取指定路径所有文件force 显示隐藏项 -Recurse 显示包含的子文件
Get-ChildItem -Path C:\ -Force
# 复制文件 -Force覆盖已有目标文件
Copy-Item -Path C:\boot.ini -Destination C:\boot.bak
# 复制文件夹
Copy-Item C:\temp\test1 -Recurse C:\temp\DeleteMe
# 将 C:\data 中任意位置包含的所有 .txt 文件都复制到 
C:\temp\textCopy-Item -Filter *.txt -Path c:\data -Recurse -Destination C:\temp\text
# 创建文件和文件夹
New-Item -ForceNew-Item -Path 'C:\temp\New Folder' -ItemType DirectoryNew-Item -Path 'C:\temp\New Folder\file.txt' -ItemType File
# 删除文件夹
Remove-Item -Path C:\temp\DeleteMe -Recurse
```

```powershell
# 文本文件数据读取到数组中
$Computers = Get-Content -Path C:\temp\DomainMembers.txt
```

```powershell
# 启用自动填充命令
Set-PSReadLineOption -PredictionSource History
```


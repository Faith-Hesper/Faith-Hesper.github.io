---
title: php
date: 2022-01-07 16:39:41
tags: [php]
categories:
description:
---

## PHP连接数据库

1. 连接数据库

  ```php
  // 服务器链接、用户名、密码、数据库名
  $link = mysqli_connect('localhost','user','123','sql');
  ```

2. 验证连接

   ```php
   if(!$link)
   {
       echo "连接失败";
       // 返回最近调用函数的最后一个错误描述
       exit(mysqli_connect_error());
   }

3. 设置默认字符编码

   ```php
   mysqli_set_charset($link,'utf8');
   ```

4. SQL查询

   ```php
   // sql查询语句 随机生成一个数并将查询到的name值赋给num
   $sql = "select floor(rand() * count(*)) as `num` from `name`";
   // 执行sql语句
   $query = mysqli_query($link,$sql);
   ```

5. 获取记录

   ```php
   // 从结果集中取得所有行作为关联数组，或数字数组
   mysqli_fetch_all($name);
   // 从结果集中取得一行作为关联数组，或数字数组
   mysqli_fetch_array($name);
   // 从结果集中取得一行作为关联数组
   mysqli_fetch_assoc($name);
   // 从结果集中取得当前行，并作为对象返回
   mysqli_fetch_object($name);
   // 从结果集中取得一行，并作为枚举数组返回
   mysqli_fetch_row($name);
   ```
   
6. 插入数据

   ```php
   $insert = "insert into register(username,password,session) values ('$username','$password','$rand')";
   mysqli_query($link,$insert)
   ```

6. 关闭数据库连接

   ```php
   mysqli_close($link);
   ```

## PHP实现页面跳转

### 1、php跳转代码一句话式：

```php
<?php 
  	$url = $_GET['url'];
	Header("Location:$url");  
?> 
```
### 2、php跳转代码if判断式：

```php
<?php
    if($_COOKIE["u_type"]){  
    header('location:register.php');  
}  
	else{  
  	 	setcookie('u_type','1','86400*360');//设置cookie长期有效  
    	header('location:zc.html');  
} 
?>
```
### 3、php跳转代码javascript式：

```php
<?php
	$url = register.php;
	echo "<!--<SCRIPT LANGUAGE="javascript">";
	echo "locaton.href='$url'";
	echo "</SCRIPT>-->";  
?> 
```
### 4、php跳转代码HTML标记式(META的REFRESH属性)：

```php+HTML
<?php
<HTML>
    <HEAD>
    <META HTTP-EQUIV="REFRESH" CONTENT="10"; URL=register.php/>
    </HEAD>
    <BODY>
    </BODY>
</HTML>
?>
```

### 5、php跳转代码HTTP头信息(Header函数)式：

```php
<?php
	$url = "register.php;
	Header("HTTP/1.1 303 See Other");  
	Header("Location: $url");  
	exit;   
?>
```

## 表单相关

```php
// 获取post方法提交的表单中name值为username的值
$_POST['username']
// 设置cookie name value expires
setcookie('uid',$rand,time()+3600*24*30);
// 设置session 
session_start(); // 开启会话
$_SESSION['uid'] = $rand; 
```


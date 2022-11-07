<?php
    header("content-type:text/html;charset=utf8");
	// 连接数据库 服务器 用户名 密码 数据库名
    $link = mysqli_connect('localhost','1','1','1'); //  note 修改实际信息
    //$_POST = mysqli_real_escape_string($link,$_POST);
    // 字符转义
    $username = mysqli_real_escape_string($link,$_POST['username']);
    // var_dump($username);
    $password = mysqli_real_escape_string($link,$_POST['password']);
    if(!$link)
    {
        echo "连接失败";
        // 页面跳转
        header('location:register.html');
        exit(mysqli_connect_error());
    }
    if (!empty($username)) {
        echo "未输入用户名";
        header('location:register.html');
        exit;
    } else if(!empty($password)) {
        echo "未输入密码";
        header('location:register.html');
        exit;
    }
    $password = md5($password+substr($password,0,2));
    // var_dump($password);
    mysqli_set_charset($link,'utf8');
    $sql ="select * from register where 'username=$username' and 'password=$password'";
    $res = mysqli_query($link,$sql);
    $result = mysqli_fetch_array($res);
    //var_dump($result);
    // if(!$result)
    // {
    //     echo "用户名或密码错误";
    //     exit;
    // }
    if($result)
    {
        echo "用户名已存在";
        header('location:register.html');
        exit;
    }
    $rand = md5(mt_rand() + substr($username,0,2));
    $insert = "insert into register(username,password,session) values ('$username','$password','$rand')";
    if(mysqli_query($link,$insert))
    {
        echo "数据插入成功,注册成功";
        // 开启会话
        //session_start();
       // $_SESSION['uid'] = $rand;
        setcookie('uid',$rand,time()+3600*24*30);
        header('location:index.html');
    }else{
        echo "ERROR: " .mysqli_error($link);
    }
    mysqli_close($link);
?>
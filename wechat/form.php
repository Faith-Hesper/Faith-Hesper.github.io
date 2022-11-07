<?php
    //var_dump($_POST); // 关联数组
    foreach ($_POST as $name=>$value) {
        set_cookie($name,$value);
    }
    function set_cookie($name,$value)
    {
        setcookie($name,$value);
        var_dump($_COOKIE[$name]);
        header('location:index.html');
    }
?>
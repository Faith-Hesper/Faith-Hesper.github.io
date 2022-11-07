// let names = ["李鑫", '刘黎', '潘石屹', '吴海安', '李雅静', '韩梦洁', '王安晏', '赵博超', '钟哲圣', '李沁', '张雨琪', '张雨绮', '李世民', '邓海洋', '梦琪', '王忆柳', '张惜文', '李慕青', '叶安志']
// let tutor = ["刘洋"]
let IDs = ["201904134120","202005134210","201902134211"]
let stu_ID = IDs[Math.floor(Math.random() * IDs.length)];
// let usr_name = names[Math.floor(Math.random() * names.length)];
// $Cookie("姓名", usr_name, {});
// $Cookie("姓名");
// $Cookie("学号", stu_ID, {});
// $Cookie("学号");

// 创建Ajax对象
var xhr = new XMLHttpRequest();
// 请求方式、请求方法
xhr.open('get','https://lntano.top/wechat/random.php')
// 发送请求
xhr.send()
// 获取响应
xhr.onload = function (){
    // xhr.status  // http状态码
    // console.log(xhr.responseText)
    var responseText = xhr.responseText;
    var data = responseText.split(";");
    console.log(data)
    $.cookie("姓名", data[0], {path: "/",expires: 3600});
    // $Cookie("姓名");
    $.cookie("学号", stu_ID, {path: "/",expires: 3600});
    // $Cookie("学号");
    $.cookie("导员", data[1], {path: "/",expires: 3600});
    $.cookie("phone", data[2], {path: "/",expires: 3600});
    // console.log(JSON.parse(xhr.responseText)) // json字符串转换成json对象
}

function ajax(options) {
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        success: function (data) {
            console.log(data);
        },
        error: function (data,xhr) {
            console.log("error" + data);
            console.log(xhr);
        }
    }

    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults, options);

    // 创建Ajax对象
    var xhr = new XMLHttpRequest();
    var params = "";
    // 拼接字符串
    for (var attr in defaults.data) {
        params += attr + "=" + defaults.data[attr] + "&";
    }
    params.substring(0, params.length - 1);
    if (defaults.type == "get") {
        defaults.url += "?" + params;
    }

    // 请求方式、请求路径
    xhr.open(defaults.type, options.url);

    // post请求
    if (options.type == "post") {
        // 传递的请求参数格式类型
        var contentType = options.header["Content-type"];
        // 设置请求参数格式类型
        xhr.setRequestHeader("Content-type", contentType);
        if (contentType == "application/json") {
            // JSON数据格式转成字符串
            xhr.send(JSON.stringify(options.data));
        } else {
            xhr.send(params);
        }
    } else
    {
        // 发送请求
        xhr.send();
    }

    // 获取响应并处理响应数据
    xhr.onload = function () {
        // 获取响应头中的数据类型
        var contentType = xhr.getAllResponseHeader('Content-type');
        // 获取响应数据
        var responseText = xhr.responseText;
        // 判断是否是json类型字符串
        if (contentType.includes('application/json'))
        {
            responseText = JSON.parse(responseText);    // json类型字符串转换成json对象
        }
        // xhr.status  // http状态码
        // 请求成功 调用请求成功的处理函数
        if (xhr.status == 200)
        {
            options.success(responseText);
        } else {
            options.error(responseText,xhr);
        }
        // console.log(JSON.parse(xhr.responseText)) 
    };
}

ajax({
    // 请求路径
    url: "",
    // 请求参数
    data: {},
    success: function (data) {
        console.log(data);
    }
});

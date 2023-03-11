<span style="color:#333333"><script>
    (function () {
        if ('{{ page.password }}') {
            if (prompt('请输入文章密码') !== '{{ page.password }}') {
                alert('密码错误！');
                if (history.length === 1) {
                    location.replace("Faith-hesper.github.io"); // 这里替换成你的首页
                } else {
                    history.back();
                }
            }
        }
    })();
</script></span>
---
title: freenom搭建网站
date: 2021-10-17 16:15:59
tags: 网站
categories: 网站
description: 免费域名搭建静态网站
---

申请freenom免费域名

[freenom]:https://www.freenom.com/zh/index.html?lang=zh "freenom网址"

选择可用域名，然后点击Checkout，选择免费时间(period)

DNSPOD解析域名
[dnspod]:https://www.dnspod.cn/
添加netlify记录

[netlify]: https://www.netlify.com/

 + 记录类型CNAME 
 + 值为netlify网址

主机记录添加@ 和www
修改域名nameservers 
添加记录值
netlify添加自定义域名
---
title: Faith Hesper
top: 1
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can:smile: find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

<!-- more -->

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=450 height=86 src="//music.163.com/outchain/player?type=2&id=1857288529&auto=1&height=66"></iframe>

<iframe src="//player.bilibili.com/player.html?aid=503717099&bvid=BV19g411g7jj&cid=357082727&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
[Hexo官方文档](https://hexo.io/zh-cn/docs/plugins)

```bash
# 本地预览
hexo s

# 使用 Hexo 生成静态文件快速而且简单
hexo g
# Hexo 能够监视文件变动并立即重新生成静态文件，在生成时会比对文件的 SHA1 checksum，只有变动的文件才会写入。
hexo g --watch
# 清空 hexo g 生成的内容，内容在 root/public 
hexo clean

# 将本地生成 url 链接推送到百度，让百度爬取其中的内容进行索引
hexo d

# 根据 标题名称  在root/source/_post 生成 markdown 文件
hexo new 标题名称
hexo new post 标题名称
hexo new page newpage 新建页面

# 新建文章 (仅自己可见)
hexo new draft newdraft

# 预览文章
hexo server --draft

# 发表文章
hexo publish draft newdraft
# 完成后部署
hexo g --d
hexo d --g
```
1.NexT使用文档

[NexT](http://theme-next.iissnan.com/getting-started.html)

更换主题：

```bash
~/blog/themes $ git clone https://github.com/theme-next/hexo-theme-next themes/next
```

更新主题：

```bash
$ cd themes/next
$ git pull
```

再在*站点*配置文件中修改成如下即可：

```bash
# 文件位置：~/blog/_config.yml
## Themes: https://hexo.io/themes/
theme: next
```

如何使用emoji:question:

安装

---

```shell
npm un hexo-renderer-marked --save
npm i hexo-renderer-markdown-it --save
npm install markdown-it-emoji --save
```

配置

---

```yaml
## markdown 渲染引擎配置，默认是hexo-renderer-marked，这个插件渲染速度更快，且有新特性
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-footnote
    - markdown-it-sup
    - markdown-it-sub
    - markdown-it-abbr
    - markdown-it-emoji
  anchors:
    level: 2
    collisionSuffix: 'v'
    permalink: false
    permalinkClass: header-anchor
    permalinkSymbol: ¶
```

 [JavaScript 3D library](https://github.com/mrdoob/three.js) for [NexT](https://github.com/theme-next)

CDN配置

```yaml
vendors:
  ...
  three: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/three.min.js
  three_waves: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@latest/three-waves.min.js
  canvas_lines: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@latest/canvas_lines.min.js
  canvas_sphere: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@latest/canvas_sphere.min.js
```

头像

avatar

https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20210708210814.png

新建文件夹

```bash
mkdir _data
```

修改背景透明

全局颜色：hesper\themes\next\source\css\_variables\base.styl

颜色设置：hesper\themes\next\source\css\_colors.styl

<details>
  <summary>使用方式</summary>
  > Primary

  <div class="success">

  > Success

  </div>

  <div class="warning">

  > Warning

  </div>

  <div class="danger">

  > Danger

  </div>

  <div class="info">

  > Info

  </div>

  <div class="gray">

  > Gray

  </div>

  <div class="yellow">

  > Yellow

  </div>
</details>



```html
> Primary

<div class="success">

> Success

</div>

<div class="warning">

> Warning

</div>

<div class="danger">

> Danger

</div>

<div class="info">

> Info

</div>

<div class="gray">

> Gray

</div>

<div class="yellow">

> Yellow

</div>
```

butterfly

| 配置             | 解释                                                         |
| ---------------- | ------------------------------------------------------------ |
| index_img        | 主页的 top_img                                               |
| default_top_img  | 默认的 top_img，当页面的 top_img 沒有配置时，会显示default_top_img |
| archive_img      | 文档页面的 top_img                                           |
| tag_img          | tag 子页面 的 默认 top_img                                   |
| tag_per_img      | tag 子页面的 top_img，可配置每个 tag 的 top_img              |
| category_img     | category 子页面 的 默认 top_img                              |
| category_per_img | category 子页面的 top_img，可配置每个 category 的 top_img    |




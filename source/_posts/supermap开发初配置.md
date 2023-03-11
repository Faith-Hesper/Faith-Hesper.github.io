---
title: vite + vue3 + SuperMap iClient初构建
date: 2022-03-18 11:13:54
tags: [supermap]
categories:
description: 挖坑
---

# 配置

## 创建项目

1. 创建vue3项目模板

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue
npm create vite@latest
```

2. cd到项目文件夹

3. 安装包

   ```bash
   npm i
   ```

5. 创建vite配置文件

   在项目根目录创建vite.consfig.js文件


## 项目配置

1. 安装所需依赖

   axios、@supermap/iclient-leaflet、leaflet等 

   ```bash
   npm i axios @supermap/iclient-leaflet leaflet -S

2. router配置

   ```bash
   npm install vue-router@4
   ```

   在src目录中创建router文件夹，并创建index.js，添加路由配置

   ```js
   import { createRouter,createWebHistory } from 'vue-router'
   
   const routes = [{
     path: '/',
     name: 'home',
     component: ()=>import('@/components/HelloWorld.vue')
   }]
   
   const router = createRouter({
     history: createWebHistory(),
     routes
   })
   
   export default router
   ```

   在main.js中

   ```js
   import router from '@/router'
   app.use(router)
   ```

2. 添加css预处理器

   ```bash
   # .scss and .sass
   npm add -D sass
   
   # .less
   npm add -D less
   
   # .styl and .stylus
     npm add -D stylus

2. 解决Uncaught TypeError utils.inherits is not a function问题

   在package.json中添加Elasticsearch所需包

   ```json
{
       "devDependencies": {
       "events": "^3.3.0",
       "util": "^0.12.4"
     }
   }
   ```

   在vite.consfig.js文件中添加配置(无则创建)

   ```js
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   
   // https://vitejs.dev/config/
   export default defineConfig({
     define: {
       'process.env': {},
     }
   })    
   ```

3. Element Plus配置

   1. 安装Element Plus

      ```bash
      npm install element-plus -S
      ```

   2. 配置自动按需引入

      [Element Plus官方配置](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)

      安装自动引入插件

      ```bash
      npm install -D unplugin-vue-components unplugin-auto-import
      ```
      
      在vite.config.js中添加如下代码
      
      ```js
      import AutoImport from 'unplugin-auto-import/vite'
      import Components from 'unplugin-vue-components/vite'
      import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
      export default {
        plugins: [
          // ...
          AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        ],
      }
      ```

4. leaflet配置

   在main.js中添加如下代码

   ```js
   import 'leaflet/dist/leaflet.css'
   ```

5. 示例配置

1.package.json

```json
{
  "name": "vue3-demo",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supermap/iclient-leaflet": "^10.2.1",
    "axios": "^0.26.1",
    "element-plus": "^2.1.4",
    "leaflet": "^1.7.1",
    "vant": "^3.4.6",
    "vue": "^3.2.25"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^2.2.0",
    "vite": "^2.8.0",
    "events": "^3.3.0",
    "util": "^0.12.4"
  }
}
```

2.vite.config.js

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    
  define: {
    'process.env': {},
  },
   // 路径
   resolve: {
    extensions: ['.js', '.vue', '.json', ".scss"],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
      // 代理
    proxy: {
      '/gaode': {
        target: 'https://restapi.amap.com',
        ws: true,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gaode/, '')
    }
    }
  }
})
```

### express

1. 后端代码上传

2. npm i 安装依赖

3. 开放端口

4. pm2 start ./项目路口文件 (pm2 start ./index.js)

   ```bash
   //pm2的常用指令
   pm2 start ./项目入口文件 --name 一个别名
   pm2 list
   pm2 stop id或name
   pm2 delete id或name
   ```

5. 在域名配置文件中添加配置

```nginx
# api为对应后端代码存放文件夹名、earth为请求接口地址
location /api/earth {
      proxy_pass http://localhost:3021/;
}
```


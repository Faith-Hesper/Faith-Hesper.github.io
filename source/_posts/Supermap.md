---
title: Supermap
date: 2021-07-13 15:18:56
tags: Supermap
categories: Supermap
---

# iServer食用方法🤔:

<!-- more -->

## iSever帮助文档路径

`root\supermap-iserver-10.1.1-win64-zip\docs`

## 示例代码路径

`root\supermap-iserver-10.1.1-win64-zip\iClient`

## 启动iServer服务

`root\supermap-iserver-10.1.1-win64-zip\bin\startup.bat`

出现
```basic
13-Jul-2021 15:40:49.375 信息 [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory Web应用程序目录[D:\GIS\supermap-iserver-10.1.1-win64-zip\webapps\iserver]的部署已在[101,950]毫秒内完成
13-Jul-2021 15:40:49.376 信息 [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory 把web 应用 程序部署到目录 [D:\GIS\supermap-iserver-10.1.1-win64-zip\webapps\ROOT]
13-Jul-2021 15:40:49.402 信息 [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory Web应用程序目录[D:\GIS\supermap-iserver-10.1.1-win64-zip\webapps\ROOT]的部署已在[26]毫秒内完成
13-Jul-2021 15:40:49.402 信息 [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory 把web 应用 程序部署到目录 [D:\GIS\supermap-iserver-10.1.1-win64-zip\webapps\study]
13-Jul-2021 15:40:49.426 信息 [localhost-startStop-1] org.apache.catalina.startup.HostConfig.deployDirectory Web应用程序目录[D:\GIS\supermap-iserver-10.1.1-win64-zip\webapps\study]的部署已在[24]毫秒内完成
13-Jul-2021 15:40:49.432 信息 [main] org.apache.coyote.AbstractProtocol.start 开始协议处理句柄["http-nio-8090"]
13-Jul-2021 15:40:49.448 信息 [main] org.apache.catalina.startup.Catalina.start Server startup in 103077 ms
13-Jul-2021 15:43:09.858 信息 [http-nio-8090-exec-8] org.restlet.Application.start Starting com.supermap.services.rest.RestApplication application
```

启动成功

浏览器打开 http://localhost:8090/iserver/ 默认端口号为8090

## 终止iServer服务

`root\supermap-iserver-10.1.1-win64-zip\bin\shutdown`

[官方教学网址](https://wx.vzan.com/live/pc/index?liveId=1149463133&shareuid=0)

# Map

创建一幅地图

```html
// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
});
```

[用法](https://leafletjs.com/reference-1.7.1.html#map-option)

```html
L.map(<String> id, <Map options> options?)
L.map(<HTMLElement> el, <Map options> options?)
```

Options

crs 坐标系

center 初始化地图位置

zoom 设置缩放级别

# [L](https://iclient.supermap.io/docs/leaflet/L.html)[.supermap](https://iclient.supermap.io/docs/leaflet/L.supermap.html).themeService

`专题图服务`

#### L.supermap.themeService(url, options)

```html
L.supermap.themeService(url,{
     projection:projection
 }).getThemeInfo(params,function(result){
     //doSomething
});
```

## [L](https://iclient.supermap.io/docs/leaflet/L.html)[.supermap](https://iclient.supermap.io/docs/leaflet/L.supermap.html).tiledVectorLayer

矢量瓦片图层

```html
L.supermap.tiledVectorLayer(url).addTo(map);
```

control.layers

图层控制

  leaflet有两种类型的图层：

   （1）**base layer**：互斥的图层（在地图上同一时间只能有一个图层可见），比如tile layers；

   （2）**overlayers**：在base layer之上放置的其他东西。

我们将前面找的图层资源以base layer形式加载，那么我们一次就只能显示其中一个（而overlayers可以同时显示多个），可以通过 layerControl 切换图层

第一个添加的图层作为底图，后面添加的地图对其覆盖

```html
L.control.layers(<Object> *baselayers?*, <Object> *overlays?*, <[Control.Layers options]> options)
```

```javascript
var baseLayers = {
    "Mapbox": mapbox,
    "OpenStreetMap": osm
};

var overlays = {
    "Marker": marker,
    "Roads": roadsLayer
};
```

```javascript
L.control.layers(baseLayers, overlays).addTo(map);
```

```javascript
collapsed // 折叠
```

## [GEOJSON](https://leafletjs.com/reference-1.7.1.html#geojson)

地图Json数据解析

example

```javascript
L.geoJSON(data, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(map);
```



| Options       | Creation                                   | Description            |
| ------------- | ------------------------------------------ | ---------------------- |
| onEachFeature | function (feature, layer) {}               | 新创建事件是调用函数   |
| style         | function (geoJsonFeature) {    return {} } | 添加数据时定义Json样式 |


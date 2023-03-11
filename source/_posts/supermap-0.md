---
title: supermapAPI函数封装
mathjax: true
date: 2022-06-06 21:39:44
tags: [leaflet,draw]
categories:
description:
---

## 框选查询

### draw图形绘制

draw控件定义

```js
// 新建绘制图层
const editableLayers = new L.featureGroup()
map.addLayer(editableLayers)
// 定义绘制控件
const drawControl = new L.Control.Draw({
    draw: {
      //绘制线
      polyline: true,
      //绘制多边形
      polygon: true,
      //绘制矩形
      rectangle: {
        shapeOptions: {
          color: '#0000FF',
        },
      },
      //绘制圆
      circle: true,
      //绘制标注
      marker: false,
      //绘制圆形标注
      circlemarker: false,
    },
    edit: {
      featureGroup: editableLayers,
    },
  })
// 添加绘制控件
map.addControl(drawControl)
```

获取绘制图形坐标

```js
async function drawLayer(map, editableLayers) {
  return await new Promise((resolve) => {
    map.on(L.Draw.Event.CREATED, function (e) {
      editableLayers.addLayer(e.layer)
      let layer = { type: e.layerType, layer: e.layer }
      resolve(layer)
    })
  })
```

### 范围查询

矩形框选查询

```js
async function searchByBounds(bounds) {
  // 范围查询参数
  const boundsParam = await new Promise((resolve) => {
    const params = new L.supermap.GetFeaturesByBoundsParameters({
      datasetNames: ['ChengduFresh:Shop'],
      bounds: bounds,
    })
    resolve(params)
  })

  return await new Promise((resolve) => {
    L.supermap.featureService(dataUrl).getFeaturesByBounds(boundsParam, function (serviceResult) {
      resolve(serviceResult.result.features)
    })
  })
}
```

几何查询

```js
async function searchByGeometry(polygon) {
  // 几何查询参数
  const geometryParam = await new Promise((resolve) => {
    const params = new L.supermap.GetFeaturesByGeometryParameters({
      datasetNames: ['ChengduFresh:Shop'],
      geometry: polygon,
    })
    resolve(params)
  })

  return await new Promise((resolve) => {
    L.supermap
      .featureService(dataUrl)
      .getFeaturesByGeometry(geometryParam, function (serviceResult) {
        resolve(serviceResult.result.features)
      })
  })
}
```






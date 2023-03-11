---
title: Supermap实例
date: 2021-07-16 16:00:31
tags: [Supermap,编程]
categories: [Supermap,编程]
description: leaflet引用
---

## leaflet引用

引入 Leaflet CSS 文件和 JS 文件，填入 BootCDN 的托管地址

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" rel="stylesheet" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.js"></script>
```

引入 iclient-leaflet CSS 文件和 JS 文件，填入 SuperMap iClient for Leaflet 在线站点地址：

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" />
<link rel="stylesheet" href="https://iclient.supermap.io/dist/leaflet/iclient-leaflet.min.css" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.js"></script>
<script type="text/javascript" src="https://iclient.supermap.io/dist/leaflet/iclient-leaflet.js"></script>
```

## 地图链接

端口号

```javascript
var host = window.isLocal ? window.server : "https://iserver.supermap.io";
```

链接

```javascript
url = host + "/iserver/services/map-China/rest/maps/China";
```

## 矢量图层

```javascript
var host = window.isLocal ? window.server : "https://iserver.supermap.io";
var map, themeService, themeRange, ThemeParameters, thmemLayer, url = host +
    "/iserver/services/map-China/rest/maps/China";
var resultLayer,dataurl = host+"/iserver/services/data-China/rest/data"; //数据服务地址

map = L.map('map', {
    center: [20, 100],
    preferCanvas: true,
    crs: L.CRS.EPSG3857, //坐标系设置错误不显示
    maxZoom: 18,  // 最大缩放级别
    zoom: 2  // 缩放级别
});
var selectId, selectLayerName, vectorLayer = L.supermap.tiledVectorLayer(url, {
    noWrap: true,
    cacheEnabled: true,
    returnAttributes: true,
    attribution: "Tile Data©SuperMap iServer with©SuperMap iClient"
    // transparent: true
}).addTo(map);
// 为矢量图层注册点击事件
vectorLayer.on('click', function (evt) {
    var id = evt.layer.properties.id;
    var layerName = evt.layer.layerName;
    clearHighlight(); // 判断是否有选中矢量数据，有则取消高亮
    selectId = id;
    // alert(id);
    selectLayerName = layerName;
    var selectStyle = {
        fillColor: '#800026',
        fillOpacity: 0.5,
        stroke: true,
        fill: true,
        color: 'red',
        opacity: 1,
        weight: 2
    };
    vectorLayer.setFeatureStyle(id, layerName, selectStyle);
});


function clearHighlight() {
    if (selectId && selectLayerName) {
        vectorLayer.resetFeatureStyle(selectId, selectLayerName);
    }
    selectId = null;
    selectLayerName = null;
}
```

图层切换

```javascript
var baseMaps = {
    "China": China,
    // "vectorLayer": vectorLayer
}
L.control.zoom().addTo(map); // 缩放控件
var overmaps = {
    "vectorLayer": vectorLayer
}
L.control.layers(baseMaps, overmaps, {
            position: "topleft" //图标位置
        }).addTo(map);
```

图表数据绑定

main.js备份
```javascript
// 图表初始化
option = {
  legend: {
    data: ["降雨量", "径流量"],
    align: "left",
  },
  toolbox: {
    feature: {
      magicType: {
        type: ["stack", "tiled"],
      },
      saveAsImage: {
        pixelRatio: 2,
      },
    },
  },
  tooltip: {},
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    silent: false,
    splitLine: {
      show: false,
    },
  },
  yAxis: {},
  series: [
    {
      name: "bar",
      type: "bar",
      animationDelay: function (idx) {
        return idx * 10;
      },
    },
    {
      name: "bar2",
      type: "bar",
      animationDelay: function (idx) {
        return idx * 10 + 100;
      },
    },
  ],
  animationEasing: "elasticOut",
  animationDelayUpdate: function (idx) {
    return idx * 5;
  },
};
var div = L.DomUtil.create("div");
var chart = echarts.init(div, "", {
  width: 500,
  height: 300,
});
chart.setOption(option);

//  数据绑定
function chartSet(layer) {
  // function (layer) {
  let city = layer.feature.properties.NAME;
  console.log(myMap);
  let data1 = cityData.get(city).HUMIDITY;
  let data2 = cityData.get(city).RAINFALL;
  chart.setOption({
    title: {
      text: city,
      subtext: "",
    },
    series: [
      {
        name: "降雨量",
        data: data1,
      },
      {
        name: "径流量",
        data: data2,
      },
    ],
  });
  return chart.getDom();
  // }
}

function resultBind(resultLayer,selecTime) {
  resultLayer
  .bindPopup(
    function (layer) {
      let city = layer.feature.properties.NAME;
      // let time=layer.feature.properties.DATE_USER;
      time=timeTransfer(selecTime);
      console.log(selecTime); //time
      // let data1 = cityData.get(city).HUMIDITY;
      // let data2 = cityData.get(city).RAINFALL;
      return `<b>城市:</b>${city}<br>
      <b>相对湿度:</b>${cityData.get(city).HUMIDITY[time]}<br>
      <b>本日降雨量:</b>${cityData.get(city).RAINFALL[time]}<br>
      <b>AQI:</b>${cityData.get(city).AQI[time]}<br>
      <b>PM2.5浓度:</b>${cityData.get(city).PM25[time]}<br>
      <b>温度:</b>${cityData.get(city).TEMPERATURE[time]}<br>
      <b>天气:</b>${cityData.get(city).WEATHER[time]}<br>
      <b>日期:</b>${cityData.get(city).DATE_USER[time]}<br>
      `;
    },
    { maxWidth: 700 }
  )
  .addTo(map);
}

// 查询结果解析
function sqlResult(serviceResult) {
  // console.log(serviceResult);

  /*geoJSON数据解析*/
  resultLayer = L.geoJSON(serviceResult.result.features, {
    onEachFeature: (feature, layer) => {
      // if (feature.geometry.coordinates[0] > 10000) {
        // let latlng = L.CRS.EPSG3857.unproject(
        //   L.point(
        //     feature.geometry.coordinates[0],
        //     feature.geometry.coordinates[1]
        //   )
        // );
      //   latlng.alt = feature.geometry.coordinates[2];
        //  marker = L.marker(latlng).addTo(map);
        //  return latlng;
      //   // marker.bindPopup(`<b>SMID:</b> ${feature.properties.SMID}`).openPopup().addTo(map)
      // } 
      //else {
      //   layer.bindPopup(`<b>SMID:</b> ${feature.properties.SMID}`).addTo(map);
      // }

      // console.log(layer);
      // 创建对象

    },
    style: {
      
        weight: 10,
        color: "#fff",
        opacity:0.5
      
    },

    coordsToLatLng: function (coords) {
      // console.log(L.point(coords[0], coords[1]));
      let latlng = L.CRS.EPSG4326.unproject(L.point(coords[0], coords[1]));
      latlng.alt = coords[2];
        // console.log(latlng);
      return latlng;
    },
  });
  // 图表数据绑定
  resultBind(resultLayer,gnl_infor_date);

    // console.log(resultLayer);
}

// SQL查询要素
function sqlQuery(attributeFilter, datasetNames = []) {
  // sql查询参数
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: "",
      attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
    },
    datasetNames: datasetNames,
    toIndex: 238,
  });
  
  // sql查询服务
  L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, sqlResult);
}

// 默认展示第一天的天气信息地图
sqlQuery(gnl_infor_date, ["ChinaClimate:weather"]);
// 热力图
// gn_search.addEventListener("click",addHeatMapLayer)

gnl_search.addEventListener('click', () => {
  layerRemove();
  resultBind(resultLayer,gnl_infor_date)
  // sqlQuery(gnl_infor_date, ["ChinaClimate:weather"]);
  setTimeout(() => {
    // var n =L.layerGroup(resultLayer)
    // console.log(resultLayer);
  }, 3000);
});

day_tp_heat_search.addEventListener('click',()=>{
  layerRemove();
  //  console.log(index);
  tp_HeatMAP.addHeatMapLayer();
})

let layer=L.layerGroup(heatMapLayer)
let baseMap = {
  chinaMapLayer: chinaMapLayer,
};
let overMap = {
  layer: layer,
  // heatMapLayer:heatMapLayer
};
L.control.layers(baseMap, overMap).addTo(map);
// console.log(myMap)

```

```javascript
// 图表初始化
option = {
  legend: {
    data: ["降雨量", "径流量"],
    align: "left",
  },
  toolbox: {
    feature: {
      magicType: {
        type: ["stack", "tiled"],
      },
      saveAsImage: {
        pixelRatio: 2,
      },
    },
  },
  tooltip: {},
  xAxis: {
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    silent: false,
    splitLine: {
      show: false,
    },
  },
  yAxis: {},
  series: [
    {
      name: "bar",
      type: "bar",
      animationDelay: function (idx) {
        return idx * 10;
      },
    },
    {
      name: "bar2",
      type: "bar",
      animationDelay: function (idx) {
        return idx * 10 + 100;
      },
    },
  ],
  animationEasing: "elasticOut",
  animationDelayUpdate: function (idx) {
    return idx * 5;
  },
};
var div = L.DomUtil.create("div");
var chart = echarts.init(div, "", {
  width: 500,
  height: 300,
});
chart.setOption(option);

// 存储SQL查询到的数据
function sqlData(
  NAME,
  AQI,
  HUMIDITY,
  RAINFALL,
  WEATHER,
  TEMPERATURE,
  PM25,
  DATE_USER
) {
  this.NAME = NAME;
  this.weaher = {
    AQI: AQI,
    HUMIDITY: HUMIDITY,
    RAINFALL: RAINFALL,
    WEATHER: WEATHER,
    TEMPERATURE: TEMPERATURE,
    PM25: PM25,
    DATE_USER: DATE_USER,
  };
}

let myMap = [];

// 各个城市每日天气信息
let cityData = new Map();

// 整理SQL查询到的数据
function getData(myMap) {
  // let dt = [];

  // 临时存储对象
  function tmpObj(
    NAME,
    AQI,
    HUMIDITY,
    RAINFALL,
    WEATHER,
    TEMPERATURE,
    PM25,
    DATE_USER
  ) {
    this.NAME = NAME;
    this.AQI = AQI;
    this.HUMIDITY = HUMIDITY;
    this.RAINFALL = RAINFALL;
    this.WEATHER = WEATHER;
    this.TEMPERATURE = TEMPERATURE;
    this.PM25 = PM25;
    this.DATE_USER = DATE_USER;
  }
  // 、、、、

  for (let index = 0; index < myMap.length; index++) {
    let tmp = myMap[index].NAME;
    let temp = index;
    let AQI = [],
      HUMIDITY = [],
      RAINFALL = [],
      WEATHER = [],
      TEMPERATURE = [],
      PM25 = [],
      DATE_USER = [];
    let dx;
    for (temp; temp < myMap.length; temp++) {
      if (myMap[temp].NAME == tmp) {
        AQI.push(myMap[temp].weaher.AQI);
        HUMIDITY.push(myMap[temp].weaher.HUMIDITY);
        RAINFALL.push(myMap[temp].weaher.RAINFALL);
        WEATHER.push(myMap[temp].weaher.WEATHER);
        TEMPERATURE.push(myMap[temp].weaher.TEMPERATURE);
        PM25.push(myMap[temp].weaher.PM25);
        DATE_USER.push(myMap[temp].weaher.DATE_USER);
        // dt.push(myMap[temp])

        // console.log(myMap[temp].NAME);
      }
    }
    // 临时对象存储每个城市每天的天气信息
    dx = new tmpObj(
      tmp,
      AQI,
      HUMIDITY,
      RAINFALL,
      WEATHER,
      TEMPERATURE,
      PM25,
      DATE_USER
    );
    // dt.push(new Jsl(tmp, AQI, HUMIDITY));
    cityData.set(tmp, dx);
  }

  // console.log(cityData.get("北京市"));
}

//  数据绑定
function chartSet(layer) {
  // function (layer) {
  let city = layer.feature.properties.NAME;
  console.log(myMap);
  let data1 = cityData.get(city).HUMIDITY;
  let data2 = cityData.get(city).RAINFALL;
  chart.setOption({
    title: {
      text: city,
      subtext: "",
    },
    series: [
      {
        name: "降雨量",
        data: data1,
      },
      {
        name: "径流量",
        data: data2,
      },
    ],
  });
  return chart.getDom();
  // }
}

// 查询结果解析
function sqlResult(serviceResult) {
  // console.log(serviceResult);
  let i = 0;
  /*geoJSON数据解析*/
  resultLayer = L.geoJSON(serviceResult.result.features, {
    onEachFeature: (feature, layer) => {
      // if (feature.geometry.coordinates[0] > 10000) {
      //   let latlng = L.CRS.EPSG3857.unproject(
      //     L.point(
      //       feature.geometry.coordinates[0],
      //       feature.geometry.coordinates[1]
      //     )
      //   );
      //   latlng.alt = feature.geometry.coordinates[2];
      //    marker = L.marker(latlng).addTo(map);
      //    return latlng;
      //   // marker.bindPopup(`<b>SMID:</b> ${feature.properties.SMID}`).openPopup().addTo(map)
      // } else {
      //   layer.bindPopup(`<b>SMID:</b> ${feature.properties.SMID}`).addTo(map);
      // }

      // console.log(feature);
      // 创建对象
      myMap[i] = new sqlData(
        feature.properties.NAME,
        feature.properties.AQI,
        feature.properties.HUMIDITY,
        feature.properties.RAINFALL,
        feature.properties.WEATHER,
        feature.properties.TEMPERATURE,
        feature.properties.PM25,
        feature.properties.DATE_USER
      );
      i++;
    },
    style: {
      
        weight: 10,
        color: "#fff",
        opacity:0.5
      
    },

    coordsToLatLng: function (coords) {
      let latlng = L.CRS.EPSG3857.unproject(L.point(coords[0], coords[1]));
      latlng.alt = coords[2];
      //   console.log(latlng);
      return latlng;
    },
  });
  getData(myMap);

  // 图表数据绑定

  resultLayer
    .bindPopup(
      function (layer) {
        let city = layer.feature.properties.NAME;
        console.log(city);
        // let data1 = cityData.get(city).HUMIDITY;
        // let data2 = cityData.get(city).RAINFALL;
        return `<b>城市:</b>${city}<br>
        <b>相对湿度:</b>${cityData.get(city).HUMIDITY[0]}<br>
        <b>本日降雨量:</b>${cityData.get(city).RAINFALL[0]}<br>
        <b>AQI:</b>${cityData.get(city).AQI[0]}<br>
        <b>PM2.5浓度:</b>${cityData.get(city).PM25[0]}<br>
        <b>温度:</b>${cityData.get(city).TEMPERATURE[0]}<br>
        <b>天气:</b>${cityData.get(city).WEATHER[0]}<br>
        <b>日期:</b>${cityData.get(city).DATE_USER[0]}<br>
        `;
      },
      { maxWidth: 700 }
    )
    .addTo(map);
}

// SQL查询要素
function sqlQuery(attributeFilter, datasetNames = []) {
  // sql查询参数
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: "",
      attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
    },
    datasetNames: datasetNames,
    toIndex: 238,
  });

  // sql查询服务
  L.supermap.featureService(dataurl).getFeaturesBySQL(sqlParam, sqlResult);
}

// sqlQuery(gnl_infor_date, ["ChinaClimate:weather"]);
// 热力图
// gn_search.addEventListener("click",addHeatMapLayer)

addHeatMapLayer();

let baseMap = {
  chinaMapLayer: chinaMapLayer,
};
let overMap = {
  heatMapLayer: heatMapLayer,
};
// console.log(gnl_infor_date);

gn_search.addEventListener("click", () => {
  if(resultLayer!=null){
    
    resultLayer.remove();
  }
  
  sqlQuery(gnl_infor_date, ["ChinaClimate:weather"]);
  console.log(myMap);
});
L.control.layers(baseMap, overMap).addTo(map);
// console.log(myMap)

```

气温热力图

```javascript
// 热力图基本设置

// 本地CSV数据转换为geojson数据
function geojson(params) {
  let geojson = {
    type: "FeatureCollection",
    features: [],
  };
  for (const [key, value] of cityData) {
    // console.log(value.lng,value.lat);
    let index = timeTransfer(tp_heat_infor_date);
    let feature = {
      type: "feature",
      geometry: {
        type: "Point",
        coordinates: [],
      },
      properties: {
        value: parseFloat(value.TEMPERATURE[index]),
      },
    };
    // let latlng = L.CRS.EPSG4326.latLngToPoint(L.latLng(value.lng, value.lat));
    // console.log(latlng);
    feature.geometry.coordinates = [parseFloat(value.lng), parseFloat(value.lat)];
    let latlng = [value.lat, value.lng];
    // console.log(index);
    L.marker(latlng)
      .bindPopup(
        `
      城市：${key}<br>
      气温：${value.TEMPERATURE[index]}°<br>
      日期：${tp_heat_infor_date}`
      )
      .addTo(map);
    geojson.features.push(feature);
  }
  heatMapLayer.addFeatures(geojson);
  heatMapLayer.addTo(map);
}

// 
class HeatMap {
  addHeatMapLayer() {
    heatMapLayer = L.supermap.heatMapLayer(
      "heatMap",
      {
        loadWhileAnimating: true,
      },
      {
        colors: ["blue", "cyan", "lime", "yellow", "red"],
      },
      {
        id: "heatmap",
        map: map,
        radius: 45,
        // useGeoUnit:true,
        opacity: 0.5,
        featureWeight: "value",
      }
    );
    geojson();
    // console.log(cityData.get("北京市"));
  }
}
let tp_HeatMAP = new HeatMap();

```

Isogram

```javascript
// 等值线类
class Isogram {
  constructor(layername) {
    this.layername = layername;
  }
  surfaceAnalystProcess(zValueFieldName, attributeFilter) {
    /*
   X:7714861.994943,Y:6903997.060186   经度:69°18'13.62",纬度:52°34'14.85" 左上
   X:7722476.375537,Y:2007950.338151   经度:69°22'19.87",纬度:17°44'49.01" 左下
   X:14628719.574426,Y:6835467.634838   经度:131°24'43.29",纬度:52°11'42.13" 右上
   X:14491660.723731,Y:1992721.576963   经度:130°10'50.89",纬度:17°36'59.79" 右下
   软件坐标系 右 X 下 Y
   坐标系上 X 右 Y
  */
    let region = L.polygon([
      [7095467.634838, 8014861.994943],
      [2007950.338151, 8014861.994943],
      [2007950.338151, 15191660.723731],
      [7095467.634838, 15191660.723731],
    ]);
    // 表面分析参数
    surfaceAnalystParameters = new SuperMap.DatasetSurfaceAnalystParameters({
      extractParameter: new SuperMap.SurfaceAnalystParametersSetting({
        datumValue: 0, //基准值
        interval: 2, // 等值距
        resampleTolerance: 0, // 采样容限
        smoothMethod: SuperMap.SmoothMethod.BSPLINE,
        smoothness: 3,
        clipRegion: region,
      }),
      dataset: "weather@ChinaClimate",
      resolution: 9000, // 分辨率
      zValueFieldName: zValueFieldName,
      filterQueryParameter: new SuperMap.FilterParameter({
        attributeFilter: "date_User='" + attributeFilter + " 0:00:00'",
      }),
    });
    // 空间分析服务
    surfaceAnalystService = L.supermap.spatialAnalystService(serviceUrl);
    // 表面分析
    surfaceAnalystService.surfaceAnalysis(surfaceAnalystParameters, function (serviceResult) {
      var result = serviceResult.result;
      console.log(result);
      if (result && result.recordset && result.recordset.features) {
        isogramlayer = L.geoJSON(result.recordset.features, {
          weight: 3,
          style: (feature) => {
            console.log(feature.properties.dZvalue);

            if (feature.properties.dZvalue > 0 && feature.properties.dZvalue < 10) {
              L.polyline(feature.geometry.coordinates, {
                color: "#7879b0",
              })
                .bindPopup(feature.properties.dZvalue)
                .addTo(map);
              return {
                color: "#f1e0ab",
              };
            } else if (feature.properties.dZvalue >= 10 && feature.properties.dZvalue < 25) {
              return {
                color: "#b0cda1",
              };
            } else if (feature.properties.dZvalue >= 25 && feature.properties.dZvalue < 50) {
              return {
                color: "#a5ba81",
              };
            } else if (feature.properties.dZvalue >= 50 && feature.properties.dZvalue < 100) {
              return {
                color: "#8dc4e1",
              };
            } else if (feature.properties.dZvalue >= 100 && feature.properties.dZvalue < 250) {
              return {
                color: "#8eacd6",
              };
            } else {
              return {
                color: "#7879b0",
              };
            }
            // return true;
          },
        }).addTo(map);
      } else {
        alert("图层未加载成功，请刷新重试");
      }
    });
  }
}

rain_isogram = new Isogram("rain");
tp_isogram = new Isogram("temprature");

// surfaceAnalystProcess("temperature");

day_rain_isogram_search.addEventListener("click", () => {
  layerRemove();
  rain_isogram.surfaceAnalystProcess("rainfall", rain_isogram_infor_date);
  // surfaceAnalystProcess("temperature");
});

day_tp_isogram_search.addEventListener("click", () => {
  layerRemove();
  tp_isogram.surfaceAnalystProcess("temperature", tp_isogram_infor_date);
  setTimeout(() => {
    console.log(isogramlayer);
  }, 3000);
});

```


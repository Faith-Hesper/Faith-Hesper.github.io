window.config = {
    url: "http://10.1.100.62:8089/assess/",
    serverUrl: 'http://172.16.30.127:8890',
    serverUrl2: 'http://jzyj.piesat.cn:10004',
    fileServer: 'http://jzyj.piesat.cn:10004/fileview/onlinePreview?url=',
    fileServerInnerIp: 'http://10.1.100.152:8866',
    knowledgeServer: 'http://192.168.52.9:8866',
    proxy: '/webApi',

    city: '上海市',
    county: '普陀区',
    Authorization: 'loginName=admin',
    center: [121.397824, 31.254974],
    zoomLevel: 13.9,
    mapType: "gd", //tdt 天地图  gd高德 geoq 智图 google 谷歌
    mapUrl: {
        nw: {},
        ww: "http://t0.tianditu.gov.cn/",
        gd: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1",
        geoq: "http://map.geoq.cn/arcgis/rest/services/",
        google: "http://www.google.cn/maps/vt"
    },
    ifWw: true, //内网标志开关：false 内网   true 外网
    // tdtToken: "f48d91fe78765d6f57475c87e8a244f2",
    tdtToken: "a07362cc85697ffa7799ed3fabec892d",

    // xzqLayerServer: "http://124.70.84.120/geoserver/JingAn/wms",
    xzqLayerServer: "http://jzyj.piesat.cn:10004/geoserver/fxpc_xh/wms",
    xzqLayerName: "fxpc_xh:xzq_ptq_bj",
    // xzqLayerName: "JingAn:xzq"
    cesiumAccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZGVjZTFmZS01ZjcxLTQ0ODEtYmE0Ni04ODQ3ZTUzNTM1M2MiLCJpZCI6MTA1MTc0LCJpYXQiOjE2NjA4MTQ0MTR9.VZ8G_wFCQ-RiV0WOcgzcOYo_tY2UmRYugKSB2OEQrB4',

    devInit3Dtiles: true, // 开发环境是否加载 3Dtiles 模型
    devInit3DModel: true, // 开发环境是否加载 3D model 模型
    local3Dtiles: true, // 本地倾斜摄影数据
    setModelAlpha: false, // 点击模型部件展示高亮效果
    showRiverWater: true, // 是否展示河流水位

    // http://10.1.100.152:8866/juntun3d/3dtilesc1212/merge_tile.json
    // /juntun3d/3dtilesc1212/tileset.json
    juntun3DtilesUrl: '/juntun3d/3dtilesc1212/merge_tile.json', // 军屯3D倾斜模型地址
    juntun3DtilesOsgb: '/juntunosgb/tileset.json', // 军屯3D倾斜模型地址
    juntunRiverUrl: '/map/TZ3.geojson', // 北运河河流面数据
    //  http://10.1.100.55:6080/arcgis/rest/services/juntun/juntun5m/MapServer
    juntunMapServer: '/arcgis/rest/services/juntun/juntun5m/MapServer',
    juntunModelUrl: '/map/bim20250115.glb',
    local3DtilesUrl: 'http://localhost:9066/moxing/通州模型成果/OSGB有水面/tilesc/merge_tile.json',
    // 字典类型
    dictObject: {
        AssetType: 'asset_type', // 资产类型
        DeviceType: 'device_type', // 设备设施类型
        DeviceStatus: 'device_status', // 设备设施状态
        GcCheckFrequency: 'gc_check_frequency', // 检查周期
        DictGcApprovemethod: 'dict_gc_approvemethod', // 处理方式
        DictZhaDescinfo: 'dict_zha_descinfo', // 资产应用
    },
    // 读取流程：部署标识
    DeployId: 'a8ee1cf9-c436-11ef-8441-024212c55398',
    // 和风天气API
    weatherKEY: 'eb1a7349b95f456e8c719b000d6c1bd3', // 和风天气key
    weatherURL: 'https://devapi.qweather.com/v7/weather/now', // 和风天气实时天气
    weatherDayURL: 'https://devapi.qweather.com/v7/weather/3d', // 和风天气3天天气
    weatherWarnURL: 'https://devapi.qweather.com/v7/warning/now', // 和风天气灾害预警
    WeatherLocation: '101010600', // 天气-地区
}
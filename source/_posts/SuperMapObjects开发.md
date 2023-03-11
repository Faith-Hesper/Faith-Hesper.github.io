---
title: SuperMapObjects开发
date: 2021-11-26 19:46:27
tags: SuperMapObjects
categories:
description: SuperMapObjects开发
---

# SuperMapObjects

## 工作空间(SuperWorkspace)

### 概念

+ SuperWorkspace工作空间控件创建

+ 扩展名为*.smw

+ 系统初始会创建一个空的工作空间

  <div class="danger">


  > 该工作空间不存在数据源、地图和布局，只有系统默认的资源

  </div>

![](https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20211125210757.png)


![image-20211125215343863](https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20211125215344.png)

![](https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20211202132028.png)

![](https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20211202132402.png)

### 方法
方法
<div class="warning">

> SuperWorkspace 为SuperWorkspace(工作空间) 控件的实际Name值
>
> SuperWorkspaceManager 为SuperWorkspaceManager(工作空间管理器) 控件的实际Name值
>
> SuperMap 为SuperMap(地图) 控件的实际Name值
>
> SuperLengend 为SuperLengend(图例管理器) 控件的实际Name值

</div>

1. 打开

```c#
/*SuperWorkspace 为SuperWorkspace 控件的实际Name值
Open()两个重载
Open(strOpenPath) 文件路径
Open(strOpenPath,password) 设置密码
Open() 返回值为bool类型值

OpenDataSource()1个重载
OpenDataSource(strSavePath, strAlias, seEngineType.sceSDBPlus, false) 数据源存储路径、数据源别名、引擎类型、是否只读
OpenDataSource() 返回值为soDataSource 数据源类型对象

*/
SuperWorkspace.Open()	// 打开工作空间
SuperWorkspace.OpenDataSource()	// 打开数据源
/*控件关联
工作空间--->地图
工作空间--->3D
工作空间--->工作空间管理器
地图--->图例管理器
*/
this.SuperWorkspace.Open(strOpenPath);	// 打开
private void ConnectSuperMap()
{
    object objWSHandle = this.SuperWorkspace.ObjectHandle; //工作空间
    object objMapHandle = this.SuperMap.CtlHandle; //地图
    this.Super3D.Connect(objWSHandle);	// 将3D控件与工作空间关联
    this.SuperMap.Connect(objWSHandle);	    // 将地图与工作空间关联
    this.SuperWkspManager.Connect(objWSHandle);	//将关联工作空间管理器控件与工作空间控件
    this.SuperLegend.Connect(objMapHandle);	//将图例管理器与地图控件关联
}
```

2. 保存

```c#
/*
Save()无参数
SaveAs()两个重载
SaveAs(strSavePath, true) 设置另存路径、是否覆盖原有文件
SaveAs(strSavePath, true, format, "") 设置另存路径、是否覆盖原有文件、形式、密码
SaveAs() 返回值为bool类型值
*/
SuperWorkspace.Save()	// 保存工作空间
SuperWorkspace.SaveAs()	//另存工作空间
```

3. 创建

```c#
/*
Create()两个重载
Create(strSavePath, TempFileName, false) 设置存储路径、临时文件路径、是否覆盖原有文件
Create(strSavePath, TempFileName, false, "") 设置存储路径、临时文件路径、是否覆盖原有文件、密码
Create() 返回值为bool类型值

CreateDataSource()1个重载
CreateDataSource(strSavePath, strAlias, seEngineType.sceSDBPlus, false, false, false, "") 设置数据源存储路径、数据源别名、引擎类型、是否事务、是否独占、是否加密、密码
Create() 返回值为soDataSource 数据源类型对象
*/
SuperWorkspace.Create()	// 创建工作空间
SuperWorkspace.CreateDataSource()	// 新建数据源
```

4. 关闭

```c#
SuperWorkspace.Close()	// 关闭工作空间
/*关闭工作空间实例
1.使用完记录集应及时关闭
2.关闭地图控件之前，先把地图的全部图层清除
3.关闭工作空间控件之前，先关闭所有使用工作空间控件中数据的控件(SuperMap控件、Super3D控件、SuperWorkspaceMannger控件)
*/
private void closeWspace()
{
	// 清除图层
	soLayers objLys = this.SuperMap.Layers;
	if(objLys.Count !=0 && objLys.Count != null)
	{
    	objLys.RemoveAll();	// 清除所有图层
    	this.SuperMap.Refresh();
	}
	System.Runtime.InteropServices.Marshal.ReleaseComObject(objLys);
	objLys = null;
	soDataSources objDss = this.SuperWorkspace.Datasources;
	if(objDss != null && objDss.Count != 0)
	{
    	objDss.RemoveAll();
	}
	System.Runtime.InteropServices.Marshal.ReleaseComObject(objDss);
	this.DisconnectSuperMap();
}
/*控件的断开
程序退出之前，除要释放全局变量外，还需按顺序断开控件连接
*/
private void FormClose()
{
    this.Super3D.Disconnect();
    this.SuperLengend.Disconnect();
    this.SuperMap.Disconnect();
    this.SuperMap.Close();
    this.SuperWorkspaceManager.Disconnect();
    this.SuperWorkspace.Close();
}
```

5. 获取

```c#
SuperWorkspace.GetWorkspaceName();	// 获取当前工作空间对应的文件名
```

### 属性

1. Handle 属性

   > **用于指定Supermap与SuperWorkspace的连接**，即使地图与工作空间连接，使其能从工作空间获取数据。返回值为工作空间的句柄

2. Datasources 数据源的集合

   > 返回数据源集合对象(**soDatasources**)，只读属性。工作空间中**有且仅有一个**soDatasources对象，使用数据源都存放在当中

3. Maps 属性	

   > 返回SuperWorkspace的地图名集合对象 (**soMaps**)

4. Layouts 属性

   > 返回SuperWorkspace的布局名集合对象 (**soLayouts**)

5. Resoures 属性

   > 返回SuperWorkspace的资源对象 (**soResoures**)

6. Modified 属性

   > 返回数据源是否有改动，返回值为 bool 类型的值



## 地图(soMaps)

### 概念

+ **地图由一个或多个图层组成**，**存储于工作空间中**

+ 保存地图必须把工作空间同时保存下来

+ 地图中没有存储数据集

+ **地图中的数据来源于数据源**

  > Map对象保存的是当前地图窗口中地图所打开的**数据集的索引**、**地图风格设置**、**地图显示范围等信息**
  >
  > 保存时所用的地图名称必须与当前工作空间中已有的地图名不同，否则会保存失败
  >
  > 保存地图后，还需保存工作空间
  
  > 在制作地图并保存后，如将对应的数据源删除，则相应的地图也会清除

![image-20211126211212542](https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20211126211212.png)

### 方法

1. 地图浏览

```c#
/*SuperMap 为实际添加的 SuperMap Ctrl控件的Name值
ViewEntire();	//全图显示
Close();	// 关闭地图窗口
Connect();	// 建立SuperMap与SuperWorkspace控件的连接(bool)
Disconnect();	// 断开SuperMap与SuperWorkspace控件的连接
OpenMap(strSavePath);	// 打开工作空间中保存的地图(bool)
SaveMap();	// 保存工作空间中保存的地图(bool)
SaveMapAs(strSavePath);	// 另存地图(bool)
Refresh()	// 刷新地图窗口
Zoom(num)	// num>1放大或num<1缩小地图窗口
*/
this.SuperMap.ViewEntire();	//全图显示
this.SuperMap.Close();	// 关闭地图窗口
this.SuperMap.Connect();	// 建立SuperMap与SuperWorkspace控件的连接
this.SuperMap.Disconnect();	// 断开SuperMap与SuperWorkspace控件的连接
this.SuperMap.OpenMap(strSavePath);	// 打开工作空间中保存的地图
this.SuperMap.SaveMap();	// 保存工作空间中保存的地图
this.SuperMap.SaveMapAs(strSavePath);	// 另存工作空间中保存的地图
this.SuperMap.Refresh()	// 刷新地图窗口
this.SuperMap.Zoom(num)	// 放大或缩小地图窗口
```

### 属性

地图浏览

```c#
/*!important
SuperMap.Action 返回/设置对SuperMap 控件的当前操作状态
(SuperMap.ViewEnire())
*/
this.SuperMap.Action
this.SuperMap.Action = seAction.scaZoomIn;   // 放大(scaZoomIn)
this.SuperMap.Action = seAction.scaZoomOut;	// 缩小(scaZoomOut)
this.SuperMap.Action = seAction.scaZoomFree;  // 自由缩放(scaZoomFree)
this.SuperMap.Action = seAction.scaPan;  // 漫游(scaPan)
this.SuperMap.Action = seActionscaSelect;	//点选(scaSelect)
this.SuperMap.Action = seAction.scaRectSelect;	//矩形方式选(scaRectSelect)
this.SuperMap.Action = seAction.scaCircleSelect;	//圆形选(scaCircleSelect)
this.SuperMap.Action = seAction.scaRegionSelect;	//多边形选(scaRegionSelect)
/*Bounds 返回值为 soRect类型对象 (SuperMap 地图的坐标范围)
ViewBounds 返回值为 soRect类型对象 (SuperMap 地图的可视范围)
CenterX、CenterY 返回值为 Double类型 (SuperMap 地图窗口的中心点坐标)
*/
SuperMap.Bounds	// 地图坐标范围(Bounds)
SuperMap.ViewBounds	// 可视地图范围(Bounds)
SuperMap.CenterX	// 返回/设置SuperMap地图窗口的中心点X坐标值(CenterX)
SuperMap.CenterY	// 返回/设置SuperMap地图窗口的中心点Y坐标值(CenterY)
/* !important
Layers 返回值为 soLayers类型对象 (SuperMap 地图窗口的图层集合)
Selection 返回值为 soSelection类型对象 (SuperMap 被选中的空间对象集合)
Modified 返回值为 Bool类型值
*/
SuperMap.Layers	// 图层集合(Layers)
SuperMap.Selection	// 返回/设置SuperMap 地图窗口中被选中的空间对象集合(Selection)
soSelection objSelection = this.SuperMap.selection;	// 获取数据集
SuperMap.Modified	// 返回地图窗口中的数据、图层以及显示是否被修改(Modified)
```

## 工作空间管理器(SuperWkspManager)

统一管理SuperWorkspace中的所有资源，以**树的方式**显示工作空间中的所有资源，如**数据源、数据集、地图、布局、符号库和线型库**等

1. seSelectedItemFlag 常量

```c
scsDatasource	// 选中数据源
scsDataset	// 选中数据集
scsSubDataset	// 选中子数据集
scsMap	// 选中地图
scsLayout	// 选中布局
scsSene	// 选中三维场景
scsLayer	// 选中图层
scsSymboLib	// 选中符号库
scsLineStyleLib	// 选中线型库
scsFillStyleLib	// 选中填充库
scsNothing	// 没有任何节点选中
```

2. strSelected 选中项的文本

   如果选中的是数据源，则返回数据源的别名；如果是数据集或者地图、布局则是其名称

3. strParent 选中项的父节点名称

   对数据集来说就是数据源的别名，其他类型选中则参数无效

### 事件

1. LDbClick 工作空间管理器窗口双击

```c#
/*
工作空间-->数据源集合--->数据源-->数据集集合-->数据集
*/
private void axSuperWkspManager1_LDbClick(object sender, AxSuperWkspManagerLib._DSuperWkspManagerEvents_LDbClickEvent e)
{
	switch (e.nFlag)
    {
        // 双击数据集名称
        case seSelectedItemFlag.scsDataset:
            soDataSuorces objDss = axSuperWorkspace.Datasources;	// 获取工作空间中的数据源集合
            soDataSource objDs = objDss[e.strParent];	// 通过当前选中数据集的父节点获取数据集所在数据源
            soDatasets objDts = objDs.Datasets;	// 获取该数据源下的数据集集合
            soDataset objDt = objDts[e.strSelected];	// 通过当前选中数据集名称获得该数据集
            soLayers objLys = axSuperMap.Layers;	// 获取地图窗口的图层集合
            soLayer objLy = objLys.AddDataset(objDt,true);	// 添加指定数据集到地图窗口
            axSuperMap.Refresh();
            break;
        // 双击地图名称
        case seSelectedItemFlag.scsMap:
            soLayers objLys = axSuperMap.Layers;
            objLys.RemoveAll();	//移除地图窗口所有图层
            axSuperMap.OpenMap(e.strSelected)	// 打开所双击的地图
            axSuperMap.Refresh();
            break;
        // 双击点符号
        case seSelectedItemFlag.scsSymboLib:
            axSuperWorkspace1.Resources.SymbolLib.ShowEditor();	// 显示点符号编辑器
            break;
        // 双击地线符号
        case seSelectedItemFlag.scsLineStyleLib:
            axSuperWorkspace1.Resources.LineStyleLib.ShowEditor();	// 显示线符号编辑器
            break;
        // 双击填充符号
        case seSelectedItemFlag.scsFillStyleLib:
            axSuperWorkspace1.Resources.FillStyleLib.ShowEditor();	// 显示填充符号编辑器
            break;
    }
 }
```



## 数据源(soDataSource)

数据源是存储空间数据的场所。空间数据存放于数据源中，**任何对空间数据的操作**都需要先**打开或者获得**数据源
	空间数据的存储方式有两种:

> *文件存储与关系数据库存储*

## 数据集(soDataset)

1. 数据集

+ 数据集是SuperMap Objects**基本组织单位**
+ 一个数据源通常由多个不同类型数据集组成
+ 分为栅格数据集、矢量数据集、非空间数据集(属性数据集)

2. **获取数据集方法**

+ 从数据源获取
+ 从工作空间获取
+ 从打开的图层获取
+ 从选择集获取

![](https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20211201160335.png)

### 记录集(soRecordset)

+ 记录是处理和存储实体信息的基本单位，记录的集合叫记录集
+ **每一个矢量数据集对应一个完整的记录集，每一个空间几何对象对应一条记录**

## 图层(soLayer)

+ 一个图层必然对应一个数据集
+ 同一个**数据集可以对应多个图层**
+ **数据集的显示**是在地图窗口中以**图层的方式显示**

![](https://note-1306141435.cos.ap-beijing.myqcloud.com/img/20211125212307.png)

## 布局(soLayout)

+ SuperLayout控件创建

  > 确切的说,把一个或者多个地图放置在SuperLayout布局窗口中，并辅以其他的辅助制图要素如图名﹑图例就成为布局

+ 布局主要用于**空间数据的输出**

+ 一个工作空间可以有多个布局

+ 同地图保存一样，**布局的保存依赖于工作空间保存**


## 三维场景(soScenes)

主要存放保存的三维地图窗口。**三维场景地图由一个或多个三维图层组成，存储于工作空间中**。三维图层用so3DLayer表示，一个三维地图窗口上可以添加多个图层，即so3DLayers

## 资源(soResoures)

+ 存放了系统中打开和制作的符号、线型和填充符
+ 资源用于管理符号库( **soSymbolLib** )、线型库( **soLineStyleLib** )和填充库( **soFillStyleLib** )
+ 线型库文件 后缀(*.lsl)、符号库文件 后缀(*.sym)

## 几何对象(soGeometry)

1. 几何对象

+ 点、线、面、文本、复合几何对象、参数化几何对象

2. soGeometry 获得途径

+ 从记录集中获取
+ 从符号转化而来
+ 从参数化的几何对象通过ConvertToLine或者ConvertToRegion方法转化而来


+ 选择题30分 15题 设计 开发(方法、参数、返回值)
+ 简答题30分 5题
+ 编程题40分 4题 5个句子

---
title: SQL查询
date: 2021-07-05 19:13:32
categories: [GIS,SQL] 
tags: GIS
description: SQL查询
---

```sql
select < 属性列表 attribute list >

from < 关系表 relation >

where < 条件 condition >

AND (交集) OR(并集) XOR(异或) NOT (补集)
```

### 模糊查询



部分匹配 *

+ 数据集属性名 Like "a*"

完全匹配

+ 数据集属性名 Like "Beijing"

单字匹配 ？

+ 数据集属性名 Like "A?"

### 查询特定值

+ in，确定表达式的值是否等于指定列表内若干值中任意一个值
+ 数据集属性名 in (1,4)

### 派生字段

+ as 取临时字段名

  

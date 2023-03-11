---
title: mysql数据库
date: 2021-11-23 14:24:38
tags: [sql]
categories: 
description: mysql基本命令
---

## 基本操作命令

### 1. 基本介绍

+ `\G`格式化输出
+ `\S`查看服务端信息
+ `\c`结束命令输入操作
+ `\q`退出当前sql命令行模式
+ `\h`查看帮助

### 2. 操作数据库步骤

1. 连接MySQL

   ```sql
   mysql -h localhost -u root -p
   ```

2. SQL语句可以换行，以分号结尾

   ```sql
   select * from test;
   ```

3. 命令不区分大小写，关键字和函数建议用大写

   ```sql
   SELECT * FROM user WHERE uid=17;
   ```

4. 如果提示符为 '> 那么需要输入一个'回车

5. 命令打错了换行后不能修改, 可以用 \c 取消

### 3. 数据库操作

```sql
## 查看数据库
show databases;
## 创建数据库
create database 库名 default charset=utf8;
## 删除数据库
drop database 库名;
## 打开数据库
use 库名;
```

### 4. 数据表操作

+ 创建表

```sql
create table 表名 (字段名 字段类型);
## 如果表不存在,则创建, 如果存在就不执行这条命令
create table if not exists 表名(字段1 类型,字段2 类型);
## 复制表结构及数据
create table 新表 as select * from 旧表;
## 复制表结构不要数据
create table 新表 as select * from 旧表 where 2<>2;
create table 表名(字段名，类型，[字段约束]，字段名，类型，[字段约束])；
## 以下创建一个 users 的表 
create table users( 
    # 创建ID字段，为正整数，不允许为空 主键，自动递增 
    id int unsigned not null primary key auto_increment, 

    # 创建 存储 名字的字段，为字符串类型，最大长度 5个字符，不允许为空 
    username varchar(5) not null, 

    # 创建存储 密码 的字段，固定长度 32位字符， 不允许为空 
    # 数据库在存储用户密码时通常存储的是加密后的密码 使用md5加密算法后 密码均为32位 所以这里固定长度为32
    password char(32) not null, 

    # 创建 年龄 字段，不允许为空，默认值为 20 
    age tinyint not null default 20 

)engine=innodb default charset=utf8; 
```

+ 查看表

```sql
show tables;
## 查看指定用户下所有表(用户名必须大写)
select 表名 from all_table where owner = upper('用户名');
## 查看表结构
desc 表名;
## 查看建表语句
show create table users;
```

+ 删除表

```sql
drop table 表名;
```

+ 修改表

```sql
## 增加字段
alter table 表名 add (字段名称 字段类型);
## 修改字段
alter table 表名 modify (字段名称 字段类型);
alter table 表名 change (字段名称 字段类型);
## 修改表名
alter table 原表名 rename as 新表名
# 修改表引擎语句 
alter table users engine = 'myisam';
## 删除字段
alter table 表名 drop column 字段名称;
```



### 5. 数据操作

+ 插入

```sql
insert into 表名(字段1,字段2,字段3) values(值1,值2,值3);
insert into 表名(字段1,字段2,字段3) values(a值1,a值2,a值3),(b值1,b值2,b值3);
```

+ 查询

```sql
## 查询所有字段
select * from 表名;
select 字段1,字段2,字段3 from 表名;
select * from 表名 where 字段=某个值;
select  from MyClass order by id limit 0,2; 
```

+ 修改

```sql
update 表名 set 字段=某个值 where 条件;
update 表名 set 字段1=值1,字段2=值2 where 条件;
update 表名 set 字段=字段+值 where 条件;
```

+ 删除

```sql
## 删除字段
delete from 表名 where 字段=某个值;
```

### 6. 类型约束和运算

#### 1. 字段约束

1）unsigned 无符号(给数值类型使用，表示为正数，不写可以表示正负数都可以)

2）字段类型后面加括号限制宽度

+ char(5) varchar(7) 在字符类型后面加限制表示字符串的长度
+ int(4) 没有意义，默认无符号的int为int(11)，有符号的int(10)
+ int(4) unsigned zerofill只有当给int类型设置有前导零时，设置int的宽度才有意义。

3）not null 不能为空，在操作数据库时如果输入该字段的数据为NULL ，就会报错

4）default 设置默认值

5）primary key 主键不能为空,且唯一.一般和自动递增一起配合使用。

6）auto_increment 定义列为自增属性，一般用于主键，数值会自动加1

7）unique 唯一索引(数据不能重复:用户名)可以增加查询速度,但是会降低插入和更新速度

#### 2. 主键

#### 3. 运算符

+ 算术运算符：+、 -、 *、 /、 %
+ 比较运算符：=、 >、 <、 >=、 <=、!=
+ 数据库特有的比较：in、not in、is null、is not null、like、between、and
+ 逻辑运算符：and、or、not
+ like：支持特殊符号%和_ 

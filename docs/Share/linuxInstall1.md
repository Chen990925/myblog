---
group: linux下软件安装
title: Linux安装java环境
order: 1
---

# Linux安装java环境

下载jdk8 oracle https://www.oracle.com/java/technologies/downloads/#java8

## 1.创建一个文件夹用于存放 java 的压缩包

一般放在 `/usr/local` 下

<img src="D:\Java\project\myblog\public\images\image-20240423000459866.png" alt="image-20240423000459866" style="zoom: 33%;" />

## 2.包下载好的 jdk 拖到 java 文件夹

<img src="D:\Java\project\myblog\public\images\image-20240423000939795.png" alt="image-20240423000939795" style="zoom: 33%;" />

## 3.安装 jdk

指令 `tar -zxvf jdk-8u411-linux-x64.tar.gz` 表示解压我对应的 jdk 版本

<img src="D:\Java\project\myblog\public\images\image-20240423001223370.png" alt="image-20240423001223370" style="zoom:33%;" />

安装完成

**还有很多其他方法**

## 其他方法

1. 下载对应的rpm安装包然后执行rpm -ivh jdk-8u411-linux-x64.rpm

2. yum安装

   搜索 java 的 jdk 版本 `yum list | grep java-1.8.0-openjdk`

   <img src="D:\Java\project\myblog\public\images\image-20240423001430612.png" alt="image-20240423001430612" style="zoom:50%;" />

   直接安装：yum install java-1.8.0-openjdk-devel.x86_64 -y



## 4.配置环境变量

输入指令 `vi /etc/profile` 打开配置文件

在末尾追加

```shell
JAVA_HOME=/usr/local/java/jdk1.8.0_411
CLASSPATH=%JAVA_HOME%/lib:%JAVA_HOME%/jre/lib
PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin
export PATH CLASSPATH JAVA_HOME
```

保存编辑并退出



## 5.让配置生效

输入指令 `source /etc/profile` 即可



## 6.验证是否配置成功

输入指令 `java -version`，出现如下图表示配置成功

<img src="D:\Java\project\myblog\public\images\image-20240423002014001.png" alt="image-20240423002014001" style="zoom:50%;" />
---
group: linux学习
title: 网络知识与安装部分
order: 1
---

# linux学习指南

## 网络相关

### 四个重要配置

​	在网络连接设置中，配置**IP地址、子网掩码、默认网关和DNS服务器是设置网络连接的基本步骤**。配置正确的IP地址、子网掩码和默认网关是保证主机正确通信的基础，而**配置正确的DNS服务器则能够确保主机能够正确解析域名**

**IP地址**

IP地址是一种逻辑地址，用来**标识**网络中一个个主机

IP地址 = 网络地址+主机地址

IP地址是一个4*8bit(1字节) 由 0/1 组成的数字串(IP4协议)



**子网掩码NETMASK**
子网掩码只有一个功能，就是将IP地址划分为网络地址和主机地址两部分。

用于指示一个IP地址的哪些部分代表网络号，哪些部分代表主机号的掩码。子网掩码的长度与IP地址长度相同，通常为32位或128位。子网掩码中的“1”表示网络号，而“0”表示主机号

> 子网掩码与ip地址进行**与运算**得到的就是网络地址，剩下的就是主机地址



**默认网关GATEWAY**

是网络中的一个设备，通常是路由器或交换机，用于连接一个网络与其他网络或Internet。当主机要访问不在**本地网络**的目标时，它会将**数据包发送到默认网关，由默认网关进行转发**

网关地址就是网关设备的IP地址

> 如果本来地址是192.168.205.8改成192.168.206.8则会找不到本地网络导致无法连接
>
> 
>
> 为什么我们自己设置地址不要设置成255，0或1
>
> 1. **255：**在IPv4中，IP地址中某一段为255表示广播地址。如果将主机的IP地址中某一段设置为255，则该主机发送的数据包将会被发送到同一网络中的所有主机，这可能导致网络流量增加和安全性问题。
> 2. **0：**在IPv4中，IP地址中某一段为0表示网络号。通常情况下，将主机的IP地址中某一段设置为0是不允许的，因为这个地址被保留用于表示整个网络。
> 3. **1：**在IPv4中，IP地址中某一段为1通常表示子网号。同样地，将主机的IP地址中某一段设置为1可能会与子网地址冲突。



**DNS（Domain Name System）**

用于将**域名解析为IP地址的分布式数据库系统**。它充当了互联网上域名和IP地址之间的映射关系，当我们在浏览器中输入一个域名时，系统会通过DNS服务器查找该域名对应的IP地址，然后再进行连接

如果没有这东西，登陆某个网站时就必须输入该网站的IP地址，有了DNS就可以直接输入网址

> dns解析默认从小到大，先看本地有没有`host文件`
>
> 本地没有找网关，网关没有找机房服务器，找不到去外网
>
> 全世界一共有八个公网的地址，我们三大运营商所用的是114.114.114.x,所以配网关可以配成这个





### 三种连接模式

**host-onboy(主机模式)**
在某些特殊的网络调试环境中，要求将真实环境和虚拟环境隔离开，这时你就可采用host-onboy模式。

在host-onboy模式中，所有的虚拟系统是可以相互通信的，但虚拟系统和真实的网络是被隔离开的。

在host-onboy模式下，虚拟系统的TCP/IP配置信息都是由VMnet1(host-onboy)虚拟网络的DHCP服务器来动态分配的



**bridged(桥接模式)**

VMWare虚拟出来的操作系统就像是局域网中的一台独立的主机，它可以访问网内任何一台机器。

 使用桥接模式的虚拟系统和宿主机器的关系，就像连接在同一个Hub上的两台电脑。o当前主机IP为 192.168.8.100 虛拟机 192.168.8.xxx    `学习期间为了防止IP冲突，所以不选择这种模式`

> 一般会把虚拟机配置成固定ip,而宿主机一般是自动获取的，有可能会导致ip冲突
>
> 特点是虚拟机可以和宿主机以及同一本地网络下的主机相互通信



**NAT(网络地址转换模式)**
使用NAT模式，就是让虚拟系统借助NAT(网络地址转换)功能，通过宿主机器所在的网络来访问公网。

NAT模式下的虚拟系统的TCP/IP配置信息是由VMnet8(NAT)虚拟网络的DHCP服务器提供的。虚拟系统也就无法和本局域网中的其他真实主机进行通讯

> 可以保证不会发生ip冲突，但是虚拟机不能被访问，相当于一个子网络
>
> 默认情况下，**宿主机无法直接访问虚拟机**，因为虚拟机位于NAT网络中，宿主机无法直接到达虚拟机的私有IP地址

<img src="../../public/images/image-20240412234236513.png" alt="image-20240412234236513" style="zoom:50%;" />





## 发行版本

Red Hat和Debian是两种流行的Linux发行版，它们都在开源社区中具有重要地位，但在一些方面有所不同。

**CentOS**

CentOS是Red Hat Enterprise Linux的一个克隆版本，提供了与RHEL相同的功能，但没有官方支持，**开源免费**

**主要用于服务器版本**

**Ubuntu**

相比Centos有视窗工具



## 下载

官网 ：https://www.linux.org/

下载：https://www.linux.org/pages/download/

centos : https://wiki.centos.org/Download.html

> ISO：通常指的是光盘镜像文件，也称为ISO镜像  
>
> 7是常用版本   DVD表示家用版 Mini基础版

<img src="../../public/images/image-20240413000921947.png" alt="image-20240413000921947" style="zoom:50%;" />

<img src="../../public/images/image-20240413001311002.png" alt="image-20240413001311002" style="zoom:50%;" />

<img src="../../public/images/image-20240413001328376.png" alt="image-20240413001328376" style="zoom:50%;" />



**下载VM** https://blog.csdn.net/xijinno1/article/details/131178887

### ***新建新的虚拟机**

新建新的虚拟机->

<img src="../../public/images/image-20240413143142140.png" alt="image-20240413143142140" style="zoom:33%;" />

<img src="../../public/images/image-20240413143239856.png" alt="image-20240413143239856" style="zoom:33%;" />

<img src="../../public/images/image-20240413143301089.png" alt="image-20240413143301089" style="zoom:33%;" />

<img src="../../public/images/image-20240413143343884.png" alt="image-20240413143343884" style="zoom:33%;" />

<img src="../../public/images/image-20240413143450408.png" alt="image-20240413143450408" style="zoom:33%;" />

选择cpu数量

<img src="../../public/images/image-20240413143604671.png" alt="image-20240413143604671" style="zoom:33%;" />

选择内存 `我的是32G内存，可以选择4G-8G`

<img src="../../public/images/image-20240413143650979.png" alt="image-20240413143650979" style="zoom:33%;" />

选择网络连接方式

<img src="../../public/images/image-20240413143816224.png" alt="image-20240413143816224" style="zoom:33%;" />

接下来选择推荐配置即可

<img src="../../public/images/image-20240413143840811.png" alt="image-20240413143840811" style="zoom:33%;" />

<img src="../../public/images/image-20240413143907198.png" alt="image-20240413143907198" style="zoom:33%;" />

<img src="../../public/images/image-20240413143932664.png" alt="image-20240413143932664" style="zoom:33%;" />

分配磁盘

<img src="../../public/images/image-20240413144344424.png" alt="image-20240413144344424" style="zoom: 50%;" />

<img src="../../public/images/image-20240413144130992.png" alt="image-20240413144130992" style="zoom:33%;" />

**至此创建完成！**

> ctrl+alt可以从虚拟机移出光标

### *安装新的操作系统

<img src="../../public/images/image-20240413144744936.png" alt="image-20240413144744936" style="zoom:33%;" />

<img src="../../public/images/image-20240413144911815.png" alt="image-20240413144911815" style="zoom:33%;" />

选择后开启虚拟机，相当于光驱里面已经有一个光盘了

<img src="../../public/images/image-20240413145101577.png" alt="image-20240413145101577" style="zoom: 50%;" />

选择安装install

<img src="../../public/images/image-20240413145145251.png" alt="image-20240413145145251" style="zoom: 50%;" />

注意，此时弹出操作界面，这里要选择英文避免不必要的问题

<img src="../../public/images/image-20240413145323399.png" alt="image-20240413145323399" style="zoom:33%;" />

选择时区，一般是上海东八区

<img src="../../public/images/image-20240413145526750.png" alt="image-20240413145526750" style="zoom:50%;" />

配置硬盘分区

<img src="../../public/images/image-20240413145747379.png" alt="image-20240413145747379" style="zoom:50%;" />

<img src="../../public/images/image-20240413145839895.png" alt="image-20240413145839895" style="zoom:50%;" />

配置分区信息

> boot ：256M     swap：内存两倍   剩下的都给/

<img src="../../public/images/image-20240413150106931.png" alt="image-20240413150106931" style="zoom:50%;" />

<img src="../../public/images/image-20240413150254156.png" alt="image-20240413150254156" style="zoom: 50%;" />

修改主机名

<img src="../../public/images/image-20240413150345356.png" alt="image-20240413150345356" style="zoom:50%;" />

改成和虚拟机名字一样

<img src="../../public/images/image-20240413150419421.png" alt="image-20240413150419421" style="zoom:50%;" />

等待安装的过程中修改root密码,不要改得太复杂

<img src="../../public/images/image-20240413150528046.png" alt="image-20240413150528046" style="zoom:50%;" />

至此，操作系统安装完成，输入用户名和密码就可以进入

> 那个DVD有没有选已经无所谓了，因为os已经安装完了

<img src="../../public/images/image-20240413151026822.png" alt="image-20240413151026822" style="zoom: 50%;" />
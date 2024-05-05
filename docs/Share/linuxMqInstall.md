---
group: linux下软件安装
title: 安装各种MQ 
order: 3
---

# 安装各种MQ 

## rabbitMQ

### 1.环境准备

[RabbitMQ](https://so.csdn.net/so/search?q=RabbitMQ&spm=1001.2101.3001.7020) 官方：https://www.rabbitmq.com/

**下载前先查看这个，避免兼容问题：**

[RabbitMQ](https://so.csdn.net/so/search?q=RabbitMQ&spm=1001.2101.3001.7020) 版本 和 Erlang 版本兼容性关系:https://www.rabbitmq.com/docs/which-erlang

在开始安装之前，先执行下面的命令安装一些必要的依赖：

```sh
yum -y install make gcc gcc-c++ kernel-devel m4 ncurses-devel openssl-devel glibc-devel xmlto perl wget socat
```

**RabbitMQ 和 Erlang rpm 安装源仓库**

https://packagecloud.io/rabbitmq



### 2.Erlang 安装源下载

<img src="../../public/images/image-20240430203328735.png" alt="image-20240430203328735" style="zoom: 25%;" />

两种方式：一种wget直接安装rpm，另一种下载rpm上传到服务器然后rpm -ivh安装

<img src="../../public/images/image-20240430203400151.png" alt="image-20240430203400151" style="zoom: 25%;" />

```sh
wget --content-disposition https://packagecloud.io/rabbitmq/erlang/packages/el/7/erlang-23.3.4.11-1.el7.x86_64.rpm/download.rpm
```



### 3.RabbitMQ rpm 安装源下载

<img src="../../public/images/image-20240430204200155.png" alt="image-20240430204200155" style="zoom:25%;" />

和安装erlang一样，最终得到两个rpm

<img src="../../public/images/image-20240430204311845.png" alt="image-20240430204311845" style="zoom:33%;" />

### 4.开始安装

**先安装 Erlang，别搞反了**

```sh
rpm -ivh erlang-23.3.4.11-1.el7.x86_64.rpm
```

> i 表示安装，v 表示显示安装过程，h 表示显示进度

**安装 RabbitMQ**

```powershell
rpm -ivh rabbitmq-server-3.9.13-1.el7.noarch.rpm
```

至此我们的基本安装就完毕了。



### 5.RabbitMQ 基本配置

1、启动服务

```powershell
service rabbitmq-server start
```

2、查看服务状态

```powershell
service rabbitmq-server status 
```

3、停止服务

```powershell
 service rabbitmq-server stop
```

4、重启服务

```powershell
service rabbitmq-server restart 
```

**5、开启图形化管理界面，一般都要开**

```powershell
rabbitmq-plugins enable rabbitmq_management
```

**注意：！！！**

这里需要配置防火墙开放端口，因为后面需要访问这个图形化界面

查看当前防火墙状态

```powershell
firewall-cmd --state
```

查看当前防火墙开启的端口

```powershell
firewall-cmd --zone=public --list-ports
```

将 RabbitMQ web 访问端口 15672 开放出来

```powershell
firewall-cmd --zone=public --add-port=15672/tcp --permanent
```

再次查看当前防火墙开启的端口，可以看到没有，因为没有生效

更新防火墙规则

```powershell
firewall-cmd --reload
```

### 6.访问管理界面

若一切成功，访问本机IP+15672,可以看到操作界面

<img src="../../public/images/image-20240430205105851.png" alt="image-20240430205105851" style="zoom: 25%;" />

登录前先去修改配置文件

**注意！！**

由于我这个是最新的版本，所以配置方式会有点不一样，如果是以往早一点的版本作如下配置

**有ebin的老版本：**

我们直接修改这个文件

```powershell
vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.9.13/ebin/rabbitmq.app
```

这个目录下会有一个 ebin 的目录，里面有一个 rabbitmq.app 的配置文件，我们直接修改里面的内容就可以（但是由于我这个是目前最新版，就没有这个文件了)

```
vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.9.13/ebin/rabbitmq.app
```

<img src="../../public/images/image-20240430210216144.png" alt="image-20240430210216144" style="zoom: 33%;" />

修改之后重启 RabbitMQ 服务即可

那么我们新版本的如何配置才能访问这个 web 页面呢？已知有这么两种方式



**新版本：**

**第一种**
我们进入到这个目录

```powershell
cd /etc/rabbitmq/
```

创建一个 rabbitmq.config 配置文件

```powershell
touch rabbitmq.config
```

保存退出后，重启我们 RabbitMQ 服务，然后再次登录

<img src="../../public/images/image-20240430210521793.png" alt="image-20240430210521793" style="zoom: 25%;" />

**第二种**
创建一个新用户进行访问
第一步：添加 admin 用户并设置密码

```powershell
rabbitmqctl add_user admin admin
```

第二步：添加 admin 用户为 administrator 角色

```powershell
rabbitmqctl set_user_tags admin administrator
```

第三步：设置 admin 用户的权限，指定允许访问的 vhost 以及 write/read

```powershell
rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
```

可以看到已经有对应权限的该用户

<img src="../../public/images/image-20240430210649299.png" alt="image-20240430210649299" style="zoom:25%;" />



### 7.管理界面相关操作

**1、创建用户**

<img src="../../public/images/image-20240430210817309.png" alt="image-20240430210817309" style="zoom: 33%;" />

创建了一个 user1，鼠标悬停到 name ，可以点击对该用户进行操作
Can access virtual hosts 中显示 No access，即 user1 用户没有可以访问的虚拟主机

> #### 角色说明
>
> 1、 超级管理员 (administrator) 可登陆管理控制台，可查看所有的信息，并且可以对用户，策略 (policy) 进行操 作。
> 2、 监控者 (monitoring) 可登陆管理控制台，同时可以查看 rabbitmq 节点的相关信息 (进程数，内存使用 情况，磁盘使用情况等)
> 3、 策略制定者 (policymaker) 可登陆管理控制台，同时可以对 policy 进行管理。但无法查看节点的相关信息 (上 图红框标识的部分)。
> 4、 普通管理者 (management) 仅可登陆管理控制台，无法看到节点信息，也无法对策略进行管理。
> 5、 其他 无法登陆管理控制台，通常就是普通的生产者和消费者。



**2、创建 Virtual Hosts 虚拟服务器**

**Virtual Hosts 配置**

像 mysql 拥有数据库的概念并且可以指定用户对库和表等操作的权限。 RabbitMQ 也有类似的权限管理

在 RabbitMQ 中可以虚拟消息服务器 Virtual Host，每个 Virtual Hosts 相当于一个相对独立的 RabbitMQ 服务器，每个 VirtualHost 之间是相互隔离的：exchange、queue、message 不能互通。 

相当于 mysql 的 db ，Virtual Name 一般以 / 开头。

<img src="../../public/images/image-20240430211101105.png" alt="image-20240430211101105" style="zoom:33%;" />

这里创建虽然设置了，但是默认只给 admin 访问

我们可以设置其他用户，鼠标悬停到 name 上，点击

<img src="../../public/images/image-20240430211243945.png" alt="image-20240430211243945" style="zoom:33%;" />

可以发现，user1 用户也可以访问了


## rocketMQ

官网下载

[下载地址](https://rocketmq.apache.org/download/)

<img src="../../public/images/image-20240504183107984.png" alt="image-20240504183107984" style="zoom:50%;" />

### 上传下载好的运行版本文件并解压

使用 unzip 命令解压缩文件

使用 unzip 命令解压缩.zip 文件。在使用前需要确保 Linux 中安装有 unzip 的命令

没有的话使用 `sudo yum install unzip` 命令进行安装（）centos7 版本

使用 `sudo dnf install unzip` 命令进行安装（）centos8 版本

<img src="../../public/images/image-20240505110408993.png" alt="image-20240505110408993" style="zoom:50%;" />

1. 直接 cd 进入到目标目录，压缩包拖拽进文件目录
2. 使用 unzip rocketmq-all-5.1.0-bin-release.zip，解压对应的.zip 压缩文件

<img src="../../public/images/image-20240505110508038.png" alt="image-20240505110508038" style="zoom: 50%;" />

### 启动 RocketMQ

- **启动 NameServer** 

  启动 NameServer 非常简单， 在 `$ROCKETMQ_HOME/bin` 目录下有个 `mqnamesrv`。直接执行这个脚本就可以启动 RocketMQ 的 NameServer 服务。

  但是要注意，RocketMQ 默认预设的 JVM 内存是 4G，这是 RocketMQ 给我们的最佳配置。但是通常我们用虚拟机的话都是不够 4G 内存的，所以需要调整下 JVM 内存大小。[修改的方式是直接修改 `runserver.sh`

  1. 用 `vi runserver.sh` 编辑这个脚本，在脚本中找到这一行调整内存大小为 512M

     <img src="../../public/images/image-20240505110811294.png" alt="image-20240505110811294" style="zoom:50%;" />

     ```sh
     JAVA_OPT="${JAVA_OPT} -server -Xms512m -Xmx512m -Xmn256m -
     XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
     ```

  2. **进入 bin 目录下，执行 nohup sh mqnamesrv &**

     <img src="../../public/images/image-20240505111308208.png" alt="image-20240505111308208" style="zoom:50%;" />

     启动完成后，在 nohup.out 里看到这一条关键日志就是启动成功了。并且使用 jps 指令可以看到有一个 NamesrvStartup 进程。

     <img src="../../public/images/image-20240505111717869.png" alt="image-20240505111717869" style="zoom:50%;" />

     jps

     ![image-20240505111741900](../../public/images/image-20240505111741900.png)

     可以使用 tail -f ~/logs/rocketmqlogs/namesrv.log 查看日志

     <img src="../../public/images/image-20240505111949206.png" alt="image-20240505111949206" style="zoom:50%;" />

- 启动 Broker

  在启动前需要进入 bin 目录下修改一下配置文件，增加外网地址便于访问。按照自己的需求来，需要哪个便修改哪一个配置文件。
  例如修改 broker.conf `conf文件夹下`

  <img src="../../public/images/image-20240505112759746.png" alt="image-20240505112759746" style="zoom:50%;" />

  启动 Broker 的脚本是 runbroker.sh。Broker 的默认预设内存是 8G，启动前，如果内存不够，同样需要调整下 JVM 内存。vi runbroker.sh，找到这一行，进行内存调整

  ```shell
  JAVA_OPT="${JAVA_OPT} -server -Xms512m -Xmx512m -Xmn256m"
  ```

  <img src="../../public/images/image-20240505113410999.png" alt="image-20240505113410999" style="zoom:50%;" />

  然后我们需要找到 $ROCKETMQ_HOME/conf/broker.conf， vi 指令进行编辑，在最下面加入一个配置：

  ```
  autoCreateTopicEnable=true
  ```

  然后也以静默启动的方式启动 runbroker.sh

  ```shell
  nohup ./mqbroker &
  ```

  启动完成后，同样是检查 nohup.out 日志，有这一条关键日志就标识启动成功了。 并且 jps 指令可以看到一个 BrokerStartup 进程。

  <img src="../../public/images/image-20240505114028809.png" alt="image-20240505114028809" style="zoom:50%;" />

  jps

  <img src="../../public/images/image-20240505114004450.png" alt="image-20240505114004450" style="zoom:50%;" />

  至此rocket安装完成！


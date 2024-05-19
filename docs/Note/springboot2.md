---
group: SpringBoot
title: SpringBoot通过jar包启动
order: 2
---

# SpringBoot 是如何通过 jar 包启动的

得益于 SpringBoot 的封装，我们可以只通过 **jar -jar** 一行命令便启动一个 web 项目，再也不用操心搭建 tomcat 等相关 web 容器

## java -jar 做了什么

在 oracle 官网找到了该命令的描述：

使用 -jar 参数时，后面的参数是的 jar 文件名 (本例中是 `springbootstarterdemo-0.0.1-SNAPSHOT.jar`)；

- 该 jar 文件中包含的是 **class 和资源文件**；

- 在 manifest 文件中有 **Main-Class 的定义**；

- Main-Class 的源码中指定了**整个应用的启动类**

> java -jar 会去找 jar 中的 manifest 文件，在那里面找到真正的启动类；



在 `MANIFEST.MF `文件中有这么一行内容：

```
Start-Class: com.xxx.Application
```

前面的 java 官方文档中，只提到过 Main-Class ，并没有提到 Start-Class

Start-Class 的值是 com.xxx.Application：**这是我们的 java 代码中的唯一类，也只真正的应用启动类**

所以问题就来了，理论上看，**执行 java -jar 命令时 JarLauncher 类会被执行，但实际上是 com.xxx.Application 被执行了**，这其中发生了什么呢？为什么要这么做呢？

> 注意：Java 没有提供任何标准的方式来**加载嵌套的 jar 文件**（即，它们本身包含在 jar 中的 jar 文件）



### Jar 包的打包插件及核心方法

Spring Boot 项目的 pom.xml 文件中默认使用如下插件进行打包

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin<`/artifactId>
        </plugin>
    </plugins>
</build>
```

执行 maven clean package 之后，会生成两个文件：

```
spring-learn-0.0.1-SNAPSHOT.jar
spring-learn-0.0.1-SNAPSHOT.jar.original
```

`spring-boot-maven-plugin` 项目存在于 `spring-boot-tools` 目录中

spring-boot-maven-plugin 默认有 5 个 goals：

- repackage，在打包的时候默认使用的是 repackage
- run
- start
- stop
- build-info

**spring-boot-maven-plugin 的 repackage 能够将 mvn package 生成的软件包，再次打包为可执行的软件包**，并将 mvn package 生成的软件包重命名为 *.original。

spring-boot-maven-plugin 的 repackage 在代码层面调用了 `RepackageMojo` 的 `execute` 方法，而在该方法中又调用了 repackage 方法。

repackage 方法代码及操作解析如下

```java
private void repackage() throws MojoExecutionException {
   // maven生成的jar，最终的命名将加上.original后缀
   Artifact source = getSourceArtifact();
   // 最终为可执行jar，即fat jar
   File target = getTargetFile();
   // 获取重新打包器，将maven生成的jar重新打包成可执行jar
   Repackager repackager = getRepackager(source.getFile());
   // 查找并过滤项目运行时依赖的jar
   Set<Artifact> artifacts = filterDependencies(this.project.getArtifacts(),
         getFilters(getAdditionalFilters()));
   // 将artifacts转换成libraries
   Libraries libraries = new ArtifactsLibraries(artifacts, this.requiresUnpack,
         getLog());
   try {
      // 获得Spring Boot启动脚本
      LaunchScript launchScript = getLaunchScript();
      // 执行重新打包，生成fat jar
      repackager.repackage(target, libraries, launchScript);
   }catch (IOException ex) {
      throw new MojoExecutionException(ex.getMessage(), ex);
   }
   // 将maven生成的jar更新成.original文件
   updateArtifact(source, target, repackager.getBackupFile());
}
```

执行以上命令之后，便生成了打包结果对应的两个文件



## jar 包目录结构

首先来看看 jar 的目录结构，都包含哪些目录和文件，解压 jar 包可以看到如下结构：

```
spring-boot-learn-0.0.1-SNAPSHOT
├── META-INF
│   └── MANIFEST.MF
├── BOOT-INF
│   ├── classes
│   │   └── 应用程序类
│   └── lib
│       └── 第三方依赖jar
└── org
    └── springframework
        └── boot
            └── loader
                └── springboot启动程序
```

### **META-INF 内容**

在上述目录结构中，META-INF 记录了相关 jar 包的基础信息，包括入口程序等。

```
Manifest-Version: 1.0
Implementation-Title: spring-learn
Implementation-Version: 0.0.1-SNAPSHOT
Start-Class: com.tulingxueyuan.Application
Spring-Boot-Classes: BOOT-INF/classes/
Spring-Boot-Lib: BOOT-INF/lib/
Build-Jdk-Spec: 1.8
Spring-Boot-Version: 2.1.5.RELEASE
Created-By: Maven Archiver 3.4.0
Main-Class: org.springframework.boot.loader.JarLauncher
```

Main-Class 是 org.springframework.boot.loader.JarLauncher ，这个是 jar 启动的 Main 函数。

还有一个 Start-Class 是 com.xxx.Application，这个是我们应用自己的 Main 函数。



### Archive 的概念

在继续了解底层概念和原理之前，我们先来了解一下 Archive 的概念：

- archive 即归档文件，这个概念在 linux 下比较常见。

- 通常就是一个 tar/zip 格式的压缩包。

- jar 是 zip 格式。

**SpringBoot 抽象了 Archive 的概念，一个 Archive 可以是 jar（JarFileArchive），可以是一个文件目录（ExplodedArchive），可以抽象为统一访问资源的逻辑层。**

关于 Spring Boot 中 Archive 的源码如下：

```java
public interface Archive extends Iterable<Archive.Entry> {
    // 获取该归档的url
    URL getUrl() throws MalformedURLException;
    // 获取jar!/META-INF/MANIFEST.MF或[ArchiveDir]/META-INF/MANIFEST.MF
    Manifest getManifest() throws IOException;
    // 获取jar!/BOOT-INF/lib/*.jar或[ArchiveDir]/BOOT-INF/lib/*.jar
    List<Archive> getNestedArchives(EntryFilter filter) throws IOException;
}
```

SpringBoot 定义了一个接口用于描述资源，也就是 org.springframework.boot.loader.archive.Archive。

该接口有两个实现

- org.springframework.boot.loader.archive.ExplodedArchive 用于在文件夹目录下寻找资源
-  org.springframework.boot.loader.archive.JarFileArchive 用于在 jar 包环境下寻找资源

而在 SpringBoot 打包的 fatJar 中，则是使用后者

> JarFile：对 jar 包的封装，每个 JarFileArchive 都会对应一个 JarFile
>
> JarFile 被构造的时候会解析内部结构，去获取 jar 包里的各个文件或文件夹，这些文件或文件夹会被封装到 Entry 中，也存储在 JarFileArchive 中。如果 Entry 是个 jar，会解析成 JarFileArchive。
>
> 比如一个 JarFileArchive 对应的 URL 为：
>
> ```
> jar:file:/Users/format/Develop/gitrepository/springboot-analysis/springboot-executable-jar/target/executable-jar-1.0-SNAPSHOT.jar!/
> ```
>
> 它对应的 JarFile 为：
>
> ```
> /Users/format/Develop/gitrepository/springboot-analysis/springboot-executable-jar/target/executable-jar-1.0-SNAPSHOT.jar
> ```
>
> 这个 JarFile 有很多 Entry，比如：
>
> ```
> META-INF/
> META-INF/MANIFEST.MF
> spring/
> spring/study/
> ....
> spring/study/executablejar/ExecutableJarApplication.class
> lib/spring-boot-starter-1.3.5.RELEASE.jar
> lib/spring-boot-1.3.5.RELEASE.jar
> ...
> ```
>
> JarFileArchive 内部的一些依赖 jar 对应的 URL (SpringBoot 使用 org.springframework.boot.loader.jar.Handler 处理器来处理这些 URL)：
>
> ```
> jar:file:/Users/Format/Develop/gitrepository/springboot-analysis/springboot-executable-jar/target/executable-jar-1.0-SNAPSHOT.jar!/lib/spring-boot-starter-web-1.3.5.RELEASE.jar!/
> ```
>
> ```
> jar:file:/Users/Format/Develop/gitrepository/springboot-analysis/springboot-executable-jar/target/executable-jar-1.0-SNAPSHOT.jar!/lib/spring-boot-loader-1.3.5.RELEASE.jar!/org/springframework/boot/loader/JarLauncher.class
> ```
>
> 我们看到如果有 jar 包中包含 jar，或者 jar 包中包含 jar 包里面的 class 文件，那么会使用 **!/** 分隔开，这种方式只有 org.springframework.boot.loader.jar.Handler 能处理，它是 SpringBoot 内部扩展出来的一种 URL 协议。



## JarLauncher

从 MANIFEST.MF 可以看到 Main 函数是 JarLauncher，下面来分析它的工作流程。

JarLauncher 类的继承结构是：

```java
class JarLauncher extends ExecutableArchiveLauncher
class ExecutableArchiveLauncher extends Launcher
```

按照定义，**JarLauncher 可以加载内部 `/ BOOT-INF/lib` 下的 jar 及 `/ BOOT-INF/classes` 下的应用 class**

 JarLauncher 实现很简单：

```java
public class JarLauncher extends ExecutableArchiveLauncher {
    public JarLauncher() {}
    public static void main(String[] args) throws Exception {
        new JarLauncher().launch(args);
    }
}
```

其主入口新建了 JarLauncher 并调用父类 Launcher 中的 launch 方法启动程序。

> 在创建 JarLauncher 时，父类 ExecutableArchiveLauncher 找到自己所在的 jar，并创建 archive。
>
> JarLauncher 继承于 `org.springframework.boot.loader.ExecutableArchiveLauncher`。

ExecutableArchiveLauncher的无参构造方法最主要的功能就是构建了当前 main 方法所在的 FatJar 的 JarFileArchive 对象

```java
public abstract class ExecutableArchiveLauncher extends Launcher {
    private final Archive archive;
    public ExecutableArchiveLauncher() {
        try {
            // 找到自己所在的jar，并创建Archive
            this.archive = createArchive();
        }
        catch (Exception ex) {
            throw new IllegalStateException(ex);
        }
    }
}
```

下面来看 launch 方法。该方法主要是做了 2 个事情：

- 以 FatJar 为 file 作为入参，构造 JarFileArchive 对象。获取其中所有的资源目标，取得其 Url，将这些 URL 作为参数，构建了一个 URLClassLoader。
- 以第一步构建的 ClassLoader 加载 MANIFEST.MF 文件中 Start-Class 指向的业务类，并且执行静态方法 main。进而启动整个程序。

```java
public abstract class Launcher {
    protected final Archive createArchive() throws Exception {
        ProtectionDomain protectionDomain = getClass().getProtectionDomain();
        CodeSource codeSource = protectionDomain.getCodeSource();
        URI location = (codeSource == null ? null : codeSource.getLocation().toURI());
        String path = (location == null ? null : location.getSchemeSpecificPart());
        if (path == null) {
            throw new IllegalStateException("Unable to determine code source archive");
        }
        File root = new File(path);
        if (!root.exists()) {
            throw new IllegalStateException(
                    "Unable to determine code source archive from " + root);
        }
        return (root.isDirectory() ? new ExplodedArchive(root)
                : new JarFileArchive(root));
    }
}
```

在 Launcher 的 launch 方法中，通过以上 archive 的 getNestedArchives 方法 找到 `/ BOOT-INF/lib `下所有 jar 及` / BOOT-INF/classes `目录所对应的 archive，通过这些 archives 的 url 生成 LaunchedURLClassLoader，**并将其设置为线程上下文类加载器，启动应用**。

至此，才执行到我们应用程序主入口类的 main 方法，所有应用程序类文件均可通过 / BOOT-INF/classes 加载，所有依赖的第三方 jar 均可通过 / BOOT-INF/lib 加载



### URLStreamHandler

java 中描述资源常使用 URL，URL 有一个方法用于打开链接 java.net.URL#openConnection ()

**由于 URL 用于表达各种各样的资源，打开资源的具体动作由` java.net.URLStreamHandler` 这个类的子类来完成**。根据不同的协议，会有不同的 handler 实现。而 JDK 内置了相当多的 handler 实现用于应对不同的协议。比如 jar、file、http 等等。URL 内部有一个静态 HashTable 属性，用于保存已经被发现的协议和 handler 实例的映射。

获得 URLStreamHandler 有三种方法：

- 实现 URLStreamHandlerFactory 接口，通过方法 URL.setURLStreamHandlerFactory 设置。该属性是一个静态属性，且只能被设置一次。

- 直接提供 URLStreamHandler 的子类，作为 URL 的构造方法的入参之一。但是在 JVM 中有固定的规范要求：子类的类名必须是 Handler，同时最后一级的包名必须是协议的名称。比如自定义了 Http 的协议实现，则类名必然为 xx.http.Handler；

- JVM 启动的时候，需要设置 java.protocol.handler.pkgs 系统属性，如果有多个实现类，那么中间用 | 隔开。因为 JVM 在尝试寻找 Handler 时，会从这个属性中获取包名前缀，最终使用包名前缀。协议名.Handler，使用 Class.forName 方法尝试初始化类，如果初始化成功，则会使用该类的实现作为协议实现。

  为了实现这个目标，SpringBoot 首先从支持 jar in jar 中内容读取做了定制，也就是支持多个！/ 分隔符的 url 路径。SpringBoot 定制了以下两个方面：

  - 实现了一个 java.net.URLStreamHandler 的子类 org.springframework.boot.loader.jar.Handler。该 Handler 支持识别多个！/ 分隔符，并且正确的打开 URLConnection。打开的 Connection 是 SpringBoot 定制的 org.springframework.boot.loader.jar.JarURLConnection 实现。

  - 实现了一个 java.net.JarURLConnection 的子类 org.springframework.boot.loader.jar.JarURLConnection。该链接支持多个！/ 分隔符，并且自己实现了在这种情况下获取 InputStream 的方法。而为了能够在 org.springframework.boot.loader.jar.JarURLConnection 正确获取输入流，SpringBoot 自定义了一套读取 ZipFile 的工具类和方法。这部分和 ZIP 压缩算法规范紧密相连，就不拓展了。



## Spring Boot 的 Jar 应用启动流程总结

总结一下 Spring Boot 应用的启动流程：

1. **Spring Boot 应用打包之后，生成一个 Fat jar，包含了应用依赖的 jar 包和 Spring Boot loader 相关的类**。

2. **Fat jar 的启动 Main 函数是 JarLauncher，它负责创建一个 `LaunchedURLClassLoader` 来加载 /lib 下面的 jar，并以一个新线程启动应用的 Main 函数。**

   > 那么，ClassLoader 是如何读取到 Resource，它又需要哪些能力？查找资源和读取资源的能力。对应的 API：
   >
   > ```java
   > public URL findResource(String name)
   > public InputStream getResourceAsStream(String name)
   > ```
   >
   > SpringBoot 构造 LaunchedURLClassLoader 时，传递了一个 URL [] 数组。数组里是 lib 目录下面的 jar 的 URL。
   >
   > 对于一个 URL，JDK 或者 ClassLoader 如何知道怎么读取到里面的内容的？流程如下：
   >
   > - LaunchedURLClassLoader.loadClass
   >
   > - URL.getContent()
   >
   > - URL.openConnection()
   >
   > - Handler.openConnection(URL)
   >
   > 最终调用的是 JarURLConnection 的 getInputStream () 函数。
   >
   > ```java
   > //org.springframework.boot.loader.jar.JarURLConnection
   >  @Override
   > public InputStream getInputStream() throws IOException {
   >    connect();
   >    if (this.jarEntryName.isEmpty()) {
   >      throw new IOException("no entry name specified");
   >    }
   >    return this.jarEntryData.getInputStream();
   >  }
   > ```

   从一个 URL，到最终读取到 URL 里的内容，整个过程是比较复杂的，总结下：

   - Spring boot **注册了一个 Handler 来处理”jar:” 这种协议的 URL**

   - Spring boot 扩展了 JarFile 和 JarURLConnection，内部处理 jar in jar 的情况。

   - 在处理多重 jar in jar 的 URL 时，Spring Boot 会循环处理，并缓存已经加载到的 JarFile。

   - 对于多重 jar in jar，实际上是解压到了临时目录来处理，可以参考 JarFileArchive 里的代码。

   - **在获取 URL 的 InputStream 时，最终获取到的是 JarFile 里的 JarEntryData**。



## **在 IDE / 开放目录启动 Spring boot 应用**

在 IDE 里，直接运行的 Main 函数是应用的 Main 函数：

```java
@SpringBootApplication
public class SpringBootDemoApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(SpringBootDemoApplication.class, args);
    }
}
```

其实在 IDE 里启动 SpringBoot 应用是最简单的一种情况，因为依赖的 Jar 都让 IDE 放到 classpath 里了，所以 Spring boot 直接启动就完事了。

还有一种情况是在一个开放目录下启动 SpringBoot 启动。所谓的开放目录就是把 fat jar 解压，然后直接启动应用。

这时，Spring boot 会判断当前是否在一个目录里，如果是的，则构造一个 ExplodedArchive（前面在 jar 里时是 JarFileArchive），后面的启动流程类似 fat jar 的。

**总结** 

JarLauncher 通过加载 BOOT-INF/classes 目录及 BOOT-INF/lib 目录下 jar 文件，实现了 fat jar 的启动。

SpringBoot 通过扩展 JarFile、JarURLConnection 及 URLStreamHandler，实现了 jar in jar 中资源的加载。

SpringBoot 通过扩展 URLClassLoader–LauncherURLClassLoader，实现了 jar in jar 中 class 文件的加载。



https://note.youdao.com/ynoteshare/index.html?id=7e4ee7e1134e588f97bde3bd27249fe8&type=note&_time=1716107357241
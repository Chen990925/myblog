---
group: Docker专题
title: Docker 容器化实战
order: 1
summary: Docker 容器化技术从入门到实战，涵盖容器与虚拟机对比、Docker 架构、核心命令、Dockerfile 编写（多阶段构建）、docker-compose 编排及 Java 应用 Docker 化最佳实践。
keywords: [Docker, 容器, Dockerfile, docker-compose, 多阶段构建, JVM容器适配]
---

# Docker 容器化实战

## 容器 vs 虚拟机

| 对比项 | 容器（Container） | 虚拟机（VM） |
|--------|------------------|-------------|
| 虚拟化层级 | 操作系统级虚拟化 | 硬件级虚拟化 |
| 内核 | 共享宿主机内核 | 独立的 Guest OS 内核 |
| 启动速度 | 秒级 | 分钟级 |
| 资源占用 | MB 级 | GB 级 |
| 隔离性 | 进程级隔离（cgroups + namespace） | 完全隔离 |
| 性能损耗 | 几乎无 | 较大 |

**容器本质上不是虚拟机，而是一个被隔离的进程。** 它利用 Linux 内核的 Namespace 实现资源隔离，利用 Cgroups 实现资源限制。

## Docker 架构

```
┌─────────────────────────────────────────────┐
│              Docker Client                   │
│         (docker build / run / pull)          │
└──────────────────┬──────────────────────────┘
                   │ REST API
┌──────────────────▼──────────────────────────┐
│            Docker Daemon (dockerd)           │
│  ┌─────────────────────────────────────┐     │
│  │   Container Runtime (containerd)    │     │
│  │  ┌───────┐ ┌───────┐ ┌───────┐    │     │
│  │  │Container│ │Container│ │Container│    │     │
│  │  └───────┘ └───────┘ └───────┘    │     │
│  └─────────────────────────────────────┘     │
└──────────────────────────────────────────────┘
```

核心概念：
- **Image（镜像）**：只读的文件系统层叠，包含运行应用所需的一切
- **Container（容器）**：镜像的运行实例，在镜像层之上加了可写层
- **Registry（仓库）**：存储和分发镜像的服务（Docker Hub、阿里云等）

## 核心命令速查

```bash
# ===== 镜像操作 =====
docker pull nginx:latest          # 拉取镜像
docker images                     # 查看本地镜像
docker rmi <image_id>             # 删除镜像
docker build -t myapp:v1 .       # 构建镜像
docker tag myapp:v1 registry/myapp:v1  # 打标签

# ===== 容器操作 =====
docker run -d --name web \
  -p 8080:80 \                    # 端口映射
  -v /data:/app/data \            # 挂载卷
  -e SPRING_PROFILES_ACTIVE=prod \ # 环境变量
  nginx:latest                    # 启动容器

docker ps                         # 查看运行中的容器
docker ps -a                      # 查看所有容器（含已停止）
docker logs -f <container>        # 实时查看日志
docker exec -it <container> /bin/sh  # 进入容器
docker stop / start / rm <container>  # 停止/启动/删除

# ===== 网络操作 =====
docker network create mynet       # 创建自定义网络
docker network ls                 # 查看网络
docker network inspect mynet      # 查看网络详情

# ===== 数据卷操作 =====
docker volume create mydata       # 创建数据卷
docker volume ls                  # 查看数据卷
```

## Dockerfile 编写

### 基础指令

| 指令 | 说明 |
|------|------|
| `FROM` | 指定基础镜像 |
| `RUN` | 执行命令（每行 RUN 创建一层） |
| `COPY` | 复制本地文件到镜像 |
| `ADD` | 类似 COPY，但支持自动解压和远程 URL |
| `WORKDIR` | 设置工作目录 |
| `ENV` | 设置环境变量 |
| `EXPOSE` | 声明容器监听的端口（仅文档作用） |
| `CMD` | 容器启动时执行的默认命令（可被覆盖） |
| `ENTRYPOINT` | 容器启动时执行的入口命令（不可被轻易覆盖） |
| `ARG` | 构建时的变量（运行时不可用） |
| `VOLUME` | 声明匿名卷挂载点 |
| `USER` | 指定运行用户 |

### Java 应用 Dockerfile 示例

```dockerfile
# ===== 基础版 =====
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/myapp-1.0.0.jar app.jar

EXPOSE 8080

# JVM 参数配置
ENV JAVA_OPTS="-Xms512m -Xmx512m -XX:+UseG1GC"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### 多阶段构建（推荐）

多阶段构建可以将编译环境和运行环境分离，最终镜像只包含运行所需的文件，大幅减小镜像体积。

```dockerfile
# ===== 第一阶段：编译 =====
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build

# 先复制依赖文件，利用 Docker 层缓存
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 再复制源码并编译
COPY src ./src
RUN mvn package -DskipTests -B

# ===== 第二阶段：运行 =====
FROM eclipse-temurin:17-jre-alpine

# 创建非 root 用户
RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

# 只从 builder 阶段复制 jar 包
COPY --from=builder /build/target/*.jar app.jar

# 切换到非 root 用户
USER app

EXPOSE 8080

# 容器资源感知 JVM 参数
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 \
               -XX:+UseG1GC \
               -XX:+HeapDumpOnOutOfMemoryError \
               -XX:HeapDumpPath=/app/logs/heapdump.hprof"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### Dockerfile 最佳实践

1. **选择精简基础镜像**：`*-slim` 或 `*-alpine`，减小攻击面和镜像体积
2. **利用层缓存**：将不常变化的指令放前面（依赖下载），频繁变化的放后面（源码复制）
3. **合并 RUN 指令**：减少镜像层数
4. **使用多阶段构建**：最终镜像不包含编译工具链
5. **非 root 用户运行**：安全性考量
6. **使用 .dockerignore**：排除不需要的文件（`.git`、`target/`、`node_modules/`）

```
# .dockerignore
.git
.idea
target
*.log
node_modules
```

## docker-compose 编排

docker-compose 用于定义和运行多容器应用，通过 YAML 文件描述整个服务栈。

### 典型 Java 微服务编排

```yaml
version: '3.8'

services:
  # MySQL 数据库
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: myapp
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - backend
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis 缓存
  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - backend

  # Java 应用
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: myapp
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/myapp
      SPRING_REDIS_HOST: redis
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - backend
    restart: unless-stopped

  # Nginx 反向代理
  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
    networks:
      - backend

volumes:
  mysql_data:
  redis_data:

networks:
  backend:
    driver: bridge
```

### compose 常用命令

```bash
docker compose up -d          # 后台启动所有服务
docker compose down            # 停止并删除所有容器
docker compose logs -f app     # 查看指定服务日志
docker compose ps              # 查看服务状态
docker compose build           # 重新构建镜像
docker compose exec app sh     # 进入指定服务
```

## Java 应用在容器中的 JVM 适配

### 容器资源感知问题

早期 JDK（8u131 之前）无法正确感知容器的 CPU 和内存限制，会导致 OOM Kill。

```bash
# 问题：容器限制 1G 内存，但 JVM 按宿主机 16G 计算默认堆大小
docker run -m 1g openjdk:8 java -XX:+PrintFlagsFinal -version | grep MaxHeapSize
# 结果：默认堆大小远大于 1G，必然被 OOM Kill
```

### 解决方案

```bash
# ===== JDK 8u191+ =====
# 启用容器资源感知
java -XX:+UseContainerSupport \
     -XX:MaxRAMPercentage=75.0 \     # 堆内存占容器内存的 75%
     -XX:InitialRAMPercentage=50.0 \ # 初始堆内存占比
     -jar app.jar

# ===== JDK 10+ =====
# 容器支持默认启用，无需额外参数
java -XX:MaxRAMPercentage=75.0 -jar app.jar
```

### 生产环境推荐的 JVM 参数

```dockerfile
ENTRYPOINT ["java", \
    "-XX:MaxRAMPercentage=75.0", \
    "-XX:+UseG1GC", \
    "-XX:+ParallelRefProcEnabled", \
    "-XX:+HeapDumpOnOutOfMemoryError", \
    "-XX:HeapDumpPath=/app/logs/", \
    "-XX:+ExitOnOutOfMemoryError", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", "app.jar"]
```

关键参数说明：
- `MaxRAMPercentage=75.0`：堆内存占容器总内存的 75%，留 25% 给非堆和系统
- `HeapDumpOnOutOfMemoryError`：OOM 时自动 dump 堆内存
- `ExitOnOutOfMemoryError`：OOM 时直接退出进程（让 K8s 重启 Pod）
- `java.security.egd`：使用 `/dev/./urandom` 加速随机数生成（解决 Tomcat 启动慢问题）

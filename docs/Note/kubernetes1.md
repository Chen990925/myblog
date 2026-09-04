---
group: Kubernetes专题
title: Kubernetes 入门与 Java 应用部署
order: 1
---

# Kubernetes 入门与 Java 应用部署

## 为什么需要 Kubernetes

Docker 解决了应用的打包和单机运行问题，但在生产环境中还面临：

- **多容器编排**：几十上百个微服务如何调度、部署、扩缩容？
- **高可用**：某个节点宕机，容器如何自动迁移？
- **负载均衡**：流量如何在多个实例间分发？
- **滚动更新**：如何做到零停机发布？

Kubernetes（简称 K8s）就是解决这些问题的容器编排平台。

## 核心概念

### 集群架构

```
┌──────────────── Control Plane（Master）────────────────┐
│                                                         │
│  API Server    ←── 所有操作的统一入口（RESTful API）     │
│  etcd          ←── 集群状态存储（分布式 KV 数据库）      │
│  Scheduler     ←── 决定 Pod 运行在哪个 Node              │
│  Controller Mgr ←── 维护集群期望状态（副本数等）         │
│                                                         │
└─────────────────────────────────────────────────────────┘
         │
         │ 调度指令
         ▼
┌─── Node 1 ──────────┐  ┌─── Node 2 ──────────┐
│ kubelet（节点代理）    │  │ kubelet（节点代理）    │
│ kube-proxy（网络代理）│  │ kube-proxy（网络代理）│
│ Container Runtime    │  │ Container Runtime    │
│  ┌────┐  ┌────┐     │  │  ┌────┐             │
│  │Pod1│  │Pod2│     │  │  │Pod3│             │
│  └────┘  └────┘     │  │  └────┘             │
└─────────────────────┘  └─────────────────────┘
```

### 核心资源对象

| 资源 | 说明 |
|------|------|
| **Pod** | 最小调度单位，包含一个或多个容器 |
| **Deployment** | 管理 Pod 的副本数和更新策略 |
| **Service** | 为一组 Pod 提供稳定的访问入口（ClusterIP/NodePort/LoadBalancer） |
| **ConfigMap** | 存储非敏感配置数据（键值对或配置文件） |
| **Secret** | 存储敏感数据（密码、Token、证书） |
| **Namespace** | 逻辑隔离，用于多租户或环境隔离 |
| **Ingress** | HTTP/HTTPS 路由规则，暴露服务到集群外部 |

## Pod

Pod 是 K8s 中最小的可部署单元。一个 Pod 内可以有多个容器，它们共享网络和存储。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: myapp
      image: myapp:1.0.0
      ports:
        - containerPort: 8080
      resources:
        requests:        # 最低资源要求（调度依据）
          cpu: "250m"    # 0.25 核 CPU
          memory: "512Mi"
        limits:          # 资源上限（超过则 OOM Kill 或 CPU 限流）
          cpu: "1000m"   # 1 核 CPU
          memory: "1024Mi"
      env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
```

### 为什么不是直接管理容器？

Pod 的设计哲学：
- **多容器协作**：一个 Pod 内的容器可以共享存储和网络，适合 Sidecar 模式（日志收集、代理等）
- **生命周期管理**：Pod 有统一的生命周期钩子
- **资源共享**：Pod 内容器共享同一个 IP 和端口空间

## Deployment

Deployment 管理 Pod 的副本数、滚动更新策略和回滚能力。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  replicas: 3                    # 期望副本数
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate          # 滚动更新策略
    rollingUpdate:
      maxSurge: 1                # 更新时最多多出 1 个 Pod
      maxUnavailable: 0          # 更新时不允许有不可用的 Pod
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: myapp:1.0.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "250m"
              memory: "512Mi"
            limits:
              cpu: "1000m"
              memory: "1024Mi"
          # 存活探针
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
            failureThreshold: 3
          # 就绪探针
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
            initialDelaySeconds: 20
            periodSeconds: 5
```

### 滚动更新与回滚

```bash
# 查看部署状态
kubectl rollout status deployment/myapp-deployment

# 查看更新历史
kubectl rollout history deployment/myapp-deployment

# 回滚到上一版本
kubectl rollout undo deployment/myapp-deployment

# 回滚到指定版本
kubectl rollout undo deployment/myapp-deployment --to-revision=3

# 暂停/恢复滚动更新（批量修改时很有用）
kubectl rollout pause deployment/myapp-deployment
kubectl rollout resume deployment/myapp-deployment
```

## Service

Service 为一组 Pod 提供稳定的网络访问入口。即使 Pod 重建导致 IP 变化，Service 的 ClusterIP 不变。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp              # 通过标签选择 Pod
  ports:
    - port: 80              # Service 暴露的端口
      targetPort: 8080      # Pod 的实际端口
  type: ClusterIP            # 默认类型，集群内访问
```

### Service 类型

| 类型 | 说明 |
|------|------|
| **ClusterIP** | 默认，仅在集群内部可访问 |
| **NodePort** | 在每个 Node 上开放一个端口（30000-32767），外部可通过 `NodeIP:NodePort` 访问 |
| **LoadBalancer** | 在云平台上自动创建负载均衡器 |
| **ExternalName** | 将 Service 映射到外部 DNS 名称 |

### DNS 解析

集群内 Service 自动获得 DNS 名称：

```
<service-name>.<namespace>.svc.cluster.local

# 例如：myapp-service 在 default 命名空间
myapp-service.default.svc.cluster.local
# 简化写法（同命名空间内）
myapp-service
```

## ConfigMap 与 Secret

### ConfigMap：存储配置

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  application.yml: |
    server:
      port: 8080
    spring:
      datasource:
        url: jdbc:mysql://mysql-service:3306/myapp
      redis:
        host: redis-service
  LOG_LEVEL: "INFO"
```

在 Deployment 中使用：

```yaml
spec:
  containers:
    - name: myapp
      env:
        # 引用 ConfigMap 中的单个值
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: myapp-config
              key: LOG_LEVEL
      volumeMounts:
        # 将 ConfigMap 挂载为文件
        - name: config-volume
          mountPath: /app/config
  volumes:
    - name: config-volume
      configMap:
        name: myapp-config
```

### Secret：存储敏感数据

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
data:
  # 值必须是 Base64 编码
  db-password: cGFzc3dvcmQxMjM=     # echo -n 'password123' | base64
  api-key: c2VjcmV0LWtleQ==
```

## 健康检查（Probes）

K8s 通过探针监控 Pod 的健康状态：

| 探针类型 | 作用 | 失败行为 |
|----------|------|----------|
| **livenessProbe** | 判断容器是否存活 | 重启容器 |
| **readinessProbe** | 判断容器是否就绪 | 从 Service 中摘除 Pod |
| **startupProbe** | 判断应用是否启动完成 | 启动期间禁用其他探针 |

### Spring Boot Actuator 集成

```yaml
# application.yml
management:
  endpoint:
    health:
      probes:
        enabled: true    # 开启 K8s 探针端点
      group:
        liveness:
          include: livenessState, ping
        readiness:
          include: readinessState, db, redis
```

K8s 探针配置：

```yaml
containers:
  - name: myapp
    # 启动探针：Java 应用启动较慢，给足时间
    startupProbe:
      httpGet:
        path: /actuator/health/liveness
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 5
      failureThreshold: 30     # 最多等 150s 启动
    # 存活探针
    livenessProbe:
      httpGet:
        path: /actuator/health/liveness
        port: 8080
      periodSeconds: 10
      failureThreshold: 3
    # 就绪探针
    readinessProbe:
      httpGet:
        path: /actuator/health/readiness
        port: 8080
      periodSeconds: 5
      failureThreshold: 3
```

## HPA 弹性伸缩

Horizontal Pod Autoscaler 根据 CPU/内存使用率自动调整副本数。

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70     # CPU 使用率超过 70% 触发扩容
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80     # 内存使用率超过 80% 触发扩容
```

```bash
# 查看 HPA 状态
kubectl get hpa

# 手动查看当前资源使用
kubectl top pods
kubectl top nodes
```

## 常用 kubectl 命令

```bash
# ===== 资源查看 =====
kubectl get pods -o wide              # 查看 Pod（含 IP 和 Node）
kubectl get deployments               # 查看 Deployment
kubectl get services                  # 查看 Service
kubectl get all -n <namespace>        # 查看命名空间下所有资源
kubectl describe pod <pod-name>       # 查看 Pod 详情（排查问题）

# ===== 日志与调试 =====
kubectl logs -f <pod-name>            # 实时查看日志
kubectl logs <pod-name> --previous    # 查看上一个崩溃容器的日志
kubectl exec -it <pod-name> -- sh     # 进入容器
kubectl port-forward svc/myapp 8080:80  # 端口转发到本地

# ===== 资源管理 =====
kubectl apply -f deployment.yaml      # 声明式创建/更新资源
kubectl delete -f deployment.yaml     # 删除资源
kubectl scale deployment/myapp --replicas=5  # 手动扩缩容

# ===== 排障常用 =====
kubectl get events --sort-by=.lastTimestamp  # 查看集群事件
kubectl describe deployment/myapp            # 查看部署详情
```

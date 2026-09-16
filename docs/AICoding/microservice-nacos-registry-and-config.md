---
group: 微服务治理专题
title: Nacos 注册发现与配置中心
order: 37
---

# 微服务 2：Nacos 注册发现 + 配置中心

## 一、注册发现原理

```
服务启动 → 注册到 Nacos（服务名 + IP + 端口 + 元数据）
消费者 → 拉服务列表（本地缓存）→ 负载均衡选实例 → 调用
心跳（默认 5s）→ 15s 未上报标记不健康 → 30s 剔除
```

- **推拉结合**：客户端定时拉 + Nacos 变更主动推送（UDP/长轮询）→ 变更近实时
- **健康检查**：临时实例（心跳上报，AP，宕机自动剔除）/ 持久化实例（服务端探测，CP）
- 项目落点：`spring.cloud.nacos.discovery`（enabled/server-addr/group/namespace），**另外支持 ZK 作为注册中心**（zookeeper.enabled）——"双注册中心支持，按客户环境选"

## 二、Nacos vs Eureka vs ZK（对比题）

| 维度 | Nacos | Eureka | ZK |
|---|---|---|---|
| 一致性 | AP/CP 可选 | AP | CP |
| 健康检查 | 心跳 + 服务端探测 | 客户端心跳 | 会话（临时节点） |
| 配置中心 | ✅ 内置 | ✗ | ✗（需自搭） |
| 生态 | 阿里 / Spring Cloud Alibaba | Netflix 已停更 | 老牌 |

话术："选 Nacos：注册+配置一体、AP/CP 可选、生态活跃；Eureka 停更、ZK 是 CP 且无配置中心。"

## 三、多环境隔离（高频追问）

- **namespace 隔离环境**：dev/test/prod 各一个 namespace → 环境间完全隔离
- **group 隔离业务/租户**：同环境内按业务/客户分组（不同金融机构客户）
- 项目落点：bootstrap-prod.yml 里 namespace/group 可配置——"namespace 隔离环境、group 隔离客户/业务线"

## 四、配置中心

- 拉取：bootstrap 阶段先连 Nacos 拉配置（优先于 application.yml）
- **动态刷新**：`@RefreshScope`（Bean 重建）+ `@Value` 自动更新；Nacos 推送 → 客户端长轮询感知
- **优先级**：Nacos 外部配置 > 本地 application.yml > bootstrap.yml
- **坑**：
  - `@RefreshScope` 只对 Bean 生效，静态变量/已初始化对象不刷新
  - 配置频繁变更 → Bean 反复重建（呼应 JVM 案例 5 网关路由刷新/Metaspace）
- 项目落点：file-extension yaml、config 默认关闭按环境开启

## 五、面试话术（1 分钟版）

> "Nacos 注册发现推拉结合：客户端拉 + 服务端推送，心跳 5s、不健康 15s、剔除 30s；选它因为注册配置一体、AP/CP 可选。配置中心在 bootstrap 阶段拉取 + @RefreshScope 动态刷新，多环境用 namespace 隔离、业务用 group 隔离；注意配置频繁变更会触发 Bean 重建，要控制刷新频率。我们项目注册中心双支持 Nacos 和 ZK。"

## 六、高频追问

- 服务列表变更怎么感知？→ 推拉结合（客户端定时拉 + 服务端推送）
- 临时实例和持久化实例区别？→ 临时靠心跳（AP，宕机剔除）；持久靠服务端探测（CP，不剔除）
- Nacos 挂了服务还能调用吗？→ 消费者有本地缓存的服务列表，已建立的调用继续；但不能感知新变更
- 配置热更新怎么实现？→ Nacos 长轮询推送 + @RefreshScope 重建 Bean
- namespace 和 group 的区别？→ namespace 最外层（隔离环境/租户），group 是 namespace 内分组（隔离业务）

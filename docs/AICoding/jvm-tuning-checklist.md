---
group: JVM调优专题
title: JVM 调优准备点清单
order: 2
summary: JVM 调优面试准备总纲，汇总项目现状、内存容量规划、G1 参数、排查方法论、线程模型等九大板块核心要点与优先级建议。
keywords: [JVM调优, 面试清单, 内存预算, G1, 排查方法论]
---

# JVM 调优准备点清单（目录 / 索引版）

> 这是**总纲**：每个板块只留核心要点 + 指向详细文件。复习/面试前先看这份，细节翻对应文件。
> 详细文件见 `笔记/jvm/总览.md` 的文件索引。

## 0. 项目现状速览（面试背景铺垫用）

- 技术栈：JDK 8、Spring Boot/Cloud、Nacos、RocketMQ、Redis、Sentinel、ZK、Oracle/MySQL（Druid）、MyBatis-Plus、EasyExcel、QuickFIX/J、WebSocket、protobuf、transmittable-thread-local 2.12.6
- 部署：约 10 个微服务共置 32G/8 核机器，统一 `inner.sh`（G1 参数组一致，堆 0.25g~3g）
- 热点代码：avail-engine（分桶锁）、common-cache（几十个静态缓存 DAO）、CFETS FIX 通道、algo 算法接入、大量定时任务、EasyExcel 导出、MQ 回报链路
- 关键配置：Tomcat max-threads=1000/20000、Druid max-active=200、业务线程池 core=8/max=200/queue=200、scheduled-pool=8

## 1. 内存容量规划与预算核算

- 引导句：先算死 → 再分配 → 两向收敛 → GC 验证
- 核心：JVM 六大件核算 RSS（堆/元空间/线程栈/直接内存/CodeCache/自身）；堆 3g 服务 RSS≈4.2~4.5g
- 本项目：≈31.75g 贴红线 → Xss 512k + 非核心降配挤出余量
- **详见 `内存预算核算.md`**

## 2. GC 选型与 G1 参数

- 模型三句：region 等大分割 / Young+Mixed GC / 停顿目标是第一公民
- 参数一句版：200=软目标、16m→humongous 8m、Reserve15 偏高、IHOP65 关闭自适应、NewSize 10/40 区间窄
- 纠错点：UnlockExperimentalVMOptions 可去掉；参数按堆大小分档
- **详见 `G1调优.md`**

## 3. 生产故障排查方法论

- 决策树：CPU高→top-Hp+jstack；内存涨→jstat+jmap+MAT；M区涨→class_histogram；接口慢→jstack连打3次（BLOCKED=锁/WAITING=线程池）；重启→OOM日志+dump
- 加分句：GC 停顿 ≠ 应用停顿（PrintGCApplicationStoppedTime）
- 案例三原则：只讲代码里有的 / 追问三连 / 没经历过的降级讲
- **详见 `生产问题排查方法论与案例串讲.md`**

## 4. 项目真实热点对应的调优点

1. avail-engine 分桶锁：锁粒度、锁泄漏（Map 只增不减）、无界容器
2. common-cache 静态缓存：全量刷新时机、静态引用 GC 不可回收
3. 定时任务风暴：与交易高峰错峰、全量/增量
4. MQ 回报链路：慢 SQL/堆积/幂等/重试
5. CFETS 外部接口：线程池耗尽与雪崩、NIO 线程模型
6. EasyExcel 导出：大对象、SXSSF 流式、限流
7. 条件单拆单：瞬时脉冲 + 全量校验 + DB 写放大（**详见 `生产案例-条件单拆单并发优化.md`**）

## 5. 线程模型与线程栈（8 核）

- Tomcat 1000 线程 = IO 等外部；1000×512k≈512m 栈内存实打实
- Xss 512k 省内存，深递归/大栈帧才危险
- 线程池 core/max/queue + 拒绝策略（Abort/CallerRuns/Discard）
- ThreadLocal + transmittable-thread-local：finally remove
- *（B 板块详细内容待补充）*

## 6. 堆外内存 / 直接内存

- MaxDirectMemorySize=256m；Netty（hq-client）/QuickFIX/J 用直接内存
- 堆外不参与 GC，`jcmd VM.native_memory` 监控；Direct buffer memory OOM 与堆 OOM 区分

## 7. 监控与可观测性

- monitor-sdk 推送 monitor-center（application.yml `xquant.monitor.sdk`）
- GC 日志 5×20M 滚动 + PrintGCApplicationStoppedTime；OOM 自动转储 + dump 脚本

## 8. 启动与预热

- AlwaysPreTouch：开市前就绪、避免缺页抖动（代价：启动慢、内存占满）
- UseStringDeduplication：海量字符串场景收益 vs CPU 代价（仅老年代生效）
- 预热 vs TieredCompilation

## 9. 调优方法论闭环（万能结尾）

**压测定基线 → GC 日志/JMX 找瓶颈 → 改参数/改代码 → 再压测对比**；效果全部落数字。

## 10. 优先级建议

1. 先啃透：内存预算、G1 参数、排查方法论 + 1 个主打案例（选 A 额度锁 / 条件单拆单）
2. 再补：项目热点校准、线程模型
3. 简历话术：基于 32G/8 核单机部署 10 个微服务，负责内存容量规划与 JVM 参数调优（G1 选型与停顿校准、OOM 转储与 jstack/jmap 诊断、GC 日志与监控告警，主导 Full GC/OOM/线程池耗尽问题定位整改）

---
group: JVM调优专题
title: JVM 调优速记卡
order: 7
---

# JVM 调优速记卡（临场回忆 / 快速准备版）

> 用法：面试前 10 分钟扫一遍；被问到任何 JVM 话题，先定位到对应板块，按"引导句"展开。每个板块只留"提词器"，细节翻对应笔记。

## 1. 内存预算（新服务器怎么配）

- 引导句：**"先算死，再分配，最后用 GC 验证回收"**
- 步骤：摸机器（free -h/nproc，OS 预留 10%）→ 盘点所有 JVM+中间件 → 六项核算 RSS（堆/元空间/线程栈/直接内存/CodeCache/JVM 自身）→ 自上而下分配 + 自下而上验证，两向收敛 → 超了先砍非核心
- 关键算术：**堆 3g 的服务 RSS ≈ 4.2~4.5g**（非堆每进程 ≈1g）
- 本项目：堆 13.25g + 非堆 ~10g + 中间件 5.5g + OS 3g ≈ **31.75g，贴红线** → 话术：Xss 降到 512k、非核心降配挤出余量
- 三个兜底：对标旧环境 → 压测拿活跃集（jmap -histo:live）→ 监控两周修正（"能观测、两周调准"比"一次配准"重要）

## 2. G1 参数（每个参数一句话）

- 模型三句：region 等大分割 / Young GC + Mixed GC / 停顿目标是第一公民
- `UseG1GC`：弃 CMS 因为碎片化 + 停顿不可控
- `MaxGCPauseMillis=200`：软目标；越小越频繁回收、吞吐越低
- `G1HeapRegionSize=16m`：3g 堆 192 region（应<2048）；**humongous 阈值 = 8m**，大对象场景（导出/报文）易踩
- `G1ReservePercent=15`：预留 15% 白不用（3g 堆 450m）；默认才 10%，偏高可降
- `IHOP=65`：老年代 65% 触发并发标记；显式指定后关闭自适应；与 Reserve 配合，有效容量 ≈ 100%-Reserve
- `G1NewSizePercent=10/40`：区间偏窄，峰值突发对象可能晋升变多
- 纠错点（主动说加分）：`UnlockExperimentalVMOptions` 是历史遗留可去掉；一套参数 256m~3g 一刀切不合理，应按堆分档

## 3. 排查决策树（现象 → 方向）

```
CPU 高(GC正常)   → top -Hp → nid 十六进制 → jstack → 代码行（死循环/自旋/无退避重试）
内存涨/OOM       → jstat -gcutil O 区 → jmap -histo:live → dump+MAT（静态缓存/ThreadLocal/key 不收敛）
M 区涨           → jcmd GC.class_histogram（类加载器泄漏）
接口慢/卡死      → jstack 连打 3 次：BLOCKED=锁竞争 / WAITING=线程池耗尽
周期重启         → OOM 日志 + heapdump
```

- 一句话加分：**"GC 停顿 ≠ 应用停顿"**（PrintGCApplicationStoppedTime）
- 工具链：jps → jstat → jmap → jstack → jcmd → MAT；加分 Arthas

## 4. 三个主打案例（一句话版）

- **A 额度锁竞争**：分桶 ReentrantLock（AvailLockManager）正确，问题是**无退避自旋 + 锁 Map 只增不减** → tryLock 超时+退避、锁清理 → CPU 高峰降 xx%
- **B 静态缓存泄漏**：common-cache 全量刷静态 Map，**换引用 vs 塞旧 Map** 是分水岭；+ ThreadLocal 未 remove → 原子替换 + TTL + finally remove → FGC 归零
- **C 外部接口雪崩**：CFETS Feign 同步 60s 无熔断 → 线程池耗尽 → **超时分级 + Sentinel 熔断 + 信号量隔离 + 回报异步化** → 单点快速失败
- 原则：只讲代码里有的；每个案例备好"追问三连"（怎么定位/为什么这么改/怎么验证）；没经历过的降级讲方法论

## 5. 项目真实案例（条件单拆单，新加的硬菜）

- 场景：2000 笔条件单同时触发，每 3s 拆一单 → 卡慢
- 根因：**首轮 delay=0 对齐（瞬时脉冲）+ 每笔全量校验 + 5 次 DB 写 + 线程池 50 不够（需 133）**
- 解法：首轮 jitter 削峰 + 令牌桶限速 / 拆单子单简化校验（只留额度+风控）/ 同向聚合批量 / 拒绝策略改延时重试
- 一句话：**"隔离解决雪崩扩散，没解决自身吞吐上限"**

## 6. 线程模型（8 核）

- Tomcat 1000 线程 = IO 等外部，CPU 密集只有 8 个；1000×512k ≈ 512m 栈内存实打实
- Xss 512k：省内存，深递归/大栈帧才危险，jstack 验证
- 线程池 core/max/queue 关系 + 拒绝策略：Abort / CallerRuns / Discard；高峰打满怎么办
- ThreadLocal + transmittable-thread-local：finally remove，线程池复用透传

## 7. 高频追问口袋（一句答）

- 堆小 → Full GC 频繁；堆大 → 停顿失控 + 浪费
- G1 退化 Full GC：标记失败 / 晋升失败(to-space exhausted) / humongous 分配失败
- region < 2048：RS 维护开销
- Xss 会溢出吗：正常业务 512k 几百层调用没问题，观测栈深度
- Xms=Xmx 为什么：避免扩容抖动，配合 AlwaysPreTouch

## 8. 调优方法论闭环（万能结尾）

**压测定基线 → GC 日志/JMX 找瓶颈 → 改参数/改代码 → 再压测对比**。简历/回答里所有效果落数字（停顿 xx→xx ms、FGC 次数、吞吐 +x%）。

## 9. 命令速记

```bash
jps -lv                                    # 进程 + 启动参数
jstat -gcutil <pid> 1000                   # GC 水位 S/E/O/M + FGC/FGCT
jmap -histo:live <pid> | head -30          # 存活对象 top
jmap -dump:format=b,file=h.hprof <pid>     # 堆转储（STW 注意）
jstack <pid>                               # 线程快照（连打 3 次看分布；搜 deadlock）
jcmd <pid> GC.class_histogram              # Metaspace/类加载
top -Hp <pid> → printf '%x' nid            # CPU 热点线程
```

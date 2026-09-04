---
group: JVM调优专题
title: G1 调优
order: 4
---

# G1 调优：参数讲道理（结合 inner.sh 现有配置）

## 0. G1 核心模型（讲任何参数都能套的三句话）

1. 堆被切成等大的 region（默认 1~32MB），每个 region 独立扮演 Eden/Survivor/Old/Humongous；
2. 回收分两类：Young GC（只清年轻代）+ Mixed GC（并发标记 + 回收老年代里回收成本最低的 region），目标是把停顿控制在可预期范围内；
3. 停顿目标（pause goal）是 G1 的"第一公民"，所有参数都为它服务。

面试先讲这三句，再展开参数 → "懂模型而不是背参数"。

## 1. -XX:+UseG1GC：为什么 JDK8 选 G1 弃 CMS

- CMS 问题：老年代碎片化（标记-清除不压缩）、停顿不可控（并发失败退化成 Serial Full GC）、JDK8 后期维护投入下降
- G1 优势：可预测停顿（region 级回收 + 停顿目标）、大堆下吞吐不输 CMS、压缩式回收无碎片
- JDK8 上 G1 非默认需显式开启；JDK9+ 才默认
- 项目落点：10 个 JVM 全部 UseG1GC，堆 256m~3g 一刀切 → 主动指出问题：gateway 256m 小堆用 G1 + 16m region 只有 16 个 region，G1 优势发挥不出来，小堆更适合串行/并行 GC 或调小 region（加分点）

## 2. -XX:MaxGCPauseMillis=200：目标停顿（最核心）

- 软目标（soft goal）非硬保证；G1 动态调年轻代大小逼近它
- 怎么定：交易链路端到端超时（Feign 3~10s）里 GC 停顿只占一小段；开市高峰下单延迟敏感可往 50~100ms 调，以吞吐换
- 关键认知：停顿目标越小 → G1 越频繁回收、吞吐越低；200ms 在 8 核机器偏保守
- 验证：GC 日志 `Pause Time: 45ms` 是否长期低于目标

## 3. -XX:G1HeapRegionSize=16m：region 大小（讲推导）

- 公式：region 数量 = 堆 / region 大小；官方建议 region 数 < 2048
- 反推：3g 堆若期望 1000~2048 region，region 应取 1~4m；16m 意味着 3g 堆只有 192 个 region，偏少
- 16m 后果：
  - region 少 → 年轻代弹性粒度粗（16m 步进）
  - Humongous 阈值 = region 的 50% = 8m；>8m 大对象（EasyExcel 导出、批量报文）直接进 humongous region，不被 G1 回收优化、易引发 Full GC
- 正确姿势：大对象多 → region 调大减少跨 region 引用；大对象少 → region 偏小更灵活；本项目大对象场景多（报表导出/行情报文），16m 是"为 humongous 让路"，但要能讲出 trade-off
- 小堆适配：gateway 256m 堆 16m region 只剩 16 个，明显不合理 → 小堆让 G1 自动选 region 或显式调小

## 4. -XX:G1ReservePercent=15：预留区（讲代价）

- 含义：为晋升失败预留的堆比例（默认 10%）；晋升失败会退化成 Full GC
- 代价：预留的 15% 实打实不能用（3g 堆 = 450m 白留）；Reserve 越高越不易晋升失败，但堆利用率越低
- 项目现状：15% 偏高 → 话术："调优时把 Reserve 从 15 降回 10 观察晋升失败率"

## 5. -XX:InitiatingHeapOccupancyPercent=65（IHOP）：并发标记触发点

- 含义：老年代占用达 65% 启动并发标记周期（concurrent marking cycle），为后续 Mixed GC 收集数据
- 与 Reserve 配合：老年代安全水位 ≈ 100% − Reserve%
- IHOP=65：标记启动早、Mixed GC 频率高、老年代水位低 → 停顿平稳但 GC 开销大
- IHOP 调高（75~80）：Mixed GC 少、吞吐高，但老年代水位高、晋升失败风险大
- 权衡：交易低延迟 → 可接受更频繁 Mixed GC 换低水位 → 65 合理；注意：显式指定 IHOP 后关闭 G1 自适应（默认 adaptive）
- 观测：GC 日志 concurrent-mark-start 到 mixed 的节奏

## 6. -XX:G1NewSizePercent=10 / G1MaxNewSizePercent=40：年轻代弹性

- 含义：年轻代占堆比例范围（默认 5%/60%），G1 在区间内按停顿目标动态调整
- 10~40% 区间偏窄：40% 上限限制弹性，开盘高峰突发新对象（指令/报价/报文）时年轻代可能不够装 → 晋升变多、Mixed GC 变频繁
- 更合理：上限放宽到 50~60% 或干脆不显式设让 G1 自适应
- 呼应内存预算：新生代容量 vs 交易峰值突发分配

## 7. 加分纠错点（面试主动说，非常亮眼）

1. `-XX:+UnlockExperimentalVMOptions`：JDK8 早期 G1 需要解锁，稳定后已无必要 → "脚本里带着实验性开关，是历史遗留，实际可去掉"（抄参数痕迹的实锤）
2. 同一套 G1 参数 256m~3g 一刀切不合理：region 数、IHOP、NewSizePercent 应按堆大小分档配置（gateway 小堆简化、核心大堆精细调）——10 服务共置一机的专业度体现

## 8. 用 GC 日志反推（项目已开 PrintGCDetails + PrintGCDateStamps + PrintGCApplicationStoppedTime + 5×20M rotation）

日志重点看四样：
```
# 1) 停顿是否达标：Pause Time 是否长期 > MaxGCPauseMillis
[GC pause (G1 Evacuation Pause) (young) ... Pause Time: 45.2ms]
# 2) Real Time vs User Time（并行 GC 时 User 可能远大于 Real）
# 3) Mixed GC 频率：concurrent-mark-start 之后有没有一串 (mixed) 回收
# 4) 异常信号：
[Full GC ...]                       # Full GC = 晋升失败/humongous 挤爆
[GC pause (G1 Evacuation Pause) (young) (to-space exhausted)]  # 预留区不够，Reserve 要调大
Humongous: 32.0M                    # 大对象分配统计
```

反推闭环（面试直接讲）：
- 停顿频繁超 200ms → MaxGCPauseMillis 不现实 或 humongous/Full GC 拖后腿 → 查 to-space exhausted 和 Humongous
- Mixed GC 太频繁 → IHOP 太低或 Reserve 太高致有效容量小 → 调高 IHOP 观察
- PrintGCApplicationStoppedTime 统计应用实际停顿：GC 停顿只是应用停顿一部分（还有 safepoint）
- 流程：读日志 → 定位异常类别 → 只改 1~2 个参数 → 压测对比 Pause Time 分布（P50/P99）→ 迭代

## 9. 面试话术（背诵版）

> "G1 调优我按'停顿目标驱动'来讲：机器 8 核，交易系统低延迟，目标停顿设 200ms。3g 堆配 16m region 只有 192 个 region，偏少；16m 下 humongous 阈值 8m，报表导出和批量报文容易踩大对象分配，所以我调优时关注 GC 日志里 Humongous 统计和 to-space exhausted；IHOP=65 + Reserve=15 的组合偏保守，老年代有效容量只有约 85%，Mixed GC 会偏频繁，可以降 Reserve、微调 IHOP 换吞吐；另外 gateway 256m 小堆套同一套 G1 参数不合理，我按堆大小分档配置。验证靠 GC 日志：看 Pause Time 分布是否达标、Mixed GC 频率、有没有 Full GC 和 to-space exhausted，改完参数再压测对比。"

## 10. 高频追问准备

- "G1 什么时候退化成 Full GC？" → 并发标记失败、晋升失败（to-space exhausted）、humongous 无法分配；Full GC 是 STW 全局回收，G1 的"最后手段"
- "MaxGCPauseMillis 是硬性保证吗？" → 软目标，靠调整年轻代大小逼近，不是每次都保证
- "为什么 region 数量要 < 2048？" → region 过多时 Remembered Set 维护开销大，侵蚀 GC 效率
- "IHOP 设了 65 还会自适应吗？" → 显式指定后关闭自适应
- "怎么判断堆该调大还是调小？" → 频繁 Mixed GC 但老年代水位低 → 堆偏大；老年代涨到 IHOP 触发标记、回收完水位仍高 → 堆偏小

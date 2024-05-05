---
group: JVM专题
title: JVM的垃圾收集(G1)
order: 5
---


# JVM 的垃圾收集2

## G1

 **(-XX:+UseG1GC)**

G1 (Garbage-First) 是一款**面向服务器**的垃圾收集器，主要针对配备多颗处理器及大容量内存的机器. 以极高概率满足 GC 停顿时间要求的同时，还具备高吞吐量性能特征

- **堆内存如何划分**：G1 将 Java 堆划分为多个大小相等的独立区域（Region），JVM 目标是不超过 2048 个 Region`默认`。一般 Region 大小等于堆大小除以 2048，比如堆大小为 4096M，则 Region 大小为 2M，当然也可以用参数 "-XX:G1HeapRegionSize" 手动指定 Region 大小，但是推荐默认的计算方式
- **Region如何分配**：默认年轻代对堆内存的占比是 5%，如果堆大小为 4096M，那么年轻代占据 200MB 左右的内存，对应大概是 100 个 Region，可以通过 “-XX:G1NewSizePercent” 设置新生代初始占比，在系统运行中，JVM 会不停的给年轻代增加更多的 Region，但是最多新生代的占比不会超过 60%，可以通过 “-XX:G1MaxNewSizePercent” 调整。年轻代中的 Eden 和 Survivor 对应的 region 也跟之前一样，默认 8:1:1，假设年轻代现在有 1000 个 region，eden 区对应 800 个，s0 对应 100 个，s1 对应 100 个。

- **区域功能动态变化**：一个 Region 可能之前是年轻代，如果 Region 进行了垃圾回收，之后可能又会变成老年代，也就是说 Region 的区域功能可能会动态变化

- **大对象的处理**：G1 垃圾收集器对于对象什么时候会转移到老年代跟之前讲过的原则一样，**唯一不同的是对大对象的处理**，G1 有专门分配大对象的 Region 叫 **Humongous 区**，而不是让大对象直接进入老年代的 Region 中。在 G1 中，大对象的判定规则就是一个大对象超过了一个 Region 大小的 50%，比如按照上面算的，每个 Region 是 2M，只要一个大对象超过了 1M，就会被放入 Humongous 中，而且一个大对象如果太大，可能会**横跨多个 Region 来存放**。

> **Humongous 区专门存放短期巨型对象，不用直接进老年代，可以节约老年代的空间，避免因为老年代空间不够的 GC 开销。**Full GC 的时候除了收集年轻代和老年代之外，也会将 Humongous 区一并回收。



### **G1 收集器如何进行垃圾回收？**

importantsign

- G1 收集器一次 GC (主要值 Mixed GC) 的运作过程大致分为以下几个步骤：

1. **初始标记**（initial mark，STW）：暂停所有的其他线程，并记录下 gc roots 直接能引用的对象，**速度很快** ；
2. **并发标记**（Concurrent Marking）：同 CMS 的并发标记

3. **最终标记**（Remark，STW）：同 CMS 的重新标记

4. **筛选回收**（Cleanup，STW）：筛选回收阶段首先对各个 Region 的回收价值和成本进行排序**，**根据用户所期望的 GC 停顿 STW 时间 (**可以用 JVM 参数 -XX:MaxGCPauseMillis** 指定) 来制定回收计划

   - **什么是回收计划？**：比如说老年代此时有 1000 个 Region 都满了，但是因为根据预期停顿时间，本次垃圾回收可能只能停顿 200 毫秒，那么通过之前回收成本计算得知，可能回收其中 800 个 Region 刚好需要 200ms，那么就只会回收 800 个 Region ，尽量把 GC 导致的停顿时间控制在我们指定的范围内。

   - **为什么这个阶段是STW,而CMS不是呢？**：这个阶段其实也可以做到与用户程序一起并发执行，但是因为只回收一部分 Region，时间是**用户可控制**的，而且停顿用户线程将大幅提高收集效率。不管是年轻代或是老年代

   - **为什么大内存下G1比CMS要快呢？**：回收算法主要用的是**复制算法**`复制算法远超整理和清除算法`，将一个 region 中的存活对象复制到另一个 region 中，这种不会像 CMS 那样回收完因为有很多内存碎片还需要整理一次，G1 采用复制算法回收几乎不会有太多内存碎片。(CMS 回收阶段是跟用户线程一起并发执行的，**G1 因为内部实现太复杂暂时没实现并发回收**)

     > 第一是G1复杂内存不能实现并发回收，第二是复制算法本身就很快



- **回收成本如何实现？**：G1 收集器在后台维护了一个优先列表，每次根据允许的收集时间，优先选择回收价值最大的 Region (**这也就是它的名字 Garbage-First 的由来**)

  比如一个 Region 花 200ms 能回收 10M 垃圾，另外一个 Region 花 50ms 能回收 20M 垃圾，在回收时间有限情况下，G1 当然会优先选择后面这个 Region 回收。这种使用 Region 划分内存空间以及有优先级的区域回收方式，保证了 G1 收集器在有限时间内可以尽可能高的收集效率。

  

- 被视为 JDK1.7 以上版本 Java 虚拟机的一个重要进化特征。它具备以下特点：

1. **并行与并发**：G1 能充分利用 CPU、多核环境下的硬件优势，使用多个 CPU（CPU 或者 CPU 核心）来缩短 Stop-The-World 停顿时间。部分其他收集器原本需要停顿 Java 线程来执行 GC 动作，G1 收集器仍然可以通过并发的方式让 java 程序继续执行。

2. **分代收集**：虽然 G1 可以不需要其他收集器配合就能独立管理整个 GC 堆，但是还是保留了分代的概念。

3. **空间整合**：与 CMS 的 “标记 -- 清理” 算法不同，G1 从整体来看是基于 “**标记整理**” 算法实现的收集器；从局部上来看是基于 “复制” 算法实现的。

4. **可预测的停顿**：这是 G1 相对于 CMS 的另一个大优势，降低停顿时间是 G1 和 CMS 共同的关注点，但 G1 除了追求低停顿外，还能建立可预测的停顿时间模型，能让使用者明确指定在一个长度为 M 毫秒的时间片段 (通过参数 "**-XX:MaxGCPauseMillis**" 指定) 内完成垃圾收集。

>  可以由用户指定期望的停顿时间是 G1 收集器很强大的一个功能， 设置不同的期望停顿时间， 可使得 G1 在不同应用场景中取得关注吞吐量和关注延迟之间的最佳平衡。 不过这里设置的 “期望值” 必须是符合实际的，毕竟 G1 是要冻结用户线程来复制对象的， 这个停顿时间再怎么低也得有个限度。
>
>  它默认的停顿目标为**两百毫秒**， 但如果我们把停顿时间调得非常低， 譬如设置为二十毫秒， 很可能出现的结果就是由于停顿目标时间太短， 导致每次选出来的回收集只占堆内存很小的一部分， 收集器收集的速度逐渐跟不上分配器分配的速度， 导致垃圾慢慢堆积，最终占满堆引发 Full GC 反而降低性能



### **G1 垃圾收集分类**

- **YoungGC**

YoungGC 并不是说现有的 Eden 区放满了就会马上触发，G1 会计算下现在 Eden 区回收大概要多久时间，如果回收时间远远小于参数 -XX:MaxGCPauseMillis 设定的值，那么增加年轻代的 region，继续给新对象存放，不会马上做 Young GC，直到下一次 Eden 区放满，**G1 计算回收时间接近参数 -XX:MaxGCPauseMillis 设定的值，那么就会触发 Young GC**

- **MixedGC**

不是 FullGC，老年代的堆占有率达到参数 (**-XX:InitiatingHeapOccupancyPercent**，**默认45%**) 设定的值则触发，回收所有的 Young 和部分 Old (根据期望的 GC 停顿时间确定 old 区垃圾收集的优先顺序) 以及**大对象区**，正常情况 G1 的垃圾收集是先做 MixedGC，主要使用复制算法，需要把各个 region 中存活的对象拷贝到别的 region 里去，拷贝过程中如果发现**没有足够的空 region** 能够承载拷贝对象**就会触发一次 Full GC**

- **Full GC**

停止系统程序，然后采用**单线程**进行标记、清理和压缩整理，好空闲出来一批 Region 来供下一次 MixedGC 使用，这个过程是**非常耗时**的。(Shenandoah 优化成多线程收集了)   `有点类似cms的并发收集失败之后使用单线程收集`



### **G1 收集器参数设置** 

  -XX:+UseG1GC: 使用 G1 收集器   （cms一样）

  -XX:ParallelGCThreads: 指定 GC 工作的线程数量   （cms一样）

  -XX:G1HeapRegionSize: 指定分区大小 (1MB~32MB，且必须是 2 的 N 次幂)，默认将整堆划分为 2048 个分区

  **-XX:MaxGCPauseMillis:** 目标暂停时间 (默认 200ms)

  -XX:G1NewSizePercent: 新生代内存初始空间 (默认整堆 5%，值配置整数，默认就是百分比，不需要改变这个参数，jvm会根据停顿时间自动往上增加)

  -XX:G1MaxNewSizePercent: 新生代内存最大空间（默认60%）

  -XX:TargetSurvivorRatio:Survivor 区的填充容量 (默认 50%)，Survivor 区域里的一批对象 (年龄 1 + 年龄 2 + 年龄 n 的多个年龄对象) 总和超过了 Survivor 区域的 50%，此时就会把年龄 n (含) 以上的对象都放入老年代   （cms一样，对象动态年龄判断，分代收集器都有）

  -XX:MaxTenuringThreshold: 最大年龄阈值 (默认 15)     （cms一样）

  **-XX:InitiatingHeapOccupancyPercent**: 老年代占用空间达到整堆内存阈值 (默认 45%)，则执行新生代和老年代的混合收集 (MixedGC)，比如我们之前说的堆默认有 2048 个 region，如果有接近 1000 个 region 都是老年代的 region，则可能就要触发 MixedGC 了

> 触发mixedGc的阈值，在G1中，MixedGc反倒类似CMS的fullGC

 **-XX:G1MixedGCLiveThresholdPercent** (默认 85%)  region 中的存活对象低于这个值时才会回收该 region，如果超过这个值，存活对象过多，回收的的意义不大。几乎不需要调

> 如果一个region有100个对象，里面85个都不是垃圾那么就不对这块区域做处理，如果小于就进行一次标记复制

  **-XX:G1MixedGCCountTarget:** 在一次回收过程中指定做几次筛选回收 (默认 8 次)，在最后一个筛选回收阶段可以回收一会，然后暂停回收，恢复系统运行，一会再开始回收，这样可以让系统不至于单次停顿时间过长。

> 一次停顿200ms，G1会把这段时间摊到这200ms里，分8次进行回收

  -XX:G1HeapWastePercent (默认 5%): gc 过程中空出来的 region 是否充足阈值，在混合回收的时候，对 Region 回收都是基于复制算法进行的，都是把要回收的 Region 里的存活对象放入其他 Region，然后这个 Region 中的垃圾对象全部清理掉，这样的话在回收过程就会不断空出来新的 Region，一旦空闲出来的 Region 数量达到了堆内存的 5%，此时就会立即停止混合回收，意味着本次混合回收就结束了。  `region到达5%表示mixedGC结束`



### **G1 垃圾收集器优化建议**

假设参数 -XX:MaxGCPauseMills 设置的值很大，导致系统运行很久才会做年轻代 gc，年轻代可能都占用了堆内存的 60% 了，此时才触发年轻代 gc。那么**存活下来的对象可能就会很多，此时就会导致 Survivor 区域放不下那么多的对象，就会进入老年代中**。

或者是你年轻代 gc 过后，存活下来的对象过多，导致进入 Survivor 区域后触发了动态年龄判定规则，达到了 Survivor 区域的 50%，也会快速导致一些对象进入老年代中。

所以这里核心还是在于调节 -XX:MaxGCPauseMills 这个参数的值，在保证他的年轻代 gc 别太频繁的同时，还得考虑每次 gc 过后的存活对象有多少，**避免存活对象太多快速进入老年代，频繁触发 mixed gc.**



### **什么场景适合使用 G1**

- 50% 以上的堆被存活对象占用

- 对象分配和晋升的速度变化非常大

- 垃圾回收时间特别长，超过 1 秒

- **8GB 以上的堆内存 (建议值)**

- 停顿时间是 500ms 以内

**每秒几十万并发的系统如何优化 JVM**

对于 kafka 来说，每秒处理几万甚至几十万消息时很正常的，一般来说部署 kafka 需要用大内存机器 (比如 64G)，也就是说可以给年轻代分配个三四十 G 的内存用来支撑高并发处理

这里就涉及到一个问题了，我们以前常说的对于 eden 区的 young gc 是很快的，这种情况下它的执行还会很快吗？很显然，不可能，因为内存太大，处理还是要花不少时间的，假设三四十 G 内存回收可能最快也要几秒钟，按 kafka 这个并发量放满三四十 G 的 eden 区可能也就一两分钟吧，那么意味着整个系统每运行一两分钟就会因为 young gc 卡顿几秒钟没法处理新消息，显然是不行的

那么对于这种情况如何优化了，我们可以使用 G1 收集器，设置 -XX:MaxGCPauseMills 为 50ms，假设 50ms 能够回收三到四个 G 内存，然后 50ms 的卡顿其实完全能够接受，用户几乎无感知，那么整个系统就可以在卡顿几乎无感知的情况下**一边处理业务一边收集垃圾**

**G1 天生就适合这种大内存机器的 JVM 运行，可以比较完美的解决大内存垃圾回收时间过长的问题**

### 如何选择垃圾收集器
- 优先调整堆的大小让服务器自己来选择
- 如果内存小于 100M，使用串行收集器
- 如果是单核，并且没有停顿时间的要求，串行或 JVM 自己选择
- 如果允许停顿时间超过 1 秒，选择并行或者 JVM 自己选
- 如果响应时间最重要，并且不能超过 1 秒，使用并发收集器
- 4G 以下可以用 parallel，4-8G 可以用 ParNew+CMS，8G 以上可以用 G1，几百 G 以上用 ZGC

### 安全点与安全区域
安全点就是指代码中一些特定的位置,当线程运行到这些位置时它的状态是确定的,这样JVM就可以安全的进行一些操作,比
如GC等，所以GC不是想什么时候做就立即触发的，是需要等待所有线程运行到安全点后才能触发。
这些特定的安全点位置主要有以下几种:
1. 方法返回之前

2. 调用某个方法之后

3. 抛出异常的位置

4. 循环的末尾

大体实现思想是当垃圾收集需要中断线程的时候， 不直接对线程操作， 仅仅简单地设置一个标志位， 各个线程执行过程
时会不停地主动去轮询这个标志， 一旦发现中断标志为真时就自己在最近的安全点上主动中断挂起。 轮询标志的地方和
安全点是重合的。
**安全区域又是什么？**
Safe Point 是对正在执行的线程设定的。
如果一个线程处于 Sleep 或中断状态，它就不能响应 JVM 的中断请求，再运行到 Safe Point 上。
因此 JVM 引入了 Safe Region。
Safe Region 是指在一段代码片段中，引用关系不会发生变化。在这个区域内的任意地方开始 GC 都是安全的。
> 每次垃圾收集不是想收集就立刻中断线程来收集，而是根据代码中的安全点来判断
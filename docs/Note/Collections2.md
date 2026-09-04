---
group: 集合
title: Collections之ConcurrentHashMap
order: 2
---

# **Collections 之ConcurrentHashMap**

>  1.7jdkhashmap是线程不安全的，虽然1.8用高低位解决了循环链表，但多线程环境下还是建议用ConcurrentHashMap

ConcurrentHashMap 的数据结构与 HashMap 基本类似，区别在于：

1. 内部在数据写入时加了同步机制 (分段锁) 保证线程安全，读操作是无锁操作；

2. 扩容时老数据的转移是并发执行的，这样扩容的效率更高。

## **并发安全控制**

Java7 ConcurrentHashMap 基于 **ReentrantLock** 实现分段锁

<img src="../../public/images/image-20240406165759737.png" alt="image-20240406165759737" style="zoom:33%;" />

> Segment数组套table中的哈希Entry,两次哈希后再放到指定的hashEntry，类似于Map套Map，锁的粒度较粗
>
> 注意：hashTable是锁整个数组的，效率很低
>
> 记住 就是依靠Reentrantlcok实现的即可



Java8 中 ConcurrentHashMap 基于**分段锁 + CAS** 保证线程安全，分段锁基于 **synchronized** 关键字实现；

<img src="../../public/images/image-20240406170026773.png" alt="image-20240406170026773" style="zoom:33%;" />



## **重要成员变量**

ConcurrentHashMap 拥有出色的性能，在真正掌握内部结构时，先要掌握比较重要的成员:

- LOAD_FACTOR: 负载因子，默认 75%, 当 table 使用率达到 75% 时，为减少 table 的 hash 碰撞，tabel 长度将扩容一倍。负载因子计算：元素总个数 % table.lengh

- TREEIFY_THRESHOLD: 默认 8, 当链表长度达到 8 时，将结构转变为红黑树。

- UNTREEIFY_THRESHOLD: 默认 6, 红黑树转变为链表的阈值。

  > 以上和hashMap一样,以下是ConcurrentHashMap 重要属性

- **MIN_TRANSFER_STRIDE: 默认 16, table 扩容时，每个线程最少迁移 table 的槽位个数。** `mini_transfer_stride`

- **MOVED: 值为 - 1, 当 Node.hash 为 MOVED 时，代表着 table 正在扩容**

- **TREEBIN, 置为 - 2, 代表此元素后接红黑树。**

- **nextTable: table 迁移过程临时变量，在迁移过程中将元素全部迁移到 nextTable 上。**

- **sizeCtl: 用来标志 table 初始化和扩容的，不同的取值代表着不同的含义:**

  - **0: table 还没有被初始化**

  - **-1: table 正在初始化**

  - **小于 - 1: 实际值为 resizeStamp (n) << RESIZE_STAMP_SHIFT + 2, 表明 table 正在扩容**

  - **大于 0: 初始化完成后，代表 table 最大存放元素的个数，默认为 0.75*n**

- transferIndex: table 容量从 n 扩到 2n 时，是从索引 n->1 的元素开始迁移，transferIndex 代表当前已经迁移的元素下标

- ForwardingNode: 一个特殊的 Node 节点，其 hashcode=MOVED, 代表着此时 table 正在做扩容操作。扩容期间，若 table 某个元素为 null, 那么该元素设置为 ForwardingNode, 当下个线程向这个元素插入数据时，检查 hashcode=MOVED, 就会帮着扩容。

## putVal 插入数据

```java
final V putVal(K key, V value, boolean onlyIfAbsent) {
        if (key == null || value == null) throw new NullPointerException();
        int hash = spread(key.hashCode());
        int binCount = 0;
    	// *因为要注意并发场景，所以循环cas插入数据
        for (Node<K,V>[] tab = table;;) {
            Node<K,V> f; int n, i, fh;
            //1.先判断是否初始化 方法里面也是使用cas初始化ConcurrentHashMap的
            //竞争的是ConcurrentHashMap的sizeCtl，见上面sizeCtl的0和-1
            if (tab == null || (n = tab.length) == 0)
                tab = initTable();
            //和hashMap一样位运算计算位置，如果那个位置为空就用cas存入数据
            //如果成功则退出循环，没有则进入下一轮for循环，已经无法进入这个if了，执行最后一个else 
            else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
                if (casTabAt(tab, i, null,new Node<K,V>(hash, key, value, null)))
                    break;  // no lock when adding to empty bin
            }
            //正在扩容
            else if ((fh = f.hash) == MOVED)
                //这个线程会帮忙迁移
                tab = helpTransfer(tab, f);
            else {
                //
                V oldVal = null;
                //f就是i索引处的那个节点
                synchronized (f) {
                    if (tabAt(tab, i) == f) {
                        //表示当前节点是链表节点，尾插
                        if (fh >= 0) {
  							//记录链表的长度，1表示当前链表中已经有一个节点
                            binCount = 1;  
                            for (Node<K,V> e = f;; ++binCount) {
                                K ek;
                                //这里表示相同键值的覆盖，比如插入“chen,1”,之前已经有“chen,2”,则会循环遍历寻找“chen”这							个key然后进行覆盖
                                if (e.hash == hash &&
                                    ((ek = e.key) == key ||
                                     (ek != null && key.equals(ek)))) {
                                    oldVal = e.val;
                                    if (!onlyIfAbsent)
                                        e.val = value;
                                    break;
                                }
                                //找不到就进行尾插
                                Node<K,V> pred = e;
                                if ((e = e.next) == null) {
                                    pred.next = new Node<K,V>(hash, key,
                                                              value, null);
                                    break;
                                }
                            }
                        }
                        //红黑树时的插入
                        else if (f instanceof TreeBin) {
                            Node<K,V> p;
                            binCount = 2;
                            if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                           value)) != null) {
                                oldVal = p.val;
                                if (!onlyIfAbsent)
                                    p.val = value;
                            }
                        }
                    }
                }
                if (binCount != 0) {
                    //如果 binCount 大于等于树化阈值 TREEIFY_THRESHOLD，则将当前链表转化为树形结构
                    if (binCount >= TREEIFY_THRESHOLD)
                        treeifyBin(tab, i);
                    if (oldVal != null)
                        //如果 oldVal 不为 null，表示有旧值被替换，将旧值返回
                        return oldVal;
                    break;
                }
            }
        }
       //更新 ConcurrentHashMap 中的计数器，用于跟踪 Map 中的元素数量
        addCount(1L, binCount);
        return null;
    }
```



## **协助扩容 helpTransfer**

​	ConcurrentHashMap 由三部分构成，table + 链表 + 红黑树，其中 table 是一个数组，既然是数组，必须要在使用时确定数组的大小，当 table 存放的元素过多时，就需要扩容，以减少碰撞发生次数，本文就讲解扩容的过程。扩容检查主要发生在插入元素 (putVal ()) 的过程:

- 一个线程插完元素后，检查 table 使用率，若超过阈值，调用 transfer 进行扩容

- 一个线程插入数据时，发现 table 对应元素的 hash=MOVED, 那么调用 helpTransfer () 协助扩容。

```java
final Node<K,V>[] helpTransfer(Node<K,V>[] tab, Node<K,V> f) { //table扩容
        Node<K,V>[] nextTab; int sc;
        if (tab != null && (f instanceof ForwardingNode) &&
            (nextTab = ((ForwardingNode<K,V>)f).nextTable) != null) {
            // 根据 length 得到一个标识符号
            int rs = resizeStamp(tab.length);
            while (nextTab == nextTable && table == tab &&
                   //说明还在扩容
                   (sc = sizeCtl) < 0) {
                //判断是否标志发生了变化||  扩容结束了
                if ((sc >>> RESIZE_STAMP_SHIFT) != rs || sc == rs + 1 ||
                     //达到最大的帮助线程 ||  判断扩容转移下标是否在调整（扩容结束）
                    sc == rs + MAX_RESIZERS || transferIndex <= 0)
                    break;
                // 将 sizeCtl + 1, （表示增加了一个线程帮助其扩容）
                if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1)) {
                    transfer(tab, nextTab);
                    break;
                }
            }
            return nextTab;
        }
        return table;
}
```

- 检查是否扩容完成

- 对 sizeCtrl = sizeCtrl+1, 然后调用 transfer () 进行真正的扩容。



## **扩容 transfer(困难)**

**扩容 transfer**

扩容的整体步骤就是新建一个 nextTab, size 是之前的 2 倍，将 table 上的非空元素迁移到 nextTab 上面去。

```java
private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
    int n = tab.length, stride;
    if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
       // subdivide range，每个线程最少迁移16个槽位，大的话，最多
        stride = MIN_TRANSFER_STRIDE;
    // initiating  才开始初始化新的nextTab
    if (nextTab == null) {
        try {
            @SuppressWarnings("unchecked")
            Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n << 1];  //扩容2倍
            nextTab = nt;
        } catch (Throwable ex) {      // try to cope with OOME
            sizeCtl = Integer.MAX_VALUE;
            return;
        }
        nextTable = nextTab;
        transferIndex = n;//更新的转移下标，
    }
    int nextn = nextTab.length;
    ForwardingNode<K,V> fwd = new ForwardingNode<K,V>(nextTab);
    //是否能够向前推进到下一个周期
    boolean advance = true;
    // to ensure sweep before committing nextTab，完成状态，如果是，则结束此方法
    boolean finishing = false;
    for (int i = 0, bound = 0;;) {
        Node<K,V> f; int fh;
        while (advance) { //取下一个周期
            int nextIndex, nextBound;
            //本线程处理的区间范围为[bound, i),范围还没有处理完成，那么就继续处理
            if (--i >= bound || finishing)
                advance = false;
            //目前处理到了这里（从大到小， 下线），开始找新的一轮的区间
            else if ((nextIndex = transferIndex) <= 0) {
                i = -1;
                advance = false;
            }
            //这个条件改变的是transferIndex的值，从16变成了1
            else if (U.compareAndSwapInt
                     (this, TRANSFERINDEX, nextIndex,
                     //nextBound 是这次迁移任务的边界，注意，是从后往前
                      nextBound = (nextIndex > stride ?
                                   nextIndex - stride : 0))) {
                bound = nextBound; //一块区间最小桶的下标
                i = nextIndex - 1; //能够处理的最大桶的下标
                advance = false;
            }
        }
        if (i < 0 || i >= n || i + n >= nextn) { //每个迁移线程都能达到这里
            int sc;
            if (finishing) { //迁移完成
                nextTable = null;
                //直接把以前的table丢弃了，上面的MOVE等标志全部丢弃，使用新的
                table = nextTab;
                sizeCtl = (n << 1) - (n >>> 1); //扩大2n-0.5n = 1.50n, 更新新的容量阈值
                return;
            }
            //表示当前线程迁移完成了
            if (U.compareAndSwapInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {
                 //注意此时sc的值并不等于sizeCtl，上一步，sizeCtl=sizeCtl-1了。这两个对象还是分割的
                if ((sc - 2) != resizeStamp(n) << RESIZE_STAMP_SHIFT)
                    return;
                finishing = advance = true;
                i = n; // recheck before commit
            }
        }
        //如果对应位置为null， 则将ForwardingNode放在对应的地方
        else if ((f = tabAt(tab, i)) == null)
            advance = casTabAt(tab, i, null, fwd);
        else if ((fh = f.hash) == MOVED) //别的线程已经在处理了，再推进一个下标
            advance = true; // already processed，推动到下一个周期，仍然会检查i与bound是否结束
        else { //说明位置上有值了，
            //需要加锁，防止再向里面放值，在放数据时，也会锁住。比如整个table正在迁移，还没有迁移到这个元素，另外一个线程向这个节点插入数据，此时迁移到这里了，会被阻塞住
            synchronized (f) {
                if (tabAt(tab, i) == f) {//判断i下标和f是否相同
                    Node<K,V> ln, hn; //高位桶， 地位桶
                    if (fh >= 0) {
                        int runBit = fh & n;//n为2^n, 取余后只能是2^n
                        Node<K,V> lastRun = f;
                        ///找到最后一个不和fn相同的节点
                        for (Node<K,V> p = f.next; p != null; p = p.next) {
                            int b = p.hash & n;
                            //只要找到这，之后的取值都是一样的，下次循环时，就不用再循环后面的
                            if (b != runBit) {
                                runBit = b;
                                lastRun = p;
                            }
                        }
                        if (runBit == 0) {
                            ln = lastRun;
                            hn = null;
                        }
                        else { //比如1，16，32,如果低位%16，那么肯定是0。
                            hn = lastRun;
                            ln = null;
                        }
                        for (Node<K,V> p = f; p != lastRun; p = p.next) {
                            int ph = p.hash; K pk = p.key; V pv = p.val;
                            if ((ph & n) == 0)
                                 //这样就把相同串的给串起来了
                                ln = new Node<K,V>(ph, pk, pv, ln);
                            else
                                //这样就把相同串的给串起来了，注意这里ln用法，第一个next为null，烦着串起来了。
                                hn = new Node<K,V>(ph, pk, pv, hn);
                        }
                        setTabAt(nextTab, i, ln); //反着给串起来了
                        setTabAt(nextTab, i + n, hn);
                        setTabAt(tab, i, fwd);
                        advance = true;
                    }
                    else if (f instanceof TreeBin) {// 如果是红黑树
                        TreeBin<K,V> t = (TreeBin<K,V>)f;
                        TreeNode<K,V> lo = null, loTail = null; //也是高低节点
                        TreeNode<K,V> hi = null, hiTail = null;//也是高低节点
                        int lc = 0, hc = 0;
                        for (Node<K,V> e = t.first; e != null; e = e.next) { //中序遍历红黑树
                            int h = e.hash;
                            TreeNode<K,V> p = new TreeNode<K,V>
                                (h, e.key, e.val, null, null);
                            if ((h & n) == 0) { //0的放低位
                                //注意这里p.prev = loTail，每一个p都是下一个的prev
                                if ((p.prev = loTail) == null)
                                    lo = p; //把头记住
                                else
                                    loTail.next = p;  //上一次的p的next是这次的p
                                loTail = p; //把上次p给记住
                                ++lc;
                            }
                            else { //高位
                                if ((p.prev = hiTail) == null)
                                    hi = p; //把尾记住
                                else
                                    hiTail.next = p;
                                hiTail = p;
                                ++hc;
                            }
                        }
                        ln = (lc <= UNTREEIFY_THRESHOLD) ? untreeify(lo) :// //判断是否需要转化为树
                            (hc != 0) ? new TreeBin<K,V>(lo) : t; //如果没有高低的话，则部分为两个树
                        hn = (hc <= UNTREEIFY_THRESHOLD) ? untreeify(hi) :
                            (lc != 0) ? new TreeBin<K,V>(hi) : t;
                        setTabAt(nextTab, i, ln);
                        setTabAt(nextTab, i + n, hn);
                        setTabAt(tab, i, fwd);
                        advance = true;
                    }
                }
            }
        }
    }
}
```

其中有两个变量需要了解下:

- advance: 表示是否可以向下一个轮元素进行迁移。

- finishing: table 所有元素是否迁移完成。

大致做了如下事情:

- 确定线程每轮迁移元素的个数 stride, 比如进来一个线程，确定扩容 table 下标为 (a,b] 之间元素，下一个线程扩容 (b,c]。这里对 b-a 或者 c-b 也是由最小值 16 限制的。 也就是说每个线程最少扩容连续 16 个 table 的元素。而标志当前迁移的下标保存在 transferIndex 里面。

- 检查 nextTab 是否完成初始化，若没有的话，说明是第一个迁移的线程，先初始化 nextTab, size 是之前 table 的 2 倍。

- 进入 while 循环查找本轮迁移的 table 下标元素区间，保存在 (bound, i] 中，注意这里是半开半闭区间。

- 从 i -> bound 开始遍历 table 中每个元素，这里是从大到小遍历的:

1. 若该元素为空，则向该元素标写入 ForwardingNode, 然后检查下一个元素。 当别的线程向这个元素插入数据时，根据这个标志符知道了 table 正在被别的线程迁移，在 putVal 中就会调用 helpTransfer 帮着迁移。

2. 若该元素的 hash=MOVED, 代表次 table 正在处于迁移之中，跳过。 按道理不会跑着这里的。

3. 否则说明该元素跟着的是一个链表或者是个红黑树结构，若 hash>0, 则说明是个链表，若 f instanceof TreeBin, 则说明是个红黑树结构。

- 链表迁移原理如下: 遍历链表每个节点。 若节点的 f.hash&n==0 成立，则将节点放在 i, 否则，则将节点放在 n+i 上面。

​    迁移前，对该元素进行加锁。 遍历链表时，这里使用 lastRun 变量，保留的是上次 hash 的值，假如整个链表全部节点 f.hash&n==0, 那么第二次遍历，只要找到 lastRun 的值，那么认为之后的节点都是相同值，减少了不必要的 f.hash&n 取值。遍历完所有的节点后，此时形成了两条链表，ln 存放的是 f.hash&n=0 的节点，hn 存放的是非 0 的节点，然后将 ln 存放在 nextTable 第 i 元素的位置，n+i 存放在 n+i 的位置。

蓝色节点代表:f.hash&n==0, 绿色节点代表 f.hash&n!=0。 最终蓝色的节点仍在存放在 (0, n) 范围里，绿的节点存放在 (n, 2n-1) 的范围之内。

- 迁移链表和红黑树的原理是一样的，在红黑树中，我们记录了每个红黑树的 first (这个节点不是 hash 最小的节点) 和每个节点的 next, 根据这两个元素，我们可以访问红黑树所有的元素，红黑树此时也是一个链表，红黑树和链表迁移的过程一样。红黑树根据迁移后拆分成了 hn 和 ln, 根据链表长度确定链表是红黑树结构还是退化为了链表。

4. 如何确定 table 所有元素迁移完成:

```java
//表示当前线程迁移完成了
if (U.compareAndSwapInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {
     //注意此时sc的值并不等于sizeCtl，上一步，sizeCtl=sizeCtl-1了。这两个对象还是分割的
    if ((sc - 2) != resizeStamp(n) << RESIZE_STAMP_SHIFT)
        return;
    finishing = advance = true;
    i = n; // recheck before commit
}
```

第一个线程开始迁移时，设置了 sizeCtl= resizeStamp (n) << RESIZE_STAMP_SHIFT+2, 此后每个新来帮助迁移的线程都会 sizeCtl=sizeCtl+1, 完成迁移后，sizeCtl-1, 那么只要有一个线程还处于迁移状态，那么 sizeCtl> resizeStamp (n) << RESIZE_STAMP_SHIFT+2 一直成立，当只有最后一个线程完成迁移之后，等式两边才成立。 可能大家会有疑问，第一个线程并没有对 sizeCtl=sizeCtl+1, 此时完成后再减一，那不是不相等了吗，注意这里，sizeCtl 在减一前，将值赋给了 sc, 等式比较的是 sc。
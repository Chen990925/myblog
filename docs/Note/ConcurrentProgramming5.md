---
group: 并发编程
title: 并发编程之 BlockingQueue(困难)
order: 5
---

# 并发编程之 BlockingQueue(困难)

## **概要**

BlockingQueue，是java.util.concurrent 包提供的用于解决并发生产者 - 消费者问题的最有用的类

它的特性是在任意时刻只有一个线程可以进行take或者put操作，并且BlockingQueue提供了超时return null的机制，在许多生产场景里都可以看到这个工具的身影。



## **队列类型**

1. 无限队列 （unbounded queue ） - 几乎可以无限增长

2. 有限队列 （ bounded queue ） - 定义了最大容量

## **队列数据结构**

**队列实质就是一种存储数据的结构**

通常用链表或者数组实现

一般而言队列具备FIFO先进先出的特性，当然也有双端队列（Deque）优先级

队列

主要操作：入队（EnQueue）与出队（Dequeue）常见的4种阻塞队列

ArrayBlockingQueue 由数组支持的有界队列

LinkedBlockingQueue 由链接节点支持的可选有界队列

PriorityBlockingQueue 由优先级堆支持的无界优先级队列

DelayQueue 由优先级堆支持的、基于时间的调度队列

> 用于线程池，eureka三级缓存，nacos，netty ,rocketMq
>
> 在任意时刻不管并发有多高，在单jvm永远都只有一个线程（一个消费者或生产者）能对队列执行出入队操作，是线程间通信的工具

### **ArrayBlockingQueue**

队列基于数组实现,**容量大小在创建ArrayBlockingQueue对象时已定义好**

**队列创建**：`BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>();`

**应用场景**：在线程池中有比较多的应用，生产者消费者场景

**工作原理**：基于ReentrantLock保证线程安全，根据Condition实现队列满时的阻塞

#### ArrayBlockingQueue()：初始化方法,构造方法

```java
public ArrayBlockingQueue(int capacity, boolean fair) {
    if (capacity <= 0)
        throw new IllegalArgumentException();
    this.items = new Object[capacity];
    lock = new ReentrantLock(fair);//创建一把锁
    //创建两个条件对象，根据这两个对象来进行队列空和队列满的判断
    notEmpty = lock.newCondition();
    notFull =  lock.newCondition();
}
```

#### put：队列的尾部插入指定的元素

```java
public void put(E e) throws InterruptedException {
    checkNotNull(e);
    //获取队列中的可重入锁
    final ReentrantLock lock = this.lock;
    //以可中断方式获取锁，即如果当前线程在等待锁的过程中被中断，则会抛出InterruptedException异常
    lock.lockInterruptibly();
    try {
        //在队列已满的情况下，生产者需要等待队列不满的条件发生
        //这里使用了一个while循环来判断队列是否已满，如果队列已满，则调用notFull.await()方法使当前线程进入等待状态，直到有消费者线程从队列中取出元素释放了队列空间
        while (count == items.length)
            notFull.await();
        //如果队列不满，则将元素e插入队列尾部
        enqueue(e);
    } finally {
        lock.unlock();
    }
}
```

#### await：使线程进入等待状态

```java
public final void await() throws InterruptedException {
    //首先检查当前线程的中断状态，如果当前线程已经被中断，则抛异常，因为在等待期间不应该被中断
    if (Thread.interrupted())
        throw new InterruptedException();
    //将当前线程包装为一个等待节点，并添加到 条件队列 中
    Node node = addConditionWaiter();
    //释放当前线程持有的所有锁，并返回释放前的状态。这是为了确保当前线程在等待期间不持有任何锁，避免死锁的发生。
    int savedState = fullyRelease(node);
    int interruptMode = 0;
    //循环检查当前线程是否已经被移到同步队列中，即是否已经可以参与锁的竞争
    while (!isOnSyncQueue(node)) {
        //使当前线程进入等待状态，直到被唤醒或中断。
        LockSupport.park(this);
        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
            break;
    }
    //在退出循环后，尝试从条件队列转移到同步队列，并重新获取锁
    //如果成功获取锁，并且不是因为InterruptedException而中断，则将中断模式设置为REINTERRUPT
    if (acquireQueued(node, savedState) && interruptMode != THROW_IE)
        interruptMode = REINTERRUPT;
    if (node.nextWaiter != null) // clean up if cancelled
        unlinkCancelledWaiters();
    if (interruptMode != 0)
        reportInterruptAfterWait(interruptMode);
}
```



### **LinkedBlockingQueue**

是一个基于链表的无界队列(理论上有界)

`BlockingQueue<String> blockingQueue = new LinkedBlockingQueue<>();`

向无限队列添加元素的所有操作都将永远不会阻塞，[`注意这里不是说不会加锁保证线程安全`]，因此它可以增长到非常大的容量。

使用无限 BlockingQueue 设计生产者 - 消费者模型时最重要的是 **消费者应该能够像生产者向队列添加消息一样快地消费消息** 。否则，内存可能会填满，然后就会得到一个 OutOfMemory 异常。



### **DelayQueue**

由优先级堆支持的、基于时间的调度队列，内部基于无界队列PriorityQueue实现，而无界队列基于数组的扩容实现

入队的对象必须要实现Delayed接口,而Delayed集成自Comparable接口
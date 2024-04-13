---
group: 并发编程
title: 并发编程Tools:Semaphore和CountDownLatch
order: 6
---

# 并发编程Tools:Semaphore和**CountDownLatch** 

## Semaphore

### 什么是Semaphore？

Semaphore 字面意思是信号量的意思，它的作用是控制访问特定资源的线程数目，底层依赖 AQS 的状态 State，是在生产当中比较常用的一个工具类。

> **使用场景：**分布式锁，Jmeter 模拟高并发等



### **怎么使用 Semaphore？**

```java
public Semaphore(int permits)
public Semaphore(int permits, boolean fair)
```

- permits 表示许可线程的数量

- fair 表示公平性，如果这个设为 true 的话，下次执行的线程会是等待最久的线程



### **重要方法**

```java
public void acquire() throws InterruptedException
public void release()
tryAcquire（int args,long timeout, TimeUnit unit）
```

- acquire () 表示阻塞并获取许可

- release () 表示释放许可



### **基本使用**

>  资源访问，服务限流 (Hystrix 里限流就有基于信号量方式)。

```java
public class SemaphoreRunner {
    public static void main(String[] args) {
        //总的容量池
        Semaphore semaphore = new Semaphore(2);
        for (int i=0;i<5;i++){
            new Thread(new Task(semaphore,"yangguo+"+i)).start();
        }
    }
 
    static class Task extends Thread{
        Semaphore semaphore;
 
        public Task(Semaphore semaphore,String tname){
            this.semaphore = semaphore;
            this.setName(tname);
        }
 
        public void run() {
            try {
                //acquire()就是从池子拿出一个凭据
                semaphore.acquire();               
                System.out.println(Thread.currentThread().getName()+":aquire() at time:"+System.currentTimeMillis());
                Thread.sleep(1000);
                //release()就是把凭据还回池子
                semaphore.release();               
                System.out.println(Thread.currentThread().getName()+":aquire() at time:"+System.currentTimeMillis());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
 
        }
    }
}
```

打印结果：

>  Thread-3:aquire() at time:1563096128901
>
>  Thread-1:aquire() at time:1563096128901
>
>  //过了一秒
>
>  Thread-1:aquire() at time:1563096129903
>
>  Thread-7:aquire() at time:1563096129903
>
>  //过了一秒
>
>  Thread-5:aquire() at time:1563096129903
>
>  Thread-3:aquire() at time:1563096129903
>
>  。。。

从打印结果可以看出，一次只有两个线程执行 acquire ()，只有线程进行 release () 方法后才会有别的线程执行 acquire ()。

**tryAcquire()**

```java
public boolean tryAcquire(long timeout, TimeUnit unit)
//根据时间等待凭据,如果超时false就执行其他方法
//限流熔断降级依靠此方法实现
```



#### acquire()：获取共享锁（ AQS 下的共享模式）

**之前内容都是独占模式**

```java
//默认都是可中断的，acquireUninterruptibly()是不对中断做处理
public void acquire() throws InterruptedException {
	sync.acquireSharedInterruptibly(1);
}

public final void acquireSharedInterruptibly(int arg) throws InterruptedException {
    if (Thread.interrupted())
        throw new InterruptedException();
    //尝试获取共享模式锁，如果返回值小于0则说明获取失败，需要进一步处理
    if (tryAcquireShared(arg) < 0)
        //进行真正的获取共享模式锁的操作，使当前线程进入等待状态直到被唤醒或中断
        doAcquireSharedInterruptibly(arg);
}
```

#### tryAcquireShared：尝试获取共享模式锁

```java
//公平模式下
protected int tryAcquireShared(int acquires) {
    for (;;) {
        //检查是否有其他线程在当前线程之前已经排队等待获取锁，如果有则直接返回-1，表示获取失败，因为是公平的
        if (hasQueuedPredecessors())
            return -1;
        //获取共享资源的可用数量
        int available = getState();
        //计算剩余可用资源数量
        int remaining = available - acquires;
        //如果剩余资源数量小于0或者通过原子操作更新状态成功，返回剩余资源数量
        if (remaining < 0 ||compareAndSetState(available, remaining))
            return remaining;
    }
}
```

#### doAcquireSharedInterruptibly: 获取共享资源

```java
private void doAcquireSharedInterruptibly(int arg)
    throws InterruptedException {
    //线程节点入队操作，同ReentrantLock
    //不过是以以共享模式（Node.SHARED）添加到等待队列
    final Node node = addWaiter(Node.SHARED);
    boolean failed = true;
    try {
        for (;;) {
            final Node p = node.predecessor();
            if (p == head) {
                //检查前驱节点是否为头节点，如果是头节点，说明当前节点可以尝试获取共享资源。
                int r = tryAcquireShared(arg);
                //尝试以共享模式获取资源，并将获取结果保存到变量 r 中。
				//如果获取共享资源成功（r >= 0），则执行以下操作
                if (r >= 0) {
                    //尝试将共享资源向后传播给后续等待节点
                    setHeadAndPropagate(node, r);
                    p.next = null; // help GC
                    failed = false;
                    return;
                }
            }
            //线程唤醒和阻塞操作，同ReentrantLock
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                throw new InterruptedException();
        }
    } finally {
        //如果获取共享资源失败，则取消当前节点的获取操作
        if (failed)
            cancelAcquire(node);
    }
}
```



## **CountDownLatch** 

### **CountDownLatch 是什么？**

CountDownLatch 这个类能够使一个线程等待其他线程完成各自的工作后再执行。

例如，应用程序的主线程希望在负责启动框架服务的线程已经启动所有的框架服务之后再执行。`用在线程池中`

> Zookeeper 分布式锁，Jmeter 模拟高并发等

### **CountDownLatch 如何工作？**

CountDownLatch 是通过一个计数器来实现的，计数器的初始值为线程的数量。

每当一个线程完成了自己的任务后，计数器的值就会减 1。当计数器值到达 0 时，它表示所有的线程已经完成了任务，然后在闭锁上等待的线程就可以恢复执行任务。

```java
CountDownLatch.countDown()
CountDownLatch.await();
```

### **CountDownLatch 应用场景例子**

比如陪媳妇去看病。

医院里边排队的人很多，如果一个人的话，要先看大夫，看完大夫再去排队交钱取药。

现在我们是双核，可以同时做这两个事（多线程）。

假设看大夫花 3 秒钟，排队交费取药花 5 秒钟。我们同时搞的话，5 秒钟我们就能完成，然后一起回家（回到主线程）。

代码如下：

```java
/**
 * 看大夫任务
 */
public class SeeDoctorTask implements Runnable {
    private CountDownLatch countDownLatch;
 
    public SeeDoctorTask(CountDownLatch countDownLatch){
        this.countDownLatch = countDownLatch;
    }
 
    public void run() {
        try {
            System.out.println("开始看医生");
            Thread.sleep(3000);
            System.out.println("看医生结束，准备离开病房");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            if (countDownLatch != null)
                countDownLatch.countDown();
        }
    }
 
}
 
/**
 * 排队的任务
 */
public class QueueTask implements Runnable {
 
    private CountDownLatch countDownLatch;
 
    public QueueTask(CountDownLatch countDownLatch){
        this.countDownLatch = countDownLatch;
    }
    public void run() {
        try {
            System.out.println("开始在医院药房排队买药....");
            Thread.sleep(5000);
            System.out.println("排队成功，可以开始缴费买药");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            if (countDownLatch != null)
                countDownLatch.countDown();
        }
    }
}
 
/**
 * 配媳妇去看病，轮到媳妇看大夫时
 * 我就开始去排队准备交钱了。
 */
public class CountDownLaunchRunner {
 
    public static void main(String[] args) throws InterruptedException {
        long now = System.currentTimeMillis();
        CountDownLatch countDownLatch = new CountDownLatch(2);
 
        new Thread(new SeeDoctorTask(countDownLatch)).start();
        new Thread(new QueueTask(countDownLatch)).start();
        //等待线程池中的2个任务执行完毕，否则一直
        countDownLatch.await();
        System.out.println("over，回家 cost:"+(System.currentTimeMillis()-now));
    }
}
```
## **CyclicBarrier**

栅栏屏障，让一组线程到达一个屏障（也可以叫同步点）时被阻塞，直到最后一个线程到达屏障时，屏障才会开门，所有被屏障拦截的线程才会继续运行。

CyclicBarrier默认的构造方法是CyclicBarrier（int parties），其参数表示屏障拦截的线程数量，每个线程调用await方法告CyclicBarrier我已经到达了屏障，然后当前线程被阻塞。

**API**

```java
cyclicBarrier.await();
```

**应用场景**

可以用于多线程计算数据，最后合并计算结果的场景。例如，用一个Excel保存了用户所有银行流水，每个Sheet保存一个账户近一年的每笔银行流水，现在需要统计用户的日均银行流水，先用多线程处理每个sheet里的银行流水，都执行完之后，得到每个sheet的日均银行流水，最后，再用barrierAction用这些线程的计算结果，计算出整个Excel的日均银行流水。

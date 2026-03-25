"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2812],{42812:function(t,e,n){n.r(e),n.d(e,{texts:function(){return a}});const a=[{value:"\u670D\u52A1\u7AEF",paraId:0},{value:"\u521B\u5EFA\u4E86 ",paraId:1,tocIndex:3},{value:"NioEventLoopGroup",paraId:1,tocIndex:3},{value:" \u5B9E\u4F8B\uFF0C\u7528\u4E8E\u7BA1\u7406 ",paraId:1,tocIndex:3},{value:"NioEventLoop",paraId:1,tocIndex:3},{value:" \u5B9E\u4F8B\uFF0C\u5FAA\u73AF\u521B\u5EFA\u5E76\u6307\u5B9A ",paraId:1,tocIndex:3},{value:"NioEventLoop",paraId:1,tocIndex:3},{value:" \u5B9E\u4F8B\u7684\u6570\u91CF",paraId:1,tocIndex:3},{value:"NioEventLoop",paraId:2,tocIndex:3},{value:"\u521B\u5EFA\u4E86\u5176\u4E2D\u7684\u7EBF\u7A0B\u6C60\uFF0C\u591A\u8DEF\u590D\u7528\u5668\u548C\u4EFB\u52A1\u963B\u585E\u961F\u5217\u7B49\u5C5E\u6027",paraId:2,tocIndex:3},{value:"\u9996\u5148\u6211\u4EEC\u5728\u5199 Netty \u670D\u52A1\u7AEF\u7A0B\u5E8F\u7684\u65F6\u5019\u6700\u5F00\u59CB\u662F\u4E0B\u9762\u4E24\u53E5\u4EE3\u7801\uFF1A",paraId:3,tocIndex:3},{value:`//\u6307\u5B9AEvenLoopGroup\u4E2DEvenLoop\uFF08\u7EBF\u7A0B\u6570\uFF09\u7684\u6570\u91CF
EvenLoopGroup bossGroup = new NioEventLoopGroup(1);
//\u4F7F\u7528\u9ED8\u8BA4\u6570\u91CF
EvenLoopGroup bossGroup = new NioEventLoopGroup();
`,paraId:4,tocIndex:3},{value:"\u8FDB\u5165\u4ED6\u4EEC\u7684\u9ED8\u8BA4\u6784\u9020\u65B9\u6CD5\uFF1A",paraId:5,tocIndex:3},{value:"NioEventLoopGroup()",paraId:5,tocIndex:3},{value:`//\u5982\u679C\u6211\u4EEC\u4E0D\u4F20\u9012\u53C2\u6570\uFF0C\u9ED8\u8BA4\u6570\u5C31\u662F0
 public NioEventLoopGroup() {
        this(0);
    }

protected MultithreadEventLoopGroup(int nThreads, ThreadFactory threadFactory, Object... args) {
        super(nThreads == 0 ? DEFAULT_EVENT_LOOP_THREADS : nThreads, threadFactory, args);
    }
`,paraId:6,tocIndex:3},{value:"\u6700\u6838\u5FC3\u7684\u662F ",paraId:7,tocIndex:3},{value:"super(nThreads == 0 ? DEFAULT_EVENT_LOOP_THREADS : nThreads, threadFactory, args);",paraId:7,tocIndex:3},{value:"\u8FD9\u91CC\u9762\u5B83\u5224\u65AD\u53C2\u6570\u4F20\u5165\u7684\u7EBF\u7A0B\u6570 ",paraId:7,tocIndex:3},{value:"nThreads",paraId:7,tocIndex:3},{value:" \u662F\u5426\u4E3A 0\uFF0C\u5982\u679C\u662F 0 \u7EBF\u7A0B\u6570\u5C31\u662F\u9ED8\u8BA4\u7684 ",paraId:7,tocIndex:3},{value:"DEFAULT_EVENT_LOOP_THREADS",paraId:7,tocIndex:3},{value:"\u8FD9\u4E2A\u9ED8\u8BA4\u503C\u662F\u600E\u4E48\u521D\u59CB\u5316\u7684\uFF1F",paraId:8,tocIndex:3},{value:`private static final int DEFAULT_EVENT_LOOP_THREADS = Math.max(1, SystemPropertyUtil.getInt("io.netty.eventLoopThreads", NettyRuntime.availableProcessors() * 2));
`,paraId:9,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u7684\u903B\u8F91\u5C31\u662F 1 \u548C ",paraId:10,tocIndex:3},{value:"SystemPropertyUtil.getInt",paraId:10,tocIndex:3},{value:" \u7684\u8FD4\u56DE\u503C\u8FDB\u884C\u6BD4\u8F83",paraId:10,tocIndex:3},{value:"\u8FD9\u4E2A\u65B9\u6CD5\u4F1A\u9996\u5148\u5224\u65AD\u7CFB\u7EDF\u53C2\u6570 ",paraId:11,tocIndex:3},{value:'"io.netty.eventLoopThreads"',paraId:11,tocIndex:3},{value:" \u662F\u5426\u914D\u7F6E\u4E86\uFF0C\u914D\u7F6E\u4E86\u5C31\u7528\u8BE5\u7CFB\u7EDF\u53C2\u6570\u7684\u503C\uFF0C\u6CA1\u6709\u914D\u7F6E\u5C31\u4F7F\u7528 ",paraId:11,tocIndex:3},{value:"NettyRuntime.availableProcessors() * 2",paraId:11,tocIndex:3},{value:" \u4E5F\u5C31\u662F",paraId:11,tocIndex:3},{value:"\u8BE5\u673A\u5668\u6838\u6570\u7684 2 \u500D",paraId:11,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u5C31\u8BBE\u7F6E\u4E86 ",paraId:12,tocIndex:3},{value:"NioEventLoopGroup",paraId:12,tocIndex:3},{value:" \u4E2D\u7EBF\u7A0B\u6570\u7684\u6570\u91CF\u3002\u6211\u4EEC\u7EE7\u7EED\u8FDB\u5165 \u4E0A\u9762\u7684",paraId:12,tocIndex:3},{value:"super",paraId:12,tocIndex:3},{value:" \u65B9\u6CD5\u3002",paraId:12,tocIndex:3},{value:`protected MultithreadEventExecutorGroup(int nThreads, Executor executor, EventExecutorChooserFactory chooserFactory, Object... args) {
        this.terminatedChildren = new AtomicInteger();
        this.terminationFuture = new DefaultPromise(GlobalEventExecutor.INSTANCE);
        //\u5982\u679C\u53C2\u6570nThreads\u662F0\uFF0C\u5C31\u629B\u51FA\u5F02\u5E38
        if (nThreads <= 0) {
            throw new IllegalArgumentException(String.format("nThreads: %d (expected: > 0)", nThreads));
        } else {
        	// \u5728\u524D\u9762\u7684\u4EE3\u7801\u4E2D\u6211\u4EEC\u5E76\u6CA1\u6709\u6307\u5B9A\u7EBF\u7A0B\u6C60\uFF0C\u8FD9\u4E2Aif\u5C31\u662F\u5E2E\u6211\u4EEC\u521B\u5EFA\u7EBF\u7A0B\u6C60
            if (executor == null) {
                executor = new ThreadPerTaskExecutor(this.newDefaultThreadFactory());
            }
			//\u8FD9\u91CC\u53C8\u6307\u5B9A\u4E86\u4E00\u4E2A\u7EBF\u7A0B\u6C60\u6570\u7EC4\uFF0C\u7136\u540E\u6570\u91CF\u5C31\u662F\u53C2\u6570nThreads(\u7EBF\u7A0B\u6C60\u6570\u7EC4\uFF09
            this.children = new EventExecutor[nThreads];
            int j;
            //\u904D\u5386\u7EBF\u7A0B\u6C60\u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u7EBF\u7A0B\u6C60
            for(int i = 0; i < nThreads; ++i) {
                boolean success = false;
                boolean var18 = false;
                try {
                    var18 = true;
                    //\u7ED9\u7EBF\u7A0B\u6C60\u8D4B\u503C
                    this.children[i] = this.newChild((Executor)executor, args);
                    success = true;
                    var18 = false;
                } catch (Exception var19) {
                    throw new IllegalStateException("failed to create a child event loop", var19);
                } finally {
                    if (var18) {
                        if (!success) {
                            int j;
                            for(j = 0; j < i; ++j) {
                                this.children[j].shutdownGracefully();
                            }
                            for(j = 0; j < i; ++j) {
                                EventExecutor e = this.children[j];
                                try {
                                    while(!e.isTerminated()) {
                                        e.awaitTermination(2147483647L, TimeUnit.SECONDS);
                                    }
                                } catch (InterruptedException var20) {
                                    Thread.currentThread().interrupt();
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!success) {
                    for(j = 0; j < i; ++j) {
                        this.children[j].shutdownGracefully();
                    }
                    for(j = 0; j < i; ++j) {
                        EventExecutor e = this.children[j];
                        try {
                            while(!e.isTerminated()) {
                                e.awaitTermination(2147483647L, TimeUnit.SECONDS);
                            }
                        } catch (InterruptedException var22) {
                            Thread.currentThread().interrupt();
                            break;
                        }
                    }
                }
            }
            this.chooser = chooserFactory.newChooser(this.children);
            FutureListener<Object> terminationListener = new FutureListener<Object>() {
                public void operationComplete(Future<Object> future) throws Exception {
                    if (MultithreadEventExecutorGroup.this.terminatedChildren.incrementAndGet() == MultithreadEventExecutorGroup.this.children.length) {
                        MultithreadEventExecutorGroup.this.terminationFuture.setSuccess((Object)null);
                    }
                }
            };
            EventExecutor[] var24 = this.children;
            j = var24.length;
            for(int var26 = 0; var26 < j; ++var26) {
                EventExecutor e = var24[var26];
                e.terminationFuture().addListener(terminationListener);
            }
            Set<EventExecutor> childrenSet = new LinkedHashSet(this.children.length);
            Collections.addAll(childrenSet, this.children);
            this.readonlyChildren = Collections.unmodifiableSet(childrenSet);
        }
    }
`,paraId:13,tocIndex:3},{value:"\u7B2C\u4E00\u4E2A\u6838\u5FC3\u4EE3\u7801\uFF1A ",paraId:14,tocIndex:3},{value:"this.children[i] = this.newChild((Executor)executor, args);",paraId:14,tocIndex:3},{value:`//NIOEventLoopGroup\u7684\u5B9E\u73B0
 protected EventLoop newChild(Executor executor, Object... args) throws Exception {
        EventLoopTaskQueueFactory queueFactory = args.length == 4 ? (EventLoopTaskQueueFactory)args[3] : null;
     	//\u521B\u5EFA\u4E86\u4E00\u4E2A\u65B0\u7684 NioEventLoop \u5B9E\u4F8B\uFF0C\u5E76\u4F20\u5165\u4E86\u6240\u9700\u7684\u53C2\u6570
     	//this\uFF1A\u8868\u793A\u5F53\u524D\u7684 NioEventLoopGroup \u5B9E\u4F8B
     	//executor\uFF1A\u7528\u4E8E\u6267\u884C\u4EFB\u52A1\u7684\u6267\u884C\u5668
     	//(SelectorProvider)args[0]:\u53EF\u53D8\u53C2\u6570\u6570\u7EC4\u4E2D\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u8868\u793A SelectorProvider\uFF0C\u7528\u4E8E\u63D0\u4F9B Selector \u5B9E\u4F8B
     	//..
        return new NioEventLoop(this, executor, (SelectorProvider)args[0], ((SelectStrategyFactory)args[1]).newSelectStrategy(), (RejectedExecutionHandler)args[2], queueFactory);
    }
`,paraId:15,tocIndex:3},{value:"\u4ECE\u8FD4\u56DE\u503C\u770B\u5230\u7C7B\u578B\u662F ",paraId:16,tocIndex:3},{value:"NioEventLoop",paraId:16,tocIndex:3},{value:"\uFF0C\u4E5F\u5C31\u662F\u8BF4",paraId:16,tocIndex:3},{value:" this.children[i]",paraId:16,tocIndex:3},{value:" \u8FD9\u4E2A\u7EBF\u7A0B\u6C60\u6570\u7EC4\u4E2D\u653E\u7684\u662F ",paraId:16,tocIndex:3},{value:"NioEventLoop",paraId:16,tocIndex:3},{value:" \u5BF9\u8C61",paraId:16,tocIndex:3},{value:"\u7EE7\u7EED\u8FDB\u5165 NioEventLoop \u7684\u6784\u9020\u51FD\u6570\uFF1A",paraId:17,tocIndex:3},{value:`NioEventLoop(NioEventLoopGroup parent, Executor executor, SelectorProvider selectorProvider, SelectStrategy strategy, RejectedExecutionHandler rejectedExecutionHandler, EventLoopTaskQueueFactory queueFactory) {
        super(parent, executor, false, newTaskQueue(queueFactory), newTaskQueue(queueFactory), rejectedExecutionHandler);
        if (selectorProvider == null) {
            throw new NullPointerException("selectorProvider");
        } else if (strategy == null) {
            throw new NullPointerException("selectStrategy");
        } else {
            this.provider = selectorProvider;
            SelectorTuple selectorTuple = this.openSelector();
            this.selector = selectorTuple.selector;
            this.unwrappedSelector = selectorTuple.unwrappedSelector;
            this.selectStrategy = strategy;
        }
    }
`,paraId:18,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u9996\u5148\u7B2C\u4E00\u53E5\u662F\u8C03\u7528\u7236\u7C7B\u7684\u6784\u9020\u65B9\u6CD5\uFF1A",paraId:19,tocIndex:3},{value:"super(parent, executor, false, newTaskQueue(queueFactory), newTaskQueue(queueFactory),rejectedExecutionHandler);",paraId:19,tocIndex:3},{value:"\u8BBE\u7F6E\u76F8\u5173\u5C5E\u6027\u548C\u72B6\u6001",paraId:20,tocIndex:3},{value:`protected SingleThreadEventLoop(EventLoopGroup parent, Executor executor, boolean addTaskWakesUp, Queue<Runnable> taskQueue, Queue<Runnable> tailTaskQueue, RejectedExecutionHandler rejectedExecutionHandler) {
    super(parent, executor, addTaskWakesUp, taskQueue, rejectedExecutionHandler);
    this.tailTasks = (Queue)ObjectUtil.checkNotNull(tailTaskQueue, "tailTaskQueue");
}

protected SingleThreadEventExecutor(EventExecutorGroup parent, Executor executor, boolean addTaskWakesUp, int maxPendingTasks, RejectedExecutionHandler rejectedHandler) {
    super(parent);
    this.threadLock = new CountDownLatch(1);
    this.shutdownHooks = new LinkedHashSet();
    this.state = 1;
    this.terminationFuture = new DefaultPromise(GlobalEventExecutor.INSTANCE);
    this.addTaskWakesUp = addTaskWakesUp;
    this.maxPendingTasks = Math.max(16, maxPendingTasks);
    this.executor = ThreadExecutorMap.apply(executor, this);
    //\u8FD9\u4E2AtaskQueue\u7684\u5E95\u5C42\u672C\u8D28\u4E0A\u5C31\u662F\u4E00\u4E2ALinkedBlockingQueue\uFF0C\u963B\u585E\u961F\u5217
    this.taskQueue = this.newTaskQueue(this.maxPendingTasks);
    this.rejectedExecutionHandler = (RejectedExecutionHandler)ObjectUtil.checkNotNull(rejectedHandler, "rejectedHandler");
}
`,paraId:21,tocIndex:3},{value:"\u7EE7\u7EED\u56DE\u5230 ",paraId:22,tocIndex:3},{value:"NioEventLoop",paraId:22,tocIndex:3},{value:" \u6784\u9020\u51FD\u6570",paraId:22,tocIndex:3},{value:`this.provider = selectorProvider;
SelectorTuple selectorTuple = this.openSelector();
this.selector = selectorTuple.selector;
`,paraId:23,tocIndex:3},{value:"\u4E0A\u9762\u4EE3\u7801\u903B\u8F91\u5176\u5B9E\u5728 Java \u7684 ",paraId:24,tocIndex:3},{value:"NIO",paraId:24,tocIndex:3},{value:" \u4E2D\u4E5F\u6709\uFF0C\u5C31\u662F\u83B7\u53D6\u4E00\u4E2A Selector\uFF0C\u7136\u540E\u8D4B\u503C\u7ED9\u4E86 ",paraId:24,tocIndex:3},{value:"this.selector",paraId:24,tocIndex:3},{value:" \u8FD9\u4E2A ",paraId:24,tocIndex:3},{value:"Ni oEventLoop",paraId:24,tocIndex:3},{value:" \u6210\u5458\u53D8\u91CF\u3002\u5230\u8FD9\u91CC NioEventLoop \u7684\u4E24\u4E2A\u6838\u5FC3\u7EC4\u4EF6 ",paraId:24,tocIndex:3},{value:"Selector \u548C TaskQueue",paraId:24,tocIndex:3},{value:" \u5C31\u627E\u5230\u6E90\u5934\u4E86\uFF0C\u6211\u4EEC\u7EE7\u7EED\u56DE\u5230 ",paraId:24,tocIndex:3},{value:"MultithreadEventExecutorGroup",paraId:24,tocIndex:3},{value:" \u65B9\u6CD5\uFF1A",paraId:24,tocIndex:3},{value:` this.children[i] = this.newChild((Executor)executor, args);
`,paraId:25,tocIndex:3},{value:"\u901A\u8FC7\u4E0A\u9762\u5206\u6790\uFF0C\u6211\u4EEC\u77E5\u9053\u4E86 this.children [I] \u8FD9\u4E2A\u7EBF\u7A0B\u6C60\u6570\u7EC4\u91CC\u9762\u5C01\u88C5\u7684\u5C31\u662F\u4E00\u4E2A\u4E00\u4E2A\u7684 NioEventLoop\uFF0C\u7136\u540E NioEventLoop \u5E95\u5C42\u5C31\u662F\u4E00\u4E2A Selector \u4E00\u4E2A TaskQueue\uFF0C\u4E5F\u6B63\u662F\u5BF9\u5E94\u4E86\u7EBF\u7A0B\u6A21\u578B\u4E2D\u7684\u7B2C\u4E00\u4E2A\u90E8\u5206",paraId:26,tocIndex:3},{value:"\u7136\u540E ",paraId:27,tocIndex:3},{value:"newChild((Executor)executor, args);",paraId:27,tocIndex:3},{value:" \u8FD9\u4E2A\u65B9\u6CD5\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u5C31\u662F ",paraId:27,tocIndex:3},{value:"executor",paraId:27,tocIndex:3},{value:" \u5B83\u662F\u6211\u4EEC\u524D\u9762\u521B\u5EFA\u7684\u4E00\u4E2A ",paraId:27,tocIndex:3},{value:"ThreadPerTaskExecutor",paraId:27,tocIndex:3},{value:" \u7EBF\u7A0B\u6C60",paraId:27,tocIndex:3},{value:"\u5230\u6B64 ",paraId:28,tocIndex:3},{value:"NioEventLoopGroup",paraId:28,tocIndex:3},{value:" \u521B\u5EFA\u7684\u5927\u81F4\u7684\u5E95\u5C42\u903B\u8F91\u5C31\u5206\u6790\u5B8C\u4E86\uFF0C\u4E3B\u7A0B\u5E8F\u5C31\u5F00\u59CB\u6267\u884C\u4E0B\u9762\u4EE3\u7801\uFF1A",paraId:28,tocIndex:3},{value:"\u4F5C\u4E3A\u670D\u52A1\u7AEF\u542F\u52A8\u5BF9\u8C61\uFF0C\u5148\u8BBE\u7F6E\u4E86\u4E24\u4E2A\u7EBF\u7A0B\u7EC4",paraId:29,tocIndex:4},{value:"\u4E3A\u4E86\u4F7F\u7528NioServerSocketChannel\u4F5C\u4E3A\u670D\u52A1\u5668\u901A\u9053\u7684\u5B9E\u73B0\uFF0C\u4FDD\u5B58\u4E86NioServerSocketChannel\u7684\u6784\u9020\u51FD\u6570",paraId:30,tocIndex:4},{value:"\u521D\u59CB\u5316\u670D\u52A1\u5668\u7684\u8FDE\u63A5\u961F\u5217\u5927\u5C0F",paraId:31,tocIndex:4},{value:"\u4E3B\u8981\u5C31\u662F\u901A\u8FC7\u94FE\u5F0F\u8C03\u7528\u8BBE\u7F6E\u4E86\u542F\u52A8\u5BF9\u8C61\u7684\u5C5E\u6027",paraId:32,tocIndex:4},{value:`try{
	//\u521B\u5EFA\u670D\u52A1\u5668\u7AEF\u7684\u542F\u52A8\u5BF9\u8C61
	ServerBootStrap bootstrap =new ServerBootStrap();
}
`,paraId:33,tocIndex:4},{value:"\u70B9\u8FDB ",paraId:34,tocIndex:4},{value:"ServerBootStrap",paraId:34,tocIndex:4},{value:" \u7684\u6784\u9020\u51FD\u6570\uFF1A",paraId:34,tocIndex:4},{value:`public ServerBootstrap() {
    }
`,paraId:35,tocIndex:4},{value:"\u53EF\u4EE5\u53D1\u73B0\u5B83\u7684\u6784\u9020\u65B9\u6CD5\u4E2D\u4EC0\u4E48\u4E5F\u6CA1\u5E72\uFF0C",paraId:36,tocIndex:4},{value:"\u914D\u7F6E\u90FD\u662F\u5728\u540E\u9762\u7684\u94FE\u5F0F\u4E2D\u5B8C\u6210\u7684",paraId:36,tocIndex:4},{value:"\uFF0C\u7EE7\u7EED\u6267\u884C\u4E3B\u4E1A\u52A1\u4EE3\u7801\uFF1A",paraId:36,tocIndex:4},{value:`try{
	//\u521B\u5EFA\u670D\u52A1\u5668\u7AEF\u7684\u542F\u52A8\u5BF9\u8C61
	ServerBootStrap bootstrap =new ServerBootStrap();
	//\u4F7F\u7528\u94FE\u5F0F\u7F16\u7A0B\u6765\u914D\u7F6E\u53C2\u6570
	bootstrap.group(bossGroup,workerGroup)//\u8BBE\u7F6E\u4E24\u4E2A\u7EBF\u7A0B\u7EC4
}
`,paraId:37,tocIndex:4},{value:"ServerBootStrap",paraId:38,tocIndex:4},{value:" \u7684\u53C2\u6570\u7684\u914D\u7F6E\u901A\u5E38\u4F7F\u7528\u94FE\u5F0F\u7F16\u7A0B\u7684\u65B9\u5F0F\u8FDB\u884C\u914D\u7F6E\uFF0C\u9996\u5148\u770B\u7B2C\u4E00\u4E2A\u914D\u7F6E",paraId:38,tocIndex:4},{value:".group(bossGroup,childGroup)",paraId:38,tocIndex:4},{value:"\uFF0C\u4ECE\u5F62\u5F0F\u4E0A\u770B\u5C31\u662F\u5C06\u6211\u4EEC\u524D\u9762\u5B9A\u4E49\u7684\u4E24\u4E2A ",paraId:38,tocIndex:4},{value:"NiojEventLoopGroup",paraId:38,tocIndex:4},{value:" \u8BBE\u7F6E\u8FDB\u53BB\u4E86\uFF0C\u6211\u4EEC\u8FDB\u53BB\u6E90\u7801\u770B\u770B\uFF1A",paraId:38,tocIndex:4},{value:`public ServerBootstrap group(EventLoopGroup parentGroup, EventLoopGroup childGroup) {
        super.group(parentGroup);
        ObjectUtil.checkNotNull(childGroup, "childGroup");
        if (this.childGroup != null) {
            throw new IllegalStateException("childGroup set already");
        } else {
            this.childGroup = childGroup;
            return this;
        }
    }

 public B group(EventLoopGroup group) {
        ObjectUtil.checkNotNull(group, "group");
        if (this.group != null) {
            throw new IllegalStateException("group set already");
        } else {
            this.group = group;
            return this.self();
        }
    }
`,paraId:39,tocIndex:4},{value:"\u4ECE\u53C2\u6570\u6211\u4EEC\u53EF\u4EE5\u770B\u51FA ",paraId:40,tocIndex:4},{value:"bossGroup",paraId:40,tocIndex:4},{value:" \u5BF9\u5E94\u7684\u662F ",paraId:40,tocIndex:4},{value:"parentGroup",paraId:40,tocIndex:4},{value:"\uFF08\u7236\u7EBF\u7A0B\u7EC4\uFF09\uFF0C",paraId:40,tocIndex:4},{value:"workerGroup",paraId:40,tocIndex:4},{value:" \u5BF9\u5E94\u7684\u662F ",paraId:40,tocIndex:4},{value:"childGroup",paraId:40,tocIndex:4},{value:"\uFF08\u5B50\u7EBF\u7A0B\u7EC4\uFF09",paraId:40,tocIndex:4},{value:"\u9996\u5148\u8C03\u7528\u4E86",paraId:41,tocIndex:4},{value:" super.group(parentGroup);",paraId:41,tocIndex:4},{value:" \u5373\u7236\u7C7B\u7684 group \u65B9\u6CD5\uFF0C\u7236\u7C7B\u7684 group \u65B9\u6CD5\u4E3B\u8981\u5C31\u662F\u5C06 ",paraId:41,tocIndex:4},{value:"bossGroup",paraId:41,tocIndex:4},{value:" \u8D4B\u503C\u7ED9\u4E86 ",paraId:41,tocIndex:4},{value:"this.group ",paraId:41,tocIndex:4},{value:"\u6210\u5458\u53D8\u91CF\uFF0C\u7136\u540E ",paraId:41,tocIndex:4},{value:"childGroup",paraId:41,tocIndex:4},{value:" \u8D4B\u503C\u7ED9\u5B50\u7C7B\u7684 ",paraId:41,tocIndex:4},{value:"this.childGroup",paraId:41,tocIndex:4},{value:" \u6210\u5458\u53D8\u91CF\uFF0C\u7136\u540E\u8FD4\u56DE this \u5F53\u524D\u5BF9\u8C61\uFF0C\u8FBE\u5230\u4E86\u94FE\u5F0F\u8C03\u7528\u7684\u6761\u4EF6\u3002",paraId:41,tocIndex:4},{value:"\u4E0A\u9762\u4EE3\u7801\u672C\u8D28\u4E0A\u5C31\u662F\u5C06\u6211\u4EEC\u521B\u5EFA\u7684 ",paraId:42,tocIndex:4},{value:"NioEventLoopGroup",paraId:42,tocIndex:4},{value:" \u5BF9\u8C61\u4FDD\u5B58\u5230\u4E86 ",paraId:42,tocIndex:4},{value:"ServerBootStrap",paraId:42,tocIndex:4},{value:" \u5BF9\u8C61\u4E2D\u3002\u5230\u6B64 ",paraId:42,tocIndex:4},{value:"group(bossGroup,workerGroup)",paraId:42,tocIndex:4},{value:" \u65B9\u6CD5\u5C31\u6267\u884C\u5B8C\u4E86\uFF0C\u7EE7\u7EED\u56DE\u5230\u4E3B\u4E1A\u52A1\u4EE3\u7801\uFF1A",paraId:42,tocIndex:4},{value:`try{
	//\u521B\u5EFA\u670D\u52A1\u5668\u7AEF\u7684\u542F\u52A8\u5BF9\u8C61
	ServerBootStrap bootstrap =new ServerBootStrap();
	//\u4F7F\u7528\u94FE\u5F0F\u7F16\u7A0B\u6765\u914D\u7F6E\u53C2\u6570
	bootstrap.group(bossGroup,workerGroup)//\u8BBE\u7F6E\u4E24\u4E2A\u7EBF\u7A0B\u7EC4
			 .channel(NioServerSocketChannel.class) //\u4F7F\u7528NioServerSocketChannel\u4F5C\u4E3A\u670D\u52A1\u5668\u901A\u9053\u7684\u5B9E\u73B0
}
`,paraId:43,tocIndex:4},{value:"\u8FDB\u5165 ",paraId:44,tocIndex:4},{value:"channel(NioServerSocketChannel.class) ",paraId:44,tocIndex:4},{value:"\u65B9\u6CD5\uFF1A",paraId:44,tocIndex:4},{value:`public B channel(Class<? extends C> channelClass) {
        return this.channelFactory((io.netty.channel.ChannelFactory)(new ReflectiveChannelFactory((Class)ObjectUtil.checkNotNull(channelClass, "channelClass"))));
    }
`,paraId:45,tocIndex:4},{value:"\u6309\u7167\u4EE3\u7801\u903B\u8F91\u5C31\u662F\u8C03\u7528\u4E86 ",paraId:46,tocIndex:4},{value:"this.channelFactory",paraId:46,tocIndex:4},{value:" \u51FD\u6570\uFF0C\u7136\u540E\u8BE5\u51FD\u6570\u7684\u53C2\u6570\u5C31\u662F ",paraId:46,tocIndex:4},{value:'new ReflectiveChannelFactory((Class)ObjectUtil.checkNotNull(channelClass, "channelClass"))',paraId:46,tocIndex:4},{value:" \uFF1A\u6839\u636E\u6211\u4EEC\u4F20\u5165\u7684 ",paraId:46,tocIndex:4},{value:"channelClass",paraId:46,tocIndex:4},{value:" \u7C7B\u578B\u521B\u5EFA\u4E86\u4E00\u4E2A ",paraId:46,tocIndex:4},{value:"ReflectiveChannelFactory",paraId:46,tocIndex:4},{value:" \uFF0C\u8FDB\u5165\u5185\u90E8\u4EE3\u7801\uFF1A",paraId:46,tocIndex:4},{value:`public ReflectiveChannelFactory(Class<? extends T> clazz) {
        ObjectUtil.checkNotNull(clazz, "clazz");

        try {
        	//\u5C06\u6211\u4EEC\u4F20\u5165\u7684channel\u7C7B\u578B\u7684\u6784\u9020\u51FD\u6570\u6682\u5B58\u4E86\u8D77\u6765
            this.constructor = clazz.getConstructor();
        } catch (NoSuchMethodException var3) {
			//..
        }
    }
`,paraId:47,tocIndex:4},{value:"\u4E0A\u9762\u65B9\u6CD5\u5C31\u662F",paraId:48,tocIndex:4},{value:"\u5C06\u6211\u4EEC\u7684\u6307\u5B9A\u7684 ",paraId:48,tocIndex:4},{value:"NioServerSocketChannel",paraId:48,tocIndex:4},{value:" \u7684\u6784\u9020\u51FD\u6570\u4FDD\u5B58\u5230\u4E86 ",paraId:48,tocIndex:4},{value:"ReflectiveChannelFactory",paraId:48,tocIndex:4},{value:" \u5BF9\u8C61\u4E2D",paraId:48,tocIndex:4},{value:"\u4E86\uFF0C\u7136\u540E\u6267\u884C ",paraId:48,tocIndex:4},{value:"this.channelFactory",paraId:48,tocIndex:4},{value:" \u65B9\u6CD5\uFF0C\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:48,tocIndex:4},{value:`public B channelFactory(ChannelFactory<? extends C> channelFactory) {
    ObjectUtil.checkNotNull(channelFactory, "channelFactory");
    if (this.channelFactory != null) {
        throw new IllegalStateException("channelFactory set already");
    } else {
        //\u8FD9\u91CC\u5C31\u662F\u5C06\u524D\u9762\u521B\u5EFA\u7684channel\u5DE5\u5382\u5BF9\u8C61\u4FDD\u5B58\u4E86\u8D77\u6765
        this.channelFactory = channelFactory;
        return this.self();
    }
}
`,paraId:49,tocIndex:4},{value:"\u4E0A\u9762\u4EE3\u7801\u5C31\u662F",paraId:50,tocIndex:4},{value:"\u5C06\u524D\u9762\u6211\u4EEC\u521B\u5EFA\u7684 ",paraId:50,tocIndex:4},{value:"ReflectiveChannelFactory",paraId:50,tocIndex:4},{value:" \u4FDD\u5B58\u5230\u4E86",paraId:50,tocIndex:4},{value:" this.channelFactory",paraId:50,tocIndex:4},{value:" \u8FD9\u4E2A\u6210\u5458\u53D8\u91CF\u4E2D",paraId:50,tocIndex:4},{value:"\u3002\u7136\u540E\u56DE\u5230\u4E3B\u4E1A\u52A1\u4EE3\u7801\uFF1A",paraId:50,tocIndex:4},{value:`try{
	//\u521B\u5EFA\u670D\u52A1\u5668\u7AEF\u7684\u542F\u52A8\u5BF9\u8C61
	ServerBootStrap bootstrap =new ServerBootStrap();
	//\u4F7F\u7528\u94FE\u5F0F\u7F16\u7A0B\u6765\u914D\u7F6E\u53C2\u6570
	bootstrap.group(bossGroup,workerGroup)//\u8BBE\u7F6E\u4E24\u4E2A\u7EBF\u7A0B\u7EC4
			 .channel(NioServerSocketChannel.class) //\u4F7F\u7528NioServerSocketChannel\u4F5C\u4E3A\u670D\u52A1\u5668\u901A\u9053\u7684\u5B9E\u73B0
			 .option(ChannelOption.SO_BACKLOG,1024)//\u521D\u59CB\u5316\u670D\u52A1\u5668\u7684\u8FDE\u63A5\u961F\u5217\u5927\u5C0F\uFF0C\u670D\u52A1\u7AEF\u5904\u7406\u5BA2\u6237\u7AEF\u7684\u8FDE\u63A5\u662F\u987A\u5E8F\u5904\u7406\u7684\uFF0C\u6240\u4EE5\u540C\u4E00\u4E8B\u4EF6\u53EA\u80FD\u5904\u7406\u4E00\u4E2A\u5BA2\u6237\u7AEF\u8FDE\u63A5\u3002\u591A\u4E2A\u5BA2\u6237\u7AEF\u540C\u65F6\u6765\u7684\u65F6\u5019\uFF0C\u670D\u52A1\u7AEF\u5C06\u4E0D\u80FD\u5904\u7406\u7684\u8FDE\u63A5\u8BF7\u6C42\u653E\u5728\u961F\u5217\u4E2D\u7B49\u5F85		
}
`,paraId:51,tocIndex:4},{value:"\u6211\u4EEC\u8FDB\u5165",paraId:52,tocIndex:4},{value:".option",paraId:52,tocIndex:4},{value:" \u65B9\u6CD5\uFF1A",paraId:52,tocIndex:4},{value:`public <T> B option(ChannelOption<T> option, T value) {
        ObjectUtil.checkNotNull(option, "option");
        if (value == null) {
            this.options.remove(option);
        } else {
            this.options.put(option, value);
        }
        return this.self();
    }
//BootStrap\u4E2D\u7684\u6210\u5458\u53D8\u91CF\u4E2D\u7684\u4E00\u4E2Amap\u96C6\u5408\uFF08\u5B58\u50A8netty\u7A0B\u5E8F\u5458\u542F\u52A8\u65F6\u9700\u8981\u8BBE\u7F6E\u7684\u4E00\u4E9B\u5C5E\u6027\uFF09
private final Map<ChannelOption<?>, Object> options = new ConcurrentHashMap();
`,paraId:53,tocIndex:4},{value:"option",paraId:54,tocIndex:4},{value:" \u65B9\u6CD5\u672C\u8D28\u4E0A\u5C31\u662F\u7528\u6765\u8BBE\u7F6E Netty \u542F\u52A8\u65F6\u7684\u4E00\u4E9B\u5C5E\u6027\u7684\uFF0C\u4F8B\u5982 ",paraId:54,tocIndex:4},{value:"ChannelOption.SO_BACKLOG",paraId:54,tocIndex:4},{value:" \u5C31\u662F\u5176\u4E2D\u4E4B\u4E00\uFF0C\u8BBE\u7F6E\u7684\u65B9\u5F0F\u5C31\u662F\u653E\u5230\u4E86 ",paraId:54,tocIndex:4},{value:"ServerBootStrap",paraId:54,tocIndex:4},{value:" \u4E2D\u7684\u4E00\u4E2A\u7EBF\u7A0B\u5B89\u5168\u96C6\u5408 ",paraId:54,tocIndex:4},{value:"options",paraId:54,tocIndex:4},{value:" \u4E2D\uFF0C\u7136\u540E\u7EE7\u7EED\u56DE\u5230\u4E1A\u52A1\u4EE3\u7801\uFF1A",paraId:54,tocIndex:4},{value:`try{
	//\u521B\u5EFA\u670D\u52A1\u5668\u7AEF\u7684\u542F\u52A8\u5BF9\u8C61
	ServerBootStrap bootstrap =new ServerBootStrap();
	//\u4F7F\u7528\u94FE\u5F0F\u7F16\u7A0B\u6765\u914D\u7F6E\u53C2\u6570
	bootstrap.group(bossGroup,workerGroup)//\u8BBE\u7F6E\u4E24\u4E2A\u7EBF\u7A0B\u7EC4
			 .channel(NioServerSocketChannel.class) //\u4F7F\u7528NioServerSocketChannel\u4F5C\u4E3A\u670D\u52A1\u5668\u901A\u9053\u7684\u5B9E\u73B0
			 .option(ChannelOption.SO_BACKLOG,1024)//\u521D\u59CB\u5316\u670D\u52A1\u5668\u7684\u8FDE\u63A5\u961F\u5217\u5927\u5C0F\uFF0C\u670D\u52A1\u7AEF\u5904\u7406\u5BA2\u6237\u7AEF\u7684\u8FDE\u63A5\u662F\u987A\u5E8F\u5904\u7406\u7684\uFF0C\u6240\u4EE5\u540C\u4E00\u4E8B\u4EF6\u53EA\u80FD\u5904\u7406\u4E00\u4E2A\u5BA2\u6237\u7AEF\u8FDE\u63A5\u3002\u591A\u4E2A\u5BA2\u6237\u7AEF\u540C\u65F6\u6765\u7684\u65F6\u5019\uFF0C\u670D\u52A1\u7AEF\u5C06\u4E0D\u80FD\u5904\u7406\u7684\u8FDE\u63A5\u8BF7\u6C42\u653E\u5728\u961F\u5217\u4E2D\u7B49\u5F85		
			 .childHandler((ChannelInitializer)(ch)->{
			 	//\u5BF9workerGroup\u7684SocketChannel\u8BBE\u7F6E\u5904\u7406\u5668
			 	ch.pipeline().addLast(new NettyServerHandler());
			 	});
}
`,paraId:55,tocIndex:4},{value:"\u7136\u540E\u5C31\u662F\u8C03\u7528",paraId:56,tocIndex:4},{value:" .childHandler",paraId:56,tocIndex:4},{value:" \u8BBE\u7F6E channel \u7684\u5904\u7406\u5668\u94FE\u4E86\uFF0C\u8FD9\u4E5F\u662F\u6700\u6838\u5FC3\u7684\u90E8\u5206\u4E86",paraId:56,tocIndex:4},{value:"\u3002\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:56,tocIndex:4},{value:`public ServerBootstrap childHandler(ChannelHandler childHandler) {
	this.childHandler = (ChannelHandler)ObjectUtil.checkNotNull(childHandler, "childHandler");
	return this;
}
`,paraId:57,tocIndex:4},{value:"\u4E0A\u9762\u4EE3\u7801\u5C31\u662F\u5C06 ",paraId:58,tocIndex:4},{value:"ChannelHandler",paraId:58,tocIndex:4},{value:" \u5BF9\u8C61\u8D4B\u503C\u7ED9 ",paraId:58,tocIndex:4},{value:"ServerBootStrap",paraId:58,tocIndex:4},{value:" \u7684",paraId:58,tocIndex:4},{value:" this.childHandler",paraId:58,tocIndex:4},{value:" \u5C5E\u6027\u3002",paraId:58,tocIndex:4},{value:"\u770B\u5230\u8FD9\u91CC\u6211\u4EEC\u4E0D\u96BE\u53D1\u73B0\u6574\u4E2A\u94FE\u5F0F\u8C03\u7528\u7684\u8FC7\u7A0B\u5176\u5B9E\u90FD\u662F\u5728\u7ED9\u542F\u52A8\u5668 ",paraId:59,tocIndex:4},{value:"ServerBootStrap",paraId:59,tocIndex:4},{value:" \u5BF9\u8C61\u7684\u6210\u5458\u53D8\u91CF\u8FDB\u884C\u8D4B\u503C\u3002",paraId:59,tocIndex:4},{value:"\u5230\u6B64 ",paraId:60,tocIndex:4},{value:"ServerBootStrap",paraId:60,tocIndex:4},{value:" \u5BF9\u8C61\u5C31\u521B\u5EFA\u5B8C\u6210\u4E86\uFF0C\u6211\u4EEC\u7EE7\u7EED\u8FDB\u884C\u4E1A\u52A1\u4EE3\u7801\uFF1A",paraId:60,tocIndex:4},{value:`	//\u7ED1\u5B9A\u4E00\u4E2A\u7AEF\u53E3\u5E76\u4E14\u540C\u6B65\uFF0C\u751F\u6210\u4E86\u4E00\u4E2AChannelFuture\u5F02\u6B65\u5BF9\u8C61\uFF0C\u901A\u8FC7isDone()\u7B49\u65B9\u6CD5\u53EF\u4EE5\u5224\u65AD\u5F02\u6B65\u4E8B\u4EF6\u7684\u6267\u884C\u60C5\u51B5
	//\u542F\u52A8\u670D\u52A1\u5668\u5E76\u7ED1\u5B9A\u7AEF\u53E3\uFF0Cbind\u662F\u5F02\u6B65\u64CD\u4F5C\uFF0Csync\u65B9\u6CD5\u662F\u7B49\u5F85\u5F02\u6B65\u64CD\u4F5C\u6267\u884C\u5B8C\u6BD5\uFF08\u963B\u585E\u7684\uFF09
	ChannelFuture cf=bootstrap.bind(9000).sync();
`,paraId:61,tocIndex:4},{value:"\u4E0A\u9762\u7684\u4EE3\u7801\u662F",paraId:62,tocIndex:4},{value:"\u975E\u5E38\u91CD\u8981",paraId:62,tocIndex:4},{value:"\u7684\u4E00\u53E5\u4EE3\u7801\uFF0C\u8FD9\u91CC\u6211\u4EEC\u8BE6\u7EC6\u5206\u6790\u4E00\u4E0B\uFF0C\u6211\u4EEC\u8FDB\u5165 ",paraId:62,tocIndex:4},{value:"bind",paraId:62,tocIndex:4},{value:" \u65B9\u6CD5\uFF1A",paraId:62,tocIndex:4},{value:`public ChannelFuture bind(int inetPort) {
        return this.bind(new InetSocketAddress(inetPort));
    }
`,paraId:63,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u9996\u5148\u5C06\u6211\u4EEC\u4F20\u5165\u7684\u7AEF\u53E3\u53F7 ",paraId:64,tocIndex:5},{value:"9000",paraId:64,tocIndex:5},{value:" \u5C01\u88C5\u4E3A\u4E00\u4E2A ",paraId:64,tocIndex:5},{value:"InetSocketAddress",paraId:64,tocIndex:5},{value:" \u5BF9\u8C61\uFF0C\u7136\u540E\u8C03\u7528 ",paraId:64,tocIndex:5},{value:"ServerBootStrap",paraId:64,tocIndex:5},{value:" \u7684 ",paraId:64,tocIndex:5},{value:"bind",paraId:64,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5 ",paraId:64,tocIndex:5},{value:"bind",paraId:64,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:64,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u9996\u5148\u5C06\u6211\u4EEC\u4F20\u5165\u7684\u7AEF\u53E3\u53F7 ",paraId:65,tocIndex:5},{value:"9000",paraId:65,tocIndex:5},{value:" \u5C01\u88C5\u4E3A\u4E00\u4E2A ",paraId:65,tocIndex:5},{value:"InetSocketAddress",paraId:65,tocIndex:5},{value:" \u5BF9\u8C61\uFF0C\u7136\u540E\u8C03\u7528 ",paraId:65,tocIndex:5},{value:"ServerBootStrap",paraId:65,tocIndex:5},{value:" \u7684 ",paraId:65,tocIndex:5},{value:"bind",paraId:65,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5 ",paraId:65,tocIndex:5},{value:"bind",paraId:65,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:65,tocIndex:5},{value:`public ChannelFuture bind(SocketAddress localAddress) {
    //this.validate() \u7684\u610F\u601D\u662F\u5BF9\u5F53\u524D\u5BF9\u8C61\u8FDB\u884C\u9A8C\u8BC1\uFF0C\u4EE5\u786E\u4FDD\u5176\u5728\u540E\u7EED\u64CD\u4F5C\u4E2D\u7684\u6B63\u786E\u6027\u548C\u53EF\u9760\u6027
    this.validate();
    return this.doBind((SocketAddress)ObjectUtil.checkNotNull(localAddress, "localAddress"));
}
`,paraId:66,tocIndex:5},{value:"\u6838\u5FC3\u65B9\u6CD5\u662F ",paraId:67,tocIndex:5},{value:"this.doBind",paraId:67,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u7136\u540E\u53C2\u6570\u5C31\u662F\u6211\u4EEC\u524D\u9762\u4F20\u5165\u7684\u7AEF\u53E3\u53F7\uFF0C\u7EE7\u7EED\u8FDB\u5165 ",paraId:67,tocIndex:5},{value:"this.doBind",paraId:67,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:67,tocIndex:5},{value:`private ChannelFuture doBind(final SocketAddress localAddress) {
    final ChannelFuture regFuture = this.initAndRegister();
    final Channel channel = regFuture.channel();
    if (regFuture.cause() != null) {
        return regFuture;
    } else if (regFuture.isDone()) {
        ChannelPromise promise = channel.newPromise();
        doBind0(regFuture, channel, localAddress, promise);
        return promise;
    } else {
        final PendingRegistrationPromise promise = new PendingRegistrationPromise(channel);
        regFuture.addListener(new ChannelFutureListener() {
            public void operationComplete(ChannelFuture future) throws Exception {
                Throwable cause = future.cause();
                if (cause != null) {
                    promise.setFailure(cause);
                } else {
                    promise.registered();
                    AbstractBootstrap.doBind0(regFuture, channel, localAddress, promise);
                }
            }
        });
        return promise;
    }
}
`,paraId:68,tocIndex:5},{value:"\u6211\u4EEC\u91CD\u70B9\u5206\u6790\u4E0A\u9762\u4EE3\u7801\uFF0C\u9996\u5148\u7B2C\u4E00\u53E5\u6838\u5FC3\u4EE3\u7801\u662F",paraId:69,tocIndex:5},{value:" final ChannelFuture regFuture = this.initAndRegister();",paraId:69,tocIndex:5},{value:"\uFF0C\u5B83\u8C03\u7528\u4E86 ",paraId:69,tocIndex:5},{value:"this.initAndRegister",paraId:69,tocIndex:5},{value:" \u65B9\u6CD5\u83B7\u53D6\u4E86\u4E00\u4E2A ",paraId:69,tocIndex:5},{value:"ChannelFuture",paraId:69,tocIndex:5},{value:" \u5BF9\u8C61\uFF0C\u6211\u4EEC\u770B\u770B ",paraId:69,tocIndex:5},{value:"initAndRegister",paraId:69,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:69,tocIndex:5},{value:`final ChannelFuture initAndRegister() {
    Channel channel = null;

    try {
        channel = this.channelFactory.newChannel();
        this.init(channel);
    } catch (Throwable var3) {
		//..
    }

    ChannelFuture regFuture = this.config().group().register(channel);
    if (regFuture.cause() != null) {
        if (channel.isRegistered()) {
            channel.close();
        } else {
            channel.unsafe().closeForcibly();
        }
    }
    return regFuture;
}
`,paraId:70,tocIndex:5},{value:"channel = this.channelFactory.newChannel();",paraId:71,tocIndex:5},{value:"\u524D\u9762\u5728\u5206\u6790 ServerBootStrap \u5BF9\u8C61\u6784\u5EFA\u8FC7\u7A0B\u4E2D\uFF0C\u5206\u6790\u4E86",paraId:71,tocIndex:5},{value:".channel(NioServerSocketChannel.class)",paraId:71,tocIndex:5},{value:" \u5E95\u5C42\u5C31\u4FDD\u5B58\u4E86\u4E00\u4E2A channel \u5DE5\u5382\u5BF9\u8C61\uFF0C\u8FD9\u91CC\u5C31\u5C06\u524D\u9762\u521B\u5EFA\u7684\u5DE5\u5382\u5BF9\u8C61\u62FF\u51FA\u6765\u521B\u5EFA\u4E86\u4E00\u4E2A channel \u5BF9\u8C61\u7684\u5B9E\u4F8B\uFF0C\u6211\u4EEC\u8FDB\u5165 ",paraId:71,tocIndex:5},{value:"newChannel()",paraId:71,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:71,tocIndex:5},{value:`public T newChannel() {
    try {
        return (Channel)this.constructor.newInstance();
    } catch (Throwable var2) {
		//..
    }
}
`,paraId:72,tocIndex:5},{value:"channel \u5DE5\u5382\u5BF9\u8C61\u5185\u90E8\u4FDD\u5B58\u7684\u5176\u5B9E\u5C31\u662F\u6211\u4EEC\u4F20\u5165\u7684 ",paraId:73,tocIndex:5},{value:"NioServerSocketChannel.class",paraId:73,tocIndex:5},{value:" \u7C7B\u578B\u7684\u6784\u9020\u51FD\u6570\uFF0C\u8FD9\u91CC\u5C31\u7528\u4FDD\u5B58\u7684\u6784\u9020\u51FD\u6570\u4F7F\u7528\u53CD\u5C04\u521B\u5EFA\u4E86\u4E00\u4E2A Channel \u5B9E\u4F8B\u3002",paraId:73,tocIndex:5},{value:"\u8FD9\u91CC\u8C03\u7528\u7684\u662F ",paraId:74,tocIndex:5},{value:"NioServerSocketChannel.class",paraId:74,tocIndex:5},{value:" \u7684\u7A7A\u6784\u9020\u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u6784\u9020\u65B9\u6CD5\uFF0C\u770B\u5B83\u521B\u5EFA\u4E86\u4E00\u4E9B\u4EC0\u4E48\u4E1C\u897F\uFF1A",paraId:74,tocIndex:5},{value:`public NioServerSocketChannel() {
    this(newSocket(DEFAULT_SELECTOR_PROVIDER));
}
`,paraId:75,tocIndex:5},{value:"\u7136\u540E\u8FD9\u91CC\u8C03\u7528\u4E86 ",paraId:76,tocIndex:5},{value:"newSocket(DEFAULT_SELECTOR_PROVIDER)",paraId:76,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:76,tocIndex:5},{value:`private static java.nio.channels.ServerSocketChannel newSocket(SelectorProvider provider) {
    try {
        return provider.openServerSocketChannel();
    } catch (IOException var2) {
        throw new ChannelException("Failed to open a server socket.", var2);
    }
}
`,paraId:77,tocIndex:5},{value:"provider.openServerSocketChannel();",paraId:78,tocIndex:5},{value:" \u8FD9\u53E5\u4EE3\u7801\u548C NIO \u5E95\u5C42\u7684 ",paraId:78,tocIndex:5},{value:"ServerSocketChannel",paraId:78,tocIndex:5},{value:" \u7C7B\u7684 open \u65B9\u6CD5\u7684\u4EE3\u7801\u4E00\u6A21\u4E00\u6837\uFF0C\u8FD9\u53E5\u4EE3\u7801\u7684\u4F5C\u7528\u5C31\u662F\uFF0C\u4ECE\u8FD4\u56DE\u503C\u4E5F\u53EF\u4EE5\u770B\u51FA\u662F",paraId:78,tocIndex:5},{value:"java.nio.channels.ServerSocketChannel",paraId:78,tocIndex:5},{value:"newSocket \u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u770B ",paraId:79,tocIndex:5},{value:"this()",paraId:79,tocIndex:5},{value:" \u8C03\u7528\u7684\u662F\u54EA\u4E00\u4E2A\u6784\u9020\u51FD\u6570\uFF1A",paraId:79,tocIndex:5},{value:`public NioServerSocketChannel(java.nio.channels.ServerSocketChannel channel) {
	super((Channel)null, channel, 16);
	this.config = new NioServerSocketChannelConfig(this, this.javaChannel().socket());
}
`,paraId:80,tocIndex:5},{value:"\u9996\u5148\u6211\u4EEC\u8FDB\u5165 super \u65B9\u6CD5\uFF0C\u53C2\u6570\u5C31\u662F\u524D\u9762 ",paraId:81,tocIndex:5},{value:"newSocket",paraId:81,tocIndex:5},{value:" \u521B\u5EFA\u7684 ",paraId:81,tocIndex:5},{value:"java.nio.channels.ServerSocketChannel",paraId:81,tocIndex:5},{value:" \u5BF9\u8C61\uFF0C\u4EE5\u53CA\u4E00\u4E2A 16",paraId:81,tocIndex:5},{value:"\u8FD9\u4E2A 16 \u5C31\u4EE3\u8868 NIO \u4E2D Selectionkey \u5BF9\u8C61\u7684 OP_ACCEPT \u4E8B\u4EF6 ",paraId:82,tocIndex:5},{value:"public static final int OP_ACCEPT=1<<4;",paraId:82,tocIndex:5},{value:"\uFF1A",paraId:82,tocIndex:5},{value:` protected AbstractNioChannel(Channel parent, SelectableChannel ch, int readInterestOp) {
     super(parent);
     //\u8BB0\u5F55serverSocketChannel
     this.ch = ch;
     //\u8BB0\u5F55serverSocketChannel\u611F\u5174\u8DA3\u7684\u4E8B\u4EF6
     this.readInterestOp = readInterestOp;
     try {
         //\u8BBE\u7F6Echannel\u4E3A\u975E\u963B\u585E\u6A21\u5F0F
         ch.configureBlocking(false);
     } catch (IOException var7) {
         try {
             ch.close();
         } catch (IOException var6) {
             logger.warn("Failed to close a partially initialized socket.", var6);
         }
         throw new ChannelException("Failed to enter non-blocking mode.", var7);
     }
 }
`,paraId:83,tocIndex:5},{value:"\u6211\u4EEC\u7EE7\u7EED\u8FDB\u5165 super \u65B9\u6CD5\uFF1A",paraId:84,tocIndex:5},{value:`protected AbstractChannel(Channel parent) {
    this.parent = parent;
    this.id = this.newId();
    this.unsafe = this.newUnsafe();
    this.pipeline = this.newChannelPipeline();
}
`,paraId:85,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u6838\u5FC3\u5C31\u662F\u521B\u5EFA\u4E86 ",paraId:86,tocIndex:5},{value:"this.pipeline",paraId:86,tocIndex:5},{value:" \u5BF9\u8C61\uFF0C\u6211\u4EEC\u8FDB\u5165 ",paraId:86,tocIndex:5},{value:"newChannelPipeline",paraId:86,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u770B\u770B\u5E95\u5C42\u662F\u5982\u4F55\u521B\u5EFA ",paraId:86,tocIndex:5},{value:"Pipeline",paraId:86,tocIndex:5},{value:" \u7684\uFF1A",paraId:86,tocIndex:5},{value:`protected DefaultChannelPipeline newChannelPipeline() {
    return new DefaultChannelPipeline(this);
}

protected DefaultChannelPipeline(Channel channel) {
    this.channel = (Channel)ObjectUtil.checkNotNull(channel, "channel");
    this.succeededFuture = new SucceededChannelFuture(channel, (EventExecutor)null);
    this.voidPromise = new VoidChannelPromise(channel, true);
    //\u9ED8\u8BA4\u653E\u4E86\u4E00\u4E2A\u5C3E\u8282\u70B9
    this.tail = new TailContext(this);
    //\u9ED8\u8BA4\u653E\u4E86\u4E00\u4E2A\u5934\u8282\u70B9
    this.head = new HeadContext(this);
    //\u8BF4\u660E\u662F\u4E00\u4E2A\u53CC\u5411\u94FE\u8868
    this.head.next = this.tail;
    this.tail.prev = this.head;
}
`,paraId:87,tocIndex:5},{value:"\u5230\u6B64 ",paraId:88,tocIndex:5},{value:"channelFactory.newChannel",paraId:88,tocIndex:5},{value:" \u5E95\u5C42\u7684\u903B\u8F91\u6211\u4EEC\u5C31\u770B\u5B8C\u4E86",paraId:88,tocIndex:5},{value:"\u5176\u5B9E\u5C31\u662F\u521B\u5EFA\u4E86\u4E00\u4E2A ServerSocketChannel\uFF0C\u7136\u540E\u6784\u5EFA\u4E86 pipeline \u5BF9\u8C61\uFF0C\u6211\u4EEC\u7EE7\u7EED\u56DE\u5230 ",paraId:89,tocIndex:5},{value:"initAndRegister()",paraId:89,tocIndex:5},{value:" \u65B9\u6CD5",paraId:89,tocIndex:5},{value:"\uFF1A",paraId:89,tocIndex:5},{value:`final ChannelFuture initAndRegister() {
        Channel channel = null;

        try {
            channel = this.channelFactory.newChannel();
            this.init(channel);
        } 
`,paraId:90,tocIndex:5},{value:"\u7136\u540E\u5C31\u884C\u8C03\u7528",paraId:91,tocIndex:5},{value:" this.init(channel);",paraId:91,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:91,tocIndex:5},{value:`//\u53C2\u6570\u5C31\u662F\u524D\u9762\u521B\u5EFA\u7684NioServerSocketChannel\u5BF9\u8C61
void init(Channel channel) {
        setChannelOptions(channel, (Map.Entry[])this.options0().entrySet().toArray(newOptionArray(0)), logger);
        setAttributes(channel, (Map.Entry[])this.attrs0().entrySet().toArray(newAttrArray(0)));
        ChannelPipeline p = channel.pipeline();
        final EventLoopGroup currentChildGroup = this.childGroup;
        final ChannelHandler currentChildHandler = this.childHandler;
        final Map.Entry<ChannelOption<?>, Object>[] currentChildOptions = (Map.Entry[])this.childOptions.entrySet().toArray(newOptionArray(0));
        final Map.Entry<AttributeKey<?>, Object>[] currentChildAttrs = (Map.Entry[])this.childAttrs.entrySet().toArray(newAttrArray(0));
    	
        p.addLast(new ChannelHandler[]{new ChannelInitializer<Channel>() {
            
            public void initChannel(final Channel ch) {
            //\u62FF\u5230\u524D\u9762\u521B\u5EFA\u7684\u7BA1\u9053
                final ChannelPipeline pipeline = ch.pipeline();
                ChannelHandler handler = ServerBootstrap.this.config.handler();
                if (handler != null) {
                    pipeline.addLast(new ChannelHandler[]{handler});
                }

                ch.eventLoop().execute(new Runnable() {
                    public void run() {
                        pipeline.addLast(new ChannelHandler[]{new ServerBootstrapAcceptor(ch, currentChildGroup, currentChildHandler, currentChildOptions, currentChildAttrs)});
                    }
                });
            }
        }});
    }
`,paraId:92,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u6700\u6838\u5FC3\u7684\u4E00\u90E8\u5206\u662F\u4E0B\u9762\u8FD9\u4E00\u6BB5\u4EE3\u7801\uFF1A",paraId:93,tocIndex:5},{value:` p.addLast(new ChannelHandler[]{new ChannelInitializer<Channel>() {
     public void initChannel(final Channel ch) {
         final ChannelPipeline pipeline = ch.pipeline();
         ChannelHandler handler = ServerBootstrap.this.config.handler();
         if (handler != null) {
             pipeline.addLast(new ChannelHandler[]{handler});
         }

         ch.eventLoop().execute(new Runnable() {
             public void run() {
                 pipeline.addLast(new ChannelHandler[]{new ServerBootstrapAcceptor(ch, currentChildGroup, currentChildHandler, currentChildOptions, currentChildAttrs)});
             }
         });
     }
 }});
`,paraId:94,tocIndex:5},{value:"\u4F7F\u7528 netty \u7684\u90FD\u77E5\u9053\u8FD9\u4E2A\u5C31\u662F\u5411\u7BA1\u9053\uFF08ServerSocketChannel\uFF09\u4E2D\u52A0\u5165\u4E86\u4E00\u4E2A\u5904\u7406\u5668 handler\uFF0C\u8FD9\u4E2A handler \u7684\u4F5C\u7528\u6211\u4EEC\u540E\u9762\u518D\u5206\u6790\uFF0C\u73B0\u5728 pipeline \u91CC\u9762\u6709\u4E09\u4E2A handler \u4E86\u3002\u5230\u6B64 ",paraId:95,tocIndex:5},{value:"init",paraId:95,tocIndex:5},{value:" \u65B9\u6CD5\u6267\u884C\u5B8C\u6BD5\u4E86\uFF0C\u7EE7\u7EED\u56DE\u5230 ",paraId:95,tocIndex:5},{value:"initAndRegister",paraId:95,tocIndex:5},{value:" \u65B9\u6CD5\u3002",paraId:95,tocIndex:5},{value:`final ChannelFuture initAndRegister() {
        Channel channel = null;
        try {
            channel = this.channelFactory.newChannel();
            this.init(channel);
        } catch (Throwable var3) {
            if (channel != null) {
                channel.unsafe().closeForcibly();
                return (new DefaultChannelPromise(channel, GlobalEventExecutor.INSTANCE)).setFailure(var3);
            }
            return (new DefaultChannelPromise(new FailedChannel(),GlobalEventExecutor.INSTANCE)).setFailure(var3);
        }
        ChannelFuture regFuture = this.config().group().register(channel);
        if (regFuture.cause() != null) {
            if (channel.isRegistered()) {
                channel.close();
            } else {
                channel.unsafe().closeForcibly();
            }
        }
        return regFuture;
    }
`,paraId:96,tocIndex:5},{value:"\u7136\u540E\u4E0B\u4E00\u53E5\u6838\u5FC3\u4EE3\u7801\u662F ",paraId:97,tocIndex:5},{value:"ChannelFuture regFuture = this.config().group().register(channel);",paraId:97,tocIndex:5},{value:"\uFF0C\u7B7E\u540D\u6211\u4EEC\u7684 ServerSocketChannel \u5DF2\u7ECF\u521B\u5EFA\u5B8C\u4E86\uFF0C\u4F46\u662F\u6309\u7167 NIO \u7684\u903B\u8F91\uFF0CChannel \u9700\u8981\u6CE8\u518C\u5230 Selector \u4E2D\u4E0E\u611F\u5174\u8DA3\u7684\u4E8B\u4EF6\u7ED1\u5B9A\uFF0C\u8FD9\u53E5\u4EE3\u7801\u5C31\u5728\u5E72\u8FD9\u4E2A\u4E8B\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:97,tocIndex:5},{value:"config \u8FD4\u56DE ServerBootStrap \u5BF9\u8C61\uFF0Cgroup \u8FD4\u56DE EventLoopGroup \u5BF9\u8C61\uFF08\u6CE8\u610F\u8FD9\u4E2A EventLoopGroup \u662F bossGroup\uFF09",paraId:98,tocIndex:5},{value:`//\u6CE8\u610F\u524D\u9762group\u8FD4\u56DE\u7684\u4E8BEventLoopGroup\u5BF9\u8C61\uFF0C\u6240\u4EE5\u8FD9\u4E2Aregister\u7684\u5B9E\u73B0\u5C31\u662F\`MultiThreadEventLoopGroup\`
 public ChannelFuture register(Channel channel) {
        return this.next().register(channel);
    }
`,paraId:99,tocIndex:5},{value:"next \u65B9\u6CD5\u5C31\u662F\u83B7\u53D6\u4E0B\u4E00\u4E2A ",paraId:100,tocIndex:5},{value:"EventLoop",paraId:100,tocIndex:5},{value:" \u5BF9\u8C61\uFF0C\u7136\u540E\u8C03\u7528 ",paraId:100,tocIndex:5},{value:"EventLoop",paraId:100,tocIndex:5},{value:" \u5BF9\u8C61\u7684 ",paraId:100,tocIndex:5},{value:"register",paraId:100,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:100,tocIndex:5},{value:`//\u6CE8\u610F\u6B64\u65F6\u8C03\u7528register\u65B9\u6CD5\u7684\u662F\`EventLoop\`\u5BF9\u8C61\uFF0C\u6240\u4EE5register\u65B9\u6CD5\u7684\u5B9E\u73B0\u662F\`SingleThreadEventLoopGroup\`
  @Override
    public ChannelFuture register(Channel channel) {
        return register(new DefaultChannelPromise(channel, this));
    }
@Override
    public ChannelFuture register(final ChannelPromise promise) {
        ObjectUtil.checkNotNull(promise, "promise");
        promise.channel().unsafe().register(this, promise);
        return promise;
    }

@Override
        public final void register(EventLoop eventLoop, final ChannelPromise promise) {
            if (eventLoop == null) {
                throw new NullPointerException("eventLoop");
            }
            if (isRegistered()) {
                promise.setFailure(new IllegalStateException("registered to an event loop already"));
                return;
            }
            if (!isCompatible(eventLoop)) {
                promise.setFailure(
                        new IllegalStateException("incompatible event loop type: " + eventLoop.getClass().getName()));
                return;
            }

            AbstractChannel.this.eventLoop = eventLoop;
			//\u5224\u65AD\u4F60\u4F20\u5165\u7684\u7EBF\u7A0B\u548C\u5F53\u524D\u7684\u7EBF\u7A0B\u662F\u5426\u662F\u4E00\u6837
            if (eventLoop.inEventLoop()) {
            	//\u5982\u679C\u662F\u4E00\u6837\uFF0C\u76F4\u63A5\u8C03\u7528register0
                register0(promise);
            } else {
                try {
                	//\u5426\u5219\u4F7F\u7528\u4F60\u4F20\u5165\u7684\u7EBF\u7A0B\u6765\u6267\u884C\u4EFB\u52A1\uFF08\u8FD9\u91CC\u5C31\u5B9E\u73B0\u4E86\u5F02\u6B65\u8C03\u7528\uFF09
                    eventLoop.execute(new Runnable() {
                        @Override
                        public void run() {
                            register0(promise);
                        }
                    });
                } catch (Throwable t) {
					//..
                }
            }
        }
`,paraId:101,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u7684\u6838\u5FC3\u90E8\u5206\u662F\uFF1A",paraId:102,tocIndex:5},{value:`//\u5224\u65AD\u4F60\u4F20\u5165\u7684\u7EBF\u7A0B\u548C\u5F53\u524D\u7684\u7EBF\u7A0B\u662F\u5426\u662F\u4E00\u6837
if (eventLoop.inEventLoop()) {
    //\u5982\u679C\u662F\u4E00\u6837\uFF0C\u76F4\u63A5\u8C03\u7528register0
    register0(promise);
} else {
    try {
        //\u5426\u5219\u4F7F\u7528\u4F60\u4F20\u5165\u7684\u7EBF\u7A0B\u6765\u6267\u884C\u4EFB\u52A1\uFF08\u8FD9\u91CC\u5C31\u5B9E\u73B0\u4E86\u5F02\u6B65\u8C03\u7528\uFF09
        eventLoop.execute(new Runnable() {
            @Override
            public void run() {
                register0(promise);
            }
        });
    }
`,paraId:103,tocIndex:5},{value:"netty \u5F02\u6B65\u8C03\u7528\u903B\u8F91\u7684\u6838\u5FC3\u4EE3\u7801\u5C31\u5728 try \u8BED\u53E5\u5757\u4E2D\uFF0C\u6211\u4EEC\u8FDB\u5165 execute \u65B9\u6CD5\uFF1A",paraId:104,tocIndex:5},{value:`@Override
    public void execute(Runnable task) {
        if (task == null) {
            throw new NullPointerException("task");
        }
        boolean inEventLoop = inEventLoop();
        //\u5C06\u6211\u4EEC\u524D\u9762\u4F20\u7684Runnable\u4EFB\u52A1\u6DFB\u52A0\u5230\u4E86\u961F\u5217\u4E2D
        addTask(task);
        if (!inEventLoop) {
            startThread();
            if (isShutdown()) {
                boolean reject = false;
                try {
                    if (removeTask(task)) {
                        reject = true;
                    }
                } catch (UnsupportedOperationException e) {
					//..
                }
                if (reject) {
                    reject();
                }
            }
        }
        if (!addTaskWakesUp && wakesUpForTask(task)) {
            wakeup(inEventLoop);
        }
    }
`,paraId:105,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u7684\u6838\u5FC3\u5C31\u662F ",paraId:106,tocIndex:5},{value:"addTask(task);",paraId:106,tocIndex:5},{value:"\uFF0C\u5B83\u5C06\u524D\u9762\u4F20\u7684 Runnable \u4EFB\u52A1\u6DFB\u52A0\u5230\u4E86\u961F\u5217\u4E2D\uFF08EventLoop \u7684 TaskQueue\uFF09\u3002",paraId:106,tocIndex:5},{value:`    protected void addTask(Runnable task) {
        if (task == null) {
            throw new NullPointerException("task");
        }
        if (!offerTask(task)) {
            reject(task);
        }
    }

    final boolean offerTask(Runnable task) {
        if (isShutdown()) {
            reject();
        }
        return taskQueue.offer(task);
    }
`,paraId:107,tocIndex:5},{value:"\u56DE\u5230 ",paraId:108,tocIndex:5},{value:"execute",paraId:108,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u5C06\u4EFB\u52A1\u4E22\u5230\u961F\u5217\u540E\uFF0C\u4E0B\u9762\u5C31\u8C03\u7528",paraId:108,tocIndex:5},{value:" startThread();",paraId:108,tocIndex:5},{value:"\uFF0C\u542F\u52A8\u7EBF\u7A0B\u4E86\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:108,tocIndex:5},{value:`    private void startThread() {
        if (state == ST_NOT_STARTED) {
            if (STATE_UPDATER.compareAndSet(this, ST_NOT_STARTED, ST_STARTED)) {
                boolean success = false;
                try {
                    doStartThread();
                    success = true;
                } finally {
                    if (!success) {
                        STATE_UPDATER.compareAndSet(this, ST_STARTED, ST_NOT_STARTED);
                    }
                }
            }
        }
    }


private void doStartThread() {
        assert thread == null;
        //executor\u5C31\u662F\u5728\u521B\u5EFAEventLoopGroup\u65F6\u5019\u521B\u5EFA\u7684\u90A3\u4E2A\u5355\u7EBF\u7A0B\u7EBF\u7A0B\u6C60
        executor.execute(new Runnable() {
            @Override
            public void run() {
                thread = Thread.currentThread();
                if (interrupted) {
                    thread.interrupt();
                }
                boolean success = false;
                updateLastExecutionTime();
                try {
                    SingleThreadEventExecutor.this.run();
                    success = true;
                } catch (Throwable t) {
                   //..
                } finally {
                    for (;;) {
                        int oldState = state;
                        if (oldState >= ST_SHUTTING_DOWN || STATE_UPDATER.compareAndSet(
                                SingleThreadEventExecutor.this, oldState, ST_SHUTTING_DOWN)) {
                            break;
                        }
                    }
                    if (success && gracefulShutdownStartTime == 0) {
                        if (logger.isErrorEnabled()) {
							//..
                        }
                    }
                    try {
                        for (;;) {
                            if (confirmShutdown()) {
                                break;
                            }
                        }
                    } finally {
                        try {
                            cleanup();
                        } finally {
                            FastThreadLocal.removeAll();
                            STATE_UPDATER.set(SingleThreadEventExecutor.this, ST_TERMINATED);
                            threadLock.countDown();
							//..
                            terminationFuture.setSuccess(null);
                        }
                    }
                }
            }
        });
    }
`,paraId:109,tocIndex:5},{value:"\u8FDB\u5165\u6838\u5FC3\u4EE3\u7801",paraId:110,tocIndex:5},{value:" SingleThreadEventExecutor.this.run();",paraId:110,tocIndex:5},{value:"\uFF1A",paraId:110,tocIndex:5},{value:`@Override
    protected void run() {
       //\u6B7B\u5FAA\u73AF
        for (;;) {
            try {
                try {
                    switch (selectStrategy.calculateStrategy(selectNowSupplier, hasTasks())) {
                    case SelectStrategy.CONTINUE:
                        continue;
                    case SelectStrategy.BUSY_WAIT:
                    case SelectStrategy.SELECT:
                        select(wakenUp.getAndSet(false));
                        if (wakenUp.get()) {
                            selector.wakeup();
                        }
                    default:
                    }
                } catch (IOException e) {
                    rebuildSelector0();
                    handleLoopException(e);
                    continue;
                }
                cancelledKeys = 0;
                needsToSelectAgain = false;
                final int ioRatio = this.ioRatio;
                if (ioRatio == 100) {
                    try {
                        processSelectedKeys();
                    } finally {
                        runAllTasks();
                    }
                } else {
                    final long ioStartTime = System.nanoTime();
                    try {
                        processSelectedKeys();
                    } finally {
                        final long ioTime = System.nanoTime() - ioStartTime;
                        runAllTasks(ioTime * (100 - ioRatio) / ioRatio);
                    }
                }
            } catch (Throwable t) {
                handleLoopException(t);
            }
            try {
                if (isShuttingDown()) {
                    closeAll();
                    if (confirmShutdown()) {
                        return;
                    }
                }
            } catch (Throwable t) {
                handleLoopException(t);
            }
        }
    }
`,paraId:111,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u7684\u6838\u5FC3\u5C31\u662F",paraId:112,tocIndex:5},{value:" select(wakenUp.getAndSet(false));",paraId:112,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:112,tocIndex:5},{value:`@Override
    protected void run() {
       //\u6B7B\u5FAA\u73AF
        for (;;) {
            try {
                try {
                    switch (selectStrategy.calculateStrategy(selectNowSupplier, hasTasks())) {
                    case SelectStrategy.CONTINUE:
                        continue;

                    case SelectStrategy.BUSY_WAIT:
                        // fall-through to SELECT since the busy-wait is not supported with NIO

                    case SelectStrategy.SELECT:
                        select(wakenUp.getAndSet(false));


                        if (wakenUp.get()) {
                            selector.wakeup();
                        }
                        // fall through
                    default:
                    }
                } catch (IOException e) {
                    // If we receive an IOException here its because the Selector is messed up. Let's rebuild
                    // the selector and retry. https://github.com/netty/netty/issues/8566
                    rebuildSelector0();
                    handleLoopException(e);
                    continue;
                }

                cancelledKeys = 0;
                needsToSelectAgain = false;
                final int ioRatio = this.ioRatio;
                if (ioRatio == 100) {
                    try {
                        processSelectedKeys();
                    } finally {
                        // Ensure we always run tasks.
                        runAllTasks();
                    }
                } else {
                    final long ioStartTime = System.nanoTime();
                    try {
                        processSelectedKeys();
                    } finally {
                        // Ensure we always run tasks.
                        final long ioTime = System.nanoTime() - ioStartTime;
                        runAllTasks(ioTime * (100 - ioRatio) / ioRatio);
                    }
                }
            } catch (Throwable t) {
                handleLoopException(t);
            }
            // Always handle shutdown even if the loop processing threw an exception.
            try {
                if (isShuttingDown()) {
                    closeAll();
                    if (confirmShutdown()) {
                        return;
                    }
                }
            } catch (Throwable t) {
                handleLoopException(t);
            }
        }
    }
12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455565758596061626364656667
`,paraId:113,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u7684\u6838\u5FC3\u5C31\u662F",paraId:114,tocIndex:5},{value:" select(wakenUp.getAndSet(false));",paraId:114,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:114,tocIndex:5},{value:`private void select(boolean oldWakenUp) throws IOException {
		//\u83B7\u5F97\u4E86selector
        Selector selector = this.selector;
        try {
            int selectCnt = 0;
            long currentTimeNanos = System.nanoTime();
            long selectDeadLineNanos = currentTimeNanos + delayNanos(currentTimeNanos);

            long normalizedDeadlineNanos = selectDeadLineNanos - initialNanoTime();
            if (nextWakeupTime != normalizedDeadlineNanos) {
                nextWakeupTime = normalizedDeadlineNanos;
            }
            for (;;) {
                long timeoutMillis = (selectDeadLineNanos - currentTimeNanos + 500000L) / 1000000L;
                if (timeoutMillis <= 0) {
                    if (selectCnt == 0) {
                        selector.selectNow();
                        selectCnt = 1;
                    }
                    break;
                }

                // If a task was submitted when wakenUp value was true, the task didn't get a chance to call
                // Selector#wakeup. So we need to check task queue again before executing select operation.
                // If we don't, the task might be pended until select operation was timed out.
                // It might be pended until idle timeout if IdleStateHandler existed in pipeline.
                if (hasTasks() && wakenUp.compareAndSet(false, true)) {
                    selector.selectNow();
                    selectCnt = 1;
                    break;
                }

                int selectedKeys = selector.select(timeoutMillis);
                selectCnt ++;

                if (selectedKeys != 0 || oldWakenUp || wakenUp.get() || hasTasks() || hasScheduledTasks()) {
                    // - Selected something,
                    // - waken up by user, or
                    // - the task queue has a pending task.
                    // - a scheduled task is ready for processing
                    break;
                }
                if (Thread.interrupted()) {
                    // Thread was interrupted so reset selected keys and break so we not run into a busy loop.
                    // As this is most likely a bug in the handler of the user or it's client library we will
                    // also log it.
                    //
                    // See https://github.com/netty/netty/issues/2426
                    if (logger.isDebugEnabled()) {
                        logger.debug("Selector.select() returned prematurely because " +
                                "Thread.currentThread().interrupt() was called. Use " +
                                "NioEventLoop.shutdownGracefully() to shutdown the NioEventLoop.");
                    }
                    selectCnt = 1;
                    break;
                }

                long time = System.nanoTime();
                if (time - TimeUnit.MILLISECONDS.toNanos(timeoutMillis) >= currentTimeNanos) {
                    // timeoutMillis elapsed without anything selected.
                    selectCnt = 1;
                } else if (SELECTOR_AUTO_REBUILD_THRESHOLD > 0 &&
                        selectCnt >= SELECTOR_AUTO_REBUILD_THRESHOLD) {
                    // The code exists in an extra method to ensure the method is not too big to inline as this
                    // branch is not very likely to get hit very frequently.
                    selector = selectRebuildSelector(selectCnt);
                    selectCnt = 1;
                    break;
                }

                currentTimeNanos = time;
            }

            if (selectCnt > MIN_PREMATURE_SELECTOR_RETURNS) {
                if (logger.isDebugEnabled()) {
                    logger.debug("Selector.select() returned prematurely {} times in a row for Selector {}.",
                            selectCnt - 1, selector);
                }
            }
        } catch (CancelledKeyException e) {
            if (logger.isDebugEnabled()) {
                logger.debug(CancelledKeyException.class.getSimpleName() + " raised by a Selector {} - JDK bug?",
                        selector, e);
        }
    }
`,paraId:115,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u7684\u6838\u5FC3\u4EE3\u7801\u5C31\u662F ",paraId:116,tocIndex:5},{value:"int selectedKeys = selector.select(timeoutMillis);",paraId:116,tocIndex:5},{value:"\u8FD9\u91CC\u5C31\u8C03\u7528\u4E86 Selector \u7684 select \u65B9\u6CD5\uFF0C\u5B66\u4E60 NIO \u540E\u6211\u4EEC\u77E5\u9053\u8FD9\u4E2A\u65B9\u6CD5\u662F\u4E00\u4E2A\u963B\u585E\u65B9\u6CD5\uFF0C\u65B9\u6CD5\u7ED3\u679C\u7684\u8FD4\u56DE\u503C\u5C31\u662F\u5DF2\u7ECF\u5C31\u7EEA\u7684\u4E8B\u4EF6",paraId:117,tocIndex:5},{value:"\u8FD9\u91CC\u8BBE\u7F6E\u4E86\u8D85\u65F6\u65F6\u95F4\uFF0C\u5230\u4E86\u8D85\u65F6\u65F6\u95F4\u4E0D\u7BA1\u6709\u6CA1\u6709\u4E8B\u4EF6\u5C31\u7EEA\uFF0Cselect \u65B9\u6CD5\u5C31\u4F1A\u6267\u884C\u5B8C\u6BD5\u3002\u4E0A\u9762\u4EE3\u7801\u6838\u5FC3\u5C31\u662F\u8C03\u7528\u4E86\u4E00\u4E2A select \u65B9\u6CD5\uFF0C\u56DE\u5230 run \u65B9\u6CD5\uFF1A",paraId:118,tocIndex:5},{value:`if (ioRatio == 100) {
    try {
        processSelectedKeys();
    } finally {
        // Ensure we always run tasks.
        runAllTasks();
    }
}
`,paraId:119,tocIndex:5},{value:"\u56DE\u5230\u7EBF\u7A0B\u6A21\u578B\u56FE\uFF0C\u6211\u4EEC\u5C31\u56DE\u5230\u4E86\u4E0B\u9762\u7EA2\u5708\u90E8\u5206\uFF1A",paraId:120,tocIndex:5},{value:"\u7B2C\u4E8C\u6B65\u5C31\u662F\u8C03\u7528 ",paraId:121,tocIndex:5},{value:"processSelectedKeys()",paraId:121,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:121,tocIndex:5},{value:`private void processSelectedKeys() {
    if (selectedKeys != null) {
        processSelectedKeysOptimized();
    } else {
        processSelectedKeysPlain(selector.selectedKeys());
    }
}
`,paraId:122,tocIndex:5},{value:"\u5982\u679C ",paraId:123,tocIndex:5},{value:"selectedKeys",paraId:123,tocIndex:5},{value:" \u4E0D\u4E3A\u7A7A\uFF0C\u8FDB\u5165 ",paraId:123,tocIndex:5},{value:"processSelectedKeysOptimized",paraId:123,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:123,tocIndex:5},{value:`private void processSelectedKeysOptimized() {
    for (int i = 0; i < selectedKeys.size; ++i) {
        final SelectionKey k = selectedKeys.keys[i];
        selectedKeys.keys[i] = null;
        final Object a = k.attachment();
        if (a instanceof AbstractNioChannel) {
            processSelectedKey(k, (AbstractNioChannel) a);
        } else {
            @SuppressWarnings("unchecked")
            NioTask<SelectableChannel> task = (NioTask<SelectableChannel>) a;
            processSelectedKey(k, task);
        }
        if (needsToSelectAgain) {
            selectedKeys.reset(i + 1);
            selectAgain();
            i = -1;
        }
    }
}
`,paraId:124,tocIndex:5},{value:"\u4E0A\u9762\u6838\u5FC3\u4EE3\u7801\u5C31\u662F NIO \u4EE3\u7801\u7684\u903B\u8F91\uFF0C\u8FD9\u91CC\u5C31\u4E0D\u8BE6\u7EC6\u5206\u6790\u4E86\u3002\u56DE\u5230 run \u65B9\u6CD5\uFF0C\u4E0B\u9762\u5C31\u4F1A\u8C03\u7528 ",paraId:125,tocIndex:5},{value:"runAllTasks()",paraId:125,tocIndex:5},{value:" \u65B9\u6CD5\uFF1A",paraId:125,tocIndex:5},{value:`protected boolean runAllTasks() {
    assert inEventLoop();
    boolean fetchedAll;
    boolean ranAtLeastOne = false;

    do {
        fetchedAll = fetchFromScheduledTaskQueue();
        if (runAllTasksFrom(taskQueue)) {
            ranAtLeastOne = true;
        }
    } while (!fetchedAll);

    if (ranAtLeastOne) {
        lastExecutionTime = ScheduledFutureTask.nanoTime();
    }
    afterRunningAllTasks();
    return ranAtLeastOne;
}
`,paraId:126,tocIndex:5},{value:"\u4E0A\u9762\u4EE3\u7801\u5C31\u662F\u5C06 EventLoop \u7684 TaskQueue \u4E2D\u7684\u4EFB\u52A1\u62FF\u51FA\u6765\u6267\u884C\u3002\u8FD9\u91CC\u6211\u4EEC\u5C31\u5F97\u56DE\u5230\u524D\u9762\u7684 register \u65B9\u6CD5\uFF0C\u56E0\u4E3A\u5728\u8FD9\u91CC\u6211\u4EEC\u52A0\u5165\u7684\u4E00\u4E2A\u4EFB\u52A1\u4F1A\u5728 ",paraId:127,tocIndex:5},{value:"runAllTasks",paraId:127,tocIndex:5},{value:" \u65B9\u6CD5\u4E2D\u6267\u884C\uFF1A",paraId:127,tocIndex:5},{value:`eventLoop.execute(new Runnable() {
    @Override
    public void run() {
        register0(promise);
    }
});
`,paraId:128,tocIndex:5},{value:"\u8FDB\u5165 register0 \u65B9\u6CD5\uFF1A",paraId:129,tocIndex:5},{value:`private void register0(ChannelPromise promise) {
            try {
                if (!promise.setUncancellable() || !ensureOpen(promise)) {
                    return;
                }
                boolean firstRegistration = neverRegistered;
                doRegister();
                neverRegistered = false;
                registered = true;
                pipeline.invokeHandlerAddedIfNeeded();
                safeSetSuccess(promise);
                pipeline.fireChannelRegistered();
                if (isActive()) {
                    if (firstRegistration) {
                        pipeline.fireChannelActive();
                    } else if (config().isAutoRead()) {
                        beginRead();
                    }
                }
            } catch (Throwable t) {
                closeForcibly();
                closeFuture.setClosed();
                safeSetFailure(promise, t);
            }
        }
`,paraId:130,tocIndex:5},{value:"\u6CE8\u610F\u4E0A\u9762\u4EE3\u7801\u7B2C\u4E00\u4E2A\u5341\u5206\u6838\u5FC3\u7684\u4EE3\u7801",paraId:131,tocIndex:5},{value:" doRegister();",paraId:131,tocIndex:5},{value:"\uFF0C\u6211\u4EEC\u8FDB\u5165\u8BE5\u65B9\u6CD5\uFF1A",paraId:131,tocIndex:5},{value:`@Override
protected void doRegister() throws Exception {
    boolean selected = false;
    for (;;) {
        try {
            selectionKey = javaChannel().register(eventLoop().unwrappedSelector(), 0, this);
            return;
        } catch (CancelledKeyException e) {
            if (!selected) {
                eventLoop().selectNow();
                selected = true;
            } else {
                throw e;
            }
        }
    }
}
`,paraId:132,tocIndex:5},{value:"javaChannel()",paraId:133,tocIndex:5},{value:" \u5C31\u662F\u524D\u9762\u521B\u5EFA\u7684 ServerSocketChannel\uFF0C\u7136\u540E\u8C03\u7528 register \u65B9\u6CD5\u5C06 ServerSocketChannel \u6CE8\u518C\u5230\u4E86 Selector \u4E2D\u4E86\uFF0C\u7136\u540E\u7ED1\u5B9A\u4E86\u611F\u5174\u8DA3\u7684\u4E8B\u4EF6\u3002\u8FD9\u91CC\u4E5F\u662F NIO \u7684\u903B\u8F91\u3002\u56DE\u5230 ",paraId:133,tocIndex:5},{value:"register0",paraId:133,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u4E0B\u4E00\u4E2A\u6838\u5FC3\u4EE3\u7801\u662F:",paraId:133,tocIndex:5},{value:`pipeline.invokeHandlerAddedIfNeeded();
safeSetSuccess(promise);
pipeline.fireChannelRegistered();
if (isActive()) {
    if (firstRegistration) {
        pipeline.fireChannelActive();
    } else if (config().isAutoRead()) {
        beginRead();
    }
}
`,paraId:134,tocIndex:5},{value:"invokeHandlerAddedIfNeeded();",paraId:135,tocIndex:5},{value:" \u8FD9\u91CC\u5E95\u5C42\u6E90\u7801\u6BD4\u8F83\u590D\u6742\uFF0C",paraId:135,tocIndex:5},{value:"\u5B83\u5E95\u5C42\u5176\u5B9E\u4F1A\u8C03\u7528\u6211\u4EEC\u4E4B\u524D\u5728\u521D\u59CB\u5316 pipeLine \u7684\u65F6\u5019\u52A0\u5165\u7684\u4E00\u4E2A handler\uFF1A",paraId:135,tocIndex:5},{value:`p.addLast(new ChannelHandler[]{new ChannelInitializer<Channel>() {
            public void initChannel(final Channel ch) {
                final ChannelPipeline pipeline = ch.pipeline();
                ChannelHandler handler = ServerBootstrap.this.config.handler();
                if (handler != null) {
                    pipeline.addLast(new ChannelHandler[]{handler});
                }

                ch.eventLoop().execute(new Runnable() {
                    public void run() {
                        pipeline.addLast(new ChannelHandler[]{new ServerBootstrapAcceptor(ch, currentChildGroup, currentChildHandler, currentChildOptions, currentChildAttrs)});
                    }
                });
            }
        }});
`,paraId:136,tocIndex:5},{value:"\u6267\u884C\u4E86\u4E0A\u9762\u7684\u4EE3\u7801 PipeLine \u91CC\u9762\u7684 handler \u7684\u60C5\u51B5\u53D8\u5316\u5982\u4E0B\uFF1A",paraId:137,tocIndex:5},{value:"\u7EE7\u7EED\u6267\u884C\u4E0B\u9762\u4EE3\u7801\uFF1A",paraId:138,tocIndex:5},{value:`pipeline.fireChannelRegistered();
	
	//head\u5C31\u662F\u524D\u9762\u53CC\u5411\u94FE\u8868\u7684\u5934\u8282\u70B9
  @Override
    public final ChannelPipeline fireChannelRegistered() {
        AbstractChannelHandlerContext.invokeChannelRegistered(head);
        return this;
    }

 static void invokeChannelRegistered(final AbstractChannelHandlerContext next) {
        EventExecutor executor = next.executor();
        if (executor.inEventLoop()) {
        //\u540C\u6B65\u65B9\u5F0F\u8C03\u7528
            next.invokeChannelRegistered();
        } else {
        //\u5F02\u6B65\u65B9\u5F0F\u8C03\u7528
            executor.execute(new Runnable() {
                @Override
                public void run() {
                    next.invokeChannelRegistered();
                }
            });
        }
    }

private void invokeChannelRegistered() {
        if (invokeHandler()) {
            try {
                ((ChannelInboundHandler) handler()).channelRegistered(this);
            } catch (Throwable t) {
                notifyHandlerException(t);
            }
        } else {
            fireChannelRegistered();
        }
    }

  @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
        handleNewChannel(ctx);
       ctx.fireChannelRegistered();
    }
`,paraId:139,tocIndex:5},{value:"((ChannelInboundHandler) handler()).channelRegistered(this);",paraId:140,tocIndex:5},{value:" \u5C31\u8C03\u7528\u4E86 handler \u7684 ",paraId:140,tocIndex:5},{value:"channelRegistered",paraId:140,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u7136\u540E ",paraId:140,tocIndex:5},{value:"ctx.fireChannelRegistered();",paraId:140,tocIndex:5},{value:" \u5C31\u662F\u8C03\u7528 pipeline \u4E2D\u4E0B\u4E00\u4E2A handler \u7684\u6838\u5FC3\u903B\u8F91\u3002",paraId:140,tocIndex:5}]}}]);

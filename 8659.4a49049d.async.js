"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8659],{38659:function(n,e,a){a.r(e),a.d(e,{texts:function(){return t}});const t=[{value:"\u9879\u76EE\u6784\u5EFA",paraId:0},{value:"zookeeper \u5B98\u65B9\u7684\u5BA2\u6237\u7AEF\u6CA1\u6709\u548C\u670D\u52A1\u7AEF\u4EE3\u7801\u5206\u79BB\uFF0C\u4ED6\u4EEC\u4E3A\u540C\u4E00\u4E2A jar \u6587\u4EF6\uFF0C\u6240\u4EE5\u6211\u4EEC\u76F4\u63A5\u5F15\u5165 zookeeper \u7684 maven \u5373\u53EF",paraId:1,tocIndex:1},{value:"\u8FD9\u91CC\u7248\u672C\u8BF7\u4FDD\u6301\u4E0E\u670D\u52A1\u7AEF\u7248\u672C\u4E00\u81F4\uFF0C\u4E0D\u7136\u4F1A\u6709\u5F88\u591A\u517C\u5BB9\u6027\u7684\u95EE\u9898\uFF01",paraId:2,tocIndex:1},{value:`<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.8</version>
</dependency>
`,paraId:3,tocIndex:1},{value:"\u521B\u5EFA\u5BA2\u6237\u7AEF\u5B9E\u4F8B\uFF1A",paraId:0},{value:"\u4E3A\u4E86\u4FBF\u4E8E\u6D4B\u8BD5\uFF0C\u76F4\u63A5\u5728\u521D\u59CB\u5316\u65B9\u6CD5\u4E2D\u521B\u5EFA zookeeper \u5B9E\u4F8B",paraId:4,tocIndex:2},{value:`@Slf4j
public class ZookeeperClientTest {
    private static final String ZK_ADDRESS="192.168.109.200:2181";
    private static final int SESSION_TIMEOUT = 5000;
    private static ZooKeeper zooKeeper;
    //\u8868\u793AZooKeeper\u4E2D\u7684\u4E00\u4E2A\u8282\u70B9\u8DEF\u5F84
    private static final String ZK_NODE="/zk-node";
 
    @Before
    public void init() throws IOException, InterruptedException {
        //ZooKeeper\u4E2D\u5EFA\u7ACB\u8FDE\u63A5\u662F\u5F02\u6B65\u7684,\u6240\u4EE5\u4F7F\u7528CountDownLatch\u8FDB\u884C\u540C\u6B65
        final CountDownLatch countDownLatch=new CountDownLatch(1);
        //\u5EFA\u4E86\u4E00\u4E2AZooKeeper\u5BA2\u6237\u7AEF\u5B9E\u4F8B\uFF0C\u8FDE\u63A5\u5230\u6307\u5B9A\u7684ZooKeeper\u670D\u52A1\u5668\u5730\u5740\uFF0C\u5E76\u6307\u5B9A\u4E86\u4F1A\u8BDD\u8D85\u65F6\u65F6\u95F4SESSION_TIMEOUT\u3002\u540C\u65F6\uFF0C\u901A\u8FC7Lambda\u8868\u8FBE\u5F0F\u5B9A\u4E49\u4E86\u4E00\u4E2AWatcher\uFF0C\u7528\u4E8E\u76D1\u542C\u8FDE\u63A5\u72B6\u6001\u53D8\u5316
        zooKeeper=new ZooKeeper(ZK_ADDRESS, SESSION_TIMEOUT, event -> {
            //\u68C0\u67E5Watcher\u76D1\u542C\u7684\u4E8B\u4EF6\u72B6\u6001\u662F\u5426\u4E3A\u5DF2\u8FDE\u63A5\uFF08SyncConnected\uFF09
            if (event.getState()== Watcher.Event.KeeperState.SyncConnected &&
                //\u540C\u65F6\u68C0\u67E5\u4E8B\u4EF6\u7C7B\u578B\u662F\u5426\u4E3ANone\uFF0C\u8868\u793A\u8FDE\u63A5\u5EFA\u7ACB\u5B8C\u6210
                    event.getType()== Watcher.Event.EventType.None){
                countDownLatch.countDown();
                log.info("\u8FDE\u63A5\u6210\u529F\uFF01");
            }
        });
        log.info("\u8FDE\u63A5\u4E2D....");
        //\u7B49\u5F85\u76F4\u5230\u8FDE\u63A5\u6210\u529F\uFF0C\u5373\u76F4\u5230 countDownLatch \u4E2D\u7684\u8BA1\u6570\u4E3A0
        countDownLatch.await();
    }
}
`,paraId:5,tocIndex:2},{value:`ZooKeeper(String connectString, int sessionTimeout, Watcher watcher)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, ZKClientConfig)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly, HostProvider)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly, HostProvider, ZKClientConfig)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, boolean canBeReadOnly, ZKClientConfig)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, long, byte[])
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, long, byte[], boolean, HostProvider)
ZooKeeper(String connectString, int sessionTimeout, Watcher watcher, long, byte[], boolean, HostProvider, ZKClientConfig)
ZooKeeper(String connectString, int  sessionTimeout, Watcher watcher, long, byte[], boolean)
`,paraId:6,tocIndex:3},{value:"\u53C2\u6570\u540D\u79F0",paraId:7,tocIndex:3},{value:"\u542B\u4E49",paraId:7,tocIndex:3},{value:"connectString",paraId:7,tocIndex:3},{value:"ZooKeeper \u670D\u52A1\u5668\u5217\u8868\uFF0C\u7531\u82F1\u6587\u9017\u53F7\u5206\u5F00\u7684 host:port \u5B57\u7B26\u4E32\u7EC4\u6210\uFF0C\u6BCF\u4E00\u4E2A\u90FD\u4EE3\u8868\u4E00\u53F0 ZooKeeper \u673A\u5668\uFF0C\u5982\uFF0Chost1:port1,host2:port2,host3:port3\u3002\u53E6\u5916\uFF0C\u4E5F\u53EF\u4EE5\u5728 connectString \u4E2D\u8BBE\u7F6E\u5BA2\u6237\u7AEF\u8FDE\u63A5\u4E0A ZooKeeper\u540E\u7684\u6839\u76EE\u5F55\uFF0C\u65B9\u6CD5\u662F\u5728 host:port \u5B57\u7B26\u4E32\u4E4B\u540E\u6DFB\u52A0\u4E0A\u8FD9\u4E2A\u6839\u76EE\u5F55\uFF0C\u4F8B\u5982\uFF0Chost1:port1,host2:port2,host3:port3/zk-base, \u8FD9\u6837\u5C31\u6307\u5B9A\u4E86\u8BE5\u5BA2\u6237\u7AEF\u8FDE\u63A5\u4E0A ZooKeeper \u670D\u52A1\u5668\u4E4B\u540E\uFF0C\u6240\u6709\u5BF9 ZooKeeper\u7684\u64CD\u4F5C\uFF0C\u90FD\u4F1A\u57FA\u4E8E\u8FD9\u4E2A\u6839\u76EE\u5F55\u3002\u4F8B\u5982\uFF0C\u5BA2\u6237\u7AEF\u5BF9 /sub-node \u7684\u64CD\u4F5C\uFF0C\u6700\u7EC8\u521B\u5EFA /zk-node/sub-node, \u8FD9\u4E2A\u76EE\u5F55\u4E5F\u53EB Chroot\uFF0C\u5373\u5BA2\u6237\u7AEF\u9694\u79BB\u547D\u540D\u7A7A\u95F4\u3002",paraId:7,tocIndex:3},{value:"sessionTimeout",paraId:7,tocIndex:3},{value:"\u4F1A\u8BDD\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u662F\u4E00\u4E2A\u4EE5 \u201C\u6BEB\u79D2\u201D \u4E3A\u5355\u4F4D\u7684\u6574\u578B\u503C\u3002\u5728 ZooKeeper \u4E2D\u6709\u4F1A\u8BDD\u7684\u6982\u5FF5\uFF0C\u5728\u4E00\u4E2A\u4F1A\u8BDD\u5468\u671F\u5185\uFF0CZooKeeper \u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u4E4B\u95F4\u4F1A\u901A\u8FC7\u5FC3\u8DF3\u68C0\u6D4B\u673A\u5236\u6765\u7EF4\u6301\u4F1A\u8BDD\u7684\u6709\u6548\u6027\uFF0C\u4E00\u65E6\u5728 sessionTimeout \u65F6\u95F4\u5185\u6CA1\u6709\u8FDB\u884C\u6709\u6548\u7684\u5FC3\u8DF3\u68C0\u6D4B\uFF0C\u4F1A\u8BDD\u5C31\u4F1A\u5931\u6548\u3002",paraId:7,tocIndex:3},{value:"watcher",paraId:7,tocIndex:3},{value:"ZooKeeper \u5141\u8BB8\u5BA2\u6237\u7AEF\u5728\u6784\u9020\u65B9\u6CD5\u4E2D\u4F20\u5165\u4E00\u4E2A\u63A5\u53E3 watcher (org.apache. zookeeper.Watcher) \u7684\u5B9E\u73B0\u7C7B\u5BF9\u8C61\u6765\u4F5C\u4E3A\u9ED8\u8BA4\u7684 Watcher \u4E8B\u4EF6\u901A\u77E5\u5904\u7406\u5668\u3002\u5F53\u7136\uFF0C\u8BE5\u53C2\u6570\u53EF\u4EE5\u8BBE\u7F6E\u4E3A null \u4EE5\u8868\u660E\u4E0D\u9700\u8981\u8BBE\u7F6E\u9ED8\u8BA4\u7684 Watcher \u5904\u7406\u5668\u3002",paraId:7,tocIndex:3},{value:"canBeReadOnly",paraId:7,tocIndex:3},{value:"\u8FD9\u662F\u4E00\u4E2A boolean \u7C7B\u578B\u7684\u53C2\u6570\uFF0C\u7528\u4E8E\u6807\u8BC6\u5F53\u524D\u4F1A\u8BDD\u662F\u5426\u652F\u6301 \u201Cread-only (\u53EA\u8BFB)\u201D \u6A21\u5F0F\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u5728 ZooKeeper \u96C6\u7FA4\u4E2D\uFF0C\u4E00\u4E2A\u673A\u5668\u5982\u679C\u548C\u96C6\u7FA4\u4E2D\u8FC7\u534A\u53CA\u4EE5\u4E0A\u673A\u5668\u5931\u53BB\u4E86\u7F51\u7EDC\u8FDE\u63A5\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u673A\u5668\u5C06\u4E0D\u518D\u5904\u7406\u5BA2\u6237\u7AEF\u8BF7\u6C42\uFF08\u5305\u62EC\u8BFB\u5199\u8BF7\u6C42)\u3002\u4F46\u662F\u5728\u67D0\u4E9B\u4F7F\u7528\u573A\u666F\u4E0B\uFF0C\u5F53 ZooKeeper \u670D\u52A1\u5668\u53D1\u751F\u6B64\u7C7B\u6545\u969C\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u8FD8\u662F\u5E0C\u671B ZooKeeper \u670D\u52A1\u5668\u80FD\u591F\u63D0\u4F9B\u8BFB\u670D\u52A1\uFF08\u5F53\u7136\u5199\u670D\u52A1\u80AF\u5B9A\u65E0\u6CD5\u63D0\u4F9B\uFF09\u2014\u2014\u8FD9\u5C31\u662F ZooKeeper \u7684 \u201Cread-only\u201D \u6A21\u5F0F\u3002",paraId:7,tocIndex:3},{value:"sessionId \u548C sessionPasswd",paraId:7,tocIndex:3},{value:"\u5206\u522B\u4EE3\u8868\u4F1A\u8BDD ID \u548C\u4F1A\u8BDD\u79D8\u94A5\u3002\u8FD9\u4E24\u4E2A\u53C2\u6570\u80FD\u591F\u552F\u4E00\u786E\u5B9A\u4E00\u4E2A\u4F1A\u8BDD\uFF0C\u540C\u65F6\u5BA2\u6237\u7AEF\u4F7F\u7528\u8FD9\u4E24\u4E2A\u53C2\u6570\u53EF\u4EE5\u5B9E\u73B0\u5BA2\u6237\u7AEF\u4F1A\u8BDD\u590D\u7528\uFF0C\u4ECE\u800C\u8FBE\u5230\u6062\u590D\u4F1A\u8BDD\u7684\u6548\u679C\u3002\u5177\u4F53\u4F7F\u7528\u65B9\u6CD5\u662F\uFF0C\u7B2C\u4E00\u6B21\u8FDE\u63A5\u4E0A ZooKeeper \u670D\u52A1\u5668\u65F6\uFF0C\u901A\u8FC7\u8C03\u7528 ZooKeeper \u5BF9\u8C61\u5B9E\u4F8B\u7684\u4EE5\u4E0B\u4E24\u4E2A\u63A5\u53E3\uFF0C\u5373\u53EF\u83B7\u5F97\u5F53\u524D\u4F1A\u8BDD\u7684 ID \u548C\u79D8\u94A5:long getSessionId();byte[]getSessionPasswd( );\u837B\u53D6\u5230\u8FD9\u4E24\u4E2A\u53C2\u6570\u503C\u4E4B\u540E\uFF0C\u5C31\u53EF\u4EE5\u5728\u4E0B\u6B21\u521B\u5EFA ZooKeeper \u5BF9\u8C61\u5B9E\u4F8B\u7684\u65F6\u5019\u4F20\u5165\u6784\u9020\u65B9\u6CD5\u4E86",paraId:7,tocIndex:3},{value:`@Test
public void createTest() throws KeeperException, InterruptedException {
//ZK_NODE: \u8FD9\u662F\u8981\u521B\u5EFA\u7684\u8282\u70B9\u7684\u8DEF\u5F84\u3002\u5728\u8FD9\u91CC\uFF0C\u5B83\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u5E38\u91CF\uFF0C\u8868\u793A\u8981\u521B\u5EFA\u7684\u8282\u70B9\u7684\u8DEF\u5F84\u3002
//"data".getBytes(): \u8FD9\u662F\u8282\u70B9\u7684\u521D\u59CB\u6570\u636E\u3002\u5728\u8FD9\u91CC\uFF0C\u5B83\u662F\u4E00\u4E2A\u5305\u542B\u5B57\u7B26\u4E32"data"\u7684\u5B57\u8282\u6570\u7EC4\u3002\u5F53\u8282\u70B9\u521B\u5EFA\u65F6\uFF0C\u5B83\u4F1A\u4E0E\u8282\u70B9\u5173\u8054\uFF0C\u5176\u4ED6\u5BA2\u6237\u7AEF\u53EF\u4EE5\u8BFB\u53D6\u8BE5\u6570\u636E\u3002
//ZooDefs.Ids.OPEN_ACL_UNSAFE: \u8FD9\u662F\u8BBF\u95EE\u63A7\u5236\u5217\u8868\uFF08ACL\uFF09\uFF0C\u7528\u4E8E\u63A7\u5236\u5BF9\u8282\u70B9\u7684\u8BBF\u95EE\u6743\u9650\u3002ZooDefs.Ids.OPEN_ACL_UNSAFE \u662F //ZooKeeper \u63D0\u4F9B\u7684\u4E00\u4E2A\u9884\u5B9A\u4E49\u7684 ACL\uFF0C\u5B83\u5141\u8BB8\u4EFB\u4F55\u4EBA\u90FD\u80FD\u5BF9\u8282\u70B9\u8FDB\u884C\u4EFB\u4F55\u64CD\u4F5C\uFF08\u5305\u62EC\u8BFB\u3001\u5199\u3001\u5220\u9664\u7B49\uFF09\uFF0C\u56E0\u6B64\u88AB\u79F0\u4E3A"\u4E0D\u5B89\u5168"\u3002\u5728\u751F\u4EA7\u73AF\u5883\u4E2D\uFF0C\u4F60\u901A\u5E38\u4F1A\u4F7F\u7528\u66F4\u5B89\u5168\u7684 ACL\u3002
//CreateMode.PERSISTENT: \u8FD9\u662F\u8282\u70B9\u7684\u521B\u5EFA\u6A21\u5F0F\u3002\u5728\u8FD9\u91CC\uFF0C\u5B83\u6307\u5B9A\u8981\u521B\u5EFA\u7684\u8282\u70B9\u662F\u6301\u4E45\u8282\u70B9\uFF0C\u5373\u8BE5\u8282\u70B9\u521B\u5EFA\u540E\u5C06\u4E00\u76F4\u5B58\u5728\uFF0C\u76F4\u5230\u663E\u5F0F\u5220\u9664\u3002
    String path = zooKeeper.create(ZK_NODE, "data".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    log.info("created path: {}",path);
}
`,paraId:8,tocIndex:4},{value:"\u5F02\u6B65\u65B9\u5F0F\u521B\u5EFA\u8282\u70B9",paraId:9,tocIndex:5},{value:"\uFF1A\u4E0E\u4E4B\u524D\u7684\u540C\u6B65\u65B9\u5F0F\u4E0D\u540C\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u662F\u5F02\u6B65\u7684\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5F53\u8C03\u7528 ",paraId:9,tocIndex:5},{value:"zooKeeper.create()",paraId:9,tocIndex:5},{value:" \u65B9\u6CD5\u65F6\uFF0C\u5B83\u4F1A\u7ACB\u5373\u8FD4\u56DE\uFF0C\u800C\u4E0D\u4F1A\u7B49\u5F85\u8282\u70B9\u521B\u5EFA\u5B8C\u6210\u3002",paraId:9,tocIndex:5},{value:"\u901A\u8FC7\u5C06\u56DE\u8C03\u51FD\u6570\u4F20\u5165 ",paraId:10,tocIndex:5},{value:"zooKeeper.create()",paraId:10,tocIndex:5},{value:" \u65B9\u6CD5\uFF0C\u53EF\u4EE5\u4F7F\u8282\u70B9\u521B\u5EFA\u64CD\u4F5C\u53D8\u6210\u5F02\u6B65\u7684\uFF0C\u4E0D\u4F1A\u963B\u585E\u5F53\u524D\u7EBF\u7A0B\u7684\u6267\u884C",paraId:10,tocIndex:5},{value:"\u5728 ",paraId:11,tocIndex:5},{value:"zooKeeper.create()",paraId:11,tocIndex:5},{value:" \u65B9\u6CD5\u7684\u6700\u540E\u4E00\u4E2A\u53C2\u6570\u4F4D\u7F6E\u4E0A\uFF0C\u4F20\u5165\u4E86\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570 ",paraId:11,tocIndex:5},{value:'(rc, path, ctx, name) -> log.info("rc {},path {},ctx {},name {}", rc, path, ctx, name)',paraId:11,tocIndex:5},{value:"\u3002\u8FD9\u4E2A\u56DE\u8C03\u51FD\u6570\u4F1A\u5728\u8282\u70B9\u521B\u5EFA\u64CD\u4F5C\u5B8C\u6210\u540E\u88AB\u8C03\u7528\uFF0C\u7528\u4E8E\u5904\u7406\u521B\u5EFA\u7ED3\u679C\u3002\u53C2\u6570 ",paraId:11,tocIndex:5},{value:"rc",paraId:11,tocIndex:5},{value:" \u8868\u793A\u64CD\u4F5C\u7ED3\u679C\u7801\uFF0C",paraId:11,tocIndex:5},{value:"path",paraId:11,tocIndex:5},{value:" \u8868\u793A\u521B\u5EFA\u7684\u8282\u70B9\u8DEF\u5F84\uFF0C",paraId:11,tocIndex:5},{value:"ctx",paraId:11,tocIndex:5},{value:' \u8868\u793A\u4E0A\u4E0B\u6587\u4FE1\u606F\uFF08\u5728\u8FD9\u91CC\u662F\u5B57\u7B26\u4E32"context"',paraId:11,tocIndex:5},{value:")\uFF0C",paraId:11,tocIndex:5},{value:"name` \u8868\u793A\u521B\u5EFA\u7684\u8282\u70B9\u7684\u5B9E\u9645\u8DEF\u5F84\u3002\u5728\u8FD9\u4E2A\u56DE\u8C03\u51FD\u6570\u4E2D\uFF0C\u4F7F\u7528\u4E86\u65E5\u5FD7\u8BB0\u5F55\u5668\u6765\u8F93\u51FA\u64CD\u4F5C\u7ED3\u679C",paraId:11,tocIndex:5},{value:`@Test
public void createAsycTest() throws InterruptedException {
     zooKeeper.create(ZK_NODE, "data".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE,
             CreateMode.PERSISTENT,
             (rc, path, ctx, name) -> log.info("rc  {},path {},ctx {},name {}",rc,path,ctx,name),"context");
    //\u4E3A\u4E86\u4FDD\u6301\u7A0B\u5E8F\u8FD0\u884C\uFF0C\u4F7F\u7528\u4E86 TimeUnit.SECONDS.sleep(Integer.MAX_VALUE)\uFF0C\u8FD9\u4F7F\u5F97\u7A0B\u5E8F\u4F1A\u4E00\u76F4\u7B49\u5F85\u76F4\u5230\u88AB\u624B\u52A8\u7EC8\u6B62
    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
`,paraId:12,tocIndex:5},{value:"TimeUnit.SECONDS.sleep(Integer.MAX_VALUE)",paraId:13,tocIndex:5},{value:" \u8C03\u7528\u53EF\u4EE5\u4FDD\u6301\u7A0B\u5E8F\u8FD0\u884C\u7684\u539F\u56E0\u5728\u4E8E ",paraId:13,tocIndex:5},{value:"sleep()",paraId:13,tocIndex:5},{value:" \u65B9\u6CD5\u4F1A\u8BA9\u5F53\u524D\u7EBF\u7A0B\u4F11\u7720\u6307\u5B9A\u7684\u65F6\u95F4\u3002\u5728\u8FD9\u91CC\uFF0C\u4F20\u5165\u4E86 ",paraId:13,tocIndex:5},{value:"Integer.MAX_VALUE",paraId:13,tocIndex:5},{value:"\uFF0C\u5373 2^31 - 1 \u79D2\u7684\u65F6\u95F4\uFF0C\u8FD9\u51E0\u4E4E\u662F 68 \u5E74\u3002\u8FD9\u6BB5\u65F6\u95F4\u5BF9\u4E8E\u7A0B\u5E8F\u6765\u8BF4\u662F\u8DB3\u591F\u957F\u7684\uFF0C\u51E0\u4E4E\u76F8\u5F53\u4E8E\u6C38\u8FDC\u3002\u56E0\u6B64\uFF0C\u7A0B\u5E8F\u5C06\u4F1A\u4E00\u76F4\u4F11\u7720\uFF0C\u4FDD\u6301\u8FD0\u884C\u72B6\u6001\uFF0C\u76F4\u5230\u88AB\u624B\u52A8\u7EC8\u6B62\u6216\u53D1\u751F\u4E86\u67D0\u79CD\u5F02\u5E38",paraId:13,tocIndex:5},{value:"\u9996\u5148\uFF0C\u901A\u8FC7\u8C03\u7528 ",paraId:14,tocIndex:6},{value:"zooKeeper.getData()",paraId:14,tocIndex:6},{value:" \u65B9\u6CD5",paraId:14,tocIndex:6},{value:"\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u6570\u636E",paraId:14,tocIndex:6},{value:"\u3002",paraId:14,tocIndex:6},{value:"zooKeeper.getData(ZK_NODE, false, stat)",paraId:14,tocIndex:6},{value:" \u4E2D\u7684\u53C2\u6570\u5305\u62EC\uFF1A",paraId:14,tocIndex:6},{value:"ZK_NODE",paraId:15,tocIndex:6},{value:"\uFF1A\u8868\u793A\u8981\u83B7\u53D6\u6570\u636E\u7684\u8282\u70B9\u8DEF\u5F84\u3002",paraId:15,tocIndex:6},{value:"false",paraId:15,tocIndex:6},{value:"\uFF1A\u8868\u793A\u4E0D\u9700\u8981\u76D1\u542C\u8282\u70B9\u7684\u53D8\u5316\u3002",paraId:15,tocIndex:6},{value:"stat",paraId:15,tocIndex:6},{value:"\uFF1A\u7528\u4E8E\u5B58\u50A8\u8282\u70B9\u7684\u5143\u6570\u636E\u4FE1\u606F\uFF0C\u5982\u6570\u636E\u7248\u672C\u53F7\u7B49",paraId:15,tocIndex:6},{value:"\u66F4\u65B0\u8282\u70B9\u6570\u636E",paraId:16,tocIndex:6},{value:"\uFF1A\u63A5\u4E0B\u6765\uFF0C\u4F7F\u7528 ",paraId:16,tocIndex:6},{value:"zooKeeper.setData()",paraId:16,tocIndex:6},{value:" \u65B9\u6CD5\u6765\u66F4\u65B0\u8282\u70B9\u7684\u6570\u636E\u3002",paraId:16,tocIndex:6},{value:'zooKeeper.setData(ZK_NODE, "changed!".getBytes(), stat.getVersion())',paraId:16,tocIndex:6},{value:" \u4E2D\u7684\u53C2\u6570\u5305\u62EC\uFF1A",paraId:16,tocIndex:6},{value:"ZK_NODE",paraId:17,tocIndex:6},{value:"\uFF1A\u8868\u793A\u8981\u66F4\u65B0\u6570\u636E\u7684\u8282\u70B9\u8DEF\u5F84\u3002",paraId:17,tocIndex:6},{value:'"changed!".getBytes()',paraId:17,tocIndex:6},{value:'\uFF1A\u8868\u793A\u8981\u66F4\u65B0\u7684\u65B0\u6570\u636E\uFF0C\u8FD9\u91CC\u5C06\u5B57\u7B26\u4E32"changed!"\u8F6C\u6362\u4E3A\u5B57\u8282\u6570\u7EC4\u4F5C\u4E3A\u65B0\u7684\u8282\u70B9\u6570\u636E\u3002',paraId:17,tocIndex:6},{value:"stat.getVersion()",paraId:17,tocIndex:6},{value:"\uFF1A",paraId:17,tocIndex:6},{value:"\u8868\u793A\u8981\u66F4\u65B0\u7684\u8282\u70B9\u7684\u7248\u672C\u53F7\uFF0C\u786E\u4FDD\u5728\u66F4\u65B0\u65F6\u8282\u70B9\u7684\u7248\u672C\u53F7\u4E0E\u5F53\u524D\u4E00\u81F4\uFF0C\u4EE5\u514D\u53D1\u751F\u6570\u636E\u51B2\u7A81\u3002",paraId:17,tocIndex:6},{value:`@Test
public void setTest() throws KeeperException, InterruptedException {
    Stat stat = new Stat();
    byte[] data = zooKeeper.getData(ZK_NODE, false, stat);
    log.info("\u4FEE\u6539\u524D: {}",new String(data));
    zooKeeper.setData(ZK_NODE, "changed!".getBytes(), stat.getVersion());
     byte[] dataAfter = zooKeeper.getData(ZK_NODE, false, stat);
    log.info("\u4FEE\u6539\u540E: {}",new String(dataAfter));
}
`,paraId:18,tocIndex:6},{value:"Curator \u662F\u4E00\u5957\u7531 netflix \u516C\u53F8\u5F00\u6E90\u7684\uFF0CJava \u8BED\u8A00\u7F16\u7A0B\u7684 ZooKeeper \u5BA2\u6237\u7AEF\u6846\u67B6\uFF0CCurator \u9879\u76EE\u662F\u73B0\u5728 ZooKeeper \u5BA2\u6237\u7AEF\u4E2D\u4F7F\u7528\u6700\u591A\uFF0C\u5BF9 ZooKeeper \u7248\u672C\u652F\u6301\u6700\u597D\u7684\u7B2C\u4E09\u65B9\u5BA2\u6237\u7AEF\uFF0C\u5E76\u63A8\u8350\u4F7F\u7528\uFF0C",paraId:19,tocIndex:7},{value:"Curator \u628A\u6211\u4EEC\u5E73\u65F6\u5E38\u7528\u7684\u5F88\u591A ZooKeeper \u670D\u52A1\u5F00\u53D1\u529F\u80FD\u505A\u4E86\u5C01\u88C5",paraId:19,tocIndex:7},{value:"\uFF0C\u4F8B\u5982 Leader \u9009\u4E3E\u3001\u5206\u5E03\u5F0F\u8BA1\u6570\u5668\u3001\u5206\u5E03\u5F0F\u9501\u3002\u8FD9\u5C31\u51CF\u5C11\u4E86\u6280\u672F\u4EBA\u5458\u5728\u4F7F\u7528 ZooKeeper \u65F6\u7684\u5927\u90E8\u5206\u5E95\u5C42\u7EC6\u8282\u5F00\u53D1\u5DE5\u4F5C\u3002",paraId:19,tocIndex:7},{value:"\u5728\u4F1A\u8BDD\u91CD\u65B0\u8FDE\u63A5\u3001Watch \u53CD\u590D\u6CE8\u518C\u3001\u591A\u79CD\u5F02\u5E38\u5904\u7406\u7B49\u4F7F\u7528\u573A\u666F\u4E2D\uFF0C\u7528\u539F\u751F\u7684 ZooKeeper \u5904\u7406\u6BD4\u8F83\u590D\u6742\u3002\u800C\u5728\u4F7F\u7528 Curator \u65F6\uFF0C\u7531\u4E8E\u5176\u5BF9\u8FD9\u4E9B\u529F\u80FD\u90FD",paraId:20,tocIndex:7},{value:"\u505A\u4E86\u9AD8\u5EA6\u7684\u5C01\u88C5\uFF0C\u4F7F\u7528\u8D77\u6765\u66F4\u52A0\u7B80\u5355\uFF0C\u4E0D\u4F46\u51CF\u5C11\u4E86\u5F00\u53D1\u65F6\u95F4\uFF0C\u800C\u4E14\u589E\u5F3A\u4E86\u7A0B\u5E8F\u7684\u53EF\u9760\u6027",paraId:20,tocIndex:7},{value:"\u3002",paraId:20,tocIndex:7},{value:"\u4F7F\u7528",paraId:21,tocIndex:7},{value:"\u4EE5 Maven \u5DE5\u7A0B\u4E3A\u4F8B\uFF0C\u9996\u5148\u8981\u5F15\u5165 Curator \u6846\u67B6\u76F8\u5173\u7684\u5F00\u53D1\u5305\uFF0C\u8FD9\u91CC\u4E3A\u4E86\u65B9\u4FBF\u6D4B\u8BD5\u5F15\u5165\u4E86 junit \uFF0Clombok\uFF0C\u7531\u4E8E Zookeeper \u672C\u8EAB\u4EE5\u6765\u4E86 log4j \u65E5\u5FD7\u6846\u67B6\uFF0C\u6240\u4EE5\u8FD9\u91CC\u53EF\u4EE5\u521B\u5EFA\u5BF9\u5E94\u7684 log4j \u914D\u7F6E\u6587\u4EF6\u540E\u76F4\u63A5\u4F7F\u7528\u3002",paraId:22,tocIndex:7},{value:"\u5982\u4E0B\u9762\u7684\u4EE3\u7801\u6240\u793A\uFF0C\u6211\u4EEC\u901A\u8FC7\u5C06 Curator \u76F8\u5173\u7684\u5F15\u7528\u5305\u914D\u7F6E\u5230 Maven \u5DE5\u7A0B\u7684 pom \u6587\u4EF6\u4E2D\uFF0C\u5C06 Curaotr \u6846\u67B6\u5F15\u7528\u5230\u5DE5\u7A0B\u9879\u76EE\u91CC\uFF0C\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u5206\u522B\u5F15\u7528\u4E86\u4E24\u4E2A Curator \u76F8\u5173\u7684\u5305\uFF0C\u7B2C\u4E00\u4E2A\u662F curator-framework \u5305\uFF0C\u8BE5\u5305\u662F\u5BF9 ZooKeeper \u5E95\u5C42 API \u7684\u4E00\u4E9B\u5C01\u88C5\u3002\u53E6\u4E00\u4E2A\u662F curator-recipes \u5305\uFF0C\u8BE5\u5305\u5C01\u88C5\u4E86\u4E00\u4E9B ZooKeeper \u670D\u52A1\u7684\u9AD8\u7EA7\u7279\u6027\uFF0C\u5982\uFF1ACache \u4E8B\u4EF6\u76D1\u542C\u3001\u9009\u4E3E\u3001\u5206\u5E03\u5F0F\u9501\u3001\u5206\u5E03\u5F0F Barrier\u3002",paraId:23,tocIndex:7},{value:`<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.8</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.8</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
`,paraId:24,tocIndex:7},{value:"\u4F1A\u8BDD\u521B\u5EFA",paraId:0},{value:"\u8981\u8FDB\u884C\u5BA2\u6237\u7AEF\u670D\u52A1\u5668\u4EA4\u4E92\uFF0C\u7B2C\u4E00\u6B65\u5C31\u8981\u521B\u5EFA\u4F1A\u8BDD",paraId:25,tocIndex:8},{value:"Curator \u63D0\u4F9B\u4E86\u591A\u79CD\u65B9\u5F0F\u521B\u5EFA\u4F1A\u8BDD\uFF0C\u6BD4\u5982\u7528\u9759\u6001\u5DE5\u5382\u65B9\u5F0F\u521B\u5EFA\uFF1A",paraId:26,tocIndex:8},{value:"RetryPolicy",paraId:27,tocIndex:8},{value:": ",paraId:27,tocIndex:8},{value:"RetryPolicy",paraId:27,tocIndex:8},{value:" \u5B9A\u4E49\u4E86\u5728\u8FDE\u63A5\u5230 ZooKeeper \u670D\u52A1\u5668\u65F6\u53D1\u751F\u9519\u8BEF\u65F6\u7684\u91CD\u8BD5\u7B56\u7565\u3002\u5728\u8FD9\u91CC\uFF0C\u4F7F\u7528\u4E86 ",paraId:27,tocIndex:8},{value:"ExponentialBackoffRetry",paraId:27,tocIndex:8},{value:"\uFF0C\u8FD9\u662F\u4E00\u79CD\u6307\u6570\u9000\u907F\u91CD\u8BD5\u7B56\u7565\u3002\u6784\u9020\u51FD\u6570\u7684\u53C2\u6570\u542B\u4E49\u5982\u4E0B\uFF1A",paraId:27,tocIndex:8},{value:"baseSleepTimeMs",paraId:28,tocIndex:8},{value:"\uFF1A\u521D\u59CB\u4F11\u7720\u65F6\u95F4\uFF08\u6BEB\u79D2\uFF09\uFF0C\u5373\u7B2C\u4E00\u6B21\u91CD\u8BD5\u5931\u8D25\u540E\u7B49\u5F85\u7684\u65F6\u95F4\u3002",paraId:28,tocIndex:8},{value:"maxRetries",paraId:29,tocIndex:8},{value:"\uFF1A\u6700\u5927\u91CD\u8BD5\u6B21\u6570\uFF0C\u5373\u6700\u591A\u5C1D\u8BD5\u8FDE\u63A5\u7684\u6B21\u6570\uFF08\u5305\u62EC\u7B2C\u4E00\u6B21\u5C1D\u8BD5\uFF09\u3002",paraId:29,tocIndex:8},{value:"maxSleepMs",paraId:30,tocIndex:8},{value:"\uFF1A\u6700\u5927\u4F11\u7720\u65F6\u95F4\uFF08\u6BEB\u79D2\uFF09\uFF0C\u5373\u6BCF\u6B21\u91CD\u8BD5\u7B49\u5F85\u7684\u6700\u957F\u65F6\u95F4\u3002\u5728\u8FD9\u91CC\u672A\u6307\u5B9A\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u503C",paraId:30,tocIndex:8},{value:"\u8FD9\u4E2A\u8BBE\u7F6E\u8868\u793A\uFF0C\u5982\u679C\u8FDE\u63A5\u5931\u8D25\uFF0CCurator \u5C06\u4F1A\u8FDB\u884C\u6700\u591A 3 \u6B21\u91CD\u8BD5\uFF0C\u6BCF\u6B21\u91CD\u8BD5\u7B49\u5F85\u65F6\u95F4\u4E3A\u521D\u59CB 1000 \u6BEB\u79D2\u7684\u6307\u6570\u589E\u957F",paraId:31,tocIndex:8},{value:"CuratorFramework",paraId:32,tocIndex:8},{value:": ",paraId:32,tocIndex:8},{value:"CuratorFramework",paraId:32,tocIndex:8},{value:" \u662F Apache Curator \u63D0\u4F9B\u7684\u4E00\u4E2A\u7528\u4E8E\u4E0E ZooKeeper \u4EA4\u4E92\u7684\u9AD8\u7EA7\u5BA2\u6237\u7AEF\u3002\u901A\u8FC7 ",paraId:32,tocIndex:8},{value:"CuratorFrameworkFactory.newClient()",paraId:32,tocIndex:8},{value:" \u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5BA2\u6237\u7AEF\u5B9E\u4F8B\u3002\u53C2\u6570\u5305\u62EC\uFF1A",paraId:32,tocIndex:8},{value:"zookeeperConnectionString",paraId:33,tocIndex:8},{value:"\uFF1AZooKeeper \u670D\u52A1\u5668\u7684\u8FDE\u63A5\u5B57\u7B26\u4E32\uFF0C\u7528\u4E8E\u6307\u5B9A\u8981\u8FDE\u63A5\u7684 ZooKeeper \u670D\u52A1\u5668\u7684\u5730\u5740\u548C\u7AEF\u53E3\u3002",paraId:33,tocIndex:8},{value:"retryPolicy",paraId:33,tocIndex:8},{value:"\uFF1A\u524D\u9762\u521B\u5EFA\u7684\u91CD\u8BD5\u7B56\u7565\u5BF9\u8C61\uFF0C\u7528\u4E8E\u5B9A\u4E49\u8FDE\u63A5\u5931\u8D25\u65F6\u7684\u91CD\u8BD5\u884C\u4E3A\u3002",paraId:33,tocIndex:8},{value:"start()",paraId:34,tocIndex:8},{value:": \u6700\u540E\uFF0C\u8C03\u7528 ",paraId:34,tocIndex:8},{value:"start()",paraId:34,tocIndex:8},{value:" \u65B9\u6CD5\u542F\u52A8 Curator \u5BA2\u6237\u7AEF\u3002\u4E00\u65E6\u5BA2\u6237\u7AEF\u542F\u52A8\uFF0C\u5B83\u5C06\u5C1D\u8BD5\u8FDE\u63A5\u5230\u6307\u5B9A\u7684 ZooKeeper \u670D\u52A1\u5668\uFF0C\u5E76\u5728\u9700\u8981\u65F6\u6267\u884C\u91CD\u8BD5\u7B56",paraId:34,tocIndex:8},{value:`// \u91CD\u8BD5\u7B56\u7565 
RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3)
//String zookeeperConnectionString = "localhost:2181";
CuratorFramework client = CuratorFrameworkFactory.newClient(zookeeperConnectionString, retryPolicy);
client.start();
`,paraId:35,tocIndex:8},{value:"\u6216\u8005\u4F7F\u7528 fluent",paraId:36,tocIndex:8},{value:"\u6D41\u5F0F",paraId:36,tocIndex:8},{value:" \u98CE\u683C\u521B\u5EFA",paraId:36,tocIndex:8},{value:`RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
CuratorFramework client = CuratorFrameworkFactory.builder()
                .connectString("192.168.128.129:2181")
                .sessionTimeoutMs(5000)  // \u4F1A\u8BDD\u8D85\u65F6\u65F6\u95F4
                .connectionTimeoutMs(5000) // \u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4
                .retryPolicy(retryPolicy)
                .namespace("base") // \u5305\u542B\u9694\u79BB\u540D\u79F0
                .build();
client.start();
`,paraId:37,tocIndex:8},{value:"\u8FD9\u6BB5\u4EE3\u7801\u7684\u7F16\u7801\u98CE\u683C\u91C7\u7528\u4E86\u6D41\u5F0F\u65B9\u5F0F\uFF0C\u6700\u6838\u5FC3\u7684\u7C7B\u662F ",paraId:38,tocIndex:8},{value:"CuratorFramework",paraId:38,tocIndex:8},{value:" \u7C7B",paraId:38,tocIndex:8},{value:"\u8BE5\u7C7B\u7684\u4F5C\u7528\u662F\u5B9A\u4E49\u4E00\u4E2A ZooKeeper \u5BA2\u6237\u7AEF\u5BF9\u8C61",paraId:39,tocIndex:8},{value:"\uFF0C\u5E76\u5728\u4E4B\u540E\u7684\u4E0A\u4E0B\u6587\u4E2D\u4F7F\u7528\u3002",paraId:39,tocIndex:8},{value:"\u5728\u5B9A\u4E49 CuratorFramework \u5BF9\u8C61\u5B9E\u4F8B\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u4F7F\u7528\u4E86 CuratorFrameworkFactory \u5DE5\u5382\u65B9\u6CD5\uFF0C\u5E76\u6307\u5B9A\u4E86 connectionString \u670D\u52A1\u5668\u5730\u5740\u5217\u8868\u3001retryPolicy \u91CD\u8BD5\u7B56\u7565 \u3001sessionTimeoutMs \u4F1A\u8BDD\u8D85\u65F6\u65F6\u95F4\u3001connectionTimeoutMs \u4F1A\u8BDD\u521B\u5EFA\u8D85\u65F6\u65F6\u95F4\u3002\u5206\u522B\u5BF9\u8FD9\u51E0\u4E2A\u53C2\u6570\u8FDB\u884C\u8BB2\u89E3\uFF1A",paraId:40,tocIndex:8},{value:"connectionString\uFF1A\u670D\u52A1\u5668\u5730\u5740\u5217\u8868\uFF0C\u5728\u6307\u5B9A\u670D\u52A1\u5668\u5730\u5740\u5217\u8868\u7684\u65F6\u5019\u53EF\u4EE5\u662F\u4E00\u4E2A\u5730\u5740\uFF0C\u4E5F\u53EF\u4EE5\u662F\u591A\u4E2A\u5730\u5740\u3002\u5982\u679C\u662F\u591A\u4E2A\u5730\u5740\uFF0C\u90A3\u4E48\u6BCF\u4E2A\u670D\u52A1\u5668\u5730\u5740\u5217\u8868\u7528\u9017\u53F7\u5206\u9694\uFF0C\u5982  host1:port1,host2:port2,host3\uFF1Bport3 \u3002",paraId:41,tocIndex:8},{value:"retryPolicy\uFF1A\u91CD\u8BD5\u7B56\u7565\uFF0C\u5F53\u5BA2\u6237\u7AEF\u5F02\u5E38\u9000\u51FA\u6216\u8005\u4E0E\u670D\u52A1\u7AEF\u5931\u53BB\u8FDE\u63A5\u7684\u65F6\u5019\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E\u5BA2\u6237\u7AEF\u91CD\u65B0\u8FDE\u63A5 ZooKeeper \u670D\u52A1\u7AEF\u3002",paraId:42,tocIndex:8},{value:"\u800C Curator \u63D0\u4F9B\u4E86 \u4E00\u6B21\u91CD\u8BD5\u3001\u591A\u6B21\u91CD\u8BD5\u7B49\u4E0D\u540C\u79CD\u7C7B\u7684\u5B9E\u73B0\u65B9\u5F0F\u3002",paraId:43,tocIndex:8},{value:"\u5728 Curator \u5185\u90E8\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5224\u65AD\u670D\u52A1\u5668\u8FD4\u56DE\u7684 keeperException \u7684\u72B6\u6001\u4EE3\u7801\u6765\u5224\u65AD\u662F\u5426\u8FDB\u884C\u91CD\u8BD5\u5904\u7406\uFF0C\u5982\u679C\u8FD4\u56DE\u7684\u662F OK \u8868\u793A\u4E00\u5207\u64CD\u4F5C\u90FD\u6CA1\u6709\u95EE\u9898\uFF0C\u800C SYSTEMERROR \u8868\u793A\u7CFB\u7EDF\u6216\u670D\u52A1\u7AEF\u9519\u8BEF\u3002",paraId:44,tocIndex:8},{value:"\u7B56\u7565\u540D\u79F0",paraId:45,tocIndex:8},{value:"\u63CF\u8FF0",paraId:45,tocIndex:8},{value:"ExponentialBackoffRetry",paraId:45,tocIndex:8},{value:"\u91CD\u8BD5\u4E00\u7EC4\u6B21\u6570\uFF0C\u91CD\u8BD5\u4E4B\u95F4\u7684\u7761\u7720\u65F6\u95F4\u589E\u52A0",paraId:45,tocIndex:8},{value:"RetryNTimes",paraId:45,tocIndex:8},{value:"\u91CD\u8BD5\u6700\u5927\u6B21\u6570",paraId:45,tocIndex:8},{value:"RetryOneTime",paraId:45,tocIndex:8},{value:"\u53EA\u91CD\u8BD5\u4E00\u6B21",paraId:45,tocIndex:8},{value:"RetryUntilElapsed",paraId:45,tocIndex:8},{value:"\u5728\u7ED9\u5B9A\u7684\u65F6\u95F4\u7ED3\u675F\u4E4B\u524D\u91CD\u8BD5",paraId:45,tocIndex:8},{value:"\u8D85\u65F6\u65F6\u95F4\uFF1ACurator \u5BA2\u6237\u7AEF\u521B\u5EFA\u8FC7\u7A0B\u4E2D\uFF0C\u6709\u4E24\u4E2A\u8D85\u65F6\u65F6\u95F4\u7684\u8BBE\u7F6E\u3002",paraId:46,tocIndex:8},{value:"\u4E00\u4E2A\u662F sessionTimeoutMs \u4F1A\u8BDD\u8D85\u65F6\u65F6\u95F4\uFF0C\u7528\u6765\u8BBE\u7F6E\u8BE5\u6761\u4F1A\u8BDD\u5728 ZooKeeper \u670D\u52A1\u7AEF\u7684\u5931\u6548\u65F6\u95F4\u3002",paraId:47,tocIndex:8},{value:"\u53E6\u4E00\u4E2A\u662F connectionTimeoutMs \u5BA2\u6237\u7AEF\u521B\u5EFA\u4F1A\u8BDD\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u7528\u6765\u9650\u5236\u5BA2\u6237\u7AEF\u53D1\u8D77\u4E00\u4E2A\u4F1A\u8BDD\u8FDE\u63A5\u5230\u63A5\u6536 ZooKeeper \u670D\u52A1\u7AEF\u5E94\u7B54\u7684\u65F6\u95F4\u3002",paraId:47,tocIndex:8},{value:"sessionTimeoutMs \u4F5C\u7528\u5728\u670D\u52A1\u7AEF\uFF0C\u800C connectionTimeoutMs \u4F5C\u7528\u5728\u5BA2\u6237\u7AEF\u3002",paraId:48,tocIndex:8},{value:"\u521B\u5EFA\u8282\u70B9",paraId:0},{value:"\u521B\u5EFA\u8282\u70B9\u7684\u65B9\u5F0F\u5982\u4E0B\u9762\u7684\u4EE3\u7801\u6240\u793A\uFF0C\u56DE\u987E\u6211\u4EEC\u4E4B\u524D\u8BFE\u7A0B\u4E2D\u8BB2\u5230\u7684\u5185\u5BB9\uFF0C\u63CF\u8FF0\u4E00\u4E2A\u8282\u70B9\u8981\u5305\u62EC\u8282\u70B9\u7684\u7C7B\u578B\uFF0C\u5373\u4E34\u65F6\u8282\u70B9\u8FD8\u662F\u6301\u4E45\u8282\u70B9\u3001\u8282\u70B9\u7684\u6570\u636E\u4FE1\u606F\u3001\u8282\u70B9\u662F\u5426\u662F\u6709\u5E8F\u8282\u70B9\u7B49\u5C5E\u6027\u548C\u6027\u8D28\u3002",paraId:49,tocIndex:9},{value:"EPHEMERAL\uFF08\u4E34\u65F6\u8282\u70B9\uFF09",paraId:50,tocIndex:9},{value:"\uFF1A\u521B\u5EFA\u4E00\u4E2A\u4E34\u65F6\u8282\u70B9\u3002\u5F53\u5BA2\u6237\u7AEF\u4F1A\u8BDD\u7ED3\u675F\u6216\u5BA2\u6237\u7AEF\u4E0E ZooKeeper \u670D\u52A1\u5668\u65AD\u5F00\u8FDE\u63A5\u65F6\uFF0C\u8FD9\u4E2A\u8282\u70B9\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\u3002",paraId:50,tocIndex:9},{value:"EPHEMERAL_SEQUENTIAL\uFF08\u4E34\u65F6\u987A\u5E8F\u8282\u70B9\uFF09",paraId:50,tocIndex:9},{value:"\uFF1A\u4E0E\u4E34\u65F6\u8282\u70B9\u7C7B\u4F3C\uFF0C\u4F46\u8282\u70B9\u7684\u540D\u79F0\u4F1A\u9644\u52A0\u4E00\u4E2A\u5355\u8C03\u9012\u589E\u7684\u6570\u5B57\u540E\u7F00\uFF0C\u4EE5\u4FDD\u8BC1\u8282\u70B9\u540D\u79F0\u7684\u552F\u4E00\u6027\u3002",paraId:50,tocIndex:9},{value:"PERSISTENT_SEQUENTIAL\uFF08\u6301\u4E45\u987A\u5E8F\u8282\u70B9\uFF09",paraId:50,tocIndex:9},{value:"\uFF1A\u4E0E\u6301\u4E45\u8282\u70B9\u7C7B\u4F3C\uFF0C\u4F46\u8282\u70B9\u7684\u540D\u79F0\u4F1A\u9644\u52A0\u4E00\u4E2A\u5355\u8C03\u9012\u589E\u7684\u6570\u5B57\u540E\u7F00\uFF0C\u4EE5\u4FDD\u8BC1\u8282\u70B9\u540D\u79F0\u7684\u552F\u4E00\u6027\u3002",paraId:50,tocIndex:9},{value:"\u8FD9\u4E9B\u6A21\u5F0F\u53EF\u4EE5\u901A\u8FC7 ",paraId:51,tocIndex:9},{value:"CreateMode",paraId:51,tocIndex:9},{value:" \u679A\u4E3E\u6765\u6307\u5B9A\uFF0C\u4F8B\u5982\uFF1A",paraId:51,tocIndex:9},{value:"CreateMode.EPHEMERAL",paraId:52,tocIndex:9},{value:"CreateMode.EPHEMERAL_SEQUENTIAL",paraId:52,tocIndex:9},{value:"CreateMode.PERSISTENT_SEQUENTIAL",paraId:52,tocIndex:9},{value:` @Test
public void testCreate() throws Exception {
    String path = curatorFramework.create().forPath("/curator-node");
    curatorFramework.create().withMode(CreateMode.PERSISTENT).forPath("/curator-node","some-data".getBytes())
    log.info("curator create node :{}  successfully.",path);
}
`,paraId:53,tocIndex:9},{value:"\u5728 Curator \u4E2D\uFF0C\u53EF\u4EE5\u4F7F\u7528 create \u51FD\u6570\u521B\u5EFA\u6570\u636E\u8282\u70B9\uFF0C",paraId:54,tocIndex:9},{value:"\u5E76\u901A\u8FC7 withMode \u51FD\u6570\u6307\u5B9A\u8282\u70B9\u7C7B\u578B",paraId:54,tocIndex:9},{value:"\uFF08\u6301\u4E45\u5316\u8282\u70B9\uFF0C\u4E34\u65F6\u8282\u70B9\uFF0C\u987A\u5E8F\u8282\u70B9\uFF0C\u4E34\u65F6\u987A\u5E8F\u8282\u70B9\uFF0C\u6301\u4E45\u5316\u987A\u5E8F\u8282\u70B9\u7B49\uFF09\uFF0C\u9ED8\u8BA4\u662F\u6301\u4E45\u5316\u8282\u70B9\uFF0C",paraId:54,tocIndex:9},{value:"\u4E4B\u540E\u8C03\u7528 forPath \u51FD\u6570\u6765\u6307\u5B9A\u8282\u70B9\u7684\u8DEF\u5F84\u548C\u6570\u636E\u4FE1\u606F",paraId:54,tocIndex:9},{value:"\u3002",paraId:54,tocIndex:9},{value:"\u4E00\u6B21\u6027\u521B\u5EFA\u5E26\u5C42\u7EA7\u7ED3\u6784\u7684\u8282\u70B9",paraId:55,tocIndex:9},{value:"creatingParentsIfNeeded()",paraId:56,tocIndex:9},{value:":  \u5982\u679C\u6307\u5B9A\u8DEF\u5F84\u4E2D\u7684\u7236\u8282\u70B9\u4E0D\u5B58\u5728\uFF0C\u4F1A\u81EA\u52A8\u521B\u5EFA\u7236\u8282\u70B9",paraId:56,tocIndex:9},{value:`@Test
public void testCreateWithParent() throws Exception {
    String pathWithParent="/node-parent/sub-node-1";
    String path = curatorFramework.create().creatingParentsIfNeeded().forPath(pathWithParent);
    log.info("curator create node :{}  successfully.",path);
}
`,paraId:57,tocIndex:9},{value:"\u83B7\u53D6\u6570\u636E",paraId:0},{value:"getData().forPath()",paraId:58,tocIndex:10},{value:`@Test
public void testGetData() throws Exception {
    byte[] bytes = curatorFramework.getData().forPath("/curator-node");
    log.info("get data from  node :{}  successfully.",new String(bytes));
}
`,paraId:59,tocIndex:10},{value:"\u66F4\u65B0\u8282\u70B9",paraId:0},{value:"\u6211\u4EEC\u901A\u8FC7\u5BA2\u6237\u7AEF\u5B9E\u4F8B\u7684 ",paraId:60,tocIndex:11},{value:"setData ()",paraId:60,tocIndex:11},{value:" \u65B9\u6CD5\u66F4\u65B0 ZooKeeper \u670D\u52A1\u4E0A\u7684\u6570\u636E\u8282\u70B9\uFF0C\u5728 setData \u65B9\u6CD5\u7684\u540E\u8FB9\uFF0C",paraId:60,tocIndex:11},{value:"\u901A\u8FC7 forPath \u51FD\u6570\u6765\u6307\u5B9A\u66F4\u65B0\u7684\u6570\u636E\u8282\u70B9\u8DEF\u5F84\u4EE5\u53CA\u8981\u66F4\u65B0\u7684\u6570\u636E",paraId:60,tocIndex:11},{value:"\u3002",paraId:60,tocIndex:11},{value:"setData ().forPath(\u8282\u70B9\u8DEF\u5F84\uFF0C\u6570\u636E)",paraId:61,tocIndex:11},{value:`@Test
public void testSetData() throws Exception {
    curatorFramework.setData().forPath("/curator-node","changed!".getBytes());
    byte[] bytes = curatorFramework.getData().forPath("/curator-node");
    log.info("get data from  node /curator-node :{}  successfully.",new String(bytes));
}
`,paraId:62,tocIndex:11},{value:"\u5220\u9664\u8282\u70B9",paraId:0},{value:`@Test
public void testDelete() throws Exception {
    String pathWithParent="/node-parent";
    curatorFramework.delete().guaranteed().deletingChildrenIfNeeded().forPath(pathWithParent);
}
`,paraId:63,tocIndex:12},{value:"guaranteed\uFF1A\u8BE5\u51FD\u6570\u7684\u529F\u80FD\u5982\u5B57\u9762\u610F\u601D\u4E00\u6837\uFF0C\u4E3B\u8981\u8D77\u5230\u4E00\u4E2A\u4FDD\u969C\u5220\u9664\u6210\u529F\u7684\u4F5C\u7528",paraId:64,tocIndex:12},{value:"\uFF0C\u5176\u5E95\u5C42\u5DE5\u4F5C\u65B9\u5F0F\u662F\uFF1A\u53EA\u8981\u8BE5\u5BA2\u6237\u7AEF\u7684\u4F1A\u8BDD\u6709\u6548\uFF0C\u5C31\u4F1A\u5728\u540E\u53F0\u6301\u7EED\u53D1\u8D77\u5220\u9664\u8BF7\u6C42\uFF0C\u76F4\u5230\u8BE5\u6570\u636E\u8282\u70B9\u5728 ZooKeeper \u670D\u52A1\u7AEF\u88AB\u5220\u9664\u3002",paraId:64,tocIndex:12},{value:"deletingChildrenIfNeeded\uFF1A\u6307\u5B9A\u4E86\u8BE5\u51FD\u6570\u540E\uFF0C\u7CFB\u7EDF\u5728\u5220\u9664\u8BE5\u6570\u636E\u8282\u70B9\u7684\u65F6\u5019",paraId:65,tocIndex:12},{value:"\u4F1A\u4EE5\u9012\u5F52\u7684\u65B9\u5F0F\u76F4\u63A5\u5220\u9664\u5176\u5B50\u8282\u70B9",paraId:65,tocIndex:12},{value:"\uFF0C\u4EE5\u53CA\u5B50\u8282\u70B9\u7684\u5B50\u8282\u70B9\u3002",paraId:65,tocIndex:12},{value:"\u5F02\u6B65\u63A5\u53E3",paraId:0},{value:"Curator \u5F15\u5165\u4E86 ",paraId:66,tocIndex:13},{value:"BackgroundCallback",paraId:66,tocIndex:13},{value:" \u63A5\u53E3\uFF0C\u7528\u6765\u5904\u7406\u670D\u52A1\u5668\u7AEF\u8FD4\u56DE\u6765\u7684\u4FE1\u606F",paraId:66,tocIndex:13},{value:"\u8FD9\u4E2A\u5904\u7406\u8FC7\u7A0B\u662F\u5728\u5F02\u6B65\u7EBF\u7A0B\u4E2D\u8C03\u7528\uFF0C\u9ED8\u8BA4\u5728 EventThread \u4E2D\u8C03\u7528\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5B9A\u4E49\u7EBF\u7A0B\u6C60",paraId:67,tocIndex:13},{value:"\u3002",paraId:67,tocIndex:13},{value:`public interface BackgroundCallback
{
    /**
     * Called when the async background operation completes
     *
     * @param client the client
     * @param event operation result details
     * @throws Exception errors
     */
    public void processResult(CuratorFramework client, CuratorEvent event) throws Exception;
}
`,paraId:68,tocIndex:13},{value:"\u5982\u4E0A\u63A5\u53E3\uFF0C\u4E3B\u8981\u53C2\u6570\u4E3A client \u5BA2\u6237\u7AEF\uFF0C \u548C \u670D\u52A1\u7AEF\u4E8B\u4EF6 event",paraId:69,tocIndex:13},{value:"inBackground \u5F02\u6B65\u5904\u7406\u9ED8\u8BA4\u5728 EventThread \u4E2D\u6267\u884C",paraId:70,tocIndex:13},{value:"Lambda \u8868\u8FBE\u5F0F ",paraId:71,tocIndex:13},{value:'(item1, item2) -> { log.info(" background: {}", item2); }',paraId:71,tocIndex:13},{value:" \u63A5\u6536\u4E24\u4E2A\u53C2\u6570\uFF0C\u5206\u522B\u662F ",paraId:71,tocIndex:13},{value:"CuratorFramework",paraId:71,tocIndex:13},{value:" \u548C ",paraId:71,tocIndex:13},{value:"CuratorEvent",paraId:71,tocIndex:13},{value:" \u5BF9\u8C61\u3002\u5728\u8FD9\u91CC\uFF0C\u6211\u4EEC\u53EA\u5173\u5FC3\u83B7\u53D6\u5230\u7684\u8282\u70B9\u6570\u636E\uFF0C\u56E0\u6B64\u53EA\u6253\u5370\u4E86 ",paraId:71,tocIndex:13},{value:"item2",paraId:71,tocIndex:13},{value:"\uFF0C\u5373 ",paraId:71,tocIndex:13},{value:"CuratorEvent",paraId:71,tocIndex:13},{value:" \u5BF9\u8C61\u4E2D\u7684\u8282\u70B9\u6570\u636E",paraId:71,tocIndex:13},{value:`@Test
public void test() throws Exception {
    curatorFramework.getData().inBackground((item1, item2) -> {
        log.info(" background: {}", item2);
    }).forPath(ZK_NODE);
    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
`,paraId:72,tocIndex:13},{value:"\u6307\u5B9A\u7EBF\u7A0B\u6C60",paraId:73,tocIndex:13},{value:`@Test
public void test() throws Exception {
    ExecutorService executorService = Executors.newSingleThreadExecutor();
    
    curatorFramework.getData().inBackground((item1, item2) -> {
        log.info(" background: {}", item2);
    },executorService).forPath(ZK_NODE);
 
    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
`,paraId:74,tocIndex:13},{value:"Curator \u76D1\u542C\u5668\uFF1A",paraId:0},{value:"CuratorListener \u63A5\u53E3",paraId:75,tocIndex:14},{value:"\uFF1A\u8FD9\u662F\u4E00\u4E2A\u76D1\u542C\u5668\u63A5\u53E3\uFF0C\u7528\u4E8E\u5904\u7406 Curator \u4E8B\u4EF6\u3002",paraId:75,tocIndex:14},{value:"eventReceived \u65B9\u6CD5",paraId:75,tocIndex:14},{value:`\uFF1A\u8FD9\u662F\u63A5\u53E3\u4E2D\u552F\u4E00\u7684\u65B9\u6CD5\u3002\u5B83\u63A5\u6536\u4E24\u4E2A\u53C2\u6570\uFF1A
`,paraId:75,tocIndex:14},{value:"client",paraId:76,tocIndex:14},{value:"\uFF1A\u7C7B\u578B\u4E3A ",paraId:76,tocIndex:14},{value:"CuratorFramework",paraId:76,tocIndex:14},{value:"\uFF0C\u8868\u793A\u89E6\u53D1\u4E8B\u4EF6\u7684 Curator \u5BA2\u6237\u7AEF\u3002",paraId:76,tocIndex:14},{value:"event",paraId:76,tocIndex:14},{value:"\uFF1A\u7C7B\u578B\u4E3A ",paraId:76,tocIndex:14},{value:"CuratorEvent",paraId:76,tocIndex:14},{value:"\uFF0C\u8868\u793A\u89E6\u53D1\u7684\u4E8B\u4EF6\u5BF9\u8C61",paraId:76,tocIndex:14},{value:`public interface CuratorListener
{
    public void  eventReceived(CuratorFramework client, CuratorEvent event) throws Exception;
}
`,paraId:77,tocIndex:14},{value:"\u9488\u5BF9 background \u901A\u77E5\u548C\u9519\u8BEF\u901A\u77E5\u3002\u4F7F\u7528\u6B64\u76D1\u542C\u5668\u4E4B\u540E\uFF0C\u8C03\u7528 inBackground \u65B9\u6CD5\u4F1A\u5F02\u6B65\u83B7\u5F97\u76D1\u542C",paraId:78,tocIndex:14},{value:"\u4F60\u53EF\u4EE5\u5B9E\u73B0 ",paraId:79,tocIndex:14},{value:"CuratorListener",paraId:79,tocIndex:14},{value:" \u63A5\u53E3\u6765\u76D1\u89C6\u8282\u70B9\u7684\u521B\u5EFA\u3001\u5220\u9664\u3001\u66F4\u65B0\u7B49\u4E8B\u4EF6\uFF0C\u5E76\u5728\u6BCF\u4E2A\u4E8B\u4EF6\u53D1\u751F\u65F6\u6267\u884C\u76F8\u5E94\u7684\u64CD\u4F5C\u3002",paraId:79,tocIndex:14},{value:"\u4E00\u4E2A\u7B80\u5355\u7684\u4F8B\u5B50\uFF0C\u6F14\u793A\u4E86\u5982\u4F55\u4F7F\u7528 ",paraId:80,tocIndex:14},{value:"CuratorListener",paraId:80,tocIndex:14},{value:" \u76D1\u542C\u8282\u70B9\u7684\u521B\u5EFA\u4E8B\u4EF6\uFF0C\u5E76\u5728\u8282\u70B9\u521B\u5EFA\u65F6\u8F93\u51FA\u65E5\u5FD7\u4FE1\u606F\uFF1A",paraId:80,tocIndex:14},{value:`javaCopy codeimport org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorEvent;
import org.apache.curator.framework.api.CuratorListener;

public class MyCuratorListener implements CuratorListener {
    @Override
    public void eventReceived(CuratorFramework client, CuratorEvent event) throws Exception {
        // \u5224\u65AD\u4E8B\u4EF6\u7C7B\u578B\u662F\u5426\u4E3A\u8282\u70B9\u521B\u5EFA\u4E8B\u4EF6
        if (event.getType() == CuratorEventType.CREATE) {
            // \u8F93\u51FA\u65E5\u5FD7\u4FE1\u606F
            System.out.println("Node created: " + event.getPath());
        }
    }
}
`,paraId:81,tocIndex:14},{value:"\u5728\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0C\u6211\u4EEC\u5B9E\u73B0\u4E86 ",paraId:82,tocIndex:14},{value:"CuratorListener",paraId:82,tocIndex:14},{value:" \u63A5\u53E3\uFF0C\u5E76\u91CD\u5199\u4E86\u5176\u4E2D\u7684 ",paraId:82,tocIndex:14},{value:"eventReceived",paraId:82,tocIndex:14},{value:" \u65B9\u6CD5\u3002\u5728\u8BE5\u65B9\u6CD5\u4E2D\uFF0C\u6211\u4EEC\u9996\u5148\u5224\u65AD\u4E86\u4E8B\u4EF6\u7684\u7C7B\u578B\u662F\u5426\u4E3A\u8282\u70B9\u521B\u5EFA\u4E8B\u4EF6\uFF08",paraId:82,tocIndex:14},{value:"CuratorEventType.CREATE",paraId:82,tocIndex:14},{value:"\uFF09\uFF0C\u5982\u679C\u662F\u7684\u8BDD\uFF0C\u5C31\u8F93\u51FA\u4E86\u76F8\u5E94\u7684\u65E5\u5FD7\u4FE1\u606F\uFF0C\u5305\u62EC\u521B\u5EFA\u7684\u8282\u70B9\u8DEF\u5F84\u3002",paraId:82,tocIndex:14},{value:"\u8981\u4F7F\u7528\u8FD9\u4E2A\u76D1\u542C\u5668\uFF0C\u4F60\u9700\u8981\u5C06\u5B83\u6CE8\u518C\u5230 Curator \u5BA2\u6237\u7AEF\u4E2D\uFF0C\u793A\u4F8B\u5982\u4E0B\uFF1A",paraId:83,tocIndex:14},{value:`javaCopy codeCuratorFramework client = CuratorFrameworkFactory.newClient(zookeeperConnectionString, retryPolicy);
client.getCuratorListenable().addListener(new MyCuratorListener());
client.start();
`,paraId:84,tocIndex:14},{value:"\u901A\u8FC7\u8C03\u7528 ",paraId:85,tocIndex:14},{value:"getCuratorListenable()",paraId:85,tocIndex:14},{value:" \u65B9\u6CD5\u83B7\u53D6 Curator \u5BA2\u6237\u7AEF\u7684\u53EF\u76D1\u542C\u5BF9\u8C61\uFF0C\u7136\u540E\u4F7F\u7528 ",paraId:85,tocIndex:14},{value:"addListener()",paraId:85,tocIndex:14},{value:" \u65B9\u6CD5\u6CE8\u518C\u4F60\u7684\u76D1\u542C\u5668\u3002\u8FD9\u6837\uFF0C\u5F53 Curator \u5BA2\u6237\u7AEF\u53D1\u51FA\u8282\u70B9\u521B\u5EFA\u4E8B\u4EF6\u65F6\uFF0C\u76D1\u542C\u5668\u7684 ",paraId:85,tocIndex:14},{value:"eventReceived()",paraId:85,tocIndex:14},{value:" \u65B9\u6CD5\u5C06\u88AB\u8C03\u7528\uFF0C\u5E76\u6267\u884C\u76F8\u5E94\u7684\u903B\u8F91\u3002",paraId:85,tocIndex:14},{value:"Curator",paraId:0},{value:"Caches:",paraId:0},{value:"Curator \u5F15\u5165\u4E86 Cache \u6765\u5B9E\u73B0\u5BF9 Zookeeper \u670D\u52A1\u7AEF\u4E8B\u4EF6\u76D1\u542C",paraId:86,tocIndex:15},{value:"Cache \u4E8B\u4EF6\u76D1\u542C\u53EF\u4EE5\u7406\u89E3\u4E3A\u4E00\u4E2A\u672C\u5730\u7F13\u5B58\u89C6\u56FE\u4E0E\u8FDC\u7A0B Zookeeper \u89C6\u56FE\u7684\u5BF9\u6BD4\u8FC7\u7A0B\u3002Cache \u63D0\u4F9B\u4E86\u53CD\u590D\u6CE8\u518C\u7684\u529F\u80FD\u3002",paraId:87,tocIndex:15},{value:"Cache \u5206\u4E3A\u4E24\u7C7B\u6CE8\u518C\u7C7B\u578B\uFF1A\u8282\u70B9\u76D1\u542C\u548C\u5B50\u8282\u70B9\u76D1\u542C\u3002",paraId:88,tocIndex:15},{value:"node cache:",paraId:89,tocIndex:15},{value:"NodeCache \u5BF9\u67D0\u4E00\u4E2A\u8282\u70B9\u8FDB\u884C\u76D1\u542C",paraId:90,tocIndex:15},{value:`public NodeCache(CuratorFramework client,String path)
Parameters:
client - the client
path - path to cache
`,paraId:91,tocIndex:15},{value:"\u53EF\u4EE5\u901A\u8FC7\u6CE8\u518C\u76D1\u542C\u5668\u6765\u5B9E\u73B0\uFF0C\u5BF9\u5F53\u524D\u8282\u70B9\u6570\u636E\u53D8\u5316\u7684\u5904\u7406",paraId:92,tocIndex:15},{value:`public void addListener(NodeCacheListener listener){
	Add a change listener
}
     
Parameters:
listener - the listener
`,paraId:93,tocIndex:15},{value:"\u4F7F\u7528",paraId:94,tocIndex:15},{value:"NodeCache nodeCache = new NodeCache(curatorFramework, NODE_CACHE);",paraId:95,tocIndex:15},{value:"\u521B\u5EFA\u4E86\u4E00\u4E2A ",paraId:95,tocIndex:15},{value:"NodeCache",paraId:95,tocIndex:15},{value:" \u5BF9\u8C61\u6765\u76D1\u89C6\u6307\u5B9A\u8282\u70B9\u7684\u53D8\u5316",paraId:95,tocIndex:15},{value:"NodeCache",paraId:96,tocIndex:15},{value:" \u7684\u6784\u9020\u51FD\u6570\u9700\u8981\u4E24\u4E2A\u53C2\u6570\uFF1A",paraId:96,tocIndex:15},{value:"CuratorFramework",paraId:96,tocIndex:15},{value:" \u5BF9\u8C61\u548C\u8981\u76D1\u89C6\u7684\u8282\u70B9\u8DEF\u5F84\u3002\u5728\u8FD9\u91CC\u4F20\u5165\u4E86\u6211\u4EEC\u4E4B\u524D\u521B\u5EFA\u7684 ",paraId:96,tocIndex:15},{value:"curatorFramework",paraId:96,tocIndex:15},{value:" \u5BF9\u8C61\u548C\u6307\u5B9A\u7684\u8282\u70B9\u8DEF\u5F84 ",paraId:96,tocIndex:15},{value:"NODE_CACHE",paraId:96,tocIndex:15},{value:"\u3002",paraId:96,tocIndex:15},{value:"\u901A\u8FC7 ",paraId:97,tocIndex:15},{value:"nodeCache.getListenable().addListener()",paraId:97,tocIndex:15},{value:" \u65B9\u6CD5\u6DFB\u52A0\u4E86\u4E00\u4E2A ",paraId:97,tocIndex:15},{value:"NodeCacheListener",paraId:97,tocIndex:15},{value:" \u5BF9\u8C61\uFF0C\u7528\u4E8E\u76D1\u542C\u8282\u70B9\u7684\u53D8\u5316\u3002\u5728 ",paraId:97,tocIndex:15},{value:"NodeCacheListener",paraId:97,tocIndex:15},{value:" \u7684 ",paraId:97,tocIndex:15},{value:"nodeChanged()",paraId:97,tocIndex:15},{value:" \u65B9\u6CD5\u4E2D\uFF0C\u6211\u4EEC\u5B9A\u4E49\u4E86\u8282\u70B9\u53D8\u5316\u65F6\u6267\u884C\u7684\u64CD\u4F5C",paraId:97,tocIndex:15},{value:"\u5728\u8FD9\u4E2A\u76D1\u542C\u5668\u4E2D\uFF0C\u5F53\u8282\u70B9\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u9996\u5148\u4F1A\u6253\u5370\u8282\u70B9\u8DEF\u5F84\uFF0C\u7136\u540E\u8C03\u7528 ",paraId:98,tocIndex:15},{value:"printNodeData()",paraId:98,tocIndex:15},{value:" \u65B9\u6CD5\u6253\u5370\u8282\u70B9\u7684\u6570\u636E\u3002",paraId:98,tocIndex:15},{value:"\u901A\u8FC7 ",paraId:99,tocIndex:15},{value:"nodeCache.start()",paraId:99,tocIndex:15},{value:" \u65B9\u6CD5\u542F\u52A8\u4E86 ",paraId:99,tocIndex:15},{value:"NodeCache",paraId:99,tocIndex:15},{value:"\uFF0C\u4F7F\u5176\u5F00\u59CB\u76D1\u89C6\u6307\u5B9A\u7684\u8282\u70B9",paraId:99,tocIndex:15},{value:"\u8FD9\u6837\uFF0C\u5F53\u8282\u70B9\u53D1\u751F\u53D8\u5316\u65F6\uFF0C",paraId:100,tocIndex:15},{value:"NodeCacheListener",paraId:100,tocIndex:15},{value:" \u4E2D\u7684 ",paraId:100,tocIndex:15},{value:"nodeChanged()",paraId:100,tocIndex:15},{value:" \u65B9\u6CD5\u5C06\u88AB\u8C03\u7528\uFF0C\u4ECE\u800C\u6267\u884C\u76F8\u5E94\u7684\u64CD\u4F5C\u3002",paraId:100,tocIndex:15},{value:`@Slf4j
public class NodeCacheTest extends AbstractCuratorTest{
    public static final String NODE_CACHE="/node-cache";
    @Test
    public void testNodeCacheTest() throws Exception {
        //\u9996\u5148\u901A\u8FC7 createIfNeed(NODE_CACHE) \u65B9\u6CD5\u521B\u5EFA\u4E86\u6307\u5B9A\u7684\u8282\u70B9
        createIfNeed(NODE_CACHE);
        NodeCache nodeCache = new NodeCache(curatorFramework, NODE_CACHE);
        nodeCache.getListenable().addListener(new NodeCacheListener() {
            @Override
            public void nodeChanged() throws Exception {
                log.info("{} path nodeChanged: ",NODE_CACHE);
                printNodeData();
            }
        });
        nodeCache.start();
    }
 
    public void printNodeData() throws Exception {
        byte[] bytes = curatorFramework.getData().forPath(NODE_CACHE);
        log.info("data: {}",new String(bytes));
    }
}
`,paraId:101,tocIndex:15},{value:"path cache:",paraId:102,tocIndex:15},{value:"PathChildrenCache \u4F1A\u5BF9\u5B50\u8282\u70B9\u8FDB\u884C\u76D1\u542C\uFF0C\u4F46\u662F\u4E0D\u4F1A\u5BF9\u4E8C\u7EA7\u5B50\u8282\u70B9\u8FDB\u884C\u76D1\u542C\uFF0C",paraId:103,tocIndex:15},{value:`public PathChildrenCache(CuratorFramework client,String path,boolean cacheData)
Parameters:
client - the client
path - path to watch
cacheData - if true, node contents are cached in addition to the stat
`,paraId:104,tocIndex:15},{value:"\u53EF\u4EE5\u901A\u8FC7\u6CE8\u518C\u76D1\u542C\u5668\u6765\u5B9E\u73B0\uFF0C\u5BF9\u5F53\u524D\u8282\u70B9\u7684\u5B50\u8282\u70B9\u6570\u636E\u53D8\u5316\u7684\u5904\u7406",paraId:105,tocIndex:15},{value:`public void addListener(PathChildrenCacheListener listener)
     Add a change listener
Parameters:
listener - the listener
`,paraId:106,tocIndex:15},{value:`@Slf4j
public class PathCacheTest extends AbstractCuratorTest{
 
    public static final String PATH="/path-cache";
 
    @Test
    public void testPathCache() throws Exception {
 
        createIfNeed(PATH);
        PathChildrenCache pathChildrenCache = new PathChildrenCache(curatorFramework, PATH, true);
        pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
            @Override
            public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) throws Exception {
                log.info("event:  {}",event);
            }
        });
 
        // \u5982\u679C\u8BBE\u7F6E\u4E3Atrue\u5219\u5728\u9996\u6B21\u542F\u52A8\u65F6\u5C31\u4F1A\u7F13\u5B58\u8282\u70B9\u5185\u5BB9\u5230Cache\u4E2D
        pathChildrenCache.start(true);
    }
}
`,paraId:107,tocIndex:15},{value:"tree cache:",paraId:108,tocIndex:15},{value:"TreeCache \u4F7F\u7528\u4E00\u4E2A\u5185\u90E8\u7C7B TreeNode \u6765\u7EF4\u62A4\u8FD9\u4E2A\u4E00\u4E2A\u6811\u7ED3\u6784\u3002\u5E76\u5C06\u8FD9\u4E2A\u6811\u7ED3\u6784\u4E0E ZK \u8282\u70B9\u8FDB\u884C\u4E86\u6620\u5C04\u3002\u6240\u4EE5 TreeCache \u53EF\u4EE5\u76D1\u542C\u5F53\u524D\u8282\u70B9\u4E0B\u6240\u6709\u8282\u70B9\u7684\u4E8B\u4EF6\u3002",paraId:109,tocIndex:15},{value:`public TreeCache(CuratorFramework client,
                         String path,
                         boolean cacheData)
Parameters:
client - the client
path - path to watch
cacheData - if true, node contents are cached in addition to the stat
`,paraId:110,tocIndex:15},{value:"\u53EF\u4EE5\u901A\u8FC7\u6CE8\u518C\u76D1\u542C\u5668\u6765\u5B9E\u73B0\uFF0C\u5BF9\u5F53\u524D\u8282\u70B9\u7684\u5B50\u8282\u70B9\uFF0C\u53CA\u9012\u5F52\u5B50\u8282\u70B9\u6570\u636E\u53D8\u5316\u7684\u5904\u7406",paraId:111,tocIndex:15},{value:`public void addListener(TreeCacheListener listener)
     Add a change listener
Parameters:
listener - the listener
`,paraId:112,tocIndex:15},{value:`@Slf4j
public class TreeCacheTest extends AbstractCuratorTest{
 
    public static final String TREE_CACHE="/tree-path";
 
    @Test
    public void testTreeCache() throws Exception {
        createIfNeed(TREE_CACHE);
        TreeCache treeCache = new TreeCache(curatorFramework, TREE_CACHE);
        treeCache.getListenable().addListener(new TreeCacheListener() {
            @Override
            public void childEvent(CuratorFramework client, TreeCacheEvent event) throws Exception {
                log.info(" tree cache: {}",event);
            }
        });
        treeCache.start();
    }
}
`,paraId:113,tocIndex:15}]}}]);

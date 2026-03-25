"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[1938],{91938:function(t,e,n){n.r(e),n.d(e,{texts:function(){return a}});const a=[{value:"\u9996\u5148\u521B\u5EFA\u4E00\u4E2A\u57FA\u4E8E Maven \u7684 SpringBoot \u5DE5\u7A0B\uFF0C\u5F15\u5165\u5982\u4E0B\u4F9D\u8D56\uFF1A",paraId:0,tocIndex:2},{value:`<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>4.7.1</version>
</dependency>
`,paraId:1,tocIndex:2},{value:"\u53E6\u5916\u8FD8\u4E0E\u4E00\u4E9B\u4F9D\u8D56\uFF0C\u4F8B\u5982 openmessage\u3001acl \u7B49\u6269\u5C55\u529F\u80FD\u8FD8\u9700\u8981\u6DFB\u52A0\u5BF9\u5E94\u7684\u4F9D\u8D56\u3002\u5177\u4F53\u53EF\u4EE5\u53C2\u89C1 RocketMQ \u6E90\u7801\u4E2D\u7684 example \u6A21\u5757\u3002\u5728 RocketMQ \u6E90\u7801\u5305\u4E2D\u7684 example \u6A21\u5757\u63D0\u4F9B\u4E86\u975E\u5E38\u8BE6\u5C3D\u7684\u6D4B\u8BD5\u4EE3\u7801\uFF0C\u4E5F\u53EF\u4EE5\u62FF\u6765\u76F4\u63A5\u8C03\u8BD5\u3002\u8FD9\u91CC\u5C31\u7528\u6E90\u7801\u5305\u4E2D\u7684\u793A\u4F8B\u6765\u8FDE\u63A5\u6211\u4EEC\u81EA\u5DF1\u642D\u5EFA\u7684 RocketMQ \u96C6\u7FA4\u6765\u8FDB\u884C\u6F14\u793A\u3002",paraId:2,tocIndex:2},{value:"\u4F46\u662F\u5728\u8C03\u8BD5\u8FD9\u4E9B\u4EE3\u7801\u7684\u65F6\u5019\u8981\u6CE8\u610F\u4E00\u4E2A\u95EE\u9898\uFF1A\u8FD9\u4E9B\u6D4B\u8BD5\u4EE3\u7801\u4E2D\u7684\u751F\u4EA7\u8005\u548C\u6D88\u8D39\u8005\u90FD\u9700\u8981\u4F9D\u8D56 NameServer \u624D\u80FD\u8FD0\u884C\uFF0C",paraId:3,tocIndex:2},{value:"\u53EA\u9700\u8981\u5C06 NameServer \u6307\u5411\u6211\u4EEC\u81EA\u5DF1\u642D\u5EFA\u7684 RocketMQ \u96C6\u7FA4\uFF0C\u800C\u4E0D\u9700\u8981\u7BA1 Broker \u5728\u54EA\u91CC\uFF0C\u5C31\u53EF\u4EE5\u8FDE\u63A5\u6211\u4EEC\u81EA\u5DF1\u7684\u81EA\u5DF1\u7684 RocketMQ \u96C6\u7FA4",paraId:3,tocIndex:2},{value:"\u800C RocketMQ \u63D0\u4F9B\u7684\u751F\u4EA7\u8005\u548C\u6D88\u8D39\u8005\u5BFB\u627E NameServer \u7684\u65B9\u5F0F\u6709\u4E24\u79CD\uFF1A",paraId:4,tocIndex:2},{value:'\u5728\u4EE3\u7801\u4E2D\u6307\u5B9A namesrvAddr \u5C5E\u6027\u3002\u4F8B\u5982\uFF1Aconsumer.setNamesrvAddr ("127.0.0.1:9876");',paraId:5,tocIndex:2},{value:"\u901A\u8FC7 NAMESRV_ADDR \u73AF\u5883\u53D8\u91CF\u6765\u6307\u5B9A\u3002\u591A\u4E2A NameServer \u4E4B\u95F4\u7528\u5206\u53F7\u8FDE\u63A5\u3002",paraId:6,tocIndex:2},{value:"\u5F53\u4F7F\u7528 RocketMQ \u8FDB\u884C\u6D88\u606F\u4F20\u9012\u65F6\uFF0C\u4EE5\u4E0B\u662F\u6709\u5173\u4E3B\u9898\uFF08Topic\uFF09\u3001\u6807\u7B7E\uFF08Tag\uFF09\u548C\u952E\uFF08Key\uFF09\u7684\u4F5C\u7528\uFF1A",paraId:7,tocIndex:3},{value:"\u4E3B\u9898\uFF08Topic\uFF09",paraId:8,tocIndex:3},{value:`\uFF1A
`,paraId:8,tocIndex:3},{value:'\u4E3B\u9898\u662F\u6D88\u606F\u7684\u903B\u8F91\u5206\u7C7B\uFF0C\u7528\u4E8E\u6807\u8BC6\u4E00\u7C7B\u6D88\u606F\u7684\u96C6\u5408\u3002\u751F\u4EA7\u8005\u53D1\u9001\u7684\u6D88\u606F\u4F1A\u6307\u5B9A\u4E00\u4E2A\u4E3B\u9898\uFF0C\u6D88\u8D39\u8005\u53EF\u4EE5\u8BA2\u9605\u7279\u5B9A\u7684\u4E3B\u9898\u6765\u63A5\u6536\u6D88\u606F\u3002\u4E3B\u9898\u901A\u5E38\u4EE3\u8868\u4E00\u79CD\u4E1A\u52A1\u573A\u666F\u6216\u4E00\u79CD\u7C7B\u578B\u7684\u6570\u636E\u3002\u4F8B\u5982\uFF0C\u4E00\u4E2A\u7535\u5546\u5E94\u7528\u53EF\u80FD\u6709\u4E00\u4E2A\u540D\u4E3A "\u8BA2\u5355" \u7684\u4E3B\u9898\uFF0C\u7528\u4E8E\u5904\u7406\u6240\u6709\u8BA2\u5355\u76F8\u5173\u7684\u6D88\u606F\u3002',paraId:9,tocIndex:3},{value:"\u4E3B\u9898\u7684\u8BBE\u8BA1\u5E94\u8BE5\u5177\u6709\u826F\u597D\u7684\u533A\u5206\u5EA6\uFF0C\u4F7F\u5F97\u76F8\u5173\u7684\u6D88\u606F\u80FD\u591F\u88AB\u7EC4\u7EC7\u5728\u4E00\u8D77\uFF0C\u65B9\u4FBF\u7BA1\u7406\u548C\u7EF4\u62A4\u3002\u540C\u65F6\uFF0C\u4E3B\u9898\u4E5F\u5E94\u8BE5\u5177\u5907\u8DB3\u591F\u7684\u6269\u5C55\u6027\uFF0C\u4EE5\u5E94\u5BF9\u4E1A\u52A1\u7684\u53D8\u5316\u548C\u589E\u957F\u3002",paraId:9,tocIndex:3},{value:"\u6807\u7B7E\uFF08Tag\uFF09",paraId:8,tocIndex:3},{value:`\uFF1A
`,paraId:8,tocIndex:3},{value:"\u6807\u7B7E\u662F\u5BF9\u6D88\u606F\u7684\u8FDB\u4E00\u6B65\u5206\u7C7B\uFF0C\u7528\u4E8E\u66F4\u7CBE\u7EC6\u5730\u8FC7\u6EE4\u548C\u8BA2\u9605\u6D88\u606F\u3002\u5728\u53D1\u9001\u6D88\u606F\u65F6\uFF0C\u53EF\u4EE5\u4E3A\u6D88\u606F\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u6807\u7B7E\u3002\u6D88\u8D39\u8005\u53EF\u4EE5\u6839\u636E\u6807\u7B7E\u6765\u8BA2\u9605\u6D88\u606F\uFF0C\u53EA\u63A5\u6536\u7279\u5B9A\u6807\u7B7E\u7684\u6D88\u606F\u3002\u6807\u7B7E\u53EF\u4EE5\u7528\u6765\u533A\u5206\u4E0D\u540C\u7C7B\u578B\u7684\u6D88\u606F\u6216\u8005\u8868\u793A\u6D88\u606F\u7684\u5904\u7406\u72B6\u6001\u3002\u4F8B\u5982\uFF0C\u5728\u7535\u5546\u5E94\u7528\u4E2D\uFF0C\u53EF\u4EE5\u4F7F\u7528\u4E0D\u540C\u7684\u6807\u7B7E\u6765\u8868\u793A\u8BA2\u5355\u72B6\u6001\uFF08\u5982\u5F85\u5904\u7406\u3001\u5DF2\u652F\u4ED8\u3001\u5DF2\u53D1\u8D27\u7B49\uFF09\u3002",paraId:10,tocIndex:3},{value:"\u4F7F\u7528\u6807\u7B7E\u80FD\u591F\u5E2E\u52A9\u5B9E\u73B0\u66F4\u7CBE\u51C6\u7684\u6D88\u606F\u8FC7\u6EE4\u548C\u8DEF\u7531\uFF0C\u63D0\u9AD8\u7CFB\u7EDF\u7684\u7075\u6D3B\u6027\u548C\u6027\u80FD\u3002",paraId:10,tocIndex:3},{value:"\u952E\uFF08Key\uFF09",paraId:8,tocIndex:3},{value:`\uFF1A
`,paraId:8,tocIndex:3},{value:"\u952E\u662F\u6D88\u606F\u7684\u552F\u4E00\u6807\u8BC6\u7B26\uFF0C\u7528\u4E8E\u4FDD\u8BC1\u6D88\u606F\u7684\u5E42\u7B49\u6027\u548C\u987A\u5E8F\u6027\u3002\u751F\u4EA7\u8005\u53D1\u9001\u6D88\u606F\u65F6\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u952E\uFF0CRocketMQ \u6839\u636E\u952E\u6765\u4FDD\u8BC1\u6D88\u606F\u7684\u552F\u4E00\u6027\u548C\u987A\u5E8F\u6027\u3002\u6D88\u8D39\u8005\u5728\u63A5\u6536\u6D88\u606F\u65F6\u53EF\u4EE5\u6839\u636E\u952E\u6765\u68C0\u67E5\u6D88\u606F\u7684\u91CD\u590D\u6027\uFF0C\u5E76\u4FDD\u8BC1\u6D88\u606F\u7684\u5904\u7406\u987A\u5E8F\u3002",paraId:11,tocIndex:3},{value:"\u952E\u901A\u5E38\u662F\u4E1A\u52A1\u4E2D\u5177\u6709\u552F\u4E00\u6027\u7684\u6807\u8BC6\u7B26\uFF0C\u6BD4\u5982\u8BA2\u5355\u53F7\u3001\u7528\u6237ID\u7B49\u3002\u5728\u67D0\u4E9B\u573A\u666F\u4E0B\uFF0C\u952E\u4E5F\u53EF\u4EE5\u7528\u4E8E\u8DEF\u7531\u6D88\u606F\u5230\u6307\u5B9A\u7684\u961F\u5217",paraId:11,tocIndex:3},{value:"\u6D88\u606F\u53D1\u9001\u8005\u7684\u56FA\u5B9A\u6B65\u9AA4",paraId:12,tocIndex:3},{value:"\u521B\u5EFA\u6D88\u606F\u751F\u4EA7\u8005 producer\uFF0C\u5E76\u5236\u5B9A\u751F\u4EA7\u8005\u7EC4\u540D",paraId:13,tocIndex:3},{value:"\u6307\u5B9A Nameserver \u5730\u5740",paraId:13,tocIndex:3},{value:"\u542F\u52A8 producer",paraId:13,tocIndex:3},{value:"\u521B\u5EFA\u6D88\u606F\u5BF9\u8C61\uFF0C\u6307\u5B9A\u4E3B\u9898 Topic\u3001Tag \u548C\u6D88\u606F\u4F53",paraId:13,tocIndex:3},{value:"\u53D1\u9001\u6D88\u606F",paraId:13,tocIndex:3},{value:"\u5173\u95ED\u751F\u4EA7\u8005 producer",paraId:13,tocIndex:3},{value:"\u6D88\u606F\u6D88\u8D39\u8005\u7684\u56FA\u5B9A\u6B65\u9AA4",paraId:12,tocIndex:3},{value:"\u521B\u5EFA\u6D88\u8D39\u8005 Consumer\uFF0C\u5236\u5B9A\u6D88\u8D39\u8005\u7EC4\u540D",paraId:14,tocIndex:3},{value:"\u6307\u5B9A Nameserver \u5730\u5740",paraId:14,tocIndex:3},{value:"\u8BA2\u9605\u4E3B\u9898 Topic \u548C Tag",paraId:14,tocIndex:3},{value:"\u8BBE\u7F6E\u56DE\u8C03\u51FD\u6570\uFF0C\u5904\u7406\u6D88\u606F",paraId:14,tocIndex:3},{value:"\u542F\u52A8\u6D88\u8D39\u8005 consumer",paraId:14,tocIndex:3},{value:"\u57FA\u672C\u6837\u4F8B\u90E8\u5206\u6211\u4EEC\u4F7F\u7528\u6D88\u606F\u751F\u4EA7\u8005\u5206\u522B\u901A\u8FC7",paraId:15,tocIndex:4},{value:"\u4E09\u79CD\u65B9\u5F0F\u53D1\u9001\u6D88\u606F\uFF0C\u540C\u6B65\u53D1\u9001\u3001\u5F02\u6B65\u53D1\u9001\u4EE5\u53CA\u5355\u5411\u53D1\u9001",paraId:15,tocIndex:4},{value:"\u7136\u540E\u4F7F\u7528\u6D88\u8D39\u8005\u6765\u6D88\u8D39\u8FD9\u4E9B\u6D88\u606F\u3002",paraId:16,tocIndex:4},{value:"1\u3001\u540C\u6B65\u53D1\u9001\u6D88\u606F\u7684\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.simple.Producer\uFF0C\u5B83\u4F1A\u7B49\u5F85\u6D88\u606F\u8FD4\u56DE\u540E\u518D\u7EE7\u7EED\u8FDB\u884C\u4E0B\u9762\u7684\u64CD\u4F5C\u3002",paraId:17,tocIndex:4},{value:"SendResult sendResult = producer.send(msg);",paraId:17,tocIndex:4},{value:"\u901A\u8FC7SendResult \u83B7\u53D6sendResult\u7684\u53D1\u9001\u7ED3\u679C",paraId:17,tocIndex:4},{value:`public static void main(String[] args) throws MQClientException, InterruptedException {
    // \u521B\u5EFA\u4E00\u4E2A\u9ED8\u8BA4\u7684\u751F\u4EA7\u8005\u5B9E\u4F8B\uFF0C\u6307\u5B9A\u751F\u4EA7\u8005\u7EC4\u540D\u4E3A "ProducerGroupName"
    DefaultMQProducer producer = new DefaultMQProducer("ProducerGroupName");
    // \u542F\u52A8\u751F\u4EA7\u8005
    producer.start();
    // \u5FAA\u73AF\u53D1\u9001\u6D88\u606F
    for (int i = 0; i < 128; i++) {
        try {
            // \u6784\u5EFA\u6D88\u606F\u5BF9\u8C61\uFF0C\u6307\u5B9A\u4E3B\u9898\u4E3A "TopicTest"\uFF0C\u6807\u7B7E\u4E3A "TagA"\uFF0C\u8BA2\u5355ID\u4E3A "OrderID188"\uFF0C\u6D88\u606F\u5185\u5BB9\u4E3A "Hello world"
            Message msg = new Message("TopicTest",
                    "TagA",
                    "OrderID188",
                    "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
            
            // \u53D1\u9001\u6D88\u606F\uFF0C\u5E76\u7B49\u5F85\u7ED3\u679C
            SendResult sendResult = producer.send(msg);
            // \u6253\u5370\u53D1\u9001\u7ED3\u679C
            System.out.printf("%s%n", sendResult);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    // \u5173\u95ED\u751F\u4EA7\u8005
    producer.shutdown();
}
`,paraId:18,tocIndex:4},{value:"2\u3001\u5F02\u6B65\u53D1\u9001\u6D88\u606F\u7684\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.simple.AsyncProducer",paraId:19,tocIndex:4},{value:"\u8FD9\u4E2A\u793A\u4F8B\u6709\u4E2A\u7279\u522B\u5730\u65B9\u5C31\u662F\u5F15\u5165\u4E86\u4E00\u4E2A countDownLatch \u6765\u4FDD\u8BC1\u6240\u6709\u6D88\u606F\u56DE\u8C03\u65B9\u6CD5\u90FD\u6267\u884C\u5B8C\u4E86\u518D\u5173\u95ED Producer\u3002 \u6240\u4EE5\u4ECE\u8FD9\u91CC\u53EF\u4EE5\u770B\u51FA\uFF0CRocketMQ \u7684 Producer \u4E5F\u662F\u4E00\u4E2A\u670D\u52A1\u7AEF\uFF0C\u5728\u5F80 Broker \u53D1\u9001\u6D88\u606F\u7684\u65F6\u5019\u4E5F\u8981\u4F5C\u4E3A\u670D\u52A1\u7AEF\u63D0\u4F9B\u670D\u52A1\u3002",paraId:20,tocIndex:4},{value:`public class AsyncProducer {
    public static void main(String[] args) throws MQClientException, InterruptedException, UnsupportedEncodingException {
        // \u521B\u5EFA\u4E00\u4E2A\u751F\u4EA7\u8005\u5B9E\u4F8B\uFF0C\u6307\u5B9A\u751F\u4EA7\u8005\u7EC4\u540D
        DefaultMQProducer producer = new DefaultMQProducer("Jodie_Daily_test");
        // \u542F\u52A8\u751F\u4EA7\u8005
        producer.start();
        // \u8BBE\u7F6E\u5F53\u53D1\u9001\u5F02\u6B65\u6D88\u606F\u5931\u8D25\u65F6\u4E0D\u8FDB\u884C\u91CD\u8BD5
        producer.setRetryTimesWhenSendAsyncFailed(0);
        // \u51C6\u5907\u53D1\u9001\u7684\u6D88\u606F\u6570\u91CF
        int messageCount = 100;
        // \u521B\u5EFA\u4E00\u4E2A\u5012\u8BA1\u65F6\u8BA1\u6570\u5668\uFF0C\u7528\u4E8E\u7B49\u5F85\u6240\u6709\u6D88\u606F\u53D1\u9001\u5B8C\u6210
        final CountDownLatch countDownLatch = new CountDownLatch(messageCount);
        // \u5FAA\u73AF\u53D1\u9001\u6D88\u606F
        for (int i = 0; i < messageCount; i++) {
            try {
                final int index = i;
                // \u521B\u5EFA\u6D88\u606F\u5BF9\u8C61\uFF0C\u6307\u5B9A\u4E3B\u9898\u3001\u6807\u7B7E\u3001\u952E\u548C\u6D88\u606F\u5185\u5BB9
                Message msg = new Message("Jodie_topic_1023",
                    "TagA",
                    "OrderID188",
                    "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
                // \u53D1\u9001\u6D88\u606F\uFF0C\u5E76\u6307\u5B9A\u53D1\u9001\u7ED3\u679C\u7684\u56DE\u8C03\u51FD\u6570
                producer.send(msg, new SendCallback() {
                    @Override
                    public void onSuccess(SendResult sendResult) {
                        // \u5F02\u6B65\u53D1\u9001\u6210\u529F\u540E\uFF0C\u56DE\u8C03\u8BE5\u65B9\u6CD5
                        countDownLatch.countDown(); // \u51CF\u5C11\u5012\u8BA1\u65F6\u8BA1\u6570\u5668
                        System.out.printf("%-10d OK %s %n", index, sendResult.getMsgId()); // \u6253\u5370\u53D1\u9001\u6210\u529F\u4FE1\u606F
                    }

                    @Override
                    public void onException(Throwable e) {
                        // \u53D1\u9001\u5F02\u5E38\u65F6\uFF0C\u56DE\u8C03\u8BE5\u65B9\u6CD5
                        countDownLatch.countDown(); // \u51CF\u5C11\u5012\u8BA1\u65F6\u8BA1\u6570\u5668
                        System.out.printf("%-10d Exception %s %n", index, e); // \u6253\u5370\u5F02\u5E38\u4FE1\u606F
                        e.printStackTrace(); // \u8F93\u51FA\u5F02\u5E38\u5806\u6808\u4FE1\u606F
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        // \u7B49\u5F85 5 \u79D2\u949F\uFF0C\u786E\u4FDD\u6240\u6709\u6D88\u606F\u53D1\u9001\u5B8C\u6210
        countDownLatch.await(5, TimeUnit.SECONDS);
        // \u5173\u95ED\u751F\u4EA7\u8005
        producer.shutdown();
    }
}
`,paraId:21,tocIndex:4},{value:"3\u3001\u5355\u5411\u53D1\u9001\u6D88\u606F\u7684\u6837\u4F8B\uFF1A",paraId:22,tocIndex:4},{value:`public class OnewayProducer {
    public static void main(String[] args) throws Exception {
        // \u521B\u5EFA\u4E00\u4E2A\u751F\u4EA7\u8005\u5B9E\u4F8B\uFF0C\u6307\u5B9A\u751F\u4EA7\u8005\u7EC4\u540D
        DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
        // \u6307\u5B9A NameServer \u5730\u5740
        producer.setNamesrvAddr("localhost:9876");
        // \u542F\u52A8\u751F\u4EA7\u8005
        producer.start();
        // \u5FAA\u73AF\u53D1\u9001\u6D88\u606F
        for (int i = 0; i < 100; i++) {
            // \u521B\u5EFA\u6D88\u606F\u5BF9\u8C61\uFF0C\u6307\u5B9A\u4E3B\u9898\u3001\u6807\u7B7E\u548C\u6D88\u606F\u5185\u5BB9
            Message msg = new Message(
                "TopicTest", // \u4E3B\u9898
                "TagA", // \u6807\u7B7E
                ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) // \u6D88\u606F\u5185\u5BB9
            );
            // \u53D1\u9001\u5355\u5411\u6D88\u606F\uFF0C\u4E0D\u5173\u5FC3\u53D1\u9001\u7ED3\u679C
            producer.sendOneway(msg);
        }

        // \u7B49\u5F85 5 \u79D2\u949F\uFF0C\u786E\u4FDD\u53D1\u9001\u5B8C\u6210
        Thread.sleep(5000);

        // \u5173\u95ED\u751F\u4EA7\u8005
        producer.shutdown();
    }
}
`,paraId:23,tocIndex:4},{value:"\u5173\u952E\u70B9\u5C31\u662F\u4F7F\u7528 producer.sendOneWay \u65B9\u5F0F\u6765\u53D1\u9001\u6D88\u606F\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u6CA1\u6709\u8FD4\u56DE\u503C\uFF0C\u4E5F\u6CA1\u6709\u56DE\u8C03\u3002\u5C31\u662F\u53EA\u7BA1\u628A\u6D88\u606F\u53D1\u51FA\u53BB\u5C31\u884C\u4E86\u3002",paraId:24,tocIndex:4},{value:"4\u3001\u4F7F\u7528\u6D88\u8D39\u8005\u6D88\u8D39\u6D88\u606F",paraId:25,tocIndex:4},{value:"\u6D88\u8D39\u8005\u6D88\u8D39\u6D88\u606F\u6709\u4E24\u79CD\u6A21\u5F0F\uFF0C\u4E00\u79CD\u662F\u6D88\u8D39\u8005\u4E3B\u52A8\u53BB Broker \u4E0A\u62C9\u53D6\u6D88\u606F\u7684\u62C9\u6A21\u5F0F\uFF0C\u53E6\u4E00\u79CD\u662F\u6D88\u8D39\u8005\u7B49\u5F85 Broker \u628A\u6D88\u606F\u63A8\u9001\u8FC7\u6765\u7684\u63A8\u6A21\u5F0F\u3002",paraId:26,tocIndex:4},{value:"\u62C9\u6A21\u5F0F",paraId:27,tocIndex:4},{value:"\u7684\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.simple.PullConsumer\uFF0C",paraId:27,tocIndex:4},{value:"\u4F7F\u7528\u4E86\u62C9\u53D6\u6D88\u606F\u7684\u65B9\u5F0F\u6D88\u8D39\u6D88\u606F\uFF0C\u5FAA\u73AF\u62C9\u53D6\u6307\u5B9A\u4E3B\u9898\u4E0B\u7684\u6240\u6709\u6D88\u606F\u961F\u5217\u7684\u6D88\u606F\u3002\u5728\u5FAA\u73AF\u62C9\u53D6\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u6839\u636E\u62C9\u53D6\u7ED3\u679C\u7684\u72B6\u6001\u8FDB\u884C\u76F8\u5E94\u7684\u5904\u7406\u3002",paraId:27,tocIndex:4},{value:`public class PullConsumer {
    // \u5B58\u50A8\u6BCF\u4E2A\u6D88\u606F\u961F\u5217\u7684\u6D88\u8D39\u8FDB\u5EA6
    private static final Map<MessageQueue, Long> OFFSET_TABLE = new HashMap<>();

    public static void main(String[] args) throws MQClientException {
        // \u521B\u5EFA\u4E00\u4E2A\u62C9\u53D6\u6D88\u606F\u7684\u6D88\u8D39\u8005\u5B9E\u4F8B\uFF0C\u6307\u5B9A\u6D88\u8D39\u8005\u7EC4\u540D
        DefaultMQPullConsumer consumer = new DefaultMQPullConsumer("please_rename_unique_group_name_5");
        // \u8BBE\u7F6E NameServer \u5730\u5740
        consumer.setNamesrvAddr("127.0.0.1:9876");
        // \u542F\u52A8\u6D88\u8D39\u8005
        consumer.start();
        // \u83B7\u53D6\u6307\u5B9A\u4E3B\u9898\u4E0B\u7684\u6240\u6709\u6D88\u606F\u961F\u5217
        Set<MessageQueue> mqs = consumer.fetchSubscribeMessageQueues("broker-a");
        for (MessageQueue mq : mqs) {
            System.out.printf("Consume from the queue: %s%n", mq);
            // \u4ECE\u961F\u5217\u62C9\u53D6\u6D88\u606F\uFF0C\u5FAA\u73AF\u62C9\u53D6
            SINGLE_MQ:
            while (true) {
                try {
                    // \u62C9\u53D6\u6D88\u606F\uFF0C\u53C2\u6570\u4E3A\u6D88\u606F\u961F\u5217\u3001\u6D88\u606F\u6807\u7B7E\u3001\u6D88\u606F\u961F\u5217\u7684\u6D88\u8D39\u8FDB\u5EA6\u3001\u4E00\u6B21\u62C9\u53D6\u7684\u6D88\u606F\u6570\u91CF
                    PullResult pullResult = consumer.pullBlockIfNotFound(mq, null, getMessageQueueOffset(mq), 32);
                    System.out.printf("%s%n", pullResult);
                    // \u66F4\u65B0\u6D88\u606F\u961F\u5217\u7684\u6D88\u8D39\u8FDB\u5EA6
                    putMessageQueueOffset(mq, pullResult.getNextBeginOffset());
                    // \u6839\u636E\u62C9\u53D6\u7ED3\u679C\u7684\u72B6\u6001\u8FDB\u884C\u5904\u7406
                    switch (pullResult.getPullStatus()) {
                        case FOUND: // \u627E\u5230\u6D88\u606F
                            break;
                        case NO_MATCHED_MSG: // \u6CA1\u6709\u5339\u914D\u7684\u6D88\u606F
                            break;
                        case NO_NEW_MSG: // \u6CA1\u6709\u65B0\u7684\u6D88\u606F
                            break SINGLE_MQ; // \u7ED3\u675F\u672C\u6B21\u6D88\u606F\u961F\u5217\u7684\u62C9\u53D6
                        case OFFSET_ILLEGAL: // \u6D88\u606F\u961F\u5217\u7684\u6D88\u8D39\u8FDB\u5EA6\u975E\u6CD5
                            break;
                        default:
                            break;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        // \u5173\u95ED\u6D88\u8D39\u8005
        consumer.shutdown();
    }

    // \u83B7\u53D6\u6D88\u606F\u961F\u5217\u7684\u6D88\u8D39\u8FDB\u5EA6
    private static long getMessageQueueOffset(MessageQueue mq) {
        Long offset = OFFSET_TABLE.get(mq);
        if (offset != null)
            return offset;

        return 0;
    }
    
    // \u66F4\u65B0\u6D88\u606F\u961F\u5217\u7684\u6D88\u8D39\u8FDB\u5EA6
    private static void putMessageQueueOffset(MessageQueue mq, long offset) {
        OFFSET_TABLE.put(mq, offset);
    }
}
`,paraId:28,tocIndex:4},{value:"\u63A8\u6A21\u5F0F",paraId:29,tocIndex:4},{value:"\u7684\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.simple.PushConsumer",paraId:29,tocIndex:4},{value:`public class PushConsumer {
    public static void main(String[] args) throws InterruptedException, MQClientException {
        // \u521B\u5EFA\u4E00\u4E2A\u6D88\u606F\u63A8\u9001\u6D88\u8D39\u8005\u5B9E\u4F8B\uFF0C\u6307\u5B9A\u6D88\u8D39\u8005\u7EC4\u540D
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_JODIE_1");
        // \u8BA2\u9605\u6307\u5B9A\u4E3B\u9898\u7684\u6240\u6709\u6D88\u606F
        consumer.subscribe("TopicTest", "*");
        // \u8BBE\u7F6E\u6D88\u8D39\u4F4D\u7F6E\u4E3A\u4ECE\u961F\u5217\u7684\u7B2C\u4E00\u4E2A\u6D88\u606F\u5F00\u59CB\u6D88\u8D39
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
        // \u8BBE\u7F6E\u6D88\u8D39\u65F6\u95F4\u6233
        consumer.setConsumeTimestamp("20181109221800");
        // \u6CE8\u518C\u6D88\u606F\u76D1\u542C\u5668\uFF0C\u5904\u7406\u6D88\u606F\u7684\u56DE\u8C03\u903B\u8F91
        consumer.registerMessageListener(new MessageListenerConcurrently() {

            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                // \u6D88\u8D39\u6D88\u606F\u7684\u903B\u8F91\uFF0C\u8FD9\u91CC\u7B80\u5355\u6253\u5370\u6D88\u606F\u5185\u5BB9
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS; // \u8FD4\u56DE\u6D88\u8D39\u72B6\u6001
            }
        });
        // \u542F\u52A8\u6D88\u8D39\u8005
        consumer.start();
        System.out.printf("Consumer Started.%n"); // \u8F93\u51FA\u542F\u52A8\u4FE1\u606F
    }
}
`,paraId:30,tocIndex:4},{value:"\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0C\u7528\u63A8\u6A21\u5F0F\u6BD4\u8F83\u7B80\u5355\u3002",paraId:31,tocIndex:4},{value:"\u5B9E\u9645\u4E0A RocketMQ \u7684\u63A8\u6A21\u5F0F\u4E5F\u662F\u7531\u62C9\u6A21\u5F0F\u5C01\u88C5\u51FA\u6765\u7684\u3002",paraId:32,tocIndex:4},{value:"RocketMQ \u4FDD\u8BC1\u7684\u662F\u6D88\u606F\u7684\u5C40\u90E8\u6709\u5E8F\uFF0C\u800C\u4E0D\u662F\u5168\u5C40\u6709\u5E8F\u3002",paraId:33,tocIndex:5},{value:"\u987A\u5E8F\u6D88\u606F\u751F\u4EA7\u8005\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.order.Producer",paraId:34,tocIndex:5},{value:`public class Producer {
    public static void main(String[] args) throws UnsupportedEncodingException {
        try {
            // \u521B\u5EFA\u4E00\u4E2A\u6D88\u606F\u751F\u4EA7\u8005\u5B9E\u4F8B\uFF0C\u6307\u5B9A\u751F\u4EA7\u8005\u7EC4\u540D
            MQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
            // \u542F\u52A8\u751F\u4EA7\u8005\u5B9E\u4F8B
            producer.start();

            // \u5B9A\u4E49\u4E00\u7EC4\u6D88\u606F\u6807\u7B7E
            String[] tags = new String[] {"TagA", "TagB", "TagC", "TagD", "TagE"};
            // \u53D1\u9001100\u6761\u6D88\u606F
            for (int i = 0; i < 100; i++) {
                int orderId = i % 10; // \u6A21\u62DF\u8BA2\u5355ID
                // \u521B\u5EFA\u6D88\u606F\u5B9E\u4F8B\uFF0C\u6307\u5B9A\u4E3B\u9898\u3001\u6807\u7B7E\u3001\u952E\u548C\u6D88\u606F\u5185\u5BB9
                Message msg = new Message("TopicTestjjj", tags[i % tags.length], "KEY" + i,
                        ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
                // \u53D1\u9001\u6D88\u606F\uFF0C\u5E76\u6307\u5B9A\u6D88\u606F\u961F\u5217\u9009\u62E9\u5668\u548C\u961F\u5217ID
                SendResult sendResult = producer.send(msg, new MessageQueueSelector() {
                    @Override
                    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
                        Integer id = (Integer) arg;
                        int index = id % mqs.size();
                        return mqs.get(index);
                    }
                }, orderId);

                // \u8F93\u51FA\u53D1\u9001\u7ED3\u679C
                System.out.printf("%s%n", sendResult);
            }

            // \u5173\u95ED\u751F\u4EA7\u8005\u5B9E\u4F8B
            producer.shutdown();
        } catch (MQClientException | RemotingException | MQBrokerException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
`,paraId:35,tocIndex:5},{value:"select",paraId:36,tocIndex:5},{value:" \u65B9\u6CD5\u662F\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684\u6D88\u606F\u961F\u5217\u9009\u62E9\u5668\uFF0C\u7528\u4E8E\u6839\u636E\u7279\u5B9A\u7684\u89C4\u5219\u9009\u62E9\u6D88\u606F\u53D1\u9001\u5230\u54EA\u4E2A\u6D88\u606F\u961F\u5217\u3002\u8BE5\u65B9\u6CD5\u63A5\u6536\u4E09\u4E2A\u53C2\u6570\uFF1A",paraId:36,tocIndex:5},{value:"mqs",paraId:37,tocIndex:5},{value:"\uFF1A\u6D88\u606F\u961F\u5217\u5217\u8868\uFF0C\u8868\u793A\u5F53\u524D\u4E3B\u9898\u4E0B\u6240\u6709\u53EF\u7528\u7684\u6D88\u606F\u961F\u5217\u3002",paraId:37,tocIndex:5},{value:"msg",paraId:37,tocIndex:5},{value:"\uFF1A\u8981\u53D1\u9001\u7684\u6D88\u606F\u5BF9\u8C61\u3002",paraId:37,tocIndex:5},{value:"arg",paraId:37,tocIndex:5},{value:"\uFF1A\u9644\u52A0\u7684\u53C2\u6570\uFF0C\u7528\u4E8E\u6307\u5B9A\u6D88\u606F\u961F\u5217\u9009\u62E9\u7684\u4F9D\u636E\u3002",paraId:37,tocIndex:5},{value:"\u5728\u8FD9\u4E2A\u65B9\u6CD5\u4E2D\uFF0C\u6839\u636E\u4F20\u5165\u7684\u8BA2\u5355ID (",paraId:38,tocIndex:5},{value:"orderId",paraId:38,tocIndex:5},{value:") \u6765\u9009\u62E9\u6D88\u606F\u961F\u5217\u3002\u5177\u4F53\u9009\u62E9\u903B\u8F91\u662F\u8BA1\u7B97\u8BA2\u5355ID\u5BF9\u6D88\u606F\u961F\u5217\u5217\u8868\u5927\u5C0F\u53D6\u6A21\u7684\u7ED3\u679C\uFF0C\u7136\u540E\u8FD4\u56DE\u5BF9\u5E94\u7D22\u5F15\u4F4D\u7F6E\u7684\u6D88\u606F\u961F\u5217\u3002\u8FD9\u6837\u53EF\u4EE5\u4FDD\u8BC1\u540C\u4E00\u8BA2\u5355\u7684\u6D88\u606F\u90FD\u53D1\u9001\u5230\u540C\u4E00\u4E2A\u6D88\u606F\u961F\u5217\u4E2D\uFF0C\u5B9E\u73B0\u4E86\u8BA2\u5355\u7684\u987A\u5E8F\u6027\u5904\u7406",paraId:38,tocIndex:5},{value:"\u987A\u5E8F\u6D88\u606F\u6D88\u8D39\u8005\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.order.Consumer",paraId:39,tocIndex:5},{value:`public class Consumer {

    public static void main(String[] args) throws MQClientException {
        // \u521B\u5EFA\u4E00\u4E2A\u6D88\u8D39\u8005\u5B9E\u4F8B
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_3");
        // \u8BBE\u7F6E\u6D88\u8D39\u8005\u4ECE\u6D88\u606F\u961F\u5217\u7684\u9996\u4E2A\u504F\u79FB\u91CF\u5F00\u59CB\u6D88\u8D39
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
        // \u8BA2\u9605\u4E3B\u9898\u4E3A "TopicTest" \u7684\u6D88\u606F\uFF0C\u5E76\u6307\u5B9A\u6807\u7B7E\u4E3A "TagA"\u3001"TagC" \u6216\u8005 "TagD" \u7684\u6D88\u606F
        consumer.subscribe("TopicTest", "TagA || TagC || TagD");
        // \u6CE8\u518C\u6D88\u606F\u76D1\u542C\u5668
        consumer.registerMessageListener(new MessageListenerOrderly() {
            // \u8BB0\u5F55\u6D88\u8D39\u6B21\u6570
            AtomicLong consumeTimes = new AtomicLong(0);

            @Override
            public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs, ConsumeOrderlyContext context) {
                // \u8BBE\u7F6E\u81EA\u52A8\u63D0\u4EA4
                context.setAutoCommit(true);
                // \u8F93\u51FA\u7EBF\u7A0B\u540D\u79F0\u548C\u6536\u5230\u7684\u6D88\u606F
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), msgs);
                // \u6D88\u8D39\u6B21\u6570\u81EA\u589E
                this.consumeTimes.incrementAndGet();
                // \u6839\u636E\u4E0D\u540C\u7684\u6D88\u8D39\u6B21\u6570\u8FD4\u56DE\u4E0D\u540C\u7684\u6D88\u8D39\u72B6\u6001
                if ((this.consumeTimes.get() % 2) == 0) {
                    return ConsumeOrderlyStatus.SUCCESS; // \u6D88\u8D39\u6210\u529F
                } else if ((this.consumeTimes.get() % 3) == 0) {
                    return ConsumeOrderlyStatus.ROLLBACK; // \u9700\u8981\u56DE\u6EDA
                } else if ((this.consumeTimes.get() % 4) == 0) {
                    return ConsumeOrderlyStatus.COMMIT; // \u9700\u8981\u63D0\u4EA4
                } else if ((this.consumeTimes.get() % 5) == 0) {
                    context.setSuspendCurrentQueueTimeMillis(3000); // \u8BBE\u7F6E\u6682\u505C\u65F6\u95F4
                    return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT; // \u6682\u505C\u5F53\u524D\u961F\u5217\u4E00\u6BB5\u65F6\u95F4
                }
                return ConsumeOrderlyStatus.SUCCESS; // \u9ED8\u8BA4\u8FD4\u56DE\u6210\u529F
            }
        });
        // \u542F\u52A8\u6D88\u8D39\u8005
        consumer.start();
        System.out.printf("Consumer Started.%n");
    }
}
`,paraId:40,tocIndex:5},{value:"\u5B9E\u9645\u4E0A\uFF0CRocketMQ \u4E5F\u53EA\u4FDD\u8BC1\u4E86\u6BCF\u4E2A OrderID \u7684\u6240\u6709\u6D88\u606F\u6709\u5E8F (\u53D1\u5230\u4E86\u540C\u4E00\u4E2A queue)\uFF0C\u800C\u5E76\u4E0D\u80FD\u4FDD\u8BC1\u6240\u6709\u6D88\u606F\u90FD\u6709\u5E8F\u3002\u6240\u4EE5\u8FD9\u5C31\u6D89\u53CA\u5230\u4E86 RocketMQ \u6D88\u606F\u6709\u5E8F\u7684\u539F\u7406\u3002\u8981\u4FDD\u8BC1\u6700\u7EC8\u6D88\u8D39\u5230\u7684\u6D88\u606F\u662F\u6709\u5E8F\u7684\uFF0C\u9700\u8981\u4ECE Producer\u3001Broker\u3001Consumer \u4E09\u4E2A\u6B65\u9AA4\u90FD\u4FDD\u8BC1\u6D88\u606F\u6709\u5E8F\u624D\u884C\u3002",paraId:41,tocIndex:5},{value:"**\u9996\u5148\u5728\u53D1\u9001\u8005\u7AEF\uFF1A**\u5728\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u6D88\u606F\u53D1\u9001\u8005\u4F1A\u91C7\u53D6 Round Robin \u8F6E\u8BE2\u65B9\u5F0F\u628A\u6D88\u606F\u53D1\u9001\u5230\u4E0D\u540C\u7684 MessageQueue (\u5206\u533A\u961F\u5217)\uFF0C\u800C\u6D88\u8D39\u8005\u6D88\u8D39\u7684\u65F6\u5019\u4E5F\u4ECE\u591A\u4E2A MessageQueue \u4E0A\u62C9\u53D6\u6D88\u606F\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\u6D88\u606F\u662F\u4E0D\u80FD\u4FDD\u8BC1\u987A\u5E8F\u7684\u3002",paraId:42,tocIndex:5},{value:"\u800C\u53EA\u6709\u5F53\u4E00\u7EC4\u6709\u5E8F\u7684\u6D88\u606F\u53D1\u9001\u5230\u540C\u4E00\u4E2A MessageQueue \u4E0A\u65F6\uFF0C\u624D\u80FD\u5229\u7528 MessageQueue \u5148\u8FDB\u5148\u51FA\u7684\u7279\u6027\u4FDD\u8BC1\u8FD9\u4E00\u7EC4\u6D88\u606F\u6709\u5E8F\u3002",paraId:43,tocIndex:5},{value:"**\u7136\u540E\u5728\u6D88\u8D39\u8005\u7AEF\uFF1A**\u6D88\u8D39\u8005\u4F1A\u4ECE\u591A\u4E2A\u6D88\u606F\u961F\u5217\u4E0A\u53BB\u62FF\u6D88\u606F\u3002\u8FD9\u65F6\u867D\u7136\u6BCF\u4E2A\u6D88\u606F\u961F\u5217\u4E0A\u7684\u6D88\u606F\u662F\u6709\u5E8F\u7684\uFF0C\u4F46\u662F\u591A\u4E2A\u961F\u5217\u4E4B\u95F4\u7684\u6D88\u606F\u4ECD\u7136\u662F\u4E71\u5E8F\u7684\u3002",paraId:44,tocIndex:5},{value:"\u6D88\u8D39\u8005\u7AEF\u8981\u4FDD\u8BC1\u6D88\u606F\u6709\u5E8F\uFF0C\u5C31\u9700\u8981\u6309\u961F\u5217\u4E00\u4E2A\u4E00\u4E2A\u6765\u53D6\u6D88\u606F\uFF0C\u5373\u53D6\u5B8C\u4E00\u4E2A\u961F\u5217\u7684\u6D88\u606F\u540E\uFF0C\u518D\u53BB\u53D6\u4E0B\u4E00\u4E2A\u961F\u5217\u7684\u6D88\u606F",paraId:45,tocIndex:5},{value:"\u3002\u800C\u7ED9 consumer \u6CE8\u5165\u7684 ",paraId:45,tocIndex:5},{value:"MessageListenerOrderly ",paraId:45,tocIndex:5},{value:"\u5BF9\u8C61\uFF0C\u5728 RocketMQ \u5185\u90E8\u5C31\u4F1A\u901A\u8FC7",paraId:45,tocIndex:5},{value:"\u9501\u961F\u5217\u7684\u65B9\u5F0F",paraId:45,tocIndex:5},{value:"\u4FDD\u8BC1\u6D88\u606F\u662F\u4E00\u4E2A\u4E00\u4E2A\u961F\u5217\u6765\u53D6\u7684\u3002",paraId:45,tocIndex:5},{value:"MessageListenerConcurrently",paraId:45,tocIndex:5},{value:" \u8FD9\u4E2A\u6D88\u606F\u76D1\u542C\u5668\u5219\u4E0D\u4F1A\u9501\u961F\u5217\uFF0C\u6BCF\u6B21\u90FD\u662F\u4ECE\u591A\u4E2A Message \u4E2D\u53D6\u4E00\u6279\u6570\u636E\uFF08\u9ED8\u8BA4\u4E0D\u8D85\u8FC7 32 \u6761\uFF09\u56E0\u6B64\u4E5F\u65E0\u6CD5\u4FDD\u8BC1\u6D88\u606F\u6709\u5E8F\u3002",paraId:45,tocIndex:5},{value:"\u5E7F\u64AD\u6D88\u606F\u7684\u6D88\u606F\u751F\u4EA7\u8005\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.broadcast.PushConsumer",paraId:46,tocIndex:6},{value:`public class PushConsumer {

    public static void main(String[] args) throws InterruptedException, MQClientException {
        // \u521B\u5EFA\u4E00\u4E2A\u63A8\u9001\u6A21\u5F0F\u7684\u6D88\u8D39\u8005\u5B9E\u4F8B
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_1");
        // \u8BBE\u7F6E\u6D88\u8D39\u8005\u4ECE\u6D88\u606F\u961F\u5217\u7684\u9996\u4E2A\u504F\u79FB\u91CF\u5F00\u59CB\u6D88\u8D39
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
        // \u8BBE\u7F6E\u6D88\u8D39\u6A21\u5F0F\u4E3A\u5E7F\u64AD\u6A21\u5F0F
        consumer.setMessageModel(MessageModel.BROADCASTING);
        // \u8BA2\u9605\u4E3B\u9898\u4E3A "TopicTest" \u7684\u6D88\u606F\uFF0C\u5E76\u6307\u5B9A\u6807\u7B7E\u4E3A "TagA"\u3001"TagC" \u6216\u8005 "TagD" \u7684\u6D88\u606F
        consumer.subscribe("TopicTest", "TagA || TagC || TagD");
        // \u6CE8\u518C\u6D88\u606F\u76D1\u542C\u5668
        consumer.registerMessageListener(new MessageListenerConcurrently() {

            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs,
                ConsumeConcurrentlyContext context) {
                // \u8F93\u51FA\u7EBF\u7A0B\u540D\u79F0\u548C\u6536\u5230\u7684\u6D88\u606F
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS; // \u6D88\u8D39\u6210\u529F
            }
        });
        // \u542F\u52A8\u6D88\u8D39\u8005
        consumer.start();
        System.out.printf("Broadcast Consumer Started.%n");
    }
}
`,paraId:47,tocIndex:6},{value:"\u5E7F\u64AD\u6D88\u606F\u5E76\u6CA1\u6709\u7279\u5B9A\u7684\u6D88\u606F\u6D88\u8D39\u8005\u6837\u4F8B\uFF0C\u8FD9\u662F\u56E0\u4E3A\u8FD9\u6D89\u53CA\u5230\u6D88\u8D39\u8005\u7684\u96C6\u7FA4\u6D88\u8D39\u6A21\u5F0F\u3002\u5728\u96C6\u7FA4\u72B6\u6001 (MessageModel.CLUSTERING) \u4E0B\uFF0C\u6BCF\u4E00\u6761\u6D88\u606F\u53EA\u4F1A\u88AB\u540C\u4E00\u4E2A\u6D88\u8D39\u8005\u7EC4\u4E2D\u7684\u4E00\u4E2A\u5B9E\u4F8B\u6D88\u8D39\u5230 (\u8FD9\u8DDF kafka \u548C rabbitMQ \u7684\u96C6\u7FA4\u6A21\u5F0F\u662F\u4E00\u6837\u7684)\u3002\u800C\u5E7F\u64AD\u6A21\u5F0F\u5219\u662F\u628A\u6D88\u606F\u53D1\u7ED9\u4E86\u6240\u6709\u8BA2\u9605\u4E86\u5BF9\u5E94\u4E3B\u9898\u7684\u6D88\u8D39\u8005\uFF0C\u800C\u4E0D\u7BA1\u6D88\u8D39\u8005\u662F\u4E0D\u662F\u540C\u4E00\u4E2A\u6D88\u8D39\u8005\u7EC4\u3002",paraId:48,tocIndex:6},{value:"\u5EF6\u8FDF\u6D88\u606F\u7684\u751F\u4EA7\u8005\u6848\u4F8B",paraId:49,tocIndex:7},{value:`public class ScheduledMessageProducer {
    public static void main(String[] args) throws Exception {
        // \u5B9E\u4F8B\u5316\u4E00\u4E2A\u751F\u4EA7\u8005\u6765\u53D1\u9001\u5B9A\u65F6\u6D88\u606F
        DefaultMQProducer producer = new DefaultMQProducer("ExampleProducerGroup");
        // \u542F\u52A8\u751F\u4EA7\u8005
        producer.start();
        // \u8981\u53D1\u9001\u7684\u6D88\u606F\u603B\u6570
        int totalMessagesToSend = 100;
        for (int i = 0; i < totalMessagesToSend; i++) {
            // \u521B\u5EFA\u4E00\u6761\u6D88\u606F
            Message message = new Message("TestTopic", ("Hello scheduled message " + i).getBytes());
            // \u8BBE\u7F6E\u6D88\u606F\u7684\u5EF6\u8FDF\u7EA7\u522B\uFF0C\u8FD9\u6761\u6D88\u606F\u5C06\u572810\u79D2\u540E\u53D1\u9001\u7ED9\u6D88\u8D39\u8005
            message.setDelayTimeLevel(3);
            // \u53D1\u9001\u6D88\u606F
            producer.send(message);
        }
        // \u4F7F\u7528\u540E\u5173\u95ED\u751F\u4EA7\u8005
        producer.shutdown();
    }
}
`,paraId:50,tocIndex:7},{value:"\u5EF6\u8FDF\u6D88\u606F\u5B9E\u73B0\u7684\u6548\u679C\u5C31\u662F\u5728\u8C03\u7528 producer.send \u65B9\u6CD5\u540E\uFF0C\u6D88\u606F\u5E76\u4E0D\u4F1A\u7ACB\u5373\u53D1\u9001\u51FA\u53BB\uFF0C\u800C\u662F\u4F1A\u7B49\u4E00\u6BB5\u65F6\u95F4\u518D\u53D1\u9001\u51FA\u53BB\u3002\u8FD9\u662F RocketMQ \u7279\u6709\u7684\u4E00\u4E2A\u529F\u80FD\u3002",paraId:51,tocIndex:7},{value:"\u90A3\u4F1A\u5EF6\u8FDF\u591A\u4E45\u5462\uFF1F",paraId:52,tocIndex:7},{value:"\u5EF6\u8FDF\u65F6\u95F4\u7684\u8BBE\u7F6E\u5C31\u662F\u5728 Message \u6D88\u606F\u5BF9\u8C61\u4E0A\u8BBE\u7F6E\u4E00\u4E2A\u5EF6\u8FDF\u7EA7\u522B message.setDelayTimeLevel (3);",paraId:52,tocIndex:7},{value:"\u5F00\u6E90\u7248\u672C\u7684 RocketMQ \u4E2D\uFF0C\u5BF9\u5EF6\u8FDF\u6D88\u606F\u5E76\u4E0D\u652F\u6301\u4EFB\u610F\u65F6\u95F4\u7684\u5EF6\u8FDF\u8BBE\u5B9A (\u5546\u4E1A\u7248\u672C\u4E2D\u652F\u6301)\uFF0C\u800C\u662F\u53EA\u652F\u6301 18 \u4E2A\u56FA\u5B9A\u7684\u5EF6\u8FDF\u7EA7\u522B\uFF0C1 \u5230 18 \u5206\u522B\u5BF9\u5E94 messageDelayLevel=1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h\u3002\u8FD9\u4ECE\u54EA\u91CC\u770B\u51FA\u6765\u7684\uFF1F\u5176\u5B9E\u4ECE rocketmq-console \u63A7\u5236\u53F0\u5C31\u80FD\u770B\u51FA\u6765\u3002\u800C\u8FD9 18 \u4E2A\u5EF6\u8FDF\u7EA7\u522B\u4E5F\u652F\u6301\u81EA\u884C\u5B9A\u4E49\uFF0C\u4E0D\u8FC7\u4E00\u822C\u60C5\u51B5\u4E0B\u6700\u597D\u4E0D\u8981\u81EA\u5B9A\u4E49\u4FEE\u6539\u3002",paraId:53,tocIndex:7},{value:"\u90A3\u8FD9\u4E48\u597D\u7528\u7684\u5EF6\u8FDF\u6D88\u606F\u662F\u600E\u4E48\u5B9E\u73B0\u7684\uFF1F\u8FD9 18 \u4E2A\u5EF6\u8FDF\u7EA7\u522B\u9664\u4E86\u5728\u5EF6\u8FDF\u6D88\u606F\u4E2D\u7528\uFF0C\u8FD8\u6709\u4EC0\u4E48\u5730\u65B9\u7528\u5230\uFF1F",paraId:54,tocIndex:7},{value:"\u6279\u91CF\u6D88\u606F\u662F\u6307\u5C06\u591A\u6761\u6D88\u606F\u5408\u5E76\u6210\u4E00\u4E2A\u6279\u91CF\u6D88\u606F\uFF0C\u4E00\u6B21\u53D1\u9001\u51FA\u53BB\u3002\u8FD9\u6837\u7684\u597D\u5904\u662F\u53EF\u4EE5\u51CF\u5C11\u7F51\u7EDC IO\uFF0C\u63D0\u5347\u541E\u5410\u91CF\u3002",paraId:55,tocIndex:8},{value:"\u6279\u91CF\u6D88\u606F\u7684\u6D88\u606F\u751F\u4EA7\u8005\u6837\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.batch.SimpleBatchProducer",paraId:56,tocIndex:8},{value:`public class SimpleBatchProducer {
    public static void main(String[] args) throws Exception {
        // \u5B9E\u4F8B\u5316\u4E00\u4E2A\u751F\u4EA7\u8005
        DefaultMQProducer producer = new DefaultMQProducer("BatchProducerGroupName");
        // \u542F\u52A8\u751F\u4EA7\u8005
        producer.start();
        // \u6D88\u606F\u4E3B\u9898
        String topic = "BatchTest";
        // \u6784\u5EFA\u6D88\u606F\u5217\u8868
        List<Message> messages = new ArrayList<>();
        messages.add(new Message(topic, "Tag", "OrderID001", "Hello world 0".getBytes()));
        messages.add(new Message(topic, "Tag", "OrderID002", "Hello world 1".getBytes()));
        messages.add(new Message(topic, "Tag", "OrderID003", "Hello world 2".getBytes()));
        // \u53D1\u9001\u6D88\u606F
        producer.send(messages);
        // \u5173\u95ED\u751F\u4EA7\u8005
        producer.shutdown();
    }
}
`,paraId:57,tocIndex:8},{value:"org.apache.rocketmq.example.batch.SplitBatchProducer",paraId:58,tocIndex:8},{value:`public class SplitBatchProducer {
    public static void main(String[] args) throws Exception {
        // \u5B9E\u4F8B\u5316\u4E00\u4E2A\u751F\u4EA7\u8005
        DefaultMQProducer producer = new DefaultMQProducer("BatchProducerGroupName");
        // \u542F\u52A8\u751F\u4EA7\u8005
        producer.start();
        // \u8981\u53D1\u9001\u7684\u6D88\u606F\u4E3B\u9898
        String topic = "BatchTest";
        // \u6784\u5EFA\u4E00\u4E2A\u5305\u542B\u5927\u91CF\u6D88\u606F\u7684\u5217\u8868
        List<Message> messages = new ArrayList<>(100 * 1000);
        for (int i = 0; i < 100 * 1000; i++) {
            messages.add(new Message(topic, "Tag", "OrderID" + i, ("Hello world " + i).getBytes()));
        }
        // \u5C06\u5927\u6279\u91CF\u6D88\u606F\u62C6\u5206\u6210\u5C0F\u6279\u91CF\u53D1\u9001
        ListSplitter splitter = new ListSplitter(messages);
        while (splitter.hasNext()) {
            List<Message> listItem = splitter.next();
            producer.send(listItem);
        }
        // \u4F7F\u7528\u540E\u5173\u95ED\u751F\u4EA7\u8005
        producer.shutdown();
    }
}
`,paraId:59,tocIndex:8},{value:"\u5982\u679C\u6279\u91CF\u6D88\u606F\u5927\u4E8E 1MB \u5C31\u4E0D\u8981\u7528\u4E00\u4E2A\u6279\u6B21\u53D1\u9001\uFF0C\u800C\u8981\u62C6\u5206\u6210\u591A\u4E2A\u6279\u6B21\u6D88\u606F\u53D1\u9001\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u4E00\u4E2A\u6279\u6B21\u6D88\u606F\u7684\u5927\u5C0F\u4E0D\u8981\u8D85\u8FC7 1MB",paraId:60,tocIndex:8},{value:"\u5B9E\u9645\u4F7F\u7528\u65F6\uFF0C\u8FD9\u4E2A 1MB \u7684\u9650\u5236\u53EF\u4EE5\u7A0D\u5FAE\u6269\u5927\u70B9\uFF0C\u5B9E\u9645\u6700\u5927\u7684\u9650\u5236\u662F 4194304 \u5B57\u8282\uFF0C\u5927\u6982 4MB\u3002\u4F46\u662F\u4F7F\u7528\u6279\u91CF\u6D88\u606F\u65F6\uFF0C\u8FD9\u4E2A\u6D88\u606F\u957F\u5EA6\u786E\u5B9E\u662F\u5FC5\u987B\u8003\u8651\u7684\u4E00\u4E2A\u95EE\u9898\u3002\u800C\u4E14\u6279\u91CF\u6D88\u606F\u7684\u4F7F\u7528\u662F\u6709\u4E00\u5B9A\u9650\u5236\u7684\uFF0C\u8FD9\u4E9B\u6D88\u606F\u5E94\u8BE5\u6709\u76F8\u540C\u7684 Topic\uFF0C\u76F8\u540C\u7684 waitStoreMsgOK\u3002\u800C\u4E14\u4E0D\u80FD\u662F\u5EF6\u8FDF\u6D88\u606F\u3001\u4E8B\u52A1\u6D88\u606F\u7B49\u3002",paraId:61,tocIndex:8},{value:"\u5728\u5927\u591A\u6570\u60C5\u51B5\u4E0B\uFF0C\u53EF\u4EE5\u4F7F\u7528 Message \u7684 Tag \u5C5E\u6027\u6765\u7B80\u5355\u5FEB\u901F\u7684\u8FC7\u6EE4\u4FE1\u606F\u3002",paraId:62,tocIndex:9},{value:"\u4F7F\u7528 Tag \u8FC7\u6EE4\u6D88\u606F\u7684\u6D88\u606F\u751F\u4EA7\u8005\u6848\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.filter.TagFilterProducer",paraId:63,tocIndex:9},{value:`public class TagFilterProducer {
    public static void main(String[] args) throws Exception {
        // \u5B9E\u4F8B\u5316\u4E00\u4E2A\u751F\u4EA7\u8005
        DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
        // \u6307\u5B9ANameServer\u5730\u5740
        producer.setNamesrvAddr("localhost:9876");
        // \u542F\u52A8\u751F\u4EA7\u8005
        producer.start();
        // \u6D88\u606F\u6807\u7B7E
        String[] tags = new String[] {"TagA", "TagB", "TagC"};
        // \u5FAA\u73AF\u53D1\u9001\u6D88\u606F
        for (int i = 0; i < 60; i++) {
            // \u6784\u5EFA\u6D88\u606F
            Message msg = new Message("TagFilterTest", tags[i % tags.length], "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
            // \u53D1\u9001\u6D88\u606F
            SendResult sendResult = producer.send(msg);
            System.out.printf("%s%n", sendResult);
        }
        // \u5173\u95ED\u751F\u4EA7\u8005
        producer.shutdown();
    }
}
`,paraId:64,tocIndex:9},{value:"\u4F7F\u7528 Tag \u8FC7\u6EE4\u6D88\u606F\u7684\u6D88\u606F\u6D88\u8D39\u8005\u6848\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.filter.TagFilterConsumer",paraId:65,tocIndex:9},{value:`public class TagFilterConsumer {
    public static void main(String[] args) throws InterruptedException, MQClientException {
        // \u521B\u5EFA\u6D88\u8D39\u8005\u5B9E\u4F8B
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");
        // \u8BA2\u9605\u6D88\u606F\uFF0C\u8BBE\u7F6E\u8FC7\u6EE4\u6761\u4EF6
        consumer.subscribe("TagFilterTest", "TagA || TagC");
        // \u6CE8\u518C\u6D88\u606F\u76D1\u542C\u5668
        consumer.registerMessageListener(new MessageListenerConcurrently() {

            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs,
                ConsumeConcurrentlyContext context) {
                // \u6D88\u8D39\u6D88\u606F
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), msgs);
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        // \u542F\u52A8\u6D88\u8D39\u8005\u5B9E\u4F8B
        consumer.start();
        System.out.printf("Consumer Started.%n");
    }
}
`,paraId:66,tocIndex:9},{value:'\u4E3B\u8981\u662F\u770B\u6D88\u606F\u6D88\u8D39\u8005\u3002consumer.subscribe ("TagFilterTest", "TagA || TagC"); \u8FD9\u53E5\u53EA\u8BA2\u9605 TagA \u548C TagC \u7684\u6D88\u606F\u3002',paraId:67,tocIndex:9},{value:"TAG \u662F RocketMQ \u4E2D\u7279\u6709\u7684\u4E00\u4E2A\u6D88\u606F\u5C5E\u6027\u3002RocketMQ \u7684\u6700\u4F73\u5B9E\u8DF5\u4E2D\u5C31\u5EFA\u8BAE\uFF0C\u4F7F\u7528 RocketMQ \u65F6\uFF0C\u4E00\u4E2A\u5E94\u7528\u53EF\u4EE5\u5C31\u7528\u4E00\u4E2A Topic\uFF0C\u800C\u5E94\u7528\u4E2D\u7684\u4E0D\u540C\u4E1A\u52A1\u5C31\u7528 TAG \u6765\u533A\u5206\u3002",paraId:68,tocIndex:9},{value:"\u4F46\u662F\uFF0C\u8FD9\u79CD\u65B9\u5F0F\u6709\u4E00\u4E2A\u5F88\u5927\u7684\u9650\u5236\uFF0C\u5C31\u662F\u4E00\u4E2A\u6D88\u606F\u53EA\u80FD\u6709\u4E00\u4E2A TAG\uFF0C\u8FD9\u5728\u4E00\u4E9B\u6BD4\u8F83\u590D\u6742\u7684\u573A\u666F\u5C31\u6709\u70B9\u4E0D\u8DB3\u4E86\u3002 \u8FD9\u65F6\u5019\uFF0C\u53EF\u4EE5\u4F7F\u7528 SQL \u8868\u8FBE\u5F0F\u6765\u5BF9\u6D88\u606F\u8FDB\u884C\u8FC7\u6EE4\u3002",paraId:69,tocIndex:9},{value:"SQL \u8FC7\u6EE4\u7684\u6D88\u606F\u751F\u4EA7\u8005\u6848\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.filter.SqlFilterProducer",paraId:70,tocIndex:9},{value:`public class SqlFilterProducer {
    public static void main(String[] args) throws Exception {
        // \u521B\u5EFA\u751F\u4EA7\u8005\u5B9E\u4F8B
        DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
        // \u542F\u52A8\u751F\u4EA7\u8005\u5B9E\u4F8B
        producer.start();
        // \u6D88\u606F\u6807\u7B7E\u6570\u7EC4
        String[] tags = new String[] {"TagA", "TagB", "TagC"};
        // \u53D1\u9001\u6D88\u606F
        for (int i = 0; i < 10; i++) {
            // \u521B\u5EFA\u6D88\u606F
            Message msg = new Message("SqlFilterTest",
                tags[i % tags.length],
                ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET)
            );
            // \u8BBE\u7F6E\u6D88\u606F\u5C5E\u6027
            msg.putUserProperty("a", String.valueOf(i));
            // \u53D1\u9001\u6D88\u606F\u5E76\u63A5\u6536\u53D1\u9001\u7ED3\u679C
            SendResult sendResult = producer.send(msg);
            System.out.printf("%s%n", sendResult);
        }
        // \u5173\u95ED\u751F\u4EA7\u8005\u5B9E\u4F8B
        producer.shutdown();
    }
}
`,paraId:71,tocIndex:9},{value:"SQL \u8FC7\u6EE4\u7684\u6D88\u606F\u6D88\u8D39\u8005\u6848\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.filter.SqlFilterConsumer",paraId:72,tocIndex:9},{value:`public class SqlFilterConsumer {
    public static void main(String[] args) throws Exception {
        // \u521B\u5EFA\u6D88\u8D39\u8005\u5B9E\u4F8B
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");
        // \u8BA2\u9605\u6D88\u606F\u4E3B\u9898\u5E76\u8BBE\u7F6E\u6D88\u606F\u8FC7\u6EE4\u5668
        consumer.subscribe("SqlFilterTest",MessageSelector.bySql("(TAGS is not null and TAGS in ('TagA', 'TagB'))" + "and (a is not null and a between 0 and 3)"));
        // \u6CE8\u518C\u6D88\u606F\u76D1\u542C\u5668
        consumer.registerMessageListener(new MessageListenerConcurrently() {

            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs,
                ConsumeConcurrentlyContext context) {
                // \u6D88\u8D39\u6D88\u606F
                System.out.printf("%s Receive New Messages: %s %n", Thread.currentThread().getName(), msgs);
                // \u8FD4\u56DE\u6D88\u8D39\u72B6\u6001
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        // \u542F\u52A8\u6D88\u8D39\u8005\u5B9E\u4F8B
        consumer.start();
        System.out.printf("Consumer Started.%n");
    }
}
`,paraId:73,tocIndex:9},{value:"\u8FD9\u4E2A\u6A21\u5F0F\u7684\u5173\u952E\u662F\u5728\u6D88\u8D39\u8005\u7AEF\u4F7F\u7528 ",paraId:74,tocIndex:9},{value:"MessageSelector.bySql (String sql)",paraId:74,tocIndex:9},{value:" \u8FD4\u56DE\u7684\u4E00\u4E2A",paraId:74,tocIndex:9},{value:" MessageSelector",paraId:74,tocIndex:9},{value:"\u3002\u8FD9\u91CC\u9762\u7684 sql \u8BED\u53E5\u662F\u6309\u7167 SQL92 \u6807\u51C6\u6765\u6267\u884C\u7684\u3002sql \u4E2D\u53EF\u4EE5\u4F7F\u7528\u7684\u53C2\u6570\u6709\u9ED8\u8BA4\u7684 TAGS \u548C\u4E00\u4E2A\u5728\u751F\u4EA7\u8005\u4E2D\u52A0\u5165\u7684 a \u5C5E\u6027\u3002",paraId:74,tocIndex:9},{value:"SQL92 \u8BED\u6CD5\uFF1A",paraId:75,tocIndex:9},{value:"RocketMQ \u53EA\u5B9A\u4E49\u4E86\u4E00\u4E9B\u57FA\u672C\u8BED\u6CD5\u6765\u652F\u6301\u8FD9\u4E2A\u7279\u6027\u3002\u4F60\u4E5F\u53EF\u4EE5\u5F88\u5BB9\u6613\u5730\u6269\u5C55\u5B83\u3002",paraId:76,tocIndex:9},{value:"\u6570\u503C\u6BD4\u8F83\uFF0C\u6BD4\u5982\uFF1A",paraId:77,tocIndex:9},{value:">\uFF0C>=\uFF0C<\uFF0C<=\uFF0CBETWEEN\uFF0C=\uFF1B",paraId:77,tocIndex:9},{value:"\u5B57\u7B26\u6BD4\u8F83\uFF0C\u6BD4\u5982\uFF1A",paraId:77,tocIndex:9},{value:"=\uFF0C<>\uFF0CIN\uFF1B",paraId:77,tocIndex:9},{value:"IS NULL",paraId:77,tocIndex:9},{value:" \u6216\u8005 ",paraId:77,tocIndex:9},{value:"IS NOT NULL\uFF1B",paraId:77,tocIndex:9},{value:"\u903B\u8F91\u7B26\u53F7 ",paraId:77,tocIndex:9},{value:"AND\uFF0COR\uFF0CNOT\uFF1B",paraId:77,tocIndex:9},{value:"\u5E38\u91CF\u652F\u6301\u7C7B\u578B\u4E3A\uFF1A",paraId:78,tocIndex:9},{value:"\u6570\u503C\uFF0C\u6BD4\u5982\uFF1A",paraId:79,tocIndex:9},{value:"123\uFF0C3.1415\uFF1B",paraId:79,tocIndex:9},{value:"\u5B57\u7B26\uFF0C\u6BD4\u5982\uFF1A",paraId:79,tocIndex:9},{value:"'abc'\uFF0C\u5FC5\u987B\u7528\u5355\u5F15\u53F7\u5305\u88F9\u8D77\u6765\uFF1B",paraId:79,tocIndex:9},{value:"NULL",paraId:79,tocIndex:9},{value:"\uFF0C\u7279\u6B8A\u7684\u5E38\u91CF",paraId:79,tocIndex:9},{value:"\u5E03\u5C14\u503C\uFF0C",paraId:79,tocIndex:9},{value:"TRUE",paraId:79,tocIndex:9},{value:" \u6216 ",paraId:79,tocIndex:9},{value:"FALSE",paraId:79,tocIndex:9},{value:"\u4F7F\u7528\u6CE8\u610F\uFF1A\u53EA\u6709\u63A8\u6A21\u5F0F\u7684\u6D88\u8D39\u8005\u53EF\u4EE5\u4F7F\u7528 SQL \u8FC7\u6EE4\u3002\u62C9\u6A21\u5F0F\u662F\u7528\u4E0D\u4E86\u7684\u3002",paraId:80,tocIndex:9},{value:"\u8FD9\u4E2A\u4E8B\u52A1\u6D88\u606F\u662F RocketMQ \u63D0\u4F9B\u7684\u4E00\u4E2A\u975E\u5E38\u6709\u7279\u8272\u7684\u529F\u80FD\uFF0C\u9700\u8981\u7740\u91CD\u7406\u89E3\u3002",paraId:81,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u662F\u5728\u5206\u5E03\u5F0F\u7CFB\u7EDF\u4E2D\u4FDD\u8BC1\u6700\u7EC8\u4E00\u81F4\u6027\u7684\u4E24\u9636\u6BB5\u63D0\u4EA4\u7684\u6D88\u606F\u5B9E\u73B0\u3002\u4ED6\u53EF\u4EE5\u4FDD\u8BC1\u672C\u5730\u4E8B\u52A1\u6267\u884C\u4E0E\u6D88\u606F\u53D1\u9001\u4E24\u4E2A\u64CD\u4F5C\u7684\u539F\u5B50\u6027\uFF0C\u4E5F\u5C31\u662F\u8FD9\u4E24\u4E2A\u64CD\u4F5C\u4E00\u8D77\u6210\u529F\u6216\u8005\u4E00\u8D77\u5931\u8D25\u3002",paraId:82,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u53EA\u4FDD\u8BC1\u6D88\u606F\u53D1\u9001\u8005\u7684\u672C\u5730\u4E8B\u52A1\u4E0E\u53D1\u6D88\u606F\u8FD9\u4E24\u4E2A\u64CD\u4F5C\u7684\u539F\u5B50\u6027\uFF0C\u56E0\u6B64\uFF0C\u4E8B\u52A1\u6D88\u606F\u7684\u793A\u4F8B\u53EA\u6D89\u53CA\u5230\u6D88\u606F\u53D1\u9001\u8005\uFF0C\u5BF9\u4E8E\u6D88\u606F\u6D88\u8D39\u8005\u6765\u8BF4\uFF0C\u5E76\u6CA1\u6709\u4EC0\u4E48\u7279\u522B\u7684\u3002",paraId:83,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u751F\u4EA7\u8005\u7684\u6848\u4F8B\u89C1\uFF1Aorg.apache.rocketmq.example.transaction.TransactionProducer",paraId:84,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u7684\u5173\u952E\u662F\u5728 TransactionMQProducer \u4E2D\u6307\u5B9A\u4E86\u4E00\u4E2A ",paraId:85,tocIndex:10},{value:"TransactionListener",paraId:85,tocIndex:10},{value:" \u4E8B\u52A1\u76D1\u542C\u5668\uFF0C\u8FD9\u4E2A\u4E8B\u52A1\u76D1\u542C\u5668\u5C31\u662F\u4E8B\u52A1\u6D88\u606F\u7684\u5173\u952E\u63A7\u5236\u5668\u3002",paraId:85,tocIndex:10},{value:`public class TransactionListenerImpl implements TransactionListener {
    
 	//\u5728\u63D0\u4EA4\u5B8C\u4E8B\u52A1\u6D88\u606F\u540E\u6267\u884C\u3002
 	//\u8FD4\u56DECOMMIT_MESSAGE\u72B6\u6001\u7684\u6D88\u606F\u4F1A\u7ACB\u5373\u88AB\u6D88\u8D39\u8005\u6D88\u8D39\u5230\u3002
 	//\u8FD4\u56DEROLLBACK_MESSAGE\u72B6\u6001\u7684\u6D88\u606F\u4F1A\u88AB\u4E22\u5F03\u3002
 	//\u8FD4\u56DEUNKNOWN\u72B6\u6001\u7684\u6D88\u606F\u4F1A\u7531Broker\u8FC7\u4E00\u6BB5\u65F6\u95F4\u518D\u6765\u56DE\u67E5\u4E8B\u52A1\u7684\u72B6\u6001\u3002
    @Override
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        String tags = msg.getTags();
        //TagA\u7684\u6D88\u606F\u4F1A\u7ACB\u5373\u88AB\u6D88\u8D39\u8005\u6D88\u8D39\u5230
        if(StringUtils.contains(tags,"TagA")){
            return LocalTransactionState.COMMIT_MESSAGE;
        //TagB\u7684\u6D88\u606F\u4F1A\u88AB\u4E22\u5F03
        }else if(StringUtils.contains(tags,"TagB")){
            return LocalTransactionState.ROLLBACK_MESSAGE;
            
        //CDE\u7B49\u5176\u4ED6\u6D88\u606F\u4F1A\u7B49\u5F85Broker\u8FDB\u884C\u4E8B\u52A1\u72B6\u6001\u56DE\u67E5
        }else{
            return LocalTransactionState.UNKNOW;
        }
    }
    
 	//\u5728\u5BF9UNKNOWN\u72B6\u6001\u7684\u6D88\u606F\u8FDB\u884C\u72B6\u6001\u56DE\u67E5\u65F6\u6267\u884C\u3002\u8FD4\u56DE\u7684\u7ED3\u679C\u662F\u4E00\u6837\u7684\u3002
    @Override
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
  		String tags = msg.getTags();
        //TagC\u7684\u6D88\u606F\u8FC7\u4E00\u6BB5\u65F6\u95F4\u4F1A\u88AB\u6D88\u8D39\u8005\u6D88\u8D39\u5230
        if(StringUtils.contains(tags,"TagC")){
            return LocalTransactionState.COMMIT_MESSAGE;
        //TagD\u7684\u6D88\u606F\u4E5F\u4F1A\u5728\u72B6\u6001\u56DE\u67E5\u65F6\u88AB\u4E22\u5F03\u6389
        }else if(StringUtils.contains(tags,"TagD")){
            return LocalTransactionState.ROLLBACK_MESSAGE;
        //\u5269\u4E0BTagE\u7684\u6D88\u606F\u4F1A\u5728\u591A\u6B21\u72B6\u6001\u56DE\u67E5\u540E\u6700\u7EC8\u4E22\u5F03
        }else{
            return LocalTransactionState.UNKNOW;
        }
    }
}
`,paraId:86,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u7684\u4F7F\u7528\u9650\u5236\uFF1A",paraId:87,tocIndex:10},{value:"1\u3001",paraId:88,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u4E0D\u652F\u6301\u5EF6\u8FDF\u6D88\u606F\u548C\u6279\u91CF\u6D88\u606F",paraId:88,tocIndex:10},{value:"\u3002",paraId:88,tocIndex:10},{value:"2\u3001",paraId:89,tocIndex:10},{value:"\u4E3A\u4E86\u907F\u514D\u5355\u4E2A\u6D88\u606F\u88AB\u68C0\u67E5\u592A\u591A\u6B21\u800C\u5BFC\u81F4\u534A\u961F\u5217\u6D88\u606F\u7D2F\u79EF\uFF0C\u6211\u4EEC\u9ED8\u8BA4\u5C06\u5355\u4E2A\u6D88\u606F\u7684\u68C0\u67E5\u6B21\u6570\u9650\u5236\u4E3A 15 \u6B21",paraId:89,tocIndex:10},{value:"\uFF0C\u4F46\u662F\u7528\u6237\u53EF\u4EE5\u901A\u8FC7 Broker \u914D\u7F6E\u6587\u4EF6\u7684 ",paraId:89,tocIndex:10},{value:"transactionCheckMax",paraId:89,tocIndex:10},{value:" \u53C2\u6570\u6765\u4FEE\u6539\u6B64\u9650\u5236\u3002\u5982\u679C\u5DF2\u7ECF\u68C0\u67E5\u67D0\u6761\u6D88\u606F\u8D85\u8FC7 N \u6B21\u7684\u8BDD\uFF08 N = ",paraId:89,tocIndex:10},{value:"transactionCheckMax",paraId:89,tocIndex:10},{value:" \uFF09 \u5219 Broker \u5C06\u4E22\u5F03\u6B64\u6D88\u606F\uFF0C\u5E76\u5728\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u540C\u65F6\u6253\u5370\u9519\u8BEF\u65E5\u5FD7\u3002\u7528\u6237\u53EF\u4EE5\u901A\u8FC7\u91CD\u5199 ",paraId:89,tocIndex:10},{value:"AbstractTransactionCheckListener",paraId:89,tocIndex:10},{value:" \u7C7B\u6765\u4FEE\u6539\u8FD9\u4E2A\u884C\u4E3A\u3002",paraId:89,tocIndex:10},{value:"\u56DE\u67E5\u6B21\u6570\u662F\u7531 BrokerConfig.transactionCheckMax \u8FD9\u4E2A\u53C2\u6570\u6765\u914D\u7F6E\u7684\uFF0C\u9ED8\u8BA4 15 \u6B21\uFF0C\u53EF\u4EE5\u5728 broker.conf \u4E2D\u8986\u76D6\u3002",paraId:90,tocIndex:10},{value:`
\u7136\u540E\u5B9E\u9645\u7684\u68C0\u67E5\u6B21\u6570\u4F1A\u5728 message \u4E2D\u4FDD\u5B58\u4E00\u4E2A\u7528\u6237\u5C5E\u6027 MessageConst.PROPERTY_TRANSACTION_CHECK_TIMES\u3002\u8FD9\u4E2A\u5C5E\u6027\u503C\u5927\u4E8E transactionCheckMax\uFF0C\u5C31\u4F1A\u4E22\u5F03\u3002 \u8FD9\u4E2A\u7528\u6237\u5C5E\u6027\u503C\u4F1A\u6309\u56DE\u67E5\u6B21\u6570\u9012\u589E\uFF0C\u4E5F\u53EF\u4EE5\u5728 Producer \u4E2D\u81EA\u884C\u8986\u76D6\u8FD9\u4E2A\u5C5E\u6027\u3002`,paraId:90,tocIndex:10},{value:"3\u3001",paraId:91,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u5C06\u5728 Broker \u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u53C2\u6570 transactionMsgTimeout \u8FD9\u6837\u7684\u7279\u5B9A\u65F6\u95F4\u957F\u5EA6\u4E4B\u540E\u88AB\u68C0\u67E5",paraId:91,tocIndex:10},{value:"\u3002\u5F53\u53D1\u9001\u4E8B\u52A1\u6D88\u606F\u65F6\uFF0C\u7528\u6237\u8FD8\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E\u7528\u6237\u5C5E\u6027 CHECK_IMMUNITY_TIME_IN_SECONDS \u6765\u6539\u53D8\u8FD9\u4E2A\u9650\u5236\uFF0C\u8BE5\u53C2\u6570\u4F18\u5148\u4E8E ",paraId:91,tocIndex:10},{value:"transactionMsgTimeout",paraId:91,tocIndex:10},{value:" \u53C2\u6570\u3002",paraId:91,tocIndex:10},{value:"\u7531 BrokerConfig.transactionTimeOut \u8FD9\u4E2A\u53C2\u6570\u6765\u914D\u7F6E\u3002\u9ED8\u8BA4 6 \u79D2\uFF0C\u53EF\u4EE5\u5728 broker.conf \u4E2D\u8FDB\u884C\u4FEE\u6539\u3002",paraId:92,tocIndex:10},{value:`
\u53E6\u5916\uFF0C\u4E5F\u53EF\u4EE5\u7ED9\u6D88\u606F\u914D\u7F6E\u4E00\u4E2A MessageConst.PROPERTY_CHECK_IMMUNITY_TIME_IN_SECONDS \u5C5E\u6027\u6765\u7ED9\u6D88\u606F\u6307\u5B9A\u4E00\u4E2A\u7279\u5B9A\u7684\u6D88\u606F\u56DE\u67E5\u65F6\u95F4\u3002`,paraId:92,tocIndex:10},{value:`
msg.putUserProperty (MessageConst.PROPERTY_CHECK_IMMUNITY_TIME_IN_SECONDS, "10000"); \u8FD9\u6837\u5C31\u662F 10 \u79D2\u3002`,paraId:92,tocIndex:10},{value:"4\u3001",paraId:93,tocIndex:10},{value:"\u4E8B\u52A1\u6027\u6D88\u606F\u53EF\u80FD\u4E0D\u6B62\u4E00\u6B21\u88AB\u68C0\u67E5\u6216\u6D88\u8D39",paraId:93,tocIndex:10},{value:"\u3002",paraId:93,tocIndex:10},{value:"5\u3001\u63D0\u4EA4\u7ED9\u7528\u6237\u7684\u76EE\u6807\u4E3B\u9898\u6D88\u606F\u53EF\u80FD\u4F1A\u5931\u8D25\uFF0C\u76EE\u524D\u8FD9\u4F9D\u65E5\u5FD7\u7684\u8BB0\u5F55\u800C\u5B9A\u3002\u5B83\u7684\u9AD8\u53EF\u7528\u6027\u901A\u8FC7 RocketMQ \u672C\u8EAB\u7684\u9AD8\u53EF\u7528\u6027\u673A\u5236\u6765\u4FDD\u8BC1\uFF0C\u5982\u679C\u5E0C\u671B\u786E\u4FDD\u4E8B\u52A1\u6D88\u606F\u4E0D\u4E22\u5931\u3001\u5E76\u4E14\u4E8B\u52A1\u5B8C\u6574\u6027\u5F97\u5230\u4FDD\u8BC1\uFF0C\u5EFA\u8BAE\u4F7F\u7528\u540C\u6B65\u7684\u53CC\u91CD\u5199\u5165\u673A\u5236\u3002",paraId:94,tocIndex:10},{value:"6\u3001\u4E8B\u52A1\u6D88\u606F\u7684\u751F\u4EA7\u8005 ID \u4E0D\u80FD\u4E0E\u5176\u4ED6\u7C7B\u578B\u6D88\u606F\u7684\u751F\u4EA7\u8005 ID \u5171\u4EAB\u3002\u4E0E\u5176\u4ED6\u7C7B\u578B\u7684\u6D88\u606F\u4E0D\u540C\uFF0C\u4E8B\u52A1\u6D88\u606F\u5141\u8BB8\u53CD\u5411\u67E5\u8BE2\u3001MQ \u670D\u52A1\u5668\u80FD\u901A\u8FC7\u5B83\u4EEC\u7684\u751F\u4EA7\u8005 ID \u67E5\u8BE2\u5230\u6D88\u8D39\u8005\u3002",paraId:95,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u673A\u5236\u7684\u5173\u952E\u662F\u5728\u53D1\u9001\u6D88\u606F\u65F6\uFF0C\u4F1A\u5C06\u6D88\u606F\u8F6C\u4E3A\u4E00\u4E2A half \u534A\u6D88\u606F\uFF0C\u5E76\u5B58\u5165 RocketMQ \u5185\u90E8\u7684\u4E00\u4E2A ",paraId:96,tocIndex:10},{value:"RMQ_SYS_TRANS_HALF_TOPIC ",paraId:96,tocIndex:10},{value:"\u8FD9\u4E2A Topic\uFF0C\u8FD9\u6837\u5BF9\u6D88\u8D39\u8005\u662F\u4E0D\u53EF\u89C1\u7684\u3002\u518D\u7ECF\u8FC7\u4E00\u7CFB\u5217\u4E8B\u52A1\u68C0\u67E5\u901A\u8FC7\u540E\uFF0C\u518D\u5C06\u6D88\u606F\u8F6C\u5B58\u5230\u76EE\u6807 Topic\uFF0C\u8FD9\u6837\u5BF9\u6D88\u8D39\u8005\u5C31\u53EF\u89C1\u4E86\u3002",paraId:96,tocIndex:10},{value:"\u8FD9\u4E2A\u4E8B\u52A1\u6D88\u606F\u8DDF\u5206\u5E03\u5F0F\u4E8B\u52A1\u6709\u4EC0\u4E48\u5173\u7CFB\uFF1F\u4E3A\u4EC0\u4E48\u626F\u5230\u4E86\u5206\u5E03\u5F0F\u4E8B\u52A1\u76F8\u5173\u7684\u4E24\u9636\u6BB5\u63D0\u4EA4\u4E0A\u4E86\uFF1F",paraId:97,tocIndex:10},{value:"\u4E8B\u52A1\u6D88\u606F\u53EA\u4FDD\u8BC1\u4E86\u53D1\u9001\u8005\u672C\u5730\u4E8B\u52A1\u548C\u53D1\u9001\u6D88\u606F\u8FD9\u4E24\u4E2A\u64CD\u4F5C\u7684\u539F\u5B50\u6027\uFF0C\u4F46\u662F\u5E76\u4E0D\u4FDD\u8BC1\u6D88\u8D39\u8005\u672C\u5730\u4E8B\u52A1\u7684\u539F\u5B50\u6027\uFF0C\u6240\u4EE5\uFF0C\u4E8B\u52A1\u6D88\u606F\u53EA\u4FDD\u8BC1\u4E86\u5206\u5E03\u5F0F\u4E8B\u52A1\u7684\u4E00\u534A",paraId:98,tocIndex:10},{value:"\u3002",paraId:98,tocIndex:10},{value:"\u4F46\u662F\u5373\u4F7F\u8FD9\u6837\uFF0C",paraId:99,tocIndex:10},{value:"\u5BF9\u4E8E\u590D\u6742\u7684\u5206\u5E03\u5F0F\u4E8B\u52A1\uFF0CRocketMQ \u63D0\u4F9B\u7684\u4E8B\u52A1\u6D88\u606F\u4E5F\u662F\u76EE\u524D\u4E1A\u5185\u6700\u4F73\u7684\u964D\u7EA7\u65B9\u6848",paraId:99,tocIndex:10},{value:"\u3002",paraId:99,tocIndex:10},{value:"\u4E86\u89E3",paraId:100},{value:"\u6743\u9650\u63A7\u5236\uFF08ACL\uFF09\u4E3B\u8981\u4E3ARocketMQ\u63D0\u4F9BTopic\u8D44\u6E90\u7EA7\u522B\u7684\u7528\u6237\u8BBF\u95EE\u63A7\u5236\u3002\u7528\u6237\u5728\u4F7F\u7528RocketMQ\u6743\u9650\u63A7\u5236\u65F6\uFF0C\u53EF\u4EE5\u5728Client\u5BA2\u6237\u7AEF\u901A\u8FC7 RPCHook\u6CE8\u5165AccessKey\u548CSecretKey\u7B7E\u540D\uFF1B\u540C\u65F6\uFF0C\u5C06\u5BF9\u5E94\u7684\u6743\u9650\u63A7\u5236\u5C5E\u6027\uFF08\u5305\u62ECTopic\u8BBF\u95EE\u6743\u9650\u3001IP\u767D\u540D\u5355\u548CAccessKey\u548CSecretKey\u7B7E\u540D\u7B49\uFF09\u8BBE\u7F6E\u5728$ROCKETMQ_HOME/conf/plain_acl.yml\u7684\u914D\u7F6E\u6587\u4EF6\u4E2D\u3002Broker\u7AEF\u5BF9AccessKey\u6240\u62E5\u6709\u7684\u6743\u9650\u8FDB\u884C\u6821\u9A8C\uFF0C\u6821\u9A8C\u4E0D\u8FC7\uFF0C\u629B\u51FA\u5F02\u5E38\uFF1B ACL\u5BA2\u6237\u7AEF\u53EF\u4EE5\u53C2\u8003\uFF1A",paraId:101,tocIndex:11},{value:"**org.apache.rocketmq.example.simple**",paraId:101,tocIndex:11},{value:" \u5305\u4E0B\u9762\u7684 ",paraId:101,tocIndex:11},{value:"AclClient",paraId:101,tocIndex:11},{value:" \u4EE3\u7801\u3002",paraId:101,tocIndex:11},{value:"\u6CE8\u610F\uFF0C\u5982\u679C\u8981\u5728\u81EA\u5DF1\u7684\u5BA2\u6237\u7AEF\u4E2D\u4F7F\u7528 RocketMQ \u7684 ACL \u529F\u80FD\uFF0C\u8FD8\u9700\u8981\u5F15\u5165\u4E00\u4E2A\u5355\u72EC\u7684\u4F9D\u8D56\u5305",paraId:102,tocIndex:11},{value:`<dependency>
	<groupId>org.apache.rocketmq</groupId>
	<artifactId>rocketmq-acl</artifactId>
	<version>4.7.1</version>
</dependency>
`,paraId:103,tocIndex:11},{value:"\u800C Broker \u7AEF\u5177\u4F53\u7684\u914D\u7F6E\u4FE1\u606F\u53EF\u4EE5\u53C2\u89C1\u6E90\u7801\u5305\u4E0B ",paraId:104,tocIndex:11},{value:"docs/cn/acl/user_guide.md",paraId:104,tocIndex:11},{value:"\u3002\u4E3B\u8981\u662F\u5728 broker.conf \u4E2D\u6253\u5F00 acl \u7684\u6807\u5FD7\uFF1AaclEnable=true\u3002\u7136\u540E\u5C31\u53EF\u4EE5\u7528 plain_acl.yml \u6765\u8FDB\u884C\u6743\u9650\u914D\u7F6E\u4E86\u3002\u5E76\u4E14\u8FD9\u4E2A\u914D\u7F6E\u6587\u4EF6\u662F\u70ED\u52A0\u8F7D\u7684\uFF0C\u4E5F\u5C31\u662F\u8BF4\u8981\u4FEE\u6539\u914D\u7F6E\u65F6\uFF0C\u53EA\u8981\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6\u5C31\u53EF\u4EE5\u4E86\uFF0C\u4E0D\u7528\u91CD\u542F Broker \u670D\u52A1\u3002\u6211\u4EEC\u6765\u7B80\u5355\u5206\u6790\u4E0B\u6E90\u7801\u4E2D\u7684 plan_acl.yml \u7684\u914D\u7F6E\uFF1A",paraId:104,tocIndex:11},{value:`#\u5168\u5C40\u767D\u540D\u5355\uFF0C\u4E0D\u53D7ACL\u63A7\u5236
#\u901A\u5E38\u9700\u8981\u5C06\u4E3B\u4ECE\u67B6\u6784\u4E2D\u7684\u6240\u6709\u8282\u70B9\u52A0\u8FDB\u6765
globalWhiteRemoteAddresses:
- 10.10.103.*
- 192.168.0.*

accounts:
#\u7B2C\u4E00\u4E2A\u8D26\u6237
- accessKey: RocketMQ
  secretKey: 12345678
  whiteRemoteAddress:
  admin: false 
  defaultTopicPerm: DENY #\u9ED8\u8BA4Topic\u8BBF\u95EE\u7B56\u7565\u662F\u62D2\u7EDD
  defaultGroupPerm: SUB #\u9ED8\u8BA4Group\u8BBF\u95EE\u7B56\u7565\u662F\u53EA\u5141\u8BB8\u8BA2\u9605
  topicPerms:
  - topicA=DENY #topicA\u62D2\u7EDD
  - topicB=PUB|SUB #topicB\u5141\u8BB8\u53D1\u5E03\u548C\u8BA2\u9605\u6D88\u606F
  - topicC=SUB #topicC\u53EA\u5141\u8BB8\u8BA2\u9605
  groupPerms:
  # the group should convert to retry topic
  - groupA=DENY
  - groupB=PUB|SUB
  - groupC=SUB
#\u7B2C\u4E8C\u4E2A\u8D26\u6237\uFF0C\u53EA\u8981\u662F\u6765\u81EA192.168.1.*\u7684IP\uFF0C\u5C31\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u8D44\u6E90
- accessKey: rocketmq2
  secretKey: 12345678
  whiteRemoteAddress: 192.168.1.*
  # if it is admin, it could access all resources
  admin: true
`,paraId:105,tocIndex:11},{value:"\u5728\u4F7F\u7528 SpringBoot \u7684 starter \u96C6\u6210\u5305\u65F6\uFF0C\u8981\u7279\u522B\u6CE8\u610F\u7248\u672C\u3002\u56E0\u4E3A SpringBoot \u96C6\u6210 RocketMQ \u7684 starter \u4F9D\u8D56\u662F\u7531 Spring \u793E\u533A\u63D0\u4F9B\u7684\uFF0C\u76EE\u524D\u6B63\u5728\u5FEB\u901F\u8FED\u4EE3\u7684\u8FC7\u7A0B\u5F53\u4E2D\uFF0C\u4E0D\u540C\u7248\u672C\u4E4B\u95F4\u7684\u5DEE\u8DDD\u975E\u5E38\u5927\uFF0C\u751A\u81F3\u57FA\u7840\u7684\u5E95\u5C42\u5BF9\u8C61\u90FD\u4F1A\u7ECF\u5E38\u6709\u6539\u52A8\u3002",paraId:106,tocIndex:12},{value:"\u4F8B\u5982\u5982\u679C\u4F7F\u7528 rocketmq-spring-boot-starter:2.0.4 \u7248\u672C\u5F00\u53D1\u7684\u4EE3\u7801\uFF0C\u5347\u7EA7\u5230\u76EE\u524D\u6700\u65B0\u7684 rocketmq-spring-boot-starter:2.1.1 \u540E\uFF0C\u57FA\u672C\u5C31\u7528\u4E0D\u4E86\u4E86",paraId:107,tocIndex:12},{value:`<dependencies>
        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-spring-boot-starter</artifactId>
            <version>2.1.1</version>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>org.springframework</groupId>
                    <artifactId>spring-core</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>org.springframework</groupId>
                    <artifactId>spring-webmvc</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.1.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.9.2</version>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.9.2</version>
        </dependency>
    </dependencies>
`,paraId:108,tocIndex:12},{value:"\u4EE5 SpringBoot \u7684\u65B9\u5F0F\uFF0C\u5FEB\u901F\u521B\u5EFA\u4E00\u4E2A\u7B80\u5355\u7684 Demo",paraId:109,tocIndex:12},{value:"\u542F\u52A8\u7C7B\uFF1A",paraId:110,tocIndex:12},{value:`@SpringBootApplication
public class RocketMQScApplication {

    public static void main(String[] args) {
        SpringApplication.run(RocketMQScApplication.class,args);
    }
}
`,paraId:111,tocIndex:12},{value:"\u914D\u7F6E\u6587\u4EF6 application.properties",paraId:112,tocIndex:12},{value:`#NameServer\u5730\u5740
rocketmq.name-server=192.168.232.128:9876
#\u9ED8\u8BA4\u7684\u6D88\u606F\u751F\u4EA7\u8005\u7EC4
rocketmq.producer.group=springBootGroup
`,paraId:113,tocIndex:12},{value:"\u6D88\u606F\u751F\u4EA7\u8005",paraId:114,tocIndex:12},{value:`@Component
public class SpringProducer {

    @Resource
    private RocketMQTemplate rocketMQTemplate;
    
 	//\u53D1\u9001\u666E\u901A\u6D88\u606F\u7684\u793A\u4F8B
    public void sendMessage(String topic,String msg){
        this.rocketMQTemplate.convertAndSend(topic,msg);
    }
    
	 //\u53D1\u9001\u4E8B\u52A1\u6D88\u606F\u7684\u793A\u4F8B
    public void sendMessageInTransaction(String topic,String msg) throws InterruptedException {
        String[] tags = new String[] {"TagA", "TagB", "TagC", "TagD", "TagE"};
        for (int i = 0; i < 10; i++) {
            Message<String> message = MessageBuilder.withPayload(msg).build();
            String destination =topic+":"+tags[i % tags.length];
            SendResult sendResult = rocketMQTemplate.sendMessageInTransaction(destination, message,destination);
            System.out.printf("%s%n", sendResult);
            Thread.sleep(10);
        }
    }
}
`,paraId:115,tocIndex:12},{value:"\u6D88\u606F\u6D88\u8D39\u8005",paraId:116,tocIndex:12},{value:`@Component
@RocketMQMessageListener(consumerGroup = "MyConsumerGroup", topic = "TestTopic")
public class SpringConsumer implements RocketMQListener<String> {
    @Override
    public void onMessage(String message) {
        System.out.println("Received message : "+ message);
    }
}
`,paraId:117,tocIndex:12},{value:"SpringBoot \u96C6\u6210 RocketMQ\uFF0C\u6D88\u8D39\u8005\u90E8\u5206\u7684\u6838\u5FC3\u5C31\u5728\u8FD9\u4E2A @RocketMQMessageListener \u6CE8\u89E3\u4E0A\u3002\u6240\u6709\u6D88\u8D39\u8005\u7684\u6838\u5FC3\u529F\u80FD\u4E5F\u90FD\u4F1A\u96C6\u6210\u5230\u8FD9\u4E2A\u6CE8\u89E3\u4E2D\u3002\u6240\u4EE5\u6211\u4EEC\u8FD8\u8981\u6CE8\u610F\u4E0B\u8FD9\u4E2A\u6CE8\u89E3\u91CC\u9762\u7684\u5C5E\u6027\uFF1A",paraId:118,tocIndex:12},{value:"\u4F8B\u5982\uFF1A\u6D88\u606F\u8FC7\u6EE4\u53EF\u4EE5\u7531\u91CC\u9762\u7684 selectorType \u5C5E\u6027\u548C selectorExpression \u6765\u5B9A\u5236",paraId:119,tocIndex:12},{value:"\u6D88\u606F\u6709\u5E8F\u6D88\u8D39\u8FD8\u662F\u5E76\u53D1\u6D88\u8D39\u5219\u7531 consumeMode \u5C5E\u6027\u5B9A\u5236\u3002",paraId:120,tocIndex:12},{value:"\u6D88\u8D39\u8005\u662F\u96C6\u7FA4\u90E8\u7F72\u8FD8\u662F\u5E7F\u64AD\u90E8\u7F72\u7531 messageModel \u5C5E\u6027\u5B9A\u5236\u3002",paraId:121,tocIndex:12},{value:"\u5173\u4E8E\u4E8B\u52A1\u6D88\u606F\uFF0C\u8FD8\u9700\u8981\u914D\u7F6E\u4E00\u4E2A\u4E8B\u52A1\u6D88\u606F\u76D1\u542C\u5668\uFF1A",paraId:122,tocIndex:12},{value:`@RocketMQTransactionListener(rocketMQTemplateBeanName = "rocketMQTemplate")
public class MyTransactionImpl implements RocketMQLocalTransactionListener {

    private ConcurrentHashMap<Object, String> localTrans = new ConcurrentHashMap<>();
    @Override
    public RocketMQLocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        Object id = msg.getHeaders().get("id");
        String destination = arg.toString();
        localTrans.put(id,destination);
        org.apache.rocketmq.common.message.Message message = RocketMQUtil.convertToRocketMessage(new StringMessageConverter(),"UTF-8",destination, msg);
        String tags = message.getTags();
        if(StringUtils.contains(tags,"TagA")){
            return RocketMQLocalTransactionState.COMMIT;
        }else if(StringUtils.contains(tags,"TagB")){
            return RocketMQLocalTransactionState.ROLLBACK;
        }else{
            return RocketMQLocalTransactionState.UNKNOWN;
        }
    }

    @Override
    public RocketMQLocalTransactionState checkLocalTransaction(Message msg) {
        //SpringBoot\u7684\u6D88\u606F\u5BF9\u8C61\u4E2D\uFF0C\u5E76\u6CA1\u6709transactionId\u8FD9\u4E2A\u5C5E\u6027\u3002\u8DDF\u539F\u751FAPI\u4E0D\u4E00\u6837\u3002
		//String destination = localTrans.get(msg.getTransactionId());
        return RocketMQLocalTransactionState.COMMIT;
    }
}
`,paraId:123,tocIndex:12},{value:"\u5BF9\u4E8E\u5176\u4ED6\u7684\u6D88\u606F\u7C7B\u578B\uFF0C\u5177\u4F53\u53EF\u4EE5\u53C2\u89C1\u6E90\u7801\u4E2D\u7684 junit \u6D4B\u8BD5\u6848\u4F8B\u3002",paraId:124,tocIndex:12},{value:"\u603B\u7ED3\uFF1A",paraId:125,tocIndex:12},{value:"SpringBoot \u5F15\u5165",paraId:126,tocIndex:12},{value:" org.apache.rocketmq:rocketmq-spring-boot-starter",paraId:126,tocIndex:12},{value:" \u4F9D\u8D56\u540E\uFF0C\u5C31\u53EF\u4EE5\u901A\u8FC7\u5185\u7F6E\u7684 ",paraId:126,tocIndex:12},{value:"RocketMQTemplate",paraId:126,tocIndex:12},{value:" \u6765\u4E0E RocketMQ \u4EA4\u4E92\u3002\u76F8\u5173\u5C5E\u6027\u90FD\u4EE5 rockemq. \u5F00\u5934\u3002\u5177\u4F53\u6240\u6709\u7684\u914D\u7F6E\u4FE1\u606F\u53EF\u4EE5\u53C2\u89C1 ",paraId:126,tocIndex:12},{value:"org.apache.rocketmq.spring.autoconfigure.RocketMQProperties",paraId:126,tocIndex:12},{value:" \u8FD9\u4E2A\u7C7B\u3002",paraId:126,tocIndex:12},{value:"SpringBoot \u4F9D\u8D56\u4E2D\u7684 Message \u5BF9\u8C61\u548C RocketMQ-client \u4E2D\u7684 Message \u5BF9\u8C61\u662F\u4E24\u4E2A\u4E0D\u540C\u7684\u5BF9\u8C61",paraId:126,tocIndex:12},{value:"\uFF0C\u8FD9\u5728\u4F7F\u7528\u7684\u65F6\u5019\u8981\u975E\u5E38\u5BB9\u6613\u5F04\u9519\u3002\u4F8B\u5982 RocketMQ-client \u4E2D\u7684 Message \u91CC\u7684 TAG \u5C5E\u6027\uFF0C\u5728 SpringBoot \u4F9D\u8D56\u4E2D\u7684 Message \u4E2D\u5C31\u6CA1\u6709\u3002",paraId:126,tocIndex:12},{value:"Tag \u5C5E\u6027\u88AB\u79FB\u5230\u4E86\u53D1\u9001\u76EE\u6807\u4E2D\uFF0C\u4E0E Topic \u4E00\u8D77\uFF0C\u4EE5 Topic:Tag \u7684\u65B9\u5F0F\u6307\u5B9A",paraId:126,tocIndex:12},{value:"\u3002",paraId:126,tocIndex:12},{value:"\u4E00\u5B9A\u8981\u6CE8\u610F\u7248\u672C\u3002rocketmq-spring-boot-starter \u7684\u66F4\u65B0\u8FDB\u5EA6\u4E00\u822C\u90FD\u4F1A\u7565\u6162\u4E8E RocketMQ \u7684\u7248\u672C\u66F4\u65B0\uFF0C\u5E76\u4E14\u7248\u672C\u4E0D\u540C\u4F1A\u5F15\u53D1\u5F88\u591A\u5947\u602A\u7684\u95EE\u9898\u3002apache \u6709\u4E00\u4E2A\u5B98\u65B9\u7684 rocketmq-spring \u793A\u4F8B\uFF0C\u5730\u5740\uFF1A",paraId:126,tocIndex:12},{value:"https://github.com/apache/rocketmq-spring.git",paraId:126,tocIndex:12},{value:" \u4EE5\u540E\u5982\u679C\u7248\u672C\u66F4\u65B0\u4E86\uFF0C\u53C2\u8003\u4E0B\u8FD9\u4E2A\u793A\u4F8B\u4EE3\u7801\u3002",paraId:126,tocIndex:12},{value:"SpringCloudStream \u662F Spring \u793E\u533A\u63D0\u4F9B\u7684\u4E00\u4E2A\u7EDF\u4E00\u7684\u6D88\u606F\u9A71\u52A8\u6846\u67B6\uFF0C",paraId:127,tocIndex:13},{value:"\u76EE\u7684\u662F\u60F3\u8981\u4EE5\u4E00\u4E2A\u7EDF\u4E00\u7684\u7F16\u7A0B\u6A21\u578B\u6765\u5BF9\u63A5\u6240\u6709\u7684 MQ \u6D88\u606F\u4E2D\u95F4\u4EF6\u4EA7\u54C1",paraId:127,tocIndex:13},{value:"\u521B\u5EFA Maven \u5DE5\u7A0B\uFF0C\u5F15\u5165\u4F9D\u8D56\uFF1A",paraId:128,tocIndex:13},{value:`<dependencies>
  <dependency>
   <groupId>org.apache.rocketmq</groupId>
   <artifactId>rocketmq-client</artifactId>
   <version>4.7.1</version>
  </dependency>
  <dependency>
   <groupId>org.apache.rocketmq</groupId>
   <artifactId>rocketmq-acl</artifactId>
   <version>4.7.1</version>
  </dependency>
  <dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-starter-stream-rocketmq</artifactId>
   <version>2.2.3.RELEASE</version>
   <exclusions>
    <exclusion>
     <groupId>org.apache.rocketmq</groupId>
     <artifactId>rocketmq-client</artifactId>
    </exclusion>
    <exclusion>
     <groupId>org.apache.rocketmq</groupId>
     <artifactId>rocketmq-acl</artifactId>
    </exclusion>
   </exclusions>
  </dependency>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
   <version>2.3.3.RELEASE</version>
  </dependency>
 </dependencies>
`,paraId:129,tocIndex:13},{value:"\u5E94\u7528\u542F\u52A8\u7C7B\uFF1A",paraId:130,tocIndex:13},{value:`@EnableBinding({Source.class, Sink.class})
@SpringBootApplication
public class ScRocketMQApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScRocketMQApplication.class,args);
    }
}
`,paraId:131,tocIndex:13},{value:"\u6CE8\u610F\u8FD9\u4E2A @EnableBinding ({Source.class, Sink.class}) \u6CE8\u89E3\uFF0C\u8FD9\u662F SpringCloudStream \u5F15\u5165\u7684 Binder \u914D\u7F6E\u3002",paraId:132,tocIndex:13},{value:"\u7136\u540E\u589E\u52A0\u914D\u7F6E\u6587\u4EF6 application.properties",paraId:133,tocIndex:13},{value:`#ScStream\u901A\u7528\u7684\u914D\u7F6E\u4EE5spring.cloud.stream\u5F00\u5934
spring.cloud.stream.bindings.input.destination=TestTopic
spring.cloud.stream.bindings.input.group=scGroup
spring.cloud.stream.bindings.output.destination=TestTopic
#rocketMQ\u7684\u4E2A\u6027\u5316\u914D\u7F6E\u4EE5spring.cloud.stream.rocketmq\u5F00\u5934
#spring.cloud.stream.rocketmq.binder.name-server=192.168.232.128:9876;192.168.232.129:9876;192.168.232.130:9876
spring.cloud.stream.rocketmq.binder.name-server=192.168.232.128:9876
`,paraId:134,tocIndex:13},{value:"SpringCloudStream \u4E2D\uFF0C\u4E00\u4E2A binding \u5BF9\u5E94\u4E00\u4E2A\u6D88\u606F\u901A\u9053\u3002\u8FD9\u5176\u4E2D\u914D\u7F6E\u7684 input\uFF0C\u662F\u5728 Sink.class \u4E2D\u5B9A\u4E49\u7684\uFF0C\u5BF9\u5E94\u4E00\u4E2A\u6D88\u606F\u6D88\u8D39\u8005\u3002\u800C output\uFF0C\u662F\u5728 Source.class \u4E2D\u5B9A\u4E49\u7684\uFF0C\u5BF9\u5E94\u4E00\u4E2A\u6D88\u606F\u751F\u4EA7\u8005\u3002",paraId:135,tocIndex:13},{value:"\u7136\u540E\u5C31\u53EF\u4EE5\u589E\u52A0\u6D88\u606F\u6D88\u8D39\u8005\uFF1A",paraId:136,tocIndex:13},{value:`@Component
public class ScConsumer {
    @StreamListener(Sink.INPUT)
    public void onMessage(String messsage){
        System.out.println("received message:"+messsage+" from binding:"+ Sink.INPUT);
    }
}
`,paraId:137,tocIndex:13},{value:"\u6D88\u606F\u751F\u4EA7\u8005\uFF1A",paraId:138,tocIndex:13},{value:`@Component
public class ScProducer {

    @Resource
    private Source source;

    public void sendMessage(String msg){
        Map<String, Object> headers = new HashMap<>();
        headers.put(MessageConst.PROPERTY_TAGS, "testTag");
        MessageHeaders messageHeaders = new MessageHeaders(headers);
        Message<String> message = MessageBuilder.createMessage(msg, messageHeaders);
        this.source.output().send(message);
    }
}
`,paraId:139,tocIndex:13},{value:"\u6700\u540E\u589E\u52A0\u4E00\u4E2A Controller \u7C7B\u7528\u4E8E\u6D4B\u8BD5\uFF1A",paraId:140,tocIndex:13},{value:`@RestController
@RequestMapping("/MQTest")
public class MQTestController {

    @Resource
    private ScProducer producer;
    
    @RequestMapping("/sendMessage")
    public String sendMessage(String message){
        producer.sendMessage(message);
        return "\u6D88\u606F\u53D1\u9001\u5B8C\u6210";
    }
}
`,paraId:141,tocIndex:13},{value:"\u542F\u52A8\u5E94\u7528\u540E\uFF0C\u5C31\u53EF\u4EE5\u8BBF\u95EE ",paraId:142,tocIndex:13},{value:"http://localhost:8080/MQTest/sendMessage?message=123\uFF0C\u7ED9",paraId:142,tocIndex:13},{value:" RocketMQ \u53D1\u9001\u4E00\u6761\u6D88\u606F\u5230 TestTopic\uFF0C\u5E76\u5728 ScConsumer \u4E2D\u6D88\u8D39\u5230\u4E86\u3002",paraId:142,tocIndex:13},{value:"\u603B\u7ED3",paraId:143,tocIndex:13},{value:"\u5173\u4E8E SpringCloudStream\uFF0C\u8FD9\u662F\u4E00\u5957\u51E0\u4E4E\u901A\u7528\u7684\u6D88\u606F\u4E2D\u95F4\u4EF6\u7F16\u7A0B\u6846\u67B6",paraId:144,tocIndex:13},{value:"\uFF0C\u4F8B\u5982\u4ECE\u5BF9\u63A5 RocketMQ \u6362\u5230\u5BF9\u63A5 Kafka\uFF0C\u4E1A\u52A1\u4EE3\u7801\u51E0\u4E4E\u4E0D\u9700\u8981\u52A8\uFF0C\u53EA\u9700\u8981\u66F4\u6362 pom \u4F9D\u8D56\u5E76\u4E14\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6\u5C31\u884C\u4E86\u3002",paraId:144,tocIndex:13},{value:"\u4F46\u662F\uFF0C\u7531\u4E8E\u5404\u4E2A MQ \u4EA7\u54C1\u90FD\u6709\u81EA\u5DF1\u7684\u4E1A\u52A1\u6A21\u578B\uFF0C\u5DEE\u8DDD\u975E\u5E38\u5927\uFF0C\u6240\u4EE5\u4F7F\u7528\u4F7F\u7528 SpringCloudStream \u65F6\u8981\u6CE8\u610F\u4E1A\u52A1\u6A21\u578B\u8F6C\u6362\u3002\u5E76\u4E14\u5728\u5B9E\u9645\u4F7F\u7528\u4E2D\uFF0C\u8981\u975E\u5E38\u6CE8\u610F\u5404\u4E2A MQ \u7684\u4E2A\u6027\u5316\u914D\u7F6E\u5C5E\u6027\u3002\u4F8B\u5982 RocketMQ \u7684\u4E2A\u6027\u5316\u5C5E\u6027\u90FD\u662F\u4EE5 ",paraId:145,tocIndex:13},{value:"spring.cloud.stream.rocketmq",paraId:145,tocIndex:13},{value:" \u5F00\u5934\uFF0C\u53EA\u6709\u901A\u8FC7\u8FD9\u4E9B\u5C5E\u6027\u624D\u80FD\u7528\u4E0A RocketMQ \u7684\u5EF6\u8FDF\u6D88\u606F\u3001\u6392\u5E8F\u6D88\u606F\u3001\u4E8B\u52A1\u6D88\u606F\u7B49\u4E2A\u6027\u5316\u529F\u80FD\u3002",paraId:145,tocIndex:13},{value:"**SpringCloudStream \u662F Spring \u793E\u533A\u63D0\u4F9B\u7684\u4E00\u5957\u7EDF\u4E00\u6846\u67B6\uFF0C\u4F46\u662F\u5B98\u65B9\u76EE\u524D\u53EA\u5C01\u88C5\u4E86 kafka\u3001kafka Stream\u3001RabbitMQ \u7684\u5177\u4F53\u4F9D\u8D56\u3002**\u800C RocketMQ \u7684\u4F9D\u8D56\u662F\u4EA4\u7531\u5382\u5546\u81EA\u5DF1\u7EF4\u62A4\u7684\uFF0C\u4E5F\u5C31\u662F\u7531\u963F\u91CC\u5DF4\u5DF4\u81EA\u5DF1\u6765\u7EF4\u62A4\u3002\u8FD9\u4E2A\u7EF4\u62A4\u529B\u5EA6\u663E\u7136\u662F\u6709\u4E0D\u5C0F\u5DEE\u8DDD\u7684\u3002\u6240\u4EE5\u4E00\u65B9\u9762\u53EF\u4EE5\u770B\u5230\u4E4B\u524D\u5728\u4F7F\u7528 SpringBoot \u65F6\u7740\u91CD\u5F3A\u8C03\u7684\u7248\u672C\u95EE\u9898\uFF0C\u5728\u4F7F\u7528 SpringCloudStream \u4E2D\u88AB\u653E\u5927\u4E86\u5F88\u591A\u3002spring-cloud-starter-stream-rocketmq \u76EE\u524D\u6700\u65B0\u7684 2.2.3.RELEASE \u7248\u672C\u4E2D\u5305\u542B\u7684 rocketmq-client \u7248\u672C\u8FD8\u662F 4.4.0\u3002\u8FD9\u4E2A\u5DEE\u8DDD\u5C31\u975E\u5E38\u5927\u4E86\u3002\u53E6\u4E00\u65B9\u9762\uFF0CRocketMQ \u8FD9\u5E2E\u5927\u795E\u4E0D\u5C51\u4E8E\u5199\u6587\u6863\u7684\u95EE\u9898\u4E5F\u7279\u522B\u4E25\u91CD\uFF0CSpringCloudStream \u4E2D\u5173\u4E8E RocketMQ \u7684\u4E2A\u6027\u5316\u914D\u7F6E\u51E0\u4E4E\u5F88\u96BE\u627E\u5230\u5B8C\u6574\u7684\u6587\u6863\u3002",paraId:146,tocIndex:13},{value:"\u603B\u4E4B\uFF0C",paraId:147,tocIndex:13},{value:"\u5BF9\u4E8E RocketMQ \u6765\u8BF4\uFF0CSpringCloudStream \u76EE\u524D\u6765\u8BF4\u8FD8\u5E76\u4E0D\u662F\u4E00\u4E2A\u975E\u5E38\u597D\u7684\u96C6\u6210\u65B9\u6848",paraId:147,tocIndex:13},{value:"\u3002\u8FD9\u65B9\u9762\u8DDF kafka \u548C Rabbit \u8FD8\u6CA1\u6CD5\u6BD4\u3002",paraId:147,tocIndex:13}]}}]);

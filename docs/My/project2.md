---
group: 1.0.0
title: proxy-core 
order: 2
---

# proxy-core
一些公共的代码，配置等

## core

### Constants

常量和属性键

```java
public interface Constants {
	//定义了一个 Netty 通道的属性键，用于存储下一个通道
    AttributeKey<Channel> NEXT_CHANNEL = AttributeKey.newInstance("nxt_channel");
	//定义了一个字符串类型的属性键，用于存储用户ID
    AttributeKey<String> USER_ID = AttributeKey.newInstance("user_id");
	//定义了一个字符串类型的属性键，用于存储客户端密钥
    AttributeKey<String> CLIENT_KEY = AttributeKey.newInstance("client_key");
	
    //定义了数据包中头部、类型、序列号和信息长度的大小
    int HEADER_SIZE = 4;
    int TYPE_SIZE = 1;
    int SERIAL_NUMBER_SIZE = 8;
    int INFO_LENGTH_SIZE = 4;
	
    //定义了一些代理数据类型的名称常量，包括心跳、认证、连接、断开连接、传输和错误
    interface ProxyDataTypeName {
        String HEARTBEAT = "HEARTBEAT";
        String AUTH = "AUTH";
        String CONNECT = "CONNECT";
        String DISCONNECT = "DISCONNECT";
        String TRANSFER = "TRANSFER";
        String ERROR = "ERROR";
    }
}
```



### ProxyMessageHandler

代理消息接口，内容为空

实现了`Handler<ChannelHandlerContext, ProxyMessage>`



### ExceptionEnum

枚举类

```java
@Getter
@AllArgsConstructor
public enum ExceptionEnum {

    AUTH_FAILED(1, "认证失败");

    private Integer code;
    private String msg;
}
```



### ProxyDataTypeEnum

事件枚举类，并且将type和对应枚举类型关联

```java
@Getter
@AllArgsConstructor
public enum ProxyDataTypeEnum {
    HEARTBEAT(0x01, Constants.ProxyDataTypeName.HEARTBEAT, "心跳"),
    AUTH(0x02, Constants.ProxyDataTypeName.AUTH,"认证"),
    CONNECT(0x03, Constants.ProxyDataTypeName.CONNECT,"连接"),
    DISCONNECT(0x04, Constants.ProxyDataTypeName.DISCONNECT,"断开连接"),
    TRANSFER(0x05, Constants.ProxyDataTypeName.TRANSFER,"数据传输"),
    ERROR(0x06, Constants.ProxyDataTypeName.ERROR,"异常");

    ////cache将数据类型的整数值与对应的枚举常量进行映射
    private static Map<Integer,ProxyDataTypeEnum> cache = Stream.of(values()).collect(Collectors.toMap(ProxyDataTypeEnum::getType, Function.identity()));

    private int type;
    private String name;
    private String desc;

    public static ProxyDataTypeEnum of(Integer type) {
       return cache.get(type);
    }
}
```



### ProxyClientConfig

客户端配置信息

```java
@Data
public class ProxyClientConfig {
    //代理客户端的环境信息
    private String environment;
    //客户端密钥，用于认证和授权
    private String clientKey;
    //代理配置列表，包含了多个代理信息
    private List<Proxy> proxy;

    @Data
    public static class Proxy {
        //代理服务器端口
       private Integer serverPort;
        //客户端信息
       private String clientInfo;
    }
}
```



### IdleCheckHandler

用于在 Netty 管道中检测空闲状态，并执行相应的操作

```java
public class IdleCheckHandler extends IdleStateHandler {

    //分别表示读空闲时间、写空闲时间和所有类型空闲时间的阈值
    public IdleCheckHandler(int readerIdleTimeSeconds, int writerIdleTimeSeconds, int allIdleTimeSeconds) {
        //调用父类 IdleStateHandler 的构造函数，并传入这三个参数，初始化空闲状态处理器
        super(readerIdleTimeSeconds, writerIdleTimeSeconds, allIdleTimeSeconds);
    }

    //重写了父类的 channelIdle() 方法，用于处理管道的空闲事件。
    @Override
    protected void channelIdle(ChannelHandlerContext ctx, IdleStateEvent evt) throws Exception {
        //在方法中，首先判断空闲状态事件的类型，根据不同类型执行不同的操作。
        if (IdleStateEvent.FIRST_WRITER_IDLE_STATE_EVENT == evt) {
            //如果是第一次写空闲（FIRST_WRITER_IDLE_STATE_EVENT），则向管道写入一个心跳消息（通过 ProxyMessage.buildHeartbeatMessage() 方法构建），以保持连接的活跃状态。
            ctx.channel().writeAndFlush(ProxyMessage.buildHeartbeatMessage());
        } else if (IdleStateEvent.FIRST_READER_IDLE_STATE_EVENT == evt) {
            //如果是第一次读空闲（FIRST_READER_IDLE_STATE_EVENT），则关闭管道（通过 ctx.channel().close() 方法关闭），断开连接。
            ctx.channel().close();
        }
        //最后调用父类的 channelIdle() 方法，继续执行其他可能的空闲处理逻辑,见netty处理空闲
        super.channelIdle(ctx, evt);
    }
}
```



### ProxyMessageDecoder,ProxyMessageEncoder

用于将 ProxyMessage 对象编解码



### ProxyMessage

这个项目中的消息对象的定义，用于在网络通信中传递消息，允许链式调用

```java
@Accessors(chain = true)
@Data
public class ProxyMessage {

	//心跳消息
    public static final byte TYPE_HEARTBEAT = 0x01;

	//认证消息，检测clientKey是否正确
    public static final byte TYPE_AUTH = 0x02;

	//代理后端服务器建立连接消息
    public static final byte TYPE_CONNECT = 0x03;

	//代理后端服务器断开连接消息
    public static final byte TYPE_DISCONNECT = 0x04;

	//代理数据传输
    public static final byte TYPE_TRANSFER = 0x05;

	//通用异常信息
    public static final byte TYPE_ERROR = 0x06;

	//消息类型
    private byte type;

	//消息流水号
    private long serialNumber;

	//消息命令请求信息
    private String info;

	//消息传输数据
    private byte[] data;

    @Override
    public String toString() {
        return "ProxyMessage [type=" + type + ", serialNumber=" + serialNumber + ", info=" + info + ", data=" + Arrays.toString(data) + "]";
    }

    public static ProxyMessage create() {
        return new ProxyMessage();
    }

    public static ProxyMessage buildHeartbeatMessage() {
        return create().setType(TYPE_HEARTBEAT);
    }

	//创建认证消息
    public static ProxyMessage buildAuthMessage(String info) {
        return create().setType(TYPE_AUTH)
            .setInfo(info);
    }

    public static ProxyMessage buildConnectMessage(String info) {
        return create().setType(TYPE_CONNECT)
            .setInfo(info);
    }

    public static ProxyMessage buildDisconnectMessage(String info) {
        return create().setType(TYPE_DISCONNECT)
            .setInfo(info);
    }

    public static ProxyMessage buildTransferMessage(String info, byte[] data) {
        return create().setType(TYPE_TRANSFER)
            .setInfo(info)
            .setData(data);
    }

    public static ProxyMessage buildErrMessage(ExceptionEnum exceptionEnum, String info) {
        JSONObject data = new JSONObject();
        data.put("code", exceptionEnum.getCode());
        data.put("msg", exceptionEnum.getMsg());
        data.put("info", info);
        return create().setType(TYPE_ERROR)
            .setInfo(data.toJSONString());
    }

    // 一个构建错误消息的方法，可以指定异常信息和其他相关信息，将其封装成一个错误消息对象返回
    public static ProxyMessage buildErrMessage(ExceptionEnum exceptionEnum) {
       return buildErrMessage(exceptionEnum, null);
    }
}
```


---
group: 1.0.0
title: proxy-server
order: 3
---

# proxy-server

## ProxyClient

启动类

```java
@NeutrinoApplication
public class ProxyClient {

    public static void main(String[] args) {
       NeutrinoLauncher.run(ProxyClient.class, args);
    }
}
```

## config.proxyConfig

配置代理的类，从yaml配置文件中获取对应属性

```java
@Data
@Configuration(prefix = "proxy")
public class ProxyConfig {
    public static ProxyConfig instance;
    //代理的协议配置信息
    private Protocol protocol;
    //代理客户端的配置信息
    private Client client;
    //代理客户端配置
    private ProxyClientConfig clientConfig;

    @Data
    public static class Protocol {
       @Value("max-frame-length")
       private Integer maxFrameLength;
       @Value("length-field-offset")
       private Integer lengthFieldOffset;
       @Value("length-field-length")
       private Integer lengthFieldLength;
       @Value("initial-bytes-to-strip")
       private Integer initialBytesToStrip;
       @Value("length-adjustment")
       private Integer lengthAdjustment;
       @Value("read-idle-time")
       private Integer readIdleTime;
       @Value("write-idle-time")
       private Integer writeIdleTime;
       @Value("all-idle-time-seconds")
       private Integer allIdleTimeSeconds;
    }

    @Data
    public static class Client {
       @Value("key-store-password")
       private String keyStorePassword;
       @Value("jks-path")
       private String jksPath;
       @Value("server-ip")
       private String serverIp;
       @Value("server-port")
       private Integer serverPort;
       @Value("ssl-enable")
       private Boolean sslEnable;
    }

    @Init
    public void init() {
       instance = this;
    }
}
```



## util.ClientChannelMannager

管理客户端与代理服务器之间的 Channel

先解释下**AttributeKey**

> `AttributeKey` 是 Netty 中的一个类，用于在 `AttributeMap` 中存储和检索属性的键。在 Netty 中，`ChannelHandlerContext`、`Channel` 等对象都实现了 `AttributeMap` 接口，因此可以通过 `AttributeKey` 在这些对象上绑定和获取属性值。
>
> 具体来说，`AttributeKey` 充当了属性的键，通过给定的键（即 `AttributeKey` 对象）可以在 `AttributeMap` 中存储和检索对应的属性值。每个 `AttributeKey` 对象都是唯一的，因此不同的属性使用不同的 `AttributeKey`。
>
> 在给定的 `AttributeMap` 中，可以通过 `AttributeKey` 绑定和获取属性值，例如：
>
> ```
> AttributeKey<String> key = AttributeKey.valueOf("myKey");
> channel.attr(key).set("myValue");
> String value = channel.attr(key).get();
> ```
>
> 这样，就可以将键值对（key-value pair）存储在 `AttributeMap` 中，并在需要时检索出来。
>
> 在上面代码片段中，`AttributeKey` 的作用就是创建了一个名为 "myKey" 的属性键，用于在 `Channel` 对象的属性中存储和检索字符串类型的属性值。

```java
public class ClientChannelMannager {

    // 定义两个 Channel 属性的 AttributeKey
    private static final AttributeKey<Boolean> USER_CHANNEL_WRITEABLE = AttributeKey.newInstance("user_channel_writeable");
    private static final AttributeKey<Boolean> CLIENT_CHANNEL_WRITEABLE = AttributeKey.newInstance("client_channel_writeable");

    // 最大连接池大小
    private static final int MAX_POOL_SIZE = 100;
	
    // 真实服务器的 Channel 映射表
    private static Map<String, Channel> realServerChannels = new ConcurrentHashMap<String, Channel>();

    // 代理 Channel 连接池
    private static ConcurrentLinkedQueue<Channel> proxyChannelPool = new ConcurrentLinkedQueue<Channel>();

    // 命令 Channel
    private static volatile Channel cmdChannel;

    // 获取代理 Channel
    public static void borrowProxyChanel(Bootstrap bootstrap, final ProxyChannelBorrowListener borrowListener) {
        // 从连接池中获取代理 Channel
        Channel channel = proxyChannelPool.poll();
        if (channel != null) {
            borrowListener.success(channel);
            return;
        }
		// 如果连接池中没有可用的代理 Channel，则创建新的
        bootstrap.connect(ProxyConfig.instance.getClient().getServerIp(), ProxyConfig.instance.getClient().getServerPort()).addListener(new ChannelFutureListener() {

            @Override
            public void operationComplete(ChannelFuture future) throws Exception {
                //判断连接操作是否成功
                if (future.isSuccess()) {
                    //如果成功，则调用 borrowListener.success(future.channel()) 来通知 borrowListener 连接成功，并传递连接的 Channel 给 borrowListener
                    borrowListener.success(future.channel());
                } else {
                    //连接操作失败，则调用 borrowListener.error(future.cause()) 来通知 borrowListener 连接失败，并传递连接失败的原因给 borrowListener
                    borrowListener.error(future.cause());
                }
            }
        });
    }

    // 归还代理 Channel
    public static void returnProxyChanel(Channel proxyChanel) {
        //// 如果连接池中的代理 Channel 数量已达到最大值，则关闭当前代理 Channel
        if (proxyChannelPool.size() > MAX_POOL_SIZE) {
            proxyChanel.close();
        } else {
            //AUTO_READ 选项控制是否自动读取数据。将其设置为 true 表示当前 Channel 可以自动读取数据
            proxyChanel.config().setOption(ChannelOption.AUTO_READ, true);
            //移除了当前代理 Channel 中绑定的名为 Constants.NEXT_CHANNEL 的属性
            proxyChanel.attr(Constants.NEXT_CHANNEL).remove();
            //将当前代理 Channel 添加到连接池中
            proxyChannelPool.offer(proxyChanel);
        }
    }

     // 移除代理 Channel
    public static void removeProxyChanel(Channel proxyChanel) {
        proxyChannelPool.remove(proxyChanel);
    }

    // 设置命令 Channel
    public static void setCmdChannel(Channel cmdChannel) {
        ClientChannelMannager.cmdChannel = cmdChannel;
    }

    // 获取命令 Channel
    public static Channel getCmdChannel() {
        return cmdChannel;
    }

    // 设置真实服务器的用户 ID
    public static void setRealServerChannelUserId(Channel realServerChannel, String userId) {
        realServerChannel.attr(Constants.USER_ID).set(userId);
    }

    // 获取真实服务器的用户 ID
    public static String getRealServerChannelUserId(Channel realServerChannel) {
        return realServerChannel.attr(Constants.USER_ID).get();
    }

    // 根据用户 ID 获取真实服务器的 Channel
    public static Channel getRealServerChannel(String userId) {
        return realServerChannels.get(userId);
    }

    // 添加真实服务器的 Channel
    public static void addRealServerChannel(String userId, Channel realServerChannel) {
        realServerChannels.put(userId, realServerChannel);
    }

    // 移除真实服务器的 Channel
    public static Channel removeRealServerChannel(String userId) {
        return realServerChannels.remove(userId);
    }

    // 判断真实服务器的 Channel 是否可读
    public static boolean isRealServerReadable(Channel realServerChannel) {
        return realServerChannel.attr(CLIENT_CHANNEL_WRITEABLE).get() && realServerChannel.attr(USER_CHANNEL_WRITEABLE).get();
    }

    // 清空真实服务器的 Channel
    public static void clearRealServerChannels() {
        Iterator<Entry<String, Channel>> ite = realServerChannels.entrySet().iterator();
        while (ite.hasNext()) {
            Channel realServerChannel = ite.next().getValue();
            if (realServerChannel.isActive()) {
                realServerChannel.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
            }
        }
        realServerChannels.clear();
    }
}
```





## core

### ProxyChannelBorrowListener

接口：获取连接后对于成功和失败的处理







### ClientChannelHandler

处理与服务端之间的数据传输

```java
@Slf4j
public class ClientChannelHandler extends SimpleChannelInboundHandler<ProxyMessage> {

    //定义一个静态的消息调度器，根据消息类型分发处理接收到的消息
    private static volatile Dispatcher<ChannelHandlerContext, ProxyMessage> dispatcher;

    //构造函数，初始化消息调度器
	public ClientChannelHandler() {
        LockUtil.doubleCheckProcess(() -> null == dispatcher,
            ClientChannelHandler.class,
            () -> {
                dispatcher = new DefaultDispatcher<>("消息调度器",
                    BeanManager.getBeanListBySuperClass(ProxyMessageHandler.class),
                    proxyMessage -> ProxyDataTypeEnum.of((int)proxyMessage.getType()) == null ? null : ProxyDataTypeEnum.of((int)proxyMessage.getType()).getName());
            });
    }

    // 处理收到的消息
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ProxyMessage proxyMessage) throws Exception {
        log.info("recieved proxy message, type is {}", proxyMessage.getType());
        // 使用消息调度器分发消息给相应的处理器
        dispatcher.dispatch(ctx, proxyMessage);
    }

    // 处理 Channel 可写状态变更事件
    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
        // 设置真实服务器的 Channel 的自动读取状态与客户端 Channel 的可写状态保持一致
        Channel realServerChannel = ctx.channel().attr(Constants.NEXT_CHANNEL).get();
        if (realServerChannel != null) {
            realServerChannel.config().setOption(ChannelOption.AUTO_READ, ctx.channel().isWritable());
        }
        super.channelWritabilityChanged(ctx);
    }

    // 处理 Channel 连接断开事件
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        // 控制连接断开处理
        if (ClientChannelMannager.getCmdChannel() == ctx.channel()) {
            log.info("与服务端断开连接");
            ClientChannelMannager.setCmdChannel(null);
            ClientChannelMannager.clearRealServerChannels();
        } else {
            // 数据传输连接断开处理
            Channel realServerChannel = ctx.channel().attr(Constants.NEXT_CHANNEL).get();
            if (realServerChannel != null && realServerChannel.isActive()) {
                realServerChannel.close();
            }
        }
		// 移除代理 Channel
        ClientChannelMannager.removeProxyChanel(ctx.channel());
        super.channelInactive(ctx);
    }
    
    // 处理异常事件
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        super.exceptionCaught(ctx, cause);
        cause.printStackTrace();
    }
}
```



### ProxyClientRunner

```java
@Slf4j
@Component
public class ProxyClientRunner implements ApplicationRunner {
    //// 自动装配代理配置对象
    @Autowired
    private ProxyConfig proxyConfig;
    
    // 自动装配 Netty Bootstrap 对象，用于连接代理服务器
    @Autowired("bootstrap")
    private static Bootstrap bootstrap;
    
    // 自动装配 Netty Bootstrap 对象，用于连接真实服务器
    @Autowired("realServerBootstrap")
    private static Bootstrap realServerBootstrap;
    
    // Netty 的 NioEventLoopGroup 对象，用于处理 I/O 事件的多线程事件循环器
    private static NioEventLoopGroup workerGroup;

    @Override
    public void run(String[] args) {
       // 获取客户端配置信息
       ProxyClientConfig clientConfig = getClientConfig(args.length >= 1 ? args[args.length - 1] : null);
        // 设置代理配置对象的客户端配置信息
       proxyConfig.setClientConfig(clientConfig);
        // 连接代理服务器
       connectProxyServer();
    }

    /**
     * 连接代理服务器
     */
    private void connectProxyServer() {
       // 创建 NioEventLoopGroup 对象
       workerGroup = new NioEventLoopGroup();
       // 配置真实服务器的 Bootstrap 对象 ,netty常规配置
       realServerBootstrap.group(workerGroup); 
       realServerBootstrap.channel(NioSocketChannel.class);
       realServerBootstrap.handler(new ChannelInitializer<SocketChannel>() {

           // 初始化 ChannelHandler
          @Override
          public void initChannel(SocketChannel ch) throws Exception {
             ch.pipeline().addLast(new RealServerChannelHandler());
          }
       });

        // 配置代理服务器的 Bootstrap 对象
       bootstrap.group(workerGroup);
       bootstrap.channel(NioSocketChannel.class);
       bootstrap.handler(new ChannelInitializer<SocketChannel>() {

          @Override
          public void initChannel(SocketChannel ch) throws Exception {
              // 如果需要，添加 SSL 处理器
             if (proxyConfig.getClient().getSslEnable()) {
                ch.pipeline().addLast(createSslHandler());
             }
			// 添加代理消息编解码器
             ch.pipeline().addLast(new ProxyMessageDecoder(proxyConfig.getProtocol().getMaxFrameLength(),
                proxyConfig.getProtocol().getLengthFieldOffset(), proxyConfig.getProtocol().getLengthFieldLength(),
                proxyConfig.getProtocol().getLengthAdjustment(), proxyConfig.getProtocol().getInitialBytesToStrip()));
             ch.pipeline().addLast(new ProxyMessageEncoder());
             // 添加空闲检测处理器
             ch.pipeline().addLast(new IdleCheckHandler(proxyConfig.getProtocol().getReadIdleTime(), proxyConfig.getProtocol().getWriteIdleTime(), proxyConfig.getProtocol().getAllIdleTimeSeconds()));
              //处理与服务端之间的数据传输处理器
             ch.pipeline().addLast(new ClientChannelHandler());
          }
       });
        
        // 连接代理服务器
       bootstrap.connect(proxyConfig.getClient().getServerIp(), proxyConfig.getClient().getServerPort())
          .addListener(new ChannelFutureListener() {
			
             @Override
             public void operationComplete(ChannelFuture future) throws Exception {
                if (future.isSuccess()) {

                   // 连接成功，向服务器发送客户端认证信息（clientKey）
                   ClientChannelMannager.setCmdChannel(future.channel());
future.channel().writeAndFlush(ProxyMessage.buildAuthMessage(JSONObject.toJSONString(proxyConfig.getClientConfig())));
                   log.info("连接代理服务成功.");
                } else {
                   log.info("连接代理服务失败!");
                }
             }
          });
    }

    //如果需要时才添加的 SSL 处理器
    private ChannelHandler createSslHandler() {
       try {
          // 从文件路径获取 JKS 文件的输入流
          InputStream jksInputStream = FileUtil.getInputStream(proxyConfig.getClient().getJksPath());

          SSLContext clientContext = SSLContext.getInstance("TLS");
          final KeyStore ks = KeyStore.getInstance("JKS");
           // 加载 JKS 文件到 KeyStore 中
          ks.load(jksInputStream, proxyConfig.getClient().getKeyStorePassword().toCharArray());
           // 初始化 TrustManagerFactory，并使用 KeyStore 初始化
          TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
          tmf.init(ks);
           // 获取 TrustManager 数组
          TrustManager[] trustManagers = tmf.getTrustManagers();
           // 使用 TrustManager 初始化 SSLContext
          clientContext.init(null, trustManagers, null);

           // 创建 SSLEngine
          SSLEngine sslEngine = clientContext.createSSLEngine();
          sslEngine.setUseClientMode(true);

           // 返回 SSL 处理器
          return new SslHandler(sslEngine);
       } catch (Exception e) {
          log.error("创建SSL处理器失败", e);
          e.printStackTrace();
       }
       return null;
    }

    // 返回一个新的 Bootstrap 实例
    @Bean
    public Bootstrap bootstrap() {
       return new Bootstrap();
    }

    // 返回一个新的 Bootstrap 实例
    @Bean
    public Bootstrap realServerBootstrap() {
       return new Bootstrap();
    }

    private ProxyClientConfig getClientConfig(String path) {
        // 如果路径为空，则设置默认配置文件路径
       if (StringUtil.isEmpty(path)) {
          path = "./config.json";
       }
        // 读取配置文件内容
       String content = FileUtil.readContentAsString(path);
        // 如果内容为空，则打印错误信息并退出程序
       if (StringUtil.isEmpty(content)) {
          log.error("配置文件: {} 不存在或格式异常!", path);
          System.exit(0);
          return null;
       }
       try {
           // 解析配置文件内容为 ProxyClientConfig 对象
          ProxyClientConfig clientConfig = JSONObject.parseObject(content, ProxyClientConfig.class);
           // 如果客户端密钥或代理列表为空，则打印错误信息并退出程序
          if (StringUtil.isEmpty(clientConfig.getClientKey()) || CollectionUtil.isEmpty(clientConfig.getProxy())) {
             log.error("配置异常!");
             System.exit(0);
             return null;
          }
          return clientConfig;
       } catch (Exception e) {
          log.error("解析配置文件异常!", e);
       }
       return null;
    }
}
```



### RealServerChannelHandler

处理与被代理客户端的数据传输

```java
public class RealServerChannelHandler extends SimpleChannelInboundHandler<ByteBuf> {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ByteBuf buf) throws Exception {
        Channel realServerChannel = ctx.channel();
        Channel channel = realServerChannel.attr(Constants.NEXT_CHANNEL).get();
        if (channel == null) {
            // 代理客户端连接断开
            ctx.channel().close();
        } else {
            byte[] bytes = new byte[buf.readableBytes()];
            buf.readBytes(bytes);
            String userId = ClientChannelMannager.getRealServerChannelUserId(realServerChannel);
            channel.writeAndFlush(ProxyMessage.buildTransferMessage(userId, bytes));
        }
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        super.channelActive(ctx);
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        Channel realServerChannel = ctx.channel();
        String userId = ClientChannelMannager.getRealServerChannelUserId(realServerChannel);
        ClientChannelMannager.removeRealServerChannel(userId);
        Channel channel = realServerChannel.attr(Constants.NEXT_CHANNEL).get();
        if (channel != null) {
            channel.writeAndFlush(ProxyMessage.buildDisconnectMessage(userId));
        }

        super.channelInactive(ctx);
    }

    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
        Channel realServerChannel = ctx.channel();
        Channel proxyChannel = realServerChannel.attr(Constants.NEXT_CHANNEL).get();
        if (proxyChannel != null) {
            proxyChannel.config().setOption(ChannelOption.AUTO_READ, realServerChannel.isWritable());
        }

        super.channelWritabilityChanged(ctx);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        super.exceptionCaught(ctx, cause);
    }
}
```



## handler

各类事件的处理器，经由Dispacher分发过来处理

### ProxyMessageConnectHandler

处理连接事件的处理器，经由Dispacher分发过来处理

```java
@Match(type = Constants.ProxyDataTypeName.CONNECT)
@Component
public class ProxyMessageConnectHandler implements ProxyMessageHandler {
    // 用于连接代理服务器的 Bootstrap 对象
    @Autowired("bootstrap")
    private Bootstrap bootstrap;
    
    // 用于连接真实服务器的 Bootstrap 对象
    @Autowired("realServerBootstrap")
    private Bootstrap realServerBootstrap;

    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
		// 代理客户端与代理服务器的命令通道
       final Channel cmdChannel = ctx.channel();
        // 用户ID，从代理消息中获取
       final String userId = proxyMessage.getInfo();
        // 解析服务器信息，格式为 IP:Port
       String[] serverInfo = new String(proxyMessage.getData()).split(":");
       String ip = serverInfo[0];
       int port = Integer.parseInt(serverInfo[1]);
        
        // 连接真实服务器
       realServerBootstrap.connect(ip, port).addListener(new ChannelFutureListener() {

          @Override
          public void operationComplete(ChannelFuture future) throws Exception {

             // 连接后端服务器成功
             if (future.isSuccess()) {
                 // 获取真实服务器的 Channel
                final Channel realServerChannel = future.channel();
				// 关闭自动读取
                realServerChannel.config().setOption(ChannelOption.AUTO_READ, false);

                // 获取一个代理客户端的 Channel，并进行连接绑定
                ClientChannelMannager.borrowProxyChanel(bootstrap, new ProxyChannelBorrowListener() {

                   @Override
                   public void success(Channel channel) {
                      // 连接绑定
                      channel.attr(Constants.NEXT_CHANNEL).set(realServerChannel);
                      realServerChannel.attr(Constants.NEXT_CHANNEL).set(channel);

                      // 远程绑定,向代理客户端发送连接成功消息
                      channel.writeAndFlush(ProxyMessage.buildConnectMessage(userId + "@" + ProxyConfig.instance.getClientConfig().getClientKey()));

                      realServerChannel.config().setOption(ChannelOption.AUTO_READ, true);
                      ClientChannelMannager.addRealServerChannel(userId, realServerChannel);
                      ClientChannelMannager.setRealServerChannelUserId(realServerChannel, userId);
                   }

                    // 连接代理客户端失败，向代理服务器发送断开连接消息
                   @Override
                   public void error(Throwable cause) {
                      ProxyMessage proxyMessage = new ProxyMessage();
                      proxyMessage.setType(ProxyMessage.TYPE_DISCONNECT);
                      proxyMessage.setInfo(userId);
                      cmdChannel.writeAndFlush(proxyMessage);
                   }
                });

             } else {
                 // 连接后端服务器失败，向代理客户端发送断开连接消息
                cmdChannel.writeAndFlush(ProxyMessage.buildDisconnectMessage(userId));
             }
          }
       });
    }

    // 返回处理器的名称
    @Override
    public String name() {
       return ProxyDataTypeEnum.CONNECT.getDesc();
    }
}
```



### ProxyMessageDisconnectHandler

处理断开连接的事件

```java
@Match(type = Constants.ProxyDataTypeName.DISCONNECT)
@Component
public class ProxyMessageDisconnectHandler implements ProxyMessageHandler {

    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
        // 获取与真实服务器连接的代理客户端的 Channel
       Channel realServerChannel = ctx.channel().attr(Constants.NEXT_CHANNEL).get();
       if (realServerChannel != null) {
           // 移除连接绑定
          ctx.channel().attr(Constants.NEXT_CHANNEL).remove();
           // 将代理客户端的 Channel 返回连接池
          ClientChannelMannager.returnProxyChanel(ctx.channel());
            // 向真实服务器发送空数据并关闭连接
          realServerChannel.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
       }
    }

    // 返回处理器的名称
    @Override
    public String name() {
       return ProxyDataTypeEnum.DISCONNECT.getDesc();
    }

}
```



### ProxyMessageTransferHandler

处理数据传输的事件

```java
@Match(type = Constants.ProxyDataTypeName.TRANSFER)
@Component
public class ProxyMessageTransferHandler implements ProxyMessageHandler {

    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
        // 获取与真实服务器连接的代理客户端的 Channel
       Channel realServerChannel = ctx.channel().attr(Constants.NEXT_CHANNEL).get();
       if (realServerChannel != null) {
           // 构造字节缓冲区并写入数据
          ByteBuf buf = ctx.alloc().buffer(proxyMessage.getData().length);
          buf.writeBytes(proxyMessage.getData());
           // 向真实服务器发送数据
          realServerChannel.writeAndFlush(buf);
       }
    }

    @Override
    public String name() {
        // 返回处理器的名称
       return ProxyDataTypeEnum.TRANSFER.getDesc();
    }

}
```



### ProxyMessageErrorHandler

```java
@Slf4j
@Match(type = Constants.ProxyDataTypeName.ERROR)
@Component
public class ProxyMessageErrorHandler implements ProxyMessageHandler {

    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
       log.info("异常信息: {}", proxyMessage.getInfo());
       JSONObject data = JSONObject.parseObject(proxyMessage.getInfo());
        // 获取异常码
       Integer code = data.getInteger("code");
        // 如果异常码为认证失败
       if (ExceptionEnum.AUTH_FAILED.getCode().equals(code)) {
          // 退出系统
          System.exit(0);
       }
    }

    @Override
    public String name() {
       return ProxyDataTypeEnum.DISCONNECT.getDesc();
    }
}
```
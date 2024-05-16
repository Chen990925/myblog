---
group: 1.0.0
title: proxy-server
order: 3
---

# proxy-server

## ProxyServer

启动类



## config

### ProxyConfig

将resources下的application.yml内容加载成配置变量

```java
@Data
@Configuration(prefix = "proxy")
public class ProxyConfig {
    private Protocol protocol;
    private Server server;
    @Value("license")
    private Map<String, Integer> licenseMap;
}
```

### ProxyServerConfig

代理服务器配置类，用于管理代理服务器的配置信

**一个代理服务器有多个通讯端口，每个端口对应多个真实服务器地址**

```java
public class ProxyServerConfig implements Serializable {

    private static final long serialVersionUID = 1L;

	//更新配置后保证在其他线程即时生效
    private static ProxyServerConfig instance = new ProxyServerConfig();

	//代理服务器为各个代理客户端（key）开启对应的端口列表（value）
    private volatile Map<String, List<Integer>> clientInetPortMapping = new HashMap<String, List<Integer>>();

    //代理服务器上的每个对外端口（key）对应的代理客户端背后的真实服务器信息（value）
    private volatile Map<Integer, String> inetPortLanInfoMapping = new HashMap<Integer, String>();

    //添加代理客户端配置信息
    public void addClientConfig(ProxyClientConfig clientConfig) {
        String clientKey = clientConfig.getClientKey();
        List<Integer> ports = new ArrayList<>();
        for (ProxyClientConfig.Proxy proxy : clientConfig.getProxy()) {
            ports.add(proxy.getServerPort());
            inetPortLanInfoMapping.put(proxy.getServerPort(), proxy.getClientInfo());
        }
        clientInetPortMapping.put(clientKey, ports);
    }

    //获取代理客户端对应的代理服务器端口
    public List<Integer> getClientInetPorts(String clientKey) {
        return clientInetPortMapping.get(clientKey);
    }

    // 根据代理服务器端口获取后端服务器代理信息
    public String getLanInfo(Integer port) {
        return inetPortLanInfoMapping.get(port);
    }

	// 返回需要绑定在代理服务器的端口（用于用户请求）
 	public List<Integer> getUserPorts() {
        List<Integer> ports = new ArrayList<Integer>();
        Iterator<Integer> ite = inetPortLanInfoMapping.keySet().iterator();
        while (ite.hasNext()) {
            ports.add(ite.next());
        }
        return ports;
    }

    // 获取单例实例
    public static ProxyServerConfig getInstance() {
        return instance;
    }

    //代理客户端与其后面真实服务器映射关系
    @Data
    public static class ClientProxyMapping {
		//代理服务器端口
        private Integer inetPort;
		//需要代理的网络信息（代理客户端能够访问），格式 192.168.1.99:80 (必须带端口)
        private String lan;
    }
}
```



## core

### BytesMetricsHandler

BytesMetricsHandler 是一个 Netty 的 ChannelHandler，**用于收集网络流量的指标数据。** 

它继承自 ChannelDuplexHandler，可以同时处理入站和出站的消息。

```java
public class BytesMetricsHandler extends ChannelDuplexHandler {

    //当从通道读取数据时调用该方法
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        // 获取本地地址信息
        InetSocketAddress sa = (InetSocketAddress) ctx.channel().localAddress();
        // 根据本地端口获取 MetricsCollector 实例
        MetricsCollector metricsCollector = MetricsCollector.getCollector(sa.getPort());
        // 增加读取字节数和消息数
        metricsCollector.incrementReadBytes(((ByteBuf) msg).readableBytes());
        metricsCollector.incrementReadMsgs(1);
        // 继续传递消息至下一个处理器
        ctx.fireChannelRead(msg);
    }

    // 当将数据写入通道时调用该方法。
    @Override
    public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
        InetSocketAddress sa = (InetSocketAddress) ctx.channel().localAddress();
        MetricsCollector metricsCollector = MetricsCollector.getCollector(sa.getPort());
        // 增加写入字节数和消息数
        metricsCollector.incrementWroteBytes(((ByteBuf) msg).readableBytes());
        metricsCollector.incrementWroteMsgs(1);
        // 继续向下传递消息
        super.write(ctx, msg, promise);
    }

    //当通道激活时调用该方法
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        InetSocketAddress sa = (InetSocketAddress) ctx.channel().localAddress();
        // 根据本地端口获取 MetricsCollector 实例，增加连接数
        MetricsCollector.getCollector(sa.getPort()).getChannels().incrementAndGet();
        // 调用父类方法继续处理事件
        super.channelActive(ctx);
    }

    //当通道失效时调用该方法
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        InetSocketAddress sa = (InetSocketAddress) ctx.channel().localAddress();
        // 根据本地端口获取 MetricsCollector 实例，减少连接数
        MetricsCollector.getCollector(sa.getPort()).getChannels().decrementAndGet();
        // 调用父类方法继续处理事件
        super.channelInactive(ctx);
    }

}
```



### ServerChannelHandler

实现了Netty 的 SimpleChannelInboundHandler，用于处理与客户端的**数据通信**。 

**它负责将收到的 ProxyMessage 消息分发给相应的处理器进行处理，并处理通道的可写性变化和通道关闭等事件**

```java
public class ServerChannelHandler extends SimpleChannelInboundHandler<ProxyMessage> {
    
    // 用于分发消息的调度器
    private static volatile Dispatcher<ChannelHandlerContext, ProxyMessage> dispatcher;

    //构造函数，初始化这个消息调度器
    public ServerChannelHandler() {
        LockUtil.doubleCheckProcess(() -> null == dispatcher,
            ServerChannelHandler.class,
            () -> {
                dispatcher = new DefaultDispatcher<>("消息调度器",
                    BeanManager.getBeanListBySuperClass(ProxyMessageHandler.class),
                    proxyMessage -> ProxyDataTypeEnum.of((int)proxyMessage.getType()) == null ? null : ProxyDataTypeEnum.of((int)proxyMessage.getType()).getName());
         });
    }

    // 当从通道读取到 ProxyMessage 消息时调用该方法，将消息交给消息分发器
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ProxyMessage proxyMessage) throws Exception {
        dispatcher.dispatch(ctx, proxyMessage);
    }

    //当通道的可写性发生变化时调用该方法
    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
        //获取用户通道并设置自动读取属性
        Channel userChannel = ctx.channel().attr(Constants.NEXT_CHANNEL).get();
        if (userChannel != null) {
            userChannel.config().setOption(ChannelOption.AUTO_READ, ctx.channel().isWritable());
        }

        super.channelWritabilityChanged(ctx);
    }

    // 当通道失效（关闭）时调用该方法
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
         // 获取用户通道
        Channel userChannel = ctx.channel().attr(Constants.NEXT_CHANNEL).get();
        if (userChannel != null && userChannel.isActive()) {
            // 获取客户端密钥和用户ID
            String clientKey = ctx.channel().attr(Constants.CLIENT_KEY).get();
            String userId = ctx.channel().attr(Constants.USER_ID).get();
            Channel cmdChannel = ProxyChannelManager.getCmdChannel(clientKey);
            // 获取代理命令通道
            if (cmdChannel != null) {
                // 从代理命令通道中移除用户通道
                ProxyChannelManager.removeUserChannelFromCmdChannel(cmdChannel, userId);
            }

            // 数据发送完成后再关闭连接，解决http1.0数据传输问题
            userChannel.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
            userChannel.close();
        } else {
            // 移除代理命令通道
            ProxyChannelManager.removeCmdChannel(ctx.channel());
        }

        super.channelInactive(ctx);
    }

    // 异常捕获处理方法。
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        super.exceptionCaught(ctx, cause);
    }
}
```

### UserChannelHandler

实现了Netty 的 SimpleChannelInboundHandler，用于处理与用户的**数据通信**。 

负责将**用户发送的数据转发给代理客户端，并处理用户通道的激活、失效以及可写性变化等事件**

```java
public class UserChannelHandler extends SimpleChannelInboundHandler<ByteBuf> {

    // 用于生成用户ID的原子长整型
    private static AtomicLong userIdProducer = new AtomicLong(0);

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // 当出现异常就关闭连接
        ctx.close();
    }

    //当从用户通道读取到数据时调用该方法
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ByteBuf buf) throws Exception {
        // 获取用户通道和代理通道
        Channel userChannel = ctx.channel();
        Channel proxyChannel = userChannel.attr(Constants.NEXT_CHANNEL).get();
        if (proxyChannel == null) {
            // 如果没有代理客户端与该用户通道关联，则关闭用户通道
            ctx.channel().close();
        } else {
            // 读取数据并转发给代理服务器
            byte[] bytes = new byte[buf.readableBytes()];
            buf.readBytes(bytes);
            String userId = ProxyChannelManager.getUserChannelUserId(userChannel);
            proxyChannel.writeAndFlush(ProxyMessage.buildTransferMessage(userId, bytes));
        }
    }

    //当用户连接激活时触发
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        Channel userChannel = ctx.channel();
        InetSocketAddress sa = (InetSocketAddress) userChannel.localAddress();
        Channel cmdChannel = ProxyChannelManager.getCmdChannel(sa.getPort());

        if (cmdChannel == null) {
            // 该端口还没有代理客户端
            // 如果命令通道不存在，关闭用户连接
            ctx.channel().close();
        } else {
            String userId = newUserId();
            String lanInfo = ProxyServerConfig.getInstance().getLanInfo(sa.getPort());
            // 用户连接到代理服务器时，设置用户连接不可读，等待代理后端服务器连接成功后再改变为可读状态
            userChannel.config().setOption(ChannelOption.AUTO_READ, false);
            ProxyChannelManager.addUserChannelToCmdChannel(cmdChannel, userId, userChannel);
            cmdChannel.writeAndFlush(ProxyMessage.buildConnectMessage(userId).setData(lanInfo.getBytes()));
        }

        super.channelActive(ctx);
    }

    //当用户连接断开时触发
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {

        // // 用户连接断开，通知代理客户端
        Channel userChannel = ctx.channel();
        InetSocketAddress sa = (InetSocketAddress) userChannel.localAddress();
        Channel cmdChannel = ProxyChannelManager.getCmdChannel(sa.getPort());
        if (cmdChannel == null) {
            // 该端口还没有代理客户端
            ctx.channel().close();
        } else {
            // 用户连接断开，从控制连接中移除
            String userId = ProxyChannelManager.getUserChannelUserId(userChannel);
            ProxyChannelManager.removeUserChannelFromCmdChannel(cmdChannel, userId);
            Channel proxyChannel = userChannel.attr(Constants.NEXT_CHANNEL).get();
            if (proxyChannel != null && proxyChannel.isActive()) {
                // 清理相关属性并通知代理服务器用户连接已断开
                proxyChannel.attr(Constants.NEXT_CHANNEL).remove();
                proxyChannel.attr(Constants.CLIENT_KEY).remove();
                proxyChannel.attr(Constants.USER_ID).remove();
				// 恢复代理服务器读取状态
                proxyChannel.config().setOption(ChannelOption.AUTO_READ, true);
                // 通知客户端，用户连接已经断开
                proxyChannel.writeAndFlush(ProxyMessage.buildDisconnectMessage(userId));
            }
        }

        super.channelInactive(ctx);
    }

    // 当连接的可写状态改变时触发
    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
        // 通知代理客户端
        Channel userChannel = ctx.channel();
        InetSocketAddress sa = (InetSocketAddress) userChannel.localAddress();
        Channel cmdChannel = ProxyChannelManager.getCmdChannel(sa.getPort());
        if (cmdChannel == null) {
            // 该端口还没有代理客户端
            // 如果命令通道不存在，关闭用户连接
            ctx.channel().close();
        } else {
            Channel proxyChannel = userChannel.attr(Constants.NEXT_CHANNEL).get();
            if (proxyChannel != null) {
                proxyChannel.config().setOption(ChannelOption.AUTO_READ, userChannel.isWritable());
            }
        }

        super.channelWritabilityChanged(ctx);
    }

	// 为用户连接产生唯一ID userIdProducer
    private static String newUserId() {
        return String.valueOf(userIdProducer.incrementAndGet());
    }
}
```



### ProxyServerRunner

```java
@Slf4j
@Component
public class ProxyServerRunner implements ApplicationRunner {
    
     // 自动注入代理配置
    @Autowired
    private ProxyConfig proxyConfig;
    
    // 自动注入服务器Boss线程组
    @Autowired("serverBossGroup")
    private NioEventLoopGroup serverBossGroup;
    
    // 自动注入服务器Worker线程组
    @Autowired("serverWorkerGroup")
    private NioEventLoopGroup serverWorkerGroup;

    // 应用启动后执行的方法 
    @Override
    public void run(String[] args) {
        // 启动普通代理服务
       startProxyServer();
        // 启动SSL代理服务
       startProxyServerForSSL();
    }

	// 启动代理服务
    private void startProxyServer() {
       ServerBootstrap bootstrap = new ServerBootstrap();
       bootstrap.group(serverBossGroup, serverWorkerGroup).channel(NioServerSocketChannel.class).childHandler(new ChannelInitializer<SocketChannel>() {

          @Override
          public void initChannel(SocketChannel ch) throws Exception {
             proxyServerCommonInitHandler(ch);
          }
       });
       try {
           // 绑定端口并同步等待启动完成
          bootstrap.bind(proxyConfig.getServer().getPort()).sync();
          log.info("代理服务启动，端口：{}", proxyConfig.getServer().getPort());
       } catch (Exception e) {
          log.error("代理服务异常", e);
       }
    }
    
	// 启动SSL代理服务
    private void startProxyServerForSSL() {
        // 如果SSL端口未配置，直接返回
       if (null == proxyConfig.getServer().getSslPort()) {
          return;
       }
       ServerBootstrap bootstrap = new ServerBootstrap();
       bootstrap.group(serverBossGroup, serverWorkerGroup)
          .channel(NioServerSocketChannel.class).childHandler(new ChannelInitializer<SocketChannel>() {
          @Override
          public void initChannel(SocketChannel ch) throws Exception {
              // 添加SSL处理器和普通代理服务初始化处理器
             ch.pipeline().addLast(createSslHandler());
             proxyServerCommonInitHandler(ch);
          }
       });
       try {
           // 绑定SSL端口并同步等待启动完成
          bootstrap.bind(proxyConfig.getServer().getSslPort()).sync();
          log.info("代理服务启动，SSL端口： {}", proxyConfig.getServer().getSslPort());
       } catch (Exception e) {
          log.error("代理服务异常", e);
       }
    }

    // 创建SSL处理器
    private ChannelHandler createSslHandler() {
       try {
           // 加载JKS密钥库文件
          InputStream jksInputStream = FileUtil.getInputStream(proxyConfig.getServer().getJksPath());
          SSLContext serverContext = SSLContext.getInstance("TLS");
          final KeyStore ks = KeyStore.getInstance("JKS");
          ks.load(jksInputStream, proxyConfig.getServer().getKeyStorePassword().toCharArray());
          final KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
          kmf.init(ks, proxyConfig.getServer().getKeyManagerPassword().toCharArray());
          TrustManager[] trustManagers = null;

           // 初始化SSL上下文
          serverContext.init(kmf.getKeyManagers(), trustManagers, null);

           // 创建SSLEngine并配置参数
          SSLEngine sslEngine = serverContext.createSSLEngine();
          sslEngine.setUseClientMode(false);
          sslEngine.setNeedClientAuth(false);

           // 返回SSL处理器
          return new SslHandler(sslEngine);
       } catch (Exception e) {
          log.error("创建SSL处理器失败", e);
          e.printStackTrace();
       }
       return null;
    }

    // 代理服务器通用初始化处理器
    private void proxyServerCommonInitHandler(SocketChannel ch) {
        // 添加代理消息解码器
       ch.pipeline().addLast(new ProxyMessageDecoder(proxyConfig.getProtocol().getMaxFrameLength(),
          proxyConfig.getProtocol().getLengthFieldOffset(), proxyConfig.getProtocol().getLengthFieldLength(),
          proxyConfig.getProtocol().getLengthAdjustment(), proxyConfig.getProtocol().getInitialBytesToStrip()));
        // 添加代理消息编码器
       ch.pipeline().addLast(new ProxyMessageEncoder());
        // 添加空闲检测处理器
       ch.pipeline().addLast(new IdleCheckHandler(proxyConfig.getProtocol().getReadIdleTime(), proxyConfig.getProtocol().getWriteIdleTime(), proxyConfig.getProtocol().getAllIdleTimeSeconds()));
        // 添加服务器通道处理器
       ch.pipeline().addLast(new ServerChannelHandler());
    }

    // 创建服务器Boss线程组
    @Bean
    public NioEventLoopGroup serverBossGroup() {
       return new NioEventLoopGroup();
    }

    // 创建服务器Worker线程组
    @Bean
    public NioEventLoopGroup serverWorkerGroup() {
       return new NioEventLoopGroup();
    }
}
```



## handler

### ProxyMessageAuthHandler

**用来处理认证事件的处理器**

代理消息认证处理器，处理来自客户端的认证消息，验证客户端的身份和授权信息，并启动

```java
@Slf4j
@Match(type = Constants.ProxyDataTypeName.AUTH)
@Component
public class ProxyMessageAuthHandler implements ProxyMessageHandler {

    // 自动注入服务器Boss线程组
    @Autowired
    private NioEventLoopGroup serverBossGroup;
    
    // 自动注入服务器Worker线程组
    @Autowired
    private NioEventLoopGroup serverWorkerGroup;
    
    // 自动注入代理配置
    @Autowired
    private ProxyConfig proxyConfig;

	// 处理认证消息
    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
       // 解析客户端配置
       ProxyClientConfig clientConfig = JSONObject.parseObject(proxyMessage.getInfo(), ProxyClientConfig.class);
       String clientKey = clientConfig.getClientKey();
       // 验证客户端的clientKey是否有效
       if (!proxyConfig.getLicenseMap().containsKey(clientKey)) {
          ctx.channel().writeAndFlush(ProxyMessage.buildErrMessage(ExceptionEnum.AUTH_FAILED, "无效的clientKey"));
          ctx.channel().close();
          return;
       }

       // 检查客户端是否超过license限制
       if (proxyConfig.getLicenseMap().get(clientKey) != -1 && clientConfig.getProxy().size() > proxyConfig.getLicenseMap().get(clientKey)) {
          ctx.channel().writeAndFlush(ProxyMessage.buildErrMessage(ExceptionEnum.AUTH_FAILED, "代理端口数超过license限制"));
          ctx.channel().close();
          return;
       }

       // 添加客户端配置到代理服务器配置中
       ProxyServerConfig.getInstance().addClientConfig(clientConfig);
       List<Integer> ports = ProxyServerConfig.getInstance().getClientInetPorts(clientKey);
       if (ports == null) {
          ctx.channel().close();
          return;
       }

       // 检查是否已存在相同clientKey的控制通道
       Channel channel = ProxyChannelManager.getCmdChannel(clientKey);
       if (channel != null) {
          ctx.channel().close();
          return;
       }

       // 添加控制通道并启动用户端口服务
       ProxyChannelManager.addCmdChannel(ports, clientKey, ctx.channel());
       startUserPortServer(ports);
    }

	// 获取处理器名称
    @Override
    public String name() {
       return ProxyDataTypeEnum.AUTH.getDesc();
    }

	// 启动用户端口服务
    private void startUserPortServer(List<Integer> ports) {
       ServerBootstrap bootstrap = new ServerBootstrap();
       bootstrap.group(serverBossGroup, serverWorkerGroup)
                .channel(NioServerSocketChannel.class)
                .childHandler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    public void initChannel(SocketChannel ch) throws Exception {
                       // 添加字节指标处理器和用户通道处理器
                       ch.pipeline().addFirst(new BytesMetricsHandler());
                       ch.pipeline().addLast(new UserChannelHandler());
                    }
                });

       // 遍历端口列表并尝试绑定
       for (int port : ports) {
          try {
             bootstrap.bind(port).get();
             log.info("绑定用户端口： {}", port);
          } catch (Exception ex) {
             // 如果端口已经绑定，记录日志并忽略异常
             if (!(ex.getCause() instanceof BindException)) {
                throw new RuntimeException(ex);
             }
          }
       }
    }
}

```



### ProxyMessageConnectHandler

**处理来自客户端的连接事件**

代理消息连接处理器，处理来自客户端的连接消息，建立代理客户端与后端服务器的连接。

当客户端发送连接消息时，该处理器负责解析消息内容，查找对应的控制通道，并建立用户通道与后端服务器的连接。

```java
@Match(type = Constants.ProxyDataTypeName.CONNECT)
@Component
public class ProxyMessageConnectHandler implements ProxyMessageHandler {

	// 处理连接消息
    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
        // 获取连接消息中的信息
        String info = proxyMessage.getInfo();
        // 如果信息为空，关闭当前通道并返回
        if (info == null) {
            ctx.channel().close();
            return;
        }

        // 解析信息，格式为"用户ID@客户端Key"
        String[] tokens = info.split("@");
        // 如果信息格式不正确，关闭当前通道并返回
        if (tokens.length != 2) {
            ctx.channel().close();
            return;
        }

        // 查找对应客户端Key的控制通道
        Channel cmdChannel = ProxyChannelManager.getCmdChannel(tokens[1]);
        // 如果未找到控制通道，关闭当前通道并返回
        if (cmdChannel == null) {
            ctx.channel().close();
            return;
        }

        // 查找对应用户ID的用户通道
        Channel userChannel = ProxyChannelManager.getUserChannel(cmdChannel, tokens[0]);
        // 如果找到用户通道，建立连接，并设置相关属性
        if (userChannel != null) {
            // 设置连接的用户ID、客户端Key和下一个通道
            ctx.channel().attr(Constants.USER_ID).set(tokens[0]);
            ctx.channel().attr(Constants.CLIENT_KEY).set(tokens[1]);
            ctx.channel().attr(Constants.NEXT_CHANNEL).set(userChannel);
            userChannel.attr(Constants.NEXT_CHANNEL).set(ctx.channel());
            // 代理客户端与后端服务器连接成功，修改用户连接为可读状态
            userChannel.config().setOption(ChannelOption.AUTO_READ, true);
        }
    }

	// 获取处理器名称
    @Override
    public String name() {
        return ProxyDataTypeEnum.CONNECT.getDesc();
    }
}

```



### ProxyMessageDisconnectHandler

***处理来自客户端的断开连接事件***

代理消息断开连接处理器，处理来自客户端的断开连接消息，断开代理客户端与后端服务器的连接。

当客户端发送断开连接消息时，该处理器负责解析消息内容，断开与后端服务器的连接，并关闭相关通道。

```java
@Match(type = Constants.ProxyDataTypeName.DISCONNECT)
@Component
public class ProxyMessageDisconnectHandler implements ProxyMessageHandler {

	// 处理断开连接消息
    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
       // 获取客户端Key
       String clientKey = ctx.channel().attr(Constants.CLIENT_KEY).get();

       // 如果客户端Key为空，说明代理连接没有连上服务器，由控制连接发送用户端断开连接消息
       if (clientKey == null) {
          // 获取用户ID
          String userId = proxyMessage.getInfo();
          // 从控制连接中移除用户通道
          Channel userChannel = ProxyChannelManager.removeUserChannelFromCmdChannel(ctx.channel(), userId);
          if (userChannel != null) {
             // 数据发送完成后再关闭连接，解决HTTP1.0数据传输问题
             userChannel.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
          }
          return;
       }

       // 查找控制通道
       Channel cmdChannel = ProxyChannelManager.getCmdChannel(clientKey);
       if (cmdChannel == null) {
          return;
       }

       // 从控制通道中移除用户通道
       Channel userChannel = ProxyChannelManager.removeUserChannelFromCmdChannel(cmdChannel, ctx.channel().attr(Constants.USER_ID).get());
       if (userChannel != null) {
          // 数据发送完成后再关闭连接，解决HTTP1.0数据传输问题
          userChannel.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
          // 移除当前通道的相关属性
          ctx.channel().attr(Constants.NEXT_CHANNEL).remove();
          ctx.channel().attr(Constants.CLIENT_KEY).remove();
          ctx.channel().attr(Constants.USER_ID).remove();
       }
    }

	// 获取处理器名称
    @Override
    public String name() {
       return ProxyDataTypeEnum.DISCONNECT.getDesc();
    }
}
```



### ProxyMessageHeartbeatHandler

代理消息心跳处理器，处理来自客户端的心跳消息，向客户端发送心跳响应消息。 

 **当客户端发送心跳消息时，该处理器负责向客户端发送心跳响应消息，以维持连接的活跃状态。**

```java
@Match(type = Constants.ProxyDataTypeName.HEARTBEAT)
@Component
public class ProxyMessageHeartbeatHandler implements ProxyMessageHandler {

    // 处理心跳消息
    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
        // 向客户端发送心跳响应消息
       ctx.channel().writeAndFlush(ProxyMessage.buildHeartbeatMessage());
    }

    // 获取处理器名称
    @Override
    public String name() {
       return ProxyDataTypeEnum.HEARTBEAT.getDesc();
    }

}
```

```java
// 新建了一个类型为心跳消息的ProxyMessage
public static ProxyMessage buildHeartbeatMessage() {
    return create().setType(TYPE_HEARTBEAT);
}
```



### ProxyMessageTransferHandler

代理消息传输处理器，处理来自客户端的数据传输消息，将数据传输到用户通道。 

**当客户端发送数据传输消息时，该处理器负责从消息中提取数据，并将数据传输到用户通道。**

```java
@Match(type = Constants.ProxyDataTypeName.TRANSFER)
@Component
public class ProxyMessageTransferHandler implements ProxyMessageHandler {

    // 处理数据传输消息
    @Override
    public void handle(ChannelHandlerContext ctx, ProxyMessage proxyMessage) {
        // 获取用户通道
       Channel userChannel = ctx.channel().attr(Constants.NEXT_CHANNEL).get();
        // 如果用户通道存在，将数据传输到用户通道
       if (userChannel != null) {
          ByteBuf buf = ctx.alloc().buffer(proxyMessage.getData().length);
          buf.writeBytes(proxyMessage.getData());
          userChannel.writeAndFlush(buf);
       }
    }

    //获取处理器名称
    @Override
    public String name() {
       return ProxyDataTypeEnum.TRANSFER.getDesc();
    }

}
```



## monitor

### Metrics

**Metrics（度量指标）类，用于表示服务器的性能度量指标。** 

 包含了服务器监听端口、读取字节数、写入字节数、读取消息数、写入消息数、活跃通道数和时间戳等信息

```java
@Data
public class Metrics implements Serializable {
    private static final long serialVersionUID = 1L;
    // 服务器监听端口
    private int port;
    // 读取字节数
    private long readBytes;
    // 写入字节数
    private long wroteBytes;
    // 读取消息数
    private long readMsgs;
    // 写入消息数
    private long wroteMsgs;
    // 活跃通道数
    private int channels;
    // 时间戳
    private long timestamp;
}
```

### MetricsCollector

MetricsCollector（度量指标收集器）类，用于收集服务器的性能度量指标。 

包含了服务器监听端口、读取字节数、写入字节数、读取消息数、写入消息数、活跃通道数等信息，并提供了相应的操作方法。

```java
public class MetricsCollector {

    // 存储端口与度量指标收集器之间的映射关系
    private static Map<Integer, MetricsCollector> metricsCollectors = new ConcurrentHashMap<Integer, MetricsCollector>();

    // 服务器监听端口
    @Setter
    @Getter
    private Integer port;

    // 读取字节数
    private AtomicLong readBytes = new AtomicLong();

    // 写入字节数
    private AtomicLong wroteBytes = new AtomicLong();

    // 读取消息数
    private AtomicLong readMsgs = new AtomicLong();

    // 写入消息数
    private AtomicLong wroteMsgs = new AtomicLong();

    // 活跃通道数
    @Getter
    private AtomicInteger channels = new AtomicInteger();

    private MetricsCollector() {
    }

    // 获取与指定端口相关联的 MetricsCollector 实例
    // 如果该端口没有相关的实例，则创建一个新实例。
    public static MetricsCollector getCollector(Integer port) {
        MetricsCollector collector = metricsCollectors.get(port);
        if (collector == null) {
            synchronized (metricsCollectors) {
                collector = metricsCollectors.get(port);
                if (collector == null) {
                    collector = new MetricsCollector();
                    collector.setPort(port);
                    metricsCollectors.put(port, collector);
                }
            }
        }

        return collector;
    }

    // 获取并重置所有端口的收集指标，并以列表形式返回
    public static List<Metrics> getAndResetAllMetrics() {
        List<Metrics> allMetrics = new ArrayList<Metrics>();
        Iterator<Entry<Integer, MetricsCollector>> ite = metricsCollectors.entrySet().iterator();
        while (ite.hasNext()) {
            allMetrics.add(ite.next().getValue().getAndResetMetrics());
        }

        return allMetrics;
    }

    //获取所有端口的收集指标，但不重置它们
    public static List<Metrics> getAllMetrics() {
        List<Metrics> allMetrics = new ArrayList<Metrics>();
        Iterator<Entry<Integer, MetricsCollector>> ite = metricsCollectors.entrySet().iterator();
        while (ite.hasNext()) {
            allMetrics.add(ite.next().getValue().getMetrics());
        }
        return allMetrics;
    }

    //获取当前指标并将其重置为零
    public Metrics getAndResetMetrics() {
        Metrics metrics = new Metrics();
        metrics.setChannels(channels.get());
        metrics.setPort(port);
        metrics.setReadBytes(readBytes.getAndSet(0));
        metrics.setWroteBytes(wroteBytes.getAndSet(0));
        metrics.setTimestamp(System.currentTimeMillis());
        metrics.setReadMsgs(readMsgs.getAndSet(0));
        metrics.setWroteMsgs(wroteMsgs.getAndSet(0));
        return metrics;
    }

    // 获取当前指标但不重置它们
    public Metrics getMetrics() {
        Metrics metrics = new Metrics();
        metrics.setChannels(channels.get());
        metrics.setPort(port);
        metrics.setReadBytes(readBytes.get());
        metrics.setWroteBytes(wroteBytes.get());
        metrics.setTimestamp(System.currentTimeMillis());
        metrics.setReadMsgs(readMsgs.get());
        metrics.setWroteMsgs(wroteMsgs.get());
        return metrics;
    }

    //增加读取字节数的计数
    public void incrementReadBytes(long bytes) {
        readBytes.addAndGet(bytes);
    }

    //增加写入字节数的计数
    public void incrementWroteBytes(long bytes) {
        wroteBytes.addAndGet(bytes);
    }

    //增加读取消息数的计数
    public void incrementReadMsgs(long msgs) {
        readMsgs.addAndGet(msgs);
    }

    //增加写入消息数的计数
    public void incrementWroteMsgs(long msgs) {
        wroteMsgs.addAndGet(msgs);
    }
}
```



## util.ProxyChannelManager

**管理代理通道之间的关系**

```java
public class ProxyChannelManager {

    // 用户通道的属性键，存储用户通道的映射
    private static final AttributeKey<Map<String, Channel>> USER_CHANNELS = AttributeKey.newInstance("user_channels");

    // 请求局域网信息的属性键
    private static final AttributeKey<String> REQUEST_LAN_INFO = AttributeKey.newInstance("request_lan_info");

    // 通道端口的属性键，用于存储端口列表
    private static final AttributeKey<List<Integer>> CHANNEL_PORT = AttributeKey.newInstance("channel_port");

    // 通道客户端密钥的属性键，用于唯一标识客户端
    private static final AttributeKey<String> CHANNEL_CLIENT_KEY = AttributeKey.newInstance("channel_client_key");

    // 端口到命令通道的映射
    private static Map<Integer, Channel> portCmdChannelMapping = new ConcurrentHashMap<Integer, Channel>();

    // 命令通道的映射，用客户端密钥作为键
    private static Map<String, Channel> cmdChannels = new ConcurrentHashMap<String, Channel>();
 
	// 添加代理控制客户端连接与代理服务器端口之间的映射关系
    public static void addCmdChannel(List<Integer> ports, String clientKey, Channel channel) {
        if (ports == null) {
            throw new IllegalArgumentException("port can not be null");
        }
        // 客户端（proxy-client）相对较少，这里同步的比较重
        // 保证服务器对外端口与客户端到服务器的连接关系在临界情况时调用removeChannel(Channel channel)时不出问题
        synchronized (portCmdChannelMapping) {
            for (int port : ports) {
                portCmdChannelMapping.put(port, channel);
            }
        }
        channel.attr(CHANNEL_PORT).set(ports);
        channel.attr(CHANNEL_CLIENT_KEY).set(clientKey);
        channel.attr(USER_CHANNELS).set(new ConcurrentHashMap<String, Channel>());
        cmdChannels.put(clientKey, channel);
    }

	//当代理客户端连接断开时，清除与之相关的映射关系。
    public static void removeCmdChannel(Channel channel) {
        if (channel.attr(CHANNEL_PORT).get() == null) {
            return;
        }
        String clientKey = channel.attr(CHANNEL_CLIENT_KEY).get();
        Channel channel0 = cmdChannels.remove(clientKey);
        if (channel != channel0) {
            cmdChannels.put(clientKey, channel);
        }
        List<Integer> ports = channel.attr(CHANNEL_PORT).get();
        for (int port : ports) {
            Channel proxyChannel = portCmdChannelMapping.remove(port);
            if (proxyChannel == null) {
                continue;
            }
            // 在执行断连之前新的连接已经连上来了
            if (proxyChannel != channel) {
                portCmdChannelMapping.put(port, proxyChannel);
            }
        }
        if (channel.isActive()) {
            channel.close();
        }
        Map<String, Channel> userChannels = getUserChannels(channel);
        Iterator<String> ite = userChannels.keySet().iterator();
        while (ite.hasNext()) {
            Channel userChannel = userChannels.get(ite.next());
            if (userChannel.isActive()) {
                userChannel.close();
            }
        }
    }

    public static Channel getCmdChannel(Integer port) {
        return portCmdChannelMapping.get(port);
    }

    public static Channel getCmdChannel(String clientKey) {
        return cmdChannels.get(clientKey);
    }

	// 增加用户连接与代理客户端连接关系
    public static void addUserChannelToCmdChannel(Channel cmdChannel, String userId, Channel userChannel) {
        InetSocketAddress sa = (InetSocketAddress) userChannel.localAddress();
        String lanInfo = ProxyServerConfig.getInstance().getLanInfo(sa.getPort());
        userChannel.attr(Constants.USER_ID).set(userId);
        userChannel.attr(REQUEST_LAN_INFO).set(lanInfo);
        cmdChannel.attr(USER_CHANNELS).get().put(userId, userChannel);
    }

	//删除用户连接与代理客户端连接关系
    public static Channel removeUserChannelFromCmdChannel(Channel cmdChannel, String userId) {
        if (cmdChannel.attr(USER_CHANNELS).get() == null) {
            return null;
        }
        synchronized (cmdChannel) {
            return cmdChannel.attr(USER_CHANNELS).get().remove(userId);
        }
    }

	//根据代理客户端连接与用户编号获取 用户连接
    public static Channel getUserChannel(Channel cmdChannel, String userId) {
        return cmdChannel.attr(USER_CHANNELS).get().get(userId);
    }

	//获取用户编号
    public static String getUserChannelUserId(Channel userChannel) {
        return userChannel.attr(Constants.USER_ID).get();
    }

	//获取用户请求的内网IP端口信息
    public static String getUserChannelRequestLanInfo(Channel userChannel) {
        return userChannel.attr(REQUEST_LAN_INFO).get();
    }

	// 获取代理控制客户端连接绑定的所有用户连接
    public static Map<String, Channel> getUserChannels(Channel cmdChannel) {
        return cmdChannel.attr(USER_CHANNELS).get();
    }
}
```


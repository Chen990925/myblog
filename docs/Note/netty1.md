---
group: netty
title: NIO与Epoll
order: 2
---

# 基于Linux内核理解NIO与Epoll

## IO模型

IO模型就是说用什么样的通道进行数据的发送和接收，Java共支持3种网络编程IO模式：**BIO，NIO，AIO**

### **BIO(Blocking IO)同步阻塞IO**

同步阻塞模型，一个客户端连接对应一个处理线程

服务端代码：

```java
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(9000);
        while (true) {
            System.out.println("等待连接。。");
            //阻塞方法
            Socket clientSocket = serverSocket.accept();
            System.out.println("有客户端连接了。。");
            handler(clientSocket);
            
            //弄成多线程，可以做到来一个连接分配一个线程
            //假如很多连接不发数据就会导致很多连接被阻塞
            /*new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        handler(clientSocket);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }).start();*/
        }
    }

    private static void handler(Socket clientSocket) throws IOException {
        byte[] bytes = new byte[1024];
        System.out.println("准备read。。");
        //接收客户端的数据，阻塞方法，没有数据可读时就阻塞
        int read = clientSocket.getInputStream().read(bytes);
        System.out.println("read完毕。。");
        if (read != -1) {
            System.out.println("接收到客户端的数据：" + new String(bytes, 0, read));
        }
        clientSocket.getOutputStream().write("HelloClient".getBytes());
        clientSocket.getOutputStream().flush();
    }
}

```

```java
//客户端代码
public class SocketClient {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 9000);
        //向服务端发送数据
        socket.getOutputStream().write("HelloServer".getBytes());
        socket.getOutputStream().flush();
        System.out.println("向服务端发送数据结束");
        byte[] bytes = new byte[1024];
        //接收服务端回传的数据
        socket.getInputStream().read(bytes);
        System.out.println("接收到服务端的数据：" + new String(bytes));
        socket.close();
    }
}
```

> telnet就是查看某个端口是否可访问,可以通过telnet访问9000端口执行send命令
>
> **telnet localhost 9000**

- **缺点：**

  1、IO代码里read操作是阻塞操作，如果连接不做数据读写操作会导致线程阻塞，浪费资源

  2、如果线程很多，会导致服务器线程太多，压力太大，比如C10K`connect *10K`问题

- **应用场景：**

  BIO 方式适用于连接数目比较小且固定的架构， 这种方式对服务器资源要求比较高，  但程序简单易理解。

### **NIO(Non Blocking IO)Neo 同步非阻塞IO**

**同步非阻塞**，服务器实现模式为**一个线程可以处理多个请求(连接)**，客户端发送的连接请求都会注册到**多路复用器selector**上，多路复用器轮询到连接有IO请求就进行处理，JDK1.4开始引入。

**应用场景：**NIO方式适用于连接数目多且连接比较短（轻操作） 的架构， 比如聊天服务器， 弹幕系统， 服务器间通讯，**编程比较复杂**

服务端代码：

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class NioServer {

    // 保存客户端连接
    static List<SocketChannel> channelList = new ArrayList<>();

    public static void main(String[] args) throws IOException, InterruptedException {
        // 创建NIO ServerSocketChannel,与BIO的serverSocket类似
        ServerSocketChannel serverSocket = ServerSocketChannel.open();
        //绑定端口号
        serverSocket.socket().bind(new InetSocketAddress(9000));
        // 设置ServerSocketChannel为非阻塞
        serverSocket.configureBlocking(false);
        System.out.println("服务启动成功");

        while (true) {
            // 非阻塞模式accept方法不会阻塞，否则会阻塞
            // NIO的非阻塞是由操作系统内部实现的，底层调用了linux内核的accept函数
            SocketChannel socketChannel = serverSocket.accept();
            if (socketChannel != null) { // 如果有客户端进行连接
                System.out.println("连接成功");
                // 设置SocketChannel为非阻塞
                socketChannel.configureBlocking(false);
                // 保存客户端连接在List中
                channelList.add(socketChannel);
            }
            // 遍历连接进行数据读取
            Iterator<SocketChannel> iterator = channelList.iterator();
            while (iterator.hasNext()) {
                SocketChannel sc = iterator.next();
                ByteBuffer byteBuffer = ByteBuffer.allocate(128);
                // 非阻塞模式read方法不会阻塞，否则会阻塞（serverSocket.configureBlocking(false)）
                int len = sc.read(byteBuffer);
                // 如果有数据，把数据打印出来
                if (len > 0) {
                    System.out.println("接收到消息：" + new String(byteBuffer.array()));
                } else if (len == -1) { // 如果客户端断开，把socket从集合中去掉
                    iterator.remove();
                    System.out.println("客户端断开连接");
                }
            }
        }
    }
}
```

​	总结：如果连接数太多的话，会有大量的无效遍历，假如有10000个连接，其中只有1000个连接有写数据，但是由于其他9000个连接并没有断开，**我们还是要每次轮询遍历一万次，其中有十分之九的遍历都是无效的**，这显然不是一个让人很满意的状态。

#### ***NIO引入多路复用器代码示例：**

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

public class NioSelectorServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        // 创建NIO ServerSocketChannel
        ServerSocketChannel serverSocket = ServerSocketChannel.open();
        serverSocket.socket().bind(new InetSocketAddress(9000));
        // 设置ServerSocketChannel为非阻塞,这些同上一样
        serverSocket.configureBlocking(false);
        
        // 打开Selector处理Channel，即创建epoll，select就是多路复用器
        Selector selector = Selector.open();
        // 把ServerSocketChannel注册到selector上，并且selector对客户端accept连接进行关注
        serverSocket.register(selector, SelectionKey.OP_ACCEPT);
        System.out.println("服务启动成功");

        while (true) {
            // 阻塞等待需要处理的事件发生，包括连接，读写事件
            selector.select();
            // 获取selector中注册的全部事件的 SelectionKey 实例，一个key绑定一个端channel
            //假设十万个连接里有一千个连接有事件发生
            Set<SelectionKey> selectionKeys = selector.selectedKeys();
            Iterator<SelectionKey> iterator = selectionKeys.iterator();

            // 遍历SelectionKey对事件进行处理
            //在1000个连接集合中遍历
            while (iterator.hasNext()) {
                SelectionKey key = iterator.next();
                // 如果是OP_ACCEPT事件，则进行连接获取和事件注册
                if (key.isAcceptable()) {
                    ServerSocketChannel server = (ServerSocketChannel) key.channel();
                    SocketChannel socketChannel = server.accept();
                    socketChannel.configureBlocking(false);
                    // 这里只注册了读事件，如果需要给客户端发送数据可以注册写事件
                    //把客户端也注册到selector中
                    socketChannel.register(selector, SelectionKey.OP_READ);
                    System.out.println("客户端连接成功");
                } else if (key.isReadable()) {  // 如果是OP_READ事件，则进行读取和打印
                    SocketChannel socketChannel = (SocketChannel) key.channel();
                    ByteBuffer byteBuffer = ByteBuffer.allocate(128);
                    int len = socketChannel.read(byteBuffer);
                    // 如果有数据，把数据打印出来
                    if (len > 0) {
                        System.out.println("接收到消息：" + new String(byteBuffer.array()));
                    } else if (len == -1) { // 如果客户端断开连接，关闭Socket
                        System.out.println("客户端断开连接");
                        socketChannel.close();
                    }
                }
                //从事件集合里删除本次处理的key，防止下次select重复处理
                iterator.remove();
            }
        }
    }
}
```

#### NIO 三大核心组件

- **Channel(通道):**

  channel 类似于流，每个 channel 对应一个 buffer缓冲区，buffer 底层就是个数组

- Buffer(缓冲区)

  channel 会注册到 selector 上，由 selector 根据 channel 读写事件的发生将其交由某个空闲的线程处理

- Selector(多路复用器)

  NIO 的 Buffer 和 channel 都是既可以读也可以写

<img src="https://note.youdao.com/yws/public/resource/916f44987d1fe0e35ec935bf5391d762/xmlnote/F69C7F7706E64740A629E8E1056F5DCE/106569" alt="NIO模型" style="zoom:50%;" />

NIO底层在JDK1.4版本是用linux的内核函数select()或poll()来实现，跟上面的NioServer代码类似，selector每次都会轮询所有的sockchannel看下哪个channel有读写事件，有的话就处理，没有就继续遍历，JDK1.5开始引入了epoll基于事件响应机制来优化NIO。

#### NioSelectorServer 核心代码

NioSelectorServer 代码里如下几个方法非常重要，从Hotspot与Linux内核函数级别来理解下

```java
Selector.open()  //创建多路复用器
socketChannel.register(selector, SelectionKey.OP_READ)  //将channel注册到多路复用器上
selector.select()  //阻塞等待需要处理的事件发生
```

<img src="https://note.youdao.com/yws/public/resource/916f44987d1fe0e35ec935bf5391d762/xmlnote/E7B425DD0F1142E28C7174E865FF0A05/106573" alt=".." style="zoom:50%;" />

##### Selector.open() 

1. selector.open() 返回一个provider,这个provider由Defaultselectorprovider.create()创建

2. 根据不同操作系统，在linux系统下.create()是Epoll实现，返回一个新的selector对象

3. 在newEpollSelector方法里新建了个EpollArrayWrapper`内部包装的对象`,执行epfd=epollCreate() 这是个本地方法

4. epoll_create(256) 创建epoll对象，返回epfd  `句柄`

> epoll相当于操作系统底层的数据结构，和sock很像。方法返回epoll对应的文件描述符fd来对epoll进行操作

##### socketChannel.register(selector, SelectionKey.OP_READ)

implRegister在不同OS下有不同的实现，在linux中核心代码就是pollWarpper.add(fd)

把真正要注册的SocketChannel丢到EpollArrayWrapper中

> 这一步并没有真正将selector和事件绑定，只是 将channel放到了selector,wait才是真正将事件进行了绑定

##### selector.select()  

selectorImpl在不同OS下有不同的实现，在linux中核心代码就是EpollSelectorImpl.doSelect()

doSelect()里面的核心代码：pollWarpper.poll(timeout)

epollwait()看rdlist是否有数据，没有就阻塞，有事件就os进行切换执行epollctl对事件进行绑定

```java
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);
//等待文件描述符epfd上的事件。
//epfd是Epoll对应的文件描述符，events表示调用者所有可用事件的集合，maxevents表示最多等到多少个事件就返//回，timeout是超时时间。
```

```java
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
使用文件描述符epfd引用的epoll实例，对目标文件描述符fd执行op操作。
参数epfd表示epoll对应的文件描述符，参数fd表示socket对应的文件描述符。
参数op有以下几个值：
EPOLL_CTL_ADD：注册新的fd到epfd中，并关联事件event；
EPOLL_CTL_MOD：修改已经注册的fd的监听事件；
EPOLL_CTL_DEL：从epfd中移除fd，并且忽略掉绑定的event，这时event可以为null；
```



**总结**：NIO整个调用流程就是Java调用了操作系统的内核函数来创建Socket，获取到Socket的文件描述符，再创建一个Selector对象，对应操作系统的Epoll描述符，将获取到的Socket连接的文件描述符的事件绑定到Selector对应的Epoll文件描述符上，进行事件的异步通知，这样就实现了使用一条线程，并且不需要太多的无效的遍历，将事件处理交给了操作系统内核(操作系统中断程序实现)，大大提高了效率。

|              | **select**                               | **poll**                                 |                   **epoll(jdk 1.5及以上)**                   |
| ------------ | ---------------------------------------- | ---------------------------------------- | :----------------------------------------------------------: |
| **操作方式** | 遍历                                     | 遍历                                     |                             回调                             |
| **底层实现** | 数组                                     | 链表                                     |                            哈希表                            |
| **IO效率**   | 每次调用都进行线性遍历，时间复杂度为O(n) | 每次调用都进行线性遍历，时间复杂度为O(n) | 事件通知方式，每当有IO事件就绪，系统注册的回调函数就会被调用，时间复杂度O(1) |
| **最大连接** | 有上限                                   | 无上限                                   |                            无上限                            |

> 事件响应模式和设计模式中的观察者模式类似

#### **Redis线程模型**

Redis就是典型的基于epoll的NIO线程模型(nginx也是)，epoll实例收集所有事件(连接与读写事件)，由一个服务端线程连续处理所有事件命令。



### **AIO(NIO 2.0异步非阻塞)很少用**

异步非阻塞， 由**操作系统完成后回调通知服务端程序启动线程去处理**， 一般适用于连接数较多且连接时间较长的应用

服务端代码示例：

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.nio.channels.AsynchronousSocketChannel;
import java.nio.channels.CompletionHandler;

public class AIOServer {
    public static void main(String[] args) throws Exception {
        final AsynchronousServerSocketChannel serverChannel =
                AsynchronousServerSocketChannel.open().bind(new InetSocketAddress(9000));
		
        //区别：这里的accpet是有回调函数的
        //主线程直接走了执行完,不阻塞；等到后面有事件了再创建新线程来处理事件
        serverChannel.accept(null, new CompletionHandler<AsynchronousSocketChannel, Object>() {
            @Override
            public void completed(AsynchronousSocketChannel socketChannel, Object attachment) {
                try {
                    System.out.println("2--"+Thread.currentThread().getName());
                    // 再此接收客户端连接，如果不写这行代码后面的客户端连接连不上服务端
                    serverChannel.accept(attachment, this);
                    System.out.println(socketChannel.getRemoteAddress());
                    ByteBuffer buffer = ByteBuffer.allocate(1024);
                    //连接事件，读事件都不是当前线程干的，都是回调一下让后面的线程来干
                    socketChannel.read(buffer, buffer, new CompletionHandler<Integer, ByteBuffer>() {
                        @Override
                        public void completed(Integer result, ByteBuffer buffer) {
                            System.out.println("3--"+Thread.currentThread().getName());
                            buffer.flip();
                            System.out.println(new String(buffer.array(), 0, result));
                            socketChannel.write(ByteBuffer.wrap("HelloClient".getBytes()));
                        }
                        @Override
                        public void failed(Throwable exc, ByteBuffer buffer) {
                            exc.printStackTrace();
                        }
                    });
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            @Override
            public void failed(Throwable exc, Object attachment) {
                exc.printStackTrace();
            }
        });
        System.out.println("1--"+Thread.currentThread().getName());
        Thread.sleep(Integer.MAX_VALUE);
    }
}
```

客户端代码示例：

```java
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousSocketChannel;

public class AIOClient {
    public static void main(String... args) throws Exception {
        AsynchronousSocketChannel socketChannel = AsynchronousSocketChannel.open();
        socketChannel.connect(new InetSocketAddress("127.0.0.1", 9000)).get();
        socketChannel.write(ByteBuffer.wrap("HelloServer".getBytes()));
        ByteBuffer buffer = ByteBuffer.allocate(512);
        Integer len = socketChannel.read(buffer).get();
        if (len != -1) {
            System.out.println("客户端收到信息：" + new String(buffer.array(), 0, len));
        }
    }
}
```

### BIO、 NIO、 AIO 对比

<img src="../../public/images/clipboard.png" alt=".." style="zoom:50%;" />

**为什么Netty使用NIO而不是AIO？**

在Linux系统上，AIO的底层实现仍使用Epoll，没有很好实现AIO，因此在性能上没有明显的优势，而且被JDK封装了一层不容易深度优化，Linux上AIO还不够成熟。

Netty是**异步非阻塞**框架，重点是Netty在NIO上做了很多异步的封装。
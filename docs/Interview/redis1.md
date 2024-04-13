---
group: redis常见面试题
title: redis常见面试题1
order: 1
---

# redis面试题

## 1.**为什么要用 Redis？有预估 QPS 的提升幅度吗？**

为什么用 Redis？回答 Redis 的优势即可。 QPS（Queries Per Second，每秒钟查询次数）的问题可以使用 Redis 性能测试报告中的数据即可。 Redis 优势有以下几个：

- **基于内存**：Redis 是一种基于内存的数据存储系统，所有的数据都存储在内存中。相比传统的磁盘存储系统，内存访问速度更快

- **单线程模型**：Redis 使用单线程模型来处理客户端请求。避免多线程的竞争条件和锁开销。

- **高效数据结构**：Redis 提供了多种高效的数据结构，如哈希表、有序集合等。这些数据结构的实现都经过了优化

- **非阻塞 I/O**：Redis 使用了非阻塞 I/O 模型，Redis 不会等待数据的返回，而是继续处理其他请求。可以充分利用 CPU 的时间，提高整体的吞吐量。

有预估 QPS 的提升幅度吗？：benchmark

在 Redis 安装完毕后会自动安装一个 redis-benchmark 测试工具，其是一个压力测试工具，用于测试 Redis 的性能。

**redis-benchmark 常用命令选项说明**

```shell
 -c <clients>       指定本次测试每个指令的并行连接 Redis server 的客户端数量 (default 50)
 -n <requests>      指定本次测试每个指令的请求总数 (default 100000)
 -d <size>          本次测试 set/get 数据大小，单位字节 (default 3)
 -q                 本次测试的报告，简要输出
 -t <tests>         指定要进行测试的命令（get,set,lpush...），如果要指定多个命令使用英文逗号分隔，不能有空格,默认情况下会测试所有命令
```



## **2.Redis 内存不够用怎么办？**

**答案解析思路**：Redis 内存不够用时，会触发 Redis 内存淘汰策略。 早期版本的 Redis 有以下 6 种淘汰机制（也叫做内存淘汰策略）：

1. noeviction：不淘汰任何数据，当内存不足时，新增操作会报错，Redis 默认内存淘汰策略；

2. allkeys-lru：淘汰整个键值中最久未使用的键值；

3. allkeys-random：随机淘汰任意键值;

4. volatile-lru：淘汰所有设置了过期时间的键值中最久未使用的键值；

5. volatile-random：随机淘汰设置了过期时间的任意键值；

6. volatile-ttl：优先淘汰更早过期的键值。

7. volatile-lfu：淘汰所有设置了过期时间的键值中，最少使用的键值；

8. allkeys-lfu：淘汰整个键值中最少使用的键值。

> r就是resently,保留最近使用的，淘汰最久不使用的；f是frequently,保留经常使用的，淘汰最不经常使用的
>
> allkeys对应全部，volatile对应设置了过期时间的，二三组合有六种，加上volatile-ttl淘汰过期的，noeviction不淘汰总共8种。

**答案扩展**：当然还可以通过设置 Redis 的最大运行内存来尽量避免这个问题

1. **打开 Redis 的配置文件**：在 Redis 的安装目录下找到 **redis.conf** `redis一切配置都在这个文件里`文件，使用文本编辑器打开该文件。

2. **设置 maxmemory 的值**：取消注释 "**maxmemory**" 参数，并将其值设置为期望的运行内存大小。值可以使用单位 K、M、G 来表示，如"1G"表示 1GB 内存。确保设置的内存大小合理，不要超过可用物理内存的限制。

3. **配置内存淘汰策略**：在 Redis 超过设置的最大内存限制时，需要根据配置的策略来决定如何清理数据。找到并修改"**maxmemory-policy**"参数，可以选择使用的内存逐出策略，如 volatile-lru、allkeys-lru、volatile-random 等。


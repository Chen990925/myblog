---
group: 学习规划
title: 从零基础到 AI Agent 工程师完整学习路径
order: 3
summary: 面向 Java 开发者的 AI Agent 工程师完整成长路线图，涵盖七个阶段：Java 基础筑基、后端核心技术栈、分布式与微服务、工程化能力、AI/LLM 基础、AI Agent 核心技术、项目实战与进阶，每阶段附推荐资源与里程碑。
keywords: [学习路径, AI Agent, Java工程师, 成长路线, RAG, LLM]
---

# 从零基础到 AI Agent 工程师完整学习路径

> 本路线图面向有一定编程兴趣的初学者，或希望从传统 Java 后端转型为 AI Agent 工程师的开发者。
> 全文分为七个阶段，每个阶段标注核心知识点、预期时长和里程碑检验标准。

---

## 阶段一：Java 基础筑基

**预期时长：2-3 个月**

### 核心知识点

| 主题 | 要点 |
|------|------|
| 语言基础 | 数据类型、控制流、数组、字符串、面向对象（封装/继承/多态） |
| 集合框架 | List/Set/Map 使用与区别、HashMap 原理、ConcurrentHashMap |
| 异常处理 | 异常分类、自定义异常、最佳实践 |
| IO/NIO | 文件操作、Stream API、序列化 |
| Java 新特性 | Lambda、Stream、Optional、Records、虚拟线程 |
| 并发编程 | 线程基础、锁机制、线程池、CompletableFuture |
| JVM | 内存模型、GC 算法、类加载机制、基础调优 |

### 本博客对应文章

- [Collections 之 HashMap](/Note/Collections1)
- [Collections 之 ConcurrentHashMap](/Note/Collections2)
- [Collections 之 List](/Note/Collections4)
- [JVM 系列](/Note/jvm1)（jvm1-jvm7）
- [并发编程系列](/Note/ConcurrentProgramming1)（ConcurrentProgramming1-7）
- [Java 8-21 核心新特性速查](/Note/java-features)

### 推荐资源

- 《Java核心技术》（Core Java）
- 《Effective Java》（第三版）
- 《Java并发编程实战》
- 廖雪峰 Java 教程（免费）

### 里程碑检验

- 能独立实现一个多线程的文件下载器
- 能解释 HashMap 的底层原理（数组+链表+红黑树）
- 能说出 JVM 内存区域划分和 GC 回收算法
- 能用 Stream API 优雅处理集合操作

---

## 阶段二：后端核心技术栈

**预期时长：3-4 个月**

### 核心知识点

| 主题 | 要点 |
|------|------|
| MySQL | SQL 编写、索引原理、事务、MVCC、慢 SQL 优化 |
| Spring Framework | IoC、AOP、事务管理、事件机制 |
| Spring Boot | 自动配置原理、Starter 机制、Actuator |
| Spring MVC | 请求处理、拦截器、全局异常、RESTful 设计 |
| MyBatis | 核心配置、动态 SQL、插件、MyBatis-Plus |
| Redis | 数据结构、持久化、集群、缓存设计 |
| 消息队列 | RabbitMQ/RocketMQ/Kafka 选一门深入 |

### 本博客对应文章

- [MySQL 系列](/Note/mysql1)（mysql1-mysql6）
- [Spring 系列](/Note/spring1)（spring1-spring9）
- [SpringBoot 系列](/Note/springboot1)（springboot1-2）
- [MyBatis 系列](/Note/mybatis1)（mybatis1-mybatis8）
- [Redis 系列](/Note/redis1)（redis1-redis4）
- [Kafka 系列](/Note/kafka1)（kafka1-kafka3）
- [RabbitMQ 系列](/Note/rabbitMQ1)（rabbitMQ1-rabbitMQ5）
- [RocketMQ 系列](/Note/rocketMQ1)（rocketMQ1-rocketMQ4）

### 推荐资源

- 《高性能MySQL》
- Spring 官方文档
- 《Redis设计与实现》
- 黑马程序员/尚硅谷视频教程

### 里程碑检验

- 能独立搭建 Spring Boot + MySQL + Redis + MQ 的后端项目
- 能解释 Spring IoC 和 AOP 的实现原理
- 能使用 EXPLAIN 分析慢 SQL 并优化
- 能设计合理的缓存策略并处理缓存穿透/击穿/雪崩

---

## 阶段三：分布式与微服务

**预期时长：2-3 个月**

### 核心知识点

| 主题 | 要点 |
|------|------|
| Spring Cloud | Gateway、Feign、Ribbon、OAuth2/JWT |
| 分布式理论 | CAP、BASE、分布式事务、一致性算法 |
| Docker | 容器化、Dockerfile、docker-compose |
| Kubernetes | Pod/Deployment/Service、部署、扩缩容 |
| 分库分表 | ShardingSphere、分片策略、全局ID |
| 注册中心 | Zookeeper / Nacos |
| 链路追踪 | SkyWalking / Zipkin |

### 本博客对应文章

- [SpringCloud 系列](/Note/springCloud1)（springCloud1-6）
- [分布式系统核心理论](/Note/distributed1)
- [Docker 容器化实战](/Note/docker1)
- [Kubernetes 入门与 Java 应用部署](/Note/kubernetes1)
- [数据库分库分表实战](/Note/sharding1)
- [Zookeeper 系列](/Note/zookeeper)（zookeeper-5）
- [SkyWalking 实战](/Share/skywalking)

### 推荐资源

- 《微服务设计》（Sam Newman）
- Docker 官方文档
- Kubernetes 官方教程（kubernetes.io/docs）
- 《数据密集型应用系统设计》（DDIA）—— **强烈推荐**

### 里程碑检验

- 能将 Java 应用 Docker 化并部署到 K8s 集群
- 能解释 CAP 定理并说出不同场景下的取舍
- 能设计一个分布式事务方案（如订单-库存-支付）
- 能搭建 Spring Cloud 微服务体系

---

## 阶段四：工程化能力

**预期时长：1-2 个月**

### 核心知识点

| 主题 | 要点 |
|------|------|
| 设计模式 | 单例、工厂、代理、策略、模板、观察者、责任链 |
| Git 工作流 | 分支策略、Code Review、提交规范 |
| CI/CD | Jenkins/GitHub Actions 自动构建部署 |
| 单元测试 | JUnit5、Mockito、Spring Boot Test、JaCoCo |
| 代码规范 | Clean Code、SOLID 原则、重构技巧 |

### 本博客对应文章

- [23 种设计模式](/Share/23signMode)
- [Java 单元测试实战](/Note/unittest1)
- [如何减少 if-else](/Share/howToreduceIfelse)
- [如何写一个 Starter](/Share/howtoWriteStartter)

### 推荐资源

- 《Head First 设计模式》
- 《Clean Code》（Robert C. Martin）
- 《重构：改善既有代码的设计》
- Baeldung 教程（免费，英文）

### 里程碑检验

- 能在项目中正确运用 5 种以上设计模式
- 核心业务代码单元测试覆盖率达到 80%+
- 能搭建完整的 CI/CD 流水线
- 代码通过 SonarQube 检查无严重问题

---

## 阶段五：AI/LLM 基础

**预期时长：1-2 个月**

### 核心知识点

| 主题 | 要点 |
|------|------|
| AI 基础概念 | 机器学习/深度学习/大语言模型的区别 |
| Transformer 架构 | Self-Attention、位置编码、预训练与微调 |
| LLM 核心概念 | Token、Temperature、上下文窗口、Fine-tuning |
| Python 基础 | 基本语法（AI 生态以 Python 为主，需能读懂代码） |
| 模型使用 | API 调用、Prompt 基础、流式响应 |
| 模型部署 | Ollama 本地部署、vLLM、量化概念 |

### 本博客对应文章

- [大语言模型基础与 Java 集成](/AIAgent/llm-basics)
- [Prompt 工程进阶](/AIAgent/prompt-engineering)

### 推荐资源

- 吴恩达《ChatGPT Prompt Engineering for Developers》（免费短课）
- 3Blue1Brown 的 Neural Networks 系列视频
- Hugging Face 教程（免费）
- 《动手学深度学习》（李沐，免费）

### 里程碑检验

- 能用 Java/Python 调用 LLM API 完成文本生成任务
- 能解释 Transformer 的 Self-Attention 机制
- 能用 Ollama 在本地部署和运行开源模型
- 能设计高质量的 System Prompt

---

## 阶段六：AI Agent 核心技术

**预期时长：2-3 个月**

### 核心知识点

| 主题 | 要点 |
|------|------|
| Agent 设计模式 | ReAct、CoT 思维链、感知-推理-行动循环 |
| Function Calling | Tool Use 原理、工具注册与调用、多工具编排 |
| RAG 系统 | 文档处理、Embedding、向量数据库、检索策略、Reranking |
| Prompt 工程 | Few-shot、Structured Output、注入防护、评估迭代 |
| LangChain4j | AiServices、Tool Calling、RAG 集成、Spring Boot 整合 |
| 记忆机制 | 短期对话记忆、长期向量记忆、记忆压缩 |
| 多 Agent | 任务分解、Agent 协作、监督者模式 |

### 本博客对应文章

- [Agent 设计模式：ReAct 与思维链](/AIAgent/agent-patterns)
- [RAG 检索增强生成系统实战](/AIAgent/rag-system)
- [Prompt 工程进阶](/AIAgent/prompt-engineering)
- [LangChain4j 框架实战](/AIAgent/langchain4j)

### 推荐资源

- LangChain4j 官方文档（docs.langchain4j.dev）
- 吴恩达《AI Agents in LangGraph》
- Lilian Weng 的博客（lilianweng.github.io）
- 《Building LLM Powered Applications》

### 里程碑检验

- 能独立实现一个 ReAct Agent（带工具调用能力）
- 能搭建完整的 RAG 系统（文档→Embedding→向量存储→检索→生成）
- 能用 LangChain4j + Spring Boot 构建 AI 应用
- 能设计防御 Prompt 注入的安全策略

---

## 阶段七：项目实战与进阶

**预期时长：持续进行**

### 实战项目建议

| 项目 | 技术栈 | 难度 |
|------|--------|------|
| 企业知识库问答系统 | RAG + 向量数据库 + Spring Boot | 入门 |
| 智能客服 Agent | ReAct + 多工具 + 记忆 | 中级 |
| 代码审查 AI 助手 | Agent + Git API + Code Analysis | 中级 |
| 多 Agent 协作平台 | 多 Agent + 任务编排 + 监控 | 高级 |
| 自动化数据分析平台 | Agent + SQL生成 + 可视化 | 高级 |

### 进阶方向

```
┌─ RAG 优化 ─── 混合检索、Query 改写、Chunk 优化、评估体系
│
├─ Agent 工程化 ── 可观测性、容错重试、成本控制、安全防护
│
├─ 模型微调 ─── LoRA/QLoRA、数据集构建、评估基准
│
├─ 多模态 ──── 图文理解、语音交互、视频分析
│
└─ 生产部署 ── 模型服务化、负载均衡、A/B 测试、灰度发布
```

### 持续学习资源

- Arxiv 论文追踪（关注 cs.CL、cs.AI 分类）
- Twitter/X 上的 AI 研究者（Karpathy、Jim Fan 等）
- GitHub Trending（AI 相关项目）
- LangChain / LlamaIndex 的 Release Notes

### 里程碑检验

- 有一个完整的 AI Agent 项目上线（哪怕是个人项目）
- 能设计并优化 RAG 系统的评估指标
- 能处理 LLM 应用的工程问题（延迟、成本、可靠性）
- 能跟踪 AI 领域最新进展并快速学习新技术

---

## 学习路径总览

```
阶段一（2-3月）          阶段二（3-4月）          阶段三（2-3月）
Java 基础 ──────────→ 后端技术栈 ──────────→ 分布式与微服务
  │                      │                      │
  └── 语言+集合+并发+JVM  └── Spring+MySQL+Redis  └── Docker+K8s+分布式
                                                 │
                                                 ▼
阶段四（1-2月）          阶段五（1-2月）          阶段六（2-3月）
工程化能力 ←────────── AI/LLM 基础 ──────────→ AI Agent 核心
  │                      │                      │
  └── 设计模式+测试+CI/CD └── 模型原理+API调用   └── ReAct+RAG+LangChain4j
                                                 │
                                                 ▼
                                          阶段七（持续）
                                          项目实战与进阶
```

**总预计时长：12-18 个月**（根据个人基础和投入时间会有差异）

> 重要提醒：
> 1. 不要等学完所有基础才开始做项目，每学完一个阶段就动手实践
> 2. 阶段一到四是传统 Java 后端必备技能，即使不走 AI 方向也很有价值
> 3. 阶段五到六是转型 AI Agent 的关键，需要大量动手实践
> 4. 保持好奇心，AI 领域发展极快，持续学习是这个方向的核心竞争力

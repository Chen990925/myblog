---
group: AI Agent专题
title: LangChain4j 框架实战
order: 5
---

# LangChain4j 框架实战

## LangChain4j 概述

LangChain4j 是 LangChain 的 Java 实现，为 Java 开发者提供了一套构建 AI 应用的工具链：

- **统一抽象**：屏蔽不同 LLM 提供商的 API 差异
- **AiServices**：声明式接口定义，类似 MyBatis Mapper
- **内置 RAG**：文档加载、分块、Embedding、检索全流程
- **Tool Calling**：Java 注解定义工具，自动序列化
- **Memory 管理**：内置多种对话记忆策略

### 引入依赖

```xml
<!-- 核心模块 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j</artifactId>
    <version>0.36.2</version>
</dependency>

<!-- OpenAI 集成 -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai</artifactId>
    <version>0.36.2</version>
</dependency>

<!-- Spring Boot Starter -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-spring-boot-starter</artifactId>
    <version>0.36.2</version>
</dependency>
```

## ChatLanguageModel

### 基本使用

```java
// 创建模型
ChatLanguageModel model = OpenAiChatModel.builder()
    .apiKey("sk-xxx")
    .modelName("gpt-4o-mini")
    .temperature(0.7)
    .build();

// 简单调用
String answer = model.generate("什么是 RAG？");

// 多轮对话
ChatResponse response = model.chat(ChatRequest.builder()
    .messages(
        SystemMessage.from("你是一个Java技术专家"),
        UserMessage.from("解释一下 Spring Boot 的自动配置原理")
    )
    .build());

String content = response.aiMessage().text();
```

### 流式模型（StreamingChatLanguageModel）

```java
StreamingChatLanguageModel streamModel = OpenAiStreamingChatModel.builder()
    .apiKey("sk-xxx")
    .modelName("gpt-4o-mini")
    .build();

// 流式调用
streamModel.generate("写一篇关于 Docker 的教程", new StreamingResponseHandler<AiMessage>() {

    @Override
    public void onNext(String token) {
        // 逐 Token 输出（打字机效果）
        System.out.print(token);
    }

    @Override
    public void onComplete(Response<AiMessage> response) {
        System.out.println("\n--- 生成完毕 ---");
    }

    @Override
    public void onError(Throwable error) {
        System.err.println("生成失败: " + error.getMessage());
    }
});
```

## AiServices（声明式 API）

AiServices 是 LangChain4j 最核心的特性，通过 Java 接口 + 注解定义 AI 服务，类似于 MyBatis 的 Mapper 接口。

### 基本用法

```java
// 1. 定义接口
interface Assistant {

    @SystemMessage("你是一个友好的AI助手，用中文回答。")
    String chat(String userMessage);
}

// 2. 创建代理实例
Assistant assistant = AiServices.create(Assistant.class, model);

// 3. 使用
String answer = assistant.chat("什么是微服务架构？");
```

### 结构化输出

```java
// 定义返回类型
record SentimentResult(String sentiment, double confidence, List<String> keywords) {}

interface SentimentAnalyzer {

    @UserMessage("分析以下文本的情感倾向：{{it}}")
    SentimentResult analyze(String text);
}

SentimentAnalyzer analyzer = AiServices.create(SentimentAnalyzer.class, model);

// LLM 会自动输出 JSON 并反序列化为 Java 对象
SentimentResult result = analyzer.analyze("这个产品太棒了，强烈推荐！");
// result = SentimentResult(sentiment=positive, confidence=0.95, keywords=[太棒了, 强烈推荐])
```

### 参数模板

```java
interface CodeReviewer {

    @SystemMessage("你是一个资深Java代码审查员。")
    @UserMessage("""
        请审查以下代码并给出建议：
        
        语言：{{language}}
        代码：
        ```
        {{code}}
        ```
        
        请从以下维度评审：
        1. 代码规范
        2. 性能问题
        3. 安全隐患
        """)
    String review(@V("language") String language, @V("code") String code);
}
```

## Tool Calling（工具调用）

用 `@Tool` 注解将普通 Java 方法变为 LLM 可调用的工具：

```java
// 1. 定义工具类
public class WeatherTools {

    @Tool("获取指定城市的实时天气信息")
    public String getWeather(@P("城市名称") String city) {
        // 调用实际的天气 API
        return weatherApiClient.getWeather(city);
        // 返回示例：{"city":"北京","temp":22,"condition":"晴","humidity":45}
    }

    @Tool("计算两个日期之间相差的天数")
    public int daysBetween(@P("开始日期") String startDate,
                           @P("结束日期") String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return (int) ChronoUnit.DAYS.between(start, end);
    }
}

// 2. 注册工具并创建 Agent
ChatLanguageModel model = OpenAiChatModel.builder()
    .apiKey("sk-xxx")
    .modelName("gpt-4o-mini")
    .build();

interface SmartAssistant {
    @SystemMessage("你是一个智能助手，可以使用工具来获取信息。")
    String chat(@MemoryId String sessionId, @UserMessage String message);
}

SmartAssistant assistant = AiServices.builder(SmartAssistant.class)
    .chatLanguageModel(model)
    .tools(new WeatherTools())
    .chatMemory(MessageWindowChatMemory.withMaxMessages(20))
    .build();

// 3. Agent 会自动判断何时调用哪个工具
String answer = assistant.chat("session1", "北京今天天气怎么样？");
// LLM 内部流程：Thought → 调用 getWeather("北京") → 获取结果 → 生成回答
```

## RAG 模块

### 文档加载与分块

```java
// 从文件加载文档
Document document = FileSystemDocumentLoader.loadDocument(
    Path.of("docs/manual.pdf"),
    new ApachePdfBoxDocumentParser()
);

// 文本分块
DocumentSplitter splitter = DocumentSplitters
    .recursive(500, 50)       // chunkSize=500, overlap=50
    .append(new CharacterTokenizer());

List<TextSegment> segments = splitter.split(document);
```

### Embedding + 存储

```java
// Embedding 模型
EmbeddingModel embeddingModel = OpenAiEmbeddingModel.builder()
    .apiKey("sk-xxx")
    .modelName("text-embedding-3-small")
    .build();

// 内存向量存储（开发/测试用）
EmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();

// 生产环境用 Milvus/Qdrant
// EmbeddingStore<TextSegment> embeddingStore = MilvusEmbeddingStore.builder()
//     .host("localhost").port(19530)
//     .collectionName("documents")
//     .dimension(1536)
//     .build();

// 存储文档块
EmbeddingStoreIngestor ingestor = EmbeddingStoreIngestor.builder()
    .documentSplitter(splitter)
    .embeddingModel(embeddingModel)
    .embeddingStore(embeddingStore)
    .build();

ingestor.ingest(document);
```

### 集成到 AiServices

```java
// 创建内容检索器
ContentRetriever retriever = EmbeddingStoreContentRetriever.builder()
    .embeddingStore(embeddingStore)
    .embeddingModel(embeddingModel)
    .maxResults(5)
    .minScore(0.7)
    .build();

// 带 RAG 的 AI 服务
interface KnowledgeAssistant {
    @SystemMessage("你是一个知识库助手，基于提供的资料回答问题。如果资料中没有相关信息，请告知用户。")
    String answer(@MemoryId String sessionId, @UserMessage String question);
}

KnowledgeAssistant assistant = AiServices.builder(KnowledgeAssistant.class)
    .chatLanguageModel(model)
    .contentRetriever(retriever)
    .chatMemory(MessageWindowChatMemory.withMaxMessages(10))
    .build();

String answer = assistant.answer("session1", "公司的请假制度是什么？");
```

## Memory 管理

### 内置 Memory 策略

```java
// 窗口记忆：保留最近 N 条消息
ChatMemory memory = MessageWindowChatMemory.withMaxMessages(20);

// Token 限制记忆：保留最近 N 个 Token 的消息
ChatMemory memory = TokenWindowChatMemory.withMaxTokens(4000,
    new OpenAiTokenizer("gpt-4o-mini"));
```

### 持久化 Memory

```java
// 自定义持久化存储
public class RedisChatMemoryStore implements ChatMemoryStore {

    private final RedisTemplate<String, String> redis;

    @Override
    public List<ChatMessage> getMessages(Object memoryId) {
        String key = "chat:memory:" + memoryId;
        String json = redis.opsForValue().get(key);
        if (json == null) return new ArrayList<>();
        return ChatMessageDeserializer.messagesFromJson(json);
    }

    @Override
    public void updateMessages(Object memoryId, List<ChatMessage> messages) {
        String key = "chat:memory:" + memoryId;
        redis.opsForValue().set(key, ChatMessageSerializer.messagesToJson(messages));
    }

    @Override
    public void deleteMessages(Object memoryId) {
        redis.delete("chat:memory:" + memoryId);
    }
}

// 使用
ChatMemory memory = MessageWindowChatMemory.builder()
    .id("user-123")
    .maxMessages(20)
    .chatMemoryStore(new RedisChatMemoryStore(redisTemplate))
    .build();
```

## Spring Boot 整合完整示例

### 配置文件

```yaml
# application.yml
langchain4j:
  open-ai:
    chat-model:
      api-key: ${OPENAI_API_KEY}
      model-name: gpt-4o-mini
      temperature: 0.7
    embedding-model:
      api-key: ${OPENAI_API_KEY}
      model-name: text-embedding-3-small
    streaming-chat-model:
      api-key: ${OPENAI_API_KEY}
      model-name: gpt-4o-mini
```

### 完整服务实现

```java
@Service
public class RagChatService {

    private final KnowledgeAssistant assistant;

    public RagChatService(
            ChatLanguageModel chatModel,
            EmbeddingModel embeddingModel) {

        // 1. 初始化向量存储
        EmbeddingStore<TextSegment> embeddingStore =
            new InMemoryEmbeddingStore<>();

        // 2. 加载知识库文档
        Document doc = FileSystemDocumentLoader.loadDocument(
            Path.of("knowledge-base/company-handbook.pdf"),
            new ApachePdfBoxDocumentParser()
        );

        // 3. 分块 + Embedding + 存储
        EmbeddingStoreIngestor ingestor = EmbeddingStoreIngestor.builder()
            .documentSplitter(DocumentSplitters.recursive(500, 50))
            .embeddingModel(embeddingModel)
            .embeddingStore(embeddingStore)
            .build();
        ingestor.ingest(doc);

        // 4. 创建检索器
        ContentRetriever retriever = EmbeddingStoreContentRetriever.builder()
            .embeddingStore(embeddingStore)
            .embeddingModel(embeddingModel)
            .maxResults(5)
            .build();

        // 5. 创建 AI 服务
        this.assistant = AiServices.builder(KnowledgeAssistant.class)
            .chatLanguageModel(chatModel)
            .contentRetriever(retriever)
            .chatMemory(MessageWindowChatMemory.withMaxMessages(20))
            .build();
    }

    public String chat(String sessionId, String question) {
        return assistant.answer(sessionId, question);
    }
}

// 接口定义
interface KnowledgeAssistant {
    @SystemMessage("""
        你是公司的智能知识助手。
        基于提供的参考资料回答用户问题。
        如果资料中没有相关信息，请告知用户并建议联系相关部门。
        """)
    String answer(@MemoryId String sessionId, @UserMessage String question);
}
```

### Controller 层

```java
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final RagChatService chatService;

    @PostMapping
    public Result<String> chat(@RequestBody ChatRequest request) {
        String answer = chatService.chat(request.getSessionId(), request.getMessage());
        return Result.success(answer);
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> chatStream(@RequestParam String sessionId,
                                   @RequestParam String message) {
        // 流式响应实现...
    }
}
```

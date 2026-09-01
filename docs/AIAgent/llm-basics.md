---
group: AI Agent专题
title: 大语言模型基础与 Java 集成
order: 1
summary: 大语言模型（LLM）基础知识，涵盖 Token/Temperature/TopP 等核心概念、主流模型对比（GPT/Claude/通义千问/DeepSeek）、Java 调用 LLM API 实战、流式响应处理及 Token 成本控制。
keywords: [LLM, Token, Temperature, GPT, DeepSeek, 流式响应, API调用]
---

# 大语言模型基础与 Java 集成

## LLM 核心概念

### 什么是大语言模型

大语言模型（Large Language Model, LLM）是基于 Transformer 架构，在海量文本数据上训练的神经网络模型。它通过**预测下一个 Token** 来生成文本，具备理解、推理、创作、编程等能力。

### 核心参数

| 参数 | 含义 | 常用值 | 说明 |
|------|------|--------|------|
| **Token** | 模型处理文本的最小单位 | - | 不等于字符或词，1 个中文字约 1-2 个 Token |
| **Temperature** | 控制输出的随机性 | 0-2 | 0 = 确定性最高，1 = 默认，>1 = 更随机/创意 |
| **Top P** | 核采样概率 | 0-1 | 从概率前 P% 的词中采样，0.9 是常用值 |
| **Max Tokens** | 最大输出长度 | 模型相关 | 控制响应长度，影响成本和延迟 |
| **Context Window** | 上下文窗口大小 | 4K-200K | 模型能处理的最大 Token 数 |

**Temperature vs Top P：**
- 通常只调一个，不建议同时调
- Temperature 低 → 输出确定、一致（适合代码生成、数据分析）
- Temperature 高 → 输出多样、创意（适合文案、头脑风暴）

```
Temperature = 0: "今天天气很好" → "适合出去散步"（几乎每次一样）
Temperature = 1: "今天天气很好" → "我们去公园吧"/"打开窗户透透气"/...（多样化）
```

## 主流模型对比

| 模型 | 厂商 | 上下文窗口 | 特点 | 适合场景 |
|------|------|-----------|------|----------|
| **GPT-4o** | OpenAI | 128K | 综合能力强，多模态 | 通用场景 |
| **GPT-4o-mini** | OpenAI | 128K | 性价比高，速度快 | 简单任务、高并发 |
| **Claude 3.5 Sonnet** | Anthropic | 200K | 长文本能力强，代码能力优秀 | 长文档分析、编码 |
| **通义千问 Qwen-Max** | 阿里 | 32K | 中文能力强，国内访问快 | 中文场景 |
| **DeepSeek-V3** | DeepSeek | 64K | 开源可部署，推理能力强 | 私有化部署、推理 |
| **GLM-4** | 智谱 | 128K | 国内可用，API 价格低 | 国内生产环境 |

### 模型选型建议

```
追求效果 → GPT-4o / Claude 3.5 Sonnet
追求性价比 → GPT-4o-mini / DeepSeek
国内访问 → 通义千问 / GLM-4 / DeepSeek
私有部署 → DeepSeek / Qwen（开源版本）
长文本处理 → Claude 3.5 Sonnet（200K）
```

## Java 调用 LLM API

### 方式一：HTTP Client 直接调用

以 OpenAI 兼容接口为例（大多数国内模型都兼容）：

```java
public class LlmClient {
    private static final String API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String API_KEY = "sk-xxx";

    private final HttpClient httpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(30))
        .build();

    /**
     * 同步调用（非流式）
     */
    public String chat(String userMessage) throws Exception {
        String requestBody = """
            {
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": "你是一个有帮助的AI助手"},
                    {"role": "user", "content": "%s"}
                ],
                "temperature": 0.7,
                "max_tokens": 2000
            }
            """.formatted(userMessage);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(API_URL))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer " + API_KEY)
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();

        HttpResponse<String> response = httpClient.send(request,
            HttpResponse.BodyHandlers.ofString());

        // 解析响应 JSON
        JsonObject json = JsonParser.parseString(response.body()).getAsJsonObject();
        return json.getAsJsonArray("choices")
            .get(0).getAsJsonObject()
            .getAsJsonObject("message")
            .get("content").getAsString();
    }
}
```

### 方式二：使用 SDK（推荐）

以 OpenAI Java SDK 为例：

```xml
<dependency>
    <groupId>com.openai</groupId>
    <artifactId>openai-java</artifactId>
    <version>0.8.0</version>
</dependency>
```

```java
OpenAIClient client = OpenAIOkHttpClient.builder()
    .apiKey("sk-xxx")
    .build();

ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
    .model("gpt-4o-mini")
    .addSystemMessage("你是一个有帮助的AI助手")
    .addUserMessage("解释什么是 RAG")
    .temperature(0.7)
    .maxTokens(2000)
    .build();

ChatCompletion completion = client.chat().completions().create(params);
String content = completion.choices().get(0).message().content();
```

### 多轮对话（维护消息历史）

```java
public class ChatSession {
    private final List<ChatMessage> messages = new ArrayList<>();

    public ChatSession(String systemPrompt) {
        messages.add(ChatMessage.system(systemPrompt));
    }

    public String chat(String userInput) {
        messages.add(ChatMessage.user(userInput));

        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
            .model("gpt-4o-mini")
            .messages(messages.stream()
                .map(m -> ChatCompletionMessageParam.ofUser(
                    UserMessage.builder().content(m.getContent()).build()))
                .collect(Collectors.toList()))
            .build();

        ChatCompletion completion = client.chat().completions().create(params);
        String response = completion.choices().get(0).message().content();

        messages.add(ChatMessage.assistant(response));
        return response;
    }
}
```

## 流式响应（Streaming）

对于长文本生成，流式响应可以显著改善用户体验（打字机效果）：

```java
public void chatStream(String userMessage, Consumer<String> onToken) {
    String requestBody = """
        {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "user", "content": "%s"}
            ],
            "stream": true
        }
        """.formatted(userMessage);

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(API_URL))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer " + API_KEY)
        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
        .build();

    // SSE（Server-Sent Events）流式处理
    httpClient.send(request, HttpResponse.BodyHandlers.ofLines())
        .body()
        .filter(line -> line.startsWith("data: "))
        .map(line -> line.substring(6))           // 去掉 "data: " 前缀
        .filter(data -> !data.equals("[DONE]"))    // 过滤结束标记
        .forEach(data -> {
            JsonObject json = JsonParser.parseString(data).getAsJsonObject();
            JsonElement delta = json.getAsJsonArray("choices")
                .get(0).getAsJsonObject()
                .getAsJsonObject("delta")
                .get("content");
            if (delta != null && !delta.isJsonNull()) {
                onToken.accept(delta.getAsString()); // 逐 Token 回调
            }
        });
}
```

### Spring Boot 中的流式接口

```java
@RestController
public class ChatController {

    @GetMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> chatStream(@RequestParam String message) {
        return Flux.create(sink -> {
            llmClient.chatStream(message, token -> {
                sink.next(token);
            });
            sink.complete();
        });
    }
}
```

## Token 计算与成本控制

### Token 估算

```
英文：1 token ≈ 4 字符 ≈ 0.75 个单词
中文：1 个汉字 ≈ 1-2 个 token
```

### 成本计算公式

```
单次调用成本 = (输入Token数 × 输入单价 + 输出Token数 × 输出单价) / 1000
```

以 GPT-4o-mini 为例（输入 $0.15/1M tokens，输出 $0.60/1M tokens）：
- 输入 1000 tokens + 输出 500 tokens = $0.00015 + $0.00030 = $0.00045

### 成本控制策略

| 策略 | 方法 |
|------|------|
| **模型降级** | 简单任务用 mini/small 模型，复杂任务用大模型 |
| **Prompt 精简** | 去掉冗余的 system prompt，用简洁的指令 |
| **输出限制** | 合理设置 max_tokens，避免过长输出 |
| **缓存** | 相同问题命中缓存直接返回，不调用 LLM |
| **批量处理** | 使用 Batch API，价格降低 50% |
| **本地模型** | 非核心场景用本地部署的开源模型 |

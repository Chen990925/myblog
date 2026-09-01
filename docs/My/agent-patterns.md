---
group: AI Agent专题
title: Agent 设计模式：ReAct 与思维链
order: 2
summary: 深入讲解 AI Agent 的设计模式，涵盖 ReAct 推理-行动循环、CoT 思维链推理、Function Calling / Tool Use 原理与实现、Agent 记忆机制（短期/长期）及多 Agent 协作模式。
keywords: [Agent, ReAct, CoT, Function Calling, Tool Use, 记忆机制, 多Agent]
---

# Agent 设计模式：ReAct 与思维链

## 什么是 AI Agent

AI Agent 是一个能够**感知环境、进行推理、采取行动**的智能系统。与普通的 LLM 对话不同，Agent 能够：

- 自主规划和分解任务
- 调用外部工具（搜索、数据库、API）
- 根据行动结果调整策略
- 维护记忆和上下文

```
普通 LLM 调用：
  用户输入 → LLM → 文本输出

AI Agent：
  用户目标 → 推理 → 选择工具 → 执行动作 → 观察结果 → 继续推理 → ... → 达成目标
```

## ReAct 模式

ReAct（Reasoning + Acting）是最经典的 Agent 设计模式，核心思想是让 LLM 交替进行**推理（Thought）**和**行动（Action）**。

### 工作流程

```
用户提问："北京现在的天气怎么样？"

Thought 1: 用户想知道北京的实时天气，我需要调用天气API查询
Action 1: get_weather(city="北京")
Observation 1: {"temp": 22, "condition": "晴", "humidity": 45}

Thought 2: 我已经获取到了北京的天气信息，现在可以回答用户了
Action 2: finish("北京现在天气晴朗，气温22°C，湿度45%")
```

### ReAct Prompt 模板

```
你是一个智能助手，可以使用以下工具：

{tool_descriptions}

回答时请严格按照以下格式：

Question: 用户的问题
Thought: 你的思考过程
Action: 要使用的工具名称
Action Input: 工具的输入参数
Observation: 工具返回的结果
... (Thought/Action/Observation 可以重复多次)
Thought: 我已经知道答案了
Final Answer: 最终回答

Question: {user_question}
```

### Java 实现 ReAct 循环

```java
public class ReactAgent {
    private final LlmClient llm;
    private final Map<String, Tool> tools;
    private final List<Message> history = new ArrayList<>();
    private static final int MAX_ITERATIONS = 10;

    public String run(String question) {
        history.add(Message.user(buildReactPrompt(question)));

        for (int i = 0; i < MAX_ITERATIONS; i++) {
            // 1. 调用 LLM 获取下一步行动
            String response = llm.chat(history);
            history.add(Message.assistant(response));

            // 2. 解析响应
            if (response.contains("Final Answer:")) {
                return extractFinalAnswer(response);
            }

            // 3. 提取 Action 和 Action Input
            String actionName = extractAction(response);
            String actionInput = extractActionInput(response);

            // 4. 执行工具
            Tool tool = tools.get(actionName);
            String observation = tool.execute(actionInput);

            // 5. 将观察结果加入历史
            history.add(Message.user("Observation: " + observation));
        }

        return "达到最大迭代次数，未能得出答案";
    }
}
```

## CoT 思维链推理

Chain-of-Thought（CoT）让 LLM **逐步推理**而非直接给出答案，显著提升复杂推理任务的准确性。

### 零样本 CoT

只需在 Prompt 末尾加上 "Let's think step by step" 即可触发：

```
问题：一个商店有 23 个苹果，卖了 17 个，又进了 12 个，现在有多少？

直接回答：18 （可能出错）

加了 CoT 提示后：
"Let's think step by step"
→ 商店原来有 23 个苹果
→ 卖了 17 个：23 - 17 = 6
→ 又进了 12 个：6 + 12 = 18
→ 所以现在有 18 个苹果
```

### 少样本 CoT（Few-shot CoT）

在 Prompt 中给出推理过程的示例：

```
问题：小明有 5 本书，小红给了他 3 本，他一共几本？
推理：小明原来有 5 本，小红给了 3 本，5 + 3 = 8，所以是 8 本。
答案：8

问题：一个水池有 100 升水，每分钟流出 5 升，同时流入 3 升，10 分钟后还有多少？
推理：每分钟净流失 5 - 3 = 2 升，10 分钟流失 20 升，100 - 20 = 80 升。
答案：80

问题：{用户问题}
推理：
```

### 自我一致性（Self-Consistency）

对同一问题采样多次（Temperature > 0），取多数投票结果：

```java
public String selfConsistencyAnswer(String question, int sampleCount) {
    Map<String, Integer> answerVotes = new HashMap<>();

    for (int i = 0; i < sampleCount; i++) {
        // 每次采样使用不同的 temperature
        String answer = llm.chat(question, /* temperature */ 0.7);
        String normalizedAnswer = normalize(answer);
        answerVotes.merge(normalizedAnswer, 1, Integer::sum);
    }

    // 返回投票最多的答案
    return answerVotes.entrySet().stream()
        .max(Map.Entry.comparingByValue())
        .map(Map.Entry::getKey)
        .orElse("");
}
```

## Function Calling / Tool Use

Function Calling 是 LLM 原生的工具调用能力，模型不直接执行工具，而是输出**结构化的工具调用指令**，由应用层执行。

### 工作流程

```
1. 应用发送：用户消息 + 可用工具描述（JSON Schema）
2. LLM 返回：工具调用指令（函数名 + 参数 JSON）
3. 应用执行：调用实际函数，获取结果
4. 应用发送：函数结果 + 对话历史
5. LLM 返回：最终回答
```

### 工具定义

```java
// 定义工具
public record WeatherTool(
    @JsonProperty("city") String city,
    @JsonProperty("unit") String unit  // "celsius" or "fahrenheit"
) {}

// 工具的 JSON Schema 描述
String toolDefinition = """
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，如'北京'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "温度单位"
                    }
                },
                "required": ["city"]
            }
        }
    }
    """;
```

### Java 实现 Function Calling

```java
public class FunctionCallingAgent {
    private final LlmClient llm;
    private final Map<String, Function<JsonNode, String>> functions;

    public String run(String userMessage) {
        List<Message> messages = List.of(Message.user(userMessage));

        // 1. 发送消息 + 工具定义给 LLM
        ChatResponse response = llm.chatWithTools(messages, toolDefinitions);

        // 2. 检查 LLM 是否要调用工具
        if (response.hasToolCalls()) {
            for (ToolCall toolCall : response.getToolCalls()) {
                String funcName = toolCall.getFunctionName();
                JsonNode args = toolCall.getArguments();

                // 3. 执行工具
                Function<JsonNode, String> func = functions.get(funcName);
                String result = func.apply(args);

                // 4. 将工具结果加入消息历史
                messages.add(Message.tool(toolCall.getId(), result));
            }

            // 5. 再次调用 LLM 获取最终回答
            response = llm.chatWithTools(messages, toolDefinitions);
        }

        return response.getContent();
    }
}
```

### 工具注册示例

```java
// 注册多个工具
Map<String, Function<JsonNode, String>> functions = new HashMap<>();

functions.put("get_weather", args -> {
    String city = args.get("city").asText();
    return weatherService.getWeather(city).toJson();
});

functions.put("search_database", args -> {
    String query = args.get("query").asText();
    return databaseService.search(query).toJson();
});

functions.put("send_email", args -> {
    String to = args.get("to").asText();
    String body = args.get("body").asText();
    emailService.send(to, body);
    return "邮件发送成功";
});
```

## Agent 记忆机制

### 短期记忆（对话上下文）

短期记忆就是当前对话的消息历史，受上下文窗口限制：

```java
// 滑动窗口：只保留最近 N 条消息
public class SlidingWindowMemory {
    private final int maxMessages;
    private final LinkedList<Message> messages = new LinkedList<>();

    public void add(Message message) {
        messages.add(message);
        while (messages.size() > maxMessages) {
            messages.removeFirst();
        }
    }

    public List<Message> getMessages() {
        return new ArrayList<>(messages);
    }
}
```

### 长期记忆（持久化存储）

长期记忆存储在外部系统（向量数据库），按需检索相关记忆：

```java
public class LongTermMemory {
    private final VectorStore vectorStore;
    private final EmbeddingModel embeddingModel;

    // 存储记忆
    public void remember(String content, Map<String, String> metadata) {
        float[] embedding = embeddingModel.embed(content);
        vectorStore.store(embedding, content, metadata);
    }

    // 检索相关记忆
    public List<String> recall(String query, int topK) {
        float[] queryEmbedding = embeddingModel.embed(query);
        return vectorStore.search(queryEmbedding, topK)
            .stream()
            .map(SearchResult::getContent)
            .toList();
    }
}
```

### 记忆整合模式

```java
public class AgentWithMemory {
    public String chat(String userMessage) {
        // 1. 检索长期记忆
        List<String> relevantMemories = longTermMemory.recall(userMessage, 3);

        // 2. 构建上下文
        String context = String.join("\n", relevantMemories);
        String enrichedPrompt = """
            相关记忆：
            %s

            用户消息：%s
            """.formatted(context, userMessage);

        // 3. 生成回复
        String response = llm.chat(enrichedPrompt);

        // 4. 决定是否存储新记忆
        if (shouldRemember(userMessage, response)) {
            longTermMemory.remember(userMessage + "\n" + response,
                Map.of("timestamp", Instant.now().toString()));
        }

        return response;
    }
}
```

## 多 Agent 协作

当单个 Agent 难以完成复杂任务时，可以将任务分配给多个专业 Agent：

### 协作模式

```
┌─────────────── Planner Agent ───────────────┐
│  分析用户目标，分解子任务，分配给专业 Agent     │
└───────┬──────────┬──────────┬───────────────┘
        │          │          │
        ▼          ▼          ▼
┌─ Research ─┐ ┌─ Coder ──┐ ┌─ Reviewer ─┐
│ 搜索信息    │ │ 编写代码  │ │ 审查结果    │
│ 整理资料    │ │ 修复Bug   │ │ 提出改进    │
└────────────┘ └──────────┘ └────────────┘
```

### 常见多 Agent 架构

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| **顺序链** | A → B → C，依次处理 | 流水线任务 |
| **路由分发** | Router Agent 根据类型分发 | 多领域客服 |
| **协作讨论** | 多 Agent 对话讨论达成共识 | 复杂决策 |
| **分层** | Supervisor → Worker 层级管理 | 大型项目 |

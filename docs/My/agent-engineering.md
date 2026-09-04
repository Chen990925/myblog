---
group: AI Agent专题
title: Agent 工程化：评估、可观测性与生产实践
order: 8
---

# Agent 工程化：评估、可观测性与生产实践

## 从 Demo 到生产的鸿沟

搭一个 Demo Agent 可能只需要 1 天，但把它推到生产环境，**90% 的时间花在评估和调优上**。

```
Demo Agent：
  用户提问 → LLM + 工具 → 回答（能跑通就行）

生产 Agent：
  用户提问 → 护栏校验 → LLM + 工具 → 输出校验 → 审计日志
           ↓                                    ↓
     安全过滤、限流                         幻觉检测、漂移监控
     上下文管理、成本预算                    评估反馈、持续迭代
```

## Agent 评估体系

### 评估维度

| 维度 | 指标 | 说明 |
|------|------|------|
| **任务完成度** | Success Rate | Agent 是否正确完成了任务 |
| **工具选择** | Tool Selection Accuracy | 是否选对了工具 |
| **参数准确** | Parameter Validity | 工具参数是否正确 |
| **效率** | Steps / Tokens / Latency | 完成目标的步骤数、Token 消耗、延迟 |
| **鲁棒性** | Error Recovery | 工具失败时能否恢复 |
| **安全性** | Safety Score | 是否产生有害输出 |
| **忠实度** | Faithfulness | 回答是否忠于检索到的事实 |

### 主流 Benchmark

| Benchmark | 评估内容 | 适合场景 |
|-----------|---------|---------|
| **BFCL** | 函数/工具调用能力 | 基础工具调用验证 |
| **SWE-bench** | 解决真实 GitHub Issue | 编码 Agent |
| **GAIA** | 通用 AI 助手（多步推理+工具） | 综合能力评估 |
| **AgentBench** | 真实环境中的 Agent 表现 | 端到端评估 |
| **τ-bench** | 带 API 和规则的多轮交互 | 工具调用+指令遵循 |
| **HotpotQA** | 多跳问答 | RAG 系统评估 |
| **HumanEval** | Python 代码生成 | 代码能力 |

```
评估路径建议：
  1. 先用 BFCL 验证基础工具调用能力（成本最低）
  2. 再用 SWE-bench / WebArena 评估端到端任务
  3. 最后构建业务专属评测集（最重要）
```

### RAGAS 框架（RAG 评估）

RAGAS 是 RAG 系统最常用的评估框架：

```java
// RAGAS 四大核心指标
public class RagasEvaluation {

    /**
     * 1. 忠实度（Faithfulness）
     * 回答中的每个声明是否都有检索来源支持
     */
    public double faithfulness(String answer, List<String> contexts) {
        // 将回答拆成多个声明
        List<String> claims = llm.extractClaims(answer);

        int supported = 0;
        for (String claim : claims) {
            if (isSupportedByContexts(claim, contexts)) {
                supported++;
            }
        }
        return (double) supported / claims.size();
    }

    /**
     * 2. 回答相关性（Answer Relevance）
     * 回答是否切题
     */
    public double answerRelevance(String question, String answer) {
        String evalPrompt = """
            请评估以下回答与问题的相关性（0-1 分）：
            问题：%s
            回答：%s
            只输出分数。
            """.formatted(question, answer);
        return Double.parseDouble(llm.chat(evalPrompt));
    }

    /**
     * 3. 上下文相关性（Context Relevance）
     * 检索到的内容是否与问题相关
     */
    public double contextRelevance(String question, List<String> contexts) {
        // 评估每个 context 与 question 的相关性
        return contexts.stream()
            .mapToDouble(ctx -> evaluateRelevance(question, ctx))
            .average()
            .orElse(0);
    }

    /**
     * 4. 上下文召回率（Context Recall）
     * 是否检索到了回答所需的全部信息
     */
    public double contextRecall(String answer, List<String> contexts,
                                 String groundTruth) {
        // 对比 ground truth 和检索结果
        return evaluateRecall(groundTruth, contexts);
    }
}
```

### LLM-as-Judge

用更强的模型来评估输出质量：

```java
public class LlmJudge {

    public EvalResult evaluate(String question, String context,
                                String answer) {
        String prompt = """
            你是一个专业的 AI 评估员。请评估以下回答的质量。

            ## 评分维度（各 1-5 分）
            1. 准确性：回答是否基于参考资料
            2. 完整性：是否覆盖了问题的所有方面
            3. 清晰度：表述是否清楚易懂
            4. 安全性：是否包含有害或不当内容

            ## 输入
            问题：%s
            参考资料：%s
            模型回答：%s

            ## 输出格式（JSON）
            {"accuracy": 4, "completeness": 3, "clarity": 5, "safety": 5, "overall": 4, "reason": "..."}
            """.formatted(question, context, answer);

        String json = judgeLlm.chat(prompt);
        return objectMapper.readValue(json, EvalResult.class);
    }
}
```

## Harness 工程

Harness（治理框架）是让 Agent 可控、可观测、可审计的关键工程层。

### Trace 轨迹追踪

记录 Agent 每次执行的完整链路：

```java
@Component
public class AgentTracer {

    private final TracerStorage storage;

    /**
     * 追踪 Agent 的一次完整执行
     */
    public TraceContext startTrace(String sessionId, String userQuery) {
        TraceContext ctx = TraceContext.builder()
            .traceId(UUID.randomUUID().toString())
            .sessionId(sessionId)
            .userQuery(userQuery)
            .startTime(Instant.now())
            .spans(new ArrayList<>())
            .build();

        storage.save(ctx);
        return ctx;
    }

    public void addSpan(TraceContext ctx, Span span) {
        ctx.getSpans().add(span);
        storage.update(ctx);
    }
}

// Span 类型
public sealed interface Span {
    record LlmSpan(String model, String prompt, String response,
                     int inputTokens, int outputTokens,
                     Duration latency) implements Span {}

    record ToolSpan(String toolName, JsonNode args, String result,
                    Duration latency, boolean success) implements Span {}

    record DecisionSpan(String reasoning, String chosenAction) implements Span {}
}
```

### 可观测性面板

```
┌────────────────── Agent 监控面板 ──────────────────┐
│                                                     │
│  📊 总览                                            │
│  ├─ 请求量：1,234 / 天                              │
│  ├─ 成功率：94.2%                                   │
│  ├─ 平均延迟：2.3s（P50）/ 5.1s（P95）              │
│  ├─ 平均 Token：850 input + 320 output              │
│  ├─ 日均成本：$12.50                                │
│  │                                                  │
│  🔧 工具调用                                        │
│  ├─ search_database：调用 456 次，成功 98.2%         │
│  ├─ send_email：调用 89 次，成功 100%                │
│  ├─ get_weather：调用 23 次，失败 3 次（超时）        │
│  │                                                  │
│  ⚠️ 异常告警                                        │
│  ├─ 幻觉率：2.1%（阈值 3%）                         │
│  ├─ 漂移率：1.5%（阈值 2%）                         │
│  ├─ Token 超限告警：2 次                             │
│  └─ 工具超时：3 次                                  │
└─────────────────────────────────────────────────────┘
```

### 上下文治理

Agent 的上下文管理直接影响质量和成本：

```java
public class ContextManager {

    private static final int MAX_CONTEXT_TOKENS = 8000;
    private static final int SYSTEM_PROMPT_TOKENS = 1500;

    /**
     * 智能上下文构建
     * 在 Token 预算内，优先放入最重要的信息
     */
    public List<ChatMessage> buildContext(String userQuery,
                                           ChatMemory memory,
                                           List<Document> ragResults) {
        int remainingBudget = MAX_CONTEXT_TOKENS - SYSTEM_PROMPT_TOKENS;

        List<ChatMessage> context = new ArrayList<>();

        // 优先级 1：RAG 检索结果（最重要）
        for (Document doc : ragResults) {
            int tokens = countTokens(doc.getContent());
            if (tokens <= remainingBudget) {
                context.add(SystemMessage.from("参考资料：" + doc.getContent()));
                remainingBudget -= tokens;
            }
        }

        // 优先级 2：最近的对话历史
        List<ChatMessage> history = memory.getMessages();
        for (int i = history.size() - 1; i >= 0; i--) {
            int tokens = countTokens(history.get(i).text());
            if (tokens <= remainingBudget) {
                context.add(0, history.get(i)); // 插入到前面
                remainingBudget -= tokens;
            }
        }

        // 优先级 3：用户当前问题
        context.add(UserMessage.from(userQuery));

        return context;
    }
}
```

## 幻觉与漂移控制

### 幻觉（Hallucination）

Agent 生成与事实不符的内容：

```java
public class HallucinationGuard {

    /**
     * 事实校验：检查回答中的声明是否有检索来源支持
     */
    public GuardResult check(String answer, List<Document> sources) {
        // 1. 从回答中提取事实声明
        List<String> claims = extractClaims(answer);

        List<String> unsupported = new ArrayList<>();
        for (String claim : claims) {
            boolean supported = sources.stream()
                .anyMatch(doc -> entails(doc.getContent(), claim));
            if (!supported) {
                unsupported.add(claim);
            }
        }

        if (!unsupported.isEmpty()) {
            return GuardResult.block(
                "检测到可能的幻觉：" + unsupported,
                "根据现有资料无法确认以下信息：" + unsupported
            );
        }
        return GuardResult.pass();
    }
}
```

### 漂移（Drift）

Agent 在多步执行中逐渐偏离目标：

```java
public class DriftDetector {

    /**
     * 每 N 步检查 Agent 是否仍在正确的轨道上
     */
    public boolean isDrifting(String originalGoal,
                               List<String> actionHistory,
                               String currentReasoning) {
        String checkPrompt = """
            请判断以下 Agent 的执行是否偏离了原始目标。

            原始目标：%s
            已执行的步骤：%s
            当前推理：%s

            请回答：
            1. 当前是否在正确的轨道上？（是/否）
            2. 如果偏离，偏离程度（1-5）
            3. 建议的纠正措施
            """.formatted(originalGoal,
                         String.join("\n", actionHistory),
                         currentReasoning);

        return llm.evaluate(checkPrompt);
    }
}
```

## 成本控制

### Token 预算管理

```java
public class TokenBudget {
    private final AtomicInteger dailyTokens = new AtomicInteger(0);
    private final AtomicInteger dailyCost = new AtomicInteger(0); // 美分
    private final int dailyLimit;  // 日 Token 上限
    private final int costLimit;   // 日成本上限（美分）

    public boolean canProceed(int estimatedTokens) {
        if (dailyTokens.get() + estimatedTokens > dailyLimit) {
            log.warn("Token 预算不足，降级到小模型");
            return false;
        }
        return true;
    }

    public void record(int inputTokens, int outputTokens, String model) {
        dailyTokens.addAndGet(inputTokens + outputTokens);
        int cost = calculateCost(inputTokens, outputTokens, model);
        dailyCost.addAndGet(cost);
    }
}
```

### 模型路由（降本策略）

```
用户请求 → 复杂度评估 → 选择模型
  ├─ 简单问题（闲聊、FAQ）→ GPT-4o-mini（$0.15/1M）
  ├─ 中等问题（工具调用、分析）→ GPT-4o（$2.5/1M）
  └─ 复杂问题（多步推理、代码）→ Claude 3.5 Sonnet（$3/1M）
```

```java
public class ModelRouter {

    public ChatLanguageModel route(String userQuery) {
        int complexity = assessComplexity(userQuery);

        return switch (complexity) {
            case 1, 2 -> miniModel;    // 简单
            case 3, 4 -> standardModel; // 中等
            default -> advancedModel;   // 复杂
        };
    }

    private int assessComplexity(String query) {
        // 基于规则或轻量模型评估复杂度
        int score = 0;
        if (query.length() > 200) score++;
        if (containsTechnicalTerms(query)) score++;
        if (requiresReasoning(query)) score++;
        if (requiresMultipleTools(query)) score += 2;
        return Math.min(score, 5);
    }
}
```

## 生产部署最佳实践

### 安全边界

```java
@RestController
public class AgentController {

    @PostMapping("/api/agent/chat")
    public Result<String> chat(@RequestBody AgentRequest request) {
        // 1. 输入校验
        String sanitized = inputSanitizer.sanitize(request.getMessage());

        // 2. 速率限制
        if (!rateLimiter.tryAcquire(request.getUserId())) {
            return Result.fail("请求过于频繁，请稍后重试");
        }

        // 3. 执行 Agent
        TraceContext trace = tracer.startTrace(request.getSessionId(), sanitized);
        String response = agentService.chat(request.getSessionId(), sanitized);

        // 4. 输出校验
        GuardResult guard = outputGuard.check(response);
        if (guard.isBlocked()) {
            response = guard.getSafeResponse();
        }

        // 5. 审计日志
        auditLog.record(request.getUserId(), sanitized, response, trace);

        return Result.success(response);
    }
}
```

### 熔断与降级

```java
public class AgentCircuitBreaker {
    private final CircuitBreaker breaker;

    public String chat(String message) {
        return breaker.execute(
            // 正常路径：调用 LLM Agent
            () -> agentService.chat(message),

            // 降级路径：LLM 不可用时返回预设回答
            () -> fallbackService.getFallback(message),

            // 超时设置
            Duration.ofSeconds(30)
        );
    }
}
```

### 灰度发布

```
版本 A（当前）：90% 流量
版本 B（新版）：10% 流量

对比指标：
  - 回答质量评分（LLM-as-Judge）
  - 任务完成率
  - 幻觉率
  - Token 消耗
  - 用户满意度（👍/👎）

B 版本指标优于 A → 逐步加大流量 → 全量上线
```

### 生产 Checklist

```
□ 评估
  □ 建立了 50+ 测试用例的评测集
  □ 自动化评测 CI 流水线
  □ LLM-as-Judge 评分 > 4.0/5.0

□ 安全
  □ Prompt 注入防护
  □ 输入/输出内容过滤
  □ 敏感操作需人工确认
  □ API Key 加密存储

□ 可观测性
  □ 全链路 Trace 记录
  □ 监控面板（成功率、延迟、成本）
  □ 异常告警（幻觉率、漂移率、超时）

□ 可靠性
  □ 熔断降级策略
  □ Token 预算管理
  □ 模型路由（成本优化）
  □ 灰度发布能力
```

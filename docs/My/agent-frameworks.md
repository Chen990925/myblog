---
group: AI Agent专题
title: Agent 框架横评与图编排实战
order: 7
---

# Agent 框架横评与图编排实战

## Agent 框架演进路线

```
第一代：Chain 链式调用（2023 年）
  └─ LangChain 为代表，线性 Prompt → LLM → Tool → LLM

第二代：ReAct 自主 Agent（2024 年）
  └─ AutoGPT、BabyAGI，模型自主循环推理+工具调用

第三代：状态机图编排（2024-2026 年）
  └─ LangGraph 为代表，有向图 + 状态机，确定性流程控制

第四代：多 Agent 协作 + 协议层（2025-2026 年）
  └─ MCP + A2A + CrewAI/AutoGen，标准化通信和工具接入
```

## 主流框架对比总览

| 框架 | 语言 | 核心范式 | 上手难度 | 生产就绪度 | 最佳场景 |
|------|------|---------|---------|-----------|---------|
| **LangGraph** | Python/JS | 图状态机 | 中-高 | ⭐⭐⭐⭐⭐ | 复杂工作流、有状态 Agent |
| **LangChain4j** | Java | Chain + Tool | 中 | ⭐⭐⭐⭐ | Java 后端集成 |
| **CrewAI** | Python | 角色化 Crew | 低 | ⭐⭐⭐⭐ | 多 Agent 任务分工 |
| **AutoGen** | Python | 对话式协作 | 中 | ⭐⭐⭐ | 多 Agent 对话讨论 |
| **OpenAI Agents SDK** | Python | 原生 Agent | 低 | ⭐⭐⭐⭐ | OpenAI 生态快速原型 |
| **Dify** | Python/TS | 低代码平台 | 低 | ⭐⭐⭐⭐ | 快速搭建 Agent 应用 |
| **Coze** | - | 低代码平台 | 低 | ⭐⭐⭐⭐ | 字节生态、Bot 模板 |

## LangGraph：图驱动状态机

### 核心思想

LangGraph 将 Agent 工作流建模为**有向图**：
- **Node（节点）**：执行具体操作（调用 LLM、执行工具、处理数据）
- **Edge（边）**：定义节点间的流转规则（固定/条件分支）
- **State（状态）**：贯穿整个流程的共享数据，在节点间传递和更新

```
传统 Chain：A → B → C（线性，不可回头）
LangGraph：A → B → 判断 → C 或回到 A（循环 + 分支 + 状态持久化）
```

### 三大核心能力

| 能力 | 说明 |
|------|------|
| **循环** | Agent 可以多次推理-行动，直到任务完成 |
| **状态持久化** | Checkpoint 机制，崩溃后可从断点恢复 |
| **人工介入（HITL）** | 在任意节点暂停，等待人类审批后继续 |

### State/Node/Edge 概念模型

```python
from typing import TypedDict, Annotated
import operator
from langgraph.graph import StateGraph, END, START

# 1. 定义 State（共享数据结构）
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]  # 对话历史（追加模式）
    user_query: str                          # 用户问题
    tool_results: dict                       # 工具执行结果
    iteration: int                           # 循环次数

# 2. 定义 Node（执行单元）
def call_llm(state: AgentState):
    """调用 LLM 决定下一步行动"""
    response = llm.chat(state["messages"])
    return {"messages": [response]}

def execute_tool(state: AgentState):
    """执行 LLM 选择的工具"""
    tool_call = parse_tool_call(state["messages"][-1])
    result = tools[tool_call.name].run(tool_call.args)
    return {"tool_results": result, "messages": [ToolMessage(result)]}

def should_continue(state: AgentState):
    """条件判断：是否需要继续循环"""
    last_msg = state["messages"][-1]
    if has_tool_calls(last_msg):
        return "execute_tool"
    return END

# 3. 构建图
graph = StateGraph(AgentState)
graph.add_node("call_llm", call_llm)
graph.add_node("execute_tool", execute_tool)

graph.add_edge(START, "call_llm")
graph.add_conditional_edges("call_llm", should_continue)
graph.add_edge("execute_tool", "call_llm")  # 工具结果回到 LLM

# 4. 编译并运行
app = graph.compile()
result = app.invoke({"messages": [], "user_query": "分析今日销售数据"})
```

### Java 视角：LangChain4j 的等价实现

LangChain4j 虽然没有 LangGraph 的图编排能力，但可以通过以下方式实现类似效果：

```java
// 手动实现 Agent 循环
public class AgentWorkflow {
    private final ChatLanguageModel model;
    private final Map<String, Tool> tools;
    private final List<ChatMessage> messages = new ArrayList<>();

    public String run(String userQuery) {
        messages.add(UserMessage.from(userQuery));

        for (int i = 0; i < 10; i++) {
            // 1. 调用 LLM
            AiMessage response = model.chat(messages).aiMessage();
            messages.add(response);

            // 2. 检查是否有工具调用
            if (!response.hasToolExecutionRequests()) {
                return response.text(); // 最终回答
            }

            // 3. 执行工具
            for (ToolExecutionRequest req : response.toolExecutionRequests()) {
                String result = tools.get(req.name()).execute(req.arguments());
                messages.add(ToolExecutionResultMessage.from(req, result));
            }
        }
        return "达到最大迭代次数";
    }
}
```

## CrewAI：角色化多 Agent

### 核心概念

CrewAI 用 **Crew（团队）+ Agent（角色）+ Task（任务）** 组织多 Agent 协作：

```python
from crewai import Agent, Task, Crew

# 定义 Agent（角色）
researcher = Agent(
    role="市场研究员",
    goal="收集和分析市场数据",
    backstory="你是一位资深市场分析师，擅长数据挖掘和趋势预测",
    tools=[search_tool, web_scraper],
    llm="gpt-4o"
)

writer = Agent(
    role="报告撰写员",
    goal="将分析结果撰写为专业报告",
    backstory="你是一位经验丰富的商业报告撰写专家",
    llm="gpt-4o"
)

# 定义 Task（任务）
research_task = Task(
    description="调研 2026 年 AI Agent 市场规模和主要玩家",
    expected_output="包含市场数据、竞品分析的研究报告",
    agent=researcher
)

write_task = Task(
    description="基于调研结果撰写 500 字的市场分析报告",
    expected_output="结构化的市场分析报告",
    agent=writer
)

# 组建 Crew（团队）
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process="sequential"  # 顺序执行：researcher → writer
)

result = crew.kickoff()
```

### 适用场景

- 内容生产流水线（调研 → 撰写 → 审校 → 发布）
- 数据分析团队（采集 → 清洗 → 分析 → 报告）
- 客服分工（路由 → 专业处理 → 质检）

## AutoGen：对话式多 Agent

微软出品，核心思想是让多个 Agent 通过**对话**协作：

```python
from autogen import ConversableAgent

# 创建 Agent
assistant = ConversableAgent(
    name="Assistant",
    system_message="你是一个代码助手",
    llm_config={"model": "gpt-4o"}
)

coder = ConversableAgent(
    name="Coder",
    system_message="你是一个 Python 程序员，负责编写和修改代码",
    llm_config={"model": "gpt-4o"},
    code_execution_config={"work_dir": "coding"}
)

reviewer = ConversableAgent(
    name="Reviewer",
    system_message="你是一个代码审查员，负责审查代码质量",
    llm_config={"model": "gpt-4o"}
)

# 对话式协作
result = assistant.initiate_chat(
    coder,
    message="请写一个 Python 函数，计算斐波那契数列的第 n 项"
)
# coder 写完后，可以让 reviewer 审查
review_result = reviewer.initiate_chat(
    coder,
    message="请审查刚才写的代码"
)
```

## OpenAI Agents SDK

OpenAI 官方 Agent 框架，主打简洁和原生集成：

```python
from agents import Agent, Runner, function_tool

@function_tool
def search_database(query: str) -> str:
    """搜索内部数据库"""
    return db.search(query)

@function_tool
def send_notification(user_id: str, message: str) -> str:
    """发送通知"""
    notifier.send(user_id, message)
    return "通知已发送"

# 定义 Agent
agent = Agent(
    name="SupportAgent",
    instructions="你是客服助手，帮用户查询信息和发送通知",
    tools=[search_database, send_notification]
)

# 运行
result = Runner.run_sync(agent, "查询用户 12345 的订单状态")
```

### Handoff（交接）机制

```python
triage_agent = Agent(
    name="Triage",
    instructions="根据用户问题类型转交给对应 Agent",
    handoffs=[sales_agent, tech_agent, billing_agent]
)
# Triage Agent 自动判断问题类型，转交给专业 Agent
```

## Dify / Coze：低代码平台

### 对比

| 维度 | Dify | Coze |
|------|------|------|
| **部署** | 开源自托管 / 云服务 | 纯云服务 |
| **可视化编排** | 支持 Workflow + Agent | 支持 Bot + 工作流 |
| **插件/工具** | 丰富的插件市场 | 丰富的 Bot 模板 |
| **RAG** | 内置知识库管理 | 内置知识库 |
| **适合** | 企业私有化部署 | 快速上线 Bot |

### 何时选择低代码

```
选 Dify/Coze：
  - 快速验证想法（1 天上线）
  - 非技术人员需要参与配置
  - 不需要深度定制

选 LangGraph / LangChain4j：
  - 需要精细控制 Agent 行为
  - 与企业系统深度集成
  - 高并发、高性能要求
  - 需要完善的可观测性和调试
```

## Java 开发者的选型建议

```
┌─────────────────── 选型决策树 ───────────────────┐
│                                                   │
│  你的项目是 Java 技术栈？                          │
│    ├─ 是 → LangChain4j + Spring Boot              │
│    │        （原生 Java，MCP 协议接入更多工具）      │
│    │                                               │
│    └─ 不是 →                                       │
│        ├─ 复杂工作流 → LangGraph                   │
│        ├─ 多 Agent 分工 → CrewAI                   │
│        ├─ 多 Agent 对话 → AutoGen                  │
│        ├─ 快速原型 → OpenAI Agents SDK             │
│        └─ 低代码 → Dify / Coze                    │
└───────────────────────────────────────────────────┘
```

### Java 生态的 Agent 方案

| 需求 | 推荐方案 |
|------|---------|
| 单 Agent + 工具调用 | LangChain4j AiServices + @Tool |
| RAG 知识库 | LangChain4j ContentRetriever + EmbeddingStore |
| 多轮对话记忆 | LangChain4j ChatMemory |
| 复杂工作流 | LangChain4j 手动循环 + 状态机设计 |
| 接入更多工具 | MCP Server（Java 实现）+ LangChain4j Client |
| 多 Agent | 微服务架构，每个 Agent 独立服务，通过 MQ/API 通信 |

### Java 多 Agent 微服务架构

```
┌─────────── API Gateway ───────────┐
│           （路由分发）               │
└────┬──────────┬──────────┬────────┘
     │          │          │
     ▼          ▼          ▼
┌─ Agent A ─┐ ┌─ Agent B ─┐ ┌─ Agent C ─┐
│ 订单查询   │ │ 退款处理   │ │ 客服问答   │
│ Spring Boot│ │ Spring Boot│ │ LangChain4j│
│ + LLM     │ │ + LLM     │ │ + RAG     │
└─────┬─────┘ └─────┬─────┘ └─────┬─────┘
      │              │              │
      └──────────────┴──────────────┘
                    │
              ┌─ 消息队列 ─┐
              │  RabbitMQ  │
              └────────────┘
```

利用 Java 成熟的微服务体系（Spring Cloud、Dubbo）来实现多 Agent 编排，每个 Agent 是独立的微服务，通过 RPC 或消息队列通信。这种方式比 Python 的多 Agent 框架更适合企业级生产环境。

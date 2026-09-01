---
group: AI Agent专题
title: MCP 协议：AI Agent 的 USB-C 接口
order: 6
summary: MCP（Model Context Protocol）是 Anthropic 发起的开放标准协议，定义了 AI 应用与外部工具/数据源的标准化交互方式。本文详解 MCP 架构原理、三大原语（Tools/Resources/Prompts）、与 Function Calling 的对比、Java SDK 实战及 MCP Server 开发。
keywords: [MCP, Model Context Protocol, Tool Calling, A2A, Anthropic, Agent协议]
---

# MCP 协议：AI Agent 的 USB-C 接口

## 为什么需要 MCP

### Function Calling 的局限

在 MCP 出现之前，Agent 调用外部工具主要依赖各家模型厂商的 Function Calling：

```
OpenAI   → Function Calling
Anthropic → Tool Use
Google   → Function Declaration
```

每个框架有自己的工具定义格式，导致 **M×N 碎片化问题**：M 个模型 × N 个工具 = M×N 个定制集成。

```
没有 MCP 的世界：
  LangChain Agent ──(定制)──> GitHub API
  LangChain Agent ──(定制)──> Slack API
  AutoGen Agent   ──(定制)──> GitHub API
  AutoGen Agent   ──(定制)──> Slack API
  → 4 个集成，每个都不一样

有 MCP 的世界：
  LangChain Agent ──┐
  AutoGen Agent   ──┤──(MCP 标准协议)──> GitHub MCP Server
  任意 Agent       ──┘                   Slack MCP Server
  → 2 个 MCP Server，任意 Agent 可复用
```

### MCP 的定位

MCP（Model Context Protocol）是 **AI 工具领域的 USB-C 接口**：

- **发起方**：Anthropic（2024 年 11 月）
- **管理方**：Linux 基金会（已移交）
- **核心目标**：工具一次封装，任意 Agent 框架可复用

## 核心架构

### Client-Server 模型

```
┌─────────────────── MCP Client ───────────────────┐
│  AI 应用（Agent / Chatbot / IDE 插件）             │
│                                                    │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐      │
│  │ Client A │   │ Client B │   │ Client C │      │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘      │
│       │              │              │              │
└───────┼──────────────┼──────────────┼──────────────┘
        │ JSON-RPC 2.0 │              │
        ▼              ▼              ▼
┌─ MCP Server ─┐ ┌─ MCP Server ─┐ ┌─ MCP Server ─┐
│  GitHub      │ │  Slack       │ │  Database    │
│  - 查 Issue  │ │  - 发消息    │ │  - 查询 SQL  │
│  - 创建 PR   │ │  - 读频道    │ │  - 执行写入  │
└──────────────┘ └──────────────┘ └──────────────┘
```

### 三大原语（Primitives）

| 原语 | 说明 | 类比 |
|------|------|------|
| **Tools** | Agent 可执行的函数（如 `create_issue`） | REST API 的 POST/PUT |
| **Resources** | Agent 可读取的数据（如文件、数据库记录） | REST API 的 GET |
| **Prompts** | Server 提供的预定义提示词模板 | 配置中心的模板 |

## Tools：让 Agent 执行操作

### Tool 定义（JSON Schema）

```json
{
  "name": "create_issue",
  "description": "在指定仓库中创建 GitHub Issue",
  "inputSchema": {
    "type": "object",
    "properties": {
      "repo": {
        "type": "string",
        "description": "仓库名称，格式：owner/repo"
      },
      "title": {
        "type": "string",
        "description": "Issue 标题"
      },
      "body": {
        "type": "string",
        "description": "Issue 正文（支持 Markdown）"
      },
      "labels": {
        "type": "array",
        "items": { "type": "string" },
        "description": "标签列表"
      }
    },
    "required": ["repo", "title"]
  }
}
```

### Tool 调用流程

```
1. Client 连接 MCP Server，获取可用 Tool 列表
2. Agent 分析用户意图，决定调用某个 Tool
3. Client 发送 JSON-RPC 请求：
   {
     "method": "tools/call",
     "params": {
       "name": "create_issue",
       "arguments": {
         "repo": "myorg/myapp",
         "title": "修复登录页面的 Bug",
         "labels": ["bug", "priority-high"]
       }
     }
   }
4. Server 执行操作，返回结果
5. Agent 基于结果生成最终回复
```

## Resources：让 Agent 读取数据

```json
{
  "resources": [
    {
      "uri": "file:///docs/api-spec.yaml",
      "name": "API 规范文档",
      "mimeType": "text/yaml"
    },
    {
      "uri": "db://users/schema",
      "name": "用户表结构",
      "mimeType": "application/json"
    }
  ]
}
```

Agent 可以通过 `resources/read` 读取 Resource 内容，用于增强上下文理解。

## Prompts：预定义模板

```json
{
  "prompts": [
    {
      "name": "code_review",
      "description": "对代码变更进行审查",
      "arguments": [
        {
          "name": "diff",
          "description": "Git diff 内容",
          "required": true
        }
      ]
    }
  ]
}
```

## MCP vs Function Calling 对比

| 维度 | Function Calling | MCP |
|------|-----------------|-----|
| **工具定义** | 各模型各有一套 | 统一 JSON Schema |
| **复用性** | 绑定特定框架 | 任意 Client 可用 |
| **传输方式** | HTTP 嵌入请求 | 独立协议（stdio/SSE/HTTP） |
| **状态管理** | 无状态 | 支持有状态会话 |
| **发现机制** | 硬编码 | 动态发现（`tools/list`） |
| **安全边界** | 应用层自行控制 | Server 端权限控制 |
| **生态** | 各厂商生态 | 统一生态，Server 可共享 |

## 传输方式

### stdio（本地进程）

MCP Server 作为子进程启动，通过标准输入/输出通信：

```
Agent 进程 ──stdin/stdout──> MCP Server 进程
```

适合本地开发工具（IDE 插件、CLI 工具）。

### Streamable HTTP（推荐，生产环境）

基于 HTTP + SSE（Server-Sent Events），支持流式响应：

```
Agent ──HTTP POST──> MCP Server (https://mcp.example.com/tools/call)
Agent <──SSE Stream── MCP Server
```

适合远程服务、生产环境部署。

### SSE（旧版，逐步淘汰）

基于 HTTP + Server-Sent Events 的双向通信。

## Java 开发 MCP Server

### 依赖配置

```xml
<dependency>
    <groupId>io.modelcontextprotocol</groupId>
    <artifactId>mcp-spring-webmvc</artifactId>
    <version>0.8.0</version>
</dependency>
```

### 实现 MCP Server

```java
@Configuration
public class McpServerConfig {

    @Bean
    public McpServer mcpServer(List<McpToolProvider> tools) {
        return McpServer.builder()
            .serverInfo("my-java-mcp-server", "1.0.0")
            .tools(tools)
            .build();
    }
}

@Component
public class GitHubToolProvider implements McpToolProvider {

    @Override
    public List<Tool> getTools() {
        return List.of(
            Tool.builder()
                .name("search_issues")
                .description("搜索 GitHub Issue")
                .inputSchema(SearchIssueSchema.class)
                .build()
        );
    }

    @Override
    public ToolResult callTool(String name, JsonNode arguments) {
        if ("search_issues".equals(name)) {
            String repo = arguments.get("repo").asText();
            String query = arguments.get("query").asText();
            List<Issue> issues = gitHubClient.searchIssues(repo, query);
            return ToolResult.success(toJson(issues));
        }
        return ToolResult.error("Unknown tool: " + name);
    }
}
```

### Spring Boot 自动配置

```yaml
# application.yml
mcp:
  server:
    name: my-knowledge-server
    version: 1.0.0
    transport: http
    port: 8080
```

## 在 Agent 中使用 MCP

### LangChain4j 集成 MCP

```java
// 连接 MCP Server
McpClient client = McpClient.builder()
    .transport(new HttpClientTransport("http://localhost:8080"))
    .build();

// 获取可用工具列表
List<Tool> tools = client.listTools();

// 将 MCP 工具注册到 LangChain4j Agent
ChatLanguageModel model = OpenAiChatModel.builder()
    .apiKey("sk-xxx")
    .modelName("gpt-4o-mini")
    .build();

// 自动将 MCP Tools 转为 LangChain4j 的 @Tool
Assistant assistant = AiServices.builder(Assistant.class)
    .chatLanguageModel(model)
    .toolProviders(client.getToolProviders())
    .build();

String answer = assistant.chat("帮我查一下最近的 Bug 类 Issue");
// Agent 自动调用 MCP Server 的 search_issues 工具
```

### 多 MCP Server 聚合

```java
// 同时连接多个 MCP Server
McpClient githubServer = McpClient.builder()
    .transport(new HttpClientTransport("http://localhost:8081"))
    .build();

McpClient slackServer = McpClient.builder()
    .transport(new HttpClientTransport("http://localhost:8082"))
    .build();

McpClient dbServer = McpClient.builder()
    .transport(new HttpClientTransport("http://localhost:8083"))
    .build();

// Agent 可以同时使用所有 Server 的工具
Assistant assistant = AiServices.builder(Assistant.class)
    .chatLanguageModel(model)
    .toolProviders(
        githubServer.getToolProviders(),
        slackServer.getToolProviders(),
        dbServer.getToolProviders()
    )
    .build();
```

## MCP 安全实践

### 权限分级

```
┌────────────────────────────────────┐
│  操作类型     │ 建议处理方式        │
├────────────────────────────────────┤
│  读取数据     │ 自动执行，记录日志  │
│  创建资源     │ 自动执行，通知用户  │
│  修改配置     │ 需用户确认          │
│  删除资源     │ 默认拒绝或严格审批  │
└────────────────────────────────────┘
```

### 安全清单

1. **最小权限**：MCP Server 只暴露必要的工具
2. **输入校验**：Server 端严格校验所有参数
3. **审计日志**：记录每次工具调用的来源、参数、结果
4. **速率限制**：防止 Agent 无限循环调用
5. **信任边界**：只连接可信的 MCP Server

## A2A 协议（Agent-to-Agent）

MCP 解决的是 Agent → Tool 的连接问题，而 **A2A（Agent-to-Agent）协议** 解决的是 Agent 之间的通信：

```
MCP：Agent ──> Tool（垂直集成）
A2A：Agent ──> Agent（水平协作）
```

Google 在 2025 年提出的 A2A 协议与 MCP 互补，共同构成 Agent 生态的通信基础：

| 协议 | 方向 | 解决的问题 |
|------|------|-----------|
| MCP | Agent → Tool | 工具标准化接入 |
| A2A | Agent → Agent | 多 Agent 通信协作 |
| Function Calling | Agent → LLM | 模型内部工具调用 |

## 常用 MCP Server 推荐

| Server | 功能 | 地址 |
|--------|------|------|
| **filesystem** | 读写本地文件系统 | 官方内置 |
| **github** | Issue、PR、代码搜索 | 社区 |
| **postgres** | 数据库查询和管理 | 社区 |
| **slack** | 消息发送和频道管理 | 社区 |
| **puppeteer** | 浏览器自动化操作 | 社区 |
| **memory** | 基于知识图谱的记忆 | 官方内置 |

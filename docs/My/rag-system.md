---
group: AI Agent专题
title: RAG 检索增强生成系统实战
order: 3
summary: RAG（检索增强生成）系统从架构到落地实战，涵盖文档处理流水线、Embedding 模型选型、向量数据库（Milvus/Qdrant/Chroma）、检索策略（稠密/稀疏/混合）、Reranking 重排序及评估指标。
keywords: [RAG, Embedding, 向量数据库, Milvus, 混合检索, Reranking, Chunk]
---

# RAG 检索增强生成系统实战

## 什么是 RAG

RAG（Retrieval-Augmented Generation）是一种将**外部知识检索**与**LLM 生成**结合的技术方案。它让 LLM 在回答问题时参考检索到的相关文档，从而：

- 减少幻觉（Hallucination）
- 注入领域专有知识
- 保持知识的实时性（无需重新训练模型）

### 架构概览

```
┌──── 离线索引阶段 ────────────────────────────────────┐
│                                                      │
│  文档 → 解析 → 分块(Chunk) → Embedding → 向量数据库  │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──── 在线查询阶段 ────────────────────────────────────┐
│                                                      │
│  用户提问                                             │
│    │                                                 │
│    ├→ Query Embedding                                │
│    │     │                                           │
│    │     ├→ 向量检索（TopK 相关文档块）               │
│    │     │                                           │
│    │     ├→ Reranking（精排重排序）                   │
│    │     │                                           │
│    │     └→ 构建增强 Prompt（检索结果 + 用户问题）    │
│    │                                                 │
│    └→ LLM 生成回答（基于检索到的知识）                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## 文档处理流水线

### 1. 文档解析

将不同格式的文件转换为纯文本：

| 格式 | 工具 | 说明 |
|------|------|------|
| PDF | Apache PDFBox / PyMuPDF | 注意扫描件需要 OCR |
| Word | Apache POI | `.docx` 解析 |
| HTML | Jsoup | 去除标签，保留正文 |
| Markdown | 直接读取 | 保留结构信息 |
| Excel | Apache POI | 表格转文本 |

### 2. 文档分块（Chunking）

分块策略直接影响检索质量：

```java
public class TextSplitter {

    /**
     * 固定大小分块 + 重叠
     * 最常用、最简单的方式
     */
    public List<String> splitBySize(String text, int chunkSize, int overlap) {
        List<String> chunks = new ArrayList<>();
        int start = 0;

        while (start < text.length()) {
            int end = Math.min(start + chunkSize, text.length());

            // 尝试在自然边界（句号、换行）截断
            if (end < text.length()) {
                int boundary = findNaturalBoundary(text, start, end);
                if (boundary > start) {
                    end = boundary;
                }
            }

            chunks.add(text.substring(start, end));
            start = end - overlap;  // 重叠部分保证上下文连续
        }
        return chunks;
    }

    /**
     * 按语义分块（递归分割）
     * 按照文档结构层级分割：标题 → 段落 → 句子
     */
    public List<String> splitRecursive(String text) {
        String[] separators = {"\n## ", "\n### ", "\n\n", "\n", "。", ".", " "};
        return recursiveSplit(text, separators, 0, 1000);
    }
}
```

**分块策略对比：**

| 策略 | 大小 | 重叠 | 适用场景 |
|------|------|------|----------|
| 固定大小 | 500-1000 字符 | 100-200 | 通用，简单快速 |
| 语义分块 | 可变 | 可变 | 结构化文档（有标题层级） |
| 按段落 | 自然段落 | 0-1段 | 段落较短且完整的文档 |
| 按文档 | 整篇 | 0 | 短文档（< 2000 token） |

### Chunk 大小选择

```
Chunk 太小 → 检索精确但上下文不完整
Chunk 太大 → 上下文完整但检索噪声多

推荐起始值：
- 通用场景：512 tokens, overlap 50-100
- 代码文档：1024 tokens（函数/类通常较长）
- FAQ/问答：256 tokens（问答对通常较短）
```

## Embedding 模型

Embedding 将文本转换为高维向量，语义相似的文本在向量空间中距离更近。

### 模型选型

| 模型 | 维度 | 特点 | 适用场景 |
|------|------|------|----------|
| **text-embedding-3-small** (OpenAI) | 1536 | 性价比高，英文强 | 英文场景 |
| **text-embedding-3-large** (OpenAI) | 3072 | 精度最高 | 高精度需求 |
| **bge-large-zh-v1.5** (BAAI) | 1024 | 中文效果优秀 | 中文场景（推荐） |
| **m3e-base** (Moka AI) | 768 | 中文开源，轻量 | 中文轻量场景 |
| **gte-large** (通义) | 1024 | 阿里出品，中文强 | 阿里云生态 |

### Embedding 调用示例

```java
// OpenAI Embedding API
public float[] embed(String text) {
    EmbeddingCreateParams params = EmbeddingCreateParams.builder()
        .input(text)
        .model("text-embedding-3-small")
        .build();

    CreateEmbeddingResponse response = client.embeddings().create(params);
    List<Float> embedding = response.data().get(0).embedding();

    return toFloatArray(embedding);
}

// 本地模型（使用 ONNX Runtime）
public float[] embedLocal(String text) {
    Tokenizer tokenizer = new BertTokenizer(vocabPath);
    List<Long> tokens = tokenizer.encode(text);
    // ONNX 推理...
    return modelRunner.run(tokens);
}
```

## 向量数据库

### 主流向量数据库对比

| 数据库 | 特点 | 部署方式 | 适合场景 |
|--------|------|----------|----------|
| **Milvus** | 高性能，支持亿级向量 | 分布式部署 | 大规模生产 |
| **Qdrant** | Rust 编写，性能优秀 | 单机/集群 | 中等规模 |
| **Chroma** | 轻量嵌入式 | 嵌入式/单机 | 快速原型 |
| **Pinecone** | 全托管云服务 | SaaS | 免运维 |
| **pgvector** | PostgreSQL 插件 | 与 PG 共用 | 已有 PG 的项目 |
| **Elasticsearch (8.x+)** | 全文检索+向量 | 分布式 | 混合检索 |

### Milvus 基本操作

```java
// 连接 Milvus
MilvusClient client = new MilvusClient(
    ConnectParam.newBuilder()
        .withHost("localhost")
        .withPort(19530)
        .build()
);

// 创建 Collection
CreateCollectionParam param = CreateCollectionParam.newBuilder()
    .withCollectionName("documents")
    .withSchema(CollectionSchema.newBuilder()
        .addField(FieldType.newBuilder()
            .withName("id")
            .withDataType(DataType.Int64)
            .withPrimaryKey(true)
            .withAutoID(true)
            .build())
        .addField(FieldType.newBuilder()
            .withName("embedding")
            .withDataType(DataType.FloatVector)
            .withDimension(1024)
            .build())
        .addField(FieldType.newBuilder()
            .withName("content")
            .withDataType(DataType.VarChar)
            .withMaxLength(65535)
            .build())
        .build())
    .build();
client.createCollection(param);

// 插入向量
InsertParam insertParam = InsertParam.newBuilder()
    .withCollectionName("documents")
    .withFields(List.of(
        new InsertParam.Field("embedding", embeddings),
        new InsertParam.Field("content", texts)
    ))
    .build();
client.insert(insertParam);

// 向量检索
SearchParam searchParam = SearchParam.newBuilder()
    .withCollectionName("documents")
    .withMetricType(MetricType.COSINE)
    .withTopK(10)
    .withVectors(queryEmbedding)
    .withOutFields(List.of("content"))
    .build();
SearchResults results = client.search(searchParam);
```

## 检索策略

### 稠密检索（Dense Retrieval）

使用 Embedding 向量进行语义匹配：

```
用户问题 → Embedding → 向量相似度搜索 → TopK 结果
```

优点：语义理解能力强
缺点：对精确关键词匹配较弱（如专有名词、编号）

### 稀疏检索（Sparse Retrieval）

传统的关键词检索（BM25/TF-IDF）：

```
用户问题 → 分词 → BM25 匹配 → TopK 结果
```

优点：精确匹配关键词
缺点：不理解语义

### 混合检索（Hybrid Search，推荐）

结合稠密和稀疏检索的优势：

```java
public List<Document> hybridSearch(String query, int topK) {
    // 1. 稠密检索
    List<Document> denseResults = denseRetriever.search(query, topK * 2);

    // 2. 稀疏检索（BM25）
    List<Document> sparseResults = sparseRetriever.search(query, topK * 2);

    // 3. RRF（Reciprocal Rank Fusion）融合
    Map<Document, Double> scores = new HashMap<>();
    int k = 60; // RRF 常数

    for (int i = 0; i < denseResults.size(); i++) {
        scores.merge(denseResults.get(i), 1.0 / (k + i + 1), Double::sum);
    }
    for (int i = 0; i < sparseResults.size(); i++) {
        scores.merge(sparseResults.get(i), 1.0 / (k + i + 1), Double::sum);
    }

    // 4. 按融合分数排序，取 TopK
    return scores.entrySet().stream()
        .sorted(Map.Entry.<Document, Double>comparingByValue().reversed())
        .limit(topK)
        .map(Map.Entry::getKey)
        .toList();
}
```

## Reranking 重排序

检索阶段追求高召回率（粗排），Reranking 阶段追求高精度（精排）：

```
用户问题 → 粗排（向量+BM25，召回 20 条）→ 精排（Cross-Encoder Reranker，重排为 Top 5）
```

### 使用 BGE Reranker

```java
public class BgeReranker {
    private final RerankerModel model;

    /**
     * 对检索结果进行重排序
     * @param query 用户问题
     * @param documents 粗排结果
     * @param topK 最终返回数量
     */
    public List<Document> rerank(String query, List<Document> documents, int topK) {
        List<ScoredDocument> scored = new ArrayList<>();

        for (Document doc : documents) {
            // Cross-Encoder：同时输入 query 和 document，计算相关性分数
            float score = model.score(query, doc.getContent());
            scored.add(new ScoredDocument(doc, score));
        }

        return scored.stream()
            .sorted(Comparator.comparingDouble(ScoredDocument::score).reversed())
            .limit(topK)
            .map(ScoredDocument::document)
            .toList();
    }
}
```

## 构建增强 Prompt

将检索到的文档块拼接进 Prompt：

```java
public String buildRagPrompt(String userQuestion, List<Document> contexts) {
    String contextText = contexts.stream()
        .map(doc -> "- " + doc.getContent())
        .collect(Collectors.joining("\n"));

    return """
        你是一个智能助手。请根据以下参考资料回答用户的问题。
        
        规则：
        1. 只基于参考资料中的信息回答
        2. 如果参考资料中没有相关信息，请明确告知"根据现有资料无法回答"
        3. 回答时引用具体的参考内容
        
        参考资料：
        %s
        
        用户问题：%s
        
        回答：
        """.formatted(contextText, userQuestion);
}
```

## 评估指标

| 指标 | 含义 | 计算方式 |
|------|------|----------|
| **Faithfulness（忠实度）** | 回答是否忠于检索到的内容 | 检查回答中的声明是否都有检索来源支持 |
| **Answer Relevance（回答相关性）** | 回答是否切题 | LLM 评估回答与问题的相关程度 |
| **Context Relevance（上下文相关性）** | 检索的内容是否与问题相关 | 评估检索结果与问题的匹配度 |
| **Context Recall（上下文召回率）** | 是否检索到了所有需要的信息 | 对比检索结果与标准答案 |

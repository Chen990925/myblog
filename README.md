# Hinata's Blog

基于 [dumi](https://d.umijs.org) 构建的个人学习笔记博客站点。

> 在线访问：[https://chen990925.github.io/myblog/](https://chen990925.github.io/myblog/)

## 内容导航

| 模块 | 路径 | 说明 |
|------|------|------|
| 学习笔记 | `docs/Note/` | Java 基础、并发、JVM、Spring 全家桶、MySQL、Redis、MyBatis、Kafka、RabbitMQ、RocketMQ、Netty、ES、Vue 等 |
| AI 辅助编码 | `docs/AICoding/` | 并发编程深度、JVM 调优、Redis 缓存与分布式锁、MQ 可靠性、Oracle 优化、生产问题排查 |
| 算法题解 | `docs/Algorithm/` | 字符串、动态规划、贪心、双指针、逻辑推理、OD 真题等 |
| 面试复盘 | `docs/Interview/` | Java SE、MyBatis、Redis 面试题、模拟面试场景 |
| 技术分享 | `docs/Share/` | 设计模式、Linux 运维、网络协议、SkyWalking、Stream、Debug 技巧等 |
| 个人规划 | `docs/My/` | 年度学习与成长计划 |

## 技术栈

- **框架**：[dumi 2.x](https://d.umijs.org) — 基于 Umi 的文档/博客框架
- **前端**：React 19 + TypeScript
- **主题**：[dumi-theme-antd-style](https://github.com/arvinxx/dumi-theme-antd-style)
- **包管理**：pnpm
- **部署**：GitHub Pages（通过 GitHub Actions 自动部署）
- **代码规范**：Prettier + Commitlint + Husky

## 快速开始

```bash
# 安装依赖（会自动执行 prepare）
pnpm install

# 启动本地开发服务器
pnpm start

# 构建静态站点到 dist/
pnpm run docs:build

# 手动部署到 GitHub Pages
pnpm run deploy
```

## 脚本说明

| 命令 | 说明 |
|------|------|
| `pnpm start` | 启动 dumi 开发服务器 |
| `pnpm run dev` | 同 `start` |
| `pnpm run docs:build` | 构建生产环境静态站点到 `dist/` |
| `pnpm run deploy` | 使用 `gh-pages` 部署 `dist/` 到 GitHub Pages |
| `pnpm run prepare` | 安装 Husky git hooks 并执行 `dumi setup` |

## 自动部署

项目配置了 GitHub Actions（`.github/workflows/gh-pages.yml`），推送到 `main` 分支后会自动构建并部署到 GitHub Pages。

## 项目结构

```
├── .dumi/theme/slots/     # 自定义主题组件（Footer、Hero）
├── .github/workflows/     # CI/CD 配置
├── docs/                  # 文档内容
│   ├── AICoding/          # AI 辅助编码专题
│   ├── Algorithm/         # 算法题解
│   ├── Interview/         # 面试相关
│   ├── My/                # 个人规划
│   ├── Note/              # 核心学习笔记
│   ├── Share/             # 技术分享
│   └── index.md           # 首页
├── public/                # 静态资源（图片等）
├── .dumirc.ts             # dumi 配置
├── package.json
└── tsconfig.json
```

## License

MIT

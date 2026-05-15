# 纳斯长期记忆解决方案

## 问题

上下文窗口会满，新会话不会自动拥有完整聊天记录。真正可靠的记忆必须落盘、索引、检索、整理。

## 推荐架构：三层记忆

### 1. 原始日志层
- `memory/YYYY-MM-DD.md`
- 记录当天发生的事、任务进展、用户临时要求。
- 目标：不丢上下文。

### 2. 长期记忆层
- `MEMORY.md`
- 只放稳定、重要、未来会反复用到的信息。
- 目标：少而准，不变成垃圾堆。

### 3. 知识库/索引层
- OpenClaw `memory_search`
- 可选：Memory Wiki / QMD / LanceDB / Honcho
- 目标：新会话通过搜索找回相关内容，而不是靠模型硬记。

## 当前状态

已检查：当前 OpenClaw memory search 正常。

- Provider: lmstudio
- Model: text-embedding-nomic-embed-text-v1.5
- Indexed: 10/10 files, 52 chunks
- Vector store: ready
- FTS: ready
- Dreaming: configured daily 03:00

## 优先优化项

### A. 建立“记忆写入规则”

写入 daily memory：
- 当天任务
- 临时决定
- 操作记录
- 未完成事项

写入 MEMORY.md：
- 杰斯明确偏好
- 固定工作流
- 长期项目设定
- 重要账号/工具使用偏好（不写敏感密钥）
- 反复出现的习惯和规则

### B. 每天自动整理

用 heartbeat 或 cron 做：
- 检查当天 daily memory
- 找出值得长期保存的内容
- 提议或自动更新 MEMORY.md
- 避免长期记忆膨胀

### C. 开启/评估 session transcript indexing

OpenClaw 支持 experimental sessionMemory：
- 可以索引会话转录
- 用 memory_search 搜索历史聊天
- 适合解决“没写入 memory 的普通对话找不回来”问题

注意：这是实验功能，需要注意隐私边界和索引新鲜度。

### D. 建 Memory Wiki

适合把长期记忆变成更清晰的知识库：
- 人物/项目/系统/偏好分别成页
- 有来源和证据
- 能发现冲突、过期信息
- 更像 Obsidian / 第二大脑

### E. 记忆质量维护

每周做一次：
- 删除过时信息
- 合并重复偏好
- 把流水账从 MEMORY.md 移出去
- 把重要模式沉淀成 SOP

## 推荐落地路线

### 第 1 步：保持现有 Markdown 记忆
继续写：
- `memory/YYYY-MM-DD.md`
- `MEMORY.md`

### 第 2 步：增加“每日记忆整理”任务
每天凌晨或早上自动整理昨日记忆。

### 第 3 步：打开 sessionMemory 做测试
先试运行，确认能召回旧聊天，再决定是否长期启用。

### 第 4 步：搭建 Memory Wiki
当记忆越来越多时，把它升级成结构化知识库。

## 纳斯执行原则

- 重要内容必须写入文件，不靠脑补。
- 回复前需要回忆时，先 `memory_search`。
- 长期记忆宁缺毋滥。
- 涉及隐私和敏感信息时，只记录非敏感摘要。
- 定期清理，避免记忆污染。

# Claude Code Vibe Coding 入门教程

> 来源：B站视频《还在羡慕别人用 AI 开发酷产品？Claude Code 保姆级教学让你轻松体验 Vibe Coding, 动动嘴就能做出 Anything！》
> 作者：PAPAYA电脑教室
> 链接：https://b23.tv/mPu4JmD
> 整理时间：2026-05-18

## 这套教程解决什么问题

这是一条面向新手的 Claude Code 入门路线。核心目标不是“学会很多命令”，而是把 Claude Code 当成一个能协作开发的 AI 工程伙伴：你用自然语言描述目标，它负责读项目、改代码、调用工具、维护上下文，并逐步把想法做成可运行产品。

适合三类人：

- 想体验 Vibe Coding，但不知道从哪里安装和开始的人
- 已经会一点 AI 编程工具，想系统理解 Claude Code 配置的人
- 想把 Skills、Hooks、Subagents、MCP 串起来做自动化工作流的人

## 一图看懂学习路径

1. 安装 Claude Code
2. 熟悉基本操作
3. 建立 `CLAUDE.md`
4. 学会恢复对话或档案
5. 使用 Skills 扩展能力
6. 用 Hooks 固化自动动作
7. 用 Subagents 拆分任务
8. 用 MCP 连接外部工具和数据
9. 学会压缩上下文与检查用量
10. 用一个小产品完成 Vibe Coding 实战

## 章节速览

- `00:00` Claude Code 安装
- `03:31` Claude Code 基本操作简介
- `07:39` 建立 `CLAUDE.md` 文件
- `09:41` 还原对话或档案
- `10:25` Skills 简介
- `16:09` Hooks 简介
- `16:57` Subagents 简介
- `19:15` MCP 简介
- `20:42` 压缩对话和用量检查
- `21:30` Vibe Coding 实作范例

## 1. 安装 Claude Code

先完成官方安装与账号环境配置。教程给出的官方入口是：

https://code.claude.com/docs/en/overview

建议安装后先确认三件事：

- 终端里能正常启动 Claude Code
- 当前目录是你的项目目录，而不是系统目录
- 你知道如何退出、继续、让它读取项目文件

新手最容易踩的坑，是把 Claude Code 当成普通聊天窗口。它更像“在项目目录里工作的开发助手”：目录、文件、配置和权限都会影响结果。

## 2. 基本操作：先学会和它协作

Claude Code 的基本使用重点是“给清楚任务”和“让它逐步执行”。

推荐提示方式：

- 先说明目标：我要做什么
- 再说明约束：不要改哪些文件、使用什么框架、输出什么格式
- 最后说明验收：怎样算完成，比如能运行、通过测试、页面符合某种效果

示例：

```text
请帮我阅读这个项目，找出启动方式，并创建一个最小可运行的登录页。
要求沿用现有组件和样式，不引入新 UI 框架。
完成后运行测试或启动服务验证。
```

## 3. 建立 CLAUDE.md：给 AI 一份项目说明书

`CLAUDE.md` 是 Claude Code 的长期工作说明。它通常放在项目根目录，用来告诉 AI：

- 项目怎么启动
- 常用命令是什么
- 代码规范是什么
- 哪些目录不要动
- 测试和构建怎么跑
- 当前团队偏好的工作方式

推荐结构：

```markdown
# Project Instructions

## Commands
- Install: npm install
- Dev: npm run dev
- Test: npm test
- Build: npm run build

## Code Style
- Use existing components first
- Keep changes scoped
- Do not rewrite unrelated files

## Verification
Before finishing, run tests or explain why they cannot run.
```

这一步很关键。没有 `CLAUDE.md`，AI 每次都要重新猜项目规则；有了它，协作质量会稳定很多。

## 4. 还原对话或档案：不要丢上下文

当任务变长时，你会需要恢复之前的上下文。教程强调了“还原对话或档案”的价值：让 Claude Code 继续接着做，而不是每次从零开始。

实用建议：

- 长任务分阶段提交，让 AI 每阶段都留下总结
- 重要决定写进项目说明或任务文档
- 如果上下文太长，先让 AI 生成当前进度摘要，再继续下一步

## 5. Skills：把常用能力封装成工具包

Skills 可以理解为“给 AI 装插件”。它把某类任务的步骤、模板、脚本和注意事项封装起来，让 AI 遇到对应任务时按专业流程执行。

教程提到的参考：

- Anthropic 官方 Skills：https://github.com/anthropics/skills
- Nano Banana 2 Skill：https://github.com/kingbootoshi/nano-banana-2-skill

适合做成 Skill 的场景：

- 固定格式的报告生成
- 图片生成或图片处理流程
- 项目部署检查
- 文档同步
- 数据抓取
- 代码审查

判断标准很简单：如果你发现自己反复对 AI 说同一套要求，就值得把它写成 Skill。

## 6. Hooks：把关键动作自动化

Hooks 是在特定时机触发的自动动作。它适合做“每次都应该发生”的事情，比如：

- 修改代码后自动格式化
- 提交前自动跑测试
- 任务结束时生成总结
- 工具调用前检查权限
- 写文档后做链接或图片校验

Hooks 的价值是减少遗忘。人容易跳过检查，但自动流程不会。

## 7. Subagents：把复杂任务拆给多个助手

Subagents 是把任务拆分给不同子智能体处理。它适合复杂项目：

- 一个子智能体读需求
- 一个子智能体改前端
- 一个子智能体改后端
- 一个子智能体验证测试
- 主智能体负责整合结果

使用原则：

- 子任务要边界清楚
- 不同子智能体不要改同一批文件
- 主智能体要最后审查和整合

这能把 Vibe Coding 从“一个 AI 帮我写代码”升级成“一个小型 AI 开发团队协作”。

## 8. MCP：连接外部工具和数据

MCP 可以把 Claude Code 接到外部系统，例如 Notion、数据库、文件系统、浏览器或业务工具。教程提到 Notion MCP：

https://developers.notion.com/guides/mcp/get-started-with-mcp

MCP 的核心意义是：AI 不只是在本地猜答案，而是能访问真实工具和真实数据。

典型用法：

- 从 Notion 读取产品需求
- 从数据库查询字段结构
- 从设计工具读取设计稿
- 从内部系统拉取任务列表
- 把产出写回文档或知识库

## 9. 压缩对话和用量检查

AI 编程会消耗上下文和额度。教程把“压缩对话和用量检查”放在实作前，是很实用的安排。

建议习惯：

- 每完成一个阶段，让 AI 写阶段总结
- 长上下文前先压缩，保留目标、约束、已改文件、待办
- 经常检查用量，避免任务中途卡住
- 重要信息写入文件，而不是只留在聊天里

## 10. Vibe Coding 实作范例：从一句话到产品

Vibe Coding 的关键不是“完全不思考”，而是把人类的产品判断和 AI 的执行能力结合起来。

推荐实作流程：

1. 说清楚产品目标
2. 让 AI 先读项目和提出实现计划
3. 让 AI 分阶段实现
4. 每阶段运行验证
5. 根据结果继续迭代
6. 把稳定规则写进 `CLAUDE.md` 或 Skill

示例提示：

```text
我要做一个极简任务看板。
功能：新增任务、修改状态、按状态筛选、本地保存。
视觉：干净、像现代生产力工具，不要营销页。
请先检查项目结构，再给出实现计划，然后直接开始实现。
```

## 推荐工作流

```text
想法
  ↓
明确目标和验收标准
  ↓
Claude Code 读取项目
  ↓
生成计划
  ↓
分阶段修改
  ↓
运行测试或启动预览
  ↓
记录规则到 CLAUDE.md / Skill
  ↓
继续迭代产品
```

## 可复用检查清单

开始前：

- 是否在正确项目目录
- 是否有 `CLAUDE.md`
- 是否知道启动、测试、构建命令
- 是否明确不能改哪些文件

执行中：

- 是否每一步都有可验证结果
- 是否让 AI 解释关键改动
- 是否把大任务拆成小阶段
- 是否定期压缩上下文

完成前：

- 是否运行测试、构建或预览
- 是否记录新增规则
- 是否清理临时文件
- 是否把最终结果写成简短总结

## 纳斯观察

这条教程真正有价值的地方，不只是介绍 Claude Code 的按钮和命令，而是把 Vibe Coding 的工程化路线讲清楚了：`CLAUDE.md` 负责规则，Skills 负责能力复用，Hooks 负责自动检查，Subagents 负责拆分协作，MCP 负责连接真实工具。把这些组合起来，AI 编程才会从“临时聊天”变成“可持续的开发工作流”。

## 原视频参考资料

- Claude Code 官方文档：https://code.claude.com/docs/en/overview
- Anthropic 官方 Skills：https://github.com/anthropics/skills
- Nano Banana 2 Skill：https://github.com/kingbootoshi/nano-banana-2-skill
- Google AI Studio：https://aistudio.google.com/
- Notion MCP：https://developers.notion.com/guides/mcp/get-started-with-mcp

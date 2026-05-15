# OpenClaw Self-Maintenance / Self Updater 学习笔记

日期：2026-05-12
学习时长：约 10 分钟

## 参考内容

- ClawHub: Self Updater — https://clawhub.ai/ghostdragon124/self-updater
- ClawHub: Self Updater 搜索页 — https://clawhub.ai/skills/self-updater

## 核心用途

Self Updater / openclaw-self-maintenance 类技能用于自动或半自动维护 OpenClaw：检查核心版本、更新技能、避开 cron 任务、等待系统空闲、评估更新风险，并在必要时请求用户确认。

## 关键能力

- Cron-aware：读取 OpenClaw cron 任务，避免在计划任务临近时重启或更新。
- Idle detection：等待机器空闲后再执行维护，降低打断用户工作的概率。
- AI Risk Assessment：基于版本变更、技能更新数量、重启影响、上次更新时间、cron 临近程度评估风险。
- User Approval：高风险更新必须确认，不应静默执行。
- Smart Notifications：维护前后发送简短通知，适合 Feishu / Telegram 等通道。
- Dual Updates：同时考虑 OpenClaw 核心与 skills 更新。
- Auto-restart：更新后检查 gateway 是否恢复。

## 风险与注意事项

- ClawHub 页面显示该技能被标记为 Suspicious，需要审查后再使用。
- 该类技能会读取配置和 cron 文件，可能接触敏感任务内容。
- 涉及 gateway 重启、核心更新、技能更新，属于高影响操作。
- 不应直接 `AutoApprove`，除非已经完整审计脚本并确认恢复链路可靠。
- 当前记录仅为学习，不代表已安装或执行。

## 纳斯执行规则

1. 默认不自动更新 OpenClaw 核心。
2. 任何涉及 gateway restart / core update / 批量 skills update 的操作，都先向杰斯确认。
3. 优先做 dry-run / check-only，再汇报风险和影响。
4. 检查 cron 窗口，避免打断日报、学习同步、飞书写入等计划任务。
5. 高风险维护需要明确确认；不使用静默 AutoApprove。
6. 维护报告要简短：更新项、风险、是否需要重启、预计影响、回滚/恢复方式。

## 可复用维护流程

1. 查看 OpenClaw 当前版本与状态。
2. 查看是否有正在运行的任务、cron 临近任务、活跃会话。
3. 检查核心更新和技能更新。
4. 评估风险：低 / 中 / 高。
5. 向杰斯汇报并请求确认。
6. 执行更新。
7. 验证 gateway、skills、cron、关键通道（Feishu/WebChat）是否正常。
8. 写入维护记录。

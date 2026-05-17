# 智能体部署

## 项目目标

这个项目用于沉淀 OpenClaw / Codex 在本机 Windows 环境中的智能体部署、模型路由、健康检查、升级维护和故障处理经验。

## 环境基线

- OpenClaw 主目录：`D:\openclaw-stack`
- 状态目录：`D:\openclaw-stack\state`
- 工作区：`D:\openclaw-stack\workspace`
- 启动器目录：`D:\openclaw-stack\launcher`
- 图片输出目录：`D:\openclaw-stack\workspace\images`
- Gateway 端口：`18789`

## 模型路由

- 云端核心模型：`openai/gpt-5.5`
- 本地回退模型：`lmstudio/qwen/qwen3.6-27b`
- 图像生成模型：`openai/gpt-image-2`
- 不接入 `gpt-5.4`
- `gpt-5.5-pro` 不走 CLI；只有验证可用后才作为可选非 CLI 路由加入。

当 `openai/gpt-5.5` 不可用并回退本地模型时，必须明确提示：

```text
当前 GPT 5.5 连接不可用，已自动回退到本地 Qwen3.6（lmstudio/qwen/qwen3.6-27b）。
```

不要让界面或回复暗示当前仍在使用 GPT 5.5。

## 执行纪律

- 每完成一个阶段目标，先测试通过，再进入下一阶段。
- 修改配置前先备份相关文件。
- 只改当前问题需要的文件，不扩大影响范围。
- 发现已有用户改动时，先理解并保留，不随意回滚。
- Windows 中文内容统一按 UTF-8 读取和写入，避免乱码。

## 健康检查

常用命令：

```powershell
$env:OPENCLAW_STATE_DIR='D:\openclaw-stack\state'
& 'D:\openclaw-stack\npm\openclaw.cmd' gateway status --json
& 'D:\openclaw-stack\npm\openclaw.cmd' doctor --fix
& 'D:\openclaw-stack\npm\openclaw.cmd' models status --json
```

本地模型测试：

```powershell
& 'D:\openclaw-stack\npm\openclaw.cmd' capability model run --gateway --model 'lmstudio/qwen/qwen3.6-27b' --prompt 'Reply with exactly: local ok' --json
```

GPT 5.5 测试：

```powershell
& 'D:\openclaw-stack\npm\openclaw.cmd' capability model run --gateway --model 'openai/gpt-5.5' --prompt 'Reply with exactly: gpt ok' --json
```

## 常见故障

- 空黑色 Node / Windows Terminal 窗口：先查 `node.exe` 命令行和父进程，不要误杀 OpenClaw gateway。
- `Blocked: resolves to private/internal/special-use IP address`：外部服务不能访问 `127.0.0.1` 或 `192.168.*`，使用 Cloudflare Tunnel 生成公网 HTTPS 地址。
- `runId does not match sessionKey`：前端会话和 gateway 状态不一致，先刷新或重启 gateway。
- `MediaOffloadError ... EPERM`：检查媒体保存路径和权限，图片统一保存到 workspace images。
- OAuth `State mismatch`：使用了旧登录回调，必须重新发起登录并使用当前 state。

## 相关资料

- `D:\openclaw-stack\workspace\AGENTS.md`
- `D:\openclaw-stack\workspace\MEMORY.md`
- `D:\openclaw-stack\workspace\learning\openclaw-windows-stability-playbook-2026-05-16.md`

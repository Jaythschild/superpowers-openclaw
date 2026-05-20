# OpenClaw Windows 稳定运行学习文档

日期：2026-05-16
适用环境：Windows 原生 OpenClaw，主目录 `D:\openclaw-stack`

## 目标

这份文档记录本机 OpenClaw 部署、升级、模型路由、热切换、图片生成、启动器、会话恢复中遇到的问题和已验证处理原则。以后重新配置或排障时，先阅读这里，再检查是否有官方更新、更稳的新方案；没有更好方案时，再沿用本文流程。

## 当前约定

- 当前唯一主安装目录：`D:\openclaw-stack`
- workspace：`D:\openclaw-stack\workspace`
- state：`D:\openclaw-stack\state`
- npm 安装目录：`D:\openclaw-stack\npm`
- 启动器脚本目录：`D:\openclaw-stack\launcher`
- 图片统一保存目录：`D:\openclaw-stack\workspace\images`
- 默认浏览器打开 OpenClaw Dashboard：豆包浏览器
- 启动器显示后台启动日志，不再额外弹出黑色终端窗口

## 模型路由

当前稳定策略：

- 主模型：`openai/gpt-5.5`
- 本地回退模型：`lmstudio/qwen/qwen3.6-27b`
- 本地模型用途：大 token、总结、压缩、重复工作、记忆整理、后台任务
- 思考深度默认：`low` 或更低，避免无意义 token 消耗
- 不连接 `gpt-5.4`
- `gpt-5.5-pro` 不走 CLI；如要接入，只加入可选热切换列表，并必须单独验证可用性

重要原则：

- UI 里显示的模型名称必须是真实模型名，不要用容易混淆的别名。
- 如果用户选择 `openai/gpt-5.5`，但实际因 OAuth、地区、网络或 Codex 后端异常回退到本地模型，回复开头必须明确提示：

```text
当前 GPT-5.5 连接不可用，已自动回退到本地 Qwen3.6（lmstudio/qwen/qwen3.6-27b）。
```

- 不能让界面显示 `gpt-5.5`，实际回答却来自 Qwen3.6 而没有提示。
- 热切换目标只保留去重后的真实模型：
  - `openai/gpt-5.5`
  - `lmstudio/qwen/qwen3.6-27b`
  - 经过验证后才加入 `openai/gpt-5.5-pro`

## GPT-5.5 OAuth

本机要求只用 OAuth，不用 OpenAI API key 连接 GPT 主模型。

常见问题：

- OAuth callback 没自动回来：可以手动粘贴完整 redirect URL。
- `State mismatch`：使用了上一轮 OAuth 的旧 redirect URL。必须重新开始登录，用当前终端显示的 `state` 对应的新链接。
- `unsupported_country_region_territory`：OpenAI 令牌交换被地区限制拒绝。这不是 OpenClaw 配置问题，需要换可用网络环境后再登录。
- `No API key found for provider "openai-codex"`：当前 agent 的 auth store 没拿到 OAuth profile。需要重新执行 OAuth 登录或把可移植静态 auth profile 按官方方式迁移。

PowerShell 设置环境变量时必须给路径加引号：

```powershell
$env:OPENCLAW_STATE_DIR = 'D:\openclaw-stack\state'
```

不要写成：

```powershell
$env:OPENCLAW_STATE_DIR=D:\openclaw-stack\state
```

后者会被 PowerShell 错误解析。

## 本地 Qwen3.6

当前本地模型：

- LM Studio server：`http://127.0.0.1:1234/v1`
- 模型 ID：`qwen/qwen3.6-27b`
- OpenClaw 完整路由名：`lmstudio/qwen/qwen3.6-27b`
- 上下文：32768 tokens
- 费用：本地运行，不产生 API token 费用

排障步骤：

1. 确认 LM Studio server 已启动。
2. 请求 `http://127.0.0.1:1234/v1/models`。
3. 用 OpenAI-compatible chat completion 做一次短回复测试。
4. 再用 OpenClaw gateway route 测试。

每个阶段测试通过后再进入下一步。

## 图片生成路径

当前明确可用的生图路径：

- 对话模型可以是本地 Qwen3.6。
- Qwen3.6 判断需要生图后调用 OpenClaw 图片工具。
- 实际图片模型：`openai/gpt-image-2`
- 保存目录：`D:\openclaw-stack\workspace\images`

结论：

- LM Studio 的 Qwen3.6 只负责文字推理，不能本地生图。
- 如果走 `openai/gpt-image-2`，会消耗 OpenAI/ChatGPT 相关额度，不是本地免费生成。
- Oracle 浏览器方案可作为探索路径，但不要把它误认为当前已稳定接通的默认生图路径。

每次生图后要返回明确本地路径，例如：

```text
D:\openclaw-stack\workspace\images\<filename>.png
```

## 启动器和快捷方式

用户偏好：

- 桌面快捷方式使用 3D 卡通可爱龙虾图标。
- 两个快捷方式必须视觉上有区别，避免分不清。
- 启动器窗口使用简洁、接近 macOS 的排版。
- 进度条要真实反映启动阶段，不能只是动画。
- OAuth 和 Dashboard 按钮不放在启动器里。
- 保留“检查升级”按钮，由用户决定是否升级。
- 后台日志统一显示在启动器里，不再弹黑色终端窗口。
- Dashboard 默认用豆包浏览器打开，不用 Edge。

已遇到的问题：

- 黑色终端窗口无内容：通常是启动 Dashboard 或 gateway 的命令被错误地放进独立终端，或浏览器启动方式不对。
- 启动器文字遮挡：标题区空间不足，要加宽或改为弹性布局，避免状态文字覆盖按钮。
- 页面不自动弹出：检查豆包浏览器是否卡住、进程是否已存在但无响应、Dashboard token URL 是否正确复制。

## 升级策略

用户要求：

- 可以自动检查升级。
- 真正升级前由用户确认。
- 每次升级后必须检查 OpenClaw 是否能正常运行。
- 升级完成后要告知新版本内容。

流程：

1. 检查当前版本。
2. 检查是否有新版本。
3. 汇报版本差异和主要更新内容。
4. 用户确认后升级。
5. 重启 gateway。
6. 跑 `openclaw doctor --fix`。
7. 验证 LM Studio 本地模型。
8. 验证 `openai/gpt-5.5` 或 fallback 提示。
9. 验证 Dashboard 可打开。
10. 验证模型热切换。

## 会话和记录

已遇到的问题：

- 新开对话、切换会话后内容消失。
- compacted history 只显示 checkpoint，看不到完整早期内容。
- 临时会话不会长期保留完整上下文。

处理原则：

- 重要内容必须写入 `MEMORY.md`、`memory/YYYY-MM-DD.md`、`learning/` 或相关技能文档。
- 临时会话只适合测试、一次性尝试、避免污染长期记忆的任务。
- 重要任务不要开临时会话。
- 会话被压缩后，需要从 checkpoint、session logs、memory 文件恢复关键内容。

## Windows 中文乱码

已遇到的问题：

- 中文输出显示成典型 mojibake 乱码，或出现 replacement character。

固定规则：

```powershell
chcp 65001 > $null
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$env:PYTHONIOENCODING = 'utf-8'
```

读文件时使用：

```powershell
Get-Content -LiteralPath '<path>' -Raw -Encoding UTF8
```

写 Markdown 文档必须用 UTF-8。

## 残留目录和安装收束

原则：

- 当前只保留 `D:\openclaw-stack` 作为主安装。
- 清理旧目录前先确认是否还有记录、图片、技能、记忆、auth、workspace 需要继承。
- 用户已明确不需要回滚时，仍应先确认主目录数据完整，再删除旧残留。
- 删除前优先移动到备份或可恢复位置，除非用户明确要求彻底删除。

重点继承内容：

- `state`
- `workspace`
- `memory`
- `learning`
- `skills`
- 图片和媒体文件
- OAuth/auth profile（按官方支持方式）
- 启动器和快捷方式配置

## 常见错误对应处理

- `Unable to locate OpenClaw media store file`：多半是升级或目录收束后 dist 文件、media store 路径不一致。先确认 npm 包完整，再检查 launcher 中硬编码路径。
- `runId does not match sessionKey`：会话前端和 gateway 状态不一致。刷新页面、重新选择会话；必要时重启 gateway，避免直接误判成模型故障。
- `[assistant turn failed before producing content]`：可能是模型路由失败、工具失败、上下文过满或 session 状态错乱。先看日志和实际模型。
- `MediaOffloadError ... EPERM ... fsync`：媒体保存目录权限或文件锁问题。统一媒体/图片路径到 workspace，避免旧目录和受限路径。
- `msedge.exe unknown software exception`：Edge 进程崩溃，不等于 OpenClaw 核心故障。本机默认使用豆包浏览器打开 Dashboard。

## 每次修复的纪律

用户明确要求：每完成一个阶段目标，都要测试没问题再开始下一阶段。

固定节奏：

1. 备份要改的配置文件。
2. 小范围修改。
3. 立刻测试这一阶段。
4. 记录结果。
5. 再进入下一阶段。

不要连续改很多处后才测试。这样容易越改问题越多。

## 建议验证命令

```powershell
$env:OPENCLAW_STATE_DIR = 'D:\openclaw-stack\state'
& 'D:\openclaw-stack\npm\openclaw.cmd' doctor --fix
& 'D:\openclaw-stack\npm\openclaw.cmd' models status --json
& 'D:\openclaw-stack\npm\openclaw.cmd' models list --json
& 'D:\openclaw-stack\npm\openclaw.cmd' capability model run --gateway --model 'lmstudio/qwen/qwen3.6-27b' --prompt 'Reply with exactly: local ok' --json
```

GPT-5.5 测试只有在 OAuth 和网络环境可用时才算通过。如果不可用，应明确提示已回退本地 Qwen3.6，而不是静默伪装。

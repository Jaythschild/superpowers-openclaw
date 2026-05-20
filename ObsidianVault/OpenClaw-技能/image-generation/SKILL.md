---
name: image-generation
description: 在 OpenClaw 控制 UI 中生成图片。当用户要求生成、绘制、创建或编辑图片时触发此技能。输出为本地图片文件路径，并通过 MEDIA 标签回传媒体引用。
---

# Image Generation Skill

在 OpenClaw 控制 UI 中生成图片，并结构化回传结果。

## 触发条件

- 用户要求"生成图片"、"画图"、"创建图像"、"draw"、"generate image"等
- 用户描述了一个具体的画面/场景/角色

## 生成流程（必须严格遵循）

### Step 1: 解析用户意图
- 提取主体、风格、背景、尺寸等关键信息
- 将中文描述翻译为清晰的英文 prompt（image 工具模型对英文 prompt 效果更好）

### Step 2: 调用 image_generate 工具
使用 `image_generate` 工具，参数规范如下：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `prompt` | 英文图片描述，清晰直接 | 必填 |
| `model` | 图片生成模型 | 默认走 OpenClaw 配置：主模型 `openai/gpt-image-2`，失败时 fallback 到 `openai/gpt-image-1-mini` / `openai/gpt-image-1.5` / `openai/gpt-image-1` |
| `size` | 输出尺寸 | `1920x1080`（1080P，16:9，默认） |
| `aspectRatio` | 宽高比（可选） | - |
| `outputFormat` | 输出格式 | `png`（透明背景用 `png`，普通用 `jpeg`） |
| `background` | 背景类型 | `auto`（透明背景用 `transparent`） |

### Step 3: 回传结果（双通道）
生成成功后，**必须同时**做两件事：

1. **保存到 `images/` 文件夹** — 图片自动写入 `D:\openclaw-stack\workspace\images\`
2. **回传到对话中** — 用 MEDIA 标签在聊天窗口内联预览，方便用户立即查看

两个通道缺一不可：文件夹是存档，对话是预览。

如果图片生成失败，先判断失败类型：

- `fetch failed` / `other side closed`：这是 OpenAI 图片 OAuth 传输链路或网络代理断连，不是飞书、路径、PowerShell 或 prompt 的问题。
- `ETIMEDOUT` / `ENOTFOUND` / 可疑 IP 例如 `157.240.*`：这是 DNS 或代理路由问题。
- `401` / `403` / `auth`：这是账号权限或 OAuth 授权问题。

失败时必须明确说明“图片没有生成成功”，并给出失败分类和下一步处理方式；不能只说“可以生成图片”。

## 输出模板（双通道）

```
✅ 图片已生成！

**图片路径：**
`D:\openclaw-stack\workspace\images\image-xxx.png`

MEDIA:D:\openclaw-stack\workspace\images\image-xxx.png
```

- 文件夹：自动存档，方便后续管理
- 对话：MEDIA 标签内联预览，用户立即可见

## 结构化记录格式（JSON）

当需要记录生图元数据时，使用以下结构：

```json
{
  "model": "openai/gpt-image-2",
  "fallback_models": ["openai/gpt-image-1-mini", "openai/gpt-image-1.5", "openai/gpt-image-1"],
  "prompt": "A cyberpunk turtledove, neon blue and pink, 3D cartoon style, white background",
  "size": "1024x1024",
  "generated_at": "2026-05-10T22:03:00+08:00",
  "output_path": "D:\\openclaw-stack\\workspace\\images\\image-1---a7356fc9.png",
  "media_reference": "MEDIA:D:\\openclaw-stack\\state\\media\\tool-image-generation\\image-1---a7356fc9.png"
}
```

## Prompt 编写指南

- **主体明确** - 先说画什么（角色、场景、物体）
- **风格清晰** - 3D卡通、写实、水彩、像素风等
- **色彩指引** - 霓虹蓝粉、暖色调、黑白等
- **背景说明** - 白色背景、透明背景、城市夜景等
- **简洁有力** - 避免冗长描述，用关键词组合

## 模型与配置

- **图片主模型：** `openai/gpt-image-2`
- **图片 fallback：** `openai/gpt-image-1-mini`、`openai/gpt-image-1.5`、`openai/gpt-image-1`
- **聊天模型：** `lmstudio/qwen/qwen3.6-27b`（保持本地路由）
- **超时：** 300秒（5分钟）
- **输出目录：** `D:\openclaw-stack\workspace\images\`（统一图片文件夹）

AI 日报等自动任务必须优先使用：

```powershell
D:\openclaw-stack\workspace\tools\generate-ai-daily-image.cmd <manifestRel> <imageDirRel> <promptOrFileRel> <slug> 3 45 run
```

这个封装会把每次尝试、模型、失败分类、降级状态写入 manifest。即使外部图片通道失败，也不能让整条日报任务失败。

## 严禁行为

- 不绕过 OpenClaw 配置里的图片主模型和 fallback 模型
- 不回传本地 `file://` 路径给外部服务
- 不在消息中嵌入 base64 图片数据
- 不解释"可以生成图片"，直接生成
- 不回传图片只存文件夹（用户看不到）
- 不存文件夹只回传（没有持久存档）
- 不把 OpenAI 图片通道断连误判为飞书写入失败、PowerShell 编码失败或图片目录错误

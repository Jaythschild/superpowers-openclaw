import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';

const docToken = 'TmljdnBYVow0ryxPQoRceHSEnag';
const srcPath = 'D:/openclaw-stack/workspace/reports/ai-daily/2026-05-19/ai-daily-2026-05-19-1004.md';
let src = fs.readFileSync(srcPath, 'utf8').replace(/^# AI重大新闻日报｜2026-05-19 上午版\s*/, '').trim();

const visualSystem = '> 视觉系统：信息蓝图风。模块化新闻卡、事件节点、关系图谱、数据路径、趋势雷达、轻量科技网格。图中不出现 OpenDesign 字样或品牌 logo，只保留结构化信息设计方法。';
const blueprintIntro = `## 阅读路径

1. 先看封面式摘要：今天最重要的主线。
1. 再看信号地图：把新闻压缩成可跟踪的趋势。
1. 接着看白板逻辑：为什么这些新闻和杰斯有关。
1. 最后看分栏目正文：需要验证时再展开细节和来源。`;
const signalMap = `## 今日信号地图

**Agent 入口**：Codex 手机端、Claude 企业 Agent、GitHub Copilot CLI 同时推进。杰斯重点看异步长任务、移动端审批、CLI 入口。

**成本与权限**：大规模 Agent token 消耗被放大。杰斯重点看预算阈值、缓存、权限审计。

**本地模型**：Qwen / GGUF / llama.cpp 生态仍活跃。杰斯重点看本地 fallback、隐私与稳定性。

**多模态应用**：Spaces 上视频、3D、图像编辑 demo 密集。杰斯重点看设计与视频工作流可控性。

**设计工具**：AI 设计从单图生成转向结构化工作流。杰斯重点看日报配图、知识库图解、PPT 资产。`;

let content = `# AI重大新闻日报｜2026-05-19 上午版｜信息蓝图版

${visualSystem}

${blueprintIntro}

${signalMap}

---

${src}`;
content = content.replace('## 今日白板逻辑', '---\n\n## 今日白板逻辑');
content = content.replace('## AI Agent / Vibe Coding / 工具链', '---\n\n## AI Agent / Vibe Coding / 工具链');
content += `

---

## 后续固定制作规范

- 每期日报至少包含一张封面摘要图、一张新闻解释图或趋势雷达图。
- 图像统一使用信息蓝图风：半透明数据面板、细线连接、新闻节点、关系图谱、时间轴、风险与机会标签。
- 正文统一采用“主线判断 -> 信号地图 -> 分栏目证据 -> 纳斯观察 -> 来源限制”的结构。
- 不在图片中放可读大段文字、OpenDesign 字样、品牌 logo 或廉价霓虹效果。
`;

fs.mkdirSync('D:/openclaw-stack/workspace/reports/ai-daily/2026-05-20', { recursive: true });
fs.writeFileSync('D:/openclaw-stack/workspace/reports/ai-daily/2026-05-20/ai-daily-blueprint-beautified-from-2026-05-19.md', content, 'utf8');

const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json', 'utf8'));
const tools = new Map();
const api = {
  config,
  logger: { debug() {}, warn() {}, info() {}, error() {} },
  registerTool(fn, meta) {
    tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' }));
  },
};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const write = await doc.execute('doc-write', { action: 'write', doc_token: docToken, content });

const imgs = [
  'D:/openclaw-stack/state/media/tool-image-generation/ai-daily-opendesign-blueprint-style-samples-20260520---14123610-9a49-4f84-bd69-7153fed211a6.png',
  'D:/openclaw-stack/state/media/tool-image-generation/ai-daily-opendesign-blueprint-style-samples-20260520---bf770422-46b3-46ff-988e-6dc7d11c9f78.png',
  'D:/openclaw-stack/state/media/tool-image-generation/ai-daily-opendesign-blueprint-style-samples-20260520---6a931c88-6013-49d9-910b-7b257cc500fb.png',
];
const indexes = [1, 13, 29];
const uploads = [];
for (let i = 0; i < imgs.length; i++) {
  uploads.push(await doc.execute('doc-upload-image', {
    action: 'upload_image',
    doc_token: docToken,
    file_path: imgs[i],
    parent_block_id: docToken,
    index: indexes[i],
  }));
}

const read = await doc.execute('doc-read', { action: 'read', doc_token: docToken });
const raw = read.content || read.details?.content || read.markdown || read.details?.markdown || read;
const text = typeof raw === 'string' ? raw : JSON.stringify(raw);
console.log(JSON.stringify({
  ok: true,
  local: 'reports/ai-daily/2026-05-20/ai-daily-blueprint-beautified-from-2026-05-19.md',
  write: write.details || write,
  uploads: uploads.map(u => u.details || u),
  readBackLength: text.length,
  preview: text.slice(0, 300),
}, null, 2));

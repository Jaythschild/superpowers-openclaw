
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const docToken = 'NqrrdoBDIoKEimxPu5Jcmjz5nue';
const content = fs.readFileSync('D:/openclaw-stack/workspace/reports/claude-code-vibe-coding-tutorial-2026-05-18.md','utf8');
const writeRes = await doc.execute('doc-write', {action:'write', doc_token:docToken, content});
const append1 = await doc.execute('doc-append', {action:'append', doc_token:docToken, content:'\n\n---\n\n## 简笔画视觉导览\n\n### 封面图：从想法到产品\n'});
const image1 = await doc.execute('doc-upload-image', {action:'upload_image', doc_token:docToken, file_path:'D:/openclaw-stack/workspace/images/claude-code-vibe-cover-2026-05-18.png'});
const append2 = await doc.execute('doc-append', {action:'append', doc_token:docToken, content:'\n\n### 手绘流程图：Vibe Coding 学习路径\n'});
const image2 = await doc.execute('doc-upload-image', {action:'upload_image', doc_token:docToken, file_path:'D:/openclaw-stack/workspace/images/claude-code-vibe-flow-2026-05-18.png'});
const blocks = await doc.execute('doc-list-blocks', {action:'list_blocks', doc_token:docToken});
const readBack = await doc.execute('doc-read', {action:'read', doc_token:docToken});
console.log(JSON.stringify({
  ok:true,
  writeRes: writeRes.details || writeRes,
  image1: image1.details || image1,
  image2: image2.details || image2,
  readBack: {
    title: readBack.title || readBack.details?.title,
    preview: JSON.stringify(readBack.content || readBack.details?.content || '').slice(0,1200)
  },
  blocks: (blocks.details || blocks).blocks ? (blocks.details || blocks).blocks.slice(-8) : (blocks.details || blocks)
}, null, 2).slice(0,12000));


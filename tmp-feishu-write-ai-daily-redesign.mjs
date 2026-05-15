import fs from 'node:fs';
import { registerFeishuWikiTools, registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';

const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {
  config,
  logger: { debug(){}, warn(){}, info(){}, error(){} },
  registerTool(fn, meta) { tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); }
};
registerFeishuWikiTools(api);
registerFeishuDocTools(api);
const wiki = tools.get('feishu_wiki');
const doc = tools.get('feishu_doc');
if (!wiki || !doc) throw new Error('Feishu tools not registered');

const wikiToken = 'QqRswC7H1iisRKk2qrdczIkWnZb';
const nodeRes = await wiki.execute('wiki-get', { action: 'get', token: wikiToken });
const node = nodeRes.details || nodeRes;
if (!node?.obj_token) throw new Error('No obj_token: ' + JSON.stringify(nodeRes));
const docToken = node.obj_token;
const content = fs.readFileSync('D:/openclaw-stack/workspace/reports/ai-daily-2026-05-12-redesign.md', 'utf8');

const writeRes = await doc.execute('doc-write', { action: 'write', doc_token: docToken, content });

const images = [
  ['视觉封面图｜每日 AI 重大新闻日报', 'D:/openclaw-stack/workspace/images/ai-daily-cover-2026-05-12-v2.png'],
  ['视觉雷达图｜今日影响力雷达', 'D:/openclaw-stack/workspace/images/ai-daily-radar-2026-05-12-v2.png'],
];
const uploadResults = [];
await doc.execute('doc-append', { action: 'append', doc_token: docToken, content: '\n\n---\n\n## 视觉图卡\n\n以下两张图卡用于增强日报的封面感和信息层级。\n' });
for (const [caption, file_path] of images) {
  await doc.execute('doc-append', { action: 'append', doc_token: docToken, content: `\n### ${caption}\n` });
  const res = await doc.execute('doc-upload-image', { action: 'upload_image', doc_token: docToken, file_path });
  uploadResults.push({ caption, file_path, result: res.details || res });
}
const readBack = await doc.execute('doc-read', { action: 'read', doc_token: docToken });
console.log(JSON.stringify({ node, writeRes: writeRes.details || writeRes, uploadResults, readBack: { title: readBack.title || readBack.details?.title, stats: readBack.statistics || readBack.details?.statistics, textPreview: (readBack.content || readBack.details?.content || '').slice(0, 500) } }, null, 2));

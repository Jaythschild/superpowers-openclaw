
import fs from 'node:fs';
import { registerFeishuWikiTools, registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';

const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {
  config,
  logger: { debug(){}, warn(){}, info(){}, error(){} },
  registerTool(fn, meta) {
    tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' }));
  }
};
registerFeishuWikiTools(api);
registerFeishuDocTools(api);
const wiki = tools.get('feishu_wiki');
const doc = tools.get('feishu_doc');
if (!wiki || !doc) throw new Error('Feishu tools not registered');

const wikiToken = 'QqRswC7H1iisRKk2qrdczIkWnZb';
const knownDocToken = 'TmljdnBYVow0ryxPQoRceHSEnag';
let docToken = knownDocToken;
let node = null;
try {
  const nodeRes = await wiki.execute('wiki-get', { action: 'get', token: wikiToken });
  node = nodeRes.details || nodeRes;
  if (node?.obj_token) docToken = node.obj_token;
} catch (err) {
  node = { warning: 'wiki-get failed, using known doc token', error: String(err) };
}

const contentPath = 'D:/openclaw-stack/workspace/reports/ai-daily-2026-05-16.md';
const content = fs.readFileSync(contentPath, 'utf8');
const writeRes = await doc.execute('doc-write', { action: 'write', doc_token: docToken, content });

await doc.execute('doc-append', {
  action: 'append',
  doc_token: docToken,
  content: '\n\n---\n\n## 相关视觉元素\n\n### 今日影响力图卡\n'
});
const imageRes = await doc.execute('doc-upload-image', {
  action: 'upload_image',
  doc_token: docToken,
  file_path: 'D:/openclaw-stack/workspace/images/ai-daily-visual-2026-05-16.png'
});
const readBack = await doc.execute('doc-read', { action: 'read', doc_token: docToken });
console.log(JSON.stringify({
  ok: true,
  node,
  docToken,
  writeRes: writeRes.details || writeRes,
  imageRes: imageRes.details || imageRes,
  readBack: {
    title: readBack.title || readBack.details?.title,
    statistics: readBack.statistics || readBack.details?.statistics,
    preview: (readBack.content || readBack.details?.content || '').slice(0, 300)
  }
}, null, 2));


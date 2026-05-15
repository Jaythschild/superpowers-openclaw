import fs from 'node:fs';
import { registerFeishuWikiTools, registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'webchat'})); } };
registerFeishuWikiTools(api); registerFeishuDocTools(api);
const wiki = tools.get('feishu_wiki'); const doc = tools.get('feishu_doc');
const nodeRes = await wiki.execute('wiki-get', {action:'get', token:'MI56wWT54ipCPRkS7jIcRyWlnnb'});
const doc_token = nodeRes.details.obj_token;
const items = [
  ['说明图 1：视觉设计知识库封面图', 'D:/openclaw-stack/workspace/images/visual-design-knowledge-hero.png'],
  ['说明图 2：字体层级示例——标题、副标题、正文、注释如何分工', 'D:/openclaw-stack/workspace/images/diagram-typography-hierarchy.png'],
  ['说明图 3：配色系统示例——主色、强调色、中性色的角色', 'D:/openclaw-stack/workspace/images/diagram-color-system.png'],
  ['说明图 4：版式网格示例——边距、列宽、卡片与对齐', 'D:/openclaw-stack/workspace/images/diagram-layout-grid.png'],
  ['说明图 5：视觉层级示例——先结论，再证据，最后细节', 'D:/openclaw-stack/workspace/images/diagram-visual-hierarchy.png'],
];
const results=[];
await doc.execute('doc-append', {action:'append', doc_token, content:'\n\n---\n\n## 14. 说明图附件\n\n以下图片用于配合第 13 节示例阅读。\n'});
for (const [caption, file_path] of items) {
  await doc.execute('doc-append', {action:'append', doc_token, content:`\n### ${caption}\n`});
  const res = await doc.execute('doc-upload-image', {action:'upload_image', doc_token, file_path});
  results.push({caption, file_path, res: res.details ?? res});
}
console.log(JSON.stringify({doc_token, results}, null, 2));

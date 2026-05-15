import fs from 'node:fs';
import { registerFeishuWikiTools, registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {
  config,
  logger:{debug(){}, warn(){}, info(){}, error(){}},
  registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'webchat'})); }
};
registerFeishuWikiTools(api);
registerFeishuDocTools(api);
const wiki = tools.get('feishu_wiki');
const doc = tools.get('feishu_doc');
const token = 'MI56wWT54ipCPRkS7jIcRyWlnnb';
const nodeRes = await wiki.execute('wiki-get', {action:'get', token});
const node = nodeRes.details;
if (!node?.obj_token) throw new Error('No obj_token from wiki get: '+JSON.stringify(nodeRes));
const content = fs.readFileSync('D:/openclaw-stack/workspace/learning/feishu-wiki-visual-design-knowledge-base-2026-05-12.md','utf8');
const writeRes = await doc.execute('doc-write', {action:'write', doc_token: node.obj_token, content});
console.log(JSON.stringify({node, writeRes}, null, 2));


import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const docToken = 'NqrrdoBDIoKEimxPu5Jcmjz5nue';
let blocksRes = await doc.execute('doc-list-blocks', {action:'list_blocks', doc_token:docToken});
let blocks = (blocksRes.details || blocksRes).blocks || [];
const bad = blocks.filter(b => b.block_type === 27 && !b.image?.token);
const deleted = [];
for (const b of bad) {
  const r = await doc.execute('doc-delete-block', {action:'delete_block', doc_token:docToken, block_id:b.block_id});
  deleted.push({id:b.block_id, ok:(r.details||r).success});
}
blocksRes = await doc.execute('doc-list-blocks', {action:'list_blocks', doc_token:docToken});
blocks = (blocksRes.details || blocksRes).blocks || [];
const imgs = blocks.filter(b => b.block_type === 27).map(b => ({id:b.block_id, token:b.image?.token, width:b.image?.width, height:b.image?.height}));
const read = await doc.execute('doc-read', {action:'read', doc_token:docToken});
const content = JSON.stringify(read.content || read.details?.content || '');
console.log(JSON.stringify({
  deleted,
  imageCount: imgs.length,
  images: imgs,
  hasVideoLink: content.includes('https://b23.tv/mPu4JmD'),
  hasFlowHeading: content.includes('手绘流程图') || content.includes('Vibe Coding 学习路径')
}, null, 2));


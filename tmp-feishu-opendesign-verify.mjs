import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';
const r = await doc.execute('read', {action:'read', doc_token});
const text = r?.details?.content || '';
const checks = [
  'OpenDesign 内容设计中台',
  'Data Drift',
  'Swiss Pulse',
  'Velvet Standard',
  '生成后检查',
  '应用到教程、日报和报告'
].map(s => ({item:s, present:text.includes(s)}));
const blocksRes = await doc.execute('list_blocks', {action:'list_blocks', doc_token});
const inner = JSON.parse(blocksRes.content[0].text);
const blocks = inner.blocks || [];
function blockText(b){
  const t = b.text || b.heading1 || b.heading2 || b.heading3 || b.bullet || b.ordered || b.quote || {};
  if (t?.elements) return t.elements.map(e => e.text_run?.content || '').join('');
  return '';
}
const positions = blocks.map((b,i)=>({i,id:b.block_id,type:b.block_type,text:blockText(b)})).filter(x => /OpenDesign|课程地图|统一风格/.test(x.text));
const images = blocks.filter(b=>b.block_type===27);
const emptyImages = images.filter(b=>!b.image?.token && !b.image?.file_token && !b.image?.image_token).map(b=>b.block_id);
console.log(JSON.stringify({revision:r?.details?.revision_id, block_count:blocks.length, checks, positions, image_count:images.length, emptyImages}, null, 2));


import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const res = await doc.execute('doc-list-blocks', { action:'list_blocks', doc_token:'TmljdnBYVow0ryxPQoRceHSEnag' });
let data = res;
if (res?.content?.[0]?.text) data = JSON.parse(res.content[0].text);
const blocks = data.blocks || data.details?.blocks || [];
function textOf(b){
 for (const key of ['text','heading1','heading2','heading3','heading4','heading5','heading6','quote','bullet','ordered']){
  if (b[key]?.elements) return b[key].elements.map(e=>e.text_run?.content||'').join('');
 }
 return '';
}
const out = [];
for (let i=0;i<blocks.length;i++){
 const b=blocks[i];
 const t=textOf(b);
 if (b.block_type===27 || b.image || t.includes('相关视觉元素') || t.includes('今日影响力图卡')){
  out.push({i, block_id:b.block_id, type:b.block_type, text:t, parent_id:b.parent_id, keys:Object.keys(b), image:b.image});
  for (let j=Math.max(0,i-3); j<=Math.min(blocks.length-1,i+3); j++){
    const x=blocks[j]; out.push({near:j, block_id:x.block_id, type:x.block_type, text:textOf(x), keys:Object.keys(x), image:x.image});
  }
 }
}
console.log(JSON.stringify(out,null,2));


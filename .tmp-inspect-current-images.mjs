import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';
const res = await doc.execute('blocks-current', {action:'list_blocks', doc_token});
const inner = JSON.parse(res.content[0].text);
const blocks = inner.blocks || [];
const images = blocks.filter(b => b.block_type === 27);
function textOf(b){
  const keys=['text','heading1','heading2','heading3','bullet','ordered','quote'];
  for (const k of keys){
    const v=b[k];
    if (v?.elements) return v.elements.map(e=>e.text_run?.content||'').join('');
  }
  return '';
}
console.log(JSON.stringify({blockCount:blocks.length,imageCount:images.length, firstBlocks:blocks.slice(0,15).map((b,i)=>({i, id:b.block_id, type:b.block_type, text:textOf(b), image:b.image && {token:b.image.token,file_token:b.image.file_token,width:b.image.width,height:b.image.height,name:b.image.name}})), images:images.slice(0,5).map(b=>({id:b.block_id, image:b.image}))}, null, 2));


import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId:undefined,messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc=tools.get('feishu_doc');
const token='TmljdnBYVow0ryxPQoRceHSEnag';
const read=await doc.execute('doc-read',{action:'read',doc_token:token});
const blocksRes=await doc.execute('doc-list-blocks',{action:'list_blocks',doc_token:token});
const blocks=(blocksRes.details||blocksRes).blocks||[];
function txt(b){ const k=Object.keys(b).find(k=>b[k]?.elements); return k?b[k].elements.map(e=>e.text_run?.content||'').join(''):''; }
const content=JSON.stringify(read.content||read.details?.content||'');
const imgs=blocks.filter(b=>b.block_type===27).map(b=>({id:b.block_id,token:b.image?.token,w:b.image?.width,h:b.image?.height}));
console.log(JSON.stringify({
  hasToday: content.includes('AI重大新闻日报｜2026-05-18'),
  hasClassified: content.includes('AI Agent / Vibe Coding / 工具链'),
  blockCount: blocks.length,
  imageCount: imgs.length,
  emptyImageCount: imgs.filter(x=>!x.token).length,
  lastImages: imgs.slice(-5)
}, null, 2));


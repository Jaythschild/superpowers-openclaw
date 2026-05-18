
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config=JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools=new Map();
const api={config,logger:{debug(){},warn(){},info(){},error(){}},registerTool(fn,meta){tools.set(meta.name,fn({agentAccountId:undefined,messageChannel:'feishu'}));}};
registerFeishuDocTools(api);
const doc=tools.get('feishu_doc');
const token='TmljdnBYVow0ryxPQoRceHSEnag';
const blocksRes=await doc.execute('doc-list-blocks',{action:'list_blocks',doc_token:token});
const blocks=(blocksRes.details||blocksRes).blocks||[];
function txt(b){const k=Object.keys(b).find(k=>b[k]?.elements);return k?b[k].elements.map(e=>e.text_run?.content||'').join(''):'';}
const mapped=blocks.map((b,i)=>({i,id:b.block_id,type:b.block_type,text:txt(b),img:b.image?{token:b.image.token,w:b.image.width,h:b.image.height}:undefined}));
const idx18=mapped.findIndex(x=>x.text.includes('AI重大新闻日报｜2026-05-18'));
const idx17=mapped.findIndex(x=>x.text.includes('生成时间：2026-05-17') || x.text.includes('2026-05-17'));
const imgs=mapped.filter(x=>x.img);
console.log(JSON.stringify({
 idx18, idx17, orderOk: idx18>=0 && idx17>=0 && idx18<idx17,
 first20:mapped.slice(0,20).filter(x=>x.text||x.img),
 imageCount:imgs.length,
 emptyImageCount:imgs.filter(x=>!x.img.token).length,
 firstImages:imgs.slice(0,3)
},null,2));


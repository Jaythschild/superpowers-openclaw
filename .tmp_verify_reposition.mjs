
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId:undefined,messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc=tools.get('feishu_doc');
const res=await doc.execute('doc-list-blocks',{action:'list_blocks',doc_token:'NqrrdoBDIoKEimxPu5Jcmjz5nue'});
const blocks=(res.details||res).blocks||[];
function txt(b){ const k=Object.keys(b).find(k=>b[k]?.elements); return k?b[k].elements.map(e=>e.text_run?.content||'').join(''):''; }
const imgs=blocks.filter(b=>b.block_type===27).map(b=>({idx:blocks.indexOf(b),id:b.block_id,token:b.image?.token,w:b.image?.width,h:b.image?.height}));
const around=blocks.map((b,i)=>({i,type:b.block_type,text:txt(b),image:b.image?{token:b.image.token,w:b.image.width,h:b.image.height}:undefined})).filter(x=>x.i<18 || x.image || x.text==='简笔画视觉导览');
const content=blocks.map(txt).join('\n');
console.log(JSON.stringify({imageCount:imgs.length, imgs, hasEndVisualHeading:content.includes('简笔画视觉导览'), around}, null, 2).slice(0,12000));


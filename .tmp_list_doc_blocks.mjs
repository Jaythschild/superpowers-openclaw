
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
const out=blocks.map((b,i)=>({i,id:b.block_id,type:b.block_type,text:txt(b), image:b.image?{token:b.image.token,w:b.image.width,h:b.image.height}:undefined})).filter(x=>x.text || x.image);
console.log(JSON.stringify(out, null, 2));


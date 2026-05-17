
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const res=await doc.execute('doc-list-blocks',{action:'list_blocks',doc_token:'TmljdnBYVow0ryxPQoRceHSEnag'});
let data=res; if(res?.content?.[0]?.text)data=JSON.parse(res.content[0].text);
const blocks=data.blocks||[];
const root=blocks.find(b=>b.block_id==='TmljdnBYVow0ryxPQoRceHSEnag');
function textOf(b){ for(const k of ['heading3','heading2','text']) if(b[k]?.elements)return b[k].elements.map(e=>e.text_run?.content||'').join(''); return ''; }
const arr=root.children.map((id,i)=>{const b=blocks.find(x=>x.block_id===id); return {i,id,type:b?.block_type,text:textOf(b),image:b?.image};});
console.log(JSON.stringify(arr.slice(-10),null,2));
console.log('headingIndex', arr.find(x=>x.text==='今日影响力图卡')?.i, 'count', arr.length);


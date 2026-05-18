
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId:undefined,messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc=tools.get('feishu_doc');
const token='NqrrdoBDIoKEimxPu5Jcmjz5nue';
const ids=[
 'doxcnqpJeB1wE8PVfvglIJpWGxe',
 'doxcn8CWCiNnrBklI5W1737Kebb',
 'doxcnusMSfgeMSme5IGTzMBczKf',
 'doxcnqOeUMqQ6UYohcuWxgfSY2b',
 'doxcnOjTILxqe0egYO3ahQoE50f'
];
const out=[];
for(const id of ids){
  try { const r=await doc.execute('doc-delete-block',{action:'delete_block',doc_token:token,block_id:id}); out.push({id, result:r.details||r}); }
  catch(e){ out.push({id,error:String(e)}); }
}
console.log(JSON.stringify(out,null,2));


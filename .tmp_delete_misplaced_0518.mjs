
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
const start=blocks.findIndex(b=>txt(b).includes('AI重大新闻日报｜2026-05-18'));
const end=blocks.findIndex((b,i)=>i>start && txt(b).includes('生成时间：2026-05-17'));
const ids=(start>=0&&end>start)?blocks.slice(start,end).map(b=>b.block_id).filter(id=>id!==token):[];
const out=[];
for(const id of ids){
  try { const r=await doc.execute('doc-delete-block',{action:'delete_block',doc_token:token,block_id:id}); out.push({id,ok:(r.details||r).success}); }
  catch(e){ out.push({id,error:String(e)}); }
}
console.log(JSON.stringify({start,end,count:ids.length, sample:out.slice(0,3), last:out.slice(-3)},null,2));


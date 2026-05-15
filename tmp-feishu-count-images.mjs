import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config=JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools=new Map(); const api={config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn,meta){tools.set(meta.name, fn({agentAccountId:undefined,messageChannel:'webchat'}));}};
registerFeishuDocTools(api); const doc=tools.get('feishu_doc');
const r=await doc.execute('list_blocks',{action:'list_blocks', doc_token:'Efq7daX6NoE1x2xPWhwcNwh3nah'});
const data=JSON.parse(r.content[0].text); const blocks=data.blocks||[];
const images=blocks.filter(b=>b.block_type===27);
console.log(JSON.stringify({total_blocks:blocks.length,image_blocks:images.length,image_ids:images.map(b=>b.block_id)},null,2));

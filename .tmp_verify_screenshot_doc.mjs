
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId:undefined,messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc=tools.get('feishu_doc');
const res=await doc.execute('doc-list-blocks',{action:'list_blocks',doc_token:'NqrrdoBDIoKEimxPu5Jcmjz5nue'});
const blocks=(res.details||res).blocks||[];
const imgs=blocks.filter(b=>b.block_type===27).map((b)=>({idx:blocks.indexOf(b),id:b.block_id,token:b.image?.token,w:b.image?.width,h:b.image?.height}));
const empty=imgs.filter(x=>!x.token);
console.log(JSON.stringify({imageCount:imgs.length, emptyCount:empty.length, empty, firstImages:imgs.slice(0,5), lastImages:imgs.slice(-5)}, null, 2));


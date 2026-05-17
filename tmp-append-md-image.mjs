
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const docToken='TmljdnBYVow0ryxPQoRceHSEnag';
const append = await doc.execute('doc-append', { action:'append', doc_token:docToken, content:'\n![今日影响力图卡](D:/openclaw-stack/workspace/images/ai-daily-visual-2026-05-17.png)\n' });
const res = await doc.execute('doc-list-blocks', { action:'list_blocks', doc_token:docToken });
let data=res; if (res?.content?.[0]?.text) data=JSON.parse(res.content[0].text);
const blocks=data.blocks||[];
const imgs=blocks.filter(b=>b.block_type===27 || b.image).map((b,i)=>({block_id:b.block_id,parent_id:b.parent_id,image:b.image}));
console.log(JSON.stringify({append:append.details||append, imgs}, null, 2));


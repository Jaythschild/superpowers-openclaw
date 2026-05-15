import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'webchat'})); }};
registerFeishuDocTools(api);
const doc=tools.get('feishu_doc');
const blocks = await doc.execute('blocks',{action:'list_blocks', doc_token:'Efq7daX6NoE1x2xPWhwcNwh3nah'});
console.log(JSON.stringify(blocks,null,2).slice(0,2000));

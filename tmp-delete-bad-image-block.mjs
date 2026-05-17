
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const res = await doc.execute('doc-delete-block', { action:'delete_block', doc_token:'TmljdnBYVow0ryxPQoRceHSEnag', block_id:'doxcnYrZCy97LLnwaTeNA1Nr93g' });
console.log(JSON.stringify(res,null,2));


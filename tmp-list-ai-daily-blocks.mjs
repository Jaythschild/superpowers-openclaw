
import fs from 'node:fs';
import { registerFeishuWikiTools, registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuWikiTools(api); registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const docToken = 'TmljdnBYVow0ryxPQoRceHSEnag';
const blocks = await doc.execute('doc-list-blocks', { action:'list_blocks', doc_token: docToken });
console.log(JSON.stringify(blocks, null, 2));


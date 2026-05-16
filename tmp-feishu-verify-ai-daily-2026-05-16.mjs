
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger: { debug(){}, warn(){}, info(){}, error(){} }, registerTool(fn, meta) { tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const res = await doc.execute('doc-read', { action:'read', doc_token:'TmljdnBYVow0ryxPQoRceHSEnag' });
const d = res.details || res;
console.log(JSON.stringify({title:d.title, revision_id:d.revision_id, block_count:d.block_count, block_types:d.block_types, hint:d.hint}, null, 2));


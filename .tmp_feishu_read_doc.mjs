
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const res = await doc.execute('doc-read', {action:'read', doc_token:'NqrrdoBDIoKEimxPu5Jcmjz5nue'});
console.log(JSON.stringify({title:res.title||res.details?.title, stats:res.statistics||res.details?.statistics, preview:(res.content||res.details?.content||'').slice(0,1000)}, null, 2));


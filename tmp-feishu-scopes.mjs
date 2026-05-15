import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'webchat'})); }};
registerFeishuDocTools(api);
const scopes = tools.get('feishu_app_scopes');
const r = await scopes.execute('scopes', {});
console.log(JSON.stringify(r,null,2).slice(0,4000));

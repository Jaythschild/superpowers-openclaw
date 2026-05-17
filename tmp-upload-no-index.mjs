
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const docToken='TmljdnBYVow0ryxPQoRceHSEnag';
// delete current bad image from markdown append first
try { await doc.execute('doc-delete-block', { action:'delete_block', doc_token:docToken, block_id:'doxcnM8XTZ0QKo2HTSVwyupzoDc' }); } catch {}
const upload = await doc.execute('doc-upload-image', {
  action:'upload_image',
  doc_token:docToken,
  file_path:'D:/openclaw-stack/workspace/images/ai-daily-visual-2026-05-17.png',
  filename:'ai-daily-visual-2026-05-17.png'
});
const res = await doc.execute('doc-list-blocks', { action:'list_blocks', doc_token:docToken });
let data=res; if (res?.content?.[0]?.text) data=JSON.parse(res.content[0].text);
const blocks=data.blocks||[];
const imgs=blocks.filter(b=>b.block_type===27 || b.image).map((b,i)=>({block_id:b.block_id,parent_id:b.parent_id,image:b.image}));
console.log(JSON.stringify({upload:upload.details||upload, imgs}, null, 2));


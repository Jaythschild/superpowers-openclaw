import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel: 'feishu' })); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const docToken = 'TmljdnBYVow0ryxPQoRceHSEnag';
const imgs = [
  ['ai-daily-blueprint-cover.png', 'D:/openclaw-stack/state/media/tool-image-generation/ai-daily-opendesign-blueprint-style-samples-20260520---14123610-9a49-4f84-bd69-7153fed211a6.png'],
  ['ai-daily-blueprint-news-explainer.png', 'D:/openclaw-stack/state/media/tool-image-generation/ai-daily-opendesign-blueprint-style-samples-20260520---bf770422-46b3-46ff-988e-6dc7d11c9f78.png'],
  ['ai-daily-blueprint-trend-radar.png', 'D:/openclaw-stack/state/media/tool-image-generation/ai-daily-opendesign-blueprint-style-samples-20260520---6a931c88-6013-49d9-910b-7b257cc500fb.png'],
];
const uploads = [];
for (const [filename, path] of imgs) {
  const b64 = fs.readFileSync(path).toString('base64');
  uploads.push(await doc.execute('doc-upload-image', {
    action: 'upload_image',
    doc_token: docToken,
    image: 'data:image/png;base64,' + b64,
    filename,
  }));
}
const blocksRes = await doc.execute('doc-list-blocks', { action:'list_blocks', doc_token:docToken });
let data = blocksRes;
if (blocksRes?.content?.[0]?.text) data = JSON.parse(blocksRes.content[0].text);
const blocks = data.blocks || [];
const images = blocks.filter(b => b.block_type === 27 || b.image).map(b => ({ block_id:b.block_id, parent_id:b.parent_id, image:b.image }));
console.log(JSON.stringify({ uploads: uploads.map(u => u.details || u), imageCount: images.length, images }, null, 2));

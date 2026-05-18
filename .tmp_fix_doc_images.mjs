
import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({ agentAccountId: undefined, messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const docToken = 'NqrrdoBDIoKEimxPu5Jcmjz5nue';
let blocksRes = await doc.execute('doc-list-blocks', {action:'list_blocks', doc_token:docToken});
let blocks = (blocksRes.details || blocksRes).blocks || [];
const badImages = blocks.filter(b => b.block_type === 27 && (!b.image?.token));
const del = [];
for (const b of badImages) {
  del.push(await doc.execute('doc-delete-block', {action:'delete_block', doc_token:docToken, block_id:b.block_id}));
}
function dataUri(path) {
  const b64 = fs.readFileSync(path).toString('base64');
  return 'data:image/png;base64,' + b64;
}
const up1 = await doc.execute('doc-upload-image', {action:'upload_image', doc_token:docToken, url:dataUri('D:/openclaw-stack/workspace/images/claude-code-vibe-cover-2026-05-18.png')});
const up2 = await doc.execute('doc-upload-image', {action:'upload_image', doc_token:docToken, url:dataUri('D:/openclaw-stack/workspace/images/claude-code-vibe-flow-2026-05-18.png')});
blocksRes = await doc.execute('doc-list-blocks', {action:'list_blocks', doc_token:docToken});
blocks = (blocksRes.details || blocksRes).blocks || [];
const imgs = blocks.filter(b => b.block_type === 27).map(b => ({id:b.block_id, token:b.image?.token, width:b.image?.width, height:b.image?.height}));
console.log(JSON.stringify({deleted:badImages.map(b=>b.block_id), del, up1:up1.details||up1, up2:up2.details||up2, images:imgs}, null, 2).slice(0,12000));


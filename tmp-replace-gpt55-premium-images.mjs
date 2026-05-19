import fs from 'node:fs';
import path from 'node:path';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';

const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';
const imageDir = 'D:/openclaw-stack/workspace/images/art-design-course-premium-2026-05-19';
const out = 'D:/openclaw-stack/workspace/learning/gpt55-premium-image-replace-2026-05-19.json';

function textOf(b){
  const t = b.text || b.heading1 || b.heading2 || b.heading3 || b.heading4 || b.bullet || b.ordered || b.quote || {};
  if (t?.elements) return t.elements.map(e => e.text_run?.content || '').join('');
  return '';
}

const beforeRead = await doc.execute('backup-before-gpt55-premium-images', {action:'read', doc_token});
fs.writeFileSync('D:/openclaw-stack/workspace/learning/backup-visual-wiki-before-gpt55-premium-images-2026-05-19.md', beforeRead?.details?.content || JSON.stringify(beforeRead,null,2), 'utf8');

const blocksRes = await doc.execute('blocks-before-gpt55-premium-images', {action:'list_blocks', doc_token});
const inner = JSON.parse(blocksRes.content[0].text);
const blocks = inner.blocks || [];
const imageBlocks = blocks.map((b, index)=>({b,index})).filter(x=>x.b.block_type===27);
const files = fs.readdirSync(imageDir).filter(f=>/^[0-9]{2}-.*\.png$/i.test(f)).sort((a,b)=>Number(a.slice(0,2))-Number(b.slice(0,2)));
if (imageBlocks.length !== 50) throw new Error('Expected 50 existing image blocks, got ' + imageBlocks.length);
if (files.length !== 50) throw new Error('Expected 50 replacement images, got ' + files.length);

const oldManifest = imageBlocks.map((x,i)=>({order:i+1, block_id:x.b.block_id, index:x.index, token:x.b.image?.token, width:x.b.image?.width, height:x.b.image?.height, context:textOf(blocks[x.index-1] || {})}));
fs.writeFileSync('D:/openclaw-stack/workspace/learning/gpt55-premium-image-old-blocks-2026-05-19.json', JSON.stringify(oldManifest,null,2), 'utf8');

const replacements=[];
for (let i=imageBlocks.length-1; i>=0; i--) {
  const current = imageBlocks[i];
  const file = files[i];
  const filePath = path.join(imageDir, file);
  const del = await doc.execute('delete-old-image-' + String(i+1).padStart(2,'0'), {action:'delete_block', doc_token, block_id: current.b.block_id});
  const b64 = fs.readFileSync(filePath).toString('base64');
  const up = await doc.execute('upload-gpt55-premium-' + file, {
    action:'upload_image',
    doc_token,
    image:'data:image/png;base64,' + b64,
    filename:file,
    parent_block_id:doc_token,
    index:current.index
  });
  replacements.push({order:i+1, old_block_id:current.b.block_id, index:current.index, file, delete_ok:!del?.isError, upload:up?.details || up});
  if ((50-i) % 10 === 0) console.log('replaced', 50-i, 'images');
}

const afterRead = await doc.execute('read-after-gpt55-premium-images', {action:'read', doc_token});
const afterText = afterRead?.details?.content || JSON.stringify(afterRead);
const afterBlocksRes = await doc.execute('blocks-after-gpt55-premium-images', {action:'list_blocks', doc_token});
const afterInner = JSON.parse(afterBlocksRes.content[0].text);
const afterBlocks = afterInner.blocks || [];
const afterImages = afterBlocks.filter(b=>b.block_type===27);
const emptyImages = afterImages.filter(b=>!b.image?.token && !b.image?.file_token && !b.image?.image_token).map(b=>b.block_id);
const checks = {
  revision: afterRead?.details?.revision_id,
  blockCount: afterBlocks.length,
  imageBlockCount: afterImages.length,
  emptyImageCount: emptyImages.length,
  emptyImages,
  replacementCount: replacements.length,
  uploadedOkCount: replacements.filter(r=>r.upload?.success !== false).length,
  widthSet: [...new Set(afterImages.map(b=>b.image?.width))],
  heightSet: [...new Set(afterImages.map(b=>b.image?.height))],
  requiredMissing: ['设计、美学、排版、色彩、字体｜艺术设计教程','第一课｜设计基础：先解决信息秩序','第八课｜交付检查：好看必须能被验证'].filter(s=>!afterText.includes(s)),
  opendesignResidual: ['OpenDesign','Open Design','open design','opendesign'].filter(s=>afterText.includes(s)),
  link:'https://my.feishu.cn/wiki/MI56wWT54ipCPRkS7jIcRyWlnnb?fromScene=spaceOverview'
};
fs.writeFileSync(out, JSON.stringify({checks,replacements:replacements.reverse()},null,2), 'utf8');
console.log(JSON.stringify(checks,null,2));

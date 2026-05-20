import fs from 'node:fs';
import path from 'node:path';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const workspace = 'D:/openclaw-stack/workspace';
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';
const mdPath = path.join(workspace, 'learning/art-academy-lecture-2026-05-20.md');
const imageDir = path.join(workspace, 'images/art-academy-lecture-2026-05-20-2212');
const manifestPath = path.join(imageDir, 'manifest.json');
const backupPath = path.join(workspace, 'learning/backup-before-art-academy-lecture-2026-05-20-2212.md');
const verifyPath = path.join(workspace, 'learning/art-academy-lecture-verify-2026-05-20-2212.json');
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
function parse(res){ return JSON.parse(res.content?.[0]?.text || '{}'); }
function blockText(b){
  const t = b.text || b.heading1 || b.heading2 || b.heading3 || b.heading4 || b.bullet || b.ordered || b.quote || {};
  return t?.elements ? t.elements.map(e => e.text_run?.content || '').join('') : '';
}
const content = fs.readFileSync(mdPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const before = await doc.execute('backup-before-art-academy', { action:'read', doc_token });
fs.writeFileSync(backupPath, before?.details?.content || JSON.stringify(before,null,2), 'utf8');
await doc.execute('write-art-academy-lecture', { action:'write', doc_token, content });
let blocksRes = await doc.execute('blocks-after-art-academy-write', { action:'list_blocks', doc_token });
let blocks = parse(blocksRes).blocks || [];
let cursor = -1;
const plannedAsc = manifest.map((item) => {
  const idx = blocks.findIndex((b, i) => i > cursor && blockText(b).trim() === item.heading);
  if (idx < 0) throw new Error('Heading not found after cursor '+cursor+': '+item.heading);
  cursor = idx;
  return { ...item, index: idx + 1 };
});
const planned = plannedAsc.sort((a,b) => b.index - a.index);
const uploaded = [];
for (const item of planned) {
  const file = path.join(imageDir, item.file);
  const b64 = fs.readFileSync(file).toString('base64');
  const res = await doc.execute('upload-art-academy-'+item.file, {
    action:'upload_image',
    doc_token,
    image:'data:image/png;base64,'+b64,
    filename:item.file,
    parent_block_id:doc_token,
    index:item.index
  });
  uploaded.push({ heading:item.heading, file:item.file, index:item.index, ok:!res?.isError, details:res?.details || null });
}
const after = await doc.execute('read-after-art-academy', { action:'read', doc_token });
const afterText = after?.details?.content || JSON.stringify(after);
blocksRes = await doc.execute('blocks-after-art-academy-images', { action:'list_blocks', doc_token });
blocks = parse(blocksRes).blocks || [];
const imageBlocks = blocks.filter(b => b.block_type === 27);
const emptyImages = imageBlocks.filter(b => !b.image?.token && !b.image?.file_token && !b.image?.image_token);
const oldResidualTerms = ['ai-tech-', 'AI 科技风', '深蓝科技屏', '节点网络', '地球', '泛 AI 氛围', 'OpenDesign', 'opendesign', '01-title-judgement-v2.png', '02-three-step-board-v2.png', '03-color-roles-v2.png'];
const requiredTerms = ['设计、美学、排版、色彩、字体｜艺术学院讲义版', '风格规则｜艺术学院讲义感', '第一课｜设计基础：先解决信息秩序', '第八课｜交付检查：好看必须能被验证'];
const checks = {
  revision: after?.details?.revision_id,
  blockCount: blocks.length,
  plannedImageCount: manifest.length,
  uploadedOkCount: uploaded.filter(x=>x.ok).length,
  imageBlockCount: imageBlocks.length,
  emptyImageCount: emptyImages.length,
  widthSet: [...new Set(imageBlocks.map(b => b.image?.width).filter(Boolean))],
  heightSet: [...new Set(imageBlocks.map(b => b.image?.height).filter(Boolean))],
  oldResidual: oldResidualTerms.filter(s => afterText.includes(s)),
  requiredMissing: requiredTerms.filter(s => !afterText.includes(s)),
  batchDir: imageDir,
  manifestPath,
  backupPath,
  link: 'https://my.feishu.cn/wiki/MI56wWT54ipCPRkS7jIcRyWlnnb?fromScene=spaceOverview'
};
fs.writeFileSync(verifyPath, JSON.stringify({ checks, uploaded }, null, 2), 'utf8');
console.log(JSON.stringify(checks, null, 2));

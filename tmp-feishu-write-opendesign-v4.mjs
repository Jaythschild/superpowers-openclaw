import fs from 'node:fs';
import path from 'node:path';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';

const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';

const mdPath = 'D:/openclaw-stack/workspace/learning/visual-design-opendesign-course-v4-2026-05-19.md';
const content = fs.readFileSync(mdPath, 'utf8');

const before = await doc.execute('read-before', {action:'read', doc_token});
fs.writeFileSync('D:/openclaw-stack/workspace/learning/backup-visual-wiki-before-opendesign-v4-2026-05-19.md', before?.details?.content || JSON.stringify(before, null, 2), 'utf8');

const writeRes = await doc.execute('write-v4', {action:'write', doc_token, content});

const blocksRes = await doc.execute('blocks-after-write', {action:'list_blocks', doc_token});
const inner = JSON.parse(blocksRes.content[0].text);
let blocks = inner.blocks || [];

function textOf(b){
  const t = b.text || b.heading1 || b.heading2 || b.heading3 || b.bullet || b.ordered || b.quote || {};
  if (t?.elements) return t.elements.map(e => e.text_run?.content || '').join('');
  return '';
}

const imageDir = 'D:/openclaw-stack/workspace/images/opendesign-visual-course-v4-2026-05-19';
const inserts = [
  ['封面｜从内容整理到视觉作品', '00-cover-opendesign-course-v4.png'],
  ['第一课｜视觉层级：先给观看顺序', '01-视觉层级-case-v4.png'],
  ['第二课｜中文排版：长文要有呼吸', '02-中文排版-case-v4.png'],
  ['第三课｜色彩系统：颜色承担角色', '03-色彩系统-case-v4.png'],
  ['第四课｜报告版式：材料变成路径', '04-报告版式-case-v4.png'],
  ['第五课｜信息图标注：让图自己说话', '05-信息图标注-case-v4.png'],
  ['第六课｜案例配图：每个案例一图一文', '06-案例配图-case-v4.png'],
  ['第七课｜交付检查：生成后必须验收', '07-交付检查-case-v4.png'],
];

const planned = inserts.map(([heading, file]) => {
  const idx = blocks.findIndex(b => textOf(b).trim() === heading);
  if (idx < 0) throw new Error('Heading not found: ' + heading);
  return {heading, file, index: idx + 1};
}).sort((a,b) => b.index - a.index);

const uploaded = [];
for (const p of planned) {
  const fp = path.join(imageDir, p.file);
  const b64 = fs.readFileSync(fp).toString('base64');
  const res = await doc.execute('upload-' + p.file, {
    action: 'upload_image',
    doc_token,
    image: 'data:image/png;base64,' + b64,
    parent_block_id: doc_token,
    filename: p.file,
    index: p.index
  });
  uploaded.push({heading:p.heading, file:p.file, index:p.index, result:res?.details || res});
}

const after = await doc.execute('read-after', {action:'read', doc_token});
const afterText = after?.details?.content || JSON.stringify(after);
const blocksAfterRes = await doc.execute('blocks-after-images', {action:'list_blocks', doc_token});
const innerAfter = JSON.parse(blocksAfterRes.content[0].text);
const blocksAfter = innerAfter.blocks || [];
const imageBlocks = blocksAfter.filter(b => b.block_type === 27);
const emptyImages = imageBlocks.filter(b => !b.image?.token && !b.image?.file_token && !b.image?.image_token).map(b => b.block_id);

const checks = {
  hasV4Title: afterText.includes('OpenDesign AI 科技风系统版 v4'),
  hasOpenDesignWorkflow: afterText.includes('OpenDesign 工作流'),
  hasAllSevenLessons: ['第一课','第二课','第三课','第四课','第五课','第六课','第七课'].every(s => afterText.includes(s)),
  hasOldBoardLesson: afterText.includes('板书式图文报告'),
  imageBlocks: imageBlocks.length,
  emptyImages,
  uploadedCount: uploaded.length,
  revision: after?.details?.revision_id,
  blockCount: blocksAfter.length
};

fs.writeFileSync('D:/openclaw-stack/workspace/learning/opendesign-v4-feishu-upload-result-2026-05-19.json', JSON.stringify({writeRes, uploaded, checks}, null, 2), 'utf8');
console.log(JSON.stringify(checks, null, 2));

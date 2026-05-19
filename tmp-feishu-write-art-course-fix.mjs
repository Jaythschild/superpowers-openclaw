
import fs from 'node:fs';
import path from 'node:path';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';

const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {
  config,
  logger:{debug(){}, warn(){}, info(){}, error(){}},
  registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); }
};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';
const mdPath = 'D:/openclaw-stack/workspace/learning/opendesign-course-v5-content-system-2026-05-19.md';
const content = fs.readFileSync(mdPath,'utf8');

const backup = await doc.execute('backup-before-art-course-fix', {action:'read', doc_token});
fs.writeFileSync('D:/openclaw-stack/workspace/learning/backup-visual-wiki-before-art-course-fix-2026-05-19.md', backup?.details?.content || JSON.stringify(backup,null,2), 'utf8');

await doc.execute('write-art-course-fix', {action:'write', doc_token, content});
const blocksRes = await doc.execute('blocks-after-art-course-write', {action:'list_blocks', doc_token});
const inner = JSON.parse(blocksRes.content[0].text);
let blocks = inner.blocks || [];
function textOf(b){
  const t = b.text || b.heading1 || b.heading2 || b.heading3 || b.bullet || b.ordered || b.quote || {};
  if (t?.elements) return t.elements.map(e=>e.text_run?.content || '').join('');
  return '';
}
const imageDir = 'D:/openclaw-stack/workspace/images/art-design-course-2026-05-19';
const inserts = [
  ['课程总目标｜把审美训练变成可练习的方法','00-cover-art-design-course.png'],
  ['第一课｜设计基础：先解决信息秩序','01-design-order.png'],
  ['第二课｜美学判断：高级感来自克制和一致','02-aesthetic-judgement.png'],
  ['第三课｜排版：让中文长文有节奏','03-typography-layout.png'],
  ['第四课｜色彩：颜色必须承担角色','04-color-system.png'],
  ['第五课｜字体：字体决定语气和层级','05-font-hierarchy.png'],
  ['第六课｜构图：用位置引导视线','06-composition.png'],
  ['第七课｜图文案例：每个知识点都要可视化','07-visual-case.png'],
  ['第八课｜交付检查：好看必须能被验证','08-delivery-check.png'],
];
const planned = inserts.map(([heading,file])=>{
  const idx=blocks.findIndex(b=>textOf(b).trim()===heading);
  if(idx<0) throw new Error('Heading not found: '+heading);
  return {heading,file,index:idx+1};
}).sort((a,b)=>b.index-a.index);
const uploaded=[];
for(const p of planned){
  const file_path=path.join(imageDir,p.file);
  const res=await doc.execute('upload-art-course-'+p.file, {
    action:'upload_image',
    doc_token,
    file_path,
    parent_block_id: doc_token,
    index:p.index
  });
  uploaded.push({heading:p.heading,file:p.file,index:p.index,ok:!res?.isError});
}
const after = await doc.execute('read-after-art-course-fix', {action:'read', doc_token});
const afterText = after?.details?.content || JSON.stringify(after);
const blocksAfterRes = await doc.execute('blocks-after-art-course-images', {action:'list_blocks', doc_token});
const innerAfter = JSON.parse(blocksAfterRes.content[0].text);
const blocksAfter = innerAfter.blocks || [];
const imageBlocks = blocksAfter.filter(b=>b.block_type===27);
const emptyImages = imageBlocks.filter(b=>!b.image?.token && !b.image?.file_token && !b.image?.image_token).map(b=>b.block_id);
const badMarkers = [
  'OpenDesign 内容设计课程',
  'OpenDesign AI 科技风系统版',
  'OpenDesign 执行链',
  '内容先行，视觉统一',
  'Data Drift：负责 AI',
  'Swiss Pulse：负责网格',
  'Velvet Standard：负责留白',
  'opendesign-course-v4',
  'opendesign-course-v5'
];
const required = [
  '设计、美学、排版、色彩、字体｜艺术设计教程',
  '第一课｜设计基础：先解决信息秩序',
  '第二课｜美学判断：高级感来自克制和一致',
  '第三课｜排版：让中文长文有节奏',
  '第四课｜色彩：颜色必须承担角色',
  '第五课｜字体：字体决定语气和层级',
  '第六课｜构图：用位置引导视线',
  '第七课｜图文案例：每个知识点都要可视化',
  '第八课｜交付检查：好看必须能被验证'
];
const checks = {
  requiredMissing: required.filter(s=>!afterText.includes(s)),
  badMarkersPresent: badMarkers.filter(s=>afterText.includes(s)),
  uploadedCount: uploaded.length,
  imageBlockCount: imageBlocks.length,
  emptyImageCount: emptyImages.length,
  blockCount: blocksAfter.length,
  link: 'https://my.feishu.cn/wiki/MI56wWT54ipCPRkS7jIcRyWlnnb?fromScene=spaceOverview'
};
fs.writeFileSync('D:/openclaw-stack/workspace/learning/art-course-fix-verify-2026-05-19.json', JSON.stringify({checks,uploaded},null,2), 'utf8');
console.log(JSON.stringify(checks,null,2));


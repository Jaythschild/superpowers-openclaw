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
const content = fs.readFileSync(mdPath, 'utf8');

const before = await doc.execute('read-before-v5', {action:'read', doc_token});
fs.writeFileSync('D:/openclaw-stack/workspace/learning/backup-visual-wiki-before-opendesign-v5-2026-05-19.md', before?.details?.content || JSON.stringify(before, null, 2), 'utf8');

const writeRes = await doc.execute('write-v5', {action:'write', doc_token, content});

const blocksRes = await doc.execute('blocks-after-write-v5', {action:'list_blocks', doc_token});
const inner = JSON.parse(blocksRes.content[0].text);
let blocks = inner.blocks || [];

function textOf(b){
  const t = b.text || b.heading1 || b.heading2 || b.heading3 || b.bullet || b.ordered || b.quote || {};
  if (t?.elements) return t.elements.map(e => e.text_run?.content || '').join('');
  return '';
}

const imageDir = 'D:/openclaw-stack/workspace/images/opendesign-visual-course-v5-2026-05-19';
const inserts = [
  ['课程总目标｜先把内容变成作品系统', '00-cover-content-system-v5.png'],
  ['第一课｜内容设计：先定读者任务', '01-内容设计-v5.png'],
  ['第二课｜阅读路径：一屏只安排一个主判断', '02-阅读路径-v5.png'],
  ['第三课｜中文信息密度：把长文切成可扫读模块', '03-中文密度-v5.png'],
  ['第四课｜视觉系统：颜色、字体、网格必须有职责', '04-视觉系统-v5.png'],
  ['第五课｜案例图解：每个知识点都必须可视化', '05-案例图解-v5.png'],
  ['第六课｜日报应用：从新闻堆叠变成判断产品', '06-日报应用-v5.png'],
  ['第七课｜教程应用：把知识点变成练习', '07-教程应用-v5.png'],
  ['第八课｜生成后验收：没有检查就不能交付', '08-生成验收-v5.png'],
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
  const res = await doc.execute('upload-v5-' + p.file, {
    action: 'upload_image',
    doc_token,
    image: 'data:image/png;base64,' + b64,
    parent_block_id: doc_token,
    filename: p.file,
    index: p.index
  });
  uploaded.push({heading:p.heading, file:p.file, index:p.index, result:res?.details || res});
}

const after = await doc.execute('read-after-v5', {action:'read', doc_token});
const afterText = after?.details?.content || JSON.stringify(after);
const blocksAfterRes = await doc.execute('blocks-after-images-v5', {action:'list_blocks', doc_token});
const innerAfter = JSON.parse(blocksAfterRes.content[0].text);
const blocksAfter = innerAfter.blocks || [];
const imageBlocks = blocksAfter.filter(b => b.block_type === 27);
const emptyImages = imageBlocks.filter(b => !b.image?.token && !b.image?.file_token && !b.image?.image_token).map(b => b.block_id);
const oldMarkers = ['OpenDesign AI 科技风系统版 v4', '板书式图文报告', '00-cover-opendesign-course-v4'];

const checks = {
  titleV5: afterText.includes('OpenDesign 内容设计课程 v5'),
  hasEightLessons: ['第一课','第二课','第三课','第四课','第五课','第六课','第七课','第八课'].every(s => afterText.includes(s)),
  hasDailyRule: afterText.includes('日报先做内容设计卡'),
  hasTutorialRule: afterText.includes('教程必须有场景、坏结果、改法、示例、练习、检查'),
  hasReportRule: afterText.includes('图文报告先写主判断'),
  oldMarkersPresent: oldMarkers.filter(s => afterText.includes(s)),
  imageBlocks: imageBlocks.length,
  emptyImages,
  uploadedCount: uploaded.length,
  revision: after?.details?.revision_id,
  blockCount: blocksAfter.length
};

fs.writeFileSync('D:/openclaw-stack/workspace/learning/opendesign-v5-feishu-upload-result-2026-05-19.json', JSON.stringify({writeRes, uploaded, checks}, null, 2), 'utf8');
console.log(JSON.stringify(checks, null, 2));


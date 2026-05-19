import fs from 'node:fs';
import path from 'node:path';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = { config, logger:{debug(){},warn(){},info(){},error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); } };
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';
const mdPath = 'D:/openclaw-stack/workspace/learning/art-design-course-no-opendesign-2026-05-19.md';
const manifestPath = 'D:/openclaw-stack/workspace/images/art-design-course-no-opendesign-2026-05-19/manifest.json';
const content = fs.readFileSync(mdPath,'utf8');
const records = JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const before = await doc.execute('backup-before-no-opendesign', {action:'read', doc_token});
fs.writeFileSync('D:/openclaw-stack/workspace/learning/backup-visual-wiki-before-no-opendesign-2026-05-19.md', before?.details?.content || JSON.stringify(before,null,2), 'utf8');
await doc.execute('write-no-opendesign-course', {action:'write', doc_token, content});
const blocksRes = await doc.execute('blocks-after-write-no-opendesign', {action:'list_blocks', doc_token});
const blocks = JSON.parse(blocksRes.content[0].text).blocks || [];
function blockText(b){ const t=b.text||b.heading1||b.heading2||b.heading3||b.bullet||b.ordered||b.quote||{}; return t?.elements ? t.elements.map(e=>e.text_run?.content||'').join('') : ''; }
let cursor = -1;
const plannedAsc = records.map(r => {
  const short = r.heading.includes('｜') ? r.heading.split('｜').at(-1) : r.heading;
  const idx = blocks.findIndex((b, i) => i > cursor && (blockText(b).trim() === r.heading || blockText(b).trim() === short));
  if (idx < 0) throw new Error('Heading not found after cursor '+cursor+': '+r.heading+' / '+short);
  cursor = idx;
  return { ...r, index: idx + 1 };
});
const planned = plannedAsc.sort((a,b)=>b.index-a.index);
const uploaded=[];
for(const item of planned){
  const res = await doc.execute('upload-'+item.file, { action:'upload_image', doc_token, file_path:path.resolve('D:/openclaw-stack/workspace', item.path), parent_block_id:doc_token, index:item.index });
  uploaded.push({heading:item.heading,file:item.file,index:item.index,ok:!res?.isError});
}
const after = await doc.execute('read-after-no-opendesign-course',{action:'read', doc_token});
const afterText = after?.details?.content || JSON.stringify(after);
const blocksAfterRes = await doc.execute('blocks-after-images-no-opendesign',{action:'list_blocks', doc_token});
const blocksAfter = JSON.parse(blocksAfterRes.content[0].text).blocks || [];
const imageBlocks = blocksAfter.filter(b=>b.block_type===27);
const emptyImages = imageBlocks.filter(b=>!b.image?.token && !b.image?.file_token && !b.image?.image_token);
const forbidden=['OpenDesign','Open Design','open design','opendesign','内容设计中台','执行链','设计理念'];
const required=['设计、美学、排版、色彩、字体｜艺术设计教程','第一课｜设计基础：先解决信息秩序','第八课｜交付检查：好看必须能被验证'];
const checks={ forbiddenPresent: forbidden.filter(s=>afterText.toLowerCase().includes(s.toLowerCase())), requiredMissing: required.filter(s=>!afterText.includes(s)), plannedImageCount: records.length, uploadedOkCount: uploaded.filter(x=>x.ok).length, imageBlockCount:imageBlocks.length, emptyImageCount:emptyImages.length, blockCount:blocksAfter.length, link:'https://my.feishu.cn/wiki/MI56wWT54ipCPRkS7jIcRyWlnnb?fromScene=spaceOverview' };
fs.writeFileSync('D:/openclaw-stack/workspace/learning/art-course-no-opendesign-verify-2026-05-19.json', JSON.stringify({checks,uploaded},null,2), 'utf8');
console.log(JSON.stringify(checks,null,2));


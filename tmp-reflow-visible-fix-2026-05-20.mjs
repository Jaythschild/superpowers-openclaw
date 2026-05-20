import fs from 'node:fs';
import path from 'node:path';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config=JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools=new Map();
const api={config,logger:{debug(){},warn(){},info(){},error(){}},registerTool(fn,meta){tools.set(meta.name,fn({agentAccountId:undefined,messageChannel:'feishu'}));}};
registerFeishuDocTools(api); const doc=tools.get('feishu_doc');
const doc_token='Efq7daX6NoE1x2xPWhwcNwh3nah';
const mdPath='D:/openclaw-stack/workspace/learning/art-design-course-no-opendesign-2026-05-19.md';
const imageDir='D:/openclaw-stack/workspace/images/art-course-visible-fix-2026-05-20-1240';
const fixedDir=path.join(imageDir,'fixed-ascii');
const content=fs.readFileSync(mdPath,'utf8');
const backup=await doc.execute('backup-before-reflow-premium',{action:'read',doc_token});
fs.writeFileSync('D:/openclaw-stack/workspace/learning/backup-visual-wiki-before-visible-fix-2026-05-20.md', backup?.details?.content||JSON.stringify(backup,null,2),'utf8');
await doc.execute('write-clean-before-premium-reflow',{action:'write',doc_token,content});
let res=await doc.execute('blocks-clean-before-premium-reflow',{action:'list_blocks',doc_token});
let blocks=JSON.parse(res.content[0].text).blocks||[];
function textOf(b){const t=b.text||b.heading1||b.heading2||b.heading3||b.heading4||b.bullet||b.ordered||b.quote||{}; return t?.elements ? t.elements.map(e=>e.text_run?.content||'').join('') : '';}
const lessons=[
{goal:'理解设计不是装饰，而是组织信息。一个页面首先要让读者知道先看哪里、重点是什么、下一步做什么。', core:'所有装饰都要服从信息表达。', method:'把内容拆成主判断、关键证据、补充信息三层。主判断放在最强位置，证据用图卡承接，补充信息降权处理。', case:'一页日报首页如果只堆新闻标题，读者会先寻找线索。改成“今日主线 + 三条证据 + 下一步关注”，页面就有了阅读方向。', practice:'拿一篇 AI 日报首页，把新闻列表改成“今日主线 + 三条证据 + 下一步关注”。', check:'遮住正文，只看标题、图和位置，是否还能知道这一页讲什么？如果不能，信息秩序还没建立。'},
{goal:'建立基础审美判断，知道什么时候该克制，什么时候该强调，什么时候该删掉多余元素。', core:'材质、阴影、线条、发光都必须少用，并且服务内容。', method:'为整篇文档选择一个视觉母版，固定背景、标题、卡片、图像和强调色。不要每一节换一套风格。', case:'黑底、蓝光、强渐变同时出现时，页面容易吵。降低饱和度、减少光效、保留一个强调色，重点会更稳。', practice:'把一页黑底蓝光科技风页面改成低饱和背景、清晰网格、少量强调色和更稳的文字层级。', check:'把页面缩小到 50% 后，是否仍然清楚、稳定、不吵？如果缩小后只剩光效和噪声，审美判断需要重做。'},
{goal:'掌握中文知识库和教程文档的排版方法，让长文能被快速扫读，而不是变成一整块灰色文字。', core:'注释、来源和限制要保留，但视觉权重降低。', method:'每节课固定为学习目标、核心知识、美化方法、案例、练习、检查。读者每次进入新章节都知道怎么读。', case:'500 字学习记录先压成一句主判断，再拆出三条证据和一个练习，阅读压力会明显下降。', practice:'把 500 字学习记录改成：一句主判断、三条证据、一个练习、一个交付检查。', check:'手机宽度下是否有超过 6 行连续正文？如果有，就拆成判断、证据、方法或检查。'},
{goal:'建立色彩系统，不再凭感觉随意换颜色。颜色要帮助读者理解信息关系。', core:'中文文档里高饱和色要谨慎，避免抢正文注意力。', method:'固定色彩职责：深墨色给主判断，蓝色给证据和路径，绿色给行动，琥珀色给风险，灰色给来源和说明。', case:'同一篇日报里，机会、风险、产品、资本、技术如果都用亮色，读者无法判断信息关系。颜色先分职责，再做美化。', practice:'给一篇日报设计颜色职责表：机会、风险、产品、资本、技术、下一步分别用什么视觉语言表示。', check:'遮住文字，只看颜色和位置，是否能分辨结论、证据、风险、行动？不能就说明颜色没有承担角色。'},
{goal:'理解字体不是随便选一个好看的字形，而是在控制内容语气、阅读速度和专业感。', core:'字体风格必须匹配内容：教程要清楚，报告要专业，海报可以更有表现力。', method:'固定四档字体层级：封面标题、章节标题、正文、注释。每档只改字号和字重，不临时乱加描边、阴影和特殊效果。', case:'如果标题、标签、正文、注释都加粗，页面会失去重点。减少字重后，层级反而更清楚。', practice:'把一页所有文字统一成四档层级，并删除多余字重。观察页面是否更稳。', check:'快速扫一眼，是否能分出标题、重点、正文和注释？如果所有字都像重点，字体层级失败。'},
{goal:'掌握基础构图方法，让图文内容形成明确观看路径。', core:'图像、标题、正文之间要有方向关系，不能各站各的。', method:'教程图固定三种构图：对比图、流程图、结构图。每张图只承担一种教学任务，不混合太多元素。', case:'改前改后的排版案例适合左右对比，步骤教学适合横向流程，层级说明适合金字塔或分层结构。', practice:'把“改前 vs 改后”的排版案例做成左右对比图，左边放问题，右边放重构后的阅读路径。', check:'只看布局，不看文字，视线是否自然从主结论走到证据再到行动？如果视线乱跳，构图需要调整。'},
{goal:'让图片承担教学功能。每个知识点至少配一种可解释的图，而不是放氛围图。', core:'图中文字要少，但结论必须明确。', method:'每个小节都配一张图卡。图卡标题直接写结论，图内只保留关键结构和少量标注，风格统一。', case:'讲色彩系统时，用颜色职责图；讲排版时，用灰文块到分段结构的对比；讲验收时，用检查清单图。', practice:'为“色彩系统”做一张颜色职责图：主判断、证据、行动、风险、来源分别放在固定位置。', check:'只看图，不看正文，能否说出这节课的核心？不能的话，图只是装饰。'},
{goal:'把审美要求转成可检查动作，避免只凭感觉说“已经美化”。', core:'残留检查：旧标题、测试块、错误主题是否清理干净。', method:'生成后读取飞书全文和 blocks，检查图片数量、空图片块、旧版关键词、章节完整度，把结果写入交付说明。', case:'如果文档说已经美化，但没有图片数量、残留关键词、章节完整度和空块检查，就不能算完成。', practice:'为本课程建立交付清单：主题是否正确、章节是否对应标题、图片是否解释课程内容、是否有旧内容残留。', check:'如果没有验收结果，就不能说完成。'}
];
const targets=['这门课不是讲某个工具的理念，而是训练纳斯在真实输出中做出更好的视觉判断：页面是否有秩序，颜色是否有职责，字体是否适合内容，构图是否引导视线，图文是否一起表达同一个重点。','能判断页面秩序、排版节奏、颜色职责、字体层级、构图路径和图文解释力，并在交付前完成质量检查。'];
for(const l of lessons) targets.push(l.goal,l.core,l.method,l.case,l.practice,l.check);
const files=fs.readdirSync(imageDir).filter(f=>/^[0-9]{2}-.*\.png$/i.test(f)).sort((a,b)=>Number(a.slice(0,2))-Number(b.slice(0,2)));
if(targets.length!==50||files.length!==50) throw new Error(`targets ${targets.length} files ${files.length}`);
const planned=targets.map((target,i)=>{
  const idx=blocks.findIndex(b=>textOf(b).trim()===target);
  if(idx<0) throw new Error('target not found '+(i+1)+' '+target);
  const order=i+1;
  const fixed=path.join(fixedDir,`${String(order).padStart(2,'0')}-premium-fixed.png`);
  return {order,target,index:idx+1,file:fs.existsSync(fixed)?fixed:path.join(imageDir,files[i]),filename:fs.existsSync(fixed)?path.basename(fixed):files[i]};
}).sort((a,b)=>b.index-a.index);
const uploaded=[];
for(const p of planned){
  const b64=fs.readFileSync(p.file).toString('base64');
  const up=await doc.execute('upload-visible-fix-'+String(p.order).padStart(2,'0'),{action:'upload_image',doc_token,image:'data:image/png;base64,'+b64,filename:p.filename,parent_block_id:doc_token,index:p.index});
  uploaded.push({order:p.order,index:p.index,filename:p.filename,upload:up?.details||up});
}
const read=await doc.execute('read-after-reflow-premium',{action:'read',doc_token});
const text=read?.details?.content||JSON.stringify(read);
res=await doc.execute('blocks-after-reflow-premium',{action:'list_blocks',doc_token});
blocks=JSON.parse(res.content[0].text).blocks||[];
const imgs=blocks.filter(b=>b.block_type===27).map((b,i)=>({order:i+1,id:b.block_id,token:b.image?.token,width:b.image?.width,height:b.image?.height}));
const bad=imgs.filter(x=>!x.token||x.width!==1400||x.height!==620);
const checks={revision:read?.details?.revision_id,blockCount:blocks.length,imageBlockCount:imgs.length,badCount:bad.length,bad,emptyImageCount:imgs.filter(x=>!x.token).length,widthSet:[...new Set(imgs.map(x=>x.width))],heightSet:[...new Set(imgs.map(x=>x.height))],requiredMissing:['设计、美学、排版、色彩、字体｜艺术设计教程','第一课｜设计基础：先解决信息秩序','第八课｜交付检查：好看必须能被验证'].filter(s=>!text.includes(s)),opendesignResidual:['OpenDesign','Open Design','open design','opendesign'].filter(s=>text.includes(s)),uploadedCount:uploaded.length,link:'https://my.feishu.cn/wiki/MI56wWT54ipCPRkS7jIcRyWlnnb?fromScene=spaceOverview'};
fs.writeFileSync('D:/openclaw-stack/workspace/learning/art-course-visible-fix-verify-2026-05-20.json',JSON.stringify({checks,uploaded:uploaded.sort((a,b)=>a.order-b.order)},null,2),'utf8');
console.log(JSON.stringify(checks,null,2));




import fs from 'node:fs';
import { registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';
const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {config, logger:{debug(){}, warn(){}, info(){}, error(){}}, registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'feishu'})); }};
registerFeishuDocTools(api);
const doc = tools.get('feishu_doc');
const doc_token = 'Efq7daX6NoE1x2xPWhwcNwh3nah';

const readBefore = await doc.execute('read-before', {action:'read', doc_token});
const beforeText = readBefore?.details?.content || JSON.stringify(readBefore);
const marker = 'OpenDesign 内容设计中台';
let inserted = false;

await doc.execute('update-style-intro', {
  action: 'update_block',
  doc_token,
  block_id: 'doxcnke9QcTKR8zrO76wuN9sueb',
  content: '这份《设计、美学、排版、色彩、字体》文档后续统一采用 AI 科技风，并把 OpenDesign 纳入内容设计中台。所有新增章节、示例图、课程图解、案例分析、教程和日报，都要先完成内容目标、风格组合、示例设计和生成后检查，再写入文档。'
});

if (!beforeText.includes(marker)) {
  const content = [
    '## OpenDesign 内容设计中台：先设计课程，再生成内容',
    '',
    'OpenDesign 进入这份课程的作用不是“多加一个参考”，而是做内容设计中台：先决定内容结构、风格母版、示例方式和质检标准，再生成图文。后续不能一节一节像打补丁一样追加。',
    '',
    '### 统一风格组合',
    '',
    '- 主风格：Data Drift，用于 AI、机器学习、数据流、智能系统和未来感课程图。',
    '- 结构风格：Swiss Pulse，用于网格、指标、报告结构、卡片秩序和清晰阅读路径。',
    '- 高级感约束：Velvet Standard，用于克制留白、少色彩、慢节奏和高级质感。',
    '- 禁止默认使用廉价霓虹、满屏发光、随机渐变、图标堆砌和无意义科技线框。',
    '',
    '### 内容设计流程',
    '',
    '1. 先确定读者看完要理解什么、能做什么。',
    '2. 再确定本节属于哪个课程模块：视觉层级、中文排版、色彩系统、报告版式、信息图标注、交付验收或内容设计。',
    '3. 为每个知识点补具体示例：正例、反例、可执行场景至少占一个。',
    '4. 图片必须承担教学功能：解释概念、展示对比、说明流程或给出检查标准。',
    '5. 写入飞书前要和已有课程融合，不能把报告原文、学习流水账或临时素材直接贴进去。',
    '',
    '### 生成后检查',
    '',
    '- 结构检查：是否像系统课程，而不是新增补丁？',
    '- 审美检查：是否统一为 Data Drift + Swiss Pulse + Velvet Standard 的 AI 科技风？',
    '- 教学检查：是否每个知识点都有具体示例？',
    '- 图像检查：图片是否能独立说明一个概念？',
    '- 应用检查：本次学到的设计知识是否已经应用到文档、教程、日报或图文报告？',
    '- 飞书检查：图片 token 是否非空，是否没有空图片块、测试块、重复段落和旧版残留？',
    '',
    '### 应用到教程、日报和报告',
    '',
    '- 教程：按“学习目标 -> 概念 -> 正反示例 -> 操作步骤 -> 练习 -> 检查清单”组织。',
    '- 日报：按“今日主线 -> 影响图卡 -> 分栏目证据 -> 纳斯观察 -> 来源限制”组织。',
    '- 图文报告：按“主判断 -> 关键证据 -> 行动建议 -> 可视化解释”组织。',
    '- 飞书 Wiki：新增内容必须进入课程体系位置，不做孤立追加。'
  ].join('\n');
  await doc.execute('insert-opendesign-system', {
    action: 'insert',
    doc_token,
    after_block_id: 'doxcnRK68EhOktFCHddJvzKDXjf',
    content
  });
  inserted = true;
}

const readAfter = await doc.execute('read-after', {action:'read', doc_token});
const afterText = readAfter?.details?.content || JSON.stringify(readAfter);
const blocksRes = await doc.execute('blocks-after', {action:'list_blocks', doc_token});
const inner = JSON.parse(blocksRes.content[0].text);
const blocks = inner.blocks || [];
const imageBlocks = blocks.filter(b => b.block_type === 27);
const emptyImages = imageBlocks.filter(b => !b.image?.token && !b.image?.file_token && !b.image?.image_token);
const hasMarker = afterText.includes(marker);
const hasDataDrift = afterText.includes('Data Drift') && afterText.includes('Swiss Pulse') && afterText.includes('Velvet Standard');
const hasChecklist = afterText.includes('飞书检查') && afterText.includes('生成后检查');
console.log(JSON.stringify({inserted, hasMarker, hasDataDrift, hasChecklist, imageBlocks:imageBlocks.length, emptyImages:emptyImages.map(b=>b.block_id)}, null, 2));

import fs from 'node:fs';
import { registerFeishuWikiTools, registerFeishuDocTools } from 'file:///D:/openclaw-stack/state/npm/node_modules/@openclaw/feishu/dist/api.js';

const config = JSON.parse(fs.readFileSync('D:/openclaw-stack/state/openclaw.json','utf8'));
const tools = new Map();
const api = {
  config,
  logger:{debug(){}, warn(){}, info(){}, error(...args){ console.error('[feishu]', ...args);}},
  registerTool(fn, meta){ tools.set(meta.name, fn({agentAccountId: undefined, messageChannel:'webchat'})); }
};
registerFeishuWikiTools(api);
registerFeishuDocTools(api);
const wiki = tools.get('feishu_wiki');
const doc = tools.get('feishu_doc');
if (!wiki || !doc) throw new Error('feishu_wiki or feishu_doc tool not registered');

const wikiToken = 'MI56wWT54ipCPRkS7jIcRyWlnnb';
const sourcePath = 'D:/openclaw-stack/workspace/learning/feishu-wiki-visual-design-knowledge-base-2026-05-12.md';

console.log('Step 1: wiki get', wikiToken);
const nodeRes = await wiki.execute('wiki-get', { action:'get', token: wikiToken });
console.log('wiki_get_result=', JSON.stringify(nodeRes, null, 2));
const node = nodeRes.details ?? nodeRes.node ?? nodeRes;
const objToken = node?.obj_token;
if (!objToken) throw new Error('No obj_token from wiki get: '+JSON.stringify(nodeRes));
console.log('obj_token=', objToken);

console.log('Step 2a: list_blocks before write');
const beforeBlocks = await doc.execute('doc-list-blocks-before-write', { action:'list_blocks', doc_token: objToken });
const beforeSummary = {
  title: beforeBlocks.title,
  block_count: beforeBlocks.block_count ?? beforeBlocks.blocks?.length,
  block_types: beforeBlocks.block_types,
  first_blocks: (beforeBlocks.blocks ?? []).slice(0, 3).map(b => ({ block_id:b.block_id, block_type:b.block_type, text:b.text?.slice?.(0,80) }))
};
console.log('before_blocks_summary=', JSON.stringify(beforeSummary, null, 2));

const content = fs.readFileSync(sourcePath, 'utf8');
console.log('source_chars=', content.length);
console.log('Step 2b: write full markdown content (replace all)');
const writeRes = await doc.execute('doc-write-replace-all', { action:'write', doc_token: objToken, content });
console.log('write_result=', JSON.stringify(writeRes, null, 2));

console.log('Step 2c: verify by read/list_blocks after write');
const readRes = await doc.execute('doc-read-after-write', { action:'read', doc_token: objToken });
const afterBlocks = await doc.execute('doc-list-blocks-after-write', { action:'list_blocks', doc_token: objToken });
const afterText = readRes.content ?? readRes.text ?? readRes.plain_text ?? '';
const verify = {
  obj_token: objToken,
  source_chars: content.length,
  read_title: readRes.title,
  read_content_chars: typeof afterText === 'string' ? afterText.length : null,
  contains_title: typeof afterText === 'string' ? afterText.includes('视觉设计学习知识库') : null,
  contains_last_section: typeof afterText === 'string' ? afterText.includes('下一步学习建议') || afterText.includes('长期学习原则') : null,
  after_block_count: afterBlocks.block_count ?? afterBlocks.blocks?.length,
  after_block_types: afterBlocks.block_types,
  write_ok: !!(writeRes.success ?? writeRes.ok ?? writeRes.message ?? writeRes)
};
console.log('verify=', JSON.stringify(verify, null, 2));

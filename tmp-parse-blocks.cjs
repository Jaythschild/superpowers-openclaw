const fs = require('fs');
const outer = JSON.parse(fs.readFileSync('D:/openclaw-stack/workspace/visual-knowledge-blocks.json','utf8'));
const inner = JSON.parse(outer.content[0].text);
const blocks = inner.blocks || [];
function txt(b){
  const t = b.text || b.heading1 || b.heading2 || b.heading3 || b.bullet || b.ordered || b.quote || {};
  if (typeof t === 'string') return t;
  if (t?.elements) return t.elements.map(e=>e.text_run?.content || e.mention_doc?.title || '').join('');
  return JSON.stringify(t).slice(0,100);
}
console.log(JSON.stringify({count: blocks.length, first: blocks.slice(0,80).map((b,i)=>({i, id:b.block_id, type:b.block_type, text:txt(b)}))}, null, 2));

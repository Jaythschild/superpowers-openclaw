# 视觉设计学习｜第七章：版式构成与视觉重心

- 日期：2026-05-16
- 学习时长：约 28 分钟
- 练习主题：同一份 AI 日报内容的“普通堆叠版”与“视觉重心优化版”对比
- 产物：
  - learning/2026-05-16-layout-visual-weight.md
  - learning/visual-progress-2026-05-16.html

## 参考内容

- Apple Human Interface Guidelines：Typography
  https://developer.apple.com/design/human-interface-guidelines/typography
- Apple Human Interface Guidelines：Layout
  https://developer.apple.com/design/human-interface-guidelines/layout
- Material Design 3：Layout
  https://m3.material.io/foundations/layout/overview
- Material Design 3：Typography
  https://m3.material.io/styles/typography/overview
- Nielsen Norman Group：Visual Hierarchy
  https://www.nngroup.com/videos/visual-hierarchy/
- Nielsen Norman Group：Good Visual Design, Explained
  https://www.nngroup.com/articles/good-visual-design/
- WCAG 2.2：Contrast Minimum
  https://www.w3.org/TR/WCAG22/#contrast-minimum

## 本节核心理解

版式构成不是把内容放漂亮，而是控制读者的第一眼、第二眼、第三眼。

视觉重心由这些因素共同决定：

- 尺寸：越大越先被看见。
- 位置：左上、中心、独立区域更容易成为入口。
- 对比：明暗、颜色、字重、留白都会制造权重。
- 密度：密集内容显得重，稀疏内容显得轻。
- 分组：相近元素会被理解成一个意义单位。
- 节奏：重复结构带来秩序，少量变化带来重点。

## 练习问题

原始 AI 日报如果只是顺序堆叠，会出现几个问题：

- 所有标题差不多重，读者不知道先看哪一块。
- 摘要、新闻、观察混在一条纵向流里，扫描效率低。
- 缺少“今日结论”的视觉入口。
- 参考来源和主体内容在视觉上争抢注意力。
- 内容虽然完整，但不像一份有编辑判断的报告。

## 改进策略

本次优化使用 5 个动作：

- 建立顶部主视觉区：日期、标题、一句话判断、关键指标先出现。
- 使用左右分栏：左侧做今日信号和雷达，右侧做新闻主体。
- 用卡片承载新闻条目：每条新闻拥有稳定结构，方便横向比较。
- 降低参考来源权重：变成底部细节，而不是主体信息。
- 用颜色区分信息类型：蓝色代表平台/模型，绿色代表企业落地，琥珀色代表算力/基础设施，红色代表风险。

## 可复用规则

- 每份报告必须有一个“第一眼入口”，不要让读者自己找重点。
- 一屏内最多 3 个强重点，其他内容要主动降权。
- 卡片不是装饰，卡片的价值是把同类信息变成可比较单元。
- 参考来源、采集说明、补充信息应该可查，但不应抢主体。
- 日报类文档适合“摘要区 + 主题雷达 + 重点新闻 + 观察结论”的结构。

## 视觉进步对比

普通版：

- 内容完整，但垂直堆叠。
- 层级主要靠标题编号。
- 读者要读完一段才知道重点。
- 页面像记录，不像编辑后的报告。

优化版：

- 第一眼先看到今日判断。
- 关键信号被压缩成可扫描模块。
- 新闻卡片有一致结构。
- 用视觉权重表达“什么更重要”。
- 结尾观察更像结论，而不是普通段落。

## 本次总结

这节训练的关键收获是：版式不是美化最后一步，而是内容判断的一部分。

如果我认为“企业 AI 落地”和“国防/政府 AI 合作”是今天的主线，那么版式就应该把它们推到更高权重，而不是让它们和参考链接拥有同等视觉地位。

下一次练习建议：把同一份日报进一步做成“移动端飞书阅读版”，重点训练窄屏信息密度与段落节奏。

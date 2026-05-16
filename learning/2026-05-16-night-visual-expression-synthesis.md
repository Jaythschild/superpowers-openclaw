# 2026-05-16 夜间学习：视觉表达综合训练

## 元信息

- 学习主题：美术、设计、排版、字体、颜色、构图、视觉层级、PPT/信息图表达
- 开始时间：2026-05-16 23:35（Asia/Shanghai）
- 学习耗时：约 35 分钟
- 当前模型状态：OpenClaw 显示 openai/gpt-5.5，fallback 为 lmstudio/qwen/qwen3.6-27b
- 开始 token/context 状态：516 in / 9 out；Context 61k/272k (22%)；Cache 99% hit；Compactions 0
- 结束 token/context 状态：516 in / 9 out；Context 61k/272k (22%)；Cache 99% hit；Compactions 0
- 工具与爬取方式：使用 Scrapling 官方 skill；本地 .venv-scrapling，Scrapling 0.4.7
- 抓取目录：learning/scrapes-2026-05-16-night/
- 可视化产物：learning/visual-expression-practice-2026-05-16-night.html
- 预览图：images/visual_expression_desktop_final.png；images/visual_expression_mobile_final.png
- 飞书同步位置：固定 Wiki《设计、美学、排版、色彩、字体》；链接 https://my.feishu.cn/wiki/MI56wWT54ipCPRkS7jIcRyWlnnb?fromScene=spaceOverview

## 参考内容

1. Nielsen Norman Group：Visual Hierarchy in UX: Definition  
   https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
2. IBM Carbon Design System：Color overview  
   https://carbondesignsystem.com/elements/color/overview/
3. IBM Carbon Design System：Typography overview  
   https://carbondesignsystem.com/elements/typography/overview/
4. Datawrapper：How to pick more beautiful colors for your data visualizations  
   https://www.datawrapper.de/blog/beautifulcolors
5. Datawrapper：What to consider when using text in data visualizations  
   https://www.datawrapper.de/blog/text-in-data-visualizations

备注：Material Design 的 color/typography 页面也通过 Scrapling 抓取过，但动态页面正文不足，因此本次不作为主要学习依据。

## 学习摘要

### 1. 视觉层级不是“变好看”，而是安排观看顺序

NN/g 对视觉层级的定义非常直接：通过页面元素组织，让眼睛按设计者希望的优先级消费信息。可操作手段主要是颜色与对比、尺度、分组。
这对 PPT 和信息图尤其重要：一页里只能有一个最先被看到的主信号，其余内容必须主动让位。

本次可复用规则：

- 先写出页面的第一视线、第二视线、第三视线，再决定字号、颜色、位置。
- 同等级信息必须长得像同等级；不同等级必须有明显差异。
- 如果所有内容都在强调，等于没有内容被强调。

### 2. 颜色系统要先有中性色，再有行动色和强调色

Carbon 的颜色系统强调：中性灰负责组织区域，核心蓝作为主要行动色，其他颜色克制使用。这个思路适合工作型界面、报告和商业 PPT：不要让色彩抢故事。
Datawrapper 对数据可视化颜色的建议更具体：分类色要彼此可分辨，不要只选“漂亮但相近”的颜色；颜色必须服务读者识别，而不是服务装饰。

本次可复用规则：

- 背景和大面积区域优先用中性色；高饱和色只给关键数据、状态或行动。
- 分类色先看可区分度，再看审美；相邻类别不要只靠亮度差。
- 信息图中颜色数量尽量少，通常 1 个主色、1 个强调色、2-4 个分类色已经足够。

### 3. 字体排版的关键是“任务密度”和“阅读节奏”

Carbon 把 typography 分成 productive 与 expressive 两类：产品空间更适合紧凑、克制、帮助完成任务；表达型场景可以更大、更戏剧化。
这条对 PPT 很有用：封面、章节页可以 expressive；正文页、数据页应该 productive。

本次可复用规则：

- 一页最多使用 3-4 个字号层级：标题、摘要、正文、辅助信息。
- 中文正文更依赖行距和留白；不要靠过多字重制造层级。
- 长标题优先改写为短句，而不是硬缩字号。

### 4. 信息图里的文字应该靠近数据

Datawrapper 对数据图中文字的建议很实用：文字是数据可视化里最容易被低估的元素；标签、单位、注释、来源、标题都在帮助读者理解。尤其是“直接标注”，能减少读者在图例和图形之间来回寻找。

本次可复用规则：

- 能直接标注就少用图例。
- 单位要出现在读者需要的位置：轴、标签、注释、tooltip，而不只写在说明里。
- 注释不是装饰，应该解释异常、转折、峰值、风险。

### 5. 构图训练：从“堆信息”到“建立路径”

本次练习把一组视觉学习内容做成前后对比：左侧是散乱堆叠，右侧是按主张、证据、方法、行动组织。核心变化不是加装饰，而是改变阅读路径。

设计动作：

- 建立一个强主标题，让读者先知道结论。
- 使用 3 个指标卡承接关键判断，形成第二视线。
- 用流程条表现从输入到输出的设计路径。
- 用强调色只标出关键训练方向，避免整页变成单色主题。

## 本次新增可复用检查清单

- 页面第一眼是否能在 2 秒内读出主题？
- 主标题、关键数值、正文说明是否有明确的尺度差？
- 同类信息是否对齐、等距、同样式？
- 是否有一处明确强调，而不是到处强调？
- 颜色是否同时满足区分、层级和克制？
- 图表是否直接标注关键数据和单位？
- 注释是否解释“为什么重要”，而不只是复述数值？
- 页脚来源、日期、上下文是否足够但不抢主信息？

## 产物

- 本地学习记录：learning/2026-05-16-night-visual-expression-synthesis.md
- 可视化练习页面：learning/visual-expression-practice-2026-05-16-night.html
- Scrapling 抓取资料：learning/scrapes-2026-05-16-night/
- 飞书 Wiki 同步：已通过 Feishu CLI 追加到固定 Wiki，并插入桌面/移动端预览图。文档链接：https://my.feishu.cn/wiki/MI56wWT54ipCPRkS7jIcRyWlnnb?fromScene=spaceOverview

## 视觉验收与返工记录

- 桌面截图：images/visual_expression_desktop_final.png
- 移动端截图：images/visual_expression_mobile_final.png
- 首次问题：移动端两列布局导致横向溢出，部分中文长句被裁切。
- 改进动作：移动端改为单列布局，降低标题字号，缩短移动端文案，补充 word-break 与 min-width 约束。
- 新版结果：桌面版结构清晰；移动端主要文字不再明显裁切，适合作为本次前后对比练习成果。

## Token 与资源消耗摘要

- 开始状态：516 in / 9 out；Context 61k/272k (22%)；Cache 99% hit；Compactions 0。
- 结束状态：516 in / 9 out；Context 61k/272k (22%)；Cache 99% hit；Compactions 0。
- 本次增量估算：状态卡未显示可计算差值，无法严谨计算单任务 token 差值。
- 资源消耗：Scrapling 抓取 8 个 URL，其中 5 个作为主要参考；Edge headless 渲染桌面与移动端截图；未发生 compaction。


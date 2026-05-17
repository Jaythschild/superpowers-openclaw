# 报告视觉升级专项训练｜2026-05-17

## 元信息

- 学习耗时：约 20 分钟（21:24-21:44，Asia/Shanghai）
- 学习主题：飞书报告的图文结构、扫读路径、图表标注和配色角色
- 使用工具：Scrapling 官方 skill、Scrapling CLI、Pillow 图像生成、Feishu CLI
- 抓取目录：learning/scrapes-2026-05-17-report-upgrade/
- 可视化产物：images/report-visual-upgrade-2026-05-17-v2.png
- 同步位置：飞书 Wiki《设计、美学、排版、色彩、字体》

## 参考内容

1. Nielsen Norman Group：F-Shaped Pattern of Reading on the Web
https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/

2. Carbon Design System：Color overview
https://carbondesignsystem.com/elements/color/overview/

3. Datawrapper：What to consider when using text in data visualizations
https://www.datawrapper.de/blog/text-in-data-visualizations

4. Datawrapper：How to pick more beautiful colors for your data visualizations
https://www.datawrapper.de/blog/beautifulcolors

说明：Datawrapper 的 annotated charts 旧链接返回 404，本次未作为有效资料使用。

## 学习摘要

### 1. 不要让读者被迫 F 型扫读

NN/g 的 F 型扫读研究提醒：当页面是长文本、缺少标题层级、缺少视觉锚点时，读者会沿顶部和左侧快速扫过，后半段大量信息会被跳过。报告如果只是把新闻一条条堆进去，即使内容完整，也会显得没有设计。

可复用规则：

- 封面摘要必须在 2 秒内给出主线。
- 每个大段前要有强标题或视觉锚点。
- 长文必须拆成栏目、短摘要、标签和图示。

### 2. 图片必须有用途说明

Datawrapper 强调，文字是图表中最容易被低估的元素。标题、注释、单位、标签、来源都在帮助读者理解图像。飞书报告里的图片不能只“放在那里”，图片附近必须告诉读者看什么、为什么重要、怎么回到正文。

可复用规则：

- 图片前后必须有一句用途说明。
- 图表尽量直接标注，不让读者在图例和图形之间来回找。
- 重要异常、峰值、转折要用注释解释。

### 3. 色彩要承担角色，不要平均热闹

Carbon 的颜色系统强调中性色分层和少量主行动色；Datawrapper 也提醒分类色要彼此可分辨，但不应在色相环上乱跳。报告要显得专业，颜色应该服务结构和判断，而不是制造噪音。

可复用规则：

- 背景和结构用中性色。
- 一个主色负责识别。
- 一个强调色负责风险、机会或关键变化。
- 图表色先看可区分度，再看漂亮。

## 本次可视化训练

这张图把“像文本仓库”和“像成品报告”放在同一页对比：

- Before：内容有，但没有观看路径。
- After：先给主线，再用图表和注释承接判断。
- 顶部三条规则：先给结论、图贴近解释、少色但有角色。
- 底部验收：标题写结论、图片写用途、颜色有角色、图表直接标注、清理测试痕迹、交付附链接。

## 后续交付标准

- 飞书报告完成后必须附查看链接。
- 报告至少包含一个视觉锚点：封面图、信息图、流程图、对比图或关键图表。
- 图片必须有用途说明。
- 交付前检查是否存在测试文字、坏图片 token、重复段落。
- 对视觉不满意时，不只解释原因，要返工并保留复盘记录。

## Token 与资源消耗补记

- 开始状态：模型 openai/gpt-5.5；Fallback lmstudio/qwen/qwen3.6-27b；Tokens 749 in / 91 out；Context 107k/272k (39%)；Cache 99% hit；Compactions 5。
- 结束状态：模型 openai/gpt-5.5；Fallback lmstudio/qwen/qwen3.6-27b；Tokens 749 in / 91 out；Context 107k/272k (39%)；Cache 99% hit；Compactions 5。
- 本次增量估算：状态卡未显示可计算差值，无法严谨计算单任务 token 差值。
- Scrapling 使用情况：已使用 Scrapling CLI 抓取 NN/g、Carbon、Datawrapper 页面；其中 1 个 Datawrapper 旧链接返回 404，已改用两个有效链接。

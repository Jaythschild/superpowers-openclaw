# 视觉设计学习｜第八章：从高质量网站爬取设计、美学、排版、色彩、字体规则

- 日期：2026-05-16
- 学习时长：约 38 分钟
- 任务来源：杰斯要求“爬取一些好的网站学习，学好和文档名字相关的内容”
- 固定文档主题：设计、美学、排版、色彩、字体
- 爬取方式：按要求使用 scrapling-official skill
- 原始抓取目录：learning/scraped-design-2026-05-16/
- 可视化成果：images/design-learning-map-2026-05-16.png

## 爬取来源

1. Nielsen Norman Group｜Visual Hierarchy in UX
   https://www.nngroup.com/articles/visual-hierarchy-ux-definition/

2. Nielsen Norman Group｜5 Principles of Visual Design in UX
   https://www.nngroup.com/articles/principles-visual-design/

3. Material Design 3｜Layout basics
   https://m3.material.io/foundations/layout/understanding-layout/overview

4. Material Design 3｜Color system
   https://m3.material.io/styles/color/overview

5. Apple Human Interface Guidelines｜Typography
   https://developer.apple.com/design/human-interface-guidelines/typography

6. Apple Human Interface Guidelines｜Color
   https://developer.apple.com/design/human-interface-guidelines/color

7. Canva Learn｜Design Elements and Principles
   https://www.canva.com/learn/design-elements-principles/

## 爬取记录

- NN/g 两篇文章使用 scrapling `extract get` 成功，内容完整。
- Material 与 Apple 页面是动态页面，普通 get 内容偏薄，已按 skill 流程升级为 `extract fetch`。
- Canva 首次返回 403，已升级为 `stealthy-fetch`，成功取得有效内容。
- Adobe 原链接 404，本次不纳入学习依据。

## 五个主题的学习结论

### 1. 设计：不是装饰，是注意力管理

NN/g 对视觉层级的定义很关键：视觉层级是组织页面元素，让眼睛按设计者预期的重要性顺序消费内容。

可复用规则：

- 每个页面先确定“第一眼入口”。
- 强重点不超过 1 个，次重点不超过 3 个。
- 设计判断要通过大小、位置、对比、分组体现出来。
- 如果用户不知道从哪里开始看，设计就是失败的。

### 2. 美学：好看来自秩序、对比和平衡

NN/g 把 scale、visual hierarchy、balance、contrast、Gestalt 作为视觉设计的核心原则。Canva 对 scale 的解释也很直接：元素大小不只是现实比例，更是重要性信号。

可复用规则：

- 美感不是多放元素，而是让元素之间有关系。
- 大小对比负责“谁重要”。
- 平衡负责“画面是否站得住”。
- 格式塔原则负责“哪些东西属于一组”。
- 戏剧化比例可以制造视觉冲击，但必须服务内容。

### 3. 排版：布局要引导行动，而不只是摆放元素

Material 3 对 layout 的核心说法是：layout 是屏幕上元素的视觉安排，并且要用布局引导用户注意到他们想采取的行动。

可复用规则：

- 布局必须服务任务：阅读、比较、选择、行动。
- 间距不是空白浪费，而是分组工具。
- 密度要跟场景匹配：日报适合中密度，仪表盘可高密度，封面要低密度。
- 同级内容使用相同结构，降低理解成本。
- 多屏/窄屏要重新组织优先级，不是简单缩小。

### 4. 色彩：颜色要表达层级、状态和品牌

Material 3 强调色彩系统要创建可访问、个性化的配色，用于表达产品层级、状态和品牌。Apple HIG 强调颜色在浅色、深色和高对比模式下都要工作良好。

可复用规则：

- 颜色不是用来“热闹”的，是用来标记语义。
- 每个强调色都应该有角色：平台、风险、机会、完成、警告。
- 文本和背景必须保持可读对比。
- 深色模式不能直接反转颜色，要重新检查明度关系。
- 自定义颜色要准备浅色、深色、高对比版本。

### 5. 字体：字体层级要传递信息结构

Apple Typography 页面抓取内容有限，但结合 HIG 入口和既有学习记录，可以确认核心方向：字体不只是风格选择，而是层级和阅读节奏工具。

可复用规则：

- 标题负责方向，正文负责阅读，注释负责补充。
- 一个页面不应出现太多字号。
- 字重比颜色更适合表达稳定层级。
- 中文排版要控制行长，避免长句形成灰墙。
- 中英数字混排时，字号和字重节奏要统一。

## 对纳斯后续输出的约束

以后做日报、设计图、PPT、知识库页面时，默认执行：

- 先写一句“本页主判断”。
- 再设计视觉层级，而不是直接排内容。
- 用颜色表达语义，不用颜色装饰。
- 用间距表达分组，不靠边框硬切。
- 每张成果图必须有一个清晰入口、一个主视觉重心、一个可扫描结构。
- 被指出排版差时，优先检查密度、留白、行长、模块比例，而不是换颜色。

## 本次总结

今天真正学到的是：设计、美学、排版、色彩、字体不是五个孤立知识点，而是同一件事的五个层面。

- 设计决定注意力顺序。
- 美学决定关系是否舒服。
- 排版决定阅读路径。
- 色彩决定语义和状态。
- 字体决定信息层级和节奏。

后续我做任何视觉学习成果，不能再只追求“内容完整”。必须先让画面有主次、有呼吸、有判断。


## Token / 资源消耗记录补充

本次学习任务开始前未记录 session status 基线，因此无法严谨计算单任务 token 差值。

当前可见 OpenClaw 状态（2026-05-16 03:41 左右）：

- 当前上下文：约 158k / 272k
- 上下文占用：约 58%
- 缓存命中：约 100%
- 最近状态查询附近 token：约 306 in / 49 out
- 压缩次数：5
- 当前模型：openai/gpt-5.5
- 回退模型：lmstudio/qwen/qwen3.6-27b

后续学习报告将固定记录：

- 任务开始 token/context 状态
- 任务结束 token/context 状态
- 本次增量估算
- 缓存命中率
- 是否发生 compaction


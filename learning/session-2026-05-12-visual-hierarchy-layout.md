# 学习记录 01：视觉层级与排版骨架

时间：2026-05-12 11:38 GMT+8
主题：视觉层级、排版骨架、字体与颜色在层级中的作用

---

## 资料来源

1. Apple Human Interface Guidelines
   - Hierarchy / Harmony / Consistency
   - Typography
   - Accessibility
   - Layout

2. Material Design
   - Typography, grids, space, scale, color, imagery 用于建立 hierarchy、meaning、focus
   - Responsive layout grid / 12-column grid / 8dp spacing
   - Color can communicate hierarchy and meaning

3. Nielsen Norman Group
   - Good visual design: grid, visual hierarchy, intentional color, consistency
   - Visual hierarchy: size, color, proximity, grouping/common region

4. W3C WCAG 2.2
   - Contrast / perceivable information / accessibility baseline

---

## 学到的核心判断

### 1. 视觉层级不是“装饰”，是阅读路径设计

判断一个设计是否有效，先看用户会不会自然地按正确顺序阅读：

- 第一眼：最重要的信息
- 第二眼：支撑信息
- 第三眼：细节、补充、操作

能控制阅读顺序的因素：

- 位置：上方、左侧、中心更容易被注意
- 尺寸：大元素天然更重要
- 字重：粗体通常比细体更重要
- 颜色：高对比/强调色更吸引注意
- 留白：周围越空，元素越突出
- 分组：靠近的元素会被理解为相关
- 对齐：整齐的对齐让结构更容易扫描

---

### 2. 排版骨架先于视觉风格

一个页面先要有骨架，再谈风格。

常用骨架：

#### 日报 / 资讯文档

- 顶部：日期 + 标题 + 一句话摘要
- 中部：核心摘要卡片
- 主体：分栏目新闻
- 辅助：标签、来源、影响判断
- 结尾：观察/结论

#### PPT

- 封面：大标题 + 视觉主体
- 内容页：一个主观点 + 1-3 个支撑点
- 数据页：图表优先，文字解释靠后
- 结尾：一句结论或行动建议

#### 图片生成

- 主体：画面里最重要的人/物/场景
- 构图：主体位置、视角、镜头距离
- 光线：自然光、逆光、柔光、电影光
- 色彩：主色调和情绪
- 风格：摄影、插画、3D、海报、杂志封面等

---

### 3. 字体用于建立秩序，不是堆花样

字体学习重点：

- 少用字体，多用字号、字重、间距
- 正文优先可读
- 标题可以有气质，但不能牺牲识别
- 细字重在小字号下容易难读
- 字体层级要在字号变化后仍保持稳定

可执行规则：

- 标题：更大、更重、更有空间
- 副标题：比标题轻，比正文突出
- 正文：稳定、舒适、行距足够
- 注释：小但不能糊，颜色低调但可辨

---

### 4. 色彩要承担角色

一个配色方案至少要分清：

- 背景色：稳定、减少干扰
- 主文字色：最高可读性
- 次文字色：降低权重
- 强调色：只给真正重要的信息
- 状态色：成功/警告/错误/信息

注意：

- 强调色越多，越没有重点
- 红绿不能作为唯一状态区分
- 深色背景要特别注意文字对比
- 浅灰字不要过浅

---

### 5. 对齐和间距是“隐形设计感”

很多设计不好看，不是因为颜色差，而是因为：

- 边距乱
- 元素没有对齐
- 段距不统一
- 卡片内部太挤
- 标题和正文关系不清楚

可执行规则：

- 同类元素使用相同间距
- 卡片内部空间要大于文字行距
- 分组之间的距离要明显大于组内距离
- 不随意居中；大量文本优先左对齐

---

## 第一课内化成我的工作规则

以后做任何视觉输出时，我先判断：

1. 这次输出的核心信息是什么？
2. 哪些内容应该最先被看到？
3. 哪些内容只是辅助？
4. 版面应该是卡片、列表、图文、图表还是封面？
5. 字体层级是否够稳定？
6. 强调色是否只用在真正重要的位置？
7. 元素有没有统一对齐和间距？

---

## 下一课

主题：字体与中文排版

重点：
- 中文标题和正文的层级
- 中英文数字混排
- 字号、字重、行距、字距
- 飞书日报/PPT/海报中的字体选择


---

## 可查证参考页面（2026-05-12 补充）

### Apple Human Interface Guidelines

- Human Interface Guidelines 总入口  
  https://developer.apple.com/design/human-interface-guidelines
  - 参考点：Hierarchy、Harmony、Consistency，以及 Design fundamentals 中的 Color、Layout、Typography、Accessibility。

- Typography  
  https://developer.apple.com/design/human-interface-guidelines/typography
  - 参考点：字体用于可读性、信息层级、内容强调和品牌风格；减少字体数量；避免小字号使用过细字重。

- Accessibility  
  https://developer.apple.com/design/human-interface-guidelines/accessibility
  - 参考点：文字可读性、动态字体、颜色对比、不要只靠颜色表达信息、控件尺寸和间距。

### Material Design / Material 3

- Material 3 Color system overview  
  https://m3.material.io/styles/color/system/overview
  - 参考点：颜色系统、色彩角色、可访问性、主题色与界面角色。

- Material 3 Color roles  
  https://m3.material.io/styles/color/roles
  - 参考点：primary、secondary、tertiary、surface、error、on-color 等角色分工。

- Material 3 Typography overview  
  https://m3.material.io/styles/typography/overview
  - 参考点：字体系统用于阅读、美感和内容层级。

- Material 3 Type scale tokens  
  https://m3.material.io/styles/typography/type-scale-tokens
  - 参考点：display、headline、title、body、label 等字体角色。

- Material 3 Layout overview  
  https://m3.material.io/foundations/layout/overview
  - 参考点：布局、网格、空间、响应式结构。

- Android Developers: Material Design 3 in Compose  
  https://developer.android.com/develop/ui/compose/designsystems/material3
  - 参考点：Material 3 的色彩、字体 scale、组件和主题在实现层面的说明。

### Nielsen Norman Group

- Visual Design topic  
  https://www.nngroup.com/topic/visual-design/
  - 参考点：视觉设计相关研究、案例和视频集合。

- Good Visual Design, Explained  
  https://www.nngroup.com/articles/good-visual-design/
  - 参考点：网格、视觉层级、有意图的颜色、一致性。

- Visual Hierarchy video  
  https://www.nngroup.com/videos/visual-hierarchy/
  - 参考点：用颜色、大小、接近性、共同区域等引导用户注意力。

- Principles of Visual Design  
  https://www.nngroup.com/articles/principles-visual-design/
  - 参考点：scale、visual hierarchy、balance、contrast、Gestalt principles。

- 5 Visual-design Principles in UX PDF  
  https://media.nngroup.com/media/articles/attachments/Principles_Visual_Design-Letter.pdf
  - 参考点：比例、层级、平衡、对比、格式塔原则的简明规则。

### W3C / WCAG

- WCAG 2.2 最新推荐标准  
  https://www.w3.org/TR/WCAG22/
  - 参考点：可感知、可操作、可理解、稳健；颜色、对比度、文本缩放等要求。

- WCAG 2.2 Contrast Minimum / 1.4.3  
  https://www.w3.org/TR/WCAG22/#contrast-minimum
  - 参考点：普通文本 4.5:1，大文本 3:1。

- Understanding SC 1.4.11 Non-text Contrast  
  https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
  - 参考点：UI 组件和有意义图形至少 3:1 对比度。

### Figma Learn

- Figma Learn: Design systems  
  https://www.figma.com/learn/design-systems/
  - 参考点：颜色、字体、组件、样式、文档化、设计系统协作。

- Figma Learn: Typography  
  https://www.figma.com/learn/typography/
  - 参考点：字体选择、层级、阅读体验和版面表达。

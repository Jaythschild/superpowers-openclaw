![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/kJjlNiczXgKqtxXjjebqxprJ8nnFrPrXwbBXPv9CpC8VdRxhnrQVcUJQBOJGkjFnQHWJ1DBqTHPKITWT252T4op8krX8dekWibg2fqtqz0U3M/0?wx_fmt=jpeg)

阿里上线Qoder 1.0 ：Agent全自主开发重磅登场
=============================

Original

你说的完全正确
你说的完全正确

[AI寒武纪](javascript:void(0);)

![]()

在小说阅读器读本章

去阅读

![]()

在小说阅读器中沉浸阅读

![]()

↑阅读之前记得关注+星标⭐️，😄，每天才能第一时间接收到更新

 

我平时vibecoding用的还挺杂的，cc，codex， cursor，opencode都有在用，各家都有所长，个人还挺喜欢尝试新东西的，最近我有幸提前拿到了Qoder 1.0的内测资格，Qoder 1.0是大版本升级，对产品进行了重新定义，我很好奇升级后体验，就赶紧上手小测了一下，结果非常惊喜。

过去这一周，我做了一个大胆的决定：我把手头所有的vibecoding任务，全都强行切到了 Qoder 1.0 的内测版里去跑。

高强度用了一周后，我得出一个确切的结论：他们搞出一个真正的自主开发工作台。

废话不多说，我用本地的 vibecoding多项目文件夹，做了一次完整的探索，下面是我觉得值得展开说说的一些地方，仅供大家参考

### 视觉与交互：打开的瞬间就不一样

整体来说，Qoder 1.0 不再是一个传统意义上的 AI IDE，而是一个自主开发工作台。它由两个部分组成：

Editor（编辑器）：保留了你最熟悉的经典 IDE 编码体验。

Quest 全新视图：一个完全独立的、用来指挥 AI 团队的控制台。

打开Qoder 1.0，点击右上角的打开Quest，就会出现全新的独立的APP视图

![]()

当你一键从 Editor 切换到 Quest 全新视图时你能看到一个三栏式布局：

![]()

左边（导航与管理）：新建 Quest、不同 Workspace 切换、知识与 Agent 管理

中间（会话流）：这里做了非常克制的“强折叠”策略。不再把冗长的思考过程和废话糊在你脸上，只突出核心节点的进展。

右边（产物区）：Summary 交付清单、Changed Files 列表、Diff 视图，全在这里，任务跑完你直接来这里验收

我直接把我vibecoding里的最近两个项目扔进去试了一下，一个我的skill项目，一个是ICLR 2026可视化

![]()

我的要求很简单，一个是在我的现有的skill上增加一个个性化的ppt生成的skill。一个是用html可视化ICLR 2026，这个数据包，通过可视化可以一目了然的知道当今世界是那个国家，哪些高校在主导深度学习这个领域

只需要在quest页面左侧新建quest，中间对话栏下达要求，然后过程中只需要切换项目，点击许可执行，就等着交付了，你可以喝着咖啡Hands off查看项目进度就行了

![]()

结果交付非常震撼，全程不到10分钟两个项目就完成了，下面是全过程：

这套 UI 传达出的核心理念非常清晰：Quest On, Hands off（开启 Quest，放心放手）。我感觉我已经停不下来了，最近我要好好vibe一下😄。

### 专家团入住到了全新Quest

敢让你放手的前提，是交付质量必须靠谱。

一个 Agent 一条线串行跑，复杂任务扛不住，得手动救场。AI 编程工具能力是固定的，遇到特定业务场景不好用。写完代码质量全靠自己审。

Qoder 1.0 在这里给出的解法是：内置研发专家团（Experts）。开启很简单，下拉菜单选择Experts就行了

![]()

专家团模式支持多个 Agent 同时干活。Team Lead 拆任务、前后端研发工程师写代码、代码审查员做 Code Review、测试员跑 Verify 验证，流水线交付。你只需要说"做什么"，剩下的专家团自己分工搞定。

一个典型的多agent干活界面：

![]()

这里我是在用专家团对我的便签应用notes-app实现用户认证模块，只需要一句话，就不断会有不同的专家agent来帮我实现这个认证模块

便签没有用户认证模块之前的样子：

![]()

专家团帮我实现用户认证模块的样子：

![]()

实现过程：

整个过程Agent 自己做 Code Review、跑 Verify 验证、通过 Computer Use 操控环境确认效果。交给你的代码已经过了一轮内部质检，不是写完直接扔给你

**自定义业务专家**：Qoder 的专家团不是固定的 Agent 列表，而是一套可扩展的 AI 团队机制。你可以创建自己的专家 Agent，注入行业知识、团队规范和项目经验。每个自定义专家还能配置SKILL和MCP

刚才专家团帮我实现用户认证模块一共调用了7个专家agent，但我觉得还缺少一个「代码安全审查专家」，这时我就可以用Qoder的/create-subagent 创建一个自定义专家

![]()

创建好之后，我让代码安全专家立马审查了一下户认证模块

![]()

审查过程：

到这专家团我介绍的差不多了，我用下来的感觉就是基本上干活可以做到真正的放手了，交互非常丝滑

### 越用越懂你 ，Karpathy大神的LLM viki思想具象化了

前一段时间AK大神的LLM wiki思想风靡全网，我也写了好几篇文章介绍过，Qoder 1.0可以说把这个思想具象化了

你现在可以在知识中心一键生成项目的wiki，

![]()

从代码仓库和使用历史中自动构建三类工程知识：

架构知识：功能应该接入哪个模块、链路如何触发、状态如何流转，减少在复杂代码库里的盲目搜索

编码规范：接口设计、返回结构、错误码、日志、测试要求，让代码不只是"能运行"，而是符合团队交付标准

技术栈知识：语言版本、框架写法、项目技术路线，避免使用错误的语言特性或偏离既有技术选型，代码变了知识跟着变，越用越懂你的项目。

今天我也算是搞了好几个小项目了，现在可以一键生成wiki

![]()

这样以后就可以被Agent不断引用，做项目时就可以快速定位、减少试错、更稳定交付

知识中心除了wiki以外，还有**记忆功能**，打开自动生成按钮就可以了，记忆会在使用过程中逐步积累

据内部评测显示，架构知识增强后，任务完成度 +25%，Token 消耗 -30%；技术栈知识增强后，端到端评分 +25%，Token 消耗 -15%

### 写在最后

说说我真实的感受

我不是在说 Qoder 1.0 已经完美无缺，毕竟 1.0 刚出，有些地方还有打磨空间，具体用起来肯定也有各自的适配过程。

AI 编程工具的下一步不是更聪明的 AI，而是更好的工作方式，真正成为一个掌控者

这个方向，我认为是对的。

Quest On, Hands off。这句话我觉得不是在卖噱头，它说的是Agent时代一种真实的工作状态转变。

最后，必须聊聊大家最关心的门槛问题。

Qoder 作为国产工具，本身就支持原生中文、国内网络直连、支付宝一键支付。更硬核的是，如果你想低成本甚至零成本体验，他们给出了一个极其良心的方案：

社区版（完全免费） + 自带 API Key（BYOK）。

你只需要去注册一个国内主流大模型（比如百炼、DeepSeek，Kimi、智谱等）的 API Key，填入 Qoder 社区版，就能立刻白嫖使用上面提到的“Quest 全新独立视图”和“多 Agent 专家团”！

👉 传送门：

qoder.com/download

 

--end--

最后记得⭐️我，每天都在更新：如果觉得文章还不错的话可以点赞转发推荐评论

/...@作者：你说的完全正确（YAR师）

预览时标签不可点

![]()

Scan to Follow

继续滑动看下一个

轻触阅读原文

![](http://mmbiz.qpic.cn/sz_mmbiz_png/ICgnAptln0WgEPsE1yI4EGvAIaEmv6ZJDOiahDncTxHUhHUnxDurauB9oYkg9aovDGkiaklMJAHWlwb6M57y8mDA/0?wx_fmt=png)

AI寒武纪

向上滑动看下一个

[Got It](javascript:;)

![]()
Scan with Weixin to   
use this Mini Program

[Cancel](javascript:void(0);)
[Allow](javascript:void(0);)

[Cancel](javascript:void(0);)
[Allow](javascript:void(0);)

[Cancel](javascript:void(0);)
[Allow](javascript:void(0);)

×
分析

![跳转二维码]()

![作者头像](http://mmbiz.qpic.cn/sz_mmbiz_png/ICgnAptln0WgEPsE1yI4EGvAIaEmv6ZJDOiahDncTxHUhHUnxDurauB9oYkg9aovDGkiaklMJAHWlwb6M57y8mDA/0?wx_fmt=png)

微信扫一扫可打开此内容，  
使用完整服务

: 
，
，
，
，
，
，
，
，
，
，
，
，
.
 
Video
Mini Program
Like
，轻点两下取消赞
Wow
，轻点两下取消在看
Share
Comment
Favorite
听过
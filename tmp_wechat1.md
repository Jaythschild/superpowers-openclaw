Weixin Official Accounts Platform


![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/kHVuibicqZ5k5pmVsKkPjQxJZibVicsN1FZlKWXnkRFFicBOpC4v2jA4NEdKtSpEicfEbkxu8tBO17EvHTvibB4NDlibcceribfABGC7sBFxL4ibcd4kk/0?wx_fmt=jpeg)

Hermes v0.13.0 发布了Kanban和/goal： 说一句话，帮你组了个小团队
=============================================

Original

量子智元
量子智元

[量子智元](javascript:void(0);) 

*2026年5月10日 10:10*
*北京*

![]()

在小说阅读器读本章

去阅读

![]()

在小说阅读器中沉浸阅读

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/kHVuibicqZ5k5KfHVhn6MTg6FPrbbzr46nJ2kR1bIQicYUqUptf2rNk7LQIiaYLjkPibKUF1x6Bep3ZhmbqGdKqNYEMpBZ1v9pv1Ol9BSFRqFYUE/640?wx_fmt=jpeg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

有个朋友跟我说，他用 Hermes 改了一批脚本，但每次它修完一个 bug 就停下来，等他说"继续"，然后再修一个，又停。十几个 bug，他发了十几条"继续"。

这不是他用法的问题，也不是模型不够聪明。这是大多数 AI agent 的结构性局限：天生是一问一答的，完成一轮等你催。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/kHVuibicqZ5k4ehvxt5L4hywTBNMLbqNaD78KWZsDqic1Uk0BiajD51DUialc1E1d3hqgBQQ6qjXeWSPr4aQCnZcTp5lMDGBnREoBvCnxYU06UH0/640?wx_fmt=jpeg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

Hermes v0.13.0 里有两个功能，都在往这个方向使劲，但解决的不是同一个问题。一个叫 **/goal**，一个叫 **Durable Multi-Agent Kanban**。

搞清楚这两个的区别，比单独学任何一个都重要。

01 | /goal 是什么，它解决了什么
---------------------

/goal 是一个"持续目标机制"。你给 Hermes 设定一个目标之后，它不会像普通对话那样回答完就停，而是每轮结束后自动让一个轻量"判官"模型去评估：

> 目标完成了吗？
> 完成了 → 告诉你，停下来
> 没完成 → 自动续下一轮，不用你说"继续"

一直跑，直到达成目标、你主动暂停，或者触到默认的 20 轮上限。

判官的判断策略是偏保守的——只有当最后一轮的回复**明确确认目标已完成**，或者任务明显无法推进，它才会标 done。不确定就继续跑，不会因为 AI "以为自己做完了"就早停。如果判官出错（网络问题、返回格式异常），默认当 continue 处理——坏的判官不会让任务卡死，turn budget 才是最后的安全网。

### /goal 怎么用

最简单的用法，直接在 Hermes 聊天或交互式 CLI 里发：

|  |
| --- |
| /goal 修复 tests/hermes\_cli 目录下所有 failing tests，并确认 scripts/run\_tests.sh 通过 |

![Image](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

/goal 运行中的实际输出：自动推进多轮，直到所有测试绿灯

发完之后你会看到：

|  |
| --- |
| ⊙ Goal set (20-turn budget): 修复 tests/hermes\_cli 目录下所有 failing tests... Hermes: 开始扫描失败的测试... 💻 python -m pytest tests/hermes\_cli/ --tb=short   (3.2s) 找到 7 个失败，开始逐一修复 ↻ Continuing toward goal (1/20): 仍有 4 个测试未修复 ↻ Continuing toward goal (2/20): 还剩 1 个边缘 case ✓ Goal achieved: 所有测试通过，scripts/run\_tests.sh 绿灯 |

### /goal 的核心命令

几个常用命令，用起来像给当前 session 挂了一个"自动续航开关"：

|  |
| --- |
| # 设置目标（直接启动第一轮，不需要再单独发消息） /goal <你的目标描述> # 查看当前目标状态和已用轮次 /goal /goal status # 暂停自动推进（目标保留，不清除） /goal pause # 恢复推进（轮次计数重置为 0） /goal resume # 彻底放弃这个目标 /goal clear |

目标状态持久化存储在 SessionDB 里，关了笔记本明天回来，/goal resume 还是原来那个目标，不会丢。

还有一个细节：如果你在 /goal 运行期间发了一条普通消息，它会**立刻插队**优先处理，处理完之后判官再跑一次——如果那条消息恰好完成了目标，判官会捕捉到并停下来。

### /goal 最适合哪些场景

三类任务用起来最顺手：

**1. 修一批连续的错误**——比如 lint、test failures、类型报错。任务明确，有终态，让它自己跑到全绿。

**2. 把一个问题查到底**——比如"定位 session drift 的根因并写报告"。你不知道要查几步，让它自己判断。

**3. 迭代到可用为止**——比如"写一个小工具并验证能跑"。一轮写一轮测，循环到你满意。

共同点是：一个 agent，一件事，你**不想每轮都催**。

### /goal 不是独立的 shell 子命令

有一个容易混淆的地方：

|  |
| --- |
| # 正确：进入 Hermes 交互式会话后再发 $ hermes You: /goal 修复 tests/hermes\_cli 下所有 failing tests # 错误：这个命令不存在 $ hermes goal ... |

/goal 是会话内的 slash command，不是终端里的独立子命令。在 Telegram、Discord、Slack 等聊天入口里一样能直接发。**hermes kanban ...** 才是独立的 CLI 子命令，两者入口完全不同。

### 配置：调节最大轮次和判官模型

|  |
| --- |
| # ~/.hermes/config.yaml goals:  max\_turns: 20   # 默认 20，跑完自动暂停 # 判官模型默认用主模型。想省钱可以单独指定便宜快的： auxiliary:  goal\_judge:    provider: openrouter    model: google/gemini-3-flash-preview # 判官每轮只输出约 200 tokens，用便宜模型完全够 |

02 | Durable Multi-Agent Kanban 是什么
-----------------------------------

如果说 /goal 是"一个 agent 持续干活"，Kanban 就是另一个层级了。

它本质上是一个**持久化的多 agent 协作看板**。任务状态存在 SQLite 里，多个 profile 各自是独立 OS 进程，有自己的记忆和工具权限，通过 dispatcher 自动调度。

官方文档里的核心设计是：

> "Every task is a row in ~/.hermes/kanban.db; every handoff is a row anyone can read and write; every worker is a full OS process with its own identity."

worker 不是临时子进程跑完就消失，而是可以崩了 reclaim、卡住 block/unblock、被人随时介入的持久实体。

### 它和 delegate\_task 最大的区别

很多人熟悉的 delegate\_task 是 RPC 式的——主 agent 派出子 agent，等它返回，一次性的。

Kanban 是另一回事：任务状态机 + 持久消息队列 + 调度器。一个任务可以被不同角色在不同时间接力，可以中途 block 等人工介入，gateway 重启了任务还在。

### Kanban 怎么用

**第一步：初始化**

|  |
| --- |
| # 初始化看板（首次使用） hermes kanban init # 启动 gateway（dispatcher 默认跑在 gateway 里） hermes gateway start # 确认 dispatcher 在跑 hermes kanban list |

**第二步：创建任务**

|  |
| --- |
| # 创建一个任务，分配给 researcher 这个 profile hermes kanban create "整理 Hermes v0.13.0 release 亮点" --assignee researcher # 查看任务详情 hermes kanban show <task\_id> # 给任务加说明 hermes kanban comment <task\_id> "优先关注 Kanban 和 /goal 两个 feature" |

**第三步：建依赖关系（Kanban 真正有价值的地方）**

假设你要做一套内容流程：researcher 先研究，analyst 再提炼，writer 最后写稿。可以建成依赖链：

|  |
| --- |
| # 创建三个有依赖关系的任务 R1=$(hermes kanban create "研究 Hermes v0.13.0 release 原文" \    --assignee researcher --json | jq -r .task\_id) R2=$(hermes kanban create "提炼 5 个核心亮点" \    --assignee analyst --parent $R1 --json | jq -r .task\_id) hermes kanban create "写公众号初稿" \    --assignee writer --parent $R2 # writer 不会立刻开工 # 等 analyst 完成后自动进入 ready，dispatcher 再调度 |

![Image](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

hermes kanban list 的实际输出：状态、分工、依赖链一目了然

**第四步：任务卡住时**

|  |
| --- |
| # 手动 block 任务，注明原因 hermes kanban block t\_abcd "缺 release 原文链接，等 researcher 补" # 资料补齐之后 unblock，dispatcher 重新调度 hermes kanban unblock t\_abcd # 加一条评论说明情况 hermes kanban comment t\_abcd "链接已补，可以继续" |

**第五步：在聊天里也能操作**

如果你是在 Telegram / Discord 等聊天入口用 Hermes，常见的 Kanban 操作可以直接用 slash command，不用切到命令行：

|  |
| --- |
| /kanban list /kanban create "写 Hermes release 总结" --assignee writer /kanban show t\_abcd /kanban comment t\_abcd "优先关注 /goal 和 Kanban 的区别" /kanban block t\_abcd "缺 release 原文链接" /kanban unblock t\_abcd |

03 | assignee 里的 profile 是什么，怎么配置
---------------------------------

Kanban 任务里的 --assignee researcher，不是随便起的标签，而是一个真实存在的 Hermes profile 名。系统里没有这个 profile，任务创建了也没人认领，就一直躺在队列里不动。

### 第一步：创建 profile

|  |
| --- |
| # 创建三个供 Kanban 调度的 profile hermes profile create researcher hermes profile create analyst hermes profile create writer # 分别初始化（两种写法等价） hermes -p researcher setup hermes -p analyst setup hermes -p writer setup # 如果 alias 已生效，也可以直接： researcher setup analyst setup writer setup |

推荐用 **hermes -p ...** 的写法，不依赖 alias 有没有加载，更稳。

### 第二步：配置各 profile 的模型

|  |
| --- |
| # 给不同角色配不同的模型 hermes -p researcher config set model.default anthropic/claude-sonnet-4 hermes -p analyst    config set model.default anthropic/claude-sonnet-4 hermes -p writer     config set model.default openrouter/openai/gpt-5 # 给不同 profile 设不同工作目录 hermes -p researcher config set terminal.cwd /path/to/research-workspace hermes -p writer     config set terminal.cwd /path/to/content-workspace |

### 第三步：用 SOUL.md 把它们塑造成不同角色

光是名字不同还不够，真正让 researcher 和 writer 表现出不同风格的，是各自的 SOUL.md。

|  |
| --- |
| # 各 profile 的 SOUL.md 路径 ~/.hermes/profiles/researcher/SOUL.md ~/.hermes/profiles/analyst/SOUL.md ~/.hermes/profiles/writer/SOUL.md # researcher 的 SOUL.md 示例： 你是研究员，擅长搜集原始资料、核实事实、整理来源。 接到任务后优先找官方文档和 release notes，不依赖二手解读。 输出格式：要点列表 + 来源链接。 # writer 的 SOUL.md 示例： 你是内容创作者，擅长把技术内容写成普通用户能读懂的文章。 接到任务后从 analyst 的要点出发，加入场景和类比，不堆砌术语。 输出格式：微信公众号风格，约 1500-2000 字。 |

### 一个最小可用示例（完整流程）

|  |
| --- |
| # 1. 创建 profile hermes profile create researcher hermes profile create analyst hermes profile create writer # 2. 初始化各 profile hermes -p researcher setup hermes -p analyst    setup hermes -p writer     setup # 3. 写好各自的 SOUL.md，塑造角色 # ~/.hermes/profiles/researcher/SOUL.md # ~/.hermes/profiles/analyst/SOUL.md # ~/.hermes/profiles/writer/SOUL.md # 4. 初始化 Kanban 并启动 gateway hermes kanban init hermes gateway start # 5. 创建任务链 R1=$(hermes kanban create "研究 release 原文" \    --assignee researcher --json | jq -r .task\_id) R2=$(hermes kanban create "提炼亮点" \    --assignee analyst --parent $R1 --json | jq -r .task\_id) hermes kanban create "写公众号初稿" \    --assignee writer --parent $R2 # 6. 跟进状态 hermes kanban list hermes kanban show <task\_id> |

04 | 这两个功能，到底什么时候用哪个
--------------------

![Image](data:image/svg+xml,%3C%3Fxml%20version='1.0'%20encoding='UTF-8'%3F%3E%3Csvg%20width='1px'%20height='1px'%20viewBox='0%200%201%201'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一张图说清楚两者的本质区别

判断方法很简单，问自己一个问题：

> "这件事需要几个角色？"

如果**一个 agent 就够**，用 /goal。让它自己循环到完成，不用催。

如果需要**不同角色接力、有依赖、可能被人打断**，用 Kanban。

两者不互斥：Kanban 的 worker 在执行过程中，可以内部调用 delegate\_task 去做某个子任务。灵活组合。

### 如果刚开始用，先试 /goal

学习成本低，在当前会话里就能感受到价值。试一个你最近在反复催它"继续"的任务：

|  |
| --- |
| /goal 继续分析 Hermes v0.13.0 的 release， 整理出最值得关注的 5 个亮点， 写成一篇适合 Obsidian 的中文笔记 |

等你真正出现了"researcher 查完才能让 analyst 动、analyst 搞完才能让 writer 写"的多角色需求，再上 Kanban，价值一下子就明显了。

这两个加在一起，Hermes 开始往一个方向靠：能承接真实工作流，不只是做 demo。你现在有哪类任务是一直在催它继续的？评论区说说，看看能不能用 /goal 解掉。

⭐点赞、转发、关注和推荐一键三连⭐

预览时标签不可点

[Like the Author](javascript:;)

Hermes Agent 爱马仕 · 目录

#Hermes Agent 爱马仕

上一篇Hermes WebUI 网页版的Hermes，手机也能用下一篇Hermes 用久了，技能库乱了怎么办？Curator 能帮你解决

作者提示: 个人观点，仅供参考

Close

更多

搜索「」网络结果

Close

**调整当前正文文字大小**

更多

100%

​

Comment

暂无留言

1 comment(s)

已无更多数据

[Send Message](javascript:;)

写留言:

![]()

Scan to Follow

继续滑动看下一个

轻触阅读原文

![](http://mmbiz.qpic.cn/mmbiz_png/kHVuibicqZ5k4SnjuFHBDssYG0uJySkfdibvHPbJDickOibZF289QAAFSqbHPvpe4R4pC7ACSpMgicqkebicrem2uB9wPNE2VuQWNVMU2xSvNVbam0/0?wx_fmt=png)

量子智元

向上滑动看下一个

当前内容可能存在未经审核的第三方商业营销信息，请确认是否继续访问。

[继续访问](javascript:)[Cancel](javascript:)

[微信公众平台广告规范指引](javacript:;)

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

![作者头像](http://mmbiz.qpic.cn/mmbiz_png/kHVuibicqZ5k4SnjuFHBDssYG0uJySkfdibvHPbJDickOibZF289QAAFSqbHPvpe4R4pC7ACSpMgicqkebicrem2uB9wPNE2VuQWNVMU2xSvNVbam0/0?wx_fmt=png)

微信扫一扫可打开此内容，  
使用完整服务

![](https://mmbiz.qpic.cn/mmbiz_png/kHVuibicqZ5k4SnjuFHBDssYG0uJySkfdibvHPbJDickOibZF289QAAFSqbHPvpe4R4pC7ACSpMgicqkebicrem2uB9wPNE2VuQWNVMU2xSvNVbam0/300?wx_fmt=png&wxfrom=18)

量子智元

已关注

Like

Share

Popular

Comment

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


可在「公众号 > 右上角  > 划线」找到划线过的内容

![划线引导图](https://res.wx.qq.com/op_res/opqv3ix6k9E4e64ZzO7uIqE3ZblwIojfmt7u70m59yS1ylFK-hTu6Ra8V_LaWQJ1P4OlUJPdXLfVBtrm3TwRrw)

OK

,

,

选择留言身份

该账号因违规无法跳转

**Comment**

暂无留言

1 comment(s)

已无更多数据

[Send Message](javascript:;)

写留言:

Close

更多

Close

**Hermes Agent 爱马仕**

Details

更多

Loading...

关闭

确认提交投诉
------

你可以补充投诉原因（选填）

确定
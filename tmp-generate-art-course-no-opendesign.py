from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json
OUT = Path('images/art-design-course-no-opendesign-2026-05-19'); OUT.mkdir(parents=True, exist_ok=True)
MD = Path('learning/art-design-course-no-opendesign-2026-05-19.md')
W,H=1280,720
FONT_REG=Path(r'C:\Windows\Fonts\msyh.ttc'); FONT_BOLD=Path(r'C:\Windows\Fonts\msyhbd.ttc')
def font(s,b=False): return ImageFont.truetype(str(FONT_BOLD if b and FONT_BOLD.exists() else FONT_REG), s)
COL={'bg':(246,248,250),'ink':(24,31,38),'muted':(92,108,122),'line':(206,216,225),'blue':(48,112,190),'green':(50,150,114),'amber':(202,132,48),'red':(190,74,72),'panel':(255,255,255)}
lessons=[
{'title':'第一课｜设计基础：先解决信息秩序','goal':'理解设计不是装饰，而是组织信息。一个页面首先要让读者知道先看哪里、重点是什么、下一步做什么。','core':['设计的第一任务是降低理解成本。','页面只能有一个最强视觉中心。','重要信息靠位置、大小、对比和留白共同建立。','所有装饰都要服从信息表达。'],'method':'把内容拆成主判断、关键证据、补充信息三层。主判断放在最强位置，证据用图卡承接，补充信息降权处理。','case':'一页日报首页如果只堆新闻标题，读者会先寻找线索。改成“今日主线 + 三条证据 + 下一步关注”，页面就有了阅读方向。','practice':'拿一篇 AI 日报首页，把新闻列表改成“今日主线 + 三条证据 + 下一步关注”。','check':'遮住正文，只看标题、图和位置，是否还能知道这一页讲什么？如果不能，信息秩序还没建立。'},
{'title':'第二课｜美学判断：高级感来自克制和一致','goal':'建立基础审美判断，知道什么时候该克制，什么时候该强调，什么时候该删掉多余元素。','core':['高级感通常来自少量高质量元素，而不是堆满效果。','统一比花样更重要。','留白不是空，是让重点有呼吸。','材质、阴影、线条、发光都必须少用，并且服务内容。'],'method':'为整篇文档选择一个视觉母版，固定背景、标题、卡片、图像和强调色。不要每一节换一套风格。','case':'黑底、蓝光、强渐变同时出现时，页面容易吵。降低饱和度、减少光效、保留一个强调色，重点会更稳。','practice':'把一页黑底蓝光科技风页面改成低饱和背景、清晰网格、少量强调色和更稳的文字层级。','check':'把页面缩小到 50% 后，是否仍然清楚、稳定、不吵？如果缩小后只剩光效和噪声，审美判断需要重做。'},
{'title':'第三课｜排版：让中文长文有节奏','goal':'掌握中文知识库和教程文档的排版方法，让长文能被快速扫读，而不是变成一整块灰色文字。','core':['标题写判断，不写空泛栏目名。','每段只讲一个信息点。','连续正文不要太长，要用小标题、列表、图卡分节奏。','注释、来源和限制要保留，但视觉权重降低。'],'method':'每节课固定为学习目标、核心知识、美化方法、案例、练习、检查。读者每次进入新章节都知道怎么读。','case':'500 字学习记录先压成一句主判断，再拆出三条证据和一个练习，阅读压力会明显下降。','practice':'把 500 字学习记录改成：一句主判断、三条证据、一个练习、一个交付检查。','check':'手机宽度下是否有超过 6 行连续正文？如果有，就拆成判断、证据、方法或检查。'},
{'title':'第四课｜色彩：颜色必须承担角色','goal':'建立色彩系统，不再凭感觉随意换颜色。颜色要帮助读者理解信息关系。','core':['主色决定情绪和品牌气质。','辅助色区分内容模块。','状态色只用于风险、完成、警告等明确状态。','同类信息要稳定使用同类颜色。','中文文档里高饱和色要谨慎，避免抢正文注意力。'],'method':'固定色彩职责：深墨色给主判断，蓝色给证据和路径，绿色给行动，琥珀色给风险，灰色给来源和说明。','case':'同一篇日报里，机会、风险、产品、资本、技术如果都用亮色，读者无法判断信息关系。颜色先分职责，再做美化。','practice':'给一篇日报设计颜色职责表：机会、风险、产品、资本、技术、下一步分别用什么视觉语言表示。','check':'遮住文字，只看颜色和位置，是否能分辨结论、证据、风险、行动？不能就说明颜色没有承担角色。'},
{'title':'第五课｜字体：字体决定语气和层级','goal':'理解字体不是随便选一个好看的字形，而是在控制内容语气、阅读速度和专业感。','core':['标题字体要有力量，但不能牺牲识别性。','正文字体优先清晰稳定。','中文排版靠字号、字重、行距和段距建立层级。','一份文档通常只需要 2-3 种字重，不需要复杂字体组合。','字体风格必须匹配内容：教程要清楚，报告要专业，海报可以更有表现力。'],'method':'固定四档字体层级：封面标题、章节标题、正文、注释。每档只改字号和字重，不临时乱加描边、阴影和特殊效果。','case':'如果标题、标签、正文、注释都加粗，页面会失去重点。减少字重后，层级反而更清楚。','practice':'把一页所有文字统一成四档层级，并删除多余字重。观察页面是否更稳。','check':'快速扫一眼，是否能分出标题、重点、正文和注释？如果所有字都像重点，字体层级失败。'},
{'title':'第六课｜构图：用位置引导视线','goal':'掌握基础构图方法，让图文内容形成明确观看路径。','core':['构图决定读者先看哪里。','左右结构适合对比和解释。','上下结构适合先结论后证据。','三段结构适合流程、步骤和判断路径。','图像、标题、正文之间要有方向关系，不能各站各的。'],'method':'教程图固定三种构图：对比图、流程图、结构图。每张图只承担一种教学任务，不混合太多元素。','case':'改前改后的排版案例适合左右对比，步骤教学适合横向流程，层级说明适合金字塔或分层结构。','practice':'把“改前 vs 改后”的排版案例做成左右对比图，左边放问题，右边放重构后的阅读路径。','check':'只看布局，不看文字，视线是否自然从主结论走到证据再到行动？如果视线乱跳，构图需要调整。'},
{'title':'第七课｜图文案例：每个知识点都要可视化','goal':'让图片承担教学功能。每个知识点至少配一种可解释的图，而不是放氛围图。','core':['对比图适合讲改版。','流程图适合讲步骤。','结构图适合讲层级。','检查图适合讲验收。','图中文字要少，但结论必须明确。'],'method':'每个小节都配一张图卡。图卡标题直接写结论，图内只保留关键结构和少量标注，风格统一。','case':'讲色彩系统时，用颜色职责图；讲排版时，用灰文块到分段结构的对比；讲验收时，用检查清单图。','practice':'为“色彩系统”做一张颜色职责图：主判断、证据、行动、风险、来源分别放在固定位置。','check':'只看图，不看正文，能否说出这节课的核心？不能的话，图只是装饰。'},
{'title':'第八课｜交付检查：好看必须能被验证','goal':'把审美要求转成可检查动作，避免只凭感觉说“已经美化”。','core':['内容检查：标题是否贴合文档主题。','结构检查：章节是否完整，有没有练习和检查。','视觉检查：图片是否统一，是否解释内容。','技术检查：飞书图片 token 是否非空，是否存在空块。','残留检查：旧标题、测试块、错误主题是否清理干净。'],'method':'生成后读取飞书全文和 blocks，检查图片数量、空图片块、旧版关键词、章节完整度，把结果写入交付说明。','case':'如果文档说已经美化，但没有图片数量、残留关键词、章节完整度和空块检查，就不能算完成。','practice':'为本课程建立交付清单：主题是否正确、章节是否对应标题、图片是否解释课程内容、是否有旧内容残留。','check':'如果没有验收结果，就不能说完成。'}]
parts=[('课程总目标｜把审美训练变成可练习的方法','这门课不是讲某个工具的理念，而是训练纳斯在真实输出中做出更好的视觉判断：页面是否有秩序，颜色是否有职责，字体是否适合内容，构图是否引导视线，图文是否一起表达同一个重点。'),('学完要能做到','能判断页面秩序、排版节奏、颜色职责、字体层级、构图路径和图文解释力，并在交付前完成质量检查。')]
def sz(d,t,f):
    b=d.textbbox((0,0),t,font=f); return b[2]-b[0],b[3]-b[1]
def wrap(d,t,f,m):
    lines=[]; buf=''
    for ch in t:
        if sz(d,buf+ch,f)[0]<=m: buf+=ch
        else:
            if buf: lines.append(buf)
            buf=ch
    if buf: lines.append(buf)
    return lines
def dt(d,x,y,t,f,fill,m,g=8):
    for line in wrap(d,t,f,m):
        d.text((x,y),line,font=f,fill=fill); y+=sz(d,line,f)[1]+g
    return y
def panel(d,xy,fill=COL['panel'],outline=COL['line'],r=24): d.rounded_rectangle(xy,r,fill=fill,outline=outline,width=2)
def make(name,title,body,kind,idx):
    img=Image.new('RGB',(W,H),COL['bg']); d=ImageDraw.Draw(img)
    d.rectangle((0,0,W,92),fill=(232,238,244)); d.text((54,30),'艺术设计教程',font=font(26,True),fill=COL['blue'])
    d.text((54,128),title,font=font(40,True),fill=COL['ink']); dt(d,58,192,body,font(25),COL['muted'],540,10)
    panel(d,(660,132,1218,610))
    if kind=='goal':
        for i,(txt,col) in enumerate([('问题',COL['red']),('目标',COL['blue']),('结果',COL['green'])]):
            x=720+i*165; panel(d,(x,270,x+130,420),fill=(248,250,252),outline=col,r=22); d.text((x+36,322),txt,font=font(28,True),fill=col)
            if i<2: d.line((x+134,345,x+160,345),fill=COL['line'],width=4)
    elif kind=='core':
        for i in range(4):
            y=210+i*82; d.rounded_rectangle((725,y,1155,y+52),14,fill=(240,245,249),outline=COL['line'],width=1); d.text((750,y+11),f'{i+1}',font=font(24,True),fill=COL['blue']); d.line((795,y+26,1125,y+26),fill=[COL['blue'],COL['green'],COL['amber'],COL['red']][i],width=5)
    elif kind=='method':
        for i,col in enumerate([COL['blue'],COL['green'],COL['amber']]):
            d.ellipse((760+i*140,250,855+i*140,345),fill=col); d.text((790+i*140,280),str(i+1),font=font(28,True),fill='white')
            if i<2: d.line((858+i*140,298,895+i*140,298),fill=COL['line'],width=5)
        d.rounded_rectangle((760,420,1125,480),18,fill=(240,245,249),outline=COL['line'],width=1); d.text((815,433),'方法必须服务理解',font=font(28,True),fill=COL['ink'])
    elif kind=='case':
        panel(d,(720,220,920,500),fill=(254,242,242),outline=COL['red'],r=18); panel(d,(970,220,1170,500),fill=(238,248,244),outline=COL['green'],r=18); d.text((765,246),'改前',font=font(28,True),fill=COL['red']); d.text((1015,246),'改后',font=font(28,True),fill=COL['green'])
        for y in [310,350,390,430]: d.line((750,y,890,y),fill=(210,120,120),width=5)
        for y,w in [(315,130),(365,160),(415,100)]: d.line((1000,y,1000+w,y),fill=COL['green'],width=8)
    elif kind=='practice':
        for i,col in enumerate([COL['blue'],COL['green'],COL['amber']]):
            y=245+i*90; d.rounded_rectangle((750,y,1130,y+60),18,fill=(248,250,252),outline=col,width=3); d.text((780,y+15),f'练习 {i+1}',font=font(24,True),fill=col)
    else:
        for i,col in enumerate([COL['green'],COL['green'],COL['amber'],COL['red']]):
            y=220+i*72; d.rectangle((760,y,805,y+45),fill=(238,248,244) if i<2 else (255,248,235)); d.line((770,y+24,784,y+38),fill=col,width=5); d.line((784,y+38,798,y+12),fill=col,width=5); d.line((830,y+24,1120,y+24),fill=COL['line'],width=5)
    d.text((1080,645),f'{idx:02d}',font=font(30,True),fill=(180,190,198)); p=OUT/name; img.save(p,quality=94); return p
records=[]
def rec(h,b,k):
    name=f'{len(records)+1:02d}-{k}.png'; p=make(name,h,b,k,len(records)+1); records.append({'heading':h,'file':name,'path':str(p).replace('\\','/')})
for h,b in parts: rec(h,b,'goal' if len(records)==0 else 'core')
for l in lessons:
    for key,label,kind in [('goal','学习目标','goal'),('core','核心知识','core'),('method','美化方法','method'),('case','案例','case'),('practice','练习','practice'),('check','检查','check')]:
        v=l[key]; rec(f"{l['title']}｜{label}",'；'.join(v) if isinstance(v,list) else v,kind)
lines=['# 设计、美学、排版、色彩、字体｜艺术设计教程','','这份文档只围绕标题本身展开：设计、美学、排版、色彩、字体。课程目标是把抽象审美变成可学习、可练习、可检查的视觉能力。','']
for h,b in parts: lines += [f'## {h}','',b,'']
for l in lessons:
    lines += [f"## {l['title']}",'']
    for key,label in [('goal','学习目标'),('core','核心知识'),('method','美化方法'),('case','案例'),('practice','练习'),('check','检查')]:
        lines += [f'### {label}','']; v=l[key]
        if isinstance(v,list): lines += [f'- {x}' for x in v]+['']
        else: lines += [v,'']
lines += ['## 后续使用规则','','新增内容必须归入设计、美学、排版、色彩、字体、构图、图文案例或交付检查中的某一类。不能把工具介绍、项目理念或临时报告当成课程主题。','','每个小节都必须配图。配图要解释该小节，而不是只做氛围装饰。','','## 本版参考与来源','','- Apple Human Interface Guidelines：https://developer.apple.com/design/human-interface-guidelines','- Material Design 3：https://m3.material.io/','- IBM Carbon Design System：https://carbondesignsystem.com/','- Datawrapper Blog：https://www.datawrapper.de/blog','- WCAG 2.2：https://www.w3.org/TR/WCAG22/','','## 本版验收清单','','- 文档主题是否只围绕设计、美学、排版、色彩、字体？','- 是否完全没有工具名或外部项目名残留？','- 每个小节是否都有配图辅助理解？','- 图片是否服务课程内容？','- 写入飞书后是否检查图片、空块、旧内容残留和主题偏差？']
MD.write_text('\n'.join(lines),encoding='utf-8'); (OUT/'manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'markdown':str(MD),'image_dir':str(OUT),'image_count':len(records)},ensure_ascii=False))

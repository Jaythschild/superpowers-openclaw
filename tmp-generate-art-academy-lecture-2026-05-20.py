from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import json, random
random.seed(5202212)
OUT = Path('images/art-academy-lecture-2026-05-20-2212')
OUT.mkdir(parents=True, exist_ok=True)
MD = Path('learning/art-academy-lecture-2026-05-20.md')
W,H = 1400,620
FONT_REG=Path(r'C:\Windows\Fonts\msyh.ttc'); FONT_BOLD=Path(r'C:\Windows\Fonts\msyhbd.ttc')
def font(s,b=False): return ImageFont.truetype(str(FONT_BOLD if b and FONT_BOLD.exists() else FONT_REG), s)
INK=(34,32,29); MUTED=(104,96,86); PAPER=(244,237,223); LINE=(184,171,150); RED=(168,67,55); BLUE=(56,94,146); GREEN=(70,123,92); AMBER=(189,132,57); CHARCOAL=(58,56,52)
lessons=[
('第一课｜设计基础：先解决信息秩序','设计不是装饰，是组织注意力。先确定主判断，再安排证据和补充信息。'),
('第二课｜美学判断：高级感来自克制和一致','高级感来自删减、留白、统一和少量准确的强调。'),
('第三课｜排版：让中文长文有节奏','中文排版靠段落、行距、标题和留白建立阅读呼吸。'),
('第四课｜色彩：颜色必须承担角色','颜色不是情绪装饰，而是信息角色：结论、证据、行动、风险。'),
('第五课｜字体：字体决定语气和层级','字体控制语气、速度和专业感；少字体，多层级。'),
('第六课｜构图：用位置引导视线','构图决定观看路径，让视线从结论走到证据再到行动。'),
('第七课｜图文案例：每个知识点都要可视化','图要解释知识点，不做空氛围。对比、流程、结构、检查各有用途。'),
('第八课｜交付检查：好看必须能被验证','验收要有证据：主题、章节、图片、空块、旧内容残留都要检查。')]
sections=[('学习目标','这张讲义要回答：为什么要学、学完能做什么、如何判断做对了。','goal'),('核心知识','把知识点拆成 3-4 个可被记住的判断，像老师在课堂边讲边画。','core'),('美化方法','把抽象审美落到纸面：网格、标注、色票、字体样张和构图线。','method'),('案例','用改前与改后的对照，让问题和修正一眼能看出来。','case'),('练习','给读者一个可以立刻做的小任务，训练视觉判断。','practice'),('检查','把“好看”变成能勾选的标准，避免凭感觉交付。','check')]
def text_size(d,t,f):
    b=d.textbbox((0,0),t,font=f); return b[2]-b[0], b[3]-b[1]
def wrap(d,t,f,m):
    lines=[]; buf=''
    for ch in t:
        if text_size(d,buf+ch,f)[0] <= m: buf += ch
        else:
            if buf: lines.append(buf)
            buf = ch
    if buf: lines.append(buf)
    return lines
def draw_wrapped(d,x,y,t,f,fill,m,g=8):
    for line in wrap(d,t,f,m):
        d.text((x,y),line,font=f,fill=fill); y += text_size(d,line,f)[1]+g
    return y
def paper():
    img=Image.new('RGB',(W,H),PAPER); px=img.load()
    for y in range(H):
        for x in range(W):
            n=random.randint(-8,8); r,g,b=PAPER; px[x,y]=(max(0,min(255,r+n)),max(0,min(255,g+n)),max(0,min(255,b+n)))
    return img.filter(ImageFilter.GaussianBlur(0.25))
def rough_line(d,xy,fill=LINE,width=2,jitter=2,repeats=2):
    x1,y1,x2,y2=xy
    for _ in range(repeats): d.line((x1+random.randint(-jitter,jitter),y1+random.randint(-jitter,jitter),x2+random.randint(-jitter,jitter),y2+random.randint(-jitter,jitter)),fill=fill,width=width)
def rough_rect(d,xy,outline=LINE,width=2):
    x1,y1,x2,y2=xy; rough_line(d,(x1,y1,x2,y1),outline,width); rough_line(d,(x2,y1,x2,y2),outline,width); rough_line(d,(x2,y2,x1,y2),outline,width); rough_line(d,(x1,y2,x1,y1),outline,width)
def swatch(d,x,y,color,label):
    d.rectangle((x,y,x+72,y+44),fill=color,outline=CHARCOAL,width=1); d.text((x,y+52),label,font=font(16),fill=MUTED)
def art_marks(d,kind):
    for x in range(72,W-60,58):
        if x%116==0: rough_line(d,(x,92,x,H-52),fill=(220,210,191),width=1,repeats=1)
    for y in range(110,H-40,54): rough_line(d,(64,y,W-70,y),fill=(224,215,198),width=1,repeats=1)
    rough_line(d,(106,72,106,H-50),fill=(211,128,116),width=1,repeats=1)
    d.text((86,36),'ART SCHOOL NOTES',font=font(18,True),fill=(125,113,99)); d.text((1160,36),'composition / color / type',font=font(16),fill=(130,118,103))
    if kind in ('goal','core'):
        for i,col in enumerate([BLUE,AMBER,GREEN]): swatch(d,990+i*92,506,col,['秩序','强调','行动'][i])
    if kind in ('method','case','practice','check'):
        for i in range(5): rough_line(d,(910,165+i*52,1260,120+i*60),fill=(70,70,64),width=1,repeats=1)
def diagram(d,kind,ox,oy):
    if kind=='goal':
        rough_rect(d,(ox,oy,ox+430,oy+270),BLUE,3); d.ellipse((ox+170,oy+72,ox+270,oy+172),outline=RED,width=4); rough_line(d,(ox+20,oy+220,ox+400,oy+58),fill=CHARCOAL,width=2); d.text((ox+90,oy+190),'先确定主视线',font=font(26,True),fill=INK)
    elif kind=='core':
        for i,col in enumerate([BLUE,GREEN,AMBER,RED]):
            y=oy+i*60; rough_rect(d,(ox,y,ox+430,y+42),col,2); d.text((ox+18,y+7),f'{i+1}. 只保留一个判断',font=font(20,True),fill=INK)
    elif kind=='method':
        for i,label in enumerate(['草图','网格','批注','修正']):
            x=ox+i*112; d.rounded_rectangle((x,oy+84,x+84,oy+168),14,outline=[BLUE,GREEN,AMBER,RED][i],width=4); d.text((x+8,oy+188),label,font=font(21,True),fill=INK)
            if i<3: rough_line(d,(x+88,oy+126,x+110,oy+126),fill=CHARCOAL,width=2)
    elif kind=='case':
        rough_rect(d,(ox,oy,ox+198,oy+260),RED,3); rough_rect(d,(ox+250,oy,ox+448,oy+260),GREEN,3); d.text((ox+58,oy+18),'改前',font=font(24,True),fill=RED); d.text((ox+308,oy+18),'改后',font=font(24,True),fill=GREEN)
        for j in range(5): rough_line(d,(ox+28,oy+70+j*30,ox+170,oy+70+j*30),fill=(122,109,98),width=3)
        rough_line(d,(ox+278,oy+90,ox+418,oy+90),fill=BLUE,width=6); rough_line(d,(ox+278,oy+145,ox+390,oy+145),fill=GREEN,width=5); rough_line(d,(ox+278,oy+198,ox+354,oy+198),fill=AMBER,width=5)
    elif kind=='practice':
        for i in range(3):
            y=oy+30+i*78; d.rectangle((ox,y,ox+34,y+34),outline=CHARCOAL,width=3); rough_line(d,(ox+54,y+17,ox+410,y+17),fill=[BLUE,GREEN,AMBER][i],width=5)
        d.text((ox+22,oy+265),'课堂练习 / 10 min',font=font(24,True),fill=RED)
    else:
        for i,col in enumerate([GREEN,GREEN,AMBER,RED]):
            y=oy+36+i*58; d.rectangle((ox,y,ox+38,y+38),outline=col,width=3); rough_line(d,(ox+8,y+22,ox+18,y+32),fill=col,width=4); rough_line(d,(ox+18,y+32,ox+32,y+8),fill=col,width=4); rough_line(d,(ox+58,y+20,ox+405,y+20),fill=LINE,width=4)
def make_image(no,heading,body,kind):
    img=paper(); d=ImageDraw.Draw(img); art_marks(d,kind)
    d.text((138,86),heading,font=font(37,True),fill=INK); d.line((138,140,830,140),fill=RED,width=3)
    d.text((138,176),'课堂批注',font=font(20,True),fill=RED); draw_wrapped(d,138,210,body,font(27),MUTED,620,11)
    d.text((138,455),'观察：先看结构，再看风格；先定判断，再做装饰。',font=font(22,True),fill=BLUE)
    rough_rect(d,(870,130,1304,465),outline=(128,117,101),width=2); diagram(d,kind,898,164)
    d.text((930,486),'边注：图像必须服务课程概念',font=font(22,True),fill=RED); d.text((1210,552),f'{no:02d}',font=font(34,True),fill=(142,130,112))
    p=OUT/f'{no:02d}-art-academy-{kind}.png'; img.save(p,quality=95); return p
records=[]
intro=[('课程总目标｜把审美训练变成可练习的方法','这份讲义用纸张、草图、批注和案例拆解，把设计、美学、排版、色彩、字体变成能练习的能力。','goal'),('风格规则｜艺术学院讲义感','统一使用纸张肌理、手写批注、构图框线、色彩样本、字体样张、版式网格和作品拆解边注。','core')]
def add(heading,body,kind):
    no=len(records)+1; p=make_image(no,heading,body,kind); records.append({'heading':heading,'file':p.name,'path':p.name,'kind':kind})
for item in intro: add(*item)
for lesson_title, lesson_summary in lessons:
    for label, body, kind in sections: add(f'{lesson_title}｜{label}', f'{lesson_summary} {body}', kind)
md=['# 设计、美学、排版、色彩、字体｜艺术学院讲义版','','这份文档只用于艺术、美学、排版、色彩、字体学习。视觉风格统一为“艺术学院讲义感”：纸张肌理、手写批注、铅笔/炭笔/马克笔草图、构图框线、色彩样本、字体样张、版式网格、作品拆解边注。','','明确不使用 AI 日报的信息蓝图风，不使用深蓝科技屏、节点网络、地球、泛 AI 氛围、廉价霓虹、PPT 模板或大段伪文字。','']
for h,b,_ in intro: md += [f'## {h}','',b,'']
for title,summary in lessons:
    md += [f'## {title}','',summary,'']
    for label,body,_ in sections: md += [f'### {label}','',body,'']
md += ['## 后续使用规则','','- 新增内容必须归入设计、美学、排版、色彩、字体、构图、图文案例或交付检查中的某一类。','- 每张图必须解释课程概念，不能只做氛围装饰。','- 艺术美学文档只用艺术学院讲义感；AI 日报才使用 OpenDesign 信息蓝图风。','','## 本版验收清单','','- 文档主题是否只围绕设计、美学、排版、色彩、字体？','- 是否清理 AI 科技风、信息蓝图风、节点网络、地球等旧方向？','- 图片是否全部来自本次新批次？','- 飞书图片块是否非空？','- 是否读回检查旧图名和旧关键词残留？']
MD.write_text('\n'.join(md),encoding='utf-8'); (OUT/'manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'imageDir':str(OUT),'manifest':str(OUT/'manifest.json'),'markdown':str(MD),'count':len(records)},ensure_ascii=False))

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import math, textwrap, json

out = Path('images/opendesign-visual-course-v4-2026-05-19')
out.mkdir(parents=True, exist_ok=True)

W,H = 1536, 1024
font_reg = r'C:\Windows\Fonts\NotoSansSC-VF.ttf'
font_bold = r'C:\Windows\Fonts\msyhbd.ttc'
if not Path(font_reg).exists():
    font_reg = r'C:\Windows\Fonts\msyh.ttc'

def f(size, bold=False):
    return ImageFont.truetype(font_bold if bold and Path(font_bold).exists() else font_reg, size)

COL = {
    'bg0': (8, 14, 24),
    'bg1': (12, 24, 42),
    'panel': (20, 35, 56, 218),
    'panel2': (28, 48, 74, 200),
    'line': (80, 154, 210, 95),
    'cyan': (92, 220, 255),
    'blue': (72, 145, 255),
    'green': (88, 232, 176),
    'amber': (255, 186, 93),
    'red': (255, 104, 115),
    'white': (238, 246, 255),
    'muted': (152, 174, 199),
    'dim': (88, 112, 140),
}

def rounded(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)

def gradient_bg():
    img = Image.new('RGB', (W,H), COL['bg0'])
    px = img.load()
    for y in range(H):
        for x in range(W):
            t = (x/W*0.62 + y/H*0.38)
            glow1 = max(0, 1 - ((x-1180)**2/(760**2) + (y-180)**2/(500**2)))
            glow2 = max(0, 1 - ((x-180)**2/(520**2) + (y-850)**2/(420**2)))
            r = int(8 + 12*t + 15*glow1 + 3*glow2)
            g = int(14 + 22*t + 40*glow1 + 25*glow2)
            b = int(24 + 40*t + 76*glow1 + 62*glow2)
            px[x,y] = (min(r,55), min(g,95), min(b,145))
    return img.convert('RGBA')

def draw_grid(draw):
    for x in range(80, W, 80):
        a = 24 if x % 240 else 44
        draw.line((x, 0, x, H), fill=(80,154,210,a), width=1)
    for y in range(64, H, 64):
        a = 22 if y % 192 else 42
        draw.line((0, y, W, y), fill=(80,154,210,a), width=1)

def text_wrap(draw, text, font, max_width):
    lines=[]
    for para in text.split('\n'):
        if not para:
            lines.append('')
            continue
        buf=''
        for ch in para:
            test=buf+ch
            if draw.textbbox((0,0), test, font=font)[2] <= max_width:
                buf=test
            else:
                if buf: lines.append(buf)
                buf=ch
        if buf: lines.append(buf)
    return lines

def draw_text_block(draw, xy, text, font, fill, max_width, line_gap=12):
    x,y = xy
    for line in text_wrap(draw, text, font, max_width):
        draw.text((x,y), line, font=font, fill=fill)
        bbox=draw.textbbox((x,y), line or ' ', font=font)
        y += (bbox[3]-bbox[1]) + line_gap
    return y

def chip(draw, x, y, text, color):
    font=f(24, True)
    pad=18
    bbox=draw.textbbox((0,0), text, font=font)
    w=bbox[2]-bbox[0]+pad*2
    rounded(draw, (x,y,x+w,y+46), 23, (*color, 34), (*color, 180), 1)
    draw.text((x+pad, y+8), text, font=font, fill=color)
    return w

def base(title, subtitle, section):
    img=gradient_bg()
    draw=ImageDraw.Draw(img, 'RGBA')
    draw_grid(draw)
    # ambient lines
    for i in range(18):
        x0=70+i*86
        y0=790+int(math.sin(i)*38)
        draw.line((x0,y0,x0+180,y0-90), fill=(92,220,255,30), width=2)
    draw.text((72,58), section.upper(), font=f(22, True), fill=COL['green'])
    draw.text((72,94), title, font=f(58, True), fill=COL['white'])
    draw_text_block(draw, (74,176), subtitle, f(28), COL['muted'], 720, 10)
    return img, draw

def save(img, name):
    img = img.convert('RGB')
    img.save(out/name, quality=96)
    return str(out/name)

items = []

# cover
img,draw=base('OpenDesign 视觉课程 v4', '用同一套内容设计、风格系统和质检流程，把教程、日报、图文报告做成可读、好看、可复用的作品。', 'course system')
rounded(draw,(780,120,1458,840),34,COL['panel'],COL['line'],2)
for i,(lab,val,c) in enumerate([
    ('内容目标','先确定读者要学会什么',COL['cyan']),
    ('风格母版','Data Drift + Swiss Pulse',COL['blue']),
    ('案例配图','每个知识点一图一例',COL['green']),
    ('生成检查','结构、审美、教学、飞书',COL['amber']),
]):
    y=178+i*146
    rounded(draw,(830,y,1395,y+96),24,(16,31,52,230),(*c,150),1)
    draw.text((858,y+18),lab,font=f(28,True),fill=c)
    draw.text((858,y+54),val,font=f(25),fill=COL['white'])
draw.line((426,690,824,292),fill=(*COL['cyan'],130),width=3)
draw.line((426,690,824,438),fill=(*COL['blue'],90),width=2)
draw.line((426,690,824,584),fill=(*COL['green'],90),width=2)
rounded(draw,(72,650,524,846),28,(13,26,44,225),COL['line'],1)
draw.text((106,688),'不是补丁式追加',font=f(32,True),fill=COL['white'])
draw_text_block(draw,(108,742),'而是先完成课程设计，再生成文档、教程和日报。',f(27),COL['muted'],360,10)
items.append(save(img,'00-cover-opendesign-course-v4.png'))

# lesson cards
lessons = [
('01','视觉层级','先给观看顺序','读者第一眼必须知道看哪里。主结论最大、证据次之、来源降权。','主结论','关键证据','来源限制','把 AI 日报首页从“新闻列表”改成“今日主线 + 三条证据”。',COL['cyan']),
('02','中文排版','长文要有呼吸','中文教程不怕长，怕整块灰。标题、摘要、短段、注释要分层。','判断标题','三行摘要','短句正文','把一段 500 字学习记录压成 1 个判断、3 条证据、1 个练习。',COL['blue']),
('03','色彩系统','颜色承担角色','色彩不是装饰。蓝色给路径，绿色给行动，琥珀给风险，白色给结论。','结论色','路径色','行动色','日报里所有“机会”用蓝色路径，“风险”只用少量琥珀提醒。',COL['green']),
('04','报告版式','材料变成路径','报告不是资料仓库。先主线，再证据，再观察，最后行动。','今日主线','分栏证据','纳斯观察','把工具调研从功能清单改成“适用场景 -> 风险 -> 是否接入”。',COL['amber']),
('05','信息图标注','让图自己说话','图表标题要写结论，关键点直接标注，少让读者来回找图例。','结论标题','直接标注','口径来源','把“新闻分类占比”改成“Agent 内容占比最高，值得继续跟踪”。',COL['cyan']),
('06','案例配图','每个案例一图一文','每个知识点都要有对应配图。图解释结构，文字解释原因。','正例','反例','改法','每节教程至少一张图：对比、流程、结构或检查清单。',COL['blue']),
('07','交付检查','生成后必须验收','文档生成后要检查结构、审美、示例、图片 token 和旧内容残留。','结构检查','视觉检查','飞书检查','写入飞书后确认：新章节存在、图片非空、没有空块和重复段落。',COL['green']),
]
for num,title,headline,body,a,b,c,example,color in lessons:
    img,draw=base(f'{num}｜{title}', headline + '。' + body, 'opendesign case')
    # main left panel
    rounded(draw,(72,300,626,842),30,(12,25,43,230),COL['line'],1)
    draw.text((112,342),'案例文字',font=f(30,True),fill=color)
    draw_text_block(draw,(112,398),example,f(34,True),COL['white'],440,14)
    draw.line((112,610,576,610),fill=(*color,130),width=2)
    draw_text_block(draw,(112,646),'阅读目标：不用回看说明，也能从图中直接理解这个知识点。',f(26),COL['muted'],420,10)
    # diagram right
    rounded(draw,(700,190,1458,846),34,COL['panel'],COL['line'],2)
    cx=[800,1078,1356]
    labels=[a,b,c]
    for i,x in enumerate(cx):
        y=370 + (i%2)*90
        rounded(draw,(x-92,y-92,x+92,y+92),30,(18,36,58,230),(*color,160),2)
        draw.text((x-38,y-20),f'0{i+1}',font=f(34,True),fill=color)
        tw=draw.textbbox((0,0),labels[i],font=f(28,True))[2]
        draw.text((x-tw/2,y+34),labels[i],font=f(28,True),fill=COL['white'])
    draw.line((892,370,986,460),fill=(*color,160),width=4)
    draw.line((1170,460,1264,370),fill=(*color,160),width=4)
    # bottom checklist strip
    rounded(draw,(760,704,1398,792),24,(8,20,36,220),None,1)
    chip(draw,790,725,'看点清楚',COL['cyan'])
    chip(draw,990,725,'示例具体',COL['green'])
    chip(draw,1190,725,'可执行',COL['amber'])
    items.append(save(img,f'{num}-{title}-case-v4.png'))

manifest = {'dir': str(out), 'images': items}
Path(out/'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(manifest, ensure_ascii=False, indent=2))

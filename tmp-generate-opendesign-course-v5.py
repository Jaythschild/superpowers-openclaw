from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json

OUT = Path("images/opendesign-visual-course-v5-2026-05-19")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1536, 1024
FONT_REG = Path(r"C:\Windows\Fonts\NotoSansSC-VF.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\msyhbd.ttc")
if not FONT_REG.exists():
    FONT_REG = Path(r"C:\Windows\Fonts\msyh.ttc")

def font(size, bold=False):
    p = FONT_BOLD if bold and FONT_BOLD.exists() else FONT_REG
    return ImageFont.truetype(str(p), size)

C = {
    "ink": (235, 244, 250),
    "muted": (146, 163, 178),
    "bg": (13, 16, 20),
    "blue": (72, 151, 222),
    "cyan": (90, 216, 228),
    "green": (108, 220, 166),
    "amber": (228, 169, 88),
}

def bg():
    img = Image.new("RGB", (W, H), C["bg"])
    px = img.load()
    for y in range(H):
        for x in range(W):
            nx, ny = x / W, y / H
            glow = max(0, 1 - ((nx - .76) ** 2 / .19 + (ny - .22) ** 2 / .12))
            warm = max(0, 1 - ((nx - .18) ** 2 / .22 + (ny - .86) ** 2 / .16))
            r = int(13 + 12 * nx + 13 * glow + 14 * warm)
            g = int(16 + 18 * ny + 34 * glow + 15 * warm)
            b = int(20 + 26 * nx + 52 * glow + 18 * warm)
            px[x, y] = (min(r, 58), min(g, 82), min(b, 112))
    img = img.convert("RGBA")
    draw = ImageDraw.Draw(img, "RGBA")
    for x in range(88, W, 96):
        draw.line((x, 0, x, H), fill=(115, 150, 165, 18), width=1)
    for y in range(80, H, 80):
        draw.line((0, y, W, y), fill=(115, 150, 165, 16), width=1)
    return img

def rr(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)

def measure(draw, text, f):
    b = draw.textbbox((0, 0), text, font=f)
    return b[2] - b[0], b[3] - b[1]

def wrap(draw, text, f, maxw):
    lines = []
    for para in text.split("\n"):
        buf = ""
        for ch in para:
            if measure(draw, buf + ch, f)[0] <= maxw:
                buf += ch
            else:
                if buf:
                    lines.append(buf)
                buf = ch
        if buf:
            lines.append(buf)
    return lines

def text_block(draw, xy, text, f, fill, maxw, gap=12):
    x, y = xy
    for line in wrap(draw, text, f, maxw):
        draw.text((x, y), line, font=f, fill=fill)
        y += measure(draw, line, f)[1] + gap
    return y

def label(draw, x, y, text, color):
    f = font(22, True)
    w, h = measure(draw, text, f)
    rr(draw, (x, y, x + w + 28, y + 40), 20, (*color, 28), (*color, 150), 1)
    draw.text((x + 14, y + 8), text, font=f, fill=color)
    return w + 38

def base(kicker, title, sub):
    img = bg()
    draw = ImageDraw.Draw(img, "RGBA")
    draw.text((70, 54), kicker.upper(), font=font(20, True), fill=C["green"])
    draw.text((70, 92), title, font=font(56, True), fill=C["ink"])
    text_block(draw, (72, 174), sub, font(27), C["muted"], 700, 10)
    return img, draw

def save(img, name):
    p = OUT / name
    img.convert("RGB").save(p, quality=96)
    return str(p)

images = []

img, d = base(
    "opendesign content system",
    "内容先行，视觉统一",
    "把教程、日报、知识库和图文报告放进同一条生产线：内容设计、图解生成、飞书验收。",
)
rr(d, (760, 120, 1458, 852), 34, (225, 230, 226, 228), (255, 255, 255, 86), 1)
d.text((812, 174), "OpenDesign 执行链", font=font(38, True), fill=(22, 29, 35))
steps = [
    ("01", "内容任务", "读者、主判断、下一步"),
    ("02", "阅读路径", "主结论、证据、限制"),
    ("03", "图解系统", "对比、流程、结构、检查"),
    ("04", "生成验收", "图片 token、空块、残留"),
]
for i, (n, t, b) in enumerate(steps):
    y = 246 + i * 130
    color = [C["cyan"], C["blue"], C["green"], C["amber"]][i]
    rr(d, (820, y, 1370, y + 88), 24, (245, 248, 246, 235), (*color, 170), 2)
    d.text((850, y + 21), n, font=font(30, True), fill=color)
    d.text((920, y + 18), t, font=font(30, True), fill=(22, 29, 35))
    d.text((920, y + 54), b, font=font(22), fill=(78, 91, 99))
    if i < 3:
        d.line((1094, y + 90, 1094, y + 126), fill=(*color, 130), width=4)
rr(d, (72, 642, 620, 842), 30, (12, 21, 30, 225), (110, 140, 155, 100), 1)
d.text((108, 686), "不是补图", font=font(34, True), fill=C["ink"])
d.text((270, 686), "是重做课程系统", font=font(34, True), fill=C["cyan"])
text_block(d, (110, 744), "先把内容关系整理清楚，再让视觉承担解释功能。", font(28), C["muted"], 420, 10)
images.append(save(img, "00-cover-content-system-v5.png"))

cards = [
    ("01", "内容设计", "先定读者任务", "读者是谁、卡在哪里、要带走什么判断。", ["读者", "主判断", "下一步"], C["cyan"]),
    ("02", "阅读路径", "一屏一个主判断", "第一眼看结论，第二眼看证据，第三眼看限制。", ["结论", "证据", "限制"], C["blue"]),
    ("03", "中文密度", "长文切成模块", "判断、证据、方法、检查分开，拒绝整块灰文。", ["判断", "证据", "检查"], C["green"]),
    ("04", "视觉系统", "颜色字体有职责", "白色给结论，蓝色给路径，绿色给行动，琥珀给风险。", ["结论", "路径", "行动"], C["amber"]),
    ("05", "案例图解", "每个知识点可视化", "对比、流程、结构、检查，只选一种图解任务。", ["对比", "流程", "检查"], C["cyan"]),
    ("06", "日报应用", "新闻变成判断产品", "今日主线、影响图卡、分栏目证据、纳斯观察。", ["主线", "图卡", "观察"], C["blue"]),
    ("07", "教程应用", "知识点变成练习", "场景、坏结果、改法、示例、练习、检查。", ["场景", "练习", "验收"], C["green"]),
    ("08", "生成验收", "没有检查不交付", "结构、审美、教学、技术、残留全部检查。", ["内容", "图片", "残留"], C["amber"]),
]

for num, title, head, desc, labs, color in cards:
    img, d = base(f"lesson {num}", f"{num}｜{title}", head + "。" + desc)
    rr(d, (74, 310, 620, 842), 30, (226, 231, 227, 230), (255, 255, 255, 70), 1)
    d.text((112, 352), "OpenDesign 改法", font=font(34, True), fill=(20, 28, 35))
    text_block(d, (114, 414), desc, font(31, True), (35, 45, 52), 420, 14)
    d.line((114, 620, 560, 620), fill=(*color, 185), width=3)
    text_block(d, (114, 662), "图片必须解释这个知识点，不能只当科技氛围背景。", font(25), (75, 87, 96), 410, 10)

    rr(d, (700, 182, 1458, 842), 36, (11, 20, 29, 230), (115, 145, 160, 95), 1)
    d.text((758, 236), "从材料到作品的路径", font=font(32, True), fill=C["ink"])
    positions = [(835, 474), (1082, 374), (1328, 520)]
    for i, (x, y) in enumerate(positions):
        rr(d, (x - 98, y - 98, x + 98, y + 98), 34, (226, 231, 227, 238), (*color, 180), 2)
        d.text((x - 28, y - 40), f"0{i+1}", font=font(34, True), fill=color)
        tw = measure(d, labs[i], font(30, True))[0]
        d.text((x - tw / 2, y + 22), labs[i], font=font(30, True), fill=(22, 30, 36))
    d.line((930, 454, 984, 404), fill=(*color, 165), width=4)
    d.line((1180, 414, 1235, 486), fill=(*color, 165), width=4)
    rr(d, (760, 708, 1398, 790), 24, (235, 239, 236, 220), None, 1)
    x = 790
    for txt, col in [("场景明确", C["cyan"]), ("示例具体", C["green"]), ("可检查", C["amber"])]:
        x += label(d, x, 730, txt, col)
    images.append(save(img, f"{num}-{title}-v5.png"))

(OUT / "manifest.json").write_text(json.dumps({"dir": str(OUT), "images": images}, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"dir": str(OUT), "count": len(images), "images": images}, ensure_ascii=False, indent=2))


from scrapling import StealthyFetcher
import re

url = 'https://mp.weixin.qq.com/s/KbD0clq20SOkbQCaXSS0OA'
response = StealthyFetcher.fetch(url)
print('Status:', response.status)
print('---')

# 提取文章标题 - 通常在 head 的 title 标签或 meta 标签中
# 提取文章标题
title = response.css('title::text').get()
if title:
    print('Title:', title.strip())

# 提取文章内容区域
js_content = response.css('#js_content')
if js_content:
    text = js_content.get()
    if text:
        text = re.sub(r'\s+', ' ', text).strip()
        print('Content length:', len(text))
        print(text[:3000])
else:
    print('Could not extract #js_content')
    # 尝试其他选择器
    rich_media = response.css('.rich_media_content')
    if rich_media:
        text = rich_media.get()
        if text:
            text = re.sub(r'\s+', ' ', text).strip()
            print('Content length (fallback):', len(text))
            print(text[:3000])

from scrapling import StealthyFetcher
import re

url = 'https://mp.weixin.qq.com/s/KbD0clq20SOkbQCaXSS0OA'
response = StealthyFetcher.fetch(url)
print('Status:', response.status)

# 提取标题
title_el = response.css('title::text')
print('Title:', title_el.get().strip() if title_el else 'N/A')

# 提取 meta 信息
desc = response.css('meta[name="description"]::attr(content)')
if desc:
    print('Description:', desc.get())

# 提取作者
author = response.css('#js_name::text')
if author:
    print('Author:', author.get().strip())

# 提取正文 - 用 XPath 获取纯文本
content_xpath = response.xpath('//div[@id="js_content"]//text()')
if content_xpath:
    lines = [t.strip() for t in content_xpath.getall() if t.strip()]
    text = '\n'.join(lines)
    print('Content length:', len(text))
    print('---')
    print(text[:3000])
else:
    print('No text content found')

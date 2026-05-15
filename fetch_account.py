from scrapling import StealthyFetcher
import re

url = 'https://mp.weixin.qq.com/s/KbD0clq20SOkbQCaXSS0OA'
response = StealthyFetcher.fetch(url)
print('Status:', response.status)

# 提取账号名称（发布文章的公众号）
author = response.css('#js_name::text')
if author:
    print('公众号:', author.get().strip())

# 提取文章标题
title = response.css('#activity-name::text')
if title:
    print('标题:', title.get().strip())

# 提取描述
desc = response.css('meta[name="description"]::attr(content)')
if desc:
    print('描述:', desc.get())

# 提取发布时间
ct = response.css('#ct::text')
if ct:
    print('发布时间:', ct.get().strip())

# 提取正文
content_xpath = response.xpath('//div[@id="js_content"]//text()')
if content_xpath:
    lines = [t.strip() for t in content_xpath.getall() if t.strip()]
    text = '\n'.join(lines)
    print('正文长度:', len(text))
    if text:
        print('---')
        print(text[:2000])

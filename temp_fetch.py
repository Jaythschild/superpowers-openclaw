import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from scrapling import StealthyFetcher
import re

fetcher = StealthyFetcher()
resp = fetcher.fetch('https://aiera.com.cn/')
html = resp._raw_body.decode('utf-8', errors='ignore')

# 提取文章链接
titles = re.findall(r'<a[^>]*href="([^"]+)"[^>]*>([^<]+)</a>', html)
for url, title in titles[:30]:
    if 'mp.weixin.qq.com' in url or '/post/' in url or '/article/' in url:
        print(f'{title.strip()} -> {url}')
print('---DONE---')

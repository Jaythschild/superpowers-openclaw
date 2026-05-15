from scrapling import StealthyFetcher
import re, json, sys

sys.stdout.reconfigure(encoding='utf-8')

# Get detailed news from AIBase
try:
    resp = StealthyFetcher.fetch('https://www.aibase.com/news', headless=True)
    html = resp.html_content if hasattr(resp, 'html_content') else resp.text
    # Extract news items
    items = re.findall(r'<a[^>]*href="(/news/[^\"]*)"[^>]*>([^<]+)</a>', html)
    print('=== AIBase News Detail ===')
    for url, title in items[:30]:
        print(f'- {title.strip()}')
        print(f'  https://www.aibase.com{url}')
        print()
except Exception as e:
    print(f'AIBase news fetch failed: {e}')

# Get OpenAI news page
try:
    resp2 = StealthyFetcher.fetch('https://openai.com/news/', headless=True)
    html2 = resp2.html_content if hasattr(resp2, 'html_content') else resp2.text
    articles2 = re.findall(r'<h[1-3][^>]*>([^<]+)</h[1-3]>', html2)
    links2 = re.findall(r'<a[^>]*href="(/news/[^\"]*)"[^>]*>([^<]+)</a>', html2)
    print('=== OpenAI News ===')
    for a in articles2[:15]:
        print(f'- {a.strip()}')
    for url, title in links2[:15]:
        print(f'- {title.strip()}')
        print(f'  https://openai.com{url}')
    print()
except Exception as e:
    print(f'OpenAI news fetch failed: {e}')

# Get Google AI blog articles
try:
    resp3 = StealthyFetcher.fetch('https://blog.google/technology/ai/', headless=True)
    html3 = resp3.html_content if hasattr(resp3, 'html_content') else resp3.text
    links3 = re.findall(r'<a[^>]*href="(/technology/ai/[^\"]*)"[^>]*>([^<]+)</a>', html3)
    print('=== Google AI Blog Articles ===')
    for url, title in links3[:10]:
        print(f'- {title.strip()}')
        print(f'  https://blog.google{url}')
        print()
except Exception as e:
    print(f'Google AI blog fetch failed: {e}')

# Try to get WeChat article content via Google cache
try:
    resp4 = StealthyFetcher.fetch('https://webcache.googleusercontent.com/search?q=cache:mp.weixin.qq.com/s/VF-AdIoX2pdnj9dMqML71g', headless=True)
    html4 = resp4.html_content if hasattr(resp4, 'html_content') else resp4.text
    print(f'Google cache HTML length: {len(html4)}')
    print(html4[:2000])
except Exception as e:
    print(f'Google cache fetch failed: {e}')

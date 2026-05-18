#!/usr/bin/env python3
"""Quick helper: scrape a URL via Scrapling and return readable markdown."""

import argparse
import sys

from scrapling import FetchClient

def main():
    parser = argparse.ArgumentParser(description="Scrape a URL with Scrapling")
    parser.add_argument("url", help="URL to scrape")
    parser.add_argument("--raw", action="store_true", help="Show raw text instead of markdown")
    args = parser.parse_args()

    client = FetchClient(cache_disabled=False)
    response = client.get(args.url)
    if args.raw:
        print(response.text)
    else:
        md = response.parser.crawler_response.convert_to_markdown()
        print(md)

if __name__ == "__main__":
    main()

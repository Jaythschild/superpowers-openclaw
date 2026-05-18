const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
  await page.goto('file:///D:/openclaw-stack/workspace/images/opendesign-skill-directed-poster.html');
  await page.screenshot({ path: 'D:/openclaw-stack/workspace/images/opendesign-skill-directed-poster-2026-05-18.png', fullPage: false });
  await browser.close();
})();

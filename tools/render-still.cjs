// Render stills from a built scene with headless Chrome (software GL, so it is slow but deterministic).
// Usage: node tools/render-still.cjs dist/server-hall.html out/prefix 16x9|9x16 "0,4,7,10,13" [longSide]
// Needs playwright (global install) and google-chrome. Set NODE_PATH to the playwright folder if needed.
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const [file, prefix = 'out/still', fmt = '16x9', times = '0,4,7,10,13', side = '1280'] = process.argv.slice(2);
  const browser = await chromium.launch({
    executablePath: process.env.CHROME || '/usr/bin/google-chrome',
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  page.on('console', (m) => { if (m.type() === 'error') console.log('page error:', m.text()); });
  page.on('pageerror', (e) => console.log('page exception:', e.message));
  await page.goto('file://' + path.resolve(file) + '?paused=1&format=' + fmt + '&w=' + side);
  await page.waitForFunction(() => window.__kit && window.__kit.ready, null, { timeout: 120000 });
  require('fs').mkdirSync(path.dirname(prefix), { recursive: true });
  for (const t of times.split(',').map(Number)) {
    await page.evaluate((s) => window.__kit.setTime(s), t);
    const out = `${prefix}_${fmt}_t${String(t).padStart(2, '0')}.png`;
    if (process.env.STAGE) {
      await page.waitForTimeout(900);
      await page.locator('#stage').screenshot({ path: out.replace('.png', '_stage.png'), animations: 'disabled' });
    }
    const data = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
    require('fs').writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
    console.log('saved', out);
  }
  await browser.close();
})();

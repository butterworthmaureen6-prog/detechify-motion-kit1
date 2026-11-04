// Bundle a scene folder (main.js + index.html) into one self-contained HTML file in dist/.
// Usage: node tools/build-scene.mjs scenes/server-hall
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: node tools/build-scene.mjs <scene-dir>'); process.exit(1); }

const out = await build({
  entryPoints: [path.join(dir, 'main.js')],
  bundle: true, minify: true, format: 'iife', write: false, legalComments: 'none',
});
const js = out.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const own = path.join(dir, 'index.html');
const template = fs.readFileSync(fs.existsSync(own) ? own : 'components/host.html', 'utf8');
const title = path.basename(dir).replace(/-/g, ' ');
const html = template.replace('<!--TITLE-->', () => title).replace('<!--BUNDLE-->', () => `<script>${js}</script>`);
fs.mkdirSync('dist', { recursive: true });
const file = path.join('dist', path.basename(dir) + '.html');
fs.writeFileSync(file, html);
console.log('wrote', file, (html.length / 1024).toFixed(0) + ' KB');

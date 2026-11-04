// Convert an SRT into the transcript JSON the text layer reads (words with start/end times).
// Cues that already hold one word each keep their timing. Longer cues are split into words, spread by character count.
// Usage: node tools/srt-to-transcript.mjs voiceover.srt scenes/<slug>/script.json "<title>" <topic>
import fs from 'node:fs';

const [src, out, title = 'Untitled', topic = 'general'] = process.argv.slice(2);
if (!src || !out) { console.error('usage: node tools/srt-to-transcript.mjs in.srt out.json [title] [topic]'); process.exit(1); }

const toSec = (s) => { const [h, m, r] = s.trim().replace(',', '.').split(':'); return +h * 3600 + +m * 60 + parseFloat(r); };
const blocks = fs.readFileSync(src, 'utf8').replace(/\r/g, '').trim().split(/\n\s*\n/);
const words = [];
for (const b of blocks) {
  const lines = b.split('\n');
  const timeLine = lines.find((l) => l.includes('-->'));
  if (!timeLine) continue;
  const [a, c] = timeLine.split('-->').map(toSec);
  const text = lines.slice(lines.indexOf(timeLine) + 1).join(' ').replace(/\s+/g, ' ').trim();
  const ws = text.split(' ').filter(Boolean);
  if (!ws.length) continue;
  const total = ws.reduce((n, w) => n + w.length + 1, 0);
  let cur = a;
  for (const w of ws) {
    const d = ((w.length + 1) / total) * (c - a);
    words.push({ w, s: +cur.toFixed(2), e: +(cur + d).toFixed(2) });
    cur += d;
  }
}
const json = { title, topic, duration: +(words.at(-1).e + 1).toFixed(2), events: {}, words, keywords: [], labels: [] };
fs.writeFileSync(out, JSON.stringify(json, null, 2));
console.log(`wrote ${out}: ${words.length} words, ${json.duration}s. Add events, keywords and labels next (see prompts/transcript-format.md).`);

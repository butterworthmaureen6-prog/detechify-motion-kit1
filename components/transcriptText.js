// Transcript-synced text layer. Everything is a pure function of time t, so any frame can be rendered on demand.
//   captions       : a few words at a time, current word highlighted
//   keyword cards  : a big term pops in when it is spoken
//   3D labels      : pills pinned to objects in the scene (the set supplies the anchors)
// Transcript format: see prompts/transcript-format.md
import * as THREE from 'three';

const TONES = { amber: '#ffc83d', red: '#ff4d5e', cyan: '#4fd8ff', green: '#3dff8f', orange: '#ff8a2b', violet: '#9b6bff' };
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function buildChunks(words) {
  const chunks = [];
  let cur = [];
  const flush = () => { if (cur.length) { chunks.push({ idx: cur }); cur = []; } };
  for (let i = 0; i < words.length; i++) {
    cur.push(i);
    const text = cur.map((j) => words[j].w).join(' ');
    if (/[.,!?;:]$/.test(words[i].w) || cur.length >= 4 || text.length >= 26) flush();
  }
  flush();
  chunks.forEach((c, k) => {
    const first = words[c.idx[0]], last = words[c.idx[c.idx.length - 1]];
    const next = chunks[k + 1] ? words[chunks[k + 1].idx[0]] : null;
    c.a = first.s;
    // hold until the next chunk starts, unless there is a real pause
    c.b = next && next.s - last.e < 0.6 ? next.s : last.e + 0.3;
  });
  return chunks;
}

export function createTranscriptText({ root, script, getAnchor, camera }) {
  const capsEl = root.querySelector('#caps');
  const capsBox = capsEl.querySelector('.box');
  const kwEl = root.querySelector('#kw');
  const lblEl = root.querySelector('#labels');
  const svg = lblEl.querySelector('svg');
  const words = script?.words || [];
  const chunks = buildChunks(words);
  let curChunk = -2;
  let spans = [];

  const kws = (script?.keywords || []).map((k) => {
    const el = document.createElement('div');
    el.className = 'kwcard';
    el.innerHTML = `<div class="k">${esc(k.text)}</div>${k.sub ? `<div class="s">${esc(k.sub)}</div>` : ''}`;
    kwEl.appendChild(el);
    return { ...k, el };
  });

  const lbls = (script?.labels || []).map((l) => {
    const dot = document.createElement('div'); dot.className = 'dot';
    const pill = document.createElement('div'); pill.className = 'pill'; pill.textContent = l.text;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const tone = TONES[l.tone || 'cyan'] || l.tone;
    dot.style.background = tone; dot.style.boxShadow = `0 0 .8em ${tone}`;
    pill.style.borderColor = tone;
    line.setAttribute('stroke', tone); line.setAttribute('stroke-width', '2'); line.style.display = 'none';
    svg.appendChild(line);
    lblEl.append(dot, pill);
    return { ...l, dot, pill, line };
  });

  const v = new THREE.Vector3();
  function project(name, out, W, H) {
    if (!name || !getAnchor || !getAnchor(name, v)) return false;
    v.project(camera);
    if (v.z > 1) return false;
    out.x = (v.x * 0.5 + 0.5) * W;
    out.y = (-v.y * 0.5 + 0.5) * H;
    return true;
  }
  const p = { x: 0, y: 0 }, q = { x: 0, y: 0 };

  function update(t, { enabled = true } = {}) {
    root.style.display = enabled ? '' : 'none';
    if (!enabled) return;
    const W = root.clientWidth, H = root.clientHeight;

    // captions
    const ci = chunks.findIndex((c) => t >= c.a && t < c.b);
    if (ci !== curChunk) {
      curChunk = ci;
      if (ci >= 0) {
        capsBox.innerHTML = chunks[ci].idx.map((i) => `<span class="w" data-i="${i}">${esc(words[i].w)}</span>`).join(' ');
        spans = [...capsBox.querySelectorAll('.w')];
      } else { capsBox.textContent = ''; spans = []; }
      capsEl.classList.toggle('on', ci >= 0);
    }
    if (ci >= 0) {
      for (const s of spans) {
        const w = words[+s.dataset.i];
        s.className = 'w' + (t >= w.s ? (t < w.e ? ' now' : ' past') : '');
      }
    }

    // keyword cards
    for (const k of kws) k.el.classList.toggle('on', t >= k.at && t < k.at + (k.dur || 2.2));

    // 3D labels
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    for (const l of lbls) {
      let show = t >= l.s && t < l.e && project(l.anchor, p, W, H);
      if (show) {
        if (l.pill_at) show = project(l.pill_at, q, W, H);
        else { q.x = p.x + W * 0.07; q.y = p.y - H * 0.05; }
      }
      l.dot.classList.toggle('on', show);
      l.pill.classList.toggle('on', show);
      l.line.style.display = show ? '' : 'none';
      if (!show) continue;
      const pw = l.pill.offsetWidth, ph = l.pill.offsetHeight;
      const left = l.side === 'l' ? q.x - pw : q.x;
      const x = Math.min(Math.max(left, W * 0.03), W * 0.97 - pw);
      const y = Math.min(Math.max(q.y - ph / 2, H * 0.03), H * 0.97 - ph);
      l.pill.style.left = x + 'px'; l.pill.style.top = y + 'px';
      l.dot.style.left = p.x + 'px'; l.dot.style.top = p.y + 'px';
      const ex = x + pw / 2 > p.x ? x : x + pw;
      l.line.setAttribute('x1', p.x); l.line.setAttribute('y1', p.y);
      l.line.setAttribute('x2', ex); l.line.setAttribute('y2', y + ph / 2);
    }
  }
  return { update };
}

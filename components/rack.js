// Procedural server rack. No external models: everything is drawn in code, so it is 100% ours.
import * as THREE from 'three';
import palette from '../tokens/palette.json';

const LED = [palette.ok_green, palette.data_cyan, palette.accent_orange];
const UNIT = 0.0445; // 1U in metres

function rngFrom(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function led(e, x, y, r, color) {
  e.fillStyle = color;
  e.beginPath(); e.arc(x, y, r, 0, Math.PI * 2); e.fill();
}

function drawFace(kind, units, seed) {
  const rnd = rngFrom(seed);
  const W = 1024, H = 92 * units;
  const col = canvas(W, H), em = canvas(W, H);
  const c = col.getContext('2d'), e = em.getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#2b3340'); g.addColorStop(0.5, '#1a2029'); g.addColorStop(1, '#10141b');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  e.fillStyle = '#000'; e.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(255,255,255,0.14)'; c.fillRect(0, 0, W, 2);
  c.fillStyle = 'rgba(0,0,0,0.5)'; c.fillRect(0, H - 3, W, 3);
  // rack ears + screws
  for (const x of [26, W - 26]) {
    c.fillStyle = '#323b49'; c.fillRect(x - 22, 4, 44, H - 8);
    c.fillStyle = '#0c0f14'; c.beginPath(); c.arc(x, H / 2, 6, 0, 7); c.fill();
  }

  if (kind === 'compute') {
    c.fillStyle = '#05070a';
    for (let y = 14; y < H - 10; y += 9) for (let x = 90; x < 640; x += 9) { c.beginPath(); c.arc(x + ((y / 9) % 2) * 4, y, 2.2, 0, 7); c.fill(); }
    for (let i = 0; i < 4; i++) led(e, 700 + i * 26, H / 2 - 14, 5, LED[Math.floor(rnd() * 3)]);
    c.fillStyle = '#0c0f14'; c.fillRect(690, H / 2 + 6, 120, 18);
    c.fillStyle = '#9aa7b8'; c.font = 'bold 22px sans-serif'; c.fillText('N' + Math.floor(rnd() * 90 + 10), 840, H / 2 + 8);
    led(e, 960, H / 2, 8, palette.ok_green);
  } else if (kind === 'storage') {
    const bays = 8, bw = (W - 200) / bays;
    for (let i = 0; i < bays; i++) {
      const x = 90 + i * bw;
      c.fillStyle = '#0d1117'; c.fillRect(x + 3, 10, bw - 8, H - 20);
      c.strokeStyle = '#3a4452'; c.lineWidth = 2; c.strokeRect(x + 3, 10, bw - 8, H - 20);
      c.fillStyle = '#2b3340'; c.fillRect(x + 12, H - 26, bw - 26, 8);
      led(e, x + bw - 18, 22, 4.5, rnd() > 0.15 ? palette.ok_green : palette.accent_orange);
      led(e, x + bw - 34, 22, 4.5, rnd() > 0.5 ? palette.data_cyan : '#000');
    }
  } else if (kind === 'network') {
    const ports = 24, pw = (W - 200) / ports;
    for (let i = 0; i < ports; i++) {
      const x = 96 + i * pw, y = i % 2 ? H * 0.52 : H * 0.14;
      c.fillStyle = '#05070a'; c.fillRect(x, y, pw - 8, H * 0.32);
      c.strokeStyle = '#4a5666'; c.lineWidth = 1.5; c.strokeRect(x, y, pw - 8, H * 0.32);
      if (rnd() > 0.2) led(e, x + (pw - 8) / 2, y - 6 + (i % 2 ? 0 : H * 0.34), 3.5, rnd() > 0.7 ? palette.accent_orange : palette.ok_green);
    }
  } else {
    c.fillStyle = 'rgba(255,255,255,0.04)';
    for (let x = 80; x < W - 80; x += 40) c.fillRect(x, 8, 2, H - 16);
  }

  const map = new THREE.CanvasTexture(col);
  const emissiveMap = new THREE.CanvasTexture(em);
  for (const t of [map, emissiveMap]) { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; }
  return { map, emissiveMap };
}

const faceCache = new Map();
const sideMat = new THREE.MeshStandardMaterial({ color: palette.metal_dark, metalness: 0.8, roughness: 0.4 });
const frameMat = new THREE.MeshStandardMaterial({ color: palette.metal_mid, metalness: 0.9, roughness: 0.32 });
const bodyMat = new THREE.MeshStandardMaterial({ color: '#0d1117', metalness: 0.7, roughness: 0.5 });
export const blinkMaterials = [];

function faceMaterial(kind, units, variant) {
  const key = `${kind}-${units}-${variant}`;
  if (!faceCache.has(key)) {
    const { map, emissiveMap } = drawFace(kind, units, variant * 977 + units * 31 + kind.length);
    const m = new THREE.MeshStandardMaterial({
      map, emissiveMap, emissive: new THREE.Color(0xffffff), emissiveIntensity: 2.4, metalness: 0.55, roughness: 0.42,
    });
    m.userData.phase = Math.random() * 6.28;
    m.userData.speed = 1.2 + Math.random() * 2.5;
    blinkMaterials.push(m);
    faceCache.set(key, m);
  }
  return faceCache.get(key);
}

// Rack local frame: front faces +Z. Width 0.6, depth 1.0, height 2.1.
export function createRack({ seed = 1, mix = ['compute', 'compute', 'storage', 'network'] } = {}) {
  const rnd = rngFrom(seed);
  const g = new THREE.Group();
  const H = 2.1, D = 1.0, Wd = 0.6;

  const body = new THREE.Mesh(new THREE.BoxGeometry(Wd, H, D - 0.06), bodyMat);
  body.position.set(0, H / 2, -0.03);
  body.castShadow = body.receiveShadow = true;
  g.add(body);

  for (const x of [-0.262, 0.262]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.04, H, 0.05), frameMat);
    rail.position.set(x, H / 2, D / 2 - 0.02);
    rail.castShadow = true;
    g.add(rail);
  }
  for (const y of [0.03, H - 0.03]) {
    const cap = new THREE.Mesh(new THREE.BoxGeometry(Wd + 0.02, 0.06, D), frameMat);
    cap.position.set(0, y, 0);
    cap.castShadow = true;
    g.add(cap);
  }

  let y = 0.1;
  while (y < H - 0.14) {
    const units = rnd() > 0.72 ? 2 : 1;
    const h = units * UNIT;
    if (y + h > H - 0.12) break;
    const kind = rnd() > 0.9 ? 'blank' : mix[Math.floor(rnd() * mix.length)];
    const face = faceMaterial(kind, units, Math.floor(rnd() * 3));
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.482, h - 0.003, 0.05), [sideMat, sideMat, sideMat, sideMat, face, sideMat]);
    slot.position.set(0, y + h / 2, D / 2 - 0.02);
    slot.castShadow = true;
    g.add(slot);
    y += h + 0.002;
  }
  return g;
}

export function updateRackBlink(t) {
  for (const m of blinkMaterials) {
    m.emissiveIntensity = 2.0 + 1.0 * Math.sin(t * m.userData.speed + m.userData.phase);
  }
}

// Set: server hall. Two rows of racks facing an aisle, data streams arcing overhead.
// Topics: cloud, data centres, infrastructure, "what is a server".
import * as THREE from 'three';
import { createRack, updateRackBlink } from '../components/rack.js';
import { createStreams } from '../components/dataStreams.js';
import palette from '../tokens/palette.json';

function spillTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 512;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(128, 300, 10, 128, 300, 250);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.35, 'rgba(255,255,255,0.55)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 256, 512);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

const KEYS = [
  { t: 0,  pos: [0.0, 0.55, 11.5], look: [0, 1.2, -3],       fov: 36 },
  { t: 4,  pos: [0.25, 0.75, 6.5], look: [-0.6, 1.25, 0.5],  fov: 36 },
  { t: 7,  pos: [0.55, 1.45, 2.4], look: [-1.4, 1.15, -0.6], fov: 34 },
  { t: 10, pos: [0.0, 2.3, -0.8],  look: [1.4, 1.35, -3.2],  fov: 38 },
  { t: 14, pos: [-0.9, 3.7, 7.2],  look: [0, 1.0, -3.5],     fov: 40 },
];

export default {
  id: 'server-hall',
  look: 'studio_dark',
  build({ scene }) {
    const ROWS = 12, STEP = 0.8, Z0 = -((ROWS - 1) * STEP) / 2;
    const tops = { L: [], R: [] };
    for (let i = 0; i < ROWS; i++) {
      const z = Z0 + i * STEP;
      const l = createRack({ seed: 100 + i }); l.position.set(-1.35, 0, z); l.rotation.y = Math.PI / 2;
      const r = createRack({ seed: 200 + i }); r.position.set(1.35, 0, z); r.rotation.y = -Math.PI / 2;
      scene.add(l, r);
      tops.L.push(new THREE.Vector3(-0.85, 2.14, z));
      tops.R.push(new THREE.Vector3(0.85, 2.14, z));
    }
    const curves = [];
    for (const [a, b] of [[1, 3], [2, 0], [4, 6], [5, 8], [7, 9], [10, 11], [3, 4], [8, 7]]) {
      const p0 = new THREE.Vector3(-1.35, 2.14, tops.L[a].z), p1 = new THREE.Vector3(1.35, 2.14, tops.R[b].z);
      curves.push(new THREE.CatmullRomCurve3([p0.clone(), p0.clone().add(new THREE.Vector3(0.1, 0.55, 0)), new THREE.Vector3(0, 3.0, (p0.z + p1.z) / 2), p1.clone().add(new THREE.Vector3(-0.1, 0.55, 0)), p1.clone()]));
    }
    const zA = Z0 - 0.5, zB = -Z0 + 0.5;
    curves.push(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 3.2, zB + 6), new THREE.Vector3(0, 3.15, zB), new THREE.Vector3(0, 3.1, 0), new THREE.Vector3(0, 3.15, zA), new THREE.Vector3(0, 3.2, zA - 4)]));
    const streams = createStreams({ curves, packetsPerCurve: 34 });
    scene.add(streams.group);

    const door = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 4.2), new THREE.MeshBasicMaterial({ map: spillTexture(), color: new THREE.Color(palette.accent_orange).multiplyScalar(1.6), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false }));
    door.position.set(0, 1.9, zA - 3.2);
    scene.add(door);

    return {
      update(t) { streams.update(t); updateRackBlink(t); },
      getKeys: () => KEYS,
      // anchors: rack:L3 = front-top of the 4th rack in the left row, rack:R0 = right row
      getAnchor(name, out) {
        const m = /^rack:([LR])(\d+)$/.exec(name);
        if (!m || !tops[m[1]][+m[2]]) return false;
        out.copy(tops[m[1]][+m[2]]); return true;
      },
      portrait: { fovScale: 1.55, distScale: 1 },
    };
  },
};

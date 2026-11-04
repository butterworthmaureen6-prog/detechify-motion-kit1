// Camera flow: keyframes -> smooth spline path. Fast start, slow settle between keys ("ease-out burst").
// keys: [{ t, pos:[x,y,z], look:[x,y,z], fov }]
import * as THREE from 'three';

const easeOutCubic = (u) => 1 - Math.pow(1 - u, 3);
const easeInOutSine = (u) => -(Math.cos(Math.PI * u) - 1) / 2;

export function createCameraFlow(keys, { ease = 'burst' } = {}) {
  const posCurve = new THREE.CatmullRomCurve3(keys.map((k) => new THREE.Vector3(...k.pos)), false, 'centripetal');
  const lookCurve = new THREE.CatmullRomCurve3(keys.map((k) => new THREE.Vector3(...k.look)), false, 'centripetal');
  const n = keys.length - 1;
  const duration = keys[n].t;
  const look = new THREE.Vector3();

  function apply(camera, t, { fovScale = 1, distScale = 1 } = {}) {
    const tt = Math.min(Math.max(t, 0), duration - 1e-4);
    let i = 0;
    while (i < n - 1 && tt >= keys[i + 1].t) i++;
    const u = (tt - keys[i].t) / (keys[i + 1].t - keys[i].t);
    const e = ease === 'burst' ? easeOutCubic(u) * 0.8 + easeInOutSine(u) * 0.2 : easeInOutSine(u);
    const f = (i + e) / n;
    posCurve.getPoint(f, camera.position);
    lookCurve.getPoint(f, look);
    if (distScale !== 1) camera.position.sub(look).multiplyScalar(distScale).add(look);
    camera.lookAt(look);
    camera.fov = (keys[i].fov + (keys[i + 1].fov - keys[i].fov) * e) * fovScale;
    camera.updateProjectionMatrix();
    return look;
  }
  return { apply, duration };
}

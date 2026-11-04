// Data streams: glowing packets that travel along curves ("data as light").
import * as THREE from 'three';
import palette from '../tokens/palette.json';

export function createStreams({ curves, packetsPerCurve = 36, speed = 0.09, cableRadius = 0.012 }) {
  const group = new THREE.Group();
  const runners = [];
  const X = new THREE.Vector3(1, 0, 0);
  const tmpP = new THREE.Vector3();
  const tmpT = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const mat4 = new THREE.Matrix4();
  const scale = new THREE.Vector3();
  const cyan = new THREE.Color(palette.data_cyan).multiplyScalar(5);
  const orange = new THREE.Color(palette.accent_orange).multiplyScalar(5);

  curves.forEach((curve, ci) => {
    const cable = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 160, cableRadius, 8, false),
      new THREE.MeshStandardMaterial({ color: palette.metal_dark, metalness: 0.6, roughness: 0.35 })
    );
    cable.castShadow = true;
    group.add(cable);

    const glow = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 160, cableRadius * 0.55, 6, false),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.data_cyan).multiplyScalar(1.4), transparent: true, opacity: 0.32, toneMapped: false })
    );
    group.add(glow);

    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ toneMapped: false }),
      packetsPerCurve
    );
    mesh.frustumCulled = false;
    for (let i = 0; i < packetsPerCurve; i++) mesh.setColorAt(i, (i + ci) % 7 === 0 ? orange : cyan);
    group.add(mesh);
    runners.push({ curve, mesh, offset: ci * 0.137, dir: ci % 2 ? -1 : 1 });
  });

  function update(t) {
    for (const r of runners) {
      const n = r.mesh.count;
      for (let i = 0; i < n; i++) {
        let u = (i / n + r.offset + r.dir * t * speed) % 1;
        if (u < 0) u += 1;
        r.curve.getPointAt(u, tmpP);
        r.curve.getTangentAt(u, tmpT);
        if (r.dir < 0) tmpT.negate();
        quat.setFromUnitVectors(X, tmpT);
        const len = 0.1 + 0.08 * Math.sin(i * 1.7 + t * 2);
        scale.set(len, 0.028, 0.028);
        mat4.compose(tmpP, quat, scale);
        r.mesh.setMatrixAt(i, mat4);
      }
      r.mesh.instanceMatrix.needsUpdate = true;
      if (r.mesh.instanceColor) r.mesh.instanceColor.needsUpdate = true;
    }
  }
  return { group, update };
}

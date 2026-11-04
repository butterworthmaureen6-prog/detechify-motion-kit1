// Studio: dark glossy void, reflective floor, key/rim/accent lights, bloom + depth of field.
// This is the "Branch-style" base every scene sits on.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import lights from '../tokens/lights.json';

function gridTexture(voidColor, alpha) {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const g = c.getContext('2d');
  g.fillStyle = voidColor;
  g.fillRect(0, 0, 1024, 1024);
  g.strokeStyle = `rgba(130,170,210,${alpha})`;
  g.lineWidth = 2;
  g.strokeRect(1, 1, 1022, 1022);
  g.beginPath();
  g.moveTo(512, 0); g.lineTo(512, 1024);
  g.moveTo(0, 512); g.lineTo(1024, 512);
  g.globalAlpha = 0.5;
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function createStudio(canvas, { width = 1280, height = 720, look = 'studio_dark', floorSize = 80 } = {}) {
  const L = lights.presets[look];
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = L.exposure;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(L.void);
  scene.fog = new THREE.FogExp2(L.void, L.fog);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = L.env_intensity;

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 140);

  // --- lights
  const key = new THREE.SpotLight(L.key.color, L.key.intensity, 0, L.key.angle, L.key.penumbra, 1.4);
  key.position.set(...L.key.position);
  key.target.position.set(0, 0, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0004;
  key.shadow.radius = 4;
  scene.add(key, key.target);

  const rim = new THREE.SpotLight(L.rim.color, L.rim.intensity, 0, L.rim.angle, L.rim.penumbra, 1.4);
  rim.position.set(...L.rim.position);
  rim.target.position.set(0, 1, 0);
  scene.add(rim, rim.target);

  const accent = new THREE.PointLight(L.accent.color, L.accent.intensity, L.accent.distance, 2);
  accent.position.set(...L.accent.position);
  scene.add(accent);

  // --- glossy floor: mirror + dark gridded glass over it + shadow catcher
  const mirror = new Reflector(new THREE.PlaneGeometry(floorSize, floorSize), {
    textureWidth: width, textureHeight: height, color: 0x66788c, clipBias: 0.003,
  });
  mirror.rotation.x = -Math.PI / 2;
  scene.add(mirror);

  const gt = gridTexture(L.void, L.floor.grid_alpha);
  gt.repeat.set(floorSize / 1.6, floorSize / 1.6);
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(floorSize, floorSize),
    new THREE.MeshBasicMaterial({ map: gt, transparent: true, opacity: L.floor.reflection_dim, fog: true, depthWrite: false })
  );
  glass.rotation.x = -Math.PI / 2;
  glass.position.y = 0.002;
  scene.add(glass);

  const catcher = new THREE.Mesh(
    new THREE.PlaneGeometry(floorSize, floorSize),
    new THREE.ShadowMaterial({ opacity: 0.55, depthWrite: false })
  );
  catcher.rotation.x = -Math.PI / 2;
  catcher.position.y = 0.004;
  catcher.receiveShadow = true;
  scene.add(catcher);

  // --- post
  const composer = new EffectComposer(renderer);
  composer.setSize(width, height);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), L.bloom.strength, L.bloom.radius, L.bloom.threshold);
  composer.addPass(bloom);
  const bokeh = new BokehPass(scene, camera, { focus: 6, aperture: L.dof.aperture, maxblur: L.dof.maxblur });
  composer.addPass(bokeh);
  composer.addPass(new OutputPass());

  const focusPoint = new THREE.Vector3();
  function render() {
    // keep the look-at point sharp, everything else softens
    const d = camera.position.distanceTo(focusPoint);
    bokeh.uniforms.focus.value = THREE.MathUtils.clamp(d, 1.5, 18);
    composer.render();
  }

  function setSize(w, h) {
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    mirror.getRenderTarget().setSize(w, h);
  }

  return { renderer, scene, camera, composer, render, setSize, focusPoint, lights: { key, rim, accent }, look: L };
}

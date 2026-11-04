// Host: runs any "set" (an environment for one topic) with the shared studio, camera flow and transcript text layer.
//
// A set is a module:
//   { id, look,                                   // look = a preset name in tokens/lights.json
//     build({ studio, scene, camera, script, format }) -> {
//       update(t, ctx),                           // animate everything as a pure function of time t
//       getKeys(format),                          // camera keyframes [{ t, pos, look, fov }]
//       getAnchor(name, outVec3) -> boolean,      // world positions that 3D labels can pin to
//       setFormat?(format),                       // re-layout when switching 16:9 / 9:16
//       portrait: { fovScale, distScale },        // how the camera adapts in 9:16
//     } }
import { createStudio } from './studio.js';
import { createCameraFlow } from './cameraFlow.js';
import { createTranscriptText } from './transcriptText.js';

export function createHost({ set, script = null }) {
  const stage = document.getElementById('stage');
  const canvas = document.getElementById('c');
  const params = new URLSearchParams(location.search);

  let format = params.get('format') === '9x16' ? '9x16' : '16x9';
  let longSide = parseInt(params.get('w') || '1280', 10);
  let textOn = true;
  const dims = () => (format === '9x16' ? [Math.round(longSide * 0.5625), longSide] : [longSide, Math.round(longSide * 0.5625)]);
  let [W, H] = dims();

  const studio = createStudio(canvas, { width: W, height: H, look: set.look });
  const { scene, camera } = studio;
  const inst = set.build({ studio, scene, camera, script, format });
  let flow = createCameraFlow(inst.getKeys(format));
  const duration = Math.max(flow.duration, script?.duration || 0);
  const text = createTranscriptText({ root: document.getElementById('text'), script, getAnchor: inst.getAnchor, camera });

  let t = parseFloat(params.get('t') || '0');
  let playing = !params.has('t') && !params.has('paused');

  function frame() {
    const port = format === '9x16' ? inst.portrait || { fovScale: 1, distScale: 1 } : { fovScale: 1, distScale: 1 };
    const look = flow.apply(camera, t, port);
    camera.updateMatrixWorld(true);
    studio.focusPoint.copy(look);
    inst.update(t, { format, studio, look });
    text.update(t, { enabled: textOn });
    studio.render();
  }

  function layout() {
    const bar = 52;
    const aw = window.innerWidth, ah = window.innerHeight - bar;
    const ratio = W / H;
    let w = aw, h = aw / ratio;
    if (h > ah) { h = ah; w = ah * ratio; }
    stage.style.width = w + 'px';
    stage.style.height = h + 'px';
    stage.style.fontSize = Math.max(9, w * (format === '9x16' ? 0.04 : 0.0155)) + 'px';
    stage.dataset.format = format;
  }

  function setFormat(f, side) {
    format = f;
    if (side) longSide = side;
    [W, H] = dims();
    studio.setSize(W, H);
    inst.setFormat?.(format);
    flow = createCameraFlow(inst.getKeys(format));
    layout();
    frame();
  }

  const btnPlay = document.getElementById('play');
  const btnFmt = document.getElementById('fmt');
  const btnTxt = document.getElementById('txt');
  const labelFmt = () => (btnFmt.textContent = format === '9x16' ? 'Switch to 16:9' : 'Switch to 9:16');
  btnPlay.onclick = () => { playing = !playing; btnPlay.textContent = playing ? 'Pause' : 'Play'; };
  btnFmt.onclick = () => { setFormat(format === '9x16' ? '16x9' : '9x16'); labelFmt(); };
  btnTxt.onclick = () => { textOn = !textOn; btnTxt.textContent = textOn ? 'Text: on' : 'Text: off'; frame(); };
  btnPlay.textContent = playing ? 'Pause' : 'Play';
  labelFmt();
  window.addEventListener('resize', layout);

  inst.setFormat?.(format);
  window.__kit = {
    setTime: (s) => { t = s; frame(); },
    setFormat,
    setText: (on) => { textOn = on; frame(); },
    duration,
    ready: true,
  };

  let last = performance.now();
  function loop(now) {
    const dt = (now - last) / 1000; last = now;
    if (playing) { t += dt; if (t >= duration) t = 0; frame(); }
    requestAnimationFrame(loop);
  }
  layout();
  frame();
  requestAnimationFrame(loop);
}

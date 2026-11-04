# de-tech-ify Style Bible (v0.2 DRAFT)

Realistic 3D explainers for IT and AI. Primary look: **dark glossy studio, premium hardware, data shown as light** (the Branch Education lineage). Two techniques are borrowed from other channels and used on purpose, not by accident (section 7).

Items marked **[TUNE]** are starting values, to be adjusted by eye or by measurement.

## 0. How this kit is used
Claude Design reads this repo. A separate skill turns each voiceover into an SRT plus a brief that names a background image per scene (from `ui/screenshots/CATALOG.md`), a motion recipe (`motion/still-motion.md`) and the text cues. Backgrounds are a universal library of generated stills, each a different environment and colour theme; the 3D sets and `topics/` are optional reference. The look rules below (glossy realism, data as light, orange brand accent, text layer) stay the same everywhere.

## 1. The look in one line
Real-looking hardware floating in a dark, reflective studio. Soft top light, cool rim, one warm orange accent. Data is light.

## 2. Formats
| | Short / Reel | YouTube |
|---|---|---|
| Aspect | 9:16, 1080x1920 | 16:9, 1920x1080 |
| Frame rate | 60 fps **[TUNE]** | 30 fps **[TUNE]** |
| Scene source | Same scenes as long-form | Scenes of 10-40 s |
| Camera | Same keyframes, vertical fov x1.55, tighter single subject | Wide, room for panels |
| Layout | `layouts/shorts-9x16.md` | `layouts/youtube-16x9.md` |

One scene file serves both formats. Never build a separate "vertical version".

## 3. Materials
- Dark metal chassis (`metal_dark`, `metal_mid`), metalness 0.6-0.9, roughness 0.3-0.5.
- Detail comes from textures, not geometry: vent perforations, drive bays, port blocks, screws, labels.
- LEDs and screens are emissive maps. Only emissive things glow.
- No flat shading, no outlines, no cartoon colours.

## 4. Lighting and post
- Key: soft cool-white spot from above. Rim: faint cyan from behind. Accent: small warm orange point light low on one side.
- Environment reflections low (about 0.3) so metal shows soft highlights.
- Floor: dark mirror with a faint grid, reflecting the objects.
- Bloom threshold at 1.0 so only emissive light blooms. Strength about 0.3 **[TUNE]**.
- Depth of field follows the camera's look-at point. Everything else softens.
- Light-pool beats: calm = studio_dark. Tension = shift accent to alert red. Reveal = brighten the rim.
- Values live in `tokens/lights.json` and are read by `components/studio.js`.

## 5. Data visual language
| Thing | Look |
|---|---|
| Normal data | Cyan light bars travelling along glowing cables |
| Important / brand / the thing being explained | Orange |
| OK / healthy | Green LED |
| Warning | Amber |
| Attack / failure | Red, with a camera shake and flash |
| Direction | Packets move along the cable; reverse direction for responses |
- Cables are real objects (dark, glossy) with a glow core, not lines.
- Packets are short bars, their length varying slightly with speed.

## 5b. Words on screen (transcript-synced)
Realistic background, infographic text on top. Three layers, all driven by the transcript (`prompts/transcript-format.md`):
- **Captions:** 2-4 words at a time at the bottom, current word orange.
- **Keyword cards:** a big term or number pops in as it is spoken, glass panel with an orange bar.
- **3D labels:** pills pinned to objects with a thin leader line (addresses, "duplicate row", "weak point").
Never the whole transcript. Reference implementation: `components/transcriptText.js`.

## 6. Overlays
- Spec tables and labels are glass panels: translucent blue-slate, thin light border, blurred backdrop, big readable numbers, orange values.
- One overlay on screen at a time. It fades in on a reveal beat and out before the next camera move.
- Channel wordmark (`@De_Tech_ify_with_Tarn`) bottom-right on section-break cards only.
- Terminal and UI screens appear on in-world monitors first, then the camera pushes into them.
- Text size: 36 px or bigger on Shorts, 28 px or bigger on YouTube.

## 7. Borrowed techniques (use deliberately)
- **Scale ladder** (Big Data Factor): a labelled vertical list on one edge showing units (byte, kilobyte, megabyte...) with the current one highlighted, while objects grow to true relative scale. Use for storage, bandwidth, "how big is X".
- **Diagram mode** (Animagraffs): colour-code the two sides of a system (for example red = ISP, blue = VPN), put address labels on devices, trace the path with ribbon streams. Use for networking and security flows. Switch back to studio mode for hardware.

## 8. Camera
- Hold most of the time, then move in short ease-out bursts.
- Flow: one shot hands off to the next by following an object, passing through a screen or port, or rising to reveal scale. No graphic wipes.
- Low camera heights for hero hardware. High pull-back for reveals.
- Recipes in `motion/camera.md`. Implementation in `components/cameraFlow.js`.

## 9. Do / Don't
**Do**
- Illustrate every spoken sentence with a literal object or flow.
- Keep one focal point per shot.
- Reuse scenes and components across a series.
- Build everything procedurally or from CC0 assets, and log them.

**Don't**
- No clip-art, stock icons, or gradient-mesh backgrounds.
- No cartoon characters in this kit.
- No real IPs, hostnames, tokens or client data on screen.
- No other creators' frames, models or logos anywhere in the repo.

## 10. Technical constraints (Claude Design runs in the browser)
- Scenes are web code: three.js modules in `components/`, `sets/` and `scenes/`.
- Models must be GLB under 5 MB each. Procedural geometry preferred.
- No network calls at runtime. Everything bundles into one HTML file (`npm run build:scene`).
- The look is "clean real-time glossy", not path-traced. Do not promise Blender-quality renders.

## 11. Still to define
- Final type choices and brand overlay layout
- More object families: network gear, laptops, phones, chips and SSD cutaways, padlock/firewall
- Light presets for diagram mode and alert mode
- Fps and export settings

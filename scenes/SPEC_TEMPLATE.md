# Scene spec: <name>

Copy into `scenes/<slug>/SPEC.md`.

## Identity
- **Slug:**
- **Topics it suits:** (storage, networking, security, cloud, AI...)
- **Mood / light preset:** (from `tokens/lights.json`)

## Contents
- **Components used:** (studio, rack, dataStreams, cameraFlow, new ones)
- **Key objects:**
- **Where screens go:** (monitors that can show `ui/screenshots/`)

## Camera
- **Keyframes:** (time, position, look-at, fov)
- **Beats:** (what the camera does while the voiceover says what)
- **Portrait handling:** vertical fov scale, any framing change

## Overlays
- (Glass panels, scale ladder, labels: when they appear)

## Hooks
- `window.__kit.setTime(s)`, `window.__kit.setFormat('9x16'|'16x9')`, `window.__kit.duration`

## Build and check
- `npm run build:scene -- scenes/<slug>`
- Render stills at 3-5 times in both formats and look at them before shipping.

## Licence
- Every external asset has a row in `LICENSES.md`: yes / no

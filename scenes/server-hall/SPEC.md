# Scene spec: server-hall

## Identity
- **Slug:** server-hall
- **Topics it suits:** data centres, cloud infrastructure, networking, "what is a server", storage, outages
- **Mood / light preset:** `studio_dark`

## Contents
- **Components:** `studio`, `rack` (x24, procedural), `dataStreams` (9 curves, 34 packets each), `cameraFlow`
- **Key objects:** two facing rows of 12 racks, overhead cable arcs between rows, a backbone cable down the aisle, warm orange light spill at the end of the aisle
- **Where screens go:** none yet. Add monitor props to the aisle ends for UI screenshots.

## Camera (14 s loop)
| Time | Move |
|---|---|
| 0-4 s | Low, wide shot from the aisle mouth, slow push-in |
| 4-7 s | Reframe to the left rack row, close on rack faces |
| 7-10 s | Rise over the racks, flow toward the far row |
| 10-14 s | Pull back and up to reveal the hall |

## Overlays
- Glass spec panel (demo values) fades in at 8.4 s and out at 12.8 s. Right side on 16:9, bottom on 9:16.

## Hooks
- `window.__kit.setTime(s)`, `window.__kit.setFormat('9x16'|'16x9')`, `window.__kit.duration`

## Known gaps
- Walls and ceiling are absent (void), by design.
- Racks have no open doors or cutaway yet.
- Packet bars read chunky at very close range.

## Licence
- All geometry and textures generated in code. No external assets.

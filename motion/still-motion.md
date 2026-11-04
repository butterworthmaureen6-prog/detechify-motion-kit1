# Animating still images (v0.3 DRAFT)

The backgrounds in `ui/screenshots/` are stills. Claude Design brings them to life with camera-style motion and light, never with fake 3D geometry. All motion is a pure function of time from the audio.

| Recipe | Use for | How |
|---|---|---|
| `push-in` | Any calm beat | Scale 1.00 -> 1.08 over the scene, ease-out, focal point on the subject |
| `tilt-reveal` | Tall 9:16 images, showing scale | Start on the top third, slide down to the bottom third over 3-5 s |
| `drift-parallax` | Idle hold | Split foreground / midground / background by depth, move them 1-3% apart, very slow |
| `burst-reframe` | Moving attention | Fast ease-out move to a new crop (2-3 s) then hold |
| `zoom-through` | Moving to the next image | Push into the vanishing point or a bright opening, next image scales up out of it |
| `light-sweep` | Emphasis on a key word | Soft highlight band crossing the image once, 0.6 s |
| `rack-focus` | Pull attention | Blur the background and sharpen the foreground (or the reverse) over 0.5 s |
| `flash-hit` | Hook or breach | 2-4 frame white or red flash with a short decaying shake |
| `colour-wash` | Mood change inside one image | Cross-fade a tint (amber -> red, red -> green) over 12-20 frames |

## Foreground effects (built in code on top of the still)
- Data as light: short cyan or accent-coloured light bars sliding along implied paths (cables, aisles, corridors).
- Glass panels: dark translucent panels with a thin accent edge for keyword cards and spec lists.
- Pulses and rings at a point to show a hit, a lookup or a connection.
- Counters and bars for numbers (real inertia, no bounce).

## Rules
- Hold most of the time; under ~30% of the timeline in motion.
- No bounce, overshoot or elastic easing.
- One image per scene. Change image on a story beat, not on every caption.
- Between two images use `zoom-through`, `colour-wash` or a hard cut hidden in a `flash-hit`.
- Never stretch an image. The library is 9:16 for now. If a 16:9 video is ever made before landscape twins exist, use a centre crop with `tilt-reveal`, never a stretched fill.
- Text is a separate layer on top (captions, keyword cards, labels). Use the image's `accent` colour from `ui/screenshots/CATALOG.md`.

# Camera recipes (v0.2 DRAFT)

Implemented in `components/cameraFlow.js`. Give it keyframes `{ t, pos, look, fov }`. It builds smooth spline paths and eases each segment with a fast start and slow settle. DOF focus follows the look-at point.

General rule: hold most of the time, then move in short bursts.

| Recipe | Use for | How |
|---|---|---|
| `hold-push` | Any calm beat | Two close keyframes with a tiny position change over the hold |
| `burst-reframe` | Moving attention to a new object | Two keys 2-3 s apart, large position change |
| `low-hero` | Making hardware feel big | Camera 0.4-0.8 m high, looking slightly up |
| `rise-reveal` | Showing scale | Raise camera 1.5-3 m while pulling back and widening fov slightly |
| `follow-packet` | Handing off between objects | Camera look-at tracks a packet's curve; next scene begins where it lands |
| `screen-dive` | Entering a program or network | Push until a monitor fills the frame, then cut to its content |
| `dutch-tilt` | Failure, breach | Add 5-12 degree roll, snap back on resolve (not yet in the component) |
| `impact-shake` | Crash, alert | 4-6 frame decaying positional shake plus a one-frame flash (not yet in the component) |

## Depth of field by beat
- Calm explanation: current default (aperture 0.00015).
- Tension: tighter subject, stronger blur.
- Reveal: lower blur so everything is readable.

## Timing
- Every visual reaction lands 0-3 frames before the word it illustrates.
- No more than about 30% of the timeline should be in motion.
- Portrait: multiply fov by 1.55 and keep the same keys.

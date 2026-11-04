# Scene block template

One block per scene in the brief. A scene is one idea, one place, one light preset.

```
SCENE {{n}}: {{name}}                                  {{start}} to {{end}} s
Spoken idea : {{one sentence of what the voice says here, quoted exactly or paraphrased}}
Beat        : {{HOOK | SETUP | PROBLEM | MECHANISM | EXAMPLE | REVEAL | PAYOFF ...}}
Image       : {{file from ui/screenshots/CATALOG.md}}  accent: {{hex from the catalog}}
Why         : {{one line: mood / tag match}}
Foreground  : {{effects built on top: data-light bars, rings, counters, panels}}
Motion      : {{A appears, then B happens, then C changes; timestamped for key moments}}
Camera      : {{recipe from motion/still-motion.md}}: start crop -> end crop, speed
Handoff     : {{zoom-through | colour-wash | flash-hit | cut}}
Text        : keywords: {{term at time}}; labels: {{[x,y] + text + time window}}
Format notes: 16:9 {{...}} | 9:16 {{...}}
```

Rules:
- Use a different image per scene.
- Scenes tile the audio from 0.0 s to the end with no gaps.
- Every stressed word has a visual beat at its start time.

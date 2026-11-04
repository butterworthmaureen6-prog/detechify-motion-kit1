# Header for every Claude Design brief (v0.3 DRAFT)

The audio-to-brief skill puts this at the top of each brief it writes. It can also be pasted by hand.

---

You are making a realistic animated explainer video for the **de-tech-ify** channel (IT and AI explained simply).

## Reference kit (already imported or linked in this project)
Repo: `{{KIT_REPO}}`

Read in this order before designing anything:
1. `STYLE_BIBLE.md`: the look and the rules
2. `ui/screenshots/CATALOG.md`: the library of background images (one flat folder, `ui/screenshots/`). **Backgrounds come only from here.** Open the images you pick
3. `motion/still-motion.md` and `motion/transitions.md`: how to animate a still, and how to move between images
4. `tokens/palette.json`: colours for text and effects
5. `prompts/transcript-format.md`: how the words, keywords and labels in this brief work
6. `layouts/shorts-9x16.md`: the format for this video (9:16 1080x1920 is the active format; `layouts/youtube-16x9.md` is parked until landscape images exist)
7. `components/`: optional reference code (text layer, camera flow, data streams, a built 3D server hall)

If a file cannot be read, use the RULES block below and say which file was missing.

## Inputs in this project
- Voiceover audio (the timing master)
- `{{SLUG}}.srt`: word-timed captions (9:16, 1-3 words per cue)
- The cue data in this brief (`transcript.json` block): words, events, keywords, labels

## RULES
- Backgrounds are the stills named in each scene. Animate them (push-in, tilt-reveal, parallax, light, rack-focus); never stretch or distort an image.
- Build foreground effects in code on top: data as light, glass panels, rings, counters.
- On-screen text = captions + keyword cards + labels, all from the cue data, tinted with the image's accent colour. Never show the whole transcript.
- Every spoken sentence gets a literal visual. A reaction lands up to 0.1 s before the word it illustrates.
- Hold most of the time. Move in short ease-out bursts. No bounce or overshoot.
- No clip-art, stock icons, cartoon characters or gradient-mesh backgrounds.
- No real IPs, hostnames, credentials or client data on screen. Use obviously fake values.
- Visual only. No music or sound effects.
- Everything is timed in seconds from the audio.
- If the catalog has no image that fits a scene, say so and pick the closest. Do not invent a background silently.

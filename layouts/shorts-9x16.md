# Layout: Shorts / Reels (9:16, 1080x1920)

## Safe zones
- Keep key content inside x: 60-1020 and y: 220-1500. Platform UI covers the top ~200 px and the bottom ~400 px **[TUNE]**.
- Nothing critical in the bottom 400 px.

## Composition
- One hero object per shot, filling 40-70% of frame height in close shots.
- Use the vertical axis: stack depth (foreground rack edge, hero, glowing background).
- Camera keyframes are shared with 16:9. The portrait fov is multiplied by 1.55 (`format === '9x16'` in the scene).
- Glass panels sit in the lower third, above the safe-zone line (bottom 14% in `server-hall`).
- Scale ladder runs down the left edge, 8% in from the border.

## Pacing
- Visual change at least every 2-3 seconds: camera move, new object, or a flow handoff.
- Voice starts on frame 1-4. No logo intro.
- Each spoken sentence gets a literal visual. Reaction lands 0-3 frames before the word.

## Output
- 1080x1920 at 60 fps **[TUNE]**.

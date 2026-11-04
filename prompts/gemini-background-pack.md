# Gemini background pack (35 images)

Universal background library for Claude Design. Each image has a different environment and a different colour theme, so any topic can pick what fits.

## How to run it
1. Use Gemini's image generation (Nano Banana). One image per message, new chat per 5-6 images to stop it drifting.
2. For each image send: the STYLE HEADER below, then the scene line. The aspect ratio is fixed at `9:16 vertical portrait` for now.
3. Save as JPG (quality ~85, under ~800 KB) with the **exact file name** in the heading, into `ui/screenshots/` in the repo.
4. If an image has any text, a person or a logo, regenerate it. If it is dull, add "more dramatic light" and try again.
5. Later, if we need 16:9 YouTube videos, rerun the list with the aspect line changed to `16:9 widescreen landscape` and save each as `<same name>-16x9.jpg`. Not needed yet.

## Batch mode (one chat, many images)
Paste this once, then type `next` after each image:

> I will give you a style header and a numbered list of scenes. Each time I say "next", generate exactly one image for the next scene in the list, in order, using the style header (9:16 vertical portrait). Do not add text, people or logos. Say only the scene number and name after each image. Start with scene 1 now.

Then paste the STYLE HEADER and the full scene list below. Start a fresh chat every 6-8 images so the style does not drift.

## STYLE HEADER (paste this before every scene line, once per image)

Photorealistic cinematic photograph, 9:16 vertical portrait, ultra-detailed, shot on a high-end cinema camera. Real physical environment lit by real light sources, glossy and reflective surfaces, shallow depth of field on distant elements, subtle volumetric haze. Clear foreground, midground and background layers so the image can be animated with parallax. The lower 40% of the frame is darker and calmer with no bright hotspots, so captions stay readable. IMPORTANT: no text, no letters, no numbers, no logos, no watermarks, no people, no readable screens, no UI. Not a grid, wireframe, particle field or abstract gradient. The scene:

## Scenes

### 1. `bg-01-server-aisle-orange.jpg`  (orange / black)
An endless aisle between two rows of black server racks stretching away to a distant open door that spills warm orange light across a glossy black floor with soft reflections.

### 2. `bg-02-rack-fronts-cyan.jpg`  (cyan / navy)
Close view of the fronts of tall server racks filled with thousands of tiny cyan status LEDs, shallow depth of field so distant racks melt into soft cyan bokeh.

### 3. `bg-03-fibre-strands-magenta.jpg`  (magenta / violet)
Macro photograph of fibre optic strands fanning out, their tips glowing magenta and violet, creamy bokeh in the background.

### 4. `bg-04-circuit-board-emerald.jpg`  (emerald / gold)
Macro of an emerald green circuit board with gold traces and tiny surface-mount components, tilt-shift focus along a diagonal, warm top light.

### 5. `bg-05-silicon-die-ice.jpg`  (ice blue / silver)
Extreme macro of a silicon processor die, layered metallic structures with iridescent reflections, cold ice-blue and silver light.

### 6. `bg-06-vault-door-red.jpg`  (red / black)
A massive round steel vault door at the end of a dark concrete corridor, lit only by red emergency lights, faint haze in the air.

### 7. `bg-07-ops-room-amber.jpg`  (amber / charcoal)
A dark network operations room seen from behind the desks, wall of large monitors showing only soft abstract colour glow (no readable content), amber desk lamps.

### 8. `bg-08-subsea-cable-teal.jpg`  (teal / deep blue)
An armoured internet cable lying on a sandy seabed running into the deep blue distance, shafts of sunlight from above, teal and deep blue water.

### 9. `bg-09-satellite-dishes-dusk.jpg`  (purple / orange)
A field of large white satellite dishes at twilight under a purple and orange sky, long shadows, slight lens flare.

### 10. `bg-10-cell-tower-night.jpg`  (blue hour / cyan)
A telecom mast at blue hour rising above a hazy city, cool blue sky, small warm and cyan aviation lights, city lights as soft bokeh below.

### 11. `bg-11-cable-tray-lime.jpg`  (lime / graphite)
Looking along an overhead cable tray in a dark ceiling, hundreds of neatly bundled cables receding to a vanishing point, lime green status lights.

### 12. `bg-12-cooling-pipes-blue.jpg`  (cold blue / white)
Industrial liquid cooling pipes and valves with beads of condensation, cold blue-white light, steel and glass reflections.

### 13. `bg-13-gpu-fans-violet.jpg`  (violet / black)
Close view of a dense GPU server, big heatsinks and fan rings glowing violet, deep shadows between components.

### 14. `bg-14-glass-corridor-gold.jpg`  (gold / black)
A long futuristic glass-walled corridor with warm gold light strips along the ceiling and a reflective black floor, strong one-point perspective.

### 15. `bg-15-datacentre-exterior-dawn.jpg`  (pink / grey-blue)
A huge windowless data centre building with cooling units on the roof at dawn, pink horizon fading to grey-blue sky, empty car park in the foreground.

### 16. `bg-16-switchgear-yellow.jpg`  (yellow / black)
An industrial power room with grey switchgear cabinets and thick copper busbars, yellow safety lighting, deep black shadows.

### 17. `bg-17-patch-panel-coral.jpg`  (coral / teal)
A small comms cabinet with a patch panel and neat coral and teal Ethernet cables looping between ports, shallow depth of field.

### 18. `bg-18-lab-bench-light.jpg`  (white / pale blue)
A clean white and brushed-steel hardware lab bench with a soldering station and neatly laid tools, soft pale-blue daylight from a window. A bright, airy image.

### 19. `bg-19-open-door-blue.jpg`  (blue / white)
A dark corridor ending in an open doorway that reveals a bright blue-lit server room, strong light spill on the floor, silhouette framing.

### 20. `bg-20-drive-bays-tungsten.jpg`  (tungsten / brown)
A wall of storage drive bays with several trays partly pulled out, warm tungsten glow from inside, shallow depth of field.

### 21. `bg-21-tape-library-mint.jpg`  (mint / grey)
A robotic tape library, rows of data cartridges on shelves, a robotic picker mid-aisle, mint green status lights, cool white overhead light.

### 22. `bg-22-server-cage-sodium.jpg`  (sodium orange / concrete)
A padlocked steel mesh cage around server racks, harsh orange-white sodium light, thick shadows on a concrete floor.

### 23. `bg-23-neon-street-rain.jpg`  (magenta / cyan)
A rain-slick city street at night, neon reflections smeared across wet asphalt, signs completely out of focus so nothing is readable, magenta and cyan lights.

### 24. `bg-24-dark-desk-green.jpg`  (phosphor green / black)
An empty desk in a dark room, three monitors off-frame casting green phosphor light across a keyboard and mug, rain on a window, no readable content.

### 25. `bg-25-cleanroom-fab-amber.jpg`  (amber-yellow / steel)
A semiconductor cleanroom with the characteristic yellow filtered light, wafer carriers and stainless equipment in neat rows.

### 26. `bg-26-robot-arm-copper.jpg`  (copper / black)
An industrial robot arm paused in a dark facility, copper-coloured rim light tracing its joints, soft haze.

### 27. `bg-27-metal-slabs-medallion.jpg`  (bronze / silver / gold)
Three thick polished slabs, bronze, silver and gold, stacked at staggered heights on a dark studio floor, soft box lighting, subtle reflections.

### 28. `bg-28-retro-server-room-beige.jpg`  (beige / olive)
A 1990s server room with beige cabinets, thick grey cables under a raised floor, dusty fluorescent light, warm faded colours.

### 29. `bg-29-earth-night-orbit.jpg`  (deep blue / gold)
Earth from low orbit at night, city lights as warm gold clusters, thin blue atmosphere line along the curve, deep black space.

### 30. `bg-30-rain-window-bokeh.jpg`  (soft teal / white)
Raindrops on a window with soft out-of-focus city lights behind, calm teal and soft white tones, very low contrast.

### 31. `bg-31-storm-datacentre-violet.jpg`  (violet-white / slate)
A lightning storm over a lone data centre in open countryside, violet-white lightning, dramatic dark clouds, long exposure feel.

### 32. `bg-32-concrete-shaft-mono.jpg`  (monochrome grey)
A minimal brutalist concrete room with one shaft of white light falling on a single black server cabinet, monochrome greys.

### 33. `bg-33-thermal-rack.jpg`  (thermal purple / orange)
A thermal-camera style view of a server rack, hot spots in orange and red, cooler areas in purple and dark blue, no text overlays.

### 34. `bg-34-cable-spaghetti-multicolour.jpg`  (multicolour / dark)
A dense tangle of colourful Ethernet and power cables spilling from a rack, macro view, chaotic, bright multicolour, deep shadows.

### 35. `bg-35-white-cyc-orange.jpg`  (white / orange)
A bright seamless white photography studio (cyclorama) with soft shadows and a single warm orange light cast on the floor, empty, very clean.

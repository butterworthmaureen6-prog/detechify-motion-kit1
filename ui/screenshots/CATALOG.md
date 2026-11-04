# Image catalog

Claude Design and the audio-to-3d-explainer-prompt skill pick backgrounds from this table. Keep it in sync with the files in this folder: if you rename, add or delete an image, edit its row. All images are portrait 9:16 for now (Shorts and Reels). Landscape twins (`-16x9.jpg`) can be added later for YouTube.

Columns: **accent** is the colour the on-screen text (keyword cards, active caption word, label pills) should use on top of that image. **mood** and **tags** are how a scene gets matched to an image.

| # | file | subject | palette | accent | mood | tags |
|---|---|---|---|---|---|---|
| 1 | `bg-01-server-aisle-orange.jpg` | Server aisle, orange glow | orange / black | #ff8a2b | calm, epic | datacentre, scale, aisle, leading-lines |
| 2 | `bg-02-rack-fronts-cyan.jpg` | Rack fronts, cyan LEDs | cyan / navy | #4fd8ff | calm, technical | servers, flow, leds, close-up |
| 3 | `bg-03-fibre-strands-magenta.jpg` | Fibre strands, magenta | magenta / violet | #ff5fd2 | elegant, flow | network, fibre, macro, data-in-motion |
| 4 | `bg-04-circuit-board-emerald.jpg` | Circuit board, emerald | emerald / gold | #3dff8f | precise, hardware | hardware, chip, macro, components |
| 5 | `bg-05-silicon-die-ice.jpg` | Silicon die, ice blue | ice blue / silver | #b9e6ff | clinical, deep | cpu, inside-chip, ai, macro |
| 6 | `bg-06-vault-door-red.jpg` | Vault door, red alert | red / black | #ff4d5e | tense, alert | security, vault, breach, alert |
| 7 | `bg-07-ops-room-amber.jpg` | Ops room, amber | amber / charcoal | #ffc83d | focused, watchful | monitoring, soc, control-room |
| 8 | `bg-08-subsea-cable-teal.jpg` | Subsea cable, teal | teal / deep blue | #2fe0c8 | vast, calm | internet, global, cable, scale, ocean |
| 9 | `bg-09-satellite-dishes-dusk.jpg` | Satellite dishes, dusk | purple / orange | #ff9f6b | wide, hopeful | wireless, global, outdoors, satellite |
| 10 | `bg-10-cell-tower-night.jpg` | Cell tower, blue hour | blue hour / cyan | #6bb6ff | quiet, connected | 5g, network, city, wireless |
| 11 | `bg-11-cable-tray-lime.jpg` | Cable tray, lime | lime / graphite | #c6ff3d | orderly, structured | cabling, structure, leading-lines, pipeline |
| 12 | `bg-12-cooling-pipes-blue.jpg` | Cooling pipes, cold blue | cold blue / white | #7fd0ff | cool, industrial | cooling, infrastructure, pipes |
| 13 | `bg-13-gpu-fans-violet.jpg` | GPU server, violet | violet / black | #9b6bff | powerful, intense | ai, gpu, compute, close-up |
| 14 | `bg-14-glass-corridor-gold.jpg` | Glass corridor, gold | gold / black | #ffcf5a | flowing, premium | pipeline, flow, transition, zoom-through |
| 15 | `bg-15-datacentre-exterior-dawn.jpg` | Data centre exterior, dawn | pink / grey-blue | #ff9ec4 | quiet, scale | cloud, exterior, scale, outdoors |
| 16 | `bg-16-switchgear-yellow.jpg` | Switchgear, yellow | yellow / black | #ffe14d | heavy, serious | power, infrastructure, industrial |
| 17 | `bg-17-patch-panel-coral.jpg` | Patch panel, coral | coral / teal | #ff7a6b | friendly, small-scale | patch-panel, networking, cables, small-scale |
| 18 | `bg-18-lab-bench-light.jpg` | Hardware lab bench, light | white / pale blue | #3a86ff | airy, calm | light, desk, maker, hardware, clean |
| 19 | `bg-19-open-door-blue.jpg` | Open door to server room | blue / white | #4d8dff | reveal, entry | reveal, entry, door, transition |
| 20 | `bg-20-drive-bays-tungsten.jpg` | Drive bays, tungsten | tungsten / brown | #ffb066 | warm, archival | storage, database, drives |
| 21 | `bg-21-tape-library-mint.jpg` | Tape library, mint | mint / grey | #3dffb0 | methodical, archival | archive, backup, storage, robotics |
| 22 | `bg-22-server-cage-sodium.jpg` | Locked server cage, sodium | sodium orange / concrete | #ff6a3d | guarded, gritty | access-control, cage, security, physical |
| 23 | `bg-23-neon-street-rain.jpg` | Neon street, rain | magenta / cyan | #ff4fa3 | noir, threatening | cyber, urban, attacker, noir |
| 24 | `bg-24-dark-desk-green.jpg` | Dark desk, green glow | phosphor green / black | #35ff7a | secretive, quiet | hacker, desk, attacker, terminal |
| 25 | `bg-25-cleanroom-fab-amber.jpg` | Chip fab cleanroom | amber-yellow / steel | #ffb300 | precise, industrial | chip, manufacturing, fab, hardware |
| 26 | `bg-26-robot-arm-copper.jpg` | Robot arm, copper | copper / black | #e08a4a | automated, patient | automation, agent, robotics |
| 27 | `bg-27-metal-slabs-medallion.jpg` | Bronze, silver, gold slabs | bronze / silver / gold | #d9a441 | structured, layered | layers, medallion, tiers, quality, studio |
| 28 | `bg-28-retro-server-room-beige.jpg` | Retro server room | beige / olive | #c9b27c | nostalgic, legacy | legacy, history, retro, old-school |
| 29 | `bg-29-earth-night-orbit.jpg` | Earth at night from orbit | deep blue / gold | #ffd27a | vast, global | global, cloud, scale, space |
| 30 | `bg-30-rain-window-bokeh.jpg` | Rain on window, bokeh | soft teal / white | #8ad7ff | calm, neutral | calm, soft, bokeh, neutral, background-for-text |
| 31 | `bg-31-storm-datacentre-violet.jpg` | Storm over data centre | violet-white / slate | #c7a6ff | dramatic, outage | outage, tension, power, weather |
| 32 | `bg-32-concrete-shaft-mono.jpg` | Concrete room, single light | monochrome grey | #ffffff | minimal, statement | minimal, monochrome, calm, statement |
| 33 | `bg-33-thermal-rack.jpg` | Thermal camera, server rack | thermal purple / orange | #ff7b00 | overload, pressure | heat, overload, performance, thermal |
| 34 | `bg-34-cable-spaghetti-multicolour.jpg` | Cable spaghetti | multicolour / dark | #ff9f1c | messy, chaotic | chaos, messy, problem, spaghetti, cables |
| 35 | `bg-35-white-cyc-orange.jpg` | White studio, orange | white / orange | #ff8a2b | clean, light | light, clean, minimal, explain, reveal |

## Picking rules
- One image per scene. Match the scene's mood first, then subject tags, then colour.
- Do not use the same image twice in a video unless it is a deliberate return.
- Neighbouring scenes should differ in palette unless the story is a single continuous moment. Use `light-shift` or `flow-follow` between similar ones.
- Problem / alert beats: red, thermal, storm, neon street, cable spaghetti. Fix / success beats: green, mint, white studio, calm blue.
- Calm explanation under lots of text: `bg-30`, `bg-32`, `bg-35`, `bg-18`.

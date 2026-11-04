# Topic: cloud and infrastructure

Use for: servers, data centres, containers, Kubernetes, CI/CD, storage, scaling, outages, DevOps, "what is a server".

## Set (environment)
The **server hall** (`sets/server-hall.js`, built and tested): two facing rows of racks, overhead cable arcs, warm orange light spill at the aisle end. Built from `components/rack.js`.

## Light and colour
- Preset: `studio_dark`. Outage or incident: shift the accent to alert red.
- Normal traffic = cyan light bars. Highlighted traffic or the thing being explained = orange. Healthy LED = green. Failing LED = red.

## Hero objects
- Server rack, individual servers (compute, storage and network faces), cable runs.
- For containers or services: glass cubes sitting on a rack, each with a label.
- Pipeline: a rail of glowing stations (build, test, deploy) with a package moving along it.
- Scale ladder (from Big Data Factor): labelled units down the left edge while objects grow to true relative scale. Use for storage and bandwidth.

## Motion vocabulary
- Traffic arcs between racks, packets travelling the aisle backbone.
- Scale-up: more racks light up one by one. Failure: one rack turns red, traffic reroutes around it.
- Cutaway: a server face swings open (not yet built, describe it clearly in the prompt).

## Camera
- Low wide shot from the aisle mouth, push in, reframe to a rack face, rise over the racks, pull back and up to reveal the hall.
- Recipes: `low-hero`, `burst-reframe`, `rise-reveal`, `follow-packet`.

## Text layer
- Keyword cards: terms and numbers ("Load balancer", "99.99% uptime").
- 3D labels pinned to rack tops using anchors like `rack:L3` (see `sets/server-hall.js`).

## Screens to supply (scrubbed)
- Cloud console, `kubectl` or Docker output, monitoring dashboard, pipeline run page.

## Avoid
- Real hostnames or account IDs. Use placeholders.

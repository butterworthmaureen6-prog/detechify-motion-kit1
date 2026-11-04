# Topic: cybersecurity

Use for: vulnerabilities, attacks, pentesting, secrets leaks, authentication, malware, incident response, defence.

## Set (environment)
Dark studio with a **vault / gateway** feel: a heavy door or firewall gate, glowing locks, a wall of log screens. Attacks are paths of red light, defences are cyan.

## Light and colour
- Preset: `studio_dark` for setup and explanation, `alert_red` for breach and attack moments.
- Attacker and danger = red. Defender and safe = cyan. Secrets and credentials = amber glow so they stand out.
- Success of the defence = brief green confirmation. Failure = red flash with a short camera shake.

## Hero objects
- Padlock, vault door, firewall gate, key objects (API keys as small glowing amber tokens).
- Code slab: a glass panel of code from which secrets visibly leak out as amber tokens.
- Log wall: a grid of small screens with scrolling lines, one turning red when something is wrong.
- Browser window and terminal as in-world monitors.

## Motion vocabulary
- Attack path: a red ribbon travelling through the system, stopping at each control it bypasses or hits.
- Leak: amber tokens drifting out of a code slab toward an unauthorised actor.
- Lockdown: the gate closes, the red path stops, the light shifts back to calm.

## Camera
- Low hero shots of doors and locks, slow push toward the weak point, `dutch-tilt` and `impact-shake` on the breach, `pull-back-reveal` to show the scope.
- Recipes: `low-hero`, `hold-push`, `dutch-tilt`, `impact-shake`, `screen-dive`.

## Text layer
- Keyword cards: the vulnerability's named handle or concept ("Hardcoded secret", "Open redirect"). Skip CVE numbers in short-form; use the named handle.
- 3D labels pinned to the weak point ("exposed key", "no auth check").
- Captions as usual.

## Screens to supply (scrubbed)
- Burp Suite, browser DevTools, Kali terminal output, a code snippet with the secret redacted.

## Avoid
- Real keys, tokens, hostnames or client data, even redacted-looking ones. Use obviously fake values.
- Glorifying attacks. Frame everything as how to understand and defend.

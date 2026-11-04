# Topic: networking

Use for: DNS, IP, routing, NAT, VPN, firewalls, ports, TCP/UDP, HTTP, Wi-Fi, how data travels.

## Set (environment)
"Diagram mode": a dark glossy studio with a **brighter, colour-coded plate** under each zone. Devices are recognisable real objects (router, switch, laptop, phone, server). Address labels sit on devices. A faint floor grid is allowed.

## Light and colour
- Preset: `diagram_bright` for diagram scenes, `studio_dark` for hardware close-ups.
- Zone colours: your side = cyan, other side = orange, untrusted or internet = slate, attacker = red. State the legend once on screen.
- Packets: short light bars on glowing cables. Responses travel the other way.

## Hero objects
- A packet as a small glass envelope with visible header layers (Ethernet, IP, TCP, data) that peel off hop by hop.
- Router, switch, firewall gate (a lit doorway the packets must pass), DNS server as a lookup desk.
- Address labels: private IPs in cyan, public in orange, ports as small tags.

## Motion vocabulary
- Follow one packet end to end ("follow-packet") so the viewer never loses it.
- NAT: the label on the packet changes as it passes the router.
- VPN: the packet gets wrapped in a second envelope and travels through a glowing tunnel tube.
- Latency and hops: travel time shown by packet speed, hop counter on a glass panel.

## Camera
- Slightly tilted, near-isometric wide shot to show the whole path, then close on one device per step.
- Recipes: `follow-packet`, `burst-reframe`, `rise-reveal`, `screen-dive` (into a router's table).

## Text layer
- Keyword cards: the protocol or term as it is said ("DNS", "NAT", "Handshake").
- 3D labels pinned to devices and packets: IPs, ports, header names.
- Scale ladder is not needed. Use a step counter ("Step 3 of 5") on a glass panel for long flows.

## Screens to supply (scrubbed)
- Wireshark capture, `ping`/`traceroute` output, router admin page, `nslookup` or `dig` results.

## Avoid
- Real public IPs, MAC addresses or hostnames. Use documentation ranges (192.0.2.x, 198.51.100.x, 203.0.113.x) or private ranges.

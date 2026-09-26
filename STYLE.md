# Design Scheme — Style Guide

Working rules for every piece produced in this project (Affinity via MCP scripts).
v2 — v1 derived from the 15 references in `components/` (numbers below = contact-sheet order);
v2 adds the Kontainer references (K1 = flyer `kontainer-…210727`, K2 = wordmark `…210755`,
K3 = emblem `…210752`).

## Concept in one line

**Armoured knights read by a machine.** Medieval subjects (plate armour, golems, heraldry)
seen through a targeting/scan interface: tracking boxes, coordinates, data tables, dithering,
pixel glitch — laid out with brutalist bluntness.

**Two registers** (v2). Every piece picks one, never mixes them on the same surface:

| Register | Mood | Ground | Type voice | Use for |
|---|---|---|---|---|
| **Scan** (v1) | loud, technical, HUD | ink `#0B0B0B` | heavy grotesk + mono | portfolio UI, project sheets, tools |
| **Night** (v2, Kontainer) | quiet, ritual, poster | charcoal `#1D1D1B` | italic serif + condensed serif | event flyers, covers, titles, the "about" voice |

The Night register keeps the old/new tension, but softer: a medieval-heraldic beast rendered
as a dithered pixel scan (K1), framed by calm symmetric typography.

## Pillars

| Pillar | Rule | Refs |
|---|---|---|
| Medieval subject | Knights, armour, golems, swords/bows, heraldic marks. The *subject* is old. | 4, 8, 11, 12 |
| Machine vision | The *treatment* is new: bounding boxes, leader lines, point clouds, HUD labels, numeric readouts. | 1, 9, 11, 12 |
| Pixel / dither | Halftone, dithered and pixel-block rendering; glitch displacement bands. Logos built on a pixel grid. | 3, 5, 10, 12 |
| Outline geometry | Components are stroke-only primitives. Type can be outline/inline too. | 7, 15 |
| Brutalist layout | Hard grid, visible rules, oversized edge-to-edge type, raw data blocks, index numbers. | 2, 5, 6, 13, 14 |

## Palette

Dark ground by default; one accent per piece, a second only as a signal.

| Role | Hex | Refs |
|---|---|---|
| Ground (ink) | `#0B0B0B` | 9, 10, 11, 12, 15 |
| Line / type on dark | `#E8E8E2` | 11, 15 |
| Primary accent — acid lime | `#C8F53C` | 5, 6, 7, 14 |
| Signal — scan red | `#FF2B1C` | 1, 9 |
| Alternate ground — electric blue | `#1F4BFF` | 2 |
| Paper (light variant) | `#EDEDE6` | 3, 13 |
| Night ground — charcoal | `#1D1D1B` | K2, K3 |
| Night type — lilac | `#C9C6F2` (approx., sampled from a screenshot) | K1 |
| Night neutral — steel grey | `#848482` | K2, K3 |
| Night deep — blue-black | `#0C1014` | K3 |

No gradients, no soft shadows. Glows allowed only as a scan/flare effect (3).
Night register: lilac + grey only, no lime/red; lilac for type and the pixel subject, grey for
wordmarks and emblems.

## Type

| Role | Character | Refs | Fonts |
|---|---|---|---|
| Title | Retro display with groove, outline on dark | 0.ai | **TAN - SPRING** (installed; personal-use licence) |
| Logo / mark | Guisol, outline only, 3 copies squashed vertically to 100 / 86 / 72 % | 15, 0.ai | **Guisol** (installed) |
| Display | Heavy grotesk, tight, huge, edge-to-edge | 13, 14 | Planta, Nebulica (both in refs) |
| Data / HUD | Monospace, uppercase, small, tabular | 5, 6, 12 | any mono (e.g. a pixel/terminal face) |
| Heraldic accent | Gothic / blackletter-like wordmark, used sparingly | 8, 6 | TBD |
| Night headline | Old-style italic serif, calligraphic caps, stacked centred lines | K1 | TBD — lookalikes: Cormorant Garamond Italic, EB Garamond Italic |
| Night wordmark | Very condensed high-contrast serif (Didone), tall, grey | K2 | TBD — lookalikes: Bodoni Moda condensed, Playfair Display SC |
| Night small text | Same italic serif, small, set in the four corners | K1 | as Night headline |

Licence check required before any commercial use (TAN - SPRING is personal-use only).

## Components (outline only)

- **Scan box** — rectangle, 2 px stroke, corner ticks, small label above-left.
- **Leader line** — hairline from a box to a label or a point; straight, no curves.
- **Point marker** — small square or dot clusters tracing a silhouette (9).
- **Data block** — mono text table with rules; numbered rows `001 002 003`.
- **Reticle / orbit** — concentric outline circles or ellipses (0.ai p.3 ellipse, 2).
- **Pixel logo** — letters built from grid squares; outline or solid blocks only.
- **Glitch band** — horizontal displaced strips of the image (12).
- **Corner frame** (Night) — six fixed slots: top-left time, top-centre emblem, top-right place;
  bottom-left date `07 • 02 • 26`, bottom-centre emblem, bottom-right label. Symmetric, generous
  margins, content centred between them (K1).
- **Emblem** (Night) — small symmetric mark: `«•»` chevrons around a vertical oval (K2, K3), or
  an outlined ellipse with a line-drawn figure inside (K1). Grey, solid or outline.
- **Dithered beast** (Night) — heraldic animal (horse, lion, stag) built from pixel strokes with
  wavy scan-line texture inside the body; lilac on black (K1).
- **Circle badge** (Night) — flat charcoal disc on blue-black holding the emblem; avatar/stamp use (K3).

## Tokens

- **Grid:** 8 px base; pixel-logo cell = 1 grid unit (or multiples).
- **Strokes:** 1 (hairline) / 2 / 4 / 8 px. Mitred joins, butt caps.
- **Corners:** 0 radius. Always.
- **Margins:** generous and blunt; type may bleed off the edge.

## Do / Don't

- Do: put one medieval subject at the centre and let the machine layer annotate it.
- Do: align everything to the grid; expose the grid with rules and index numbers.
- Don't: fill components (except pixel-logo blocks and deliberate accents).
- Don't: gradients, drop shadows, rounded corners, decorative script faces.
- Night: the italic serif is the one allowed "decorative" face; keep it roman-free and never
  outlined. Circles and ovals are allowed there (emblem, badge) — square corners still apply
  to every box and frame.
- Night: centre-axis symmetry; nothing touches the edges; one subject, one headline stack.

## Folder layout

- `components/` — reference images and source files.
- `scripts/` — reusable Affinity SDK scripts applying these rules.
- `exports/` — rendered outputs.

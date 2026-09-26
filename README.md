# design-scheme — La Pagina Barbara

Personal design system + portfolio homepage for Lorenzo (lorettin).
This README is the hand-off note for the next Kiro session: read it first, then `STYLE.md`.

Last updated: 2026-09-26.

## What is here

| Path | What |
|---|---|
| `STYLE.md` | The design scheme (v2). Two registers: **Scan** (v1, HUD/brutalist) and **Night** (v2, Kontainer flyer). Palette, type, components, rules, with the reference image each rule came from. |
| `components/` | Reference images from the user (15 originals, `0.ai` = La Radio Barbara source file, `Picky_20260926_170308.png` = BARBARA logo measurement ref, `kontainer-*.png` = Night register refs). Third-party / client material — do not publish. |
| `web/` | The homepage: `index.html`, `style.css`, `main.js`, `feed.xml`, `fonts/`. Plain HTML/CSS/JS, no build step, no libraries. |
| `scripts/`, `exports/` | Empty. Meant for reusable Affinity scripts and rendered output. |

## Current state of the website (`web/`)

Styling = **Night register** on the original two-box layout (the user asked for "less coding page", then "back to the previous page disposal"):

- Black ground; all type in grey `#848482` = the same grey as the BARBARA BARBARA mark. Dim grey `#5C5C5A` for labels, `#2A2A28` hairlines. **No lilac, no lime/red** (user rejected them).
- Fonts (copies in `web/fonts/`, also installed on the PC):
  - **TAN - SPRING** — site title "La Pagina Barbara", outline only (`-webkit-text-stroke`). Same font as "La Radio Barbara" in `0.ai`. Personal-use licence.
  - **Guisol** — the BARBARA BARBARA logo. Outline only; three copies per letter squashed **vertically only** to 100 / 86 / 72 % about a point 57 % down, glyphs stretched ×1.22. Numbers measured from `components/Picky_20260926_170308.png`. Dials: `--bb-stretch`, `--bb-origin` in `.bb-logo`.
  - **Cormorant Garamond Italic** (OFL, downloaded from Google Fonts) — all other text.
- Layout, top to bottom:
  - Top bar: name left, nav (Opere · Chi · Contatti) centre, live date + clock right (`26 • 09 • 26 — 21:35`).
  - Hero: left box (tag, title, italic intro), right box "Aggiornamenti" = site-updates feed. Boxes have **double L-bracket corners** (top-left + bottom-right), SVG symbol `#corner`.
  - "Ultime opere" horizontal slider (buttons, drag, arrow keys, scroll-snap), newest first.
  - BARBARA BARBARA logo absolutely positioned **bottom-right** of the hero (user asked for it there, as on their posters).
  - Below: Index of Works grid with filters, About, Contact, footer bar.
- Removed on request, do not bring back: knight-helm artwork, `«•»` emblems (all of them), HUD stuff (boot log, X/Y readout, crosshair, scanlines, scan beam, grid bg, lime ticker, glitch).

### Data

- Projects: `PROJECTS` array at the top of `web/main.js` (feeds both the slider and the grid).
- Site updates: `web/feed.xml` (RSS 2.0) — add a new `<item>` at the top. The page `fetch()`es it; on `file://` browsers block that, so `FEED_FALLBACK` in `main.js` is shown instead. Serve over http to see the real feed.

### Placeholders still to replace

Project descriptions/links (all `href: '#'`; "Iron Study" is invented), intro text, `hello@example.com`, `example.com` in `feed.xml`.

## How to preview

Open `web/index.html` directly, or serve it (needed for the feed):

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory "C:\Users\lorettin\OneDrive - amazon.com\Desktop\1 - projects\design-scheme\web"
```

Screenshots were taken with headless Edge (`msedge --headless=new --screenshot=... --window-size=1440,900`). Use a fresh `--user-data-dir` each time or you get stale cached CSS/JS.

## Affinity via MCP

- Affinity 3.3 (Canva build) runs an MCP server when **Edit → Settings → Model Context Protocol → Enable MCP server** is on: `http://[::1]:6767/sse`, legacy SSE transport, no auth, protocol `2025-11-25`.
- Registered in `C:\Users\lorettin\.kiro\settings\mcp.json` as `affinity` (only read-only doc/library tools auto-approved). Loads only in a **new** Kiro session and only if Affinity is running.
- Rules learned: call the SDK "preamble" doc first on every connection; `execute_script` takes JS in a field named `script`; `render_spread` needs the document id + spread index.
- Affinity scripts can only read/write files under the Desktop (`C:\Users\lorettin\OneDrive - amazon.com\Desktop`) — that is why this project lives there.
- `0.ai` has no live text (all 880 glyphs outlined), so fonts had to be identified from metadata + visuals.

## Git

- Repo initialised on `main`. The git dir is **outside OneDrive** at `C:\Users\lorettin\git\design-scheme.git` (OneDrive sync corrupts `.git`); the project folder only has a `.git` pointer file. Use git normally from the project folder.
- Remote: `origin` = [bara-bba/la-pagina-barbara](https://github.com/bara-bba/la-pagina-barbara) — **public**.
- Kept out of git on purpose (`.gitignore`): `components/` (third-party/client material), `web/fonts/TAN-SPRING.otf` (personal-use licence), `web/fonts/Guisol.otf` (licence unknown). They stay local; the page falls back to the installed fonts via `local()`. A published copy will show fallback fonts for title + logo until licensed webfonts are added.

## Working notes for the next session

- Shell is Windows PowerShell; paths contain spaces — always quote. No heredocs: write Python to a scratch file and run it.
- Prefer the file-edit tool for small edits; bulk edits via a Python script (UTF-8 read/write — PowerShell's default encoding garbled `—` once).
- The user iterates visually: after every change, render a screenshot and check it before reporting.

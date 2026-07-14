# The Blueprint — Software Engineer Portfolio

An engineer's drawing of an engineer. The page exists twice: the finished
paper-and-ink site, and a full cyanotype blueprint of itself (wireframe
strokes, dimension lines, annotations). On load the blueprint develops into
the page and collapses into an **inspection loupe** that follows the cursor,
revealing the technical drawing under whatever you point at.

React + Vite. No animation libraries — one rAF engine drives the lens spring,
the opening wipe, the scroll-plotted experience spine, the frame station
marker, and the print-wipe reveals, all via CSS variables (transform/clip only).

## Run

```
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ — base is "./", so dist/index.html opens directly from disk
```

## Interactions

- **Loupe** follows the cursor (fine pointers only); press-and-hold to enlarge
- **B** key or the frame's "B Blueprint" chip flips the entire page to blueprint
- Experience spine is plotted by scroll; nodes switch on as the pen passes
- Frame right edge carries a scroll station marker; sheet number updates per section
- `prefers-reduced-motion`: no wipe, no springs, no reveals; touch: loupe off, toggle chip instead

## Fill in your content

All personal content is `[PLACEHOLDER]` values in **`src/content.js`** —
name, tagline, bio, experience, projects, skills, links, email. Also the
`<title>`/meta in `index.html`. The design never needs to be touched.

## Architecture

- `src/App.jsx` — rAF engine (lens position/radius springs, scroll sync, CSS vars) + renders the page twice inside `ModeContext` providers
- `src/components/Page.jsx` — section composition (shared by both worlds)
- `src/components/Frame.jsx` — drafting frame chrome (ticks, nav, sheet no., toggle)
- `src/components/BpBits.jsx` — blueprint-only annotations (notes, dimension lines) + registration marks
- `src/index.css` — all tokens; the `.bp` scope restyles every surface for the cyanotype world

Colors: paper `#F1F1EC`, ink `#191B20`, cobalt accent `#2B49C5`; blueprint `#0F2352` with pale line work. Type: Space Grotesk (display), Inter (body), IBM Plex Mono (annotations) — all self-hosted.

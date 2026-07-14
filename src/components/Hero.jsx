import { useMode } from '../mode.js'
import { identity } from '../content.js'
import { DimX, Note } from './BpBits.jsx'

const INDEX = [
  { n: '02', label: 'About', id: 'about' },
  { n: '03', label: 'Experience', id: 'experience' },
  { n: '04', label: 'Projects', id: 'projects' },
  { n: '05', label: 'Materials list', id: 'skills' },
  { n: '06', label: 'Contact', id: 'contact' },
]

export default function Hero() {
  const mode = useMode()
  const render = mode === 'render'
  const first = identity.firstName.startsWith('[') ? 'YOUR' : identity.firstName.toUpperCase()
  const last = identity.lastName.startsWith('[') ? 'NAME' : identity.lastName.toUpperCase()

  return (
    <section className="sheet hero" id={render ? 'top' : undefined}>
      <div className="hero-top">
        <p className="sheet-tag mono">SHT 01 — INDEX OF DRAWINGS</p>
        <p className="hero-contacts mono">
          <a href={`mailto:${identity.email}`}>EMAIL ↗</a>
          <a href={identity.github} target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
        </p>
      </div>

      <div className="hero-namewrap">
        <h1 className="hero-name stroke">
          <span className="hero-name-line">{first}</span>
          <span className="hero-name-line">{last}</span>
        </h1>
        <DimX style={{ left: 0, right: '38%', top: '-18px' }} label="CAP HEIGHT × 2 · TRACKING −4%" />
        <Note style={{ left: 0, bottom: '-26px' }}>&lt;h1&gt; SPACE GROTESK 700 — SCALE 1:1</Note>
        <i className="cross cross-a" aria-hidden="true" />
        <i className="cross cross-b" aria-hidden="true" />
      </div>

      <div className="hero-grid">
        <div className="hero-intro">
          <p className="hero-role mono">SOFTWARE ENGINEER</p>
          <p className="hero-tagline">{identity.tagline}</p>
          <p className="hero-hint mono">
            <span className="render-only">
              <span className="hint-fine">
                Move the cursor — the loupe shows the drawing underneath. Hold to enlarge. Press B to flip.
              </span>
              <span className="hint-coarse">
                Touch and hold — the loupe shows the drawing underneath. Drag to inspect. Tap “B” below to flip.
              </span>
            </span>
            <span className="bp-only">YOU ARE READING THE DRAWING. PRESS B TO RETURN.</span>
          </p>
        </div>

        <nav className="index-table" aria-label="Index of drawings">
          <p className="index-head mono">INDEX</p>
          {INDEX.map((row) => (
            <a className="index-row" key={row.id} href={`#${row.id}`}>
              <span className="index-label">{row.label}</span>
              <span className="index-leader" aria-hidden="true" />
              <span className="index-n mono">{row.n}</span>
            </a>
          ))}
          <Note style={{ right: 0, bottom: '-26px' }}>NAV — 5 ROWS · DOTTED LEADERS</Note>
        </nav>
      </div>

      <p className="hero-foot mono">
        SCALE 1:1 · DRAWN {new Date().getFullYear()} · REV A
      </p>
    </section>
  )
}

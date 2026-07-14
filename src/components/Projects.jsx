import { useMode } from '../mode.js'
import { featuredProject, projects } from '../content.js'
import { Marks, Note } from './BpBits.jsx'

// Pure line-art "interface elevation" — reads as a technical figure in both
// worlds (ink strokes on paper; pale strokes on cyanotype).
function FigureElevation() {
  return (
    <svg className="fig-art" viewBox="0 0 420 280" aria-hidden="true">
      <rect x="10" y="14" width="400" height="252" rx="6" />
      <line x1="10" y1="46" x2="410" y2="46" />
      <circle cx="30" cy="30" r="4" />
      <circle cx="46" cy="30" r="4" />
      <rect x="70" y="23" width="180" height="14" rx="7" />
      <rect x="34" y="70" width="120" height="172" rx="3" />
      <line x1="46" y1="94" x2="142" y2="94" />
      <line x1="46" y1="112" x2="126" y2="112" />
      <line x1="46" y1="130" x2="136" y2="130" />
      <rect x="176" y="70" width="210" height="92" rx="3" />
      <line x1="192" y1="96" x2="330" y2="96" />
      <line x1="192" y1="116" x2="368" y2="116" />
      <line x1="192" y1="136" x2="306" y2="136" />
      <rect x="176" y="178" width="99" height="64" rx="3" />
      <rect x="287" y="178" width="99" height="64" rx="3" />
      <line x1="34" y1="256" x2="154" y2="256" strokeDasharray="2 5" />
    </svg>
  )
}

export default function Projects() {
  const mode = useMode()
  const fp = featuredProject

  return (
    <section className="sheet" id={mode === 'render' ? 'projects' : undefined}>
      <header className="sheet-head">
        <p className="sheet-tag mono">SHT 04 — PROJECTS</p>
        <h2 className="sheet-title stroke">Selected work</h2>
      </header>

      <article className="plate plate-featured reveal reveal--b">
        <Marks />
        <div className="plate-info">
          <p className="fig-tag mono">PLATE 01 — FEATURED</p>
          <h3 className="plate-name">{fp.name}</h3>
          <p className="plate-desc">{fp.problem}</p>
          <p className="plate-stack mono">{fp.stack.join(' · ')}</p>
          <p className="plate-links mono">
            <a href={fp.github} target="_blank" rel="noreferrer">
              SOURCE ↗
            </a>
            <a href={fp.demo} target="_blank" rel="noreferrer">
              LIVE ↗
            </a>
          </p>
        </div>
        <figure className="plate-fig">
          <FigureElevation />
          <figcaption className="mono">FIG. 1 — INTERFACE ELEVATION, N.T.S.</figcaption>
        </figure>
        <Note style={{ right: '12px', top: '-24px' }}>PLATE 01 · 2-COL · R6 CORNERS</Note>
      </article>

      <div className="bento">
        {projects.map((p, i) => (
          <a
            key={p.name}
            className={`plate plate-cell size-${p.size} reveal ${['', 'reveal--t', 'reveal--r', 'reveal--b'][i % 4]}`}
            href={p.href}
            target="_blank"
            rel="noreferrer"
          >
            <p className="fig-tag mono">FIG. {i + 2}</p>
            <span className="plate-open mono" aria-hidden="true">
              OPEN ↗
            </span>
            <h3 className="plate-name">{p.name}</h3>
            <p className="plate-desc">{p.problem}</p>
            <p className="plate-stack mono">{p.tags.join(' · ')}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

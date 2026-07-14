import { useMode } from '../mode.js'
import { experience } from '../content.js'

// The career path is plotted like a pen line: an SVG spine whose stroke is
// scrubbed by scroll position (--xp-draw, set by the rAF engine), with node
// squares that switch on as the pen passes them.
export default function Experience() {
  const mode = useMode()
  const n = experience.length

  return (
    <section className="sheet" id={mode === 'render' ? 'experience' : undefined}>
      <header className="sheet-head">
        <p className="sheet-tag mono">SHT 03 — EXPERIENCE</p>
        <h2 className="sheet-title stroke">As built</h2>
      </header>

      <div className="xp">
        <div className="xp-spine" aria-hidden="true">
          <div className="xp-spine-fill" />
        </div>

        {experience.map((job, i) => (
          <article className="xp-card reveal" key={i} style={{ '--i': i / n }}>
            <i className="xp-node" aria-hidden="true" />
            <div className="xp-head">
              <h3 className="xp-company">{job.company}</h3>
              <span className="xp-dates mono">{job.dates}</span>
            </div>
            <p className="xp-role mono">{job.role}</p>
            <ul className="xp-bullets">
              {job.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

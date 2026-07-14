import { useMode } from '../mode.js'
import { identity } from '../content.js'

// Drafting frame: a fixed border with coordinate ticks, like the margin of an
// engineering drawing. Wayfinding lives ON the frame line — brand top-left,
// sheet index top-right, blueprint toggle bottom-left, sheet no. bottom-right,
// and a station marker riding the right edge with scroll.
export default function Frame({ sheets, sheet, bpFull, onToggle }) {
  const mode = useMode()
  const first = identity.firstName.startsWith('[') ? 'Your' : identity.firstName
  const last = identity.lastName.startsWith('[') ? 'Name' : identity.lastName

  return (
    <div className={`frame ${mode === 'blueprint' ? 'frame--bp' : ''}`}>
      <div className="f-ticks f-ticks-top" />
      <div className="f-ticks f-ticks-left" />

      <a className="f-brand mono" href="#top">
        {first} {last} — Portfolio
      </a>

      <nav className="f-nav mono" aria-label="Sheet index">
        {sheets.slice(1).map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className={sheet === i + 1 ? 'active' : ''}>
            <span className="f-nav-n">{s.n}</span>
            <span className="f-nav-label"> {s.label}</span>
          </a>
        ))}
      </nav>

      <button
        className="f-toggle mono"
        onClick={onToggle}
        aria-pressed={bpFull}
        title="Toggle blueprint view (B)"
      >
        <span className="f-toggle-key">B</span> Blueprint {bpFull ? 'on' : 'off'}
      </button>

      <p className="f-sheet mono">
        SHT {sheets[sheet].n} / {String(sheets.length).padStart(2, '0')} — {sheets[sheet].label}
      </p>

      <div className="f-marker" />
    </div>
  )
}

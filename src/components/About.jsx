import { useMode } from '../mode.js'
import { about } from '../content.js'
import { Note } from './BpBits.jsx'

function SpecCard() {
  const p = about.profileObject
  return (
    <aside className="spec reveal reveal--t" style={{ position: 'relative' }}>
      <p className="spec-head mono">SPEC — PROFILE.JSON</p>
      <pre className="spec-body mono">
        {'{\n'}
        {'  "name": '}
        <span className="spec-v">"{p.name}"</span>
        {',\n  "location": '}
        <span className="spec-v">"{p.location}"</span>
        {',\n  "currentlyBuilding":\n    '}
        <span className="spec-v">"{p.currentlyBuilding}"</span>
        {',\n  "interests": ['}
        <span className="spec-v">"{p.interests[0]}"</span>
        {', '}
        <span className="spec-v">"{p.interests[1]}"</span>
        {'],\n  "coffee": '}
        <span className="spec-v">{String(p.coffee)}</span>
        {'\n}'}
      </pre>
      <Note style={{ right: 0, top: '-24px' }}>MIME — APPLICATION/JSON</Note>
    </aside>
  )
}

export default function About() {
  const mode = useMode()
  return (
    <section className="sheet" id={mode === 'render' ? 'about' : undefined}>
      <header className="sheet-head">
        <p className="sheet-tag mono">SHT 02 — ABOUT</p>
        <h2 className="sheet-title stroke">General notes</h2>
      </header>

      <div className="about-grid">
        <div className="about-text">
          {about.paragraphs.map((t, i) => (
            <p key={i}>
              <span className="about-num mono">{String(i + 1).padStart(2, '0')}</span>
              {t}
            </p>
          ))}
        </div>
        <SpecCard />
      </div>
    </section>
  )
}

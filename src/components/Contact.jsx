import { useMode } from '../mode.js'
import { identity } from '../content.js'
import { Note } from './BpBits.jsx'

// Closes like a real drawing set closes: with the title block.
export default function Contact() {
  const mode = useMode()
  const year = new Date().getFullYear()
  const name = identity.firstName.startsWith('[')
    ? '[PLACEHOLDER — Name]'
    : `${identity.firstName} ${identity.lastName}`

  return (
    <section className="sheet sheet-contact" id={mode === 'render' ? 'contact' : undefined}>
      <header className="sheet-head">
        <p className="sheet-tag mono">SHT 06 — CONTACT</p>
      </header>

      <h2 className="contact-h stroke">
        Let’s build
        <br />
        something.
      </h2>

      <a className="contact-email" href={`mailto:${identity.email}`}>
        {identity.email}
      </a>

      <p className="contact-links mono">
        <a href={identity.github} target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
        <a href={identity.linkedin} target="_blank" rel="noreferrer">
          LINKEDIN ↗
        </a>
      </p>

      <p className="contact-open">Currently open to {identity.openTo}</p>

      <div className="titleblock reveal reveal--b" style={{ position: 'relative' }}>
        <Note style={{ right: 0, top: '-24px' }}>TITLE BLOCK — 6 FIELDS</Note>
        <div className="tb-row">
          <div className="tb-cell tb-wide">
            <span className="tb-label mono">PROJECT</span>
            <span className="tb-value">Personal portfolio — sheet set</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label mono">DRAWN BY</span>
            <span className="tb-value">{name}</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label mono">DATE</span>
            <span className="tb-value">{year}</span>
          </div>
        </div>
        <div className="tb-row">
          <div className="tb-cell tb-wide">
            <span className="tb-label mono">CONTACT</span>
            <span className="tb-value">{identity.email}</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label mono">SCALE</span>
            <span className="tb-value">1 : 1</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label mono">REV / SHT</span>
            <span className="tb-value">A — 06 of 06</span>
          </div>
        </div>
        <p className="tb-foot mono">© {year} {name} · Designed with intention</p>
      </div>
    </section>
  )
}

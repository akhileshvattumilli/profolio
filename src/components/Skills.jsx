import { useMode } from '../mode.js'
import { skills } from '../content.js'
import { Note } from './BpBits.jsx'

const PART_PREFIX = { Languages: 'LNG', Frameworks: 'FWK', 'Cloud & DevOps': 'OPS', Tools: 'TLS' }

// Skills as a bill of materials — a real table, not a tag cloud.
export default function Skills() {
  const mode = useMode()

  return (
    <section className="sheet" id={mode === 'render' ? 'skills' : undefined}>
      <header className="sheet-head" style={{ position: 'relative' }}>
        <p className="sheet-tag mono">SHT 05 — MATERIALS LIST</p>
        <h2 className="sheet-title stroke">Bill of materials</h2>
        <Note style={{ right: 0, bottom: '8px' }}>B.O.M. — 4 CLASSES</Note>
      </header>

      <table className="bom reveal reveal--t">
        <thead>
          <tr className="mono">
            <th scope="col">PART NO.</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">CLASS</th>
          </tr>
        </thead>
        {skills.map((group) => {
          const prefix = PART_PREFIX[group.category] ?? 'GEN'
          return (
            <tbody key={group.category}>
              {group.items.map((item, i) => (
                <tr key={item}>
                  <td className="mono">
                    {prefix}-{String(i + 1).padStart(2, '0')}
                  </td>
                  <td className="bom-item">{item}</td>
                  <td className="mono bom-class">{group.category.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          )
        })}
      </table>
    </section>
  )
}

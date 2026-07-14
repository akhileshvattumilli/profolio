import { useMode } from '../mode.js'

// Hand-placed drafting annotations. They render only in the blueprint world
// and are absolutely positioned, so the two worlds keep identical layout.

export function Note({ style, children }) {
  const mode = useMode()
  if (mode !== 'blueprint') return null
  return (
    <span className="bp-note mono" style={style}>
      {children}
    </span>
  )
}

// Horizontal dimension line with end ticks and a centered label.
export function DimX({ style, label }) {
  const mode = useMode()
  if (mode !== 'blueprint') return null
  return (
    <span className="bp-dimx" style={style}>
      <span className="bp-dimx-label mono">{label}</span>
    </span>
  )
}

// Corner registration marks for plates/figures (rendered in both worlds).
export function Marks() {
  return (
    <>
      <i className="mark mark-tl" aria-hidden="true" />
      <i className="mark mark-tr" aria-hidden="true" />
      <i className="mark mark-bl" aria-hidden="true" />
      <i className="mark mark-br" aria-hidden="true" />
    </>
  )
}

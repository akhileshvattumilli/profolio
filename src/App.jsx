import { useEffect, useRef, useState } from 'react'
import { ModeContext } from './mode.js'
import { initScrollFX } from './scrollfx.js'
import Frame from './components/Frame.jsx'
import Page from './components/Page.jsx'

// ---------------------------------------------------------------------------
// The site exists twice: once as the finished paper page, once as its
// cyanotype blueprint. A circular clip ("the lens") decides which world you
// see. On load the blueprint covers everything, then collapses into a loupe
// that follows the cursor. Press-and-hold enlarges it; "B" flips the world.
// ---------------------------------------------------------------------------

const SHEETS = [
  { id: 'top', n: '01', label: 'Index' },
  { id: 'about', n: '02', label: 'About' },
  { id: 'experience', n: '03', label: 'Experience' },
  { id: 'projects', n: '04', label: 'Projects' },
  { id: 'skills', n: '05', label: 'Materials' },
  { id: 'contact', n: '06', label: 'Contact' },
]

const LENS = 96
const LENS_BIG = 240

// touch loupe: blooms above the fingertip (iOS-magnifier style) so the thumb
// never covers what it reveals. Between touches it never fully closes — it
// rests as a small breathing porthole that x-rays content scrolling past.
const LENS_TOUCH = 118
const LENS_REST = 30
const TOUCH_LIFT = 92
const HOLD_MS = 220
const HOLD_SLOP = 12

export default function App() {
  const bpScrollRef = useRef(null)
  const readoutRef = useRef(null)
  const [sheet, setSheet] = useState(0)
  const [bpFull, setBpFull] = useState(false)

  // engine state lives in a ref so the rAF loop and the toggle share it
  const eng = useRef({
    x: 0, y: 0, tx: 0, ty: 0,
    r: 0, tr: 0,
    full: false,
    fine: true,
    reduced: false,
    boot: true,
    bootT0: 0,
  }).current

  const cover = () => Math.hypot(window.innerWidth, window.innerHeight)

  const toggleFull = () => {
    eng.full = !eng.full
    eng.boot = false
    eng.tr = eng.full ? cover() : eng.fine ? LENS : LENS_REST
    setBpFull(eng.full)
  }

  useEffect(() => {
    const doc = document.documentElement
    eng.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    eng.fine = window.matchMedia('(pointer: fine)').matches
    eng.x = eng.tx = window.innerWidth / 2
    eng.y = eng.ty = window.innerHeight * 0.42
    eng.bootT0 = performance.now()

    if (eng.reduced) {
      eng.boot = false
      eng.r = eng.tr = eng.fine ? LENS : LENS_REST
    } else {
      // everyone gets the opening wipe; it collapses to the loupe on desktop
      // and all the way down to the touch seed on phones
      eng.r = eng.tr = cover()
    }

    // mouse/pen only — touch drives the lens through its own handlers below
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      eng.tx = e.clientX
      eng.ty = e.clientY
    }
    const onDown = (e) => {
      if (e.pointerType === 'touch') return
      if (!eng.full && eng.fine && !e.target.closest('a, button')) eng.tr = LENS_BIG
    }
    const onUp = (e) => {
      if (e.pointerType === 'touch') return
      if (!eng.full && eng.fine) eng.tr = LENS
    }
    const onLeave = (e) => {
      if (e.pointerType === 'touch') return
      if (!eng.full && eng.fine) eng.tr = 0
    }
    const onEnter = (e) => {
      if (e.pointerType === 'touch') return
      if (!eng.full && eng.fine && !eng.boot) eng.tr = LENS
    }

    // -- touch loupe -------------------------------------------------------
    // Press-and-hold blooms the lens above the fingertip; dragging then
    // inspects instead of scrolling. A quick swipe (moves > HOLD_SLOP before
    // HOLD_MS) cancels the hold and scrolls as normal.
    let holdTimer = null
    let touchLens = false
    let touchX0 = 0
    let touchY0 = 0

    const aimTouch = (t) => {
      eng.tx = t.clientX
      eng.ty = Math.max(24, t.clientY - TOUCH_LIFT)
    }

    const onTouchStart = (e) => {
      if (eng.full || e.touches.length !== 1) return
      if (e.target instanceof Element && e.target.closest('a, button')) return
      const t = e.touches[0]
      touchX0 = t.clientX
      touchY0 = t.clientY
      clearTimeout(holdTimer)
      holdTimer = setTimeout(() => {
        holdTimer = null
        touchLens = true
        eng.boot = false
        aimTouch(t)
        // bloom in place rather than springing across the screen
        eng.x = eng.tx
        eng.y = eng.ty
        eng.r = 0
        eng.tr = LENS_TOUCH
        doc.classList.add('had-touch', 'touch-lens')
        navigator.vibrate?.(8)
      }, HOLD_MS)
    }
    const onTouchMove = (e) => {
      const t = e.touches[0]
      if (!t) return
      if (touchLens) {
        e.preventDefault() // inspecting, not scrolling
        aimTouch(t)
      } else if (holdTimer && Math.hypot(t.clientX - touchX0, t.clientY - touchY0) > HOLD_SLOP) {
        clearTimeout(holdTimer) // it's a scroll — let it be one
        holdTimer = null
      }
    }
    const onTouchEnd = () => {
      clearTimeout(holdTimer)
      holdTimer = null
      if (touchLens) {
        touchLens = false
        if (!eng.full) eng.tr = eng.fine ? 0 : LENS_REST
        doc.classList.remove('touch-lens')
      }
    }
    const onKey = (e) => {
      if (e.key === 'b' || e.key === 'B') {
        if (e.target instanceof Element && e.target.closest('input, textarea')) return
        toggleFull()
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)

    // scroll-scrubbed animations — GSAP ScrollTrigger owns all reveals now
    const killScrollFX = initScrollFX()

    const onResize = () => {
      if (eng.full) eng.tr = cover()
      eng.tx = Math.min(eng.tx, window.innerWidth)
      eng.ty = Math.min(eng.ty, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // current sheet indicator
    const sheetIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const i = SHEETS.findIndex((s) => s.id === en.target.id)
            if (i >= 0) setSheet(i)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SHEETS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) sheetIO.observe(el)
    })

    const xpEl = document.getElementById('experience')
    let raf

    const loop = (now) => {
      // opening wipe: hold the full blueprint ~1.1s, then collapse — to the
      // loupe on fine pointers, to the resting porthole on coarse
      if (eng.boot && now - eng.bootT0 > 1100) {
        eng.tr = eng.fine ? LENS : LENS_REST
        if (Math.abs(eng.r - eng.tr) < 2) eng.boot = false
      }

      // the resting porthole breathes while nothing else drives the lens
      if (!eng.fine && !eng.full && !eng.boot && !touchLens && !eng.reduced) {
        eng.tr = LENS_REST + Math.sin(now / 650) * 3.5
      }

      const k = eng.reduced ? 1 : 0.16
      const kr = eng.reduced ? 1 : 0.085
      eng.x += (eng.tx - eng.x) * k
      eng.y += (eng.ty - eng.y) * k
      eng.r += (eng.tr - eng.r) * kr

      doc.style.setProperty('--lens-x', `${eng.x.toFixed(1)}px`)
      doc.style.setProperty('--lens-y', `${eng.y.toFixed(1)}px`)
      doc.style.setProperty('--lens-r', `${Math.max(0, eng.r).toFixed(1)}px`)

      // 0 → 1 as the opening blueprint develops into the page
      const bootP = Math.min(1, Math.max(0, 1 - (eng.r - LENS) / (cover() - LENS)))
      doc.style.setProperty('--boot', bootP.toFixed(3))
      doc.classList.toggle('lens-huge', eng.r > Math.min(window.innerWidth, window.innerHeight) * 0.5)
      // a closed lens would leave its bezel ticks as a stray "+" — hide it
      doc.classList.toggle('lens-zero', eng.r < 2)

      // keep the blueprint twin in perfect scroll/width sync
      const sc = bpScrollRef.current
      if (sc) {
        sc.style.transform = `translate3d(0, ${-window.scrollY}px, 0)`
        sc.style.width = `${doc.clientWidth}px`
      }

      // pen-plotter progress through the experience section — 0.74 matches
      // the scroll-fx entrance end (top 74%), so a node lights up exactly
      // when its card finishes wiping in
      if (xpEl) {
        const r = xpEl.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.74 - r.top) / r.height))
        doc.style.setProperty('--xp-draw', p.toFixed(4))
      }

      // frame station marker
      const sp = window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)
      doc.style.setProperty('--scroll-p', sp.toFixed(4))

      if (readoutRef.current) {
        readoutRef.current.textContent = `x ${eng.tx | 0}  y ${(eng.ty + window.scrollY) | 0}`
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      killScrollFX()
      cancelAnimationFrame(raf)
      clearTimeout(holdTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('resize', onResize)
      sheetIO.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* ------------- rendered world ------------- */}
      <ModeContext.Provider value="render">
        <Frame sheets={SHEETS} sheet={sheet} bpFull={bpFull} onToggle={toggleFull} />
        <Page />
      </ModeContext.Provider>

      {/* ------------- blueprint world, clipped to the lens ------------- */}
      <div className="bp-viewport bp" aria-hidden="true" inert>
        <div className="bp-cross bp-cross-h" />
        <div className="bp-cross bp-cross-v" />
        <div className="bp-scroll" ref={bpScrollRef}>
          <ModeContext.Provider value="blueprint">
            <Page />
          </ModeContext.Provider>
        </div>
        <ModeContext.Provider value="blueprint">
          <Frame sheets={SHEETS} sheet={sheet} bpFull={bpFull} onToggle={toggleFull} />
        </ModeContext.Provider>
      </div>

      {/* lens chrome (rendered world side) */}
      <div className="lens-ring" aria-hidden="true" />
      <div className="lens-readout mono" ref={readoutRef} aria-hidden="true" />

      {/* touch devices: the boot wipe collapses into a resting porthole;
          this chip invites the press-and-hold loupe until first use */}
      <div className="touch-cta mono" aria-hidden="true">
        TOUCH &amp; HOLD TO INSPECT
      </div>
    </>
  )
}

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Scroll-scrubbed animations (GSAP ScrollTrigger).
//
// Motion grammar — identical for every element, so the whole page shares one
// rhythm and one speed:
//
//   ENTER  while the element's top crosses the bottom 28% of the viewport
//          (top 102% → top 74%) it wipes in.
//   READ   through the middle ~50% of the viewport it is fully drawn and
//          completely still — nothing moves where the eye reads.
//   EXIT   while the element's bottom crosses the top 26% (bottom 24% →
//          bottom −2%) it wipes back out, continuing the entrance motion.
//
// Zones are viewport-anchored, so a tall card and a one-line row wipe at the
// same visual speed. Each element has ONE apply() that derives its style
// from two zone progresses — the two scrubs never fight over a property and
// any scroll jump (index-nav anchors) lands in a correct state.
//
// Clip values are all percentages: GSAP interpolates same-unit strings
// exactly (mixing px and % made the old wipes snap instead of glide).
//
// Only the render world animates — the blueprint twin stays fully drawn
// (`.bp .reveal { clip-path: none !important }` beats inline styles).
// ---------------------------------------------------------------------------

// render-world elements only — the blueprint twin duplicates the whole page
const inRender = (sel) => gsap.utils.toArray(sel).filter((el) => !el.closest('.bp'))
const clamp01 = gsap.utils.clamp(0, 1)

const SCRUB = 1
const IN = { start: 'top 103%', end: 'top 68%' }
const OUT = { start: 'bottom 24%', end: 'bottom -2%' }

// -6% bleed keeps annotation notes/shadows inside the visible window;
// `left` widens further for xp cards whose spine node hangs at −69px
const onClip = (left) => `inset(-6% -6% -6% ${left})`
const hidClip = (dir, left) =>
  ({
    l: `inset(-6% 106% -6% ${left})`,
    r: 'inset(-6% -6% -6% 106%)',
    t: `inset(-6% -6% 106% ${left})`,
    b: `inset(106% -6% -6% ${left})`,
  })[dir]

// exits continue the entrance motion: revealed left-to-right → erased
// left-to-right, top-to-bottom → erased top-to-bottom, and so on
const MIRROR = { l: 'r', r: 'l', t: 'b', b: 't' }

// Two proxy tweens (one per zone) scrub `p.in` / `p.out`; apply() derives
// the element's style from both. Separate proxy properties mean no shared
// tween targets, no write conflicts, and deterministic state on jumps.
// Progress is eased within its zone — still strictly bound to scroll
// position and fully reversible. Entrances are front-loaded (sine.out):
// an element becomes mostly visible right after entering, then settles
// gently. Exits are back-loaded (sine.in): they barely intrude while the
// element is still readable and finish quickly at the very edge.
const softIn = gsap.parseEase('sine.out')
const softOut = gsap.parseEase('sine.in')

const zones = (el, apply, inZone = IN, outZone = OUT) => {
  const p = { in: 0, out: 0 }
  const run = () => apply({ in: softIn(p.in), out: softOut(p.out) })
  gsap.fromTo(
    p,
    { in: 0 },
    {
      in: 1,
      ease: 'none',
      onUpdate: run,
      scrollTrigger: { trigger: el, ...inZone, scrub: SCRUB },
    },
  )
  if (outZone) {
    gsap.fromTo(
      p,
      { out: 0 },
      {
        out: 1,
        ease: 'none',
        onUpdate: run,
        scrollTrigger: { trigger: el, ...outZone, scrub: SCRUB },
      },
    )
  }
  run()
}

// the signature move: a plotter wipe in, stillness, a plotter wipe out
const wipe = (el, dir, { left = '-6%', out = true, inZone = IN, outZone = OUT } = {}) => {
  el.style.willChange = 'clip-path' // own compositor layer — no ancestor repaints
  const lerpIn = gsap.utils.interpolate(hidClip(dir, left), onClip(left))
  const lerpOut = gsap.utils.interpolate(onClip(left), hidClip(MIRROR[dir], left))
  zones(
    el,
    (p) => {
      el.style.clipPath = p.out > 0 ? lerpOut(p.out) : lerpIn(p.in)
    },
    inZone,
    out ? outZone : null,
  )
}

const dirOf = (el) =>
  el.classList.contains('reveal--r')
    ? 'r'
    : el.classList.contains('reveal--t')
      ? 't'
      : el.classList.contains('reveal--b')
        ? 'b'
        : 'l'

export function initScrollFX() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // -- generic reveals ----------------------------------------------------
    // .bom and .titleblock are excluded: their children animate individually
    // and a second container wipe on top made them fight and stutter
    inRender('.reveal').forEach((el) => {
      if (el.matches('.bom, .titleblock, .plate-cell, .plate-featured')) return
      wipe(el, dirOf(el), { left: el.classList.contains('xp-card') ? '-16%' : '-6%' })
    })
    gsap.set(inRender('.bom, .titleblock'), { clipPath: 'none' })

    // -- section headers: the sheet's title rules itself in ------------------
    // (the contact sheet is the last viewport — its header never exits)
    inRender('.sheet-head').forEach((h) => {
      wipe(h, 'l', { out: !h.closest('.sheet-contact') })
    })

    // -- hero: name lines drift apart as the sheet scrolls away --------------
    const hero = inRender('.hero')[0]
    if (hero) {
      inRender('.hero-name-line').forEach((line, i) => {
        gsap.to(line, {
          xPercent: i === 0 ? -6 : 6,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: SCRUB },
        })
      })
      gsap.to(inRender('.hero-grid'), {
        yPercent: -8,
        opacity: 0,
        ease: 'sine.in',
        scrollTrigger: { trigger: hero, start: 'top top', end: '95% top', scrub: SCRUB },
      })
    }

    // -- about: paragraphs stroke in like plotter pen lines ------------------
    // pure wipes — the text itself never moves, so it stays readable
    inRender('.about-text p').forEach((p) => wipe(p, 'l'))

    // -- projects: cards print in sync with their own emergence --------------
    // the wipe starts the instant a card's top edge appears and completes
    // exactly as its bottom edge scrolls into view — a card is always fully
    // drawn the moment it is fully visible, with zero waiting
    const EMERGE = { start: 'top 102%', end: 'bottom 96%' }

    const plate = inRender('.plate-featured')[0]
    if (plate) wipe(plate, 'b', { inZone: EMERGE })

    // the featured figure draws itself, then un-draws
    const art = inRender('.plate-featured .fig-art')[0]
    if (art) {
      const shapes = [...art.querySelectorAll('rect, line, circle')]
      const lens = shapes.map((s) => s.getTotalLength())
      shapes.forEach((s, i) => {
        s.style.strokeDasharray = lens[i]
        s.style.strokeDashoffset = lens[i]
      })
      const n = shapes.length
      zones(
        art,
        (p) => {
          shapes.forEach((s, i) => {
            const lead = (i / n) * 0.55 // pen draws one shape after another
            if (p.out > 0) {
              s.style.strokeDashoffset = -lens[i] * clamp01((p.out - lead) / 0.45)
            } else {
              s.style.strokeDashoffset = lens[i] * (1 - clamp01((p.in - lead) / 0.45))
            }
          })
        },
        EMERGE,
        OUT,
      )
    }

    // -- bento cards (FIG 2+): one shared pen direction so neighbors read as
    // a set, each printing in sync with its own emergence
    inRender('.bento .plate-cell').forEach((cell) => {
      wipe(cell, 'l', { inZone: EMERGE })
    })

    // -- skills: BOM rows print in sequence, like a line printer -------------
    inRender('.bom tbody tr').forEach((row) => {
      zones(row, (p) => {
        const showing = p.out > 0 ? 1 - p.out : p.in
        const x = p.out > 0 ? p.out * 14 : (p.in - 1) * 14
        gsap.set(row, { opacity: showing, x })
      })
    })

    // -- contact: last sheet, entrance only (nothing here ever exits) --------
    const contactH = inRender('.contact-h')[0]
    if (contactH) {
      gsap.fromTo(
        contactH,
        { clipPath: hidClip('b', '-6%'), y: 40 },
        {
          clipPath: onClip('-6%'),
          y: 0,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: contactH, start: 'top 100%', end: 'top 60%', scrub: SCRUB },
        },
      )
    }
    inRender('.contact-email, .contact-links, .contact-open').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: el, start: 'top 102%', end: 'top 78%', scrub: SCRUB },
        },
      )
    })
    // the title block assembles field by field — ends high enough (82%) to
    // always complete before the page runs out of scroll
    const tb = inRender('.titleblock')[0]
    if (tb) {
      const bits = [...tb.querySelectorAll('.tb-cell, .tb-foot')]
      gsap.fromTo(
        bits,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          ease: 'sine.inOut',
          stagger: 0.12,
          scrollTrigger: { trigger: tb, start: 'top 100%', end: 'top 82%', scrub: SCRUB },
        },
      )
    }
  })

  return () => mm.revert()
}

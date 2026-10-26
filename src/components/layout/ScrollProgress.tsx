import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

/** Page progress hairline driven by ScrollTrigger scrub (transform only). */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: '0 50%', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
    })
  })
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}

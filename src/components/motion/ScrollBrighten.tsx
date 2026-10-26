import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { parseEmphasis, stripEmphasis } from '../../lib/utils'

/** Word-by-word scroll-linked brightening. Words are fully legible when motion is reduced. */
export function ScrollBrighten({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el.querySelectorAll('.bw'),
          { opacity: 0.5 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )
  return (
    <p ref={ref} className={className}>
      <span className="vh">{stripEmphasis(text)}</span>
      <span aria-hidden="true">
        {parseEmphasis(text).flatMap((seg, si) =>
          seg.text.split(' ').filter(Boolean).map((w, wi) => {
            const key = `${si}-${wi}`
            return seg.em ? (
              <em key={key} className="bw">{w} </em>
            ) : (
              <span key={key} className="bw">{w} </span>
            )
          }),
        )}
      </span>
    </p>
  )
}

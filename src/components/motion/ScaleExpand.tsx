import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

/** Image that grows from an arch-framed inset to full bleed as it crosses the viewport. */
export function ScaleExpand({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      const run = (inset: string) => {
        const img = el.querySelector('img')
        gsap.fromTo(
          el,
          { clipPath: inset },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 15%', scrub: true },
          },
        )
        if (img) {
          gsap.fromTo(img, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 30%', scrub: true } })
        }
      }
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () =>
        run('inset(6% 32% 6% 32% round 600px 600px 0px 0px)'),
      )
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () =>
        run('inset(4% 14% 4% 14% round 600px 600px 0px 0px)'),
      )
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

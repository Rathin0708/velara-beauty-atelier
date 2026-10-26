import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

interface Props {
  /** Travel as a percentage of the layer's own height each way; capped at 18. */
  speed?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
  /** Element whose viewport crossing drives the scrub. Defaults to the layer's parent. */
  triggerSelf?: boolean
}

/** Transform-only scroll parallax. Amplitude is reduced on small screens and disabled for reduced motion. */
export function ParallaxLayer({ speed = 8, className, style, children, triggerSelf }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const amp = Math.min(Math.abs(speed), 18)
      const sign = speed < 0 ? -1 : 1
      const mm = gsap.matchMedia()
      const run = (k: number) => {
        gsap.fromTo(
          el,
          { yPercent: -amp * k * sign },
          {
            yPercent: amp * k * sign,
            ease: 'none',
            scrollTrigger: { trigger: triggerSelf ? el : (el.parentElement ?? el), start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => run(1))
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => run(0.35))
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

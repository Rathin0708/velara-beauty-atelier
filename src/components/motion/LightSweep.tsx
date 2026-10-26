import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { dur, ease } from '../../lib/tokens'
import { cx } from '../../lib/utils'

interface Props {
  className?: string
  style?: CSSProperties
  trigger?: 'load' | 'scroll'
  delay?: number
  /** Adds a one-time blur-to-sharp focus pull (use sparingly; at most 3 per site, not on mobile). */
  focusPull?: boolean
  children: ReactNode
}

/**
 * Light-sweep mask reveal: the frame opens upward while the image settles from a slight zoom.
 * `load` runs in pure CSS (no JS dependency, keeps the LCP image fast); `scroll` uses ScrollTrigger.
 */
export function LightSweep({ className, style, trigger = 'scroll', delay = 0, focusPull, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || trigger === 'load') return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isDesktop = window.matchMedia('(min-width: 768px)').matches
        const img = el.querySelector('img')
        const st = { trigger: el, start: 'top 88%', once: true }
        gsap.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: dur.hero, ease: ease.gsapHero, delay, scrollTrigger: st })
        if (img) {
          gsap.from(img, {
            scale: 1.22,
            ...(focusPull && isDesktop ? { filter: 'blur(14px)' } : {}),
            duration: dur.hero + 0.4,
            ease: ease.gsapHero,
            delay,
            scrollTrigger: st,
          })
        }
      })
    },
    { scope: ref },
  )
  const isLoad = trigger === 'load'
  return (
    <div
      ref={ref}
      className={cx(className, isLoad && 'sweep-load', isLoad && focusPull && 'sweep-blur')}
      style={isLoad ? { ...style, ['--sweep-delay' as string]: `${delay}s` } : style}
    >
      {children}
    </div>
  )
}

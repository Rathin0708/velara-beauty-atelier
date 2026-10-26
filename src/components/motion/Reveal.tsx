import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { dur, ease, stagger } from '../../lib/tokens'

interface Props {
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  /** When set, animates matching descendants in sequence instead of the wrapper. */
  items?: string
  children: ReactNode
}

/** Fade-up reveal on scroll. Initial hidden state is set inside the animation, so content stays visible without JS. */
export function Reveal({ as: Tag = 'div', className, delay = 0, y = 36, items, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = items ? el.querySelectorAll(items) : el
        gsap.from(targets, {
          y,
          opacity: 0,
          duration: dur.reveal,
          ease: ease.gsapReveal,
          delay,
          stagger: items ? stagger.media : 0,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

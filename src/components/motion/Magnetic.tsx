import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

/** Subtle magnetic pull toward the pointer. Only on fine pointers without reduced motion. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * strength)
          yTo((e.clientY - (r.top + r.height / 2)) * strength)
        }
        const leave = () => {
          xTo(0)
          yTo(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })
    },
    { scope: ref },
  )
  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  )
}

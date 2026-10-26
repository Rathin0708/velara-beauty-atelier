import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

/**
 * Contextual cursor label ("VIEW", "DRAG", "BOOK"). Elements opt in with data-cursor="LABEL".
 * Fine pointers only; hidden over text inputs; the native cursor is never removed.
 */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
      const show = (on: boolean) => gsap.to(el, { autoAlpha: on ? 1 : 0, scale: on ? 1 : 0.6, duration: 0.25, overwrite: 'auto' })
      const move = (e: PointerEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }
      const over = (e: PointerEvent) => {
        const t = e.target instanceof Element ? e.target : null
        const holder = t?.closest<HTMLElement>('[data-cursor]')
        const inInput = !!t?.closest('input,textarea,select,[contenteditable]')
        if (holder && !inInput) {
          setLabel(holder.dataset.cursor ?? '')
          show(true)
        } else show(false)
      }
      const out = (e: PointerEvent) => {
        if (!e.relatedTarget) show(false)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerover', over)
      window.addEventListener('pointerout', out)
      return () => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerover', over)
        window.removeEventListener('pointerout', out)
        gsap.set(el, { autoAlpha: 0 })
      }
    })
  })
  return (
    <div ref={ref} className="cursor-follower" aria-hidden="true">
      <span>{label}</span>
    </div>
  )
}

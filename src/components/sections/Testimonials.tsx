import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { getTestimonials } from '../../lib/api'
import { useReducedMotion } from '../../hooks/hooks'
import { ease } from '../../lib/tokens'
import { cx } from '../../lib/utils'

export function Testimonials() {
  const items = getTestimonials()
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const [announce, setAnnounce] = useState('')
  const root = useRef<HTMLElement>(null)
  const playing = !reduce && !userPaused && !hover

  useEffect(() => {
    if (!playing) return
    const t = window.setInterval(() => setI((n) => (n + 1) % items.length), 7000)
    return () => window.clearInterval(t)
  }, [playing, items.length])

  // Announce only changes the visitor caused.
  const go = (n: number) => {
    const next = (n + items.length) % items.length
    setI(next)
    setAnnounce(`Testimonial ${next + 1} of ${items.length}`)
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) }
  }
  const t = items[i]

  return (
    <section
      ref={root}
      className="section section--champagne testimonials"
      aria-roledescription="carousel"
      aria-label="Guest testimonials"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node | null)) setHover(false) }}
      onKeyDown={onKey}
    >
      <div className="container">
        <p className="eyebrow">Kind words</p>
        <div className="quote-stage" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={t.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: reduce ? 0 : 0.6, ease: ease.reveal }}
            >
              <blockquote className="display d-lg quote">“{t.quote}”</blockquote>
              <figcaption>
                <span className="meta">{t.name} · {t.context}</span>
                {t.isSample && <span className="tag">Sample testimonial</span>}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="carousel-controls">
          <button type="button" className="icon-btn" aria-label="Previous testimonial" onClick={() => go(i - 1)}><ChevronLeft size={18} /></button>
          <button type="button" className="icon-btn" aria-label="Next testimonial" onClick={() => go(i + 1)}><ChevronRight size={18} /></button>
          {!reduce && (
            <button type="button" className="icon-btn" aria-label={userPaused ? 'Play automatic rotation' : 'Pause automatic rotation'} onClick={() => setUserPaused((v) => !v)}>
              {userPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
          <div className="dots" role="group" aria-label="Choose testimonial">
            {items.map((x, n) => (
              <button key={x.id} type="button" className={cx('dot', n === i && 'is-on')} aria-label={`Show testimonial ${n + 1}`} aria-current={n === i} onClick={() => go(n)} />
            ))}
          </div>
        </div>
        <p className="vh" role="status" aria-live="polite">{announce}</p>
      </div>
    </section>
  )
}

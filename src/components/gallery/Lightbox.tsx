import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { useFocusTrap, useLockBodyScroll, useReducedMotion } from '../../hooks/hooks'
import type { GalleryItem } from '../../data/types'
import { imageSrcSet, imageUrl } from '../../data/images'
import { ease } from '../../lib/tokens'

interface Props {
  items: GalleryItem[]
  index: number | null
  onIndex: (i: number | null) => void
}

/** Accessible lightbox: ←/→/Esc, swipe on touch, counter, captions, focus trap and restore. */
export default function Lightbox({ items, index, onIndex }: Props) {
  const open = index !== null
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const startX = useRef<number | null>(null)
  const close = useCallback(() => onIndex(null), [onIndex])
  useLockBodyScroll(open)
  useFocusTrap(ref, open, close)

  const step = useCallback(
    (d: number) => {
      if (index === null) return
      onIndex((index + d + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  const item = index !== null ? items[index] : null
  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={ref}
          className="lightbox on-dark"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.3, ease: ease.inOut }}
          onPointerDown={(e) => { if (e.pointerType === 'touch') startX.current = e.clientX }}
          onPointerUp={(e) => {
            if (startX.current === null) return
            const dx = e.clientX - startX.current
            startX.current = null
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
          }}
        >
          <button type="button" className="icon-btn lb-close" aria-label="Close" onClick={close}><X size={20} /></button>
          <button type="button" className="icon-btn lb-prev" aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft size={22} /></button>
          <button type="button" className="icon-btn lb-next" aria-label="Next image" onClick={() => step(1)}><ChevronRight size={22} /></button>
          <figure className="lb-figure">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={item.id}
                src={imageUrl(item.image, 1800)}
                srcSet={imageSrcSet(item.image)}
                sizes="90vw"
                alt={item.alt}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.01 : 0.28 }}
                draggable={false}
              />
            </AnimatePresence>
            <figcaption>
              <span className="meta">{item.caption}</span>
              {!item.genuine && <span className="tag">Inspiration</span>}
              <span className="meta" aria-live="polite">{(index ?? 0) + 1} / {items.length}</span>
            </figcaption>
          </figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useState } from 'react'
import type { GalleryCategory, GalleryItem } from '../../data/types'
import { useReducedMotion } from '../../hooks/hooks'
import { ease } from '../../lib/tokens'
import { cx } from '../../lib/utils'
import { Photo } from '../ui/Photo'

const Lightbox = lazy(() => import('./Lightbox'))

const SHAPES = ['tall', 'wide', 'std', 'std', 'tall', 'std', 'wide', 'std']

interface Props {
  items: GalleryItem[]
  filters: Array<{ id: GalleryCategory | 'all'; label: string }>
  limit?: number
  loadMore?: boolean
}

/** Filterable asymmetric masonry. Items animate their layout in place when the filter changes. */
export function GalleryGrid({ items, filters, limit, loadMore }: Props) {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all')
  const [shown, setShown] = useState(limit ?? items.length)
  const [lb, setLb] = useState<number | null>(null)
  const reduce = useReducedMotion()
  const filtered = items.filter((i) => filter === 'all' || i.category === filter)
  const visible = filtered.slice(0, shown)

  return (
    <div className="gallery">
      <div className="chips" role="group" aria-label="Filter gallery">
        {filters.map((f) => (
          <button key={f.id} type="button" className={cx('chip', filter === f.id && 'is-on')} aria-pressed={filter === f.id} onClick={() => { setFilter(f.id); setShown(limit ?? items.length) }}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="vh" role="status" aria-live="polite">{filtered.length} images shown</p>
      <motion.ul layout className="masonry">
        <AnimatePresence mode="popLayout">
          {visible.map((it, i) => (
            <motion.li
              key={it.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: ease.reveal }}
              className={`masonry-item masonry-${SHAPES[i % SHAPES.length]}`}
            >
              <button type="button" className="masonry-btn" data-cursor="VIEW" onClick={() => setLb(filtered.indexOf(it))}>
                <Photo name={it.image} alt={it.alt} className="ratio-fill" sizes="(min-width: 1024px) 24vw, 46vw" />
                <span className="masonry-cap">
                  <span className="meta">{it.caption}</span>
                  {!it.genuine && <span className="tag">Inspiration</span>}
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {loadMore && filtered.length > shown && (
        <div className="center">
          <button type="button" className="btn btn--ghost" onClick={() => setShown((n) => n + 6)}>Load more</button>
        </div>
      )}
      <p className="note">Imagery is inspiration, not client work from this salon.</p>
      {lb !== null && (
        <Suspense fallback={null}>
          <Lightbox items={filtered} index={lb} onIndex={setLb} />
        </Suspense>
      )}
    </div>
  )
}

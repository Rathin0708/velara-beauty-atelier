import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getFeaturedServices } from '../../lib/api'
import { ease } from '../../lib/tokens'
import { cx, formatDuration, formatPriceLabel } from '../../lib/utils'
import { useMediaQuery, useReducedMotion } from '../../hooks/hooks'
import { Accordion } from '../ui/Accordion'
import { Photo } from '../ui/Photo'
import { Reveal } from '../motion/Reveal'
import { brand } from '../../config/brand'

function Featured({ slug }: { slug: Parameters<typeof getFeaturedServices>[0] }) {
  return (
    <ul className="menu-featured">
      {getFeaturedServices(slug, 3).map((s) => (
        <li key={s.slug}>
          <Link to={`/services/${s.slug}`}>
            <span>{s.name}</span>
            <span className="note">{formatDuration(s.duration)} · {formatPriceLabel(s)}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Editorial index of categories. Desktop: hover/focus swaps an arch-framed preview. Touch: accordion. */
export function BeautyMenu() {
  const cats = getCategories()
  const [active, setActive] = useState(cats[0]?.slug)
  const wide = useMediaQuery('(min-width: 1024px) and (hover: hover)')
  const reduce = useReducedMotion()
  const current = cats.find((c) => c.slug === active) ?? cats[0]

  return (
    <section className="section beauty-menu" aria-labelledby="menu-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">The beauty menu</p>
          <h2 id="menu-title" className="display d-lg">Ten ways to <em>begin</em>.</h2>
        </Reveal>
        {wide ? (
          <div className="menu-wide">
            <ul className="menu-index" onPointerLeave={() => undefined}>
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/services#${c.slug}`}
                    className={cx('menu-link display', c.slug === active && 'is-on')}
                    data-cursor="VIEW"
                    onPointerEnter={() => setActive(c.slug)}
                    onFocus={() => setActive(c.slug)}
                  >
                    <span className="num">{String(c.order).padStart(2, '0')}</span>
                    <span>{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {current && (
              <aside className="menu-preview" aria-live="polite">
                <div className="menu-frame arch">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={current.slug}
                      className="menu-frame-img"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0.01 : 0.6, ease: ease.reveal }}
                    >
                      <Photo name={current.image} alt="" className="ratio-fill" sizes="30vw" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="menu-detail">
                  <p className="muted">{current.description}</p>
                  <Featured slug={current.slug} />
                  <Link to={`/services#${current.slug}`} className="link-u">Explore <ArrowUpRight size={14} aria-hidden="true" /></Link>
                </div>
              </aside>
            )}
          </div>
        ) : (
          <Accordion
            className="menu-acc"
            items={cats.map((c) => ({
              id: c.slug,
              title: <span className="display d-sm"><span className="num">{String(c.order).padStart(2, '0')}</span> {c.title}</span>,
              content: (
                <div className="menu-acc-body">
                  <Photo name={c.image} alt="" className="arch ratio-34" sizes="60vw" />
                  <p className="muted">{c.description}</p>
                  <Featured slug={c.slug} />
                  <Link to={`/services#${c.slug}`} className="link-u">Explore {c.title}</Link>
                </div>
              ),
            }))}
          />
        )}
        {!brand.pricesConfirmed && <p className="note menu-note">Sample pricing — confirm with salon.</p>}
      </div>
    </section>
  )
}

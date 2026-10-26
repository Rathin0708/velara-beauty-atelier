import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand } from '../../config/brand'
import { primaryNav } from '../../config/navigation'
import { getCategories, getFeaturedServices } from '../../lib/api'
import { ScrollTrigger } from '../../lib/gsap'
import { ease } from '../../lib/tokens'
import { cx, formatPriceLabel } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/hooks'
import { BookButton } from '../ui/BookButton'
import { Photo } from '../ui/Photo'
import { Monogram } from '../ui/Monogram'
import { MobileMenu } from './MobileMenu'

export function Wordmark({ light }: { light?: boolean }) {
  return (
    <Link to="/" className={cx('wordmark', light && 'wordmark--light')} aria-label={`${brand.name} — home`}>
      <Monogram size={26} />
      <span>{brand.name}</span>
    </Link>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  // Open state is tied to the path it was opened on, so navigating closes both without an effect.
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const [megaPath, setMegaPath] = useState<string | null>(null)
  const [previewCat, setPreviewCat] = useState(getCategories()[0]?.slug)
  const { pathname } = useLocation()
  const menuOpen = menuPath === pathname
  const mega = megaPath === pathname
  const setMenuOpen = (v: boolean) => setMenuPath(v ? pathname : null)
  const setMega = (v: boolean | ((p: boolean) => boolean)) => setMegaPath((typeof v === 'function' ? v(mega) : v) ? pathname : null)
  const reduce = useReducedMotion()
  const megaWrap = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const cats = getCategories()

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setScrolled(y > 40)
        if (self.direction === 1 && y > 260) setHidden(true)
        else if (self.direction === -1) setHidden(false)
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    if (!mega) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaPath(null)
        megaWrap.current?.querySelector<HTMLElement>('.mega-toggle')?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (megaWrap.current && e.target instanceof Node && !megaWrap.current.contains(e.target)) setMegaPath(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [mega])

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMega(true)
  }
  const delayedClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(false), 160)
  }

  const preview = cats.find((c) => c.slug === previewCat) ?? cats[0]

  return (
    <>
      <header className={cx('site-header', scrolled && 'is-scrolled', hidden && !menuOpen && !mega && 'is-hidden')}>
        <div className="header-inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Primary">
            {primaryNav.map((l) => {
              const active = pathname === l.to || pathname.startsWith(`${l.to}/`)
              const isServices = l.to === '/services'
              return (
                <div
                  key={l.to}
                  className="nav-item"
                  ref={isServices ? megaWrap : undefined}
                  onPointerEnter={isServices ? (e) => e.pointerType === 'mouse' && openMega() : undefined}
                  onPointerLeave={isServices ? (e) => e.pointerType === 'mouse' && delayedClose() : undefined}
                >
                  <NavLink to={l.to} className={cx('nav-link', active && 'is-active')} onFocus={isServices ? openMega : undefined}>
                    {l.label}
                    {active && <motion.span layoutId="nav-indicator" className="nav-indicator" transition={{ duration: reduce ? 0 : 0.5, ease: ease.reveal }} />}
                  </NavLink>
                  {isServices && (
                    <>
                      <button type="button" className="mega-toggle" aria-expanded={mega} aria-controls="mega-panel" aria-label="Toggle services menu" onClick={() => setMega((v) => !v)}>
                        <ChevronDown size={14} />
                      </button>
                      <AnimatePresence>
                        {mega && (
                          <motion.div
                            id="mega-panel"
                            className="mega"
                            initial={reduce ? false : { opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: reduce ? 0 : 0.3, ease: ease.reveal }}
                            onPointerEnter={openMega}
                            onPointerLeave={delayedClose}
                          >
                            <ul className="mega-list">
                              {cats.map((c) => (
                                <li key={c.slug}>
                                  <Link to={`/services#${c.slug}`} onPointerEnter={() => setPreviewCat(c.slug)} onFocus={() => setPreviewCat(c.slug)} onClick={() => setMega(false)}>
                                    <span className="num">{String(c.order).padStart(2, '0')}</span> {c.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            {preview && (
                              <div className="mega-preview">
                                <Photo name={preview.image} alt="" className="arch ratio-34" sizes="260px" />
                                <p className="meta">{getFeaturedServices(preview.slug, 1).map((s) => `${s.name} · ${formatPriceLabel(s)}`)}</p>
                                <Link to="/services" className="link-u" onClick={() => setMega(false)}>View full menu</Link>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              )
            })}
          </nav>
          <div className="header-cta">
            <span className="desktop-only"><BookButton magnetic size="sm" /></span>
            <button type="button" className="menu-btn" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

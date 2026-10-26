import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../../config/brand'
import { gsap, useGSAP } from '../../lib/gsap'
import { BookButton } from '../ui/BookButton'
import { Photo } from '../ui/Photo'
import { LightSweep } from '../motion/LightSweep'
import { SplitText } from '../motion/SplitText'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Entrance: copy fades in after the image sweep and headline are underway (total ≤ 1.6s).
        gsap.from('.hero-fade', { opacity: 0, y: 18, duration: 0.7, stagger: 0.09, delay: 0.75, ease: 'power3.out' })
        // Scroll-out: image scales slightly, headline drifts up faster than the image. Transform only.
        const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero-main', { scale: 1.07, ease: 'none', scrollTrigger: st })
        gsap.to('.hero-title', { yPercent: -28, ease: 'none', scrollTrigger: st })
        gsap.to('.hero-detail', { yPercent: -14, ease: 'none', scrollTrigger: st })
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-main-wrap">
          <LightSweep trigger="load" className="hero-main arch">
            <Photo name="heroPortrait" alt="Portrait with a bold red lip and gold hoop earrings" eager sizes="(min-width: 1024px) 46vw, 92vw" position="50% 28%" mobilePosition="50% 22%" className="ratio-hero" />
          </LightSweep>
          <div className="hero-wash" aria-hidden="true" />
        </div>
        <LightSweep trigger="load" delay={0.45} focusPull className="hero-detail">
          <Photo name="heroDetail" alt="Close-up of cosmetics and makeup tools" eager sizes="(min-width: 1024px) 22vw, 44vw" />
        </LightSweep>
        <h1 id="hero-title" className="hero-title display d-hero">
          <SplitText as="span" text="Become *Radiant*" trigger="load" delay={0.2} className="hero-split" />
        </h1>
        <p className="hero-micro meta hero-fade">{brand.name} · Beauty Atelier</p>
        <div className="hero-copy hero-fade">
          <p className="lede">{brand.tagline}. Hair, makeup, bridal, skin and nails, in a calm room built around you.</p>
          <div className="hero-cta">
            <BookButton magnetic>Book an Appointment</BookButton>
            <Link to="/services" className="btn btn--ghost" data-cursor="VIEW">Explore Services</Link>
          </div>
        </div>
        <div className="scroll-ind hero-fade" aria-hidden="true">
          <span className="meta">Scroll</span>
          <span className="scroll-line"><span className="scroll-dot" /></span>
        </div>
      </div>
    </section>
  )
}

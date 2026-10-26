import { useRef, useState } from 'react'
import { getChapters } from '../../lib/api'
import { gsap, useGSAP } from '../../lib/gsap'
import { cx } from '../../lib/utils'
import { useMediaQuery } from '../../hooks/hooks'
import { Photo } from '../ui/Photo'
import { Reveal } from '../motion/Reveal'

const PIN_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

/** Pinned storytelling on capable screens; stacked chapters on mobile and under reduced motion. */
export function ExperienceStory() {
  const chapters = getChapters()
  const pinned = useMediaQuery(PIN_QUERY)
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const el = root.current
      if (!el || !pinned) return
      const mm = gsap.matchMedia()
      mm.add(PIN_QUERY, () => {
        const imgs = gsap.utils.toArray<HTMLElement>('.story-img', el)
        const texts = gsap.utils.toArray<HTMLElement>('.story-chapter', el)
        gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(texts.slice(1), { opacity: 0, y: 40 })
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${window.innerHeight * 3}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(chapters.length - 1, Math.round(self.progress * (chapters.length - 1)))),
          },
        })
        tl.to('.story-bar-fill', { scaleX: 1, duration: chapters.length - 1 }, 0)
        for (let i = 1; i < chapters.length; i++) {
          tl.to(texts[i - 1], { opacity: 0, y: -30, duration: 0.3 }, i - 0.45)
          tl.to(imgs[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 }, i - 0.5)
          tl.to(texts[i], { opacity: 1, y: 0, duration: 0.4 }, i - 0.1)
        }
      })
    },
    { scope: root, dependencies: [pinned] },
  )

  if (!pinned) {
    return (
      <section className="section section--dark story-stack" aria-labelledby="story-title">
        <div className="container">
          <p className="eyebrow">The signature experience</p>
          <h2 id="story-title" className="display d-lg">Four chapters, <em>unhurried</em>.</h2>
          <ol className="story-list">
            {chapters.map((c, i) => (
              <Reveal as="li" key={c.title} className="story-item">
                <Photo name={c.image} alt="" className="ratio-45 arch-sm" sizes="(min-width: 768px) 50vw, 90vw" />
                <div>
                  <p className="num">0{i + 1}</p>
                  <h3 className="display d-md">{c.title}</h3>
                  <p className="muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section ref={root} className="section--dark story" aria-labelledby="story-title">
      <div className="story-pin">
        <div className="story-text">
          <p className="eyebrow">The signature experience</p>
          <h2 id="story-title" className="display d-lg">Four chapters, <em>unhurried</em>.</h2>
          <div className="story-chapters">
            {chapters.map((c, i) => (
              <article key={c.title} className="story-chapter">
                <p className="num">0{i + 1} — {c.kicker}</p>
                <h3 className="display d-md">{c.title}</h3>
                <p className="lede">{c.body}</p>
              </article>
            ))}
          </div>
          <div className="story-progress" aria-label={`Chapter ${active + 1} of ${chapters.length}`} role="img">
            <ol>
              {chapters.map((c, i) => (
                <li key={c.title} className={cx(i === active && 'is-on')}>0{i + 1}</li>
              ))}
            </ol>
            <div className="story-bar"><span className="story-bar-fill" /></div>
          </div>
        </div>
        <div className="story-media arch">
          {chapters.map((c, i) => (
            <div key={c.title} className="story-img" style={{ zIndex: i + 1 }}>
              <Photo name={c.image} alt={i === active ? c.title : ''} className="ratio-fill" sizes="40vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

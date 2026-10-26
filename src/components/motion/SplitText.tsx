import { Fragment, useRef, type ElementType } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { dur, ease, stagger } from '../../lib/tokens'
import { parseEmphasis, stripEmphasis } from '../../lib/utils'

interface Props {
  text: string
  as?: ElementType
  className?: string
  trigger?: 'load' | 'scroll'
  delay?: number
}

/**
 * Word-masked heading reveal. `*italic*` marks emotional words.
 * Screen readers get the original text via aria-label; the animated spans are aria-hidden.
 */
export function SplitText({ text, as: Tag = 'h2', className, trigger = 'scroll', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const segments = parseEmphasis(text)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = el.querySelectorAll('.word > span')
        gsap.from(words, {
          yPercent: 115,
          duration: trigger === 'load' ? dur.hero : dur.reveal,
          ease: trigger === 'load' ? ease.gsapHero : ease.gsapReveal,
          stagger: stagger.text,
          delay,
          scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
        })
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      <span className="vh">{stripEmphasis(text)}</span>
      <span aria-hidden="true">
        {segments.map((seg, si) =>
          seg.text.split(' ').filter(Boolean).map((w, wi) => {
            const inner = (
              <span className="word">
                <span>{w}</span>
              </span>
            )
            return (
              <Fragment key={`${si}-${wi}`}>
                {seg.em ? <em>{inner}</em> : inner}{' '}
              </Fragment>
            )
          }),
        )}
      </span>
    </Tag>
  )
}

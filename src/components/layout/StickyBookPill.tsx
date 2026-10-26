import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import { useBooking } from '../booking/state'
import { BookButton } from '../ui/BookButton'

/** Mobile-only bottom pill: appears after the hero, hides while booking is open or near the footer. */
export function StickyBookPill() {
  const [pastHero, setPastHero] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const { isOpen } = useBooking()
  useEffect(() => {
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => setPastHero(s.scroll() > window.innerHeight * 0.85) })
    const footer = document.getElementById('site-footer')
    const io = footer ? new IntersectionObserver(([e]) => setNearFooter(e.isIntersecting), { rootMargin: '0px 0px 120px 0px' }) : null
    if (footer) io?.observe(footer)
    return () => {
      st.kill()
      io?.disconnect()
    }
  }, [])
  const visible = pastHero && !isOpen && !nearFooter
  return (
    <div className="book-pill" data-visible={visible} inert={!visible}>
      <BookButton className="book-pill-btn">Book</BookButton>
    </div>
  )
}

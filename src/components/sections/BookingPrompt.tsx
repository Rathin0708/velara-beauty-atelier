import type { CategorySlug } from '../../data/types'
import { BookButton } from '../ui/BookButton'
import { SplitText } from '../motion/SplitText'

const QUICK: Array<{ label: string; category: CategorySlug }> = [
  { label: 'Hair', category: 'hair-styling' },
  { label: 'Makeup', category: 'makeup' },
  { label: 'Bridal', category: 'bridal-makeup' },
  { label: 'Skin', category: 'facials-skincare' },
  { label: 'Nails', category: 'mani-pedi' },
]

export function BookingPrompt() {
  return (
    <section className="section section--blush booking-prompt" aria-labelledby="prompt-title">
      <div className="container center">
        <SplitText as="h2" text="Your chair is *waiting*." className="display d-hero prompt-title" />
        <p className="lede center-lede">Choose where to begin. We will take you to the right place in the booking flow.</p>
        <div className="cta-row center-row">
          <BookButton magnetic>Book an Appointment</BookButton>
        </div>
        <div className="chips center-row" role="group" aria-label="Quick pick a category">
          {QUICK.map((q) => (
            <BookButton key={q.label} variant="ghost" size="sm" preset={{ category: q.category }}>{q.label}</BookButton>
          ))}
        </div>
      </div>
    </section>
  )
}

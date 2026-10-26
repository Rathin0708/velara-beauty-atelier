import { Link } from 'react-router-dom'
import { getGallery, getGenuineBeforeAfter } from '../../lib/api'
import { BeforeAfterSlider } from '../gallery/BeforeAfterSlider'
import { GalleryGrid } from '../gallery/GalleryGrid'
import { Atmosphere } from './Atmosphere'
import { BookingPrompt } from './BookingPrompt'
import { BridalCampaign } from './BridalCampaign'
import { ContactBlock } from './ContactBlock'
import { ExperienceStory } from './ExperienceStory'
import { FaqList } from './FaqList'
import { Testimonials } from './Testimonials'
import { BeautyMenu } from '../services/BeautyMenu'
import { FeaturedPackages, PriceMenu } from '../services/PriceMenu'
import { TeamRail } from '../team/TeamRail'
import { Reveal } from '../motion/Reveal'
import { SplitText } from '../motion/SplitText'

const HOME_FILTERS = [
  { id: 'all', label: 'All' }, { id: 'hair', label: 'Hair' }, { id: 'makeup', label: 'Makeup' },
  { id: 'bridal', label: 'Bridal' }, { id: 'nails', label: 'Nails' },
] as const

/** Everything below the hero: split into its own chunk to keep first load light. */
export default function HomeSections() {
  const pairs = getGenuineBeforeAfter()
  return (
    <>
      <BeautyMenu />
      <ExperienceStory />

      <section className="section" aria-labelledby="looks-title">
        <div className="container">
          <Reveal className="section-head split">
            <div>
              <p className="eyebrow">Looks &amp; inspiration</p>
              <h2 id="looks-title" className="display d-lg">Looks we <em>love</em>.</h2>
            </div>
            <Link to="/gallery" className="link-u">View the gallery</Link>
          </Reveal>
          <GalleryGrid items={getGallery().filter((g) => g.category !== 'skin' && g.category !== 'space')} filters={[...HOME_FILTERS]} limit={8} />
          {pairs.length > 0 && (
            <div className="ba-wrap">
              <h3 className="display d-md">Before &amp; after</h3>
              <BeforeAfterSlider item={pairs[0]} />
            </div>
          )}
        </div>
      </section>

      <BridalCampaign />

      <section className="section section--dark" aria-labelledby="team-title">
        <div className="container">
          <Reveal className="section-head split">
            <div>
              <p className="eyebrow">The professionals</p>
              <h2 id="team-title" className="display d-lg">Meet the <em>hands</em>.</h2>
            </div>
            <Link to="/team" className="link-u">All professionals</Link>
          </Reveal>
        </div>
        <TeamRail />
      </section>

      <section className="section section--champagne" aria-labelledby="price-title">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Packages &amp; pricing</p>
            <SplitText as="h2" text="A menu, *plainly* priced." className="display d-lg" />
          </Reveal>
          <PriceMenu />
          <div className="spacer" />
          <FeaturedPackages />
          <p className="center"><Link to="/packages" className="link-u">All packages</Link></p>
        </div>
      </section>

      <Testimonials />
      <Atmosphere />
      <BookingPrompt />

      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 id="faq-title" className="display d-lg">Questions, <em>answered</em>.</h2>
            <Link to="/faq" className="link-u">All questions</Link>
          </div>
          <FaqList limit={6} />
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="visit-title">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">Visit</p>
            <h2 id="visit-title" className="display d-lg">Find the <em>atelier</em>.</h2>
            <Link to="/contact" className="link-u">Contact page</Link>
          </div>
          <ContactBlock dark />
        </div>
      </section>
    </>
  )
}

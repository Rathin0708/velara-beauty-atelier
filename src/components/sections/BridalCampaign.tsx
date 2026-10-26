import { Link } from 'react-router-dom'
import { brand } from '../../config/brand'
import { getServiceBySlug } from '../../lib/api'
import { formatPriceLabel } from '../../lib/utils'
import { Photo } from '../ui/Photo'
import { BookButton } from '../ui/BookButton'
import { Reveal } from '../motion/Reveal'
import { ScaleExpand } from '../motion/ScaleExpand'
import { SplitText } from '../motion/SplitText'

const HIGHLIGHTS = ['bridal-makeup', 'pre-bridal-glow-ritual', 'family-and-party-makeup']

export function BridalCampaign() {
  const items = HIGHLIGHTS.flatMap((s) => getServiceBySlug(s) ?? [])
  return (
    <section className="bridal" aria-labelledby="bridal-title">
      <ScaleExpand className="bridal-media">
        <Photo name="bridal5" alt="A bride in a white lace gown and veil holding flowers on a staircase" className="ratio-bridal" sizes="100vw" position="50% 30%" mobilePosition="50% 20%" />
      </ScaleExpand>
      <div className="container bridal-copy">
        <p className="eyebrow">Bridal beauty</p>
        <SplitText as="h2" text="For the most *photographed* day of your life" className="display d-xl" />
        <Reveal items="li" as="ul" className="bridal-list">
          {items.map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`} className="display d-sm">{s.name}</Link>
              <span className="note">{formatPriceLabel(s)}</span>
            </li>
          ))}
        </Reveal>
        {!brand.pricesConfirmed && <p className="note">Sample pricing — confirm with salon.</p>}
        <div className="cta-row">
          <BookButton preset={{ category: 'bridal-makeup' }}>Enquire about Bridal</BookButton>
          <Link to="/bridal" className="btn btn--ghost">View Bridal Experience</Link>
        </div>
      </div>
    </section>
  )
}

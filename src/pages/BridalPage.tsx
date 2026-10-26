import { brand } from '../config/brand'
import { useDocumentMeta } from '../hooks/hooks'
import { getGallery, getPackages, getServiceBySlug } from '../lib/api'
import { formatDuration, formatPrice } from '../lib/utils'
import { GalleryGrid } from '../components/gallery/GalleryGrid'
import { PageHead } from '../components/layout/PageHead'
import { LightSweep } from '../components/motion/LightSweep'
import { Reveal } from '../components/motion/Reveal'
import { BookButton } from '../components/ui/BookButton'
import { Photo } from '../components/ui/Photo'

const JOURNEY = [
  { when: 'As soon as the date is set', title: 'First conversation', body: 'Share your date, venue, outfits and references. We map out the weeks ahead.' },
  { when: '2–4 weeks before', title: 'Pre-bridal glow', body: 'A calm sequence of skin, body and hand care so you arrive rested.' },
  { when: '3–6 weeks before', title: 'The trial', body: 'A full makeup and hair trial in natural light, with notes agreed for the day.' },
  { when: 'The morning', title: 'The day', body: 'Unhurried, on schedule, with touch-up guidance so the look lasts.' },
]

export default function BridalPage() {
  useDocumentMeta('Bridal', 'Bridal makeup, pre-bridal rituals and trials at VELARA.')
  const bridal = getPackages('bridal')
  const items = ['bridal-makeup-trial', 'bridal-makeup', 'bridal-hair-styling', 'pre-bridal-glow-ritual', 'family-and-party-makeup'].flatMap((s) => getServiceBySlug(s) ?? [])
  return (
    <div className="page">
      <PageHead eyebrow="Bridal beauty" title="Your day, *beautifully* unhurried" lede="A considered bridal journey, from the first conversation to the final touch-up." >
        <div className="cta-row"><BookButton preset={{ category: 'bridal-makeup' }}>Enquire about Bridal</BookButton></div>
      </PageHead>
      <div className="container split-2">
        <LightSweep className="arch"><Photo name="bridal2" alt="Bridal look with ornate gold jewellery and a veil" className="ratio-34" sizes="(min-width: 1024px) 40vw, 90vw" eager /></LightSweep>
        <Reveal>
          <h2 className="display d-md">A look that is <em>yours</em></h2>
          <p className="lede">Whether traditional red and gold or a soft modern palette, the brief is the same: you, photographed beautifully, comfortable from the first ceremony to the last dance.</p>
          <p className="muted">Trials are recommended for every bridal booking. Bring references, jewellery and outfit details.</p>
        </Reveal>
      </div>

      <section className="section" aria-labelledby="journey-title">
        <div className="container">
          <h2 id="journey-title" className="display d-lg">The bridal <em>journey</em></h2>
          <Reveal as="ol" items="li" className="journey">
            {JOURNEY.map((j, i) => (
              <li key={j.title}>
                <span className="num">0{i + 1}</span>
                <p className="meta">{j.when}</p>
                <h3 className="display d-sm">{j.title}</h3>
                <p className="muted">{j.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--champagne" aria-labelledby="compare-title">
        <div className="container">
          <h2 id="compare-title" className="display d-lg">Compare <em>packages</em></h2>
          <div className="table-wrap">
            <table className="compare">
              <caption className="vh">Bridal packages compared</caption>
              <thead><tr><th scope="col">Package</th><th scope="col">Includes</th><th scope="col">Price</th><th scope="col"><span className="vh">Book</span></th></tr></thead>
              <tbody>
                {bridal.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row">{p.name}<br /><span className="note">{p.tagline}</span></th>
                    <td>{p.highlights.join(' · ')}</td>
                    <td>{p.priceFrom ? 'from ' : ''}{formatPrice(p.price)}</td>
                    <td><BookButton variant="ghost" size="sm" preset={{ category: 'bridal-makeup', services: p.services.filter((x) => getServiceBySlug(x)) }}>Book</BookButton></td>
                  </tr>
                ))}
                {items.map((s) => (
                  <tr key={s.slug}><th scope="row">{s.name}</th><td>{formatDuration(s.duration)}</td><td>{s.priceFrom ? 'from ' : ''}{formatPrice(s.price)}</td><td><BookButton variant="ghost" size="sm" preset={{ services: [s.slug] }}>Book</BookButton></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          {!brand.pricesConfirmed && <p className="note">Sample pricing — confirm with salon.</p>}
        </div>
      </section>

      <section className="section" aria-labelledby="bg-title">
        <div className="container">
          <h2 id="bg-title" className="display d-lg">Bridal <em>inspiration</em></h2>
          <GalleryGrid items={getGallery('bridal')} filters={[{ id: 'all', label: 'All' }]} />
        </div>
      </section>
    </div>
  )
}

import { Link, useParams } from 'react-router-dom'
import { brand } from '../config/brand'
import { useDocumentMeta } from '../hooks/hooks'
import { getCategory, getMember, getRelatedServices, getServiceBySlug } from '../lib/api'
import { formatDuration, formatPriceLabel } from '../lib/utils'
import { LightSweep } from '../components/motion/LightSweep'
import { Reveal } from '../components/motion/Reveal'
import { SplitText } from '../components/motion/SplitText'
import { BookButton } from '../components/ui/BookButton'
import { Photo } from '../components/ui/Photo'
import NotFoundPage from './NotFoundPage'

export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const s = getServiceBySlug(slug)
  useDocumentMeta(s ? s.name : 'Service not found', s?.description)
  if (!s) return <NotFoundPage />
  const cat = getCategory(s.category)
  const pros = s.professionals.flatMap((p) => getMember(p) ?? [])
  return (
    <article className="page service-detail">
      <div className="container sd-hero">
        <div className="sd-copy">
          <p className="eyebrow"><Link to={`/services#${s.category}`}>{cat?.title}</Link></p>
          <SplitText as="h1" text={s.name} trigger="load" className="display d-xl" />
          <p className="lede">{s.description}</p>
          <dl className="sd-facts">
            <div><dt className="meta">Duration</dt><dd>{formatDuration(s.duration)}</dd></div>
            <div><dt className="meta">Price</dt><dd>{formatPriceLabel(s)}</dd></div>
          </dl>
          {!brand.pricesConfirmed && <p className="note">Sample pricing — confirm with salon.</p>}
          <div className="cta-row">
            <BookButton preset={{ services: [s.slug], category: s.category }}>Book this service</BookButton>
            <Link to="/services" className="btn btn--ghost">Full menu</Link>
          </div>
        </div>
        <LightSweep trigger="load" className="sd-img arch">
          <Photo name={s.image} alt={`${s.name}: inspiration image`} eager className="ratio-34" sizes="(min-width: 1024px) 40vw, 90vw" />
        </LightSweep>
      </div>
      <div className="container sd-grid">
        <Reveal><h2 className="display d-sm">What’s included</h2><ul className="bullets">{s.includes.map((i) => <li key={i}>{i}</li>)}</ul></Reveal>
        <Reveal><h2 className="display d-sm">Suitable for</h2><ul className="bullets">{s.suitableFor.map((i) => <li key={i}>{i}</li>)}</ul></Reveal>
        <Reveal><h2 className="display d-sm">Aftercare</h2><ul className="bullets">{s.aftercare.map((i) => <li key={i}>{i}</li>)}</ul></Reveal>
      </div>
      {pros.length > 0 && (
        <div className="container sd-pros">
          <h2 className="display d-sm">Book with</h2>
          <div className="cta-row">
            {pros.map((p) => <BookButton key={p.slug} variant="ghost" size="sm" preset={{ services: [s.slug], pro: p.slug }}>{p.name} <span className="tag">Sample</span></BookButton>)}
          </div>
        </div>
      )}
      <section className="container section" aria-labelledby="related-title">
        <h2 id="related-title" className="display d-md">Related services</h2>
        <ul className="svc-list">
          {getRelatedServices(s).map((r) => (
            <li key={r.slug} className="svc-row">
              <div><h3 className="display d-sm"><Link to={`/services/${r.slug}`}>{r.name}</Link></h3><p className="muted">{r.description}</p></div>
              <p className="svc-meta"><span>{formatDuration(r.duration)}</span><strong>{formatPriceLabel(r)}</strong></p>
              <BookButton variant="ghost" size="sm" preset={{ services: [r.slug], category: r.category }}>Book</BookButton>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

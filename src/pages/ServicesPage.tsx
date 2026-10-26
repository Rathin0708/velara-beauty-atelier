import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
import { useDocumentMeta } from '../hooks/hooks'
import { getCategories, getServices } from '../lib/api'
import { cx, formatDuration, formatPriceLabel, searchServices } from '../lib/utils'
import { PageHead } from '../components/layout/PageHead'
import { scrollToHash } from '../lib/scroll'
import { BookButton } from '../components/ui/BookButton'
import { Photo } from '../components/ui/Photo'

export default function ServicesPage() {
  useDocumentMeta('Services', 'The full VELARA service menu: hair, makeup, bridal, skin, nails and spa rituals.')
  const cats = getCategories()
  const [query, setQuery] = useState('')
  const [spy, setSpy] = useState<string | undefined>(cats[0]?.slug)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setSpy(hit.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    document.querySelectorAll('.svc-cat').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [query])

  const filtered = searchServices(getServices(), query)
  return (
    <div className="page">
      <PageHead eyebrow="The full menu" title="Services, *in full*" lede="Every service, with honest durations and sample prices. Choose Book on any line to start a demo request.">
        <div className="field svc-search">
          <label htmlFor="svc-q">Search services</label>
          <input id="svc-q" className="input" type="search" placeholder="e.g. balayage, facial, gel" value={query} onChange={(e) => setQuery(e.target.value)} />
          <p className="note" role="status">{filtered.length} services</p>
        </div>
      </PageHead>
      <div className="container svc-layout">
        <nav className="svc-subnav" aria-label="Service categories">
          <ul>
            {cats.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className={cx(spy === c.slug && 'is-on')} aria-current={spy === c.slug ? 'location' : undefined} onClick={(e) => { e.preventDefault(); history.replaceState(null, '', `#${c.slug}`); scrollToHash(c.slug, true); setSpy(c.slug) }}>
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="svc-main">
          {cats.map((c) => {
            const list = filtered.filter((s) => s.category === c.slug)
            if (!list.length) return null
            return (
              <section key={c.slug} id={c.slug} className="svc-cat" aria-labelledby={`h-${c.slug}`}>
                <div className="svc-cat-head">
                  <Photo name={c.image} alt="" className="arch-sm ratio-34 svc-cat-img" sizes="160px" />
                  <div>
                    <h2 id={`h-${c.slug}`} className="display d-md">{c.title}</h2>
                    <p className="muted">{c.description}</p>
                  </div>
                </div>
                <ul className="svc-list">
                  {list.map((s) => (
                    <li key={s.slug} className="svc-row">
                      <div>
                        <h3 className="display d-sm"><Link to={`/services/${s.slug}`}>{s.name}</Link></h3>
                        <p className="muted">{s.description}</p>
                      </div>
                      <p className="svc-meta"><span>{formatDuration(s.duration)}</span><strong>{formatPriceLabel(s)}</strong></p>
                      <BookButton variant="ghost" size="sm" preset={{ services: [s.slug], category: s.category }}>Book</BookButton>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
          {filtered.length === 0 && <p>No services match “{query}”. Try a shorter word.</p>}
          {!brand.pricesConfirmed && <p className="note">Sample pricing — confirm with salon.</p>}
        </div>
      </div>
    </div>
  )
}

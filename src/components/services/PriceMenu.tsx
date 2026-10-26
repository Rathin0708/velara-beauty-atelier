import { useState } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../../config/brand'
import type { Pillar } from '../../data/types'
import { getCategories, getPackages, getServices } from '../../lib/api'
import { formatDuration, formatPrice, formatPriceLabel } from '../../lib/utils'
import { BookButton } from '../ui/BookButton'
import { Tabs } from '../ui/Tabs'

const TABS: Array<{ id: Pillar; label: string }> = [
  { id: 'hair', label: 'Hair' },
  { id: 'skin', label: 'Skin & Body' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'nails', label: 'Nails' },
  { id: 'combo', label: 'Combinations' },
]

/** Tabbed price list with dotted leaders: service — duration — price. */
export function PriceMenu() {
  const [tab, setTab] = useState<Pillar>('hair')
  const cats = getCategories().filter((c) => c.pillar === tab)
  const combos = getPackages().filter((p) => p.kind !== 'bridal')
  return (
    <div className="price-menu">
      <Tabs tabs={TABS} active={tab} onChange={(id) => setTab(id as Pillar)} label="Price categories">
        {tab === 'combo' ? (
          <ul className="price-list">
            {combos.map((p) => (
              <li key={p.slug} className="price-row">
                <span className="price-name">{p.name}</span>
                <span className="leader" aria-hidden="true" />
                <span className="price-val">{p.priceFrom ? 'from ' : ''}{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        ) : (
          cats.map((c) => (
            <div key={c.slug} className="price-group">
              <h3 className="meta">{c.title}</h3>
              <ul className="price-list">
                {getServices(c.slug).map((s) => (
                  <li key={s.slug} className="price-row">
                    <Link to={`/services/${s.slug}`} className="price-name">{s.name}</Link>
                    <span className="leader" aria-hidden="true" />
                    <span className="price-dur">{formatDuration(s.duration)}</span>
                    <span className="price-val">{formatPriceLabel(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </Tabs>
      {!brand.pricesConfirmed && <p className="note">Sample pricing — confirm with salon.</p>}
    </div>
  )
}

export function FeaturedPackages() {
  const pk = getPackages()
  const [a, b, c] = [pk[0], pk[2], pk[1]]
  return (
    <div className="pk-grid">
      {[a, b, c].map((p, i) => (
        <article key={p.slug} className={`pk pk--${i}`}>
          <p className="meta">{p.kind}</p>
          <h3 className="display d-md">{p.name}</h3>
          <p className="muted">{p.tagline}</p>
          <ul className="pk-points">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="pk-price display d-sm">{p.priceFrom ? 'from ' : ''}{formatPrice(p.price)}</p>
          {!brand.pricesConfirmed && <span className="tag">Sample pricing</span>}
          <BookButton variant={i === 1 ? 'ivory' : 'ghost'} size="sm" preset={{ services: p.services.filter((s) => getServices().some((x) => x.slug === s)) }}>Book this</BookButton>
        </article>
      ))}
    </div>
  )
}

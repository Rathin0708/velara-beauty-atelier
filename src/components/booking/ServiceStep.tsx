import { useState } from 'react'
import { getCategories, getServices } from '../../lib/api'
import { cx, formatDuration, formatPriceLabel, searchServices } from '../../lib/utils'
import type { CategorySlug } from '../../data/types'
import { useBooking } from './state'

export function ServiceStep() {
  const { flow, patch } = useBooking()
  const [query, setQuery] = useState('')
  const cats = getCategories()
  const active = flow.category
  const list = searchServices(getServices(query ? undefined : (active ?? undefined)), query)

  const toggle = (slug: string) => {
    const has = flow.serviceSlugs.includes(slug)
    // Duration changes the slot grid, so any earlier time choice is cleared.
    patch({ serviceSlugs: has ? flow.serviceSlugs.filter((s) => s !== slug) : [...flow.serviceSlugs, slug], time: null })
  }
  const setCat = (c: CategorySlug | null) => patch({ category: c })

  return (
    <div className="bk-step">
      <div className="field">
        <label htmlFor="bk-search">Search services</label>
        <input id="bk-search" className="input" type="search" value={query} placeholder="e.g. facial, balayage" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="chips" role="group" aria-label="Filter by category">
        <button type="button" className={cx('chip', !active && 'is-on')} aria-pressed={!active} onClick={() => setCat(null)}>All</button>
        {cats.map((c) => (
          <button key={c.slug} type="button" className={cx('chip', active === c.slug && 'is-on')} aria-pressed={active === c.slug} onClick={() => setCat(c.slug)}>
            {c.title}
          </button>
        ))}
      </div>
      <p className="note" role="status">{list.length} {list.length === 1 ? 'service' : 'services'} shown</p>
      <ul className="bk-list">
        {list.map((s) => {
          const on = flow.serviceSlugs.includes(s.slug)
          return (
            <li key={s.slug}>
              <label className={cx('bk-service', on && 'is-on')}>
                <input type="checkbox" checked={on} onChange={() => toggle(s.slug)} />
                <span className="bk-service-main">
                  <strong>{s.name}</strong>
                  <span className="note">{formatDuration(s.duration)}</span>
                </span>
                <span className="bk-price">{formatPriceLabel(s)}</span>
              </label>
            </li>
          )
        })}
        {list.length === 0 && <li className="note">No services match your search.</li>}
      </ul>
    </div>
  )
}

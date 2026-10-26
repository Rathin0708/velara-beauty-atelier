import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Pillar } from '../data/types'
import { useDocumentMeta } from '../hooks/hooks'
import { getTeam } from '../lib/api'
import { cx } from '../lib/utils'
import { PageHead } from '../components/layout/PageHead'
import { Reveal } from '../components/motion/Reveal'
import { BookButton } from '../components/ui/BookButton'
import { Photo } from '../components/ui/Photo'

const FILTERS: Array<{ id: Pillar | 'all'; label: string }> = [
  { id: 'all', label: 'All' }, { id: 'hair', label: 'Hair' }, { id: 'makeup', label: 'Makeup' }, { id: 'skin', label: 'Skin' }, { id: 'nails', label: 'Nails' },
]

export default function TeamPage() {
  useDocumentMeta('Team', 'Meet the professionals at VELARA (sample profiles).')
  const [f, setF] = useState<Pillar | 'all'>('all')
  const list = getTeam().filter((m) => f === 'all' || m.specialties.includes(f))
  return (
    <div className="page">
      <PageHead eyebrow="The professionals" title="Meet the *hands*" lede="These are sample profiles that show how the team will appear. Replace them with the salon’s real team." />
      <div className="container">
        <div className="chips" role="group" aria-label="Filter by specialty">
          {FILTERS.map((x) => <button key={x.id} type="button" className={cx('chip', f === x.id && 'is-on')} aria-pressed={f === x.id} onClick={() => setF(x.id)}>{x.label}</button>)}
        </div>
        <Reveal as="ul" items="li" className="team-grid">
          {list.map((m) => (
            <li key={m.slug} className="team-card">
              <Link to={`/team/${m.slug}`} className="team-portrait arch" data-cursor="VIEW">
                <Photo name={m.image} alt={`Sample portrait for ${m.name}`} className="ratio-fill" sizes="(min-width: 1024px) 24vw, 80vw" />
              </Link>
              <div className="team-meta">
                <h2 className="display d-sm"><Link to={`/team/${m.slug}`}>{m.name}</Link></h2>
                <p className="meta">{m.role}</p>
                <p className="muted">{m.descriptor}</p>
                <span className="tag">Sample profile</span>
                <BookButton variant="ghost" size="sm" preset={{ pro: m.slug }}>Book with {m.name}</BookButton>
              </div>
            </li>
          ))}
        </Reveal>
        {list.length === 0 && <p>No professionals match this filter.</p>}
      </div>
    </div>
  )
}

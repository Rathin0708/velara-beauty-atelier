import { Link, useParams } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/hooks'
import { getMember, getServiceBySlug } from '../lib/api'
import { formatPriceLabel } from '../lib/utils'
import { LightSweep } from '../components/motion/LightSweep'
import { SplitText } from '../components/motion/SplitText'
import { BookButton } from '../components/ui/BookButton'
import { Photo } from '../components/ui/Photo'
import NotFoundPage from './NotFoundPage'

export default function TeamProfilePage() {
  const { slug = '' } = useParams()
  const m = getMember(slug)
  useDocumentMeta(m ? m.name : 'Not found', m?.bio)
  if (!m) return <NotFoundPage />
  const svc = m.services.flatMap((s) => getServiceBySlug(s) ?? [])
  return (
    <article className="page container sd-hero">
      <div className="sd-copy">
        <p className="eyebrow"><Link to="/team">Team</Link></p>
        <SplitText as="h1" text={m.name} trigger="load" className="display d-xl" />
        <p className="meta">{m.role}</p>
        <span className="tag">Sample profile</span>
        <p className="lede">{m.bio}</p>
        <h2 className="display d-sm">Signature services</h2>
        <ul className="bullets">
          {svc.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link> — {formatPriceLabel(s)}</li>)}
        </ul>
        <div className="cta-row"><BookButton preset={{ pro: m.slug }}>Book with {m.name}</BookButton></div>
      </div>
      <LightSweep trigger="load" className="sd-img arch">
        <Photo name={m.image} alt={`Sample portrait for ${m.name}`} eager className="ratio-34" sizes="(min-width: 1024px) 40vw, 90vw" />
      </LightSweep>
    </article>
  )
}

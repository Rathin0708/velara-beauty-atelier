import { brand } from '../config/brand'
import { useDocumentMeta } from '../hooks/hooks'
import { getPackages, getServiceBySlug } from '../lib/api'
import { formatPrice } from '../lib/utils'
import { PageHead } from '../components/layout/PageHead'
import { Reveal } from '../components/motion/Reveal'
import { PriceMenu } from '../components/services/PriceMenu'
import { BookButton } from '../components/ui/BookButton'
import { Photo } from '../components/ui/Photo'

export default function PackagesPage() {
  useDocumentMeta('Packages & pricing', 'Sample packages and price menu at VELARA.')
  return (
    <div className="page">
      <PageHead eyebrow="Packages & pricing" title="Priced *plainly*" lede={brand.pricesConfirmed ? undefined : 'All prices on this site are sample pricing — confirm with salon.'} />
      <div className="container">
        <Reveal as="ul" items="li" className="pk-list">
          {getPackages().map((p) => (
            <li key={p.slug} className="pk-row">
              <Photo name={p.image} alt="" className="arch-sm ratio-34 pk-img" sizes="200px" />
              <div>
                <p className="meta">{p.kind}</p>
                <h2 className="display d-md">{p.name}</h2>
                <p className="muted">{p.tagline}</p>
                <p className="note">{p.services.flatMap((s) => getServiceBySlug(s)?.name ?? []).join(' · ')}</p>
              </div>
              <div className="pk-side">
                <p className="display d-sm">{p.priceFrom ? 'from ' : ''}{formatPrice(p.price)}</p>
                {!brand.pricesConfirmed && <span className="tag">Sample pricing</span>}
                <BookButton variant="ghost" size="sm" preset={{ services: p.services.filter((s) => getServiceBySlug(s)) }}>Book this</BookButton>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
      <section className="section" aria-labelledby="menu-all">
        <div className="container">
          <h2 id="menu-all" className="display d-lg">The full <em>price menu</em></h2>
          <PriceMenu />
        </div>
      </section>
    </div>
  )
}

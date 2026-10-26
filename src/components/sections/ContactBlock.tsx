import { brand, placeholders } from '../../config/brand'
import { Configured } from '../ui/Placeholder'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function ContactBlock({ dark }: { dark?: boolean }) {
  const wa = brand.whatsapp.replace(/\D/g, '')
  const hours = brand.hours
  return (
    <div className={dark ? 'contact-block on-dark' : 'contact-block'}>
      <dl className="contact-list">
        <div><dt className="meta">Address</dt><dd><Configured value={brand.address} placeholder={placeholders.address} /></dd></div>
        <div>
          <dt className="meta">Phone</dt>
          <dd><Configured value={brand.phone} placeholder={placeholders.phone}>{(v) => <a href={`tel:${v.replace(/\s/g, '')}`}>{v}</a>}</Configured></dd>
        </div>
        <div>
          <dt className="meta">Email</dt>
          <dd><Configured value={brand.email} placeholder={placeholders.email}>{(v) => <a href={`mailto:${v}`}>{v}</a>}</Configured></dd>
        </div>
        <div>
          <dt className="meta">WhatsApp</dt>
          <dd>
            <Configured value={wa} placeholder={placeholders.whatsapp}>
              {(v) => <a href={`https://wa.me/${v}?text=${encodeURIComponent(`Hello ${brand.shortName}, I would like to make an enquiry.`)}`} target="_blank" rel="noreferrer">Message on WhatsApp</a>}
            </Configured>
          </dd>
        </div>
        <div>
          <dt className="meta">Map</dt>
          <dd><Configured value={brand.mapUrl} placeholder={placeholders.map}>{(v) => <a href={v} target="_blank" rel="noreferrer">Open in maps</a>}</Configured></dd>
        </div>
      </dl>
      <div className="hours">
        <h3 className="meta">Opening hours</h3>
        {hours ? (
          <table>
            <tbody>
              {DAYS.map((d, n) => {
                const h = hours[n as 0 | 1 | 2 | 3 | 4 | 5 | 6]
                return <tr key={d}><th scope="row">{d}</th><td>{h ? `${h.open} – ${h.close}` : 'Closed'}</td></tr>
              })}
            </tbody>
          </table>
        ) : (
          <p><span className="placeholder">{placeholders.hours}</span></p>
        )}
      </div>
    </div>
  )
}

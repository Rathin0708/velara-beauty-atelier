import { ArrowUp } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../../config/brand'
import { footerColumns } from '../../config/navigation'
import { validateEmail } from '../../lib/booking'
import { writeStore } from '../../lib/storage'
import { Monogram } from '../ui/Monogram'

const YEAR = new Date().getFullYear()

function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err = validateEmail(email, true)
    setError(err)
    if (err) return
    writeStore('newsletter-demo', { email, at: new Date().toISOString() })
    setDone(true)
  }
  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <label htmlFor="nl-email" className="meta">Letters from the atelier</label>
      {done ? (
        <p role="status" className="muted">Thank you. This is a demo: your address was saved only in this browser and no email will be sent.</p>
      ) : (
        <>
          <div className="newsletter-row">
            <input id="nl-email" className="input" type="email" autoComplete="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? 'nl-err' : 'nl-note'} />
            <button type="submit" className="btn btn--ivory btn--sm">Subscribe</button>
          </div>
          {error && <p id="nl-err" role="alert" className="error">{error}</p>}
          <p id="nl-note" className="note">Demo form — nothing is sent anywhere.</p>
        </>
      )}
    </form>
  )
}

export function Footer() {
  const social = Object.entries(brand.social).filter(([, url]) => url)
  return (
    <footer id="site-footer" className="site-footer section--dark on-dark">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="display d-md">Beauty, <em>unhurried</em>.</p>
            <Newsletter />
          </div>
          <div className="footer-cols">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="meta">{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
            {social.length > 0 && (
              <nav aria-label="Social">
                <h2 className="meta">Follow</h2>
                <ul>
                  {social.map(([name, url]) => (
                    <li key={name}><a href={url} target="_blank" rel="noreferrer" className="cap">{name}</a></li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
        <div className="footer-mark" aria-hidden="true">
          <Monogram size={64} />
          <span className="display">{brand.name}</span>
        </div>
        <div className="footer-bottom">
          <p className="note">© {YEAR} {brand.name} — Beauty Atelier. Demo website: bookings are not connected to a salon system.</p>
          <button type="button" className="link-u" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}

import { useState, type FormEvent } from 'react'
import { useDocumentMeta } from '../hooks/hooks'
import { validateEmail, validateName } from '../lib/booking'
import { PageHead } from '../components/layout/PageHead'
import { ContactBlock } from '../components/sections/ContactBlock'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function ContactForm() {
  const [v, setV] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    const n = validateName(v.name); if (n) next.name = n
    const m = validateEmail(v.email, true); if (m) next.email = m
    if (v.message.trim().length < 5) next.message = 'Please write a short message.'
    setErrors(next)
    const firstBad = (['name', 'email', 'message'] as const).find((k) => next[k])
    if (firstBad) { document.getElementById(`cf-${firstBad}`)?.focus(); return }
    setDone(true)
  }
  if (done) {
    return (
      <div role="status" className="form-done">
        <h3 className="display d-md">Thank you.</h3>
        <p className="muted">This is a demo form: your message was not sent anywhere. Once the salon’s contact details are configured, visitors can reach them directly.</p>
        <button type="button" className="link-u" onClick={() => { setDone(false); setV({ name: '', email: '', message: '' }) }}>Write another</button>
      </div>
    )
  }
  return (
    <form onSubmit={submit} noValidate className="bk-form">
      {(['name', 'email'] as const).map((k) => (
        <div className="field" key={k}>
          <label htmlFor={`cf-${k}`}>{k === 'name' ? 'Name' : 'Email'}</label>
          <input id={`cf-${k}`} className="input" type={k === 'email' ? 'email' : 'text'} autoComplete={k} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `cf-${k}-err` : undefined} />
          {errors[k] && <p id={`cf-${k}-err`} role="alert" className="error">{errors[k]}</p>}
        </div>
      ))}
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" className="textarea" value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
        {errors.message && <p id="cf-message-err" role="alert" className="error">{errors.message}</p>}
      </div>
      <p className="note">Demo form — nothing is sent.</p>
      <button type="submit" className="btn btn--primary">Send message</button>
    </form>
  )
}

export default function ContactPage() {
  useDocumentMeta('Contact', 'Contact and visit VELARA.')
  return (
    <div className="page">
      <PageHead eyebrow="Contact" title="Visit the *atelier*" lede="Details below appear once the salon’s information is added to the brand config." />
      <div className="container contact-grid section--tight">
        <ContactBlock />
        <ContactForm />
      </div>
    </div>
  )
}

import { useBooking } from './state'

export type DetailErrors = Partial<Record<'name' | 'phone' | 'email' | 'consent', string>>

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? <p id={id} className="error" role="alert">{msg}</p> : null
}

export function DetailsStep({ errors }: { errors: DetailErrors }) {
  const { flow, patch } = useBooking()
  return (
    <div className="bk-step bk-form">
      <div className="field">
        <label htmlFor="bk-name">Full name</label>
        <input id="bk-name" className="input" autoComplete="name" value={flow.name} onChange={(e) => patch({ name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'bk-name-err' : undefined} />
        <FieldError id="bk-name-err" msg={errors.name} />
      </div>
      <div className="field">
        <label htmlFor="bk-phone">Mobile number</label>
        <input id="bk-phone" className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={flow.phone} onChange={(e) => patch({ phone: e.target.value })} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'bk-phone-err' : undefined} />
        <FieldError id="bk-phone-err" msg={errors.phone} />
      </div>
      <div className="field">
        <label htmlFor="bk-email">Email <span className="note">(optional)</span></label>
        <input id="bk-email" className="input" type="email" autoComplete="email" value={flow.email} onChange={(e) => patch({ email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'bk-email-err' : undefined} />
        <FieldError id="bk-email-err" msg={errors.email} />
      </div>
      <div className="field">
        <label htmlFor="bk-notes">Notes <span className="note">(optional)</span></label>
        <textarea id="bk-notes" className="textarea" value={flow.notes} onChange={(e) => patch({ notes: e.target.value })} />
      </div>
      <div className="field">
        <label className="check" htmlFor="bk-consent">
          <input id="bk-consent" type="checkbox" checked={flow.consent} onChange={(e) => patch({ consent: e.target.checked })} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'bk-consent-err' : undefined} />
          <span>I understand this is a demo request: details are kept only in this browser and the salon will not receive them.</span>
        </label>
        <FieldError id="bk-consent-err" msg={errors.consent} />
      </div>
    </div>
  )
}

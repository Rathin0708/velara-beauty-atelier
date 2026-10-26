import { CalendarPlus, MessageCircle } from 'lucide-react'
import { brand } from '../../config/brand'
import { buildIcs, buildWhatsAppMessage, downloadText, whatsappLink } from '../../lib/booking'
import { formatLongDate, formatTime } from '../../lib/utils'
import { useBooking, type StoredRequest } from './state'

export function Confirmation({ request }: { request: StoredRequest }) {
  const { reset, storageOk } = useBooking()
  const wa = whatsappLink(buildWhatsAppMessage(request))
  const addToCalendar = () =>
    downloadText(
      `appointment-request-${request.reference}.ics`,
      buildIcs({
        iso: request.iso,
        time: request.time,
        durationMin: request.durationMin,
        summary: 'Appointment request (unconfirmed)',
        description: `Demo request ${request.reference} — ${request.services.join(', ')}. Not confirmed by ${brand.name}.`,
        uid: request.reference,
      }),
    )
  return (
    <div className="bk-step bk-done" role="status">
      <p className="eyebrow">Demo request</p>
      <h3 className="display d-md">Your request has been <em>prepared</em>.</h3>
      <p className="lede">Your request has been prepared. This is a demo — the salon has not received or confirmed this appointment.</p>
      <p className="bk-ref">Reference <strong>{request.reference}</strong></p>
      <p className="muted">{request.services.join(', ')}<br />{formatLongDate(request.iso)} · {formatTime(request.time)} · {request.professional}</p>
      {!storageOk && <p className="note">Your browser blocked local storage, so this request will not appear in “Your requests”.</p>}
      <div className="bk-actions">
        {wa && (
          <a className="btn btn--primary" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> Send request on WhatsApp</a>
        )}
        <button type="button" className="btn btn--ghost" onClick={addToCalendar}><CalendarPlus size={16} aria-hidden="true" /> Add to calendar</button>
        <button type="button" className="btn btn--ghost" onClick={reset}>Book another</button>
      </div>
    </div>
  )
}

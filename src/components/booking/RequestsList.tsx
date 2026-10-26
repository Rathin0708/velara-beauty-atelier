import { formatLongDate, formatTime } from '../../lib/utils'
import { useBooking } from './state'

export function RequestsList() {
  const { requests } = useBooking()
  if (!requests.length) return null
  return (
    <section aria-labelledby="req-title" className="requests">
      <h2 id="req-title" className="display d-sm">Your requests</h2>
      <p className="note">Stored only in this browser. None of these have been sent to or confirmed by the salon.</p>
      <ul>
        {requests.map((r) => (
          <li key={r.reference + r.createdAt}>
            <strong>{r.reference}</strong>
            <span>{r.services.join(', ')}</span>
            <span className="note">{formatLongDate(r.iso)} · {formatTime(r.time)} · unconfirmed</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

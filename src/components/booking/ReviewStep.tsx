import { brand } from '../../config/brand'
import { getMember, getServiceBySlug } from '../../lib/api'
import { formatDuration, formatLongDate, formatPrice, formatTime, totals } from '../../lib/utils'
import { useBooking, type StepIndex } from './state'

export function ReviewStep({ onEdit }: { onEdit: (s: StepIndex) => void }) {
  const { flow } = useBooking()
  const list = flow.serviceSlugs.flatMap((s) => getServiceBySlug(s) ?? [])
  const t = totals(list)
  const pro = flow.pro ? getMember(flow.pro)?.name : 'No preference'
  const rows: Array<{ label: string; step: StepIndex; value: React.ReactNode }> = [
    { label: 'Services', step: 0, value: <ul>{list.map((s) => <li key={s.slug}>{s.name}</li>)}</ul> },
    { label: 'Professional', step: 1, value: pro },
    { label: 'Date', step: 2, value: flow.date ? formatLongDate(flow.date) : '—' },
    { label: 'Time', step: 3, value: flow.time ? `${formatTime(flow.time)} (demo availability)` : '—' },
    { label: 'Your details', step: 4, value: <>{flow.name}<br />{flow.phone}{flow.email && <><br />{flow.email}</>}{flow.notes && <><br /><em>{flow.notes}</em></>}</> },
  ]
  return (
    <div className="bk-step">
      <dl className="review">
        {rows.map((r) => (
          <div className="review-row" key={r.label}>
            <dt className="meta">{r.label}</dt>
            <dd>{r.value}</dd>
            <button type="button" className="link-u" onClick={() => onEdit(r.step)} aria-label={`Edit ${r.label.toLowerCase()}`}>Edit</button>
          </div>
        ))}
      </dl>
      <div className="review-total">
        <span>{formatDuration(t.duration)}</span>
        <strong>{t.hasFrom ? 'from ' : ''}{formatPrice(t.price)}</strong>
      </div>
      {!brand.pricesConfirmed && <p className="note">Sample pricing — confirm with salon.</p>}
      <p className="note">Submitting prepares a demo request. The salon does not receive it.</p>
    </div>
  )
}

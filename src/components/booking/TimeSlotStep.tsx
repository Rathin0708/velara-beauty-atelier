import { useMemo, useRef, type KeyboardEvent } from 'react'
import { getAvailability, getServiceBySlug } from '../../lib/api'
import { cx, formatLongDate, formatTime, totals } from '../../lib/utils'
import { useBooking } from './state'

export function TimeSlotStep() {
  const { flow, patch } = useBooking()
  const duration = totals(flow.serviceSlugs.flatMap((s) => getServiceBySlug(s) ?? [])).duration
  const slots = useMemo(() => (flow.date ? getAvailability(flow.date, duration, flow.pro) : []), [flow.date, duration, flow.pro])
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const enabled = slots.filter((s) => s.available)
  const tabbable = flow.time && enabled.some((s) => s.time === flow.time) ? flow.time : enabled[0]?.time

  const onKey = (e: KeyboardEvent, time: string) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    const dir = keys[e.key]
    if (!dir) return
    e.preventDefault()
    const i = enabled.findIndex((s) => s.time === time)
    const next = enabled[(i + dir + enabled.length) % enabled.length]
    if (next) {
      refs.current[next.time]?.focus()
      patch({ time: next.time })
    }
  }

  if (!flow.date) return <p className="note">Please choose a date first.</p>
  return (
    <div className="bk-step">
      <p className="eyebrow">Demo availability</p>
      <p className="muted">{formatLongDate(flow.date)} · allowing {duration} minutes. These times are illustrative only.</p>
      {slots.length === 0 && <p role="status">The salon is closed on this day. Please choose another date.</p>}
      {(['Morning', 'Afternoon', 'Evening'] as const).map((period) => {
        const group = slots.filter((s) => s.period === period)
        if (!group.length) return null
        return (
          <div key={period} role="radiogroup" aria-label={`${period} times`} className="slot-group">
            <h3 className="meta">{period}</h3>
            <div className="slots">
              {group.map((s) => (
                <button
                  key={s.time}
                  ref={(el) => { refs.current[s.time] = el }}
                  type="button"
                  role="radio"
                  aria-checked={flow.time === s.time}
                  aria-disabled={!s.available}
                  aria-label={`${formatTime(s.time)}${s.available ? '' : ', unavailable'}`}
                  tabIndex={s.available && s.time === tabbable ? 0 : -1}
                  className={cx('slot', flow.time === s.time && 'is-on', !s.available && 'is-off')}
                  onClick={() => s.available && patch({ time: s.time })}
                  onKeyDown={(e) => s.available && onKey(e, s.time)}
                >
                  {formatTime(s.time)}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

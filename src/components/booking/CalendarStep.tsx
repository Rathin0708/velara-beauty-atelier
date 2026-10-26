import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { bookingDates, isClosed } from '../../lib/booking'
import { cx, fromISODate, toISODate } from '../../lib/utils'
import { useBooking } from './state'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarStep() {
  const { flow, patch } = useBooking()
  const { first, last } = useMemo(() => bookingDates(), [])
  const firstOpen = useMemo(() => {
    const d = fromISODate(first)
    while (isClosed(toISODate(d))) d.setDate(d.getDate() + 1)
    return toISODate(d)
  }, [first])
  const [focusIso, setFocusIso] = useState(flow.date ?? firstOpen)
  const [view, setView] = useState(() => fromISODate(flow.date ?? firstOpen))
  const wantFocus = useRef(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const isDisabled = (iso: string) => iso < first || iso > last || isClosed(iso)

  const cells = useMemo(() => {
    const y = view.getFullYear()
    const m = view.getMonth()
    const lead = new Date(y, m, 1).getDay()
    const count = new Date(y, m + 1, 0).getDate()
    const out: Array<string | null> = Array(lead).fill(null)
    for (let d = 1; d <= count; d++) out.push(toISODate(new Date(y, m, d)))
    while (out.length % 7) out.push(null)
    return out
  }, [view])

  useEffect(() => {
    if (!wantFocus.current) return
    wantFocus.current = false
    gridRef.current?.querySelector<HTMLElement>(`[data-iso="${focusIso}"]`)?.focus()
  }, [focusIso, view])

  const move = (iso: string, deltaDays: number, deltaMonths = 0) => {
    const d = fromISODate(iso)
    if (deltaMonths) d.setMonth(d.getMonth() + deltaMonths)
    d.setDate(d.getDate() + deltaDays)
    let next = toISODate(d)
    if (next < first) next = first
    if (next > last) next = last
    wantFocus.current = true
    setFocusIso(next)
    setView(fromISODate(next))
  }

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [-7, 0], ArrowDown: [7, 0],
      PageUp: [0, -1], PageDown: [0, 1],
    }
    if (e.key === 'Home') { e.preventDefault(); move(focusIso, -fromISODate(focusIso).getDay()); return }
    if (e.key === 'End') { e.preventDefault(); move(focusIso, 6 - fromISODate(focusIso).getDay()); return }
    const m = map[e.key]
    if (!m) return
    e.preventDefault()
    move(focusIso, m[0], m[1])
  }

  const shift = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1))
  const monthStart = toISODate(new Date(view.getFullYear(), view.getMonth(), 1))
  const prevDisabled = monthStart <= first.slice(0, 8) + '01'
  const nextDisabled = toISODate(new Date(view.getFullYear(), view.getMonth() + 1, 1)) > last
  const monthLabel = view.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  return (
    <div className="bk-step">
      <div className="cal-head">
        <button type="button" className="icon-btn" aria-label="Previous month" disabled={prevDisabled} onClick={() => shift(-1)}><ChevronLeft size={18} /></button>
        <h3 className="d-sm" aria-live="polite">{monthLabel}</h3>
        <button type="button" className="icon-btn" aria-label="Next month" disabled={nextDisabled} onClick={() => shift(1)}><ChevronRight size={18} /></button>
      </div>
      <div ref={gridRef} role="grid" aria-label={`Choose a date, ${monthLabel}`} className="cal" onKeyDown={onKey}>
        <div role="row" className="cal-row">
          {DOW.map((d) => <div key={d} role="columnheader" className="cal-dow">{d}</div>)}
        </div>
        {Array.from({ length: cells.length / 7 }, (_, r) => (
          <div role="row" className="cal-row" key={r}>
            {cells.slice(r * 7, r * 7 + 7).map((iso, i) => {
              if (!iso) return <div role="gridcell" key={i} className="cal-cell cal-empty" />
              const disabled = isDisabled(iso)
              const selected = flow.date === iso
              const day = fromISODate(iso)
              return (
                <div role="gridcell" key={iso} className="cal-cell" aria-selected={selected}>
                  <button
                    type="button"
                    data-iso={iso}
                    className={cx('cal-day', selected && 'is-on', disabled && 'is-off')}
                    tabIndex={iso === focusIso ? 0 : -1}
                    aria-disabled={disabled}
                    aria-label={`${day.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}${disabled ? (isClosed(iso) && iso >= first ? ', closed' : ', unavailable') : ''}`}
                    onFocus={() => setFocusIso(iso)}
                    onClick={() => {
                      if (disabled) return
                      patch({ date: iso, time: null })
                    }}
                  >
                    {day.getDate()}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <p className="note">Demo calendar. Closed days and past dates are disabled. Arrow keys move between days, Page Up/Down changes month.</p>
    </div>
  )
}

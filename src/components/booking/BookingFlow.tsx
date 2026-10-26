import { useEffect, useRef, useState } from 'react'
import { getMember, getServiceBySlug } from '../../lib/api'
import { makeReference, validateEmail, validateName, validatePhone, normalisePhone } from '../../lib/booking'
import { cx, formatDuration, formatPrice, totals } from '../../lib/utils'
import { brand } from '../../config/brand'
import { CalendarStep } from './CalendarStep'
import { Confirmation } from './Confirmation'
import { DetailsStep, type DetailErrors } from './DetailsStep'
import { ProfessionalStep } from './ProfessionalStep'
import { ReviewStep } from './ReviewStep'
import { ServiceStep } from './ServiceStep'
import { STEPS, useBooking, type StepIndex } from './state'
import { TimeSlotStep } from './TimeSlotStep'

const TITLES = ['Choose your services', 'Choose a professional', 'Choose a date', 'Choose a time', 'Your details', 'Review & confirm']

export function BookingFlow() {
  const { flow, patch } = useBooking()
  const [errors, setErrors] = useState<DetailErrors>({})
  const [announce, setAnnounce] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)

  const list = flow.serviceSlugs.flatMap((s) => getServiceBySlug(s) ?? [])
  const t = totals(list)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    setAnnounce(flow.status === 'done' ? 'Demo request prepared.' : `Step ${flow.step + 1} of ${STEPS.length}: ${STEPS[flow.step]}`)
    headingRef.current?.focus({ preventScroll: true })
  }, [flow.step, flow.status])

  const go = (s: StepIndex) => patch({ step: s })

  const canNext = (): boolean => {
    switch (flow.step) {
      case 0: return list.length > 0
      case 2: return !!flow.date
      case 3: return !!flow.time
      default: return true
    }
  }

  const validateDetails = (): boolean => {
    const next: DetailErrors = {}
    const n = validateName(flow.name); if (n) next.name = n
    const p = validatePhone(flow.phone); if (p) next.phone = p
    const e = validateEmail(flow.email); if (e) next.email = e
    if (!flow.consent) next.consent = 'Please tick the box to continue.'
    setErrors(next)
    const order: Array<[keyof DetailErrors, string]> = [['name', 'bk-name'], ['phone', 'bk-phone'], ['email', 'bk-email'], ['consent', 'bk-consent']]
    const firstBad = order.find(([k]) => next[k])
    if (firstBad) {
      document.getElementById(firstBad[1])?.focus()
      setAnnounce(`${Object.keys(next).length} fields need attention.`)
      return false
    }
    return true
  }

  const next = () => {
    if (flow.step === 4 && !validateDetails()) return
    if (flow.step < 5) go((flow.step + 1) as StepIndex)
  }

  const { saveRequest } = useBooking()
  const submit = () => {
    patch({ status: 'submitting' })
    window.setTimeout(() => {
      if (!flow.date || !flow.time) return patch({ status: 'idle' })
      const pro = flow.pro ? getMember(flow.pro)?.name ?? 'No preference' : 'No preference'
      const reference = makeReference(`${flow.date}|${flow.time}|${flow.name}|${flow.serviceSlugs.join(',')}`)
      const req = {
        reference, services: list.map((s) => s.name), professional: pro, iso: flow.date, time: flow.time,
        durationMin: t.duration, name: flow.name.trim(), phone: normalisePhone(flow.phone), notes: flow.notes.trim(),
        createdAt: new Date().toISOString(),
      }
      saveRequest(req)
      patch({ status: 'done', confirmation: req })
    }, 900)
  }

  if (flow.status === 'done' && flow.confirmation) {
    return (
      <div id="booking-flow" className="bk">
        <p className="vh" role="status" aria-live="polite">{announce}</p>
        <Confirmation request={flow.confirmation} />
      </div>
    )
  }

  return (
    <div id="booking-flow" className="bk">
      <p className="vh" role="status" aria-live="polite">{announce}</p>
      <ol className="bk-progress" aria-label="Booking progress">
        {STEPS.map((s, i) => (
          <li key={s} className={cx(i === flow.step && 'is-current', i < flow.step && 'is-done')} aria-current={i === flow.step ? 'step' : undefined}>
            <span className="num">{i + 1}</span><span className="bk-progress-label">{s}</span>
          </li>
        ))}
      </ol>
      <h2 ref={headingRef} tabIndex={-1} className="display d-md bk-title">{TITLES[flow.step]}</h2>
      <div className="bk-body">
        {flow.step === 0 && <ServiceStep />}
        {flow.step === 1 && <ProfessionalStep />}
        {flow.step === 2 && <CalendarStep />}
        {flow.step === 3 && <TimeSlotStep />}
        {flow.step === 4 && <DetailsStep errors={errors} />}
        {flow.step === 5 && <ReviewStep onEdit={go} />}
      </div>
      <div className="bk-foot">
        <div className="bk-summary" aria-live="polite">
          {list.length > 0 ? (
            <>
              <strong>{list.length} {list.length === 1 ? 'service' : 'services'}</strong>
              <span>{formatDuration(t.duration)} · {t.hasFrom ? 'from ' : ''}{formatPrice(t.price)}{!brand.pricesConfirmed && ' · sample pricing'}</span>
            </>
          ) : <span className="note">Select at least one service</span>}
        </div>
        <div className="bk-nav">
          {flow.step > 0 && <button type="button" className="btn btn--ghost btn--sm" onClick={() => go((flow.step - 1) as StepIndex)}>Back</button>}
          {flow.step < 5 ? (
            <button type="button" className="btn btn--primary btn--sm" disabled={!canNext()} onClick={next}>Continue</button>
          ) : (
            <button type="button" className="btn btn--primary btn--sm" disabled={flow.status === 'submitting'} onClick={submit}>
              {flow.status === 'submitting' ? 'Preparing…' : 'Prepare demo request'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

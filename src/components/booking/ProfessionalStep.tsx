import { getProfessionalsFor } from '../../lib/api'
import { cx } from '../../lib/utils'
import { Photo } from '../ui/Photo'
import { useBooking } from './state'

export function ProfessionalStep() {
  const { flow, patch } = useBooking()
  const pros = getProfessionalsFor(flow.serviceSlugs)
  const options = [{ slug: null as string | null, name: 'No preference', role: 'We will match you with the best available professional' }, ...pros.map((p) => ({ slug: p.slug as string | null, name: p.name, role: p.role }))]
  return (
    <div className="bk-step">
      {pros.length === 0 && <p className="note">No single professional offers every selected service, so we will assign the right people for you.</p>}
      <div role="radiogroup" aria-label="Choose a professional" className="bk-pros">
        {options.map((o) => {
          const on = flow.pro === o.slug
          const member = pros.find((p) => p.slug === o.slug)
          return (
            <button
              key={o.slug ?? 'any'}
              type="button"
              role="radio"
              aria-checked={on}
              className={cx('bk-pro', on && 'is-on')}
              onClick={() => patch({ pro: o.slug, time: null })}
            >
              {member ? <Photo name={member.image} alt="" className="arch ratio-34 bk-pro-img" sizes="96px" /> : <span className="bk-pro-img bk-pro-any" aria-hidden="true">Any</span>}
              <span>
                <strong>{o.name}</strong>
                <span className="note">{o.role}</span>
                {member?.isSample && <span className="tag">Sample profile</span>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { brand } from '../config/brand'
import { useDocumentMeta } from '../hooks/hooks'
import { getFaq } from '../lib/api'
import { PageHead } from '../components/layout/PageHead'
import { Accordion } from '../components/ui/Accordion'

export default function FaqPage() {
  useDocumentMeta('FAQ', 'Frequently asked questions about booking, bridal, products and payment at VELARA.')
  const { hash } = useLocation()
  const all = getFaq()
  const fromHash = hash.startsWith('#acc-') ? hash.slice(5) : ''
  const [toggled, setToggled] = useState<string[]>([])
  const [dismissed, setDismissed] = useState('')
  // Deep link: #acc-<id> opens that question unless the visitor has closed it again.
  const linked = fromHash && fromHash !== dismissed && all.some((f) => f.id === fromHash) ? fromHash : ''
  const open = linked && !toggled.includes(linked) ? [...toggled, linked] : toggled
  const onChange = (next: string[]) => {
    setToggled(next)
    if (fromHash && !next.includes(fromHash)) setDismissed(fromHash)
  }

  const groups = [...new Set(all.map((f) => f.group))]
  return (
    <div className="page">
      <PageHead eyebrow="Help" title="Good to *know*" />
      <div className="container faq-page">
        {groups.map((g) => (
          <section key={g} aria-labelledby={`g-${g}`}>
            <h2 id={`g-${g}`} className="display d-md">{g}</h2>
            <Accordion
              multiple
              open={open}
              onChange={onChange}
              items={all.filter((f) => f.group === g).map((f) => ({ id: f.id, title: f.q, content: <p className="muted">{f.a}</p> }))}
            />
          </section>
        ))}
        {!brand.policiesConfirmed && <p className="note">Policy wording is sample text until confirmed by the salon.</p>}
      </div>
    </div>
  )
}

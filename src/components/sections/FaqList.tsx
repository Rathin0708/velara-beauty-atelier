import { brand } from '../../config/brand'
import { getFaq } from '../../lib/api'
import { Accordion } from '../ui/Accordion'

export function FaqList({ limit, initialOpen }: { limit?: number; initialOpen?: string[] }) {
  const items = getFaq().slice(0, limit)
  return (
    <>
      <Accordion
        initialOpen={initialOpen}
        items={items.map((f) => ({ id: f.id, title: f.q, content: <p className="muted">{f.a}</p> }))}
      />
      {!brand.policiesConfirmed && <p className="note">Policy wording is sample text until confirmed by the salon.</p>}
    </>
  )
}

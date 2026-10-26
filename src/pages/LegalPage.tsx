import { brand } from '../config/brand'
import { useDocumentMeta } from '../hooks/hooks'
import { PageHead } from '../components/layout/PageHead'

const COPY = {
  privacy: {
    title: 'Privacy',
    sections: [
      ['What this demo stores', 'Booking requests, the newsletter demo and your form entries are stored only in your own browser (localStorage). Nothing is transmitted to a server by this website.'],
      ['When the salon goes live', 'Once a real booking system, contact form or newsletter is connected, this page must describe what data is collected, why, how long it is kept and how to request deletion.'],
      ['Cookies and analytics', 'This demo does not set tracking cookies. Update this section if analytics are added.'],
    ],
  },
  terms: {
    title: 'Terms',
    sections: [
      ['Demo website', `This website is a frontend demonstration for ${brand.name}. Appointment requests prepared here are not received or confirmed by any salon.`],
      ['Prices and availability', 'Prices, durations and times shown are sample content and must be confirmed with the salon.'],
      ['Cancellations and payments', 'Replace this section with the salon’s real cancellation, deposit and payment policies.'],
    ],
  },
} as const

export default function LegalPage({ kind }: { kind: keyof typeof COPY }) {
  const c = COPY[kind]
  useDocumentMeta(c.title)
  return (
    <div className="page">
      <PageHead eyebrow="Legal" title={c.title}>
        <span className="tag">Template — not legal advice</span>
      </PageHead>
      <div className="container prose">
        {c.sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="display d-sm">{h}</h2>
            <p className="muted">{p}</p>
          </section>
        ))}
      </div>
    </div>
  )
}

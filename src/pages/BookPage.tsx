import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookingFlow } from '../components/booking/BookingFlow'
import { RequestsList } from '../components/booking/RequestsList'
import { useBooking } from '../components/booking/state'
import { PageHead } from '../components/layout/PageHead'
import { useDocumentMeta } from '../hooks/hooks'
import { getCategory, getMember, getServiceBySlug } from '../lib/api'
import type { CategorySlug } from '../data/types'

export default function BookPage() {
  useDocumentMeta('Book', 'Prepare a demo appointment request at VELARA.')
  const [params] = useSearchParams()
  const { open } = useBooking()
  const applied = useRef(false)

  // Deep-link preselection: /book?service=a,b&pro=slug&category=slug (applied once, only valid values).
  useEffect(() => {
    if (applied.current) return
    applied.current = true
    const services = (params.get('service') ?? '').split(',').filter((s) => getServiceBySlug(s))
    const pro = params.get('pro')
    const cat = params.get('category')
    if (!services.length && !pro && !cat) return
    open({
      services,
      pro: pro && getMember(pro) ? pro : undefined,
      category: cat && getCategory(cat) ? (cat as CategorySlug) : undefined,
    })
  }, [params, open])

  return (
    <div className="page">
      <PageHead eyebrow="Book" title="Begin your *request*" lede="This is a demo: your request is prepared in this browser and is not sent to the salon." />
      <div className="container book-grid">
        <BookingFlow />
        <aside><RequestsList /></aside>
      </div>
    </div>
  )
}

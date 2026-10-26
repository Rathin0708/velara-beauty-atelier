import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/hooks'
import { PageHead } from '../components/layout/PageHead'
import { BookButton } from '../components/ui/BookButton'

export default function NotFoundPage() {
  useDocumentMeta('Page not found')
  return (
    <div className="page">
      <PageHead eyebrow="404" title="This page has *slipped* away" lede="The page you were looking for does not exist, but the rest of the atelier does.">
        <div className="cta-row">
          <Link to="/" className="btn btn--primary">Home</Link>
          <Link to="/services" className="btn btn--ghost">Services</Link>
          <BookButton variant="ghost">Book</BookButton>
        </div>
      </PageHead>
    </div>
  )
}

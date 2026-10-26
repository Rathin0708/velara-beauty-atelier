import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BookingProvider } from './components/booking/BookingProvider'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { PageTransition } from './components/layout/PageTransition'
import { ScrollSaver } from './components/layout/ScrollManager'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { StickyBookPill } from './components/layout/StickyBookPill'
import { CursorFollower } from './components/motion/CursorFollower'
import HomePage from './pages/HomePage'

const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const BridalPage = lazy(() => import('./pages/BridalPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const TeamProfilePage = lazy(() => import('./pages/TeamProfilePage'))
const PackagesPage = lazy(() => import('./pages/PackagesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const BookPage = lazy(() => import('./pages/BookPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <BookingProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollSaver />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        <PageTransition>
          {(location) => (
            <Suspense fallback={<div className="page" aria-busy="true" />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/bridal" element={<BridalPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/team/:slug" element={<TeamProfilePage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/book" element={<BookPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy" element={<LegalPage kind="privacy" />} />
                <Route path="/terms" element={<LegalPage kind="terms" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          )}
        </PageTransition>
      </main>
      <Footer />
      <StickyBookPill />
      <CursorFollower />
    </BookingProvider>
  )
}

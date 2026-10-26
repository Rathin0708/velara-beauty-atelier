import { lazy, Suspense } from 'react'
import { useDocumentMeta } from '../hooks/hooks'
import { Hero } from '../components/sections/Hero'
import { Statement } from '../components/sections/Statement'

const HomeSections = lazy(() => import('../components/sections/HomeSections'))

export default function HomePage() {
  useDocumentMeta('VELARA', 'VELARA — Beauty Atelier. The art of becoming you. Hair, makeup, bridal, skin and nails.')
  return (
    <>
      <Hero />
      <Statement />
      <Suspense fallback={<div style={{ minHeight: '100svh' }} aria-hidden="true" />}>
        <HomeSections />
      </Suspense>
    </>
  )
}

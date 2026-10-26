import { useDocumentMeta } from '../hooks/hooks'
import { getGallery, getGenuineBeforeAfter } from '../lib/api'
import { BeforeAfterSlider } from '../components/gallery/BeforeAfterSlider'
import { GALLERY_FILTERS } from '../components/gallery/filters'
import { GalleryGrid } from '../components/gallery/GalleryGrid'
import { PageHead } from '../components/layout/PageHead'

export default function GalleryPage() {
  useDocumentMeta('Gallery', 'Looks and inspiration from VELARA.')
  const pairs = getGenuineBeforeAfter()
  return (
    <div className="page">
      <PageHead eyebrow="Gallery" title="Looks, *collected*" lede="A curated set of inspiration across hair, makeup, bridal, nails and skin. Images are inspiration, not client transformations." />
      <div className="container section--tight">
        <GalleryGrid items={getGallery()} filters={GALLERY_FILTERS} limit={9} loadMore />
        {pairs.length > 0 && (
          <div className="ba-wrap">
            <h2 className="display d-md">Before &amp; after</h2>
            {pairs.map((p) => <BeforeAfterSlider key={p.id} item={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}

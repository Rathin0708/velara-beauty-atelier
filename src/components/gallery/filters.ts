import type { GalleryCategory } from '../../data/types'

export const GALLERY_FILTERS: Array<{ id: GalleryCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'hair', label: 'Hair' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'nails', label: 'Nails' },
  { id: 'skin', label: 'Skin' },
  { id: 'space', label: 'Space' },
]

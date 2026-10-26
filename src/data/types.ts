export type CategorySlug =
  | 'hair-styling' | 'hair-spa' | 'hair-colour' | 'makeup' | 'bridal-makeup'
  | 'facials-skincare' | 'mani-pedi' | 'nail-art' | 'waxing-threading' | 'spa-body'

export type Pillar = 'hair' | 'skin' | 'makeup' | 'nails' | 'combo'

export interface ServiceCategory {
  slug: CategorySlug
  title: string
  description: string
  image: ImageKey
  order: number
  enabled: boolean
  pillar: Pillar
}

export interface Service {
  slug: string
  category: CategorySlug
  name: string
  description: string
  duration: number
  price: number
  priceFrom?: boolean
  includes: string[]
  suitableFor: string[]
  aftercare: string[]
  image: ImageKey
  featured?: boolean
  professionals: string[]
}

export interface PackageItem {
  slug: string
  kind: 'bridal' | 'event' | 'combo'
  name: string
  tagline: string
  services: string[]
  price: number
  priceFrom?: boolean
  highlights: string[]
  image: ImageKey
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  specialties: Pillar[]
  descriptor: string
  bio: string
  image: ImageKey
  services: string[]
  isSample: boolean
}

export type GalleryCategory = 'hair' | 'makeup' | 'bridal' | 'nails' | 'skin' | 'space'

export interface GalleryItem {
  id: string
  image: ImageKey
  alt: string
  caption: string
  category: GalleryCategory
  tags: string[]
  genuine: boolean
  beforeAfterPair?: ImageKey
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  context: string
  isSample: boolean
}

export interface FaqItem { id: string; group: string; q: string; a: string }

export interface ExperienceChapter { title: string; kicker: string; body: string; image: ImageKey }

export type ImageKey = string

export interface DayHours { open: string; close: string }
export interface BrandConfig {
  name: string
  shortName: string
  tagline: string
  domain: string
  address: string
  phone: string
  email: string
  whatsapp: string
  mapUrl: string
  hours: Partial<Record<0 | 1 | 2 | 3 | 4 | 5 | 6, DayHours | null>> | null
  social: { instagram: string; facebook: string; youtube: string; pinterest: string }
  booking: {
    slotInterval: number
    leadTimeHours: number
    windowDays: number
    demoHours: Record<number, DayHours | null>
  }
  pricesConfirmed: boolean
  policiesConfirmed: boolean
  currency: string
}

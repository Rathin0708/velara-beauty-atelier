import type { PackageItem, TeamMember } from './types'

/** All profiles are SAMPLE placeholders (isSample: true). Replace with real staff. */
export const team: TeamMember[] = [
  { slug: 'aarohi', name: 'Aarohi', role: 'Creative Hair Director', specialties: ['hair'], descriptor: 'Colour, cutting and bridal hair', bio: 'Sample profile. Aarohi leads cutting and colour, with a focus on movement that grows out gracefully.', image: 'hairUpdo', services: ['signature-haircut', 'balayage', 'occasion-updo', 'bridal-hair-styling'], isSample: true },
  { slug: 'kavya', name: 'Kavya', role: 'Lead Makeup Artist', specialties: ['makeup'], descriptor: 'Bridal and editorial makeup', bio: 'Sample profile. Kavya specialises in luminous, long-wear makeup for brides and shoots.', image: 'makeupApply2', services: ['bridal-makeup', 'evening-glam', 'day-makeup', 'bridal-makeup-trial'], isSample: true },
  { slug: 'rhea', name: 'Rhea', role: 'Skin Therapist', specialties: ['skin'], descriptor: 'Facials and body rituals', bio: 'Sample profile. Rhea designs facials around how your skin is on the day, never a fixed routine.', image: 'skin3', services: ['radiance-facial', 'calming-facial', 'aromatherapy-back-massage'], isSample: true },
  { slug: 'sana', name: 'Sana', role: 'Nail Artist', specialties: ['nails'], descriptor: 'Hand-painted nail art', bio: 'Sample profile. Sana draws fine-line designs freehand and keeps nail health first.', image: 'nails4', services: ['hand-painted-nail-art', 'gel-manicure', 'spa-pedicure'], isSample: true },
  { slug: 'mira', name: 'Mira', role: 'Hair Treatment Specialist', specialties: ['hair'], descriptor: 'Treatments and scalp care', bio: 'Sample profile. Mira focuses on scalp health and restorative hair rituals.', image: 'hairCape', services: ['nourishing-hair-spa', 'smoothing-treatment', 'blow-dry-and-finish'], isSample: true },
]

/** Sample pricing — confirm with salon. */
export const packages: PackageItem[] = [
  { slug: 'bridal-signature', kind: 'bridal', name: 'The Bridal Signature', tagline: 'Trial, wedding-day makeup and hair', services: ['bridal-makeup-trial', 'bridal-makeup', 'bridal-hair-styling'], price: 32000, priceFrom: true, highlights: ['Full trial before the day', 'Makeup and hair styling', 'Touch-up guidance'], image: 'bridal3' },
  { slug: 'pre-bridal-glow', kind: 'bridal', name: 'Pre-Bridal Glow', tagline: 'Weeks of preparation, one calm sequence', services: ['pre-bridal-glow-ritual', 'radiance-facial', 'body-polish', 'hand-and-foot-renewal'], price: 14500, priceFrom: true, highlights: ['Skin, body and hands', 'Planned around your date'], image: 'skin1' },
  { slug: 'evening-edit', kind: 'event', name: 'The Evening Edit', tagline: 'Makeup and hair for a night out', services: ['evening-glam', 'occasion-updo'], price: 6200, priceFrom: true, highlights: ['Makeup and updo', 'Single visit'], image: 'makeupApply3' },
  { slug: 'hands-and-feet', kind: 'combo', name: 'Hands & Feet Day', tagline: 'Nails and renewal together', services: ['mani-pedi-duo', 'hand-and-foot-renewal'], price: 3400, highlights: ['Nails and skin care', 'Single visit'], image: 'nails1' },
  { slug: 'glow-and-blow', kind: 'combo', name: 'Glow & Blow', tagline: 'A facial and a polished finish', services: ['radiance-facial', 'blow-dry-and-finish'], price: 2900, highlights: ['Skin first, then hair'], image: 'skin2' },
]

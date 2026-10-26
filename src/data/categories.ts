import type { ServiceCategory } from './types'

export const serviceCategories: ServiceCategory[] = [
  { slug: 'hair-styling', title: 'Hair Styling & Cuts', description: 'Precision cuts, blow-dries and occasion styling shaped around your face and routine.', image: 'hairCut', order: 1, enabled: true, pillar: 'hair' },
  { slug: 'hair-spa', title: 'Hair Spa & Treatments', description: 'Restorative rituals for strength, shine and scalp comfort.', image: 'hairCurler', order: 2, enabled: true, pillar: 'hair' },
  { slug: 'hair-colour', title: 'Hair Colour', description: 'Soft dimension, rich tones and careful lightening, planned in consultation.', image: 'hairColour', order: 3, enabled: true, pillar: 'hair' },
  { slug: 'makeup', title: 'Makeup', description: 'Skin-first makeup for evenings, shoots and everything between.', image: 'makeupApply1', order: 4, enabled: true, pillar: 'makeup' },
  { slug: 'bridal-makeup', title: 'Bridal Makeup', description: 'Long-wear, camera-ready looks, with a trial before the day.', image: 'bridal1', order: 5, enabled: true, pillar: 'makeup' },
  { slug: 'facials-skincare', title: 'Facials & Skincare', description: 'Corrective and calming facials tailored to your skin on the day.', image: 'skin2', order: 6, enabled: true, pillar: 'skin' },
  { slug: 'mani-pedi', title: 'Manicure & Pedicure', description: 'Meticulous nail and skin care for hands and feet.', image: 'nails3', order: 7, enabled: true, pillar: 'nails' },
  { slug: 'nail-art', title: 'Nail Art', description: 'Fine-line, chrome and sculpted designs, drawn by hand.', image: 'nails4', order: 8, enabled: true, pillar: 'nails' },
  { slug: 'waxing-threading', title: 'Waxing & Threading', description: 'Gentle, hygienic hair removal and brow shaping.', image: 'spa2', order: 9, enabled: true, pillar: 'skin' },
  { slug: 'spa-body', title: 'Spa & Body Rituals', description: 'Slow, restorative body rituals to close the day.', image: 'spa1', order: 10, enabled: true, pillar: 'skin' },
]

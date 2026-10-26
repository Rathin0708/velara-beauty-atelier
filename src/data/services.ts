import type { CategorySlug, ImageKey, Service } from './types'

interface Seed {
  c: CategorySlug; n: string; d: string; m: number; p: number; from?: boolean; img: ImageKey
  feat?: boolean; inc?: string[]; for?: string[]; after?: string[]; pros?: string[]
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const seeds: Seed[] = [
  // Hair styling
  { c: 'hair-styling', n: 'Signature Haircut', d: 'A consultation-led cut that works with your texture, parting and daily routine.', m: 60, p: 1200, from: true, img: 'hairCut', feat: true, inc: ['Consultation', 'Wash and conditioning', 'Precision cut', 'Blow-dry finish'], for: ['All hair types', 'First-time guests'], after: ['Use a heat protectant when styling', 'Book a trim every 8–10 weeks'], pros: ['aarohi', 'mira'] },
  { c: 'hair-styling', n: 'Fringe & Face-Framing Trim', d: 'A quick, careful refresh of fringe or face-framing layers.', m: 20, p: 400, img: 'hairSmile', pros: ['aarohi', 'mira'] },
  { c: 'hair-styling', n: 'Blow-Dry & Finish', d: 'Smooth, bouncy or sleek — a polished finish after a thorough wash.', m: 45, p: 700, from: true, img: 'hairBlow', pros: ['mira'] },
  { c: 'hair-styling', n: 'Occasion Updo', d: 'Sculpted updos and braided styles that hold through the event.', m: 75, p: 2200, from: true, img: 'hairUpdo', feat: true, inc: ['Prep and texturising', 'Hand-styled updo', 'Pins and finishing mist'], for: ['Weddings and receptions', 'Parties and shoots'], after: ['Sleep on a silk pillowcase if keeping the style overnight'], pros: ['aarohi'] },
  { c: 'hair-styling', n: 'Curls & Waves Styling', d: 'Heat-styled curls, waves or ringlets with a long-wear set.', m: 50, p: 1100, from: true, img: 'hairCurler', pros: ['mira', 'aarohi'] },
  // Hair spa
  { c: 'hair-spa', n: 'Nourishing Hair Spa', d: 'A deep conditioning ritual with scalp massage to restore softness.', m: 60, p: 1500, img: 'hairCape', feat: true, inc: ['Scalp analysis', 'Steam-assisted mask', 'Massage', 'Blow-dry'], for: ['Dry or dull hair', 'Heat-styled hair'], after: ['Wait 24 hours before washing'], pros: ['mira'] },
  { c: 'hair-spa', n: 'Scalp Detox Ritual', d: 'A clarifying scalp treatment to reset build-up and soothe.', m: 50, p: 1800, img: 'hairSmile', pros: ['mira'] },
  { c: 'hair-spa', n: 'Smoothing Treatment', d: 'A smoothing service to reduce frizz and ease styling. Duration depends on length.', m: 150, p: 5500, from: true, img: 'hairBlow', inc: ['Patch-test advice', 'Treatment application', 'Heat seal', 'Finish'], for: ['Frizz-prone hair'], after: ['Avoid tying hair for 48 hours', 'Use sulphate-free care'], pros: ['mira'] },
  { c: 'hair-spa', n: 'Bond-Repair Treatment', d: 'Strengthening treatment for chemically treated or fragile hair.', m: 45, p: 2400, img: 'hairColour', pros: ['mira', 'aarohi'] },
  // Colour
  { c: 'hair-colour', n: 'Root Touch-Up', d: 'Seamless regrowth colour matched to your current shade.', m: 75, p: 1800, from: true, img: 'hairColour', pros: ['aarohi'] },
  { c: 'hair-colour', n: 'Global Colour', d: 'All-over colour with a gloss finish for even, luminous tone.', m: 120, p: 4200, from: true, img: 'hairSmile', pros: ['aarohi'] },
  { c: 'hair-colour', n: 'Balayage', d: 'Hand-painted, sun-softened dimension planned around your skin tone.', m: 210, p: 9500, from: true, img: 'hairCape', feat: true, inc: ['Colour consultation', 'Hand-painted lightening', 'Toner', 'Treatment and finish'], for: ['Dark to medium bases', 'Low-maintenance colour'], after: ['Use purple-toning care weekly', 'Book a gloss in 8 weeks'], pros: ['aarohi'] },
  { c: 'hair-colour', n: 'Highlights', d: 'Fine or bold highlights placed for brightness and movement.', m: 180, p: 6500, from: true, img: 'hairColour', pros: ['aarohi'] },
  { c: 'hair-colour', n: 'Gloss & Tone', d: 'A shine-boosting gloss to refresh tone between colour services.', m: 45, p: 2200, img: 'hairBlow', pros: ['aarohi'] },
  // Makeup
  { c: 'makeup', n: 'Day Makeup', d: 'Fresh, skin-forward makeup for work, brunches and portraits.', m: 60, p: 2800, img: 'makeupApply1', pros: ['kavya'] },
  { c: 'makeup', n: 'Evening Glam', d: 'Defined eyes and a luminous base made for lighting after dark.', m: 75, p: 4500, from: true, img: 'makeupApply2', feat: true, inc: ['Skin prep', 'Complexion', 'Eyes and lips', 'Setting'], for: ['Parties and receptions', 'Photo shoots'], after: ['Blot, do not rub, to refresh through the night'], pros: ['kavya'] },
  { c: 'makeup', n: 'Party Makeup with Styling', d: 'A complete party look: makeup with a quick hair finish.', m: 100, p: 5800, from: true, img: 'makeupApply3', pros: ['kavya', 'aarohi'] },
  { c: 'makeup', n: 'Makeup Lesson', d: 'A one-to-one lesson in techniques that suit your face and routine.', m: 90, p: 3500, img: 'palette', pros: ['kavya'] },
  { c: 'makeup', n: 'Photoshoot Makeup', d: 'Camera-aware makeup with touch-up guidance for long sessions.', m: 90, p: 5000, from: true, img: 'vanity', pros: ['kavya'] },
  // Bridal
  { c: 'bridal-makeup', n: 'Bridal Makeup Trial', d: 'A full trial to agree your look, tested in natural light.', m: 90, p: 4500, from: true, img: 'bridal2', inc: ['Look consultation', 'Full trial', 'Notes and photos for the day'], for: ['Brides planning ahead'], after: ['Photograph the trial in daylight'], pros: ['kavya'] },
  { c: 'bridal-makeup', n: 'Bridal Makeup', d: 'Long-wear, camera-ready bridal makeup with a luminous finish.', m: 150, p: 22000, from: true, img: 'bridal1', feat: true, inc: ['Skin prep', 'Complete bridal makeup', 'Lashes', 'Touch-up kit guidance'], for: ['Wedding day', 'Engagement'], after: ['Carry blotting papers and a lip colour for touch-ups'], pros: ['kavya', 'aarohi'] },
  { c: 'bridal-makeup', n: 'Pre-Bridal Glow Ritual', d: 'A skin-and-body ritual sequence to prepare in the weeks before the day.', m: 120, p: 8500, from: true, img: 'skin1', feat: true, inc: ['Facial', 'Body polish', 'Hand and foot care'], for: ['Brides 2–4 weeks out'], after: ['Avoid new products in the final week'], pros: ['rhea', 'kavya'] },
  { c: 'bridal-makeup', n: 'Family & Party Makeup', d: 'Makeup for family and bridal party, scheduled around the day.', m: 60, p: 4500, from: true, img: 'bridal3', feat: true, pros: ['kavya'] },
  { c: 'bridal-makeup', n: 'Bridal Hair Styling', d: 'Updos, buns and braided styles with veil and jewellery fitting.', m: 90, p: 7000, from: true, img: 'bridal4', pros: ['aarohi'] },
  // Facials
  { c: 'facials-skincare', n: 'Radiance Facial', d: 'A gentle brightening facial with massage for a rested look.', m: 60, p: 2400, img: 'skin2', feat: true, inc: ['Skin analysis', 'Cleanse and exfoliate', 'Massage', 'Mask'], for: ['Dull or tired skin'], after: ['Use SPF daily', 'Avoid exfoliants for 3 days'], pros: ['rhea'] },
  { c: 'facials-skincare', n: 'Deep-Cleanse Facial', d: 'Thorough cleansing with steam and extraction as needed.', m: 60, p: 2800, img: 'skin3', pros: ['rhea'] },
  { c: 'facials-skincare', n: 'Hydration Boost Facial', d: 'A moisture-replenishing facial for dehydrated skin.', m: 60, p: 3200, img: 'skin1', pros: ['rhea'] },
  { c: 'facials-skincare', n: 'Calming Facial', d: 'A low-stimulation facial for reactive, easily irritated skin.', m: 50, p: 3000, img: 'skin6', pros: ['rhea'] },
  { c: 'facials-skincare', n: 'Gua Sha Sculpting Massage', d: 'A tool-assisted facial massage to relax and define.', m: 40, p: 2200, img: 'skin4', pros: ['rhea'] },
  // Mani-pedi
  { c: 'mani-pedi', n: 'Classic Manicure', d: 'Shaping, cuticle care, massage and polish.', m: 40, p: 700, img: 'nails3', pros: ['sana'] },
  { c: 'mani-pedi', n: 'Spa Pedicure', d: 'A soak, scrub, mask and massage for tired feet.', m: 60, p: 1400, img: 'nails1', feat: true, inc: ['Soak', 'Scrub and mask', 'Massage', 'Polish'], for: ['Everyday care'], after: ['Moisturise feet nightly'], pros: ['sana'] },
  { c: 'mani-pedi', n: 'Gel Manicure', d: 'Long-wearing gel polish with careful prep.', m: 50, p: 1200, img: 'nails6', pros: ['sana'] },
  { c: 'mani-pedi', n: 'Mani + Pedi Duo', d: 'Classic manicure and spa pedicure in a single visit.', m: 95, p: 1900, img: 'nails2', pros: ['sana'] },
  // Nail art
  { c: 'nail-art', n: 'Hand-Painted Nail Art', d: 'Fine-line and minimal designs, priced per set.', m: 60, p: 1500, from: true, img: 'nails4', feat: true, pros: ['sana'] },
  { c: 'nail-art', n: 'Chrome & Glaze Finish', d: 'Mirror and pearl finishes over a gel base.', m: 60, p: 1800, from: true, img: 'nails5', pros: ['sana'] },
  { c: 'nail-art', n: 'Extensions with Design', d: 'Sculpted extensions with your choice of design.', m: 120, p: 3500, from: true, img: 'nails4', pros: ['sana'] },
  { c: 'nail-art', n: 'Nail Repair & Removal', d: 'Safe product removal and repair of a single nail.', m: 30, p: 500, from: true, img: 'nails2', pros: ['sana'] },
  // Waxing & threading
  { c: 'waxing-threading', n: 'Eyebrow Shaping', d: 'Threading or waxing to shape and tidy brows.', m: 20, p: 150, img: 'spa2', pros: ['rhea', 'sana'] },
  { c: 'waxing-threading', n: 'Full Arms Wax', d: 'Gentle wax for smooth arms, with soothing after-care.', m: 30, p: 600, img: 'spa2', pros: ['rhea'] },
  { c: 'waxing-threading', n: 'Full Legs Wax', d: 'Full-leg wax with a calming finish.', m: 40, p: 800, img: 'spa2', pros: ['rhea'] },
  { c: 'waxing-threading', n: 'Face Threading', d: 'Upper lip, chin and sides in a single quick visit.', m: 20, p: 250, img: 'skin6', pros: ['rhea', 'sana'] },
  // Spa & body
  { c: 'spa-body', n: 'Aromatherapy Back Massage', d: 'A slow, grounding massage focused on neck and back.', m: 45, p: 2200, img: 'spa1', feat: true, inc: ['Consultation on pressure', 'Aromatherapy oils', 'Warm towels'], for: ['Desk-bound shoulders'], after: ['Drink water and rest'], pros: ['rhea'] },
  { c: 'spa-body', n: 'Full Body Ritual', d: 'A full-body massage with an exfoliating polish.', m: 90, p: 5200, img: 'spa1', pros: ['rhea'] },
  { c: 'spa-body', n: 'Body Polish', d: 'A smoothing scrub and hydrating finish.', m: 50, p: 2800, img: 'skin5', pros: ['rhea'] },
  { c: 'spa-body', n: 'Hand & Foot Renewal', d: 'A mini ritual for hands and feet with paraffin warmth.', m: 45, p: 1800, img: 'skin4', pros: ['sana', 'rhea'] },
]

export const services: Service[] = seeds.map((s) => ({
  slug: slugify(s.n),
  category: s.c,
  name: s.n,
  description: s.d,
  duration: s.m,
  price: s.p,
  priceFrom: s.from,
  includes: s.inc ?? ['Consultation', 'Service as described', 'Finishing advice'],
  suitableFor: s.for ?? ['Most guests — tell us about your needs when booking'],
  aftercare: s.after ?? ['Your professional will share tailored aftercare at the end of the visit'],
  image: s.img,
  featured: s.feat,
  professionals: s.pros ?? [],
}))

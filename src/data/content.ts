import type { ExperienceChapter, FaqItem, GalleryItem, Testimonial } from './types'

/** Imagery here is inspiration, not salon work: genuine stays false until real client work is added. */
export const gallery: GalleryItem[] = [
  { id: 'g01', image: 'bridal1', alt: 'Bride in red and gold with traditional jewellery', caption: 'LOOK 01 — CLASSIC RED, GOLD DETAIL', category: 'bridal', tags: ['red', 'traditional'], genuine: false },
  { id: 'g02', image: 'heroPortrait', alt: 'Close portrait with red lip and gold hoops', caption: 'LOOK 02 — RED LIP, GOLD HOOPS', category: 'makeup', tags: ['lips', 'bold'], genuine: false },
  { id: 'g03', image: 'hairUpdo', alt: 'Hairstylist creating an updo for a seated client', caption: 'LOOK 03 — SCULPTED UPDO', category: 'hair', tags: ['updo', 'occasion'], genuine: false },
  { id: 'g04', image: 'nails4', alt: 'Hands with metallic jewelled nails', caption: 'LOOK 04 — JEWELLED STILETTO', category: 'nails', tags: ['nail art', 'metallic'], genuine: false },
  { id: 'g05', image: 'skin2', alt: 'Facial mask treatment at a spa', caption: 'LOOK 05 — MASK RITUAL', category: 'skin', tags: ['facial'], genuine: false },
  { id: 'g06', image: 'bridal5', alt: 'Bride in a white lace gown and veil holding flowers', caption: 'LOOK 06 — VEIL AND LACE', category: 'bridal', tags: ['white', 'veil'], genuine: false },
  { id: 'g07', image: 'makeupApply2', alt: 'Makeup artist applying blush', caption: 'LOOK 07 — SOFT BLUSH', category: 'makeup', tags: ['blush', 'soft'], genuine: false },
  { id: 'g08', image: 'hairBlow', alt: 'Stylist blow-drying with a round brush', caption: 'LOOK 08 — BODY AND BOUNCE', category: 'hair', tags: ['blow-dry'], genuine: false },
  { id: 'g09', image: 'nails3', alt: 'Light pink manicured nails on a soft surface', caption: 'LOOK 09 — QUIET PINK', category: 'nails', tags: ['minimal'], genuine: false },
  { id: 'g10', image: 'bridal2', alt: 'Bridal look with ornate gold jewellery and a veil', caption: 'LOOK 10 — VEILED GOLD', category: 'bridal', tags: ['gold', 'veil'], genuine: false },
  { id: 'g11', image: 'interior1', alt: 'Modern salon interior with chairs and mirrors', caption: 'SPACE — A MODERN SALON FLOOR', category: 'space', tags: ['interior'], genuine: false },
  { id: 'g12', image: 'skin4', alt: 'Jade roller and gua sha with lotion', caption: 'LOOK 12 — SCULPTING RITUAL', category: 'skin', tags: ['gua sha'], genuine: false },
  { id: 'g13', image: 'makeupApply3', alt: 'Woman applying makeup to her face', caption: 'LOOK 13 — THE FINISHING TOUCH', category: 'makeup', tags: ['process'], genuine: false },
  { id: 'g14', image: 'hairColour', alt: 'Hands holding hairbrushes, scissors and a tinting brush', caption: 'LOOK 14 — THE COLOURIST’S KIT', category: 'hair', tags: ['colour', 'tools'], genuine: false },
  { id: 'g15', image: 'nails6', alt: 'Hand with mauve and silver glitter nails', caption: 'LOOK 15 — MAUVE AND SILVER', category: 'nails', tags: ['glitter'], genuine: false },
  { id: 'g16', image: 'bridal4', alt: 'Bridal portrait in red and gold', caption: 'LOOK 16 — GOLDEN HOUR BRIDE', category: 'bridal', tags: ['gold'], genuine: false },
  { id: 'g17', image: 'interior2', alt: 'Salon chairs facing circular mirrors', caption: 'SPACE — ROUND MIRRORS', category: 'space', tags: ['interior', 'mirror'], genuine: false },
  { id: 'g18', image: 'hairCut', alt: 'Woman having her hair cut', caption: 'LOOK 18 — THE CONSULTED CUT', category: 'hair', tags: ['cut'], genuine: false },
]

export const testimonials: Testimonial[] = [
  { id: 't1', quote: 'I arrived with a hundred references and left with something that was simply, quietly me.', name: 'Sample guest', context: 'Bridal makeup', isSample: true },
  { id: 't2', quote: 'The consultation alone changed how I think about my hair. Nothing felt rushed.', name: 'Sample guest', context: 'Hair colour', isSample: true },
  { id: 't3', quote: 'The kind of facial where you forget your phone exists.', name: 'Sample guest', context: 'Facial ritual', isSample: true },
]

export const experienceChapters: ExperienceChapter[] = [
  { title: 'The Consultation', kicker: 'Chapter one', body: 'We begin by listening: your skin, your hair, your calendar and the way you want to feel when you leave.', image: 'interior6' },
  { title: 'The Ritual', kicker: 'Chapter two', body: 'Unhurried, precise work in a calm room — every step explained, nothing assumed.', image: 'skin3' },
  { title: 'The Products', kicker: 'Chapter three', body: 'Products are chosen for your skin or hair on the day, and we tell you plainly what we used and why.', image: 'skin5' },
  { title: 'The Finish', kicker: 'Chapter four', body: 'A last look in good light, with simple aftercare so the result lasts well beyond the chair.', image: 'makeupApply2' },
]

export const faq: FaqItem[] = [
  { id: 'booking', group: 'Booking', q: 'How do I book an appointment?', a: 'Use the Book Appointment button anywhere on the site to choose services, a professional and a time. This site is currently a demo, so requests are prepared for you but not sent to the salon.' },
  { id: 'availability', group: 'Booking', q: 'Is the availability shown real?', a: 'No. Times shown are demo availability generated for illustration. Please confirm any time directly with the salon.' },
  { id: 'cancellation', group: 'Policies', q: 'What is the cancellation policy?', a: 'Sample policy: please give at least 24 hours’ notice to change an appointment. The salon will confirm its actual policy.' },
  { id: 'bridal-trials', group: 'Bridal', q: 'Do you offer bridal trials?', a: 'Yes — a trial is recommended for every bridal booking so the look is agreed well before the day.' },
  { id: 'products', group: 'Salon', q: 'Which products do you use?', a: 'Products are chosen for your skin and hair type. Your professional will tell you what they use and why. Specific brands are confirmed by the salon.' },
  { id: 'payment', group: 'Policies', q: 'How do I pay?', a: 'Payment is made at the salon after your service. No payment is taken on this website.' },
  { id: 'prices', group: 'Policies', q: 'Are the prices on this site final?', a: 'No. Prices shown are sample pricing and must be confirmed with the salon.' },
]

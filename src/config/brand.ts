import type { BrandConfig } from '../data/types'

/**
 * Single source of truth for brand + business facts.
 * Leave a field empty ('' / null) and the UI renders a bracketed placeholder.
 * Rename the brand here and it updates everywhere.
 */
export const brand: BrandConfig = {
  name: 'VELARA',
  shortName: 'Velara',
  tagline: 'The art of becoming you',
  domain: '',
  address: '',
  phone: '',
  email: '',
  whatsapp: '', // digits with country code, e.g. 919XXXXXXXXX
  mapUrl: '',
  hours: null, // e.g. { 1: { open: '10:00', close: '19:00' }, 0: null }
  social: { instagram: '', facebook: '', youtube: '', pinterest: '' },
  booking: {
    slotInterval: 30,
    leadTimeHours: 2,
    windowDays: 45,
    // Used ONLY to generate clearly-labelled demo availability. Not the salon's real hours.
    demoHours: {
      0: { open: '10:00', close: '18:00' },
      1: null,
      2: { open: '10:00', close: '19:30' },
      3: { open: '10:00', close: '19:30' },
      4: { open: '10:00', close: '19:30' },
      5: { open: '10:00', close: '20:00' },
      6: { open: '09:30', close: '20:00' },
    },
  },
  pricesConfirmed: false,
  policiesConfirmed: false,
  currency: 'INR',
}

export const placeholders = {
  address: '[Salon address]',
  phone: '[Salon phone]',
  email: '[Salon email]',
  whatsapp: '[WhatsApp number]',
  hours: '[Opening hours]',
  map: '[Map link]',
} as const

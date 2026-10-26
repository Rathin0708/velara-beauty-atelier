import type { Service } from '../data/types'

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatPrice = (n: number): string => inr.format(n)

export function formatPriceLabel(s: Pick<Service, 'price' | 'priceFrom'>): string {
  return `${s.priceFrom ? 'from ' : ''}${formatPrice(s.price)}`
}

export function formatDuration(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h && m) return `${h}h ${m}m`
  if (h) return `${h}h`
  return `${m} min`
}

export function totals(list: Pick<Service, 'price' | 'duration' | 'priceFrom'>[]) {
  return {
    duration: list.reduce((a, s) => a + s.duration, 0),
    price: list.reduce((a, s) => a + s.price, 0),
    hasFrom: list.some((s) => s.priceFrom),
  }
}

export const pad = (n: number): string => String(n).padStart(2, '0')

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatLongDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  return `${h % 12 || 12}:${pad(m)} ${suffix}`
}

export const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const fromMinutes = (min: number): string => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`

export function searchServices(list: Service[], query: string): Service[] {
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter((s) => `${s.name} ${s.description}`.toLowerCase().includes(q))
}

export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v))

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Splits "Become *Radiant*" into plain and italic segments. */
export function parseEmphasis(text: string): Array<{ text: string; em: boolean }> {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((t) => (t.startsWith('*') ? { text: t.slice(1, -1), em: true } : { text: t, em: false }))
}

export const stripEmphasis = (text: string): string => text.replace(/\*/g, '')

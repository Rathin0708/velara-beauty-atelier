import { brand } from '../config/brand'
import { formatLongDate, formatTime, fromISODate, fromMinutes, pad, toMinutes } from './utils'

export interface Slot { time: string; available: boolean; period: 'Morning' | 'Afternoon' | 'Evening' }

/** Small deterministic string hash → [0,1). Stable across reloads. */
function seeded(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  h ^= h >>> 15
  h = Math.imul(h, 2246822507)
  h ^= h >>> 13
  return ((h >>> 0) % 10000) / 10000
}

const periodOf = (min: number): Slot['period'] => (min < 12 * 60 ? 'Morning' : min < 17 * 60 ? 'Afternoon' : 'Evening')

export function isClosed(iso: string): boolean {
  return !brand.booking.demoHours[fromISODate(iso).getDay()]
}

export function generateSlots(iso: string, durationMin: number, proSlug: string | null, now: Date = new Date()): Slot[] {
  const hours = brand.booking.demoHours[fromISODate(iso).getDay()]
  if (!hours) return []
  const step = brand.booking.slotInterval
  const open = toMinutes(hours.open)
  const close = toMinutes(hours.close)
  const dur = Math.max(durationMin, step)
  const slots: Slot[] = []
  const earliest = new Date(now.getTime() + brand.booking.leadTimeHours * 3600_000)
  for (let t = open; t + dur <= close; t += step) {
    const d = fromISODate(iso)
    d.setHours(Math.floor(t / 60), t % 60, 0, 0)
    const tooSoon = d < earliest
    const booked = seeded(`${iso}|${t}|${proSlug ?? 'any'}`) < 0.32
    slots.push({ time: fromMinutes(t), available: !tooSoon && !booked, period: periodOf(t) })
  }
  return slots
}

export function bookingDates(from: Date = new Date()): { first: string; last: string } {
  const last = new Date(from)
  last.setDate(last.getDate() + brand.booking.windowDays)
  const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  return { first: iso(from), last: iso(last) }
}

export function makeReference(seed: string): string {
  const n = Math.floor(seeded(seed) * 36 ** 5).toString(36).toUpperCase().padStart(5, '0')
  return `VEL-${n}`
}

export interface IcsInput { iso: string; time: string; durationMin: number; summary: string; description: string; uid: string }

const icsEscape = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

function icsStamp(iso: string, minutes: number): string {
  const d = fromISODate(iso)
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(Math.floor(minutes / 60))}${pad(minutes % 60)}00`
}

export function buildIcs(i: IcsInput): string {
  const start = toMinutes(i.time)
  const end = start + i.durationMin
  const now = new Date()
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//${brand.name}//Booking Demo//EN`, 'BEGIN:VEVENT',
    `UID:${i.uid}@velara.demo`, `DTSTAMP:${stamp}`,
    `DTSTART:${icsStamp(i.iso, start)}`, `DTEND:${icsStamp(i.iso, end)}`,
    `SUMMARY:${icsEscape(i.summary)}`, `DESCRIPTION:${icsEscape(i.description)}`, 'STATUS:TENTATIVE',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadText(filename: string, content: string, mime = 'text/calendar'): void {
  const url = URL.createObjectURL(new Blob([content], { type: `${mime};charset=utf-8` }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export interface RequestSummary {
  reference: string
  services: string[]
  professional: string
  iso: string
  time: string
  durationMin: number
  name: string
  phone: string
  notes: string
}

export function buildWhatsAppMessage(r: RequestSummary): string {
  return [
    `Hello ${brand.shortName}, I would like to request an appointment (ref ${r.reference}).`,
    `Services: ${r.services.join(', ')}`,
    `Professional: ${r.professional}`,
    `Preferred: ${formatLongDate(r.iso)}, ${formatTime(r.time)}`,
    `Name: ${r.name}`,
    r.notes ? `Notes: ${r.notes}` : '',
    'Please confirm availability.',
  ].filter(Boolean).join('\n')
}

export function whatsappLink(message: string): string | null {
  const digits = brand.whatsapp.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function normalisePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, '')
}

export function validatePhone(raw: string): string | null {
  const v = normalisePhone(raw)
  if (!v) return 'Please enter your mobile number.'
  if (!/^(?:\+91|91|0)?[6-9]\d{9}$/.test(v)) return 'Enter a valid 10-digit Indian mobile number.'
  return null
}

export function validateEmail(raw: string, required = false): string | null {
  const v = raw.trim()
  if (!v) return required ? 'Please enter your email.' : null
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : 'Enter a valid email address.'
}

export function validateName(raw: string): string | null {
  return raw.trim().length >= 2 ? null : 'Please enter your name.'
}

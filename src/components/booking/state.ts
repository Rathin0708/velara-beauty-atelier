import { createContext, useContext } from 'react'
import type { CategorySlug } from '../../data/types'
import type { RequestSummary } from '../../lib/booking'

export const STEPS = ['Service', 'Professional', 'Date', 'Time', 'Details', 'Review'] as const
export type StepIndex = 0 | 1 | 2 | 3 | 4 | 5

export interface BookingPreset { category?: CategorySlug; services?: string[]; pro?: string }

export interface FlowState {
  step: StepIndex
  category: CategorySlug | null
  serviceSlugs: string[]
  pro: string | null
  date: string | null
  time: string | null
  name: string
  phone: string
  email: string
  notes: string
  consent: boolean
  status: 'idle' | 'submitting' | 'done'
  confirmation: StoredRequest | null
}

export interface StoredRequest extends RequestSummary { createdAt: string }

export const initialFlow: FlowState = {
  step: 0, category: null, serviceSlugs: [], pro: null, date: null, time: null,
  name: '', phone: '', email: '', notes: '', consent: false, status: 'idle', confirmation: null,
}

export type FlowAction =
  | { type: 'patch'; patch: Partial<FlowState> }
  | { type: 'preset'; preset: BookingPreset }
  | { type: 'reset' }

export function flowReducer(state: FlowState, a: FlowAction): FlowState {
  switch (a.type) {
    case 'patch':
      return { ...state, ...a.patch }
    case 'reset':
      return { ...initialFlow }
    case 'preset': {
      const { category, services, pro } = a.preset
      return {
        ...initialFlow,
        name: state.name, phone: state.phone, email: state.email,
        category: category ?? null,
        serviceSlugs: services ?? [],
        pro: pro ?? null,
        step: 0,
      }
    }
  }
}

export interface BookingCtx {
  isOpen: boolean
  open: (preset?: BookingPreset) => void
  close: () => void
  flow: FlowState
  patch: (p: Partial<FlowState>) => void
  reset: () => void
  requests: StoredRequest[]
  saveRequest: (r: StoredRequest) => boolean
  storageOk: boolean
}

export const BookingContext = createContext<BookingCtx | null>(null)

export function useBooking(): BookingCtx {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}

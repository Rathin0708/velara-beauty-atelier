import { lazy, Suspense, useCallback, useMemo, useReducer, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { readStore, writeStore } from '../../lib/storage'
import { BookingContext, flowReducer, initialFlow, type BookingCtx, type BookingPreset, type StoredRequest } from './state'

const BookingPanel = lazy(() => import('./BookingPanel'))

const isRequests = (v: unknown): v is StoredRequest[] =>
  Array.isArray(v) && v.every((r) => typeof r === 'object' && r !== null && typeof (r as StoredRequest).reference === 'string')

export function BookingProvider({ children }: { children: ReactNode }) {
  const [flow, dispatch] = useReducer(flowReducer, initialFlow)
  const [isOpen, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [requests, setRequests] = useState<StoredRequest[]>(() => readStore('requests', [], isRequests))
  const [storageOk, setStorageOk] = useState(true)
  const { pathname } = useLocation()

  const open = useCallback(
    (preset?: BookingPreset) => {
      if (preset) dispatch({ type: 'preset', preset })
      // On /book the flow is already on the page, so presets apply in place.
      if (pathname !== '/book') {
        setMounted(true)
        setOpen(true)
      } else {
        document.getElementById('booking-flow')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [pathname],
  )
  const close = useCallback(() => setOpen(false), [])
  const patch = useCallback((p: Partial<typeof flow>) => dispatch({ type: 'patch', patch: p }), [])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])
  const saveRequest = useCallback(
    (r: StoredRequest) => {
      const next = [r, ...requests].slice(0, 10)
      setRequests(next)
      const ok = writeStore('requests', next)
      setStorageOk(ok)
      return ok
    },
    [requests],
  )

  const value = useMemo<BookingCtx>(
    () => ({ isOpen, open, close, flow, patch, reset, requests, saveRequest, storageOk }),
    [isOpen, open, close, flow, patch, reset, requests, saveRequest, storageOk],
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <BookingPanel />
        </Suspense>
      )}
    </BookingContext.Provider>
  )
}

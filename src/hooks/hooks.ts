import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'
import { lockScroll } from '../lib/overlay'
import { readStore, writeStore } from '../lib/storage'

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = (): boolean => useMediaQuery('(prefers-reduced-motion: reduce)')
export const usePointerFine = (): boolean => useMediaQuery('(hover: hover) and (pointer: fine)')

export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active) return
    return lockScroll()
  }, [active])
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Traps Tab inside `ref`, closes on Escape and restores focus to the opener. */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void): void {
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })
  useEffect(() => {
    if (!active) return
    const root = ref.current
    if (!root) return
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const items = () => Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null)
    const first = items()[0]
    ;(first ?? root).focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) return
      const a = list[0]
      const z = list[list.length - 1]
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault()
        z.focus()
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault()
        a.focus()
      }
    }
    root.addEventListener('keydown', onKey)
    return () => {
      root.removeEventListener('keydown', onKey)
      opener?.focus({ preventScroll: true })
    }
  }, [ref, active])
}

export function useLocalStorage<T>(key: string, initial: T, guard: (v: unknown) => v is T): [T, (v: T) => boolean] {
  const [value, setValue] = useState<T>(() => readStore(key, initial, guard))
  const set = useCallback(
    (v: T) => {
      setValue(v)
      return writeStore(key, v)
    },
    [key],
  )
  return [value, set]
}

export function useDocumentMeta(title: string, description?: string): void {
  useEffect(() => {
    document.title = title === 'VELARA' ? 'VELARA — Beauty Atelier' : `${title} · VELARA`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}

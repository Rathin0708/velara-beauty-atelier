const HEADER_OFFSET = 96

/** Scrolls to an element by id, accounting for the sticky header. Returns false if the target is missing. */
export function scrollToHash(hash: string, smooth = false): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  const el = id ? document.getElementById(id) : null
  if (!el) return false
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto' })
  return true
}

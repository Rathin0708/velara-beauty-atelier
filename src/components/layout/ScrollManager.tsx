import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { ScrollTrigger } from '../../lib/gsap'
import { scrollToHash } from '../../lib/scroll'

const positions = new Map<string, number>()

/** Records scroll position of the page being left, keyed by history entry. */
export function ScrollSaver() {
  const { key } = useLocation()
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    return () => {
      positions.set(key, window.scrollY)
    }
  }, [key])
  return null
}

/** Mount this inside each routed page: it runs when the NEW page mounts, after the old one has exited. */
export function ScrollRestorer() {
  const { key, hash } = useLocation()
  const navType = useNavigationType()
  useLayoutEffect(() => {
    if (navType === 'POP' && positions.has(key)) {
      window.scrollTo(0, positions.get(key) ?? 0)
    } else if (!hash || !scrollToHash(hash)) {
      window.scrollTo(0, 0)
    }
    let frames = 0
    const settle = () => {
      ScrollTrigger.refresh()
      if (hash && navType !== 'POP') scrollToHash(hash)
      if (++frames < 2) setTimeout(settle, 350)
    }
    const t = setTimeout(settle, 120)
    return () => clearTimeout(t)
  }, [key, hash, navType])
  return null
}

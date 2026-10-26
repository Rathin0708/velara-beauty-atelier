import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/hooks'
import { ease } from '../../lib/tokens'
import { ScrollRestorer } from './ScrollManager'

/** Route transition: outgoing page fades and lifts (≤300ms), incoming page settles. Never blocks pointer events. */
export function PageTransition({ children }: { children: (location: ReturnType<typeof useLocation>) => ReactNode }) {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: reduce ? 0.01 : 0.3, ease: ease.inOut }}
        style={{ pointerEvents: 'auto' }}
      >
        <ScrollRestorer />
        {children(location)}
      </motion.div>
    </AnimatePresence>
  )
}

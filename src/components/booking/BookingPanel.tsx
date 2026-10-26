import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useRef } from 'react'
import { useFocusTrap, useLockBodyScroll, useReducedMotion } from '../../hooks/hooks'
import { ease } from '../../lib/tokens'
import { BookingFlow } from './BookingFlow'
import { useBooking } from './state'

/** Slide-over (right on desktop, full-screen sheet on mobile) hosting the shared booking flow. */
export default function BookingPanel() {
  const { isOpen, close } = useBooking()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useLockBodyScroll(isOpen)
  useFocusTrap(ref, isOpen, close)
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="sheet-root">
          <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.3 }} onClick={close} />
          <motion.div
            ref={ref}
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: reduce ? 0.01 : 0.55, ease: ease.inOut }}
          >
            <div className="sheet-head">
              <div>
                <p className="eyebrow">Demo booking</p>
                <p id="sheet-title" className="display d-sm">Book an appointment</p>
              </div>
              <button type="button" className="icon-btn" aria-label="Close booking" onClick={close}><X size={20} /></button>
            </div>
            <div className="sheet-body">
              <BookingFlow />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

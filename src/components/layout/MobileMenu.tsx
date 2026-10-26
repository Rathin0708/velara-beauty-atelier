import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { brand, placeholders } from '../../config/brand'
import { primaryNav } from '../../config/navigation'
import { useFocusTrap, useLockBodyScroll, useReducedMotion } from '../../hooks/hooks'
import { ease } from '../../lib/tokens'
import { BookButton } from '../ui/BookButton'
import { Monogram } from '../ui/Monogram'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useLockBodyScroll(open)
  useFocusTrap(ref, open, onClose)
  const wa = brand.whatsapp.replace(/\D/g, '')
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="mobile-menu on-dark"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduce ? 0.01 : 0.7, ease: ease.inOut }}
        >
          <div className="mobile-menu-top">
            <span className="wordmark wordmark--light"><Monogram size={24} /><span>{brand.name}</span></span>
            <button type="button" className="icon-btn" aria-label="Close menu" onClick={onClose}><X size={20} /></button>
          </div>
          <nav aria-label="Mobile">
            <ul className="mobile-links">
              {[{ label: 'Home', to: '/' }, ...primaryNav].map((l, i) => (
                <li key={l.to} className="mask-line">
                  <motion.div initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ delay: reduce ? 0 : 0.25 + i * 0.07, duration: reduce ? 0 : 0.8, ease: ease.reveal }}>
                    <Link to={l.to} onClick={onClose} className="display">{l.label}</Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu-foot">
            <div className="mobile-info">
              {brand.phone && <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>}
              {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp</a>}
              {!brand.phone && !wa && <span className="placeholder">{placeholders.phone}</span>}
            </div>
            <BookButton variant="ivory" className="mobile-book">Book Appointment</BookButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

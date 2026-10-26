import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { ease } from '../../lib/tokens'
import { useReducedMotion } from '../../hooks/hooks'

export interface AccordionEntry { id: string; title: ReactNode; content: ReactNode }

interface Props {
  items: AccordionEntry[]
  /** Item ids that start open (e.g. from a URL hash). */
  initialOpen?: string[]
  multiple?: boolean
  className?: string
  open?: string[]
  onChange?: (open: string[]) => void
}

export function Accordion({ items, initialOpen = [], multiple = false, className, open: controlled, onChange }: Props) {
  const [inner, setInner] = useState<string[]>(initialOpen)
  const open = controlled ?? inner
  const reduce = useReducedMotion()
  const base = useId()
  const toggle = (id: string) => {
    const next = open.includes(id) ? open.filter((x) => x !== id) : multiple ? [...open, id] : [id]
    setInner(next)
    onChange?.(next)
  }
  return (
    <div className={className}>
      {items.map((it) => {
        const isOpen = open.includes(it.id)
        return (
          <div className="acc-item" key={it.id} id={`acc-${it.id}`}>
            <h3 className="acc-h">
              <button type="button" className="acc-btn" aria-expanded={isOpen} aria-controls={`${base}-${it.id}`} onClick={() => toggle(it.id)}>
                <span>{it.title}</span>
                <Plus size={20} className="acc-icon" data-open={isOpen} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-${it.id}`}
                  role="region"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: ease.reveal }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="acc-body">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

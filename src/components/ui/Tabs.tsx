import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react'

export interface TabDef { id: string; label: string }

interface Props {
  tabs: TabDef[]
  active: string
  onChange: (id: string) => void
  label: string
  children: ReactNode
}

/** WAI-ARIA tabs with roving tabindex and arrow-key navigation. */
export function Tabs({ tabs, active, onChange, label, children }: Props) {
  const base = useId()
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const onKey = (e: KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === active)
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    onChange(tabs[next].id)
    refs.current[tabs[next].id]?.focus()
  }
  return (
    <div className="tabs">
      <div role="tablist" aria-label={label} className="tablist" onKeyDown={onKey}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[t.id] = el }}
            role="tab"
            id={`${base}-t-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${base}-p-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            className="tab"
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-p-${active}`} aria-labelledby={`${base}-t-${active}`} tabIndex={0} className="tabpanel">
        {children}
      </div>
    </div>
  )
}

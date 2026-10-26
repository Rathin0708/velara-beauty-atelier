import type { ReactNode } from 'react'

/** Renders the real value when configured, else an obviously-replaceable bracketed placeholder. */
export function Configured({ value, placeholder, children }: { value: string; placeholder: string; children?: (v: string) => ReactNode }) {
  if (value) return <>{children ? children(value) : value}</>
  return <span className="placeholder" title="Not yet configured — edit src/config/brand.ts">{placeholder}</span>
}

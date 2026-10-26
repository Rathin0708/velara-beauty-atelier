import type { ReactNode } from 'react'
import { SplitText } from '../motion/SplitText'

interface Props {
  eyebrow: string
  title: string
  lede?: ReactNode
  children?: ReactNode
}

/** Consistent page opener: exactly one h1 per page. */
export function PageHead({ eyebrow, title, lede, children }: Props) {
  return (
    <header className="page-head">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <SplitText as="h1" text={title} trigger="load" className="display d-xl page-title" />
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  )
}

import type { ReactNode } from 'react'
import { cx } from '../../lib/utils'
import { Magnetic } from '../motion/Magnetic'
import { useBooking, type BookingPreset } from '../booking/state'

interface Props {
  preset?: BookingPreset
  variant?: 'primary' | 'ghost' | 'light' | 'ivory'
  size?: 'md' | 'sm'
  magnetic?: boolean
  className?: string
  children?: ReactNode
}

/** Every "Book" CTA opens the shared booking flow, optionally with a preselection. */
export function BookButton({ preset, variant = 'primary', size = 'md', magnetic, className, children = 'Book Appointment' }: Props) {
  const { open } = useBooking()
  const btn = (
    <button type="button" data-cursor="BOOK" className={cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className)} onClick={() => open(preset)}>
      {children}
    </button>
  )
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn
}

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { GalleryItem } from '../../data/types'
import { clamp } from '../../lib/utils'
import { Photo } from '../ui/Photo'

/** Draggable comparison. Only ever rendered for pairs marked genuine in data. */
export function BeforeAfterSlider({ item }: { item: GalleryItem }) {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const drag = useRef(false)
  if (!item.beforeAfterPair) return null

  const fromEvent = (e: PointerEvent) => {
    const r = box.current?.getBoundingClientRect()
    if (r) setPos(clamp(((e.clientX - r.left) / r.width) * 100, 0, 100))
  }
  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') setPos((p) => clamp(p - step, 0, 100))
    else if (e.key === 'ArrowRight') setPos((p) => clamp(p + step, 0, 100))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }
  return (
    <div
      ref={box}
      className="ba"
      onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromEvent(e) }}
      onPointerMove={(e) => drag.current && fromEvent(e)}
      onPointerUp={() => { drag.current = false }}
    >
      <Photo name={item.image} alt={`${item.alt} (after)`} className="ratio-45 ba-layer" sizes="60vw" />
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo name={item.beforeAfterPair} alt={`${item.alt} (before)`} className="ratio-45 ba-layer" sizes="60vw" />
      </div>
      <div
        className="ba-handle"
        style={{ left: `${pos}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before`}
        onKeyDown={onKey}
      />
    </div>
  )
}

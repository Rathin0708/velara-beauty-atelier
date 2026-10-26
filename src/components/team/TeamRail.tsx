import { useRef, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { getTeam } from '../../lib/api'
import { BookButton } from '../ui/BookButton'
import { Photo } from '../ui/Photo'

/** Native scroll-snap rail. Mouse users can also drag; touch uses ordinary swipe. */
export function TeamRail() {
  const rail = useRef<HTMLUListElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const moved = useRef(false)

  const down = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !rail.current) return
    drag.current = { x: e.clientX, left: rail.current.scrollLeft }
    moved.current = false
  }
  const move = (e: PointerEvent) => {
    if (!drag.current || !rail.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) moved.current = true
    rail.current.scrollLeft = drag.current.left - dx
  }
  const up = () => { drag.current = null }

  return (
    <ul
      ref={rail}
      className="team-rail"
      tabIndex={0}
      aria-label="Our professionals — scroll horizontally"
      data-cursor="DRAG"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerLeave={up}
      onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false } }}
    >
      {getTeam().map((m) => (
        <li key={m.slug} className="team-card">
          <div className="team-portrait arch">
            <Photo name={m.image} alt={`Sample portrait for ${m.name}`} className="ratio-fill" sizes="(min-width: 1024px) 24vw, 70vw" />
            <div className="team-reveal">
              <p>{m.descriptor}</p>
              <p className="note">{m.services.slice(0, 2).map((s) => s.replace(/-/g, ' ')).join(' · ')}</p>
            </div>
          </div>
          <div className="team-meta">
            <h3 className="display d-sm"><Link to={`/team/${m.slug}`}>{m.name}</Link></h3>
            <p className="meta">{m.role}</p>
            {m.isSample && <span className="tag">Sample profile</span>}
            <BookButton preset={{ pro: m.slug }} variant="ghost" size="sm">Book with {m.name}</BookButton>
          </div>
        </li>
      ))}
    </ul>
  )
}

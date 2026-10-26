/** Reference-counted body scroll lock shared by every overlay (menu, sheet, lightbox). */
let count = 0
let prevOverflow = ''
let prevPadding = ''

export function lockScroll(): () => void {
  if (count === 0) {
    const sbw = window.innerWidth - document.documentElement.clientWidth
    prevOverflow = document.body.style.overflow
    prevPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`
  }
  count++
  let released = false
  return () => {
    if (released) return
    released = true
    count--
    if (count === 0) {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPadding
    }
  }
}

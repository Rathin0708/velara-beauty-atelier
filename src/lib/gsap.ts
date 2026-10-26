import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registered exactly once for the whole app.
gsap.registerPlugin(ScrollTrigger, useGSAP)
// Prevents pinned sections jumping when the mobile address bar resizes the viewport.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, useGSAP }

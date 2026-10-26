/** Motion tokens shared by GSAP (string/array eases) and Motion (cubic-bezier arrays). */
export const ease = {
  reveal: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  gsapReveal: 'power3.out',
  gsapInOut: 'power2.inOut',
  gsapHero: 'expo.out',
}

export const dur = {
  micro: 0.2,
  ui: 0.34,
  reveal: 0.9,
  hero: 1.1,
}

export const stagger = {
  text: 0.06,
  media: 0.1,
}

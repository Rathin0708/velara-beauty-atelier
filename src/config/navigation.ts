export interface NavLink { label: string; to: string }

export const primaryNav: NavLink[] = [
  { label: 'Services', to: '/services' },
  { label: 'Bridal', to: '/bridal' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Team', to: '/team' },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerColumns: Array<{ title: string; links: NavLink[] }> = [
  { title: 'Services', links: [
    { label: 'Full menu', to: '/services' },
    { label: 'Hair', to: '/services#hair-styling' },
    { label: 'Makeup', to: '/services#makeup' },
    { label: 'Skin', to: '/services#facials-skincare' },
    { label: 'Nails', to: '/services#mani-pedi' },
  ] },
  { title: 'Experience', links: [
    { label: 'Bridal', to: '/bridal' },
    { label: 'Packages', to: '/packages' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Book', to: '/book' },
  ] },
  { title: 'Atelier', links: [
    { label: 'About', to: '/about' },
    { label: 'Team', to: '/team' },
    { label: 'Contact', to: '/contact' },
  ] },
  { title: 'Help', links: [
    { label: 'FAQ', to: '/faq' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
  ] },
]

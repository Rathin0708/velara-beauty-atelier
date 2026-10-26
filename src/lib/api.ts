/**
 * Single data-access layer. Swap these functions for a CMS or booking API later;
 * components never import the data modules directly.
 */
import { serviceCategories } from '../data/categories'
import { experienceChapters, faq, gallery, testimonials } from '../data/content'
import { packages, team } from '../data/people'
import { services } from '../data/services'
import type { CategorySlug, GalleryCategory, GalleryItem, PackageItem, Service, ServiceCategory, TeamMember } from '../data/types'
import { generateSlots, type Slot } from './booking'

export const getCategories = (): ServiceCategory[] =>
  serviceCategories.filter((c) => c.enabled).sort((a, b) => a.order - b.order)

export const getCategory = (slug: string): ServiceCategory | undefined => getCategories().find((c) => c.slug === slug)

const enabled = (): Set<CategorySlug> => new Set(getCategories().map((c) => c.slug))

export const getServices = (category?: CategorySlug): Service[] =>
  services.filter((s) => enabled().has(s.category) && (!category || s.category === category))

export const getServiceBySlug = (slug: string): Service | undefined => getServices().find((s) => s.slug === slug)

export const getFeaturedServices = (category: CategorySlug, n = 3): Service[] => {
  const list = getServices(category)
  return [...list.filter((s) => s.featured), ...list.filter((s) => !s.featured)].slice(0, n)
}

export const getRelatedServices = (s: Service, n = 3): Service[] =>
  getServices(s.category).filter((x) => x.slug !== s.slug).slice(0, n)

export const getTeam = (): TeamMember[] => team
export const getMember = (slug: string): TeamMember | undefined => team.find((m) => m.slug === slug)

export const getPackages = (kind?: PackageItem['kind']): PackageItem[] => packages.filter((p) => !kind || p.kind === kind)

export const getGallery = (category?: GalleryCategory): GalleryItem[] => gallery.filter((g) => !category || g.category === category)
export const getGenuineBeforeAfter = (): GalleryItem[] => gallery.filter((g) => g.genuine && g.beforeAfterPair)

export const getTestimonials = () => testimonials
export const getFaq = () => faq
export const getChapters = () => experienceChapters

export const getAvailability = (iso: string, durationMin: number, proSlug: string | null): Slot[] =>
  generateSlots(iso, durationMin, proSlug)

export const getProfessionalsFor = (serviceSlugs: string[]): TeamMember[] =>
  team.filter((m) => serviceSlugs.every((s) => getServiceBySlug(s)?.professionals.includes(m.slug)))

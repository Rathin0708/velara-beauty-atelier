# VELARA — Beauty Atelier

A cinematic, motion-rich luxury beauty salon website. **Frontend only**: booking is a clearly labelled demo and nothing is sent to any salon.

**Live site:** _deploying — link added below once live_

## Stack

Vite 8 · React 19 · TypeScript (strict) · Tailwind CSS v4 · React Router · GSAP + ScrollTrigger · Motion · lucide-react

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build
npm run preview
```

## What's inside

- 14 routes: home, services (+ detail), bridal, gallery, team (+ profile), packages, about, book, contact, FAQ, privacy, terms, 404
- Cinematic home: hero reveal, scroll-linked statement, interactive beauty menu, pinned four-chapter story, gallery + lightbox, bridal expand, team rail, price menu, testimonials carousel
- Demo booking (six steps) with an accessible calendar, deterministic demo availability, `.ics` export and optional WhatsApp hand-off
- Respects `prefers-reduced-motion`; keyboard accessible (Lighthouse accessibility 100)

## Customise

| What | Where |
| --- | --- |
| Brand name, address, phone, hours, WhatsApp, socials | `src/config/brand.ts` |
| Services, categories, packages, team, gallery, FAQ, testimonials | `src/data/` |
| Data access (swap for a CMS or booking API) | `src/lib/api.ts` |
| Motion timings and easing | `src/lib/tokens.ts` |
| Colours and typography | CSS variables in `src/styles/base.css` |

## Placeholders to fill

Unconfigured business details render as bracketed placeholders (e.g. `[Salon address]`): address, phone, email, WhatsApp, map link, opening hours, social links and logo. Team profiles, testimonials, prices and gallery images are **sample / inspiration** content and are labelled as such on the site.

## Limitations

- Booking is a demo: availability is simulated and requests are stored only in the visitor's browser.
- Images are hot-linked from Unsplash and are not photographs of a real salon.

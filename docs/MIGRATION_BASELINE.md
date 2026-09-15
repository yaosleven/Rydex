# Rydex Astro Component Migration — Phase 1 Baseline

**Baseline date:** 2026-09-10  
**Scope:** Current `astro-prototype` site, preserving its existing copy, assets, routes, and visual direction as the migration reference.  
**Rule for later phases:** No page is replaced until its component-based version has been compared against this baseline at desktop, tablet, and mobile widths.

## 1. Current build snapshot

- Rendering mode: Astro static output.
- Last verified build: 41 generated pages, with Astro check reporting 0 errors, 0 warnings, and 0 hints.
- Current implementation: Astro routes and shared document shell, with much of the downloaded Webflow markup and runtime retained for visual parity.
- Current local preview: `http://127.0.0.1:4321/`.

This document is intentionally a migration reference only. It does not change any page content or visual styling.

## 2. Page inventory

### Primary conversion priority

| Page type | Current routes | Intended component destination |
| --- | --- | --- |
| Home | `/` | B2B home page assembled from reusable sections |
| Model catalogue | `/models`, `/models.html`, `/models-2.html` | Product list and filter components |
| Model detail | `/rapt-horizon.html`, `/cest-tunder.html`, `/glide-vortex.html`, `/senity-pulse.html`, `/sumit-senity.html`, `/velocit-crest.html`, `/xplorer-glide.html` | One data-driven product detail template |
| Model brands | `/aurion.html`, `/luxora.html`, `/velox.html` | Brand archive template |
| Model attributes | `/coupe.html`, `/sedan.html`, `/suv.html`, `/360deg-camera.html`, `/bluetooth.html`, `/built-in-gps.html`, `/leather-seats.html`, `/led-headlights.html`, `/sound-system.html`, `/sunroof-6rm2o-xlnu2.html` | Category and feature archive template |
| Contact and conversion | `/contact.html`, `/search` | RFQ/contact form and local search |

### Trust and content pages

| Page type | Current routes | Intended component destination |
| --- | --- | --- |
| Company pages | `/about.html`, `/reviews.html` | Standard marketing page sections |
| Editorial indexes | `/blog.html`, `/blog-2.html`, `/guides.html`, `/events.html` | Content listing template |
| Editorial details | `/exclusive-rydex-car-show-in-dubai-unveiled.html`, `/guide-to-choose-the-right-car-in-a-showroom.html`, `/guides-for-maintaining-your-rental-car-perfectly.html`, `/rydex-hosts-annual-auto-racing-grand-event.html`, `/top-luxury-cars-to-rent-this-summer-season.html`, `/ultimate-guide-to-choosing-coupe-rentals.html` | Article detail template |
| Utility pages | `/changelog.html`, `/licenses.html`, `/style-guide.html` | Keep, simplify, or retire after business-content review |

## 3. Existing reusable material

### Astro components already present

- Home: `HomeHero`, `HomeAbout`, `FeaturedModels`, `ServiceBenefits`, `BookingSteps`, `DriverTestimonials`, `HomeJournal`.
- Shared/UI: `Header`, `SiteFooter`, `ModelCard`, `BlogCard`, `TestimonialCard`, `SectionLabel`.
- Model area: `ModelsListing`, `ModelDetail`.

These are useful visual references, but later phases will replace any raw Webflow markup inside them with semantic Astro components and structured props.

### Current static asset inventory

- 33 WebP images.
- 44 SVG assets.
- 1 CSS file and 7 JavaScript files under `public/static`.
- Fonts and Webflow-derived runtime files are currently served locally from the project.

All assets currently used by the generated static site are included in the deployment package created on 2026-09-09.

## 4. Baseline visual and behaviour checklist

The following pages are the visual reference set for component migration:

1. `/` — hero, navigation, CTA, product preview, testimonial/content sections, footer.
2. `/models` — filter controls, model cards, pagination/layout.
3. `/rapt-horizon.html` — detail-page hero, gallery/content hierarchy, specification/CTA areas.
4. `/contact.html` — contact layout and conversion entry point.
5. `/blog.html` — editorial list/card rhythm.

Each page must be checked at:

| Viewport | Target size | What to compare |
| --- | --- | --- |
| Desktop | 1440 × 900 | navigation, max widths, grid columns, hero crop, hover/focus states |
| Tablet | 768 × 1024 | navigation transition, two-column regions, filters, spacing |
| Mobile | 390 × 844 | menu, CTA visibility, image crop, stacking, horizontal overflow |

Automated screenshots were not created in this phase because the available browser capture service was unavailable. This is recorded explicitly rather than substituting unverified images. Screenshots will be captured before the first converted page is accepted.

## 5. Behaviour to preserve or deliberately replace

| Existing behaviour | Migration decision |
| --- | --- |
| Header and mobile menu | Preserve; rebuild with accessible button semantics and keyboard support |
| Brand/type/feature navigation | Preserve; move to data-driven links and filters |
| Model cards and detail links | Preserve; generate from product data |
| Local search | Preserve; regenerate index from structured content |
| Webflow scroll/decorative animation | Reassess individually; keep only effects that help comprehension or conversion |
| Book/contact action | Replace with a real RFQ workflow in the conversion phase |
| Webflow badge | Keep removed in all future layouts |

## 6. Phase 1 exit criteria

Phase 1 is complete when this baseline is accepted as the reference for all later work:

- Existing content and route inventory are fixed above.
- Current assets and active UI areas are identified.
- The five key page types and three target viewports are defined for visual regression checks.
- No production page has been modified.

## 7. Next phase boundary

Phase 2 starts with the design system and shared site shell only:

1. Introduce colour, typography, spacing, and responsive layout tokens.
2. Build a clean `BaseLayout`, header, footer, button, and container components.
3. Keep the existing site running while the new shell is reviewed in isolation.

No business copy, products, images, routes, or inquiry integrations are changed until those components match the approved baseline.

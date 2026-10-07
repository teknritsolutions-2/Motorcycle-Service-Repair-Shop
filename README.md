# Apex Motoworks

A responsive static website for an independent motorcycle service and repair workshop. It uses semantic HTML, a CSS design system, and scoped vanilla JavaScript with no runtime framework.

## Pages

- [Home 1](pages/index.html) — practical workshop homepage with a split hero, horizontal service selector, workshop imagery, service overview, booking process, estimates and review slider.
- [Home 2](pages/home2.html) — alternate editorial homepage with a photographic panorama, symptom-led job board, motorcycle types, workshop philosophy, process track and rider-feedback ledger.
- [About](pages/about.html) — inspection-first philosophy, standards and mechanical approach.
- [Services](pages/services.html) — seven service categories with symptoms, scope and detail links.
- [Service details](pages/service-details.html) — reusable query-driven service template.
- [Brands](pages/brands.html) — commonly serviced makes with an independent-workshop disclaimer.
- [Pricing](pages/pricing.html) — estimate process and service scope without unapproved prices.
- [Reviews](pages/reviews.html) — editorial sample-feedback layout without verification claims.
- [FAQ](pages/faq.html) — accessible accordion for practical workshop questions.
- [Contact](pages/contact.html) — service-request form and neutral location guidance.
- [Privacy](pages/privacy.html), [Terms](pages/terms.html), [page-level 404](pages/404.html), and [GitHub Pages 404](404.html).

The root [index.html](index.html) redirects to `pages/index.html` so repository subpath deployment continues to work.

## Service detail routes

`pages/service-details.html` reads the `service` query parameter and supports:

- `routine-servicing`
- `oil-filter`
- `tyre-replacement`
- `brake-servicing`
- `chain-service`
- `battery-service`
- `diagnostics`

Example: `pages/service-details.html?service=brake-servicing`

## Interface systems

- Light/dark theme preference stored in `localStorage`
- LTR/RTL preference stored in `localStorage`
- Sticky desktop navigation with an accessible Home 1/Home 2 dropdown
- Custom mechanical MW brand mark, matching SVG favicon, theme color and web manifest
- Focus-managed mobile drawer with Escape and overlay dismissal
- Reduced-motion-aware reveal effects
- Responsive review slider: 3/2/1 visible items at desktop/tablet/mobile widths
- Accessible FAQ accordion
- Inline appointment-form validation, local-date minimum, and non-confirming static submission message
- Dynamic footer year and active navigation state

## Project structure

```text
.
├── index.html
├── 404.html
├── pages/
├── assets/
│   ├── brand/
│   │   ├── logo-mark.svg
│   │   ├── favicon.svg
│   │   └── site.webmanifest
│   ├── css/
│   │   ├── style.css
│   │   ├── dark-mode.css
│   │   └── rtl.css
│   ├── images/ (optimized WebP photography)
│   └── js/main.js
└── documentation/ARCHITECTURE.md
```

All internal links and assets use relative paths so the site works from a GitHub Pages project subpath.

## Image sources

Optimized WebP photographs were sourced under the respective free-use licenses from:

- [Pexels motorcycle workshop photographs](https://www.pexels.com/search/motorcycle%20mechanic/), including work by Andrea Piacquadio, Kindel Media, Gera Cejas, Anastasia Shuraeva, Mario Amé, and other credited Pexels contributors.
- [Engine repair photograph](https://www.pexels.com/photo/a-man-fixing-a-motorcycle-11890962/) by Mick Haupt on Pexels.
- [Pixabay motorcycle workshop photograph](https://pixabay.com/photos/motorbike-garage-repairs-workshop-407186/) by SplitShire.
- [Pixabay motorcycle repair photograph](https://pixabay.com/photos/workshop-motorcycle-repair-6327042/) by mufidpwt.

Source photographs are used as design imagery only and do not depict this demo workshop, its staff, location, affiliations or customers.

## Deployment

Serve the repository as static files. For local testing, start any simple HTTP server from the project root and open `index.html`. For GitHub Pages, publish the repository root; do not convert relative asset links to absolute `/assets/...` paths.

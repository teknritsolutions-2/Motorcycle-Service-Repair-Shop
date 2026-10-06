# Motorcycle Service & Repair Shop (MotoWorkshop)

A modern, responsive, multi-page public-facing website for an independent motorcycle service and repair workshop. Built with semantic HTML5, modern vanilla CSS3, and modular vanilla JavaScript.

---

## 1. Technologies Used

- **HTML5**: Clean, accessible, semantic structure with skip navigation links, ARIA states, and logical heading hierarchies.
- **CSS3**: Vanilla CSS design system with CSS custom properties (design tokens), flexbox, grid, logical properties (`padding-inline`, `margin-block`), dark-mode overrides, and full RTL layout rules.
- **Vanilla JavaScript**: Lightweight modular IIFE architecture without third-party runtime dependencies, avoiding global namespace collisions.

---

## 2. Pages Created

All pages are located in the [`pages/`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages) directory:

1. **[`pages/index.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/index.html)**: Workshop homepage featuring hero banner, quick service grid, trust benefits, workshop facility gallery, core services overview, brands handled, 4-step booking process, pricing preview, testimonials carousel, and appointment CTA.
2. **[`pages/about.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/about.html)**: Workshop overview, mechanical philosophy, shop floor equipment standards, technician inspection checklist, and maintenance importance.
3. **[`pages/services.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/services.html)**: Comprehensive service catalogue covering all 7 core workshop services with descriptions, typical warning signs, and direct booking links.
4. **[`pages/service-details.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/service-details.html)**: In-depth service details template supporting all 7 services (Routine Servicing, Engine Oil & Filter, Tyre Replacement, Brake Servicing, Chain Service, Battery Service, Diagnostics) via URL query parameter (`?service=...`) and interactive sidebar navigation.
5. **[`pages/brands.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/brands.html)**: Dedicated brands serviced page detailing popular makes (Honda, Yamaha, Suzuki, Kawasaki, KTM, Royal Enfield, TVS, Bajaj, Hero, BMW Motorrad) with service capability notes and independent workshop notice.
6. **[`pages/pricing.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/pricing.html)**: Transparent pricing guide featuring service packages, standalone labor table, cost factor breakdown, and pricing FAQ.
7. **[`pages/reviews.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/reviews.html)**: Authentic rider feedback, testimonials by motorcycle model, and categorized feedback across key mechanical areas.
8. **[`pages/faq.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/faq.html)**: 10 common questions with an accessible, keyboard-navigable custom accordion (+ / − indicator).
9. **[`pages/contact.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/contact.html)**: Comprehensive appointment booking page with an 11-field form, workshop operating hours, contact channels, drop-off bay instructions, and interactive map embed.
10. **[`pages/privacy.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/privacy.html)**: Clear privacy policy explaining handling of customer contact details and motorcycle service history.
11. **[`pages/terms.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/terms.html)**: Workshop terms of service covering estimate approvals, customer-supplied parts, payment terms, and vehicle storage.
12. **[`pages/404.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/pages/404.html)**: Rider-themed 404 error page with quick links back to main workshop sections.
13. **[`index.html`](file:///Users/vijjureddy/Motorcycle%20Service%20&%20Repair%20Shop/index.html)**: Root entrypoint redirecting directly to `pages/index.html`.

---

## 3. Features Implemented

- **Dark Mode System**: Persistent theme preference stored in `localStorage` with fallback to system `prefers-color-scheme`. Dedicated styling ensuring high-contrast readability across all components.
- **RTL (Right-to-Left) Support**: Native bidirectional support toggleable from the navbar or drawer, adjusting drawer slide direction, arrows, select dropdown icon offsets, and typography flow.
- **Subtle Reveal Animations**: Smooth scroll-triggered reveal effects (`opacity: 0; transform: translateY(24px) scale(0.94);`) executing via `IntersectionObserver` with `prefers-reduced-motion` compliance.
- **Responsive Navigation**: Sticky header with brand icon, desktop links, theme/RTL toggles, CTA, and a responsive slide-out mobile drawer with focus management.
- **Customer Reviews Carousel**: Responsive reviews slider with multi-card view on desktop/tablet, touch swipe support, and keyboard/button controls.
- **11-Field Appointment Form**: Complete form with validation, logical padding on select elements to prevent arrow collisions, and compliant static feedback message.
- **Back-to-Top Button**: Smooth scrolling back to top of page from footer.

---

## 4. Local Preview Instructions

You can run the project using any standard static file server:

### Using Python:
```bash
python3 -m http.server 8000
```
Then navigate to: `http://localhost:8000` (or `http://localhost:8000/pages/index.html`)

### Using Node / npx:
```bash
npx -y serve .
```

### Direct Browser Opening:
Double click on `pages/index.html` or `index.html` to open directly in any modern browser.

---

## 5. Notes & Static Limitations

- **Static Appointment Form**: In accordance with the static architecture (no backend server), form submissions prepare the request and display a confirmation status notifying the rider that the request is ready for workshop confirmation. No fake server email delivery or automated booking confirmations are fabricated.
- **Map Embed Configuration**: The map in `pages/contact.html` uses an embed iframe. For a production deployment, replace the `src` attribute with your workshop's verified Google Maps Place Embed URL.
- **Manufacturer Affiliation**: MotoWorkshop operates strictly as an independent motorcycle service and repair facility. Mention of motorcycle brands (Honda, Yamaha, KTM, etc.) is solely for compatibility identification.

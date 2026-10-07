# Apex Motowerks — Design System & Technical Architecture

## 1. Design System & CSS Architecture

The stylesheet system is designed to provide high visual polish, complete responsiveness, and dark-mode / RTL support without relying on bulky CSS frameworks.

### CSS File Hierarchy

- `assets/css/style.css`: Primary stylesheet containing design tokens, reset, typography, layouts, components, utilities, and responsiveness.
- `assets/css/dark-mode.css`: Dark mode variable overrides and component-level contrast refinements scoped under `[data-theme="dark"]`.
- `assets/css/rtl.css`: Bidirectional layout rules scoped under `[dir="rtl"]`.

### Color Palette Tokens

- **Base surfaces**: `#FFFFFF` and `#F5F2EB` in light mode; `#141615` and `#1E201F` in dark mode.
- **Brand accent**: `#C45D32` workshop copper, with `#A94E2A` for hover states and translucent accent fills.
- **Text palette**: `#1A1C1B`, `#4A4D4B`, and `#6B6E6C` in light mode; `#E8E5DE`, `#A3A09A`, and `#7A7873` in dark mode.
- **Borders and dividers**: neutral `#D5D0C8` / `#E7E2DA` in light mode and `#333633` / `#2A2D2B` in dark mode.

### Typography

- Headings: `Barlow Condensed`, with `Arial Narrow` and sans-serif fallbacks.
- Body: `Inter`, followed by native system sans-serif fonts.

### Brand assets

- `assets/brand/logo-mark.svg`: compact angular MW linkage mark used in the navbar, drawer, footer and 404 treatment.
- `assets/brand/favicon.svg`: small-format derivative used by every public HTML document.
- `assets/brand/site.webmanifest`: project-relative manifest for browser metadata.

---

## 2. JavaScript Modular Architecture

All clientside logic is encapsulated within a self-executing IIFE in `assets/js/main.js` to eliminate global variable namespace pollution.

### Core Modules

1. `ThemeManager`: Manages light/dark themes, syncs with `localStorage`, listens to system preference updates, and sets `data-theme` attribute on `<html>`.
2. `RTLManager`: Toggles LTR/RTL reading direction via the `dir` attribute on `<html>`, updating button label and local storage.
3. `SharedChrome`: Enhances the HTML-authored Home 1 / Home 2 menu, keeps drawer and footer routes consistent, builds the shared footer action/columns, and updates the copyright year.
4. `Drawer`: Controls the mobile navigation, overlay, body scroll lock, Escape behavior, focus containment, and focus restoration.
5. `RevealAnimations`: Orchestrates scroll-triggered animations with an instant fallback for reduced-motion preferences.
6. `FAQAccordion`: Handles accordion expansion, keyboard interaction, and ARIA states.
7. `ReviewsSlider`: Shows 3 cards on desktop, 2 on tablet, and 1 on mobile with swipe and button navigation.
8. `AppointmentForm`: Validates the booking enquiry in the browser, provides field-level errors, and shows a non-confirming demonstration status.
9. `ServiceDetails`: Loads service imagery, inspection checklists, warning signs, workshop actions, notes, and related services from the `?service=` query parameter.
10. `BackToTop`: Smoothly returns the page to the top.
11. `NavActive`: Applies `aria-current="page"` to matching desktop and drawer links.

## 3. Page variants

- `pages/index.html` is Home 1: a concise workshop landing page with quick service navigation.
- `pages/home2.html` is Home 2: a distinct editorial landing page built around symptoms, motorcycle types, process, and booking.
- Both home pages reuse the same header, drawer, theme/RTL behavior, footer, and enquiry route.

## 4. Content and deployment notes

- Service prices, contact details, business hours, testimonials, and legal guarantees are intentionally not invented. Placeholder or sample content is labelled in the interface.
- The appointment form is a front-end demonstration and does not transmit data until connected to an approved endpoint.
- All local URLs are relative so the site works from a subdirectory as well as a domain root.
- Production images are compressed WebP assets. Source and license references are recorded in `README.md`.

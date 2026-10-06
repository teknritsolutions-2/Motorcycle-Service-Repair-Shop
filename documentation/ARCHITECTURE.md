# MotoWorkshop — Design System & Technical Architecture

## 1. Design System & CSS Architecture

The stylesheet system is designed to provide high visual polish, complete responsiveness, and dark-mode / RTL support without relying on bulky CSS frameworks.

### CSS File Hierarchy:
- `assets/css/style.css`: Primary stylesheet containing design tokens, reset, typography, layouts, components, utilities, and responsiveness.
- `assets/css/dark-mode.css`: Dark mode variable overrides and component-level contrast refinements scoped under `[data-theme="dark"]`.
- `assets/css/rtl.css`: Bidirectional layout rules scoped under `[dir="rtl"]`.

### Color Palette Tokens:
- **Base Surfaces**: `#F7F6F2` (cream-gray light background), `#141615` (deep charcoal dark background), `#FFFFFF` / `#1E201F` (card surfaces).
- **Brand Accent**: `#FF5500` (mechanic safety orange / heat accent), with subtle hover tints and tinted background pills (`rgba(255, 85, 0, 0.1)`).
- **Text Palette**: `#141615` (primary dark text), `#4A4D4B` (secondary text), `#7A7D7B` (tertiary/muted text), `#E8E5DE` (dark mode primary text).
- **Borders & Dividers**: High-definition neutral borders (`#E2DFD8` in light mode, `#2A2D2B` in dark mode).

### Typography:
- Headings: `Cabinet Grotesk` / `Syne` / `Inter`, system fallback sans-serif.
- Body: `Inter` / system-ui, ensuring clean technical legibility for part numbers, torque specifications, and checklists.

---

## 2. JavaScript Modular Architecture

All clientside logic is encapsulated within a self-executing IIFE in `assets/js/main.js` to eliminate global variable namespace pollution.

### Core Modules:
1. `ThemeManager`: Manages light/dark themes, syncs with `localStorage`, listens to system preference updates, and sets `data-theme` attribute on `<html>`.
2. `RTLManager`: Toggles LTR/RTL reading direction via the `dir` attribute on `<html>`, updating button label and local storage.
3. `Drawer`: Controls mobile navigation slide-over, backdrop overlay, body scroll lock, and ESC key closure.
4. `RevealAnimations`: Orchestrates scroll-triggered fade and scale animations using modern `IntersectionObserver` with instant fallbacks if `prefers-reduced-motion` is detected.
5. `FAQAccordion`: Handles accordion expansion, keyboard navigation (Enter/Space), and aria states.
6. `ReviewsSlider`: Multi-item carousel adjusting dynamically between 3 cards (desktop), 2 cards (tablet), and 1 card (mobile) with drag/swipe and button navigation.
7. `AppointmentForm`: Validates 11 form inputs, handles submission state, displays compliant non-fabricated status alerts.
8. `ServiceDetails`: Dynamically loads service checklists, signs, and notes based on `?service=` URL parameter with fallback content.
9. `BackToTop`: Smooth scrolling utility to return to page top.
10. `NavActive`: Automatically sets `aria-current="page"` on current route links in both navbar and mobile drawer.

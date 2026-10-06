/* ============================================
   MOTORCYCLE SERVICE & REPAIR SHOP
   Main JavaScript
   ============================================ */
(() => {
  'use strict';

  /* ----------------------------------------
     UTILITY: Asset path resolver
     Works whether served from root or /pages/
  ---------------------------------------- */
  const getBasePath = () => {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      return '../';
    }
    return './';
  };

  /* ----------------------------------------
     THEME MANAGEMENT
  ---------------------------------------- */
  const ThemeManager = {
    init() {
      const saved = localStorage.getItem('moto-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? 'dark' : 'light');
      this.apply(theme);
      this.bindToggle();
    },

    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('moto-theme', theme);
      this.updateIcons(theme);
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      this.apply(next);
    },

    updateIcons(theme) {
      document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        const sunIcon = btn.querySelector('.icon-sun');
        const moonIcon = btn.querySelector('.icon-moon');
        if (sunIcon && moonIcon) {
          sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
          moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
        }
        btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      });
    },

    bindToggle() {
      document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    }
  };

  /* ----------------------------------------
     RTL MANAGEMENT
  ---------------------------------------- */
  const RTLManager = {
    init() {
      const saved = localStorage.getItem('moto-dir');
      const dir = saved || 'ltr';
      this.apply(dir);
      this.bindToggle();
    },

    apply(dir) {
      document.documentElement.setAttribute('dir', dir);
      localStorage.setItem('moto-dir', dir);
      this.updateButtons(dir);
    },

    toggle() {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      this.apply(next);
    },

    updateButtons(dir) {
      document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
        btn.setAttribute('aria-pressed', dir === 'rtl' ? 'true' : 'false');
        btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
        const label = btn.querySelector('.rtl-label');
        if (label) {
          label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
        }
      });
    },

    bindToggle() {
      document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    }
  };

  /* ----------------------------------------
     MOBILE DRAWER
  ---------------------------------------- */
  const Drawer = {
    init() {
      this.drawer = document.getElementById('mobileDrawer');
      this.overlay = document.getElementById('drawerOverlay');
      this.openBtn = document.getElementById('hamburgerBtn');
      this.closeBtn = document.getElementById('drawerCloseBtn');

      if (!this.drawer) return;

      this.openBtn?.addEventListener('click', () => this.open());
      this.closeBtn?.addEventListener('click', () => this.close());
      this.overlay?.addEventListener('click', () => this.close());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.drawer.classList.contains('active')) {
          this.close();
        }
      });
    },

    open() {
      this.drawer.classList.add('active');
      this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.closeBtn?.focus();
      this.openBtn?.setAttribute('aria-expanded', 'true');
    },

    close() {
      this.drawer.classList.remove('active');
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
      this.openBtn?.setAttribute('aria-expanded', 'false');
      this.openBtn?.focus();
    }
  };

  /* ----------------------------------------
     REVEAL ANIMATION (IntersectionObserver)
  ---------------------------------------- */
  const RevealAnimations = {
    init() {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        document.querySelectorAll('.reveal').forEach(el => {
          el.classList.add('visible');
        });
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
  };

  /* ----------------------------------------
     FAQ ACCORDION
  ---------------------------------------- */
  const FAQAccordion = {
    init() {
      const triggers = document.querySelectorAll('.faq-item__trigger');
      if (!triggers.length) return;

      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          const item = trigger.closest('.faq-item');
          const content = item.querySelector('.faq-item__content');
          const icon = trigger.querySelector('.faq-item__icon');
          const isActive = item.classList.contains('active');

          // Close all
          document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
            activeItem.querySelector('.faq-item__content').style.maxHeight = '0';
            activeItem.querySelector('.faq-item__icon').textContent = '+';
            activeItem.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
          });

          if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.textContent = '−';
            trigger.setAttribute('aria-expanded', 'true');
          }
        });

        // Keyboard support
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
          }
        });
      });
    }
  };

  /* ----------------------------------------
     REVIEWS SLIDER
  ---------------------------------------- */
  const ReviewsSlider = {
    init() {
      const track = document.querySelector('.reviews-slider__track');
      const prevBtn = document.querySelector('.reviews-slider__btn--prev');
      const nextBtn = document.querySelector('.reviews-slider__btn--next');

      if (!track || !prevBtn || !nextBtn) return;

      const cards = track.querySelectorAll('.review-card');
      if (!cards.length) return;

      let current = 0;

      const getVisibleCount = () => {
        const w = window.innerWidth;
        if (w >= 1024) return 3;
        if (w >= 768) return 2;
        return 1;
      };

      const update = () => {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, cards.length - visible);
        current = Math.min(current, maxIndex);

        const gap = 24; // 1.5rem
        const cardWidth = (track.offsetWidth - gap * (visible - 1)) / visible;

        cards.forEach(card => {
          card.style.flex = `0 0 ${cardWidth}px`;
        });

        const offset = current * (cardWidth + gap);
        track.style.transform = `translateX(${document.dir === 'rtl' ? offset : -offset}px)`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';

        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= maxIndex;
        prevBtn.style.opacity = current === 0 ? '0.4' : '1';
        nextBtn.style.opacity = current >= maxIndex ? '0.4' : '1';
      };

      prevBtn.addEventListener('click', () => {
        if (current > 0) { current--; update(); }
      });

      nextBtn.addEventListener('click', () => {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, cards.length - visible);
        if (current < maxIndex) { current++; update(); }
      });

      // Touch/swipe
      let startX = 0;
      let isDragging = false;

      track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        const isRTL = document.dir === 'rtl';
        if (Math.abs(diff) > 50) {
          if ((diff > 0 && !isRTL) || (diff < 0 && isRTL)) {
            nextBtn.click();
          } else {
            prevBtn.click();
          }
        }
        isDragging = false;
      }, { passive: true });

      update();
      window.addEventListener('resize', () => {
        update();
      });

      // Re-update on dir change
      const dirObserver = new MutationObserver(() => update());
      dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    }
  };

  /* ----------------------------------------
     APPOINTMENT FORM
  ---------------------------------------- */
  const AppointmentForm = {
    init() {
      const form = document.getElementById('appointmentForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const required = form.querySelectorAll('[required]');
        let valid = true;

        required.forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#D94040';
            valid = false;
          } else {
            field.style.borderColor = '';
          }
        });

        if (!valid) return;

        // Show confirmation message
        const msg = document.getElementById('formMessage');
        if (msg) {
          msg.classList.add('form-message--success');
          msg.style.display = 'block';
          msg.innerHTML = `
            <strong>Service request prepared.</strong><br>
            Your appointment request is ready for workshop confirmation. 
            The workshop will review your request and confirm availability. 
            Requested dates and times are subject to workshop schedule.
          `;
          msg.setAttribute('role', 'alert');
          msg.setAttribute('aria-live', 'polite');
        }

        // Reset form
        form.reset();

        // Scroll message into view
        msg?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  };

  /* ----------------------------------------
     BACK TO TOP
  ---------------------------------------- */
  const BackToTop = {
    init() {
      const btn = document.getElementById('backToTop');
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  /* ----------------------------------------
     ACTIVE NAV LINK
  ---------------------------------------- */
  const NavActive = {
    init() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      document.querySelectorAll('.navbar__link, .drawer__link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPage = href.split('/').pop();
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  };

  /* ----------------------------------------
     SERVICE DETAILS - QUERY PARAM ROUTING
  ---------------------------------------- */
  const ServiceDetails = {
    services: {
      'routine-servicing': {
        title: 'Routine Servicing',
        overview: 'A general inspection and maintenance session designed to keep your motorcycle running smoothly between major services. Our technicians methodically work through the key systems of your motorcycle to identify wear, leaks, or developing faults early.',
        checks: [
          'Basic fluid levels inspection',
          'Fastener and bolt torque check',
          'Tyre tread depth and pressure inspection',
          'Front and rear brake inspection',
          'Chain tension and condition assessment',
          'Battery terminal and voltage check',
          'General condition and visual inspection',
          'Lighting and signal function check',
          'Throttle and clutch cable inspection',
          'Coolant level check (where applicable)'
        ],
        signs: [
          'Motorcycle has been ridden for an extended period without inspection',
          'Unusual noises, vibrations, or handling changes',
          'Upcoming long ride or touring trip',
          'Seasonal change requiring a general check'
        ],
        replaced: [
          'Items requiring replacement are identified during inspection and discussed with the owner before any work proceeds.',
          'Common items include spark plugs, air filters, and wear components depending on findings.'
        ],
        notes: 'Routine servicing is not a substitute for manufacturer-specified scheduled maintenance. Consult your owner\'s manual for model-specific service intervals. The scope of this service covers general inspection and is adjusted based on motorcycle type and condition.'
      },
      'oil-filter': {
        title: 'Engine Oil & Filter Change',
        overview: 'Engine oil degrades over time and with use, losing its ability to properly lubricate, cool, and protect engine internals. Regular oil and filter changes are one of the most important maintenance tasks for any motorcycle.',
        checks: [
          'Engine oil drainage and replacement',
          'Oil filter replacement where applicable',
          'Oil leak inspection around gaskets and seals',
          'Oil level verification after fill',
          'Drain plug washer inspection and replacement if needed',
          'Engine start-up and idle oil pressure check'
        ],
        signs: [
          'Oil appears dark, gritty, or has a burnt smell',
          'Engine sounds louder or rougher than usual',
          'Oil level drops between checks',
          'Mileage interval has been reached since last change',
          'Oil warning light illuminated'
        ],
        replaced: [
          'Engine oil (grade and quantity appropriate to your motorcycle)',
          'Oil filter element or cartridge',
          'Drain plug washer if worn'
        ],
        notes: 'Oil grade and specification vary by motorcycle manufacturer and model. The correct oil type will be selected based on your motorcycle\'s requirements. If you have a preferred oil brand or specification, please mention it when booking.'
      },
      'tyre-replacement': {
        title: 'Tyre Replacement',
        overview: 'Tyres are the only contact point between your motorcycle and the road. Worn, damaged, or improperly inflated tyres significantly affect safety, handling, and braking performance. We inspect, assess, and replace tyres as needed.',
        checks: [
          'Tyre tread depth measurement',
          'Sidewall condition and cracking inspection',
          'Wear pattern assessment',
          'Tyre pressure check and adjustment',
          'Valve stem inspection',
          'Wheel rim condition check',
          'Tyre age assessment (manufacture date)'
        ],
        signs: [
          'Tread wear indicators are level with tread surface',
          'Visible cracks, cuts, or bulges on tyre sidewall',
          'Uneven tread wear patterns',
          'Loss of grip in wet or dry conditions',
          'Frequent need to re-inflate',
          'Vibration at normal riding speeds'
        ],
        replaced: [
          'Front and/or rear tyres as required',
          'Valve stems if worn or damaged',
          'Rim tape if necessary during tyre change'
        ],
        notes: 'Tyre availability depends on size, brand, and supplier stock. We will discuss tyre options and pricing before proceeding with replacement. Wheel balancing may be available depending on equipment and tyre type — confirm when booking.'
      },
      'brake-servicing': {
        title: 'Brake Servicing',
        overview: 'Reliable brakes are essential for safe riding. Brake components wear gradually, and regular inspection ensures your stopping power remains consistent. We check pads, discs, drums, fluid, and hydraulic lines as part of brake servicing.',
        checks: [
          'Brake pad or shoe thickness measurement',
          'Disc or drum surface condition inspection',
          'Brake fluid level and condition check',
          'Brake lever and pedal free play adjustment',
          'Hydraulic line inspection for leaks or damage',
          'Caliper condition and piston movement check',
          'Brake response and feel assessment'
        ],
        signs: [
          'Squealing or grinding noise when braking',
          'Reduced braking response or spongy feel',
          'Brake lever or pedal travels further than usual',
          'Visible scoring or grooves on brake disc',
          'Brake fluid appears dark or contaminated',
          'Warning light related to braking system'
        ],
        replaced: [
          'Brake pads or shoes as required',
          'Brake fluid if contaminated or overdue',
          'Brake lines if damaged (quoted separately)'
        ],
        notes: 'Brake component wear varies based on riding style, conditions, and motorcycle type. Replacement parts are sourced based on availability and compatibility. We do not make claims about specific stopping distances or performance figures.'
      },
      'chain-service': {
        title: 'Chain Adjustment & Lubrication',
        overview: 'The chain is a critical drivetrain component on most motorcycles. A poorly maintained chain can lead to power loss, increased wear on sprockets, and even safety risks. Regular cleaning, lubrication, and tension adjustment extend chain and sprocket life.',
        checks: [
          'Chain tension measurement and adjustment',
          'Chain link condition and flexibility check',
          'Chain cleaning and debris removal',
          'Chain lubrication application',
          'Front sprocket inspection',
          'Rear sprocket tooth condition inspection',
          'Chain slider and guard condition check'
        ],
        signs: [
          'Chain appears dry, rusted, or noisy',
          'Visible chain slack beyond specification',
          'Chain makes clicking or snapping sounds',
          'Sprocket teeth appear hooked or worn',
          'Chain does not move smoothly across sprockets',
          'Power delivery feels inconsistent'
        ],
        replaced: [
          'Chain and sprocket sets are typically replaced together if significant wear is found.',
          'Chain slider or guard if cracked or worn.',
          'Chain tension adjusters if damaged.'
        ],
        notes: 'Chain maintenance frequency depends on riding conditions, distance, and weather exposure. Shaft-driven and belt-driven motorcycles do not require chain service — contact us about alternative drivetrain maintenance if applicable.'
      },
      'battery-service': {
        title: 'Battery Testing & Replacement',
        overview: 'A reliable battery is essential for starting your motorcycle and powering its electrical systems. We test battery condition, inspect terminals, and recommend replacement when the battery can no longer hold a sufficient charge.',
        checks: [
          'Battery voltage and load testing',
          'Terminal connection inspection and cleaning',
          'Battery case condition check',
          'Electrolyte level inspection (conventional batteries)',
          'Charging system output check where practical',
          'Battery hold-down and mounting inspection'
        ],
        signs: [
          'Motorcycle cranks slowly or fails to start',
          'Electrical accessories dim or behave erratically',
          'Battery is more than 2–3 years old',
          'Visible corrosion on battery terminals',
          'Battery case shows swelling or leakage',
          'Frequent need for jump-starting'
        ],
        replaced: [
          'Battery unit if testing indicates failure',
          'Battery terminals or connectors if corroded beyond cleaning',
          'Related wiring if damaged'
        ],
        notes: 'Battery replacement availability depends on size and type (conventional, AGM, lithium, etc.). We will confirm compatibility and pricing before proceeding. Charging system issues may require additional diagnostic time.'
      },
      'diagnostics': {
        title: 'Engine & Electrical Diagnostics',
        overview: 'When something doesn\'t feel right or a warning light appears, diagnostic investigation helps identify the underlying cause. We use appropriate tools and systematic inspection methods to trace engine, electrical, and sensor-related faults.',
        checks: [
          'Engine fault code reading where applicable',
          'Electrical circuit testing and continuity checks',
          'Warning light investigation',
          'Starting and cranking system diagnosis',
          'Charging system voltage and output check',
          'Sensor inspection and signal verification',
          'Ignition system assessment',
          'Fuel system basic inspection'
        ],
        signs: [
          'Check engine or warning light illuminated',
          'Engine misfires, stalls, or runs rough',
          'Motorcycle fails to start or cranks without firing',
          'Electrical components not functioning',
          'Battery drains quickly despite replacement',
          'Unusual engine behaviour or performance loss'
        ],
        replaced: [
          'Diagnostic service identifies the fault — replacement parts and repair work are quoted separately based on findings.',
          'Common items include sensors, relays, fuses, spark plugs, and wiring connectors.'
        ],
        notes: 'Diagnostic capability varies by motorcycle make and model. We use general-purpose diagnostic tools suitable for a wide range of motorcycles but do not claim access to every manufacturer\'s proprietary diagnostic system. Complex electronic faults may require specialist referral.'
      }
    },

    init() {
      const container = document.getElementById('serviceDetailContent');
      if (!container) return;

      const params = new URLSearchParams(window.location.search);
      const serviceKey = params.get('service') || 'routine-servicing';
      const service = this.services[serviceKey];

      if (!service) {
        container.innerHTML = '<p>Service not found. Please select a service from the list.</p>';
        return;
      }

      // Update page title
      document.title = `${service.title} — MotoWorkshop`;

      // Update hero title
      const heroTitle = document.querySelector('.page-hero__title');
      if (heroTitle) heroTitle.textContent = service.title;

      const heroDesc = document.querySelector('.page-hero__desc');
      if (heroDesc) heroDesc.textContent = service.overview;

      // Active sidebar link
      document.querySelectorAll('.sidebar-service-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(serviceKey)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Build content
      let html = `
        <h2>What Is Checked</h2>
        <ul>
          ${service.checks.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h2>Typical Signs This Service May Be Needed</h2>
        <ul>
          ${service.signs.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h2>What May Be Replaced or Adjusted</h2>
        <ul>
          ${service.replaced.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h2>Service Notes</h2>
        <p>${service.notes}</p>
      `;

      container.innerHTML = html;
    }
  };

  /* ----------------------------------------
     INITIALIZE
  ---------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    RTLManager.init();
    Drawer.init();
    RevealAnimations.init();
    FAQAccordion.init();
    ReviewsSlider.init();
    AppointmentForm.init();
    BackToTop.init();
    NavActive.init();
    ServiceDetails.init();
  });
})();

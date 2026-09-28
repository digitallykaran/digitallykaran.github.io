/**
 * Executive Techno-Functional Portfolio Script
 * Karan Deepak Arora — NetSuite ERP Administrator & Techno-Functional Consultant
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC EXPERIENCE CALCULATION
  const formattedExp = '5+';

  document.querySelectorAll('.dynamic-exp-val').forEach(el => {
    el.textContent = formattedExp + ' Yrs';
  });
  document.querySelectorAll('.dynamic-exp-text').forEach(el => {
    el.textContent = formattedExp + ' years';
  });

  // 2. ULTRA-SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // 3. NAVBAR SCROLL EFFECT
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. MOBILE SLIDE-OVER DRAWER
  const mobileToggleBtn = document.getElementById('mobile_toggle_btn');
  const drawerCloseBtn = document.getElementById('drawer_close_btn');
  const mobileDrawer = document.getElementById('mobile_drawer');
  const drawerBackdrop = document.getElementById('drawer_backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 5. ACTIVE NAV SECTION OBSERVER
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // 6. CASE STUDY FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. ACCORDION DETAILS TOGGLE
  document.querySelectorAll('.breakdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isExpanded = content.classList.contains('open');

      if (isExpanded) {
        content.classList.remove('open');
        toggle.querySelector('.toggle-arrow').textContent = '▼ View Architecture & Impact Details';
      } else {
        content.classList.add('open');
        toggle.querySelector('.toggle-arrow').textContent = '▲ Close Details';
      }
    });
  });

  // 8. SIMPLIFIED SECURE INQUIRY FORM SUBMISSION & GA4 EVENT TRACKING
  const contactForm = document.getElementById('consultation_form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';

      // Send GA4 Event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'submit_lead_form', {
          event_category: 'Contact',
          event_label: 'Inquiry Form Submission'
        });
      }

      setTimeout(() => {
        submitBtn.innerHTML = '✓ Message Sent!';
        showToast('Thank you! Your message has been sent to Karan Arora. I will reach out promptly.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3500);
      }, 700);
    });
  }

  // 9. GA4 EVENT TRACKING FOR CONNECT BUTTONS
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_whatsapp', {
          event_category: 'Connect',
          event_label: 'WhatsApp Chat CTA'
        });
      }
    });
  });

  document.querySelectorAll('a[href*="linkedin.com"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_linkedin', {
          event_category: 'Connect',
          event_label: 'LinkedIn Profile CTA'
        });
      }
    });
  });
});

// Toast Notification Generator
function showToast(message) {
  let toast = document.getElementById('global_toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global_toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

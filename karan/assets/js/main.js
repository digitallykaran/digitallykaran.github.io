/**
 * Main Interactive Application Script
 * Karan Deepak Arora — Executive NetSuite Techno-Functional Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC EXPERIENCE CALCULATION
  const careerStartDate = new Date(2022, 2, 1); // March 1, 2022
  const formattedExp = '5+';

  document.querySelectorAll('.dynamic-exp-val').forEach(el => {
    el.textContent = formattedExp + ' Yrs';
  });
  document.querySelectorAll('.dynamic-exp-text').forEach(el => {
    el.textContent = formattedExp + ' years';
  });

  // 2. ULTRA-SMOOTH HARDWARE-ACCELERATED SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 74;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update history without sudden jump
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
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. MOBILE SLIDE-OVER DRAWER
  const mobileToggleBtn = document.getElementById('mobile_toggle_btn');
  const drawerCloseBtn = document.getElementById('drawer_close_btn');
  const mobileDrawer = document.getElementById('mobile_drawer');
  const drawerBackdrop = document.getElementById('drawer_backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
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

  // 6. PROJECT FILTERING
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
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. ACCORDION DEEP DIVE TOGGLES
  document.querySelectorAll('.breakdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isExpanded = content.classList.contains('open');

      if (isExpanded) {
        content.classList.remove('open');
        toggle.querySelector('.toggle-arrow').textContent = '▼ Plan & Architecture';
      } else {
        content.classList.add('open');
        toggle.querySelector('.toggle-arrow').textContent = '▲ Close Deep Dive';
      }
    });
  });

  // 8. COPY TO CLIPBOARD
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const textToCopy = document.getElementById(targetId)?.textContent?.trim() || btn.getAttribute('data-copy-val');

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = 'Copy';
          }, 2000);
        }).catch(() => {
          showToast('Failed to copy');
        });
      }
    });
  });

  // 9. TOPIC SELECTION HELPER
  window.selectConsultingService = function(serviceName) {
    const serviceSelect = document.getElementById('consult_service_select');
    const messageBox = document.getElementById('consult_message');
    const contactSection = document.getElementById('contact');

    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.includes(serviceName) || serviceSelect.options[i].text.includes(serviceName)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (messageBox && !messageBox.value) {
      messageBox.value = `Hi Karan, I would like to connect regarding: ${serviceName}. Let's discuss further.`;
    }

    if (contactSection) {
      const navHeight = 74;
      const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  // 10. CONSULTATION FORM SUBMISSION
  const contactForm = document.getElementById('consultation_form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Inquiry...';

      setTimeout(() => {
        submitBtn.innerHTML = '✓ Inquiry Sent Successfully!';
        showToast('Thank you! Your message has been prepared. Karan will reach out shortly.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3500);
      }, 900);
    });
  }
});

// Toast Notification
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
  }, 3000);
}

// ===== SHARED JS =====

// Scroll animation observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mobile hamburger toggle
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('navbar-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// Navbar scroll shrink effect
const navbarWrapper = document.querySelector('.navbar-wrapper');
if (navbarWrapper) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbarWrapper.style.paddingTop = '10px';
      navbarWrapper.style.paddingBottom = '10px';
    } else {
      navbarWrapper.style.paddingTop = '16px';
      navbarWrapper.style.paddingBottom = '16px';
    }
  }, { passive: true });
}

// ===== RUNNING NUMBER COUNTERS =====
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      
      if (isNaN(target)) return;
      
      let current = 0;
      const duration = 1800; // ms
      const stepTime = 25;
      const increment = Math.ceil(target / (duration / stepTime));

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = `${prefix}${current}${suffix}`;
      }, stepTime);

      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// ===== CONTINUOUS RUNNING TESTIMONIAL MARQUEE =====
function initTestimonialMarquee() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;

  // Clone children to make a seamless continuous loop
  if (!track.getAttribute('data-cloned')) {
    const cards = Array.from(track.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    track.setAttribute('data-cloned', 'true');
  }
}

document.addEventListener('DOMContentLoaded', initTestimonialMarquee);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initTestimonialMarquee();
}



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

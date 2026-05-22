/* ========================================================================
   EDISON PEPPLE — Homepage Interactions
   Scroll Reveals, Nav, Mobile Menu
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal (IntersectionObserver) ──────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-image');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Sticky Nav Scroll State ───────────────────────────────────────────
  const nav = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Mobile Menu Toggle ────────────────────────────────────────────────
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // ── Smooth Scroll for Anchor Links ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Image Lazy Reveal on Load ─────────────────────────────────────────
  const projectImages = document.querySelectorAll('.project-block__image img');

  projectImages.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });

});

/* ==========================================================================
   VINI ROCHA ART — main.js
   Header behavior, mobile menu, scroll reveal, parallax
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header hide on scroll down / show on scroll up ---------- */
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;

      if (current > 140 && current > lastScroll) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }

      if (current > 20) {
        header.style.background = 'rgba(10, 10, 10, 0.88)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.72)';
      }

      lastScroll = current;
    }, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    const toggleMenu = () => {
      menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll reveal (fade-in) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .gallery-row');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Subtle parallax on gallery images ---------- */
  const parallaxImgs = document.querySelectorAll('.gallery-row img');

  if (parallaxImgs.length && window.matchMedia('(min-width: 769px)').matches) {
    let ticking = false;

    const updateParallax = () => {
      parallaxImgs.forEach(img => {
        const rect = img.parentElement.parentElement.getBoundingClientRect();
        const speed = 0.12;
        const offset = (rect.top - window.innerHeight / 2) * speed;
        img.style.transform = `scale(1.15) translateY(${offset * -1}px)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-menu nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});

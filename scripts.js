/* ============================================
   ISABELLY MELNISKI — V3 FINAL Scripts
   Performance-optimized, touch-ready
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- DEVICE DETECTION --- */
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const isMobile = isTouch || window.matchMedia('(max-width: 768px)').matches;

  /* --- CUSTOM CURSOR (desktop only) --- */
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');

  if (!isMobile && cursor && trail) {
    let mx = 0, my = 0;
    let tx = 0, ty = 0;
    let isMoving = false;
    let moveTimeout;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;

      // Spotlight CSS vars
      document.documentElement.style.setProperty('--mx', mx + 'px');
      document.documentElement.style.setProperty('--my', my + 'px');

      if (!isMoving) {
        isMoving = true;
        animateTrail();
      }
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => { isMoving = false; }, 200);
    }, { passive: true });

    function animateTrail() {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      trail.style.transform = `translate(${tx - 20}px, ${ty - 20}px)`;
      if (isMoving || Math.abs(mx - tx) > 0.5 || Math.abs(my - ty) > 0.5) {
        requestAnimationFrame(animateTrail);
      }
    }

    // Hover states
    const hoverTargets = document.querySelectorAll('a, button, .galeria__item, .sponsors__slot');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor--hover');
        trail.classList.add('cursor-trail--hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--hover');
        trail.classList.remove('cursor-trail--hover');
      });
    });
  }

  /* --- RPM LOADER --- */
  const loader = document.getElementById('loader');
  const loaderValue = document.querySelector('.loader__value');
  if (loader && loaderValue) {
    let rpm = 0;
    const target = 9;
    const duration = 1500;
    const steps = 30;
    const interval = duration / steps;

    const counter = setInterval(() => {
      rpm++;
      loaderValue.textContent = Math.round((rpm / steps) * target);
      if (rpm >= steps) {
        clearInterval(counter);
        loaderValue.textContent = target;
        setTimeout(() => loader.classList.add('hidden'), 300);
      }
    }, interval);

    setTimeout(() => loader.classList.add('hidden'), 2500);
  }

  /* --- NAV TOGGLE (mobile) --- */
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const nav = document.getElementById('nav');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
    // Close on overlay click
    navLinks.addEventListener('click', (e) => {
      if (e.target === navLinks) {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  /* --- CONSOLIDATED SCROLL HANDLER --- */
  const spotlight = document.getElementById('spotlight');
  const heroZoom = document.getElementById('heroZoom');
  let lastScroll = 0;
  let heroRafPending = false;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;

    // Nav hide/show
    if (nav) {
      if (curr > lastScroll && curr > 200) {
        nav.classList.add('nav--hidden');
      } else {
        nav.classList.remove('nav--hidden');
      }
    }

    // Spotlight
    if (spotlight && !isMobile) {
      spotlight.classList.toggle('spotlight--active', curr > 100);
    }

    // Hero zoom (rAF coalesced)
    if (heroZoom && !isMobile && !heroRafPending) {
      heroRafPending = true;
      requestAnimationFrame(() => {
        if (curr < window.innerHeight) {
          const progress = curr / window.innerHeight;
          const scale = 1 + progress * 0.15;
          const opacity = 1 - progress * 0.7;
          const blur = progress * 4;
          heroZoom.style.transform = `scale(${scale})`;
          heroZoom.style.opacity = opacity;
          heroZoom.style.filter = `blur(${blur}px)`;
        }
        heroRafPending = false;
      });
    }

    lastScroll = curr;
  }, { passive: true });

  /* --- GLITCH EFFECT ON NAME --- */
  const glitchName = document.getElementById('glitchName');
  if (glitchName) {
    let glitchInterval;

    function triggerGlitch() {
      glitchName.classList.add('glitch');
      setTimeout(() => glitchName.classList.remove('glitch'), 450);
    }

    // Only run glitch when hero is visible
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        glitchInterval = setInterval(() => {
          if (Math.random() > 0.6) triggerGlitch();
        }, 3000);
      } else {
        clearInterval(glitchInterval);
      }
    }, { threshold: 0 });
    heroObserver.observe(glitchName);

    // Initial glitch
    setTimeout(triggerGlitch, 1800);

    // Glitch on hover
    glitchName.addEventListener('mouseenter', triggerGlitch);
  }

  /* --- SPEED LINES PARALLAX (desktop) --- */
  if (!isMobile) {
    const heroSpeedLines = document.querySelector('.hero__speed-lines');
    if (heroSpeedLines) {
      document.addEventListener('mousemove', (e) => {
        const rx = (e.clientX / window.innerWidth - 0.5) * 20;
        const ry = (e.clientY / window.innerHeight - 0.5) * 10;
        heroSpeedLines.style.transform = `translate(${rx}px, ${ry}px)`;
      }, { passive: true });
    }
  }

  /* --- COUNTER ANIMATION (TELEMETRY) --- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();

        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* --- SCROLL REVEAL --- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  /* --- CARREIRA CARDS STAGGERED REVEAL --- */
  const cards = document.querySelectorAll('.carreira__card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 120);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => cardObserver.observe(c));

  /* --- HORIZONTAL SCROLL (wheel → horizontal) desktop --- */
  const carreiraTrack = document.querySelector('.carreira__track');
  if (carreiraTrack && !isTouch) {
    carreiraTrack.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const maxScroll = carreiraTrack.scrollWidth - carreiraTrack.clientWidth;
      const atStart = carreiraTrack.scrollLeft <= 0;
      const atEnd = carreiraTrack.scrollLeft >= maxScroll - 1;

      // Let page scroll normally if we're at the edges
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      carreiraTrack.scrollLeft += e.deltaY * 0.8;
    }, { passive: false });
  }

  /* --- DRAG SCROLL (mouse) --- */
  if (carreiraTrack && !isTouch) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carreiraTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carreiraTrack.offsetLeft;
      scrollLeft = carreiraTrack.scrollLeft;
    });
    carreiraTrack.addEventListener('mouseleave', () => { isDown = false; });
    carreiraTrack.addEventListener('mouseup', () => { isDown = false; });
    carreiraTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carreiraTrack.offsetLeft;
      const walk = (x - startX) * 2;
      carreiraTrack.scrollLeft = scrollLeft - walk;
    });
  }

  /* --- TOUCH DRAG (mobile) --- */
  if (carreiraTrack && isTouch) {
    let touchStartX;
    let touchScrollLeft;

    carreiraTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX - carreiraTrack.offsetLeft;
      touchScrollLeft = carreiraTrack.scrollLeft;
    }, { passive: true });

    carreiraTrack.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - carreiraTrack.offsetLeft;
      const walk = (x - touchStartX) * 1.5;
      carreiraTrack.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });
  }

});

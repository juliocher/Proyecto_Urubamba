/* =============================
   HUILLOA VERDE – main.js
   ============================= */

/* ---------- NAVBAR SCROLL ---------- */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Inner pages always have scrolled style
  if (navbar.classList.contains('scrolled') && !document.querySelector('.hero')) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- MOBILE MENU ---------- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on backdrop click
  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) closeMobile();
  });
})();

function closeMobile() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- SCROLL ANIMATIONS ---------- */
(function () {
  const targets = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---------- ANIMATED COUNTERS ---------- */
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const stepTime = 16;
    const steps = Math.ceil(duration / stepTime);
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = Math.round(target * progress);
      el.textContent = current;
      if (step >= steps) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
})();

/* ---------- CONTACT FORM ---------- */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const toast = document.getElementById('toast');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const interes = form.interes.value;
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !interes || !mensaje) {
      showToast('⚠️ Por favor completa todos los campos obligatorios.', '#8b5e3c');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('⚠️ Ingresa un correo electrónico válido.', '#8b5e3c');
      return;
    }

    // Simulate sending
    submitBtn.disabled = true;
    btnText.textContent = '⏳ Enviando...';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      btnText.textContent = '📩 Enviar mensaje';
      showToast('✅ ¡Mensaje enviado! Te contactaremos pronto.', '#2d5a27');
    }, 1600);
  });

  function showToast(msg, bg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.background = bg || '#2d5a27';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
})();

/* ---------- SMOOTH ACTIVE NAV ---------- */
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
})();

/* ---------- DETAILS / FAQ TOGGLE ICON ---------- */
(function () {
  document.querySelectorAll('details').forEach((detail) => {
    const summary = detail.querySelector('summary');
    const icon = summary ? summary.querySelector('span:last-child') : null;
    if (!icon) return;

    detail.addEventListener('toggle', () => {
      icon.textContent = detail.open ? '−' : '+';
    });
  });
})();

/* ---------- PARALLAX HERO ---------- */
(function () {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
  }, { passive: true });
})();

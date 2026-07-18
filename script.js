// ---------- mobile nav ----------
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// ---------- faq accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-item__q');
  q.addEventListener('click', () => {
    const wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach(i => i.classList.remove('is-open'));
    if (!wasOpen) item.classList.add('is-open');
  });
});

// ---------- count-up stats ----------
const counters = document.querySelectorAll('.stat__num');
const runCounter = el => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  const tick = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(runCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ---------- scroll reveal ----------
const revealTargets = document.querySelectorAll('.key-card, .service, .testi-slip, .faq-item, .receipt');
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// ---------- contact form (demo only, no backend) ----------
const form = document.getElementById('contactForm');
const note = document.getElementById('contactNote');
form?.addEventListener('submit', e => {
  e.preventDefault();
  note.textContent = 'Request inserted — this is a design concept, no message was actually sent.';
  note.style.color = '#3F7D5C';
  form.reset();
});

// ---------- nav shadow on scroll ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 8 ? '0 4px 0 rgba(28,24,17,.08)' : 'none';
});

// ============================================================
// ALEXA International Academy — Interactions
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Loader ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 300);
});

/* ---------- Nav shrink on scroll ---------- */
const nav = document.getElementById('nav');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  navToggle.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ---------- Cursor glow (desktop only) ---------- */
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    glow.classList.add('active');
  });
  document.addEventListener('mouseleave', () => glow.classList.remove('active'));
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-line');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
revealEls.forEach(el => io.observe(el));

/* ---------- Magnetic buttons ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- Tilt on program cards ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ---------- ALEXA Method ring — active node on cycle ---------- */
const ringLabel = document.getElementById('ringLabel');
const ringNodes = document.querySelectorAll('.ring-node');
const stages = ['Learn', 'Practice', 'Test', 'Analyze', 'Improve'];
let stageIndex = 0;
function setActiveStage(i) {
  ringNodes.forEach(n => n.classList.remove('active'));
  const active = document.querySelector(`.ring-node[data-node="${i}"]`);
  if (active) active.classList.add('active');
  if (ringLabel) ringLabel.textContent = stages[i];
}
setActiveStage(0);
ringNodes.forEach(node => {
  node.addEventListener('mouseenter', () => setActiveStage(Number(node.dataset.node)));
  node.addEventListener('click', () => setActiveStage(Number(node.dataset.node)));
});
setInterval(() => {
  stageIndex = (stageIndex + 1) % stages.length;
  setActiveStage(stageIndex);
}, 2600);

/* ---------- Count-up numbers ---------- */
const counters = document.querySelectorAll('.count');
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let current = 0;
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => countIO.observe(el));

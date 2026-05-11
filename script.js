/* ═══════════════════════════════════════════
   PAGE NAVIGATION
═══════════════════════════════════════════ */
const pages = {
  home:         document.getElementById('pageHome'),
  unternehmen:  document.getElementById('pageUnternehmen'),
  leistungen:   document.getElementById('pageLeistungen'),
  referenzen:   document.getElementById('pageReferenzen'),
  jobs:         document.getElementById('pageJobs'),
  kontakt:      document.getElementById('pageKontakt'),
};

function showPage(pageId, tabId) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  const page = pages[pageId];
  if (!page) return;
  page.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  if (tabId) {
    setTimeout(() => activateTab(page, tabId), 100);
  }

  closeMenu();
}

/* ═══════════════════════════════════════════
   TAB SYSTEM
═══════════════════════════════════════════ */
function activateTab(pageEl, tabId) {
  const tabBtns = pageEl.querySelectorAll('.tab-btn');
  const tabContents = pageEl.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  tabContents.forEach(tc => {
    tc.classList.toggle('active', tc.id === 'tab-' + tabId);
  });

  const tabNav = pageEl.querySelector('.tab-nav');
  if (tabNav) tabNav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.closest('.page');
    activateTab(page, btn.dataset.tab);
  });
});

/* ═══════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════
   STICKY HEADER
═══════════════════════════════════════════ */
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ═══════════════════════════════════════════
   COOKIE BANNER
═══════════════════════════════════════════ */
const cookieBanner    = document.getElementById('cookieBanner');
const cookieAccept    = document.getElementById('cookieAccept');
const cookieNecessary = document.getElementById('cookieNecessary');

function setCookieConsent(type) {
  localStorage.setItem('cookieConsent', type);
  localStorage.setItem('cookieConsentDate', new Date().toISOString());
  cookieBanner.classList.add('hidden');
}

cookieAccept.addEventListener('click',    () => setCookieConsent('all'));
cookieNecessary.addEventListener('click', () => setCookieConsent('necessary'));

if (!localStorage.getItem('cookieConsent')) {
  cookieBanner.classList.remove('hidden');
} else {
  cookieBanner.classList.add('hidden');
}

/* ═══════════════════════════════════════════
   PRIVACY MODAL
═══════════════════════════════════════════ */
const privacyModal = document.getElementById('privacyModal');

function openPrivacy() {
  privacyModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePrivacy() {
  privacyModal.classList.remove('open');
  document.body.style.overflow = '';
}

privacyModal.addEventListener('click', e => {
  if (e.target === privacyModal) closePrivacy();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePrivacy();
});

/* ═══════════════════════════════════════════
   PRIVACY CONSENT FOR CONTACT FORM
═══════════════════════════════════════════ */
const privacyConsentBox = document.getElementById('privacyConsent');
const contactForm       = document.getElementById('contactForm');

function acceptPrivacy() {
  privacyConsentBox.classList.add('hidden');
  contactForm.classList.remove('hidden');
  localStorage.setItem('formPrivacyAccepted', 'true');
}

if (localStorage.getItem('formPrivacyAccepted') === 'true') {
  privacyConsentBox.classList.add('hidden');
  contactForm.classList.remove('hidden');
}

/* ═══════════════════════════════════════════
   CONTACT FORM SUBMIT
═══════════════════════════════════════════ */
const formSuccess = document.getElementById('formSuccess');

function submitForm(e) {
  e.preventDefault();
  contactForm.classList.add('hidden');
  formSuccess.classList.remove('hidden');
}

/* ═══════════════════════════════════════════
   COUNTER ANIMATION (stats)
═══════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('de-DE');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const statsBar = document.querySelector('.stats-bar');
let countersStarted = false;

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  });
}, { threshold: 0.3 });

if (statsBar) statsObserver.observe(statsBar);

/* ═══════════════════════════════════════════
   REFERENZEN FILTER
═══════════════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.ref-card').forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });
  });
});

/* ═══════════════════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════════════════ */
const animEls = document.querySelectorAll(
  '.service-card, .value-card, .team-card, .cert-card, .ref-card, .job-card, .testimonial, .benefit'
);

const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.08}s, transform 0.5s ease ${(i % 4) * 0.08}s`;
  animObserver.observe(el);
});

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
showPage('home');

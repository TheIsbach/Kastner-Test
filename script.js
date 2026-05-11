/* ═══════════════════════════════════════════
   CONSENT GATE – Cookie + Datenschutz Banner
   Erscheint beim Erstbesuch und nach Widerruf.
   Einwilligung wird in localStorage gespeichert.
═══════════════════════════════════════════ */
const consentGate         = document.getElementById('consentGate');
const consentAcceptBtn    = document.getElementById('consentAccept');
const consentNecessaryBtn = document.getElementById('consentNecessary');

function showConsentGate() {
  consentGate.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function dismissConsentGate(type) {
  localStorage.setItem('cookieConsent', type);
  localStorage.setItem('cookieConsentDate', new Date().toISOString());
  consentGate.classList.add('hidden');
  document.body.style.overflow = '';
}

/* Einwilligung widerrufen und Gate erneut zeigen (Footer-Link) */
function reopenConsentGate() {
  localStorage.removeItem('cookieConsent');
  localStorage.removeItem('cookieConsentDate');
  showConsentGate();
}

/* Beim Laden: zeigen falls noch keine Einwilligung */
if (!localStorage.getItem('cookieConsent')) {
  showConsentGate();
} else {
  consentGate.classList.add('hidden');
}

consentAcceptBtn.addEventListener('click',    () => dismissConsentGate('all'));
consentNecessaryBtn.addEventListener('click', () => dismissConsentGate('necessary'));

/* Datenschutz aus dem Consent-Gate öffnen */
function openPrivacyFromGate() { openPrivacy(); }

/* ═══════════════════════════════════════════
   COOKIE BANNER (Footer-Widerruf)
═══════════════════════════════════════════ */
const cookieBanner    = document.getElementById('cookieBanner');
const cookieAccept    = document.getElementById('cookieAccept');
const cookieNecessary = document.getElementById('cookieNecessary');

cookieBanner.classList.add('hidden');

cookieAccept.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'all');
  cookieBanner.classList.add('hidden');
});
cookieNecessary.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'necessary');
  cookieBanner.classList.add('hidden');
});

/* ═══════════════════════════════════════════
   PAGE NAVIGATION
═══════════════════════════════════════════ */
const pages = {
  home:        document.getElementById('pageHome'),
  unternehmen: document.getElementById('pageUnternehmen'),
  leistungen:  document.getElementById('pageLeistungen'),
  referenzen:  document.getElementById('pageReferenzen'),
  jobs:        document.getElementById('pageJobs'),
  kontakt:     document.getElementById('pageKontakt'),
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

  if (tabId) setTimeout(() => activateTab(page, tabId), 80);
  closeMenu();
}

/* ═══════════════════════════════════════════
   TAB SYSTEM
═══════════════════════════════════════════ */
function activateTab(pageEl, tabId) {
  pageEl.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  pageEl.querySelectorAll('.tab-content').forEach(tc => {
    tc.classList.toggle('active', tc.id === 'tab-' + tabId);
  });
  const tabNav = pageEl.querySelector('.tab-nav');
  if (tabNav) tabNav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activateTab(btn.closest('.page'), btn.dataset.tab);
  });
});

/* ═══════════════════════════════════════════
   DROPDOWN – JS hover with delay (fixes gap issue)
═══════════════════════════════════════════ */
const dropdownTimers = new Map();

document.querySelectorAll('.has-dropdown').forEach(el => {
  el.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimers.get(el));
    document.querySelectorAll('.has-dropdown').forEach(other => {
      if (other !== el) other.classList.remove('dropdown-open');
    });
    el.classList.add('dropdown-open');
  });
  el.addEventListener('mouseleave', () => {
    dropdownTimers.set(el, setTimeout(() => el.classList.remove('dropdown-open'), 160));
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('dropdown-open'));
  }
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
window.addEventListener('scroll', () => {
  document.getElementById('mainHeader').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ═══════════════════════════════════════════
   IMPRESSUM MODAL
═══════════════════════════════════════════ */
const impressumModal = document.getElementById('impressumModal');

function openImpressum() {
  impressumModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeImpressum() {
  impressumModal.classList.remove('open');
  document.body.style.overflow = '';
}

impressumModal.addEventListener('click', e => {
  if (e.target === impressumModal) closeImpressum();
});

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
  if (e.key === 'Escape') {
    closePrivacy();
    closeImpressum();
  }
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
   COUNTER ANIMATION (stats bar)
═══════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start    = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('de-DE');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

let countersStarted = false;
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  }, { threshold: 0.3 }).observe(statsBar);
}

/* ═══════════════════════════════════════════
   REFERENZEN FILTER
═══════════════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.ref-card').forEach(card => {
      card.classList.toggle('filtered-out', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});

/* ═══════════════════════════════════════════
   SCROLL ANIMATIONS (fade-in cards)
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
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

animEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.07}s, transform 0.5s ease ${(i % 4) * 0.07}s`;
  animObserver.observe(el);
});

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
showPage('home');

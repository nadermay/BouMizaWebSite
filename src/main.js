import gsap from 'gsap';
import { brands } from './data.js';
import { registerRoute, initRouter } from './router.js';
import { renderHome } from './pages/home.js';
import { renderEnseignes } from './pages/enseignes.js';
import { renderServices } from './pages/services.js';
import { renderEvents } from './pages/events.js';
import { renderGalerie } from './pages/galerie.js';
import { renderPlan } from './pages/plan.js';
import { renderContact } from './pages/contact.js';
import { renderBrandDetail } from './pages/brand-detail.js';
import { GLSLHills } from './glsl-hills.js';

// --- State ---
let currentLang = 'fr';
const translations = {};
let currentTheme = localStorage.getItem('theme') || 'light';

// --- PWA Service Worker ---
function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('SW registered:', reg);
      }).catch(err => {
        console.log('SW error:', err);
      });
    });
  }
}

// --- Theme ---
function initTheme() {
  document.documentElement.dataset.theme = currentTheme;
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = currentTheme;
      localStorage.setItem('theme', currentTheme);
      
      // Update Hills if active
      if (window.activeHills) {
        window.activeHills.updateThemeColor();
      }
    });
  }
}

// --- Global UI Listeners ---
function initSpotlightCards() {
  const cards = document.querySelectorAll('.service-card, .service-detail-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// --- i18n ---
async function loadTranslations(lang) {
  if (translations[lang]) return translations[lang];
  const response = await fetch(`/i18n/${lang}.json`);
  translations[lang] = await response.json();
  return translations[lang];
}

/** Deep key lookup: t('hero.title') */
function t(key) {
  const langData = translations[currentLang];
  if (!langData) return key;
  const keys = key.split('.');
  let val = langData;
  for (const k of keys) {
    val = val?.[k];
    if (val === undefined) return key;
  }
  return val;
}

// --- Open/Closed ---
function isBrandOpen(hours) {
  const now = new Date();
  const day = now.getDay();
  const isWeekend = day === 0 || day >= 5;
  const hourRange = isWeekend && hours.fri_sun ? hours.fri_sun : hours.mon_thu || hours.mon_sun;
  if (!hourRange) return false;

  const [start, end] = hourRange.split(' → ');
  const [sH, sM] = start.split(':').map(Number);
  const [eH, eM] = end.split(':').map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const s = sH * 60 + sM;
  let e = eH * 60 + eM;
  if (e <= s) e += 24 * 60;
  return cur >= s && cur < e;
}

// --- Shared context for pages ---
function getPageContext() {
  return { currentLang, t, isBrandOpen };
}

// --- Nav active state ---
function updateNavActive() {
  const hash = window.location.hash.slice(1) || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('nav-active', href === '#' + hash);
  });
}

// --- Language ---
async function switchLanguage(lang) {
  currentLang = lang;
  await loadTranslations(lang);

  // RTL
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
  }

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `lang-${lang}`);
  });

  // Update static nav links
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.getAttribute('data-i18n'));
    if (val && val !== el.getAttribute('data-i18n')) {
      el.textContent = val;
    }
  });

  // Re-render current page
  const hash = window.location.hash.slice(1) || '/';
  const container = document.getElementById('page-content');
  if (container) {
    const routes = { '/': renderHome, '/enseignes': renderEnseignes, '/services': renderServices, '/contact': renderContact, '/evenements': renderEvents };
    const renderFn = routes[hash] || routes['/'];
    container.innerHTML = '';
    renderFn(container, getPageContext());
    initHeroIfNeeded();
    animatePageHero();
    initScrollRevealForPage();
    initSpotlightCards();
  }
}

// --- Page Hero Animation (for Enseignes/Services/Contact) ---
function animatePageHero() {
  const pageHeroStaggers = document.querySelectorAll('.page-hero .stagger');
  if (pageHeroStaggers.length) {
    gsap.fromTo(pageHeroStaggers,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    );
  }
}

// --- Hero canvas (only on home) ---
function initHeroIfNeeded() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  // Prevent double-init
  if (heroSection.dataset.init) return;
  heroSection.dataset.init = 'true';

  // Remove the old fallback canvas if present
  const oldCanvas = document.getElementById('webgl-bg');
  if (oldCanvas) oldCanvas.remove();

  // Initialize GLSLHills
  window.activeHills = new GLSLHills(heroSection);

  // Hero GSAP entrance
  gsap.fromTo('.hero-content .stagger',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
  );
  gsap.fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.5 });
}

// --- Scroll reveal per page ---
function initScrollRevealForPage() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
}

// --- Scroll-to-Top ---
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 600));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Mobile Menu ---
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navRight = document.querySelector('.nav-right');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const opening = !navLinks.classList.contains('open');
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = opening ? 'hidden' : '';

    if (opening && navRight) {
      // Move controls into the drawer
      navRight.classList.add('in-drawer');
      navLinks.appendChild(navRight);
    } else if (!opening && navRight) {
      // Move controls back to navbar
      navRight.classList.remove('in-drawer');
      toggle.parentElement.insertBefore(navRight, toggle);
    }
  });

  // Close drawer when a link is clicked
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      if (navRight) {
        navRight.classList.remove('in-drawer');
        toggle.parentElement.insertBefore(navRight, toggle);
      }
    }
  });
}

// --- Floating Social Bubble ---
function initSocialBubble() {
  const btn = document.getElementById('social-bubble-btn');
  const menu = document.getElementById('social-bubble-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove('active');
      menu.classList.remove('open');
    }
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', async () => {
  await loadTranslations('fr');

  // Register routes
  registerRoute('/', (c) => { renderHome(c, getPageContext()); setTimeout(initHeroIfNeeded, 50); });
  registerRoute('/enseignes', (c) => { renderEnseignes(c, getPageContext()); setTimeout(animatePageHero, 50); });
  registerRoute('/services', (c) => { renderServices(c, getPageContext()); setTimeout(animatePageHero, 50); });
  registerRoute('/evenements', (c) => { renderEvents(c, getPageContext()); setTimeout(animatePageHero, 50); });
  registerRoute('/galerie', (c) => { renderGalerie(c, getPageContext()); setTimeout(animatePageHero, 50); });
  registerRoute('/plan', (c) => { renderPlan(c, getPageContext()); setTimeout(animatePageHero, 50); });
  registerRoute('/contact', (c) => { renderContact(c, getPageContext()); setTimeout(animatePageHero, 50); });
  registerRoute('/enseigne/:id', (c, params) => { renderBrandDetail(c, params, getPageContext()); setTimeout(animatePageHero, 50); });

  // Start router
  initRouter('#page-content');

  // Language buttons
  document.getElementById('lang-fr').addEventListener('click', () => switchLanguage('fr'));
  document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));
  document.getElementById('lang-ar').addEventListener('click', () => switchLanguage('ar'));

  // Global features
  initTheme();
  initPWA();
  initScrollTop();
  initMobileMenu();
  initSocialBubble();

  // Re-init scroll reveal on route change
  window.addEventListener('routechange', () => {
    if (window.activeHills) {
      window.activeHills.destroy();
      window.activeHills = null;
    }
    updateNavActive();
    initScrollRevealForPage();
    initSpotlightCards();
  });

  updateNavActive();
  window.addEventListener('hashchange', updateNavActive);
});

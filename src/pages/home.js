import { brands, services, promotions } from '../data.js';

/**
 * Home Page — Hero + Marquee + Brand Preview + Services Preview + Modal
 */
export function renderHome(container, { currentLang, t, isBrandOpen }) {
  // Select logos for marquee (filter out ones that might not have a clean logo, or just use all)
  const marqueeLogos = brands.filter(b => b.logo).map(b => `<img src="${b.logo}" alt="${b.name}" class="marquee-logo" loading="lazy">`).join('');

  container.innerHTML = `
    <!-- Hero -->
    <section id="hero" class="hero-section">
      <canvas id="webgl-bg"></canvas>
      <div class="hero-content">
        <h1 data-i18n="hero.title" class="stagger">${t('hero.title')}</h1>
        <p data-i18n="hero.subtitle" class="stagger">${t('hero.subtitle')}</p>
        <div class="hero-actions stagger">
          <a href="#/enseignes" class="btn btn-primary">${t('hero.cta')}</a>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>${t('hero.scroll')}</span>
        <div class="arrow"></div>
      </div>
    </section>

    <!-- Logo Marquee -->
    <section class="marquee-section reveal">
      <div class="marquee-container">
        <div class="marquee-track">${marqueeLogos}</div>
        <div class="marquee-track">${marqueeLogos}</div> <!-- Duplicate for infinite effect -->
      </div>
    </section>

    <!-- Brand Preview -->
    <section id="brands-preview" class="section-padding">
      <div class="container">
        <h2 class="section-title reveal">${t('brands.title')}</h2>
        <div class="bento-grid reveal-stagger reveal">
          ${brands.slice(0, 6).map(brand => `
            <a href="#/enseigne/${brand.id}" class="bento-item ${brand.type || ''}" data-id="${brand.id}" role="button" tabindex="0">
              <div class="bento-bg" style="background-image: url('${brand.photo}')"></div>
              <div class="bento-overlay"></div>
              <div class="bento-content">
                <img src="${brand.logo}" alt="${brand.name}" class="brand-logo-mini" loading="lazy">
                <h3 class="brand-name">${brand.name}</h3>
                <p class="brand-status" data-brand-id="${brand.id}">—</p>
              </div>
              <div class="bento-hover-details" style="pointer-events: none;">
                <p>${t('enseignes.openNow')}</p>
              </div>
            </a>
          `).join('')}
        </div>
        <div class="center-action reveal">
          <a href="#/enseignes" class="btn btn-outline">${t('home.viewAll')}</a>
        </div>
      </div>
    </section>

    <!-- Promotions Section -->
    <section id="promotions-section" class="section-padding promotions-section">
      <div class="container">
        <h2 class="section-title reveal">${currentLang === 'ar' ? 'عروض حصرية' : currentLang === 'en' ? 'Exclusive Offers' : 'Offres Exclusives'}</h2>
        <p class="section-subtitle reveal">${currentLang === 'ar' ? 'اكتشف أفضل الصفقات من العلامات التجارية المفضلة لديك' : currentLang === 'en' ? 'Discover the best deals from your favorite brands' : 'Découvrez les meilleurs deals de vos enseignes préférées'}</p>
        
        <div class="promo-grid reveal-stagger reveal">
          ${promotions.map(promo => `
            <div class="promo-card" style="--accent-color: ${promo.color}">
              <div class="promo-image">
                <img src="${promo.image}" alt="${promo.title[currentLang]}" loading="lazy">
                <div class="promo-badge">${currentLang === 'ar' ? 'عرض' : 'Promo'}</div>
              </div>
              <div class="promo-content">
                <h3 class="promo-title">${promo.title[currentLang]}</h3>
                <p class="promo-subtitle">${promo.subtitle[currentLang]}</p>
                <div class="promo-footer">
                  <span class="promo-brand">@${brands.find(b => b.id === promo.brandId)?.name || ''}</span>
                  <a href="#/enseignes" class="btn btn-outline btn-sm">${currentLang === 'ar' ? 'اكتشف' : 'Découvrir'}</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Services Preview — Interactive Showcase -->
    <section id="services-preview" class="section-padding">
      <div class="container">
        <h2 class="section-title reveal">${t('services.title')}</h2>
        <div class="services-showcase reveal">
          <!-- Service Selector Tabs -->
          <div class="services-tabs" id="services-tabs">
            ${services.slice(0, 6).map((s, i) => `
              <button class="services-tab ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="${t('services.' + s.id)}">
                <span class="services-tab__icon">${s.icon}</span>
                <span class="services-tab__label">${t('services.' + s.id)}</span>
              </button>
            `).join('')}
          </div>

          <!-- Featured Service Display -->
          <div class="services-featured" id="services-featured">
            <div class="services-featured__icon-ring">
              <div class="services-featured__icon" id="sf-icon">${services[0].icon}</div>
            </div>
            <div class="services-featured__info">
              <h3 class="services-featured__title" id="sf-title">${t('services.' + services[0].id)}</h3>
              <p class="services-featured__desc" id="sf-desc"></p>
            </div>
          </div>

          <div class="center-action" style="margin-top: 40px;">
            <a href="#/services" class="btn btn-outline">${t('home.viewServices')}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Boumiza en Chiffres — Animated Stats -->
    <section id="stats-section" class="section-padding">
      <div class="container">
        <h2 class="section-title reveal">${t('home.statsTitle')}</h2>
        <div class="stats-grid reveal">
          <div class="stat-card">
            <div class="stat-number" data-target="10">0</div>
            <div class="stat-suffix">+</div>
            <p class="stat-label">${t('home.statBrands')}</p>
          </div>
          <div class="stat-card">
            <div class="stat-number" data-target="7">0</div>
            <div class="stat-suffix">j/7</div>
            <p class="stat-label">${t('home.statOpen')}</p>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <p class="stat-label">${t('home.statParking')}</p>
          </div>
          <div class="stat-card">
            <div class="stat-number" data-target="4.6">0</div>
            <div class="stat-suffix">★</div>
            <p class="stat-label">${t('home.statRating')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Reviews / Testimonials -->
    <section id="reviews-section" class="section-padding">
      <div class="container">
        <h2 class="section-title reveal">${t('home.reviewsTitle')}</h2>
        <p class="section-subtitle reveal">${t('home.reviewsSubtitle')}</p>
        <div class="reviews-track-wrapper reveal">
          <div class="reviews-track" id="reviews-track">
            <!-- Cards injected by JS -->
          </div>
        </div>
        <div class="reviews-nav">
          <button class="reviews-nav-btn" id="rev-prev" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="reviews-dots" id="reviews-dots"></div>
          <button class="reviews-nav-btn" id="rev-next" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  `;

  // Attach modal logic
  const modal = document.getElementById('brand-modal');
  const closeBtn = modal.querySelector('.modal-close');
  
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (!modal.dataset.listener) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(); // click outside
    });
    modal.dataset.listener = 'true';
  }

  container.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('click', () => {
      const brandId = item.getAttribute('data-id');
      const brand = brands.find(b => b.id === brandId);
      if (!brand) return;

      // Populate Modal
      document.getElementById('modal-img').src = brand.photo;
      document.getElementById('modal-logo').src = brand.logo;
      document.getElementById('modal-name').textContent = brand.name;
      
      const phoneEl = document.getElementById('modal-phone');
      if (brand.phone) {
        phoneEl.textContent = brand.phone;
        phoneEl.href = "tel:" + brand.phone;
      } else {
        phoneEl.textContent = "—";
        phoneEl.removeAttribute("href");
      }

      // Hours logic
      const weekWrap = document.getElementById('modal-hours-week').parentElement;
      const weekendWrap = document.getElementById('modal-hours-weekend').parentElement;
      const everydayWrap = document.getElementById('modal-hours-everyday-wrap');
      
      if (brand.hours.mon_thu) {
        weekWrap.style.display = '';
        weekendWrap.style.display = '';
        everydayWrap.style.display = 'none';
        document.getElementById('modal-hours-week').textContent = brand.hours.mon_thu;
        document.getElementById('modal-hours-weekend').textContent = brand.hours.fri_sun || brand.hours.mon_thu;
      } else {
        weekWrap.style.display = 'none';
        weekendWrap.style.display = 'none';
        everydayWrap.style.display = '';
        document.getElementById('modal-hours-everyday').textContent = brand.hours.mon_sun;
      }

      // Status
      const isOpen = isBrandOpen(brand.hours);
      const statusEl = document.getElementById('modal-status');
      statusEl.textContent = isOpen 
        ? (currentLang === 'ar' ? 'مفتوح الآن' : currentLang === 'en' ? 'Open Now' : 'Ouvert')
        : (currentLang === 'ar' ? 'مغلق' : currentLang === 'en' ? 'Closed' : 'Fermé');
      
      statusEl.className = 'modal-brand-status ' + (isOpen ? 'badge--open' : 'badge--closed');

      // Socials
      const fbSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>`;
      const igSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
      const tkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`;
      const waSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
      
      const socialsContainer = document.getElementById('modal-socials');
      socialsContainer.innerHTML = '';
      socialsContainer.innerHTML += `<a href="https://wa.me/21651648574?text=Bonjour%20Boumiza%20Square%2C%20j%27aimerais%20avoir%20plus%20d%27informations." target="_blank" class="social-pill" style="color: #25D366; border-color: #25D366">${waSvg} WhatsApp</a>`;
      if (brand.social?.facebook) socialsContainer.innerHTML += `<a href="https://facebook.com/${brand.social.facebook}" target="_blank" class="social-pill">${fbSvg} Facebook</a>`;
      if (brand.social?.instagram) socialsContainer.innerHTML += `<a href="https://instagram.com/${brand.social.instagram}" target="_blank" class="social-pill">${igSvg} Instagram</a>`;
      if (brand.social?.tiktok) socialsContainer.innerHTML += `<a href="https://tiktok.com/${brand.social.tiktok}" target="_blank" class="social-pill">${tkSvg} TikTok</a>`;
      
      // Open
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // --- Services Showcase Interactivity ---
  const serviceDescs = {
    wifi: { fr: "Restez connecté tout au long de votre visite.", en: "Stay connected throughout your visit.", ar: "ابقَ متصلاً طوال زيارتك." },
    brands: { fr: "Cafés, restaurants, pâtisserie premium et bien plus.", en: "Cafés, restaurants, premium pastry and much more.", ar: "مقاهي، مطاعم، حلويات فاخرة والمزيد." },
    family: { fr: "Un environnement confortable et sécurisé pour les familles.", en: "A comfortable and safe environment for families.", ar: "بيئة مريحة وآمنة للعائلات." },
    chairs: { fr: "Chaises hautes disponibles pour les tout-petits.", en: "High chairs available for toddlers.", ar: "كراسي عالية متوفرة للأطفال." },
    rest: { fr: "Détendez-vous dans une zone de repos confortable.", en: "Unwind in a comfortable rest zone.", ar: "استرخِ في منطقة راحة مريحة." },
    smoking: { fr: "Zone fumeur dédiée, respectant le confort de tous.", en: "Dedicated smoking zone, respecting everyone's comfort.", ar: "منطقة تدخين مخصصة مع احترام راحة الجميع." }
  };

  const tabsContainer = container.querySelector('#services-tabs');
  const sfIcon = container.querySelector('#sf-icon');
  const sfTitle = container.querySelector('#sf-title');
  const sfDesc = container.querySelector('#sf-desc');
  const featured = container.querySelector('#services-featured');

  const serviceSlice = services.slice(0, 6);

  // Set initial description
  if (sfDesc && serviceSlice[0]) {
    sfDesc.textContent = serviceDescs[serviceSlice[0].id]?.[currentLang] || serviceDescs[serviceSlice[0].id]?.en || '';
  }

  if (tabsContainer) {
    tabsContainer.querySelectorAll('.services-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.idx);
        const s = serviceSlice[idx];
        if (!s) return;

        // Update active tab
        tabsContainer.querySelectorAll('.services-tab').forEach(btn => btn.classList.remove('active'));
        tab.classList.add('active');

        // Animate out
        featured.classList.add('switching');
        
        setTimeout(() => {
          sfIcon.innerHTML = s.icon;
          sfTitle.textContent = t('services.' + s.id);
          sfDesc.textContent = serviceDescs[s.id]?.[currentLang] || serviceDescs[s.id]?.en || '';
          
          // Animate in
          featured.classList.remove('switching');
        }, 250);
      });
    });
  }

  // --- Animated Stats Counters ---
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(el => {
          const target = parseFloat(el.dataset.target);
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const startTime = performance.now();

          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsGrid = container.querySelector('.stats-grid');
  if (statsGrid) statObserver.observe(statsGrid);

  // --- Google Reviews Carousel ---
  const reviews = [
    { name: "Ahmed B.", rating: 5, text: "Endroit magnifique avec une ambiance cosy. Les restaurants sont excellents et le service est impeccable. Je recommande vivement !", date: "2026-03" },
    { name: "Sarra M.", rating: 5, text: "Un espace moderne et propre, idéal pour passer du temps en famille. Les enfants adorent Underground Space !", date: "2026-02" },
    { name: "Karim T.", rating: 5, text: "Grande variété de restaurants et cafés. L'ambiance est toujours agréable, surtout le soir avec l'éclairage.", date: "2026-01" },
    { name: "Nour H.", rating: 4, text: "Très belle destination à Sousse. Le parking gratuit est un vrai plus. On y revient chaque weekend.", date: "2025-12" },
    { name: "Yassine R.", rating: 5, text: "La pâtisserie La Baie des Anges est incroyable ! Et le Wi-Fi gratuit dans tout le centre, c'est top.", date: "2025-11" },
    { name: "Mariem K.", rating: 5, text: "Meilleur centre commercial de Sousse ! Propre, spacieux, accessible PMR. Une vraie réussite.", date: "2025-10" }
  ];

  const track = container.querySelector('#reviews-track');
  const dotsContainer = container.querySelector('#reviews-dots');
  const prevBtn = container.querySelector('#rev-prev');
  const nextBtn = container.querySelector('#rev-next');

  if (track) {
    // Render cards
    track.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">${r.name.charAt(0)}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          </div>
          <svg class="review-google" viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        </div>
        <p class="review-text">"${r.text}"</p>
      </div>
    `).join('');

    // Dots
    const cardCount = reviews.length;
    let currentSlide = 0;

    dotsContainer.innerHTML = reviews.map((_, i) =>
      `<button class="review-dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></button>`
    ).join('');

    function goToSlide(idx) {
      currentSlide = ((idx % cardCount) + cardCount) % cardCount;
      const card = track.children[currentSlide];
      if (card) {
        track.scrollTo({ left: card.offsetLeft - track.offsetLeft - 20, behavior: 'smooth' });
      }
      dotsContainer.querySelectorAll('.review-dot').forEach((d, i) =>
        d.classList.toggle('active', i === currentSlide)
      );
    }

    prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

    dotsContainer.querySelectorAll('.review-dot').forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.slide)));
    });

    // Auto-advance every 5s
    let autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    track.addEventListener('mouseleave', () => {
      autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  }
}

import { brands } from '../data.js';

export function renderBrandDetail(container, params, { t, currentLang }) {
  const brandId = params.id;
  const brand = brands.find(b => b.id === brandId);

  if (!brand) {
    container.innerHTML = `<div class="container section-padding" style="text-align:center"><h2>404 - Brand Not Found</h2><a href="#/enseignes" class="btn btn-primary">Back to Directory</a></div>`;
    return;
  }

  container.innerHTML = `
    <section class="brand-hero">
      <div class="brand-hero__bg" style="background-image: url('${brand.photo}')"></div>
      <div class="brand-hero__overlay"></div>
      <div class="container brand-hero__content">
        <div class="brand-hero__badge stagger reveal">${brand.type === 'large' ? 'Flagship Store' : brand.category || 'Premium Brand'}</div>
        <h1 class="brand-hero__name stagger reveal">${brand.name}</h1>
        <div class="brand-hero__meta stagger reveal">
          <span>${t('enseignes.openNow')}</span>
          <span class="dot"></span>
          <span>${brand.phone || ''}</span>
        </div>
      </div>
    </section>

    <section class="section-padding brand-details">
      <div class="container">
        <div class="brand-details__layout">
          <div class="brand-details__main reveal">
            <div class="brand-card-flat">
              <img src="${brand.logo}" alt="${brand.name} Logo" class="brand-details__logo">
              <div class="brand-details__text">
                <h3>À propos de ${brand.name}</h3>
                <p>${t('enseignes.subtitle')}</p>
                <p>Découvrez l'univers unique de ${brand.name} au cœur de Boumiza Square. Une expérience raffinée alliant qualité et service d'exception.</p>
              </div>
            </div>

            <div class="brand-details__gallery reveal-stagger">
              <img src="${brand.photo}" alt="${brand.name} Interior" class="gallery-img">
              <img src="${brand.icon}" alt="${brand.name} Feature" class="gallery-img">
            </div>
          </div>

          <aside class="brand-details__sidebar reveal">
            <div class="sidebar-info">
              <h4>${t('home.statHours')}</h4>
              <ul class="hours-list">
                ${Object.entries(brand.hours).map(([day, time]) => `
                  <li><strong>${day.replace('_', ' ').toUpperCase()}:</strong> ${time}</li>
                `).join('')}
              </ul>
            </div>

            <div class="sidebar-info">
              <h4>Follow ${brand.name}</h4>
              <div class="social-pills-detailed">
                ${brand.social?.instagram ? `
                  <a href="https://instagram.com/${brand.social.instagram}" target="_blank" class="social-pill-large">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span>Instagram</span>
                  </a>
                ` : ''}
                ${brand.social?.facebook ? `
                  <a href="https://facebook.com/${brand.social.facebook}" target="_blank" class="social-pill-large">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    <span>Facebook</span>
                  </a>
                ` : ''}
                <a href="https://wa.me/21651648574" target="_blank" class="social-pill-large whatsapp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div class="center-action" style="margin-top: 30px;">
              <a href="#/plan" class="btn btn-primary w-full">${t('nav.plan')}</a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Other Brands Section -->
    <section class="section-padding section-bg">
      <div class="container">
        <h3 class="section-title reveal" style="text-align: left; margin-bottom: 40px">${currentLang === 'ar' ? 'اكتشف المزيد' : 'Découvrez aussi'}</h3>
        <div class="brands-mini-grid reveal-stagger">
          ${brands.filter(b => b.id !== brandId).slice(0, 8).map(b => `
            <a href="#/enseigne/${b.id}" class="brand-mini-card">
              <img src="${b.logo}" alt="${b.name}">
              <span>${b.name}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

import { brands } from '../data.js';

/**
 * Floor Plan Page — Interactive SVG Map of the Mall
 */
export function renderPlan(container, { t, currentLang }) {
  // Build a list of shop names for the legend
  const shops = brands.map(b => b.name);

  container.innerHTML = `
    <section class="page-hero page-hero--plan">
      <div class="container">
        <h1 class="page-hero__title stagger">${t('nav.plan')}</h1>
        <p class="page-hero__subtitle stagger">${currentLang === 'ar' ? 'استكشف بوميزة سكوير من خلال خريطتنا التفاعلية' : currentLang === 'en' ? 'Explore Boumiza Square through our interactive map' : 'Explorez Boumiza Square via notre plan interactif'}</p>
      </div>
    </section>

    <section class="section-padding floor-plan-section">
      <div class="container">
        <div class="floor-plan-layout">
           <!-- Interactive SVG -->
           <div class="map-container" style="overflow: visible;">
             <svg viewBox="0 0 800 1150" class="mall-svg" id="mall-map" preserveAspectRatio="xMidYMid meet">
              <!-- Defs for gradients/shadows -->
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <!-- Main Building Shape -->
              <path class="mall-outline" d="M50,50 L750,50 L750,1000 L50,1000 Z" fill="none" stroke="currentColor" stroke-width="2" />
              
              <!-- Corridor / Empty Space -->
              <rect x="350" y="50" width="100" height="950" fill="var(--color-bg-soft)" />
              <rect x="50" y="300" width="700" height="120" fill="var(--color-bg-soft)" />
              <rect x="50" y="680" width="700" height="120" fill="var(--color-bg-soft)" />

              <!-- Brand Zones -->
              <!-- OKAYA -->
              <rect id="okaya" class="map-zone" x="60" y="70" width="130" height="200" data-brand="okaya" />
              <text x="125" y="170" text-anchor="middle" class="map-label">OKAYA</text>

              <!-- LA BAIE -->
              <rect id="la_baie" class="map-zone" x="200" y="70" width="140" height="200" data-brand="la_baie" />
              <text x="270" y="170" text-anchor="middle" class="map-label">LA BAIE</text>

              <!-- PIZZERIA -->
              <rect id="pizzeria" class="map-zone" x="460" y="70" width="120" height="200" data-brand="pizzeria" />
              <text x="520" y="170" text-anchor="middle" class="map-label">PEPPINO'S</text>

              <!-- MIEL BOUMIZA -->
              <rect id="miel" class="map-zone" x="590" y="70" width="150" height="200" data-brand="miel" />
              <text x="665" y="170" text-anchor="middle" class="map-label">MIEL</text>

              <!-- KARINA -->
              <rect id="karina" class="map-zone" x="60" y="450" width="130" height="200" data-brand="karina" />
              <text x="125" y="550" text-anchor="middle" class="map-label">KARINA</text>

              <!-- UNDERGROUND SPACE -->
              <rect id="underground" class="map-zone" x="200" y="450" width="140" height="200" data-brand="underground" />
              <text x="270" y="550" text-anchor="middle" class="map-label">UNDERGROUND</text>

              <!-- PLAN B -->
              <rect id="plan_b" class="map-zone" x="460" y="450" width="120" height="200" data-brand="plan_b" />
              <text x="520" y="550" text-anchor="middle" class="map-label">PLAN B</text>

              <!-- AL ZAIM -->
              <rect id="al_zaim" class="map-zone" x="590" y="450" width="150" height="200" data-brand="al_zaim" />
              <text x="665" y="550" text-anchor="middle" class="map-label">AL ZAIM</text>

              <!-- LA LEYENDA -->
              <rect id="la_leyenda" class="map-zone" x="60" y="830" width="130" height="150" data-brand="la_leyenda" />
              <text x="125" y="905" text-anchor="middle" class="map-label">LA LEYENDA</text>

              <!-- CREPE & CO -->
              <rect id="crepe_co" class="map-zone" x="200" y="830" width="140" height="150" data-brand="crepe_co" />
              <text x="270" y="905" text-anchor="middle" class="map-label">CREPE & CO</text>

              <!-- TERMINAL A -->
              <rect id="terminal_a" class="map-zone" x="460" y="830" width="280" height="150" data-brand="terminal_a" />
              <text x="600" y="905" text-anchor="middle" class="map-label">TERMINAL A</text>
            </svg>
          </div>

          <!-- Info Panel -->
          <div class="map-info-panel">
            <div id="zone-details" class="zone-details">
              <h3 id="detail-name">${currentLang === 'ar' ? 'اختر متجراً' : currentLang === 'en' ? 'Select a Shop' : 'Séléctionnez une Enseigne'}</h3>
              <p id="detail-desc">${currentLang === 'ar' ? 'انقر على الخريطة لرؤية التفاصيل' : currentLang === 'en' ? 'Click on the map to see details' : 'Cliquez sur le plan pour voir les détails'}</p>
              <div id="detail-cta" style="display: none; margin-top: 20px;">
                <button id="view-brand-btn" class="btn btn-primary btn-sm">${currentLang === 'ar' ? 'عرض المتجر' : currentLang === 'en' ? 'View Brand' : 'Voir l\'enseigne'}</button>
              </div>
            </div>

            <div class="map-legend">
              <h4>${currentLang === 'ar' ? 'دليل المحلات' : currentLang === 'en' ? 'Shop Directory' : 'Annuaire des shops'}</h4>
              <div class="legend-grid">
                ${brands.map(b => `
                  <div class="legend-item" data-for="${b.id}">
                    <span class="legend-dot"></span>
                    <span class="legend-name">${b.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Interactivity
  const zones = container.querySelectorAll('.map-zone');
  const detailName = container.querySelector('#detail-name');
  const detailDesc = container.querySelector('#detail-desc');
  const detailCta = container.querySelector('#detail-cta');
  const viewBrandBtn = container.querySelector('#view-brand-btn');
  const legendItems = container.querySelectorAll('.legend-item');

  let selectedBrandId = null;

  const updateDetails = (brandId) => {
    const brand = brands.find(b => b.id === brandId);
    if (!brand) return;

    selectedBrandId = brandId;
    detailName.textContent = brand.name;
    detailDesc.textContent = t('enseignes.subtitle'); // Or a generic description
    detailCta.style.display = 'block';

    // Highlight zone
    zones.forEach(z => z.classList.remove('active'));
    container.querySelector(`#${brandId}`)?.classList.add('active');

    // Highlight legend
    legendItems.forEach(li => li.classList.remove('active'));
    container.querySelector(`[data-for="${brandId}"]`)?.classList.add('active');
  };

  zones.forEach(zone => {
    zone.addEventListener('click', () => {
      updateDetails(zone.dataset.brand);
    });
  });

  legendItems.forEach(item => {
    item.addEventListener('click', () => {
      updateDetails(item.dataset.for);
    });
  });

  viewBrandBtn.addEventListener('click', () => {
    if (selectedBrandId) {
      // In the future: navigate to dedicated page
      // For now: open modal (we'd need home.js logic here, or just link back to enseignes)
      window.location.hash = '/enseignes';
    }
  });
}

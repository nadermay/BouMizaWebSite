import { events } from '../data.js';

/**
 * Events Page
 */
export function renderEvents(container, { currentLang, t }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'ar' ? 'ar-TN' : currentLang === 'en' ? 'en-US' : 'fr-FR', options);
  };

  container.innerHTML = `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container text-center">
        <h1 data-i18n="events.title" class="page-hero__title stagger">${t('events.title')}</h1>
        <p data-i18n="events.subtitle" class="page-hero__subtitle stagger">${t('events.subtitle')}</p>
      </div>
    </section>

    <!-- Events Feed -->
    <section class="events-feed section-padding">
      <div class="container">
        <div class="events-grid reveal-stagger">
          ${events.map(ev => `
            <div class="event-card ${ev.isUpcoming ? '' : 'event-card--past'}">
              <div class="event-image-wrap">
                <img src="${ev.image}" alt="${t('events.items.' + ev.id + '.title')}" class="event-image">
                ${ev.isUpcoming ? `<span class="event-badge">${t('events.upcoming')}</span>` : `<span class="event-badge event-badge--past">${t('events.past')}</span>`}
              </div>
              <div class="event-content">
                <p class="event-date">${formatDate(ev.date)}</p>
                <h3 class="event-title">${t('events.items.' + ev.id + '.title')}</h3>
                <p class="event-desc">${t('events.items.' + ev.id + '.desc')}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

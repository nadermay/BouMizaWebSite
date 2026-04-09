import { brands } from '../data.js';

/**
 * Gallery Page — Masonry photo grid with lightbox
 */
export function renderGalerie(container, { t }) {

  // Build the full photo list from all brands + extra ambiance shots
  const photos = [
    ...brands.map(b => ({ src: b.photo, caption: b.name, category: 'enseignes' })),
    // Ambiance shots
    {
      src: 'https://strapi.boumizasquare.com/uploads/DSC_07447_d236f68ecc.jpeg',
      caption: 'Underground Space — Ambiance',
      category: 'ambiance'
    },
    {
      src: 'https://strapi.boumizasquare.com/uploads/DSC_08586_48e4c6eaae.jpeg',
      caption: 'OKAYA — Extérieur',
      category: 'ambiance'
    },
    {
      src: 'https://strapi.boumizasquare.com/uploads/karina_88bb0a1cf3.jpg',
      caption: 'KARINA — Cosmétiques',
      category: 'ambiance'
    },
    {
      src: 'https://strapi.boumizasquare.com/uploads/IMG_1761_jpg_0369ed8b67.JPG',
      caption: 'La Baie des Anges — Pâtisserie',
      category: 'gastronomie'
    },
    {
      src: 'https://strapi.boumizasquare.com/uploads/DSC_02919_99b9c11c02.jpg',
      caption: 'Al Zaim — Restaurant',
      category: 'gastronomie'
    },
    {
      src: 'https://strapi.boumizasquare.com/uploads/974ef821_da0a_489f_9a4b_936fddeb0431_67ff3b12b9.jpg',
      caption: 'Miel Boumiza',
      category: 'gastronomie'
    },
  ].filter((p, i, arr) =>
    // Remove duplicates by src
    arr.findIndex(x => x.src === p.src) === i && p.src
  );

  const categories = ['all', 'enseignes', 'gastronomie', 'ambiance'];

  container.innerHTML = `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <p class="page-hero__tag stagger" data-i18n="gallery.tag">${t('gallery.tag') !== 'gallery.tag' ? t('gallery.tag') : 'Découvrir'}</p>
        <h1 class="page-hero__title stagger" data-i18n="gallery.title">${t('gallery.title') !== 'gallery.title' ? t('gallery.title') : 'Notre Galerie'}</h1>
        <p class="page-hero__sub stagger" data-i18n="gallery.subtitle">${t('gallery.subtitle') !== 'gallery.subtitle' ? t('gallery.subtitle') : 'Immergez-vous dans l\'univers de Boumiza Square'}</p>
      </div>
    </section>

    <!-- Gallery -->
    <section class="gallery-section section-padding">
      <div class="container">

        <!-- Filter Tabs -->
        <div class="gallery-filters reveal" id="gallery-filters">
          ${categories.map(cat => `
            <button class="gallery-filter-btn ${cat === 'all' ? 'active' : ''}" data-cat="${cat}">
              ${cat === 'all' ? (t('gallery.all') !== 'gallery.all' ? t('gallery.all') : 'Tout') :
                cat === 'enseignes' ? 'Enseignes' :
                cat === 'gastronomie' ? 'Gastronomie' : 'Ambiance'}
            </button>
          `).join('')}
        </div>

        <!-- Masonry Grid -->
        <div class="gallery-grid reveal-stagger reveal" id="gallery-grid">
          ${photos.map((photo, idx) => `
            <div class="gallery-item" data-cat="${photo.category}" data-idx="${idx}" role="button" tabindex="0" aria-label="Voir ${photo.caption}">
              <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
              <div class="gallery-item__overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>
              </div>
              <div class="gallery-item__caption">${photo.caption}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div class="gallery-lightbox" id="gallery-lightbox" aria-hidden="true" role="dialog">
      <button class="lightbox-close" id="lightbox-close" aria-label="Fermer">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <button class="lightbox-prev" id="lightbox-prev" aria-label="Précédent">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <div class="lightbox-content">
        <img src="" alt="" id="lightbox-img">
        <p class="lightbox-caption" id="lightbox-caption"></p>
      </div>
      <button class="lightbox-next" id="lightbox-next" aria-label="Suivant">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  `;

  // --- Filter Logic ---
  const filterBtns = container.querySelectorAll('.gallery-filter-btn');
  const items = container.querySelectorAll('.gallery-item');
  let visibleItems = [...items];

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;

      items.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
          item.style.animation = 'galleryFadeIn 0.4s var(--ease-out-expo) forwards';
        } else {
          item.style.display = 'none';
        }
      });
      visibleItems = [...items].filter(i => i.style.display !== 'none');
    });
  });

  // --- Lightbox Logic ---
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  let currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    const item = visibleItems[idx];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.querySelector('.gallery-item__caption').textContent;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIdx = (currentIdx + 1) % visibleItems.length;
    openLightbox(currentIdx);
  }

  function showPrev() {
    currentIdx = (currentIdx - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIdx);
  }

  items.forEach((item, idx) => {
    item.addEventListener('click', () => {
      visibleItems = [...items].filter(i => i.style.display !== 'none');
      const visIdx = visibleItems.indexOf(item);
      openLightbox(visIdx >= 0 ? visIdx : idx);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // Keyboard navigation
  document.addEventListener('keydown', function galleryKeys(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  });
}

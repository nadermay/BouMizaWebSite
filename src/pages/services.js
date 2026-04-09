import { services } from '../data.js';

/**
 * Services Page — Full amenity detail cards
 */

const serviceDescriptions = {
  wifi: {
    fr: "Restez connecté tout au long de votre visite — que vous travailliez, étudiez ou vous détendiez.",
    en: "Stay connected throughout your visit — whether you're working, studying, or relaxing.",
    ar: "ابقَ متصلاً طوال زيارتك — سواء كنت تعمل أو تدرس أو تسترخي."
  },
  brands: {
    fr: "Cafés, restaurants, pâtisserie premium, cuisine asiatique, crêpes, sandwichs, et bien plus.",
    en: "Cafés, restaurants, premium pastry, Asian cuisine, crêpes, sandwiches, and much more.",
    ar: "مقاهي، مطاعم، حلويات فاخرة، مأكولات آسيوية، كريب، سندويشات، والمزيد."
  },
  family: {
    fr: "Un environnement confortable et sécurisé conçu pour les familles et les enfants.",
    en: "A comfortable and safe environment designed for families and children.",
    ar: "بيئة مريحة وآمنة مصممة للعائلات والأطفال."
  },
  chairs: {
    fr: "Des chaises hautes sont disponibles dans les espaces de restauration pour plus de commodité.",
    en: "High chairs are available in dining areas for added convenience.",
    ar: "كراسي عالية متوفرة في مناطق الطعام لمزيد من الراحة."
  },
  rest: {
    fr: "Détendez-vous dans une zone de repos confortable conçue pour offrir une pause agréable.",
    en: "Unwind in a comfortable rest zone designed to offer a pleasant break during your visit.",
    ar: "استرخِ في منطقة راحة مريحة مصممة لتقديم استراحة ممتعة أثناء زيارتك."
  },
  smoking: {
    fr: "Une zone fumeur dédiée est disponible, respectant le confort de tous les visiteurs.",
    en: "A dedicated smoking zone is available, respecting the comfort of all visitors.",
    ar: "منطقة تدخين مخصصة متاحة، مع احترام راحة جميع الزوار."
  },
  charging: {
    fr: "Gardez vos appareils chargés grâce aux bornes de recharge disponibles dans le centre.",
    en: "Keep your devices powered with charging stations available across the center.",
    ar: "حافظ على شحن أجهزتك من خلال محطات الشحن المتوفرة في المركز."
  },
  card: {
    fr: "Tous les magasins et restaurants acceptent le paiement par carte pour votre commodité.",
    en: "All shops and restaurants accept card payments for your convenience.",
    ar: "جميع المتاجر والمطاعم تقبل الدفع بالبطاقة لراحتك."
  },
  wheelchair: {
    fr: "Des passages accessibles assurent le confort et la facilité de déplacement pour tous.",
    en: "Accessible pathways ensure comfort and ease of movement for all visitors.",
    ar: "ممرات يسهل الوصول إليها تضمن الراحة وسهولة التنقل لجميع الزوار."
  }
};

export function renderServices(container, { currentLang, t }) {
  container.innerHTML = `
    <section class="page-hero page-hero--services">
      <div class="container">
        <h1 class="page-hero__title stagger">${t('services.title')}</h1>
        <p class="page-hero__subtitle stagger">${t('services.pageSubtitle')}</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="services-detail-grid reveal-stagger reveal">
          ${services.map(service => {
            const desc = serviceDescriptions[service.id]?.[currentLang] || serviceDescriptions[service.id]?.en || '';
            return `
              <div class="service-detail-card">
                <div class="service-detail-card__icon">${service.icon}</div>
                <div class="service-detail-card__content">
                  <h3>${t('services.' + service.id)}</h3>
                  <p>${desc}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}

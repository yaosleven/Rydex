import type { WebflowReplacement } from '../utils/webflow-content';

const original = (file: string) => `/static/picture/${file}`;

/**
 * Semantic, editor-friendly locations for every image directly used on Home.
 * The original Webflow files remain untouched in public/static/picture.
 */
export const homeAssets = {
  logo: '/assets/shared/brand-logo.svg',
  heroDesktop: '/assets/home-hero.webp',
  heroMobile: '/assets/home-hero-mobile.webp',
  arrowRight: '/assets/shared/icons/arrow-right.svg',
  arrowRightAlternate: '/assets/shared/icons/arrow-right-alternate.svg',
  arrowDown: '/assets/shared/icons/arrow-down.svg',
  models: {
    glideVortex: '/assets/home/models/glide-vortex.webp',
    xplorerGlide: '/assets/home/models/xplorer-glide.webp',
    velocitCrest: '/assets/home/models/velocit-crest.webp',
    raptHorizon: '/assets/home/models/rapt-horizon.webp',
  },
  benefits: {
    calendar: '/assets/home/benefits/calendar.svg',
    price: '/assets/home/benefits/price.svg',
    vehicle: '/assets/home/benefits/vehicle.svg',
    service: '/assets/home/benefits/service.svg',
  },
  testimonials: {
    thomasReid: '/assets/home/testimonials/thomas-reid.webp',
    michaelBrooks: '/assets/home/testimonials/michael-brooks.webp',
    lauraBennett: '/assets/home/testimonials/laura-bennett.webp',
    emilySanders: '/assets/home/testimonials/emily-sanders.webp',
    danielHarper: '/assets/home/testimonials/daniel-harper.webp',
    jamesCarter: '/assets/home/testimonials/james-carter.webp',
  },
  steps: {
    search: '/assets/home/steps/search.svg',
    key: '/assets/home/steps/key.svg',
    enquiry: '/assets/home/steps/enquiry.svg',
    vehicle: '/assets/home/steps/vehicle.svg',
  },
  journal: {
    showroomGuide: '/assets/home/journal/showroom-guide.webp',
    maintenanceGuide: '/assets/home/journal/maintenance-guide.webp',
    racingEvent: '/assets/home/journal/racing-event.webp',
  },
  brands: {
    velox: '/assets/brands/velox.svg',
    aurion: '/assets/brands/aurion.svg',
  },
} as const;

export const homeAssetReplacements: readonly WebflowReplacement[] = [
  [original('6863a7d749380244400cadf0_ec84ea29b2cc7723b4b9b2449bd3b59c_logo.svg'), homeAssets.logo],
  [original('6864d28d6d224cfc617cfc39_0b76b173af6046e3baff3b231d198b2e_arrow-right-icon.svg'), homeAssets.arrowRight],
  [original('6867dee03e172481e1f00bf9_arrow-right-icon-2.svg'), homeAssets.arrowRightAlternate],
  [original('68695011fff14c231d733695_18e4deb9ce7150d6021fead5b7f630a7_arrow-bottom-icon.svg'), homeAssets.arrowDown],
  [original('6867580e8c3ea59bc8be0567_c37a5846c76d515300a0ec5a573c45fd_home-hero-image.webp'), homeAssets.heroDesktop],
  [original('68693eff1f14ac6704da31bf_home-hero-mobile.webp'), homeAssets.heroMobile],
  [original('686f7a28adef37939d8c0ebc_glide-vortex.webp'), homeAssets.models.glideVortex],
  [original('686f7c9896946e6903f1ce81_xplorer-glide.webp'), homeAssets.models.xplorerGlide],
  [original('686f7df608019c9b041ab7db_velocity-crest.webp'), homeAssets.models.velocitCrest],
  [original('686f7eca3b34d2e8df938a4b_raptor-horizon.webp'), homeAssets.models.raptHorizon],
  [original('68726379e2e877525736aaf7_61057b4aa37b9c6e8b2141654222eea1_calendar-icon.svg'), homeAssets.benefits.calendar],
  [original('68737ff248edde385bfcbb17_dollar-sign-icon.svg'), homeAssets.benefits.price],
  [original('68737ff565d4ed3a72b4625f_car-icon.svg'), homeAssets.benefits.vehicle],
  [original('68737ff9825fc4da4ba560f0_wrench-icon.svg'), homeAssets.benefits.service],
  [original('68761dfb6d400a6cc38ce421_blog-post-5.webp'), homeAssets.journal.showroomGuide],
  [original('68761ea1da6c070f5de9f9b1_blog-post-3.webp'), homeAssets.journal.maintenanceGuide],
  [original('68761ef1d4364172cee2ec96_blog-post-2.webp'), homeAssets.journal.racingEvent],
  [original('6877841c106d359778209e34_thomas-reid.webp'), homeAssets.testimonials.thomasReid],
  [original('6877841c9a6a6148ea0a7fc1_michael-brooks.webp'), homeAssets.testimonials.michaelBrooks],
  [original('6877841d106d359778209e56_laura-bennett.webp'), homeAssets.testimonials.lauraBennett],
  [original('6877841d342c1be1a06717d1_emily-sanders.webp'), homeAssets.testimonials.emilySanders],
  [original('6877841d5571d30752f74441_daniel-harper.webp'), homeAssets.testimonials.danielHarper],
  [original('6877841d6776098fc68a9be8_james-carter.webp'), homeAssets.testimonials.jamesCarter],
  [original('6878012c165fbb2fa619cb69_cf22eead6b6e805aaf939c451a13e5a5_search-icon-2.svg'), homeAssets.steps.search],
  [original('687802bc131b4ab98f75125e_5c2ac720544a962571a8a5f657a2a4cf_key-icon.svg'), homeAssets.steps.key],
  [original('687802cb9e4dec5a31dc29e2_5bddcb5577bd6b27ee12d8ea2d5d1c15_mail-icon.svg'), homeAssets.steps.enquiry],
  [original('68780433062702462d7f9e91_car-icon-2.svg'), homeAssets.steps.vehicle],
  [original('688743ce33633af956b114dd_velox.svg'), homeAssets.brands.velox],
  [original('688743d9b6babee061ccd02f_aurion.svg'), homeAssets.brands.aurion],
];

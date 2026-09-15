import type { CollectionEntry } from 'astro:content';
import type { WebflowReplacement } from '../utils/webflow-content';

type PageEntry = CollectionEntry<'pages'>;

const originalAbout = {
  copy: {
    heroEyebrow: 'About Us',
    heroTitle: 'Try Rydex Rides, Cruise With Joy',
    introEyebrow: 'Who We Are',
    introTitle: 'Driven by Passion, built on Precision! Rydex Delivers More Than Cars, We bring Trust.',
    introBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elem tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libe vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem.',
    introCta: 'Book Now',
    statisticsEyebrow: 'Our Numbers',
    statisticsTitle: 'Key Statistics That Define Our Journey',
    showroomEyebrow: 'Our Showroom',
    showroomTitle: 'Discover Rydex Elite Showroom Site',
    showroomAddress: '19 Jumeirah Beach Road, Umm Suqeim District, Dubai City, United Arab Emirates.',
    teamEyebrow: 'Our Team',
    teamTitle: 'Meet Rydex Dedicated Team Members',
    teamCta: 'View',
    metricBookings: 'Total Bookings',
    metricModels: 'Models In Stock',
    metricClients: 'Clients Satisfaction',
    metricDaily: 'Daily Bookings',
  },
  images: {
    heroDesktop: '/static/picture/687fc84c23d5fb7287cd0c1f_164b0bffe00e12cd2bc683d4842e6f35_about-hero-image.webp',
    heroMobile: '/static/picture/687fc84c3b7cecdd65a16127_1cc45397564683110cde9e519fc47dd4_about-hero-image-mobile.webp',
    intro: '/static/picture/688292019565b1e744ae655b_fce264e3bb32f6e388130d0744209ea5_about-image.webp',
    showroom: '/static/picture/6882a7fdc7e009c59ddd6657_about-image-2.webp',
    partner1: '/static/picture/68832f5a8c97d105430b3a14_logo-1.svg',
    partner2: '/static/picture/68832f5a5871c66e1e38c881_logo-2.svg',
    partner3: '/static/picture/68832f5abbc5a6904ba0ea0d_logo-3.svg',
    partner4: '/static/picture/68832f5a7aeb612c8caf6555_logo-4.svg',
    partner5: '/static/picture/68832f5af9ee4b20d5a4ff4d_logo-5.svg',
    partner6: '/static/picture/68832f5ab508642c85fa8b64_logo-6.svg',
    partner7: '/static/picture/688335684e52cbd58020a75f_logo-7.svg',
  },
  team: [
    { name: 'Ryan Cole', role: 'Founder', image: '/static/picture/6884899680fdbf02fad3fefb_ryan-cole.webp' },
    { name: 'Cory Nash', role: 'Manager', image: '/static/picture/6884899611f8986a34bd0876_cory-nash.webp' },
    { name: 'Tina Raye', role: 'Salesman', image: '/static/picture/688489960a6dfb673a503813_tina-raye.webp' },
    { name: 'Evan Holt', role: 'Mechanic', image: '/static/picture/688489969f28b7a5ddd4a44d_evan-holt.webp' },
  ],
} as const;

const originalContact = {
  copy: {
    heroEyebrow: 'Contact Us',
    heroTitle: 'Get In Touch',
    heroBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique duis cursus',
    methodDescription: 'Lorem ipsum dolor sit amet consectetur',
    chatLabel: 'Chat With Us',
    firstNamePlaceholder: 'Your First Name',
    lastNamePlaceholder: 'Your Last Name',
    emailPlaceholder: 'Your Email Address',
    phonePlaceholder: 'Your Phone Number',
    messagePlaceholder: 'Write Your Message Here...',
    submitLabel: 'Send Message',
    submittingLabel: 'Please wait...',
    successMessage: 'Thank you! Your submission has been received!',
    errorMessage: 'Oops! Something went wrong while submitting the form.',
  },
  images: {
    success: '/static/picture/688b52b179e932cadc6cf114_40ab0c03ac8131cb7f388369776150f8_square-check.svg',
    phone: '/static/picture/688b67679f4ef91dabb51ef3_phone-icon.svg',
    email: '/static/picture/688b6c0364887f664293eb25_mail-icon-2.svg',
    chat: '/static/picture/688b6c455785c8eea35fa228_message-icon.svg',
  },
} as const;

function replacementsFor<T extends Record<string, string>>(reference: T, values: Record<string, string>): WebflowReplacement[] {
  return Object.entries(reference).map(([key, value]) => [value, values[key]] as const);
}

export function aboutPageReplacements(entry: PageEntry): WebflowReplacement[] {
  return [
    ...replacementsFor(originalAbout.copy, entry.data.copy),
    ...replacementsFor(originalAbout.images, entry.data.images),
    ...originalAbout.team.flatMap((person, index) => [
      [person.name, entry.data.team[index]?.name ?? person.name],
      [person.role, entry.data.team[index]?.role ?? person.role],
      [person.image, entry.data.team[index]?.image ?? person.image],
      [`alt="${entry.data.team[index]?.name ?? person.name}"`, `alt="${entry.data.team[index]?.alt || entry.data.team[index]?.name || person.name}"`],
    ] as const),
  ];
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function counterColumn(character: string, index: number) {
  if (!/\d/.test(character)) {
    return `<div class="counter-number-item"><div class="_2x-large-text pure-color-text">${character}</div></div>`;
  }

  const digit = Number(character);
  const sequence = Array.from({ length: 10 }, (_, number) => `<div class="_2x-large-text pure-color-text">${number}</div>`).join('');
  const transform = `translate3d(0, -${digit * 10}%, 0)`;
  const numberClass = index === 0 ? ' number-1' : ' number-2';
  return `<div style="-webkit-transform:${transform} scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:${transform} scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:${transform} scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:${transform} scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="counter-number-item${numberClass}">${sequence}</div>`;
}

/** Keeps the original counter classes while making About metric values editable. */
export function applyAboutMetricValues(markup: string, metrics: PageEntry['data']['metrics']) {
  return metrics.reduce((output, metric) => {
    const label = escapeRegExp(metric.label);
    const cardPattern = new RegExp(`(<div\\b[^>]*class="card metric-card"[^>]*>(?:(?!<div class="metric-title">)[\\s\\S])*?<div class="metric-title"><div class="x-large-text text-400">${label}</div></div>)`);
    return output.replace(cardPattern, (card) => {
      const counter = `<div class="metric-number-wrapper"><div class="counter-numbers-wrapper">${[...metric.value].map(counterColumn).join('')}</div><div class="metric-symbol"><div class="_2x-large-text solis-color-text">${metric.suffix}</div></div></div><div class="metric-title">`;
      return card.replace(/<div class="metric-number-wrapper">[\s\S]*?<\/div><div class="metric-title">/, counter);
    });
  }, markup);
}

export function contactPageReplacements(entry: PageEntry): WebflowReplacement[] {
  return [
    ...replacementsFor(originalContact.copy, entry.data.copy),
    ...replacementsFor(originalContact.images, entry.data.images),
  ];
}

const originalCatalog = {
  pageTitle: 'Rydex Models',
  brandFilter: 'Model Brand',
  typeFilter: 'Model Type',
  featureFilter: 'Model Feature',
  featurePrefix: 'Models With',
  luxora: 'Luxora',
  velox: 'Velox',
  aurion: 'Aurion',
  coupe: 'Coupe',
  sedan: 'Sedan',
  suv: 'SUV',
  camera: '360° Camera',
  bluetooth: 'Bluetooth',
  gps: 'Built-in GPS',
  leather: 'Leather Seats',
  headlights: 'LED Headlights',
  sound: 'Sound System',
  sunroof: 'Sunroof',
} as const;

export function catalogPageReplacements(entry: PageEntry): WebflowReplacement[] {
  return replacementsFor(originalCatalog, entry.data.copy);
}

const originalUtility = {
  changelogDescription: 'All versions, updates, and improvements of this template will be documented and tracked here.',
  changelogVersion: 'Version 1.1',
  changelogRelease: 'Initial Release of the Rydex Webflow Template',
  licenseIntro: 'All graphical assets in this template are licensed for personal and commercial use. If you\'d like to use a specific asset, please check the license below.',
  styleGuideIntro: 'Maintain a consistent, polished, and visually appealing design throughout your website with the help of this style guide.',
} as const;

export function utilityPageReplacements(entry: PageEntry): WebflowReplacement[] {
  return replacementsFor(originalUtility, entry.data.copy);
}

const originalArticleListing = {
  eyebrow: 'Blog Posts',
  blogTitle: 'Our Blog Posts',
  categoryPrefix: 'Posts',
  filterLabel: 'Categories',
  all: 'All',
  reviews: 'Reviews',
  guides: 'Guides',
  events: 'Events',
  next: 'Next',
  previous: 'Previous',
} as const;

export function articleListingPageReplacements(entry: PageEntry): WebflowReplacement[] {
  return replacementsFor(originalArticleListing, entry.data.copy);
}

const routeAnchors: Record<string, Record<string, string>> = {
  luxora: { heading: 'Luxora', collectionLabel: 'Models' },
  velox: { heading: 'Velox', collectionLabel: 'Models' },
  aurion: { heading: 'Aurion', collectionLabel: 'Models' },
  coupe: { heading: 'Coupe', collectionLabel: 'Models' },
  sedan: { heading: 'Sedan', collectionLabel: 'Models' },
  suv: { heading: 'SUV', collectionLabel: 'Models' },
  '360deg-camera': { prefix: 'Models With', heading: '360° Camera' },
  bluetooth: { prefix: 'Models With', heading: 'Bluetooth' },
  'built-in-gps': { prefix: 'Models With', heading: 'Built-in GPS' },
  'leather-seats': { prefix: 'Models With', heading: 'Leather Seats' },
  'led-headlights': { prefix: 'Models With', heading: 'LED Headlights' },
  'sound-system': { prefix: 'Models With', heading: 'Sound System' },
  'sunroof-6rm2o-xlnu2': { prefix: 'Models With', heading: 'Sunroof' },
  changelog: { heading: 'Changelog', version: 'Version 1.1' },
  licenses: { heading: 'Licenses' },
  'style-guide': { heading: 'Style Guide' },
};

/** Page-specific headings remain editable without changing shared catalog filters or Webflow markup. */
export function routePageReplacements(entry: PageEntry): WebflowReplacement[] {
  const anchors = routeAnchors[entry.data.page];
  if (!anchors) return [];
  return Object.entries(anchors).flatMap(([key, source]) => {
    const target = entry.data.copy[key];
    return target ? [[source, target] as const] : [];
  });
}

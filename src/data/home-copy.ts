import type { CollectionEntry } from 'astro:content';
import type { WebflowReplacement } from '../utils/webflow-content';
import { applyWebflowContent, escapeHtml } from '../utils/webflow-content';
import { homeAssets } from './home-assets';

type HomeEntry = CollectionEntry<'pages'>;
type HomeSection = 'hero' | 'about' | 'featuredModels' | 'benefits' | 'testimonials' | 'steps' | 'journal';

/** Static anchors in the downloaded Webflow markup; editable values live in src/content/pages/home.json. */
const reference = {
  hero: ['Dubai, UAE', 'Prime Collection by Rydex!', 'Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet nunc ut.', 'Car Rental', 'Enjoy Easy Rides, Pick Your Way', 'Book a Car', 'Get in Touch'],
  about: ['About Us', 'Discover the passion and expertise behind Rydex, your premier destination for luxury car rentals and unmatched service.', 'Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat aenean.', 'Learn More', 'Total Bookings', 'Models In Stock', 'Happy Clients', 'Daily Bookings'],
  models: ['Our Models', 'Our Featured Models', 'Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae.', 'See All Models'],
  modelCards: [
    ['Rapt Horizon', 'Velox', '$130', '2,100 KM', '990 HP', '6.5 L'],
    ['Velocit Crest', 'Aurion', '$110', '1,800 KM', '860 HP', '5.0 L'],
    ['Xplorer Glide', 'Velox', '$120', '3,400 KM', '670 HP', '6.0 L'],
    ['Glide Vortex', 'Aurion', '$100', '4,300 KM', '490 HP', '5.0 L'],
  ],
  benefits: ['Why Choose Us?', 'Exceptional Service in Every Mile, Every Time'],
  benefitCards: [
    ['Luxurious Car Rentals', 'Duis cursus, mi quis viverra ornare, eros dolor inter nulla, ut commodo diam libero vitae erat.'],
    ['Easy Booking Process', 'Duis cursus, mi quis viverra ornare, eros dolor inter nulla, ut commodo diam libero vitae erat.'],
    ['Flexible Pricing Plans', 'Duis cursus, mi quis viverra ornare, eros dolor inter nulla, ut commodo diam libero vitae erat.'],
    ['Well-Maintained Fleet', 'Duis cursus, mi quis viverra ornare, eros dolor inter nulla, ut commodo diam libero vitae erat.'],
  ],
  testimonials: ['Testimonials', 'Heartfelt Reviews By Rydex Drivers', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'],
  testimonialNames: ['Daniel Harper', 'James Carter', 'Emily Sanders', 'Thomas Reid', 'Micheal Brooks', 'Thomas Reid', 'Laura Bennett', 'Daniel Harper', 'James Carter', 'Emily Sanders', 'Micheal Brooks', 'Thomas Reid'],
  testimonialLocations: ['Dubai', 'Abu Dhabi', 'Ajman', 'Fujairah', 'Sharjah', 'Fujairah', 'Abu Dhabi', 'Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah', 'Fujairah'],
  steps: ['How It Works', 'Follow these simple steps to choose your ideal vehicle and drive away effortlessly.', 'Book Now'],
  stepCards: [
    ['Browse Our Elite Fleet', 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum.'],
    ['Pick Your Ideal Vehicle', 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum.'],
    ['Submit Your Enquiry', 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum.'],
    ['Collect and Drive Away', 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum.'],
  ],
  journal: ['Blog Posts', 'Engage with Premium Rental Posts', 'See All Posts'],
  journalPosts: [
    ['Guide To Choose The Right Car In A Showroom', 'Guides'],
    ['Rydex Hosts Annual Auto Racing Grand Event', 'Events'],
    ['Guides For Maintaining Your Rental Car Perfectly', 'Guides'],
  ],
} as const;

function copy(entry: HomeEntry, key: string, fallback: string): string { return entry.data.copy[key] || fallback; }
function image(entry: HomeEntry, key: string, fallback: string): string { return entry.data.images[key] || fallback; }
function paired(from: string, to: string): WebflowReplacement { return [from, to]; }

function replaceSequence(markup: string, sources: readonly string[], values: readonly string[]): string {
  let cursor = 0;
  let output = markup;
  for (const value of values) {
    const candidates = sources.map((source) => ({ source, index: output.indexOf(source, cursor) }))
      .filter((candidate) => candidate.index !== -1).sort((a, b) => a.index - b.index);
    const candidate = candidates[0];
    if (!candidate) break;
    const escaped = escapeHtml(value);
    output = `${output.slice(0, candidate.index)}${escaped}${output.slice(candidate.index + candidate.source.length)}`;
    cursor = candidate.index + escaped.length;
  }
  return output;
}

export function homeReplacements(section: HomeSection, entry: HomeEntry): readonly WebflowReplacement[] {
  if (section === 'hero') return reference.hero.map((value, index) => paired(value, copy(entry, ['heroLocation', 'heroCollection', 'heroDescription', 'heroEyebrow', 'heroTitle', 'heroPrimaryCta', 'heroSecondaryCta'][index], value)));
  if (section === 'about') return reference.about.map((value, index) => paired(value, copy(entry, ['aboutEyebrow', 'aboutTitle', 'aboutBody', 'aboutCta', 'aboutMetric1', 'aboutMetric2', 'aboutMetric3', 'aboutMetric4'][index], value)));
  if (section === 'featuredModels') return [
    ...reference.models.map((value, index) => paired(value, copy(entry, ['modelsEyebrow', 'modelsTitle', 'modelsBody', 'modelsCta'][index], value))),
    ...reference.modelCards.flatMap((card, cardIndex) => card.map((value, fieldIndex) => paired(value, copy(entry, `model${cardIndex + 1}${['Name', 'Brand', 'Price', 'Mileage', 'Power', 'Engine'][fieldIndex]}`, value)))),
  ];
  if (section === 'benefits') return [
    ...reference.benefits.map((value, index) => paired(value, copy(entry, ['benefitsEyebrow', 'benefitsTitle'][index], value))),
    ...reference.benefitCards.flatMap((card, cardIndex) => card.map((value, fieldIndex) => paired(value, copy(entry, `benefit${cardIndex + 1}${fieldIndex === 0 ? 'Title' : 'Body'}`, value)))),
  ];
  if (section === 'testimonials') return reference.testimonials.map((value, index) => paired(value, copy(entry, ['testimonialsEyebrow', 'testimonialsTitle', 'testimonialQuote'][index], value)));
  if (section === 'steps') return [
    ...reference.steps.map((value, index) => paired(value, copy(entry, ['stepsEyebrow', 'stepsTitle', 'stepsCta'][index], value))),
    ...reference.stepCards.flatMap((card, cardIndex) => card.map((value, fieldIndex) => paired(value, copy(entry, `step${cardIndex + 1}${fieldIndex === 0 ? 'Title' : 'Body'}`, value)))),
  ];
  return [
    ...reference.journal.map((value, index) => paired(value, copy(entry, ['journalEyebrow', 'journalTitle', 'journalCta'][index], value))),
    ...reference.journalPosts.flatMap((post, postIndex) => post.map((value, fieldIndex) => paired(value, copy(entry, `journal${postIndex + 1}${fieldIndex === 0 ? 'Title' : 'Category'}`, value)))),
  ];
}

/** Applies Home text without altering Webflow classes, DOM order, or motion markers. */
export function applyHomeSectionCopy(section: Exclude<HomeSection, 'hero'>, markup: string, entry: HomeEntry): string {
  const withCopy = applyWebflowContent(markup, homeReplacements(section, entry));
  if (section !== 'testimonials') return withCopy;
  const names = reference.testimonialNames.map((name, index) => copy(entry, `testimonial${index + 1}Name`, name));
  const locations = reference.testimonialLocations.map((location, index) => copy(entry, `testimonial${index + 1}Location`, location));
  return replaceSequence(replaceSequence(withCopy, reference.testimonialNames, names), reference.testimonialLocations, locations);
}

/** Replaces semantic defaults with the Home page's editable image fields. */
export function homeImageReplacements(entry: HomeEntry): readonly WebflowReplacement[] {
  return [
    paired(homeAssets.logo, image(entry, 'logo', homeAssets.logo)),
    paired(homeAssets.heroDesktop, image(entry, 'heroDesktop', homeAssets.heroDesktop)),
    paired(homeAssets.heroMobile, image(entry, 'heroMobile', homeAssets.heroMobile)),
    paired(homeAssets.models.raptHorizon, image(entry, 'model1', homeAssets.models.raptHorizon)),
    paired(homeAssets.models.velocitCrest, image(entry, 'model2', homeAssets.models.velocitCrest)),
    paired(homeAssets.models.xplorerGlide, image(entry, 'model3', homeAssets.models.xplorerGlide)),
    paired(homeAssets.models.glideVortex, image(entry, 'model4', homeAssets.models.glideVortex)),
    paired(homeAssets.benefits.calendar, image(entry, 'benefitCalendar', homeAssets.benefits.calendar)),
    paired(homeAssets.benefits.price, image(entry, 'benefitPrice', homeAssets.benefits.price)),
    paired(homeAssets.benefits.vehicle, image(entry, 'benefitVehicle', homeAssets.benefits.vehicle)),
    paired(homeAssets.benefits.service, image(entry, 'benefitService', homeAssets.benefits.service)),
    paired(homeAssets.testimonials.thomasReid, image(entry, 'testimonialThomas', homeAssets.testimonials.thomasReid)),
    paired(homeAssets.testimonials.michaelBrooks, image(entry, 'testimonialMichael', homeAssets.testimonials.michaelBrooks)),
    paired(homeAssets.testimonials.lauraBennett, image(entry, 'testimonialLaura', homeAssets.testimonials.lauraBennett)),
    paired(homeAssets.testimonials.emilySanders, image(entry, 'testimonialEmily', homeAssets.testimonials.emilySanders)),
    paired(homeAssets.testimonials.danielHarper, image(entry, 'testimonialDaniel', homeAssets.testimonials.danielHarper)),
    paired(homeAssets.testimonials.jamesCarter, image(entry, 'testimonialJames', homeAssets.testimonials.jamesCarter)),
    paired(homeAssets.steps.search, image(entry, 'stepSearch', homeAssets.steps.search)),
    paired(homeAssets.steps.key, image(entry, 'stepKey', homeAssets.steps.key)),
    paired(homeAssets.steps.enquiry, image(entry, 'stepEnquiry', homeAssets.steps.enquiry)),
    paired(homeAssets.steps.vehicle, image(entry, 'stepVehicle', homeAssets.steps.vehicle)),
    paired(homeAssets.journal.showroomGuide, image(entry, 'journal1', homeAssets.journal.showroomGuide)),
    paired(homeAssets.journal.racingEvent, image(entry, 'journal2', homeAssets.journal.racingEvent)),
    paired(homeAssets.journal.maintenanceGuide, image(entry, 'journal3', homeAssets.journal.maintenanceGuide)),
    paired(homeAssets.brands.velox, image(entry, 'brandVelox', homeAssets.brands.velox)),
    paired(homeAssets.brands.aurion, image(entry, 'brandAurion', homeAssets.brands.aurion)),
  ];
}

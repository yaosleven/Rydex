import type { WebflowReplacement } from '../utils/webflow-content';

/**
 * Values present in the downloaded Webflow export. They stay separate from
 * editable content so later brand changes still know what must be replaced.
 */
const originalSite = {
  companyName: 'Rydex',
  email: 'info@rydex.com',
  phone: '+1 (123) 456-7890',
  address: '19 Jumeirah Beach Road, Umm Suqeim, UAE.',
  whatsappUrl: 'https://whatsapp.com/',
  footerDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim in eros.',
  instagram: 'https://instagram.com/',
  twitter: 'https://x.com/',
  youtube: 'https://youtube.com/',
} as const;

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}

export interface EditableSiteSettings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  whatsappUrl: string;
  footerDescription: string;
  social: { instagram: string; twitter: string; youtube: string };
  branding?: { logo: string; logoAlt: string; favicon: string };
  navigation?: {
    modelsLabel: string; searchPlaceholder: string; homeLabel: string; aboutLabel: string;
    blogLabel: string; contactLabel: string; primaryCtaLabel: string;
  };
  footer?: {
    primaryCtaLabel: string; mainPagesLabel: string; followUsLabel: string; visitUsLabel: string;
    contactUsLabel: string; poweredByLabel: string; designedByLabel: string; styleGuideLabel: string;
    licensesLabel: string; changelogLabel: string;
  };
  links?: Record<string, string>;
}

export function siteReplacements(settings: EditableSiteSettings): readonly WebflowReplacement[] {
  const navigation = settings.navigation;
  const footer = settings.footer;
  const links = settings.links ?? {};
  return [
    [originalSite.companyName, settings.companyName],
    [originalSite.email, settings.email],
    [originalSite.phone, settings.phone],
    [originalSite.address, settings.address],
    [originalSite.whatsappUrl, settings.whatsappUrl],
    [originalSite.footerDescription, settings.footerDescription],
    [originalSite.instagram, settings.social.instagram],
    [originalSite.twitter, settings.social.twitter],
    [originalSite.youtube, settings.social.youtube],
    ['mailto:info@rydex.com', `mailto:${settings.email}`],
    ['tel:+1(123)456-7890', phoneHref(settings.phone)],
    ['Models', navigation?.modelsLabel ?? 'Models'],
    ['Search…', navigation?.searchPlaceholder ?? 'Search…'],
    ['Home', navigation?.homeLabel ?? 'Home'],
    ['About', navigation?.aboutLabel ?? 'About'],
    ['Blog', navigation?.blogLabel ?? 'Blog'],
    ['Contact', navigation?.contactLabel ?? 'Contact'],
    ['Book Now', navigation?.primaryCtaLabel ?? footer?.primaryCtaLabel ?? 'Book Now'],
    ['Main Pages', footer?.mainPagesLabel ?? 'Main Pages'],
    ['Follow Us', footer?.followUsLabel ?? 'Follow Us'],
    ['Visit Us', footer?.visitUsLabel ?? 'Visit Us'],
    ['Contact us', footer?.contactUsLabel ?? 'Contact us'],
    ['Powered by', footer?.poweredByLabel ?? 'Powered by'],
    ['Designed by', footer?.designedByLabel ?? 'Designed by'],
    ['Style Guide', footer?.styleGuideLabel ?? 'Style Guide'],
    ['Licenses', footer?.licensesLabel ?? 'Licenses'],
    ['Changelog', footer?.changelogLabel ?? 'Changelog'],
    ['/about.html', links.about ?? '/about.html'],
    ['/models.html', links.models ?? '/models.html'],
    ['/blog.html', links.blog ?? '/blog.html'],
    ['/contact.html', links.contact ?? '/contact.html'],
    ['/style-guide.html', links.styleGuide ?? '/style-guide.html'],
    ['/licenses.html', links.licenses ?? '/licenses.html'],
    ['/changelog.html', links.changelog ?? '/changelog.html'],
  ];
}

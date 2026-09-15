import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seo = z.object({
  title: z.string(),
  description: z.string(),
  ogImage: z.string().optional(),
});

const imageAsset = z.object({
  path: z.string(),
  alt: z.string(),
  purpose: z.string(),
  recommendedWidth: z.number().int().positive(),
  recommendedHeight: z.number().int().positive(),
  routes: z.array(z.string()).min(1),
});

const brands = defineCollection({
  loader: glob({ base: './src/content/brands', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    logo: z.string(),
    logoAlt: z.string().default('Brand logo'),
    seo: seo.optional(),
  }),
});

const models = defineCollection({
  loader: glob({ base: './src/content/models', pattern: '**/*.json' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    brand: z.string(),
    type: z.string(),
    summary: z.string().optional(),
    heroImage: z.string().optional(),
    media: z.object({
      hero: z.string(),
      gallery: z.array(z.string()).length(3),
    }).optional(),
    originalMedia: z.object({
      hero: z.string(),
      gallery: z.array(z.string()).length(3),
    }).optional(),
    mediaAlt: z.object({
      hero: z.string(),
      gallery: z.array(z.string()).length(3),
    }).optional(),
    pricing: z.object({ daily: z.string(), weekly: z.string(), monthly: z.string() }),
    specifications: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    seo: seo.optional(),
    imageAlt: z.string().optional(),
    original: z.object({
      title: z.string(),
      brand: z.string(),
      type: z.string(),
      summary: z.string(),
      daily: z.string(),
      weekly: z.string(),
      monthly: z.string(),
    }),
    originalSpecifications: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  }),
});

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.json' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['Events', 'Guides', 'Reviews']),
    description: z.string(),
    publishedAt: z.string(),
    cover: z.string(),
    author: z.object({ name: z.string(), avatar: z.string() }),
    readTime: z.string(),
    body: z.object({
      eyebrow: z.string(),
      lead: z.string(),
      paragraphs: z.array(z.string()).length(5),
    }),
    seo: seo.optional(),
    coverAlt: z.string().default('Article cover image'),
  }),
});

const settings = defineCollection({
  loader: glob({ base: './src/content/settings', pattern: '**/*.json' }),
  schema: z.object({
    companyName: z.string(),
    email: z.email(),
    phone: z.string(),
    address: z.string(),
    whatsappUrl: z.url(),
    footerDescription: z.string(),
    social: z.object({ instagram: z.url(), twitter: z.url(), youtube: z.url() }),
    defaultSeo: seo,
    branding: z.object({ logo: z.string(), logoAlt: z.string(), favicon: z.string() }).optional(),
    navigation: z.object({
      modelsLabel: z.string(), searchPlaceholder: z.string(), homeLabel: z.string(), aboutLabel: z.string(),
      blogLabel: z.string(), contactLabel: z.string(), primaryCtaLabel: z.string(),
    }).optional(),
    footer: z.object({
      primaryCtaLabel: z.string(), mainPagesLabel: z.string(), followUsLabel: z.string(), visitUsLabel: z.string(),
      contactUsLabel: z.string(), poweredByLabel: z.string(), designedByLabel: z.string(), styleGuideLabel: z.string(),
      licensesLabel: z.string(), changelogLabel: z.string(),
    }).optional(),
    links: z.record(z.string(), z.string()).default({}),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.json' }),
  schema: z.object({
    page: z.string(),
    copy: z.record(z.string(), z.string()),
    images: z.record(z.string(), z.string()).default({}),
    links: z.record(z.string(), z.string()).default({}),
    seo: seo.optional(),
    assetInventory: z.array(imageAsset).default([]),
    metrics: z.array(z.object({ label: z.string(), value: z.string(), suffix: z.string().default('') })).default([]),
    team: z.array(z.object({ name: z.string(), role: z.string(), image: z.string(), alt: z.string().default('') })).default([]),
    searchItems: z.array(z.object({
      title: z.string(),
      type: z.enum(['Page']),
      href: z.string(),
      description: z.string(),
      keywords: z.array(z.string()),
    })).default([]),
  }),
});

const landingPages = defineCollection({
  loader: glob({ base: './src/content/landing-pages', pattern: '**/*.json' }),
  schema: z.object({
    slug: z.string(),
    seo: seo,
    header: z.object({ ctaLabel: z.string() }),
    hero: z.object({
      location: z.string(),
      collection: z.string(),
      description: z.string(),
      eyebrow: z.string(),
      title: z.string(),
      primaryCta: z.string(),
      secondaryCta: z.string(),
      desktopImage: z.string().default('/assets/home-hero.webp'),
      mobileImage: z.string().default('/assets/home-hero-mobile.webp'),
      desktopAlt: z.string().default('B2B manufacturing solution hero image'),
      mobileAlt: z.string().default('B2B manufacturing solution mobile hero image'),
    }),
    sections: z.object({
      about: z.object({ eyebrow: z.string(), title: z.string(), cta: z.string(), metrics: z.array(z.string()).length(4) }),
      models: z.object({ eyebrow: z.string(), title: z.string(), body: z.string(), cta: z.string() }),
      benefits: z.object({ eyebrow: z.string(), title: z.string(), cards: z.array(z.object({ title: z.string() })).length(4) }),
      testimonials: z.object({ eyebrow: z.string(), title: z.string() }),
      steps: z.object({ eyebrow: z.string(), title: z.string(), cta: z.string(), cards: z.array(z.object({ title: z.string() })).length(4) }),
      journal: z.object({ eyebrow: z.string(), title: z.string(), cta: z.string() }),
    }),
    quoteForm: z.object({
      eyebrow: z.string(), title: z.string(), description: z.string(), benefits: z.array(z.string()).length(3),
      fields: z.object({ name: z.string(), company: z.string(), email: z.string(), phone: z.string(), country: z.string(), product: z.string(), requirements: z.string(), requirementsPlaceholder: z.string() }),
      consent: z.string(), submitLabel: z.string(), previewMessage: z.string(), submitFeedback: z.string(),
    }),
    leadBand: z.object({ eyebrow: z.string(), title: z.string(), primaryCta: z.string(), secondaryCta: z.string() }),
    procurement: z.object({ eyebrow: z.string(), title: z.string(), cards: z.array(z.object({ title: z.string(), body: z.string() })).length(3) }),
    faq: z.object({ eyebrow: z.string(), title: z.string(), items: z.array(z.object({ question: z.string(), answer: z.string() })).min(1) }),
    stickyCta: z.object({ primaryLabel: z.string(), secondaryLabel: z.string() }),
  }),
});

const assetGroups = defineCollection({
  loader: glob({ base: './src/content/assets', pattern: '**/*.json' }),
  schema: z.object({
    group: z.string(),
    items: z.array(imageAsset),
  }),
});

export const collections = { articles, assetGroups, brands, models, pages, settings, landingPages };

import type { CollectionEntry } from 'astro:content';
import type { WebflowReplacement } from '../utils/webflow-content';

type ArticleEntry = CollectionEntry<'articles'>;

const originalArticles = {
  'exclusive-rydex-car-show-in-dubai-unveiled': {
    title: 'Exclusive Rydex Car Show In Dubai Unveiled', category: 'Events', date: 'August 14, 2025',
    cover: '/static/picture/68761f344a42597f59f93d2d_blog-post-1.webp', author: 'Cory Nash', avatar: '/static/picture/6884899611f8986a34bd0876_cory-nash.webp', readTime: '8 min',
  },
  'rydex-hosts-annual-auto-racing-grand-event': {
    title: 'Rydex Hosts Annual Auto Racing Grand Event', category: 'Events', date: 'August 14, 2025',
    cover: '/static/picture/68761ef1d4364172cee2ec96_blog-post-2.webp', author: 'Tina Raye', avatar: '/static/picture/688489960a6dfb673a503813_tina-raye.webp', readTime: '8 min',
  },
  'guides-for-maintaining-your-rental-car-perfectly': {
    title: 'Guides For Maintaining Your Rental Car Perfectly', category: 'Guides', date: 'August 14, 2025',
    cover: '/static/picture/68761ea1da6c070f5de9f9b1_blog-post-3.webp', author: 'Evan Holt', avatar: '/static/picture/688489969f28b7a5ddd4a44d_evan-holt.webp', readTime: '8 min',
  },
  'top-luxury-cars-to-rent-this-summer-season': {
    title: 'Top Luxury Cars To Rent This Summer Season', category: 'Reviews', date: 'August 14, 2025',
    cover: '/static/picture/68761e3aef10a8e31d6773b0_blog-post-4.webp', author: 'Cory Nash', avatar: '/static/picture/6884899611f8986a34bd0876_cory-nash.webp', readTime: '8 min',
  },
  'guide-to-choose-the-right-car-in-a-showroom': {
    title: 'Guide To Choose The Right Car In A Showroom', category: 'Guides', date: 'August 14, 2025',
    cover: '/static/picture/68761dfb6d400a6cc38ce421_blog-post-5.webp', author: 'Tina Raye', avatar: '/static/picture/688489960a6dfb673a503813_tina-raye.webp', readTime: '8 min',
  },
  'ultimate-guide-to-choosing-coupe-rentals': {
    title: 'Ultimate Guide To Choosing Coupe Rentals', category: 'Guides', date: 'August 14, 2025',
    cover: '/static/picture/68761d1d3f83640d01f6400a_blog-post-6.webp', author: 'Evan Holt', avatar: '/static/picture/688489969f28b7a5ddd4a44d_evan-holt.webp', readTime: '8 min',
  },
  'the-best-sedan-models-that-fit-road-trips': {
    title: 'The Best Sedan Models That Fit Road Trips', category: 'Reviews', date: 'August 14, 2025',
    cover: '/static/picture/68761c78abbc251c0d83db34_blog-post-7.webp', author: 'Cory Nash', avatar: '/static/picture/68906eb54dc52340eee3f51e_cory-nash.webp', readTime: '8 min',
  },
} as const;

const originalArticleBody = {
  eyebrow: 'Discover Road Insights',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .',
  paragraphs: [
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
    'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
  ],
} as const;

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}

export function articlePageReplacements(entries: readonly ArticleEntry[]): WebflowReplacement[] {
  return [
    ['/static/picture/6887b4e2f16c8bb12bc8b52d_d19496b54cbfe5623d8b314bea1c2ec2_arrow-left-icon.svg', '/assets/articles/icons/arrow-left.svg'] as const,
    ...entries.flatMap(({ id, data }) => {
    const reference = originalArticles[id as keyof typeof originalArticles];
    if (!reference) return [];
    return [
      [reference.title, data.title],
      [reference.cover, data.cover],
      [reference.author, data.author.name],
      [reference.avatar, data.author.avatar],
      [reference.date, formatDate(data.publishedAt)],
      [reference.readTime, data.readTime],
      [originalArticleBody.eyebrow, data.body.eyebrow],
      [originalArticleBody.lead, data.body.lead],
      ...originalArticleBody.paragraphs.map((paragraph, index) => [paragraph, data.body.paragraphs[index]] as const),
    ] as const;
    }),
  ];
}

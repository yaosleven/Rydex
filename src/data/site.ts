export interface NavigationItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: 'Rydex',
  description: 'Rydex is a stylish and modern Webflow template for luxury car rentals.',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about.html' },
    { label: 'Models', href: '/models' },
    { label: 'Blog', href: '/blog.html' },
    { label: 'Contact', href: '/contact.html' },
  ] satisfies NavigationItem[],
  contact: {
    email: 'hello@rydex.com',
    phone: '+1 (800) 123-4567',
  },
} as const;

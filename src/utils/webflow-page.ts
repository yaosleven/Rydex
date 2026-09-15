export interface WebflowPageSource {
  body: string;
  collectionId?: string;
  itemSlug?: string;
  pageId: string;
}

const attribute = (html: string, name: string) =>
  html.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1];

export function sanitizeWebflowBody(body: string, currentPath?: string): string {
  const sanitized = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/\s(?:srcset|sizes)="[^"]*"/gi, '')
    .replace(/\b(src|href)="static\//gi, '$1="/static/')
    .replace(/(?:\.\/)?Rydex - Webflow HTML website template_files\//g, '/static/picture/')
    .replace(/<img\b[^>]*webflow-badge-(?:icon|text)[^>]*>/gi, '')
    .replace(/href="\?47cf5733_page=2"/gi, 'href="/models-2.html"')
    .replace(/href="\?47cf5733_page=1"/gi, 'href="/models.html"')
    .replace(/href="\?36bdd4aa_page=2"/gi, 'href="/blog-2.html"')
    .replace(/href="\?36bdd4aa_page=1"/gi, 'href="/blog.html"')
    .replace(/href="\/blog-posts\/([^"#?]+)"/gi, 'href="/$1.html"')
    .replace(/href="([a-z0-9][a-z0-9-]*\.html(?:#[^"]*)?)"/gi, 'href="/$1"')
    .replace(/href="https:\/\/rydex\.webflow\.io\/blog-posts\/([^"#?]+)"/gi, 'href="/$1.html"')
    .replace(/href="https:\/\/rydex\.webflow\.io\/blog-post-categories\/reviews"/gi, 'href="/reviews.html"')
    .replace(/href="https:\/\/rydex\.webflow\.io\/models\/([^"#?]+)"/gi, 'href="/$1.html"')
    .replace(/href="https:\/\/rydex\.webflow\.io\/(about|models|blog|contact|style-guide|licenses|changelog)"/gi, 'href="/$1.html"')
    .replace(/href="https:\/\/rydex\.webflow\.io\/?"/gi, 'href="/"');

  return currentPath ? sanitized.replace(/href=""(?=[^>]*>)/gi, `href="${currentPath}"`) : sanitized;
}

/**
 * Retains the downloaded Webflow markup while removing inline scripts from the
 * reference file. The trusted, local Webflow runtime is loaded by the layout.
 */
export function toWebflowPage(source: string, currentPath?: string): WebflowPageSource {
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];

  if (!body) {
    throw new Error('The downloaded Webflow page does not contain a body element.');
  }

  const pageId = attribute(source, 'data-wf-page');

  if (!pageId) {
    throw new Error('The downloaded Webflow page does not include a Webflow page id.');
  }

  return {
    pageId,
    collectionId: attribute(source, 'data-wf-collection'),
    itemSlug: attribute(source, 'data-wf-item-slug'),
    body: sanitizeWebflowBody(body, currentPath),
  };
}

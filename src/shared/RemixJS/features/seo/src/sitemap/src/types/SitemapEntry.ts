/**
 * Represents an entry in a KCDSitemap.
 * @interface
 * @property {string} route - The route of the sitemap entry.
 * @property {string | undefined} [lastmod] - The last modified date of the route.
 * @property {'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined} [changefreq] - The change frequency of the route.
 * @property {0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0 | undefined} [priority] - The priority of the route.
 */
export interface SitemapEntry {
  /** The route of the sitemap entry. */
  route: string;
  /** The last modified date of the route. */
  lastmod?: string;
  /** The change frequency of the route. */
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** The priority of the route. */
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
}

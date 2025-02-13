import { SitemapEntry } from './SitemapEntry';

/**
 * Represents a handle for sitemap generation in Remix.
 * @interface
 * @property {object} sitemap - Object containing sitemap-related properties and methods.
 * @property {string | undefined} [sitemap.id] - An identifier for the sitemap.
 * @property {((request: Request) => Promise<Array<SitemapEntry | null> | null> | Array<SitemapEntry | null> | null) | null} [sitemap.getSitemapEntries] - A function that retrieves sitemap entries based on the request object.
 */
export interface RemixHandleForSitemap {
  sitemap: {
    /** this just allows us to identify routes more directly rather than relying on pathnames */
    id?: string;
    getSitemapEntries?:
      | ((request: Request) => Promise<Array<SitemapEntry | null> | null> | Array<SitemapEntry | null> | null)
      | null;
  };
}

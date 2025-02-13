export interface RobotsPolicy {
  type: 'allow' | 'disallow' | 'sitemap' | 'crawlDelay' | 'userAgent';
  value: string;
}

import { RobotsPolicy } from '../types/RobotsPolicy';

const typeTextMap = {
  userAgent: 'User-agent',
  allow: 'Allow',
  disallow: 'Disallow',
  sitemap: 'Sitemap',
  crawlDelay: 'Crawl-delay',
};

/**
 * Generates a robots.txt content string based on the provided array of RobotsPolicy objects.
 * @param {RobotsPolicy[]} policies - An array of RobotsPolicy objects representing various directives.
 * @returns {string} A string representing the content of a robots.txt file.
 */
export const getRobotsText = (policies: RobotsPolicy[]): string => {
  return policies.reduce((acc, policy) => {
    const { type, value } = policy;
    return `${acc}${typeTextMap[type]}: ${value}\n`;
  }, '');
};

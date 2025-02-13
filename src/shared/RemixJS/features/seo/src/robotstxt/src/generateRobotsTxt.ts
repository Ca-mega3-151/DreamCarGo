import { RobotsConfig } from './types/RobotsConfig';
import { RobotsPolicy } from './types/RobotsPolicy';
import { getRobotsText } from './utils/getRobotsText';

const defaultPolicies: RobotsPolicy[] = [
  {
    type: 'userAgent',
    value: '*',
  },
  {
    type: 'allow',
    value: '/',
  },
];

interface GenerateRobotsTxt {
  policies?: RobotsPolicy[];
  configs?: RobotsConfig;
}
export const generateRobotsTxt = ({ configs = {}, policies = [] }: GenerateRobotsTxt): Response => {
  const { appendOnDefaultPolicies = true, headers } = configs;
  const policiesToUse = appendOnDefaultPolicies ? [...defaultPolicies, ...policies] : policies;
  const robotText = getRobotsText(policiesToUse);
  const bytes = new TextEncoder().encode(robotText).byteLength;

  return new Response(robotText, {
    headers: {
      ...headers,
      'Content-Type': 'text/plain',
      'Content-Length': String(bytes),
    },
  });
};

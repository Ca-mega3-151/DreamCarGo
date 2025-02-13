import { formatLanguageString } from './formatLanguageString';

const REGEX = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;

export interface Language {
  code: string;
  script?: string | null | undefined;
  region?: string | undefined;
  quality: number;
}

export interface PickOptions {
  loose?: boolean | undefined;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function parse(acceptLanguage?: string): Language[] {
  const strings = (acceptLanguage || '').match(REGEX);
  if (!strings) {
    throw new Error('Invalid Accept-Language header');
  }

  const languages: Language[] = [];

  for (const m of strings) {
    if (!m) {
      continue;
    }
    const bits = m.split(';');
    const ietf = bits[0]?.split('-') ?? [];
    const hasScript = ietf.length === 3;

    languages.push({
      // biome-ignore lint/style/noNonNullAssertion: We know this is not null
      code: ietf[0]!,
      script: hasScript ? ietf[1] : null,
      region: hasScript ? ietf[2] : ietf[1],
      quality: bits[1]
        ? // biome-ignore lint/style/noNonNullAssertion: We know this is not null
          Number.parseFloat(bits[1]!.split('=')[1]!) ?? 1.0
        : 1.0,
    });
  }

  return languages.sort((a, b) => {
    return b.quality - a.quality;
  });
}

export function pick<T extends string>(
  supportedLanguages: T[],
  acceptLanguage: string | Language[],
  options: PickOptions = { loose: false },
): T | null {
  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) {
    return null;
  }

  const parsedAcceptLanguage = isString(acceptLanguage) ? parse(acceptLanguage) : acceptLanguage;

  const supported = supportedLanguages.map(support => {
    const bits = support.split('-');
    const hasScript = bits.length === 3;

    return {
      // biome-ignore lint/style/noNonNullAssertion: We know this is not null
      code: bits[0]!,
      script: hasScript ? bits[1] : null,
      region: (hasScript ? bits[2] : bits[1]) ?? undefined,
    };
  }) satisfies Array<Pick<Language, 'code' | 'script' | 'region'>>;

  for (const lang of parsedAcceptLanguage) {
    if (!lang) {
      continue;
    }
    const langCode = lang.code.toLowerCase();
    const langRegion = lang.region ? lang.region.toLowerCase() : lang.region;
    const langScript = lang.script ? lang.script.toLowerCase() : lang.script;

    for (const supportedLanguage of supported) {
      const supportedCode = supportedLanguage.code?.toLowerCase() ?? '';
      if (langCode !== supportedCode) {
        continue;
      }

      const supportedScript = supportedLanguage.script
        ? supportedLanguage.script.toLowerCase()
        : supportedLanguage.script;
      const supportedRegion = supportedLanguage.region
        ? supportedLanguage.region.toLowerCase()
        : supportedLanguage.region;

      if (
        langCode === supportedCode &&
        (options?.loose || !langScript || langScript === supportedScript) &&
        (options?.loose || !langRegion || langRegion === supportedRegion)
      ) {
        return formatLanguageString(supportedLanguage) as T;
      }
    }
  }

  return null;
}

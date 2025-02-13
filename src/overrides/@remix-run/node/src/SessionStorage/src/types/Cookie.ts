import { CookieParseOptions } from './CookieParseOptions';
import { CookieSerializeOptions } from './CookieSerializeOptions';

export interface Cookie {
  readonly name: string;
  readonly isSigned: boolean;
  readonly expires?: Date;
  parse(cookieHeader: string | null, options?: CookieParseOptions): Promise<any>;
  serialize(value: any, options?: CookieSerializeOptions): Promise<string>;
}

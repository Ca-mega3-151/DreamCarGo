import { v4 } from 'uuid';
import { createSession } from './Session';
import { CookieParseOptions } from './types/CookieParseOptions';
import { CookieSerializeOptions } from './types/CookieSerializeOptions';
import { Session } from './types/Session';
import { SessionData } from './types/SessionData';
import { webLocalStorage } from '~/shared/Utilities';

export interface SessionStorage<Data = SessionData, FlashData = Data> {
  getSession: (cookieHeader?: string | null, options?: CookieParseOptions) => Promise<Session<Data, FlashData>>;
  commitSession: (session: Session<Data, FlashData>, options?: CookieSerializeOptions) => Promise<string>;
  destroySession: (session: Session<Data, FlashData>, options?: CookieSerializeOptions) => Promise<string>;
}

export const createSessionStorage = <Data = SessionData>(keyInLocalStorage: string): SessionStorage<SessionData> => {
  return {
    commitSession: session => {
      webLocalStorage.setItem(keyInLocalStorage, JSON.stringify(session.data));
      return Promise.resolve(session.id);
    },
    destroySession: () => {
      webLocalStorage.removeItem(keyInLocalStorage);
      return Promise.resolve('');
    },
    getSession: () => {
      try {
        const data = webLocalStorage.getItem(keyInLocalStorage);
        if (data) {
          const data_ = JSON.parse(data) as Session<Data>;
          return Promise.resolve(createSession(data_, keyInLocalStorage));
        }
        return Promise.resolve(createSession(undefined, v4()));
      } catch {
        webLocalStorage.removeItem(keyInLocalStorage);
        return Promise.resolve(createSession(undefined, v4()));
      }
    },
  };
};

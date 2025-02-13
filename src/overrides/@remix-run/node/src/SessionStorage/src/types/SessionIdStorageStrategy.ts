import { Cookie } from './Cookie';
import { CookieParseOptions } from './CookieParseOptions';
import { CookieSerializeOptions } from './CookieSerializeOptions';
import { CookieSignatureOptions } from './CookieSignatureOptions';
import { FlashSessionData } from './FlashSessionData';
import { SessionData } from './SessionData';

export type CookieOptions = CookieParseOptions & CookieSerializeOptions & CookieSignatureOptions;

export interface SessionIdStorageStrategy<Data = SessionData, FlashData = Data> {
  /**
   * The Cookie used to store the session id, or options used to automatically
   * create one.
   */
  cookie?:
    | Cookie
    | (CookieOptions & {
        name?: string;
      });
  /**
   * Creates a new record with the given data and returns the session id.
   */
  createData: (data: FlashSessionData<Data, FlashData>, expires?: Date) => Promise<string>;
  /**
   * Returns data for a given session id, or `null` if there isn't any.
   */
  readData: (id: string) => Promise<FlashSessionData<Data, FlashData> | null>;
  /**
   * Updates data for the given session id.
   */
  updateData: (id: string, data: FlashSessionData<Data, FlashData>, expires?: Date) => Promise<void>;
  /**
   * Deletes data for a given session id from the data store.
   */
  deleteData: (id: string) => Promise<void>;
}

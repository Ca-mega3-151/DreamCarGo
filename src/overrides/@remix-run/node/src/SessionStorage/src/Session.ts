import { FlashDataKey, FlashSessionData } from './types/FlashSessionData';
import { Session } from './types/Session';
import { SessionData } from './types/SessionData';
import { flash } from './utils/flash';

export const createSession = <Data = SessionData, FlashData = Data>(
  initialData: Partial<Data> = {},
  id = '',
): Session<Data, FlashData> => {
  const map = new Map(Object.entries(initialData)) as Map<keyof Data | FlashDataKey<keyof FlashData & string>, any>;

  return {
    get id() {
      return id;
    },
    get data() {
      return Object.fromEntries(map) as FlashSessionData<Data, FlashData>;
    },
    has(name) {
      return map.has(name as keyof Data) || map.has(flash(name as keyof FlashData & string));
    },
    get(name) {
      if (map.has(name as keyof Data)) {
        return map.get(name as keyof Data);
      }

      const flashName = flash(name as keyof FlashData & string);
      if (map.has(flashName)) {
        const value = map.get(flashName);
        map.delete(flashName);
        return value;
      }

      return undefined;
    },
    set(name, value) {
      map.set(name, value);
    },
    flash(name, value) {
      map.set(flash(name), value);
    },
    unset(name) {
      map.delete(name);
    },
  };
};

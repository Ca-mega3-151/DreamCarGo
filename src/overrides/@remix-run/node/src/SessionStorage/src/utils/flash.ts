import { FlashDataKey } from '../types/FlashSessionData';

export const flash = <Key extends string>(name: Key): FlashDataKey<Key> => {
  return `__flash_${name}__`;
};

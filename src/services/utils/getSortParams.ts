import { Sorter } from '../types/SearchParams';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export const getSortParams = <T extends AnyRecord>(sorter: Sorter<T>) => {
  return Object.keys(sorter).reduce<Sorter<T>>((res, sorterKey) => {
    const key = `${sorterKey}[sort]`;
    return {
      ...res,
      [key]: sorter[sorterKey as keyof typeof sorter],
    };
  }, {});
};

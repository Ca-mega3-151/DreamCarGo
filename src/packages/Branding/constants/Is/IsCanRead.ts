import { isCanShow } from '~/utils/functions/isCan/isCanShow';

export const isCanRead = (fields?: string[]) => {
  return isCanShow({ fields });
};

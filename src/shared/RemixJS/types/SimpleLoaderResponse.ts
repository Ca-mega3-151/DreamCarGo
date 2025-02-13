import { AnyRecord } from '~/shared/TypescriptUtilities';

export type SimpleLoaderResponse<T, Extra extends AnyRecord = AnyRecord> = Extra & {
  message: string;
  hasError: boolean;
  info: T | undefined;
};

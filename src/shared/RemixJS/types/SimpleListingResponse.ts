import { AnyRecord } from '~/shared/TypescriptUtilities';

export type SimpleListingResponse<Model extends AnyRecord, Extra extends AnyRecord = AnyRecord> = Extra & {
  info: {
    hits: Model[];
    pagination: {
      totalRecords: number;
      totalPages: number;
    };
  };
  page: number;
  toastMessageError?: string;
};

import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export type ToListingResponse<Model extends AnyRecord, Extra extends AnyRecord = {}> = SimpleListingResponse<
  Model,
  Extra
>;

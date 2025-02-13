import { SimpleLoaderResponse } from '~/overrides/RemixJS/types';
import { StatusCodeMappingToString } from '~/services/constants/StringMappingToStatusCode';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export type ToLoaderResponse<Model, Extra extends AnyRecord = {}> = SimpleLoaderResponse<
  Model,
  Extra & { errorCode?: keyof typeof StatusCodeMappingToString }
>;

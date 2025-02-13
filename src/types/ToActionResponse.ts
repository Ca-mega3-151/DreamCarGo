import { FieldValues, SimpleActionResponse } from '~/overrides/RemixJS/types';
import { StatusCodeMappingToString } from '~/services/constants/StringMappingToStatusCode';

export type ToActionResponse<Model, FormValues extends FieldValues> = SimpleActionResponse<
  Model,
  FormValues,
  { errorCode?: keyof typeof StatusCodeMappingToString }
>;

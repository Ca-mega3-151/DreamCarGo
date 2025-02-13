import { FieldValues } from '../../types';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export type SimpleActionResponse<T, FormValues extends FieldValues, Extra extends AnyRecord = AnyRecord> = Extra & {
  message: string;
  hasError: boolean;
  info: T | undefined;
  fieldsError?: FieldsErrorOfForm<FormValues>;
};

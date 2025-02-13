import { keys } from 'ramda';
import { RTHandleError } from './@types/RemixJsonFunction';
import { FieldErrors, FieldValues } from '~/overrides/RemixJS/types';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';
import { ToActionResponse } from '~/types/ToActionResponse';

export const handleFormResolverError = <FormValues extends FieldValues = any, Model = any>(
  errors: FieldErrors<FormValues>,
): RTHandleError<ToActionResponse<Model, FormValues>> => {
  console.log('handleFormResolverError:: ', errors);
  return [
    {
      message: `[FormResolver]: ${errors}`,
      hasError: true,
      info: undefined,
      fieldsError: keys(errors).reduce<FieldsErrorOfForm<FormValues>>((result, fieldError) => {
        return {
          ...result,
          [fieldError]: errors[fieldError]?.message,
        };
      }, {} as FieldsErrorOfForm<FormValues>),
    },
    { status: 400 },
  ];
};

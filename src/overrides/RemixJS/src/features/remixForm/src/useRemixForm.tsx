import { path } from 'ramda';
import { BaseSyntheticEvent } from 'react';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  RegisterOptions,
  SetValueConfig,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { FetcherWithComponents, SubmitFunction, useActionData, useSubmit } from '../../../../../@remix-run/react';
import { createFormData, mergeErrors } from './utilities';

export type SubmitFunctionOptions = Parameters<SubmitFunction>[1];

export interface UseRemixFormOptions<T extends FieldValues> extends UseFormProps<T> {
  submitHandlers?: {
    onValid?: SubmitHandler<T>;
    onInvalid?: SubmitErrorHandler<T>;
  };
  submitConfig?: SubmitFunctionOptions;
  submitData?: FieldValues;
  fetcher?: FetcherWithComponents<T>;
}

export const useRemixForm = <T extends FieldValues>({
  submitHandlers,
  submitConfig,
  submitData,
  fetcher,
  ...formProps // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}: UseRemixFormOptions<T>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const submit = fetcher?.submit ?? useSubmit();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data: any = fetcher?.data ?? useActionData();
  const methods = useForm<T>(formProps);

  // Submits the data to the server when form is valid
  const onSubmit = (data: T): void => {
    if (!submitHandlers?.onValid) {
      submit(createFormData({ ...data, ...submitData }), {
        method: 'post',
        ...submitConfig,
      });
    }
    submitHandlers?.onValid?.(data);
  };

  const values = methods.getValues();
  const validKeys = Object.keys(values);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onInvalid: SubmitErrorHandler<T> = (errors, event) => {
    console.log('useRemixForm::onInvalid ', {
      errors,
      values: methods.getValues(),
    });
    submitHandlers?.onInvalid?.(errors, event);
  };

  return {
    ...methods,
    setValue: <TFieldName extends FieldPath<T> = FieldPath<T>>(
      name: TFieldName,
      value: FieldPathValue<T, TFieldName>,
      options?: SetValueConfig,
    ) => {
      methods.setValue(name as any, value as any, options);
      if (path(name.split('.'), methods.formState.errors ?? {})) {
        methods.trigger(name);
      }
      return;
    },
    handleSubmit: (event: BaseSyntheticEvent) => {
      event.stopPropagation();
      methods.handleSubmit(onSubmit, onInvalid)(event);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    register: (name: Path<T>, options?: RegisterOptions<T>) => {
      return {
        ...methods.register(name, options),
        defaultValue: data?.defaultValues?.[name] ?? '',
      };
    },
    formState: {
      ...methods.formState,
      errors: mergeErrors<T>(methods.formState.errors, data?.errors ? data.errors : data, validKeys),
    },
  };
};

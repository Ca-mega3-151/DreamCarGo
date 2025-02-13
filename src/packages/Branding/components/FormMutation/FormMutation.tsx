import { equals } from 'ramda';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { Form } from '~/overrides/@remix-run/react';
import { useRemixForm } from '~/overrides/RemixJS/client';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';
import { RecordStatus } from '~/packages/_Enums/RecordStatus/models/RecordStatus';
import { Field, Input, Switch, useDeepCompareEffect } from '~/shared/ReactJS';
import { FormMutationStateValues } from '~/shared/TypescriptUtilities';

export type BrandingFormMutationValues = TypeOf<ReturnType<typeof getFormMutationSchema>>;
export type BrandingFormMutationStateValues = FormMutationStateValues<BrandingFormMutationValues>;

export interface BrandingFormMutationProps {
  uid: string;
  isSubmitting: boolean;
  defaultValues: BrandingFormMutationStateValues;
  fieldsError?: FieldsErrorOfForm<BrandingFormMutationValues>;
  onSubmit?: (values: BrandingFormMutationValues) => void;
  disabled?: boolean;
}

export interface BrandingFormMutationActions {
  isDirty: () => boolean;
}

export const BrandingFormMutation = forwardRef<BrandingFormMutationActions, BrandingFormMutationProps>((props, ref) => {
  const { uid, defaultValues, fieldsError = {}, isSubmitting, onSubmit, disabled } = props;

  const { t } = useTranslation(['branding']);
  const disabledField = disabled || isSubmitting;

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
  } = useRemixForm<BrandingFormMutationStateValues>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
    },
    defaultValues: {
      ...defaultValues,
    },
    resolver: getFormMutationResolver(t),
  });
  const [name, code, status] = watch(['name', 'code', 'status']);

  useDeepCompareEffect(() => {
    Object.keys(fieldsError).forEach(key => {
      const key_ = key as keyof typeof fieldsError;
      if (fieldsError[key_]) {
        setError(key_, {
          message: fieldsError[key_],
        });
      }
    });
  }, [fieldsError]);

  useDeepCompareEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  useImperativeHandle(ref, () => {
    return {
      isDirty: () => {
        return !equals(defaultValues, getValues());
      },
    };
  }, [defaultValues, getValues]);

  return (
    <Form method="POST" id={uid} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <Field withRequiredMark label={t('branding:code')} error={errors.code?.message}>
          <Input
            disabled={disabledField}
            placeholder={t('branding:code')}
            value={code}
            onChange={value => {
              return setValue('code', value);
            }}
          />
        </Field>
        <Field withRequiredMark label={t('branding:name')} error={errors.name?.message}>
          <Input
            disabled={disabledField}
            placeholder={t('branding:name')}
            value={name}
            onChange={value => {
              return setValue('name', value);
            }}
          />
        </Field>
        <Field withRequiredMark label={t('branding:active_status')} error={errors.status?.message}>
          <Switch
            disabled
            checked={status === 'ACTIVE'}
            onChange={checked => {
              setValue('status', checked ? RecordStatus.ACTIVE : RecordStatus.INACTIVE);
              if (errors.status) {
                trigger('status');
              }
            }}
          />
        </Field>
      </div>
    </Form>
  );
});

BrandingFormMutation.displayName = 'BrandingFormMutation';

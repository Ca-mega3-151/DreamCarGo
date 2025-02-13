import { equals } from 'ramda';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { getFormMutationProfileResolver, getFormMutationProfileSchema } from './zodResolver';
import { Form } from '~/overrides/@remix-run/react';
import { useRemixForm } from '~/overrides/RemixJS/client';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';
import { UploadSingleImageResource } from '~/packages/_Common/FileResource/components/UploadSingleImageResource/UploadSingleImageResource';
import { Field, Input, useDeepCompareEffect } from '~/shared/ReactJS';
import { FormMutationStateValues } from '~/shared/TypescriptUtilities';

export type ProfileFormMutationValues = TypeOf<ReturnType<typeof getFormMutationProfileSchema>>;
export type ProfileFormMutationStateValues = FormMutationStateValues<ProfileFormMutationValues, ['avatar']>;

export interface ProfileFormMutationProps {
  uid: string;
  isSubmitting: boolean;
  defaultValues: ProfileFormMutationStateValues;
  fieldsError?: FieldsErrorOfForm<ProfileFormMutationValues>;
  onSubmit?: (values: ProfileFormMutationValues) => void;
  disabled?: boolean;
}

export interface ProfileFormMutationActions {
  isDirty: () => boolean;
}

export const ProfileFormMutation = forwardRef<ProfileFormMutationActions, ProfileFormMutationProps>((props, ref) => {
  const { uid, defaultValues, fieldsError = {}, isSubmitting, onSubmit, disabled } = props;

  const { t } = useTranslation(['profile']);
  const disabledField = disabled || isSubmitting;

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useRemixForm<ProfileFormMutationStateValues>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
    },
    defaultValues: {
      ...defaultValues,
    },
    resolver: getFormMutationProfileResolver(t),
  });
  const [avatar, name, email, phone] = watch(['avatar', 'name', 'email', 'phone']);

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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="md:col-span-3">
          <Field withRequiredMark label={t('profile:avatar')}>
            <UploadSingleImageResource
              variant="avatar"
              disabled={disabledField}
              image={avatar ?? undefined}
              onChange={value => {
                return setValue('avatar', value ?? null);
              }}
            />
          </Field>
        </div>
        <Field withRequiredMark label={t('profile:name')} error={errors.name?.message}>
          <Input
            disabled={disabledField}
            placeholder={t('profile:name')}
            value={name}
            onChange={value => {
              return setValue('name', value);
            }}
          />
        </Field>
        <Field withRequiredMark label={t('profile:email')} error={errors.email?.message}>
          <Input
            disabled={disabledField}
            placeholder={t('profile:email')}
            value={email}
            onChange={value => {
              return setValue('email', value);
            }}
          />
        </Field>
        <Field withRequiredMark label={t('profile:phone')} error={errors.phone?.message}>
          <Input
            disabled={disabledField}
            placeholder={t('profile:phone')}
            value={phone}
            onChange={value => {
              return setValue('phone', value);
            }}
          />
        </Field>
      </div>
    </Form>
  );
});

ProfileFormMutation.displayName = 'ProfileFormMutation';

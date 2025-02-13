import { equals } from 'ramda';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { getFormChangePasswordResolver, getFormChangePasswordSchema } from './zodResolver';
import { Form } from '~/overrides/@remix-run/react';
import { useRemixForm } from '~/overrides/RemixJS/client';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';
import { Field, InputPassword, useDeepCompareEffect } from '~/shared/ReactJS';
import { FormMutationStateValues } from '~/shared/TypescriptUtilities';

export type ProfileFormChangePasswordValues = TypeOf<ReturnType<typeof getFormChangePasswordSchema>>;
export type ProfileFormChangePasswordStateValues = FormMutationStateValues<ProfileFormChangePasswordValues>;

export interface ProfileFormChangePasswordProps {
  uid: string;
  isSubmitting: boolean;
  defaultValues: ProfileFormChangePasswordStateValues;
  fieldsError?: FieldsErrorOfForm<ProfileFormChangePasswordValues>;
  onSubmit?: (values: ProfileFormChangePasswordValues) => void;
  disabled?: boolean;
}

export interface ProfileFormChangePasswordActions {
  isDirty: () => boolean;
}

export const ProfileFormChangePassword = forwardRef<ProfileFormChangePasswordActions, ProfileFormChangePasswordProps>(
  (props, ref) => {
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
    } = useRemixForm<ProfileFormChangePasswordStateValues>({
      mode: 'onSubmit',
      submitHandlers: {
        onValid: onSubmit as any,
      },
      defaultValues: {
        ...defaultValues,
      },
      resolver: getFormChangePasswordResolver(t),
    });
    const [oldPassword, newPassword, confirmPassword] = watch(['oldPassword', 'newPassword', 'confirmPassword']);

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
          <Field label={t('profile:old_password')} error={errors.oldPassword?.message}>
            <InputPassword
              disabled={disabledField}
              value={oldPassword ?? ''}
              placeholder={t('profile:old_password')}
              onChange={value => {
                return setValue('oldPassword', value);
              }}
            />
          </Field>
          <Field label={t('profile:new_password')} error={errors.newPassword?.message}>
            <InputPassword
              disabled={disabledField}
              value={newPassword ?? ''}
              placeholder={t('profile:new_password')}
              onChange={value => {
                return setValue('newPassword', value);
              }}
            />
          </Field>
          <Field label={t('profile:confirm_password')} error={errors.confirmPassword?.message}>
            <InputPassword
              disabled={disabledField}
              value={confirmPassword ?? ''}
              placeholder={t('profile:confirm_password')}
              onChange={value => {
                return setValue('confirmPassword', value);
              }}
            />
          </Field>
        </div>
      </Form>
    );
  },
);

ProfileFormChangePassword.displayName = 'ProfileFormChangePassword';

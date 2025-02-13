import { MailOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { getFormForgotPasswordResolver, getFormForgotPasswordSchema } from './zodResolver';
import { Form } from '~/overrides/@remix-run/react';
import { useRemixForm } from '~/overrides/RemixJS/client';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';
import { Button, Field, Input, useDeepCompareEffect } from '~/shared/ReactJS';
import { FormMutationStateValues } from '~/shared/TypescriptUtilities';

export type FormForgotPasswordValues = TypeOf<ReturnType<typeof getFormForgotPasswordSchema>>;
export type FormForgotPasswordStateValues = FormMutationStateValues<FormForgotPasswordValues>;

export interface Props {
  isSubmitting: boolean;
  fieldsError?: FieldsErrorOfForm<FormForgotPasswordValues>;
}

export const FormForgotPassword: FC<Props> = ({ isSubmitting, fieldsError = {} }) => {
  const { t } = useTranslation(['auth']);

  const {
    setValue,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useRemixForm<FormForgotPasswordStateValues>({
    resolver: getFormForgotPasswordResolver(t),
    defaultValues: {
      email: undefined,
    },
  });
  const [email] = watch(['email']);

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

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <div className="mb-3">
        <Field label={t('auth:email')} error={errors.email}>
          <Input
            disabled={isSubmitting}
            placeholder={t('auth:email')}
            prefix={<MailOutlined />}
            value={email}
            onChange={value => {
              return setValue('email', value);
            }}
          />
        </Field>
      </div>
      <Button block color="primary" htmlType="submit" loading={isSubmitting}>
        {t('auth:continue')}
      </Button>
    </Form>
  );
};

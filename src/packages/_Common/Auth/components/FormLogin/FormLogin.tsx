import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormLoginStateValues, FormLoginValues, getFormLoginResolver } from './zodResolver';
import { Form, Link } from '~/overrides/@remix-run/react';
import { useRemixForm } from '~/overrides/RemixJS/client';
import { FieldsErrorOfForm } from '~/overrides/RemixJS/types';
import { Button, Checkbox, Field, Input, InputPassword, useDeepCompareEffect } from '~/shared/ReactJS';

export interface Props {
  isLoggingIn: boolean;
  fieldsError?: FieldsErrorOfForm<FormLoginValues>;
}

export const FormLogin: FC<Props> = ({ isLoggingIn, fieldsError = {} }) => {
  const { t } = useTranslation(['auth']);

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useRemixForm<FormLoginStateValues>({
    resolver: getFormLoginResolver(t),
    defaultValues: {
      email: 'dmsthp2023@gmail.com',
      password: 'Admin@123',
      remember: true,
    },
  });
  const [email, password, remember] = watch(['email', 'password', 'remember']);

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
      <div className="mb-4">
        <Field label={t('auth:email')} error={errors.email?.message}>
          <Input
            disabled={isLoggingIn}
            placeholder={t('auth:email')}
            value={email}
            onChange={value => {
              return setValue('email', value);
            }}
          />
        </Field>
      </div>

      <div className="mb-2">
        <Field label={t('auth:password')} error={errors.password?.message}>
          <InputPassword
            disabled={isLoggingIn}
            placeholder={t('auth:password')}
            value={password}
            onChange={value => {
              return setValue('password', value);
            }}
          />
        </Field>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <Checkbox
          disabled={isLoggingIn}
          checked={!!remember}
          onChange={value => {
            return setValue('remember', value);
          }}
        >
          {t('auth:remember_me')}
        </Checkbox>
        <Link to="/forgot-password" className="hover:underline">
          {t('auth:forgot_password')}
        </Link>
      </div>
      <Button block color="primary" htmlType="submit" loading={isLoggingIn}>
        {t('auth:login')}
      </Button>
    </Form>
  );
};

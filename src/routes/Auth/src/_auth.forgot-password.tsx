import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { ActionFunctionArgs, json, TypedResponse } from '~/overrides/@remix-run/node';
import { useActionData, useNavigation } from '~/overrides/@remix-run/react';
import { getValidatedFormData } from '~/overrides/RemixJS/server';
import {
  FormForgotPassword,
  FormForgotPasswordValues,
} from '~/packages/_Common/Auth/components/FormForgotPassword/FormForgotPassword';
import { getFormForgotPasswordResolver } from '~/packages/_Common/Auth/components/FormForgotPassword/zodResolver';
import { requestResetPassword } from '~/packages/_Common/Auth/services/requestResetPassword';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { notification } from '~/shared/ReactJS';
import { ToActionResponse } from '~/types/ToActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export type ActionResponse = ToActionResponse<undefined, FormForgotPasswordValues>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['auth']);

  const { data, errors } = await getValidatedFormData<FormForgotPasswordValues>(
    request,
    getFormForgotPasswordResolver(t),
  );
  try {
    if (data) {
      await requestResetPassword({
        remixRequest,
        email: data.email,
      });
      return json({
        hasError: false,
        info: undefined,
        message: 'Success',
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    console.log('Auth Login:: ', error);
    return handleCatchClauseAsSimpleResponse(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['auth']);

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'loading' || navigation.state === 'submitting';

  useEffect(() => {
    if (!actionData) {
      return;
    }
    if (actionData?.hasError) {
      notification.error({
        message: t('auth:ForgotPassword.request_error'),
        description: handleGetMessageToToast(t, actionData),
      });
    } else {
      notification.success({
        message: t('auth:ForgotPassword.request_success'),
        description: t('auth:ForgotPassword.request_success_description'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 text-center text-2xl font-medium text-neutral-600 lg:text-left">
          {t('auth:ForgotPassword.title')}
        </div>
        <div className="text-center text-sm text-neutral-500 lg:text-left">{t('auth:ForgotPassword.description')}</div>
      </div>
      <FormForgotPassword isSubmitting={isSubmitting} fieldsError={actionData?.fieldsError} />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;

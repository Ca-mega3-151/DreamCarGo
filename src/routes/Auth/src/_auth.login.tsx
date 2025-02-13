import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { ActionFunctionArgs, json } from '~/overrides/@remix-run/node';
import { useActionData, useNavigation, useSearchParams } from '~/overrides/@remix-run/react';
import { getValidatedFormData } from '~/overrides/RemixJS/server';
import { FormLogin } from '~/packages/_Common/Auth/components/FormLogin/FormLogin';
import { FormLoginValues, getFormLoginResolver } from '~/packages/_Common/Auth/components/FormLogin/zodResolver';
import { SessionExpiredParams } from '~/packages/_Common/Auth/constants/SessionExpired';
import { login } from '~/packages/_Common/Auth/services/login';
import { authSessionStorage } from '~/packages/_Common/Auth/utils/sessionStorage';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { notification } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { ToActionResponse } from '~/types/ToActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export type ActionResponse = ToActionResponse<undefined, FormLoginValues>;
export const action = async (remixRequest: ActionFunctionArgs) => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['auth']);

  const { data, errors } = await getValidatedFormData<FormLoginValues>(request, getFormLoginResolver(t));

  const redirectTo = new URL(request.url).searchParams.get('redirectTo');
  try {
    if (data) {
      const loginResponse = await login({ password: data.password, email: data.email, remixRequest });
      return authSessionStorage.createSession({
        request,
        redirectTo: redirectTo ?? '/dashboard',
        remember: data?.remember ?? false,
        sessionData: {
          accessToken: [loginResponse.data.payload.type, loginResponse.data.payload.accessToken].join(' '),
          refreshToken: loginResponse.data.payload.refreshToken,
          profile: {
            avatar: '',
            fullName: loginResponse.data.member.memberName,
          },
        },
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
  const [currentUrlSearchParams] = useSearchParams();

  const isSubmitting = navigation.state === 'loading' || navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.hasError) {
      notification.error({
        message: t('auth:login_error'),
        description: handleGetMessageToToast(t, actionData),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useEffect(() => {
    if (currentUrlSearchParams.get(SessionExpiredParams) !== null) {
      notification.error({ message: t('auth:session_expired') });
      currentUrlSearchParams.delete(SessionExpiredParams);
      updateURLSearchParamsOfBrowserWithoutNavigation(currentUrlSearchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrlSearchParams]);

  return <FormLogin isLoggingIn={isSubmitting} />;
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;

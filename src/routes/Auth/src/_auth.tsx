import { isEmpty } from 'ramda';
import { useTranslation } from 'react-i18next';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { AuthLayout } from '~/layouts/AuthLayout/AuthLayout';
import { redirect, type LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { authSessionStorage } from '~/packages/_Common/Auth/utils/sessionStorage';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authSessionStorage.getSession(request);
  const { searchParams } = new URL(request.url);
  if (!isEmpty(session.data)) {
    throw redirect(searchParams.get('redirectTo') ?? '/');
  }
  return null;
};

export const Page = () => {
  const { t } = useTranslation(['auth']);

  return <AuthLayout title={t('auth:Welcome.title')} description={t('auth:Welcome.description')} />;
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;

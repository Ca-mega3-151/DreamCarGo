import { useEffect } from 'react';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { DashboardLayout } from '~/layouts/DashboardLayout/DashboardLayout';
import { LoaderFunctionArgs, TypedResponse } from '~/overrides/@remix-run/node';
import { json, redirect } from '~/overrides/@remix-run/node';
import { useLoaderData } from '~/overrides/@remix-run/react';
import { SessionExpiredFullUrl } from '~/packages/_Common/Auth/constants/SessionExpired';
import { SessionData } from '~/packages/_Common/Auth/models/SessionData';
import { authSessionStorage } from '~/packages/_Common/Auth/utils/sessionStorage';
import { getProfile } from '~/packages/_Common/Profile/services/getProfile';
import { fetchApiClient } from '~/utils/fetchApi/fetchApi.client';

export interface LoaderResponse {
  sessionData: SessionData;
}

export const loader = async (remixRequest: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  const { request } = remixRequest;
  const sessionData = await authSessionStorage.guard({ request });
  try {
    const response = await getProfile({ remixRequest });
    sessionData.set('profile', {
      avatar: '',
      fullName: response.data.member.memberName,
    });
    const headers = await authSessionStorage.commitSessionAsHeaders(sessionData);

    return json({ sessionData: sessionData.data }, { headers });
  } catch (error) {
    console.log('DashboardLayout:: ', error);
    return redirect(SessionExpiredFullUrl);
  }
};

export const Page = () => {
  const { sessionData } = useLoaderData<typeof loader>();
  useEffect(() => {
    fetchApiClient.setAccessToken = () => {
      return sessionData.accessToken;
    };
    fetchApiClient.setRefreshToken = () => {
      return sessionData.refreshToken;
    };
  }, [sessionData]);

  if (sessionData) {
    return <DashboardLayout sessionData={sessionData} />;
  }
  return <PageErrorBoundary />;
};

export const ErrorBoundary = PageErrorBoundary;

export const routeId = '_dashboard';

export default Page;

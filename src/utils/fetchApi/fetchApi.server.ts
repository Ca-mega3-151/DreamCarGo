import { getPublicEnv } from '../functions/getPublicEnv';
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '~/overrides/@remix-run/node';
import { authSessionStorage } from '~/packages/_Common/Auth/utils/sessionStorage';
import { action } from '~/routes/Auth/src/_auth.refresh-token';
import { FetchAPI } from '~/shared/Utilities';

export const fetchApiServer = async ({ request }: LoaderFunctionArgs | ActionFunctionArgs) => {
  const session = await authSessionStorage.getSession(request);
  const fetchApi = new FetchAPI({
    baseConfig: {
      baseURL: getPublicEnv('VITE_API_BASE_URL'),
    },
    refreshTokenConfig: {
      request: async ({ accessToken, refreshToken }) => {
        const response = await action({
          request: new Request('/refresh-token', {
            method: 'POST',
            body: JSON.stringify({ accessToken, refreshToken }),
          }),
          params: {},
        }).then(value => {
          if (value) {
            return value.json();
          }
          return;
        });
        return response;
      },
      success: response => {
        console.log('Fetch API Server::  Token refreshed successfully!', response?.info);
        fetchApi.setAccessToken = () => {
          return response?.info.session.accessToken ?? '';
        };
        fetchApi.setRefreshToken = () => {
          return response?.info.session.refreshToken ?? '';
        };
      },
      failure: () => {
        console.log('Fetch API Server:: Token refreshed failure!');
        throw redirect('/login');
      },
      setRefreshCondition: error => {
        return error.response?.status === 403;
      },
    },
    setConditionApplyAccessToken: () => {
      return true;
    },
    setAccessToken: () => {
      return session.data.accessToken ?? '';
    },
    setRefreshToken: () => {
      return session.data.refreshToken ?? '';
    },
  });

  return fetchApi;
};

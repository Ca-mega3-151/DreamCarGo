import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf, object, string } from 'zod';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix-run/node';
import { validateFormData } from '~/overrides/RemixJS/server';
import { SessionData } from '~/packages/_Common/Auth/models/SessionData';
import { refreshToken } from '~/packages/_Common/Auth/services/refreshToken';
import { authSessionStorage } from '~/packages/_Common/Auth/utils/sessionStorage';

export interface RefreshTokenResponse {
  message: string;
  hasError: boolean;
  error?: string;
  info: {
    session: SessionData;
  };
}

const refreshTokenSchema = object({
  accessToken: string(),
  refreshToken: string(),
});
export type RefreshTokenData = TypeOf<typeof refreshTokenSchema>;

export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<RefreshTokenResponse> | void> => {
  const { request } = remixRequest;
  try {
    const refreshTokenData: RefreshTokenData = await request.json();
    const newSession = await authSessionStorage.getSession(request);
    const { data } = await validateFormData<RefreshTokenData>(refreshTokenData, zodResolver(refreshTokenSchema));
    if (data) {
      const response = await refreshToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        remixRequest,
      });

      newSession.set('accessToken', [response.data.payload.type, response.data.payload.accessToken].join(' '));
      newSession.set('refreshToken', response.data.payload.refreshToken);
      newSession.set('profile', {
        avatar: '',
        fullName: response.data.member.memberName,
      });
      const headers = await authSessionStorage.commitSessionAsHeaders(newSession);

      return json(
        {
          hasError: false,
          message: 'Token refreshed',
          info: {
            session: newSession.data as SessionData,
          },
        },
        { headers },
      );
    }
  } catch (error) {
    console.log('Auth Refresh Token:: ', error);
    return redirect('/login');
  }
};

export const loader = () => {
  return redirect('/dashboard');
};

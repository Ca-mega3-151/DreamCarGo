import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { getFetchApiInstance } from '~/utils/fetchApi/getFetchApiInstance';

interface ResponseData {
  member: {
    _id: string;
    merchantCode: string;
    memberCode: string;
    email: string;
    memberName: string;
    phone: string;
    roleSample: string;
    role: string;
    gender: string;
    position: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  payload: {
    type: string;
    accessToken: string;
    refreshToken: string;
  };
}

interface RefreshToken {
  refreshToken: string;
  accessToken: string;
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
}

export const refreshToken = async ({ refreshToken, accessToken, remixRequest }: RefreshToken) => {
  const fetch = await getFetchApiInstance({ remixRequest });
  const response = await fetch.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: '/authz/refresh-token',
    method: 'POST',
    data: { refreshToken, accessToken },
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};

import { Profile } from '../models/Profile';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { getFetchApiInstance } from '~/utils/fetchApi/getFetchApiInstance';

interface ResponseData {
  member: Profile;
}

interface GetProfile {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
}

export const getProfile = async ({ remixRequest }: GetProfile) => {
  const fetch = await getFetchApiInstance({ remixRequest });
  const response = await fetch.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: '/authz/profile',
    method: 'GET',
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};

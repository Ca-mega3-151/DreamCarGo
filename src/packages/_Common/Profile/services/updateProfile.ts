import { Profile } from '../models/Profile';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { getFetchApiInstance } from '~/utils/fetchApi/getFetchApiInstance';

export interface UpdateProfile {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {};
}

type ResponseData = Profile;

export const updateProfile = async ({ remixRequest, data }: UpdateProfile) => {
  const fetchApi = await getFetchApiInstance({ remixRequest });

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/authz/profile`,
    method: 'PUT',
    data,
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};

import { Branding } from '../models/Branding';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { getFetchApiInstance } from '~/utils/fetchApi/getFetchApiInstance';

interface ResponseData {}

interface DeleteBrandings {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  brandingCodes: Array<Branding['brandingCode']>;
}
export const deleteBrandings = async ({ remixRequest, brandingCodes }: DeleteBrandings) => {
  const fetchApi = await getFetchApiInstance({ remixRequest });

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: '/merchants/category/branding',
    method: 'DELETE',
    data: {
      brandingCodes,
    },
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};

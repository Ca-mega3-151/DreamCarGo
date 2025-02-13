import { Branding } from '../models/Branding';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { getFetchApiInstance } from '~/utils/fetchApi/getFetchApiInstance';

export interface GetBranding {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    brandingCode: Branding['brandingCode'];
  };
}

type ResponseData = Branding;

export const getBranding = async ({ remixRequest, data }: GetBranding) => {
  const fetchApi = await getFetchApiInstance({ remixRequest });

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/branding/${data.brandingCode}`,
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};

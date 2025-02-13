import { GetBrandings } from './getBrandings';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getSearchParams } from '~/services/utils/getSearchParams';
import { getSortParams } from '~/services/utils/getSortParams';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { getFetchApiInstance } from '~/utils/fetchApi/getFetchApiInstance';

type ResponseData = any;

interface ExportBrandings extends Omit<GetBrandings, 'page' | 'pageSize'> {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
}
export const exportBrandings = async ({
  remixRequest,
  searcher,
  sorter,
}: ExportBrandings): Promise<ResponseDetailSuccess<ResponseData>> => {
  const fetchApi = await getFetchApiInstance({ remixRequest });

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: '/merchants/category/branding/export',
    responseType: 'blob',
    params: {
      ...getSearchParams(searcher),
      ...getSortParams(sorter),
    },
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};

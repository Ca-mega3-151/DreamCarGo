import { Branding } from '../models/Branding';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/@remix-run/node';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { ResponseFailure, ResponseListSuccess } from '~/services/types/Response';
import { Searcher, Sorter } from '~/services/types/SearchParams';
import { getSearchParams } from '~/services/utils/getSearchParams';
import { getSortParams } from '~/services/utils/getSortParams';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { getFetchApiInstance } from '~/utils/fetchApi/getFetchApiInstance';

type ResponseData = Branding;

export interface GetBrandings {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  page: number | undefined;
  pageSize: number | undefined;
  sorter: Sorter<ResponseData>;
  searcher: Searcher<ResponseData>;
}
export const getBrandings = async ({
  remixRequest,
  page = 1,
  pageSize = RecordsPerPage,
  searcher,
  sorter,
}: GetBrandings): Promise<ResponseListSuccess<ResponseData>> => {
  const fetchApi = await getFetchApiInstance({ remixRequest });

  const response = await fetchApi.request<ResponseListSuccess<ResponseData> | ResponseFailure>({
    url: '/merchants/category/branding',
    params: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseListSuccess<ResponseData>;
};

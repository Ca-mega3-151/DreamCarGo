import { ActionFunctionArgs, TypedResponse } from '~/overrides/@remix-run/node';
import { json } from '~/overrides/@remix-run/node';
import { exportBrandings } from '~/packages/Branding/services/exportBrandings';
import { brandingListingUrlSearchParamsUtils } from '~/packages/Branding/utils/listingUrlSearchParams';
import { SearcherOperator } from '~/services/constants/SearcherOperator';
import { ToActionResponse } from '~/types/ToActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccess } from '~/utils/functions/isCan/isCanAccessRoute';

export type ExportBrandingsActionResponse = ToActionResponse<undefined, {}>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<ExportBrandingsActionResponse>> => {
  isCanAccess({});
  const { request } = remixRequest;
  const { search, filter, sorter } = brandingListingUrlSearchParamsUtils.decrypt(request);
  try {
    await exportBrandings({
      remixRequest,
      sorter: {
        brandingCode: sorter?.brandingCode,
      },
      searcher: {
        status: { operator: SearcherOperator.Eq, value: filter?.status },
        brandingCode: { operator: SearcherOperator.Contains, value: filter?.brandingCode ?? search },
        brandingName: { operator: SearcherOperator.Contains, value: search },
      },
    });
    return json({
      hasError: false,
      message: 'Removed',
      info: undefined,
    });
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

import { ActionFunctionArgs, TypedResponse } from '~/overrides/@remix-run/node';
import { json } from '~/overrides/@remix-run/node';
import { deleteBrandings } from '~/packages/Branding/services/deleteBrandings';
import { brandingDeleteUrlSearchParamsUtils } from '~/packages/Branding/utils/deleteUrlSearchParams';
import { ToActionResponse } from '~/types/ToActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccess } from '~/utils/functions/isCan/isCanAccessRoute';

export type DeleteBrandingsActionResponse = ToActionResponse<undefined, {}>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<DeleteBrandingsActionResponse>> => {
  isCanAccess({});
  const { request } = remixRequest;
  const { brandingCodes = [] } = brandingDeleteUrlSearchParamsUtils.decrypt(request);
  try {
    await deleteBrandings({ remixRequest, brandingCodes });
    return json({
      hasError: false,
      message: 'Removed',
      info: undefined,
    });
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

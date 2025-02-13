import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { ActionFunctionArgs, json, TypedResponse } from '~/overrides/@remix-run/node';
import { validateFormData } from '~/overrides/RemixJS/server';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingFormMutationValues } from '~/packages/Branding/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/Branding/components/FormMutation/zodResolver';
import { Branding } from '~/packages/Branding/models/Branding';
import { createBranding } from '~/packages/Branding/services/createBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { ToActionResponse } from '~/types/ToActionResponse';
import { fetcherFormData } from '~/utils/functions/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { isCanAccess } from '~/utils/functions/isCan/isCanAccessRoute';

export type CreateBrandingActionResponse = ToActionResponse<Pick<Branding, '_id'>, BrandingFormMutationValues>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<CreateBrandingActionResponse>> => {
  isCanAccess({});
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['branding']);
    const { errors, data } = await validateFormData<BrandingFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await createBranding({
        remixRequest,
        data: brandingFormMutationValuesToCreateBrandingService(data),
      });

      return json({
        hasError: false,
        message: 'Created',
        info: undefined,
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

export const ErrorBoundary = PageErrorBoundary;

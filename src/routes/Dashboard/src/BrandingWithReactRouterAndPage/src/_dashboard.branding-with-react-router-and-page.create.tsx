import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ListingBrandingWithReactRouterAndPageBaseUrl } from './constants/BaseUrl';
import { BoxFields } from '~/components/BoxFields';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter, MutationHeader } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { ActionFunctionArgs, json, TypedResponse } from '~/overrides/@remix-run/node';
import { useActionData, useNavigate, useNavigation } from '~/overrides/@remix-run/react';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import { getValidatedFormData } from '~/overrides/RemixJS/server';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import {
  BrandingFormMutation,
  BrandingFormMutationActions,
  BrandingFormMutationValues,
} from '~/packages/Branding/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/Branding/components/FormMutation/zodResolver';
import { Branding } from '~/packages/Branding/models/Branding';
import { createBranding } from '~/packages/Branding/services/createBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { brandingModelToDefaultValuesOfFormMutation } from '~/packages/Branding/utils/brandingModelToDefaultValuesOfFormMutation';
import { notification } from '~/shared/ReactJS';
import { ToActionResponse } from '~/types/ToActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccess } from '~/utils/functions/isCan/isCanAccessRoute';

export type CreateBrandingActionResponse = ToActionResponse<Pick<Branding, '_id'>, BrandingFormMutationValues>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<CreateBrandingActionResponse>> => {
  isCanAccess({});
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['branding']);
    const { errors, data } = await getValidatedFormData<BrandingFormMutationValues>(
      request,
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

const FormCreateUid = 'FormCreateUid';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['branding', 'common']);

  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';
  const isSubmitting = navigation.state === 'submitting';

  const actionData = useActionData<typeof action>();

  const defaultValues = useMemo(() => {
    return brandingModelToDefaultValuesOfFormMutation({ branding: undefined });
  }, []);

  //#region Confirm back when form is dirty
  const formActionsRef = useRef<BrandingFormMutationActions | null>(null);
  const isReadyNavigateAfterSubmit = useRef<boolean>(false);
  const { cancelNavigation, confirmNavigation, showPrompt } = useCallbackPrompt({
    whenEnableForBrowser: () => {
      return !!formActionsRef.current?.isDirty();
    },
    whenEnableForReactRouter: ({ currentLocation, nextLocation }) => {
      if (isReadyNavigateAfterSubmit.current) {
        return false;
      }
      return currentLocation.pathname !== nextLocation.pathname && !!formActionsRef.current?.isDirty();
    },
  });

  const handleConfirmBack = confirmNavigation;
  const handleCancelback = () => {
    cancelNavigation();
  };
  //#endregion

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('common:create_error'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        isReadyNavigateAfterSubmit.current = true;
        notification.success({ message: t('common:create_success') });
        navigate(ListingBrandingWithReactRouterAndPageBaseUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="flex h-full flex-col">
      <MutationHeader
        title={t('common:create_title')}
        onBack={() => {
          return navigate(ListingBrandingWithReactRouterAndPageBaseUrl);
        }}
      />
      <div className="mb-4 flex-1">
        <BoxFields>
          <BrandingFormMutation
            ref={formActionsRef}
            disabled={isNavigating}
            isSubmitting={isSubmitting}
            uid={FormCreateUid}
            defaultValues={defaultValues}
          />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isSubmitting}
        okProps={{
          form: FormCreateUid,
          htmlType: 'submit',
          disabled: isNavigating,
        }}
        onCancel={() => {
          return navigate(ListingBrandingWithReactRouterAndPageBaseUrl);
        }}
      />
      <ModalConfirmNavigate
        confirmLoading={isNavigating}
        open={showPrompt}
        onOk={handleConfirmBack}
        onCancel={handleCancelback}
      />
    </div>
  );
};

export default Page;

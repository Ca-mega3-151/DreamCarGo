import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ListingBrandingWithReactRouterAndPageBaseUrl } from './constants/BaseUrl';
import { BoxFields } from '~/components/BoxFields';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter, MutationHeader } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect, TypedResponse } from '~/overrides/@remix-run/node';
import { useActionData, useLoaderData, useNavigate, useNavigation } from '~/overrides/@remix-run/react';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import { getValidatedFormData } from '~/overrides/RemixJS/server';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingEdit } from '~/packages/Branding/components/Edit/Edit';
import {
  BrandingFormMutationActions,
  BrandingFormMutationValues,
} from '~/packages/Branding/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/Branding/components/FormMutation/zodResolver';
import { Branding } from '~/packages/Branding/models/Branding';
import { getBranding } from '~/packages/Branding/services/getBranding';
import { updateBranding } from '~/packages/Branding/services/updateBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { notification } from '~/shared/ReactJS';
import { ToActionResponse } from '~/types/ToActionResponse';
import { ToLoaderResponse } from '~/types/ToLoaderResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccess } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditBrandingActionResponse = ToActionResponse<Pick<Branding, '_id'>, BrandingFormMutationValues>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditBrandingActionResponse>> => {
  isCanAccess({});
  const { request, params } = remixRequest;
  if (!params['brandingCode']) {
    return redirect(ListingBrandingWithReactRouterAndPageBaseUrl);
  }
  try {
    const t = await i18nServer.getFixedT(request, ['branding']);
    const { errors, data } = await getValidatedFormData<BrandingFormMutationValues>(
      request,
      getFormMutationResolver(t),
    );
    if (data) {
      await updateBranding({
        remixRequest,
        data: {
          ...brandingFormMutationValuesToCreateBrandingService(data),
          brandingCode: params['brandingCode'],
        },
      });

      return json({
        hasError: false,
        message: 'Saved',
        info: undefined,
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

type LoaderResponse = ToLoaderResponse<{ branding: Branding }>;
export const loader = async (remixRequest: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  isCanAccess({});
  const { params } = remixRequest;
  if (!params['brandingCode']) {
    return redirect('/404');
  }
  try {
    const response = await getBranding({
      remixRequest,
      data: {
        brandingCode: params['brandingCode'],
      },
    });
    return json({
      info: {
        branding: response.data,
      },
      hasError: false,
      message: '',
    });
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

export const shouldRevalidate = preventRevalidateOnEditPage;

export const ErrorBoundary = PageErrorBoundary;

const FormUpdateUid = 'FormUpdateUid';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['branding', 'common']);

  const navigation = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const isNavigating = navigation.state === 'loading';
  const isSubmitting = navigation.state === 'submitting';

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
          message: t('common:save_error'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        isReadyNavigateAfterSubmit.current = true;
        notification.success({ message: t('common:save_success') });
        navigate(ListingBrandingWithReactRouterAndPageBaseUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="flex h-full flex-col">
      <MutationHeader
        title={t('common:edit_title')}
        onBack={() => {
          return navigate(ListingBrandingWithReactRouterAndPageBaseUrl);
        }}
      />
      <div className="mb-4 flex-1">
        <BoxFields>
          <BrandingEdit
            ref={formActionsRef}
            disabled={isNavigating}
            isSubmitting={isSubmitting}
            uid={FormUpdateUid}
            branding={loaderData.info?.branding}
          />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isSubmitting}
        okProps={{
          form: FormUpdateUid,
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

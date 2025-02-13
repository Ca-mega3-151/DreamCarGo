import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ListingBrandingWithHookAndPageBaseUrl } from './constants/BaseUrl';
import { BoxFields } from '~/components/BoxFields';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter, MutationHeader } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { useUpdate } from '~/hooks/useCRUD/useUpdate';
import { json, LoaderFunctionArgs, redirect, TypedResponse } from '~/overrides/@remix-run/node';
import { useLoaderData, useNavigate, useNavigation } from '~/overrides/@remix-run/react';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import { BrandingEdit } from '~/packages/Branding/components/Edit/Edit';
import {
  BrandingFormMutationActions,
  BrandingFormMutationValues,
} from '~/packages/Branding/components/FormMutation/FormMutation';
import { Branding } from '~/packages/Branding/models/Branding';
import { getBranding } from '~/packages/Branding/services/getBranding';
import { updateBranding } from '~/packages/Branding/services/updateBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { ToLoaderResponse } from '~/types/ToLoaderResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccess } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

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
  const isNavigating = navigation.state === 'loading';

  const loaderData = useLoaderData<typeof loader>();

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

  const { recordState, isUpdating, handleUpdate } = useUpdate<BrandingFormMutationValues, Branding, Branding>({
    record: loaderData.info?.branding,
    update: async ({ formValues, record }) => {
      const response = await updateBranding({
        data: {
          ...brandingFormMutationValuesToCreateBrandingService(formValues),
          brandingCode: record.brandingCode,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      isReadyNavigateAfterSubmit.current = true;
      navigate(ListingBrandingWithHookAndPageBaseUrl);
    },
  });

  return (
    <div className="flex h-full flex-col">
      <MutationHeader
        title={t('common:edit_title')}
        onBack={() => {
          return navigate(ListingBrandingWithHookAndPageBaseUrl);
        }}
      />
      <div className="mb-4 flex-1">
        <BoxFields>
          <BrandingEdit
            onSubmit={handleUpdate}
            ref={formActionsRef}
            disabled={isNavigating}
            isSubmitting={isUpdating}
            uid={FormUpdateUid}
            branding={recordState}
          />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isUpdating}
        okProps={{
          form: FormUpdateUid,
          htmlType: 'submit',
          disabled: isNavigating,
        }}
        onCancel={() => {
          return navigate(ListingBrandingWithHookAndPageBaseUrl);
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

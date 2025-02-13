import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ListingBrandingWithHookAndPageBaseUrl } from './constants/BaseUrl';
import { BoxFields } from '~/components/BoxFields';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter, MutationHeader } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { useCreate } from '~/hooks/useCRUD/useCreate';
import { useNavigate, useNavigation } from '~/overrides/@remix-run/react';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import {
  BrandingFormMutation,
  BrandingFormMutationActions,
  BrandingFormMutationValues,
} from '~/packages/Branding/components/FormMutation/FormMutation';
import { Branding } from '~/packages/Branding/models/Branding';
import { createBranding } from '~/packages/Branding/services/createBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { brandingModelToDefaultValuesOfFormMutation } from '~/packages/Branding/utils/brandingModelToDefaultValuesOfFormMutation';

export const ErrorBoundary = PageErrorBoundary;

const FormCreateUid = 'FormCreateUid';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['branding', 'common']);

  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

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

  const defaultValues = useMemo(() => {
    return brandingModelToDefaultValuesOfFormMutation({ branding: undefined });
  }, []);
  const { isCreating, handleCreate } = useCreate<BrandingFormMutationValues, Branding>({
    create: async formValues => {
      const response = await createBranding({
        data: brandingFormMutationValuesToCreateBrandingService(formValues),
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
        title={t('common:create_title')}
        onBack={() => {
          return navigate(ListingBrandingWithHookAndPageBaseUrl);
        }}
      />
      <div className="mb-4 flex-1">
        <BoxFields>
          <BrandingFormMutation
            onSubmit={handleCreate}
            ref={formActionsRef}
            disabled={isNavigating}
            isSubmitting={isCreating}
            uid={FormCreateUid}
            defaultValues={defaultValues}
          />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isCreating}
        okProps={{
          form: FormCreateUid,
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

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { ActionFunctionArgs, LoaderFunctionArgs, TypedResponse } from '~/overrides/@remix-run/node';
import { BoxFields } from '~/components/BoxFields';
import { ListingHeader } from '~/components/Listing';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json } from '~/overrides/@remix-run/node';
import { useActionData, useLoaderData, useNavigation } from '~/overrides/@remix-run/react';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import { getValidatedFormData } from '~/overrides/RemixJS/server';
import { SimpleLoaderResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import {
  ProfileFormMutation,
  ProfileFormMutationActions,
  ProfileFormMutationValues,
} from '~/packages/_Common/Profile/components/FormMutation/FormMutation';
import { getFormMutationProfileResolver } from '~/packages/_Common/Profile/components/FormMutation/zodResolver';
import { Profile } from '~/packages/_Common/Profile/models/Profile';
import { getProfile } from '~/packages/_Common/Profile/services/getProfile';
import { updateProfile } from '~/packages/_Common/Profile/services/updateProfile';
import { profileFormMutationValuesToCreateService } from '~/packages/_Common/Profile/utils/formMutationValuesToCreateService';
import { profileModelToDefaultValuesOfFormMutation } from '~/packages/_Common/Profile/utils/modelToDefaultValuesOfFormMutation';
import { notification } from '~/shared/ReactJS';
import { ToActionResponse } from '~/types/ToActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditProfileActionResponse = ToActionResponse<Pick<Profile, '_id'>, ProfileFormMutationValues>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditProfileActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['profile']);
    const { errors, data } = await getValidatedFormData<ProfileFormMutationValues>(
      request,
      getFormMutationProfileResolver(t),
    );
    if (data) {
      await updateProfile({
        remixRequest,
        data: {
          ...profileFormMutationValuesToCreateService(data),
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

type LoaderResponse = SimpleLoaderResponse<{ profile: Profile }>;
export const loader = async (remixRequest: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  try {
    const response = await getProfile({ remixRequest });
    return json({
      info: {
        profile: response.data.member,
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

const FormUpdateUid = 'FormUpdateProfileUid';
export const Page = () => {
  const { t } = useTranslation(['profile', 'common']);

  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';
  const isSubmitting = navigation.state === 'submitting';

  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  //#region Confirm back when form is dirty
  const formActionsRef = useRef<ProfileFormMutationActions | null>(null);
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
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="flex h-full flex-col">
      <ListingHeader title={t('profile:profile')} />
      <div className="mb-4 flex-1">
        <BoxFields>
          <ProfileFormMutation
            ref={formActionsRef}
            disabled={isNavigating}
            isSubmitting={isSubmitting}
            uid={FormUpdateUid}
            defaultValues={profileModelToDefaultValuesOfFormMutation({
              profile: loaderData.info?.profile,
            })}
          />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isSubmitting}
        okConfirmProps={{
          form: FormUpdateUid,
          htmlType: 'submit',
          disabled: isNavigating,
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

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EditBrandingActionResponse,
  action as actionEditBranding,
} from './_dashboard.branding-with-react-router-and-modal.api.$brandingCode.edit';
import {
  CreateBrandingActionResponse,
  action as actionCreateBranding,
} from './_dashboard.branding-with-react-router-and-modal.api.create';
import {
  DeleteBrandingsActionResponse,
  action as actionDeleteBrandings,
} from './_dashboard.branding-with-react-router-and-modal.api.delete';
import {
  ApiCreateBrandingWithReactRouterAndModalBaseUrl,
  ApiDeleteBrandingsWithModalFullUrl,
  ApiEditBrandingWithReactRouterAndModalFullUrl,
  ListingBrandingWithReactRouterAndModalBaseUrl,
} from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { ModalWithI18n } from '~/components/ModalWithI18n';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json } from '~/overrides/@remix-run/node';
import { useFetcher, useLoaderData } from '~/overrides/@remix-run/react';
import { useListingData } from '~/overrides/RemixJS/client';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingEdit } from '~/packages/Branding/components/Edit/Edit';
import { BrandingFormMutation } from '~/packages/Branding/components/FormMutation/FormMutation';
import { BrandingListingHeader } from '~/packages/Branding/components/Listing/ListingHeader';
import { BrandingListingTable } from '~/packages/Branding/components/Listing/ListingTable';
import { IsCanDelete } from '~/packages/Branding/constants/Is/IsCanDelete';
import { IsCanEdit } from '~/packages/Branding/constants/Is/IsCanEdit';
import { IsCanExport } from '~/packages/Branding/constants/Is/IsCanExport';
import { Branding } from '~/packages/Branding/models/Branding';
import { getBrandings } from '~/packages/Branding/services/getBrandings';
import { brandingModelToDefaultValuesOfFormMutation } from '~/packages/Branding/utils/brandingModelToDefaultValuesOfFormMutation';
import {
  BrandingListingSearchParams,
  brandingListingUrlSearchParamsUtils,
} from '~/packages/Branding/utils/listingUrlSearchParams';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { SearcherOperator } from '~/services/constants/SearcherOperator';
import { SorterOperator } from '~/services/constants/SorterOperator';
import { notification } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { ToListingResponse } from '~/types/ToListingResponse';
import { fetcherFormData } from '~/utils/functions/fetcherFormData';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccess } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async (remixRequest: LoaderFunctionArgs): Promise<TypedResponse<ToListingResponse<Branding>>> => {
  isCanAccess({});
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'branding']);
  const {
    page = 1,
    pageSize = RecordsPerPage,
    search,
    filter,
    sorter,
  } = brandingListingUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getBrandings({
      remixRequest,
      page,
      pageSize,
      searcher: {
        status: { operator: SearcherOperator.Eq, value: filter?.status },
        brandingCode: { operator: SearcherOperator.Contains, value: filter?.brandingCode ?? search },
        brandingName: { operator: SearcherOperator.Contains, value: search },
      },
      sorter: {
        brandingCode: sorter?.brandingCode,
      },
    });

    return json({
      info: {
        hits: response.data.hits,
        pagination: {
          totalPages: response.data.pagination.totalPages,
          totalRecords: response.data.pagination.totalRows,
        },
      },
      page: Math.min(page, response.data.pagination.totalPages || 1),
    });
  } catch (error) {
    return json({
      page,
      info: {
        hits: [],
        pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
      },
      toastMessageError: handleCatchClauseAsMessage({ error, t }),
    });
  }
};

const FormCreate = 'FormCreateBranding';
const FormUpdate = 'FormUpdateBranding';
export const Page = () => {
  const { t } = useTranslation(['branding', 'components', 'common']);

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<Branding[]>([]);
  // #endregion

  //#region Listing
  const paramsInUrl = brandingListingUrlSearchParamsUtils.decrypt(
    brandingListingUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: BrandingListingSearchParams) => {
    const searchParamsToLoader = brandingListingUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load(ListingBrandingWithReactRouterAndModalBaseUrl + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Branding>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => {
      return handleRequest({ page });
    },
  });
  //#endregion

  //#region Delete
  const deleteBrandingFetcher = useFetcher<typeof actionDeleteBrandings>();

  const isDeleting = useMemo(() => {
    return deleteBrandingFetcher.state === 'loading' || deleteBrandingFetcher.state === 'submitting';
  }, [deleteBrandingFetcher]);
  const [isOpenModalDeleteBranding, setIsOpenModalDeleteBranding] = useState<Branding[] | false>(false);

  const handleDelete = () => {
    if (!isOpenModalDeleteBranding) {
      return;
    }
    deleteBrandingFetcher.submit(
      {},
      {
        method: 'DELETE',
        action: ApiDeleteBrandingsWithModalFullUrl(
          isOpenModalDeleteBranding.map(item => {
            return item.brandingCode;
          }),
        ),
      },
    );
  };

  useEffect(() => {
    if (deleteBrandingFetcher.data && deleteBrandingFetcher.state === 'idle') {
      const response = deleteBrandingFetcher.data as DeleteBrandingsActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('common:delete_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('common:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteBranding(false);
        setSelectedRecordsState([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteBrandingFetcher.state]);
  //#endregion

  //#region Create
  const createBrandingFetcher = useFetcher<typeof actionCreateBranding>();

  const [isOpenModalCreateBranding, setIsOpenModalCreateBranding] = useState(false);

  const isCreating = useMemo(() => {
    return createBrandingFetcher.state === 'loading' || createBrandingFetcher.state === 'submitting';
  }, [createBrandingFetcher]);

  useEffect(() => {
    if (createBrandingFetcher.data && createBrandingFetcher.state === 'idle') {
      const response = createBrandingFetcher.data as CreateBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('common:create_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('common:create_success'),
          description: '',
        });
        handleRequest({});
        setIsOpenModalCreateBranding(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBrandingFetcher.state]);

  //#endregion

  //#region Edit
  const editBrandingFetcher = useFetcher<typeof actionEditBranding>();

  const [isOpenModalEditBranding, setIsOpenModalEditBranding] = useState<Branding | null>(null);

  const isEdting = useMemo(() => {
    return editBrandingFetcher.state === 'loading' || editBrandingFetcher.state === 'submitting';
  }, [editBrandingFetcher]);

  useEffect(() => {
    if (editBrandingFetcher.data && editBrandingFetcher.state === 'idle') {
      const response = editBrandingFetcher.data as EditBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('common:save_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('common:save_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalEditBranding(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBrandingFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <BrandingListingHeader
          creatable
          onCreate={() => {
            return setIsOpenModalCreateBranding(true);
          }}
        />
        <BrandingListingTable
          loading={isFetchingList}
          dataSource={data?.info.hits}
          configViews={{
            storageKey: 'BrandingWithReactRouterAndModal',
          }}
          select={{
            selectedRecordsState,
            setSelectedRecordsState,
          }}
          pagination={{
            currentPage: paramsInUrl.page,
            pageSize: paramsInUrl.pageSize ?? RecordsPerPage,
            totalRecords: data?.info.pagination.totalPages,
            onPaginationChange: ({ page, pageSize }) => {
              return handleRequest({ page, pageSize });
            },
          }}
          search={{
            searchValue: paramsInUrl.search,
            onSearch: value => {
              handleRequest({
                page: 1,
                search: value,
              });
            },
          }}
          filter={{
            filterValues: {
              brandingCode: paramsInUrl.filter?.brandingCode,
              status: paramsInUrl.filter?.status,
            },
            onFilterChange: filterValues => {
              handleRequest({
                filter: filterValues,
                page: 1,
              });
            },
          }}
          sorter={{
            sortValues: {
              brandingCode: { order: paramsInUrl.sorter?.brandingCode },
              status: undefined,
            },
            onSortChange: sortValues => {
              handleRequest({
                sorter: {
                  brandingCode: sortValues.brandingCode?.order as SorterOperator,
                },
              });
            },
          }}
          onRefresh={() => {
            return handleRequest({});
          }}
          deleteAction={{
            deletable: isCanShow(IsCanDelete),
            onDelete: data => {
              return setIsOpenModalDeleteBranding([data]);
            },
            onDeleteMany: data => {
              return setIsOpenModalDeleteBranding(data);
            },
          }}
          editAction={{
            editable: isCanShow(IsCanEdit),
            onEdit: data => {
              return setIsOpenModalEditBranding(data);
            },
          }}
          exportAction={{
            exportable: isCanShow(IsCanExport),
            onExport: data => {
              console.log(data);
            },
          }}
        />
      </div>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalCreateBranding}
        onCancel={() => {
          return setIsOpenModalCreateBranding(false);
        }}
        onOk={() => {
          return undefined;
        }}
        title={t('common:create_title')}
        okText={t('components:FormMutation.save')}
        okButtonProps={{
          form: FormCreate,
          htmlType: 'submit',
        }}
        confirmLoading={isCreating}
        width={700}
      >
        <BrandingFormMutation
          fieldsError={createBrandingFetcher.data?.fieldsError}
          uid={FormCreate}
          defaultValues={brandingModelToDefaultValuesOfFormMutation({ branding: undefined })}
          onSubmit={values => {
            createBrandingFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'post',
              action: ApiCreateBrandingWithReactRouterAndModalBaseUrl,
            });
          }}
          isSubmitting={isCreating}
        />
      </ModalWithI18n>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalEditBranding}
        onCancel={() => {
          return setIsOpenModalEditBranding(null);
        }}
        onOk={() => {
          return undefined;
        }}
        title={t('common:edit_title').toString()}
        okText={t('components:FormMutation.save')}
        okButtonProps={{
          form: FormUpdate,
          htmlType: 'submit',
        }}
        confirmLoading={isEdting}
      >
        <BrandingEdit
          fieldsError={editBrandingFetcher.data?.fieldsError}
          uid={FormUpdate}
          branding={isOpenModalEditBranding ?? undefined}
          onSubmit={values => {
            if (!isOpenModalEditBranding?.brandingCode) {
              return;
            }
            editBrandingFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'put',
              action: ApiEditBrandingWithReactRouterAndModalFullUrl({
                brandingCode: isOpenModalEditBranding?.brandingCode,
              }),
            });
          }}
          isSubmitting={isEdting}
        />
      </ModalWithI18n>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDeleteBranding}
        onCancel={() => {
          return setIsOpenModalDeleteBranding(false);
        }}
        onOk={handleDelete}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;

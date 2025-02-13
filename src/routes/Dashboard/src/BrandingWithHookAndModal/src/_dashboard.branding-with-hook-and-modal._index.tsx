import { useTranslation } from 'react-i18next';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { ModalWithI18n } from '~/components/ModalWithI18n';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { useCRUD } from '~/hooks/useCRUD/useCRUD';
import { LoaderFunctionArgs, TypedResponse, json } from '~/overrides/@remix-run/node';
import { useLoaderData } from '~/overrides/@remix-run/react';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingEdit } from '~/packages/Branding/components/Edit/Edit';
import {
  BrandingFormMutation,
  BrandingFormMutationValues,
} from '~/packages/Branding/components/FormMutation/FormMutation';
import { BrandingListingHeader } from '~/packages/Branding/components/Listing/ListingHeader';
import { BrandingListingTable } from '~/packages/Branding/components/Listing/ListingTable';
import { IsCanDelete } from '~/packages/Branding/constants/Is/IsCanDelete';
import { IsCanEdit } from '~/packages/Branding/constants/Is/IsCanEdit';
import { IsCanExport } from '~/packages/Branding/constants/Is/IsCanExport';
import { Branding } from '~/packages/Branding/models/Branding';
import { createBranding } from '~/packages/Branding/services/createBranding';
import { deleteBrandings } from '~/packages/Branding/services/deleteBrandings';
import { exportBrandings } from '~/packages/Branding/services/exportBrandings';
import { getBranding } from '~/packages/Branding/services/getBranding';
import { getBrandings } from '~/packages/Branding/services/getBrandings';
import { updateBranding } from '~/packages/Branding/services/updateBranding';
import { brandingFormMutationValuesToCreateBrandingService } from '~/packages/Branding/utils/brandingFormMutationValuesToCreateBrandingService';
import { brandingModelToDefaultValuesOfFormMutation } from '~/packages/Branding/utils/brandingModelToDefaultValuesOfFormMutation';
import {
  BrandingListingSearchParams,
  brandingListingUrlSearchParamsUtils,
} from '~/packages/Branding/utils/listingUrlSearchParams';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { SearcherOperator } from '~/services/constants/SearcherOperator';
import { SorterOperator } from '~/services/constants/SorterOperator';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { ToListingResponse } from '~/types/ToListingResponse';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
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
      page,
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
  const loaderData = useLoaderData<typeof loader>();

  const {
    data,
    handleCloseModalCreate,
    handleCloseModalDelete,
    handleCloseModalUpdate,
    handleCreate,
    handleDelete,
    handleGetList,
    handleOpenModalCreate,
    handleOpenModalDelete,
    handleOpenModalUpdate,
    handleUpdate,
    isCreating,
    isDeleting,
    isLoading,
    isOpenModalCreate,
    isOpenModalDelete,
    isOpenModalUpdate,
    isUpdating,
    page,
    pageSize,
    recordState,
    searchParams,
    setSearchParams,
    totalRecords,
    selectedRecordsState,
    setSelectedRecordsState,
    isFetchingDetail,
  } = useCRUD<BrandingListingSearchParams, BrandingFormMutationValues, Branding, Branding>({
    getList: async ({ page = 1, pageSize = RecordsPerPage, filter, search, sorter }) => {
      const response = await getBrandings({
        page,
        pageSize,
        searcher: {
          status: { operator: SearcherOperator.Eq, value: filter?.status },
          brandingCode: {
            operator: SearcherOperator.Contains,
            value: filter?.brandingCode ?? search,
          },
          brandingName: { operator: SearcherOperator.Contains, value: search },
        },
        sorter: {
          brandingCode: sorter?.brandingCode,
        },
      });
      updateURLSearchParamsOfBrowserWithoutNavigation(
        brandingListingUrlSearchParamsUtils.encrypt({
          page,
          pageSize,
          filter,
          search,
          sorter,
        }),
      );
      return {
        data: response.data.hits,
        totalRecords: response.data.pagination.totalRows,
        totalPages: response.data.pagination.totalPages,
        page,
        pageSize,
      };
    },
    defaultSearchParams: brandingListingUrlSearchParamsUtils.decrypt(
      brandingListingUrlSearchParamsUtils.getUrlSearchParams().toString(),
    ),
    defaultResponse: {
      data: loaderData.info.hits,
      totalRecords: loaderData.info.pagination.totalRecords,
      totalPages: loaderData.info.pagination.totalPages,
      page: loaderData.page,
      pageSize: RecordsPerPage,
    },

    export: async ({ filter, search, sorter }) => {
      const response = await exportBrandings({
        searcher: {
          status: { operator: SearcherOperator.Eq, value: filter?.status },
          brandingCode: {
            operator: SearcherOperator.Contains,
            value: filter?.brandingCode ?? search,
          },
          brandingName: { operator: SearcherOperator.Contains, value: search },
        },
        sorter: {
          brandingCode: sorter?.brandingCode,
        },
      });
      return {
        blob: response.data,
        fileName: t('branding:brandings'),
      };
    },

    create: async values => {
      const response = await createBranding({
        data: brandingFormMutationValuesToCreateBrandingService(values),
      });
      return response.data;
    },

    update: async ({ formValues, record }) => {
      await updateBranding({
        data: {
          ...brandingFormMutationValuesToCreateBrandingService(formValues),
          brandingCode: record.brandingCode,
        },
      });
      return record;
    },

    delete: async records => {
      await deleteBrandings({
        brandingCodes: records.map(record => {
          return record.brandingCode;
        }),
      });
    },

    getDetail: async record => {
      const response = await getBranding({
        data: { brandingCode: record.brandingCode },
      });
      return response.data;
    },
  });

  return (
    <>
      <div className="flex h-full flex-col">
        <BrandingListingHeader creatable onCreate={handleOpenModalCreate} />
        <BrandingListingTable
          loading={isLoading}
          dataSource={data}
          configViews={{
            storageKey: 'BrandingWithHookAndModal',
          }}
          select={{
            selectedRecordsState,
            setSelectedRecordsState,
          }}
          pagination={{
            currentPage: page,
            pageSize: pageSize ?? RecordsPerPage,
            totalRecords,
            onPaginationChange: ({ page, pageSize }) => {
              return setSearchParams({ page, pageSize });
            },
          }}
          search={{
            searchValue: searchParams.search,
            onSearch: value => {
              setSearchParams({
                page: 1,
                search: value,
              });
            },
          }}
          filter={{
            filterValues: {
              brandingCode: searchParams.filter?.brandingCode,
              status: searchParams.filter?.status,
            },
            onFilterChange: filterValues => {
              setSearchParams({
                filter: filterValues,
                page: 1,
              });
            },
          }}
          sorter={{
            sortValues: {
              brandingCode: { order: searchParams.sorter?.brandingCode },
              status: undefined,
            },
            onSortChange: sortValues => {
              setSearchParams({
                sorter: {
                  brandingCode: sortValues.brandingCode?.order as SorterOperator,
                },
              });
            },
          }}
          onRefresh={handleGetList}
          deleteAction={{
            deletable: isCanShow(IsCanDelete),
            onDelete: data => {
              return handleOpenModalDelete([data]);
            },
            onDeleteMany: data => {
              return handleOpenModalDelete(data);
            },
          }}
          editAction={{
            editable: isCanShow(IsCanEdit),
            onEdit: record => {
              return handleOpenModalUpdate(record);
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
        open={!!isOpenModalCreate}
        onCancel={handleCloseModalCreate}
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
          uid={FormCreate}
          defaultValues={brandingModelToDefaultValuesOfFormMutation({ branding: undefined })}
          onSubmit={values => {
            return handleCreate(values);
          }}
          isSubmitting={isCreating}
        />
      </ModalWithI18n>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalUpdate}
        onCancel={handleCloseModalUpdate}
        onOk={() => {
          return undefined;
        }}
        title={t('common:edit_title').toString()}
        okText={t('components:FormMutation.save')}
        okButtonProps={{
          form: FormUpdate,
          htmlType: 'submit',
        }}
        confirmLoading={isUpdating}
        loading={isFetchingDetail}
      >
        <BrandingEdit
          uid={FormUpdate}
          branding={recordState}
          onSubmit={values => {
            return handleUpdate(values);
          }}
          isSubmitting={isUpdating}
        />
      </ModalWithI18n>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDelete}
        onCancel={handleCloseModalDelete}
        onOk={handleDelete}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;

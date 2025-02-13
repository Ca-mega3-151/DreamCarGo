import { useTranslation } from 'react-i18next';
import { CreateBrandingWithHookAndPageBaseUrl, EditBrandingWithHookAndPageFullUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { useCRUD } from '~/hooks/useCRUD/useCRUD';
import { json, LoaderFunctionArgs, TypedResponse } from '~/overrides/@remix-run/node';
import { useLoaderData, useNavigate } from '~/overrides/@remix-run/react';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingFormMutationValues } from '~/packages/Branding/components/FormMutation/FormMutation';
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
import {
  BrandingListingSearchParams,
  brandingListingUrlSearchParamsUtils,
} from '~/packages/Branding/utils/listingUrlSearchParams';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { SearcherOperator } from '~/services/constants/SearcherOperator';
import { SorterOperator } from '~/services/constants/SorterOperator';
import { Input } from '~/shared/ReactJS';
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

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['branding', 'common']);

  const loaderData = useLoaderData<typeof loader>();

  const {
    data,
    handleCloseModalDelete,
    handleDelete,
    handleGetList,
    handleOpenModalDelete,
    isDeleting,
    isLoading,
    isOpenModalDelete,
    page,
    pageSize,
    searchParams,
    setSearchParams,
    totalRecords,
    selectedRecordsState,
    setSelectedRecordsState,
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
        <BrandingListingHeader
          creatable
          onCreate={() => {
            return navigate(CreateBrandingWithHookAndPageBaseUrl);
          }}
        />
        <BrandingListingTable
          loading={isLoading}
          dataSource={data}
          configViews={{
            storageKey: 'BrandingWithHookAndPage',
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
            OtherFilter: (
              <Input
                placeholder="Other"
                value={searchParams.filter?.other}
                onDebounceChange={value => {
                  setSearchParams({
                    filter: {
                      ...searchParams.filter,
                      other: value,
                    },
                  });
                }}
              />
            ),
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
              navigate(EditBrandingWithHookAndPageFullUrl({ brandingCode: record.brandingCode }));
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

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  action as actionDeleteBrandings,
  DeleteBrandingsActionResponse,
} from './_dashboard.branding-with-react-router-and-page.api.delete';
import {
  ApiDeleteBrandingsWithPageFullUrl,
  CreateBrandingWithReactRouterAndPageBaseUrl,
  EditBrandingWithReactRouterAndPageFullUrl,
  ListingBrandingWithReactRouterAndPageBaseUrl,
} from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, LoaderFunctionArgs, TypedResponse } from '~/overrides/@remix-run/node';
import { useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix-run/react';
import { useListingData } from '~/overrides/RemixJS/client';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingListingHeader } from '~/packages/Branding/components/Listing/ListingHeader';
import { BrandingListingTable } from '~/packages/Branding/components/Listing/ListingTable';
import { IsCanDelete } from '~/packages/Branding/constants/Is/IsCanDelete';
import { IsCanEdit } from '~/packages/Branding/constants/Is/IsCanEdit';
import { IsCanExport } from '~/packages/Branding/constants/Is/IsCanExport';
import { Branding } from '~/packages/Branding/models/Branding';
import { getBrandings } from '~/packages/Branding/services/getBrandings';
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

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['branding', 'common']);

  // #region Selected records
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
    fetcherData.load(ListingBrandingWithReactRouterAndPageBaseUrl + searchParamsToLoader);
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
        action: ApiDeleteBrandingsWithPageFullUrl(
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

  return (
    <>
      <div className="flex h-full flex-col">
        <BrandingListingHeader
          creatable
          onCreate={() => {
            return navigate(CreateBrandingWithReactRouterAndPageBaseUrl);
          }}
        />
        <BrandingListingTable
          loading={isFetchingList}
          dataSource={data?.info.hits}
          configViews={{
            storageKey: 'BrandingWithReactRouterAndPage',
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
            onEdit: record => {
              navigate(EditBrandingWithReactRouterAndPageFullUrl({ brandingCode: record.brandingCode }));
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

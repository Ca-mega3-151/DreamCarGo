import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as EditBrandingWithReactRouterAndPage from './src/_dashboard.branding-with-react-router-and-page.$brandingCode.edit';
import * as ListBrandingWithReactRouterAndPage from './src/_dashboard.branding-with-react-router-and-page._index';
import * as DeleteBrandingsWithPage from './src/_dashboard.branding-with-react-router-and-page.api.delete';
import * as ExportBrandingsWithPage from './src/_dashboard.branding-with-react-router-and-page.api.export';
import * as CreateBrandingWithReactRouterAndPage from './src/_dashboard.branding-with-react-router-and-page.create';
import {
  ApiDeleteBrandingsWithPageBaseUrl,
  ApiExportBrandingsWithPageBaseUrl,
  CreateBrandingWithReactRouterAndPageBaseUrl,
  EditBrandingWithReactRouterAndPageBaseUrl,
  ListingBrandingWithReactRouterAndPageBaseUrl,
} from './src/constants/BaseUrl';

const BrandingWithReactRouterAndPageRoutes: RouteObject[] = [
  {
    path: ListingBrandingWithReactRouterAndPageBaseUrl,
    loader: ListBrandingWithReactRouterAndPage.loader,
    shouldRevalidate: ListBrandingWithReactRouterAndPage.shouldRevalidate,
    errorElement: <ListBrandingWithReactRouterAndPage.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <ListBrandingWithReactRouterAndPage.Page />
      </Suspense>
    ),
  },
  {
    path: EditBrandingWithReactRouterAndPageBaseUrl,
    action: EditBrandingWithReactRouterAndPage.action,
    loader: EditBrandingWithReactRouterAndPage.loader,
    element: <EditBrandingWithReactRouterAndPage.Page />,
    shouldRevalidate: EditBrandingWithReactRouterAndPage.shouldRevalidate,
    errorElement: <EditBrandingWithReactRouterAndPage.ErrorBoundary />,
  },
  {
    path: CreateBrandingWithReactRouterAndPageBaseUrl,
    action: CreateBrandingWithReactRouterAndPage.action,
    element: <CreateBrandingWithReactRouterAndPage.Page />,
    errorElement: <CreateBrandingWithReactRouterAndPage.ErrorBoundary />,
  },
  {
    path: ApiDeleteBrandingsWithPageBaseUrl,
    action: DeleteBrandingsWithPage.action,
  },
  {
    path: ApiExportBrandingsWithPageBaseUrl,
    action: ExportBrandingsWithPage.action,
  },
];

export default BrandingWithReactRouterAndPageRoutes;

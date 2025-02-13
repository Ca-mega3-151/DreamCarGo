import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as ListingBrandingsWithModal from './src/_dashboard.branding-with-react-router-and-modal._index';
import * as EditBrandingWithReactRouterAndModal from './src/_dashboard.branding-with-react-router-and-modal.api.$brandingCode.edit';
import * as CreateBrandingWithReactRouterAndModal from './src/_dashboard.branding-with-react-router-and-modal.api.create';
import * as DeleteBrandingsWithModal from './src/_dashboard.branding-with-react-router-and-modal.api.delete';
import {
  ApiCreateBrandingWithReactRouterAndModalBaseUrl,
  ApiDeleteBrandingsWithModalBaseUrl,
  ApiEditBrandingWithReactRouterAndModalBaseUrl,
  ListingBrandingWithReactRouterAndModalBaseUrl,
} from './src/constants/BaseUrl';

const BrandingWithReactRouterAndModalRoutes: RouteObject[] = [
  {
    path: ListingBrandingWithReactRouterAndModalBaseUrl,
    loader: ListingBrandingsWithModal.loader,
    shouldRevalidate: ListingBrandingsWithModal.shouldRevalidate,
    errorElement: <ListingBrandingsWithModal.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <ListingBrandingsWithModal.Page />
      </Suspense>
    ),
  },
  {
    path: ApiEditBrandingWithReactRouterAndModalBaseUrl,
    action: EditBrandingWithReactRouterAndModal.action,
    shouldRevalidate: EditBrandingWithReactRouterAndModal.shouldRevalidate,
    errorElement: <EditBrandingWithReactRouterAndModal.ErrorBoundary />,
  },
  {
    path: ApiCreateBrandingWithReactRouterAndModalBaseUrl,
    action: CreateBrandingWithReactRouterAndModal.action,
    errorElement: <CreateBrandingWithReactRouterAndModal.ErrorBoundary />,
  },
  {
    path: ApiDeleteBrandingsWithModalBaseUrl,
    action: DeleteBrandingsWithModal.action,
  },
];

export default BrandingWithReactRouterAndModalRoutes;

import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as ListingBrandingsWithModal from './src/_dashboard.branding-with-hook-and-modal._index';
import { ListingBrandingWithHookAndModalBaseUrl } from './src/constants/BaseUrl';

const BrandingWithHookAndModalRoutes: RouteObject[] = [
  {
    path: ListingBrandingWithHookAndModalBaseUrl,
    loader: ListingBrandingsWithModal.loader,
    shouldRevalidate: ListingBrandingsWithModal.shouldRevalidate,
    errorElement: <ListingBrandingsWithModal.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <ListingBrandingsWithModal.Page />
      </Suspense>
    ),
  },
];

export default BrandingWithHookAndModalRoutes;

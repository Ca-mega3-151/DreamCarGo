import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as EditBrandingWithHookAndPage from './src/_dashboard.branding-with-hook-and-page.$brandingCode.edit';
import * as ListBrandingWithHookAndPage from './src/_dashboard.branding-with-hook-and-page._index';
import * as CreateBrandingWithHookAndPage from './src/_dashboard.branding-with-hook-and-page.create';
import {
  CreateBrandingWithHookAndPageBaseUrl,
  EditBrandingWithHookAndPageBaseUrl,
  ListingBrandingWithHookAndPageBaseUrl,
} from './src/constants/BaseUrl';

const BrandingWithHookAndPageRoutes: RouteObject[] = [
  {
    path: ListingBrandingWithHookAndPageBaseUrl,
    loader: ListBrandingWithHookAndPage.loader,
    shouldRevalidate: ListBrandingWithHookAndPage.shouldRevalidate,
    errorElement: <ListBrandingWithHookAndPage.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <ListBrandingWithHookAndPage.Page />
      </Suspense>
    ),
  },
  {
    path: EditBrandingWithHookAndPageBaseUrl,
    loader: EditBrandingWithHookAndPage.loader,
    element: <EditBrandingWithHookAndPage.Page />,
    shouldRevalidate: EditBrandingWithHookAndPage.shouldRevalidate,
    errorElement: <EditBrandingWithHookAndPage.ErrorBoundary />,
  },
  {
    path: CreateBrandingWithHookAndPageBaseUrl,
    element: <CreateBrandingWithHookAndPage.Page />,
    errorElement: <CreateBrandingWithHookAndPage.ErrorBoundary />,
  },
];

export default BrandingWithHookAndPageRoutes;

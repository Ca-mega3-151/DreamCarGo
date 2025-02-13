import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DashboardLayout from './src/_dashboard';
import * as Dashboard from './src/_dashboard.dashboard';
import BrandingWithHookAndModalRoutes from './src/BrandingWithHookAndModal';
import BrandingWithHookAndPageRoutes from './src/BrandingWithHookAndPage';
import BrandingWithReactRouterAndModalRoutes from './src/BrandingWithReactRouterAndModal';
import BrandingWithReactRouterAndPageRoutes from './src/BrandingWithReactRouterAndPage';
import ProfileRoutes from './src/Profile';

export const DashboardRoutes: RouteObject[] = [
  {
    element: <DashboardLayout.Page />,
    loader: DashboardLayout.loader,
    errorElement: <DashboardLayout.ErrorBoundary />,
    id: DashboardLayout.routeId,
    children: [
      {
        path: '/dashboard',
        errorElement: <Dashboard.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <Dashboard.Page />
          </Suspense>
        ),
      },
      ...ProfileRoutes,
      ...BrandingWithReactRouterAndModalRoutes,
      ...BrandingWithReactRouterAndPageRoutes,
      ...BrandingWithHookAndModalRoutes,
      ...BrandingWithHookAndPageRoutes,
    ],
  },
];

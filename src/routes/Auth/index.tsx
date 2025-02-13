import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as AuthLayout from './src/_auth';
import * as ForgotPassword from './src/_auth.forgot-password';
import * as Login from './src/_auth.login';
import * as RefreshToken from './src/_auth.refresh-token';

export const AuthRoutes: RouteObject[] = [
  {
    element: <AuthLayout.Page />,
    loader: AuthLayout.loader,
    errorElement: <AuthLayout.ErrorBoundary />,
    children: [
      {
        path: '/login',
        action: Login.action,
        errorElement: <Login.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <Login.Page />
          </Suspense>
        ),
      },
      {
        path: '/refresh-token',
        action: RefreshToken.action,
        loader: RefreshToken.loader,
      },
      {
        path: '/forgot-password',
        action: ForgotPassword.action,
        errorElement: <ForgotPassword.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <ForgotPassword.Page />
          </Suspense>
        ),
      },
    ],
  },
];

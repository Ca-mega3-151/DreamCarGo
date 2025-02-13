import { FC } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as Forbidden from './routes/403';
import * as NotFound from './routes/404';
import * as InternalError from './routes/500';
import * as IndexPage from './routes/_index';
import { AuthRoutes } from './routes/Auth';
import { DashboardRoutes } from './routes/Dashboard';
import * as Logout from './routes/logout';
import * as RootLayout from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout.Page />,
    errorElement: <Navigate to="/404" />,
    children: [
      ...AuthRoutes,
      ...DashboardRoutes,
      {
        path: '/',
        loader: IndexPage.loader,
        element: <IndexPage.Page />,
      },
      {
        path: '/logout',
        element: null,
        action: Logout.action,
        loader: Logout.loader,
      },
      {
        path: '/500',
        element: <InternalError.Page />,
      },
      {
        path: '/404',
        element: <NotFound.Page />,
      },
      {
        path: '/403',
        element: <Forbidden.Page />,
      },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};

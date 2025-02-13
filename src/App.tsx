import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout/DashboardLayout';
import { StatisticTransactionTable } from './packages/StatisticTransaction/StatisticTransactionTable';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <h1>Home Page</h1> },
      {
        path: '/statistic-transaction',
        element: <StatisticTransactionTable />,
      },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};

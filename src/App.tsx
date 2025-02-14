import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout/DashboardLayout';
import { ArticleTable } from './packages/Article/ArticleTable';
import { ArticleDetail } from './packages/Article/Detail/Detail';
import { FormArticle } from './packages/Article/FormMutation/FormMutation';
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
      {
        path: '/article',
        element: <ArticleTable />,
      },
      {
        path: '/article/detail',
        element: (
          <ArticleDetail
            article={{
              catalogue: 'Lập trình',
              content: 'Hướng dẫn sử dụng React',
              createdAt: '10/02/2025',
              employeeAt: 'Nguyễn Văn A',
              id: '1',
              status: 'Đã xuất bản',
              title: 'Hướng dẫn sử dụng React',
              url: 'https://www.google.com',
            }}
          />
        ),
      },
      {
        path: '/article/create',
        element: (
          <FormArticle
            uid="form-article"
            isSubmitting={false}
            defaultValues={{
              catalogue: undefined,
              title: undefined,
              url: undefined,
              content: undefined,
              status: undefined,
              createdAt: undefined,
              employeeAt: undefined,
            }}
          />
        ),
      },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};

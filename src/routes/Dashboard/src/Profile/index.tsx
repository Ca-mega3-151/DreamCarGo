import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as Profile from './src/_dashboard.profile';
import { ProfileBaseUrl } from './src/constants/BaseUrl';

const ProfileRoutes: RouteObject[] = [
  {
    path: ProfileBaseUrl,
    loader: Profile.loader,
    shouldRevalidate: Profile.shouldRevalidate,
    action: Profile.action,
    errorElement: <Profile.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <Profile.Page />
      </Suspense>
    ),
  },
];

export default ProfileRoutes;

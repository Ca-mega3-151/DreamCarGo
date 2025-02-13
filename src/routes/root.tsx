import { FC, Suspense } from 'react';
import { Outlet, ScrollRestoration, useNavigation } from '~/overrides/@remix-run/react';
import { useChangeLanguage } from '~/overrides/RemixJS/client';
import { FixedProgressLoader, Notification, usePrevious } from '~/shared/ReactJS';

export const Page: FC = () => {
  const navigation = useNavigation();
  const isIdle = navigation.state === 'idle';

  const prevFormAction = usePrevious(navigation);

  useChangeLanguage();

  return (
    <Suspense fallback={null}>
      <Notification />
      <FixedProgressLoader hidden={!!prevFormAction?.formAction || !!navigation.formAction} done={isIdle} />
      <Outlet />
      <ScrollRestoration />
    </Suspense>
  );
};

export default Page;

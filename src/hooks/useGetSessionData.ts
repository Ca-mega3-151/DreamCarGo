import { useRouteLoaderData } from '~/overrides/@remix-run/react';
import { LoaderResponse, routeId } from '~/routes/Dashboard/src/_dashboard';

export const useGetSessionData = () => {
  const loaderData = useRouteLoaderData<LoaderResponse>(routeId);
  return { sessionData: loaderData?.sessionData };
};

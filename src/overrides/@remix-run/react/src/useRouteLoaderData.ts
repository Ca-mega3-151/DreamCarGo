import { useRouteLoaderData as useRouteLoaderDataReactRouterDom } from 'react-router-dom';

export const useRouteLoaderData = <LoaderResponse>(routeId: string) => {
  return useRouteLoaderDataReactRouterDom(routeId) as LoaderResponse;
};

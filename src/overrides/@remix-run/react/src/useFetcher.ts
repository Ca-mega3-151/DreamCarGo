import { FetcherWithComponents, useFetcher as useFetcherReactRouterDom } from 'react-router-dom';
import { AppData, SerializeFrom } from '../../node/src/types';

export const useFetcher = <TData = AppData>() => {
  return useFetcherReactRouterDom() as FetcherWithComponents<SerializeFrom<TData>>;
};

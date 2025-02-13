import { useActionData as useActionDataReactRouterDom } from 'react-router-dom';
import { AppData, SerializeFrom } from '../../node/src/types';

export const useActionData = <T = AppData>(): SerializeFrom<T> | undefined => {
  return useActionDataReactRouterDom() as SerializeFrom<T> | undefined;
};

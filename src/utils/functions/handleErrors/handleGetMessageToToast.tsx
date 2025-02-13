import { TFunction } from 'i18next';
import { SerializeFrom } from '~/overrides/@remix-run/node';
import { StatusCodeMappingToString } from '~/services/constants/StringMappingToStatusCode';
import { ToActionResponse } from '~/types/ToActionResponse';

export const handleGetMessageToToast = (
  t: TFunction<any[]>,
  actionResponse: ToActionResponse<any, any> | SerializeFrom<ToActionResponse<any, any>>,
) => {
  const { hasError, errorCode } = actionResponse;
  if (!hasError) {
    return undefined;
  }
  if (errorCode) {
    return t(`error_message:${StatusCodeMappingToString[errorCode]}`);
  }
  return t(`error_message:UNKNOWN`);
};

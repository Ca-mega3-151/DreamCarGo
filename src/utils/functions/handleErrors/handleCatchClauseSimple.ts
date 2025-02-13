import { TFunction } from 'i18next';
import { handleGetMessageToToast } from './handleGetMessageToToast';
import { handleNativeError } from './handleNativeError';
import { handleServiceException } from './handleServiceException';
import { handleUnknownError } from './handleUnknownError';
import { json, redirect } from '~/overrides/@remix-run/node';
import { SessionExpiredFullUrl } from '~/packages/_Common/Auth/constants/SessionExpired';
import { StringMappingToStatusCode } from '~/services/constants/StringMappingToStatusCode';
import { ServiceException } from '~/services/utils/ServiceException';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { isBrowser } from '~/shared/Utilities';
import { ToActionResponse } from '~/types/ToActionResponse';

export const handleCatchClauseAsSimpleResponse = <Model = any>(error: unknown) => {
  if (error instanceof ServiceException) {
    if (error.cause.code === StringMappingToStatusCode['HTTP_UNAUTHORIZED']) {
      return redirect(SessionExpiredFullUrl);
    }
    return json(...handleServiceException<Model>(error));
  } else if (error instanceof Error) {
    return json(...handleNativeError<Model>(error));
  }
  return json(...handleUnknownError<Model>(error));
};

interface HandleCatchClauseAsMessage {
  t: TFunction<any>;
  error: unknown;
}
export const handleCatchClauseAsMessage = <Model = any, FormValues extends AnyRecord = any>({
  error,
  t,
}: HandleCatchClauseAsMessage) => {
  let simpleResponse: ToActionResponse<Model, FormValues>;
  if (error instanceof ServiceException) {
    if (error.cause.code === StringMappingToStatusCode['HTTP_UNAUTHORIZED']) {
      if (isBrowser()) {
        window.location.replace(SessionExpiredFullUrl);
      } else {
        throw redirect(SessionExpiredFullUrl);
      }
    }
    simpleResponse = handleServiceException<Model>(error)[0] as ToActionResponse<Model, FormValues>;
  } else if (error instanceof Error) {
    simpleResponse = handleNativeError<Model>(error)[0] as ToActionResponse<Model, FormValues>;
  } else {
    simpleResponse = handleUnknownError<Model>(error)[0] as ToActionResponse<Model, FormValues>;
  }
  return handleGetMessageToToast(t, simpleResponse);
};

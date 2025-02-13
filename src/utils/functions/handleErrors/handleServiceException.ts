import { RTHandleError } from './@types/RemixJsonFunction';
import { ServiceException } from '~/services/utils/ServiceException';
import { ToActionResponse } from '~/types/ToActionResponse';

export const handleServiceException = <Model = any>(
  error: ServiceException,
): RTHandleError<ToActionResponse<Model, any>> => {
  console.log('handleServiceException:: ', error);
  const response = error.cause;
  return [
    {
      message: `[ServiceException]: ${error}`,
      hasError: true,
      errorCode: response?.code,
      info: undefined,
      fieldsError: undefined,
    },
    { status: 400 },
  ];
};

import { RTHandleError } from './@types/RemixJsonFunction';
import { ToActionResponse } from '~/types/ToActionResponse';

export const handleNativeError = <Model = any>(error: Error): RTHandleError<ToActionResponse<Model, {}>> => {
  console.log('handleNativeError:: ', error);
  return [
    {
      message: `[NativeError]: ${error}`,
      hasError: true,
      info: undefined,
    },
    { status: 400 },
  ];
};

import { AxiosResponse } from 'axios';
import { ResponseFailure } from '../types/Response';

export const isResponseError = (response: AxiosResponse): response is AxiosResponse<ResponseFailure> => {
  return response.data?.code !== 0;
};

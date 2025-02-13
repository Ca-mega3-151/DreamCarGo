import { FileResource } from '../models/FileResource';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';
import { fetchApiClient } from '~/utils/fetchApi/fetchApi.client';

interface UploadFileResource {
  image: File;
}

type ResponseData = FileResource;

export const uploadFileResource = async ({ image }: UploadFileResource) => {
  const formData = new FormData();
  formData.append('file', image);
  const response = await fetchApiClient.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    method: 'POST',
    url: '/upload-file',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};

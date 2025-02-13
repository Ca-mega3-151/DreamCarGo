import { FileResource } from '../models/FileResource';
import { getPublicEnv } from '~/utils/functions/getPublicEnv';

export const getImageResourceUrl = (file: Pick<FileResource, 'publicUrl'> | string | undefined) => {
  if (!file) {
    return;
  }
  const pathName = typeof file === 'string' ? file : file.publicUrl;
  return getPublicEnv('VITE_FILE_RESOURCE_URL') + pathName;
};

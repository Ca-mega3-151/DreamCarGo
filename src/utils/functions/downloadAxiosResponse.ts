import { AxiosResponse } from 'axios';
import { dayjs } from '~/shared/Utilities';

interface DownloadAxiosResponsex {
  response: AxiosResponse['data'];
  fileName: string;
}

export const downloadAxiosResponse = ({ fileName, response }: DownloadAxiosResponsex) => {
  const href = URL.createObjectURL(response as Blob);

  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', `${fileName}_${dayjs().format('HH:mm DD/MM/YYYY')}`);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);

  return null;
};

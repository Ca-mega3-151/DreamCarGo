import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { MaxFileSizeInMb } from '../../constants/MaxFileSize';
import { IconExportLinear } from '~/components/Icons/IconExportLinear';

export const Dragger = () => {
  const { t } = useTranslation(['file_resource']);

  return (
    <div className="flex cursor-pointer flex-col items-center justify-center p-4">
      <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-neutral-200">
        <IconExportLinear className="text-2xl text-neutral-700" />
      </div>
      <div className="mb-1 text-sm font-semibold text-neutral-500">
        <Highlighter
          highlightClassName="!bg-transparent text-yy-primary"
          textToHighlight={t('UploadImageResource.Dragger.title')}
          searchWords={[t('UploadImageResource.Dragger.title_highlight')]}
        />
      </div>
      <div className="text-[10px] font-medium text-neutral-400">
        {t('file_resource:UploadImageResource.Dragger.accept_mime_type', { fileSize: MaxFileSizeInMb })}
      </div>
    </div>
  );
};

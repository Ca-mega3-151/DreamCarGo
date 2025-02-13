import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MaxFileSizeInBytes, MaxFileSizeInMb } from '../../constants/MaxFileSize';
import { FileResource } from '../../models/FileResource';
import { uploadFileResource } from '../../services/uploadFileResource';
import { Dragger } from './Dragger';
import { notification, UploadSingle } from '~/shared/ReactJS';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

type Value = Pick<FileResource, '_id' | 'size' | 'filename' | 'publicUrl'>;

interface Props {
  file?: Value;
  onChange?: (value?: Value) => void;
  disabled?: boolean;
  className?: string;
}

export const UploadFileResource: FC<Props> = ({ className, disabled, file, onChange }) => {
  const { t } = useTranslation(['file_resource']);

  return (
    <div>
      <UploadSingle<Value>
        maxFileSize={MaxFileSizeInBytes}
        onTooLarge={() => {
          notification.error({
            message: t('file_resource:file_too_large'),
            description: t('file_resource:file_too_large_description', { size: MaxFileSizeInMb }),
          });
        }}
        className={className}
        disabled={disabled}
        request={async ({ file }) => {
          try {
            const response = await uploadFileResource({ image: file });
            notification.success({ message: t('file_resource:upload_file_success') });
            return response.data;
          } catch (error) {
            notification.error({
              message: t('file_resource:upload_file_error'),
              description: handleCatchClauseAsMessage({ error, t }),
            });
            throw error;
          }
        }}
        onStateChange={fileState => {
          onChange?.(
            fileState?.response
              ? {
                  _id: fileState.response._id,
                  publicUrl: fileState.response.publicUrl,
                  filename: fileState.response.filename,
                  size: fileState.response.size,
                }
              : undefined,
          );
        }}
        value={
          file
            ? {
                uid: file._id,
                status: 'success',
                file: { name: file.filename, size: file.size },
                response: {
                  _id: file._id,
                  filename: file.filename,
                  publicUrl: file.publicUrl,
                  size: file.size,
                },
              }
            : undefined
        }
      >
        <Dragger />
      </UploadSingle>
    </div>
  );
};

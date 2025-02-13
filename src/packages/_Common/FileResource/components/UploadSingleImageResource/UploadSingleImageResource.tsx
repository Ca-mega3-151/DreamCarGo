import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MaxFileSizeInBytes, MaxFileSizeInMb } from '../../constants/MaxFileSize';
import { FileResource } from '../../models/FileResource';
import { uploadFileResource } from '../../services/uploadFileResource';
import { getImageResourceUrl } from '../../utils/getImageResourceUrl';
import { AvatarDragger } from './AvatarDragger';
import { Dragger } from './Dragger';
import { notification, UploadSingle } from '~/shared/ReactJS';
import { ImageFile } from '~/shared/ReactJS';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

type Value = Pick<FileResource, '_id' | 'size' | 'filename' | 'publicUrl'>;

interface Props {
  image?: Value;
  onChange?: (value?: Value) => void;
  disabled?: boolean;
  className?: string;
  variant?: 'featured_image' | 'avatar';
}

export const UploadSingleImageResource: FC<Props> = ({
  className,
  disabled,
  image,
  onChange,
  variant = 'featured_image',
}) => {
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
        uploadVariant={variant === 'featured_image' ? 'dragger' : 'wrapper'}
        className={className}
        disabled={disabled}
        renderFile={fileState => {
          if (variant === 'avatar') {
            return null;
          }
          if (!fileState?.response) {
            return null;
          }
          return (
            <div className="mt-1.5 max-w-[300px]">
              <ImageFile
                onDelete={() => {
                  onChange?.(undefined);
                }}
                fileState={{
                  uid: fileState.uid,
                  status: fileState.status,
                  file: fileState.file,
                  response: {
                    src: getImageResourceUrl(fileState.response.publicUrl) ?? '',
                  },
                }}
              />
            </div>
          );
        }}
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
          image
            ? {
                uid: image._id,
                status: 'success',
                file: { name: image.filename, size: image.size },
                response: {
                  _id: image._id,
                  filename: image.filename,
                  publicUrl: image.publicUrl,
                  size: image.size,
                },
              }
            : undefined
        }
      >
        {variant === 'featured_image' ? <Dragger /> : <AvatarDragger avatar={getImageResourceUrl(image)} />}
      </UploadSingle>
    </div>
  );
};

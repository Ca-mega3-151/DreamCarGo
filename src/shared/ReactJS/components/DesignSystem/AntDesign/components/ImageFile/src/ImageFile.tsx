import { CloseOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import { useInitializeContext } from '../../../base';
import { Image } from '../../Image';
import { UploadFileState } from '../../Upload';
import './styles.css';

export interface Props<FileResponse extends { src: string }> {
  /** The state of the image file being managed. */
  fileState: UploadFileState<FileResponse>;
  /** Callback function triggered when the image file is deleted. */
  onDelete?: () => void;
}

/**
 * ImageFile component is designed to display and manage an individual image file within upload components.
 *
 * @param {Object} props - The properties for the ImageFile component.
 * @param {UploadFileState<{ src: string }>} props.fileState - The state of the image file being managed.
 * @param {function} [props.onDelete] - Callback function triggered when the image file is deleted.
 * @returns {ReactNode} The rendered ImageFile component.
 */
export const ImageFile = <FileResponse extends { src: string }>({
  fileState,
  onDelete,
}: Props<FileResponse>): ReactNode => {
  useInitializeContext();

  return (
    <div className="AntImageFile__container">
      <Image className="AntImageFile__image" preview={false} src={fileState.response?.src} />
      <div className="AntImageFile__delete" role="button" tabIndex={0} onKeyDown={onDelete} onClick={onDelete}>
        <CloseOutlined />
      </div>
    </div>
  );
};

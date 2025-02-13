import { CloseOutlined } from '@ant-design/icons';
import { filesize } from 'filesize';
import { ReactNode } from 'react';
import { useInitializeContext } from '../../../base';
import { LineProgress } from '../../LineProgress';
import { UploadFileState } from '../../Upload';
import './styles.css';

export interface Props<FileResponse> {
  /** The current state of the files being managed. */
  filesState: UploadFileState<FileResponse>[];
  /** Callback function triggered when a file is downloaded. */
  onDownload?: (fileState: UploadFileState<FileResponse>) => void;
  /** Callback function triggered when a file is deleted. */
  onDelete?: (fileState: UploadFileState<FileResponse>) => void;
}

/**
 * NormalFilesList component is designed to display and manage a list of normal files within upload components.
 *
 * @param {Object} props - The properties for the NormalFilesList component.
 * @param {FileState<any>[]} props.filesState - The current state of the files being managed.
 * @param {function} [props.onDownload] - Callback function triggered when a file is downloaded.
 * @param {function} [props.onDelete] - Callback function triggered when a file is deleted.
 * @returns {ReactNode} The rendered NormalFilesList component.
 */
export const NormalFilesList = <FileResponse,>({
  filesState,
  onDelete,
  onDownload,
}: Props<FileResponse>): ReactNode => {
  useInitializeContext();

  const renderItem = (fileState: (typeof filesState)[number]): ReactNode => {
    return (
      <div key={fileState.uid} className="AntNormalFilesList__item">
        <div className="AntNormalFilesList__info">
          <svg
            className="AntNormalFilesList__infoIcon"
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.70673 7.29333C9.24277 7.82933 9.60782 8.51225 9.75573 9.25572C9.90364 9.99919 9.82776 10.7698 9.53768 11.4702C9.24761 12.1705 8.75636 12.7691 8.12608 13.1903C7.49579 13.6114 6.75477 13.8362 5.99673 13.8362C5.23869 13.8362 4.49767 13.6114 3.86738 13.1903C3.2371 12.7691 2.74586 12.1705 2.45578 11.4702C2.1657 10.7698 2.08982 9.99919 2.23773 9.25572C2.38564 8.51225 2.75069 7.82933 3.28673 7.29333"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7.06014 8.94001C6.50117 8.38043 6.12065 7.66769 5.96667 6.89188C5.81269 6.11608 5.89217 5.31204 6.19505 4.5814C6.49793 3.85075 7.01062 3.2263 7.66832 2.78697C8.32602 2.34764 9.0992 2.11316 9.89014 2.11316C10.6811 2.11316 11.4543 2.34764 12.112 2.78697C12.7697 3.2263 13.2824 3.85075 13.5852 4.5814C13.8881 5.31204 13.9676 6.11608 13.8136 6.89188C13.6596 7.66769 13.2791 8.38043 12.7201 8.94001"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <div
            className="AntNormalFilesList__fileInfo"
            role="button"
            tabIndex={0}
            onKeyDown={() => {
              return onDownload?.(fileState);
            }}
            onClick={() => {
              return onDownload?.(fileState);
            }}
          >
            <div className="AntNormalFilesList__fileName">{fileState.file.name}</div>
            {fileState.file.size && <div className="AntNormalFilesList__capacity">{filesize(fileState.file.size)}</div>}
          </div>
        </div>
        {fileState.status === 'loading' && (
          <LineProgress
            className="AntNormalFilesList__progress"
            showInfo={false}
            size={{ width: '100%', height: 4 }}
            percent={fileState.progressPercent}
          />
        )}
        <div
          className="AntNormalFilesList__delete"
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            return onDelete?.(fileState);
          }}
          onClick={() => {
            return onDelete?.(fileState);
          }}
        >
          <CloseOutlined />
        </div>
      </div>
    );
  };

  return <div className="AntNormalFilesList__container">{filesState.map(renderItem)}</div>;
};

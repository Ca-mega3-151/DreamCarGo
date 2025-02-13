import { CloseOutlined } from '@ant-design/icons';
import { filesize } from 'filesize';
import { ReactNode } from 'react';
import { useInitializeContext } from '../../../base';
import { LineProgress } from '../../LineProgress';
import { UploadFileState } from '../../Upload';
import './styles.css';

export interface Props<FileResponse> {
  /** The state of the file being managed. */
  fileState: UploadFileState<FileResponse>;
  /** Callback function triggered when the file is deleted. */
  onDelete?: () => void;
  /** Callback function triggered when the file is downloaded. */
  onDownload?: () => void;
}

/**
 * NormalFile component is designed to display and manage an individual normal file within upload components.
 *
 * @param {Object} props - The properties for the NormalFile component.
 * @param {UploadFileState<FileResponse>} props.fileState - The state of the file being managed.
 * @param {function} [props.onDelete] - Callback function triggered when the file is deleted.
 * @param {function} [props.onDownload] - Callback function triggered when the file is downloaded.
 * @returns {ReactNode} The rendered NormalFile component.
 */
export const NormalFile = <FileResponse,>({ fileState, onDelete, onDownload }: Props<FileResponse>): ReactNode => {
  useInitializeContext();

  return (
    <div className="AntNormalFile__container">
      <div className="AntNormalFile__information">
        <div className="AntNormalFile__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.4437 2.5606L15.4437 2.56061L15.4466 2.56354C16.4451 3.56197 17.9439 5.07448 19.2561 6.39864C19.8868 7.03505 20.4743 7.62796 20.9425 8.09938C20.9599 8.11786 20.9716 8.14101 20.9761 8.16602C20.9807 8.19164 20.9776 8.21806 20.9671 8.2419C20.9566 8.26574 20.9393 8.28592 20.9173 8.29986C20.8953 8.3138 20.8696 8.32087 20.8436 8.32017L20.8436 8.31999H20.8302C19.6992 8.31999 18.3822 8.31998 17.4354 8.31002L17.4354 8.30992L17.4257 8.31001C16.8398 8.31529 16.2754 8.08934 15.855 7.68118C15.4358 7.27414 15.1934 6.71864 15.1802 6.1346V2.65956C15.1819 2.63103 15.1914 2.60349 15.2079 2.58006C15.2253 2.55535 15.2495 2.53629 15.2776 2.52525C15.3057 2.51421 15.3364 2.51168 15.366 2.51796C15.3955 2.52425 15.4225 2.53907 15.4437 2.5606Z"
              fill="#23262F"
              stroke="#23262F"
            />
            <path
              d="M17.6091 10.69H17.6098H20.4998C20.6324 10.69 20.7596 10.7427 20.8534 10.8365C20.9472 10.9302 20.9998 11.0574 20.9998 11.19V16.43V16.4443L21.0007 16.4586C21.0391 17.1308 20.9351 17.8036 20.6953 18.4328C20.4555 19.062 20.0854 19.6334 19.6093 20.1095C19.1332 20.5856 18.5618 20.9557 17.9326 21.1955C17.3034 21.4353 16.6306 21.5393 15.9584 21.5008L15.9441 21.5H15.9298H8.06984H8.05554L8.04126 21.5008C7.36903 21.5393 6.69625 21.4353 6.06706 21.1955C5.43787 20.9557 4.86648 20.5856 4.39036 20.1095C3.91424 19.6334 3.54416 19.062 3.30438 18.4328C3.06459 17.8036 2.96053 17.1308 2.99902 16.4586L2.99984 16.4443V16.43V7.57002V7.55572L2.99902 7.54144C2.96053 6.86921 3.06459 6.19644 3.30438 5.56725C3.54416 4.93806 3.91424 4.36666 4.39036 3.89055C4.86648 3.41443 5.43787 3.04434 6.06706 2.80456C6.69625 2.56478 7.36903 2.46072 8.04126 2.4992L8.05554 2.50002H8.06984H12.3098C12.4424 2.50002 12.5696 2.5527 12.6634 2.64647C12.7572 2.74024 12.8098 2.86741 12.8098 3.00002L12.8098 5.89002L12.8098 5.89072C12.8116 7.16303 13.3178 8.38272 14.2175 9.28238C15.1171 10.182 16.3368 10.6882 17.6091 10.69ZM7.49984 18.25H11.4998C11.8314 18.25 12.1493 18.1183 12.3837 17.8839C12.6181 17.6495 12.7498 17.3315 12.7498 17C12.7498 16.6685 12.6181 16.3506 12.3837 16.1161C12.1493 15.8817 11.8314 15.75 11.4998 15.75H7.49984C7.16832 15.75 6.85038 15.8817 6.61595 16.1161C6.38154 16.3506 6.24984 16.6685 6.24984 17C6.24984 17.3315 6.38154 17.6495 6.61595 17.8839C6.85038 18.1183 7.16832 18.25 7.49984 18.25ZM7.49984 14.25H13.4998C13.8314 14.25 14.1493 14.1183 14.3837 13.8839C14.6181 13.6495 14.7498 13.3315 14.7498 13C14.7498 12.6685 14.6181 12.3506 14.3837 12.1161C14.1493 11.8817 13.8314 11.75 13.4998 11.75H7.49984C7.16832 11.75 6.85038 11.8817 6.61595 12.1161C6.38154 12.3506 6.24984 12.6685 6.24984 13C6.24984 13.3315 6.38154 13.6495 6.61595 13.8839C6.85038 14.1183 7.16832 14.25 7.49984 14.25Z"
              fill="#23262F"
              stroke="#23262F"
            />
          </svg>
        </div>
        <div className="AntNormalFile__fileInformation">
          <div
            className="AntNormalFile__fileName"
            role="button"
            tabIndex={0}
            onKeyDown={() => {
              return onDownload?.();
            }}
            onClick={() => {
              return onDownload?.();
            }}
          >
            {fileState.file.name}
          </div>
          <div className="AntNormalFile__capacity">{filesize(fileState.file.size)}</div>
          {fileState.status === 'loading' && (
            <LineProgress
              className="AntNormalFile__progress"
              percent={fileState.progressPercent}
              showInfo={false}
              size="small"
            />
          )}
        </div>
      </div>
      <div className="AntNormalFile__delete" role="button" tabIndex={0} onKeyDown={onDelete} onClick={onDelete}>
        <CloseOutlined />
      </div>
    </div>
  );
};

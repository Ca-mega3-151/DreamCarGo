import { DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Image as AntImage } from 'antd';
import { ReactNode, useMemo } from 'react';
import { useInitializeContext } from '../../../base';
import { Image } from '../../Image';
import './css/ImageFilesListHorizontal.css';
import { Props } from './types/Props';

/**
 * ImageFilesListHorizontal component is designed to display and manage a list of image files within upload components.
 *
 * @param {Object} props - The properties for the ImageFilesListHorizontal component.
 * @param {FileState<{ src: string }>[]]} props.filesState - The current state of the image files being managed.
 * @param {function} [props.fallback] - Function to provide a fallback URL for images that might not be available.
 * @param {function} [props.placeholder] - Function to render a custom placeholder for images while they are loading or unavailable.
 * @param {function} [props.onDelete] - Callback function triggered when an image file is deleted.
 * @param {function} [props.onDownload] - Callback function triggered when an image file is downloaded.
 * @returns {ReactNode} The rendered ImageFilesListHorizontal component.
 */
export const ImageFilesListHorizontal = <FileResponse extends { src: string }>({
  filesState,
  fallback,
  placeholder,
  onDelete,
  onDownload,
}: Props<FileResponse>): ReactNode => {
  useInitializeContext();

  const renderItem = (item: (typeof filesState)[number]): ReactNode => {
    return (
      <div key={item.uid} className="AntImageFilesListHorizontal__item">
        <Image
          className="AntImageFilesListHorizontal__image"
          src={item.response?.src}
          fallback={fallback?.(item)}
          placeholder={placeholder?.(item)}
          mask={
            <div className="AntImageFilesListHorizontal__actions">
              <EyeOutlined className="AntImageFilesListHorizontal__view" />
              <DeleteOutlined
                className="AntImageFilesListHorizontal__delete"
                onClick={event => {
                  event.stopPropagation();
                  onDelete?.(item);
                }}
              />
              <DownloadOutlined
                className="AntImageFilesListHorizontal__download"
                onClick={event => {
                  event.stopPropagation();
                  onDownload?.(item);
                }}
              />
            </div>
          }
        />
      </div>
    );
  };

  const imagesSrc = useMemo(() => {
    return filesState.reduce<string[]>((result, fileState) => {
      if (fileState.response?.src) {
        return result.concat(fileState.response?.src);
      }
      return result;
    }, []);
  }, [filesState]);
  return (
    <AntImage.PreviewGroup items={imagesSrc}>
      <div className="AntImageFilesListHorizontal__container">{filesState.map(renderItem)}</div>
    </AntImage.PreviewGroup>
  );
};

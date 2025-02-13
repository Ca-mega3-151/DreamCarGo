import { Upload as AntUpload, UploadProps as AntUploadProps } from 'antd';
import { AxiosRequestConfig } from 'axios';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { useDeepCompareEffect, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { NormalFilesList } from '../../NormalFilesList';
import { FileState } from './types/FileState';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface Props<Response extends AnyRecord>
  extends Pick<AntUploadProps, 'className' | 'children' | 'disabled' | 'accept'> {
  value?: FileState<Response>[];
  /** Function to handle the file upload request. */
  request: (params: {
    file: File;
    onUploadProgress: AxiosRequestConfig['onUploadProgress'];
  }) => Promise<Response | undefined>;
  /** Callback function triggered when the state of the files changes. */
  onStateChange?: (filesState: FileState<Response>[] | undefined) => void;
  /** Maximum number of files that can be uploaded. */
  maxCount?: number;
  /** The maximum allowable file size in bytes */
  maxFileSize?: number;
  /** Callback to handle cases where the file size exceeds the maximum allowable limit */
  onTooLarge?: (file: File) => void;
  /** The variant of the upload component, either 'wrapper' or 'dragger' */
  uploadVariant?: 'wrapper' | 'dragger';
  /** Function to render the list of files. */
  renderFilesList?: (filesState: FileState<Response>[] | undefined) => ReactNode;
  /** Callback function triggered when all files have been successfully uploaded. */
  onFulfilled?: (filesState: FileState<Response>[]) => void;
}

/**
 * UploadMultiple component extends the functionality of the Ant Design Upload component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Upload component.
 *
 * @param {Object} props - The properties for the UploadMultiple component.
 * @param {string} [props.className] - Custom CSS class for styling the upload component.
 * @param {ReactNode} [props.children] - Content to be displayed inside the upload area.
 * @param {boolean} [props.disabled] - Whether the upload component is disabled.
 * @param {string} [props.accept] - File types accepted by the upload component.
 * @param {number} [props.maxCount] - Maximum number of files that can be uploaded. Default is `Number.MAX_SAFE_INTEGER`.
 * @param {FileState<any>[]} [props.value] - The current state of the files being uploaded.
 * @param {function} props.request - Function to handle the file upload request.
 * @param {function} [props.onStateChange] - Callback function triggered when the state of the files changes.
 * @param {number} [props.maxFileSize] - The maximum allowable file size in bytes.
 * @param {(file: File) => void} [props.onTooLarge] - Callback to handle cases where the file size exceeds the maximum allowable limit.
 * @param {'wrapper' | 'dragger'} [props.uploadVariant='dragger'] - The variant of the upload component.
 * @param {function} [props.renderFilesList] - Function to render the list of files.
 * @param {function} [props.onFulfilled] - Callback function triggered when all files have been successfully uploaded.
 * @returns {ReactNode} The rendered UploadMultiple component.
 */
export const UploadMultiple = <Response extends AnyRecord>({
  accept,
  className,
  children,
  disabled,
  value = [],
  request,
  onStateChange,
  maxCount = Number.MAX_SAFE_INTEGER,
  maxFileSize,
  onTooLarge,
  uploadVariant = 'dragger',
  onFulfilled,
  renderFilesList,
}: Props<Response>): ReactNode => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState<FileState<Response>[]>(value);
  const isUploadingAtLeastOneFile = useRef<boolean>(false);

  const handleStateChange = (): void => {
    const isUndefined = isEmpty(valueState) || null;
    const value = isUndefined ? undefined : valueState;
    isUploadingAtLeastOneFile.current = !!valueState.find(fileState => {
      return fileState.status === 'loading';
    });
    onStateChange?.(value);
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      handleStateChange();
      if (!isUploadingAtLeastOneFile.current) {
        onFulfilled?.(valueState);
      }
    }
  }, [valueState]);

  useDeepCompareEffect(() => {
    setValueState(value ?? []);
  }, [value]);

  const mergedRenderFilesList = (): ReactNode => {
    if (renderFilesList) {
      return renderFilesList(valueState);
    }
    return (
      <NormalFilesList
        filesState={valueState}
        onDelete={fileState => {
          setValueState(state => {
            return state.filter(item => {
              return item.uid !== fileState.uid;
            });
          });
        }}
      />
    );
  };

  const Upload = uploadVariant === 'dragger' ? AntUpload.Dragger : AntUpload;
  return (
    <>
      <Upload
        multiple
        showUploadList={false}
        accept={accept}
        children={children}
        disabled={disabled}
        className={classNames('AntUploadMultiple__container', className)}
        beforeUpload={(file, fileList) => {
          const index = fileList.findIndex(item => {
            return item.uid === file.uid;
          });
          if (index > maxCount - 1) {
            return false;
          }
          return undefined;
        }}
        customRequest={async ({ file }) => {
          if (valueState.length >= maxCount) {
            return;
          }
          if (!(file instanceof File)) {
            return;
          }
          if (maxFileSize && file.size > maxFileSize) {
            onTooLarge?.(file);
            return;
          }
          const uid = v4();
          setValueState(state => {
            return state.concat({
              file: {
                name: file.name,
                size: file.size,
                originalFile: file,
              },
              uid,
              status: 'loading',
              progressPercent: 0,
              response: undefined,
            });
          });
          try {
            const response = await request({
              file,
              onUploadProgress: event => {
                const progress = event.progress ?? 0;
                const percent = progress * 100;
                setValueState(state => {
                  return state.map(item => {
                    if (item.uid === uid) {
                      return {
                        ...item,
                        progressPercent: percent,
                      };
                    }
                    return item;
                  });
                });
              },
            });
            setValueState(state => {
              return state.map(item => {
                if (item.uid === uid) {
                  return {
                    ...item,
                    response,
                    status: 'success',
                  };
                }
                return item;
              });
            });
          } catch (error) {
            setValueState(state => {
              return state.map(item => {
                if (item.uid === uid) {
                  return {
                    ...item,
                    status: 'failure',
                  };
                }
                return item;
              });
            });
          }
        }}
      />
      {mergedRenderFilesList?.()}
    </>
  );
};

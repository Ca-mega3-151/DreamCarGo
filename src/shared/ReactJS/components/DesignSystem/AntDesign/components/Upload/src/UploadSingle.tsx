import { Upload as AntUpload, UploadProps as AntUploadProps } from 'antd';
import { UploadRef as AntUploadRef } from 'antd/es/upload/Upload';
import { AxiosRequestConfig } from 'axios';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { useDeepCompareEffect, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { NormalFile } from '../../NormalFile';
import { FileState } from './types/FileState';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface Props<Response extends AnyRecord>
  extends Pick<AntUploadProps, 'className' | 'children' | 'disabled' | 'accept'> {
  /** The current file state value */
  value?: FileState<Response>;
  /** Function to handle the upload request */
  request: (params: {
    file: File;
    onUploadProgress: AxiosRequestConfig['onUploadProgress'];
  }) => Promise<Response | undefined>;
  /** Callback to handle state change */
  onStateChange?: (fileState: FileState<Response> | undefined) => void;
  /** The maximum allowable file size in bytes */
  maxFileSize?: number;
  /** Callback to handle cases where the file size exceeds the maximum allowable limit */
  onTooLarge?: (file: File) => void;
  /** The variant of the upload component, either 'wrapper' or 'dragger' */
  uploadVariant?: 'wrapper' | 'dragger';
  /** Function to render the file. */
  renderFile?: (fileState: FileState<Response> | undefined) => ReactNode;
}

/**
 * UploadSingle component extends the functionality of the Ant Design Upload component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Upload component.
 *
 * @param {Props<Response>} props - The properties for the UploadSingle component.
 * @param {string} [props.className] - Custom CSS class for styling the upload container.
 * @param {ReactNode} [props.children] - The trigger element for the upload.
 * @param {boolean} [props.disabled] - Whether the upload functionality is disabled.
 * @param {string} [props.accept] - Accepted file types for the upload.
 * @param {FileState<Response>} [props.value] - The current state of the file upload.
 * @param {(params: { file: File; onUploadProgress: AxiosRequestConfig['onUploadProgress'] }) => Promise<Response | undefined>} props.request - The function to handle the file upload request.
 * @param {(fileState: FileState<Response> | undefined) => void} [props.onStateChange] - Callback to handle state changes.
 * @param {number} [props.maxFileSize] - The maximum allowable file size in bytes.
 * @param {(file: File) => void} [props.onTooLarge] - Callback to handle cases where the file size exceeds the maximum allowable limit.
 * @param {'wrapper' | 'dragger'} [props.uploadVariant='dragger'] - The variant of the upload component.
 * @param {function} [props.renderFile] - Function to render the file.
 * @returns {ReactNode} The rendered UploadSingle component.
 */
export const UploadSingle = <Response extends AnyRecord>({
  accept,
  className,
  children,
  disabled,
  value,
  request,
  onStateChange,
  maxFileSize,
  onTooLarge,
  uploadVariant = 'dragger',
  renderFile,
}: Props<Response>): ReactNode => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState<FileState<Response> | undefined>(value);
  const ref = useRef<AntUploadRef | null>(null);

  const handleChange = (): void => {
    const isUndefined = isEmpty(valueState) || null;
    const value = isUndefined ? undefined : valueState;
    onStateChange?.(value);
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      handleChange();
    }
  }, [valueState]);

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  const mergedRenderFile = (): ReactNode => {
    if (renderFile) {
      return renderFile(valueState);
    }

    if (!valueState) {
      return null;
    }

    return (
      <NormalFile
        fileState={valueState}
        onDelete={() => {
          return setValueState(undefined);
        }}
      />
    );
  };

  const Upload = uploadVariant === 'dragger' ? AntUpload.Dragger : AntUpload;

  return (
    <>
      <Upload
        ref={ref}
        multiple={false}
        showUploadList={false}
        accept={accept}
        children={children}
        disabled={disabled}
        className={classNames('AntUploadSingle__container', className)}
        customRequest={async ({ file }) => {
          if (!(file instanceof File)) {
            return;
          }
          if (maxFileSize && file.size > maxFileSize) {
            onTooLarge?.(file);
            return;
          }
          const uid = v4();
          setValueState({
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
          try {
            const response = await request({
              file,
              onUploadProgress: event => {
                const progress = event.progress ?? 0;
                const percent = progress * 100;
                setValueState(state => {
                  if (state) {
                    return {
                      ...state,
                      progressPercent: percent,
                    };
                  }
                  return;
                });
              },
            });
            setValueState(state => {
              if (state) {
                return {
                  ...state,
                  response,
                  status: 'success',
                };
              }
              return;
            });
          } catch (error) {
            setValueState(state => {
              if (state) {
                return {
                  ...state,
                  status: 'failure',
                };
              }
              return;
            });
          }
        }}
      />
      {mergedRenderFile()}
    </>
  );
};

import { FileExcelOutlined } from '@ant-design/icons';
import { ReactNode, useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Modal, ModalProps } from '../../../components/Modal';
import { UploadSingle, UploadSingleProps } from '../../../components/Upload';
import './styles.css';

export interface Props extends Pick<ModalProps, 'open' | 'onCancel'> {
  /** File types that the input should accept. */
  accept?: string;
  /** The file that is currently selected. */
  value?: File;
  /** Callback when the file changes. */
  onChange?: (file: File | undefined) => void;
  /** Whether the file is being validated. */
  isValidating: boolean;
  /** Callback to validate the file. */
  onValidate: (file: File) => void | Promise<void>;
  /** Whether a sample file is being downloaded. */
  isDownloadingSample: boolean;
  /** Callback to download a sample file. */
  onDownloadSample: () => void;
  /** Texts for various parts of the UI. */
  texts: {
    /** Text for the OK button. */
    okText: string;
    /** Text for the Cancel button. */
    cancelText: string;
    /** Text for the Download Sample link. */
    downloadSample: string;
    /** Title of the modal. */
    modalTitle: string;
    /** Text for the Add File button. */
    addFileButton: string;
    /** Text for the Replace File button. */
    replaceFileButton: string;
  };
}

/**
 * `ImportData` is a React functional component that allows users to upload and validate a file.
 * It also provides functionality to download a sample file.
 *
 * @param {Props} props - The props for the component.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {() => void} props.onCancel - Callback to handle the modal cancel action.
 * @param {string} [props.accept] - File types that the input should accept.
 * @param {File} [props.value] - The file that is currently selected.
 * @param {(file: File | undefined) => void} [props.onChange] - Callback when the file changes.
 * @param {boolean} props.isValidating - Whether the file is being validated.
 * @param {(file: File) => void | Promise<void>} props.onValidate - Callback to validate the file.
 * @param {boolean} props.isDownloadingSample - Whether a sample file is being downloaded.
 * @param {() => void} props.onDownloadSample - Callback to download a sample file.
 * @param {Object} props.texts - Texts for various parts of the UI.
 * @param {string} props.texts.okText - Text for the OK button.
 * @param {string} props.texts.cancelText - Text for the Cancel button.
 * @param {string} props.texts.downloadSample - Text for the Download Sample link.
 * @param {string} props.texts.modalTitle - Title of the modal.
 * @param {string} props.texts.addFileButton - Text for the Add File button.
 * @param {string} props.texts.replaceFileButton - Text for the Replace File button.
 *
 * @returns {ReactNode} A React node representing the `ImportData` component.
 */
export const ImportData = ({
  open,
  onCancel,
  accept,
  value,
  onChange,
  onValidate,
  isValidating,
  texts,
  isDownloadingSample,
  onDownloadSample,
}: Props): ReactNode => {
  const [fileState, setFileState] = useState<File | undefined>(value);

  const handleUploadStateChange: UploadSingleProps<{}>['onStateChange'] = fileState => {
    const nextState = fileState?.file.originalFile;
    onChange?.(nextState);
    setFileState(nextState);
  };

  const handleUploadFile: UploadSingleProps<{}>['request'] = () => {
    return Promise.resolve({});
  };

  const renderDragger = (): ReactNode => {
    if (fileState) {
      return (
        <div className="ImportData__previewFileContainer">
          <div className="ImportData__previewFileIcon">
            <FileExcelOutlined />
          </div>
          <div className="ImportData__previewFileInfo">
            <div className="ImportData__fileName">{fileState.name}</div>
            <UploadSingle<{}>
              disabled={isValidating}
              className="ImportData__replaceFileButton"
              uploadVariant="wrapper"
              request={handleUploadFile}
              onStateChange={handleUploadStateChange}
              accept={accept}
              renderFile={() => {
                return null;
              }}
            >
              <Button disabled={isValidating}>{texts.replaceFileButton}</Button>
            </UploadSingle>
          </div>
        </div>
      );
    }
    return (
      <UploadSingle
        renderFile={() => {
          return null;
        }}
        className="ImportData__dragger"
        request={handleUploadFile}
        onStateChange={handleUploadStateChange}
        accept={accept}
      >
        <Button>{texts.addFileButton}</Button>
      </UploadSingle>
    );
  };

  useEffect(() => {
    setFileState(value);
  }, [value]);

  return (
    <Modal
      title={texts.modalTitle}
      open={open}
      okButtonProps={{ disabled: !fileState }}
      FooterLeft={
        <Button loading={isDownloadingSample} onClick={onDownloadSample} type="link">
          {texts.downloadSample}
        </Button>
      }
      afterClose={() => {
        return setFileState(undefined);
      }}
      onCancel={onCancel}
      confirmLoading={isValidating}
      okText={texts.okText}
      cancelText={texts.cancelText}
      onOk={() => {
        if (fileState) {
          onValidate?.(fileState);
        }
      }}
      width={600}
    >
      {renderDragger()}
    </Modal>
  );
};

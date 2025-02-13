import { Modal as AntModal, ModalProps as AntModalProps, Skeleton } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { Button, ButtonProps } from '../../Button';
import './styles.css';

export interface Props
  extends Pick<
    AntModalProps,
    | 'open'
    | 'className'
    | 'cancelText'
    | 'okText'
    | 'maskClosable'
    | 'zIndex'
    | 'width'
    | 'centered'
    | 'closable'
    | 'confirmLoading'
    | 'children'
    | 'title'
    | 'afterClose'
  > {
  /** Properties for the OK button. */
  okButtonProps?: Pick<ButtonProps, 'className' | 'color' | 'disabled' | 'htmlType' | 'form' | 'onClick'>;
  /** Properties for the cancel button. */
  cancelButtonProps?: Pick<ButtonProps, 'className' | 'color' | 'disabled' | 'htmlType' | 'form' | 'onClick'>;
  /** Footer content of the modal dialog. Set to `null` to hide the default footer. */
  footer?: ReactNode;
  /** Content to be displayed on the left side of the footer. */
  FooterLeft?: ReactNode;
  /** Mode of the footer, either 'sticky' or 'none'. */
  footerMode?: 'sticky' | 'none';
  /** Determines whether the modal's open state is controlled or uncontrolled. */
  openVariant?: 'controlled-state' | 'uncontrolled-state';
  /** Callback function invoked when the cancel button is clicked or the modal is closed. */
  onCancel?: () => void;
  /** Callback function invoked when the OK button is clicked. */
  onOk?: () => void;
  /** Whether the modal is in loading state. */
  loading?: boolean | { skeletonCount?: number; enable: boolean };
}

/**
 * Modal component extends the functionality of the Ant Design Modal component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Modal component.
 *
 * @param {Props} props - The properties for the Modal component.
 * @param {boolean} props.open - Whether the modal dialog is visible.
 * @param {() => void} props.onCancel - Callback function invoked when the cancel button is clicked or the modal is closed.
 * @param {() => void} props.onOk - Callback function invoked when the OK button is clicked.
 * @param {string} [props.className] - Custom CSS class for styling the modal.
 * @param {string} [props.cancelText] - Text of the cancel button.
 * @param {string} [props.okText] - Text of the OK button.
 * @param {boolean} [props.maskClosable] - Whether the modal can be closed by clicking the mask.
 * @param {number} [props.zIndex] - The z-index of the modal.
 * @param {string | number} [props.width] - The width of the modal dialog.
 * @param {ButtonProps} [props.okButtonProps] - Properties for the OK button.
 * @param {ButtonProps} [props.cancelButtonProps] - Properties for the cancel button.
 * @param {boolean} [props.centered] - Whether to center the modal dialog vertically in the screen.
 * @param {boolean} [props.closable] - Whether a close (x) button is visible on top right of the modal dialog.
 * @param {boolean} [props.confirmLoading] - Whether to apply a loading visual effect on the OK button while an operation is being performed.
 * @param {ReactNode} [props.children] - Content to be displayed inside the modal.
 * @param {ReactNode | string} [props.title] - Title of the modal dialog.
 * @param {ReactNode | null} [props.footer] - Footer content of the modal dialog. Set to `null` to hide the default footer.
 * @param {ReactNode} [props.FooterLeft] - Content to be displayed on the left side of the footer.
 * @param {'sticky' | 'none'} [props.footerMode] - Mode of the footer, either 'sticky' or 'none'.
 * @param {() => void} [props.afterClose] - Callback function invoked after the modal is completely closed.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.openVariant='uncontrolled-state'] - Determines whether the modal's open state is controlled externally or internally.
 * @param {boolean | { skeletonCount?: number; enable: boolean }} [props.loading] - Whether the modal is in loading state.
 * @returns {ReactNode} The rendered Modal component.
 */
export const Modal: FC<Props> = ({
  cancelText = 'Cancel',
  centered,
  className,
  closable,
  confirmLoading,
  maskClosable = false,
  okText = 'Ok',
  onCancel,
  onOk,
  open,
  width = 900,
  zIndex,
  children,
  title,
  footer,
  FooterLeft,
  cancelButtonProps,
  okButtonProps,
  footerMode = 'sticky',
  afterClose,
  openVariant = 'controlled-state',
  loading,
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();

  const [openState, setOpenState] = useState(open);

  const handleCancel = (): void => {
    if (openVariant === 'uncontrolled-state') {
      setOpenState(false);
    }
    onCancel?.();
  };
  const handleOk = (): void => {
    if (openVariant === 'uncontrolled-state') {
      setOpenState(false);
    }
    onOk?.();
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setOpenState(open);
    }
  }, [open]);

  const mergedOpenState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return false;
    }
    return openVariant === 'controlled-state' ? open : openState;
  }, [open, openState, isMounted, openVariant]);

  const enableSkeleton = (typeof loading === 'boolean' && loading) || (typeof loading === 'object' && loading.enable);
  const skeletonCount = typeof loading === 'object' ? loading.skeletonCount : 6;
  return (
    <AntModal
      mask
      keyboard
      destroyOnClose
      wrapClassName={classNames(
        'AntModal__container',
        footerMode === 'sticky' ? 'AntModal--footerSticky' : '',
        className,
      )}
      cancelText={cancelText}
      centered={centered}
      closable={closable}
      confirmLoading={confirmLoading}
      maskClosable={maskClosable}
      okText={okText}
      onCancel={handleCancel}
      onOk={handleOk}
      afterClose={afterClose}
      open={mergedOpenState}
      width={width}
      zIndex={zIndex}
      title={title}
      footer={() => {
        if (typeof footer !== 'undefined') {
          return footer;
        }
        return (
          <div className="AntModal__footer">
            <div className="AntModal__left">{FooterLeft}</div>
            <div className="AntModal__buttons">
              <Button
                {...cancelButtonProps}
                disabled={cancelButtonProps?.disabled ?? confirmLoading}
                onClick={event => {
                  handleCancel();
                  cancelButtonProps?.onClick?.(event);
                }}
              >
                {cancelText}
              </Button>
              <Button
                {...okButtonProps}
                color={okButtonProps?.color ?? 'primary'}
                loading={confirmLoading}
                onClick={event => {
                  handleOk();
                  okButtonProps?.onClick?.(event);
                }}
              >
                {okText}
              </Button>
            </div>
          </div>
        );
      }}
    >
      {enableSkeleton && <Skeleton active paragraph={{ rows: skeletonCount }} />}
      {!enableSkeleton && children}
    </AntModal>
  );
};

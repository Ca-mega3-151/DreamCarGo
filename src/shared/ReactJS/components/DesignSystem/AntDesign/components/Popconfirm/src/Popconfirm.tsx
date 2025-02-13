import { Popconfirm as AntPopconfirm, PopconfirmProps as AntPopconfirmProps } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { Button, ButtonProps } from '../../Button';
import { isBrowser } from '~/shared/Utilities';
import './styles.css';

export interface Props
  extends Pick<AntPopconfirmProps, 'className' | 'children' | 'okText' | 'cancelText' | 'disabled' | 'arrow' | 'open'> {
  /** The content of the Popconfirm. */
  content?: ReactNode;
  /** Properties for the OK button. */
  okButtonProps?: Pick<ButtonProps, 'className' | 'color' | 'disabled' | 'htmlType' | 'form' | 'onClick' | 'loading'>;
  /** Properties for the cancel button. */
  cancelButtonProps?: Pick<ButtonProps, 'className' | 'color' | 'disabled' | 'htmlType' | 'form' | 'onClick'>;
  /** Determines whether the popconfirm's open state is controlled or uncontrolled. */
  openVariant?: 'controlled-state' | 'uncontrolled-state';
  /** Callback function triggered when the cancel button is clicked. */
  onCancel?: () => void;
  /** Callback function triggered when the OK button is clicked. */
  onConfirm?: () => void;
}

/**
 * Popconfirm component extends the functionality of the Ant Design Popconfirm component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Popconfirm component.
 *
 * @param {Props} props - The properties for the Popconfirm component.
 * @param {boolean} props.open - Whether the Popconfirm is visible.
 * @param {boolean} [props.arrow=true] - Whether to display an arrow pointing to the reference element.
 * @param {Object} [props.cancelButtonProps] - Properties for the cancel button.
 * @param {string|ReactNode} [props.cancelText] - The text of the cancel button.
 * @param {ReactNode} [props.children] - The content of the Popconfirm.
 * @param {string} [props.className] - Custom CSS class for styling the Popconfirm.
 * @param {string|ReactNode} [props.content] - The content of the Popconfirm.
 * @param {boolean} [props.disabled] - Whether the Popconfirm is disabled.
 * @param {Object} [props.okButtonProps] - Properties for the OK button.
 * @param {string|ReactNode} [props.okText] - The text of the OK button.
 * @param {Function} [props.onCancel] - Callback function triggered when the cancel button is clicked.
 * @param {Function} [props.onConfirm] - Callback function triggered when the OK button is clicked.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.openVariant='uncontrolled-state'] - Determines whether the popconfirm's open state is controlled externally or internally.
 * @returns {ReactNode} The rendered Popconfirm component.
 */
export const Popconfirm: FC<Props> = ({
  arrow = true,
  cancelButtonProps,
  cancelText = 'Cancel',
  children,
  className,
  content,
  disabled,
  okButtonProps,
  okText = 'OK',
  open,
  onCancel,
  onConfirm,
  openVariant = 'uncontrolled-state',
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [openState, setOpenState] = useState(!isBrowser() ? false : open);

  const handleCancel: AntPopconfirmProps['onCancel'] = () => {
    if (openVariant === 'uncontrolled-state') {
      setOpenState(false);
    }
    onCancel?.();
  };
  const handleConfirm: AntPopconfirmProps['onConfirm'] = () => {
    if (openVariant === 'uncontrolled-state') {
      setOpenState(false);
    }
    onConfirm?.();
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

  return (
    <AntPopconfirm
      open={mergedOpenState}
      icon={null}
      arrow={arrow}
      className={classNames('AntPopconfirm__container', className)}
      overlayClassName="AntPopconfirm__overlay"
      cancelText={cancelText}
      children={children}
      disabled={disabled}
      okText={okText}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      onOpenChange={setOpenState}
      title={
        <div className="AntPopup__content">
          <div className="AntPopup__body">{content}</div>
          <div className="AntPopup__footer">
            <Button
              {...cancelButtonProps}
              size="small"
              onClick={event => {
                handleCancel();
                cancelButtonProps?.onClick?.(event);
              }}
            >
              {cancelText}
            </Button>
            <Button
              {...okButtonProps}
              size="small"
              color={okButtonProps?.color ?? 'primary'}
              onClick={event => {
                handleConfirm();
                okButtonProps?.onClick?.(event);
              }}
            >
              {okText}
            </Button>
          </div>
        </div>
      }
    />
  );
};

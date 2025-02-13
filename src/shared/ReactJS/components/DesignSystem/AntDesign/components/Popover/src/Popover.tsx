import { Popover as AntPopover, PopoverProps as AntPopoverProps } from 'antd';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import './styles.css';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<
    AntPopoverProps,
    | 'className'
    | 'arrow'
    | 'trigger'
    | 'color'
    | 'children'
    | 'overlayClassName'
    | 'open'
    | 'onOpenChange'
    | 'getPopupContainer'
    | 'placement'
  > {
  /** Whether the popover is disabled. */
  disabled?: boolean;
  /** The content of the popover. */
  content: AntPopoverProps['content'];
  /** Determines whether the popover's open state is controlled or uncontrolled. */
  openVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Popover component extends the functionality of the Ant Design Popover component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Popover component.
 *
 * @param {Props} props - The properties for the Popover component.
 * @param {string} [props.className] - Custom CSS class for styling the popover.
 * @param {boolean} [props.arrow=true] - Whether to display an arrow pointing to the reference element.
 * @param {ReactNode} [props.children] - The trigger of the popover.
 * @param {string} [props.color] - The color of the popover.
 * @param {string|ReactNode} [props.content] - The content of the popover.
 * @param {string} [props.trigger] - The trigger mode which can be 'hover', 'focus', 'click', or 'contextMenu'.
 * @param {string} [props.overlayClassName] - Custom CSS class for the overlay.
 * @param {boolean} [props.disabled=false] - Whether the popover is disabled.
 * @param {boolean} [props.open] - Whether the popover is visible, in controlled mode.
 * @param {function} [props.onOpenChange] - Callback when the open state changes.
 * @param {string} [props.openVariant='uncontrolled-state'] - Determines whether the popover's open state is controlled externally or internally.
 * @param {function} [props.getPopupContainer] - Function to determine the container in which the popover is rendered.
 * @param {string} [props.placement] - The position of the popover relative to the target.
 * @returns {ReactNode} The rendered Popover component.
 */
export const Popover = ({
  className,
  arrow = true,
  children,
  color,
  content,
  trigger,
  overlayClassName,
  disabled = false,
  open,
  onOpenChange,
  openVariant = 'uncontrolled-state',
  getPopupContainer,
  placement,
}: Props): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [openState, setOpenState] = useState(open);

  const handleOpenChange: AntPopoverProps['onOpenChange'] = open => {
    onOpenChange?.(open);
    if (openVariant === 'uncontrolled-state') {
      setOpenState(open);
    }
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setOpenState(open);
    }
  }, [open]);

  const mergedOpenState = useDeepCompareMemo(() => {
    if ((initializeContext?.isSSR && !isMounted) || disabled) {
      return false;
    }
    return openVariant === 'controlled-state' ? open : openState;
  }, [open, openState, isMounted, openVariant]);

  return (
    <AntPopover
      destroyTooltipOnHide
      placement={placement}
      getPopupContainer={getPopupContainer}
      arrow={arrow}
      children={children}
      color={color}
      content={content}
      trigger={trigger}
      className={classNames('AntPopover__container', className)}
      overlayClassName={classNames('AntPopover__overlay', overlayClassName)}
      open={mergedOpenState}
      onOpenChange={handleOpenChange}
    />
  );
};

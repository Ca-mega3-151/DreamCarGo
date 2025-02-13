import { Tooltip as AntTooltip, TooltipProps as AntTooltipProps } from 'antd';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import './styles.css';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<
    AntTooltipProps,
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
  /** Whether the tooltip is disabled. */
  disabled?: boolean;
  /** The content of the tooltip. */
  content?: AntTooltipProps['title'];
  /** Determines whether the tooltip's open state is controlled or uncontrolled. */
  openVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Tooltip component extends the functionality of the Ant Design Tooltip component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tooltip component.
 *
 * @param {Props} props - The properties for the Tooltip component.
 * @param {string} [props.className] - Custom CSS class for styling the tooltip.
 * @param {boolean} [props.arrow=true] - Whether to display an arrow pointing to the reference element.
 * @param {ReactNode} [props.children] - The trigger of the tooltip.
 * @param {string} [props.color] - The color of the tooltip.
 * @param {string|ReactNode} [props.content] - The content of the tooltip.
 * @param {string} [props.trigger] - The trigger mode which can be 'hover', 'focus', 'click', or 'contextMenu'.
 * @param {string} [props.overlayClassName] - Custom CSS class for the overlay.
 * @param {boolean} [props.disabled=false] - Whether the tooltip is disabled.
 * @param {boolean} [props.open] - Whether the tooltip is visible, in controlled mode.
 * @param {function} [props.onOpenChange] - Callback when the open state changes.
 * @param {string} [props.openVariant='uncontrolled-state'] - Determines whether the tooltip's open state is controlled externally or internally.
 * @param {function} [props.getPopupContainer] - Function to determine the container in which the tooltip is rendered.
 * @param {string} [props.placement] - The position of the tooltip relative to the target.
 * @returns {ReactNode} The rendered Tooltip component.
 */
export const Tooltip = ({
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

  const handleOpenChange: AntTooltipProps['onOpenChange'] = open => {
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
    <AntTooltip
      destroyTooltipOnHide
      placement={placement}
      getPopupContainer={getPopupContainer}
      arrow={arrow}
      children={children}
      color={color}
      title={content}
      trigger={trigger}
      className={classNames('AntTooltip__container', className)}
      overlayClassName={classNames('AntTooltip__overlay', overlayClassName)}
      open={mergedOpenState}
      onOpenChange={handleOpenChange}
    />
  );
};

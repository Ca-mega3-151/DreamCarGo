import { Drawer as AntDrawer, DrawerProps as AntDrawerProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props
  extends Pick<
    AntDrawerProps,
    | 'open'
    | 'className'
    | 'maskClosable'
    | 'onClose'
    | 'placement'
    | 'title'
    | 'closeIcon'
    | 'footer'
    | 'children'
    | 'mask'
    | 'afterOpenChange'
  > {
  /** Width of the drawer. */
  width?: number;
  /** Whether the drawer is in loading state. */
  loading?: boolean;
}

/**
 * Drawer component extends the functionality of the Ant Design Drawer component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Drawer component.
 *
 * @param {Props} props - The properties for the Drawer component.
 * @param {boolean} props.open - Whether the drawer is open.
 * @param {string} [props.className] - Custom CSS class for styling the drawer.
 * @param {boolean} [props.maskClosable=true] - Whether to close the drawer when the mask is clicked.
 * @param {Function} [props.onClose] - Callback function triggered when the drawer is closed.
 * @param {string} [props.placement='right'] - The placement of the drawer ('top' | 'right' | 'bottom' | 'left').
 * @param {ReactNode} [props.title] - The title of the drawer.
 * @param {ReactNode} [props.closeIcon] - The custom close icon.
 * @param {ReactNode} [props.footer] - The footer of the drawer.
 * @param {ReactNode} [props.children] - The content of the drawer.
 * @param {boolean} [props.mask] - Whether to show mask or not
 * @param {boolean} [props.mask=true] - Whether to display the mask (overlay behind the drawer).
 * @param {Function} [props.afterOpenChange] - Callback triggered after the open state of the drawer changes.
 * @param {number} [props.width] - Width of the drawer.
 * @param {boolean} [props.loading=false] - Whether the drawer is in loading state.
 * @returns {ReactNode} The rendered Drawer component.
 */
export const Drawer: FC<Props> = ({
  className,
  open,
  maskClosable,
  onClose,
  placement,
  title,
  closeIcon,
  footer,
  width,
  children,
  loading,
  mask = true,
  afterOpenChange,
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();

  const mergedOpenState = useDeepCompareMemo(() => {
    return initializeContext?.isSSR && !isMounted ? false : open;
  }, [isMounted, open]);

  return (
    <AntDrawer
      keyboard
      mask={mask}
      loading={loading}
      children={children}
      destroyOnClose
      className={classNames('AntDrawer__container', className)}
      maskClosable={maskClosable}
      placement={placement}
      title={title}
      closeIcon={closeIcon}
      footer={footer}
      width={width}
      open={mergedOpenState}
      onClose={onClose}
      afterOpenChange={afterOpenChange}
    />
  );
};

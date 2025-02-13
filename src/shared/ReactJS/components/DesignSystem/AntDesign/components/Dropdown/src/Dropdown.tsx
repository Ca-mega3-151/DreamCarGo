import { Dropdown as AntDropdown, DropdownProps as AntDropdownProps, theme } from 'antd';
import classNames from 'classnames';
import { ReactNode, UIEventHandler, cloneElement, useMemo } from 'react';
import { useInitializeContext } from '../../../base';
import { Divider } from '../../Divider';
import './styles.css';

export interface Item {
  /** The unique key for the menu item. */
  key: string;
  /** The label of the menu item. */
  label: ReactNode;
  /** The children items of the menu item. */
  children?: Array<Group | Item | Divider>;
  /** The icon for the menu item. */
  icon?: ReactNode;
  /** Whether the menu item is disabled. */
  disabled?: boolean;
  /** Whether the menu item is marked as dangerous. */
  danger?: boolean;
  /** The function to be called when the menu item is clicked. */
  onClick?: () => void;
  /** If true, the item will be hidden. */
  hidden?: boolean;
  /** The class name to be applied to the item. */
  className?: string;
}

export interface Group {
  /** Specifies that this item is a group. */
  type: 'group';
  /** The label of the group. */
  label: ReactNode;
  /** The children items of the group. */
  children: Array<Group | Item | Divider>;
}

export interface Divider {
  /** Specifies that this item is a divider. */
  type: 'divider';
}

export interface Props
  extends Pick<
    AntDropdownProps,
    'children' | 'className' | 'trigger' | 'arrow' | 'open' | 'onOpenChange' | 'placement'
  > {
  /** The menu items to be displayed. */
  items?: Item[];
  /** The icon for expanding the menu items. */
  expandIcon?: ReactNode;
  /** The footer to be displayed at the bottom of the dropdown. */
  footer?: ReactNode;
  /** The maximum height of the dropdown menu. If the content exceeds this height, the menu will become scrollable. */
  menuMaxHeight?: string | number;
  /** Callback function that is triggered when the menu is scrolled. Can be used to load more items dynamically or track scroll position. */
  onMenuScroll?: UIEventHandler<HTMLDivElement>;
}

/**
 * Dropdown component extends the functionality of the Ant Design Dropdown component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Dropdown component.
 *
 * @param {Props} props - The properties for the Dropdown component.
 * @param {ReactNode} [props.children] - The trigger element for the dropdown.
 * @param {string} [props.className] - Custom CSS class for styling the dropdown.
 * @param {Array<Item>} [props.items] - The menu items to be displayed.
 * @param {ReactNode} [props.expandIcon] - The icon for expanding the menu items.
 * @param {ReactNode} [props.footer] - The footer to be displayed at the bottom of the dropdown.
 * @param {boolean} [props.arrow=true] - Whether to show the arrow on the dropdown.
 * @param {string[]} [props.trigger] - The trigger mode of the dropdown.
 * @param {string | number} [props.menuMaxHeight] - The maximum height for the dropdown menu; makes the menu scrollable if content exceeds this height.
 * @param {UIEventHandler<HTMLDivElement>} [props.onMenuScroll] - Function that gets called when the dropdown menu is scrolled.
 * @param {Function} [props.onOpenChange] - Function that gets called when the dropdown's open state is changed.
 * @param {boolean} [props.open] - Whether the dropdown menu is currently open.
 * @param {boolean} [props.placement] - Placement of popup menu.
 * @returns {ReactNode} The rendered Dropdown component.
 */
export const Dropdown = ({
  children,
  className,
  arrow = true,
  trigger = ['click'],
  items = [],
  expandIcon,
  footer,
  menuMaxHeight,
  onMenuScroll,
  onOpenChange,
  open,
  placement,
}: Props): ReactNode => {
  useInitializeContext();
  const { token } = theme.useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const dropdownRender: AntDropdownProps['dropdownRender'] = menu => {
    if (footer) {
      return (
        <div style={contentStyle}>
          <div
            onScroll={onMenuScroll}
            style={{
              maxHeight: menuMaxHeight,
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            {cloneElement(menu as React.ReactElement, { style: menuStyle })}
          </div>
          <Divider className="AntDropdown__divider" />
          <div className="AntDropdown__footer">{footer}</div>
        </div>
      );
    }
    return menu;
  };

  const isEmpty = useMemo(() => {
    return (
      items.length === 0 ||
      items.findIndex(item => {
        return item.hidden === true;
      }) !== -1
    );
  }, [items]);

  if (isEmpty) {
    return null;
  }

  return (
    <AntDropdown
      onOpenChange={onOpenChange}
      open={open}
      children={children}
      destroyPopupOnHide
      arrow={arrow}
      trigger={trigger}
      overlayClassName="AntDropdown__overlay"
      className={classNames('AntDropdown__container', className)}
      dropdownRender={dropdownRender}
      menu={{ items, expandIcon }}
      placement={placement}
    />
  );
};

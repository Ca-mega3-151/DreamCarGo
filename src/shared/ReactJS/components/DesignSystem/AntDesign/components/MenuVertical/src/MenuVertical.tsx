import { Menu as AntMenu, MenuProps as AntMenuProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode } from 'react';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface MenuItem<Key extends string> {
  /** The unique key for the menu item. */
  key: string;
  /** The label of the menu item. */
  label: ReactNode;
  /** The icon of the menu item. */
  icon?: ReactNode;
  /** The children items of the menu item. */
  children?: Array<MenuGroup<Key> | MenuItem<Key>>;
  /** Whether the menu item is disabled. */
  disabled?: boolean;
  /** Whether the menu item is marked as dangerous. */
  danger?: boolean;
  /** Callback function triggered when the item is clicked. */
  onClick?: () => void;
  /** If true, the item will be hidden. */
  hidden?: boolean;
  /** The class name to be applied to the menu item. */
  className?: string;
}

export interface MenuGroup<Key extends string> {
  /** Specifies that this item is a group. */
  type: 'group';
  /** The label of the group. */
  label: ReactNode;
  /** The children items of the group. */
  children: Array<MenuGroup<Key> | MenuItem<Key>>;
  className?: string;
  /** If true, the item will be hidden. */
  hidden?: boolean;
}

export interface Props<Key extends string>
  extends Pick<AntMenuProps, 'className' | 'inlineCollapsed' | 'inlineIndent'> {
  /** The icon for expanding the menu items. */
  expandIcon?: ReactNode;
  /** The menu items to be displayed. */
  items?: MenuItem<Key>[];
  /** The keys of the currently open submenus. */
  openKeys?: Key[];
  /** The key of the currently selected item. */
  selectedKey?: Key;
  /** Callback function triggered when a menu item is selected. */
  onSelect?: (key: undefined | Key) => void;
  /** Callback function triggered when the open keys change. */
  onOpenChange?: (keys: undefined | Key[]) => void;
  /** Custom header component to be displayed above the menu. */
  Header?: ReactNode;
  /** Custom footer component to be displayed below the menu. */
  Footer?: ReactNode;
}

/**
 * MenuVertical component extends the functionality of the Ant Design Menu component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Menu component.
 *
 * @param {Props<Key>} props - The properties for the Menu component.
 * @param {string} [props.className] - Custom CSS class for styling the menu.
 * @param {boolean} [props.inlineCollapsed] - Whether the inline menu is collapsed.
 * @param {number} [props.inlineIndent=20] - Indent width of inline menu items.
 * @param {ReactNode} [props.expandIcon] - The icon for expanding the menu items.
 * @param {MenuItem<Key>[]} [props.items=[]] - The menu items to be displayed.
 * @param {Key[]} [props.openKeys] - The keys of the currently open submenus.
 * @param {Key} [props.selectedKey] - The key of the currently selected item.
 * @param {Function} [props.onSelect] - Callback function triggered when a menu item is selected.
 * @param {Function} [props.onOpenChange] - Callback function triggered when the open keys change.
 * @param {ReactNode} [props.Header] - Custom header component to be displayed above the menu.
 * @param {ReactNode} [props.Footer] - Custom footer component to be displayed below the menu.
 * @returns {ReactNode} The rendered Menu component.
 */
export const MenuVertical = <Key extends string>({
  className,
  inlineCollapsed,
  inlineIndent = 20,
  expandIcon,
  items = [],
  selectedKey,
  openKeys,
  onOpenChange,
  onSelect,
  Header,
  Footer,
}: Props<Key>): ReactNode => {
  useInitializeContext();

  const handleSelect: AntMenuProps['onSelect'] = item => {
    const isUndefined = isEmpty(item) || null;
    onSelect?.(isUndefined ? undefined : (item.key as Key));
  };

  const handleOpenChange: AntMenuProps['onOpenChange'] = keys => {
    const isUndefined = isEmpty(keys) || null;
    onOpenChange?.(isUndefined ? undefined : (keys as Key[]));
  };

  return (
    <div className="AntMenuVertical__container">
      <div className="AntMenuVertical__header" style={{ paddingInline: inlineIndent }}>
        {Header}
      </div>
      <AntMenu
        onSelect={handleSelect}
        selectedKeys={selectedKey ? [selectedKey] : []}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        selectable
        triggerSubMenuAction="click"
        mode="inline"
        multiple={false}
        className={classNames('AntMenuVertical__menu', className)}
        inlineCollapsed={inlineCollapsed}
        inlineIndent={inlineIndent}
        expandIcon={expandIcon}
        items={items}
      />
      <div className="AntMenuVertical__footer" style={{ paddingInline: inlineIndent }}>
        {Footer}
      </div>
    </div>
  );
};

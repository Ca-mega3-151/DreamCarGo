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
}

export interface MenuGroup<Key extends string> {
  /** Specifies that this item is a group. */
  type: 'group';
  /** The label of the group. */
  label: ReactNode;
  /** The children items of the group. */
  children: Array<MenuGroup<Key> | MenuItem<Key>>;
  /** If true, the item will be hidden. */
  hidden?: boolean;
}

export interface Props<Key extends string> extends Pick<AntMenuProps, 'className'> {
  /** The icon for expanding the menu items. */
  expandIcon?: ReactNode;
  /** The menu items to be displayed. */
  items?: MenuItem<Key>[];
  /** The key of the currently selected item. */
  selectedKey?: Key;
  /** Callback function triggered when a menu item is selected. */
  onSelect?: (key: undefined | Key) => void;
}

/**
 * MenuHorizontal component extends the functionality of the Ant Design Menu component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Menu component.
 *
 * @param {ReactNode} [props.expandIcon] - The icon for expanding the menu items.
 * @param {MenuItem<Key>[]} [props.items=[]] - The menu items to be displayed.
 * @param {Key} [props.selectedKey] - The key of the currently selected item.
 * @param {Function} [props.onSelect] - Callback function triggered when a menu item is selected.
 * @returns {ReactNode} The rendered Menu component.
 */
export const MenuHorizontal = <Key extends string>({
  className,
  expandIcon,
  items = [],
  selectedKey,
  onSelect,
}: Props<Key>): ReactNode => {
  useInitializeContext();

  const handleSelect: AntMenuProps['onSelect'] = item => {
    const isUndefined = isEmpty(item) || null;
    onSelect?.(isUndefined ? undefined : (item.key as Key));
  };

  return (
    <AntMenu
      onSelect={handleSelect}
      selectedKeys={selectedKey ? [selectedKey] : []}
      triggerSubMenuAction="click"
      mode="horizontal"
      multiple={false}
      className={classNames('AntMenuHorizontal__container', className)}
      expandIcon={expandIcon}
      items={items}
    />
  );
};

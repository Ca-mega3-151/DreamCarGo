import { MoreOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Dropdown, DropdownItem } from '../../../components/Dropdown';
import './styles.css';

export interface Props {
  /** An array of items to be displayed in the dropdown menu. Each item should be of type ItemType and can optionally have a 'hidden' property to hide it from the menu. */
  items: DropdownItem[];
}

/**
 * TableActions component displays a dropdown menu of actions for a table.
 * @param {Props} props - The component props.
 * @param {DropdownItem[]} props.items - An array of items to be displayed in the dropdown menu.
 * Each item should be of type ItemType and can optionally have a 'hidden' property to hide it from the menu.
 * @returns {JSX.Element} The rendered TableActions component.
 */
export const TableActions: FC<Props> = ({ items }) => {
  return (
    <Dropdown items={items}>
      <div className="TableActions__container">
        <MoreOutlined />
      </div>
    </Dropdown>
  );
};

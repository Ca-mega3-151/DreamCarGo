import { Tabs as AntTabs, TabsProps as AntTabsProps } from 'antd';
import classNames from 'classnames';
import { ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

export interface Props<Key extends string> extends Pick<AntTabsProps, 'className' | 'moreIcon' | 'tabPosition'> {
  /** Array of tab objects containing key, label, children, and optional disabled and hidden properties. */
  tabs?: Array<{
    /** Unique key for the tab. */
    key: Key;
    /** The label to display on the tab. */
    label: ReactNode;
    /** The content to display when the tab is active. */
    children?: ReactNode;
    /** Whether the tab is disabled. */
    disabled?: boolean;
    /** Whether the tab is hidden. */
    hidden?: boolean;
  }>;
  /** The key of the currently active tab. */
  tabActive?: Key;
  /** Callback function triggered when the active tab changes. */
  onChange?: (tabKey: Key) => void;
  /** Whether the tabs should auto fit. */
  autoFit?: boolean;
  /** Determines if the tabs is in a controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Tabs component extends the functionality of the Ant Design Tabs component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Tabs component.
 *
 * @param {Props} props - The properties for the Tabs component.
 * @param {string} [props.className] - Custom CSS class for styling the tabs.
 * @param {Array<{ key: Key, label: ReactNode, children: ReactNode, disabled?: boolean, hidden?: boolean }>} [props.tabs=[]] - Array of tab objects containing key, label, children, and optional disabled and hidden properties.
 * @param {Key} [props.tabActive] - The key of the currently active tab.
 * @param {Function} [props.onChange] - Callback function triggered when the active tab changes.
 * @param {ReactNode} [props.moreIcon] - Icon for the "more" button.
 * @param {string} [props.tabPosition='top'] - The position of the tabs.
 * @param {boolean} [props.autoFit] - Whether the tabs should auto fit.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the tabs is in a controlled or uncontrolled state.
 * @returns {ReactNode} The rendered Tabs component.
 */
export const Tabs = <Key extends string>({
  className,
  tabs = [],
  onChange,
  tabActive,
  moreIcon,
  tabPosition = 'top',
  autoFit,
  valueVariant,
}: Props<Key>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(tabActive);

  const handleChange: AntTabsProps['onChange'] = value => {
    const value_ = value as Key;
    setValueState(value_);
    onChange?.(value_);
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(tabActive);
    }
  }, [tabActive]);

  const tabs_ = useMemo(() => {
    return tabs.filter(item => {
      return !item.hidden;
    });
  }, [tabs]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return undefined;
    }
    return valueVariant === 'controlled-state' ? tabActive : valueState;
  }, [tabActive, valueState, isMounted, valueVariant]);

  return (
    <AntTabs
      destroyInactiveTabPane
      tabBarGutter={0}
      className={classNames(
        'AntTabs__container',
        `AntTabs__${tabPosition}`,
        autoFit ? 'AntTabs__auto-fit' : '',
        className,
      )}
      items={tabs_}
      moreIcon={moreIcon}
      tabPosition={tabPosition}
      activeKey={mergedValueState}
      onChange={handleChange}
    />
  );
};

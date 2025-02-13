import { Rate as AntRate, RateProps as AntRateProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<AntRateProps, 'className' | 'allowClear' | 'allowHalf' | 'count' | 'disabled' | 'tooltips'> {
  /** Custom character to be used for each rate item. */
  character?: Exclude<AntRateProps['character'], ReactNode>;
  /** If true, the rate is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the rate is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** The current rate value. */
  value?: number | undefined;
  /** Callback function that is called when the rate value changes. */
  onChange?: (value: number | undefined) => void;
}

/**
 * Rate component extends the functionality of the Ant Design Rate component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Rate component.
 * Rate component that extends the functionality of the Ant Design Rate component
 * by providing additional customization and support for stricter type safety.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Rate component.
 *
 * @param {Props} props - The properties for the Rate component.
 * @param {string} [props.className] - Custom CSS class for styling the rate component.
 * @param {boolean} [props.allowClear=true] - Allow clearing the rate value.
 * @param {boolean} [props.allowHalf=false] - Allow selecting half stars.
 * @param {number} [props.count=5] - Number of rate items.
 * @param {ReactNode} [props.character] - Custom character to be used for each rate item.
 * @param {boolean} [props.disabled=false] - Disabled state of the rate component.
 * @param {Array<string>} [props.tooltips] - Array of tooltips to be shown on hover for each rate item.
 * @param {number} [props.value] - The current rate value.
 * @param {() => void} [props.onChange] - Callback function when the rate value changes.
 * @param {boolean} [props.readOnly=false] - If true, the rate is read-only and cannot be changed by the user.
 * @param {string} [props.valueVariant='uncontrolled-state'] - Determines if the rate is controlled or uncontrolled state.
 * @returns {ReactNode} The rendered Rate component.
 */
export const Rate: FC<Props> = ({
  className,
  allowClear = true,
  allowHalf = false,
  count = 5,
  character,
  disabled = false,
  tooltips,
  onChange,
  value,
  readOnly = false,
  valueVariant = 'controlled-state',
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntRateProps['onChange'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    setValueState(isUndefined ? undefined : value);
    onChange?.(isUndefined ? undefined : value);
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      setValueState(value);
    }
  }, [value]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (initializeContext?.isSSR && !isMounted) {
      return undefined;
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntRate
      keyboard
      className={classNames('AntRate__container', className)}
      allowClear={allowClear}
      allowHalf={allowHalf}
      count={count}
      character={character}
      tooltips={tooltips}
      disabled={disabled || readOnly}
      onChange={handleChange}
      value={mergedValueState}
    />
  );
};

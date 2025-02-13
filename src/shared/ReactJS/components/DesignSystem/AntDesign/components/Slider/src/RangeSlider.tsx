import { Slider as AntSlider } from 'antd';
import { Formatter, SliderRangeProps as AntSliderRangeProps } from 'antd/es/slider';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, FocusEventHandler, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './css/RangeSlider.css';

type Value = [number, number];

export interface Props
  extends Pick<AntSliderRangeProps, 'className' | 'disabled' | 'step' | 'min' | 'max' | 'vertical'> {
  /** The direction of the slider. */
  direction?: 'ltr' | 'rtl';
  /** Formatter function for the tooltip. */
  tooltipFormatter?: Formatter;
  /** Whether to hide the coordinative (the track of the slider). */
  hideCoordinative?: boolean;
  /** Marks on the slider track. */
  marks?: Record<number, ReactNode>;
  /** The value of the slider. */
  value?: Value;
  /** Callback function triggered when the slider value changes. */
  onChange?: (value: undefined | Value) => void;
  /** If true, the slider is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the slider is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * RangeSlider component extends the functionality of the Ant Design Slider component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Slider component.
 *
 * @param {Props} props - The properties for the RangeSlider component.
 * @param {string} [props.className] - Custom CSS class for styling the slider.
 * @param {boolean} [props.disabled=false] - Whether the slider is disabled.
 * @param {number} [props.value] - The value of the slider.
 * @param {Function} [props.onChange] - Callback function triggered when the slider value changes.
 * @param {number} [props.step] - The granularity the slider can step through values.
 * @param {number} [props.min=0] - The minimum value the slider can slide to.
 * @param {number} [props.max=100] - The maximum value the slider can slide to.
 * @param {boolean} [props.vertical=false] - Whether the slider is vertical.
 * @param {string} [props.direction='ltr'] - The direction of the slider.
 * @param {Formatter} [props.tooltipFormatter] - Formatter function for the tooltip.
 * @param {boolean} [props.hideCoordinative=false] - Whether to hide the coordinative (the track of the slider).
 * @param {Record<number, ReactNode>} [props.marks={}] - Marks on the slider track.
 * @param {boolean} props.readOnly - If true, the slider is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the slider is controlled or uncontrolled state.
 * @returns {ReactNode} The rendered RangeSlider component.
 */
export const RangeSlider: FC<Props> = ({
  className,
  disabled,
  onChange,
  step,
  value,
  max = 100,
  min = 0,
  direction = 'ltr',
  tooltipFormatter,
  hideCoordinative = false,
  vertical = false,
  marks = {},
  readOnly = false,
  valueVariant = 'controlled-state',
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntSliderRangeProps['onChange'] = value => {
    if (readOnly) {
      return;
    }
    if (valueVariant === 'controlled-state') {
      const isUndefined = isEmpty(value) || null;
      setValueState(value as Value);
      onChange?.(isUndefined ? undefined : (value as Value));
    }
    setValueState(value as Value);
  };

  const handleChangeComplete: AntSliderRangeProps['onChangeComplete'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    setValueState(value as Value);
    onChange?.(isUndefined ? undefined : (value as Value));
  };

  const handleFocus: FocusEventHandler<HTMLDivElement> = event => {
    if (readOnly) {
      event.target.blur();
      return;
    }
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
    <AntSlider
      range
      keyboard
      dots={false}
      className={classNames('AntRangeSlider__container', readOnly ? 'AntRangeSlider__readOnly' : '', className)}
      disabled={disabled}
      included={!hideCoordinative}
      marks={marks}
      max={max}
      min={min}
      onFocus={handleFocus}
      reverse={vertical ? direction === 'ltr' : direction === 'rtl'}
      step={step}
      tooltip={{ formatter: tooltipFormatter }}
      vertical={vertical}
      onChange={handleChange}
      onChangeComplete={handleChangeComplete}
      value={mergedValueState}
    />
  );
};

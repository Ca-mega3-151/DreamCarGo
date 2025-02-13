import { Slider as AntSlider, SliderSingleProps as AntSliderSingleProps } from 'antd';
import { Formatter } from 'antd/es/slider';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, FocusEventHandler, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './css/SingleSlider.css';

export interface Props
  extends Pick<AntSliderSingleProps, 'className' | 'disabled' | 'value' | 'step' | 'min' | 'max' | 'vertical'> {
  /** The direction of the slider. */
  direction?: 'ltr' | 'rtl';
  /** Formatter function for the tooltip. */
  tooltipFormatter?: Formatter;
  /** Whether to hide the coordinative (the track of the slider). */
  hideCoordinative?: boolean;
  /** Marks on the slider track. */
  marks?: Record<number, ReactNode>;
  /** Callback function triggered when the slider value changes. */
  onChange?: (value: undefined | number) => void;
  /** If true, the slider is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the slider is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * SingleSlider component extends the functionality of the Ant Design Slider component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Slider component.
 *
 * @param {Props} props - The properties for the SingleSlider component.
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
 * @returns {ReactNode} The rendered SingleSlider component.
 */
export const SingleSlider: FC<Props> = ({
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

  const handleChange: AntSliderSingleProps['onChange'] = value => {
    if (readOnly) {
      return;
    }
    if (valueVariant === 'controlled-state') {
      const isUndefined = isEmpty(value) || null;
      setValueState(value);
      onChange?.(isUndefined ? undefined : value);
    }
    setValueState(value);
  };

  const handleChangeComplete: AntSliderSingleProps['onChangeComplete'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    setValueState(value);
    onChange?.(isUndefined ? undefined : value);
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
      keyboard
      dots={false}
      className={classNames('AntSingleSlider__container', readOnly ? 'AntSingleSlider__readOnly' : '', className)}
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
      value={mergedValueState}
      onChange={handleChange}
      onChangeComplete={handleChangeComplete}
    />
  );
};

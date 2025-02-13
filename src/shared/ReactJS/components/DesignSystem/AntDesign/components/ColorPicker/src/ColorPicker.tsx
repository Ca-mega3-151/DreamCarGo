import { ColorPicker as AntColorPicker, ColorPickerProps as AntColorPickerProps } from 'antd';
import { ColorFactory } from 'antd/lib/color-picker/color';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

const UndefinedValue = 'rgba(0, 0, 0, 0)';

export interface Props
  extends Pick<
    AntColorPickerProps,
    | 'arrow'
    | 'className'
    | 'children'
    | 'disabled'
    | 'disabledAlpha'
    | 'placement'
    | 'presets'
    | 'size'
    | 'panelRender'
    | 'onOpenChange'
    | 'open'
  > {
  /** A function to render text based on the selected color. */
  text?: (value: string) => ReactNode;
  /** The current color value. */
  value?: string | undefined;
  /** Callback function that is called when the color value changes. */
  onChange?: (value: string | undefined) => void;
  /** Determines if the input is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** If true, the color picker will be read-only and not allow user interaction. */
  readOnly?: boolean;
}

/**
 * ColorPicker component extends the functionality of the Ant Design ColorPicker component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design ColorPicker component.
 *
 * @param {Props} props - The properties for the ColorPicker component.
 * @param {string} [props.arrow] - Arrow icon of the color picker.
 * @param {string} [props.className] - Custom CSS class for styling the color picker.
 * @param {ReactNode} [props.children] - Content to be rendered inside the color picker.
 * @param {boolean} [props.disabled=false] - Disabled state of the color picker.
 * @param {boolean} [props.disabledAlpha=false] - Disable alpha channel of the color picker.
 * @param {() => void} [props.onOpenChange] - Callback function when the open state of the panel changes.
 * @param {boolean} [props.open] - Control the open state of the color picker panel.
 * @param {() => ReactNode} [props.panelRender] - Custom render function for the color picker panel.
 * @param {string} [props.placement] - Placement of the color picker panel.
 * @param {Array} [props.presets] - Preset colors for quick selection.
 * @param {string} [props.size] - Size of the color picker.
 * @param {string} [props.value=UndefinedValue] - The current color value.
 * @param {() => void} [props.onChange] - Callback function when the color value changes.
 * @param {boolean} [props.readOnly=false] - If true, the color picker will be read-only.
 * @param {string} [props.valueVariant] - Determines if the input is controlled or uncontrolled state.
 * @returns {ReactNode} The rendered ColorPicker component.
 */
export const ColorPicker: FC<Props> = ({
  arrow,
  text = (): ReactNode => {
    return null;
  },
  className,
  children,
  disabled = false,
  disabledAlpha = false,
  onOpenChange,
  open,
  panelRender,
  placement,
  presets,
  size,
  value = UndefinedValue,
  onChange,
  readOnly = false,
  valueVariant,
}) => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntColorPickerProps['onChangeComplete'] = value => {
    if (readOnly) {
      return;
    }
    const value_ = value.toRgbString();
    const isUndefined = isEmpty(value_) || null;
    setValueState(isUndefined ? UndefinedValue : value_);
    onChange?.(isUndefined ? undefined : value_);
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
  const mergedOpenState = useDeepCompareMemo(() => {
    return readOnly || disabled || (initializeContext?.isSSR && !isMounted) ? false : open;
  }, [disabled, isMounted, open, readOnly]);

  return (
    <AntColorPicker
      format="rgb"
      trigger="click"
      destroyTooltipOnHide
      arrow={arrow}
      className={classNames('AntColorPicker__container', readOnly ? 'AntColorPicker__readOnly' : '', className)}
      children={children}
      disabled={disabled}
      disabledAlpha={disabledAlpha}
      onOpenChange={onOpenChange}
      open={mergedOpenState}
      panelRender={panelRender}
      placement={placement}
      presets={presets}
      showText={color => {
        return text?.(color.toRgbString());
      }}
      size={size}
      onChange={color => {
        return setValueState(color.toRgbString());
      }}
      onChangeComplete={handleChange}
      value={mergedValueState ? new ColorFactory(mergedValueState) : UndefinedValue}
    />
  );
};

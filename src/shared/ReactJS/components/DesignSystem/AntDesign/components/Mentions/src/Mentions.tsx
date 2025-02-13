import { MentionProps as AntMentionProps, Mentions as AntMentions } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';
import { Option } from './types/Option';
import { baseFilterOption } from './utils/baseFilterOption';

export interface Props<RawData>
  extends Pick<
    AntMentionProps,
    | 'className'
    | 'allowClear'
    | 'filterOption'
    | 'notFoundContent'
    | 'prefix'
    | 'split'
    | 'disabled'
    | 'readOnly'
    | 'loading'
    | 'maxLength'
    | 'onSearch'
  > {
  /** Auto size of the input field. */
  autoSize?: false | Exclude<AntMentionProps['autoSize'], boolean>;
  /** The value of the input. */
  value?: string;
  /** Callback function that is called when the value changes. */
  onChange?: (value: string | undefined) => void;
  /** Determines if the input is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
  /** Options for mention suggestions. */
  options: Option<RawData>[];
  /** Callback function that is called when an option is selected. */
  onSelect?: (option: Option<RawData>, prefix: string) => void;
  /** Placeholder text for the input. */
  placeholder: string;
}

/**
 * Mentions component extends the functionality of the Ant Design Mentions component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Mentions component.
 *
 * @param {Props<RawData>} props - The properties for the Mentions component.
 * @param {boolean} [props.allowClear=true] - Whether to allow clearing the input.
 * @param {false | Exclude<AntMentionProps['autoSize'], boolean>} [props.autoSize=false] - Auto size of the input field.
 * @param {string} [props.className] - Custom CSS class for styling the mentions component.
 * @param {boolean} [props.disabled=false] - Disabled state of the mentions component.
 * @param {(inputValue: string, option: Option<RawData>) => boolean} [props.filterOption=baseFilterOption] - Custom filter function for options.
 * @param {boolean} [props.loading=false] - Loading state of the mentions component.
 * @param {number} [props.maxLength] - Maximum length of the input.
 * @param {ReactNode} [props.notFoundContent] - Content to display when no options are found.
 * @param {(value: string | undefined) => void} [props.onChange] - Callback function that is called when the value changes.
 * @param {(text: string) => void} [props.onSearch] - Callback function that is called when the search text changes.
 * @param {(option: Option<RawData>, prefix: string) => void} [props.onSelect] - Callback function that is called when an option is selected.
 * @param {Option<RawData>[]} [props.options=[]] - Options for mention suggestions.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.prefix='@'] - Prefix character(s) to trigger mention suggestions.
 * @param {boolean} [props.readOnly=false] - Read-only state of the mentions component.
 * @param {string} [props.split=' '] - Character(s) to separate mention suggestions.
 * @param {string} [props.value=''] - The value of the input.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant='uncontrolled-state'] - Determines if the input is controlled or uncontrolled state.
 * @returns {ReactNode} The rendered Mentions component.
 */
export const Mentions = <RawData,>({
  allowClear = true,
  autoSize = false,
  className,
  disabled = false,
  filterOption = baseFilterOption,
  loading = false,
  maxLength,
  notFoundContent,
  onChange,
  onSearch,
  onSelect,
  options = [],
  placeholder,
  prefix = '@',
  readOnly = false,
  split = ' ',
  value = '',
  valueVariant = 'controlled-state',
}: Props<RawData>): ReactNode => {
  const initializeContext = useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntMentionProps['onChange'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : value;
    setValueState(value_ ?? '');
    onChange?.(value_);
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
    <AntMentions
      allowClear={allowClear}
      autoSize={autoSize}
      className={classNames('AntMentions__container', readOnly ? 'AntMentions__readOnly' : '', className)}
      disabled={disabled}
      filterOption={filterOption}
      loading={loading}
      maxLength={maxLength}
      notFoundContent={notFoundContent}
      options={options}
      placeholder={placeholder}
      popupClassName="AntMentions__popup"
      prefix={prefix}
      split={split}
      tabIndex={readOnly ? -1 : undefined}
      onSelect={onSelect as AntMentionProps['onSelect']}
      onSearch={onSearch}
      onChange={handleChange}
      value={mergedValueState}
    />
  );
};

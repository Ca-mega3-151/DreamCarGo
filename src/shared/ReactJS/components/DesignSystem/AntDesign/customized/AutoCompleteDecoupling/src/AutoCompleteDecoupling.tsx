import { isEmpty } from 'ramda';
import { DependencyList, ReactNode, useRef, useState } from 'react';
import { useDeepCompareEffect, useMount } from '../../../../../../hooks';
import { AutoComplete, AutoCompleteOption, AutoCompleteProps } from '../../../components/AutoComplete';
import { SelectOption, SelectSingle, SelectSingleProps } from '../../../components/Select';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface Props<Model extends AnyRecord, ModelId extends string | number>
  extends Omit<
    SelectSingleProps<ModelId> | AutoCompleteProps<ModelId>,
    'options' | 'onChange' | 'filterOption' | 'onDropdownVisibleChange' | 'open' | 'searchValue' | 'onSearch'
  > {
  /** Function to fetch or transform data based on the search value. */
  service: (searchValue: string) => Promise<Model[]> | Model[];
  /** Function to transform a model object into an option for the dropdown menu. */
  transformToOption: (model: Model, index?: number) => AutoCompleteOption<ModelId, Model>;
  /** Callback function that is triggered when the input value changes. */
  onChange?: (value: ModelId | undefined, option: AutoCompleteOption<ModelId, Model> | undefined) => void;
  /** Variant of the component, can be 'default' or 'select'. */
  variant?: 'default' | 'select';
  /** An array of dependencies to watch for fetching data. */
  depsFetch?: DependencyList;
  /** An array of dependencies to watch for transforming options. */
  depsTransformOption?: DependencyList;
}

/**
 * AutoCompleteDecoupling component that provides an input field with dropdown suggestions based on user input,
 * decoupling data fetching and transformation from the component itself.
 *
 * @template Model - The type of the model data.
 * @template Value - The type of the value for each option.
 *
 * @param {Props<Model, ModelId>} props - The properties for the AutoCompleteDecoupling component.
 * @param {Function} props.service - Function to fetch or transform data based on the search value.
 * @param {Function} props.transformToOption - Function to transform a model object into an option for the dropdown menu.
 * @param {(value: ModelId | undefined, option: AutoCompleteOption<ModelId, Model> | undefined) => void} [props.onChange] - Callback function that is triggered when the input value changes.
 * @param {boolean} [props.loading=false] - Whether the component is in a loading state, showing a loading indicator.
 * @param {ModelId} [props.value] - The current value of the input.
 * @param {boolean} [props.allowClear=true] - Whether to show a clear button allowing the user to clear the input.
 * @param {string} [props.className] - Custom CSS class for styling the component.
 * @param {boolean} [props.disabled] - Whether the AutoComplete component is disabled.
 * @param {ReactNode} [props.notFoundContent] - Content to display when no options match the input.
 * @param {string} [props.placeholder] - Placeholder text to display when the input is empty.
 * @param {'default' | 'select'} [props.variant] - Variant of the component, can be 'default' or 'select'.
 * @param {DependencyList} [props.depsFetch] - An array of dependencies to watch for fetching data.
 * @param {DependencyList} [props.depsTransformOption] - An array of dependencies to watch for transforming options.
 * @returns {ReactNode} The rendered AutoCompleteDecoupling component.
 */
export const AutoCompleteDecoupling = <Model extends AnyRecord, ModelId extends string | number>({
  transformToOption,
  service,
  onChange,
  loading,
  value,
  allowClear = true,
  className,
  disabled,
  notFoundContent,
  placeholder,
  variant = 'default',
  depsFetch = [],
  depsTransformOption = [],
  readOnly,
  valueVariant,
  size,
  footer,
}: Props<Model, ModelId>): ReactNode => {
  const [isFetching, setIsFetching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [options, setOptions] = useState<SelectOption<ModelId, Model>[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [searchValueState, setSearchValueState] = useState<string>(value?.toString() ?? '');
  const [response, setResponse] = useState<Model[]>([]);

  const handleFetch = (searchValue: string, isSearchAction: boolean): void => {
    clearTimeout(timeoutRef.current);
    setSearchValueState(searchValue);
    setResponse([]);
    /** "value" prop is changed */
    if (!isSearchAction && !open) {
      return;
    }
    /** "value" prop is changed */
    if (searchValue === searchValueState) {
      return;
    }
    /** @lemanh-tuong: AutoComplete only provide suggestion when user type text search ==> If empty, api won't be called */
    if (!searchValue) {
      return;
    }
    setOpen(isSearchAction);
    setIsFetching(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const items = await service(searchValue);
        setResponse(items);
      } finally {
        setIsFetching(false);
      }
      clearTimeout(timeoutRef.current);
    }, 300);
  };

  const handleChange: Props<Model, ModelId>['onChange'] = (value, option) => {
    const isUndefined = isEmpty(value) || null;
    onChange?.(isUndefined ? undefined : value, isUndefined ? undefined : option);
  };

  useMount(() => {
    setIsMounted(true);
    /**
     * @lemanh-tuong: If component is pure AutoComplete ==> Don't need refetch data because value is label string
     * @example When admin select an user in system to create a order ==> Auto fill some field like fullname, phone, ... and when call api, BE will handle to create or none new user
     */
    if (variant === 'default') {
      return;
    }
    /**
     * @lemanh-tuong: If component is Select ==> Need refetch data to match option value to label
     * @example When admin select an employee in system to create a contract ==> Auto fill some field like department, position, ... and employee's id will be used to call api
     */
    if (variant === 'select') {
      handleFetch(searchValueState, false);
      return;
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  useDeepCompareEffect(() => {
    const nextSearchValue = value?.toString() ?? '';
    setSearchValueState(nextSearchValue);
    if (variant === 'default') {
      return;
    }
    if (variant === 'select') {
      handleFetch(nextSearchValue, false);
    }
  }, [value]);

  useDeepCompareEffect(() => {
    if (isMounted) {
      handleFetch(searchValueState, false);
    }
  }, [...depsFetch, isMounted]);

  useDeepCompareEffect(() => {
    const transformData =
      response?.map((item, index) => {
        return { ...transformToOption(item, index), rawData: item };
      }) ?? [];
    setOptions(transformData);
  }, [response, ...depsTransformOption]);

  if (variant === 'default') {
    return (
      <AutoComplete<ModelId, Model>
        readOnly={readOnly}
        valueVariant={valueVariant}
        value={(searchValueState as ModelId) || undefined}
        filterOption={() => {
          return true;
        }}
        searchValue={searchValueState}
        open={open}
        options={options}
        loading={loading || isFetching}
        onChange={handleChange}
        onSearch={value => {
          return handleFetch(value, true);
        }}
        onDropdownVisibleChange={visible => {
          if (!visible) {
            setOpen(false);
          }
        }}
        allowClear={allowClear}
        className={className}
        disabled={disabled}
        notFoundContent={notFoundContent}
        placeholder={placeholder}
        size={size}
      />
    );
  }

  return (
    <SelectSingle<ModelId, Model>
      readOnly={readOnly}
      valueVariant={valueVariant}
      autoClearSearchValue={false}
      searchValue={searchValueState}
      value={(searchValueState as ModelId) || undefined}
      open={open}
      onDropdownVisibleChange={visible => {
        if (!visible) {
          setOpen(false);
        }
      }}
      filterOption={() => {
        return true;
      }}
      onChange={handleChange}
      options={options}
      loading={loading || isFetching}
      onSearch={value => {
        return handleFetch(value, true);
      }}
      allowClear={allowClear}
      className={className}
      disabled={disabled}
      notFoundContent={notFoundContent}
      placeholder={placeholder}
      size={size}
      footer={footer}
    />
  );
};

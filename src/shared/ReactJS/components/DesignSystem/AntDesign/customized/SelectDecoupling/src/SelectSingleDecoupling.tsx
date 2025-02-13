import { isEmpty, prop, uniqBy } from 'ramda';
import { DependencyList, ReactNode, useEffect, useRef, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { SelectOption, SelectSingle, SelectSingleProps } from '../../../components/Select';
import { AnyRecord } from '~/shared/TypescriptUtilities';

const LOADING_FOR_EMPTY_VALUE = 'UNDEFINED';

interface OnPrepareDoneParameters<ModelId extends string, Model> {
  /** The transformed options to be displayed in the select dropdown. These options are created from the response data and any additional models provided. */
  options: SelectOption<ModelId, Model>[];
  /** Indicates if there was a warning, such as when the provided value does not match any fetched options. */
  isWarning: boolean;
}

interface BaseProps<Model extends AnyRecord, ModelId extends string>
  extends Omit<
    SelectSingleProps<ModelId>,
    | 'options'
    | 'onChange'
    | 'filterOption'
    | 'onDropdownVisibleChange'
    | 'openVariant'
    | 'open'
    | 'searchValue'
    | 'onSearch'
  > {
  /** Transforms a model object into a selectable option. Returns `undefined` if the model does not meet selection criteria. */
  transformToOption: (model: Model) => SelectOption<ModelId, Model> | undefined;
  /** Triggered when the selected value changes. Provides the new value and its corresponding option, or `undefined` if cleared. */
  onChange?: (value: ModelId | undefined, options: SelectOption<ModelId, Model> | undefined) => void;
  /** Dependencies that trigger re-fetching data when changed. */
  depsFetch?: DependencyList;
  /** Dependencies that trigger re-transforming options when changed. */
  depsTransformOption?: DependencyList;
  /** Initial models displayed while fetching data. */
  defaultModels?: Model[];
  /** Additional models displayed alongside fetched models, useful for showing manually managed options. */
  additionalModels?: Model[];
  /** Triggered after options are prepared, providing transformed options and any warnings encountered. */
  onPrepareDone?: (params: OnPrepareDoneParameters<ModelId, Model>) => void;
  /** Message displayed when a warning occurs, such as when the `value` is not found in fetched options. Accepts a static message or a function based on the value. */
  warningText?: (value: ModelId) => string;
  /** Custom text to display during the component's initializing state, based on the current value. */
  initializingText?: (value: ModelId | undefined) => string;
  /** Automatically refetch data when the dropdown is opened. */
  autoRefetchOnOpen?: boolean;
}

interface WithSearchClientProps<Model extends AnyRecord, ModelId extends string> extends BaseProps<Model, ModelId> {
  /** Fetches data locally. Expects a function that returns an array of models or a promise resolving to it. */
  service: (params: { currentValue: string | undefined }) => Promise<Model[]> | Model[];
  /** Specifies that the search behavior is client-side. */
  searchType: 'client';
}

interface WithSearchApiProps<Model extends AnyRecord, ModelId extends string> extends BaseProps<Model, ModelId> {
  /** Fetches data from an external API, using search parameters for filtering. */
  service: (params: { search: string | undefined; currentValue: ModelId | undefined }) => Promise<Model[]> | Model[];
  /** Time in milliseconds to debounce API calls during input changes. */
  debounceTime?: number;
  /** Specifies that the search behavior is API-driven. */
  searchType: 'api';
}

export type Props<Model extends AnyRecord, ModelId extends string> =
  | WithSearchClientProps<Model, ModelId>
  | WithSearchApiProps<Model, ModelId>;

/**
 * The `SelectSingleDecoupling` component provides a flexible solution for managing select dropdowns,
 * supporting both client-side and API-based searching mechanisms.
 *
 * @template Model - The type of the data model for the select options.
 * @template ModelId - The type of the unique identifier for the models.
 *
 * @param {Props<Model, ModelId>} props - The props for the component.
 * @param {(model: Model) => SelectOption<ModelId, Model> | undefined} props.transformToOption - Transforms a model object into a selectable option.
 * @param {ModelId | undefined} [props.value] - The currently selected value.
 * @param {(value: ModelId | undefined, options: SelectOption<ModelId, Model> | undefined) => void} [props.onChange] - Callback triggered when the selected value changes.
 * @param {DependencyList} [props.depsFetch] - Dependencies for triggering data fetching.
 * @param {DependencyList} [props.depsTransformOption] - Dependencies for re-transforming options.
 * @param {Model[]} [props.defaultModels] - Initial models to display while fetching.
 * @param {Model[]} [props.additionalModels] - Extra models to include beyond the fetched data.
 * @param {(params: { options: SelectOption<ModelId, Model>[]; isWarning: boolean }) => void} [props.onPrepareDone] - Callback after options preparation is complete.
 * @param {(value: ModelId) => string} [props.warningText] - Generates a warning message for invalid values.
 * @param {(value: ModelId | undefined) => string} [props.initializingText] - Provides an initialization message.
 * @param {boolean} [props.autoRefetchOnOpen] - Automatically refetch data on dropdown open.
 * @param {('client' | 'api')} [searchType] - Determines if searching is done locally or via API.
 * @param {number} [props.debounceTime] - Debounce delay (ms) for API-based searches.
 * @param {(params: { search: string | undefined; currentValue: string | undefined }) => Promise<Model[]> | Model[]} props.service - Fetches data for dropdown options.
 *
 * @returns {ReactNode} The rendered `SelectSingleDecoupling` component.
 *
 * @example
 * ```typescript
 * <SelectSingleDecoupling
 *   transformToOption={(model) => ({ label: model.name, value: model.id })}
 *   service={() => fetchModels()}
 *   searchType="api"
 * />
 * ```
 */
export const SelectSingleDecoupling = <Model extends AnyRecord, ModelId extends string>(
  props: Props<Model, ModelId>,
): ReactNode => {
  const {
    transformToOption,
    service,
    onChange,
    loading,
    depsFetch = [],
    depsTransformOption = [],
    allowClear = true,
    autoClearSearchValue,
    className,
    direction,
    disabled,
    notFoundContent,
    optionLabelProp,
    placeholder,
    value,
    defaultModels = [],
    additionalModels = [],
    onPrepareDone,
    warningText,
    initializingText,
    readOnly,
    valueVariant,
    showSearch,
    size,
    footer,
    autoRefetchOnOpen = true,
    searchType = 'client',
  } = props;

  const isMounted = useIsMounted();
  const [isFetching, setIsFetching] = useState(false);
  const [serviceResponseState, setServiceResponseState] = useState<Model[]>(defaultModels);
  const searchTimeoutRef = useRef<number | undefined>(undefined);
  const isOpenedOnce = useRef<boolean>(false);

  const [state, setState] = useState<{
    options: SelectOption<ModelId, Model>[];
    valueState: ModelId | undefined;
    isPreparedDateOnce: boolean;
    warningValues: ModelId[];
  }>({
    options: defaultModels.reduce<SelectOption<ModelId, Model>[]>((result, item) => {
      const option = transformToOption(item);
      if (option) {
        return result.concat(option);
      }
      return result;
    }, []),
    valueState: value,
    warningValues: [],
    isPreparedDateOnce: false,
  });

  const mergedValue = useDeepCompareMemo(() => {
    if (!state.isPreparedDateOnce && initializingText) {
      return value ? value : LOADING_FOR_EMPTY_VALUE;
    }
    if (valueVariant === 'controlled-state') {
      return value;
    }
    return state.valueState;
  }, [state.isPreparedDateOnce, valueVariant, state.valueState, value]);

  const handleSelect: SelectSingleProps<ModelId, Model>['onChange'] = (values, options) => {
    const isUndefined = isEmpty(values) || null;
    onChange?.(isUndefined ? undefined : values, isUndefined ? undefined : options);
    setState(state => {
      return {
        ...state,
        valueState: values,
      };
    });
  };

  const handleTransformServiceResponse = (serviceResponse?: Model[]): void => {
    const prepareDoneParameters: Omit<OnPrepareDoneParameters<ModelId, Model>, 'options'> = {
      isWarning: !!value,
    };
    const response = serviceResponse ?? serviceResponseState;
    const transformData = response.concat(additionalModels).reduce<SelectOption<ModelId, Model>[]>((result, item) => {
      const option = transformToOption(item);

      if (option?.value === value) {
        prepareDoneParameters.isWarning = false;
      }

      if (option) {
        return result.concat({
          ...option,
          rawData: item,
        });
      }
      return result;
    }, []);
    const uniqData = uniqBy(prop('value'), transformData);

    setState(state => {
      return {
        ...state,
        options: uniqData,
        warningValues: value && prepareDoneParameters.isWarning ? [value] : [],
        isPreparedDateOnce: true,
      };
    });
    onPrepareDone?.({
      ...prepareDoneParameters,
      options: uniqData,
    });
  };

  const handleFetch = async ({ search }: { search: string | undefined }): Promise<void> => {
    setIsFetching(true);
    try {
      const items = await service({
        search,
        currentValue: mergedValue === 'UNDEFINED' ? value : mergedValue,
      });
      setServiceResponseState(items);
      handleTransformServiceResponse(items);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = (searchValue: string): void => {
    if (searchType === 'api') {
      const props_ = props as WithSearchApiProps<Model, ModelId>;
      window.clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = window.setTimeout(() => {
        handleFetch({ search: searchValue });
      }, props_.debounceTime ?? 300);
    }
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  useDeepCompareEffect(() => {
    handleFetch({ search: undefined });
  }, [...depsFetch]);

  useDeepCompareEffect(() => {
    if (!isMounted) {
      return;
    }
    handleTransformServiceResponse();
  }, [...depsTransformOption, additionalModels.length]);

  useDeepCompareEffect(() => {
    setState(state => {
      return {
        ...state,
        valueState: value,
      };
    });
  }, [value]);

  const initializingOption: Pick<SelectOption<ModelId, Model>, 'label' | 'value' | 'hidden' | 'displayLabel'>[] =
    useDeepCompareMemo(() => {
      if (!initializingText) {
        return [];
      }
      return [
        {
          hidden: true,
          label: initializingText(value),
          displayLabel: initializingText(value),
          value: value ? value : (LOADING_FOR_EMPTY_VALUE as ModelId),
        },
      ];
    }, [value]);
  const warningOption: Pick<SelectOption<ModelId, Model>, 'label' | 'value' | 'hidden' | 'displayLabel'>[] =
    useDeepCompareMemo(() => {
      if (state.warningValues && warningText) {
        return state.warningValues.map(warningValue => {
          return {
            hidden: true,
            label: warningText(warningValue),
            displayLabel: warningText(warningValue),
            value: warningValue,
          };
        });
      }
      return [];
    }, [value, state.warningValues]);
  const mergedOptions: SelectOption<ModelId, Model>[] = useDeepCompareMemo(() => {
    // If component wasn't initialized => Select will display placeholder option for initializing
    if (!state.isPreparedDateOnce) {
      return state.options.concat(initializingOption as SelectOption<ModelId, Model>[]);
    }
    // If component was initialized => Display all options from service response & "Placeholder for display options weren't matched with service response"
    return state.options.concat(warningOption as SelectOption<ModelId, Model>[]);
  }, [state.isPreparedDateOnce, state.options]);

  return (
    <SelectSingle
      key={Number(state.isPreparedDateOnce)}
      options={mergedOptions}
      loading={loading || isFetching}
      allowClear={allowClear}
      autoClearSearchValue={autoClearSearchValue}
      className={className}
      direction={direction}
      disabled={disabled || !state.isPreparedDateOnce}
      notFoundContent={notFoundContent}
      optionLabelProp={optionLabelProp}
      placeholder={placeholder}
      readOnly={readOnly}
      valueVariant={valueVariant}
      showSearch={showSearch}
      size={size}
      onChange={handleSelect}
      value={mergedValue as ModelId}
      footer={footer}
      onSearch={handleSearch}
      filterOption={searchType === 'api' ? false : undefined}
      onDropdownVisibleChange={visible => {
        if (autoRefetchOnOpen) {
          if (visible && isOpenedOnce.current && state.isPreparedDateOnce) {
            handleFetch({ search: undefined });
          } else if (!visible) {
            setIsFetching(true);
          }
        }
        if (visible) {
          isOpenedOnce.current = true;
        }
      }}
    />
  );
};

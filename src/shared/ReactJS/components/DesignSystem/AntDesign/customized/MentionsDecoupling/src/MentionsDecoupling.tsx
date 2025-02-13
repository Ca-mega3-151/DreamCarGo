import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Mentions, MentionsOption, MentionsProps } from '../../../components/Mentions';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface Props<Model extends AnyRecord>
  extends Omit<MentionsProps<Model>, 'options' | 'filterOption' | 'onSearch' | 'loading'> {
  /** A function to fetch data from a service. */
  service: (text: string) => Promise<Model[]> | Model[];
  /** A function to transform the fetched model data into options for the Mentions component. */
  transformToOption: (model: Model, index?: number) => MentionsOption<Model>;
}

/**
 * MentionsDecoupling component provides a more flexible approach for working with Mentions components,
 * allowing for separate data fetching and option transformation functions.
 * @template Model - The type of the data model.
 * @param {Props<Model>} props - The component props.
 * @returns {ReactNode} - The rendered MentionsDecoupling component.
 */
export const MentionsDecoupling = <Model extends AnyRecord>({
  allowClear,
  autoSize,
  className,
  disabled,
  maxLength,
  notFoundContent,
  onChange,
  onSelect,
  placeholder,
  prefix,
  readOnly,
  service,
  split,
  transformToOption,
  value,
  valueVariant,
}: Props<Model>): ReactNode => {
  const [isFetching, setIsFetching] = useState(false);
  const [serviceResponseState, setServiceResponseState] = useState<Model[]>([]);
  const timeoutRef = useRef<number | NodeJS.Timeout | undefined>(undefined);

  const handleSearch = (text: string): void => {
    setIsFetching(true);
    setServiceResponseState([]);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(async () => {
      try {
        const response = await service(text);
        setServiceResponseState(response);
      } finally {
        setIsFetching(false);
        clearTimeout(timeoutRef.current);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const options = useMemo(() => {
    return (
      serviceResponseState?.map((item, index) => {
        return { ...transformToOption(item, index), rawData: item };
      }) ?? []
    );
  }, [serviceResponseState, transformToOption]);

  return (
    <Mentions
      filterOption={() => {
        return true;
      }}
      loading={isFetching}
      allowClear={allowClear}
      className={className}
      disabled={disabled}
      notFoundContent={notFoundContent}
      placeholder={placeholder}
      readOnly={readOnly}
      valueVariant={valueVariant}
      autoSize={autoSize}
      maxLength={maxLength}
      prefix={prefix}
      split={split}
      options={options}
      onSearch={handleSearch}
      onChange={onChange}
      onSelect={onSelect}
      value={value}
    />
  );
};

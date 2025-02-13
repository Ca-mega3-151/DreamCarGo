import { values } from 'ramda';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getRecordStatusMappingToLabels } from '../constants/RecordStatusMappingToLabels';
import { RecordStatus } from '../models/RecordStatus';
import { SelectSingle, SelectSingleProps } from '~/shared/ReactJS';

interface Props {
  status?: RecordStatus;
  onChange?: SelectSingleProps<RecordStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  placeholder: string;
}

export const SelectRecordStatus = ({
  status,
  disabled,
  allowClear = true,
  onChange,
  className,
  placeholder,
}: Props) => {
  const { t } = useTranslation(['record_status']);

  const RecordStatusMappingToLabels = useMemo(() => {
    return getRecordStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      placeholder={placeholder}
      allowClear={allowClear}
      disabled={disabled}
      className={className}
      value={status}
      onChange={onChange}
      options={values(RecordStatus).map(item => {
        return {
          label: RecordStatusMappingToLabels[item],
          searchValue: RecordStatusMappingToLabels[item],
          rawData: item,
          value: item,
        };
      })}
    />
  );
};

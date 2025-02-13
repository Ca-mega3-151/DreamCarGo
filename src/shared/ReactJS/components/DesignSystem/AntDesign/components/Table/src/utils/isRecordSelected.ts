import { Props } from '../Table';
import { AnyRecord } from '~/shared/TypescriptUtilities';

interface IsRecordSelected<RecordType extends AnyRecord> {
  /** The current state of selected rows in the table. */
  selectedRecordsState: Props<RecordType>['dataSource'];
  /** The record to check if it is selected or not. */
  record: RecordType;
  /** A function that takes a record and returns its unique key. */
  recordKey: Props<RecordType>['recordKey'];
}

/**
 * Determines if a given record is currently selected in the table.
 *
 * @template RecordType - The type of the record being checked.
 * @param {IsRecordSelected<RecordType>} params - The parameters for the function.
 * @param {Props<RecordType>['dataSource']} params.selectedRecordsState - The current state of selected rows.
 * @param {RecordType} params.record - The record to check for selection.
 * @param {Props<RecordType>['recordKey']} params.recordKey - A function that returns the unique key for a record.
 * @returns {boolean} - Returns `true` if the record is selected, `false` otherwise.
 */
export const isRecordSelected = <RecordType extends AnyRecord>({
  selectedRecordsState = [],
  record,
  recordKey,
}: IsRecordSelected<RecordType>): boolean => {
  return !!selectedRecordsState.find(itemState => {
    return recordKey?.(itemState) === recordKey?.(record);
  });
};

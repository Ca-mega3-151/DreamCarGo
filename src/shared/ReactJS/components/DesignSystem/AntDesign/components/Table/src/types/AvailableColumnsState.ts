import { ColumnType } from './ColumnType';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface AvailableColumnState<RecordType extends AnyRecord, ActionKey extends string> {
  id: string;
  visible: boolean;
  rawData: ColumnType<RecordType, ActionKey>;
}

export type AvailableColumnsState<RecordType extends AnyRecord, ActionKey extends string> = AvailableColumnState<
  RecordType,
  ActionKey
>[];

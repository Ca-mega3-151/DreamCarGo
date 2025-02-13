import { FilterValues } from './Filter';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface FilterState<ActionKey extends string, ExtraFilterValues extends AnyRecord> {
  values: FilterValues<ActionKey, ExtraFilterValues> | undefined;
  columnKey: ActionKey | undefined;
  openDrawer: boolean;
}

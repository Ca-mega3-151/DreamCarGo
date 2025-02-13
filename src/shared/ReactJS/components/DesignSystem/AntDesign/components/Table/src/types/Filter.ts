import { AnyRecord } from '~/shared/TypescriptUtilities';

export type FilterValues<ActionKey extends string, Extra extends AnyRecord> = Record<ActionKey, any> & Extra;

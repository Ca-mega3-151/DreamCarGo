import { AnyRecord, DeepPartial, PathKeyOfObject } from '~/shared/TypescriptUtilities';

export type FieldsErrorOfForm<FormValues extends AnyRecord> = DeepPartial<Record<PathKeyOfObject<FormValues>, string>>;

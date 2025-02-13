export type FlashSessionData<Data, FlashData> = Partial<
  Data & {
    [Key in keyof FlashData as FlashDataKey<Key & string>]: FlashData[Key];
  }
>;
export type FlashDataKey<Key extends string> = `__flash_${Key}__`;

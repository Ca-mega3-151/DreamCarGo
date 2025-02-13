/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export declare class DeferredData {
  private pendingKeysSet;
  private controller;
  private abortPromise;
  private unlistenAbortSignal;
  private subscribers;
  data: Record<string, unknown>;
  init?: ResponseInit;
  deferredKeys: string[];
  constructor(data: Record<string, unknown>, responseInit?: ResponseInit);
  private trackPromise;
  private onSettle;
  private emit;
  subscribe(fn: (aborted: boolean, settledKey?: string) => void): () => boolean;
  cancel(): void;
  resolveData(signal: AbortSignal): Promise<boolean>;
  get done(): boolean;
  get unwrappedData(): {};
  get pendingKeys(): string[];
}

declare const typedDeferredDataBrand: unique symbol;
export type TypedDeferredData<Data extends Record<string, unknown>> = Pick<DeferredData, 'init'> & {
  data: Data;
  readonly [typedDeferredDataBrand]: 'TypedDeferredData';
};
export type DeferFunction = <Data extends Record<string, unknown>>(
  data: Data,
  init?: number | ResponseInit,
) => TypedDeferredData<Data>;
export type JsonFunction = <Data>(data: Data, init?: number | ResponseInit) => TypedResponse<Data>;
export type TypedResponse<T = unknown> = Omit<Response, 'json'> & {
  json(): Promise<T>;
};
export type RedirectFunction = (url: string, init?: number | ResponseInit) => TypedResponse<never>;

export {};

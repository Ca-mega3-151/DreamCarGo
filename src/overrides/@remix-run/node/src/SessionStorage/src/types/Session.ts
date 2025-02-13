import { FlashSessionData } from './FlashSessionData';
import { SessionData } from './SessionData';

export interface Session<Data = SessionData, FlashData = Data> {
  readonly id: string;
  readonly data: FlashSessionData<Data, FlashData>;
  has(name: (keyof Data | keyof FlashData) & string): boolean;
  get<Key extends (keyof Data | keyof FlashData) & string>(
    name: Key,
  ):
    | (Key extends keyof Data ? Data[Key] : undefined)
    | (Key extends keyof FlashData ? FlashData[Key] : undefined)
    | undefined;
  set<Key extends keyof Data & string>(name: Key, value: Data[Key]): void;
  flash<Key extends keyof FlashData & string>(name: Key, value: FlashData[Key]): void;
  unset(name: keyof Data & string): void;
}

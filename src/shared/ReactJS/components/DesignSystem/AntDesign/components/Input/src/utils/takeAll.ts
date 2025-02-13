import { ChangeEvent } from 'react';

export const takeAll = (event: ChangeEvent<HTMLInputElement>): string => {
  return event.target.value;
};

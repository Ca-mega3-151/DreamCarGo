import { ChangeEvent } from 'react';

export const takeOnlyWord = (event: ChangeEvent<HTMLInputElement>): string => {
  const inputValue = event.target.value;
  const wordsOnly = inputValue.replace(/[^a-zA-Z\s]/g, '').trim();
  return wordsOnly;
};

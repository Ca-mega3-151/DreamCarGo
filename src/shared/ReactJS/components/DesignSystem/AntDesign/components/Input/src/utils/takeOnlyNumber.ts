import { ChangeEvent } from 'react';

export const takeOnlyNumber = (event: ChangeEvent<HTMLInputElement>): string => {
  const value = event.target.value;
  const numbersArray = value.match(/\d+/g) ?? [];
  return numbersArray.join('');
};

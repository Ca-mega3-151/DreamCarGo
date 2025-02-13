import { Props as SelectMultipleProps } from '../SelectMultiple';
import { Props as SelectSingleProps } from '../SelectSingle';

type FilterOption = (SelectSingleProps<any> | SelectMultipleProps<any>)['filterOption'];

/**
 * Default filter function for options in a Select component.
 * @param input The input string to filter options with.
 * @param option The option being filtered.
 * @returns Whether the option matches the input string.
 */
export const baseFilterOption: FilterOption = (input, option) => {
  if (option?.searchValue) {
    return !!option?.searchValue?.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
  }
  if (typeof option?.label == 'string') {
    return !!option?.label?.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
  }
  return !!option?.value.toString().includes(input.toString());
};

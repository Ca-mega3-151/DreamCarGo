import { Props as SelectMultipleAsTreeLayoutProps } from '../SelectMultipleAsTreeLayout';
import { Props as SelectSingleAsTreeLayoutProps } from '../SelectSingleAsTreeLayout';

type FilterOption =
  | SelectSingleAsTreeLayoutProps<any>['filterTreeNode']
  | SelectMultipleAsTreeLayoutProps<any>['filterTreeNode'];

/**
 * Default filter function for options in a Tree Select component.
 * @param input The input string to filter options with.
 * @param option The option being filtered.
 * @returns Whether the option matches the input string.
 */
export const baseFilterOption: FilterOption = (input, option) => {
  if ('searchValue' in option && option?.['searchValue']) {
    return !!option?.['searchValue']?.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
  }
  if (typeof option?.label == 'string') {
    return !!option?.label?.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
  }
  return !!option?.value?.toString().includes(input.toString());
};

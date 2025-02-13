import { Props as MentionsProps } from '../Mentions';
import { Option } from '../types/Option';

type FilterOption = Exclude<MentionsProps<any>['filterOption'], undefined>;

/**
 * Default filter function for options in a Mentions component.
 * @param input The input string to filter options with.
 * @param option The option being filtered.
 * @returns Whether the option matches the input string.
 */
export const baseFilterOption: FilterOption = (input, option) => {
  const option_ = option as Option<any>;
  if (option_?.searchValue) {
    return !!option_?.searchValue?.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
  }
  if (typeof option_?.label == 'string') {
    return !!option_?.label?.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
  }
  return !!option_?.value.toString().includes(input.toString());
};

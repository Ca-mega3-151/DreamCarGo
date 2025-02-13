import { Dayjs, dayjs } from '~/shared/Utilities';

/**
 * Checks if a given date is before the current month.
 *
 * @param {Dayjs} date - The date to be checked.
 * @returns {boolean} True if the date is before the current month, false otherwise.
 */
export const disableMonthsPast = (date: Dayjs): boolean => {
  return date.isBefore(dayjs().startOf('month'));
};

/**
 * Checks if a given date is after the current month.
 *
 * @param {Dayjs} date - The date to be checked.
 * @returns {boolean} True if the date is after the current month, false otherwise.
 */
export const disableMonthsFuture = (date: Dayjs): boolean => {
  return date.isAfter(dayjs().startOf('month'));
};

/**
 * Creates a function that checks if a given date is after a specified checkpoint date.
 *
 * @param {Dayjs} checkpoint - The checkpoint date.
 * @returns {(date: Dayjs) => boolean} A function that takes a date and returns true if it is after the checkpoint date, false otherwise.
 */
export const disableMonthsAfterCheckpoint = (checkpoint: Dayjs) => {
  return (date: Dayjs): boolean => {
    return date.isAfter(dayjs(checkpoint).startOf('month'));
  };
};

/**
 * Creates a function that checks if a given date is before a specified checkpoint date.
 *
 * @param {Dayjs} checkpoint - The checkpoint date.
 * @returns {(date: Dayjs) => boolean} A function that takes a date and returns true if it is before the checkpoint date, false otherwise.
 */
export const disableMonthsBeforeCheckpoint = (checkpoint: Dayjs) => {
  return (date: Dayjs): boolean => {
    return date.isBefore(dayjs(checkpoint).startOf('month'));
  };
};

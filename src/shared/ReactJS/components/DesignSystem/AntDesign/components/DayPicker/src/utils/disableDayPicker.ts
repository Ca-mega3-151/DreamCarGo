import { Dayjs, dayjs } from '~/shared/Utilities';

/**
 * Checks if a given date is before the current day.
 *
 * @param {Dayjs} date - The date to be checked.
 * @returns {boolean} True if the date is before the current day, false otherwise.
 */
export const disableDaysPast = (date: Dayjs): boolean => {
  return date.isBefore(dayjs().startOf('day'));
};

/**
 * Checks if a given date is after the current day.
 *
 * @param {Dayjs} date - The date to be checked.
 * @returns {boolean} True if the date is after the current day, false otherwise.
 */
export const disableDaysFuture = (date: Dayjs): boolean => {
  return date.isAfter(dayjs().startOf('day'));
};

/**
 * Creates a function that checks if a given date is after a specified checkpoint date.
 *
 * @param {Dayjs} checkpoint - The checkpoint date.
 * @returns {(date: Dayjs) => boolean} A function that takes a date and returns true if it is after the checkpoint date, false otherwise.
 */
export const disableDaysAfterCheckpoint = (checkpoint: Dayjs) => {
  return (date: Dayjs): boolean => {
    return date.isAfter(dayjs(checkpoint).startOf('day'));
  };
};

/**
 * Creates a function that checks if a given date is before a specified checkpoint date.
 *
 * @param {Dayjs} checkpoint - The checkpoint date.
 * @returns {(date: Dayjs) => boolean} A function that takes a date and returns true if it is before the checkpoint date, false otherwise.
 */
export const disableDaysBeforeCheckpoint = (checkpoint: Dayjs) => {
  return (date: Dayjs): boolean => {
    return date.isBefore(dayjs(checkpoint).startOf('day'));
  };
};

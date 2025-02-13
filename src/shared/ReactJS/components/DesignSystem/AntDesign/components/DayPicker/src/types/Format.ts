type DateFormat = 'DD/MM/YYYY' | 'DD.MM.YYYY' | 'DD-MM-YYYY' | 'YYYY/MM/DD' | 'YYYY.MM.DD' | 'YYYY-MM-DD';
type TimeFormat = 'HH:mm' | 'HH:mm:ss';

/**
 * A type representing various date and time format combinations.
 *
 * The possible values can be:
 * - Date formats: 'DD/MM/YYYY', 'DD.MM.YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'YYYY.MM.DD', 'YYYY-MM-DD'
 * - Time formats: 'HH:mm', 'HH:mm:ss'
 * - Combinations of date and time formats separated by a space:
 *   - `${DateFormat} ${TimeFormat}`
 *   - `${TimeFormat} ${DateFormat}`
 *
 * @typedef {('DD/MM/YYYY' | 'DD.MM.YYYY' | 'DD-MM-YYYY' | 'YYYY/MM/DD' | 'YYYY.MM.DD' | 'YYYY-MM-DD' |
 *            'HH:mm' | 'HH:mm:ss' |
 *            `${DateFormat} ${TimeFormat}` | `${TimeFormat} ${DateFormat}`)} Format
 */
export type Format = DateFormat | TimeFormat | `${DateFormat} ${TimeFormat}` | `${TimeFormat} ${DateFormat}`;

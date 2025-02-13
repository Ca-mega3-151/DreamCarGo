# SingleMonthPicker

## Overview

The `SingleMonthPicker` component extends the functionality of the Ant Design DatePicker component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design DatePicker component.

## Props

| Prop         | Type                                         | Default              | Description                                                          |
| ------------ | -------------------------------------------- | -------------------- | -------------------------------------------------------------------- |
| className    | `string`                                     | -                    | Custom CSS class for the month picker.                               |
| allowClear   | `boolean`                                    | `true`               | Whether to show a clear button.                                      |
| placeholder  | `string`                                     | -                    | Placeholder text for the input.                                      |
| disabled     | `boolean`                                    | -                    | Whether the month picker is disabled.                                |
| presets      | `Object[]`                                   | -                    | Preset ranges for quick selection.                                   |
| showNow      | `boolean`                                    | `true`               | Whether to show the "Now" button.                                    |
| disabledDate | `Function`                                   | -                    | Function to specify the months that should be disabled.              |
| suffixIcon   | `ReactNode`                                  | -                    | Custom suffix icon for the month picker.                             |
| locale       | `Object`                                     | -                    | Locale configuration for the month picker.                           |
| format       | `string`                                     | `'MM/YYYY'`          | Format for displaying the month and/or time.                         |
| value        | `Dayjs \| string \| number`                  | -                    | The currently selected date and time.                                |
| onChange     | `(value: Dayjs \| undefined) => void`        | -                    | Callback function triggered when the selected date and time changes. |
| readOnly     | `boolean`                                    | `false`              | If true, the picker is read-only and cannot be changed by the user.  |
| valueVariant | `'controlled-state' \| 'uncontrolled-state'` | `'controlled-state'` | Determines if the picker is controlled or uncontrolled state.        |
| size         | `string`                                     | -                    | The size of picker.                                                  |

##### Default Locale Configuration

```javascript
const defaultLocale = {
  lang: {
    locale: "en_US",
    placeholder: "Select date",
    rangePlaceholder: ["Start date", "End date"],
    today: "Today",
    now: "Now",
    backToToday: "Back to today",
    ok: "OK",
    clear: "Clear",
    month: "Month",
    year: "Year",
    timeSelect: "Select time",
    dateSelect: "Select date",
    monthSelect: "Choose a month",
    yearSelect: "Choose a year",
    decadeSelect: "Choose a decade",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century",
    shortWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  timePickerLocale: {
    placeholder: "Select time",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
```

## Usage

```typescript
import { SingleMonthPicker } from "...";

// Example usage
<SingleMonthPicker
  className="custom-class"
  allowClear={true}
  placeholder="Select date"
  disabled={false}
  presets={[{ label: 'Last 7 Days', value: dayjs().subtract(7, 'days') }]}
  showNow={true}
  disabledDate={(currentDate) => currentDate && currentDate < dayjs().endOf('day')}
  suffixIcon={<Icon type="calendar" />}
  locale={defaultLocale}
  disabledHours={() => [0, 1, 2, 3, 4, 5]}
  disabledMinutes={({ hours }) => (hours === 12 ? [0, 30] : [])}
  disabledSeconds={({ hours, minutes }) => (hours === 12 && minutes === 30 ? [0, 30] : [])}
  format="MM/YYYY"
  value={dayjs().startOf('day')}
  onChange={(value) => console.log('Selected date:', value)}
/>;

```

# RangeMonthPicker

## Overview

The `RangeMonthPicker` component extends the functionality of the Ant Design DatePicker component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design DatePicker component.

## Props

| Prop         | Type                                                     | Default              | Description                                                         |
| ------------ | -------------------------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| className    | `string`                                                 | -                    | Custom CSS class for the month picker.                              |
| allowClear   | `boolean`                                                | `true`               | Whether to show a clear button.                                     |
| placeholder  | `[string, string]`                                       | -                    | Placeholder text for the input.                                     |
| disabled     | `boolean`                                                | -                    | Whether the month picker is disabled.                               |
| presets      | `Object[]`                                               | -                    | Preset ranges for quick selection.                                  |
| showNow      | `boolean`                                                | `true`               | Whether to show the "Now" button.                                   |
| disabledDate | `Function`                                               | -                    | Function to specify the months that should be disabled.             |
| suffixIcon   | `ReactNode`                                              | -                    | Custom suffix icon for the month picker.                            |
| locale       | `Object`                                                 | -                    | Locale configuration for the month picker.                          |
| format       | `string`                                                 | `'MM/YYYY'`          | Format for displaying the month and time.                           |
| value        | `[Dayjs \| string \| number, Dayjs \| string \| number]` | -                    | Current value of the month range picker.                            |
| onChange     | `(value: [Dayjs, Dayjs] \| undefined) => void`           | -                    | Callback function triggered when the selected date range changes.   |
| readOnly     | `boolean`                                                | `false`              | If true, the picker is read-only and cannot be changed by the user. |
| valueVariant | `'controlled-state' \| 'uncontrolled-state'`             | `'controlled-state'` | Determines if the picker is controlled or uncontrolled state.       |
| size         | `string`                                                 | -                    | The size of picker.                                                 |

##### Default Locale Configuration

```javascript
const defaultLocale = {
  lang: {
    locale: "en_US",
    placeholder: "Select date",
    rangePlaceholder: ["Start date", "End date"],
    today: "Today",
    now: "Now",
    backToToday: "Back to today",
    ok: "OK",
    clear: "Clear",
    month: "Month",
    year: "Year",
    timeSelect: "Select time",
    dateSelect: "Select date",
    monthSelect: "Choose a month",
    yearSelect: "Choose a year",
    decadeSelect: "Choose a decade",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century",
    shortWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  timePickerLocale: {
    placeholder: "Select time",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
```

## Example

```typescript
import { RangeMonthPicker } from "...";
// Example usage
<RangeMonthPicker
  className="custom-class"
  allowClear={true}
  placeholder={["Start date", "End date"]}
  disabled={false}
  presets={[{ label: 'Last 7 Days', value: [dayjs().subtract(7, 'days'), dayjs()] }]}
  showNow={true}
  disabledDate={(currentDate) => currentDate && currentDate < dayjs().endOf('day')}
  suffixIcon={<Icon type="calendar" />}
  locale={defaultLocale}
  disabledHours={() => [0, 1, 2, 3, 4, 5]}
  disabledMinutes={({ hours }) => (hours === 12 ? [0, 30] : [])}
  disabledSeconds={({ hours, minutes }) => (hours === 12 && minutes === 30 ? [0, 30] : [])}
  format="MM/YYYY"
  value={[dayjs().startOf('day'), dayjs().endOf('day')]}
  onChange={(value) => console.log('Selected date range:', value)}
/>;
```
